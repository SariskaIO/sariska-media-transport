/**
 * Base class for recording backends.
 */
export class RecordingAdapter {
    /**
     * Starts recording.
     *
     * @param {string} micDeviceId - The microphone to record on.
     * @returns {Promise}
     */
    start(micDeviceId: string): Promise<any>;
    /**
     * Stops recording.
     *
     * @returns {Promise}
     */
    stop(): Promise<any>;
    /**
     * Export the recorded and encoded audio file.
     *
     * @returns {Promise<Object>}
     */
    exportRecordedData(): Promise<any>;
    /**
     * Mutes or unmutes the current recording.
     *
     * @param {boolean} muted - Whether to mute or to unmute.
     * @returns {Promise}
     */
    setMuted(muted: boolean): Promise<any>;
    /**
     * Changes the current microphone.
     *
     * @param {string} micDeviceId - The new microphone device ID.
     * @returns {Promise}
     */
    setMicDevice(micDeviceId: string): Promise<any>;
    /**
     * Helper method for getting an audio {@code MediaStream}. Use this instead
     * of calling browser APIs directly.
     *
     * @protected
     * @param {number} micDeviceId - The ID of the current audio device.
     * @returns {Promise}
     */
    protected _getAudioStream(micDeviceId: number): Promise<any>;
}
