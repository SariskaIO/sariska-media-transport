import pixelmatch from 'pixelmatch';
import { CLEAR_INTERVAL, INTERVAL_TIMEOUT, PIXEL_LOWER_BOUND, POLL_INTERVAL, SET_INTERVAL } from './constants';
import { timerWorkerScript } from './worker';

/**
 * Effect that wraps {@code MediaStream} adding periodic screenshot captures.
 * Manipulates the original desktop stream and performs custom processing operations, if implemented.
 */
export default class ScreenshotCaptureEffect {
  /**
   * Initializes a new {@code ScreenshotCaptureEffect} instance.
   *
   */
  constructor(callback) {
    this.callback = callback;
    this._currentCanvas = document.createElement('canvas');
    this._currentCanvasContext = this._currentCanvas.getContext('2d');
    this._videoElement = document.createElement('video'); // Bind handlers such that they access the same instance.

    this._handleWorkerAction = this._handleWorkerAction.bind(this);
    this._initScreenshotCapture = this._initScreenshotCapture.bind(this);
    this._streamWorker = new Worker(timerWorkerScript, {
      name: 'Screenshot capture worker'
    });
    this._streamWorker.onmessage = this._handleWorkerAction;
  }
  /**
   * Starts the screenshot capture event on a loop.
   *
   * @param {MediaStream} stream - The desktop stream from which screenshots are to be sent.
   * @param {string} videoType - The type of the media stream.
   * @returns {Promise} - Promise that resolves once effect has started or rejects if the
   * videoType parameter is not desktop.
   */


  startEffect(stream, videoType) {
    return new Promise((resolve, reject) => {
      var _desktopTrack$getSett;

      if (videoType !== 'desktop') {
        reject();
      }

      const desktopTrack = stream.getVideoTracks()[0];
      const {
        height,
        width
      } = (_desktopTrack$getSett = desktopTrack.getSettings()) !== null && _desktopTrack$getSett !== void 0 ? _desktopTrack$getSett : desktopTrack.getConstraints();
      this._streamHeight = height;
      this._streamWidth = width;
      this._currentCanvas.height = parseInt(height, 10);
      this._currentCanvas.width = parseInt(width, 10);
      this._videoElement.height = parseInt(height, 10);
      this._videoElement.width = parseInt(width, 10);
      this._videoElement.srcObject = stream;

      this._videoElement.play(); // Store first capture for comparisons in {@code this._handleScreenshot}.


      this._videoElement.addEventListener('loadeddata', this._initScreenshotCapture);

      resolve();
    });
  }
  /**
   * Stops the ongoing {@code ScreenshotCaptureEffect} by clearing the {@code Worker} interval.
   *
   * @returns {void}
   */


  stopEffect() {
    this._streamWorker.postMessage({
      id: CLEAR_INTERVAL
    });

    this._videoElement.removeEventListener('loadeddata', this._initScreenshotCapture);
  }
  /**
   * Method that is called as soon as the first frame of the video loads from stream.
   * The method is used to store the {@code ImageData} object from the first frames
   * in order to use it for future comparisons based on which we can process only certain
   * screenshots.
   *
   * @private
   * @returns {void}
   */


  _initScreenshotCapture() {
    const storedCanvas = document.createElement('canvas');
    const storedCanvasContext = storedCanvas.getContext('2d');
    storedCanvasContext.drawImage(this._videoElement, 0, 0, this._streamWidth, this._streamHeight);
    const {
      data
    } = storedCanvasContext.getImageData(0, 0, this._streamWidth, this._streamHeight);
    this._storedImageData = data;

    this._streamWorker.postMessage({
      id: SET_INTERVAL,
      timeMs: POLL_INTERVAL
    });
  }
  /**
   * Handler of the {@code EventHandler} message that calls the appropriate method based on the parameter's id.
   *
   * @private
   * @param {EventHandler} message - Message received from the Worker.
   * @returns {void}
   */


  _handleWorkerAction(message) {
    return message.data.id === INTERVAL_TIMEOUT && this._handleScreenshot();
  }
  /**
   * Method that decides whether an image should be processed based on a preset pixel lower bound.
   *
   * @private
   * @param {integer} nbPixels - The number of pixels of the candidate image.
   * @returns {boolean} - Whether the image should be processed or not.
   */


  _shouldProcessScreenshot(nbPixels) {
    return nbPixels >= PIXEL_LOWER_BOUND;
  }
  /**
   * Screenshot handler.
   *
   * @private
   * @returns {void}
   */


  _handleScreenshot() {
    this._currentCanvasContext.drawImage(this._videoElement, 0, 0, this._streamWidth, this._streamHeight);

    const {
      data
    } = this._currentCanvasContext.getImageData(0, 0, this._streamWidth, this._streamHeight);

    const diffPixels = pixelmatch(data, this._storedImageData, null, this._streamWidth, this._streamHeight);

    if (this._shouldProcessScreenshot(diffPixels)) {
      this._storedImageData = data;
      this.callback(this._currentCanvas);
    }
  }

}