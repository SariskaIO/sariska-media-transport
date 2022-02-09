export function createNetworkInfoEvent({ isOnline, networkType, details }: {
    isOnline: any;
    networkType: any;
    details: any;
}): {
    action: string;
    attributes: {
        isOnline: any;
    };
};
