var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @flow
import JitsiStreamBackgroundEffect from './JitsiStreamBackgroundEffect';
import createTFLiteModule from './tflite';
import createTFLiteSIMDModule from './tflite-simd';
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
/**
 * Creates a new instance of JitsiStreamBackgroundEffect. This loads the Meet background model that is used to
 * extract person segmentation.
 *
 * @param {Object} virtualBackground - The virtual object that contains the background image source and
 * the isVirtualBackground flag that indicates if virtual image is activated.
 * @param {Function} dispatch - The Redux dispatch function.
 * @returns {Promise<JitsiStreamBackgroundEffect>}
 */
export function createVirtualBackgroundEffect(virtualBackground, dispatch) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!MediaStreamTrack.prototype.getSettings && !MediaStreamTrack.prototype.getConstraints) {
            throw new Error('JitsiStreamBackgroundEffect not supported!');
        }
        let tflite;
        let wasmCheck;
        // Checks if WebAssembly feature is supported or enabled by/in the browser.
        // Conditional import of wasm-check package is done to prevent
        // the browser from crashing when the user opens the app.
        try {
            wasmCheck = require('wasm-check');
            if ((_a = wasmCheck === null || wasmCheck === void 0 ? void 0 : wasmCheck.feature) === null || _a === void 0 ? void 0 : _a.simd) {
                tflite = yield createTFLiteSIMDModule();
            }
            else {
                tflite = yield createTFLiteModule();
            }
        }
        catch (err) {
            return;
        }
        const modelBufferOffset = tflite._getModelBufferMemoryOffset();
        const modelResponse = yield fetch(wasmCheck.feature.simd ? models.model144 : models.model96);
        if (!modelResponse.ok) {
            throw new Error('Failed to download tflite model!');
        }
        const model = yield modelResponse.arrayBuffer();
        tflite.HEAPU8.set(new Uint8Array(model), modelBufferOffset);
        tflite._loadModel(model.byteLength);
        const options = Object.assign(Object.assign({}, wasmCheck.feature.simd ? segmentationDimensions.model144 : segmentationDimensions.model96), { virtualBackground });
        return new JitsiStreamBackgroundEffect(tflite, options);
    });
}
