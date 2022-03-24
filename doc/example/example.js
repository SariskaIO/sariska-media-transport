/* global $, JitsiMeetJS */

const confOptions = {
};

let connection = null;
let isJoined = false;
let room = null;

let localTracks = [];
const remoteTracks = {};

/**
 * Handles local tracks.
 * @param tracks Array with JitsiTrack objects
 */
function onLocalTracks(tracks) {
    localTracks = tracks;
    for (let i = 0; i < localTracks.length; i++) {
        localTracks[i].addEventListener(
            SariskaMediaTransport.events.track.TRACK_AUDIO_LEVEL_CHANGED,
            audioLevel => console.log(`Audio Level local: ${audioLevel}`));
        localTracks[i].addEventListener(
            SariskaMediaTransport.events.track.TRACK_MUTE_CHANGED,
            () => console.log('local track muted'));
        localTracks[i].addEventListener(
            SariskaMediaTransport.events.track.LOCAL_TRACK_STOPPED,
            () => console.log('local track stoped'));
        localTracks[i].addEventListener(
            SariskaMediaTransport.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
            deviceId =>
                console.log(
                    `track audio output device was changed to ${deviceId}`));
        if (localTracks[i].getType() === 'video') {
            var x = document.getElementsByTagName("BODY")[0];

            $('body') .append(`<video autoplay='1' id='localVideo${i}' />`);
            localTracks[i].attach($(`#localVideo${i}`)[0]);
        } else {
            var x = document.getElementsByTagName("BODY")[0];

            $('body').append(
                `<audio autoplay='1' muted='true' id='localAudio${i}' />`);
            localTracks[i].attach($(`#localAudio${i}`)[0]);
        }
        if (isJoined) {
            room.addTrack(localTracks[i]);
        }
    }
}

/**
 * Handles remote tracks
 * @param track JitsiTrack object
 */
function onRemoteTrack(track) {
    if (track.isLocal()) {
        return;
    }
    const participant = track.getParticipantId();

    if (!remoteTracks[participant]) {
        remoteTracks[participant] = [];
    }
    const idx = remoteTracks[participant].push(track);

    track.addEventListener(
        SariskaMediaTransport.events.track.TRACK_AUDIO_LEVEL_CHANGED,
        audioLevel => console.log(`Audio Level remote: ${audioLevel}`));
    track.addEventListener(
        SariskaMediaTransport.events.track.TRACK_MUTE_CHANGED,
        () => console.log('remote track muted'));
    track.addEventListener(
        SariskaMediaTransport.events.track.LOCAL_TRACK_STOPPED,
        () => console.log('remote track stoped'));
    track.addEventListener(SariskaMediaTransport.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
        deviceId =>
            console.log(
                `track audio output device was changed to ${deviceId}`));
    const id = participant + track.getType() + idx;

    if (track.getType() === 'video') {
        $('body').append(
            `<video autoplay='1' id='${participant}video${idx}' />`);
    } else {
        $('body').append(
            `<audio autoplay='1' id='${participant}audio${idx}' />`);
    }
    track.attach($(`#${id}`)[0]);
}

/**
 * That function is executed when the conference is joined
 */
function onConferenceJoined() {
    console.log('conference joined!');
    isJoined = true;
    for (let i = 0; i < localTracks.length; i++) {
        room.addTrack(localTracks[i]);
    }
}

/**
 *
 * @param id
 */
function onUserLeft(id) {
    console.log('user left');
    if (!remoteTracks[id]) {
        return;
    }
    const tracks = remoteTracks[id];

    for (let i = 0; i < tracks.length; i++) {
        tracks[i].detach($(`#${id}${tracks[i].getType()}`));
    }
}

/**
 * That function is called when connection is established successfully
 */
function onConnectionSuccess() {
    room = connection.initJitsiConference('conference', confOptions);
    room.on(SariskaMediaTransport.events.conference.TRACK_ADDED, onRemoteTrack);
    room.on(SariskaMediaTransport.events.conference.TRACK_REMOVED, track => {
        console.log(`track removed!!!${track}`);
    });
    room.on(
        SariskaMediaTransport.events.conference.CONFERENCE_JOINED,
        onConferenceJoined);
    room.on(SariskaMediaTransport.events.conference.USER_JOINED, id => {
        console.log('user join');
        remoteTracks[id] = [];
    });
    room.on(SariskaMediaTransport.events.conference.USER_LEFT, onUserLeft);
    room.on(SariskaMediaTransport.events.conference.TRACK_MUTE_CHANGED, track => {
        console.log(`${track.getType()} - ${track.isMuted()}`);
    });
    room.on(
        SariskaMediaTransport.events.conference.DISPLAY_NAME_CHANGED,
        (userID, displayName) => console.log(`${userID} - ${displayName}`));
    room.on(
        SariskaMediaTransport.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
        (userID, audioLevel) => console.log(`${userID} - ${audioLevel}`));
    room.on(
        SariskaMediaTransport.events.conference.PHONE_NUMBER_CHANGED,
        () => console.log(`${room.getPhoneNumber()} - ${room.getPhonePin()}`));
    room.join();
}

/**
 * This function is called when the connection fail.
 */
function onConnectionFailed() {
    console.error('Connection Failed!');
}

/**
 * This function is called when the connection fail.
 */
function onDeviceListChanged(devices) {
    console.info('current devices', devices);
}

/**
 * This function is called when we disconnect.
 */
function disconnect() {
    console.log('disconnect!');
    connection.removeEventListener(
        SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED,
        onConnectionSuccess);
    connection.removeEventListener(
        SariskaMediaTransport.events.connection.CONNECTION_FAILED,
        onConnectionFailed);
    connection.removeEventListener(
        SariskaMediaTransport.events.connection.CONNECTION_DISCONNECTED,
        disconnect);
}

/**
 *
 */
function unload() {
    for (let i = 0; i < localTracks.length; i++) {
        localTracks[i].dispose();
    }
    room.leave();
    connection.disconnect();
}

let isVideo = true;

/**
 *
 */
function switchVideo() { // eslint-disable-line no-unused-vars
    isVideo = !isVideo;
    if (localTracks[1]) {
        localTracks[1].dispose();
        localTracks.pop();
    }
    SariskaMediaTransport.createLocalTracks({
        devices: [ isVideo ? 'video' : 'desktop' ]
    })
        .then(tracks => {
            localTracks.push(tracks[0]);
            localTracks[1].addEventListener(
                JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                () => console.log('local track muted'));
            localTracks[1].addEventListener(
                JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                () => console.log('local track stoped'));
            localTracks[1].attach($('#localVideo1')[0]);
            room.addTrack(localTracks[1]);
        })
        .catch(error => console.log(error));
}

/**
 *
 * @param selected
 */
function changeAudioOutput(selected) { // eslint-disable-line no-unused-vars
    SariskaMediaTransport.mediaDevices.setAudioOutputDevice(selected.value);
}

window.addEventListener('beforeunload', unload);
window.addEventListener('unload', unload);

// JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
const initOptions = {
    disableAudioLevels: true
};

SariskaMediaTransport.init(initOptions);

connection = new SariskaMediaTransport.JitsiConnection("eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmYjc1MTJjZjgzYzdkYTRjMjM0Y2QzYWEyYWViOTUzMGNlZmUwMDg1YzRiZjljYzgwY2U5YmQ5YmRiNjA3ZjciLCJ0eXAiOiJKV1QifQ.eyJjb250ZXh0Ijp7InVzZXIiOnsiaWQiOiI4M2hkbWQ2aSIsImF2YXRhciI6Im51bGwiLCJuYW1lIjoiRGlwYWstMiIsImVtYWlsIjoiZGlwYWtAd29yay5jb20iLCJtb2RlcmF0b3IiOnRydWV9LCJncm91cCI6IjEifSwic3ViIjoidWF0bmNvZTV2NzJsbm9obG53Z3F2OCIsInJvb20iOiIqIiwiaWF0IjoxNjQ4MTMxNjI0LCJuYmYiOjE2NDgxMzE2MjQsImlzcyI6InNhcmlza2EiLCJhdWQiOiJtZWRpYV9tZXNzYWdpbmdfY28tYnJvd3NpbmciLCJleHAiOjE2NDgyMTgwMjR9.rln0DbMgEvnjjKV-ibJmjJqXLSOJ5at8URxSdflcFP6gXjSKO4epJZtl6EZGPgkK0e2BmKdL5EjPZ_4nScXpF0yno7TBY54rOvy_GPBFfsib3ZVW0FF8yG9bZeeKZJ3fJ0PdH9skotC-1_elDtplqusuBNLp1khKPd4bJHy819CO5UlJBa88-gtCnSVLnOCKUTCoIYVqlYtPMZB-BGJcSAW2tRjvTm8i1069AKdGoC1V80en8YW8u3ksEJD97FO5R7rssNA1HvqAzZzo2a4BHLKFNk3LJdByOjX8wtHeHOljfVtxpPTVH2Qb-E-kuJiEm5fj6wgxI_vRS049mltEjw", "options");

connection.addEventListener(
    SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED,
    onConnectionSuccess);
connection.addEventListener(
    SariskaMediaTransport.events.connection.CONNECTION_FAILED,
    onConnectionFailed);
connection.addEventListener(
    SariskaMediaTransport.events.connection.CONNECTION_DISCONNECTED,
    disconnect);

SariskaMediaTransport.mediaDevices.addEventListener(
    SariskaMediaTransport.events.mediaDevices.DEVICE_LIST_CHANGED,
    onDeviceListChanged);

connection.connect();

SariskaMediaTransport.createLocalTracks({ devices: [ 'audio', 'video' ] })
    .then(onLocalTracks)
    .catch(error => {
        throw error;
    });

if (SariskaMediaTransport.mediaDevices.isDeviceChangeAvailable('output')) {
    SariskaMediaTransport.mediaDevices.enumerateDevices(devices => {
        const audioOutputDevices
            = devices.filter(d => d.kind === 'audiooutput');

        if (audioOutputDevices.length > 1) {
            $('#audioOutputSelect').html(
                audioOutputDevices
                    .map(
                        d =>
                            `<option value="${d.deviceId}">${d.label}</option>`)
                    .join('\n'));

            $('#audioOutputSelectWrapper').show();
        }
    });
}
