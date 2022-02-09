/**
 * Type of the stats reported by each participant (client).
 */
/**
 * The component responsible for the coordination of local recording, across
 * multiple participants.
 * Current implementation requires that there is only one moderator in a room.
 */
export class RecordingController {
    /**
     * Registers listeners for XMPP events.
     *
     * @param {JitsiConference} conference - A {@code JitsiConference} instance.
     * @returns {void}
     */
    registerEvents(conference: JitsiConference): void;
    /**
     * Returns the remote participants' local recording stats.
     *
     * @returns {*}
     */
    getParticipantsStats(): any;
    /**
     * Callback function for XMPP event.
     *
     * @private
     * @param {*} value - The event args.
     * @returns {void}
     */
    private _onStartCommand;
    /**
     * Callback function for XMPP event.
     *
     * @private
     * @param {*} value - The event args.
     * @returns {void}
     */
    private _onStopCommand;
    /**
     * Callback function for XMPP event.
     *
     * @private
     * @returns {void}
     */
    private _onPingCommand;
    /**
     * Starts the recording locally.
     *
     * @private
     * @returns {void}
     */
    private _doStartRecording;
    /**
     * Stops the recording locally.
     *
     * @private
     * @returns {Promise<void>}
     */
    private _doStopRecording;
    /**
     * Sends out updates about the local recording stats via XMPP.
     *
     * @private
     * @returns {void}
     */
    private _updateStats;
    /**
     * Switches to a new local recording session.
     *
     * @param {string} sessionToken - The session Token.
     * @param {string} format - The recording format for the session.
     * @returns {void}
     */
    _switchToNewSession(sessionToken: string, format: string): void;
    _conference: JitsiConference;
    _registered: boolean;
    /**
     * Sets the event handler for {@code onStateChanged}.
     *
     * @param {Function} delegate - The event handler.
     * @returns {void}
     */
    set onStateChanged(arg: Function);
    _onStateChanged: Function;
    /**
     * Sets the event handler for {@code onNotify}.
     *
     * @param {Function} delegate - The event handler.
     * @returns {void}
     */
    set onNotify(arg: Function);
    _onNotify: Function;
    /**
     * Sets the event handler for {@code onWarning}.
     *
     * @param {Function} delegate - The event handler.
     * @returns {void}
     */
    set onWarning(arg: Function);
    _onWarning: Function;
    /**
     * Signals the participants to start local recording.
     *
     * @returns {void}
     */
    startRecording(format: any): void;
    /**
     * Signals the participants to stop local recording.
     *
     * @returns {void}
     */
    stopRecording(): void;
    /**
     * Triggers the download of recorded data.
     * Browser only.
     *
     * @param {number} sessionToken - The token of the session to download.
     * @returns {void}
     */
    downloadRecordedData(sessionToken: number): void;
    /**
     * Changes the current microphone.
     *
     * @param {string} micDeviceId - The new microphone device ID.
     * @returns {void}
     */
    setMicDevice(micDeviceId: string): void;
    _micDeviceId: any;
    /**
     * Mute or unmute audio. When muted, the ongoing local recording should
     * produce silence.
     *
     * @param {boolean} muted - If the audio should be muted.
     * @returns {void}
     */
    setMuted(muted: boolean): void;
    _isMuted: boolean;
    /**
     * Switches the recording format.
     *
     * @param {string} newFormat - The new format.
     * @returns {void}
     */
    switchFormat(newFormat: string): void;
    _format: string;
    /**
     * Returns the local recording stats.
     *
     * @returns {RecordingStats}
     */
    getLocalStats(): RecordingStats;
    /**
     * Changes the current state of {@code RecordingController}.
     *
     * @private
     * @param {Symbol} newState - The new state.
     * @returns {void}
     */
    private _changeState;
    _state: any;
    /**
     * Generates a token that can be used to distinguish each local recording
     * session.
     *
     * @returns {number}
     */
    _getRandomToken(): number;
    _currentSessionToken: string;
    /**
     * Creates a recording adapter according to the current recording format.
     *
     * @private
     * @returns {RecordingAdapter}
     */
    private _createRecordingAdapter;
}
