/**
 * @typedef {string} EndpointId
 */
/**
 * @typedef {string} SourceName
 */
/**
 * @typedef {Object} SourceInfo
 *
 * @property {SourceName} sourceName - Name of the media source.
 * @property {boolean} [muted=false] - Tells if the source is muted (paused?).
 * @property {string} [videoType] - Type of the video for video type.
 */
/**
 * Generates a source name.
 *
 * @param {EndpointId} endpointId - Jitsi Endpoint Id.
 * @param {MediaType} mediaType - the media type string.
 * @param {number} trackIdx - Track index (or sender idx? - to be figured out) starting from 0.
 * @returns {SourceName} eg. endpointA-v0
 */
export function getSourceNameForJitsiTrack(endpointId: EndpointId, mediaType: typeof MediaType, trackIdx: number): SourceName;
/**
 * Extracts MediaType from give source name (must be in the correct format as generated by
 * {@link getSourceNameForJitsiTrack}).
 *
 * @param {SourceName} sourceName - the source name.
 * @returns {MediaType}
 */
export function getMediaTypeFromSourceName(sourceName: SourceName): typeof MediaType;
/**
 * An object that carries the info about specific media type advertised by
 * participant in the signaling channel.
 * @typedef {Object} PeerMediaInfo
 * @property {boolean} muted indicates if the media is currently muted
 * @property {VideoType|undefined} videoType the type of the video if applicable
 */
/**
 * Interface used to expose the information carried over the signaling channel
 * which is not available to the RTC module in the media SDP.
 *
 * @interface SignalingLayer
 */
export default class SignalingLayer extends Listenable {
    /**
     * Obtains the endpoint ID for given SSRC.
     * @param {number} ssrc the SSRC number.
     * @return {string|null} the endpoint ID for given media SSRC.
     */
    getSSRCOwner(ssrc: number): string | null;
    /**
     * Obtains the info about given media advertised in the MUC presence of
     * the participant identified by the given MUC JID.
     * @param {string} owner the MUC jid of the participant for whom
     * {@link PeerMediaInfo} will be obtained.
     * @param {MediaType} mediaType the type of the media for which presence
     * info will be obtained.
     * @return {PeerMediaInfo|null} presenceInfo an object with media presence
     * info or <tt>null</tt> either if there is no presence available for given
     * JID or if the media type given is invalid.
     *
     * @deprecated This method is to be replaced with getPeerSourceInfo.
     */
    getPeerMediaInfo(owner: string, mediaType: typeof MediaType): PeerMediaInfo | null;
    /**
     * Obtains the info about a source for given name and endpoint ID.
     * @param {EndpointId} owner - The owner's endpoint ID.
     * @param {SourceName} sourceName - The name of the source for which the info is to be obtained.
     * @returns {SourceInfo | undefined}
     */
    getPeerSourceInfo(owner: EndpointId, sourceName: SourceName): SourceInfo | undefined;
    /**
     * Obtains the source name for given SSRC.
     * @param {number} ssrc the track's SSRC identifier.
     * @returns {SourceName | undefined} the track's source name.
     */
    getTrackSourceName(ssrc: number): SourceName | undefined;
}
export type EndpointId = string;
export type SourceName = string;
export type SourceInfo = {
    /**
     * - Name of the media source.
     */
    sourceName: SourceName;
    /**
     * - Tells if the source is muted (paused?).
     */
    muted?: boolean;
    /**
     * - Type of the video for video type.
     */
    videoType?: string;
};
/**
 * An object that carries the info about specific media type advertised by
 * participant in the signaling channel.
 */
export type PeerMediaInfo = {
    /**
     * indicates if the media is currently muted
     */
    muted: boolean;
    /**
     * the type of the video if applicable
     */
    videoType: VideoType | undefined;
};
import * as MediaType from "../../service/RTC/MediaType";
import Listenable from "../../modules/util/Listenable";
