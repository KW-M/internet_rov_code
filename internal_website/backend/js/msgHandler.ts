import { receiveProxiedMsg } from "../../js/proxyReciever";

export function handleBackendMsgRcvd(msgBytes: ArrayBufferLike) {
    receiveProxiedMsg(msgBytes);
}
