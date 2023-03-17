import {
    Room,
    RoomEvent,
    RemoteParticipant,
    RemoteTrackPublication,
    RemoteTrack,
    Participant,
    VideoPresets,
    DefaultReconnectPolicy,
    RoomConnectOptions,
    LivekitError,
    LocalTrackPublication,
    LocalParticipant,
    Track,
    ParticipantEvent,
    TrackPublication,
    DisconnectReason,
    MediaDeviceFailure,
    ConnectionQuality
} from 'livekit-client';
import { DECODE_TXT, LIVEKIT_CLOUD_ENDPOINT, LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG, LIVEKIT_LOCAL_ENDPOINT } from '../../js/consts';
import { appendLog, getWebsocketURL } from '../../js/util';
let currentRoom: Room | undefined = undefined;

declare global {
    interface Window {
        LIVEKIT_TOKEN: string;
    }
}

export async function listLivekitRooms() {
    const accessToken = window.LIVEKIT_TOKEN
    return await fetch(LIVEKIT_CLOUD_ENDPOINT + '/twirp/livekit.RoomService/ListRooms', {
        method: 'POST',
        cache: 'no-cache',
        mode: 'cors',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        }
    }).then(response => response.json()).then(response => {
        const rooms = response.rooms;
        if (!rooms || !Array.isArray(rooms)) throw new Error(`Error getting room list: ${JSON.stringify(response)}`)
        return rooms.filter(room => room['num_participants'] > 0)
    });
}

export async function connectToLivekitRoom(roomName: string, accessToken: string): Promise<boolean> {
    const livekitUrlEndpoint = false ? LIVEKIT_LOCAL_ENDPOINT : LIVEKIT_CLOUD_ENDPOINT;
    const startTime = Date.now();

    // creates a new room object with options
    const rovRoom = new Room({
        // specify how offten to retry connection when it fails.
        reconnectPolicy: new DefaultReconnectPolicy(),
        // automatically manage subscribed video quality
        adaptiveStream: true,
    });

    // set up event listeners
    rovRoom
        .on(RoomEvent.SignalConnected, async () => {
            const signalConnectionTime = Date.now() - startTime;
            appendLog(`signal connection established in ${signalConnectionTime}ms`);
        })
        .on(RoomEvent.Connected, async () => {
            appendLog(`Connected to room: ${rovRoom.name}`)
        })
        .on(RoomEvent.Disconnected, (reason?: DisconnectReason) => {
            if (!currentRoom) return;
            appendLog('disconnected from room', { reason }, currentRoom.localParticipant);
            currentRoom.participants.forEach((p) => { });
            currentRoom = undefined;
        })
        .on(RoomEvent.Reconnecting, () => {
            appendLog('Reconnecting to room')
        })
        .on(RoomEvent.Reconnected, async () => {
            appendLog(
                'Successfully reconnected. server',
                await rovRoom.engine.getConnectedServerAddress(),
            );
        })
        .on(RoomEvent.ParticipantConnected, async (participant: Participant) => {
            appendLog('participant', participant.identity, 'connected', participant.metadata);
            participant
                .on(ParticipantEvent.TrackMuted, (pub: TrackPublication) => {
                    appendLog('track was muted', pub.trackSid, participant.identity);
                })
                .on(ParticipantEvent.TrackUnmuted, (pub: TrackPublication) => {
                    appendLog('track was unmuted', pub.trackSid, participant.identity);
                })
                .on(ParticipantEvent.IsSpeakingChanged, () => {
                    appendLog('ParticipantEvent.IsSpeakingChanged', participant.isSpeaking);
                })
                .on(ParticipantEvent.ConnectionQualityChanged, () => {
                    appendLog('ParticipantEvent.ConnectionQualityChanged', participant.connectionQuality);
                });
        })
        .on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
            appendLog('participant', participant.sid, 'disconnected');
        })
        .on(RoomEvent.MediaDevicesError, (e: Error) => {
            const failure = MediaDeviceFailure.getFailure(e);
            appendLog('media device failure', failure);
        })
        .on(RoomEvent.ConnectionQualityChanged, (quality: ConnectionQuality, participant?: Participant) => {
            appendLog('connection quality changed', participant?.identity, quality);
        })
        .on(RoomEvent.TrackSubscribed, (
            track: RemoteTrack,
            publication: RemoteTrackPublication,
            participant: RemoteParticipant,
        ) => {
            if (track.kind === Track.Kind.Video || track.kind === Track.Kind.Audio) {
                // attach it to a new HTMLVideoElement or HTMLAudioElement
                const element = track.attach();
                document.body.appendChild(element);
            }
            console.log(track)
        })
        .on(RoomEvent.TrackUnsubscribed, (
            track: RemoteTrack,
            publication: RemoteTrackPublication,
            participant: RemoteParticipant,
        ) => {
            // remove tracks from all attached elements
            track.detach();
        })
        .on(RoomEvent.DataReceived, async (msg: Uint8Array, participant?: RemoteParticipant) => {
            const person = participant ? participant.identity : "SERVER";
            appendLog('Got dataReceived from ', person, DECODE_TXT(msg));
        })
        .on(RoomEvent.LocalTrackUnpublished, (track: LocalTrackPublication, participant: LocalParticipant) => {
            console.error("handleLocalTrackUnpublished: _THIS SHOULD NEVER BE HAPPENING_", track, participant)
        })
        .on(RoomEvent.RoomMetadataChanged, (metadata) => {
            appendLog('new metadata for room', metadata);
        })
        .on(RoomEvent.MediaDevicesChanged, () => {
            appendLog('MediaDevicesChanged _THIS SHOULDN\'T HAPPEN?_');
        })
        .on(RoomEvent.AudioPlaybackStatusChanged, () => {
            appendLog('MediaDevicesChanged _THIS SHOULDN\'T HAPPEN?_', rovRoom.canPlaybackAudio);
        })

    await rovRoom.connect(getWebsocketURL(livekitUrlEndpoint), accessToken, LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG); // local: 'ws://localhost:7800',
    console.log('connected to room', rovRoom.name, rovRoom);
    console.log(rovRoom.participants.keys(), rovRoom);

    return true;
}
