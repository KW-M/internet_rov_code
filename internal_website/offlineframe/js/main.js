import { receiveProxiedMsg, setSendProxyMessageCallback } from "../../js/proxyReciever";
const iframe = document.createElement('iframe');
const iframeHost = window.location.protocol.replace(":", "") + '://' + window.location.host;
// const iframeHost = 'http://10.0.0.48:5173'
iframe.src = iframeHost + '/frontend/index.html'
iframe.sandbox = "allow-scripts"
iframe.onload = () => {
    console.info("iframe loaded")
}
document.body.appendChild(iframe);
setSendProxyMessageCallback((data) => {
    iframe.contentWindow.postMessage(data, iframeHost)
})
window.addEventListener('message', (msg) => {
    if (msg.origin === iframeHost) {
        console.log("Got message", msg.data)
        receiveProxiedMsg(msg.data)
    }
})
