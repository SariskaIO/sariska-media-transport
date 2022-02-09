/**
 * Recording adapter for raw WAVE format.
 */
export class WavAdapter extends AbstractAudioContextAdapter {
    /**
     * Length of the WAVE file, in number of samples.
     */
    _wavLength: number;
    /**
     * The {@code ArrayBuffer}s that stores the PCM bits.
     */
    _wavBuffers: any[];
    /**
     * Whether or not the {@code WavAdapter} is in a ready state.
     */
    _isInitialized: boolean;
    /**
     * Initialization promise.
     */
    _initPromise: any;
    /**
     * Callback function for handling AudioProcessingEvents.
     *
     * @private
     * @param {AudioProcessingEvent} e - The event containing the raw PCM.
     * @returns {void}
     */
    private _onAudioProcess;
    _data: Blob;
    /**
     * Creates a WAVE file header.
     *
     * @private
     * @param {number} dataLength - Length of the payload (PCM data), in bytes.
     * @returns {Uint8Array}
     */
    private _createWavHeader;
    /**
     * Initialize the adapter.
     *
     * @private
     * @param {string} micDeviceId - The current microphone device ID.
     * @returns {Promise}
     */
    private _initialize;
    /**
     * Combines buffers and export to a wav file.
     *
     * @private
     * @param {Float32Array[]} buffers - The stored buffers.
     * @param {number} length - Total length (number of samples).
     * @returns {Blob}
     */
    private _exportMonoWAV;
}
import { AbstractAudioContextAdapter } from "./AbstractAudioContextAdapter";
