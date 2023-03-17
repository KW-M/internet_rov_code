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
    LocalAudioTrack,
    MediaDeviceFailure,
    ConnectionQuality,
    ParticipantEvent,
    TrackPublication,
    DisconnectReason
} from 'livekit-client';

export type LivekitSetupOptions = {
    ForceLocal: boolean,
    RovRoomName: string,
    CloudSecretKey: string,
    CloudAPIKey: string,
    LocalSecretKey: string,
    LocalAPIKey: string
}


import * as nothin from '../../js/nodeShimsBundle'
console.log(nothin); // KEEP SO NODE SHIMS GET INCLUDED
// import type { AccessToken as AccessTokenType, AccessTokenOptions, RoomServiceClient } from 'livekit-server-sdk';
import type * as livekitServerSDKTypes from 'livekit-server-sdk';
import { LIVEKIT_CLOUD_ENDPOINT, LIVEKIT_LOCAL_ENDPOINT, LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG, DECODE_TXT } from '../../js/consts';
import { appendLog, getWebsocketURL } from '../../js/util';
import { getFrontendAccessToken, getPublisherAccessToken } from './livekitTokens';
const RoomServiceClient = globalThis.nodeJsShim.livekitServerSDK.RoomServiceClient as typeof livekitServerSDKTypes.RoomServiceClient
let currentRoom: Room | undefined = undefined;

export async function createLivekitRoom(client: livekitServerSDKTypes.RoomServiceClient, roomName: string) {
    return await client.createRoom({
        name: roomName,
        maxParticipants: 12,
        emptyTimeout: 30, // 30 seconds
    })
}

export async function updateLivekitRoomMetadata(client: livekitServerSDKTypes.RoomServiceClient, roomName: string, metadata: string) {
    return await client.updateRoomMetadata(roomName, metadata)
}

export async function listLivekitRooms(client: livekitServerSDKTypes.RoomServiceClient) {
    const rooms = await client.listRooms();
    return rooms.filter(room => room.numParticipants > 0).map(room => room.name)
}

export async function refreshMetadata(cloudRoomClient: livekitServerSDKTypes.RoomServiceClient, livekitSetup: LivekitSetupOptions) {
    const frontendAccessToken = getFrontendAccessToken(livekitSetup.CloudAPIKey, livekitSetup.CloudSecretKey, livekitSetup.RovRoomName, "PERSON" + Date.now().toString());
    await updateLivekitRoomMetadata(cloudRoomClient, livekitSetup.RovRoomName, JSON.stringify({
        accessToken: frontendAccessToken,
    }));
}

export async function connectToLivekit(livekitSetup: LivekitSetupOptions): Promise<boolean> {
    if (!livekitSetup.CloudAPIKey || !livekitSetup.CloudSecretKey || !livekitSetup.RovRoomName) throw new Error("Missing some required livekit setup url query params.");
    const livekitUrlEndpoint = livekitSetup.ForceLocal ? LIVEKIT_LOCAL_ENDPOINT : LIVEKIT_CLOUD_ENDPOINT;
    const startTime = Date.now();

    // generate authTokens from the credentials:
    const cloudToken = getPublisherAccessToken(livekitSetup.CloudAPIKey, livekitSetup.CloudSecretKey, livekitSetup.RovRoomName);
    const cloudRoomClient = new RoomServiceClient(livekitUrlEndpoint, livekitSetup.CloudAPIKey, livekitSetup.CloudSecretKey)
    await createLivekitRoom(cloudRoomClient, livekitSetup.RovRoomName);
    await refreshMetadata(cloudRoomClient, livekitSetup);

    // creates a new room with options
    const rovRoom = new Room({

        // specify how offten to retry connection when it fails.
        reconnectPolicy: new DefaultReconnectPolicy(),

        // optimize publishing bandwidth and CPU for published tracks
        dynacast: true,

        // default capture settings
        videoCaptureDefaults: {
            resolution: VideoPresets.h1080.resolution,
            // facingMode: 'environment',
            // deviceId: //get device id beforehand
        },

        publishDefaults: {},

    });

    // set up event listeners
    rovRoom
        .on(RoomEvent.SignalConnected, async () => {
            const signalConnectionTime = Date.now() - startTime;
            appendLog(`signal connection established in ${signalConnectionTime}ms`);
            // speed up publishing by starting to publish before it's fully connected
            // publishing is accepted as soon as signal connection has established
            let camResult = await rovRoom.localParticipant.setCameraEnabled(true);
            appendLog(`tracks published in ${Date.now() - startTime}ms`);
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
            await refreshMetadata(cloudRoomClient, livekitSetup);
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
        .on(RoomEvent.DataReceived, async (msg: Uint8Array, participant?: RemoteParticipant) => {
            const person = participant ? participant.identity : "SERVER";
            appendLog('Got dataReceived from ', person, DECODE_TXT(msg));
        })
        .on(RoomEvent.RoomMetadataChanged, (metadata) => {
            appendLog('new metadata for room', metadata);
        })
        .on(RoomEvent.MediaDevicesChanged, () => {
            appendLog('MediaDevicesChanged');
        })
        .on(RoomEvent.LocalTrackUnpublished, (track: LocalTrackPublication, participant: LocalParticipant) => {
            appendLog("LocalTrackUnpublished!!!?", track, participant)
        })
        .on(RoomEvent.LocalTrackPublished, (track: LocalTrackPublication, participant: LocalParticipant) => {
            appendLog('LocalVideoTrackPublished ', track, participant)
        })
        .on(RoomEvent.MediaDevicesError, (e: Error) => {
            const failure = MediaDeviceFailure.getFailure(e);
            appendLog('media device failure', failure);
        })
        .on(RoomEvent.ConnectionQualityChanged, (quality: ConnectionQuality, participant?: Participant) => {
            appendLog('connection quality changed', participant?.identity, quality);
        })
        .on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
            appendLog('subscribed to track _THIS SHOULDN\'T HAPPEN on BACKEND??_', pub.trackSid, participant.identity);
        })
        .on(RoomEvent.TrackUnsubscribed, (_, pub, participant) => {
            appendLog('unsubscribed from track _THIS SHOULDN\'T HAPPEN on BACKEND??_', pub.trackSid);
        }).on(RoomEvent.AudioPlaybackStatusChanged, () => {
            appendLog('AudioPlaybackStatusChanged _THIS SHOULDN\'T HAPPEN on BACKEND??_', rovRoom.canPlaybackAudio);
        })


    // await waitingRoom.connect(getWebsocketURL(livekitUrlEndpoint), cloudToken, LIVEKIT_ROOM_CONNECTION_CONFIG);
    // console.log('connected to w room', waitingRoom.name);
    // waitingRoom.addListener('dataReceived', (payload, participant, kind, topic) => {
    //     waitingRoom.
    // })



    await rovRoom.connect(getWebsocketURL(livekitUrlEndpoint), cloudToken, LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG); // local: 'ws://localhost:7800',
    console.log('connected to room', rovRoom.name);
    // let camResult = await rovRoom.localParticipant.setCameraEnabled(true);
    // console.log('video live', rovRoom.name, camResult);
    let roomList = await listLivekitRooms(cloudRoomClient);
    console.log('roomList', roomList);
    return true;
}
