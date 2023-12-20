var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getLogger } from '@jitsi/logger';
import { MediaType } from '../../service/RTC/MediaType';
import * as StatisticsEvents from '../../service/statistics/Events';
import browser from '../browser';
import FeatureFlags from '../flags/FeatureFlags';
import WebRTCMetrics from "webrtcmetrics";
const metrics = new WebRTCMetrics();
const logger = getLogger(__filename);
let lastUpdatedData = { upload: 0, download: 0, audio: { upload: 0, download: 0 }, video: { audio: 0, video: 0 } };
let authToken;
let pricingServiceUrl;
let roomName;
let userControls = {};
let isDev;
/**
 * Calculates packet lost percent using the number of lost packets and the
 * number of all packet.
 * @param lostPackets the number of lost packets
 * @param totalPackets the number of all packets.
 * @returns {number} packet loss percent
 */
function calculatePacketLoss(lostPackets, totalPackets) {
    if (lostPackets > 0 && totalPackets > 0) {
        return Math.round(lostPackets / totalPackets * 100);
    }
    return 0;
}
/**
 * Holds "statistics" for a single SSRC.
 * @constructor
 */
function SsrcStats() {
    this.loss = {};
    this.bitrate = {
        download: 0,
        upload: 0
    };
    this.resolution = {};
    this.framerate = 0;
    this.codec = '';
}
/**
 * Sets the "loss" object.
 * @param loss the value to set.
 */
SsrcStats.prototype.setLoss = function (loss) {
    this.loss = loss || {};
};
/**
 * Sets resolution that belong to the ssrc represented by this instance.
 * @param resolution new resolution value to be set.
 */
SsrcStats.prototype.setResolution = function (resolution) {
    this.resolution = resolution || {};
};
/**
 * Adds the "download" and "upload" fields from the "bitrate" parameter to
 * the respective fields of the "bitrate" field of this object.
 * @param bitrate an object holding the values to add.
 */
SsrcStats.prototype.addBitrate = function (bitrate) {
    this.bitrate.download += bitrate.download;
    this.bitrate.upload += bitrate.upload;
};
/**
 * Resets the bit rate for given <tt>ssrc</tt> that belong to the peer
 * represented by this instance.
 */
SsrcStats.prototype.resetBitrate = function () {
    this.bitrate.download = 0;
    this.bitrate.upload = 0;
};
/**
 * Sets the "framerate".
 * @param framerate the value to set.
 */
SsrcStats.prototype.setFramerate = function (framerate) {
    this.framerate = framerate || 0;
};
SsrcStats.prototype.setCodec = function (codec) {
    this.codec = codec || '';
};
/**
 *
 */
function ConferenceStats() {
    /**
     * The bandwidth
     * @type {{}}
     */
    this.bandwidth = {};
    /**
     * The bit rate
     * @type {{}}
     */
    this.bitrate = {};
    /**
     * The packet loss rate
     * @type {{}}
     */
    this.packetLoss = null;
    /**
     * Array with the transport information.
     * @type {Array}
     */
    this.transport = [];
}
/* eslint-disable max-params */
/**
 * <tt>StatsCollector</tt> registers for stats updates of given
 * <tt>peerconnection</tt> in given <tt>interval</tt>. On each update particular
 * stats are extracted and put in {@link SsrcStats} objects. Once the processing
 * is done <tt>audioLevelsUpdateCallback</tt> is called with <tt>this</tt>
 * instance as an event source.
 *
 * @param peerconnection WebRTC PeerConnection object.
 * @param audioLevelsInterval
 * @param statsInterval stats refresh interval given in ms.
 * @param eventEmitter
 * @constructor
 */
export default function StatsCollector(peerconnection, audioLevelsInterval, statsInterval, eventEmitter) {
    try {
        authToken = peerconnection.rtc.conference.options.connection.token;
        isDev = peerconnection.rtc.conference.options.connection.isDev;
        roomName = peerconnection.rtc.conference.options.connection.name;
        pricingServiceUrl = isDev ? `https://api.dev.sariska.io/api/v1/pricing/room/` : `https://api.sariska.io/api/v1/pricing/room/`;
    }
    catch (e) { }
    this.peerconnection = peerconnection;
    this.currentStatsReport = null;
    this.previousStatsReport = null;
    this.audioLevelReportHistory = {};
    this.audioLevelsIntervalId = null;
    this.eventEmitter = eventEmitter;
    this.conferenceStats = new ConferenceStats();
    // Updates stats interval
    this.audioLevelsIntervalMilis = audioLevelsInterval;
    this.speakerList = [];
    this.statsIntervalId = null;
    this.statsIntervalMilis = statsInterval;
    /**
     * Maps SSRC numbers to {@link SsrcStats}.
     * @type {Map<number,SsrcStats}
     */
    this.ssrc2stats = new Map();
}
/**
 * Set the list of the remote speakers for which audio levels are to be calculated.
 *
 * @param {Array<string>} speakerList - Endpoint ids.
 * @returns {void}
 */
StatsCollector.prototype.setSpeakerList = function (speakerList) {
    this.speakerList = speakerList;
};
/**
 * Stops stats updates.
 */
StatsCollector.prototype.stop = function () {
    if (this.audioLevelsIntervalId) {
        clearInterval(this.audioLevelsIntervalId);
        this.audioLevelsIntervalId = null;
    }
    if (this.statsIntervalId) {
        clearInterval(this.statsIntervalId);
        this.statsIntervalId = null;
    }
};
/**
 * Callback passed to <tt>getStats</tt> method.
 * @param error an error that occurred on <tt>getStats</tt> call.
 */
StatsCollector.prototype.errorCallback = function (error) {
    logger.error('Get stats error', error);
    this.stop();
};
/**
 * Starts stats updates.
 */
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
function postDataToPricingService(authToken, roomName, payload, userControls, pricingServiceUrl) {
    let meeting_id = isDev ? `${roomName}@muc.dev.sariska.io` : `${roomName}@muc.sariska.io`;
    console.log("meeting id" + meeting_id);
    let url = pricingServiceUrl + meeting_id + "/usage";
    console.log("url" + url);
    let decodedToken = parseJwt(authToken);
    console.log("decoded token" + decodedToken);
    let owner_id = parseInt(decodedToken.context.group);
    let user_id = decodedToken.context.user.id;
    let app_id = decodedToken.sub;
    console.log("idss" + owner_id + " " + user_id + " " + app_id);
    const api_payload = {
        user_id: user_id,
        meetingId: meeting_id,
        usage_type: 'MEDIA',
        usage_payload: payload,
        owner_id: owner_id,
        app_id: app_id,
    };
    const headers = {
        "Authorization": "Bearer " + authToken,
        "Content-Type": "application/json"
    };
    // Make the POST request using the fetch API
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(api_payload)
    }).
        then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
        setResponse(data);
    })
        .catch((error) => {
        console.error('Error:', error);
    });
}
function calculateBitrates(pc) {
    const probe = metrics.createProbe(pc.peerconnection, {
        pname: 'PeerConnection_1',
        passthrough: { "outbound-rtp": ["ps:bytesSent.kbits"], "inbound-rtp": ["ps:bytesReceived.kbits"] }
    });
    probe.onreport = (report) => {
        let bitrate = {};
        let audioUpload = 0;
        let audioDownload = 0;
        let videoUpload = 0;
        let videoDownload = 0;
        let isAudioMuted = false;
        let isVideoMuted = false;
        let isScreenSharing = false;
        Object.keys(report.audio).forEach((source) => {
            const value = report.audio[source];
            if (value.direction === "outbound") {
                if (value.level_out === 0) {
                    isAudioMuted = true;
                }
                else {
                    isAudioMuted = false;
                }
            }
        });
        let totalVideoSources = [];
        Object.keys(report.video).forEach((source) => {
            const value = report.video[source];
            if (value.direction === "outbound") {
                totalVideoSources.push(value);
            }
        });
        if (totalVideoSources[0] && totalVideoSources[0].active_out === false) {
            isVideoMuted = true;
        }
        else if (totalVideoSources[0] && totalVideoSources[0].active_out === true) {
            isVideoMuted = false;
        }
        if (totalVideoSources[1] && totalVideoSources[1].active_out === false) {
            isScreenSharing = false;
        }
        else if (totalVideoSources[1] && totalVideoSources[1].active_out === true) {
            isScreenSharing = true;
        }
        if (Object.keys(report.passthrough).length) {
            Object.keys(report.passthrough.bytesReceived).forEach((key) => {
                const value = report.passthrough.bytesReceived[key];
                if (key.indexOf("audio") >= 0) {
                    audioDownload = value + audioDownload;
                }
                if (key.indexOf("video") >= 0) {
                    videoDownload = value + videoDownload;
                }
            });
            Object.keys(report.passthrough.bytesSent).forEach((key) => {
                const value = report.passthrough.bytesSent[key];
                if (key.indexOf("audio") >= 0) {
                    audioUpload = value + audioUpload;
                }
                if (key.indexOf("video") >= 0) {
                    videoUpload = value + videoUpload;
                }
            });
        }
        bitrate.upload = Math.round(audioUpload + videoUpload);
        bitrate.download = Math.round(audioDownload + videoDownload);
        bitrate.audio = {
            upload: Math.round(audioUpload),
            download: Math.round(audioDownload)
        };
        bitrate.video = {
            upload: Math.round(videoUpload),
            download: Math.round(videoDownload)
        };
        lastUpdatedData = bitrate;
        userControls = { isAudioMuted, isVideoMuted, isScreenSharing };
    };
    metrics.startAllProbes();
}
StatsCollector.prototype.start = function (startAudioLevelStats) {
    if (startAudioLevelStats && browser.supportsReceiverStats()) {
        this.audioLevelsIntervalId = setInterval(() => {
            const audioLevels = this.peerconnection.getAudioLevels(this.speakerList);
            for (const ssrc in audioLevels) {
                if (audioLevels.hasOwnProperty(ssrc)) {
                    // Use a scaling factor of 2.5 to report the same audio levels that getStats reports.
                    const audioLevel = audioLevels[ssrc] * 2.5;
                    this.eventEmitter.emit(StatisticsEvents.AUDIO_LEVEL, this.peerconnection, Number.parseInt(ssrc, 10), audioLevel, false /* isLocal */);
                }
            }
        }, this.audioLevelsIntervalMilis);
    }
    const processStats = () => {
        // Interval updates
        this.peerconnection.getStats()
            .then(report => {
            this.currentStatsReport = typeof (report === null || report === void 0 ? void 0 : report.result) === 'function'
                ? report.result()
                : report;
            try {
                this.processStatsReport();
            }
            catch (error) {
                logger.error('Processing of RTP stats failed:', error);
            }
            this.previousStatsReport = this.currentStatsReport;
        })
            .catch(error => this.errorCallback(error));
    };
    calculateBitrates(this.peerconnection);
    processStats();
    this.statsIntervalId = setInterval(processStats, this.statsIntervalMilis);
};
/**
 *
 */
StatsCollector.prototype._processAndEmitReport = function () {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        // process stats
        const totalPackets = {
            download: 0,
            upload: 0
        };
        const lostPackets = {
            download: 0,
            upload: 0
        };
        let bitrateDownload = 0;
        let bitrateUpload = 0;
        const resolutions = {};
        const framerates = {};
        const codecs = {};
        let audioBitrateDownload = 0;
        let audioBitrateUpload = 0;
        let videoBitrateDownload = 0;
        let videoBitrateUpload = 0;
        for (const [ssrc, ssrcStats] of this.ssrc2stats) {
            // process packet loss stats
            const loss = ssrcStats.loss;
            const type = loss.isDownloadStream ? 'download' : 'upload';
            totalPackets[type] += loss.packetsTotal;
            lostPackets[type] += loss.packetsLost;
            // process bitrate stats
            bitrateDownload += ssrcStats.bitrate.download;
            bitrateUpload += ssrcStats.bitrate.upload;
            ssrcStats.resetBitrate();
            // collect resolutions and framerates
            const track = this.peerconnection.getTrackBySSRC(ssrc);
            if (!track) {
                continue; // eslint-disable-line no-continue
            }
            let audioCodec;
            let videoCodec;
            if (track.isAudioTrack()) {
                audioBitrateDownload += ssrcStats.bitrate.download;
                audioBitrateUpload += ssrcStats.bitrate.upload;
                audioCodec = ssrcStats.codec;
            }
            else {
                videoBitrateDownload += ssrcStats.bitrate.download;
                videoBitrateUpload += ssrcStats.bitrate.upload;
                videoCodec = ssrcStats.codec;
            }
            const participantId = track.getParticipantId();
            if (!participantId) {
                // All tracks in ssrc-rewriting mode need not have a participant associated with it.
                if (!FeatureFlags.isSsrcRewritingSupported()) {
                    logger.error(`No participant ID returned by ${track}`);
                }
                continue; // eslint-disable-line no-continue
            }
            const userCodecs = (_a = codecs[participantId]) !== null && _a !== void 0 ? _a : {};
            userCodecs[ssrc] = {
                audio: audioCodec,
                video: videoCodec
            };
            codecs[participantId] = userCodecs;
            const { resolution } = ssrcStats;
            if (!track.isVideoTrack()
                || isNaN(resolution === null || resolution === void 0 ? void 0 : resolution.height)
                || isNaN(resolution === null || resolution === void 0 ? void 0 : resolution.width)
                || resolution.height === -1
                || resolution.width === -1) {
                continue; // eslint-disable-line no-continue
            }
            const userResolutions = resolutions[participantId] || {};
            // If simulcast (VP8) is used, there will be 3 "outbound-rtp" streams with different resolutions and 3
            // different SSRCs. Based on the requested resolution and the current cpu and available bandwidth
            // values, some of the streams might get suspended. Therefore the actual send resolution needs to be
            // calculated based on the outbound-rtp streams that are currently active for the simulcast case.
            // However for the SVC case, there will be only 1 "outbound-rtp" stream which will have the correct
            // send resolution width and height.
            if (track.isLocal() && !browser.supportsTrackBasedStats() && this.peerconnection.doesTrueSimulcast()) {
                const localSsrcs = this.peerconnection.getLocalVideoSSRCs(track);
                for (const localSsrc of localSsrcs) {
                    const ssrcResolution = (_b = this.ssrc2stats.get(localSsrc)) === null || _b === void 0 ? void 0 : _b.resolution;
                    // The code processes resolution stats only for 'outbound-rtp' streams that are currently active.
                    if ((ssrcResolution === null || ssrcResolution === void 0 ? void 0 : ssrcResolution.height) && (ssrcResolution === null || ssrcResolution === void 0 ? void 0 : ssrcResolution.width)) {
                        resolution.height = Math.max(resolution.height, ssrcResolution.height);
                        resolution.width = Math.max(resolution.width, ssrcResolution.width);
                    }
                }
            }
            userResolutions[ssrc] = resolution;
            resolutions[participantId] = userResolutions;
            if (ssrcStats.framerate > 0) {
                const userFramerates = framerates[participantId] || {};
                userFramerates[ssrc] = ssrcStats.framerate;
                framerates[participantId] = userFramerates;
            }
        }
        this.conferenceStats.bitrate = {
            upload: bitrateUpload,
            download: bitrateDownload
        };
        this.conferenceStats.bitrate.audio = {
            upload: audioBitrateUpload,
            download: audioBitrateDownload
        };
        this.conferenceStats.bitrate.video = {
            upload: videoBitrateUpload,
            download: videoBitrateDownload
        };
        this.conferenceStats.packetLoss = {
            total: calculatePacketLoss(lostPackets.download + lostPackets.upload, totalPackets.download + totalPackets.upload),
            download: calculatePacketLoss(lostPackets.download, totalPackets.download),
            upload: calculatePacketLoss(lostPackets.upload, totalPackets.upload)
        };
        const avgAudioLevels = {};
        let localAvgAudioLevels;
        Object.keys(this.audioLevelReportHistory).forEach(ssrc => {
            const { data, isLocal } = this.audioLevelReportHistory[ssrc];
            const avgAudioLevel = data.reduce((sum, currentValue) => sum + currentValue) / data.length;
            if (isLocal) {
                localAvgAudioLevels = avgAudioLevel;
            }
            else {
                const track = this.peerconnection.getTrackBySSRC(Number(ssrc));
                if (track) {
                    const participantId = track.getParticipantId();
                    if (participantId) {
                        avgAudioLevels[participantId] = avgAudioLevel;
                    }
                }
            }
        });
        this.audioLevelReportHistory = {};
        // Where the Usage stat is called
        postDataToPricingService(authToken, roomName, lastUpdatedData, userControls, pricingServiceUrl);
        this.eventEmitter.emit(StatisticsEvents.CONNECTION_STATS, this.peerconnection, {
            bandwidth: this.conferenceStats.bandwidth,
            bitrate: this.conferenceStats.bitrate,
            packetLoss: this.conferenceStats.packetLoss,
            resolution: resolutions,
            framerate: framerates,
            codec: codecs,
            transport: this.conferenceStats.transport,
            localAvgAudioLevels,
            avgAudioLevels
        });
        this.conferenceStats.transport = [];
    });
};
/**
 * Converts the value to a non-negative number.
 * If the value is either invalid or negative then 0 will be returned.
 * @param {*} v
 * @return {number}
 * @private
 */
StatsCollector.prototype.getNonNegativeValue = function (v) {
    let value = v;
    if (typeof value !== 'number') {
        value = Number(value);
    }
    if (isNaN(value)) {
        return 0;
    }
    return Math.max(0, value);
};
/**
 * Calculates bitrate between before and now using a supplied field name and its
 * value in the stats.
 * @param {RTCInboundRtpStreamStats|RTCSentRtpStreamStats} now the current stats
 * @param {RTCInboundRtpStreamStats|RTCSentRtpStreamStats} before the
 * previous stats.
 * @param fieldName the field to use for calculations.
 * @return {number} the calculated bitrate between now and before.
 * @private
 */
StatsCollector.prototype._calculateBitrate = function (now, before, fieldName) {
    const bytesNow = this.getNonNegativeValue(now[fieldName]);
    const bytesBefore = this.getNonNegativeValue(before[fieldName]);
    const bytesProcessed = Math.max(0, bytesNow - bytesBefore);
    const timeMs = now.timestamp - before.timestamp;
    let bitrateKbps = 0;
    if (timeMs > 0) {
        // TODO is there any reason to round here?
        bitrateKbps = Math.round((bytesProcessed * 8) / timeMs);
    }
    return bitrateKbps;
};
/**
 * Calculates the frames per second rate between before and now using a supplied field name and its value in stats.
 * @param {RTCOutboundRtpStreamStats|RTCSentRtpStreamStats} now the current stats
 * @param {RTCOutboundRtpStreamStats|RTCSentRtpStreamStats} before the previous stats
 * @param {string} fieldName the field to use for calculations.
 * @returns {number} the calculated frame rate between now and before.
 */
StatsCollector.prototype._calculateFps = function (now, before, fieldName) {
    const timeMs = now.timestamp - before.timestamp;
    let frameRate = 0;
    if (timeMs > 0 && now[fieldName]) {
        const numberOfFramesSinceBefore = now[fieldName] - before[fieldName];
        frameRate = (numberOfFramesSinceBefore / timeMs) * 1000;
    }
    return frameRate;
};
/**
 * Stats processing for spec-compliant RTCPeerConnection#getStats.
 */
StatsCollector.prototype.processStatsReport = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const byteSentStats = {};
        this.currentStatsReport.forEach(now => {
            var _a;
            const before = this.previousStatsReport ? this.previousStatsReport.get(now.id) : null;
            // RTCIceCandidatePairStats - https://w3c.github.io/webrtc-stats/#candidatepair-dict*
            if (now.type === 'candidate-pair' && now.nominated && now.state === 'succeeded') {
                const availableIncomingBitrate = now.availableIncomingBitrate;
                const availableOutgoingBitrate = now.availableOutgoingBitrate;
                if (availableIncomingBitrate || availableOutgoingBitrate) {
                    this.conferenceStats.bandwidth = {
                        'download': Math.round(availableIncomingBitrate / 1000),
                        'upload': Math.round(availableOutgoingBitrate / 1000)
                    };
                }
                const remoteUsedCandidate = this.currentStatsReport.get(now.remoteCandidateId);
                const localUsedCandidate = this.currentStatsReport.get(now.localCandidateId);
                // RTCIceCandidateStats
                // https://w3c.github.io/webrtc-stats/#icecandidate-dict*
                if (remoteUsedCandidate && localUsedCandidate) {
                    const remoteIpAddress = browser.isChromiumBased()
                        ? remoteUsedCandidate.ip
                        : remoteUsedCandidate.address;
                    const remotePort = remoteUsedCandidate.port;
                    const ip = `${remoteIpAddress}:${remotePort}`;
                    const localIpAddress = browser.isChromiumBased()
                        ? localUsedCandidate.ip
                        : localUsedCandidate.address;
                    const localPort = localUsedCandidate.port;
                    const localip = `${localIpAddress}:${localPort}`;
                    const type = remoteUsedCandidate.protocol;
                    // Save the address unless it has been saved already.
                    const conferenceStatsTransport = this.conferenceStats.transport;
                    if (!conferenceStatsTransport.some(t => t.ip === ip
                        && t.type === type
                        && t.localip === localip)) {
                        conferenceStatsTransport.push({
                            ip,
                            type,
                            localip,
                            p2p: this.peerconnection.isP2P,
                            localCandidateType: localUsedCandidate.candidateType,
                            remoteCandidateType: remoteUsedCandidate.candidateType,
                            networkType: localUsedCandidate.networkType,
                            rtt: now.currentRoundTripTime * 1000
                        });
                    }
                }
                // RTCReceivedRtpStreamStats
                // https://w3c.github.io/webrtc-stats/#receivedrtpstats-dict*
                // RTCSentRtpStreamStats
                // https://w3c.github.io/webrtc-stats/#sentrtpstats-dict*
            }
            else if (now.type === 'inbound-rtp' || now.type === 'outbound-rtp') {
                const ssrc = this.getNonNegativeValue(now.ssrc);
                if (!ssrc) {
                    return;
                }
                let ssrcStats = this.ssrc2stats.get(ssrc);
                if (!ssrcStats) {
                    ssrcStats = new SsrcStats();
                    this.ssrc2stats.set(ssrc, ssrcStats);
                }
                let isDownloadStream = true;
                let key = 'packetsReceived';
                if (now.type === 'outbound-rtp') {
                    isDownloadStream = false;
                    key = 'packetsSent';
                }
                let packetsNow = now[key];
                if (!packetsNow || packetsNow < 0) {
                    packetsNow = 0;
                }
                if (before) {
                    const packetsBefore = this.getNonNegativeValue(before[key]);
                    const packetsDiff = Math.max(0, packetsNow - packetsBefore);
                    const packetsLostNow = this.getNonNegativeValue(now.packetsLost);
                    const packetsLostBefore = this.getNonNegativeValue(before.packetsLost);
                    const packetsLostDiff = Math.max(0, packetsLostNow - packetsLostBefore);
                    ssrcStats.setLoss({
                        packetsTotal: packetsDiff + packetsLostDiff,
                        packetsLost: packetsLostDiff,
                        isDownloadStream
                    });
                }
                let resolution;
                // Process the stats for 'inbound-rtp' streams always and 'outbound-rtp' only if the browser is
                // Chromium based and version 112 and later since 'track' based stats are no longer available there
                // for calculating send resolution and frame rate.
                if (typeof now.frameHeight !== 'undefined' && typeof now.frameWidth !== 'undefined') {
                    // Assume the stream is active if the field is missing in the stats(Firefox)
                    const isStreamActive = (_a = now.active) !== null && _a !== void 0 ? _a : true;
                    if (now.type === 'inbound-rtp' || (!browser.supportsTrackBasedStats() && isStreamActive)) {
                        resolution = {
                            height: now.frameHeight,
                            width: now.frameWidth
                        };
                    }
                }
                ssrcStats.setResolution(resolution);
                let frameRate = now.framesPerSecond;
                if (!frameRate && before) {
                    frameRate = this._calculateFps(now, before, 'framesSent');
                }
                ssrcStats.setFramerate(Math.round(frameRate || 0));
                if (now.type === 'inbound-rtp' && before) {
                    ssrcStats.addBitrate({
                        'download': this._calculateBitrate(now, before, 'bytesReceived'),
                        'upload': 0
                    });
                }
                else if (before) {
                    byteSentStats[ssrc] = this.getNonNegativeValue(now.bytesSent);
                    ssrcStats.addBitrate({
                        'download': 0,
                        'upload': this._calculateBitrate(now, before, 'bytesSent')
                    });
                }
                const codec = this.currentStatsReport.get(now.codecId);
                if (codec) {
                    /**
                     * The mime type has the following form: video/VP8 or audio/ISAC,
                     * so we what to keep just the type after the '/', audio and video
                     * keys will be added on the processing side.
                     */
                    const codecShortType = codec.mimeType.split('/')[1];
                    codecShortType && ssrcStats.setCodec(codecShortType);
                }
                // Continue to use the 'track' based stats for Firefox and Safari and older versions of Chromium.
            }
            else if (browser.supportsTrackBasedStats()
                && now.type === 'track'
                && now.kind === MediaType.VIDEO
                && !now.remoteSource) {
                const resolution = {
                    height: now.frameHeight,
                    width: now.frameWidth
                };
                const localVideoTracks = this.peerconnection.getLocalTracks(MediaType.VIDEO);
                if (!(localVideoTracks === null || localVideoTracks === void 0 ? void 0 : localVideoTracks.length)) {
                    return;
                }
                const ssrc = this.peerconnection.getSsrcByTrackId(now.trackIdentifier);
                if (!ssrc) {
                    return;
                }
                let ssrcStats = this.ssrc2stats.get(ssrc);
                if (!ssrcStats) {
                    ssrcStats = new SsrcStats();
                    this.ssrc2stats.set(ssrc, ssrcStats);
                }
                if (resolution.height && resolution.width) {
                    ssrcStats.setResolution(resolution);
                }
                // Calculate the frame rate. 'framesSent' is the total aggregate value for all the simulcast streams.
                // Therefore, it needs to be divided by the total number of active simulcast streams.
                let frameRate = now.framesPerSecond;
                if (!frameRate && before) {
                    frameRate = this._calculateFps(now, before, 'framesSent');
                }
                ssrcStats.setFramerate(frameRate);
            }
        });
        if (Object.keys(byteSentStats).length) {
            this.eventEmitter.emit(StatisticsEvents.BYTE_SENT_STATS, this.peerconnection, byteSentStats);
        }
        this._processAndEmitReport();
    });
};
