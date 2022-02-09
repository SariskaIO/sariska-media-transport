/**
 * Represents a modified MediaStream that adds effects to video background.
 * <tt>JitsiStreamBackgroundEffect</tt> does the processing of the original
 * video stream.
 */
export default class JitsiStreamBackgroundEffect {
    /**
     * Represents a modified video MediaStream track.
     *
     * @class
     * @param {Object} model - Meet model.
     * @param {Object} options - Segmentation dimensions.
     */
    constructor(model: any, options: any);
    _options: any;
    _virtualImage: HTMLImageElement;
    _virtualVideo: HTMLVideoElement;
    _model: any;
    _segmentationPixelCount: number;
    /**
     * EventHandler onmessage for the maskFrameTimerWorker WebWorker.
     *
     * @private
     * @param {EventHandler} response - The onmessage EventHandler parameter.
     * @returns {void}
     */
    private _onMaskFrameTimer;
    _outputCanvasElement: HTMLCanvasElement;
    _inputVideoElement: HTMLVideoElement;
    /**
     * Represents the run post processing.
     *
     * @returns {void}
     */
    runPostProcessing(): void;
    /**
     * Represents the run Tensorflow Interference.
     *
     * @returns {void}
     */
    runInference(): void;
    /**
     * Loop function to render the background mask.
     *
     * @private
     * @returns {void}
     */
    private _renderMask;
    _desktopShareDimensions: any;
    /**
     * Represents the resize source process.
     *
     * @returns {void}
     */
    resizeSource(): void;
    /**
     * Checks if the local track supports this effect.
     *
     * @param {JitsiLocalTrack} jitsiLocalTrack - Track to apply effect.
     * @returns {boolean} - Returns true if this effect can run on the specified track
     * false otherwise.
     */
    isEnabled(jitsiLocalTrack: any): boolean;
    /**
     * Starts loop to capture video frame and render the segmentation mask.
     *
     * @param {MediaStream} stream - Stream to be used for processing.
     * @returns {MediaStream} - The stream with the applied effect.
     */
    startEffect(stream: MediaStream): MediaStream;
    _maskFrameTimerWorker: Worker;
    _segmentationMask: ImageData;
    _segmentationMaskCanvas: HTMLCanvasElement;
    _segmentationMaskCtx: CanvasRenderingContext2D;
    _outputCanvasCtx: CanvasRenderingContext2D;
    /**
     * Stops the capture and render loop.
     *
     * @returns {void}
     */
    stopEffect(): void;
}
