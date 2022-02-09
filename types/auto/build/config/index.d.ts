export namespace initSDKConfig {
    const disableAudioLevels: boolean;
}
export namespace connectionConfig {
    namespace hosts {
        const domain: string;
        const muc: string;
    }
    const serviceUrl: string;
    const clientNode: string;
}
export namespace conferenceConfig {
    const enableLocalRecording: boolean;
    const enableVirtualBackground: boolean;
    const enableNoiseCancellation: boolean;
    const enableTalkWhileMuted: boolean;
    const enableNoAudioDetection: boolean;
    const enableNoisyMicDetection: boolean;
    const createVADProcessor: boolean;
    const openBridgeChannel: string;
    const hiddenDomain: string[];
    const enableLayerSuspension: boolean;
    namespace e2eping {
        const pingInterval: number;
    }
    namespace analytics {
        const disabled: boolean;
    }
    namespace p2p {
        const enabled: boolean;
    }
}
