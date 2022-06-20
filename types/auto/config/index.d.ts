export namespace initSDKConfig {
    const disableAudioLevels: boolean;
    namespace flags {
        const sendMultipleVideoStreams: boolean;
        const sourceNameSignaling: boolean;
    }
}
export namespace connectionConfig {
    namespace hosts {
        const domain: string;
        const muc: string;
    }
    const serviceUrl: string;
    const clientNode: string;
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
    const openBridgeChannel: string;
    const hiddenDomain: string;
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
