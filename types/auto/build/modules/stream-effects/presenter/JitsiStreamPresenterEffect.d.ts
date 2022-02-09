/**
 * Represents a modified MediaStream that adds video as pip on a desktop stream.
 * <tt>JitsiStreamPresenterEffect</tt> does the processing of the original
 * desktop stream.
 */
export default class JitsiStreamPresenterEffect {
    /**
     * Represents a modified MediaStream that adds a camera track at the
     * bottom right corner of the desktop track using a HTML canvas.
     * <tt>JitsiStreamPresenterEffect</tt> does the processing of the original
     * video stream.
     *
     * @param {MediaStream} videoStream - The video stream which is user for
     * creating the canvas.
     */
    constructor(videoStream: MediaStream);
    _canvas: HTMLCanvasElement;
    _ctx: CanvasRenderingContext2D;
    _desktopElement: HTMLVideoElement;
    _videoElement: HTMLVideoElement;
    _frameRate: number;
    /**
     * EventHandler onmessage for the videoFrameTimerWorker WebWorker.
     *
     * @private
     * @param {EventHandler} response - The onmessage EventHandler parameter.
     * @returns {void}
     */
    private _onVideoFrameTimer;
    /**
     * Loop function to render the video frame input and draw presenter effect.
     *
     * @private
     * @returns {void}
     */
    private _renderVideo;
    /**
     * Checks if the local track supports this effect.
     *
     * @param {JitsiLocalTrack} jitsiLocalTrack - Track to apply effect.
     * @returns {boolean} - Returns true if this effect can run on the
     * specified track, false otherwise.
     */
    isEnabled(jitsiLocalTrack: JitsiLocalTrack): boolean;
    /**
     * Starts loop to capture video frame and render presenter effect.
     *
     * @param {MediaStream} desktopStream - Stream to be used for processing.
     * @returns {MediaStream} - The stream with the applied effect.
     */
    startEffect(desktopStream: MediaStream): MediaStream;
    _desktopStream: MediaStream;
    _videoFrameTimerWorker: Worker;
    /**
     * Stops the capture and render loop.
     *
     * @returns {void}
     */
    stopEffect(): void;
}
