/**
 * Enumeration of the media direction types.
 */
export var MediaDirection;
(function (MediaDirection) {
    /**
     * Media is send and receive is suspended.
     */
    MediaDirection["INACTIVE"] = "inactive";
    /**
     * Media is only received from remote peer.
     */
    MediaDirection["RECVONLY"] = "recvonly";
    /**
     * Media is only sent to the remote peer.
     */
    MediaDirection["SENDONLY"] = "sendonly";
    /**
     * Media is sent and received.
     */
    MediaDirection["SENDRECV"] = "sendrecv";
})(MediaDirection || (MediaDirection = {}));
;
