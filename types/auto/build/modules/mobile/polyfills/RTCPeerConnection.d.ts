/**
 * RTCPeerConnection object used for iOS.
 *
 * @returns {RTCPeerConnection}
 */
export default class _RTCPeerConnection {
    /**
     * Initializes PeerConnection object.
     *
     * @param  {...any} args - The parameters such as Ice Config.
     */
    constructor(...args: any[]);
    onaddstream: (...args: any[]) => any;
    /**
     * Function to be invoked when stream is added.
     *
     * @private
     *
     * @returns {Promise}
     */
    private _invokeOnaddstream;
    /**
     * Invoke the queue when a stream is added.
     *
     * @param {*} q - The queue to be used.
     *
     * @private
     *
     * @returns {null}
     */
    private _invokeQueuedOnaddstream;
    /**
     * Adds the stream to the queue.
     *
     * @param  {...any} args - IceConfig.
     *
     * @returns {null}
     */
    _queueOnaddstream(...args: any[]): null;
    /**
     * Overrides the RemoteDescription from RTCPeerConnection.
     *
     * @param {RTCSessionDescription} description - The session description.
     *
     * @returns {RTCSessionDescription}
     */
    setRemoteDescription(description: RTCSessionDescription): RTCSessionDescription;
}
