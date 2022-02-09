/**
 * Recording adapter that uses {@code MediaRecorder} (default browser encoding
 * with Opus codec).
 */
export class OggAdapter extends RecordingAdapter {
    /**
     * Instance of MediaRecorder.
     * @private
     */
    private _mediaRecorder;
    /**
     * Initialization promise.
     * @private
     */
    private _initPromise;
    /**
     * The recorded audio file.
     * @private
     */
    private _recordedData;
    /**
     * Initialize the adapter.
     *
     * @private
     * @param {string} micDeviceId - The current microphone device ID.
     * @returns {Promise}
     */
    private _initialize;
    _stream: any;
    /**
     * Callback for storing the encoded data.
     *
     * @private
     * @param {Blob} data - Encoded data.
     * @returns {void}
     */
    private _saveMediaData;
}
import { RecordingAdapter } from "./RecordingAdapter";
