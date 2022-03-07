export var JitsiTranscriptionStatus;
(function (JitsiTranscriptionStatus) {
    /**
     * The transcription is on.
     */
    JitsiTranscriptionStatus["ON"] = "on";
    /**
     * The transcription is off.
     */
    JitsiTranscriptionStatus["OFF"] = "off";
})(JitsiTranscriptionStatus || (JitsiTranscriptionStatus = {}));
// exported for backward compatibility
export const ON = JitsiTranscriptionStatus.ON;
export const OFF = JitsiTranscriptionStatus.OFF;
