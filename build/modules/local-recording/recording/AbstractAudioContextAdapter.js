function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { getLogger } from '@jitsi/logger';
const logger = getLogger(__filename);
import { RecordingAdapter } from './RecordingAdapter';
/**
 * Base class for {@code AudioContext}-based recording adapters.
 */

export class AbstractAudioContextAdapter extends RecordingAdapter {
  /**
   * The {@code AudioContext} instance.
   */

  /**
   * The {@code ScriptProcessorNode} instance.
   */

  /**
   * The {@code MediaStreamAudioSourceNode} instance.
   */

  /**
   * The {@code MediaStream} instance, representing the current audio device.
   */

  /**
   * Sample rate.
   */

  /**
   * Constructor.
   */
  constructor() {
    super(); // sampleRate is browser and OS dependent.
    // Setting sampleRate explicitly is in the specs but not implemented
    // by browsers.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/
    //    AudioContext#Browser_compatibility
    // And https://bugs.chromium.org/p/chromium/issues/detail?id=432248

    _defineProperty(this, "_audioContext", null);

    _defineProperty(this, "_audioProcessingNode", null);

    _defineProperty(this, "_audioSource", null);

    _defineProperty(this, "_stream", null);

    _defineProperty(this, "_sampleRate", 44100);

    this._audioContext = new AudioContext();
    this._sampleRate = this._audioContext.sampleRate;
    logger.log(`Current sampleRate ${this._sampleRate}.`);
  }
  /**
   * Sets up the audio graph in the AudioContext.
   *
   * @protected
   * @param {string} micDeviceId - The current microphone device ID.
   * @param {Function} callback - Callback function to
   * handle AudioProcessingEvents.
   * @returns {Promise}
   */


  _initializeAudioContext(micDeviceId, callback) {
    if (typeof callback !== 'function') {
      return Promise.reject('a callback function is required.');
    }

    return this._getAudioStream(micDeviceId).then(stream => {
      this._stream = stream;
      this._audioSource = this._audioContext.createMediaStreamSource(stream);
      this._audioProcessingNode = this._audioContext.createScriptProcessor(4096, 1, 1);
      this._audioProcessingNode.onaudioprocess = callback;
      logger.debug('AudioContext is set up.');
    }).catch(err => {
      logger.error(`Error calling getUserMedia(): ${err}`);
      return Promise.reject(err);
    });
  }
  /**
   * Connects the nodes in the {@code AudioContext} to start the flow of
   * audio data.
   *
   * @protected
   * @returns {void}
   */


  _connectAudioGraph() {
    this._audioSource.connect(this._audioProcessingNode);

    this._audioProcessingNode.connect(this._audioContext.destination);
  }
  /**
   * Disconnects the nodes in the {@code AudioContext}.
   *
   * @protected
   * @returns {void}
   */


  _disconnectAudioGraph() {
    this._audioProcessingNode.onaudioprocess = undefined;

    this._audioProcessingNode.disconnect();

    this._audioSource.disconnect();
  }
  /**
   * Replaces the current microphone MediaStream.
   *
   * @protected
   * @param {string} micDeviceId - New microphone ID.
   * @returns {Promise}
   */


  _replaceMic(micDeviceId) {
    if (this._audioContext && this._audioProcessingNode) {
      return this._getAudioStream(micDeviceId).then(newStream => {
        const newSource = this._audioContext.createMediaStreamSource(newStream);

        this._audioSource.disconnect();

        newSource.connect(this._audioProcessingNode);
        this._stream = newStream;
        this._audioSource = newSource;
      });
    }

    return Promise.resolve();
  }

}