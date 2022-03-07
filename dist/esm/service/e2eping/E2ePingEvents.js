export var E2ePingEvents;
(function (E2ePingEvents) {
    /**
     * Indicates that the end-to-end round-trip-time for a participant has changed.
     */
    E2ePingEvents["E2E_RTT_CHANGED"] = "e2eping.e2e_rtt_changed";
})(E2ePingEvents || (E2ePingEvents = {}));
;
// exported for backward compatibility
export const E2E_RTT_CHANGED = E2ePingEvents.E2E_RTT_CHANGED;
