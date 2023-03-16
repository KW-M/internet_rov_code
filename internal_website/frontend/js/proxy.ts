// https://stackoverflow.com/questions/61865890/run-websocket-in-web-worker-or-service-worker-javascript
// https://github.com/skepticfx/wshook
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects
// Some Ideas

import { DECODE_TXT, ENCODE_TXT } from "../../js/consts";
import { waitfor } from "../../js/util";
import { wsHook } from "../../js/wsHook";

enum proxyMessageTypes {
    openWebsocket,
    socketMsg,
    outgoingHttpReq,
    incomingHttpReq,
}

type proxyInterchangeFormat = {
    type: proxyMessageTypes;
    url: string;
    body: number[]; // binary data
}

let isOnline = true;
const proxiedWsObjects: { [key: string]: WebSocket } = {};
let sendLivekitDataCallback: ((data: ArrayBufferLike) => void) | null = null

export function setSendLivekitDataCallback(callback: (data: ArrayBufferLike) => void) {
    sendLivekitDataCallback = callback;
}

const isProxiedUrl = (url) => {
    return url.includes("proxy") || !isOnline
}

wsHook.allowNewSocket = (url) => {
    if (isProxiedUrl(url)) {
        return false
    } else return true;
};

wsHook.modifyUrl = (url: string | URL) => {
    console.log("modifyUrl: ", url)
    return url
};


wsHook.afterInit = (wsObject) => {
    const url = wsObject.url;
    if (isProxiedUrl(url)) {
        proxiedWsObjects[url] = wsObject;
        wsHook.triggerOnOpen(wsObject)
    }
    return wsObject;
};

wsHook.beforeSend = (data, url, wsObject) => {
    if (!isProxiedUrl(url)) return data;
    sendDataThruProxy(url, new Uint8Array(data as ArrayBuffer))
    return null
}

function sendDataThruProxy(url: string, data: ArrayBufferLike) {
    const binary = new Uint8Array(data)
    const proxiedMsg = {
        type: proxyMessageTypes.socketMsg,
        url: url,
        body: new Array(...binary)
    } as proxyInterchangeFormat
    console.log("Sending Data Thru Proxy", proxiedMsg)
    if (sendLivekitDataCallback) sendLivekitDataCallback(ENCODE_TXT(JSON.stringify(proxiedMsg)))
}

export function receiveProxiedMsg(rawMsg: ArrayBufferLike) {
    const proxiedMsg = JSON.parse(DECODE_TXT(rawMsg)) as proxyInterchangeFormat;
    console.log("Received Proxy Message", proxiedMsg)
    if (proxiedMsg.type === proxyMessageTypes.socketMsg) {
        const ws = proxiedWsObjects[proxiedMsg.url]
        const body = new Uint8Array(proxiedMsg.body)
        if (ws) wsHook.triggerOnMessage(ws, body)
    }
}
