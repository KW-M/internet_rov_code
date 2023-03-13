
import * as nothin from '../../js/nodeShimsBundle'
console.log(nothin)


import type * as livekitServerSDKTypes from 'livekit-server-sdk';
const AccessToken = globalThis.nodeJsShim.livekitServerSDK.AccessToken as typeof livekitServerSDKTypes.AccessToken


/**
 * Get a livekit server auth token that's valid for 24 hrs.
 * @param {string} apiKey livekit api key to use
 * @param {string} secretKey livekit api secret key to use
 * @param {string} rovName the room name & user identity to use.
 * @returns {string} JWT token
 */
export function getPublisherAccessToken(apiKey, secretKey, rovName) {
    const token = new AccessToken(apiKey, secretKey, {
        identity: rovName,
        ttl: 86400, // (seconds in 24hrs),
    })
    token.addGrant({
        room: rovName,
        roomJoin: true,
        roomCreate: true,
        roomAdmin: true,
        roomList: true,
        canPublish: true,
        canSubscribe: false,
        canPublishData: true,
    });
    return token.toJwt();
}

/**
 * Get a livekit server auth token that's valid for 24 hrs.
 * @param {string} apiKey livekit api key to use
 * @param {string} secretKey livekit api secret key to use
 * @returns {string} JWT token */
export function getFrontendAccessToken(apiKey, secretKey, roomName, name) {
    const token = new AccessToken(apiKey, secretKey, {
        identity: name,
        name: name,
        ttl: 21600 // 6 hours in seconds,
    })
    token.addGrant({
        room: roomName,
        roomList: true,
        roomJoin: true,
        canPublish: true, // CHANGE this to false
        canSubscribe: true,
        canPublishData: true,
    });
    return token.toJwt();
}

/**
 * Get a livekit server auth token that's valid for hundreds of years, but has little access.
 * @param {string} apiKey livekit api key to use
 * @param {string} secretKey livekit api secret key to use
 * @returns {string} JWT token */
export function getLongTermStarterAccessToken(apiKey, secretKey) {
    const token = new AccessToken(apiKey, secretKey, {
        identity: 'lt',
        ttl: 9460800000 // 300 years
    })
    token.addGrant({
        roomList: true,
        roomJoin: false,
        canPublish: false,
        canSubscribe: false,
        canPublishData: false,
    });
    return token.toJwt();
}
