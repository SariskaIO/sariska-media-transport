/**
 * Effect that wraps {@code MediaStream} adding periodic screenshot captures.
 * Manipulates the original desktop stream and performs custom processing operations, if implemented.
 */
export default class ScreenshotCaptureEffect {
    /**
     * Initializes a new {@code ScreenshotCaptureEffect} instance.
     *
     */
    constructor(callback: any);
    callback: any;
    _currentCanvas: HTMLCanvasElement;
    _currentCanvasContext: CanvasRenderingContext2D;
    _videoElement: HTMLVideoElement;
    /**
     * Handler of the {@code EventHandler} message that calls the appropriate method based on the parameter's id.
     *
     * @private
     * @param {EventHandler} message - Message received from the Worker.
     * @returns {void}
     */
    private _handleWorkerAction;
    /**
     * Method that is called as soon as the first frame of the video loads from stream.
     * The method is used to store the {@code ImageData} object from the first frames
     * in order to use it for future comparisons based on which we can process only certain
     * screenshots.
     *
     * @private
     * @returns {void}
     */
    private _initScreenshotCapture;
    _streamWorker: Worker;
    /**
     * Starts the screenshot capture event on a loop.
     *
     * @param {MediaStream} stream - The desktop stream from which screenshots are to be sent.
     * @param {string} videoType - The type of the media stream.
     * @returns {Promise} - Promise that resolves once effect has started or rejects if the
     * videoType parameter is not desktop.
     */
    startEffect(stream: MediaStream, videoType: string): Promise<any>;
    _streamHeight: ConstrainULong;
    _streamWidth: ConstrainULong;
    /**
     * Stops the ongoing {@code ScreenshotCaptureEffect} by clearing the {@code Worker} interval.
     *
     * @returns {void}
     */
    stopEffect(): void;
    _storedImageData: Uint8ClampedArray;
    /**
     * Method that decides whether an image should be processed based on a preset pixel lower bound.
     *
     * @private
     * @param {integer} nbPixels - The number of pixels of the candidate image.
     * @returns {boolean} - Whether the image should be processed or not.
     */
    private _shouldProcessScreenshot;
    /**
     * Screenshot handler.
     *
     * @private
     * @returns {void}
     */
    private _handleScreenshot;
}
