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
    if (wsObject._onopen) wsObject._onopen(ev);
  },
  triggerOnError: (wsObject: WebSocket, ev?: Event) => {
    ev = ev || new Event("error", { composed: false, bubbles: false, cancelable: false })
    if (wsObject._onerror) wsObject._onerror(ev);
  },
  triggerOnClose: (wsObject: WebSocket, ev?: CloseEvent) => {
    ev = ev || new CloseEvent("close", { wasClean: true, reason: "wsHook", composed: false, bubbles: false, cancelable: false, code: 1006 })
    if (wsObject._onclose) wsObject._onclose(ev);
  },
  triggerOnMessage: (wsObject: WebSocket, data: socketMsgDataTypes) => {
    const ev = new MessageEvent("mesage", { data: data, origin: wsObject.url, bubbles: false, cancelable: false, composed: false })
    if (wsObject._onmessage) wsObject._onmessage(ev);
  },
  modifyUrl: (url: string | URL) => {
    return url
  },
  beforeNewSocket: (wsObject: WebSocket): WebSocket => {
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
  afterRecive: (ev: MessageEvent, url: string, wsObject: WebSocket): MessageEvent | MutableMessageEvent => {
    return ev;
  },
  resetHooks: () => { }
};

(function () {
  const originalFuncs = Object.assign({}, wsHook)
  wsHook.resetHooks = function () {
    Object.assign(wsHook, originalFuncs)
  }

  var _WS = WebSocket
  WebSocket = function (url, protocols) {
    let WSObject: WebSocket = {} as WebSocket;//Object.assign({}, _WS.prototype);
    WSObject.prototype = _WS.prototype;
    url = wsHook.modifyUrl(url) || url
    wsHook.beforeNewSocket(WSObject);
    this.protocols = protocols

    if (false) {
      if (!this.protocols) { WSObject = new _WS(url) } else { WSObject = new _WS(url, protocols) }
    } else {

    }

    // Hook the websocket send function
    var _send = WSObject.send
    WSObject.send = function (data) {
      arguments[0] = wsHook.beforeSend(data, WSObject.url, this) || null;
      if (arguments[0] == null) return;
      _send.apply(this, arguments)
    }

    // Events needs to be proxied and bubbled down.
    WSObject._onopen = undefined;
    WSObject._onerror = undefined;
    WSObject._addEventListener = WSObject.addEventListener;
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
        var onMessageHandler = function () {
          arguments[0] = wsHook.afterRecive(MakeMutableMessageEvent(arguments[0]), WSObject.url, WSObject)
          if (arguments[0] === null) return
          userFunc.apply(eventThis, arguments)
        }
        WSObject._addEventListener?.apply(this, ['message', onMessageHandler, false])
      }
    })

    Object.defineProperty(WSObject, 'onopen', {
      'set': function () {
        var eventThis = this
        var userFunc = arguments[0]
        WSObject._onopen = userFunc
        var onOpenHandler = function () {
          arguments[0] = wsHook.beforeOpen(arguments[0], WSObject.url, WSObject)
          if (arguments[0] === null) return
          userFunc.apply(eventThis, arguments)
        }
        WSObject._addEventListener?.apply(this, ['open', onOpenHandler, false])
      }
    })

    Object.defineProperty(WSObject, 'onerror', {
      'set': function () {
        var eventThis = this
        var userFunc = arguments[0]
        WSObject._onerror = userFunc
        var onOpenHandler = function () {
          arguments[0] = wsHook.beforeError(arguments[0], WSObject.url, WSObject)
          if (arguments[0] === null) return
          userFunc.apply(eventThis, arguments)
        }
        WSObject._addEventListener?.apply(this, ['open', onOpenHandler, false])
      }
    })

    Object.defineProperty(WSObject, 'onclose', {
      'set': function () {
        console.log("Set On Close")
        var eventThis = this
        var userFunc = arguments[0]
        WSObject._onclose = userFunc
        var onOpenHandler = function () {
          arguments[0] = wsHook.beforeClose(arguments[0], WSObject.url, WSObject)
          if (arguments[0] === null) return
          userFunc.apply(eventThis, arguments)
        }
        WSObject._addEventListener?.apply(this, ['open', onOpenHandler, false])
      }
    })

    return WSObject
  };
})();


// (function () {

//     const originalFuncs = Object.assign({}, wsHook)
//     wsHook.resetHooks = function () {
//         Object.assign(wsHook, originalFuncs)
//     }

//     var _WS = WebSocket
//     WebSocket = function (url, protocols) {
//         var WSObject: WebSocket
//         url = wsHook.modifyUrl(url) || url
//         WSObject.url = url
//         WSObject.protocols = protocols
//         if (!this.protocols) { WSObject = new _WS(url) } else { WSObject = new _WS(url, protocols) }

//         var _send = WSObject.send
//         WSObject.send = function (data) {
//             arguments[0] = wsHook.beforeSend(data, WSObject.url, WSObject) || null;
//             if (arguments[0] == null) return;
//             _send.apply(this, arguments)
//         }

//         // Events needs to be proxied and bubbled down.
//         WSObject._onopen = undefined;
//         WSObject._onerror = undefined;
//         WSObject._addEventListener = WSObject.addEventListener;
//         WSObject.addEventListener = function () {
//             const eventThis = this
//             const eventName = arguments[0];
//             const userFunc = arguments[0];

//             if (eventName === 'message') {
//                 arguments[1] = (function (userFunc) {
//                     return function () {
//                         arguments[0] = wsHook.afterRecive(MakeMutableMessageEvent(arguments[0]), WSObject.url, WSObject)
//                         if (arguments[0] === null) return
//                         userFunc.apply(eventThis, arguments)
//                     }
//                 })(userFunc)
//             } else if (eventName === 'open') {
//                 WSObject._onopen = userFunc
//                 arguments[1] = (function (userFunc) {
//                     return function () {
//                         arguments[0] = wsHook.beforeOpen(MakeMutableMessageEvent(arguments[0]), WSObject.url, WSObject)
//                         if (arguments[0] === null) return
//                         userFunc.apply(eventThis, arguments)
//                     }
//                 })(userFunc)
//             } else if (eventName === 'error') {
//                 WSObject._onerror = userFunc
//                 arguments[1] = (function (userFunc) {
//                     return function () {
//                         arguments[0] = wsHook.afterRecive(MakeMutableMessageEvent(arguments[0]), WSObject.url, WSObject)
//                         if (arguments[0] === null) return
//                         userFunc.apply(eventThis, arguments)
//                     }
//                 })(userFunc)
//             }
//             return WSObject._addEventListener.apply(this, arguments)
//         }



//         return WSObject
//     }
// })()


// // class HookedWebSocket {
// //   constructor(url: string | URL, protocols?: string | string[] | undefined) {
// //     // super(wsHook.modifyUrl(url) || url, protocols)
// //     wsHook.beforeNewSocket(this);
// //     const self = this;

// //     // Hook the websocket send function
// //     var _send = this.send
// //     this.send = function (data) {
// //       arguments[0] = wsHook.beforeSend(data, this.url, this) || null;
// //       if (arguments[0] == null) return;
// //       _send.apply(this, arguments)
// //     }

// //     // Events needs to be proxied and bubbled down.
// //     this._onopen = undefined;
// //     this._onerror = undefined;
// //     this._addEventListener = this.addEventListener;
// //     this.addEventListener = function () {
// //       const eventThis = this
// //       const eventName = arguments[0];
// //       const userFunc = arguments[1];

// //       if (eventName === 'message') {
// //         arguments[1] = (function (userFunc) {
// //           return function () {
// //             arguments[0] = wsHook.afterRecive(MakeMutableMessageEvent(arguments[0]), self.url, self)
// //             if (arguments[0] === null) return
// //             userFunc.apply(eventThis, arguments)
// //           }
// //         })(userFunc)
// //       } else if (eventName === 'open') {
// //         this._onopen = userFunc
// //         arguments[1] = (function (userFunc) {
// //           return function () {
// //             arguments[0] = wsHook.beforeOpen(MakeMutableMessageEvent(arguments[0]), self.url, self)
// //             if (arguments[0] === null) return
// //             userFunc.apply(eventThis, arguments)
// //           }
// //         })(userFunc)
// //       } else if (eventName === 'error') {
// //         this._onerror = userFunc
// //         arguments[1] = (function (userFunc) {
// //           return function () {
// //             arguments[0] = wsHook.afterRecive(MakeMutableMessageEvent(arguments[0]), self.url, self)
// //             if (arguments[0] === null) return
// //             userFunc.apply(eventThis, arguments)
// //           }
// //         })(userFunc)
// //       }
// //       return this._addEventListener.apply(this, arguments)
// //     }

// //     Object.defineProperty(this, 'onmessage', {
// //       'set': function () {
// //         var eventThis = this
// //         var userFunc = arguments[0]
// //         var onMessageHandler = function () {
// //           arguments[0] = wsHook.afterRecive(MakeMutableMessageEvent(arguments[0]), self.url, self)
// //           if (arguments[0] === null) return
// //           userFunc.apply(eventThis, arguments)
// //         }
// //         self._addEventListener?.apply(this, ['message', onMessageHandler, false])
// //       }
// //     })

// //     Object.defineProperty(this, 'onopen', {
// //       'set': function () {
// //         var eventThis = this
// //         var userFunc = arguments[0]
// //         var onOpenHandler = function () {
// //           arguments[0] = wsHook.beforeOpen(arguments[0], self.url, self)
// //           if (arguments[0] === null) return
// //           userFunc.apply(eventThis, arguments)
// //         }
// //         self._addEventListener?.apply(this, ['open', onOpenHandler, false])
// //       }
// //     })
// //   }
// // }
// // WebSocket = HookedWebSocket;
