import * as wasmCheck from 'wasm-check';
import JitsiStreamBackgroundEffect from './JitsiStreamBackgroundEffect';
import { ScriptUtil } from '../../util/ScriptUtil';
const models = {
  model96: 'https://sdk.sariska.io/segm_lite_v681.tflite',
  model144: 'https://sdk.sariska.io/segm_full_v679.tflite'
};
const segmentationDimensions = {
  model96: {
    height: 96,
    width: 160
  },
  model144: {
    height: 144,
    width: 256
  }
};
let createTFLiteSIMDModule;
let createTFLiteModule;
/**
 * Creates a new instance of JitsiStreamBackgroundEffect. This loads the Meet background model that is used to
 * extract person segmentation.
 *
 * @param {Object} virtualBackground - The virtual object that contains the background image source and
 * the isVirtualBackground flag that indicates if virtual image is activated.
 * @returns {Promise<JitsiStreamBackgroundEffect>}
 */

export async function createVirtualBackgroundEffect(virtualBackground) {
  if (!MediaStreamTrack.prototype.getSettings && !MediaStreamTrack.prototype.getConstraints) {
    throw new Error('JitsiStreamBackgroundEffect not supported!');
  }

  let tflite;

  if (!createTFLiteSIMDModule && wasmCheck.feature.simd) {
    createTFLiteSIMDModule = await fetch('https://sdk.sariska.io/tflite-simd.wasm');
  }

  if (!createTFLiteModule && !wasmCheck.feature.simd) {
    createTFLiteSIMDModule = await fetch('https://sdk.sariska.io/tflite.wasm');
  }

  if (wasmCheck.feature.simd) {
    tflite = await createTFLiteSIMDModule();
  } else {
    tflite = await createTFLiteModule();
  }

  const modelBufferOffset = tflite._getModelBufferMemoryOffset();

  const modelResponse = await fetch(wasmCheck.feature.simd ? models.model144 : models.model96);

  if (!modelResponse.ok) {
    throw new Error('Failed to download tflite model!');
  }

  const model = await modelResponse.arrayBuffer();
  tflite.HEAPU8.set(new Uint8Array(model), modelBufferOffset);

  tflite._loadModel(model.byteLength);

  const options = { ...(wasmCheck.feature.simd ? segmentationDimensions.model144 : segmentationDimensions.model96),
    virtualBackground
  };
  return new JitsiStreamBackgroundEffect(tflite, options);
}