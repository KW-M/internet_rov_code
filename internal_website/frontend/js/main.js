import { connectToLivekitRoom, listLivekitRooms } from "./livekit";
import { waitfor } from "../../js/util"
// import { wsHook } from "../../js/wsHook"
import { DECODE_TXT } from "../../js/consts";
// import { SignalRequest } from "livekit-client/dist/src/proto/livekit_rtc";
// import * as joo from "./proxy"

const urlParams = new URLSearchParams(location.search);
const rovChooserElem = document.getElementById("rov_chooser")
let rooms = [];

// wsHook.beforeSend = function (data, url, wsObject) {
//     // DECODE_TXT(data)
//     // DECODE_TXT(new Uint8Array(data))
//     // let data2 = new Uint8Array(data);
//     // let txt = new TextDecoder().decode(data)
//     let resp = {};
//     if (typeof data === 'string') {
//         const json = JSON.parse(data);
//         resp = SignalRequest.fromJSON(json);
//     } else if (data instanceof ArrayBuffer || data instanceof Uint8Array) {
//         resp = SignalRequest.decode(new Uint8Array(data));
//     } else {
//         log.error(`could not decode outgoing websocket message: ${typeof data}`);
//     }
//     console.log("Sending message to " + url + " : ", resp);
//     return data
// }

// // Make sure your program calls `wsClient.onmessage` event handler somewhere.
// wsHook.afterRecive = function (messageEvent, url, wsObject) {
//     //  DECODE_TXT(new Uint8Array(messageEvent.data)));
//     // console.log("Received message from " + url + " : ", DECODE_TXT(messageEvent.data));
//     // https://github.com/livekit/client-sdk-js/blob/fa814646a6b345030019dace587508f8a10812d9/src/api/SignalClient.ts#L229
//     // if (typeof ev.data === 'string') {
//     //     const json = JSON.parse(ev.data);
//     //     resp = SignalResponse.fromJSON(json);
//     // } else if (ev.data instanceof ArrayBuffer) {
//     //     resp = SignalResponse.decode(new Uint8Array(ev.data));
//     // } else {
//     //     log.error(`could not decode websocket message: ${typeof ev.data}`);
//     //     return;
//     // }
//     return messageEvent;
// }



// new WebSocket().onmessage((ev) => { ev.})

// // if you do not want to propagate the MessageEvent further down, just return null
// wsHook.after = function(messageEvent, url, wsObject) {
//  console.log("Received message from " + url + " : " + messageEvent.data);
//  // This example can ping-pong forever, so maybe use some conditions
//  wsObject.send("Intercepted and sent again")
//  return null;
// }

async function start() {
    console.log("Starting")
    while (true) {
        const rooms = await listLivekitRooms()
        if (rooms.length > 0) {
            rovChooserElem.innerHTML = "";
            rooms.forEach(room => {
                const button = document.createElement("button");
                const { accessToken } = JSON.parse(room.metadata)
                // console.log("room " + room.name + " accessToken", accessToken)
                button.innerText = "Connect to " + room.name;
                button.onclick = () => { connectToLivekitRoom(room.name, accessToken); }
                rovChooserElem.appendChild(button);
            });
        } else {
            rovChooserElem.innerHTML = "Searching...";
        }
        await waitfor(1000);
    }
}
start()
