export namespace initSDKConfig {
    const disableAudioLevels: boolean;
    namespace flags {
        const sendMultipleVideoStreams: boolean;
        const sourceNameSignaling: boolean;
        const enableJoinAsVisitor: boolean;
        const receiveMultipleVideoStreams: boolean;
    }
}
export namespace connectionConfig {
    namespace hosts {
        const domain: string;
        const muc: string;
    }
    const serviceUrl: string;
    const clientNode: string;
    namespace bridgeChannel {
        const preferSctp: boolean;
    }
}
export namespace devConnectionConfig {
    export namespace hosts_1 {
        const domain_1: string;
        export { domain_1 as domain };
        const muc_1: string;
        export { muc_1 as muc };
    }
    export { hosts_1 as hosts };
    const serviceUrl_1: string;
    export { serviceUrl_1 as serviceUrl };
    const clientNode_1: string;
    export { clientNode_1 as clientNode };
}
export namespace conferenceConfig {
    const enableLocalRecording: boolean;
    const enableVirtualBackground: boolean;
    const enableNoiseCancellation: boolean;
    const enableTalkWhileMuted: boolean;
    const enableNoAudioDetection: boolean;
    const enableNoisyMicDetection: boolean;
    const createVADProcessor: boolean;
    const hiddenDomain: string;
    const enableLayerSuspension: boolean;
    namespace e2eping {
        const pingInterval: number;
        const enabled: boolean;
    }
    namespace analytics {
        const disabled: boolean;
        const rtcstatsEnabled: boolean;
        const watchRTCEnabled: boolean;
        const rtcstatsEndpoint: string;
    }
    const useStunTurn: boolean;
    namespace watchRTCConfigParams {
        const rtcApiKey: string;
    }
    const useNewBandwidthAllocationStrategy: boolean;
    namespace faceLandmarks {
        const enableFaceCentering: boolean;
        const enableFaceExpressionsDetection: boolean;
        const enableDisplayFaceExpressions: boolean;
        const enableRTCStats: boolean;
        const faceCenteringThreshold: number;
        const captureInterval: number;
    }
    namespace deploymentInfo {
        const environment: string;
        const envType: string;
        const shard: string;
        const region: string;
        const userRegion: string;
        const crossRegion: number;
    }
    const enableP2P: boolean;
    namespace p2p {
        const useStunTurn_1: boolean;
        export { useStunTurn_1 as useStunTurn };
        const enabled_1: boolean;
        export { enabled_1 as enabled };
        export const stunServers: {
            urls: string;
        }[];
    }
}
