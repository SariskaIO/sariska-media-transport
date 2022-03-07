/**
 * The know jingle actions that can be sent and should be acted upon by
 * {@code ProxyConnectionService} and {@code ProxyConnectionPC}.
 */
export var ACTIONS;
(function (ACTIONS) {
    ACTIONS["ACCEPT"] = "session-accept";
    ACTIONS["CONNECTION_ERROR"] = "connection-error-encountered";
    ACTIONS["INITIATE"] = "session-initiate";
    ACTIONS["TERMINATE"] = "session-terminate";
    ACTIONS["TRANSPORT_INFO"] = "transport-info";
    ACTIONS["UNAVAILABLE"] = "unavailable";
})(ACTIONS || (ACTIONS = {}));
;
