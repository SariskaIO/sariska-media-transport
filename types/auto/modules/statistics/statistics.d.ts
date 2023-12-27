/**
 * The options to configure Statistics.
 * @typedef {Object} StatisticsOptions
 * @property {string} userName - The user name to use
 * @property {string} roomName - The room name we are currently in.
 *
 * @param {JitsiConference} conference - The conference instance from which the statistics were initialized.
 * @param {StatisticsOptions} options - The options to use creating the
 * Statistics.
 */
declare function Statistics(conference: any, options: StatisticsOptions): void;
declare class Statistics {
    /**
     * The options to configure Statistics.
     * @typedef {Object} StatisticsOptions
     * @property {string} userName - The user name to use
     * @property {string} roomName - The room name we are currently in.
     *
     * @param {JitsiConference} conference - The conference instance from which the statistics were initialized.
     * @param {StatisticsOptions} options - The options to use creating the
     * Statistics.
     */
    constructor(conference: any, options: StatisticsOptions);
    /**
     * {@link RTPStats} mapped by {@link TraceablePeerConnection.id} which
     * collect RTP statistics for each peerconnection.
     * @type {Map<string, RTPStats}
     */
    rtpStatsMap: Map<string, RTPStats>;
    eventEmitter: EventEmitter;
    conference: any;
    xmpp: any;
    options: {};
    /**
     * Starts collecting RTP stats for given peerconnection.
     * @param {TraceablePeerConnection} peerconnection
     */
    startRemoteStats(peerconnection: any): void;
    addAudioLevelListener(listener: any): void;
    removeAudioLevelListener(listener: any): void;
    addBeforeDisposedListener(listener: any): void;
    removeBeforeDisposedListener(listener: any): void;
    addConnectionStatsListener(listener: any): void;
    removeConnectionStatsListener(listener: any): void;
    addByteSentStatsListener(listener: any): void;
    removeByteSentStatsListener(listener: any): void;
    /**
     * Add a listener that would be notified on a LONG_TASKS_STATS event.
     *
     * @param {Function} listener a function that would be called when notified.
     * @returns {void}
     */
    addLongTasksStatsListener(listener: Function): void;
    /**
     * Creates an instance of {@link PerformanceObserverStats} and starts the
     * observer that records the stats periodically.
     *
     * @returns {void}
     */
    attachLongTasksStats(): void;
    performanceObserverStats: PerformanceObserverStats;
    /**
     * Obtains the current value of the LongTasks event statistics.
     *
     * @returns {Object|null} stats object if the observer has been
     * created, null otherwise.
     */
    getLongTasksStats(): any | null;
    /**
     * Removes the given listener for the LONG_TASKS_STATS event.
     *
     * @param {Function} listener the listener we want to remove.
     * @returns {void}
     */
    removeLongTasksStatsListener(listener: Function): void;
    /**
     * Updates the list of speakers for which the audio levels are to be calculated. This is needed for the jvb pc only.
     *
     * @param {Array<string>} speakerList The list of remote endpoint ids.
     * @returns {void}
     */
    setSpeakerList(speakerList: Array<string>): void;
    dispose(): void;
    private _stopRemoteStats;
    /**
     * Stops collecting RTP stats for given peerconnection
     * @param {TraceablePeerConnection} tpc
     */
    stopRemoteStats(tpc: any): void;
    /**
     * Sends the given feedback
     *
     * @param overall an integer between 1 and 5 indicating the user's rating.
     * @param comment the comment from the user.
     * @returns {Promise} Resolves immediately.
     */
    sendFeedback(overall: any, comment: any): Promise<any>;
    addAnalyticsEventListener(listener: any): void;
    removeAnalyticsEventListener(listener: any): void;
}
declare namespace Statistics {
    /**
     * Init statistic options
     * @param options
     */
    export function init(options: any): void;
    export const audioLevelsEnabled: boolean;
    export const audioLevelsInterval: number;
    export const pcStatsInterval: number;
    export const disableThirdPartyRequests: boolean;
    export { analytics };
    export const analyticsEventEmitter: EventEmitter;
    export const instances: any;
    export const localStats: any[];
    export function startLocalStats(track: any, callback: any): void;
    export function stopLocalStats(track: any): void;
    export const LOCAL_JID: string;
    /**
     * Sends event to analytics and logs a message to the logger/console.
     *
     * @param {string | Object} event the event name, or an object which
     * represents the entire event.
     * @param {Object} properties properties to attach to the event (if an event
     * name as opposed to an event object is provided).
     */
    export function sendAnalyticsAndLog(event: any, properties?: any): void;
    /**
     * Sends event to analytics.
     *
     * @param {string | Object} eventName the event name, or an object which
     * represents the entire event.
     * @param {Object} properties properties to attach to the event
     */
    export function sendAnalytics(eventName: any, properties?: any): void;
}
export default Statistics;
/**
 * The options to configure Statistics.
 */
export type StatisticsOptions = {
    /**
     * - The user name to use
     */
    userName: string;
    /**
     * - The room name we are currently in.
     */
    roomName: string;
};
import RTPStats from "./RTPStatsCollector";
import EventEmitter from "../util/EventEmitter";
import { PerformanceObserverStats } from "./PerformanceObserverStats";
import analytics from "./AnalyticsAdapter";
