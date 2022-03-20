import { getLogger } from '@jitsi/logger';
import browser from '../browser';
const logger = getLogger('FeatureFlags');
/**
 * A global module for accessing information about different feature flags state.
 */
class FeatureFlags {
    /**
     * Configures the module.
     *
     * @param {boolean} flags.sourceNameSignaling - Enables source names in the signaling.
     */
    init(flags) {
        var _a;
        this._sourceNameSignaling = Boolean(flags.sourceNameSignaling);
        this._sendMultipleVideoStreams = Boolean(flags.sendMultipleVideoStreams);
        // For Chromium, check if Unified plan is enabled.
        this._usesUnifiedPlan = browser.supportsUnifiedPlan()
            && (!browser.isChromiumBased() || ((_a = flags.enableUnifiedOnChrome) !== null && _a !== void 0 ? _a : true));
        logger.info(`Source name signaling: ${this._sourceNameSignaling},`
            + ` Send multiple video streams: ${this._sendMultipleVideoStreams},`
            + ` uses Unified plan: ${this._usesUnifiedPlan}`);
    }
    /**
     * Checks if multiple local video streams support is enabled.
     *
     * @returns {boolean}
     */
    isMultiStreamSupportEnabled() {
        return this._sourceNameSignaling && this._sendMultipleVideoStreams && this._usesUnifiedPlan;
    }
    /**
     * Checks if the source name signaling is enabled.
     *
     * @returns {boolean}
     */
    isSourceNameSignalingEnabled() {
        return this._sourceNameSignaling;
    }
}
export default new FeatureFlags();
