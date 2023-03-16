import type { RoomConnectOptions } from "livekit-client"

declare global {
    interface Window {
        LIVEKIT_TOKEN: string
    }
}

export const ENCODE_TXT = new TextEncoder().encode
export const DECODE_TXT = new TextDecoder().decode

export const LIVEKIT_CLOUD_ENDPOINT = 'rov-web.livekit.cloud'
export const LIVEKIT_LOCAL_ENDPOINT = 'localhost:7880'

export const LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG: RoomConnectOptions = {
    autoSubscribe: false,
    maxRetries: 1000,
    peerConnectionTimeout: 45_000, // miliseconds
}

export const LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG: RoomConnectOptions = {
    autoSubscribe: true,
    maxRetries: 6,
    peerConnectionTimeout: 15_000, // miliseconds
}
