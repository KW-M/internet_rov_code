// https://stackoverflow.com/questions/61865890/run-websocket-in-web-worker-or-service-worker-javascript
// https://github.com/skepticfx/wshook
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects
// Some Ideas

import { DECODE_TXT, ENCODE_TXT, PROXY_PREFIX } from "../../js/consts";
import { waitfor } from "../../js/util";
import { wsHook } from "../../js/wsHook";

export enum proxyMessageTypes {
    openWebsocket,
    socketMsg,
    outgoingHttpReq,
    incomingHttpReq,
}

export type proxyInterchangeFormat = {
    type: proxyMessageTypes;
    url: string;
    body: number[]; // binary data
    result: object; // for fetch response
}

let isOnline = true;
const proxiedWsObjects: { [key: string]: WebSocket } = {};
let sendProxyMessageCallback: ((data: ArrayBufferLike) => void) | null = null
export function setSendProxyMessageCallback(callback: (data: ArrayBufferLike) => void) {
    sendProxyMessageCallback = callback;
}

const isProxiedUrl = (url: string) => {
    return url.startsWith(PROXY_PREFIX) || !isOnline
}

wsHook.allowNewSocket = (url) => {
    console.log("Checking ws url: ", url)
    if (isProxiedUrl(url)) {
        console.log("Proxying ws url: ", url)
        return false;
    } else return true;
};

wsHook.modifyUrl = (url: string | URL) => {
    url = url.toString();
    if (isProxiedUrl(url)) url = url.substring(PROXY_PREFIX.length)
    console.log("modifyUrl: ", url)
    return url
};


wsHook.afterInit = (wsObject) => {
    const url = wsObject.url;
    if (!wsObject.isReal) {
        proxiedWsObjects[url] = wsObject;
        setTimeout(() => {
            wsHook.triggerOnOpen(wsObject);
            sendNewConnMsgThruProxy(url);
        }, 1)
    }
    return wsObject;
};

wsHook.beforeSend = (data, url, wsObject) => {
    if (wsObject.isReal) {
        return data;
    } else {
        console.log("beforeSend: ", wsObject.isReal, wsObject.url, data)
        sendDataThruProxy(url, new Uint8Array(data as ArrayBuffer))
        return null
    }
}

function sendNewConnMsgThruProxy(url: string) {
    const proxiedMsg = {
        type: proxyMessageTypes.openWebsocket,
        url: url,
    } as proxyInterchangeFormat
    console.log("Sending openWebsocket msg Thru Proxy", proxiedMsg)
    if (sendProxyMessageCallback) sendProxyMessageCallback(ENCODE_TXT(JSON.stringify(proxiedMsg)))
}

function sendDataThruProxy(url: string, data: ArrayBufferLike) {
    const binary = new Uint8Array(data)
    const proxiedMsg = {
        type: proxyMessageTypes.socketMsg,
        url: url,
        body: new Array(...binary)
    } as proxyInterchangeFormat
    console.log("Sending Data Thru Proxy", proxiedMsg)
    if (sendProxyMessageCallback) sendProxyMessageCallback(ENCODE_TXT(JSON.stringify(proxiedMsg)))
}

export function receiveProxiedMsg(rawMsg: ArrayBufferLike) {
    const proxiedMsg = JSON.parse(DECODE_TXT(rawMsg)) as proxyInterchangeFormat;
    if (proxiedMsg.type === proxyMessageTypes.socketMsg) {
        const ws = proxiedWsObjects[proxiedMsg.url]
        const body = new Uint8Array(proxiedMsg.body)
        console.log("Received Proxy Message", proxiedMsg, body)
        if (ws) wsHook.triggerOnMessage(ws, body)
    }
}
