export var Events;
(function (Events) {
    /**
     * Notifies about audio level in RTP statistics by SSRC.
     *
     * @param ssrc - The synchronization source identifier (SSRC) of the
     * endpoint/participant whose audio level is being reported.
     * @param {number} audioLevel - The audio level of <tt>ssrc</tt> according to
     * RTP statistics.
     * @param {boolean} isLocal - <tt>true</tt> if <tt>ssrc</tt> identifies the
     * local endpoint/participant; otherwise, <tt>false</tt>.
     */
    Events["AUDIO_LEVEL"] = "statistics.audioLevel";
    /**
     * An event fired just before the statistics module gets disposes and it's
     * the last chance to submit logs.
     */
    Events["BEFORE_DISPOSED"] = "statistics.before_disposed";
    /**
     * An event carrying all statistics by ssrc.
     */
    Events["BYTE_SENT_STATS"] = "statistics.byte_sent_stats";
    /**
     * An event carrying connection statistics.
     *
     * @param {object} connectionStats - The connection statistics carried by the
     * event such as <tt>bandwidth</tt>, <tt>bitrate</tt>, <tt>packetLoss</tt>,
     * <tt>resolution</tt>, and <tt>transport</tt>.
     */
    Events["CONNECTION_STATS"] = "statistics.connectionstats";
    /**
     * An event carrying performance stats.
     */
    Events["LONG_TASKS_STATS"] = "statistics.long_tasks_stats";
})(Events || (Events = {}));
;
// exported for backward compatibility
export const AUDIO_LEVEL = Events.AUDIO_LEVEL;
export const BEFORE_DISPOSED = Events.BEFORE_DISPOSED;
export const BYTE_SENT_STATS = Events.BYTE_SENT_STATS;
export const CONNECTION_STATS = Events.CONNECTION_STATS;
export const LONG_TASKS_STATS = Events.LONG_TASKS_STATS;
