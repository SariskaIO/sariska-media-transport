/**
 * Recording adapter for raw WAVE format.
 */
export class WavAdapter extends AbstractAudioContextAdapter {
    /**
     * Callback function for handling AudioProcessingEvents.
     *
     * @private
     * @param {AudioProcessingEvent} e - The event containing the raw PCM.
     * @returns {void}
     */
    private _onAudioProcess;
    _initPromise: Promise<any>;
    _wavBuffers: any[];
    _wavLength: number;
    _data: Blob;
    _isInitialized: boolean;
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
