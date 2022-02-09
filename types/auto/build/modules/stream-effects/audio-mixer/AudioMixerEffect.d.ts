/**
 * Class Implementing the effect interface expected by a JitsiLocalTrack.
 * The AudioMixerEffect, as the name implies, mixes two JitsiLocalTracks containing a audio track. First track is
 * provided at the moment of creation, second is provided through the effect interface.
 */
export class AudioMixerEffect {
    constructor(mixAudio: any);
    _mixAudio: any;
    /**
     * Checks if the JitsiLocalTrack supports this effect.
     *
     * @param {JitsiLocalTrack} sourceLocalTrack - Track to which the effect will be applied.
     * @returns {boolean} - Returns true if this effect can run on the specified track, false otherwise.
     */
    isEnabled(sourceLocalTrack: JitsiLocalTrack): boolean;
    /**
     * Effect interface called by source JitsiLocalTrack, At this point a WebAudio ChannelMergerNode is created
     * and and the two associated MediaStreams are connected to it; the resulting mixed MediaStream is returned.
     *
     * @param {MediaStream} audioStream - Audio stream which will be mixed with _mixAudio.
     * @returns {MediaStream} - MediaStream containing both audio tracks mixed together.
     */
    startEffect(audioStream: MediaStream): MediaStream;
    _originalStream: MediaStream;
    _originalTrack: MediaStreamTrack;
    _audioMixer: any;
    _mixedMediaStream: any;
    _mixedMediaTrack: any;
    /**
     * Reset the AudioMixer stopping it in the process.
     *
     * @returns {void}
     */
    stopEffect(): void;
    /**
     * Change the muted state of the effect.
     *
     * @param {boolean} muted - Should effect be muted or not.
     * @returns {void}
     */
    setMuted(muted: boolean): void;
    /**
     * Check whether or not this effect is muted.
     *
     * @returns {boolean}
     */
    isMuted(): boolean;
}
