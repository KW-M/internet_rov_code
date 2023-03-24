/* eslint-disable no-proto */
/* eslint-disable accessor-pairs */
/* eslint-disable no-global-assign */

/* wsHook.js
 * https://github.com/skepticfx/wshook
 * Reference: http://www.w3.org/TR/2011/WD-websockets-20110419/#websocket
 */

declare global {
  interface MessageEvent {
    path?: string[];
    parts?: string[];
    __proto__: MessageEvent
  }
  interface WebSocket {
    _onopen?: (ev?: Event) => void;
    _onerror?: (ev?: Event) => void;
    _onclose?: (ev?: CloseEvent) => void;
    _onmessage?: (ev?: MessageEvent) => void;
    _addEventListener?: <K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => void;
    _readyState: number;
    isReal?: boolean;
  }
}

type socketMsgDataTypes = string | ArrayBufferLike | Blob | ArrayBufferView

// Mutable MessageEvent.
// Subclasses MessageEvent and makes data, origin and other MessageEvent properites mutatble.
export interface MutableMessageEvent<T = any> extends MessageEvent<T> {
  bubbles: boolean;
  cancelBubble: boolean;
  cancelable: boolean;
  currentTarget: EventTarget | null;
  data: T;
  defaultPrevented: boolean;
  eventPhase: number;
  lastEventId: string;
  origin: string;
  path: string[];
  ports: MessagePort[];
  returnValue: boolean;
  source: MessageEventSource | null;
  srcElement: EventTarget | null;
  target: EventTarget | null;
  timeStamp: number;
  type: string;
}

const MakeMutableMessageEvent = (ev: MessageEvent) => {
  return {
    ...ev,
    bubbles: ev.bubbles || false,
    cancelBubble: ev.cancelBubble || false,
    cancelable: ev.cancelable || false,
    currentTarget: ev.currentTarget || null,
    data: ev.data,
    defaultPrevented: ev.defaultPrevented || false,
    eventPhase: ev.eventPhase || 0,
    lastEventId: ev.lastEventId || '',
    origin: ev.origin || '',
    path: ev.path || new Array(0),
    ports: ev.parts || new Array(0),
    returnValue: ev.returnValue || true,
    source: ev.source || null,
    srcElement: ev.srcElement || null,
    target: ev.target || null,
    timeStamp: ev.timeStamp || -1,
    type: ev.type || 'message',
    initMessageEvent: ev.initMessageEvent || null,
    __proto__: ev.__proto__,// || MessageEvent.__proto__
  } as MutableMessageEvent
}

export const wsHook = {
  triggerOnOpen: (wsObject: WebSocket, ev?: Event) => {
    ev = ev || new Event("open", { composed: false, bubbles: false, cancelable: false })
    wsObject._readyState = 1;
    if (wsObject._onopen) wsObject._onopen(ev);
    // wsObject.dispatchEvent(ev)
  },
  triggerOnError: (wsObject: WebSocket, ev?: Event) => {
    ev = ev || new Event("error", { composed: false, bubbles: false, cancelable: false })
    wsObject._readyState = 3;
    if (wsObject._onerror) wsObject._onerror(ev);
  },
  triggerOnClose: (wsObject: WebSocket, ev?: CloseEvent) => {
    ev = ev || new CloseEvent("close", { wasClean: true, reason: "wsHook", composed: false, bubbles: false, cancelable: false, code: 1006 })
    wsObject._readyState = 3;
    if (wsObject._onclose) wsObject._onclose(ev);
  },
  triggerOnMessage: (wsObject: WebSocket, data: socketMsgDataTypes) => {
    // @ts-ignore
    if (!(typeof data === typeof '' || data instanceof ArrayBuffer)) data = (data as Uint8Array).buffer;
    console.log("triggerOnMessage", data, wsObject);
    const ev = new MessageEvent("mesage", { data: data, origin: wsObject.url, bubbles: false, cancelable: false, composed: false })
    if (wsObject._onmessage) wsObject._onmessage(ev);
  },
  /**
   * Whenever the a "new WebSocket()" call is made, wsHook.allowNewSocket will get called with the url of the new websocket
   * @param url: the url passed to the new WebSocket() constructor
   * @returns Return true to allow the default websocket behavior. Return false to create a mock WebSocket that never hits the network but can still be controlled with wsHook.trigger* calls.
   */
  allowNewSocket: (url: string): boolean => {
    return true;
  },
  modifyUrl: (url: string | URL) => {
    return url
  },
  afterInit: (wsObject: WebSocket): WebSocket => {
    return wsObject;
  },
  beforeOpen: (ev: Event, url: string, wsObject: WebSocket): Event | null => {
    return ev;
  },
  beforeError: (ev: Event, url: string, wsObject: WebSocket): Event | null => {
    return ev;
  },
  beforeClose: (ev: CloseEvent, url: string, wsObject: WebSocket): CloseEvent | null => {
    return ev;
  },
  beforeSend: (data: socketMsgDataTypes, url: string, wsObject: WebSocket): socketMsgDataTypes | null => {
    return data;
  },
  afterRecive: (ev: MessageEvent, url: string, wsObject: WebSocket): MessageEvent | MutableMessageEvent | null => {
    return ev;
  },
  resetHooks: () => { }
};

(function () {

  // setup WSHook default functions
  const defaultWSHooks = Object.assign({}, wsHook) // make a copy of the default functions
  wsHook.resetHooks = function () {
    Object.assign(wsHook, defaultWSHooks)
  }

  // overwrite the default websocket
  var _WS = WebSocket
  // @ts-ignore
  WebSocket = Object.assign(function (url: string | URL, protocols?: string | string[] | undefined): WebSocket {
    const allowRealSocket = wsHook.allowNewSocket(url.toString())
    url = wsHook.modifyUrl(url) || url
    let WSObject: WebSocket;
    if (allowRealSocket) {
      WSObject = protocols ? new _WS(url, protocols) : new _WS(url);
      WSObject.isReal = true;
    } else {
      // @ts-ignore
      WSObject = Object.assign({}, _WS);
      Object.defineProperty(WSObject, 'url', { get() { return url } })
      Object.defineProperty(WSObject, 'protocols', { get() { return protocols } })
      Object.defineProperty(WSObject, 'readyState', { get() { return this._readyState } })
      Object.defineProperty(WSObject, 'close', { value: () => { return wsHook.triggerOnClose(this) } })
      Object.defineProperty(WSObject, 'isReal', { value: false })
      Object.defineProperty(WSObject, '_readyState', { value: 0, writable: true })
    }

    // Hook the websocket send function
    var _send = WSObject.send
    WSObject.send = function (data) {
      console.log("hook send")
      arguments[0] = wsHook.beforeSend(data, WSObject.url, this) || null;
      if (arguments[0] == null) return;
      _send.apply(this, arguments)
    }

    // Events needs to be proxied and bubbled down.
    WSObject._onopen = undefined;
    WSObject._onerror = undefined;
    WSObject._addEventListener = WSObject.addEventListener || function () {
      // console.log("fake addEventListener() called")
      // const eventName = arguments[0];
      // const userFunc = arguments[1];
      // if (eventName === 'message') {
      //   WSObject._onmessage = userFunc
      // } else if (eventName === 'open') {
      //   WSObject._onopen = userFunc
      // } else if (eventName === 'error') {
      //   WSObject._onerror = userFunc
      // } else if (eventName === 'close') {
      //   WSObject._onclose = userFunc
      // }
    };
    WSObject.addEventListener = function () {
      const eventThis = this
      const eventName = arguments[0];
      const userFunc = arguments[1];

      if (eventName === 'message') {
        WSObject._onmessage = userFunc
        arguments[1] = (function (userFunc) {
          return function () {
            arguments[0] = wsHook.afterRecive(MakeMutableMessageEvent(arguments[0]), WSObject.url, WSObject)
            if (arguments[0] === null) return
            userFunc.apply(eventThis, arguments)
          }
        })(userFunc)
      } else if (eventName === 'open') {
        WSObject._onopen = userFunc
        arguments[1] = (function (userFunc) {
          return function () {
            arguments[0] = wsHook.beforeOpen(arguments[0], WSObject.url, WSObject)
            if (arguments[0] === null) return
            userFunc.apply(eventThis, arguments)
          }
        })(userFunc)
      } else if (eventName === 'error') {
        WSObject._onerror = userFunc
        arguments[1] = (function (userFunc) {
          return function () {
            arguments[0] = wsHook.beforeError(arguments[0], WSObject.url, WSObject)
            if (arguments[0] === null) return
            userFunc.apply(eventThis, arguments)
          }
        })(userFunc)
      } else if (eventName === 'close') {
        WSObject._onclose = userFunc
        arguments[1] = (function (userFunc) {
          return function () {
            arguments[0] = wsHook.beforeClose(arguments[0], WSObject.url, WSObject)
            if (arguments[0] === null) return
            userFunc.apply(eventThis, arguments)
          }
        })(userFunc)
      }
      return WSObject._addEventListener?.apply(this, arguments)
    }

    Object.defineProperty(WSObject, 'onmessage', {
      'set': function () {
        var eventThis = this
        var userFunc = arguments[0]
        WSObject._onmessage = userFunc
        var onMessageHandler = userFunc ? function () {
          if (!WSObject.isReal) console.log('onMessageHandler', arguments)
          arguments[0] = wsHook.afterRecive(MakeMutableMessageEvent(arguments[0]), WSObject.url, WSObject)
          if (arguments[0] === null) return
          userFunc.apply(eventThis, arguments)
        } : null;

        console.log('onMsgHandler', arguments)
        WSObject._addEventListener?.apply(this, ['message', onMessageHandler, false])
      }
    })

    Object.defineProperty(WSObject, 'onopen', {
      'set': function () {
        var eventThis = this
        var userFunc = arguments[0]
        WSObject._onopen = userFunc
        var onOpenHandler = userFunc ? function () {
          if (!WSObject.isReal) console.log('onOpenHandler', arguments)
          arguments[0] = wsHook.beforeOpen(arguments[0], WSObject.url, WSObject)
          if (arguments[0] === null) return
          userFunc.apply(eventThis, arguments)
        } : null;
        console.log('onOpenHandler', arguments)
        WSObject._addEventListener?.apply(this, ['open', onOpenHandler, false])
      }
    })

    Object.defineProperty(WSObject, 'onerror', {
      'set': function () {
        var eventThis = this
        var userFunc = arguments[0]
        WSObject._onerror = userFunc
        var onErrorHandler = userFunc ? function () {
          if (!WSObject.isReal) console.log('onErrorHandler', arguments)
          arguments[0] = wsHook.beforeError(arguments[0], WSObject.url, WSObject)
          if (arguments[0] === null) return
          userFunc.apply(eventThis, arguments)
        } : null
        WSObject._addEventListener?.apply(this, ['error', onErrorHandler, false])
      }
    })

    Object.defineProperty(WSObject, 'onclose', {
      'set': function () {
        var eventThis = this
        var userFunc = arguments[0]
        WSObject._onclose = userFunc
        var onCloseHandler = userFunc ? function () {
          if (!WSObject.isReal) console.log('onCloseHandler', arguments)
          arguments[0] = wsHook.beforeClose(arguments[0], WSObject.url, WSObject)
          if (arguments[0] === null) return
          userFunc.apply(eventThis, arguments)
        } : null
        WSObject._addEventListener?.apply(this, ['close', onCloseHandler, false])
      }
    })

    wsHook.afterInit(WSObject);
    WSObject._readyState = _WS.OPEN;
    return WSObject
  }, _WS);
})();
