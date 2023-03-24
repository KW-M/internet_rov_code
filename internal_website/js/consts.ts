import type { RoomConnectOptions } from "livekit-client"

declare global {
    interface Window {
        LIVEKIT_TOKEN: string
    }
}

const TE = new TextEncoder();
export const ENCODE_TXT = (txt: string) => TE.encode(txt)
const TD = new TextDecoder();
export const DECODE_TXT = (data: ArrayBufferLike) => TD.decode(data)

export const LIVEKIT_CLOUD_ENDPOINT = 'https://rov-web.livekit.cloud'
export const LIVEKIT_LOCAL_ENDPOINT = 'http://localhost:7880'
export const PROXY_PREFIX = 'proxy:';

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
