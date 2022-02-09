/**
 * Base class for {@code AudioContext}-based recording adapters.
 */
export class AbstractAudioContextAdapter extends RecordingAdapter {
    /**
     * The {@code AudioContext} instance.
     */
    _audioContext: any;
    /**
     * The {@code ScriptProcessorNode} instance.
     */
    _audioProcessingNode: any;
    /**
     * The {@code MediaStreamAudioSourceNode} instance.
     */
    _audioSource: any;
    /**
     * The {@code MediaStream} instance, representing the current audio device.
     */
    _stream: any;
    /**
     * Sample rate.
     */
    _sampleRate: number;
    /**
     * Sets up the audio graph in the AudioContext.
     *
     * @protected
     * @param {string} micDeviceId - The current microphone device ID.
     * @param {Function} callback - Callback function to
     * handle AudioProcessingEvents.
     * @returns {Promise}
     */
    protected _initializeAudioContext(micDeviceId: string, callback: Function): Promise<any>;
    /**
     * Connects the nodes in the {@code AudioContext} to start the flow of
     * audio data.
     *
     * @protected
     * @returns {void}
     */
    protected _connectAudioGraph(): void;
    /**
     * Disconnects the nodes in the {@code AudioContext}.
     *
     * @protected
     * @returns {void}
     */
    protected _disconnectAudioGraph(): void;
    /**
     * Replaces the current microphone MediaStream.
     *
     * @protected
     * @param {string} micDeviceId - New microphone ID.
     * @returns {Promise}
     */
    protected _replaceMic(micDeviceId: string): Promise<any>;
}
import { RecordingAdapter } from "./RecordingAdapter";
