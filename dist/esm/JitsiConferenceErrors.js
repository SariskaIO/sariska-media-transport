/**
 * The errors for the conference.
 */
export var JitsiConferenceErrors;
(function (JitsiConferenceErrors) {
    /**
     * Indicates that client must be authenticated to create the conference.
     */
    JitsiConferenceErrors["AUTHENTICATION_REQUIRED"] = "conference.authenticationRequired";
    /**
     * Indicates that chat error occurred.
     */
    JitsiConferenceErrors["CHAT_ERROR"] = "conference.chatError";
    /**
     * Indicates that a settings error occurred.
     */
    JitsiConferenceErrors["SETTINGS_ERROR"] = "conference.settingsError";
    /**
     * Indicates that conference has been destroyed.
     */
    JitsiConferenceErrors["CONFERENCE_DESTROYED"] = "conference.destroyed";
    /**
     * Indicates that max users limit has been reached.
     */
    JitsiConferenceErrors["CONFERENCE_MAX_USERS"] = "conference.max_users";
    /**
     * Indicates that a connection error occurred when trying to join a conference.
     */
    JitsiConferenceErrors["CONNECTION_ERROR"] = "conference.connectionError";
    /**
     * Indicates that the client has been forced to restart by jicofo when the
     * conference was migrated from one bridge to another.
     */
    JitsiConferenceErrors["CONFERENCE_RESTARTED"] = "conference.restarted";
    /**
     * Indicates that a connection error is due to not allowed,
     * occurred when trying to join a conference.
     */
    JitsiConferenceErrors["NOT_ALLOWED_ERROR"] = "conference.connectionError.notAllowed";
    /**
     * Indicates that a connection error is due to not allowed,
     * occurred when trying to join a conference, only approved members are allowed to join.
     */
    JitsiConferenceErrors["MEMBERS_ONLY_ERROR"] = "conference.connectionError.membersOnly";
    /**
     * Indicates that a connection error is due to denied access to the room,
     * occurred after joining a lobby room and access is denied by the room moderators.
     */
    JitsiConferenceErrors["CONFERENCE_ACCESS_DENIED"] = "conference.connectionError.accessDenied";
    /**
     * Indicates that focus error happened.
     */
    JitsiConferenceErrors["FOCUS_DISCONNECTED"] = "conference.focusDisconnected";
    /**
     * Indicates that focus left the conference.
     */
    JitsiConferenceErrors["FOCUS_LEFT"] = "conference.focusLeft";
    /**
     * Indicates that graceful shutdown happened.
     */
    JitsiConferenceErrors["GRACEFUL_SHUTDOWN"] = "conference.gracefulShutdown";
    /**
     * Indicates that the media connection has failed.
     */
    JitsiConferenceErrors["ICE_FAILED"] = "conference.iceFailed";
    /**
     * Indicates that the versions of the server side components are incompatible
     * with the client side.
     */
    JitsiConferenceErrors["INCOMPATIBLE_SERVER_VERSIONS"] = "conference.incompatible_server_versions";
    /**
     * Indicates that offer/answer had failed.
     */
    JitsiConferenceErrors["OFFER_ANSWER_FAILED"] = "conference.offerAnswerFailed";
    /**
     * Indicates that password cannot be set for this conference.
     */
    JitsiConferenceErrors["PASSWORD_NOT_SUPPORTED"] = "conference.passwordNotSupported";
    /**
     * Indicates that a password is required in order to join the conference.
     */
    JitsiConferenceErrors["PASSWORD_REQUIRED"] = "conference.passwordRequired";
    /**
     * The conference is redirected to a visitor node.
     */
    JitsiConferenceErrors["REDIRECTED"] = "conference.redirected";
    /**
     * Indicates that reservation system returned error.
     */
    JitsiConferenceErrors["RESERVATION_ERROR"] = "conference.reservationError";
    /**
     * Indicates that there is no available videobridge.
     */
    JitsiConferenceErrors["VIDEOBRIDGE_NOT_AVAILABLE"] = "conference.videobridgeNotAvailable";
})(JitsiConferenceErrors || (JitsiConferenceErrors = {}));
;
// exported for backward compatibility
export const AUTHENTICATION_REQUIRED = JitsiConferenceErrors.AUTHENTICATION_REQUIRED;
export const CHAT_ERROR = JitsiConferenceErrors.CHAT_ERROR;
export const SETTINGS_ERROR = JitsiConferenceErrors.SETTINGS_ERROR;
export const CONFERENCE_DESTROYED = JitsiConferenceErrors.CONFERENCE_DESTROYED;
export const CONFERENCE_MAX_USERS = JitsiConferenceErrors.CONFERENCE_MAX_USERS;
export const CONNECTION_ERROR = JitsiConferenceErrors.CONNECTION_ERROR;
export const CONFERENCE_RESTARTED = JitsiConferenceErrors.CONFERENCE_RESTARTED;
export const NOT_ALLOWED_ERROR = JitsiConferenceErrors.NOT_ALLOWED_ERROR;
export const MEMBERS_ONLY_ERROR = JitsiConferenceErrors.MEMBERS_ONLY_ERROR;
export const CONFERENCE_ACCESS_DENIED = JitsiConferenceErrors.CONFERENCE_ACCESS_DENIED;
export const FOCUS_DISCONNECTED = JitsiConferenceErrors.FOCUS_DISCONNECTED;
export const FOCUS_LEFT = JitsiConferenceErrors.FOCUS_LEFT;
export const GRACEFUL_SHUTDOWN = JitsiConferenceErrors.GRACEFUL_SHUTDOWN;
export const ICE_FAILED = JitsiConferenceErrors.ICE_FAILED;
export const INCOMPATIBLE_SERVER_VERSIONS = JitsiConferenceErrors.INCOMPATIBLE_SERVER_VERSIONS;
export const OFFER_ANSWER_FAILED = JitsiConferenceErrors.OFFER_ANSWER_FAILED;
export const PASSWORD_NOT_SUPPORTED = JitsiConferenceErrors.PASSWORD_NOT_SUPPORTED;
export const PASSWORD_REQUIRED = JitsiConferenceErrors.PASSWORD_REQUIRED;
export const REDIRECTED = JitsiConferenceErrors.REDIRECTED;
export const RESERVATION_ERROR = JitsiConferenceErrors.RESERVATION_ERROR;
export const VIDEOBRIDGE_NOT_AVAILABLE = JitsiConferenceErrors.VIDEOBRIDGE_NOT_AVAILABLE;
