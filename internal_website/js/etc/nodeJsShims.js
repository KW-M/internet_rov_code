// Do not import this file directly, run npm compile:browserify to turn this file into nodeShimsBundle.js
const sdk = require('livekit-server-sdk')
window.livekitServerSDK = sdk;
// module.exports = {
//     livekitServerSDK: sdk
// }
