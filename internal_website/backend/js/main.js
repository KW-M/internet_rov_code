import { proxyMessageTypes, receiveProxiedMsg } from "../../frontend/js/proxy";
import { DECODE_TXT, ENCODE_TXT } from "../../js/consts";
import { waitfor } from "../../js/util";
import { getMyIpGeolocation } from "./geolocation";
import { connectToLivekit } from "./livekit";


const urlParams = new URLSearchParams(location.search);
connectToLivekit({
    ForceLocal: (urlParams.get("ForceLocal") || "").toLowerCase() === 'true',
    RovRoomName: urlParams.get("RovRoomName"),
    CloudAPIKey: urlParams.get("CloudAPIKey"),
    CloudSecretKey: urlParams.get("CloudSecretKey"),
    LocalAPIKey: urlParams.get("LocalAPIKey"),
    LocalSecretKey: urlParams.get("LocalSecretKey"),
}).then(() => { console.log('connected?'); });

// console.log(getFrontendAccessToken(urlParams.get("CloudAPIKey"), urlParams.get("CloudSecretKey"), "PERSON" + Date.now().toString()))



// setSendProxyMessageCallback((data) => {
//     console.log("Sending Msg Through proxy. JK! ", DECODE_TXT(data));
// })
// let msg = JSON.stringify({
//     url: 'http://wow.com',
//     body: new Array(...ENCODE_TXT("ALL")),
//     type: proxyMessageTypes.socketMsg
// })
// console.log("smg", msg)
// // await waitfor(5000);

// msg = JSON.stringify({
//     url: 'http://wow.com',
//     body: new Array(...ENCODE_TXT("BO")),
//     type: proxyMessageTypes.socketMsg
// })
// console.log("smg", msg)
