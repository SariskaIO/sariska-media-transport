export = Simulcast;
declare function Simulcast(options: any): void;
declare class Simulcast {
    constructor(options: any);
    options: any;
    /**
     * An IN-ORDER list of the simulcast ssrcs
     * @type {list<number>}
     */
    ssrcCache: any;
    clearSsrcCache(): void;
    /**
     * When we start as video muted, all of the video
     *  ssrcs get generated so we can include them as part
     *  of the original session-accept.  That means we
     *  need this library to restore to those same ssrcs
     *  the first time we unmute, so we need the ability to
     *  force its cache
     */
    setSsrcCache(ssrcs: any): void;
    /**
     * Given a video mLine, return a list of the video ssrcs
     *  in simulcast layer order (returns a list of just
     *  the primary ssrc if there are no simulcast layers)
     */
    _parseSimLayers(mLine: any): any;
    _buildNewToOldSsrcMap(newSsrcList: any, oldSsrcList: any): {};
    _fillInSourceDataFromCache(mLine: any): any;
    _generateSourceData(mLine: any, primarySsrc: any): any;
    _restoreSimulcast(mLine: any): any;
    /**
     *
     * @param desc
     * @param enableConferenceFlag
     * @returns {RTCSessionDescription}
     */
    mungeRemoteDescription(desc: any, enableConferenceFlag: any): RTCSessionDescription;
    /**
     *
     * NOTE this method should be called only if simulcast is supported by
     * the current browser, otherwise local SDP should not be munged.
     * @param desc
     * @returns {RTCSessionDescription}
     */
    mungeLocalDescription(desc: any): RTCSessionDescription;
}
