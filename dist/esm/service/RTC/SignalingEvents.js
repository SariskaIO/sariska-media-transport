export var SignalingEvents;
(function (SignalingEvents) {
    /**
     * Event triggered when participant's muted status changes.
     *
     * @param {string} endpointId the track owner's identifier (MUC nickname)
     * @param {MediaType} mediaType "audio" or "video"
     * @param {boolean} isMuted the new muted state
     */
    SignalingEvents["PEER_MUTED_CHANGED"] = "signaling.peerMuted";
    /**
     * Event triggered when participant's video type changes.
     *
     * @param {string} endpointId the video owner's ID (MUC nickname)
     * @param {VideoType} videoType the new value
     */
    SignalingEvents["PEER_VIDEO_TYPE_CHANGED"] = "signaling.peerVideoType";
    /**
     * Event triggered when source's muted status changes.
     *
     * @param {string} sourceName - The name of the source.
     * @param {boolean} isMuted - The new muted state.
     */
    SignalingEvents["SOURCE_MUTED_CHANGED"] = "signaling.sourceMuted";
    /**
     * Event triggered when source's video type changes.
     *
     * @param {string} source - The name of the source.
     * @param {VideoType} videoType - The new value.
     */
    SignalingEvents["SOURCE_VIDEO_TYPE_CHANGED"] = "signaling.sourceVideoType";
})(SignalingEvents || (SignalingEvents = {}));
// exported for backward compatibility
export const PEER_MUTED_CHANGED = SignalingEvents.PEER_MUTED_CHANGED;
export const PEER_VIDEO_TYPE_CHANGED = SignalingEvents.PEER_VIDEO_TYPE_CHANGED;
export const SOURCE_MUTED_CHANGED = SignalingEvents.SOURCE_MUTED_CHANGED;
export const SOURCE_VIDEO_TYPE_CHANGED = SignalingEvents.SOURCE_VIDEO_TYPE_CHANGED;
