import { setSendProxyMessageCallback, receiveProxiedMsg } from "./proxy"

export function enableFrameProxy() {
    if (window.parent) {
        // const origin = window.parent.location.protocol.replace(":", "") + "://" + window.parent.location.host;
        setSendProxyMessageCallback((data) => {
            console.log("postMessage", data)
            window.parent.postMessage(data, "*")
        })
        window.addEventListener('message', (msg) => {
            // if (msg.origin === origin) {
            console.log("Got iframe parent message", msg)
            receiveProxiedMsg(msg.data)
            // }
        })
    } else console.warn("enableFrameProxy() called without this page being inside an iframe")
}
