/**
 * Recording adapter that uses libflac.js in the background.
 */
export class FlacAdapter extends AbstractAudioContextAdapter {
    /**
     * Instance of WebWorker (flacEncodeWorker).
     */
    _encoder: any;
    /**
     * Resolve function of the Promise returned by {@code stop()}.
     * This is called after the WebWorker sends back {@code WORKER_BLOB_READY}.
     */
    _stopPromiseResolver: any;
    /**
     * Resolve function of the Promise that initializes the flacEncodeWorker.
     */
    _initWorkerPromiseResolver: any;
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
    /**
     * Handler for messages from flacEncodeWorker.
     *
     * @private
     * @param {MessageEvent} e - The event sent by the WebWorker.
     * @returns {void}
     */
    private _onWorkerMessage;
    /**
     * Initialize the adapter.
     *
     * @private
     * @param {string} micDeviceId - The current microphone device ID.
     * @returns {Promise}
     */
    private _initialize;
    _data: any;
    /**
     * Loads the WebWorker.
     *
     * @private
     * @returns {void}
     */
    private _loadWebWorker;
}
import { AbstractAudioContextAdapter } from "../AbstractAudioContextAdapter";
