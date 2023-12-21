// enable/disable different features by changing this configuration file
export const initSDKConfig = {
    disableAudioLevels: false,
    flags: {
        sendMultipleVideoStreams: true,
        sourceNameSignaling: true,
        enableJoinAsVisitor: true,
        receiveMultipleVideoStreams: true
    }
    // useIPv6 - boolean property
    // disableSimulcast: true //boolean property. Enables/disables simulcast.
    // enableWindowOnErrorHandler - boolean property (default false). Enables/disables attaching global onerror handler (window.onerror).
    // disableThirdPartyRequests - if true - callstats will be disabled and the callstats API won't be included.
    // enableAnalyticsLogging - boolean property (default false). Enables/disables analytics logging.
    // externalStorage - Object that implements the Storage interface. If specified this object will be used for storing data instead of localStorage.
    // callStatsCustomScriptUrl - (optional) custom url to access callstats client script
    // disableRtx - (optional) boolean property (default to false). Enables/disable the use of RTX.
    // disabledCodec - the mime type of the code that should not be negotiated on the peerconnection.
    // preferredCodec the mime type of the codec that needs to be made the preferred codec for the connection.
};

export const connectionConfig = {
    hosts: {
        domain: 'sariska.io',
        muc: 'muc.sariska.io'
    },
    serviceUrl: 'wss://api.sariska.io/api/v1/media/websocket',
    clientNode: 'https://www.sariska.io',
    bridgeChannel: {
        // If the backend advertises multiple colibri websockets, this options allows
        // to filter some of them out based on the domain name. We use the first URL
        // which does not match ignoreDomain, falling back to the first one that matches
        // ignoreDomain. Has no effect if undefined.
        // ignoreDomain: 'example.com',

        // Prefer SCTP (WebRTC data channels over the media path) over a colibri websocket.
        // If SCTP is available in the backend it will be used instead of a WS. Defaults to
        // false (SCTP is used only if available and no WS are available).
        preferSctp: false
    },
    // enableLipSync - (optional) boolean property which enables the lipsync feature. Currently works only in Chrome and is disabled by default.
};


export const devConnectionConfig = {
    hosts: {
        domain: 'dev.sariska.io',
        muc: 'muc.dev.sariska.io'
    },
    serviceUrl: 'wss://api.dev.sariska.io/api/v1/media/websocket',
    clientNode: 'https://www.sariska.io',
    // enableLipSync - (optional) boolean property which enables the lipsync feature. Currently works only in Chrome and is disabled by default.
};


export const conferenceConfig = {
    enableLocalRecording: true,
    enableVirtualBackground: false,
    enableNoiseCancellation: false,
    enableTalkWhileMuted: true,
    enableNoAudioDetection: true,
    enableNoisyMicDetection: true,
    createVADProcessor: true,
    //- Enables/disables bridge channel. Values can be "datachannel", "websocket", true (treat it as "datachannel"), undefined (treat it as "datachannel") and false (don't open any channel). NOTE: we recommend to set that option to true
    // recordingType - the type of recording to be used
    // callStatsID - callstats credentials
    // callStatsSecret - callstats credentials
    // enableTalkWhileMuted - boolean property. Enables/disables talk while muted detection, by default the value is false/disabled.
    // ignoreStartMuted - ignores start muted events coming from jicofo.
    // startSilent - enables silent mode, will mark audio as inactive will not send/receive audio
    // confID - Used for statistics to identify conference, if tenants are supported will contain tenant and the non lower case variant for the room name.
    // siteID - (optional) Used for statistics to identify the site where the user is coming from, if tenants are supported it will contain a unique identifier for that tenant. If not provided, the value will be infered from confID
    // statisticsId - The id to be used as stats instead of default callStatsUsername.
    // statisticsDisplayName - The display name to be used for stats, used for callstats.
    // focusUserJid - The real JID of focus participant - can be overridden here
    // enableNoAudioDetection
    // enableNoisyMicDetection
    // enableRemb
    // enableTcc
    // useRoomAsSharedDocumentName
    // channelLastN
    // startBitrate
    // stereo
    // forceJVB121Ratio - "Math.random() < forceJVB121Ratio" will determine whether a 2 people conference should be moved to the JVB instead of P2P. The decision is made on the responder side, after ICE succeeds on the P2P connection.
    hiddenDomain: "recorder.sariska.io",
    // startAudioMuted
    // startVideoMuted
    enableLayerSuspension: true, // - if set to 'true', we will cap the video send bitrate when we are told we have not been selected by any endpoints (and therefore the non-thumbnail streams are not in use).
    // deploymentInfo
    // shard
    // userRegion
    // rttMonitor
    // enabled
    // initialDelay
    // getStatsInterval
    // analyticsInterval
    // stunServers
    e2eping: {
        pingInterval: -1 // analyticsInterval: 60000,
    },
    analytics: {
        disabled: false,
        rtcstatsEnabled: true,
        watchRTCEnabled: false
        // In order to enable rtcstats one needs to provide a endpoint url.
        // rtcstatsEndpoint: wss://rtcstats-server-pilot.jitsi.net/,

        // The interval at which rtcstats will poll getStats, defaults to 1000ms.
        // If the value is set to 0 getStats won't be polled and the rtcstats client
        // will only send data related to RTCPeerConnection events.
        // rtcstatsPolIInterval: 1000,
    },
    // pingInterval
    // abTesting - A/B testing related options
    // enableSuspendVideoTest
    // testing
    // capScreenshareBitrate
    // p2pTestMode
    // octo
    // probability
    useStunTurn: true,
    watchRTCConfigParams: {
            /** Watchrtc api key */
            rtcApiKey: "79ff9ddf-3969-4b9d-97a6-b078230b2e05"
            // /** Identifier for the session */
            // rtcRoomId?: string;
            // /** Identifier for the current peer */
            // rtcPeerId?: string;
            // /**
            //  * ["tag1", "tag2", "tag3"]
            //  * @deprecated use 'keys' instead
            //  */
            // rtcTags?: string[];
            // /** { "key1": "value1", "key2": "value2"} */
            // keys?: any;
            // /** Enables additional logging */
            // debug?: boolean;
            // rtcToken?: string;
            // /**
            //  * @deprecated No longer needed. Use "proxyUrl" instead.
            //  */
            // wsUrl?: string;
            // proxyUrl?: string;
            // console?: {
            //     level: string;
            //     override: boolean;
            // };
            // allowBrowserLogCollection?: boolean;
            // collectionInterval?: number;
            // logGetStats?: boolean;
    },
    p2p: {
        useStunTurn: true,
            // Enables peer to peer mode. When enabled the system will try to
            // establish a direct connection when there are exactly 2 participants
            // in the room. If that succeeds the conference will stop sending data
            // through the JVB and use the peer to peer connection instead. When a
            // 3rd participant joins the conference will be moved back to the JVB
            // connection.
            enabled: true, // The STUN servers that will be used in the peer to peer connections
            stunServers: [
                { urls: 'stun:coturn.sariska.io:443' }
            ]
            // Sets the ICE transport policy for the p2p connection. At the time
            // of this writing the list of possible values are 'all' and 'relay',
            // but that is subject to change in the future. The enum is defined in
            // the WebRTC standard:
            // https://www.w3.org/TR/webrtc/#rtcicetransportpolicy-enum.
            // If not set, the effective value is 'all'.
            // iceTransportPolicy: 'all',
            // Provides a way to set the video codec preference on the p2p connection. Acceptable
            // codec values are 'VP8', 'VP9' and 'H264'.
            // preferredCodec: 'H264',
            // Provides a way to prevent a video codec from being negotiated on the p2p connection.
            // disabledCodec: '',
            // How long we're going to wait, before going back to P2P after the 3rd
            // participant has left the conference (to filter out page reload).
            // backToP2PDelay: 5
    }
};

// export type ToolbarButton = 'camera' |
//     'chat' |
//     'closedcaptions' |
//     'desktop' |
//     'download' |
//     'embedmeeting' |
//     'etherpad' |
//     'feedback' |
//     'filmstrip' |
//     'fullscreen' |
//     'hangup' |
//     'help' |
//     'highlight' |
//     'invite' |
//     'linktosalesforce' |
//     'livestreaming' |
//     'microphone' |
//     'mute-everyone' |
//     'mute-video-everyone' |
//     'noisesuppression' |
//     'participants-pane' |
//     'profile' |
//     'raisehand' |
//     'reactions' |
//     'recording' |
//     'security' |
//     'select-background' |
//     'settings' |
//     'shareaudio' |
//     'sharedvideo' |
//     'shortcuts' |
//     'stats' |
//     'tileview' |
//     'toggle-camera' |
//     'videoquality' |
//     'whiteboard' |
//     '__end';

// type ButtonsWithNotifyClick = 'camera' |
//     'chat' |
//     'closedcaptions' |
//     'desktop' |
//     'download' |
//     'embedmeeting' |
//     'end-meeting' |
//     'etherpad' |
//     'feedback' |
//     'filmstrip' |
//     'fullscreen' |
//     'hangup' |
//     'hangup-menu' |
//     'help' |
//     'invite' |
//     'livestreaming' |
//     'microphone' |
//     'mute-everyone' |
//     'mute-video-everyone' |
//     'participants-pane' |
//     'profile' |
//     'raisehand' |
//     'recording' |
//     'security' |
//     'select-background' |
//     'settings' |
//     'shareaudio' |
//     'sharedvideo' |
//     'shortcuts' |
//     'stats' |
//     'tileview' |
//     'toggle-camera' |
//     'videoquality' |
//     'add-passcode' |
//     '__end';

// type ParticipantMenuButtonsWithNotifyClick = 'allow-video' |
//     'ask-unmute' |
//     'conn-status' |
//     'flip-local-video' |
//     'grant-moderator' |
//     'hide-self-view' |
//     'kick' |
//     'mute' |
//     'mute-others' |
//     'mute-others-video' |
//     'mute-video' |
//     'pinToStage' |
//     'privateMessage' |
//     'remote-control' |
//     'send-participant-to-room' |
//     'verify';

// type NotifyClickButtonKey = string |
//     ButtonsWithNotifyClick |
//     ParticipantMenuButtonsWithNotifyClick;

// export type NotifyClickButton = NotifyClickButtonKey |
//     {
//         key: NotifyClickButtonKey;
//         preventExecution: boolean;
//     };

// export type Sounds = 'ASKED_TO_UNMUTE_SOUND' |
//     'E2EE_OFF_SOUND' |
//     'E2EE_ON_SOUND' |
//     'INCOMING_MSG_SOUND' |
//     'KNOCKING_PARTICIPANT_SOUND' |
//     'LIVE_STREAMING_OFF_SOUND' |
//     'LIVE_STREAMING_ON_SOUND' |
//     'NO_AUDIO_SIGNAL_SOUND' |
//     'NOISY_AUDIO_INPUT_SOUND' |
//     'OUTGOING_CALL_EXPIRED_SOUND' |
//     'OUTGOING_CALL_REJECTED_SOUND' |
//     'OUTGOING_CALL_RINGING_SOUND' |
//     'OUTGOING_CALL_START_SOUND' |
//     'PARTICIPANT_JOINED_SOUND' |
//     'PARTICIPANT_LEFT_SOUND' |
//     'RAISE_HAND_SOUND' |
//     'REACTION_SOUND' |
//     'RECORDING_OFF_SOUND' |
//     'RECORDING_ON_SOUND' |
//     'TALK_WHILE_MUTED_SOUND';


// export interface IMobileDynamicLink {
//     apn: string;
//     appCode: string;
//     customDomain?: string;
//     ibi: string;
//     isi: string;
// }

// export interface IDeeplinkingPlatformConfig {
//     appName: string;
// }

// export interface IDeeplinkingMobileConfig extends IDeeplinkingPlatformConfig {
//     appPackage?: string;
//     appScheme: string;
//     downloadLink: string;
//     dynamicLink?: IMobileDynamicLink;
//     fDroidUrl?: string;
// }

// export interface IDeeplinkingConfig {
//     android?: IDeeplinkingMobileConfig;
//     desktop?: IDeeplinkingPlatformConfig;
//     disabled?: boolean;
//     hideLogo?: boolean;
//     ios?: IDeeplinkingMobileConfig;
// }

// export interface INoiseSuppressionConfig {
//     krisp?: {
//         debugLogs?: boolean;
//         enabled?: boolean;
//         logProcessStats?: boolean;
//     };
// }

// export interface IWhiteboardConfig {
//     collabServerBaseUrl?: string;
//     enabled?: boolean;
//     limitUrl?: string;
//     userLimit?: number;
// }

// export interface IWatchRTCConfiguration {
//     allowBrowserLogCollection?: boolean;
//     collectionInterval?: number;
//     console?: {
//         level: string;
//         override: boolean;
//     };
//     debug?: boolean;
//     keys?: any;
//     logGetStats?: boolean;
//     proxyUrl?: string;
//     rtcApiKey: string;
//     rtcPeerId?: string;
//     rtcRoomId?: string;
//     rtcTags?: string[];
//     rtcToken?: string;
//     wsUrl?: string;
// }

// export interface IConfig {
//     _desktopSharingSourceDevice?: string;
//     _immediateReloadThreshold?: string;
//     _screenshotHistoryRegionUrl?: number;
//     analytics?: {
//         amplitudeAPPKey?: string;
//         amplitudeIncludeUTM?: boolean;
//         blackListedEvents?: string[];
//         disabled?: boolean;
//         googleAnalyticsTrackingId?: string;
//         matomoEndpoint?: string;
//         matomoSiteID?: string;
//         obfuscateRoomName?: boolean;
//         rtcstatsEnabled?: boolean;
//         rtcstatsEndpoint?: string;
//         rtcstatsPollInterval?: number;
//         rtcstatsSendSdp?: boolean;
//         rtcstatsStoreLogs?: boolean;
//         rtcstatsUseLegacy?: boolean;
//         scriptURLs?: Array<string>;
//         watchRTCEnabled?: boolean;
//         whiteListedEvents?: string[];
//     };
//     apiLogLevels?: Array<'warn' | 'log' | 'error' | 'info' | 'debug'>;
//     appId?: string;
//     audioLevelsInterval?: number;
//     audioQuality?: {
//         opusMaxAverageBitrate?: number | null;
//         stereo?: boolean;
//     };
//     autoCaptionOnRecord?: boolean;
//     autoKnockLobby?: boolean;
//     backgroundAlpha?: number;
//     bosh?: string;
//     brandingDataUrl?: string;
//     brandingRoomAlias?: string;
//     breakoutRooms?: {
//         hideAddRoomButton?: boolean;
//         hideAutoAssignButton?: boolean;
//         hideJoinRoomButton?: boolean;
//     };
//     buttonsWithNotifyClick?: Array<ButtonsWithNotifyClick | {
//         key: ButtonsWithNotifyClick;
//         preventExecution: boolean;
//     }>;
//     callDisplayName?: string;
//     callFlowsEnabled?: boolean;
//     callHandle?: string;
//     callUUID?: string;
//     cameraFacingMode?: string;
//     channelLastN?: number;
//     chromeExtensionBanner?: {
//         chromeExtensionsInfo?: Array<{ id: string; path: string; }>;
//         edgeUrl?: string;
//         url?: string;
//     };
//     conferenceInfo?: {
//         alwaysVisible?: Array<string>;
//         autoHide?: Array<string>;
//     };
//     conferenceRequestUrl?: string;
//     connectionIndicators?: {
//         autoHide?: boolean;
//         autoHideTimeout?: number;
//         disableDetails?: boolean;
//         disabled?: boolean;
//         inactiveDisabled?: boolean;
//     };
//     constraints?: {
//         video?: {
//             height?: {
//                 ideal?: number;
//                 max?: number;
//                 min?: number;
//             };
//         };
//     };
//     corsAvatarURLs?: Array<string>;
//     customParticipantMenuButtons?: Array<{ icon: string; id: string; text: string; }>;
//     customToolbarButtons?: Array<{ backgroundColor?: string; icon: string; id: string; text: string; }>;
//     deeplinking?: IDeeplinkingConfig;
//     defaultLanguage?: string;
//     defaultLocalDisplayName?: string;
//     defaultLogoUrl?: string;
//     defaultRemoteDisplayName?: string;
//     deploymentInfo?: {
//         envType?: string;
//         environment?: string;
//         product?: string;
//         region?: string;
//         shard?: string;
//         userRegion?: string;
//     };
//     deploymentUrls?: {
//         downloadAppsUrl?: string;
//         userDocumentationURL?: string;
//     };
//     desktopSharingFrameRate?: {
//         max?: number;
//         min?: number;
//     };
//     dialInConfCodeUrl?: string;
//     dialInNumbersUrl?: string;
//     dialOutAuthUrl?: string;
//     dialOutRegionUrl?: string;
//     disable1On1Mode?: boolean | null;
//     disableAddingBackgroundImages?: boolean;
//     disableAudioLevels?: boolean;
//     disableBeforeUnloadHandlers?: boolean;
//     disableChatSmileys?: boolean;
//     disableDeepLinking?: boolean;
//     disableFilmstripAutohiding?: boolean;
//     disableFocus?: boolean;
//     disableIframeAPI?: boolean;
//     disableIncomingMessageSound?: boolean;
//     disableInitialGUM?: boolean;
//     disableInviteFunctions?: boolean;
//     disableJoinLeaveSounds?: boolean;
//     disableLocalVideoFlip?: boolean;
//     disableModeratorIndicator?: boolean;
//     disablePolls?: boolean;
//     disableProfile?: boolean;
//     disableReactions?: boolean;
//     disableReactionsModeration?: boolean;
//     disableRecordAudioNotification?: boolean;
//     disableRemoteMute?: boolean;
//     disableRemoveRaisedHandOnFocus?: boolean;
//     disableResponsiveTiles?: boolean;
//     disableRtx?: boolean;
//     disableScreensharingVirtualBackground?: boolean;
//     disableSelfView?: boolean;
//     disableSelfViewSettings?: boolean;
//     disableShortcuts?: boolean;
//     disableShowMoreStats?: boolean;
//     disableSimulcast?: boolean;
//     disableSpeakerStatsSearch?: boolean;
//     disableThirdPartyRequests?: boolean;
//     disableTileEnlargement?: boolean;
//     disableTileView?: boolean;
//     disableVirtualBackground?: boolean;
//     disabledNotifications?: Array<string>;
//     disabledSounds?: Array<Sounds>;
//     doNotFlipLocalVideo?: boolean;
//     doNotStoreRoom?: boolean;
//     dropbox?: {
//         appKey: string;
//         redirectURI?: string;
//     };
//     dynamicBrandingUrl?: string;
//     e2ee?: {
//         externallyManagedKey?: boolean;
//         labels?: {
//             description?: string;
//             label?: string;
//             tooltip?: string;
//             warning?: string;
//         };
//     };
//     e2eeLabels?: {
//         description?: string;
//         label?: string;
//         tooltip?: string;
//         warning?: string;
//     };
//     e2eping?: {
//         enabled?: boolean;
//         maxConferenceSize?: number;
//         maxMessagesPerSecond?: number;
//         numRequests?: number;
//     };
//     enableAutomaticUrlCopy?: boolean;
//     enableCalendarIntegration?: boolean;
//     enableClosePage?: boolean;
//     enableDisplayNameInStats?: boolean;
//     enableEmailInStats?: boolean;
//     enableEncodedTransformSupport?: boolean;
//     enableForcedReload?: boolean;
//     enableIceRestart?: boolean;
//     enableInsecureRoomNameWarning?: boolean;
//     enableLipSync?: boolean;
//     enableLobbyChat?: boolean;
//     enableNoAudioDetection?: boolean;
//     enableNoisyMicDetection?: boolean;
//     enableOpusRed?: boolean;
//     enableRemb?: boolean;
//     enableSaveLogs?: boolean;
//     enableTcc?: boolean;
//     enableWebHIDFeature?: boolean;
//     enableWelcomePage?: boolean;
//     etherpad_base?: string;
//     faceLandmarks?: {
//         captureInterval?: number;
//         enableDisplayFaceExpressions?: boolean;
//         enableFaceCentering?: boolean;
//         enableFaceExpressionsDetection?: boolean;
//         enableRTCStats?: boolean;
//         faceCenteringThreshold?: number;
//     };
//     feedbackPercentage?: number;
//     fileRecordingsEnabled?: boolean;
//     fileRecordingsServiceEnabled?: boolean;
//     fileRecordingsServiceSharingEnabled?: boolean;
//     filmstrip?: {
//         disableResizable?: boolean;
//         disableStageFilmstrip?: boolean;
//         disableTopPanel?: boolean;
//         disabled?: boolean;
//         minParticipantCountForTopPanel?: number;
//     };
//     firefox_fake_device?: string;
//     flags?: {
//         ssrcRewritingEnabled: boolean;
//     };
//     focusUserJid?: string;
//     gatherStats?: boolean;
//     giphy?: {
//         displayMode?: 'all' | 'tile' | 'chat';
//         enabled?: boolean;
//         proxyUrl?: string;
//         rating?: 'g' | 'pg' | 'pg-13' | 'r';
//         sdkKey?: string;
//         tileTime?: number;
//     };
//     googleApiApplicationClientID?: string;
//     gravatar?: {
//         baseUrl?: string;
//         disabled?: boolean;
//     };
//     gravatarBaseURL?: string;
//     guestDialOutStatusUrl?: string;
//     guestDialOutUrl?: string;
//     helpCentreURL?: string;
//     hiddenPremeetingButtons?: Array<'microphone' | 'camera' | 'select-background' | 'invite' | 'settings'>;
//     hideAddRoomButton?: boolean;
//     hideConferenceSubject?: boolean;
//     hideConferenceTimer?: boolean;
//     hideDisplayName?: boolean;
//     hideDominantSpeakerBadge?: boolean;
//     hideEmailInSettings?: boolean;
//     hideLobbyButton?: boolean;
//     hideParticipantsStats?: boolean;
//     hideRecordingLabel?: boolean;
//     hosts?: {
//         anonymousdomain?: string;
//         authdomain?: string;
//         domain: string;
//         focus?: string;
//         muc: string;
//         visitorFocus?: string;
//     };
//     iAmRecorder?: boolean;
//     iAmSipGateway?: boolean;
//     inviteAppName?: string | null;
//     inviteServiceCallFlowsUrl?: string;
//     inviteServiceUrl?: string;
//     jaasActuatorUrl?: string;
//     jaasConferenceCreatorUrl?: string;
//     jaasFeedbackMetadataURL?: string;
//     jaasTokenUrl?: string;
//     legalUrls?: {
//         helpCentre: string;
//         privacy: string;
//         security: string;
//         terms: string;
//     };
//     liveStreaming?: {
//         dataPrivacyLink?: string;
//         enabled?: boolean;
//         helpLink?: string;
//         termsLink?: string;
//         validatorRegExpString?: string;
//     };
//     liveStreamingEnabled?: boolean;
//     lobby?: {
//         autoKnock?: boolean;
//         enableChat?: boolean;
//     };
//     localRecording?: {
//         disable?: boolean;
//         disableSelfRecording?: boolean;
//         notifyAllParticipants?: boolean;
//     };
//     localSubject?: string;
//     locationURL?: URL;
//     maxFullResolutionParticipants?: number;
//     microsoftApiApplicationClientID?: string;
//     moderatedRoomServiceUrl?: string;
//     mouseMoveCallbackInterval?: number;
//     noiseSuppression?: INoiseSuppressionConfig;
//     noticeMessage?: string;
//     notificationTimeouts?: {
//         long?: number;
//         medium?: number;
//         short?: number;
//     };
//     notifications?: Array<string>;
//     openSharedDocumentOnJoin?: boolean;
//     opusMaxAverageBitrate?: number;
//     p2p?: {
//         backToP2PDelay?: number;
//         codecPreferenceOrder?: Array<string>;
//         enabled?: boolean;
//         iceTransportPolicy?: string;
//         mobileCodecPreferenceOrder?: Array<string>;
//         stunServers?: Array<{ urls: string; }>;
//     };
//     participantMenuButtonsWithNotifyClick?: Array<string | ParticipantMenuButtonsWithNotifyClick | {
//         key: string | ParticipantMenuButtonsWithNotifyClick;
//         preventExecution: boolean;
//     }>;
//     participantsPane?: {
//         hideModeratorSettingsTab?: boolean;
//         hideMoreActionsButton?: boolean;
//         hideMuteAllButton?: boolean;
//     };
//     pcStatsInterval?: number;
//     peopleSearchQueryTypes?: string[];
//     peopleSearchUrl?: string;
//     preferBosh?: boolean;
//     preferredTranscribeLanguage?: string;
//     prejoinConfig?: {
//         enabled?: boolean;
//         hideDisplayName?: boolean;
//         hideExtraJoinButtons?: Array<string>;
//     };
//     prejoinPageEnabled?: boolean;
//     readOnlyName?: boolean;
//     recordingLimit?: {
//         appName?: string;
//         appURL?: string;
//         limit?: number;
//     };
//     recordingService?: {
//         enabled?: boolean;
//         hideStorageWarning?: boolean;
//         sharingEnabled?: boolean;
//     };
//     recordingSharingUrl?: string;
//     remoteVideoMenu?: {
//         disableGrantModerator?: boolean;
//         disableKick?: boolean;
//         disablePrivateChat?: boolean;
//         disabled?: boolean;
//     };
//     replaceParticipant?: string;
//     requireDisplayName?: boolean;
//     resolution?: number;
//     roomPasswordNumberOfDigits?: number;
//     salesforceUrl?: string;
//     screenshotCapture?: {
//         enabled?: boolean;
//         mode?: 'always' | 'recording';
//     };
//     securityUi?: {
//         disableLobbyPassword?: boolean;
//         hideLobbyButton?: boolean;
//     };
//     serviceUrl?: string;
//     sipInviteUrl?: string;
//     speakerStats?: {
//         disableSearch?: boolean;
//         disabled?: boolean;
//         order?: Array<'role' | 'name' | 'hasLeft'>;
//     };
//     speakerStatsOrder?: Array<'role' | 'name' | 'hasLeft'>;
//     startAudioMuted?: number;
//     startAudioOnly?: boolean;
//     startLastN?: number;
//     startScreenSharing?: boolean;
//     startSilent?: boolean;
//     startVideoMuted?: number;
//     startWithAudioMuted?: boolean;
//     startWithVideoMuted?: boolean;
//     stereo?: boolean;
//     subject?: string;
//     testing?: {
//         assumeBandwidth?: boolean;
//         disableE2EE?: boolean;
//         mobileXmppWsThreshold?: number;
//         noAutoPlayVideo?: boolean;
//         p2pTestMode?: boolean;
//         testMode?: boolean;
//     };
//     tileView?: {
//         disabled?: boolean;
//         numberOfVisibleTiles?: number;
//     };
//     tokenAuthUrl?: string;
//     tokenAuthUrlAutoRedirect?: string;
//     tokenLogoutUrl?: string;
//     toolbarButtons?: Array<ToolbarButton>;
//     toolbarConfig?: {
//         alwaysVisible?: boolean;
//         autoHideWhileChatIsOpen?: boolean;
//         initialTimeout?: number;
//         timeout?: number;
//     };
//     transcribeWithAppLanguage?: boolean;
//     transcribingEnabled?: boolean;
//     transcription?: {
//         autoCaptionOnRecord?: boolean;
//         disableStartForAll?: boolean;
//         enabled?: boolean;
//         preferredLanguage?: string;
//         translationLanguages?: Array<string>;
//         translationLanguagesHead?: Array<string>;
//         useAppLanguage?: boolean;
//     };
//     useHostPageLocalStorage?: boolean;
//     useTurnUdp?: boolean;
//     videoQuality?: {
//         codecPreferenceOrder?: Array<string>;
//         maxBitratesVideo?: {
//             [key: string]: {
//                 high?: number;
//                 low?: number;
//                 standard?: number;
//             };
//         };
//         minHeightForQualityLvl?: {
//             [key: number]: string;
//         };
//         mobileCodecPreferenceOrder?: Array<string>;
//         persist?: boolean;
//     };
//     watchRTCConfigParams?: IWatchRTCConfiguration;
//     webhookProxyUrl?: string;
//     webrtcIceTcpDisable?: boolean;
//     webrtcIceUdpDisable?: boolean;
//     websocket?: string;
//     websocketKeepAliveUrl?: string;
//     welcomePage?: {
//         customUrl?: string;
//         disabled?: boolean;
//     };
//     whiteboard?: IWhiteboardConfig;
// }