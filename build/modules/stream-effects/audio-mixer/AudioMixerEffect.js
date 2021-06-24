function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import SariskaMediaTransport from '../../../SariskaMediaTransport';
/**
 * Class Implementing the effect interface expected by a JitsiLocalTrack.
 * The AudioMixerEffect, as the name implies, mixes two JitsiLocalTracks containing a audio track. First track is
 * provided at the moment of creation, second is provided through the effect interface.
 */

export class AudioMixerEffect {
  /**
   * JitsiLocalTrack that is going to be mixed into the track that uses this effect.
   */

  /**
   * MediaStream resulted from mixing.
   */

  /**
   * MediaStreamTrack obtained from mixed stream.
   */

  /**
   * Original MediaStream from the JitsiLocalTrack that uses this effect.
   */

  /**
   * MediaStreamTrack obtained from the original MediaStream.
   */

  /**
   * lib-jitsi-meet AudioMixer.
   */

  /**
   * Creates AudioMixerEffect.
   *
   * @param {JitsiLocalTrack} mixAudio - JitsiLocalTrack which will be mixed with the original track.
   */
  constructor(mixAudio) {
    _defineProperty(this, "_mixAudio", void 0);

    _defineProperty(this, "_mixedMediaStream", void 0);

    _defineProperty(this, "_mixedMediaTrack", void 0);

    _defineProperty(this, "_originalStream", void 0);

    _defineProperty(this, "_originalTrack", void 0);

    _defineProperty(this, "_audioMixer", void 0);

    if (mixAudio.getType() !== "audio") {
      throw new Error('AudioMixerEffect only supports audio JitsiLocalTracks; effect will not work!');
    }

    this._mixAudio = mixAudio;
  }
  /**
   * Checks if the JitsiLocalTrack supports this effect.
   *
   * @param {JitsiLocalTrack} sourceLocalTrack - Track to which the effect will be applied.
   * @returns {boolean} - Returns true if this effect can run on the specified track, false otherwise.
   */


  isEnabled(sourceLocalTrack) {
    // Both JitsiLocalTracks need to be audio i.e. contain an audio MediaStreamTrack
    return sourceLocalTrack.isAudioTrack() && this._mixAudio.isAudioTrack();
  }
  /**
   * Effect interface called by source JitsiLocalTrack, At this point a WebAudio ChannelMergerNode is created
   * and and the two associated MediaStreams are connected to it; the resulting mixed MediaStream is returned.
   *
   * @param {MediaStream} audioStream - Audio stream which will be mixed with _mixAudio.
   * @returns {MediaStream} - MediaStream containing both audio tracks mixed together.
   */


  startEffect(audioStream) {
    this._originalStream = audioStream;
    this._originalTrack = audioStream.getTracks()[0];
    this._audioMixer = SariskaMediaTransport.createAudioMixer();

    this._audioMixer.addMediaStream(this._mixAudio.getOriginalStream());

    this._audioMixer.addMediaStream(this._originalStream);

    this._mixedMediaStream = this._audioMixer.start();
    this._mixedMediaTrack = this._mixedMediaStream.getTracks()[0]; // Sync the resulting mixed track enabled state with that of the track using the effect.

    this.setMuted(!this._originalTrack.enabled);
    this._originalTrack.enabled = true;
    return this._mixedMediaStream;
  }
  /**
   * Reset the AudioMixer stopping it in the process.
   *
   * @returns {void}
   */


  stopEffect() {
    // Match state of the original track with that of the mixer track, not doing so can
    // result in an inconsistent state e.g. redux state is muted yet track is enabled.
    this._originalTrack.enabled = this._mixedMediaTrack.enabled;

    this._audioMixer.reset();
  }
  /**
   * Change the muted state of the effect.
   *
   * @param {boolean} muted - Should effect be muted or not.
   * @returns {void}
   */


  setMuted(muted) {
    this._mixedMediaTrack.enabled = !muted;
  }
  /**
   * Check whether or not this effect is muted.
   *
   * @returns {boolean}
   */


  isMuted() {
    return !this._mixedMediaTrack.enabled;
  }

}