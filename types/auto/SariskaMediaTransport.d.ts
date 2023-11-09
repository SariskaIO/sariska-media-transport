import * as JitsiConferenceErrors from './JitsiConferenceErrors';
import * as JitsiConferenceEvents from './JitsiConferenceEvents';
import JitsiConnection from './JitsiConnection';
import * as JitsiConnectionErrors from './JitsiConnectionErrors';
import * as JitsiConnectionEvents from './JitsiConnectionEvents';
import * as JitsiMediaDevicesEvents from './JitsiMediaDevicesEvents';
import JitsiTrackError from './JitsiTrackError';
import * as JitsiTrackErrors from './JitsiTrackErrors';
import * as JitsiTrackEvents from './JitsiTrackEvents';
import * as JitsiTranscriptionStatus from './JitsiTranscriptionStatus';
import { TrackStreamingStatus } from './modules/connectivity/TrackStreamingStatus';
import * as DetectionEvents from './modules/detection/DetectionEvents';
import TrackVADEmitter from './modules/detection/TrackVADEmitter';
import ProxyConnectionService from './modules/proxyconnection/ProxyConnectionService';
import * as VideoSIPGWConstants from './modules/videosipgw/VideoSIPGWConstants';
import AudioMixer from './modules/webaudio/AudioMixer';
import * as ConnectionQualityEvents from './service/connectivity/ConnectionQualityEvents';
import * as E2ePingEvents from './service/e2eping/E2ePingEvents';
import { createPresenterEffect, createRnnoiseProcessor, createScreenshotCaptureEffect, createVirtualBackgroundEffect } from "./modules/stream-effects";
import * as RTCStatsEvents from './modules/RTCStats/RTCStatsEvents';
/**
 * Tries to deal with the following problem: {@code JitsiMeetJS} is not only
 * this module, it's also a global (i.e. attached to {@code window}) namespace
 * for all globals of the projects in the Jitsi Meet family. If lib-jitsi-meet
 * is loaded through an HTML {@code script} tag, {@code JitsiMeetJS} will
 * automatically be attached to {@code window} by webpack. Unfortunately,
 * webpack's source code does not check whether the global variable has already
 * been assigned and overwrites it. Which is OK for the module
 * {@code JitsiMeetJS} but is not OK for the namespace {@code JitsiMeetJS}
 * because it may already contain the values of other projects in the Jitsi Meet
 * family. The solution offered here works around webpack by merging all
 * existing values of the namespace {@code JitsiMeetJS} into the module
 * {@code JitsiMeetJS}.
 *
 * @param {Object} module - The module {@code JitsiMeetJS} (which will be
 * exported and may be attached to {@code window} by webpack later on).
 * @private
 * @returns {Object} - A {@code JitsiMeetJS} module which contains all existing
 * value of the namespace {@code JitsiMeetJS} (if any).
 */
interface ICreateLocalTrackOptions {
    cameraDeviceId?: string;
    devices?: any[];
    firePermissionPromptIsShownEvent?: boolean;
    fireSlowPromiseEvent?: boolean;
    micDeviceId?: string;
    resolution?: string;
}
interface IJitsiMeetJSOptions {
    enableAnalyticsLogging?: boolean;
    enableWindowOnErrorHandler?: boolean;
    externalStorage?: Storage;
    flags?: {
        runInLiteMode?: boolean;
        ssrcRewritingEnabled?: boolean;
    };
}
declare const _default: {
    version: string;
    JitsiConnection: typeof JitsiConnection;
    /**
     * {@code ProxyConnectionService} is used to connect a remote peer to a
     * local Jitsi participant without going through a Jitsi conference. It is
     * currently used for room integration development, specifically wireless
     * screensharing. Its API is experimental and will likely change; usage of
     * it is advised against.
     */
    ProxyConnectionService: typeof ProxyConnectionService;
    effects: {
        createPresenterEffect: typeof createPresenterEffect;
        createRnnoiseProcessor: typeof createRnnoiseProcessor;
        createScreenshotCaptureEffect: typeof createScreenshotCaptureEffect;
        createVirtualBackgroundEffect: typeof createVirtualBackgroundEffect;
    };
    constants: {
        recording: {
            error: {
                BUSY: string;
                ERROR: string;
                RESOURCE_CONSTRAINT: string;
                UNEXPECTED_REQUEST: string;
                SERVICE_UNAVAILABLE: string;
            };
            mode: {
                FILE: string;
                STREAM: string;
            };
            status: {
                OFF: string;
                ON: string;
                PENDING: string;
            };
        };
        sipVideoGW: typeof VideoSIPGWConstants;
        transcriptionStatus: typeof JitsiTranscriptionStatus;
        trackStreamingStatus: typeof TrackStreamingStatus;
    };
    events: {
        conference: typeof JitsiConferenceEvents;
        connection: typeof JitsiConnectionEvents;
        detection: typeof DetectionEvents;
        track: typeof JitsiTrackEvents;
        mediaDevices: typeof JitsiMediaDevicesEvents;
        connectionQuality: typeof ConnectionQualityEvents;
        e2eping: typeof E2ePingEvents;
        rtcstats: typeof RTCStatsEvents;
    };
    errors: {
        conference: typeof JitsiConferenceErrors;
        connection: typeof JitsiConnectionErrors;
        track: typeof JitsiTrackErrors;
    };
    errorTypes: {
        JitsiTrackError: typeof JitsiTrackError;
    };
    logLevels: any;
    mediaDevices: unknown;
    analytics: unknown;
    initialize(options?: {}): void;
    init(options?: IJitsiMeetJSOptions): void;
    /**
     * Returns whether the desktop sharing is enabled or not.
     *
     * @returns {boolean}
     */
    isDesktopSharingEnabled(): boolean;
    /**
     * Returns whether the current execution environment supports WebRTC (for
     * use within this library).
     *
     * @returns {boolean} {@code true} if WebRTC is supported in the current
     * execution environment (for use within this library); {@code false},
     * otherwise.
     */
    isWebRtcSupported(): boolean;
    setLogLevel(level: any): void;
    /**
     * Expose rtcstats to the public API.
     */
    rtcstats: {
        /**
         * Sends a stats entry to rtcstats server.
         * @param {string} statsType - The type of stats to send.
         * @param {Object} data - The stats data to send.
         */
        sendStatsEntry(statsType: any, data: any): void;
        /**
         * Events generated by rtcstats, such as PeerConnections state,
         * and websocket connection state.
         *
         * @param {RTCStatsEvents} event - The event name.
         * @param {function} handler - The event handler.
         */
        on(event: any, handler: any): void;
    };
    /**
     * Sets the log level to the <tt>Logger</tt> instance with given id.
     *
     * @param {Logger.levels} level the logging level to be set
     * @param {string} id the logger id to which new logging level will be set.
     * Usually it's the name of the JavaScript source file including the path
     * ex. "modules/xmpp/ChatRoom.js"
     */
    setLogLevelById(level: any, id: any): void;
    /**
     * Registers new global logger transport to the library logging framework.
     *
     * @param globalTransport
     * @see Logger.addGlobalTransport
     */
    addGlobalLogTransport(globalTransport: any): void;
    /**
     * Removes global logging transport from the library logging framework.
     *
     * @param globalTransport
     * @see Logger.removeGlobalTransport
     */
    removeGlobalLogTransport(globalTransport: any): void;
    /**
    * Sets global options which will be used by all loggers. Changing these
    * works even after other loggers are created.
    *
    * @param options
    * @see Logger.setGlobalOptions
    */
    setGlobalLogOptions(options: any): void;
    /**
     * Creates the media tracks and returns them trough the callback.
     *
     * @param options Object with properties / settings specifying the tracks
     * which should be created. should be created or some additional
     * configurations about resolution for example.
     * @param {Array} options.effects optional effects array for the track
     * @param {boolean} options.firePermissionPromptIsShownEvent - if event
     * JitsiMediaDevicesEvents.PERMISSION_PROMPT_IS_SHOWN should be fired
     * @param {boolean} options.fireSlowPromiseEvent - if event
     * JitsiMediaDevicesEvents.USER_MEDIA_SLOW_PROMISE_TIMEOUT should be fired
     * @param {Array} options.devices the devices that will be requested
     * @param {string} options.resolution resolution constraints
     * @param {string} options.cameraDeviceId
     * @param {string} options.micDeviceId
     * @param {intiger} interval - the interval (in ms) for
     * checking whether the desktop sharing extension is installed or not
     * @param {Function} checkAgain - returns boolean. While checkAgain()==true
     * createLocalTracks will wait and check on every "interval" ms for the
     * extension. If the desktop extension is not install and checkAgain()==true
     * createLocalTracks will finish with rejected Promise.
     * @param {Function} listener - The listener will be called to notify the
     * user of lib-jitsi-meet that createLocalTracks is starting external
     * extension installation process.
     * NOTE: If the inline installation process is not possible and external
     * installation is enabled the listener property will be called to notify
     * the start of external installation process. After that createLocalTracks
     * will start to check for the extension on every interval ms until the
     * plugin is installed or until checkAgain return false. If the extension
     * is found createLocalTracks will try to get the desktop sharing track and
     * will finish the execution. If checkAgain returns false, createLocalTracks
     * will finish the execution with rejected Promise.
     *
     * @deprecated old firePermissionPromptIsShownEvent
     * @returns {Promise.<{Array.<JitsiTrack>}, JitsiConferenceError>} A promise
     * that returns an array of created JitsiTracks if resolved, or a
     * JitsiConferenceError if rejected.
     */
    createLocalTracks(options: ICreateLocalTrackOptions, oldfirePermissionPromptIsShownEvent: any): any;
    /**
     * Create a TrackVADEmitter service that connects an audio track to an VAD (voice activity detection) processor in
     * order to obtain VAD scores for individual PCM audio samples.
     * @param {string} localAudioDeviceId - The target local audio device.
     * @param {number} sampleRate - Sample rate at which the emitter will operate. Possible values  256, 512, 1024,
     * 4096, 8192, 16384. Passing other values will default to closes neighbor.
     * I.e. Providing a value of 4096 means that the emitter will process 4096 PCM samples at a time, higher values mean
     * longer calls, lowers values mean more calls but shorter.
     * @param {Object} vadProcessor - VAD Processors that does the actual compute on a PCM sample.The processor needs
     * to implement the following functions:
     * - <tt>getSampleLength()</tt> - Returns the sample size accepted by calculateAudioFrameVAD.
     * - <tt>getRequiredPCMFrequency()</tt> - Returns the PCM frequency at which the processor operates.
     * i.e. (16KHz, 44.1 KHz etc.)
     * - <tt>calculateAudioFrameVAD(pcmSample)</tt> - Process a 32 float pcm sample of getSampleLength size.
     * @returns {Promise<TrackVADEmitter>}
     */
    createTrackVADEmitter(localAudioDeviceId: any, sampleRate: any, vadProcessor: any): Promise<TrackVADEmitter>;
    /**
     * Create AudioMixer, which is essentially a wrapper over web audio ChannelMergerNode. It essentially allows the
     * user to mix multiple MediaStreams into a single one.
     *
     * @returns {AudioMixer}
     */
    createAudioMixer(): AudioMixer;
    /**
     * Go through all audio devices on the system and return one that is active, i.e. has audio signal.
     *
     * @returns Promise<Object> - Object containing information about the found device.
     */
    getActiveAudioDevice(): Promise<any>;
    /**
     * Checks if its possible to enumerate available cameras/microphones.
     *
     * @returns {Promise<boolean>} a Promise which will be resolved only once
     * the WebRTC stack is ready, either with true if the device listing is
     * available available or with false otherwise.
     * @deprecated use JitsiMeetJS.mediaDevices.isDeviceListAvailable instead
     */
    isDeviceListAvailable(): any;
    /**
     * Returns true if changing the input (camera / microphone) or output
     * (audio) device is supported and false if not.
     *
     * @param {string} [deviceType] - type of device to change. Default is
     * {@code undefined} or 'input', 'output' - for audio output device change.
     * @returns {boolean} {@code true} if available; {@code false}, otherwise.
     * @deprecated use JitsiMeetJS.mediaDevices.isDeviceChangeAvailable instead
     */
    isDeviceChangeAvailable(deviceType: any): any;
    /**
     * Checks if the current environment supports having multiple audio
     * input devices in use simultaneously.
     *
     * @returns {boolean} True if multiple audio input devices can be used.
     */
    isMultipleAudioInputSupported(): any;
    /**
     * Checks if local tracks can collect stats and collection is enabled.
     *
     * @param {boolean} True if stats are being collected for local tracks.
     */
    isCollectingLocalStats(): boolean;
    /**
     * Executes callback with list of media devices connected.
     *
     * @param {function} callback
     * @deprecated use JitsiMeetJS.mediaDevices.enumerateDevices instead
     */
    enumerateDevices(callback: any): void;
    /**
     * @returns function that can be used to be attached to window.onerror and
     * if options.enableWindowOnErrorHandler is enabled returns
     * the function used by the lib.
     * (function(message, source, lineno, colno, error)).
     */
    getGlobalOnErrorHandler(message: any, source: any, lineno: any, colno: any, error: any): void;
    /**
     * Informs lib-jitsi-meet about the current network status.
     *
     * @param {object} state - The network info state.
     * @param {boolean} state.isOnline - {@code true} if the internet connectivity is online or {@code false}
     * otherwise.
     */
    setNetworkInfo({ isOnline, networkType, details }: {
        isOnline: any;
        networkType: any;
        details: any;
    }): void;
    precallTest: {
        init: typeof import("./modules/statistics/PrecallTest").init;
        execute: typeof import("./modules/statistics/PrecallTest").execute;
    };
    /**
     * Represents a hub/namespace for utility functionality which may be of
     * interest to lib-jitsi-meet clients.
     */
    util: {
        ScriptUtil: {
            loadScript(src: any, async: any, prepend: any, relativeURL: any, loadCallback: any, errorCallback: any): void;
        };
        browser: import("./modules/browser/BrowserCapabilities").default;
    };
};
/**
 * The public API of the Jitsi Meet library (a.k.a. {@code SariskaMediaTransport}).
 */
export default _default;
