/**
 * Interop provides an API for tranforming a Plan B SDP to a Unified Plan SDP and
 * vice versa.
 */
export class Interop {
    /**
     * This method transforms a Unified Plan SDP to an equivalent Plan B SDP.
     * @param {RTCSessionDescription} description - The description in Unified plan format.
     * @returns RTCSessionDescription - The transformed session description.
     */
    toPlanB(description: RTCSessionDescription): RTCSessionDescription;
    /**
     * This method transforms a Plan B SDP to an equivalent Unified Plan SDP.
     * @param {RTCSessionDescription} description - The description in plan-b format.
     * @param {RTCSessionDescription} current - The current description set on
     * the peerconnection in Unified-plan format, i.e., the readonly attribute
     * remoteDescription on the RTCPeerConnection object.
     * @returns RTCSessionDescription - The transformed session description.
     */
    toUnifiedPlan(description: RTCSessionDescription, current?: RTCSessionDescription): RTCSessionDescription;
}
