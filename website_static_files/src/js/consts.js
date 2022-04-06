// FOR A PEERJS SERVER RUNNING IN THE CLOUD (Heroku, but could be changed to connect to the peerjs cloud or elsewhere)
export const peerServerCloudOptions = {
    host: '0.peerjs.com',
    secure: true,
    path: '/',
    port: 443,
}

// FOR A PEERJS SERVER RUNNING ON THE ROV Raspberry Pi:
export const peerServerLocalOptions = {
    host: 'raspberrypi.local', // or whatever ip the raspberrypi is at
    path: '/',
    secure: false,
    port: 9000,
}

export const rovPeerIdBase = "iROV-";

