// https://stackoverflow.com/questions/61865890/run-websocket-in-web-worker-or-service-worker-javascript
// https://github.com/skepticfx/wshook
// Some Ideas

import { waitfor } from "../../js/util";
import { wsHook } from "../../js/wsHook";


export async function testProxy(wsObject: WebSocket) {
    await waitfor(1000);
    console.log("Triggering Open")
    wsHook.triggerOnOpen(wsObject);
    await waitfor(1000);
    console.log("Triggering MSG")
    wsHook.triggerOnMessage(wsObject, new Uint8Array([1, 2, 3, 5, 7, 13, 20]));
    await waitfor(1000);
    console.log("Triggering ERR")
    wsHook.triggerOnError(wsObject);
    await waitfor(1000);
    console.log("Triggering Close")
    wsHook.triggerOnClose(wsObject);
}

wsHook.beforeNewSocket = (wsObject) => {
    testProxy(wsObject).then()
    return wsObject;
}
wsHook.modifyUrl = (url: string | URL) => {
    console.log("modifyUrl: ", url)
    return url
};
wsHook.beforeOpen = (ev, url, wsObject) => {
    console.log("intercepted open: ", url, ev)
    return null;
};
wsHook.beforeError = (ev, url, wsObject) => {
    console.log("intercepted err: ", url, ev)
    return null;
};
wsHook.beforeClose = (ev, url, wsObject) => {
    console.log("intercepted close: ", url, ev)
    return null;
};
wsHook.beforeSend = (data, url, wsObject) => {
    console.log("intercepted send: ", url, data)
    return null;
};
wsHook.afterRecive = (ev, url, wsObject) => {
    console.log("intercepted Recive: ", url, ev)
    return ev;
};

let a = new WebSocket("ws://example.com")
a.onopen = (e) => { console.log("open", e) }
a.onmessage = (e) => { console.log("mesage", e) }
a.onclose = (e) => { console.log("close", e) }
a.onerror = (e) => { console.log("error", e) }

// a.addEventListener("open", (e) => { console.log("open", e) })
// a.addEventListener("error", (e) => { console.log("errror", e) })
// a.addEventListener("message", (e) => { console.log("msg", e) })
// a.addEventListener("close", (e) => { console.log("msg", e) })
// a.onmessage = (e) => { console.log("mesage", e) }
// a.onclose = (e) => { console.log("close", e) }
// a.onerror = (e) => { console.log("error", e) }
a.send("hi");
