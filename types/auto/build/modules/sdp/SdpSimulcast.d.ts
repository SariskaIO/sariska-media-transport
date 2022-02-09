/**
 * This class handles SDP munging for enabling simulcast for local video streams in Unified plan. A set of random SSRCs
 * are generated for the higher layer streams and they are cached for a given mid. The cached SSRCs are then reused on
 * the subsequent iterations while munging the local description. This class also handles imploding of the simulcast
 * SSRCs for remote endpoints into the primary FID group in remote description since Jicofo signals all SSRCs relevant
 * to a given endpoint.
 */
export default class SdpSimulcast {
    /**
     * Creates a new instance.
     *
     * @param options
     */
    constructor(options: any);
    _options: any;
    _ssrcCache: Map<any, any>;
    /**
     * Updates the given media description using the SSRCs that were cached for the mid associated
     * with the media description and returns the modified media description.
     *
     * @param mLine
     * @returns
     */
    _fillSsrcsFromCache(mLine: any): any;
    /**
     * Generates a new set of SSRCs for the higher simulcast layers/streams and adds the attributes and SIM group to
     * the given media description and returns the modified media description.
     *
     * @param mLine
     * @param primarySsrc
     * @returns
     */
    _generateNewSsrcsForSimulcast(mLine: any, primarySsrc: any): any;
    /**
     * Returns a random number to be used for the SSRC.
     *
     * @returns
     */
    _generateSsrc(): number;
    /**
     * Returns the requested attribute value for a SSRC from a given media description.
     *
     * @param mLine
     * @param ssrc
     * @param attributeName
     * @returns
     */
    _getSsrcAttribute(mLine: any, ssrc: any, attributeName: any): any;
    /**
     * Returns an array of all the primary SSRCs in the SIM group for a given media description.
     *
     * @param mLine
     * @returns
     */
    _parseSimLayers(mLine: any): any;
    /**
     * Munges the given media description to enable simulcast for the video media sections that are in either have
     * SENDRECV or SENDONLY as the media direction thereby ignoring all the RECVONLY transceivers created for remote
     * endpoints.
     * NOTE: This needs to be called only when simulcast is enabled.
     *
     * @param description
     * @returns
     */
    mungeLocalDescription(description: any): any;
    /**
     * Munges the given media description by removing the SSRCs and related FID groups for the higher layer streams.
     *
     * @param description
     * @returns
     */
    mungeRemoteDescription(description: any): any;
}
