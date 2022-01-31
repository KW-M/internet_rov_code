// FOR A PEERJS SERVER RUNNING IN THE CLOUD (Heroku, but could also be peerjs cloud or elsewhere)
const peerServerCloudOptions = {
    host: '0.peerjs.com',
    secure: true,
    path: '/',
    port: 443,
}

// FOR A PEERJS SERVER RUNNING ON THE ROV Raspberry Pi:
const peerServerLocalOptions = {
    host: 'raspberrypi.local', // or whatever ip the raspberrypi is at
    path: '/',
    secure: false,
    port: 9000,
}

// FOR CONVERTING TEXT TO/FROM BINARY FOR SENDING OVER THE WEBRTC DATACHANNEL
const messageEncoder = new TextEncoder(); // always utf-8
const messageDecoder = new TextDecoder(); // always utf-8



