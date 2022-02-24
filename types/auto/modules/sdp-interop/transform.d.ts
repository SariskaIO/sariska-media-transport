declare namespace _default {
    export { write };
    export { parse };
}
export default _default;
/**
 * Rewrites the source information in the way sdp-transform expects.
 * Source information is split into multiple ssrc objects each containing
 * an id, attribute and value.
 * @param {Object} media - media description to be modified.
 * @returns {void}
 */
declare function write(session: any, opts: any): void;
/**
 * Rewrites the source information that we get from sdp-transform.
 * All the ssrc lines with different attributes that belong to the
 * same ssrc are grouped into a single soure object with multiple key value pairs.
 * @param {Object} media - media description to be modified.
 * @returns {void}
 */
declare function parse(sdp: any): void;
