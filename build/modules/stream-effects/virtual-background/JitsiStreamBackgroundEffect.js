function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { VIRTUAL_BACKGROUND_TYPE } from './constants';
import { CLEAR_TIMEOUT, TIMEOUT_TICK, SET_TIMEOUT, timerWorkerScript } from './TimerWorker';
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
  constructor(model, options) {
    _defineProperty(this, "_model", void 0);

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_desktopShareDimensions", void 0);

    _defineProperty(this, "_segmentationPixelCount", void 0);

    _defineProperty(this, "_inputVideoElement", void 0);

    _defineProperty(this, "_onMaskFrameTimer", void 0);

    _defineProperty(this, "_maskFrameTimerWorker", void 0);

    _defineProperty(this, "_outputCanvasElement", void 0);

    _defineProperty(this, "_outputCanvasCtx", void 0);

    _defineProperty(this, "_segmentationMaskCtx", void 0);

    _defineProperty(this, "_segmentationMask", void 0);

    _defineProperty(this, "_segmentationMaskCanvas", void 0);

    _defineProperty(this, "_renderMask", void 0);

    _defineProperty(this, "_virtualImage", void 0);

    _defineProperty(this, "_virtualVideo", void 0);

    _defineProperty(this, "isEnabled", void 0);

    _defineProperty(this, "startEffect", void 0);

    _defineProperty(this, "stopEffect", void 0);

    this._options = options;

    if (this._options.virtualBackground.backgroundType === VIRTUAL_BACKGROUND_TYPE.IMAGE) {
      this._virtualImage = document.createElement('img');
      this._virtualImage.crossOrigin = 'anonymous';
      this._virtualImage.src = this._options.virtualBackground.virtualSource;
    }

    if (this._options.virtualBackground.backgroundType === VIRTUAL_BACKGROUND_TYPE.DESKTOP_SHARE) {
      var _this$_options, _this$_options$virtua, _this$_options$virtua2;

      this._virtualVideo = document.createElement('video');
      this._virtualVideo.autoplay = true;
      this._virtualVideo.srcObject = (_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : (_this$_options$virtua = _this$_options.virtualBackground) === null || _this$_options$virtua === void 0 ? void 0 : (_this$_options$virtua2 = _this$_options$virtua.virtualSource) === null || _this$_options$virtua2 === void 0 ? void 0 : _this$_options$virtua2.stream;
    }

    this._model = model;
    this._segmentationPixelCount = this._options.width * this._options.height; // Bind event handler so it is only bound once for every instance.

    this._onMaskFrameTimer = this._onMaskFrameTimer.bind(this); // Workaround for FF issue https://bugzilla.mozilla.org/show_bug.cgi?id=1388974

    this._outputCanvasElement = document.createElement('canvas');

    this._outputCanvasElement.getContext('2d');

    this._inputVideoElement = document.createElement('video');
  }
  /**
   * EventHandler onmessage for the maskFrameTimerWorker WebWorker.
   *
   * @private
   * @param {EventHandler} response - The onmessage EventHandler parameter.
   * @returns {void}
   */


  _onMaskFrameTimer(response) {
    if (response.data.id === TIMEOUT_TICK) {
      this._renderMask();
    }
  }
  /**
   * Represents the run post processing.
   *
   * @returns {void}
   */


  runPostProcessing() {
    this._outputCanvasCtx.globalCompositeOperation = 'copy'; // Draw segmentation mask.
    //
    // Smooth out the edges.

    if (this._options.virtualBackground.backgroundType === VIRTUAL_BACKGROUND_TYPE.IMAGE) {
      this._outputCanvasCtx.filter = 'blur(4px)';
    } else {
      this._outputCanvasCtx.filter = 'blur(8px)';
    }

    this._outputCanvasCtx.drawImage(this._segmentationMaskCanvas, 0, 0, this._options.width, this._options.height, 0, 0, this._inputVideoElement.width, this._inputVideoElement.height);

    this._outputCanvasCtx.globalCompositeOperation = 'source-in';
    this._outputCanvasCtx.filter = 'none'; // Draw the foreground video.
    //

    this._outputCanvasCtx.drawImage(this._inputVideoElement, 0, 0); // Draw the background.
    //


    this._outputCanvasCtx.globalCompositeOperation = 'destination-over';

    if (this._options.virtualBackground.backgroundType === VIRTUAL_BACKGROUND_TYPE.IMAGE) {
      this._outputCanvasCtx.drawImage(this._virtualImage, 0, 0, this._inputVideoElement.width, this._inputVideoElement.height);
    }

    if (this._options.virtualBackground.backgroundType === VIRTUAL_BACKGROUND_TYPE.DESKTOP_SHARE) {
      this._outputCanvasCtx.drawImage(this._virtualVideo, 0, 0, this._desktopShareDimensions.width, this._desktopShareDimensions.height);
    } else {
      this._outputCanvasCtx.filter = `blur(${this._options.virtualBackground.blurValue}px)`;

      this._outputCanvasCtx.drawImage(this._inputVideoElement, 0, 0);
    }
  }
  /**
   * Represents the run Tensorflow Interference.
   *
   * @returns {void}
   */


  runInference() {
    this._model._runInference();

    const outputMemoryOffset = this._model._getOutputMemoryOffset() / 4;

    for (let i = 0; i < this._segmentationPixelCount; i++) {
      const background = this._model.HEAPF32[outputMemoryOffset + i * 2];
      const person = this._model.HEAPF32[outputMemoryOffset + i * 2 + 1];
      const shift = Math.max(background, person);
      const backgroundExp = Math.exp(background - shift);
      const personExp = Math.exp(person - shift); // Sets only the alpha component of each pixel.

      this._segmentationMask.data[i * 4 + 3] = 255 * personExp / (backgroundExp + personExp);
    }

    this._segmentationMaskCtx.putImageData(this._segmentationMask, 0, 0);
  }
  /**
   * Loop function to render the background mask.
   *
   * @private
   * @returns {void}
   */


  _renderMask() {
    var _this$_options2, _this$_options2$virtu, _this$_options2$virtu2;

    const desktopShareTrack = (_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : (_this$_options2$virtu = _this$_options2.virtualBackground) === null || _this$_options2$virtu === void 0 ? void 0 : (_this$_options2$virtu2 = _this$_options2$virtu.virtualSource) === null || _this$_options2$virtu2 === void 0 ? void 0 : _this$_options2$virtu2.track;

    if (desktopShareTrack) {
      this._desktopShareDimensions = desktopShareTrack.getSettings ? desktopShareTrack.getSettings() : desktopShareTrack.getConstraints();
    }

    this.resizeSource();
    this.runInference();
    this.runPostProcessing();

    this._maskFrameTimerWorker.postMessage({
      id: SET_TIMEOUT,
      timeMs: 1000 / 30
    });
  }
  /**
   * Represents the resize source process.
   *
   * @returns {void}
   */


  resizeSource() {
    this._segmentationMaskCtx.drawImage(this._inputVideoElement, 0, 0, this._inputVideoElement.width, this._inputVideoElement.height, 0, 0, this._options.width, this._options.height);

    const imageData = this._segmentationMaskCtx.getImageData(0, 0, this._options.width, this._options.height);

    const inputMemoryOffset = this._model._getInputMemoryOffset() / 4;

    for (let i = 0; i < this._segmentationPixelCount; i++) {
      this._model.HEAPF32[inputMemoryOffset + i * 3] = imageData.data[i * 4] / 255;
      this._model.HEAPF32[inputMemoryOffset + i * 3 + 1] = imageData.data[i * 4 + 1] / 255;
      this._model.HEAPF32[inputMemoryOffset + i * 3 + 2] = imageData.data[i * 4 + 2] / 255;
    }
  }
  /**
   * Checks if the local track supports this effect.
   *
   * @param {JitsiLocalTrack} jitsiLocalTrack - Track to apply effect.
   * @returns {boolean} - Returns true if this effect can run on the specified track
   * false otherwise.
   */


  isEnabled(jitsiLocalTrack) {
    return jitsiLocalTrack.isVideoTrack() && jitsiLocalTrack.videoType === 'camera';
  }
  /**
   * Starts loop to capture video frame and render the segmentation mask.
   *
   * @param {MediaStream} stream - Stream to be used for processing.
   * @returns {MediaStream} - The stream with the applied effect.
   */


  startEffect(stream) {
    this._maskFrameTimerWorker = new Worker(timerWorkerScript, {
      name: 'Blur effect worker'
    });
    this._maskFrameTimerWorker.onmessage = this._onMaskFrameTimer;
    const firstVideoTrack = stream.getVideoTracks()[0];
    const {
      height,
      frameRate,
      width
    } = firstVideoTrack.getSettings ? firstVideoTrack.getSettings() : firstVideoTrack.getConstraints();
    this._segmentationMask = new ImageData(this._options.width, this._options.height);
    this._segmentationMaskCanvas = document.createElement('canvas');
    this._segmentationMaskCanvas.width = this._options.width;
    this._segmentationMaskCanvas.height = this._options.height;
    this._segmentationMaskCtx = this._segmentationMaskCanvas.getContext('2d');
    this._outputCanvasElement.width = parseInt(width, 10);
    this._outputCanvasElement.height = parseInt(height, 10);
    this._outputCanvasCtx = this._outputCanvasElement.getContext('2d');
    this._inputVideoElement.width = parseInt(width, 10);
    this._inputVideoElement.height = parseInt(height, 10);
    this._inputVideoElement.autoplay = true;
    this._inputVideoElement.srcObject = stream;

    this._inputVideoElement.onloadeddata = () => {
      this._maskFrameTimerWorker.postMessage({
        id: SET_TIMEOUT,
        timeMs: 1000 / 30
      });
    };

    return this._outputCanvasElement.captureStream(parseInt(frameRate, 10));
  }
  /**
   * Stops the capture and render loop.
   *
   * @returns {void}
   */


  stopEffect() {
    this._maskFrameTimerWorker.postMessage({
      id: CLEAR_TIMEOUT
    });

    this._maskFrameTimerWorker.terminate();
  }

}