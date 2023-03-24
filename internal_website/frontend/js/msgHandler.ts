import { receiveProxiedMsg } from "./proxy";

export function handleFrontendMsgRcvd(msgBytes: ArrayBufferLike) {
    receiveProxiedMsg(msgBytes);
}
