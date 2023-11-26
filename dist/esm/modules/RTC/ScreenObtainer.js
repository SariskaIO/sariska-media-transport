import JitsiTrackError from '../../JitsiTrackError';
import * as JitsiTrackErrors from '../../JitsiTrackErrors';
import browser from '../browser';
const logger = require('@jitsi/logger').getLogger(__filename);
/**
 * The default frame rate for Screen Sharing.
 */
export const SS_DEFAULT_FRAME_RATE = 5;
/**
 * Handles obtaining a stream from a screen capture on different browsers.
 */
const ScreenObtainer = {
    /**
     * If not <tt>null</tt> it means that the initialization process is still in
     * progress. It is used to make desktop stream request wait and continue
     * after it's done.
     * {@type Promise|null}
     */
    obtainStream: null,
    /**
     * Initializes the function used to obtain a screen capture
     * (this.obtainStream).
     *
     * @param {object} options
     */
    init(options = {}) {
        this.options = options;
        this.obtainStream = this._createObtainStreamMethod();
        if (!this.obtainStream) {
            logger.info('Desktop sharing disabled');
        }
    },
    /**
     * Returns a method which will be used to obtain the screen sharing stream
     * (based on the browser type).
     *
     * @returns {Function}
     * @private
     */
    _createObtainStreamMethod() {
        if (browser.isNWJS()) {
            return (onSuccess, onFailure) => {
                window.JitsiMeetNW.obtainDesktopStream(onSuccess, (error, constraints) => {
                    let jitsiError;
                    // FIXME:
                    // This is very very dirty fix for recognising that the
                    // user have clicked the cancel button from the Desktop
                    // sharing pick window. The proper solution would be to
                    // detect this in the NWJS application by checking the
                    // streamId === "". Even better solution would be to
                    // stop calling GUM from the NWJS app and just pass the
                    // streamId to lib-jitsi-meet. This way the desktop
                    // sharing implementation for NWJS and chrome extension
                    // will be the same and lib-jitsi-meet will be able to
                    // control the constraints, check the streamId, etc.
                    //
                    // I cannot find documentation about "InvalidStateError"
                    // but this is what we are receiving from GUM when the
                    // streamId for the desktop sharing is "".
                    if (error && error.name === 'InvalidStateError') {
                        jitsiError = new JitsiTrackError(JitsiTrackErrors.SCREENSHARING_USER_CANCELED);
                    }
                    else {
                        jitsiError = new JitsiTrackError(error, constraints, ['desktop']);
                    }
                    (typeof onFailure === 'function')
                        && onFailure(jitsiError);
                });
            };
        }
        else if (browser.isElectron()) {
            return this.obtainScreenOnElectron;
        }
        else if (browser.isReactNative() && browser.supportsGetDisplayMedia()) {
            return this.obtainScreenFromGetDisplayMediaRN;
        }
        else if (browser.supportsGetDisplayMedia()) {
            return this.obtainScreenFromGetDisplayMedia;
        }
        logger.log('Screen sharing not supported on ', browser.getName());
        return null;
    },
    /**
     * Gets the appropriate constraints for audio sharing.
     *
     * @returns {Object|boolean}
     */
    _getAudioConstraints() {
        const { audioQuality } = this.options;
        const audio = (audioQuality === null || audioQuality === void 0 ? void 0 : audioQuality.stereo) ? {
            autoGainControl: false,
            channelCount: 2,
            echoCancellation: false,
            noiseSuppression: false
        } : true;
        return audio;
    },
    /**
     * Checks whether obtaining a screen capture is supported in the current
     * environment.
     * @returns {boolean}
     */
    isSupported() {
        return this.obtainStream !== null;
    },
    /**
     * Obtains a screen capture stream on Electron.
     *
     * @param onSuccess - Success callback.
     * @param onFailure - Failure callback.
     * @param {Object} options - Optional parameters.
     */
    obtainScreenOnElectron(onSuccess, onFailure, options = {}) {
        if (window.JitsiMeetScreenObtainer && window.JitsiMeetScreenObtainer.openDesktopPicker) {
            const { desktopSharingFrameRate, desktopSharingResolution, desktopSharingSources } = this.options;
            window.JitsiMeetScreenObtainer.openDesktopPicker({
                desktopSharingSources: options.desktopSharingSources || desktopSharingSources || ['screen', 'window']
            }, (streamId, streamType, screenShareAudio = false) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                if (streamId) {
                    let audioConstraints = false;
                    if (screenShareAudio) {
                        audioConstraints = {};
                        const optionalConstraints = this._getAudioConstraints();
                        if (typeof optionalConstraints !== 'boolean') {
                            audioConstraints = {
                                optional: optionalConstraints
                            };
                        }
                        // Audio screen sharing for electron only works for screen type devices.
                        // i.e. when the user shares the whole desktop.
                        // Note. The documentation specifies that chromeMediaSourceId should not be present
                        // which, in the case a users has multiple monitors, leads to them being shared all
                        // at once. However we tested with chromeMediaSourceId present and it seems to be
                        // working properly.
                        if (streamType === 'screen') {
                            audioConstraints.mandatory = {
                                chromeMediaSource: 'desktop'
                            };
                        }
                    }
                    const constraints = {
                        audio: audioConstraints,
                        video: {
                            mandatory: {
                                chromeMediaSource: 'desktop',
                                chromeMediaSourceId: streamId,
                                minFrameRate: (_a = desktopSharingFrameRate === null || desktopSharingFrameRate === void 0 ? void 0 : desktopSharingFrameRate.min) !== null && _a !== void 0 ? _a : SS_DEFAULT_FRAME_RATE,
                                maxFrameRate: (_b = desktopSharingFrameRate === null || desktopSharingFrameRate === void 0 ? void 0 : desktopSharingFrameRate.max) !== null && _b !== void 0 ? _b : SS_DEFAULT_FRAME_RATE,
                                minWidth: (_c = desktopSharingResolution === null || desktopSharingResolution === void 0 ? void 0 : desktopSharingResolution.width) === null || _c === void 0 ? void 0 : _c.min,
                                minHeight: (_d = desktopSharingResolution === null || desktopSharingResolution === void 0 ? void 0 : desktopSharingResolution.height) === null || _d === void 0 ? void 0 : _d.min,
                                maxWidth: (_f = (_e = desktopSharingResolution === null || desktopSharingResolution === void 0 ? void 0 : desktopSharingResolution.width) === null || _e === void 0 ? void 0 : _e.max) !== null && _f !== void 0 ? _f : window.screen.width,
                                maxHeight: (_h = (_g = desktopSharingResolution === null || desktopSharingResolution === void 0 ? void 0 : desktopSharingResolution.height) === null || _g === void 0 ? void 0 : _g.max) !== null && _h !== void 0 ? _h : window.screen.height
                            }
                        }
                    };
                    // We have to use the old API on Electron to get a desktop stream.
                    navigator.mediaDevices.getUserMedia(constraints)
                        .then(stream => {
                        this.setContentHint(stream);
                        onSuccess({
                            stream,
                            sourceId: streamId,
                            sourceType: streamType
                        });
                    })
                        .catch(err => onFailure(err));
                }
                else {
                    // As noted in Chrome Desktop Capture API:
                    // If user didn't select any source (i.e. canceled the prompt)
                    // then the callback is called with an empty streamId.
                    onFailure(new JitsiTrackError(JitsiTrackErrors.SCREENSHARING_USER_CANCELED));
                }
            }, err => onFailure(new JitsiTrackError(JitsiTrackErrors.ELECTRON_DESKTOP_PICKER_ERROR, err)));
        }
        else {
            onFailure(new JitsiTrackError(JitsiTrackErrors.ELECTRON_DESKTOP_PICKER_NOT_FOUND));
        }
    },
    /**
     * Obtains a screen capture stream using getDisplayMedia.
     *
     * @param callback - The success callback.
     * @param errorCallback - The error callback.
     */
    obtainScreenFromGetDisplayMedia(callback, errorCallback) {
        let getDisplayMedia;
        if (navigator.getDisplayMedia) {
            getDisplayMedia = navigator.getDisplayMedia.bind(navigator);
        }
        else {
            // eslint-disable-next-line max-len
            getDisplayMedia = navigator.mediaDevices.getDisplayMedia.bind(navigator.mediaDevices);
        }
        const audio = this._getAudioConstraints();
        let video = {};
        const { desktopSharingFrameRate } = this.options;
        if (typeof desktopSharingFrameRate === 'object') {
            video.frameRate = desktopSharingFrameRate;
        }
        // At the time of this writing 'min' constraint for fps is not supported by getDisplayMedia on any of the
        // browsers. getDisplayMedia will fail with an error "invalid constraints" in this case.
        video.frameRate && delete video.frameRate.min;
        if (browser.isChromiumBased()) {
            // Allow users to seamlessly switch which tab they are sharing without having to select the tab again.
            browser.isVersionGreaterThan(106) && (video.surfaceSwitching = 'include');
            // Set bogus resolution constraints to work around
            // https://bugs.chromium.org/p/chromium/issues/detail?id=1056311 for low fps screenshare. Capturing SS at
            // very high resolutions restricts the framerate. Therefore, skip this hack when capture fps > 5 fps.
            if (!((desktopSharingFrameRate === null || desktopSharingFrameRate === void 0 ? void 0 : desktopSharingFrameRate.max) > SS_DEFAULT_FRAME_RATE)) {
                video.height = 99999;
                video.width = 99999;
            }
        }
        if (Object.keys(video).length === 0) {
            video = true;
        }
        const constraints = {
            video,
            audio,
            cursor: 'always'
        };
        logger.info('Using getDisplayMedia for screen sharing', constraints);
        getDisplayMedia(constraints)
            .then(stream => {
            this.setContentHint(stream);
            callback({
                stream,
                sourceId: stream.id
            });
        })
            .catch(error => {
            const errorDetails = {
                errorName: error && error.name,
                errorMsg: error && error.message,
                errorStack: error && error.stack
            };
            logger.error('getDisplayMedia error', constraints, errorDetails);
            if (errorDetails.errorMsg && errorDetails.errorMsg.indexOf('denied by system') !== -1) {
                // On Chrome this is the only thing different between error returned when user cancels
                // and when no permission was given on the OS level.
                errorCallback(new JitsiTrackError(JitsiTrackErrors.PERMISSION_DENIED));
                return;
            }
            errorCallback(new JitsiTrackError(JitsiTrackErrors.SCREENSHARING_USER_CANCELED));
        });
    },
    /**
     * Obtains a screen capture stream using getDisplayMedia.
     *
     * @param callback - The success callback.
     * @param errorCallback - The error callback.
     */
    obtainScreenFromGetDisplayMediaRN(callback, errorCallback) {
        logger.info('Using getDisplayMedia for screen sharing');
        navigator.mediaDevices.getDisplayMedia({ video: true })
            .then(stream => {
            this.setContentHint(stream);
            callback({
                stream,
                sourceId: stream.id
            });
        })
            .catch(() => {
            errorCallback(new JitsiTrackError(JitsiTrackErrors
                .SCREENSHARING_USER_CANCELED));
        });
    },
    /** Sets the contentHint on the transmitted MediaStreamTrack to indicate charaterstics in the video stream, which
     * informs RTCPeerConnection on how to encode the track (to prefer motion or individual frame detail).
     *
     * @param {MediaStream} stream - The captured desktop stream.
     * @returns {void}
     */
    setContentHint(stream) {
        const { desktopSharingFrameRate } = this.options;
        const desktopTrack = stream.getVideoTracks()[0];
        // Set contentHint on the desktop track based on the fps requested.
        if ('contentHint' in desktopTrack) {
            desktopTrack.contentHint = (desktopSharingFrameRate === null || desktopSharingFrameRate === void 0 ? void 0 : desktopSharingFrameRate.max) > SS_DEFAULT_FRAME_RATE ? 'motion' : 'detail';
        }
        else {
            logger.warn('MediaStreamTrack contentHint attribute not supported');
        }
    },
    /**
     * Sets the max frame rate to be used for a desktop track capture.
     *
     * @param {number} maxFps capture frame rate to be used for desktop tracks.
     * @returns {void}
     */
    setDesktopSharingFrameRate(maxFps) {
        logger.info(`Setting the desktop capture rate to ${maxFps}`);
        this.options.desktopSharingFrameRate = {
            min: SS_DEFAULT_FRAME_RATE,
            max: maxFps
        };
    }
};
export default ScreenObtainer;