/**
 * Constant. Rnnoise default sample size, samples of different size won't work.
 */
export const RNNOISE_SAMPLE_LENGTH: 480;
/**
 * Represents an adaptor for the rnnoise library compiled to webassembly. The class takes care of webassembly
 * memory management and exposes rnnoise functionality such as PCM audio denoising and VAD (voice activity
 * detection) scores.
 */
export default class RnnoiseProcessor {
    /**
     * Constructor.
     *
     * @class
     * @param {Object} wasmInterface - WebAssembly module interface that exposes rnnoise functionality.
     */
    constructor(wasmInterface: any);
    _wasmInterface: any;
    _wasmPcmInput: any;
    _wasmPcmOutput: any;
    _wasmPcmInputF32Index: number;
    _context: any;
    /**
     * Copy the input PCM Audio Sample to the wasm input buffer.
     *
     * @param {Float32Array} pcmSample - Array containing 16 bit format PCM sample stored in 32 Floats .
     * @returns {void}
     */
    _copyPCMSampleToWasmBuffer(pcmSample: Float32Array): void;
    /**
     * Convert 32 bit Float PCM samples to 16 bit Float PCM samples and store them in 32 bit Floats.
     *
     * @param {Float32Array} f32Array - Array containing 32 bit PCM samples.
     * @returns {void}
     */
    _convertTo16BitPCM(f32Array: Float32Array): void;
    /**
     * Release resources associated with the wasm context. If something goes downhill here
     * i.e. Exception is thrown, there is nothing much we can do.
     *
     * @returns {void}
     */
    _releaseWasmResources(): void;
    /**
     * Rnnoise can only operate on a certain PCM array size.
     *
     * @returns {number} - The PCM sample array size as required by rnnoise.
     */
    getSampleLength(): number;
    /**
     * Rnnoise can only operate on a certain format of PCM sample namely float 32 44.1Kz.
     *
     * @returns {number} - PCM sample frequency as required by rnnoise.
     */
    getRequiredPCMFrequency(): number;
    /**
     * Release any resources required by the rnnoise context this needs to be called
     * before destroying any context that uses the processor.
     *
     * @returns {void}
     */
    destroy(): void;
    _destroyed: boolean;
    /**
     * Calculate the Voice Activity Detection for a raw Float32 PCM sample Array.
     * The size of the array must be of exactly 480 samples, this constraint comes from the rnnoise library.
     *
     * @param {Float32Array} pcmFrame - Array containing 32 bit PCM samples.
     * @returns {Float} Contains VAD score in the interval 0 - 1 i.e. 0.90 .
     */
    calculateAudioFrameVAD(pcmFrame: Float32Array): any;
}
