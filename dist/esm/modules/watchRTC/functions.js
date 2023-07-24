/**
 * Checks whether analytics is enabled or not.
 *
 * @param {Object} options - Init options.
 * @returns {boolean}
 */
export function isAnalyticsEnabled(options) {
    const { analytics, disableThirdPartyRequests } = options;
    return !((analytics === null || analytics === void 0 ? void 0 : analytics.disabled) || disableThirdPartyRequests);
}
/**
 * Checks whether rtcstats is enabled or not.
 *
 * @param {Object} options - Init options.
 * @returns {boolean}
 */
export function isRtcstatsEnabled(options) {
    var _a;
    const { analytics } = options;
    return (_a = analytics === null || analytics === void 0 ? void 0 : analytics.rtcstatsEnabled) !== null && _a !== void 0 ? _a : false;
}
/**
 * Checks whether watchrtc is enabled or not.
 *
 * @param {Object} options - Init options.
 * @returns {boolean}
 */
export function isWatchRTCEnabled(options) {
    var _a;
    const { analytics } = options;
    return (_a = analytics === null || analytics === void 0 ? void 0 : analytics.watchRTCEnabled) !== null && _a !== void 0 ? _a : false;
}
