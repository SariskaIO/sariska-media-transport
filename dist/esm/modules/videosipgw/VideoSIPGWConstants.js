export var VideoSIPGWStatusConstants;
(function (VideoSIPGWStatusConstants) {
    /**
     * Status that video SIP GW service is available.
     */
    VideoSIPGWStatusConstants["STATUS_AVAILABLE"] = "available";
    /**
     * Status that video SIP GW service is not available.
     */
    VideoSIPGWStatusConstants["STATUS_UNDEFINED"] = "undefined";
    /**
     * Status that video SIP GW service is available but there are no free nodes
     * at the moment to serve new requests.
     */
    VideoSIPGWStatusConstants["STATUS_BUSY"] = "busy";
})(VideoSIPGWStatusConstants || (VideoSIPGWStatusConstants = {}));
;
export var VideoSIPGWStateConstants;
(function (VideoSIPGWStateConstants) {
    /**
     * Video SIP GW session state, currently running.
     */
    VideoSIPGWStateConstants["STATE_ON"] = "on";
    /**
     * Video SIP GW session state, currently stopped and not running.
     */
    VideoSIPGWStateConstants["STATE_OFF"] = "off";
    /**
     * Video SIP GW session state, currently is starting.
     */
    VideoSIPGWStateConstants["STATE_PENDING"] = "pending";
    /**
     * Video SIP GW session state, has observed some issues and is retrying at the
     * moment.
     */
    VideoSIPGWStateConstants["STATE_RETRYING"] = "retrying";
    /**
     * Video SIP GW session state, tried to start but it failed.
     */
    VideoSIPGWStateConstants["STATE_FAILED"] = "failed";
})(VideoSIPGWStateConstants || (VideoSIPGWStateConstants = {}));
;
export var VideoSIPGWErrorConstants;
(function (VideoSIPGWErrorConstants) {
    /**
     * Error on trying to create video SIP GW session in conference where
     * there is no room connection (hasn't joined or has left the room).
     */
    VideoSIPGWErrorConstants["ERROR_NO_CONNECTION"] = "error_no_connection";
    /**
     * Error on trying to create video SIP GW session with address for which
     * there is an already created session.
     */
    VideoSIPGWErrorConstants["ERROR_SESSION_EXISTS"] = "error_session_already_exists";
})(VideoSIPGWErrorConstants || (VideoSIPGWErrorConstants = {}));
;
// exported for backward compatibility
export const STATUS_AVAILABLE = VideoSIPGWStatusConstants.STATUS_AVAILABLE;
export const STATUS_UNDEFINED = VideoSIPGWStatusConstants.STATUS_UNDEFINED;
export const STATUS_BUSY = VideoSIPGWStatusConstants.STATUS_BUSY;
export const STATE_ON = VideoSIPGWStateConstants.STATE_ON;
export const STATE_OFF = VideoSIPGWStateConstants.STATE_OFF;
export const STATE_PENDING = VideoSIPGWStateConstants.STATE_PENDING;
export const STATE_RETRYING = VideoSIPGWStateConstants.STATE_RETRYING;
export const STATE_FAILED = VideoSIPGWStateConstants.STATE_FAILED;
export const ERROR_NO_CONNECTION = VideoSIPGWErrorConstants.ERROR_NO_CONNECTION;
export const ERROR_SESSION_EXISTS = VideoSIPGWErrorConstants.ERROR_SESSION_EXISTS;
