/**
 * Recording adapter that uses libflac.js in the background.
 */
export class FlacAdapter extends AbstractAudioContextAdapter {
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
    _initPromise: Promise<any>;
    _stopPromiseResolver: (value: any) => void;
    /**
     * Initialize the adapter.
     *
     * @private
     * @param {string} micDeviceId - The current microphone device ID.
     * @returns {Promise}
     */
    private _initialize;
    _initWorkerPromiseResolver: (value: any) => void;
    _data: any;
    _encoder: Worker;
    /**
     * Loads the WebWorker.
     *
     * @private
     * @returns {void}
     */
    private _loadWebWorker;
}
import { AbstractAudioContextAdapter } from "../AbstractAudioContextAdapter";
