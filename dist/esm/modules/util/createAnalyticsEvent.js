export function createNetworkInfoEvent({ isOnline, networkType, details }) {
    const attributes = { isOnline };
    // Do no include optional stuff or Amplitude handler will log warnings.
    networkType && (attributes.networkType = networkType);
    details && (attributes.details = details);
    return {
        action: 'network.info',
        attributes
    };
}
