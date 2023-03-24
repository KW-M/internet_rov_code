import { connectToRoom, connectToRoomLocal, listLivekitRooms, sendTestMessage } from "./livekit";
import { waitfor } from "../../js/util"
import { DECODE_TXT, ENCODE_TXT, LIVEKIT_CLOUD_ENDPOINT, LIVEKIT_LOCAL_ENDPOINT, PROXY_PREFIX } from "../../js/consts";
import { handleFrontendMsgRcvd } from "./msgHandler";
// import { setSendProxyMessageCallback } from "./proxy";

// import { SignalRequest } from "livekit-client/dist/src/proto/livekit_rtc";

const urlParams = new URLSearchParams(location.search);
const rovChooserElem = document.getElementById("rov_chooser")
const videContainerElem = document.getElementById("video_container")
const openRooms = [];

async function start() {
    console.log("Starting...")

    const sendTestButton = document.createElement("button");
    sendTestButton.innerText = "Send test msg";
    sendTestButton.disabled = true;
    sendTestButton.onclick = () => {
        sendTestMessage();
    }
    document.body.appendChild(sendTestButton);

    while (true) {
        const cloudRooms = await listLivekitRooms(LIVEKIT_CLOUD_ENDPOINT)
        const localRooms = await listLivekitRooms(LIVEKIT_LOCAL_ENDPOINT)
        // console.log("cloud rooms:", cloudRooms, "local rooms:", localRooms)
        const rooms = cloudRooms;
        // const rooms = [{
        //     name: "ROV77",
        //     metadata: '{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUEVSU09OMTY3OTU4MzIyOTUyNCIsInZpZGVvIjp7InJvb20iOiJST1Y3NyIsInJvb21MaXN0Ijp0cnVlLCJyb29tSm9pbiI6dHJ1ZSwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZX0sImlhdCI6MTY3OTU4MzIyOSwibmJmIjoxNjc5NTgzMjI5LCJleHAiOjE2Nzk2MDQ4MjksImlzcyI6IkFQSWtvRTdtM1pxZDVkSiIsInN1YiI6IlBFUlNPTjE2Nzk1ODMyMjk1MjQiLCJqdGkiOiJQRVJTT04xNjc5NTgzMjI5NTI0In0.2sm5PnnzjmaeV5EVrQvLR5kROF3w0_uVU-G5uwSUZ-0"}'
        // }]
        if (rooms.length > 0) {
            rovChooserElem.innerHTML = "";
            rooms.forEach(room => {
                if (!room.metadata) return;
                const button = document.createElement("button");
                const { accessToken } = JSON.parse(room.metadata);
                button.innerText = "Connect to " + room.name;
                button.onclick = () => {
                    connectToRoom(room.name, accessToken).then(() => {
                        sendTestButton.disabled = false;
                        button.innerText = "Connect locally to " + room.name;
                        button.onclick = () => {
                            connectToRoomLocal(room.name, accessToken).then(() => { });
                        }
                    });
                }
                rovChooserElem.appendChild(button);
            });
        } else {
            rovChooserElem.innerHTML = "Searching...";
        }
        await waitfor(1000);
        break;
    }
}
start()
// registerServiceWorker();




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
