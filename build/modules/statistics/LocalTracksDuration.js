import * as JitsiConferenceEvents from '../../JitsiConferenceEvents';
import Statistics from "./statistics";
const INITIAL_STATE = {
  localTracksDuration: {
    audio: {
      startedTime: -1,
      value: 0
    },
    video: {
      camera: {
        startedTime: -1,
        value: 0
      },
      desktop: {
        startedTime: -1,
        value: 0
      }
    },
    conference: {
      startedTime: -1,
      value: 0
    }
  }
};
let FINAL_STATE = {
  localTracksDuration: {
    audio: {
      startedTime: -1,
      value: 0
    },
    video: {
      camera: {
        startedTime: -1,
        value: 0
      },
      desktop: {
        startedTime: -1,
        value: 0
      }
    },
    conference: {
      startedTime: -1,
      value: 0
    }
  }
};

function createLocalTracksDurationEvent(duration) {
  const {
    audio,
    video,
    conference
  } = duration;
  const {
    camera,
    desktop
  } = video;
  return {
    action: 'local.tracks.durations',
    attributes: {
      audio: audio.value,
      camera: camera.value,
      conference: conference.value,
      desktop: desktop.value
    }
  };
}

function calculateLocalTrackDuration(state, conference) {
  const now = Date.now();
  const {
    localTracksDuration
  } = state;
  const {
    audio,
    video
  } = localTracksDuration;
  const {
    camera,
    desktop
  } = video;
  const tracks = conference.getLocalTracks();
  const audioTrack = tracks.find(track => track.getType() === "audio");
  const videoTrack = tracks.find(track => track.getType() === "video");
  const newDuration = { ...localTracksDuration
  };

  if (!audioTrack || audioTrack.muted || !conference) {
    newDuration.audio = {
      startedTime: -1,
      value: audio.value + (audio.startedTime === -1 ? 0 : now - audio.startedTime)
    };
  } else if (audio.startedTime === -1) {
    newDuration.audio.startedTime = now;
  }

  if (!videoTrack || videoTrack.muted || !conference) {
    newDuration.video = {
      camera: {
        startedTime: -1,
        value: camera.value + (camera.startedTime === -1 ? 0 : now - camera.startedTime)
      },
      desktop: {
        startedTime: -1,
        value: desktop.value + (desktop.startedTime === -1 ? 0 : now - desktop.startedTime)
      }
    };
  } else {
    const {
      videoType
    } = videoTrack;

    if (video[videoType].startedTime === -1) {
      newDuration.video[videoType].startedTime = now;
    }
  }

  return { ...localTracksDuration,
    ...newDuration
  };
}

export default class LocalTracksDuration {
  constructor(conference) {
    conference.addEventListener(JitsiConferenceEvents.CONFERENCE_JOINED, () => {
      FINAL_STATE = {
        localTracksDuration: { ...calculateLocalTrackDuration(INITIAL_STATE, conference),
          conference: {
            startedTime: Date.now(),
            value: 0
          }
        }
      };
    });
    conference.addEventListener(JitsiConferenceEvents.TRACK_UPDATED, () => {
      const {
        localTracksDuration
      } = FINAL_STATE;

      if (localTracksDuration.conference.startedTime === -1) {
        return;
      }

      FINAL_STATE = {
        localTracksDuration: { ...localTracksDuration,
          ...calculateLocalTrackDuration(FINAL_STATE, conference)
        }
      };
    });
    conference.addEventListener(JitsiConferenceEvents.TRACK_ADDED, () => {
      const {
        localTracksDuration
      } = FINAL_STATE;

      if (localTracksDuration.conference.startedTime === -1) {
        // We don't want to track the media duration if the conference is not joined yet because otherwise we won't
        // be able to compare them with the conference duration (from conference join to conference will leave).
        // Also, do not track media duration for presenter tracks.
        return;
      }

      FINAL_STATE = {
        localTracksDuration: { ...localTracksDuration,
          ...calculateLocalTrackDuration(FINAL_STATE, conference)
        }
      };
    });
    conference.addEventListener(JitsiConferenceEvents.TRACK_REMOVED, () => {
      const {
        localTracksDuration
      } = FINAL_STATE;

      if (localTracksDuration.conference.startedTime === -1 || action.mediaType === 'presenter') {
        // We don't want to track the media duration if the conference is not joined yet because otherwise we won't
        // be able to compare them with the conference duration (from conference join to conference will leave).
        // Also, do not track media duration for presenter tracks.
        return;
      }

      FINAL_STATE = {
        localTracksDuration: { ...localTracksDuration,
          ...calculateLocalTrackDuration(FINAL_STATE, conference)
        }
      };
    });
    conference.addEventListener(JitsiConferenceEvents.CONFERENCE_LEFT, () => {
      const {
        localTracksDuration
      } = FINAL_STATE;
      const newLocalTracksDuration = { ...calculateLocalTrackDuration(FINAL_STATE, conference),
        conference: {
          startedTime: -1,
          value: Date.now() - localTracksDuration.conference.startedTime
        }
      };
      Statistics.sendAnalytics(createLocalTracksDurationEvent(newLocalTracksDuration));
    });
  }

}