/**
 * Recording adapter that uses {@code MediaRecorder} (default browser encoding
 * with Opus codec).
 */
export class OggAdapter extends RecordingAdapter {
    constructor(...args: any[]);
    _initPromise: Promise<any>;
    /**
     * Initialize the adapter.
     *
     * @private
     * @param {string} micDeviceId - The current microphone device ID.
     * @returns {Promise}
     */
    private _initialize;
    _stream: any;
    _mediaRecorder: MediaRecorder;
    /**
     * Callback for storing the encoded data.
     *
     * @private
     * @param {Blob} data - Encoded data.
     * @returns {void}
     */
    private _saveMediaData;
    _recordedData: Blob;
}
import { RecordingAdapter } from "./RecordingAdapter";
