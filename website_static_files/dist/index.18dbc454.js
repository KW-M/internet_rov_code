// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"g9TDx":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "0bcb44a518dbc454";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"1SICI":[function(require,module,exports) {
// // import {} from "./libraries/joypad.min.js"
// //import {} from "./libraries/gamepad-lib.js"
// import {} from "./libraries/webrtc-signaling.js";
// import {} from "./libraries/toastify-js.js";
// import {} from "./libraries/joymap.min.js";
var _inspect = require("@xstate/inspect");
// import {} from "./ui.js";
// import {} from "./api.js";
// import {} from "./connection.js";
// import {} from "./gamepad-emulation.js";
// import {} from "./gamepad-ui.js";
var _gamepadJs = require("./gamepad.js");
var _messageHandler = require("./messageHandler");
var _utilJs = require("./util.js");
var _uiJs = require("./ui.js");
var _xstate = require("xstate");
var _actions = require("xstate/lib/actions");
var _siteInit = require("./siteInit");
var _peerConnStateMachineJs = require("./peerConnStateMachine.js");
var _peerServerConnStateMachineJs = require("./peerServerConnStateMachine.js");
var _constsJs = require("./consts.js");
var _accesableDropdownMenuJs = require("./libraries/accesableDropdownMenu.js");
// import { initGamepadSupport } from "./gamepad.js";
// import { gamepadUi } from "./gamepad-ui.js";
// import { gamepadEmulator } from "./gamepad-emulation.js";
// show an inspector if the query string is present
if (_utilJs.getURLQueryStringVariable("debug-mode")) _inspect.inspect({
    iframe: false
});
new _gamepadJs.GamepadController();
const mainMachine = /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgMoBdUAnfAYlwEkAVAUQH0AlGgQQBEBNRUABwHtZ0+dL0xcQAD0QAmAGwBmbAEYAHMoAMAdg0BWbQBYVATkNyANCACeibQq0y9U1XLVqpclQF8P5tFmwMAV0xMLChsADlefDoAYRFMMABjfEhSAAUaGgY6XCyANSzYgHlw8JoYqgoSuhpcKmYAIQAZClwACRpWMT4BIRExSQRlQw1sdzkZRTk9ZTkRxT1zKwRHUbk5jVU9bXk1Q00vHwwcQODQ7DSwMCIc64A3a9j4pJSIchpw1joAWVrcZgA4vQqEVGEU8t1+IJhKIkBJEFN5NgpBpDG49HJtMo9GosUtEHptthXFN3DoZHtjIcQL4TkEQpgwpdHrh7o84sEXqkAUUqD8-oD6AAxBhFb5giFwnrQ-pwwaKRRuMYyZRSQzKDQUuSbRT4hCE7TEqSkxTkymGam0-z00KkVitGIlMoVOgNACqVBB4ToaSYuFyXSlUL6sNAgykyLUKqmalmemMmJserVemwqqkGbUihkunsUktx2tZ0Z6Uy2VyDAK2SFzHqTRqDFFDEhvRhA0QGlNRtVeh06k7ez1Mi02FRRhzKM7GYLflODKgpAA6jQGgwqDE6DW6w2my2ZaH4QhswZsMOMVIszttLrLIhpooxp2HFJtuo1BMZ3Tiwvlw1KLRYiaIpcj3EN2yPGQc2RXsDEggwUxkZMkW0QwVVjFVILkY05E-bBmAAdwwIRGQlJ5OWSV0AnwfARB9Ig4FgUhHVKco+XdT1ql9P5OlAts5TvHRsH0dZjUJEwnz1bZDDTbQXH0YZUOUTxqUwXgIDgMQrQIYh8F42Uw2kB9VRQ2ZDBsJT0T1XRR1mWZTW1KNZGxXC53OSJog5BJkkgPSD0GaMjQMLERMUNRtmTdQ0xxU0KXUbNjG0FybUZC4rhuVkiAeG5PK5CBfPAxV9mwNFcTMzQTCw5NO2RRRjAw1wUNRHDvBpQtXMZfL+IQHNRlcILZiw0LwtvBBrzGLDtRkScUL63CCKI0JSJyiiGiomjMDohjOoMhAAFodiEjNtA0TRjvsfZEJGmYZFHSlZijHYXGao4-FYEQwG2w8VEgoTNXVZQVW2RQkxGtVlFHDQ3E0ewsNxexP0+wZdsi7QjpOnRNXjKM9V241TwmJqs1cCY9i8LwgA */ _xstate.createMachine({
    context: {
        peerServerConfig: {
        },
        rovIpAddr: "",
        rovPeerIdEndNumber: 0,
        attemptingNewRovPeerId: false,
        peerServerConnActor: null,
        peerConnActor: null,
        pingSenderActor: null
    },
    id: "main",
    initial: "Start",
    invoke: {
        src: "setupUiButtonHandlers",
        id: "setupUiButtonHandlers"
    },
    states: {
        Start: {
            invoke: {
                src: _siteInit.siteInitMachine,
                id: "siteInitMachine"
            },
            on: {
                SITE_READY: {
                    actions: [
                        "setRovIpAddr",
                        "setPeerServerConfig"
                    ],
                    target: "Running"
                }
            }
        },
        Running: {
            entry: "startPeerServerConnMachine",
            exit: "stopPeerServerConnMachine",
            initial: "Not_Connected",
            states: {
                Not_Connected: {
                    on: {
                        PEER_SERVER_CONNECTION_ESTABLISHED: {
                            target: "Peer_Server_Connected"
                        }
                    }
                },
                Peer_Server_Connected: {
                    entry: [
                        "startPeerConnMachine",
                        "startPingMessageGenerator"
                    ],
                    exit: [
                        "stopPeerConnMachine",
                        "stopPingMessageGenerator"
                    ],
                    on: {
                        SEND_MESSAGE_TO_ROV: {
                            actions: "sendMessageToRov"
                        },
                        GOT_MESSAGE_FROM_ROV: {
                            actions: "gotMessageFromRov"
                        }
                    }
                }
            },
            on: {
                ROV_CONNECTION_ESTABLISHED: {
                    actions: "rovPeerConnectionEstablished",
                    internal: true // DON'T cause the transition to trigger the exit and entry actions
                },
                CONNECT_TO_NEXT_ROV: {
                    actions: "switchToNextRovPeerId",
                    target: "Running",
                    internal: false
                },
                RETRY_ROV_CONNECTION: {
                    target: "Running",
                    internal: false
                },
                DISCONNECT_FROM_ROV: {
                    target: "Awaiting_ROV_Connect_Button_Press"
                },
                PEER_NOT_YET_READY_ERROR: {
                    actions: "handlePeerNotYetReadyError"
                },
                PEER_SERVER_FATAL_ERROR: {
                    target: "Running",
                    internal: false
                },
                WEBRTC_FATAL_ERROR: {
                    actions: "reloadWebsite",
                    target: "Done"
                },
                WEBSITE_CLOSE: {
                    target: "Done"
                }
            }
        },
        Awaiting_ROV_Connect_Button_Press: {
            entry: "showDisconnectedUi",
            invoke: {
                src: "awaitConnectBtnPress",
                id: "awaitConnectBtnPress"
            },
            on: {
                CONNECT_BUTTON_PRESSED: {
                    target: "Running"
                }
            }
        },
        Done: {
            type: "final"
        }
    }
}, {
    actions: {
        "showDisconnectedUi": ()=>{
            _uiJs.showROVDisconnectedUi();
        },
        "reloadWebsite": ()=>{
            _uiJs.showReloadingWebsiteUi();
            setTimeout(()=>{
                window.location.reload();
            }, 2000);
        },
        "setRovIpAddr": _xstate.assign({
            rovIpAddr: (context, event)=>event.data.rovIpAddr
        }),
        "setPeerServerConfig": _xstate.assign({
            peerServerConfig: (context, event)=>event.data.peerServerConfig
        }),
        "switchToNextRovPeerId": _xstate.assign({
            rovPeerIdEndNumber: (context)=>{
                return context.rovPeerIdEndNumber + 1;
            },
            attemptingNewRovPeerId: true
        }),
        "rovPeerConnectionEstablished": _xstate.assign({
            attemptingNewRovPeerId: false
        }),
        "handlePeerNotYetReadyError": _actions.pure((context)=>{
            // this function is called whenever we fail to find or connect to a rov:
            _uiJs.showToastMessage("Could not connect to " + _constsJs.ROV_PEERID_BASE + String(context.rovPeerIdEndNumber));
            if (context.attemptingNewRovPeerId && context.rovPeerIdEndNumber != 0) {
                // we've tried all the rov IDs and none of them are online
                _uiJs.showToastMessage("Trying previous rov: " + _constsJs.ROV_PEERID_BASE + String(context.rovPeerIdEndNumber - 1));
                return [
                    _xstate.assign({
                        rovPeerIdEndNumber: context.rovPeerIdEndNumber - 1
                    }),
                    _xstate.send("RETRY_ROV_CONNECTION")
                ];
            } else return _xstate.send("DISCONNECT_FROM_ROV");
        }),
        "startPeerServerConnMachine": _xstate.assign({
            peerServerConnActor: (context)=>_xstate.spawn(_peerServerConnStateMachineJs.peerServerConnMachine.withContext({
                    ..._peerServerConnStateMachineJs.peerServerConnMachine.context,
                    rovIpAddr: context.rovIpAddr,
                    peerServerConfig: context.peerServerConfig
                }), "peerServerConnMachine")
        }),
        "startPeerConnMachine": _xstate.assign({
            peerServerConnActor: (context, event)=>{
                return _xstate.spawn(_peerConnStateMachineJs.peerConnMachine.withContext({
                    ..._peerConnStateMachineJs.peerConnMachine.context,
                    thisPeer: event.data,
                    rovPeerId: _constsJs.ROV_PEERID_BASE + String(context.rovPeerIdEndNumber)
                }), "peerConnMachine");
            }
        }),
        "startPingMessageGenerator": _xstate.assign({
            pingSenderActor: _xstate.spawn(()=>{
                return (callback)=>{
                    const intervalId = setInterval(()=>{
                        callback({
                            type: "SEND_MESSAGE_TO_ROV",
                            data: JSON.stringify({
                                "ping": Date.now()
                            })
                        }, {
                            to: "rovConnectionMachine"
                        });
                    }, 5000);
                    return ()=>{
                        clearInterval(intervalId);
                    };
                };
            }, "pingMessageGenerator")
        }),
        "stopPingMessageGenerator": _actions.stop("pingMessageGenerator"),
        "stopPeerServerConnMachine": _actions.stop("peerServerConnMachine"),
        "stopPeerConnMachine": _actions.stop("peerConnMachine"),
        "gotMessageFromRov": (context, event)=>{
            _messageHandler.handleRovMessage(event.data);
        },
        "sendMessageToRov": _xstate.send((context, event)=>{
            return {
                type: 'SEND_MESSAGE_TO_ROV',
                data: event.data
            };
        }, {
            to: "peerConnMachine"
        })
    },
    services: {
        "awaitConnectBtnPress": (context, event)=>{
            return (sendStateChange)=>{
                const err = event.data;
                console.log(event);
                var toastMsg = null;
                if (err && err.type == "peer-unavailable") toastMsg = _uiJs.showToastDialog("ROV is not yet online!", 12000, false);
                const cleanupFunc = _uiJs.setupConnectBtnClickHandler(()=>{
                    if (toastMsg) toastMsg.hideToast();
                    sendStateChange("CONNECT_BUTTON_PRESSED");
                });
                return cleanupFunc;
            };
        },
        "setupUiButtonHandlers": ()=>{
            return (sendStateChange)=>{
                const disconnectBtnCleanupFunc = _uiJs.setupDisconnectBtnClickHandler(()=>{
                    sendStateChange("DISCONNECT_FROM_ROV");
                });
                const nextRovBtnCleanupFunc = _uiJs.setupSwitchRovBtnClickHandler(()=>{
                    sendStateChange("CONNECT_TO_NEXT_ROV");
                });
                return ()=>{
                    disconnectBtnCleanupFunc();
                    nextRovBtnCleanupFunc();
                };
            };
        }
    },
    guards: {
    }
});
window.mainRovMachineService = _xstate.interpret(mainMachine, {
    devTools: true
});
// window.mainRovMachineService.onChange(console.log)
window.mainRovMachineService.start();
window.onbeforeunload = ()=>{
    // window.mainRovMachineService.send("WEBSITE_CLOSE");
    window.thisPeerjsPeer.destroy();
};
/* Initialize Disclosure Menus */ var menus = document.querySelectorAll('.disclosure-nav');
var disclosureMenus = [];
for(var i = 0; i < menus.length; i++){
    disclosureMenus[i] = new _accesableDropdownMenuJs.DisclosureNav(menus[i]);
    disclosureMenus[i].updateKeyControls(true);
} // fake link behavior
 // disclosureMenus.forEach((disclosureNav, i) => {
 //     var links = menus[i].querySelectorAll('[href="#mythical-page-content"]');
 //     var examplePageHeading = document.getElementById('mythical-page-heading');
 //     for (var k = 0; k < links.length; k++) {
 //         // The codepen export script updates the internal link href with a full URL
 //         // we're just manually fixing that behavior here
 //         links[k].href = '#mythical-page-content';
 //         links[k].addEventListener('click', (event) => {
 //             // change the heading text to fake a page change
 //             var pageTitle = event.target.innerText;
 //             examplePageHeading.innerText = pageTitle;
 //             // handle aria-current
 //             for (var n = 0; n < links.length; n++) {
 //                 links[n].removeAttribute('aria-current');
 //             }
 //             event.target.setAttribute('aria-current', 'page');
 //         });
 //     }
 // });
 // }
 // function sendUpdateToROV(message) {
 //     window.mainRovMachineService.send({ type: "SEND_MESSAGE_TO_ROV", data: message });
 // }
 // var lastTimeRecvdPong = 0;
 // const handleROVMessage = function (message) {
 //     msgData = JSON.parse(message);
 //     if (msgData['pong']) {
 //         console.log("Ping->Pong received");
 //         lastTimeRecvdPong = Date.now();
 //         networkPingDelay = lastTimeRecvdPong - Number.parseFloat(msgData['pong']) // since the rpi replies with the ms time we sent in the ping in the pong message
 //         updatePingDisplay(networkPingDelay);
 //         if (msgData["sensor_update"]) updateDisplayedSensorValues(msgData["sensor_update"]);
 //     }
 // }
 // setupConnectDisconnectButtonEvents(() => {
 //     // connect button clicked:
 //     connectToROV(getDefaultSignallingServerURL(), handleROVMessage, () => {
 //         console.log("Connected to ROV");
 //         // start ping timer to send ping every second
 //         pingTimer = setInterval(() => {
 //             sendUpdateToROV({ 'ping': Date.now() });
 //         }, 2000);
 //     });
 // }, () => {
 //     // disconnect button clicked:
 //     if (signalObj) {
 //         signalObj.hangup();
 //     }
 //     signalObj = null;
 //     videoElem.srcObject = null;
 //     isStreaming = false;
 // })
 // // -----------------------------------------------------
 // // ------------ Gamepad Related ------------------------
 // // -----------------------------------------------------
 // var handleButtonPressBrowserSide = function (buttonFunction, buttonValue) {
 //     if (buttonFunction == "photo") {
 //         // takePhoto();
 //         return true;
 //     } else if (buttonFunction == "video") {
 //         // toggleVideo();
 //         return true;
 //     }
 //     return false
 // }
 // var lastROVMotionMessage = {};
 // initGamepadSupport(gamepadUi, gamepadEmulator, handleGamepadInput);
 // function handleGamepadInput(buttonStates, axisState) {
 //     var messageToRov = {}
 //     for (const btnName in buttonMappingNames) {
 //         const btnState = buttonStates[btnName]
 //         if (btnState == undefined) continue;
 //         const btnFunctionName = buttonMappingNames[btnName].func;
 //         const btnFunctionMode = buttonMappingNames[btnName].mode;
 //         if (btnState.pressed && (btnState.justChanged || btnFunctionMode == "btn_hold_allowed")) {
 //             // if this button action is performed in the browser (not on the rov), this function will take care of it, and return true:
 //             if (handleButtonPressBrowserSide(btnFunctionName, btnState.value)) continue;
 //             // otherwise, send the function name of the button to the ROV with the current button value
 //             messageToRov[btnFunctionName] = btnState.value;
 //         }
 //         // if (gamepadHelpVisible && btnState.justChanged && btnState.pressed) {
 //         //     gamepadHelpText.innerText = buttonMappingNames[btnName].desc
 //         // }
 //     }
 //     var rawAxies = [];
 //     if (axisState["L"] && axisState["R"]) { // && (axisState["R"].justChanged || axisState["L"].justChanged)
 //         rawAxies = rawAxies.concat(axisState["L"].value);
 //         rawAxies = rawAxies.concat(axisState["R"].value);
 //         var desiredRovMotion = calculateDesiredMotion(rawAxies);
 //         if (JSON.stringify(desiredRovMotion) != lastROVMotionMessage) {
 //             lastROVMotionMessage = JSON.stringify(desiredRovMotion);
 //             messageToRov['move'] = desiredRovMotion;
 //         }
 //     }
 //     if (Object.keys(messageToRov).length > 0) {
 //         console.log("Sending message to ROV: " + JSON.stringify(messageToRov));
 //         sendUpdateToROV(JSON.stringify(messageToRov));
 //     }
 // }

},{"@xstate/inspect":"39FuP","./gamepad.js":"2YxSr","./messageHandler":"at2SH","./util.js":"doATT","./ui.js":"efi6n","xstate":"2sk4t","xstate/lib/actions":"b9dCp","./siteInit":"8TXLV","./peerConnStateMachine.js":"hGSry","./peerServerConnStateMachine.js":"3YceA","./consts.js":"2J0f1","./libraries/accesableDropdownMenu.js":"dczPN"}],"39FuP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createDevTools", ()=>_browserJs.createDevTools
);
parcelHelpers.export(exports, "createWebSocketReceiver", ()=>_browserJs.createWebSocketReceiver
);
parcelHelpers.export(exports, "createWindowReceiver", ()=>_browserJs.createWindowReceiver
);
parcelHelpers.export(exports, "inspect", ()=>_browserJs.inspect
);
var _browserJs = require("./browser.js");

},{"./browser.js":"1CTUP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1CTUP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createDevTools", ()=>createDevTools
);
parcelHelpers.export(exports, "createWebSocketReceiver", ()=>createWebSocketReceiver
);
parcelHelpers.export(exports, "createWindowReceiver", ()=>createWindowReceiver
);
parcelHelpers.export(exports, "inspect", ()=>inspect
);
parcelHelpers.export(exports, "serviceMap", ()=>serviceMap
);
var _tslibJs = require("./_virtual/_tslib.js");
var _xstate = require("xstate");
var _inspectMachineJs = require("./inspectMachine.js");
var _serializeJs = require("./serialize.js");
var _utilsJs = require("./utils.js");
var serviceMap = new Map();
function createDevTools() {
    var services = new Set();
    var serviceListeners = new Set();
    return {
        services: services,
        register: function(service) {
            services.add(service);
            serviceMap.set(service.sessionId, service);
            serviceListeners.forEach(function(listener) {
                return listener(service);
            });
            service.onStop(function() {
                services.delete(service);
                serviceMap.delete(service.sessionId);
            });
        },
        unregister: function(service) {
            services.delete(service);
            serviceMap.delete(service.sessionId);
        },
        onRegister: function(listener) {
            serviceListeners.add(listener);
            services.forEach(function(service) {
                return listener(service);
            });
            return {
                unsubscribe: function() {
                    serviceListeners.delete(listener);
                }
            };
        }
    };
}
var defaultInspectorOptions = {
    url: 'https://statecharts.io/inspect',
    iframe: function() {
        return document.querySelector('iframe[data-xstate]');
    },
    devTools: function() {
        var devTools = createDevTools();
        globalThis.__xstate__ = devTools;
        return devTools;
    },
    serialize: undefined
};
var getFinalOptions = function(options) {
    var withDefaults = _tslibJs.__assign(_tslibJs.__assign({
    }, defaultInspectorOptions), options);
    return _tslibJs.__assign(_tslibJs.__assign({
    }, withDefaults), {
        url: new URL(withDefaults.url),
        iframe: _utilsJs.getLazy(withDefaults.iframe),
        devTools: _utilsJs.getLazy(withDefaults.devTools)
    });
};
function inspect(options) {
    var _a1 = getFinalOptions(options), iframe = _a1.iframe, url = _a1.url, devTools = _a1.devTools;
    if (iframe === null) {
        console.warn('No suitable <iframe> found to embed the inspector. Please pass an <iframe> element to `inspect(iframe)` or create an <iframe data-xstate></iframe> element.');
        return undefined;
    }
    var inspectMachine = _inspectMachineJs.createInspectMachine(devTools, options);
    var inspectService = _xstate.interpret(inspectMachine).start();
    var listeners = new Set();
    var sub = inspectService.subscribe(function(state) {
        listeners.forEach(function(listener) {
            return listener.next(state);
        });
    });
    var targetWindow;
    var client;
    var messageHandler = function(event) {
        if (typeof event.data === 'object' && event.data !== null && 'type' in event.data) {
            if (iframe && !targetWindow) targetWindow = iframe.contentWindow;
            if (!client) client = {
                send: function(e) {
                    targetWindow.postMessage(e, url.origin);
                }
            };
            var inspectEvent = _tslibJs.__assign(_tslibJs.__assign({
            }, event.data), {
                client: client
            });
            inspectService.send(inspectEvent);
        }
    };
    window.addEventListener('message', messageHandler);
    window.addEventListener('unload', function() {
        inspectService.send({
            type: 'unload'
        });
    });
    var stringifyWithSerializer = function(value) {
        return _utilsJs.stringify(value, options === null || options === void 0 ? void 0 : options.serialize);
    };
    devTools.onRegister(function(service) {
        var _a;
        var state1 = service.state || service.initialState;
        inspectService.send({
            type: 'service.register',
            machine: _serializeJs.stringifyMachine(service.machine, options === null || options === void 0 ? void 0 : options.serialize),
            state: _serializeJs.stringifyState(state1, options === null || options === void 0 ? void 0 : options.serialize),
            sessionId: service.sessionId,
            id: service.id,
            parent: (_a = service.parent) === null || _a === void 0 ? void 0 : _a.sessionId
        });
        inspectService.send({
            type: 'service.event',
            event: stringifyWithSerializer(state1._event),
            sessionId: service.sessionId
        });
        // monkey-patch service.send so that we know when an event was sent
        // to a service *before* it is processed, since other events might occur
        // while the sent one is being processed, which throws the order off
        var originalSend = service.send.bind(service);
        service.send = function inspectSend(event, payload) {
            inspectService.send({
                type: 'service.event',
                event: stringifyWithSerializer(_xstate.toSCXMLEvent(_xstate.toEventObject(event, payload))),
                sessionId: service.sessionId
            });
            return originalSend(event, payload);
        };
        service.subscribe(function(state) {
            // filter out synchronous notification from within `.start()` call
            // when the `service.state` has not yet been assigned
            if (state === undefined) return;
            inspectService.send({
                type: 'service.state',
                // TODO: investigate usage of structuredClone in browsers if available
                state: _serializeJs.stringifyState(state, options === null || options === void 0 ? void 0 : options.serialize),
                sessionId: service.sessionId
            });
        });
        service.onStop(function() {
            inspectService.send({
                type: 'service.stop',
                sessionId: service.sessionId
            });
        });
    });
    if (iframe) {
        iframe.addEventListener('load', function() {
            targetWindow = iframe.contentWindow;
        });
        iframe.setAttribute('src', String(url));
    } else targetWindow = window.open(String(url), 'xstateinspector');
    return {
        send: function(event) {
            inspectService.send(event);
        },
        subscribe: function(next, onError, onComplete) {
            var observer = _xstate.toObserver(next, onError, onComplete);
            listeners.add(observer);
            observer.next(inspectService.state);
            return {
                unsubscribe: function() {
                    listeners.delete(observer);
                }
            };
        },
        disconnect: function() {
            inspectService.send('disconnect');
            window.removeEventListener('message', messageHandler);
            sub.unsubscribe();
        }
    };
}
function createWindowReceiver(options) {
    var _a = options || {
    }, _b = _a.window, ownWindow = _b === void 0 ? window : _b, _c = _a.targetWindow, targetWindow = _c === void 0 ? window.self === window.top ? window.opener : window.parent : _c;
    var observers = new Set();
    var latestEvent;
    var handler = function(event) {
        var data = event.data;
        if (_utilsJs.isReceiverEvent(data)) {
            latestEvent = _utilsJs.parseReceiverEvent(data);
            observers.forEach(function(listener) {
                return listener.next(latestEvent);
            });
        }
    };
    ownWindow.addEventListener('message', handler);
    var actorRef = _xstate.toActorRef({
        id: 'xstate.windowReceiver',
        send: function(event) {
            if (!targetWindow) return;
            targetWindow.postMessage(event, '*');
        },
        subscribe: function(next, onError, onComplete) {
            var observer = _xstate.toObserver(next, onError, onComplete);
            observers.add(observer);
            return {
                unsubscribe: function() {
                    observers.delete(observer);
                }
            };
        },
        stop: function() {
            observers.clear();
            ownWindow.removeEventListener('message', handler);
        },
        getSnapshot: function() {
            return latestEvent;
        }
    });
    actorRef.send({
        type: 'xstate.inspecting'
    });
    return actorRef;
}
function createWebSocketReceiver(options) {
    var _a2 = options.protocol, protocol = _a2 === void 0 ? 'ws' : _a2;
    var ws = new WebSocket("".concat(protocol, "://").concat(options.server));
    var observers = new Set();
    var latestEvent;
    var actorRef = _xstate.toActorRef({
        id: 'xstate.webSocketReceiver',
        send: function(event) {
            ws.send(_utilsJs.stringify(event, options.serialize));
        },
        subscribe: function(next, onError, onComplete) {
            var observer = _xstate.toObserver(next, onError, onComplete);
            observers.add(observer);
            return {
                unsubscribe: function() {
                    observers.delete(observer);
                }
            };
        },
        getSnapshot: function() {
            return latestEvent;
        }
    });
    ws.onopen = function() {
        actorRef.send({
            type: 'xstate.inspecting'
        });
    };
    ws.onmessage = function(event) {
        if (typeof event.data !== 'string') return;
        try {
            var eventObject = JSON.parse(event.data);
            if (_utilsJs.isReceiverEvent(eventObject)) {
                latestEvent = _utilsJs.parseReceiverEvent(eventObject);
                observers.forEach(function(observer) {
                    observer.next(latestEvent);
                });
            }
        } catch (e) {
            console.error(e);
        }
    };
    ws.onerror = function(err) {
        observers.forEach(function(observer) {
            var _a;
            (_a = observer.error) === null || _a === void 0 || _a.call(observer, err);
        });
    };
    return actorRef;
}

},{"./_virtual/_tslib.js":"4WlGW","xstate":"2sk4t","./inspectMachine.js":"b4BjV","./serialize.js":"elII6","./utils.js":"aNc4j","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4WlGW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "__assign", ()=>__assign
);
parcelHelpers.export(exports, "__values", ()=>__values
);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"2sk4t":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "actions", ()=>_actionsJs
);
parcelHelpers.export(exports, "toActorRef", ()=>_actorJs.toActorRef
);
parcelHelpers.export(exports, "Interpreter", ()=>_interpreterJs.Interpreter
);
parcelHelpers.export(exports, "InterpreterStatus", ()=>_interpreterJs.InterpreterStatus
);
parcelHelpers.export(exports, "interpret", ()=>_interpreterJs.interpret
);
parcelHelpers.export(exports, "spawn", ()=>_interpreterJs.spawn
);
parcelHelpers.export(exports, "Machine", ()=>_machineJs.Machine
);
parcelHelpers.export(exports, "createMachine", ()=>_machineJs.createMachine
);
parcelHelpers.export(exports, "mapState", ()=>_mapStateJs.mapState
);
parcelHelpers.export(exports, "matchState", ()=>_matchJs.matchState
);
parcelHelpers.export(exports, "createSchema", ()=>_schemaJs.createSchema
);
parcelHelpers.export(exports, "t", ()=>_schemaJs.t
);
parcelHelpers.export(exports, "State", ()=>_stateJs.State
);
parcelHelpers.export(exports, "StateNode", ()=>_stateNodeJs.StateNode
);
parcelHelpers.export(exports, "spawnBehavior", ()=>_behaviorsJs.spawnBehavior
);
parcelHelpers.export(exports, "ActionTypes", ()=>_typesJs.ActionTypes
);
parcelHelpers.export(exports, "SpecialTargets", ()=>_typesJs.SpecialTargets
);
parcelHelpers.export(exports, "matchesState", ()=>_utilsJs.matchesState
);
parcelHelpers.export(exports, "toEventObject", ()=>_utilsJs.toEventObject
);
parcelHelpers.export(exports, "toObserver", ()=>_utilsJs.toObserver
);
parcelHelpers.export(exports, "toSCXMLEvent", ()=>_utilsJs.toSCXMLEvent
);
parcelHelpers.export(exports, "assign", ()=>assign
);
parcelHelpers.export(exports, "doneInvoke", ()=>doneInvoke
);
parcelHelpers.export(exports, "forwardTo", ()=>forwardTo
);
parcelHelpers.export(exports, "send", ()=>send
);
parcelHelpers.export(exports, "sendParent", ()=>sendParent
);
parcelHelpers.export(exports, "sendUpdate", ()=>sendUpdate
);
var _actionsJs = require("./actions.js");
var _actorJs = require("./Actor.js");
var _interpreterJs = require("./interpreter.js");
var _machineJs = require("./Machine.js");
var _mapStateJs = require("./mapState.js");
var _matchJs = require("./match.js");
var _schemaJs = require("./schema.js");
var _stateJs = require("./State.js");
var _stateNodeJs = require("./StateNode.js");
var _behaviorsJs = require("./behaviors.js");
var _typesJs = require("./types.js");
var _utilsJs = require("./utils.js");
var assign = _actionsJs.assign, send = _actionsJs.send, sendParent = _actionsJs.sendParent, sendUpdate = _actionsJs.sendUpdate, forwardTo = _actionsJs.forwardTo, doneInvoke = _actionsJs.doneInvoke;

},{"./actions.js":"fKWcO","./Actor.js":"itCIE","./interpreter.js":"imBPa","./Machine.js":"cVglJ","./mapState.js":false,"./match.js":false,"./schema.js":false,"./State.js":"h85Z6","./StateNode.js":"jHv62","./behaviors.js":"7RjKM","./types.js":"5mTTI","./utils.js":"5Ce8y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fKWcO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "actionTypes", ()=>_actionTypesJs
);
parcelHelpers.export(exports, "after", ()=>after
);
parcelHelpers.export(exports, "assign", ()=>assign
);
parcelHelpers.export(exports, "cancel", ()=>cancel
);
parcelHelpers.export(exports, "choose", ()=>choose
);
parcelHelpers.export(exports, "done", ()=>done
);
parcelHelpers.export(exports, "doneInvoke", ()=>doneInvoke
);
parcelHelpers.export(exports, "error", ()=>error
);
parcelHelpers.export(exports, "escalate", ()=>escalate
);
parcelHelpers.export(exports, "forwardTo", ()=>forwardTo
);
parcelHelpers.export(exports, "getActionFunction", ()=>getActionFunction
);
parcelHelpers.export(exports, "initEvent", ()=>initEvent
);
parcelHelpers.export(exports, "isActionObject", ()=>isActionObject
);
parcelHelpers.export(exports, "log", ()=>log
);
parcelHelpers.export(exports, "pure", ()=>pure
);
parcelHelpers.export(exports, "raise", ()=>raise
);
parcelHelpers.export(exports, "resolveActions", ()=>resolveActions
);
parcelHelpers.export(exports, "resolveLog", ()=>resolveLog
);
parcelHelpers.export(exports, "resolveRaise", ()=>resolveRaise
);
parcelHelpers.export(exports, "resolveSend", ()=>resolveSend
);
parcelHelpers.export(exports, "resolveStop", ()=>resolveStop
);
parcelHelpers.export(exports, "respond", ()=>respond
);
parcelHelpers.export(exports, "send", ()=>send
);
parcelHelpers.export(exports, "sendParent", ()=>sendParent
);
parcelHelpers.export(exports, "sendTo", ()=>sendTo
);
parcelHelpers.export(exports, "sendUpdate", ()=>sendUpdate
);
parcelHelpers.export(exports, "start", ()=>start
);
parcelHelpers.export(exports, "stop", ()=>stop
);
parcelHelpers.export(exports, "toActionObject", ()=>toActionObject
);
parcelHelpers.export(exports, "toActionObjects", ()=>toActionObjects
);
parcelHelpers.export(exports, "toActivityDefinition", ()=>toActivityDefinition
);
var _tslibJs = require("./_virtual/_tslib.js");
var _typesJs = require("./types.js");
var _actionTypesJs = require("./actionTypes.js");
var _utilsJs = require("./utils.js");
var _environmentJs = require("./environment.js");
var initEvent = /*#__PURE__*/ _utilsJs.toSCXMLEvent({
    type: _actionTypesJs.init
});
function getActionFunction(actionType, actionFunctionMap) {
    return actionFunctionMap ? actionFunctionMap[actionType] || undefined : undefined;
}
function toActionObject(action, actionFunctionMap) {
    var actionObject;
    if (_utilsJs.isString(action) || typeof action === 'number') {
        var exec = getActionFunction(action, actionFunctionMap);
        if (_utilsJs.isFunction(exec)) actionObject = {
            type: action,
            exec: exec
        };
        else if (exec) actionObject = exec;
        else actionObject = {
            type: action,
            exec: undefined
        };
    } else if (_utilsJs.isFunction(action)) actionObject = {
        // Convert action to string if unnamed
        type: action.name || action.toString(),
        exec: action
    };
    else {
        var exec = getActionFunction(action.type, actionFunctionMap);
        if (_utilsJs.isFunction(exec)) actionObject = _tslibJs.__assign(_tslibJs.__assign({
        }, action), {
            exec: exec
        });
        else if (exec) {
            var actionType = exec.type || action.type;
            actionObject = _tslibJs.__assign(_tslibJs.__assign(_tslibJs.__assign({
            }, exec), action), {
                type: actionType
            });
        } else actionObject = action;
    }
    return actionObject;
}
var toActionObjects = function(action, actionFunctionMap) {
    if (!action) return [];
    var actions = _utilsJs.isArray(action) ? action : [
        action
    ];
    return actions.map(function(subAction) {
        return toActionObject(subAction, actionFunctionMap);
    });
};
function toActivityDefinition(action) {
    var actionObject = toActionObject(action);
    return _tslibJs.__assign(_tslibJs.__assign({
        id: _utilsJs.isString(action) ? action : actionObject.id
    }, actionObject), {
        type: actionObject.type
    });
}
/**
 * Raises an event. This places the event in the internal event queue, so that
 * the event is immediately consumed by the machine in the current step.
 *
 * @param eventType The event to raise.
 */ function raise(event) {
    if (!_utilsJs.isString(event)) return send(event, {
        to: _typesJs.SpecialTargets.Internal
    });
    return {
        type: _actionTypesJs.raise,
        event: event
    };
}
function resolveRaise(action) {
    return {
        type: _actionTypesJs.raise,
        _event: _utilsJs.toSCXMLEvent(action.event)
    };
}
/**
 * Sends an event. This returns an action that will be read by an interpreter to
 * send the event in the next step, after the current step is finished executing.
 *
 * @param event The event to send.
 * @param options Options to pass into the send event:
 *  - `id` - The unique send event identifier (used with `cancel()`).
 *  - `delay` - The number of milliseconds to delay the sending of the event.
 *  - `to` - The target of this event (by default, the machine the event was sent from).
 */ function send(event, options) {
    return {
        to: options ? options.to : undefined,
        type: _actionTypesJs.send,
        event: _utilsJs.isFunction(event) ? event : _utilsJs.toEventObject(event),
        delay: options ? options.delay : undefined,
        id: options && options.id !== undefined ? options.id : _utilsJs.isFunction(event) ? event.name : _utilsJs.getEventType(event)
    };
}
function resolveSend(action, ctx, _event, delaysMap) {
    var meta = {
        _event: _event
    }; // TODO: helper function for resolving Expr
    var resolvedEvent = _utilsJs.toSCXMLEvent(_utilsJs.isFunction(action.event) ? action.event(ctx, _event.data, meta) : action.event);
    var resolvedDelay;
    if (_utilsJs.isString(action.delay)) {
        var configDelay = delaysMap && delaysMap[action.delay];
        resolvedDelay = _utilsJs.isFunction(configDelay) ? configDelay(ctx, _event.data, meta) : configDelay;
    } else resolvedDelay = _utilsJs.isFunction(action.delay) ? action.delay(ctx, _event.data, meta) : action.delay;
    var resolvedTarget = _utilsJs.isFunction(action.to) ? action.to(ctx, _event.data, meta) : action.to;
    return _tslibJs.__assign(_tslibJs.__assign({
    }, action), {
        to: resolvedTarget,
        _event: resolvedEvent,
        event: resolvedEvent.data,
        delay: resolvedDelay
    });
}
/**
 * Sends an event to this machine's parent.
 *
 * @param event The event to send to the parent machine.
 * @param options Options to pass into the send event.
 */ function sendParent(event, options) {
    return send(event, _tslibJs.__assign(_tslibJs.__assign({
    }, options), {
        to: _typesJs.SpecialTargets.Parent
    }));
}
/**
 * Sends an event to an actor.
 *
 * @param actor The `ActorRef` to send the event to.
 * @param event The event to send, or an expression that evaluates to the event to send
 * @param options Send action options
 * @returns An XState send action object
 */ function sendTo(actor, event, options) {
    return send(event, _tslibJs.__assign(_tslibJs.__assign({
    }, options), {
        to: actor
    }));
}
/**
 * Sends an update event to this machine's parent.
 */ function sendUpdate() {
    return sendParent(_actionTypesJs.update);
}
/**
 * Sends an event back to the sender of the original event.
 *
 * @param event The event to send back to the sender
 * @param options Options to pass into the send event
 */ function respond(event, options) {
    return send(event, _tslibJs.__assign(_tslibJs.__assign({
    }, options), {
        to: function(_, __, _a) {
            var _event = _a._event;
            return _event.origin; // TODO: handle when _event.origin is undefined
        }
    }));
}
var defaultLogExpr = function(context, event) {
    return {
        context: context,
        event: event
    };
};
/**
 *
 * @param expr The expression function to evaluate which will be logged.
 *  Takes in 2 arguments:
 *  - `ctx` - the current state context
 *  - `event` - the event that caused this action to be executed.
 * @param label The label to give to the logged expression.
 */ function log(expr, label) {
    if (expr === void 0) expr = defaultLogExpr;
    return {
        type: _actionTypesJs.log,
        label: label,
        expr: expr
    };
}
var resolveLog = function(action, ctx, _event) {
    return _tslibJs.__assign(_tslibJs.__assign({
    }, action), {
        value: _utilsJs.isString(action.expr) ? action.expr : action.expr(ctx, _event.data, {
            _event: _event
        })
    });
};
/**
 * Cancels an in-flight `send(...)` action. A canceled sent action will not
 * be executed, nor will its event be sent, unless it has already been sent
 * (e.g., if `cancel(...)` is called after the `send(...)` action's `delay`).
 *
 * @param sendId The `id` of the `send(...)` action to cancel.
 */ var cancel = function(sendId) {
    return {
        type: _actionTypesJs.cancel,
        sendId: sendId
    };
};
/**
 * Starts an activity.
 *
 * @param activity The activity to start.
 */ function start(activity) {
    var activityDef = toActivityDefinition(activity);
    return {
        type: _typesJs.ActionTypes.Start,
        activity: activityDef,
        exec: undefined
    };
}
/**
 * Stops an activity.
 *
 * @param actorRef The activity to stop.
 */ function stop(actorRef) {
    var activity = _utilsJs.isFunction(actorRef) ? actorRef : toActivityDefinition(actorRef);
    return {
        type: _typesJs.ActionTypes.Stop,
        activity: activity,
        exec: undefined
    };
}
function resolveStop(action, context, _event) {
    var actorRefOrString = _utilsJs.isFunction(action.activity) ? action.activity(context, _event.data) : action.activity;
    var resolvedActorRef = typeof actorRefOrString === 'string' ? {
        id: actorRefOrString
    } : actorRefOrString;
    var actionObject = {
        type: _typesJs.ActionTypes.Stop,
        activity: resolvedActorRef
    };
    return actionObject;
}
/**
 * Updates the current context of the machine.
 *
 * @param assignment An object that represents the partial context to update.
 */ var assign = function(assignment) {
    return {
        type: _actionTypesJs.assign,
        assignment: assignment
    };
};
function isActionObject(action) {
    return typeof action === 'object' && 'type' in action;
}
/**
 * Returns an event type that represents an implicit event that
 * is sent after the specified `delay`.
 *
 * @param delayRef The delay in milliseconds
 * @param id The state node ID where this event is handled
 */ function after(delayRef, id) {
    var idSuffix = id ? "#".concat(id) : '';
    return "".concat(_typesJs.ActionTypes.After, "(").concat(delayRef, ")").concat(idSuffix);
}
/**
 * Returns an event that represents that a final state node
 * has been reached in the parent state node.
 *
 * @param id The final state node's parent state node `id`
 * @param data The data to pass into the event
 */ function done(id, data) {
    var type = "".concat(_typesJs.ActionTypes.DoneState, ".").concat(id);
    var eventObject = {
        type: type,
        data: data
    };
    eventObject.toString = function() {
        return type;
    };
    return eventObject;
}
/**
 * Returns an event that represents that an invoked service has terminated.
 *
 * An invoked service is terminated when it has reached a top-level final state node,
 * but not when it is canceled.
 *
 * @param id The final state node ID
 * @param data The data to pass into the event
 */ function doneInvoke(id, data) {
    var type = "".concat(_typesJs.ActionTypes.DoneInvoke, ".").concat(id);
    var eventObject = {
        type: type,
        data: data
    };
    eventObject.toString = function() {
        return type;
    };
    return eventObject;
}
function error(id, data) {
    var type = "".concat(_typesJs.ActionTypes.ErrorPlatform, ".").concat(id);
    var eventObject = {
        type: type,
        data: data
    };
    eventObject.toString = function() {
        return type;
    };
    return eventObject;
}
function pure(getActions) {
    return {
        type: _typesJs.ActionTypes.Pure,
        get: getActions
    };
}
/**
 * Forwards (sends) an event to a specified service.
 *
 * @param target The target service to forward the event to.
 * @param options Options to pass into the send action creator.
 */ function forwardTo(target, options) {
    return send(function(_, event) {
        return event;
    }, _tslibJs.__assign(_tslibJs.__assign({
    }, options), {
        to: target
    }));
}
/**
 * Escalates an error by sending it as an event to this machine's parent.
 *
 * @param errorData The error data to send, or the expression function that
 * takes in the `context`, `event`, and `meta`, and returns the error data to send.
 * @param options Options to pass into the send action creator.
 */ function escalate(errorData, options) {
    return sendParent(function(context, event, meta) {
        return {
            type: _actionTypesJs.error,
            data: _utilsJs.isFunction(errorData) ? errorData(context, event, meta) : errorData
        };
    }, _tslibJs.__assign(_tslibJs.__assign({
    }, options), {
        to: _typesJs.SpecialTargets.Parent
    }));
}
function choose(conds) {
    return {
        type: _typesJs.ActionTypes.Choose,
        conds: conds
    };
}
function resolveActions(machine, currentState, currentContext, _event, actions, preserveActionOrder) {
    if (preserveActionOrder === void 0) preserveActionOrder = false;
    var _a1 = _tslibJs.__read(preserveActionOrder ? [
        [],
        actions
    ] : _utilsJs.partition(actions, function(action) {
        return action.type === _actionTypesJs.assign;
    }), 2), assignActions = _a1[0], otherActions = _a1[1];
    var updatedContext = assignActions.length ? _utilsJs.updateContext(currentContext, _event, assignActions, currentState) : currentContext;
    var preservedContexts = preserveActionOrder ? [
        currentContext
    ] : undefined;
    var resolvedActions = _utilsJs.flatten(otherActions.map(function(actionObject) {
        var _a;
        switch(actionObject.type){
            case _actionTypesJs.raise:
                return resolveRaise(actionObject);
            case _actionTypesJs.send:
                var sendAction = resolveSend(actionObject, updatedContext, _event, machine.options.delays); // TODO: fix ActionTypes.Init
                if (!_environmentJs.IS_PRODUCTION) // warn after resolving as we can create better contextual message here
                _utilsJs.warn(!_utilsJs.isString(actionObject.delay) || typeof sendAction.delay === 'number', "No delay reference for delay expression '".concat(actionObject.delay, "' was found on machine '").concat(machine.id, "'"));
                return sendAction;
            case _actionTypesJs.log:
                return resolveLog(actionObject, updatedContext, _event);
            case _actionTypesJs.choose:
                var chooseAction = actionObject;
                var matchedActions = (_a = chooseAction.conds.find(function(condition) {
                    var guard = _utilsJs.toGuard(condition.cond, machine.options.guards);
                    return !guard || _utilsJs.evaluateGuard(machine, guard, updatedContext, _event, currentState);
                })) === null || _a === void 0 ? void 0 : _a.actions;
                if (!matchedActions) return [];
                var _b = _tslibJs.__read(resolveActions(machine, currentState, updatedContext, _event, toActionObjects(_utilsJs.toArray(matchedActions), machine.options.actions), preserveActionOrder), 2), resolvedActionsFromChoose = _b[0], resolvedContextFromChoose = _b[1];
                updatedContext = resolvedContextFromChoose;
                preservedContexts === null || preservedContexts === void 0 || preservedContexts.push(updatedContext);
                return resolvedActionsFromChoose;
            case _actionTypesJs.pure:
                var matchedActions = actionObject.get(updatedContext, _event.data);
                if (!matchedActions) return [];
                var _c = _tslibJs.__read(resolveActions(machine, currentState, updatedContext, _event, toActionObjects(_utilsJs.toArray(matchedActions), machine.options.actions), preserveActionOrder), 2), resolvedActionsFromPure = _c[0], resolvedContext = _c[1];
                updatedContext = resolvedContext;
                preservedContexts === null || preservedContexts === void 0 || preservedContexts.push(updatedContext);
                return resolvedActionsFromPure;
            case _actionTypesJs.stop:
                return resolveStop(actionObject, updatedContext, _event);
            case _actionTypesJs.assign:
                updatedContext = _utilsJs.updateContext(updatedContext, _event, [
                    actionObject
                ], currentState);
                preservedContexts === null || preservedContexts === void 0 || preservedContexts.push(updatedContext);
                break;
            default:
                var resolvedActionObject = toActionObject(actionObject, machine.options.actions);
                var exec_1 = resolvedActionObject.exec;
                if (exec_1 && preservedContexts) {
                    var contextIndex_1 = preservedContexts.length - 1;
                    resolvedActionObject = _tslibJs.__assign(_tslibJs.__assign({
                    }, resolvedActionObject), {
                        exec: function(_ctx) {
                            var args = [];
                            for(var _i = 1; _i < arguments.length; _i++)args[_i - 1] = arguments[_i];
                            exec_1.apply(void 0, _tslibJs.__spreadArray([
                                preservedContexts[contextIndex_1]
                            ], _tslibJs.__read(args), false));
                        }
                    });
                }
                return resolvedActionObject;
        }
    }).filter(function(a) {
        return !!a;
    }));
    return [
        resolvedActions,
        updatedContext
    ];
}

},{"./_virtual/_tslib.js":"4So72","./types.js":"5mTTI","./actionTypes.js":"2WTWb","./utils.js":"5Ce8y","./environment.js":"fNNF6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4So72":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "__assign", ()=>__assign
);
parcelHelpers.export(exports, "__read", ()=>__read
);
parcelHelpers.export(exports, "__rest", ()=>__rest
);
parcelHelpers.export(exports, "__spreadArray", ()=>__spreadArray
);
parcelHelpers.export(exports, "__values", ()=>__values
);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {
    };
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5mTTI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ActionTypes", ()=>ActionTypes
);
parcelHelpers.export(exports, "SpecialTargets", ()=>SpecialTargets
);
var ActionTypes;
(function(ActionTypes1) {
    ActionTypes1["Start"] = "xstate.start";
    ActionTypes1["Stop"] = "xstate.stop";
    ActionTypes1["Raise"] = "xstate.raise";
    ActionTypes1["Send"] = "xstate.send";
    ActionTypes1["Cancel"] = "xstate.cancel";
    ActionTypes1["NullEvent"] = "";
    ActionTypes1["Assign"] = "xstate.assign";
    ActionTypes1["After"] = "xstate.after";
    ActionTypes1["DoneState"] = "done.state";
    ActionTypes1["DoneInvoke"] = "done.invoke";
    ActionTypes1["Log"] = "xstate.log";
    ActionTypes1["Init"] = "xstate.init";
    ActionTypes1["Invoke"] = "xstate.invoke";
    ActionTypes1["ErrorExecution"] = "error.execution";
    ActionTypes1["ErrorCommunication"] = "error.communication";
    ActionTypes1["ErrorPlatform"] = "error.platform";
    ActionTypes1["ErrorCustom"] = "xstate.error";
    ActionTypes1["Update"] = "xstate.update";
    ActionTypes1["Pure"] = "xstate.pure";
    ActionTypes1["Choose"] = "xstate.choose";
})(ActionTypes || (ActionTypes = {
}));
var SpecialTargets;
(function(SpecialTargets1) {
    SpecialTargets1["Parent"] = "#_parent";
    SpecialTargets1["Internal"] = "#_internal";
})(SpecialTargets || (SpecialTargets = {
}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2WTWb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "after", ()=>after
);
parcelHelpers.export(exports, "assign", ()=>assign
);
parcelHelpers.export(exports, "cancel", ()=>cancel
);
parcelHelpers.export(exports, "choose", ()=>choose
);
parcelHelpers.export(exports, "doneState", ()=>doneState
);
parcelHelpers.export(exports, "error", ()=>error
);
parcelHelpers.export(exports, "errorExecution", ()=>errorExecution
);
parcelHelpers.export(exports, "errorPlatform", ()=>errorPlatform
);
parcelHelpers.export(exports, "init", ()=>init
);
parcelHelpers.export(exports, "invoke", ()=>invoke
);
parcelHelpers.export(exports, "log", ()=>log
);
parcelHelpers.export(exports, "nullEvent", ()=>nullEvent
);
parcelHelpers.export(exports, "pure", ()=>pure
);
parcelHelpers.export(exports, "raise", ()=>raise
);
parcelHelpers.export(exports, "send", ()=>send
);
parcelHelpers.export(exports, "start", ()=>start
);
parcelHelpers.export(exports, "stop", ()=>stop
);
parcelHelpers.export(exports, "update", ()=>update
);
var _typesJs = require("./types.js");
var start = _typesJs.ActionTypes.Start;
var stop = _typesJs.ActionTypes.Stop;
var raise = _typesJs.ActionTypes.Raise;
var send = _typesJs.ActionTypes.Send;
var cancel = _typesJs.ActionTypes.Cancel;
var nullEvent = _typesJs.ActionTypes.NullEvent;
var assign = _typesJs.ActionTypes.Assign;
var after = _typesJs.ActionTypes.After;
var doneState = _typesJs.ActionTypes.DoneState;
var log = _typesJs.ActionTypes.Log;
var init = _typesJs.ActionTypes.Init;
var invoke = _typesJs.ActionTypes.Invoke;
var errorExecution = _typesJs.ActionTypes.ErrorExecution;
var errorPlatform = _typesJs.ActionTypes.ErrorPlatform;
var error = _typesJs.ActionTypes.ErrorCustom;
var update = _typesJs.ActionTypes.Update;
var choose = _typesJs.ActionTypes.Choose;
var pure = _typesJs.ActionTypes.Pure;

},{"./types.js":"5mTTI","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5Ce8y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createInvokeId", ()=>createInvokeId
);
parcelHelpers.export(exports, "evaluateGuard", ()=>evaluateGuard
);
parcelHelpers.export(exports, "flatten", ()=>flatten
);
parcelHelpers.export(exports, "getActionType", ()=>getActionType
);
parcelHelpers.export(exports, "getEventType", ()=>getEventType
);
parcelHelpers.export(exports, "interopSymbols", ()=>interopSymbols
);
parcelHelpers.export(exports, "isActor", ()=>isActor
);
parcelHelpers.export(exports, "isArray", ()=>isArray
);
parcelHelpers.export(exports, "isBehavior", ()=>isBehavior
);
parcelHelpers.export(exports, "isBuiltInEvent", ()=>isBuiltInEvent
);
parcelHelpers.export(exports, "isFunction", ()=>isFunction
);
parcelHelpers.export(exports, "isMachine", ()=>isMachine
);
parcelHelpers.export(exports, "isObservable", ()=>isObservable
);
parcelHelpers.export(exports, "isPromiseLike", ()=>isPromiseLike
);
parcelHelpers.export(exports, "isStateLike", ()=>isStateLike
);
parcelHelpers.export(exports, "isString", ()=>isString
);
parcelHelpers.export(exports, "keys", ()=>keys
);
parcelHelpers.export(exports, "mapContext", ()=>mapContext
);
parcelHelpers.export(exports, "mapFilterValues", ()=>mapFilterValues
);
parcelHelpers.export(exports, "mapValues", ()=>mapValues
);
parcelHelpers.export(exports, "matchesState", ()=>matchesState
);
parcelHelpers.export(exports, "nestedPath", ()=>nestedPath
);
parcelHelpers.export(exports, "normalizeTarget", ()=>normalizeTarget
);
parcelHelpers.export(exports, "partition", ()=>partition
);
parcelHelpers.export(exports, "path", ()=>path
);
parcelHelpers.export(exports, "pathToStateValue", ()=>pathToStateValue
);
parcelHelpers.export(exports, "pathsToStateValue", ()=>pathsToStateValue
);
parcelHelpers.export(exports, "reportUnhandledExceptionOnInvocation", ()=>reportUnhandledExceptionOnInvocation
);
parcelHelpers.export(exports, "symbolObservable", ()=>symbolObservable
);
parcelHelpers.export(exports, "toArray", ()=>toArray
);
parcelHelpers.export(exports, "toArrayStrict", ()=>toArrayStrict
);
parcelHelpers.export(exports, "toEventObject", ()=>toEventObject
);
parcelHelpers.export(exports, "toGuard", ()=>toGuard
);
parcelHelpers.export(exports, "toInvokeSource", ()=>toInvokeSource
);
parcelHelpers.export(exports, "toObserver", ()=>toObserver
);
parcelHelpers.export(exports, "toSCXMLEvent", ()=>toSCXMLEvent
);
parcelHelpers.export(exports, "toStatePath", ()=>toStatePath
);
parcelHelpers.export(exports, "toStatePaths", ()=>toStatePaths
);
parcelHelpers.export(exports, "toStateValue", ()=>toStateValue
);
parcelHelpers.export(exports, "toTransitionConfigArray", ()=>toTransitionConfigArray
);
parcelHelpers.export(exports, "uniqueId", ()=>uniqueId
);
parcelHelpers.export(exports, "updateContext", ()=>updateContext
);
parcelHelpers.export(exports, "updateHistoryStates", ()=>updateHistoryStates
);
parcelHelpers.export(exports, "updateHistoryValue", ()=>updateHistoryValue
);
parcelHelpers.export(exports, "warn", ()=>warn
);
var _tslibJs = require("./_virtual/_tslib.js");
var _constantsJs = require("./constants.js");
var _environmentJs = require("./environment.js");
var _a;
function keys(value) {
    return Object.keys(value);
}
function matchesState(parentStateId, childStateId, delimiter) {
    if (delimiter === void 0) delimiter = _constantsJs.STATE_DELIMITER;
    var parentStateValue = toStateValue(parentStateId, delimiter);
    var childStateValue = toStateValue(childStateId, delimiter);
    if (isString(childStateValue)) {
        if (isString(parentStateValue)) return childStateValue === parentStateValue;
         // Parent more specific than child
        return false;
    }
    if (isString(parentStateValue)) return parentStateValue in childStateValue;
    return Object.keys(parentStateValue).every(function(key) {
        if (!(key in childStateValue)) return false;
        return matchesState(parentStateValue[key], childStateValue[key]);
    });
}
function getEventType(event) {
    try {
        return isString(event) || typeof event === 'number' ? "".concat(event) : event.type;
    } catch (e) {
        throw new Error('Events must be strings or objects with a string event.type property.');
    }
}
function getActionType(action) {
    try {
        return isString(action) || typeof action === 'number' ? "".concat(action) : isFunction(action) ? action.name : action.type;
    } catch (e) {
        throw new Error('Actions must be strings or objects with a string action.type property.');
    }
}
function toStatePath(stateId, delimiter) {
    try {
        if (isArray(stateId)) return stateId;
        return stateId.toString().split(delimiter);
    } catch (e) {
        throw new Error("'".concat(stateId, "' is not a valid state path."));
    }
}
function isStateLike(state) {
    return typeof state === 'object' && 'value' in state && 'context' in state && 'event' in state && '_event' in state;
}
function toStateValue(stateValue, delimiter) {
    if (isStateLike(stateValue)) return stateValue.value;
    if (isArray(stateValue)) return pathToStateValue(stateValue);
    if (typeof stateValue !== 'string') return stateValue;
    var statePath = toStatePath(stateValue, delimiter);
    return pathToStateValue(statePath);
}
function pathToStateValue(statePath) {
    if (statePath.length === 1) return statePath[0];
    var value = {
    };
    var marker = value;
    for(var i = 0; i < statePath.length - 1; i++)if (i === statePath.length - 2) marker[statePath[i]] = statePath[i + 1];
    else {
        marker[statePath[i]] = {
        };
        marker = marker[statePath[i]];
    }
    return value;
}
function mapValues(collection, iteratee) {
    var result = {
    };
    var collectionKeys = Object.keys(collection);
    for(var i = 0; i < collectionKeys.length; i++){
        var key = collectionKeys[i];
        result[key] = iteratee(collection[key], key, collection, i);
    }
    return result;
}
function mapFilterValues(collection, iteratee, predicate) {
    var e_1, _a1;
    var result = {
    };
    try {
        for(var _b = _tslibJs.__values(Object.keys(collection)), _c = _b.next(); !_c.done; _c = _b.next()){
            var key = _c.value;
            var item = collection[key];
            if (!predicate(item)) continue;
            result[key] = iteratee(item, key, collection);
        }
    } catch (e_1_1) {
        e_1 = {
            error: e_1_1
        };
    } finally{
        try {
            if (_c && !_c.done && (_a1 = _b.return)) _a1.call(_b);
        } finally{
            if (e_1) throw e_1.error;
        }
    }
    return result;
}
/**
 * Retrieves a value at the given path.
 * @param props The deep path to the prop of the desired value
 */ var path = function(props) {
    return function(object) {
        var e_2, _a2;
        var result = object;
        try {
            for(var props_1 = _tslibJs.__values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()){
                var prop = props_1_1.value;
                result = result[prop];
            }
        } catch (e_2_1) {
            e_2 = {
                error: e_2_1
            };
        } finally{
            try {
                if (props_1_1 && !props_1_1.done && (_a2 = props_1.return)) _a2.call(props_1);
            } finally{
                if (e_2) throw e_2.error;
            }
        }
        return result;
    };
};
/**
 * Retrieves a value at the given path via the nested accessor prop.
 * @param props The deep path to the prop of the desired value
 */ function nestedPath(props, accessorProp) {
    return function(object) {
        var e_3, _a3;
        var result = object;
        try {
            for(var props_2 = _tslibJs.__values(props), props_2_1 = props_2.next(); !props_2_1.done; props_2_1 = props_2.next()){
                var prop = props_2_1.value;
                result = result[accessorProp][prop];
            }
        } catch (e_3_1) {
            e_3 = {
                error: e_3_1
            };
        } finally{
            try {
                if (props_2_1 && !props_2_1.done && (_a3 = props_2.return)) _a3.call(props_2);
            } finally{
                if (e_3) throw e_3.error;
            }
        }
        return result;
    };
}
function toStatePaths(stateValue) {
    if (!stateValue) return [
        []
    ];
    if (isString(stateValue)) return [
        [
            stateValue
        ]
    ];
    var result = flatten(Object.keys(stateValue).map(function(key) {
        var subStateValue = stateValue[key];
        if (typeof subStateValue !== 'string' && (!subStateValue || !Object.keys(subStateValue).length)) return [
            [
                key
            ]
        ];
        return toStatePaths(stateValue[key]).map(function(subPath) {
            return [
                key
            ].concat(subPath);
        });
    }));
    return result;
}
function pathsToStateValue(paths) {
    var e_4, _a4;
    var result = {
    };
    if (paths && paths.length === 1 && paths[0].length === 1) return paths[0][0];
    try {
        for(var paths_1 = _tslibJs.__values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()){
            var currentPath = paths_1_1.value;
            var marker = result; // tslint:disable-next-line:prefer-for-of
            for(var i = 0; i < currentPath.length; i++){
                var subPath = currentPath[i];
                if (i === currentPath.length - 2) {
                    marker[subPath] = currentPath[i + 1];
                    break;
                }
                marker[subPath] = marker[subPath] || {
                };
                marker = marker[subPath];
            }
        }
    } catch (e_4_1) {
        e_4 = {
            error: e_4_1
        };
    } finally{
        try {
            if (paths_1_1 && !paths_1_1.done && (_a4 = paths_1.return)) _a4.call(paths_1);
        } finally{
            if (e_4) throw e_4.error;
        }
    }
    return result;
}
function flatten(array) {
    var _a5;
    return (_a5 = []).concat.apply(_a5, _tslibJs.__spreadArray([], _tslibJs.__read(array), false));
}
function toArrayStrict(value) {
    if (isArray(value)) return value;
    return [
        value
    ];
}
function toArray(value) {
    if (value === undefined) return [];
    return toArrayStrict(value);
}
function mapContext(mapper, context, _event) {
    var e_5, _a6;
    if (isFunction(mapper)) return mapper(context, _event.data);
    var result = {
    };
    try {
        for(var _b = _tslibJs.__values(Object.keys(mapper)), _c = _b.next(); !_c.done; _c = _b.next()){
            var key = _c.value;
            var subMapper = mapper[key];
            if (isFunction(subMapper)) result[key] = subMapper(context, _event.data);
            else result[key] = subMapper;
        }
    } catch (e_5_1) {
        e_5 = {
            error: e_5_1
        };
    } finally{
        try {
            if (_c && !_c.done && (_a6 = _b.return)) _a6.call(_b);
        } finally{
            if (e_5) throw e_5.error;
        }
    }
    return result;
}
function isBuiltInEvent(eventType) {
    return /^(done|error)\./.test(eventType);
}
function isPromiseLike(value) {
    if (value instanceof Promise) return true;
     // Check if shape matches the Promise/A+ specification for a "thenable".
    if (value !== null && (isFunction(value) || typeof value === 'object') && isFunction(value.then)) return true;
    return false;
}
function isBehavior(value) {
    return value !== null && typeof value === 'object' && 'transition' in value && typeof value.transition === 'function';
}
function partition(items, predicate) {
    var e_6, _a7;
    var _b = _tslibJs.__read([
        [],
        []
    ], 2), truthy = _b[0], falsy = _b[1];
    try {
        for(var items_1 = _tslibJs.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()){
            var item = items_1_1.value;
            if (predicate(item)) truthy.push(item);
            else falsy.push(item);
        }
    } catch (e_6_1) {
        e_6 = {
            error: e_6_1
        };
    } finally{
        try {
            if (items_1_1 && !items_1_1.done && (_a7 = items_1.return)) _a7.call(items_1);
        } finally{
            if (e_6) throw e_6.error;
        }
    }
    return [
        truthy,
        falsy
    ];
}
function updateHistoryStates(hist, stateValue) {
    return mapValues(hist.states, function(subHist, key) {
        if (!subHist) return undefined;
        var subStateValue = (isString(stateValue) ? undefined : stateValue[key]) || (subHist ? subHist.current : undefined);
        if (!subStateValue) return undefined;
        return {
            current: subStateValue,
            states: updateHistoryStates(subHist, subStateValue)
        };
    });
}
function updateHistoryValue(hist, stateValue) {
    return {
        current: stateValue,
        states: updateHistoryStates(hist, stateValue)
    };
}
function updateContext(context, _event, assignActions, state) {
    if (!_environmentJs.IS_PRODUCTION) warn(!!context, 'Attempting to update undefined context');
    var updatedContext = context ? assignActions.reduce(function(acc, assignAction) {
        var e_7, _a8;
        var assignment = assignAction.assignment;
        var meta = {
            state: state,
            action: assignAction,
            _event: _event
        };
        var partialUpdate = {
        };
        if (isFunction(assignment)) partialUpdate = assignment(acc, _event.data, meta);
        else try {
            for(var _b = _tslibJs.__values(Object.keys(assignment)), _c = _b.next(); !_c.done; _c = _b.next()){
                var key = _c.value;
                var propAssignment = assignment[key];
                partialUpdate[key] = isFunction(propAssignment) ? propAssignment(acc, _event.data, meta) : propAssignment;
            }
        } catch (e_7_1) {
            e_7 = {
                error: e_7_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a8 = _b.return)) _a8.call(_b);
            } finally{
                if (e_7) throw e_7.error;
            }
        }
        return Object.assign({
        }, acc, partialUpdate);
    }, context) : context;
    return updatedContext;
} // tslint:disable-next-line:no-empty
var warn = function() {
};
if (!_environmentJs.IS_PRODUCTION) warn = function(condition, message) {
    var error = condition instanceof Error ? condition : undefined;
    if (!error && condition) return;
    if (console !== undefined) {
        var args = [
            "Warning: ".concat(message)
        ];
        if (error) args.push(error);
         // tslint:disable-next-line:no-console
        console.warn.apply(console, args);
    }
};
function isArray(value) {
    return Array.isArray(value);
} // tslint:disable-next-line:ban-types
function isFunction(value) {
    return typeof value === 'function';
}
function isString(value) {
    return typeof value === 'string';
}
function toGuard(condition, guardMap) {
    if (!condition) return undefined;
    if (isString(condition)) return {
        type: _constantsJs.DEFAULT_GUARD_TYPE,
        name: condition,
        predicate: guardMap ? guardMap[condition] : undefined
    };
    if (isFunction(condition)) return {
        type: _constantsJs.DEFAULT_GUARD_TYPE,
        name: condition.name,
        predicate: condition
    };
    return condition;
}
function isObservable(value) {
    try {
        return 'subscribe' in value && isFunction(value.subscribe);
    } catch (e) {
        return false;
    }
}
var symbolObservable = /*#__PURE__*/ function() {
    return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}(); // TODO: to be removed in v5, left it out just to minimize the scope of the change and maintain compatibility with older versions of integration paackages
var interopSymbols = (_a = {
}, _a[symbolObservable] = function() {
    return this;
}, _a[Symbol.observable] = function() {
    return this;
}, _a);
function isMachine(value) {
    return !!value && '__xstatenode' in value;
}
function isActor(value) {
    return !!value && typeof value.send === 'function';
}
var uniqueId = /*#__PURE__*/ function() {
    var currentId = 0;
    return function() {
        currentId++;
        return currentId.toString(16);
    };
}();
function toEventObject(event, payload // id?: TEvent['type']
) {
    if (isString(event) || typeof event === 'number') return _tslibJs.__assign({
        type: event
    }, payload);
    return event;
}
function toSCXMLEvent(event, scxmlEvent) {
    if (!isString(event) && '$$type' in event && event.$$type === 'scxml') return event;
    var eventObject = toEventObject(event);
    return _tslibJs.__assign({
        name: eventObject.type,
        data: eventObject,
        $$type: 'scxml',
        type: 'external'
    }, scxmlEvent);
}
function toTransitionConfigArray(event, configLike) {
    var transitions = toArrayStrict(configLike).map(function(transitionLike) {
        if (typeof transitionLike === 'undefined' || typeof transitionLike === 'string' || isMachine(transitionLike)) return {
            target: transitionLike,
            event: event
        };
        return _tslibJs.__assign(_tslibJs.__assign({
        }, transitionLike), {
            event: event
        });
    });
    return transitions;
}
function normalizeTarget(target) {
    if (target === undefined || target === _constantsJs.TARGETLESS_KEY) return undefined;
    return toArray(target);
}
function reportUnhandledExceptionOnInvocation(originalError, currentError, id) {
    if (!_environmentJs.IS_PRODUCTION) {
        var originalStackTrace = originalError.stack ? " Stacktrace was '".concat(originalError.stack, "'") : '';
        if (originalError === currentError) // tslint:disable-next-line:no-console
        console.error("Missing onError handler for invocation '".concat(id, "', error was '").concat(originalError, "'.").concat(originalStackTrace));
        else {
            var stackTrace = currentError.stack ? " Stacktrace was '".concat(currentError.stack, "'") : ''; // tslint:disable-next-line:no-console
            console.error("Missing onError handler and/or unhandled exception/promise rejection for invocation '".concat(id, "'. ") + "Original error: '".concat(originalError, "'. ").concat(originalStackTrace, " Current error is '").concat(currentError, "'.").concat(stackTrace));
        }
    }
}
function evaluateGuard(machine, guard, context, _event, state) {
    var guards = machine.options.guards;
    var guardMeta = {
        state: state,
        cond: guard,
        _event: _event
    }; // TODO: do not hardcode!
    if (guard.type === _constantsJs.DEFAULT_GUARD_TYPE) return ((guards === null || guards === void 0 ? void 0 : guards[guard.name]) || guard.predicate)(context, _event.data, guardMeta);
    var condFn = guards === null || guards === void 0 ? void 0 : guards[guard.type];
    if (!condFn) throw new Error("Guard '".concat(guard.type, "' is not implemented on machine '").concat(machine.id, "'."));
    return condFn(context, _event.data, guardMeta);
}
function toInvokeSource(src) {
    if (typeof src === 'string') return {
        type: src
    };
    return src;
}
function toObserver(nextHandler, errorHandler, completionHandler) {
    if (typeof nextHandler === 'object') return nextHandler;
    var noop = function() {
        return void 0;
    };
    return {
        next: nextHandler,
        error: errorHandler || noop,
        complete: completionHandler || noop
    };
}
function createInvokeId(stateNodeId, index) {
    return "".concat(stateNodeId, ":invocation[").concat(index, "]");
}

},{"./_virtual/_tslib.js":"4So72","./constants.js":"lmFH5","./environment.js":"fNNF6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lmFH5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DEFAULT_GUARD_TYPE", ()=>DEFAULT_GUARD_TYPE
);
parcelHelpers.export(exports, "EMPTY_ACTIVITY_MAP", ()=>EMPTY_ACTIVITY_MAP
);
parcelHelpers.export(exports, "STATE_DELIMITER", ()=>STATE_DELIMITER
);
parcelHelpers.export(exports, "TARGETLESS_KEY", ()=>TARGETLESS_KEY
);
var STATE_DELIMITER = '.';
var EMPTY_ACTIVITY_MAP = {
};
var DEFAULT_GUARD_TYPE = 'xstate.guard';
var TARGETLESS_KEY = '';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fNNF6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IS_PRODUCTION", ()=>IS_PRODUCTION
);
var IS_PRODUCTION = false;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"itCIE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createDeferredActor", ()=>createDeferredActor
);
parcelHelpers.export(exports, "createInvocableActor", ()=>createInvocableActor
);
parcelHelpers.export(exports, "createNullActor", ()=>createNullActor
);
parcelHelpers.export(exports, "isActor", ()=>isActor
);
parcelHelpers.export(exports, "isSpawnedActor", ()=>isSpawnedActor
);
parcelHelpers.export(exports, "toActorRef", ()=>toActorRef
);
var _tslibJs = require("./_virtual/_tslib.js");
var _utilsJs = require("./utils.js");
var _serviceScopeJs = require("./serviceScope.js");
function createNullActor(id) {
    var _a;
    return _a = {
        id: id,
        send: function() {
            return void 0;
        },
        subscribe: function() {
            return {
                unsubscribe: function() {
                    return void 0;
                }
            };
        },
        getSnapshot: function() {
            return undefined;
        },
        toJSON: function() {
            return {
                id: id
            };
        }
    }, _a[_utilsJs.symbolObservable] = function() {
        return this;
    }, _a;
}
/**
 * Creates a deferred actor that is able to be invoked given the provided
 * invocation information in its `.meta` value.
 *
 * @param invokeDefinition The meta information needed to invoke the actor.
 */ function createInvocableActor(invokeDefinition, machine, context, _event) {
    var _a;
    var invokeSrc = _utilsJs.toInvokeSource(invokeDefinition.src);
    var serviceCreator = (_a = machine === null || machine === void 0 ? void 0 : machine.options.services) === null || _a === void 0 ? void 0 : _a[invokeSrc.type];
    var resolvedData = invokeDefinition.data ? _utilsJs.mapContext(invokeDefinition.data, context, _event) : undefined;
    var tempActor = serviceCreator ? createDeferredActor(serviceCreator, invokeDefinition.id, resolvedData) : createNullActor(invokeDefinition.id); // @ts-ignore
    tempActor.meta = invokeDefinition;
    return tempActor;
}
function createDeferredActor(entity, id, data) {
    var tempActor = createNullActor(id); // @ts-ignore
    tempActor.deferred = true;
    if (_utilsJs.isMachine(entity)) {
        // "mute" the existing service scope so potential spawned actors within the `.initialState` stay deferred here
        var initialState_1 = tempActor.state = _serviceScopeJs.provide(undefined, function() {
            return (data ? entity.withContext(data) : entity).initialState;
        });
        tempActor.getSnapshot = function() {
            return initialState_1;
        };
    }
    return tempActor;
}
function isActor(item) {
    try {
        return typeof item.send === 'function';
    } catch (e) {
        return false;
    }
}
function isSpawnedActor(item) {
    return isActor(item) && 'id' in item;
} // TODO: refactor the return type, this could be written in a better way but it's best to avoid unneccessary breaking changes now
function toActorRef(actorRefLike) {
    var _a;
    return _tslibJs.__assign((_a = {
        subscribe: function() {
            return {
                unsubscribe: function() {
                    return void 0;
                }
            };
        },
        id: 'anonymous',
        getSnapshot: function() {
            return undefined;
        }
    }, _a[_utilsJs.symbolObservable] = function() {
        return this;
    }, _a), actorRefLike);
}

},{"./_virtual/_tslib.js":"4So72","./utils.js":"5Ce8y","./serviceScope.js":"jT5rp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jT5rp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "consume", ()=>consume
);
parcelHelpers.export(exports, "provide", ()=>provide
);
/**
 * Maintains a stack of the current service in scope.
 * This is used to provide the correct service to spawn().
 */ var serviceStack = [];
var provide = function(service, fn) {
    serviceStack.push(service);
    var result = fn(service);
    serviceStack.pop();
    return result;
};
var consume = function(fn) {
    return fn(serviceStack[serviceStack.length - 1]);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"imBPa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Interpreter", ()=>Interpreter
);
parcelHelpers.export(exports, "InterpreterStatus", ()=>InterpreterStatus
);
parcelHelpers.export(exports, "interpret", ()=>interpret
);
parcelHelpers.export(exports, "spawn", ()=>spawn
);
var _tslibJs = require("./_virtual/_tslib.js");
var _typesJs = require("./types.js");
var _stateJs = require("./State.js");
var _actionTypesJs = require("./actionTypes.js");
var _actionsJs = require("./actions.js");
var _environmentJs = require("./environment.js");
var _utilsJs = require("./utils.js");
var _schedulerJs = require("./scheduler.js");
var _actorJs = require("./Actor.js");
var _stateUtilsJs = require("./stateUtils.js");
var _registryJs = require("./registry.js");
var _devToolsJs = require("./devTools.js");
var _serviceScopeJs = require("./serviceScope.js");
var _behaviorsJs = require("./behaviors.js");
var DEFAULT_SPAWN_OPTIONS = {
    sync: false,
    autoForward: false
};
var InterpreterStatus;
(function(InterpreterStatus1) {
    InterpreterStatus1[InterpreterStatus1["NotStarted"] = 0] = "NotStarted";
    InterpreterStatus1[InterpreterStatus1["Running"] = 1] = "Running";
    InterpreterStatus1[InterpreterStatus1["Stopped"] = 2] = "Stopped";
})(InterpreterStatus || (InterpreterStatus = {
}));
var Interpreter = /*#__PURE__*/ /** @class */ function() {
    /**
   * Creates a new Interpreter instance (i.e., service) for the given machine with the provided options, if any.
   *
   * @param machine The machine to be interpreted
   * @param options Interpreter options
   */ function Interpreter1(machine, options) {
        var _this = this;
        if (options === void 0) options = Interpreter1.defaultOptions;
        this.machine = machine;
        this.scheduler = new _schedulerJs.Scheduler();
        this.delayedEventsMap = {
        };
        this.listeners = new Set();
        this.contextListeners = new Set();
        this.stopListeners = new Set();
        this.doneListeners = new Set();
        this.eventListeners = new Set();
        this.sendListeners = new Set();
        /**
     * Whether the service is started.
     */ this.initialized = false;
        this.status = InterpreterStatus.NotStarted;
        this.children = new Map();
        this.forwardTo = new Set();
        /**
     * Alias for Interpreter.prototype.start
     */ this.init = this.start;
        /**
     * Sends an event to the running interpreter to trigger a transition.
     *
     * An array of events (batched) can be sent as well, which will send all
     * batched events to the running interpreter. The listeners will be
     * notified only **once** when all events are processed.
     *
     * @param event The event(s) to send
     */ this.send = function(event, payload) {
            if (_utilsJs.isArray(event)) {
                _this.batch(event);
                return _this.state;
            }
            var _event = _utilsJs.toSCXMLEvent(_utilsJs.toEventObject(event, payload));
            if (_this.status === InterpreterStatus.Stopped) {
                // do nothing
                if (!_environmentJs.IS_PRODUCTION) _utilsJs.warn(false, "Event \"".concat(_event.name, "\" was sent to stopped service \"").concat(_this.machine.id, "\". This service has already reached its final state, and will not transition.\nEvent: ").concat(JSON.stringify(_event.data)));
                return _this.state;
            }
            if (_this.status !== InterpreterStatus.Running && !_this.options.deferEvents) throw new Error("Event \"".concat(_event.name, "\" was sent to uninitialized service \"").concat(_this.machine.id // tslint:disable-next-line:max-line-length
            , "\". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.\nEvent: ").concat(JSON.stringify(_event.data)));
            _this.scheduler.schedule(function() {
                // Forward copy of event to child actors
                _this.forward(_event);
                var nextState = _this.nextState(_event);
                _this.update(nextState, _event);
            });
            return _this._state; // TODO: deprecate (should return void)
        // tslint:disable-next-line:semicolon
        };
        this.sendTo = function(event, to) {
            var isParent = _this.parent && (to === _typesJs.SpecialTargets.Parent || _this.parent.id === to);
            var target = isParent ? _this.parent : _utilsJs.isString(to) ? _this.children.get(to) || _registryJs.registry.get(to) : _utilsJs.isActor(to) ? to : undefined;
            if (!target) {
                if (!isParent) throw new Error("Unable to send event to child '".concat(to, "' from service '").concat(_this.id, "'."));
                 // tslint:disable-next-line:no-console
                if (!_environmentJs.IS_PRODUCTION) _utilsJs.warn(false, "Service '".concat(_this.id, "' has no parent: unable to send event ").concat(event.type));
                return;
            }
            if ('machine' in target) // Send SCXML events to machines
            target.send(_tslibJs.__assign(_tslibJs.__assign({
            }, event), {
                name: event.name === _actionTypesJs.error ? "".concat(_actionsJs.error(_this.id)) : event.name,
                origin: _this.sessionId
            }));
            else // Send normal events to other targets
            target.send(event.data);
        };
        var resolvedOptions = _tslibJs.__assign(_tslibJs.__assign({
        }, Interpreter1.defaultOptions), options);
        var clock = resolvedOptions.clock, logger = resolvedOptions.logger, parent = resolvedOptions.parent, id = resolvedOptions.id;
        var resolvedId = id !== undefined ? id : machine.id;
        this.id = resolvedId;
        this.logger = logger;
        this.clock = clock;
        this.parent = parent;
        this.options = resolvedOptions;
        this.scheduler = new _schedulerJs.Scheduler({
            deferEvents: this.options.deferEvents
        });
        this.sessionId = _registryJs.registry.bookId();
    }
    Object.defineProperty(Interpreter1.prototype, "initialState", {
        get: function() {
            var _this = this;
            if (this._initialState) return this._initialState;
            return _serviceScopeJs.provide(this, function() {
                _this._initialState = _this.machine.initialState;
                return _this._initialState;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interpreter1.prototype, "state", {
        get: function() {
            if (!_environmentJs.IS_PRODUCTION) _utilsJs.warn(this.status !== InterpreterStatus.NotStarted, "Attempted to read state from uninitialized service '".concat(this.id, "'. Make sure the service is started first."));
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    /**
   * Executes the actions of the given state, with that state's `context` and `event`.
   *
   * @param state The state whose actions will be executed
   * @param actionsConfig The action implementations to use
   */ Interpreter1.prototype.execute = function(state, actionsConfig) {
        var e_1, _a;
        try {
            for(var _b = _tslibJs.__values(state.actions), _c = _b.next(); !_c.done; _c = _b.next()){
                var action = _c.value;
                this.exec(action, state, actionsConfig);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    };
    Interpreter1.prototype.update = function(state, _event) {
        var e_2, _a, e_3, _b, e_4, _c, e_5, _d;
        var _this = this; // Attach session ID to state
        state._sessionid = this.sessionId; // Update state
        this._state = state; // Execute actions
        if (this.options.execute) this.execute(this.state);
         // Update children
        this.children.forEach(function(child) {
            _this.state.children[child.id] = child;
        }); // Dev tools
        if (this.devTools) this.devTools.send(_event.data, state);
         // Execute listeners
        if (state.event) try {
            for(var _e = _tslibJs.__values(this.eventListeners), _f = _e.next(); !_f.done; _f = _e.next()){
                var listener = _f.value;
                listener(state.event);
            }
        } catch (e_2_1) {
            e_2 = {
                error: e_2_1
            };
        } finally{
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            } finally{
                if (e_2) throw e_2.error;
            }
        }
        try {
            for(var _g = _tslibJs.__values(this.listeners), _h = _g.next(); !_h.done; _h = _g.next()){
                var listener = _h.value;
                listener(state, state.event);
            }
        } catch (e_3_1) {
            e_3 = {
                error: e_3_1
            };
        } finally{
            try {
                if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
            } finally{
                if (e_3) throw e_3.error;
            }
        }
        try {
            for(var _j = _tslibJs.__values(this.contextListeners), _k = _j.next(); !_k.done; _k = _j.next()){
                var contextListener = _k.value;
                contextListener(this.state.context, this.state.history ? this.state.history.context : undefined);
            }
        } catch (e_4_1) {
            e_4 = {
                error: e_4_1
            };
        } finally{
            try {
                if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
            } finally{
                if (e_4) throw e_4.error;
            }
        }
        var isDone = _stateUtilsJs.isInFinalState(state.configuration || [], this.machine);
        if (this.state.configuration && isDone) {
            // get final child state node
            var finalChildStateNode = state.configuration.find(function(sn) {
                return sn.type === 'final' && sn.parent === _this.machine;
            });
            var doneData = finalChildStateNode && finalChildStateNode.doneData ? _utilsJs.mapContext(finalChildStateNode.doneData, state.context, _event) : undefined;
            try {
                for(var _l = _tslibJs.__values(this.doneListeners), _m = _l.next(); !_m.done; _m = _l.next()){
                    var listener = _m.value;
                    listener(_actionsJs.doneInvoke(this.id, doneData));
                }
            } catch (e_5_1) {
                e_5 = {
                    error: e_5_1
                };
            } finally{
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                } finally{
                    if (e_5) throw e_5.error;
                }
            }
            this.stop();
        }
    };
    /*
   * Adds a listener that is notified whenever a state transition happens. The listener is called with
   * the next state and the event object that caused the state transition.
   *
   * @param listener The state listener
   */ Interpreter1.prototype.onTransition = function(listener) {
        this.listeners.add(listener); // Send current state to listener
        if (this.status === InterpreterStatus.Running) listener(this.state, this.state.event);
        return this;
    };
    Interpreter1.prototype.subscribe = function(nextListenerOrObserver, _, completeListener) {
        var _this = this;
        if (!nextListenerOrObserver) return {
            unsubscribe: function() {
                return void 0;
            }
        };
        var listener;
        var resolvedCompleteListener = completeListener;
        if (typeof nextListenerOrObserver === 'function') listener = nextListenerOrObserver;
        else {
            listener = nextListenerOrObserver.next.bind(nextListenerOrObserver);
            resolvedCompleteListener = nextListenerOrObserver.complete.bind(nextListenerOrObserver);
        }
        this.listeners.add(listener); // Send current state to listener
        if (this.status === InterpreterStatus.Running) listener(this.state);
        if (resolvedCompleteListener) this.onDone(resolvedCompleteListener);
        return {
            unsubscribe: function() {
                listener && _this.listeners.delete(listener);
                resolvedCompleteListener && _this.doneListeners.delete(resolvedCompleteListener);
            }
        };
    };
    /**
   * Adds an event listener that is notified whenever an event is sent to the running interpreter.
   * @param listener The event listener
   */ Interpreter1.prototype.onEvent = function(listener) {
        this.eventListeners.add(listener);
        return this;
    };
    /**
   * Adds an event listener that is notified whenever a `send` event occurs.
   * @param listener The event listener
   */ Interpreter1.prototype.onSend = function(listener) {
        this.sendListeners.add(listener);
        return this;
    };
    /**
   * Adds a context listener that is notified whenever the state context changes.
   * @param listener The context listener
   */ Interpreter1.prototype.onChange = function(listener) {
        this.contextListeners.add(listener);
        return this;
    };
    /**
   * Adds a listener that is notified when the machine is stopped.
   * @param listener The listener
   */ Interpreter1.prototype.onStop = function(listener) {
        this.stopListeners.add(listener);
        return this;
    };
    /**
   * Adds a state listener that is notified when the statechart has reached its final state.
   * @param listener The state listener
   */ Interpreter1.prototype.onDone = function(listener) {
        this.doneListeners.add(listener);
        return this;
    };
    /**
   * Removes a listener.
   * @param listener The listener to remove
   */ Interpreter1.prototype.off = function(listener) {
        this.listeners.delete(listener);
        this.eventListeners.delete(listener);
        this.sendListeners.delete(listener);
        this.stopListeners.delete(listener);
        this.doneListeners.delete(listener);
        this.contextListeners.delete(listener);
        return this;
    };
    /**
   * Starts the interpreter from the given state, or the initial state.
   * @param initialState The state to start the statechart from
   */ Interpreter1.prototype.start = function(initialState) {
        var _this = this;
        if (this.status === InterpreterStatus.Running) // Do not restart the service if it is already started
        return this;
         // yes, it's a hack but we need the related cache to be populated for some things to work (like delayed transitions)
        // this is usually called by `machine.getInitialState` but if we rehydrate from a state we might bypass this call
        // we also don't want to call this method here as it resolves the full initial state which might involve calling assign actions
        // and that could potentially lead to some unwanted side-effects (even such as creating some rogue actors)
        this.machine._init();
        _registryJs.registry.register(this.sessionId, this);
        this.initialized = true;
        this.status = InterpreterStatus.Running;
        var resolvedState = initialState === undefined ? this.initialState : _serviceScopeJs.provide(this, function() {
            return _stateJs.isStateConfig(initialState) ? _this.machine.resolveState(initialState) : _this.machine.resolveState(_stateJs.State.from(initialState, _this.machine.context));
        });
        if (this.options.devTools) this.attachDev();
        this.scheduler.initialize(function() {
            _this.update(resolvedState, _actionsJs.initEvent);
        });
        return this;
    };
    /**
   * Stops the interpreter and unsubscribe all listeners.
   *
   * This will also notify the `onStop` listeners.
   */ Interpreter1.prototype.stop = function() {
        var e_6, _a1, e_7, _b1, e_8, _c1, e_9, _d, e_10, _e;
        var _this = this;
        try {
            for(var _f = _tslibJs.__values(this.listeners), _g = _f.next(); !_g.done; _g = _f.next()){
                var listener = _g.value;
                this.listeners.delete(listener);
            }
        } catch (e_6_1) {
            e_6 = {
                error: e_6_1
            };
        } finally{
            try {
                if (_g && !_g.done && (_a1 = _f.return)) _a1.call(_f);
            } finally{
                if (e_6) throw e_6.error;
            }
        }
        try {
            for(var _h = _tslibJs.__values(this.stopListeners), _j = _h.next(); !_j.done; _j = _h.next()){
                var listener = _j.value; // call listener, then remove
                listener();
                this.stopListeners.delete(listener);
            }
        } catch (e_7_1) {
            e_7 = {
                error: e_7_1
            };
        } finally{
            try {
                if (_j && !_j.done && (_b1 = _h.return)) _b1.call(_h);
            } finally{
                if (e_7) throw e_7.error;
            }
        }
        try {
            for(var _k = _tslibJs.__values(this.contextListeners), _l = _k.next(); !_l.done; _l = _k.next()){
                var listener = _l.value;
                this.contextListeners.delete(listener);
            }
        } catch (e_8_1) {
            e_8 = {
                error: e_8_1
            };
        } finally{
            try {
                if (_l && !_l.done && (_c1 = _k.return)) _c1.call(_k);
            } finally{
                if (e_8) throw e_8.error;
            }
        }
        try {
            for(var _m = _tslibJs.__values(this.doneListeners), _o = _m.next(); !_o.done; _o = _m.next()){
                var listener = _o.value;
                this.doneListeners.delete(listener);
            }
        } catch (e_9_1) {
            e_9 = {
                error: e_9_1
            };
        } finally{
            try {
                if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
            } finally{
                if (e_9) throw e_9.error;
            }
        }
        if (!this.initialized) // Interpreter already stopped; do nothing
        return this;
        _tslibJs.__spreadArray([], _tslibJs.__read(this.state.configuration), false).sort(function(a, b) {
            return b.order - a.order;
        }).forEach(function(stateNode) {
            var e_11, _a;
            try {
                for(var _b = _tslibJs.__values(stateNode.definition.exit), _c = _b.next(); !_c.done; _c = _b.next()){
                    var action = _c.value;
                    _this.exec(action, _this.state);
                }
            } catch (e_11_1) {
                e_11 = {
                    error: e_11_1
                };
            } finally{
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally{
                    if (e_11) throw e_11.error;
                }
            }
        }); // Stop all children
        this.children.forEach(function(child) {
            if (_utilsJs.isFunction(child.stop)) child.stop();
        });
        try {
            // Cancel all delayed events
            for(var _p = _tslibJs.__values(Object.keys(this.delayedEventsMap)), _q = _p.next(); !_q.done; _q = _p.next()){
                var key = _q.value;
                this.clock.clearTimeout(this.delayedEventsMap[key]);
            }
        } catch (e_10_1) {
            e_10 = {
                error: e_10_1
            };
        } finally{
            try {
                if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
            } finally{
                if (e_10) throw e_10.error;
            }
        }
        this.scheduler.clear();
        this.initialized = false;
        this.status = InterpreterStatus.Stopped;
        _registryJs.registry.free(this.sessionId);
        return this;
    };
    Interpreter1.prototype.batch = function(events) {
        var _this = this;
        if (this.status === InterpreterStatus.NotStarted && this.options.deferEvents) // tslint:disable-next-line:no-console
        {
            if (!_environmentJs.IS_PRODUCTION) _utilsJs.warn(false, "".concat(events.length, " event(s) were sent to uninitialized service \"").concat(this.machine.id, "\" and are deferred. Make sure .start() is called for this service.\nEvent: ").concat(JSON.stringify(event)));
        } else if (this.status !== InterpreterStatus.Running) throw new Error("".concat(events.length, " event(s) were sent to uninitialized service \"").concat(this.machine.id, "\". Make sure .start() is called for this service, or set { deferEvents: true } in the service options."));
        this.scheduler.schedule(function() {
            var e_12, _a;
            var nextState = _this.state;
            var batchChanged = false;
            var batchedActions = [];
            var _loop_1 = function(event_1) {
                var _event = _utilsJs.toSCXMLEvent(event_1);
                _this.forward(_event);
                nextState = _serviceScopeJs.provide(_this, function() {
                    return _this.machine.transition(nextState, _event);
                });
                batchedActions.push.apply(batchedActions, _tslibJs.__spreadArray([], _tslibJs.__read(nextState.actions.map(function(a) {
                    return _stateJs.bindActionToState(a, nextState);
                })), false));
                batchChanged = batchChanged || !!nextState.changed;
            };
            try {
                for(var events_1 = _tslibJs.__values(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()){
                    var event_11 = events_1_1.value;
                    _loop_1(event_11);
                }
            } catch (e_12_1) {
                e_12 = {
                    error: e_12_1
                };
            } finally{
                try {
                    if (events_1_1 && !events_1_1.done && (_a = events_1.return)) _a.call(events_1);
                } finally{
                    if (e_12) throw e_12.error;
                }
            }
            nextState.changed = batchChanged;
            nextState.actions = batchedActions;
            _this.update(nextState, _utilsJs.toSCXMLEvent(events[events.length - 1]));
        });
    };
    /**
   * Returns a send function bound to this interpreter instance.
   *
   * @param event The event to be sent by the sender.
   */ Interpreter1.prototype.sender = function(event) {
        return this.send.bind(this, event);
    };
    /**
   * Returns the next state given the interpreter's current state and the event.
   *
   * This is a pure method that does _not_ update the interpreter's state.
   *
   * @param event The event to determine the next state
   */ Interpreter1.prototype.nextState = function(event) {
        var _this = this;
        var _event = _utilsJs.toSCXMLEvent(event);
        if (_event.name.indexOf(_actionTypesJs.errorPlatform) === 0 && !this.state.nextEvents.some(function(nextEvent) {
            return nextEvent.indexOf(_actionTypesJs.errorPlatform) === 0;
        })) throw _event.data.data;
        var nextState = _serviceScopeJs.provide(this, function() {
            return _this.machine.transition(_this.state, _event);
        });
        return nextState;
    };
    Interpreter1.prototype.forward = function(event) {
        var e_13, _a;
        try {
            for(var _b = _tslibJs.__values(this.forwardTo), _c = _b.next(); !_c.done; _c = _b.next()){
                var id = _c.value;
                var child = this.children.get(id);
                if (!child) throw new Error("Unable to forward event '".concat(event, "' from interpreter '").concat(this.id, "' to nonexistant child '").concat(id, "'."));
                child.send(event);
            }
        } catch (e_13_1) {
            e_13 = {
                error: e_13_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_13) throw e_13.error;
            }
        }
    };
    Interpreter1.prototype.defer = function(sendAction) {
        var _this = this;
        this.delayedEventsMap[sendAction.id] = this.clock.setTimeout(function() {
            if (sendAction.to) _this.sendTo(sendAction._event, sendAction.to);
            else _this.send(sendAction._event);
        }, sendAction.delay);
    };
    Interpreter1.prototype.cancel = function(sendId) {
        this.clock.clearTimeout(this.delayedEventsMap[sendId]);
        delete this.delayedEventsMap[sendId];
    };
    Interpreter1.prototype.exec = function(action, state, actionFunctionMap) {
        if (actionFunctionMap === void 0) actionFunctionMap = this.machine.options.actions;
        var context = state.context, _event = state._event;
        var actionOrExec = action.exec || _actionsJs.getActionFunction(action.type, actionFunctionMap);
        var exec = _utilsJs.isFunction(actionOrExec) ? actionOrExec : actionOrExec ? actionOrExec.exec : action.exec;
        if (exec) try {
            return exec(context, _event.data, {
                action: action,
                state: this.state,
                _event: _event
            });
        } catch (err) {
            if (this.parent) this.parent.send({
                type: 'xstate.error',
                data: err
            });
            throw err;
        }
        switch(action.type){
            case _actionTypesJs.send:
                var sendAction = action;
                if (typeof sendAction.delay === 'number') {
                    this.defer(sendAction);
                    return;
                } else if (sendAction.to) this.sendTo(sendAction._event, sendAction.to);
                else this.send(sendAction._event);
                break;
            case _actionTypesJs.cancel:
                this.cancel(action.sendId);
                break;
            case _actionTypesJs.start:
                if (this.status !== InterpreterStatus.Running) return;
                var activity = action.activity; // If the activity will be stopped right after it's started
                // (such as in transient states)
                // don't bother starting the activity.
                if (!this.state.activities[activity.id || activity.type]) break;
                 // Invoked services
                if (activity.type === _typesJs.ActionTypes.Invoke) {
                    var invokeSource = _utilsJs.toInvokeSource(activity.src);
                    var serviceCreator = this.machine.options.services ? this.machine.options.services[invokeSource.type] : undefined;
                    var id = activity.id, data = activity.data;
                    if (!_environmentJs.IS_PRODUCTION) _utilsJs.warn(!('forward' in activity), "`forward` property is deprecated (found in invocation of '".concat(activity.src, "' in in machine '").concat(this.machine.id, "'). ") + "Please use `autoForward` instead.");
                    var autoForward = 'autoForward' in activity ? activity.autoForward : !!activity.forward;
                    if (!serviceCreator) {
                        // tslint:disable-next-line:no-console
                        if (!_environmentJs.IS_PRODUCTION) _utilsJs.warn(false, "No service found for invocation '".concat(activity.src, "' in machine '").concat(this.machine.id, "'."));
                        return;
                    }
                    var resolvedData = data ? _utilsJs.mapContext(data, context, _event) : undefined;
                    if (typeof serviceCreator === 'string') // TODO: warn
                    return;
                    var source = _utilsJs.isFunction(serviceCreator) ? serviceCreator(context, _event.data, {
                        data: resolvedData,
                        src: invokeSource,
                        meta: activity.meta
                    }) : serviceCreator;
                    if (!source) // TODO: warn?
                    return;
                    var options = void 0;
                    if (_utilsJs.isMachine(source)) {
                        source = resolvedData ? source.withContext(resolvedData) : source;
                        options = {
                            autoForward: autoForward
                        };
                    }
                    this.spawn(source, id, options);
                } else this.spawnActivity(activity);
                break;
            case _actionTypesJs.stop:
                this.stopChild(action.activity.id);
                break;
            case _actionTypesJs.log:
                var label = action.label, value = action.value;
                if (label) this.logger(label, value);
                else this.logger(value);
                break;
            default:
                if (!_environmentJs.IS_PRODUCTION) _utilsJs.warn(false, "No implementation found for action type '".concat(action.type, "'"));
                break;
        }
        return undefined;
    };
    Interpreter1.prototype.removeChild = function(childId) {
        var _a;
        this.children.delete(childId);
        this.forwardTo.delete(childId); // this.state might not exist at the time this is called,
        // such as when a child is added then removed while initializing the state
        (_a = this.state) === null || _a === void 0 || delete _a.children[childId];
    };
    Interpreter1.prototype.stopChild = function(childId) {
        var child = this.children.get(childId);
        if (!child) return;
        this.removeChild(childId);
        if (_utilsJs.isFunction(child.stop)) child.stop();
    };
    Interpreter1.prototype.spawn = function(entity, name, options) {
        if (_utilsJs.isPromiseLike(entity)) return this.spawnPromise(Promise.resolve(entity), name);
        else if (_utilsJs.isFunction(entity)) return this.spawnCallback(entity, name);
        else if (_actorJs.isSpawnedActor(entity)) return this.spawnActor(entity, name);
        else if (_utilsJs.isObservable(entity)) return this.spawnObservable(entity, name);
        else if (_utilsJs.isMachine(entity)) return this.spawnMachine(entity, _tslibJs.__assign(_tslibJs.__assign({
        }, options), {
            id: name
        }));
        else if (_utilsJs.isBehavior(entity)) return this.spawnBehavior(entity, name);
        else throw new Error("Unable to spawn entity \"".concat(name, "\" of type \"").concat(typeof entity, "\"."));
    };
    Interpreter1.prototype.spawnMachine = function(machine, options) {
        var _this = this;
        if (options === void 0) options = {
        };
        var childService = new Interpreter1(machine, _tslibJs.__assign(_tslibJs.__assign({
        }, this.options), {
            parent: this,
            id: options.id || machine.id
        }));
        var resolvedOptions = _tslibJs.__assign(_tslibJs.__assign({
        }, DEFAULT_SPAWN_OPTIONS), options);
        if (resolvedOptions.sync) childService.onTransition(function(state) {
            _this.send(_actionTypesJs.update, {
                state: state,
                id: childService.id
            });
        });
        var actor = childService;
        this.children.set(childService.id, actor);
        if (resolvedOptions.autoForward) this.forwardTo.add(childService.id);
        childService.onDone(function(doneEvent) {
            _this.removeChild(childService.id);
            _this.send(_utilsJs.toSCXMLEvent(doneEvent, {
                origin: childService.id
            }));
        }).start();
        return actor;
    };
    Interpreter1.prototype.spawnBehavior = function(behavior, id) {
        var actorRef = _behaviorsJs.spawnBehavior(behavior, {
            id: id,
            parent: this
        });
        this.children.set(id, actorRef);
        return actorRef;
    };
    Interpreter1.prototype.spawnPromise = function(promise, id) {
        var _a;
        var _this = this;
        var canceled = false;
        var resolvedData;
        promise.then(function(response) {
            if (!canceled) {
                resolvedData = response;
                _this.removeChild(id);
                _this.send(_utilsJs.toSCXMLEvent(_actionsJs.doneInvoke(id, response), {
                    origin: id
                }));
            }
        }, function(errorData) {
            if (!canceled) {
                _this.removeChild(id);
                var errorEvent = _actionsJs.error(id, errorData);
                try {
                    // Send "error.platform.id" to this (parent).
                    _this.send(_utilsJs.toSCXMLEvent(errorEvent, {
                        origin: id
                    }));
                } catch (error) {
                    _utilsJs.reportUnhandledExceptionOnInvocation(errorData, error, id);
                    if (_this.devTools) _this.devTools.send(errorEvent, _this.state);
                    if (_this.machine.strict) // it would be better to always stop the state machine if unhandled
                    // exception/promise rejection happens but because we don't want to
                    // break existing code so enforce it on strict mode only especially so
                    // because documentation says that onError is optional
                    _this.stop();
                }
            }
        });
        var actor = (_a = {
            id: id,
            send: function() {
                return void 0;
            },
            subscribe: function(next, handleError, complete) {
                var observer = _utilsJs.toObserver(next, handleError, complete);
                var unsubscribed = false;
                promise.then(function(response) {
                    if (unsubscribed) return;
                    observer.next(response);
                    if (unsubscribed) return;
                    observer.complete();
                }, function(err) {
                    if (unsubscribed) return;
                    observer.error(err);
                });
                return {
                    unsubscribe: function() {
                        return unsubscribed = true;
                    }
                };
            },
            stop: function() {
                canceled = true;
            },
            toJSON: function() {
                return {
                    id: id
                };
            },
            getSnapshot: function() {
                return resolvedData;
            }
        }, _a[_utilsJs.symbolObservable] = function() {
            return this;
        }, _a);
        this.children.set(id, actor);
        return actor;
    };
    Interpreter1.prototype.spawnCallback = function(callback, id) {
        var _a;
        var _this = this;
        var canceled = false;
        var receivers = new Set();
        var listeners = new Set();
        var emitted;
        var receive = function(e) {
            emitted = e;
            listeners.forEach(function(listener) {
                return listener(e);
            });
            if (canceled) return;
            _this.send(_utilsJs.toSCXMLEvent(e, {
                origin: id
            }));
        };
        var callbackStop;
        try {
            callbackStop = callback(receive, function(newListener) {
                receivers.add(newListener);
            });
        } catch (err) {
            this.send(_actionsJs.error(id, err));
        }
        if (_utilsJs.isPromiseLike(callbackStop)) // it turned out to be an async function, can't reliably check this before calling `callback`
        // because transpiled async functions are not recognizable
        return this.spawnPromise(callbackStop, id);
        var actor = (_a = {
            id: id,
            send: function(event) {
                return receivers.forEach(function(receiver) {
                    return receiver(event);
                });
            },
            subscribe: function(next) {
                var observer = _utilsJs.toObserver(next);
                listeners.add(observer.next);
                return {
                    unsubscribe: function() {
                        listeners.delete(observer.next);
                    }
                };
            },
            stop: function() {
                canceled = true;
                if (_utilsJs.isFunction(callbackStop)) callbackStop();
            },
            toJSON: function() {
                return {
                    id: id
                };
            },
            getSnapshot: function() {
                return emitted;
            }
        }, _a[_utilsJs.symbolObservable] = function() {
            return this;
        }, _a);
        this.children.set(id, actor);
        return actor;
    };
    Interpreter1.prototype.spawnObservable = function(source, id) {
        var _a;
        var _this = this;
        var emitted;
        var subscription = source.subscribe(function(value) {
            emitted = value;
            _this.send(_utilsJs.toSCXMLEvent(value, {
                origin: id
            }));
        }, function(err) {
            _this.removeChild(id);
            _this.send(_utilsJs.toSCXMLEvent(_actionsJs.error(id, err), {
                origin: id
            }));
        }, function() {
            _this.removeChild(id);
            _this.send(_utilsJs.toSCXMLEvent(_actionsJs.doneInvoke(id), {
                origin: id
            }));
        });
        var actor = (_a = {
            id: id,
            send: function() {
                return void 0;
            },
            subscribe: function(next, handleError, complete) {
                return source.subscribe(next, handleError, complete);
            },
            stop: function() {
                return subscription.unsubscribe();
            },
            getSnapshot: function() {
                return emitted;
            },
            toJSON: function() {
                return {
                    id: id
                };
            }
        }, _a[_utilsJs.symbolObservable] = function() {
            return this;
        }, _a);
        this.children.set(id, actor);
        return actor;
    };
    Interpreter1.prototype.spawnActor = function(actor, name) {
        this.children.set(name, actor);
        return actor;
    };
    Interpreter1.prototype.spawnActivity = function(activity) {
        var implementation = this.machine.options && this.machine.options.activities ? this.machine.options.activities[activity.type] : undefined;
        if (!implementation) {
            if (!_environmentJs.IS_PRODUCTION) _utilsJs.warn(false, "No implementation found for activity '".concat(activity.type, "'"));
             // tslint:disable-next-line:no-console
            return;
        } // Start implementation
        var dispose = implementation(this.state.context, activity);
        this.spawnEffect(activity.id, dispose);
    };
    Interpreter1.prototype.spawnEffect = function(id, dispose) {
        var _a;
        this.children.set(id, (_a = {
            id: id,
            send: function() {
                return void 0;
            },
            subscribe: function() {
                return {
                    unsubscribe: function() {
                        return void 0;
                    }
                };
            },
            stop: dispose || undefined,
            getSnapshot: function() {
                return undefined;
            },
            toJSON: function() {
                return {
                    id: id
                };
            }
        }, _a[_utilsJs.symbolObservable] = function() {
            return this;
        }, _a));
    };
    Interpreter1.prototype.attachDev = function() {
        var global = _devToolsJs.getGlobal();
        if (this.options.devTools && global) {
            if (global.__REDUX_DEVTOOLS_EXTENSION__) {
                var devToolsOptions = typeof this.options.devTools === 'object' ? this.options.devTools : undefined;
                this.devTools = global.__REDUX_DEVTOOLS_EXTENSION__.connect(_tslibJs.__assign(_tslibJs.__assign({
                    name: this.id,
                    autoPause: true,
                    stateSanitizer: function(state) {
                        return {
                            value: state.value,
                            context: state.context,
                            actions: state.actions
                        };
                    }
                }, devToolsOptions), {
                    features: _tslibJs.__assign({
                        jump: false,
                        skip: false
                    }, devToolsOptions ? devToolsOptions.features : undefined)
                }), this.machine);
                this.devTools.init(this.state);
            } // add XState-specific dev tooling hook
            _devToolsJs.registerService(this);
        }
    };
    Interpreter1.prototype.toJSON = function() {
        return {
            id: this.id
        };
    };
    Interpreter1.prototype[_utilsJs.symbolObservable] = function() {
        return this;
    };
    Interpreter1.prototype.getSnapshot = function() {
        if (this.status === InterpreterStatus.NotStarted) return this.initialState;
        return this._state;
    };
    /**
   * The default interpreter options:
   *
   * - `clock` uses the global `setTimeout` and `clearTimeout` functions
   * - `logger` uses the global `console.log()` method
   */ Interpreter1.defaultOptions = {
        execute: true,
        deferEvents: true,
        clock: {
            setTimeout: function(fn, ms) {
                return setTimeout(fn, ms);
            },
            clearTimeout: function(id) {
                return clearTimeout(id);
            }
        },
        logger: /*#__PURE__*/ console.log.bind(console),
        devTools: false
    };
    Interpreter1.interpret = interpret;
    return Interpreter1;
}();
var resolveSpawnOptions = function(nameOrOptions) {
    if (_utilsJs.isString(nameOrOptions)) return _tslibJs.__assign(_tslibJs.__assign({
    }, DEFAULT_SPAWN_OPTIONS), {
        name: nameOrOptions
    });
    return _tslibJs.__assign(_tslibJs.__assign(_tslibJs.__assign({
    }, DEFAULT_SPAWN_OPTIONS), {
        name: _utilsJs.uniqueId()
    }), nameOrOptions);
};
function spawn(entity, nameOrOptions) {
    var resolvedOptions = resolveSpawnOptions(nameOrOptions);
    return _serviceScopeJs.consume(function(service) {
        if (!_environmentJs.IS_PRODUCTION) {
            var isLazyEntity = _utilsJs.isMachine(entity) || _utilsJs.isFunction(entity);
            _utilsJs.warn(!!service || isLazyEntity, "Attempted to spawn an Actor (ID: \"".concat(_utilsJs.isMachine(entity) ? entity.id : 'undefined', "\") outside of a service. This will have no effect."));
        }
        if (service) return service.spawn(entity, resolvedOptions.name, resolvedOptions);
        else return _actorJs.createDeferredActor(entity, resolvedOptions.name);
    });
}
/**
 * Creates a new Interpreter instance for the given machine with the provided options, if any.
 *
 * @param machine The machine to interpret
 * @param options Interpreter options
 */ function interpret(machine, options) {
    var interpreter = new Interpreter(machine, options);
    return interpreter;
}

},{"./_virtual/_tslib.js":"4So72","./types.js":"5mTTI","./State.js":"h85Z6","./actionTypes.js":"2WTWb","./actions.js":"fKWcO","./environment.js":"fNNF6","./utils.js":"5Ce8y","./scheduler.js":"gUstx","./Actor.js":"itCIE","./stateUtils.js":"1Q0v5","./registry.js":"dKYy9","./devTools.js":"iAAuP","./serviceScope.js":"jT5rp","./behaviors.js":"7RjKM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h85Z6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "State", ()=>State
);
parcelHelpers.export(exports, "bindActionToState", ()=>bindActionToState
);
parcelHelpers.export(exports, "isState", ()=>isState
);
parcelHelpers.export(exports, "isStateConfig", ()=>isStateConfig
);
parcelHelpers.export(exports, "stateValuesEqual", ()=>stateValuesEqual
);
var _tslibJs = require("./_virtual/_tslib.js");
var _constantsJs = require("./constants.js");
var _utilsJs = require("./utils.js");
var _stateUtilsJs = require("./stateUtils.js");
var _actionsJs = require("./actions.js");
var _environmentJs = require("./environment.js");
function stateValuesEqual(a, b) {
    if (a === b) return true;
    if (a === undefined || b === undefined) return false;
    if (_utilsJs.isString(a) || _utilsJs.isString(b)) return a === b;
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    return aKeys.length === bKeys.length && aKeys.every(function(key) {
        return stateValuesEqual(a[key], b[key]);
    });
}
function isStateConfig(state) {
    if (typeof state !== 'object' || state === null) return false;
    return 'value' in state && '_event' in state;
}
/**
 * @deprecated Use `isStateConfig(object)` or `state instanceof State` instead.
 */ var isState = isStateConfig;
function bindActionToState(action, state) {
    var exec = action.exec;
    var boundAction = _tslibJs.__assign(_tslibJs.__assign({
    }, action), {
        exec: exec !== undefined ? function() {
            return exec(state.context, state.event, {
                action: action,
                state: state,
                _event: state._event
            });
        } : undefined
    });
    return boundAction;
}
var State = /*#__PURE__*/ /** @class */ function() {
    /**
   * Creates a new State instance.
   * @param value The state value
   * @param context The extended state
   * @param historyValue The tree representing historical values of the state nodes
   * @param history The previous state
   * @param actions An array of action objects to execute as side-effects
   * @param activities A mapping of activities and whether they are started (`true`) or stopped (`false`).
   * @param meta
   * @param events Internal event queue. Should be empty with run-to-completion semantics.
   * @param configuration
   */ function State1(config) {
        var _this = this;
        var _a;
        this.actions = [];
        this.activities = _constantsJs.EMPTY_ACTIVITY_MAP;
        this.meta = {
        };
        this.events = [];
        this.value = config.value;
        this.context = config.context;
        this._event = config._event;
        this._sessionid = config._sessionid;
        this.event = this._event.data;
        this.historyValue = config.historyValue;
        this.history = config.history;
        this.actions = config.actions || [];
        this.activities = config.activities || _constantsJs.EMPTY_ACTIVITY_MAP;
        this.meta = _stateUtilsJs.getMeta(config.configuration);
        this.events = config.events || [];
        this.matches = this.matches.bind(this);
        this.toStrings = this.toStrings.bind(this);
        this.configuration = config.configuration;
        this.transitions = config.transitions;
        this.children = config.children;
        this.done = !!config.done;
        this.tags = (_a = Array.isArray(config.tags) ? new Set(config.tags) : config.tags) !== null && _a !== void 0 ? _a : new Set();
        this.machine = config.machine;
        Object.defineProperty(this, 'nextEvents', {
            get: function() {
                return _stateUtilsJs.nextEvents(_this.configuration);
            }
        });
    }
    /**
   * Creates a new State instance for the given `stateValue` and `context`.
   * @param stateValue
   * @param context
   */ State1.from = function(stateValue, context) {
        if (stateValue instanceof State1) {
            if (stateValue.context !== context) return new State1({
                value: stateValue.value,
                context: context,
                _event: stateValue._event,
                _sessionid: null,
                historyValue: stateValue.historyValue,
                history: stateValue.history,
                actions: [],
                activities: stateValue.activities,
                meta: {
                },
                events: [],
                configuration: [],
                transitions: [],
                children: {
                }
            });
            return stateValue;
        }
        var _event = _actionsJs.initEvent;
        return new State1({
            value: stateValue,
            context: context,
            _event: _event,
            _sessionid: null,
            historyValue: undefined,
            history: undefined,
            actions: [],
            activities: undefined,
            meta: undefined,
            events: [],
            configuration: [],
            transitions: [],
            children: {
            }
        });
    };
    /**
   * Creates a new State instance for the given `config`.
   * @param config The state config
   */ State1.create = function(config) {
        return new State1(config);
    };
    /**
   * Creates a new `State` instance for the given `stateValue` and `context` with no actions (side-effects).
   * @param stateValue
   * @param context
   */ State1.inert = function(stateValue, context) {
        if (stateValue instanceof State1) {
            if (!stateValue.actions.length) return stateValue;
            var _event = _actionsJs.initEvent;
            return new State1({
                value: stateValue.value,
                context: context,
                _event: _event,
                _sessionid: null,
                historyValue: stateValue.historyValue,
                history: stateValue.history,
                activities: stateValue.activities,
                configuration: stateValue.configuration,
                transitions: [],
                children: {
                }
            });
        }
        return State1.from(stateValue, context);
    };
    /**
   * Returns an array of all the string leaf state node paths.
   * @param stateValue
   * @param delimiter The character(s) that separate each subpath in the string state node path.
   */ State1.prototype.toStrings = function(stateValue, delimiter) {
        var _this = this;
        if (stateValue === void 0) stateValue = this.value;
        if (delimiter === void 0) delimiter = '.';
        if (_utilsJs.isString(stateValue)) return [
            stateValue
        ];
        var valueKeys = Object.keys(stateValue);
        return valueKeys.concat.apply(valueKeys, _tslibJs.__spreadArray([], _tslibJs.__read(valueKeys.map(function(key) {
            return _this.toStrings(stateValue[key], delimiter).map(function(s) {
                return key + delimiter + s;
            });
        })), false));
    };
    State1.prototype.toJSON = function() {
        var _a = this;
        _a.configuration;
        _a.transitions;
        var tags = _a.tags;
        _a.machine;
        var jsonValues = _tslibJs.__rest(_a, [
            "configuration",
            "transitions",
            "tags",
            "machine"
        ]);
        return _tslibJs.__assign(_tslibJs.__assign({
        }, jsonValues), {
            tags: Array.from(tags)
        });
    };
    State1.prototype.matches = function(parentStateValue) {
        return _utilsJs.matchesState(parentStateValue, this.value);
    };
    /**
   * Whether the current state configuration has a state node with the specified `tag`.
   * @param tag
   */ State1.prototype.hasTag = function(tag) {
        return this.tags.has(tag);
    };
    /**
   * Determines whether sending the `event` will cause a non-forbidden transition
   * to be selected, even if the transitions have no actions nor
   * change the state value.
   *
   * @param event The event to test
   * @returns Whether the event will cause a transition
   */ State1.prototype.can = function(event) {
        var _a;
        if (_environmentJs.IS_PRODUCTION) _utilsJs.warn(!!this.machine, "state.can(...) used outside of a machine-created State object; this will always return false.");
        var transitionData = (_a = this.machine) === null || _a === void 0 ? void 0 : _a.getTransitionData(this, event);
        return !!(transitionData === null || transitionData === void 0 ? void 0 : transitionData.transitions.length) && transitionData.transitions.some(function(t) {
            return t.target !== undefined || t.actions.length;
        });
    };
    return State1;
}();

},{"./_virtual/_tslib.js":"4So72","./constants.js":"lmFH5","./utils.js":"5Ce8y","./stateUtils.js":"1Q0v5","./actions.js":"fKWcO","./environment.js":"fNNF6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1Q0v5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getAdjList", ()=>getAdjList
);
parcelHelpers.export(exports, "getAllStateNodes", ()=>getAllStateNodes
);
parcelHelpers.export(exports, "getChildren", ()=>getChildren
);
parcelHelpers.export(exports, "getConfiguration", ()=>getConfiguration
);
parcelHelpers.export(exports, "getMeta", ()=>getMeta
);
parcelHelpers.export(exports, "getTagsFromConfiguration", ()=>getTagsFromConfiguration
);
parcelHelpers.export(exports, "getValue", ()=>getValue
);
parcelHelpers.export(exports, "has", ()=>has
);
parcelHelpers.export(exports, "isInFinalState", ()=>isInFinalState
);
parcelHelpers.export(exports, "isLeafNode", ()=>isLeafNode
);
parcelHelpers.export(exports, "nextEvents", ()=>nextEvents
);
var _tslibJs = require("./_virtual/_tslib.js");
var _utilsJs = require("./utils.js");
var isLeafNode = function(stateNode) {
    return stateNode.type === 'atomic' || stateNode.type === 'final';
};
function getChildren(stateNode) {
    return Object.keys(stateNode.states).map(function(key) {
        return stateNode.states[key];
    });
}
function getAllStateNodes(stateNode) {
    var stateNodes = [
        stateNode
    ];
    if (isLeafNode(stateNode)) return stateNodes;
    return stateNodes.concat(_utilsJs.flatten(getChildren(stateNode).map(getAllStateNodes)));
}
function getConfiguration(prevStateNodes, stateNodes) {
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
    var prevConfiguration = new Set(prevStateNodes);
    var prevAdjList = getAdjList(prevConfiguration);
    var configuration = new Set(stateNodes);
    try {
        // add all ancestors
        for(var configuration_1 = _tslibJs.__values(configuration), configuration_1_1 = configuration_1.next(); !configuration_1_1.done; configuration_1_1 = configuration_1.next()){
            var s = configuration_1_1.value;
            var m = s.parent;
            while(m && !configuration.has(m)){
                configuration.add(m);
                m = m.parent;
            }
        }
    } catch (e_1_1) {
        e_1 = {
            error: e_1_1
        };
    } finally{
        try {
            if (configuration_1_1 && !configuration_1_1.done && (_a = configuration_1.return)) _a.call(configuration_1);
        } finally{
            if (e_1) throw e_1.error;
        }
    }
    var adjList = getAdjList(configuration);
    try {
        // add descendants
        for(var configuration_2 = _tslibJs.__values(configuration), configuration_2_1 = configuration_2.next(); !configuration_2_1.done; configuration_2_1 = configuration_2.next()){
            var s = configuration_2_1.value; // if previously active, add existing child nodes
            if (s.type === 'compound' && (!adjList.get(s) || !adjList.get(s).length)) {
                if (prevAdjList.get(s)) prevAdjList.get(s).forEach(function(sn) {
                    return configuration.add(sn);
                });
                else s.initialStateNodes.forEach(function(sn) {
                    return configuration.add(sn);
                });
            } else {
                if (s.type === 'parallel') try {
                    for(var _e = (e_3 = void 0, _tslibJs.__values(getChildren(s))), _f = _e.next(); !_f.done; _f = _e.next()){
                        var child = _f.value;
                        if (child.type === 'history') continue;
                        if (!configuration.has(child)) {
                            configuration.add(child);
                            if (prevAdjList.get(child)) prevAdjList.get(child).forEach(function(sn) {
                                return configuration.add(sn);
                            });
                            else child.initialStateNodes.forEach(function(sn) {
                                return configuration.add(sn);
                            });
                        }
                    }
                } catch (e_3_1) {
                    e_3 = {
                        error: e_3_1
                    };
                } finally{
                    try {
                        if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
                    } finally{
                        if (e_3) throw e_3.error;
                    }
                }
            }
        }
    } catch (e_2_1) {
        e_2 = {
            error: e_2_1
        };
    } finally{
        try {
            if (configuration_2_1 && !configuration_2_1.done && (_b = configuration_2.return)) _b.call(configuration_2);
        } finally{
            if (e_2) throw e_2.error;
        }
    }
    try {
        // add all ancestors
        for(var configuration_3 = _tslibJs.__values(configuration), configuration_3_1 = configuration_3.next(); !configuration_3_1.done; configuration_3_1 = configuration_3.next()){
            var s = configuration_3_1.value;
            var m = s.parent;
            while(m && !configuration.has(m)){
                configuration.add(m);
                m = m.parent;
            }
        }
    } catch (e_4_1) {
        e_4 = {
            error: e_4_1
        };
    } finally{
        try {
            if (configuration_3_1 && !configuration_3_1.done && (_d = configuration_3.return)) _d.call(configuration_3);
        } finally{
            if (e_4) throw e_4.error;
        }
    }
    return configuration;
}
function getValueFromAdj(baseNode, adjList) {
    var childStateNodes = adjList.get(baseNode);
    if (!childStateNodes) return {
    }; // todo: fix?
    if (baseNode.type === 'compound') {
        var childStateNode = childStateNodes[0];
        if (childStateNode) {
            if (isLeafNode(childStateNode)) return childStateNode.key;
        } else return {
        };
    }
    var stateValue = {
    };
    childStateNodes.forEach(function(csn) {
        stateValue[csn.key] = getValueFromAdj(csn, adjList);
    });
    return stateValue;
}
function getAdjList(configuration) {
    var e_5, _a;
    var adjList = new Map();
    try {
        for(var configuration_4 = _tslibJs.__values(configuration), configuration_4_1 = configuration_4.next(); !configuration_4_1.done; configuration_4_1 = configuration_4.next()){
            var s = configuration_4_1.value;
            if (!adjList.has(s)) adjList.set(s, []);
            if (s.parent) {
                if (!adjList.has(s.parent)) adjList.set(s.parent, []);
                adjList.get(s.parent).push(s);
            }
        }
    } catch (e_5_1) {
        e_5 = {
            error: e_5_1
        };
    } finally{
        try {
            if (configuration_4_1 && !configuration_4_1.done && (_a = configuration_4.return)) _a.call(configuration_4);
        } finally{
            if (e_5) throw e_5.error;
        }
    }
    return adjList;
}
function getValue(rootNode, configuration) {
    var config = getConfiguration([
        rootNode
    ], configuration);
    return getValueFromAdj(rootNode, getAdjList(config));
}
function has(iterable, item) {
    if (Array.isArray(iterable)) return iterable.some(function(member) {
        return member === item;
    });
    if (iterable instanceof Set) return iterable.has(item);
    return false; // TODO: fix
}
function nextEvents(configuration) {
    return _tslibJs.__spreadArray([], _tslibJs.__read(new Set(_utilsJs.flatten(_tslibJs.__spreadArray([], _tslibJs.__read(configuration.map(function(sn) {
        return sn.ownEvents;
    })), false)))), false);
}
function isInFinalState(configuration, stateNode) {
    if (stateNode.type === 'compound') return getChildren(stateNode).some(function(s) {
        return s.type === 'final' && has(configuration, s);
    });
    if (stateNode.type === 'parallel') return getChildren(stateNode).every(function(sn) {
        return isInFinalState(configuration, sn);
    });
    return false;
}
function getMeta(configuration) {
    if (configuration === void 0) configuration = [];
    return configuration.reduce(function(acc, stateNode) {
        if (stateNode.meta !== undefined) acc[stateNode.id] = stateNode.meta;
        return acc;
    }, {
    });
}
function getTagsFromConfiguration(configuration) {
    return new Set(_utilsJs.flatten(configuration.map(function(sn) {
        return sn.tags;
    })));
}

},{"./_virtual/_tslib.js":"4So72","./utils.js":"5Ce8y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gUstx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Scheduler", ()=>Scheduler
);
var _tslibJs = require("./_virtual/_tslib.js");
var defaultOptions = {
    deferEvents: false
};
var Scheduler = /*#__PURE__*/ /** @class */ function() {
    function Scheduler1(options) {
        this.processingEvent = false;
        this.queue = [];
        this.initialized = false;
        this.options = _tslibJs.__assign(_tslibJs.__assign({
        }, defaultOptions), options);
    }
    Scheduler1.prototype.initialize = function(callback) {
        this.initialized = true;
        if (callback) {
            if (!this.options.deferEvents) {
                this.schedule(callback);
                return;
            }
            this.process(callback);
        }
        this.flushEvents();
    };
    Scheduler1.prototype.schedule = function(task) {
        if (!this.initialized || this.processingEvent) {
            this.queue.push(task);
            return;
        }
        if (this.queue.length !== 0) throw new Error('Event queue should be empty when it is not processing events');
        this.process(task);
        this.flushEvents();
    };
    Scheduler1.prototype.clear = function() {
        this.queue = [];
    };
    Scheduler1.prototype.flushEvents = function() {
        var nextCallback = this.queue.shift();
        while(nextCallback){
            this.process(nextCallback);
            nextCallback = this.queue.shift();
        }
    };
    Scheduler1.prototype.process = function(callback) {
        this.processingEvent = true;
        try {
            callback();
        } catch (e) {
            // there is no use to keep the future events
            // as the situation is not anymore the same
            this.clear();
            throw e;
        } finally{
            this.processingEvent = false;
        }
    };
    return Scheduler1;
}();

},{"./_virtual/_tslib.js":"4So72","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dKYy9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "registry", ()=>registry
);
var children = /*#__PURE__*/ new Map();
var sessionIdIndex = 0;
var registry = {
    bookId: function() {
        return "x:".concat(sessionIdIndex++);
    },
    register: function(id, actor) {
        children.set(id, actor);
        return id;
    },
    get: function(id) {
        return children.get(id);
    },
    free: function(id) {
        children.delete(id);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iAAuP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getGlobal", ()=>getGlobal
);
parcelHelpers.export(exports, "registerService", ()=>registerService
);
var _environmentJs = require("./environment.js");
var global = arguments[3];
function getGlobal() {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof self !== 'undefined') return self;
    if (typeof window !== 'undefined') return window;
    if (typeof global !== 'undefined') return global;
    if (!_environmentJs.IS_PRODUCTION) console.warn('XState could not find a global object in this environment. Please let the maintainers know and raise an issue here: https://github.com/statelyai/xstate/issues');
}
function getDevTools() {
    var global1 = getGlobal();
    if (global1 && '__xstate__' in global1) return global1.__xstate__;
    return undefined;
}
function registerService(service) {
    if (!getGlobal()) return;
    var devTools = getDevTools();
    if (devTools) devTools.register(service);
}

},{"./environment.js":"fNNF6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7RjKM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "fromPromise", ()=>fromPromise
);
parcelHelpers.export(exports, "fromReducer", ()=>fromReducer
);
parcelHelpers.export(exports, "spawnBehavior", ()=>spawnBehavior
);
var _actionsJs = require("./actions.js");
var _actorJs = require("./Actor.js");
var _utilsJs = require("./utils.js");
/**
 * Returns an actor behavior from a reducer and its initial state.
 *
 * @param transition The pure reducer that returns the next state given the current state and event.
 * @param initialState The initial state of the reducer.
 * @returns An actor behavior
 */ function fromReducer(transition, initialState) {
    return {
        transition: transition,
        initialState: initialState
    };
}
function fromPromise(promiseFn) {
    var initialState = {
        error: undefined,
        data: undefined,
        status: 'pending'
    };
    return {
        transition: function(state, event, _a) {
            var parent = _a.parent, id = _a.id, observers = _a.observers;
            switch(event.type){
                case 'fulfill':
                    parent === null || parent === void 0 || parent.send(_actionsJs.doneInvoke(id, event.data));
                    return {
                        error: undefined,
                        data: event.data,
                        status: 'fulfilled'
                    };
                case 'reject':
                    parent === null || parent === void 0 || parent.send(_actionsJs.error(id, event.error));
                    observers.forEach(function(observer) {
                        observer.error(event.error);
                    });
                    return {
                        error: event.error,
                        data: undefined,
                        status: 'rejected'
                    };
                default:
                    return state;
            }
        },
        initialState: initialState,
        start: function(_a) {
            var self = _a.self;
            promiseFn().then(function(data) {
                self.send({
                    type: 'fulfill',
                    data: data
                });
            }, function(reason) {
                self.send({
                    type: 'reject',
                    error: reason
                });
            });
            return initialState;
        }
    };
}
function spawnBehavior(behavior, options) {
    if (options === void 0) options = {
    };
    var state = behavior.initialState;
    var observers = new Set();
    var mailbox = [];
    var flushing = false;
    var flush = function() {
        if (flushing) return;
        flushing = true;
        while(mailbox.length > 0){
            var event_1 = mailbox.shift();
            state = behavior.transition(state, event_1, actorCtx);
            observers.forEach(function(observer) {
                return observer.next(state);
            });
        }
        flushing = false;
    };
    var actor = _actorJs.toActorRef({
        id: options.id,
        send: function(event) {
            mailbox.push(event);
            flush();
        },
        getSnapshot: function() {
            return state;
        },
        subscribe: function(next, handleError, complete) {
            var observer = _utilsJs.toObserver(next, handleError, complete);
            observers.add(observer);
            observer.next(state);
            return {
                unsubscribe: function() {
                    observers.delete(observer);
                }
            };
        }
    });
    var actorCtx = {
        parent: options.parent,
        self: actor,
        id: options.id || 'anonymous',
        observers: observers
    };
    state = behavior.start ? behavior.start(actorCtx) : state;
    return actor;
}

},{"./actions.js":"fKWcO","./Actor.js":"itCIE","./utils.js":"5Ce8y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cVglJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Machine", ()=>Machine
);
parcelHelpers.export(exports, "createMachine", ()=>createMachine
);
var _stateNodeJs = require("./StateNode.js");
function Machine(config, options, initialContext) {
    if (initialContext === void 0) initialContext = config.context;
    return new _stateNodeJs.StateNode(config, options, initialContext);
}
function createMachine(config, options) {
    return new _stateNodeJs.StateNode(config, options);
}

},{"./StateNode.js":"jHv62","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jHv62":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StateNode", ()=>StateNode
);
var _tslibJs = require("./_virtual/_tslib.js");
var _utilsJs = require("./utils.js");
var _typesJs = require("./types.js");
var _stateJs = require("./State.js");
var _actionTypesJs = require("./actionTypes.js");
var _actionsJs = require("./actions.js");
var _environmentJs = require("./environment.js");
var _constantsJs = require("./constants.js");
var _stateUtilsJs = require("./stateUtils.js");
var _actorJs = require("./Actor.js");
var _invokeUtilsJs = require("./invokeUtils.js");
var NULL_EVENT = '';
var STATE_IDENTIFIER = '#';
var WILDCARD = '*';
var EMPTY_OBJECT = {
};
var isStateId = function(str) {
    return str[0] === STATE_IDENTIFIER;
};
var createDefaultOptions = function() {
    return {
        actions: {
        },
        guards: {
        },
        services: {
        },
        activities: {
        },
        delays: {
        }
    };
};
var validateArrayifiedTransitions = function(stateNode, event, transitions) {
    var hasNonLastUnguardedTarget = transitions.slice(0, -1).some(function(transition) {
        return !('cond' in transition) && !('in' in transition) && (_utilsJs.isString(transition.target) || _utilsJs.isMachine(transition.target));
    });
    var eventText = event === NULL_EVENT ? 'the transient event' : "event '".concat(event, "'");
    _utilsJs.warn(!hasNonLastUnguardedTarget, "One or more transitions for ".concat(eventText, " on state '").concat(stateNode.id, "' are unreachable. ") + "Make sure that the default transition is the last one defined.");
};
var StateNode = /*#__PURE__*/ /** @class */ function() {
    function StateNode1(/**
   * The raw config used to create the machine.
   */ config, options, /**
   * The initial extended state
   */ _context, _stateInfo) {
        var _this = this;
        if (_context === void 0) _context = 'context' in config ? config.context : undefined;
        var _a1;
        this.config = config;
        this._context = _context;
        /**
     * The order this state node appears. Corresponds to the implicit SCXML document order.
     */ this.order = -1;
        this.__xstatenode = true;
        this.__cache = {
            events: undefined,
            relativeValue: new Map(),
            initialStateValue: undefined,
            initialState: undefined,
            on: undefined,
            transitions: undefined,
            candidates: {
            },
            delayedTransitions: undefined
        };
        this.idMap = {
        };
        this.tags = [];
        this.options = Object.assign(createDefaultOptions(), options);
        this.parent = _stateInfo === null || _stateInfo === void 0 ? void 0 : _stateInfo.parent;
        this.key = this.config.key || (_stateInfo === null || _stateInfo === void 0 ? void 0 : _stateInfo.key) || this.config.id || '(machine)';
        this.machine = this.parent ? this.parent.machine : this;
        this.path = this.parent ? this.parent.path.concat(this.key) : [];
        this.delimiter = this.config.delimiter || (this.parent ? this.parent.delimiter : _constantsJs.STATE_DELIMITER);
        this.id = this.config.id || _tslibJs.__spreadArray([
            this.machine.key
        ], _tslibJs.__read(this.path), false).join(this.delimiter);
        this.version = this.parent ? this.parent.version : this.config.version;
        this.type = this.config.type || (this.config.parallel ? 'parallel' : this.config.states && Object.keys(this.config.states).length ? 'compound' : this.config.history ? 'history' : 'atomic');
        this.schema = this.parent ? this.machine.schema : (_a1 = this.config.schema) !== null && _a1 !== void 0 ? _a1 : {
        };
        this.description = this.config.description;
        if (!_environmentJs.IS_PRODUCTION) _utilsJs.warn(!('parallel' in this.config), "The \"parallel\" property is deprecated and will be removed in version 4.1. ".concat(this.config.parallel ? "Replace with `type: 'parallel'`" : "Use `type: '".concat(this.type, "'`"), " in the config for state node '").concat(this.id, "' instead."));
        this.initial = this.config.initial;
        this.states = this.config.states ? _utilsJs.mapValues(this.config.states, function(stateConfig, key) {
            var _a;
            var stateNode = new StateNode1(stateConfig, {
            }, undefined, {
                parent: _this,
                key: key
            });
            Object.assign(_this.idMap, _tslibJs.__assign((_a = {
            }, _a[stateNode.id] = stateNode, _a), stateNode.idMap));
            return stateNode;
        }) : EMPTY_OBJECT; // Document order
        var order = 0;
        function dfs(stateNode) {
            var e_1, _a;
            stateNode.order = order++;
            try {
                for(var _b = _tslibJs.__values(_stateUtilsJs.getChildren(stateNode)), _c = _b.next(); !_c.done; _c = _b.next()){
                    var child = _c.value;
                    dfs(child);
                }
            } catch (e_1_1) {
                e_1 = {
                    error: e_1_1
                };
            } finally{
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally{
                    if (e_1) throw e_1.error;
                }
            }
        }
        dfs(this); // History config
        this.history = this.config.history === true ? 'shallow' : this.config.history || false;
        this._transient = !!this.config.always || (!this.config.on ? false : Array.isArray(this.config.on) ? this.config.on.some(function(_a) {
            var event = _a.event;
            return event === NULL_EVENT;
        }) : NULL_EVENT in this.config.on);
        this.strict = !!this.config.strict; // TODO: deprecate (entry)
        this.onEntry = _utilsJs.toArray(this.config.entry || this.config.onEntry).map(function(action) {
            return _actionsJs.toActionObject(action);
        }); // TODO: deprecate (exit)
        this.onExit = _utilsJs.toArray(this.config.exit || this.config.onExit).map(function(action) {
            return _actionsJs.toActionObject(action);
        });
        this.meta = this.config.meta;
        this.doneData = this.type === 'final' ? this.config.data : undefined;
        this.invoke = _utilsJs.toArray(this.config.invoke).map(function(invokeConfig, i) {
            var _a, _b;
            if (_utilsJs.isMachine(invokeConfig)) {
                var invokeId = _utilsJs.createInvokeId(_this.id, i);
                _this.machine.options.services = _tslibJs.__assign((_a = {
                }, _a[invokeId] = invokeConfig, _a), _this.machine.options.services);
                return _invokeUtilsJs.toInvokeDefinition({
                    src: invokeId,
                    id: invokeId
                });
            } else if (_utilsJs.isString(invokeConfig.src)) {
                var invokeId = invokeConfig.id || _utilsJs.createInvokeId(_this.id, i);
                return _invokeUtilsJs.toInvokeDefinition(_tslibJs.__assign(_tslibJs.__assign({
                }, invokeConfig), {
                    id: invokeId,
                    src: invokeConfig.src
                }));
            } else if (_utilsJs.isMachine(invokeConfig.src) || _utilsJs.isFunction(invokeConfig.src)) {
                var invokeId = invokeConfig.id || _utilsJs.createInvokeId(_this.id, i);
                _this.machine.options.services = _tslibJs.__assign((_b = {
                }, _b[invokeId] = invokeConfig.src, _b), _this.machine.options.services);
                return _invokeUtilsJs.toInvokeDefinition(_tslibJs.__assign(_tslibJs.__assign({
                    id: invokeId
                }, invokeConfig), {
                    src: invokeId
                }));
            } else {
                var invokeSource = invokeConfig.src;
                return _invokeUtilsJs.toInvokeDefinition(_tslibJs.__assign(_tslibJs.__assign({
                    id: _utilsJs.createInvokeId(_this.id, i)
                }, invokeConfig), {
                    src: invokeSource
                }));
            }
        });
        this.activities = _utilsJs.toArray(this.config.activities).concat(this.invoke).map(function(activity) {
            return _actionsJs.toActivityDefinition(activity);
        });
        this.transition = this.transition.bind(this);
        this.tags = _utilsJs.toArray(this.config.tags); // TODO: this is the real fix for initialization once
    // state node getters are deprecated
    // if (!this.parent) {
    //   this._init();
    // }
    }
    StateNode1.prototype._init = function() {
        if (this.__cache.transitions) return;
        _stateUtilsJs.getAllStateNodes(this).forEach(function(stateNode) {
            return stateNode.on;
        });
    };
    /**
   * Clones this state machine with custom options and context.
   *
   * @param options Options (actions, guards, activities, services) to recursively merge with the existing options.
   * @param context Custom context (will override predefined context)
   */ StateNode1.prototype.withConfig = function(options, context) {
        var _a = this.options, actions = _a.actions, activities = _a.activities, guards = _a.guards, services = _a.services, delays = _a.delays;
        return new StateNode1(this.config, {
            actions: _tslibJs.__assign(_tslibJs.__assign({
            }, actions), options.actions),
            activities: _tslibJs.__assign(_tslibJs.__assign({
            }, activities), options.activities),
            guards: _tslibJs.__assign(_tslibJs.__assign({
            }, guards), options.guards),
            services: _tslibJs.__assign(_tslibJs.__assign({
            }, services), options.services),
            delays: _tslibJs.__assign(_tslibJs.__assign({
            }, delays), options.delays)
        }, context !== null && context !== void 0 ? context : this.context);
    };
    /**
   * Clones this state machine with custom context.
   *
   * @param context Custom context (will override predefined context, not recursive)
   */ StateNode1.prototype.withContext = function(context) {
        return new StateNode1(this.config, this.options, context);
    };
    Object.defineProperty(StateNode1.prototype, "context", {
        get: function() {
            return _utilsJs.isFunction(this._context) ? this._context() : this._context;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateNode1.prototype, "definition", {
        /**
     * The well-structured state node definition.
     */ get: function() {
            return {
                id: this.id,
                key: this.key,
                version: this.version,
                context: this.context,
                type: this.type,
                initial: this.initial,
                history: this.history,
                states: _utilsJs.mapValues(this.states, function(state) {
                    return state.definition;
                }),
                on: this.on,
                transitions: this.transitions,
                entry: this.onEntry,
                exit: this.onExit,
                activities: this.activities || [],
                meta: this.meta,
                order: this.order || -1,
                data: this.doneData,
                invoke: this.invoke,
                description: this.description,
                tags: this.tags
            };
        },
        enumerable: false,
        configurable: true
    });
    StateNode1.prototype.toJSON = function() {
        return this.definition;
    };
    Object.defineProperty(StateNode1.prototype, "on", {
        /**
     * The mapping of events to transitions.
     */ get: function() {
            if (this.__cache.on) return this.__cache.on;
            var transitions = this.transitions;
            return this.__cache.on = transitions.reduce(function(map, transition) {
                map[transition.eventType] = map[transition.eventType] || [];
                map[transition.eventType].push(transition);
                return map;
            }, {
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateNode1.prototype, "after", {
        get: function() {
            return this.__cache.delayedTransitions || (this.__cache.delayedTransitions = this.getDelayedTransitions(), this.__cache.delayedTransitions);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateNode1.prototype, "transitions", {
        /**
     * All the transitions that can be taken from this state node.
     */ get: function() {
            return this.__cache.transitions || (this.__cache.transitions = this.formatTransitions(), this.__cache.transitions);
        },
        enumerable: false,
        configurable: true
    });
    StateNode1.prototype.getCandidates = function(eventName) {
        if (this.__cache.candidates[eventName]) return this.__cache.candidates[eventName];
        var transient = eventName === NULL_EVENT;
        var candidates = this.transitions.filter(function(transition) {
            var sameEventType = transition.eventType === eventName; // null events should only match against eventless transitions
            return transient ? sameEventType : sameEventType || transition.eventType === WILDCARD;
        });
        this.__cache.candidates[eventName] = candidates;
        return candidates;
    };
    /**
   * All delayed transitions from the config.
   */ StateNode1.prototype.getDelayedTransitions = function() {
        var _this = this;
        var afterConfig = this.config.after;
        if (!afterConfig) return [];
        var mutateEntryExit = function(delay, i) {
            var delayRef = _utilsJs.isFunction(delay) ? "".concat(_this.id, ":delay[").concat(i, "]") : delay;
            var eventType = _actionsJs.after(delayRef, _this.id);
            _this.onEntry.push(_actionsJs.send(eventType, {
                delay: delay
            }));
            _this.onExit.push(_actionsJs.cancel(eventType));
            return eventType;
        };
        var delayedTransitions = _utilsJs.isArray(afterConfig) ? afterConfig.map(function(transition, i) {
            var eventType = mutateEntryExit(transition.delay, i);
            return _tslibJs.__assign(_tslibJs.__assign({
            }, transition), {
                event: eventType
            });
        }) : _utilsJs.flatten(Object.keys(afterConfig).map(function(delay, i) {
            var configTransition = afterConfig[delay];
            var resolvedTransition = _utilsJs.isString(configTransition) ? {
                target: configTransition
            } : configTransition;
            var resolvedDelay = !isNaN(+delay) ? +delay : delay;
            var eventType = mutateEntryExit(resolvedDelay, i);
            return _utilsJs.toArray(resolvedTransition).map(function(transition) {
                return _tslibJs.__assign(_tslibJs.__assign({
                }, transition), {
                    event: eventType,
                    delay: resolvedDelay
                });
            });
        }));
        return delayedTransitions.map(function(delayedTransition) {
            var delay = delayedTransition.delay;
            return _tslibJs.__assign(_tslibJs.__assign({
            }, _this.formatTransition(delayedTransition)), {
                delay: delay
            });
        });
    };
    /**
   * Returns the state nodes represented by the current state value.
   *
   * @param state The state value or State instance
   */ StateNode1.prototype.getStateNodes = function(state) {
        var _a;
        var _this = this;
        if (!state) return [];
        var stateValue = state instanceof _stateJs.State ? state.value : _utilsJs.toStateValue(state, this.delimiter);
        if (_utilsJs.isString(stateValue)) {
            var initialStateValue = this.getStateNode(stateValue).initial;
            return initialStateValue !== undefined ? this.getStateNodes((_a = {
            }, _a[stateValue] = initialStateValue, _a)) : [
                this,
                this.states[stateValue]
            ];
        }
        var subStateKeys = Object.keys(stateValue);
        var subStateNodes = [
            this
        ];
        subStateNodes.push.apply(subStateNodes, _tslibJs.__spreadArray([], _tslibJs.__read(_utilsJs.flatten(subStateKeys.map(function(subStateKey) {
            return _this.getStateNode(subStateKey).getStateNodes(stateValue[subStateKey]);
        }))), false));
        return subStateNodes;
    };
    /**
   * Returns `true` if this state node explicitly handles the given event.
   *
   * @param event The event in question
   */ StateNode1.prototype.handles = function(event) {
        var eventType = _utilsJs.getEventType(event);
        return this.events.includes(eventType);
    };
    /**
   * Resolves the given `state` to a new `State` instance relative to this machine.
   *
   * This ensures that `.events` and `.nextEvents` represent the correct values.
   *
   * @param state The state to resolve
   */ StateNode1.prototype.resolveState = function(state) {
        var stateFromConfig = state instanceof _stateJs.State ? state : _stateJs.State.create(state);
        var configuration = Array.from(_stateUtilsJs.getConfiguration([], this.getStateNodes(stateFromConfig.value)));
        return new _stateJs.State(_tslibJs.__assign(_tslibJs.__assign({
        }, stateFromConfig), {
            value: this.resolve(stateFromConfig.value),
            configuration: configuration,
            done: _stateUtilsJs.isInFinalState(configuration, this),
            tags: _stateUtilsJs.getTagsFromConfiguration(configuration),
            machine: this.machine
        }));
    };
    StateNode1.prototype.transitionLeafNode = function(stateValue, state, _event) {
        var stateNode = this.getStateNode(stateValue);
        var next = stateNode.next(state, _event);
        if (!next || !next.transitions.length) return this.next(state, _event);
        return next;
    };
    StateNode1.prototype.transitionCompoundNode = function(stateValue, state, _event) {
        var subStateKeys = Object.keys(stateValue);
        var stateNode = this.getStateNode(subStateKeys[0]);
        var next = stateNode._transition(stateValue[subStateKeys[0]], state, _event);
        if (!next || !next.transitions.length) return this.next(state, _event);
        return next;
    };
    StateNode1.prototype.transitionParallelNode = function(stateValue, state, _event) {
        var e_2, _a;
        var transitionMap = {
        };
        try {
            for(var _b = _tslibJs.__values(Object.keys(stateValue)), _c = _b.next(); !_c.done; _c = _b.next()){
                var subStateKey = _c.value;
                var subStateValue = stateValue[subStateKey];
                if (!subStateValue) continue;
                var subStateNode = this.getStateNode(subStateKey);
                var next = subStateNode._transition(subStateValue, state, _event);
                if (next) transitionMap[subStateKey] = next;
            }
        } catch (e_2_1) {
            e_2 = {
                error: e_2_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_2) throw e_2.error;
            }
        }
        var stateTransitions = Object.keys(transitionMap).map(function(key) {
            return transitionMap[key];
        });
        var enabledTransitions = _utilsJs.flatten(stateTransitions.map(function(st) {
            return st.transitions;
        }));
        var willTransition = stateTransitions.some(function(st) {
            return st.transitions.length > 0;
        });
        if (!willTransition) return this.next(state, _event);
        var entryNodes = _utilsJs.flatten(stateTransitions.map(function(t) {
            return t.entrySet;
        }));
        var configuration = _utilsJs.flatten(Object.keys(transitionMap).map(function(key) {
            return transitionMap[key].configuration;
        }));
        return {
            transitions: enabledTransitions,
            entrySet: entryNodes,
            exitSet: _utilsJs.flatten(stateTransitions.map(function(t) {
                return t.exitSet;
            })),
            configuration: configuration,
            source: state,
            actions: _utilsJs.flatten(Object.keys(transitionMap).map(function(key) {
                return transitionMap[key].actions;
            }))
        };
    };
    StateNode1.prototype._transition = function(stateValue, state, _event) {
        // leaf node
        if (_utilsJs.isString(stateValue)) return this.transitionLeafNode(stateValue, state, _event);
         // hierarchical node
        if (Object.keys(stateValue).length === 1) return this.transitionCompoundNode(stateValue, state, _event);
         // orthogonal node
        return this.transitionParallelNode(stateValue, state, _event);
    };
    StateNode1.prototype.getTransitionData = function(state, event) {
        return this._transition(state.value, state, _utilsJs.toSCXMLEvent(event));
    };
    StateNode1.prototype.next = function(state, _event) {
        var e_3, _a;
        var _this = this;
        var eventName = _event.name;
        var actions = [];
        var nextStateNodes = [];
        var selectedTransition;
        try {
            for(var _b = _tslibJs.__values(this.getCandidates(eventName)), _c = _b.next(); !_c.done; _c = _b.next()){
                var candidate = _c.value;
                var cond = candidate.cond, stateIn = candidate.in;
                var resolvedContext = state.context;
                var isInState = stateIn ? _utilsJs.isString(stateIn) && isStateId(stateIn) ? state.matches(_utilsJs.toStateValue(this.getStateNodeById(stateIn).path, this.delimiter)) : _utilsJs.matchesState(_utilsJs.toStateValue(stateIn, this.delimiter), _utilsJs.path(this.path.slice(0, -2))(state.value)) : true;
                var guardPassed = false;
                try {
                    guardPassed = !cond || _utilsJs.evaluateGuard(this.machine, cond, resolvedContext, _event, state);
                } catch (err) {
                    throw new Error("Unable to evaluate guard '".concat(cond.name || cond.type, "' in transition for event '").concat(eventName, "' in state node '").concat(this.id, "':\n").concat(err.message));
                }
                if (guardPassed && isInState) {
                    if (candidate.target !== undefined) nextStateNodes = candidate.target;
                    actions.push.apply(actions, _tslibJs.__spreadArray([], _tslibJs.__read(candidate.actions), false));
                    selectedTransition = candidate;
                    break;
                }
            }
        } catch (e_3_1) {
            e_3 = {
                error: e_3_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_3) throw e_3.error;
            }
        }
        if (!selectedTransition) return undefined;
        if (!nextStateNodes.length) return {
            transitions: [
                selectedTransition
            ],
            entrySet: [],
            exitSet: [],
            configuration: state.value ? [
                this
            ] : [],
            source: state,
            actions: actions
        };
        var allNextStateNodes = _utilsJs.flatten(nextStateNodes.map(function(stateNode) {
            return _this.getRelativeStateNodes(stateNode, state.historyValue);
        }));
        var isInternal = !!selectedTransition.internal;
        var reentryNodes = isInternal ? [] : _utilsJs.flatten(allNextStateNodes.map(function(n) {
            return _this.nodesFromChild(n);
        }));
        return {
            transitions: [
                selectedTransition
            ],
            entrySet: reentryNodes,
            exitSet: isInternal ? [] : [
                this
            ],
            configuration: allNextStateNodes,
            source: state,
            actions: actions
        };
    };
    StateNode1.prototype.nodesFromChild = function(childStateNode) {
        if (childStateNode.escapes(this)) return [];
        var nodes = [];
        var marker = childStateNode;
        while(marker && marker !== this){
            nodes.push(marker);
            marker = marker.parent;
        }
        nodes.push(this); // inclusive
        return nodes;
    };
    /**
   * Whether the given state node "escapes" this state node. If the `stateNode` is equal to or the parent of
   * this state node, it does not escape.
   */ StateNode1.prototype.escapes = function(stateNode) {
        if (this === stateNode) return false;
        var parent = this.parent;
        while(parent){
            if (parent === stateNode) return false;
            parent = parent.parent;
        }
        return true;
    };
    StateNode1.prototype.getActions = function(transition, currentContext, _event, prevState) {
        var e_4, _a, e_5, _b;
        var prevConfig = _stateUtilsJs.getConfiguration([], prevState ? this.getStateNodes(prevState.value) : [
            this
        ]);
        var resolvedConfig = transition.configuration.length ? _stateUtilsJs.getConfiguration(prevConfig, transition.configuration) : prevConfig;
        try {
            for(var resolvedConfig_1 = _tslibJs.__values(resolvedConfig), resolvedConfig_1_1 = resolvedConfig_1.next(); !resolvedConfig_1_1.done; resolvedConfig_1_1 = resolvedConfig_1.next()){
                var sn = resolvedConfig_1_1.value;
                if (!_stateUtilsJs.has(prevConfig, sn)) transition.entrySet.push(sn);
            }
        } catch (e_4_1) {
            e_4 = {
                error: e_4_1
            };
        } finally{
            try {
                if (resolvedConfig_1_1 && !resolvedConfig_1_1.done && (_a = resolvedConfig_1.return)) _a.call(resolvedConfig_1);
            } finally{
                if (e_4) throw e_4.error;
            }
        }
        try {
            for(var prevConfig_1 = _tslibJs.__values(prevConfig), prevConfig_1_1 = prevConfig_1.next(); !prevConfig_1_1.done; prevConfig_1_1 = prevConfig_1.next()){
                var sn = prevConfig_1_1.value;
                if (!_stateUtilsJs.has(resolvedConfig, sn) || _stateUtilsJs.has(transition.exitSet, sn.parent)) transition.exitSet.push(sn);
            }
        } catch (e_5_1) {
            e_5 = {
                error: e_5_1
            };
        } finally{
            try {
                if (prevConfig_1_1 && !prevConfig_1_1.done && (_b = prevConfig_1.return)) _b.call(prevConfig_1);
            } finally{
                if (e_5) throw e_5.error;
            }
        }
        var doneEvents = _utilsJs.flatten(transition.entrySet.map(function(sn) {
            var events = [];
            if (sn.type !== 'final') return events;
            var parent = sn.parent;
            if (!parent.parent) return events;
            events.push(_actionsJs.done(sn.id, sn.doneData), _actionsJs.done(parent.id, sn.doneData ? _utilsJs.mapContext(sn.doneData, currentContext, _event) : undefined));
            var grandparent = parent.parent;
            if (grandparent.type === 'parallel') {
                if (_stateUtilsJs.getChildren(grandparent).every(function(parentNode) {
                    return _stateUtilsJs.isInFinalState(transition.configuration, parentNode);
                })) events.push(_actionsJs.done(grandparent.id));
            }
            return events;
        }));
        transition.exitSet.sort(function(a, b) {
            return b.order - a.order;
        });
        transition.entrySet.sort(function(a, b) {
            return a.order - b.order;
        });
        var entryStates = new Set(transition.entrySet);
        var exitStates = new Set(transition.exitSet);
        var _c = _tslibJs.__read([
            _utilsJs.flatten(Array.from(entryStates).map(function(stateNode) {
                return _tslibJs.__spreadArray(_tslibJs.__spreadArray([], _tslibJs.__read(stateNode.activities.map(function(activity) {
                    return _actionsJs.start(activity);
                })), false), _tslibJs.__read(stateNode.onEntry), false);
            })).concat(doneEvents.map(_actionsJs.raise)),
            _utilsJs.flatten(Array.from(exitStates).map(function(stateNode) {
                return _tslibJs.__spreadArray(_tslibJs.__spreadArray([], _tslibJs.__read(stateNode.onExit), false), _tslibJs.__read(stateNode.activities.map(function(activity) {
                    return _actionsJs.stop(activity);
                })), false);
            }))
        ], 2), entryActions = _c[0], exitActions = _c[1];
        var actions = _actionsJs.toActionObjects(exitActions.concat(transition.actions).concat(entryActions), this.machine.options.actions);
        return actions;
    };
    /**
   * Determines the next state given the current `state` and sent `event`.
   *
   * @param state The current State instance or state value
   * @param event The event that was sent at the current state
   * @param context The current context (extended state) of the current state
   */ StateNode1.prototype.transition = function(state, event, context) {
        if (state === void 0) state = this.initialState;
        var _event = _utilsJs.toSCXMLEvent(event);
        var currentState;
        if (state instanceof _stateJs.State) currentState = context === undefined ? state : this.resolveState(_stateJs.State.from(state, context));
        else {
            var resolvedStateValue = _utilsJs.isString(state) ? this.resolve(_utilsJs.pathToStateValue(this.getResolvedPath(state))) : this.resolve(state);
            var resolvedContext = context !== null && context !== void 0 ? context : this.machine.context;
            currentState = this.resolveState(_stateJs.State.from(resolvedStateValue, resolvedContext));
        }
        if (!_environmentJs.IS_PRODUCTION && _event.name === WILDCARD) throw new Error("An event cannot have the wildcard type ('".concat(WILDCARD, "')"));
        if (this.strict) {
            if (!this.events.includes(_event.name) && !_utilsJs.isBuiltInEvent(_event.name)) throw new Error("Machine '".concat(this.id, "' does not accept event '").concat(_event.name, "'"));
        }
        var stateTransition = this._transition(currentState.value, currentState, _event) || {
            transitions: [],
            configuration: [],
            entrySet: [],
            exitSet: [],
            source: currentState,
            actions: []
        };
        var prevConfig = _stateUtilsJs.getConfiguration([], this.getStateNodes(currentState.value));
        var resolvedConfig = stateTransition.configuration.length ? _stateUtilsJs.getConfiguration(prevConfig, stateTransition.configuration) : prevConfig;
        stateTransition.configuration = _tslibJs.__spreadArray([], _tslibJs.__read(resolvedConfig), false);
        return this.resolveTransition(stateTransition, currentState, currentState.context, _event);
    };
    StateNode1.prototype.resolveRaisedTransition = function(state, _event, originalEvent) {
        var _a;
        var currentActions = state.actions;
        state = this.transition(state, _event); // Save original event to state
        // TODO: this should be the raised event! Delete in V5 (breaking)
        state._event = originalEvent;
        state.event = originalEvent.data;
        (_a = state.actions).unshift.apply(_a, _tslibJs.__spreadArray([], _tslibJs.__read(currentActions), false));
        return state;
    };
    StateNode1.prototype.resolveTransition = function(stateTransition, currentState, context, _event) {
        var e_6, _a2;
        var _this = this;
        if (_event === void 0) _event = _actionsJs.initEvent;
        var configuration = stateTransition.configuration; // Transition will "apply" if:
        // - this is the initial state (there is no current state)
        // - OR there are transitions
        var willTransition = !currentState || stateTransition.transitions.length > 0;
        var resolvedStateValue = willTransition ? _stateUtilsJs.getValue(this.machine, configuration) : undefined;
        var historyValue = currentState ? currentState.historyValue ? currentState.historyValue : stateTransition.source ? this.machine.historyValue(currentState.value) : undefined : undefined;
        var actions = this.getActions(stateTransition, context, _event, currentState);
        var activities = currentState ? _tslibJs.__assign({
        }, currentState.activities) : {
        };
        try {
            for(var actions_1 = _tslibJs.__values(actions), actions_1_1 = actions_1.next(); !actions_1_1.done; actions_1_1 = actions_1.next()){
                var action = actions_1_1.value;
                if (action.type === _actionTypesJs.start) activities[action.activity.id || action.activity.type] = action;
                else if (action.type === _actionTypesJs.stop) activities[action.activity.id || action.activity.type] = false;
            }
        } catch (e_6_1) {
            e_6 = {
                error: e_6_1
            };
        } finally{
            try {
                if (actions_1_1 && !actions_1_1.done && (_a2 = actions_1.return)) _a2.call(actions_1);
            } finally{
                if (e_6) throw e_6.error;
            }
        }
        var _b = _tslibJs.__read(_actionsJs.resolveActions(this, currentState, context, _event, actions, this.machine.config.preserveActionOrder), 2), resolvedActions = _b[0], updatedContext = _b[1];
        var _c = _tslibJs.__read(_utilsJs.partition(resolvedActions, function(action) {
            return action.type === _actionTypesJs.raise || action.type === _actionTypesJs.send && action.to === _typesJs.SpecialTargets.Internal;
        }), 2), raisedEvents = _c[0], nonRaisedActions = _c[1];
        var invokeActions = resolvedActions.filter(function(action) {
            var _a;
            return action.type === _actionTypesJs.start && ((_a = action.activity) === null || _a === void 0 ? void 0 : _a.type) === _actionTypesJs.invoke;
        });
        var children = invokeActions.reduce(function(acc, action) {
            acc[action.activity.id] = _actorJs.createInvocableActor(action.activity, _this.machine, updatedContext, _event);
            return acc;
        }, currentState ? _tslibJs.__assign({
        }, currentState.children) : {
        });
        var resolvedConfiguration = willTransition ? stateTransition.configuration : currentState ? currentState.configuration : [];
        var isDone = _stateUtilsJs.isInFinalState(resolvedConfiguration, this);
        var nextState = new _stateJs.State({
            value: resolvedStateValue || currentState.value,
            context: updatedContext,
            _event: _event,
            // Persist _sessionid between states
            _sessionid: currentState ? currentState._sessionid : null,
            historyValue: resolvedStateValue ? historyValue ? _utilsJs.updateHistoryValue(historyValue, resolvedStateValue) : undefined : currentState ? currentState.historyValue : undefined,
            history: !resolvedStateValue || stateTransition.source ? currentState : undefined,
            actions: resolvedStateValue ? nonRaisedActions : [],
            activities: resolvedStateValue ? activities : currentState ? currentState.activities : {
            },
            events: [],
            configuration: resolvedConfiguration,
            transitions: stateTransition.transitions,
            children: children,
            done: isDone,
            tags: currentState === null || currentState === void 0 ? void 0 : currentState.tags,
            machine: this
        });
        var didUpdateContext = context !== updatedContext;
        nextState.changed = _event.name === _actionTypesJs.update || didUpdateContext; // Dispose of penultimate histories to prevent memory leaks
        var history = nextState.history;
        if (history) delete history.history;
         // There are transient transitions if the machine is not in a final state
        // and if some of the state nodes have transient ("always") transitions.
        var isTransient = !isDone && (this._transient || configuration.some(function(stateNode) {
            return stateNode._transient;
        })); // If there are no enabled transitions, check if there are transient transitions.
        // If there are transient transitions, continue checking for more transitions
        // because an transient transition should be triggered even if there are no
        // enabled transitions.
        //
        // If we're already working on an transient transition (by checking
        // if the event is a NULL_EVENT), then stop to prevent an infinite loop.
        //
        // Otherwise, if there are no enabled nor transient transitions, we are done.
        if (!willTransition && (!isTransient || _event.name === NULL_EVENT)) return nextState;
        var maybeNextState = nextState;
        if (!isDone) {
            if (isTransient) maybeNextState = this.resolveRaisedTransition(maybeNextState, {
                type: _actionTypesJs.nullEvent
            }, _event);
            while(raisedEvents.length){
                var raisedEvent = raisedEvents.shift();
                maybeNextState = this.resolveRaisedTransition(maybeNextState, raisedEvent._event, _event);
            }
        } // Detect if state changed
        var changed = maybeNextState.changed || (history ? !!maybeNextState.actions.length || didUpdateContext || typeof history.value !== typeof maybeNextState.value || !_stateJs.stateValuesEqual(maybeNextState.value, history.value) : undefined);
        maybeNextState.changed = changed; // Preserve original history after raised events
        maybeNextState.history = history;
        maybeNextState.tags = _stateUtilsJs.getTagsFromConfiguration(maybeNextState.configuration);
        return maybeNextState;
    };
    /**
   * Returns the child state node from its relative `stateKey`, or throws.
   */ StateNode1.prototype.getStateNode = function(stateKey) {
        if (isStateId(stateKey)) return this.machine.getStateNodeById(stateKey);
        if (!this.states) throw new Error("Unable to retrieve child state '".concat(stateKey, "' from '").concat(this.id, "'; no child states exist."));
        var result = this.states[stateKey];
        if (!result) throw new Error("Child state '".concat(stateKey, "' does not exist on '").concat(this.id, "'"));
        return result;
    };
    /**
   * Returns the state node with the given `stateId`, or throws.
   *
   * @param stateId The state ID. The prefix "#" is removed.
   */ StateNode1.prototype.getStateNodeById = function(stateId) {
        var resolvedStateId = isStateId(stateId) ? stateId.slice(STATE_IDENTIFIER.length) : stateId;
        if (resolvedStateId === this.id) return this;
        var stateNode = this.machine.idMap[resolvedStateId];
        if (!stateNode) throw new Error("Child state node '#".concat(resolvedStateId, "' does not exist on machine '").concat(this.id, "'"));
        return stateNode;
    };
    /**
   * Returns the relative state node from the given `statePath`, or throws.
   *
   * @param statePath The string or string array relative path to the state node.
   */ StateNode1.prototype.getStateNodeByPath = function(statePath) {
        if (typeof statePath === 'string' && isStateId(statePath)) try {
            return this.getStateNodeById(statePath.slice(1));
        } catch (e) {
        // throw e;
        }
        var arrayStatePath = _utilsJs.toStatePath(statePath, this.delimiter).slice();
        var currentStateNode = this;
        while(arrayStatePath.length){
            var key = arrayStatePath.shift();
            if (!key.length) break;
            currentStateNode = currentStateNode.getStateNode(key);
        }
        return currentStateNode;
    };
    /**
   * Resolves a partial state value with its full representation in this machine.
   *
   * @param stateValue The partial state value to resolve.
   */ StateNode1.prototype.resolve = function(stateValue) {
        var _a;
        var _this = this;
        if (!stateValue) return this.initialStateValue || EMPTY_OBJECT; // TODO: type-specific properties
        switch(this.type){
            case 'parallel':
                return _utilsJs.mapValues(this.initialStateValue, function(subStateValue, subStateKey) {
                    return subStateValue ? _this.getStateNode(subStateKey).resolve(stateValue[subStateKey] || subStateValue) : EMPTY_OBJECT;
                });
            case 'compound':
                if (_utilsJs.isString(stateValue)) {
                    var subStateNode = this.getStateNode(stateValue);
                    if (subStateNode.type === 'parallel' || subStateNode.type === 'compound') return _a = {
                    }, _a[stateValue] = subStateNode.initialStateValue, _a;
                    return stateValue;
                }
                if (!Object.keys(stateValue).length) return this.initialStateValue || {
                };
                return _utilsJs.mapValues(stateValue, function(subStateValue, subStateKey) {
                    return subStateValue ? _this.getStateNode(subStateKey).resolve(subStateValue) : EMPTY_OBJECT;
                });
            default:
                return stateValue || EMPTY_OBJECT;
        }
    };
    StateNode1.prototype.getResolvedPath = function(stateIdentifier) {
        if (isStateId(stateIdentifier)) {
            var stateNode = this.machine.idMap[stateIdentifier.slice(STATE_IDENTIFIER.length)];
            if (!stateNode) throw new Error("Unable to find state node '".concat(stateIdentifier, "'"));
            return stateNode.path;
        }
        return _utilsJs.toStatePath(stateIdentifier, this.delimiter);
    };
    Object.defineProperty(StateNode1.prototype, "initialStateValue", {
        get: function() {
            var _a;
            if (this.__cache.initialStateValue) return this.__cache.initialStateValue;
            var initialStateValue;
            if (this.type === 'parallel') initialStateValue = _utilsJs.mapFilterValues(this.states, function(state) {
                return state.initialStateValue || EMPTY_OBJECT;
            }, function(stateNode) {
                return !(stateNode.type === 'history');
            });
            else if (this.initial !== undefined) {
                if (!this.states[this.initial]) throw new Error("Initial state '".concat(this.initial, "' not found on '").concat(this.key, "'"));
                initialStateValue = _stateUtilsJs.isLeafNode(this.states[this.initial]) ? this.initial : (_a = {
                }, _a[this.initial] = this.states[this.initial].initialStateValue, _a);
            } else // The finite state value of a machine without child states is just an empty object
            initialStateValue = {
            };
            this.__cache.initialStateValue = initialStateValue;
            return this.__cache.initialStateValue;
        },
        enumerable: false,
        configurable: true
    });
    StateNode1.prototype.getInitialState = function(stateValue, context) {
        this._init(); // TODO: this should be in the constructor (see note in constructor)
        var configuration = this.getStateNodes(stateValue);
        return this.resolveTransition({
            configuration: configuration,
            entrySet: configuration,
            exitSet: [],
            transitions: [],
            source: undefined,
            actions: []
        }, undefined, context !== null && context !== void 0 ? context : this.machine.context, undefined);
    };
    Object.defineProperty(StateNode1.prototype, "initialState", {
        /**
     * The initial State instance, which includes all actions to be executed from
     * entering the initial state.
     */ get: function() {
            var initialStateValue = this.initialStateValue;
            if (!initialStateValue) throw new Error("Cannot retrieve initial state from simple state '".concat(this.id, "'."));
            return this.getInitialState(initialStateValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateNode1.prototype, "target", {
        /**
     * The target state value of the history state node, if it exists. This represents the
     * default state value to transition to if no history value exists yet.
     */ get: function() {
            var target;
            if (this.type === 'history') {
                var historyConfig = this.config;
                if (_utilsJs.isString(historyConfig.target)) target = isStateId(historyConfig.target) ? _utilsJs.pathToStateValue(this.machine.getStateNodeById(historyConfig.target).path.slice(this.path.length - 1)) : historyConfig.target;
                else target = historyConfig.target;
            }
            return target;
        },
        enumerable: false,
        configurable: true
    });
    /**
   * Returns the leaf nodes from a state path relative to this state node.
   *
   * @param relativeStateId The relative state path to retrieve the state nodes
   * @param history The previous state to retrieve history
   * @param resolve Whether state nodes should resolve to initial child state nodes
   */ StateNode1.prototype.getRelativeStateNodes = function(relativeStateId, historyValue, resolve) {
        if (resolve === void 0) resolve = true;
        return resolve ? relativeStateId.type === 'history' ? relativeStateId.resolveHistory(historyValue) : relativeStateId.initialStateNodes : [
            relativeStateId
        ];
    };
    Object.defineProperty(StateNode1.prototype, "initialStateNodes", {
        get: function() {
            var _this = this;
            if (_stateUtilsJs.isLeafNode(this)) return [
                this
            ];
             // Case when state node is compound but no initial state is defined
            if (this.type === 'compound' && !this.initial) {
                if (!_environmentJs.IS_PRODUCTION) _utilsJs.warn(false, "Compound state node '".concat(this.id, "' has no initial state."));
                return [
                    this
                ];
            }
            var initialStateNodePaths = _utilsJs.toStatePaths(this.initialStateValue);
            return _utilsJs.flatten(initialStateNodePaths.map(function(initialPath) {
                return _this.getFromRelativePath(initialPath);
            }));
        },
        enumerable: false,
        configurable: true
    });
    /**
   * Retrieves state nodes from a relative path to this state node.
   *
   * @param relativePath The relative path from this state node
   * @param historyValue
   */ StateNode1.prototype.getFromRelativePath = function(relativePath) {
        if (!relativePath.length) return [
            this
        ];
        var _a = _tslibJs.__read(relativePath), stateKey = _a[0], childStatePath = _a.slice(1);
        if (!this.states) throw new Error("Cannot retrieve subPath '".concat(stateKey, "' from node with no states"));
        var childStateNode = this.getStateNode(stateKey);
        if (childStateNode.type === 'history') return childStateNode.resolveHistory();
        if (!this.states[stateKey]) throw new Error("Child state '".concat(stateKey, "' does not exist on '").concat(this.id, "'"));
        return this.states[stateKey].getFromRelativePath(childStatePath);
    };
    StateNode1.prototype.historyValue = function(relativeStateValue) {
        if (!Object.keys(this.states).length) return undefined;
        return {
            current: relativeStateValue || this.initialStateValue,
            states: _utilsJs.mapFilterValues(this.states, function(stateNode, key) {
                if (!relativeStateValue) return stateNode.historyValue();
                var subStateValue = _utilsJs.isString(relativeStateValue) ? undefined : relativeStateValue[key];
                return stateNode.historyValue(subStateValue || stateNode.initialStateValue);
            }, function(stateNode) {
                return !stateNode.history;
            })
        };
    };
    /**
   * Resolves to the historical value(s) of the parent state node,
   * represented by state nodes.
   *
   * @param historyValue
   */ StateNode1.prototype.resolveHistory = function(historyValue) {
        var _this = this;
        if (this.type !== 'history') return [
            this
        ];
        var parent = this.parent;
        if (!historyValue) {
            var historyTarget = this.target;
            return historyTarget ? _utilsJs.flatten(_utilsJs.toStatePaths(historyTarget).map(function(relativeChildPath) {
                return parent.getFromRelativePath(relativeChildPath);
            })) : parent.initialStateNodes;
        }
        var subHistoryValue = _utilsJs.nestedPath(parent.path, 'states')(historyValue).current;
        if (_utilsJs.isString(subHistoryValue)) return [
            parent.getStateNode(subHistoryValue)
        ];
        return _utilsJs.flatten(_utilsJs.toStatePaths(subHistoryValue).map(function(subStatePath) {
            return _this.history === 'deep' ? parent.getFromRelativePath(subStatePath) : [
                parent.states[subStatePath[0]]
            ];
        }));
    };
    Object.defineProperty(StateNode1.prototype, "stateIds", {
        /**
     * All the state node IDs of this state node and its descendant state nodes.
     */ get: function() {
            var _this = this;
            var childStateIds = _utilsJs.flatten(Object.keys(this.states).map(function(stateKey) {
                return _this.states[stateKey].stateIds;
            }));
            return [
                this.id
            ].concat(childStateIds);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateNode1.prototype, "events", {
        /**
     * All the event types accepted by this state node and its descendants.
     */ get: function() {
            var e_7, _a, e_8, _b;
            if (this.__cache.events) return this.__cache.events;
            var states = this.states;
            var events = new Set(this.ownEvents);
            if (states) try {
                for(var _c = _tslibJs.__values(Object.keys(states)), _d = _c.next(); !_d.done; _d = _c.next()){
                    var stateId = _d.value;
                    var state = states[stateId];
                    if (state.states) try {
                        for(var _e = (e_8 = void 0, _tslibJs.__values(state.events)), _f = _e.next(); !_f.done; _f = _e.next()){
                            var event_1 = _f.value;
                            events.add("".concat(event_1));
                        }
                    } catch (e_8_1) {
                        e_8 = {
                            error: e_8_1
                        };
                    } finally{
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        } finally{
                            if (e_8) throw e_8.error;
                        }
                    }
                }
            } catch (e_7_1) {
                e_7 = {
                    error: e_7_1
                };
            } finally{
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                } finally{
                    if (e_7) throw e_7.error;
                }
            }
            return this.__cache.events = Array.from(events);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateNode1.prototype, "ownEvents", {
        /**
     * All the events that have transitions directly from this state node.
     *
     * Excludes any inert events.
     */ get: function() {
            var events = new Set(this.transitions.filter(function(transition) {
                return !(!transition.target && !transition.actions.length && transition.internal);
            }).map(function(transition) {
                return transition.eventType;
            }));
            return Array.from(events);
        },
        enumerable: false,
        configurable: true
    });
    StateNode1.prototype.resolveTarget = function(_target) {
        var _this = this;
        if (_target === undefined) // an undefined target signals that the state node should not transition from that state when receiving that event
        return undefined;
        return _target.map(function(target) {
            if (!_utilsJs.isString(target)) return target;
            var isInternalTarget = target[0] === _this.delimiter; // If internal target is defined on machine,
            // do not include machine key on target
            if (isInternalTarget && !_this.parent) return _this.getStateNodeByPath(target.slice(1));
            var resolvedTarget = isInternalTarget ? _this.key + target : target;
            if (_this.parent) try {
                var targetStateNode = _this.parent.getStateNodeByPath(resolvedTarget);
                return targetStateNode;
            } catch (err) {
                throw new Error("Invalid transition definition for state node '".concat(_this.id, "':\n").concat(err.message));
            }
            else return _this.getStateNodeByPath(resolvedTarget);
        });
    };
    StateNode1.prototype.formatTransition = function(transitionConfig) {
        var _this = this;
        var normalizedTarget = _utilsJs.normalizeTarget(transitionConfig.target);
        var internal = 'internal' in transitionConfig ? transitionConfig.internal : normalizedTarget ? normalizedTarget.some(function(_target) {
            return _utilsJs.isString(_target) && _target[0] === _this.delimiter;
        }) : true;
        var guards = this.machine.options.guards;
        var target = this.resolveTarget(normalizedTarget);
        var transition = _tslibJs.__assign(_tslibJs.__assign({
        }, transitionConfig), {
            actions: _actionsJs.toActionObjects(_utilsJs.toArray(transitionConfig.actions)),
            cond: _utilsJs.toGuard(transitionConfig.cond, guards),
            target: target,
            source: this,
            internal: internal,
            eventType: transitionConfig.event,
            toJSON: function() {
                return _tslibJs.__assign(_tslibJs.__assign({
                }, transition), {
                    target: transition.target ? transition.target.map(function(t) {
                        return "#".concat(t.id);
                    }) : undefined,
                    source: "#".concat(_this.id)
                });
            }
        });
        return transition;
    };
    StateNode1.prototype.formatTransitions = function() {
        var e_9, _a;
        var _this = this;
        var onConfig;
        if (!this.config.on) onConfig = [];
        else if (Array.isArray(this.config.on)) onConfig = this.config.on;
        else {
            var _b = this.config.on, _c = WILDCARD, _d = _b[_c], wildcardConfigs = _d === void 0 ? [] : _d, strictTransitionConfigs_1 = _tslibJs.__rest(_b, [
                typeof _c === "symbol" ? _c : _c + ""
            ]);
            onConfig = _utilsJs.flatten(Object.keys(strictTransitionConfigs_1).map(function(key) {
                if (!_environmentJs.IS_PRODUCTION && key === NULL_EVENT) _utilsJs.warn(false, "Empty string transition configs (e.g., `{ on: { '': ... }}`) for transient transitions are deprecated. Specify the transition in the `{ always: ... }` property instead. " + "Please check the `on` configuration for \"#".concat(_this.id, "\"."));
                var transitionConfigArray = _utilsJs.toTransitionConfigArray(key, strictTransitionConfigs_1[key]);
                if (!_environmentJs.IS_PRODUCTION) validateArrayifiedTransitions(_this, key, transitionConfigArray);
                return transitionConfigArray;
            }).concat(_utilsJs.toTransitionConfigArray(WILDCARD, wildcardConfigs)));
        }
        var eventlessConfig = this.config.always ? _utilsJs.toTransitionConfigArray('', this.config.always) : [];
        var doneConfig = this.config.onDone ? _utilsJs.toTransitionConfigArray(String(_actionsJs.done(this.id)), this.config.onDone) : [];
        if (!_environmentJs.IS_PRODUCTION) _utilsJs.warn(!(this.config.onDone && !this.parent), "Root nodes cannot have an \".onDone\" transition. Please check the config of \"".concat(this.id, "\"."));
        var invokeConfig = _utilsJs.flatten(this.invoke.map(function(invokeDef) {
            var settleTransitions = [];
            if (invokeDef.onDone) settleTransitions.push.apply(settleTransitions, _tslibJs.__spreadArray([], _tslibJs.__read(_utilsJs.toTransitionConfigArray(String(_actionsJs.doneInvoke(invokeDef.id)), invokeDef.onDone)), false));
            if (invokeDef.onError) settleTransitions.push.apply(settleTransitions, _tslibJs.__spreadArray([], _tslibJs.__read(_utilsJs.toTransitionConfigArray(String(_actionsJs.error(invokeDef.id)), invokeDef.onError)), false));
            return settleTransitions;
        }));
        var delayedTransitions = this.after;
        var formattedTransitions = _utilsJs.flatten(_tslibJs.__spreadArray(_tslibJs.__spreadArray(_tslibJs.__spreadArray(_tslibJs.__spreadArray([], _tslibJs.__read(doneConfig), false), _tslibJs.__read(invokeConfig), false), _tslibJs.__read(onConfig), false), _tslibJs.__read(eventlessConfig), false).map(function(transitionConfig) {
            return _utilsJs.toArray(transitionConfig).map(function(transition) {
                return _this.formatTransition(transition);
            });
        }));
        try {
            for(var delayedTransitions_1 = _tslibJs.__values(delayedTransitions), delayedTransitions_1_1 = delayedTransitions_1.next(); !delayedTransitions_1_1.done; delayedTransitions_1_1 = delayedTransitions_1.next()){
                var delayedTransition = delayedTransitions_1_1.value;
                formattedTransitions.push(delayedTransition);
            }
        } catch (e_9_1) {
            e_9 = {
                error: e_9_1
            };
        } finally{
            try {
                if (delayedTransitions_1_1 && !delayedTransitions_1_1.done && (_a = delayedTransitions_1.return)) _a.call(delayedTransitions_1);
            } finally{
                if (e_9) throw e_9.error;
            }
        }
        return formattedTransitions;
    };
    return StateNode1;
}();

},{"./_virtual/_tslib.js":"4So72","./utils.js":"5Ce8y","./types.js":"5mTTI","./State.js":"h85Z6","./actionTypes.js":"2WTWb","./actions.js":"fKWcO","./environment.js":"fNNF6","./constants.js":"lmFH5","./stateUtils.js":"1Q0v5","./Actor.js":"itCIE","./invokeUtils.js":"a1r7S","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a1r7S":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "toInvokeDefinition", ()=>toInvokeDefinition
);
parcelHelpers.export(exports, "toInvokeSource", ()=>toInvokeSource
);
var _tslibJs = require("./_virtual/_tslib.js");
var _typesJs = require("./types.js");
var _actionTypesJs = require("./actionTypes.js");
var _utilsJs = require("./utils.js");
var _environmentJs = require("./environment.js");
function toInvokeSource(src) {
    if (typeof src === 'string') {
        var simpleSrc = {
            type: src
        };
        simpleSrc.toString = function() {
            return src;
        }; // v4 compat - TODO: remove in v5
        return simpleSrc;
    }
    return src;
}
function toInvokeDefinition(invokeConfig) {
    return _tslibJs.__assign(_tslibJs.__assign({
        type: _actionTypesJs.invoke
    }, invokeConfig), {
        toJSON: function() {
            invokeConfig.onDone;
            invokeConfig.onError;
            var invokeDef = _tslibJs.__rest(invokeConfig, [
                "onDone",
                "onError"
            ]);
            return _tslibJs.__assign(_tslibJs.__assign({
            }, invokeDef), {
                type: _actionTypesJs.invoke,
                src: toInvokeSource(invokeConfig.src)
            });
        }
    });
}

},{"./_virtual/_tslib.js":"4So72","./types.js":"5mTTI","./actionTypes.js":"2WTWb","./utils.js":"5Ce8y","./environment.js":"fNNF6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b4BjV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createInspectMachine", ()=>createInspectMachine
);
var _xstate = require("xstate");
var _serializeJs = require("./serialize.js");
function createInspectMachine(devTools, options) {
    if (devTools === void 0) devTools = globalThis.__xstate__;
    var serviceMap = new Map();
    // Listen for services being registered and index them
    // by their sessionId for quicker lookup
    var sub = devTools.onRegister(function(service) {
        serviceMap.set(service.sessionId, service);
    });
    return _xstate.createMachine({
        initial: 'pendingConnection',
        context: {
            client: undefined
        },
        states: {
            pendingConnection: {
            },
            connected: {
                on: {
                    'service.state': {
                        actions: function(ctx, e) {
                            return ctx.client.send(e);
                        }
                    },
                    'service.event': {
                        actions: function(ctx, e) {
                            return ctx.client.send(e);
                        }
                    },
                    'service.register': {
                        actions: function(ctx, e) {
                            return ctx.client.send(e);
                        }
                    },
                    'service.stop': {
                        actions: function(ctx, e) {
                            return ctx.client.send(e);
                        }
                    },
                    'xstate.event': {
                        actions: function(_, e) {
                            var event = e.event;
                            var scxmlEventObject = JSON.parse(event);
                            var service = serviceMap.get(scxmlEventObject.origin);
                            service === null || service === void 0 || service.send(scxmlEventObject);
                        }
                    },
                    unload: {
                        actions: function(ctx) {
                            ctx.client.send({
                                type: 'xstate.disconnect'
                            });
                        }
                    },
                    disconnect: 'disconnected'
                }
            },
            disconnected: {
                entry: function() {
                    sub.unsubscribe();
                },
                type: 'final'
            }
        },
        on: {
            'xstate.inspecting': {
                target: '.connected',
                actions: [
                    _xstate.assign({
                        client: function(_, e) {
                            return e.client;
                        }
                    }),
                    function(ctx) {
                        devTools.services.forEach(function(service) {
                            var _a;
                            (_a = ctx.client) === null || _a === void 0 || _a.send({
                                type: 'service.register',
                                machine: _serializeJs.stringifyMachine(service.machine, options === null || options === void 0 ? void 0 : options.serialize),
                                state: _serializeJs.stringifyState(service.state || service.initialState, options === null || options === void 0 ? void 0 : options.serialize),
                                sessionId: service.sessionId
                            });
                        });
                    }
                ]
            }
        }
    });
}

},{"xstate":"2sk4t","./serialize.js":"elII6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"elII6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "selectivelyStringify", ()=>selectivelyStringify
);
parcelHelpers.export(exports, "stringifyMachine", ()=>stringifyMachine
);
parcelHelpers.export(exports, "stringifyState", ()=>stringifyState
);
var _tslibJs = require("./_virtual/_tslib.js");
var _utilsJs = require("./utils.js");
function selectivelyStringify(value, keys, replacer) {
    var e_1, _a;
    var selected = {
    };
    try {
        for(var keys_1 = _tslibJs.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()){
            var key = keys_1_1.value;
            selected[key] = value[key];
        }
    } catch (e_1_1) {
        e_1 = {
            error: e_1_1
        };
    } finally{
        try {
            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
        } finally{
            if (e_1) throw e_1.error;
        }
    }
    var serialized = JSON.parse(_utilsJs.stringify(selected, replacer));
    return _utilsJs.stringify(_tslibJs.__assign(_tslibJs.__assign({
    }, value), serialized));
}
function stringifyState(state, replacer) {
    return selectivelyStringify(state, [
        'context',
        'event',
        '_event'
    ], replacer);
}
function stringifyMachine(machine, replacer) {
    return selectivelyStringify(machine, [
        'context'
    ], replacer);
}

},{"./_virtual/_tslib.js":"4WlGW","./utils.js":"aNc4j","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aNc4j":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getLazy", ()=>getLazy
);
parcelHelpers.export(exports, "isReceiverEvent", ()=>isReceiverEvent
);
parcelHelpers.export(exports, "parseReceiverEvent", ()=>parseReceiverEvent
);
parcelHelpers.export(exports, "parseState", ()=>parseState
);
parcelHelpers.export(exports, "stringify", ()=>stringify
);
var _tslibJs = require("./_virtual/_tslib.js");
var _fastSafeStringify = require("fast-safe-stringify");
var _fastSafeStringifyDefault = parcelHelpers.interopDefault(_fastSafeStringify);
var _xstate = require("xstate");
function getLazy(value) {
    return typeof value === 'function' ? value() : value;
}
function stringify(value, replacer) {
    try {
        return JSON.stringify(value, replacer);
    } catch (e) {
        return _fastSafeStringifyDefault.default(value, replacer);
    }
}
function isReceiverEvent(event) {
    if (!event) return false;
    try {
        if (typeof event === 'object' && 'type' in event && event.type.startsWith('service.')) return true;
    } catch (e) {
        return false;
    }
    return false;
}
function parseState(stateJSON) {
    var state = _xstate.State.create(JSON.parse(stateJSON));
    delete state.history;
    return state;
}
function parseReceiverEvent(event) {
    switch(event.type){
        case 'service.event':
            return _tslibJs.__assign(_tslibJs.__assign({
            }, event), {
                event: JSON.parse(event.event)
            });
        case 'service.register':
            return _tslibJs.__assign(_tslibJs.__assign({
            }, event), {
                machine: _xstate.createMachine(JSON.parse(event.machine)),
                state: parseState(event.state)
            });
        case 'service.state':
            return _tslibJs.__assign(_tslibJs.__assign({
            }, event), {
                state: parseState(event.state)
            });
        default:
            return event;
    }
}

},{"./_virtual/_tslib.js":"4WlGW","fast-safe-stringify":"dY7b6","xstate":"2sk4t","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dY7b6":[function(require,module,exports) {
module.exports = stringify;
stringify.default = stringify;
stringify.stable = deterministicStringify;
stringify.stableStringify = deterministicStringify;
var LIMIT_REPLACE_NODE = '[...]';
var CIRCULAR_REPLACE_NODE = '[Circular]';
var arr = [];
var replacerStack = [];
function defaultOptions() {
    return {
        depthLimit: Number.MAX_SAFE_INTEGER,
        edgesLimit: Number.MAX_SAFE_INTEGER
    };
}
// Regular stringify
function stringify(obj, replacer, spacer, options) {
    if (typeof options === 'undefined') options = defaultOptions();
    decirc(obj, '', 0, [], undefined, 0, options);
    var res;
    try {
        if (replacerStack.length === 0) res = JSON.stringify(obj, replacer, spacer);
        else res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
    } catch (_) {
        return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]');
    } finally{
        while(arr.length !== 0){
            var part = arr.pop();
            if (part.length === 4) Object.defineProperty(part[0], part[1], part[3]);
            else part[0][part[1]] = part[2];
        }
    }
    return res;
}
function setReplace(replace, val, k, parent) {
    var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
    if (propertyDescriptor.get !== undefined) {
        if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, {
                value: replace
            });
            arr.push([
                parent,
                k,
                val,
                propertyDescriptor
            ]);
        } else replacerStack.push([
            val,
            k,
            replace
        ]);
    } else {
        parent[k] = replace;
        arr.push([
            parent,
            k,
            val
        ]);
    }
}
function decirc(val, k, edgeIndex, stack, parent, depth, options) {
    depth += 1;
    var i;
    if (typeof val === 'object' && val !== null) {
        for(i = 0; i < stack.length; i++)if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
        }
        if (typeof options.depthLimit !== 'undefined' && depth > options.depthLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        if (typeof options.edgesLimit !== 'undefined' && edgeIndex + 1 > options.edgesLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        stack.push(val);
        // Optimize for Arrays. Big arrays could kill the performance otherwise!
        if (Array.isArray(val)) for(i = 0; i < val.length; i++)decirc(val[i], i, i, stack, val, depth, options);
        else {
            var keys = Object.keys(val);
            for(i = 0; i < keys.length; i++){
                var key = keys[i];
                decirc(val[key], key, i, stack, val, depth, options);
            }
        }
        stack.pop();
    }
}
// Stable-stringify
function compareFunction(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}
function deterministicStringify(obj, replacer, spacer, options) {
    if (typeof options === 'undefined') options = defaultOptions();
    var tmp = deterministicDecirc(obj, '', 0, [], undefined, 0, options) || obj;
    var res;
    try {
        if (replacerStack.length === 0) res = JSON.stringify(tmp, replacer, spacer);
        else res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
    } catch (_) {
        return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]');
    } finally{
        // Ensure that we restore the object as it was.
        while(arr.length !== 0){
            var part = arr.pop();
            if (part.length === 4) Object.defineProperty(part[0], part[1], part[3]);
            else part[0][part[1]] = part[2];
        }
    }
    return res;
}
function deterministicDecirc(val, k, edgeIndex, stack, parent, depth, options) {
    depth += 1;
    var i;
    if (typeof val === 'object' && val !== null) {
        for(i = 0; i < stack.length; i++)if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
        }
        try {
            if (typeof val.toJSON === 'function') return;
        } catch (_) {
            return;
        }
        if (typeof options.depthLimit !== 'undefined' && depth > options.depthLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        if (typeof options.edgesLimit !== 'undefined' && edgeIndex + 1 > options.edgesLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        stack.push(val);
        // Optimize for Arrays. Big arrays could kill the performance otherwise!
        if (Array.isArray(val)) for(i = 0; i < val.length; i++)deterministicDecirc(val[i], i, i, stack, val, depth, options);
        else {
            // Create a temporary object in the required way
            var tmp = {
            };
            var keys = Object.keys(val).sort(compareFunction);
            for(i = 0; i < keys.length; i++){
                var key = keys[i];
                deterministicDecirc(val[key], key, i, stack, val, depth, options);
                tmp[key] = val[key];
            }
            if (typeof parent !== 'undefined') {
                arr.push([
                    parent,
                    k,
                    val
                ]);
                parent[k] = tmp;
            } else return tmp;
        }
        stack.pop();
    }
}
// wraps replacer function to handle values we couldn't replace
// and mark them as replaced value
function replaceGetterValues(replacer) {
    replacer = typeof replacer !== 'undefined' ? replacer : function(k, v) {
        return v;
    };
    return function(key, val) {
        if (replacerStack.length > 0) for(var i = 0; i < replacerStack.length; i++){
            var part = replacerStack[i];
            if (part[1] === key && part[0] === val) {
                val = part[2];
                replacerStack.splice(i, 1);
                break;
            }
        }
        return replacer.call(this, key, val);
    };
}

},{}],"2YxSr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GamepadController", ()=>GamepadController
) // const DEFAULT_GAMEPAD_HELP_MSG = "Press any button on your controller or onscreen."
 // const DEFUALT_BUTTON_ORDER = [
 //     "A",
 //     "B",
 //     "X",
 //     "Y",
 //     "L1",
 //     "R1",
 //     "L2",
 //     "R2",
 //     "select",
 //     "start",
 //     "stick_button_left",
 //     "stick_button_right",
 //     "dpadUp",
 //     "dpadDown",
 //     "dpadLeft",
 //     "dpadRight"
 // ]
 // // Gamepad help section
 // var gamepadHelpVisible = false;
 // const gamepadHelpText = document.getElementById("gamepad-help-text")
 // function setupGamepadHelp() {
 //     var gamepadContainer = document.getElementById("gamepad-container")
 //     var gamepadHelpToggleButton = document.getElementById("gamepad-help-button")
 //     gamepadHelpToggleButton.onclick = () => {
 //         if (gamepadHelpVisible == false) {
 //             gamepadContainer.classList.add("help-open")
 //             gamepadHelpToggleButton.innerText = "Close Help"
 //             gamepadHelpText.innerText = 'Press or click any button to see help'
 //         } else {
 //             gamepadContainer.classList.remove("help-open")
 //             gamepadHelpToggleButton.innerText = "Gamepad Help"
 //         }
 //         gamepadHelpVisible = !gamepadHelpVisible // toggle it
 //     }
 // }
 // export function initGamepadSupport(gamepadUi, gamepadEmulator, gamepadUpdatedCallback) {
 //     // As of 2012, it seems impossible to detect Gamepad API support
 //     // in Firefox, hence we need to hardcode it in gamepadSupportAvailable.
 //     navigator.getGamepads = navigator.getGamepads || navigator.webkitGamepads || navigator.webkitGetGamepads
 //     var gamepadSupportAvailable = !!navigator.getGamepads || (navigator.userAgent.indexOf('Firefox/') != -1);
 //     if (!gamepadSupportAvailable) {
 //         // It doesn't seem Gamepad API is available ' show a message telling
 //         // the visitor about it.
 //         showNotSupported();
 //         return false;
 //     }
 //     gamepadEmulator.monkeyPatchGetGamepads()
 //     // gamepadEmulator.addEmulatedGamepad(0, gamepadEmulator.DEFAULT_BUTTON_COUNT, gamepadEmulator.DEFAULT_AXIS_COUNT)
 //     gamepadEmulator.registerOnScreenGamepadButtonEvents(0, buttonHighlightElements);
 //     gamepadEmulator.registerOnScreenGamepadAxisEvents(0, [{
 //         xAxisGpadAxis: 0,
 //         yAxisGpadAxis: 1,
 //         elem: document.getElementById("gamepad-joystick-touch-area-left"),
 //     }, {
 //         xAxisGpadAxis: 2,
 //         yAxisGpadAxis: 3,
 //         elem: document.getElementById("gamepad-joystick-touch-area-right"),
 //     }]);
 //     setupGamepadHelp();
 //     // otherwise gamepad support is available. so initilize the joymap library
 //     var lastGamepadCount = 0;
 //     var lastGamepadId = "";
 //     // do stuff immediately after each Gamepad Poll (should/will be called about 60 times per second)
 //     function gamepadUpdate() {
 //         // check if a gamepad was just connected or disconnected:
 //         const gamepads = gpadMap.getGamepads()
 //         const gamepadCount = gamepads.length;
 //         if (gamepadCount != lastGamepadCount || (gamepads[0] && gamepads[0].id != lastGamepadId)) {
 //             if (gamepadCount == 0) {
 //                 showNoGamepads();
 //                 lastGamepadCount = 0;
 //                 lastGamepadId = "";
 //                 return;
 //             } else if (gamepadCount >= 1) {
 //                 if (joyMod) gpadMap.removeModule(joyMod);
 //                 console.log(joyMod)
 //                 joyMod = joymap.createQueryModule({ threshold: 0.2, clampThreshold: true });
 //                 gpadMap.addModule(joyMod);
 //                 console.log(joyMod)
 //                 showGamepadsConnected(gamepads);
 //                 console.log(joyMod.getAllButtons(), joyMod.getAllSticks(), joyMod.getAllMappers())
 //             }
 //             lastGamepadCount = gamepadCount;
 //             lastGamepadId = gamepads[0].id;
 //         }
 //         gamepadUpdatedCallback(joyMod.getAllButtons(), joyMod.getAllSticks(), joyMod.getAllMappers())
 //     }
 // }
 // }
;
// import { startGamepadEventLoop, getGamepadsStandardized, gamepadApiSupported, onGamepadAxisValueChange, onGamepadButtonValueChange, onGamepadConnect, onGamepadDisconnect } from "./gamepad_mmk"
var _gamepadEmulator = require("./gamepadEmulator");
var _gamepadUi = require("./gamepad-ui");
var _gamepadInterface = require("./libraries/gamepadInterface");
var _consts = require("./consts");
class GamepadController {
    constructor(){
        this.touchedGpadButtonCount = 0;
        this.buttonHighlightElements = _gamepadUi.getButtonHighlightElements();
        // override the default browser gamepad api with the gamepad emulator before setting up the events,
        // the emulator will either use the real gamepad api if a gamepad is plugged in or it will inject the onscreen gamepad as if it were comming from the gamepad api.
        _gamepadEmulator.gamepadEmulator.monkeyPatchGetGamepads();
        // initilize the GamepadInterface class with the config from the consts file
        const gamepad = new _gamepadInterface.GamepadInterface(_consts.GAME_CONTROLLER_BUTTON_CONFIG);
        if (!gamepad) _gamepadUi.showNotSupported();
        // setupgamepad lib gamepad events.
        gamepad.onGamepadConnect = this.gamepadConnectDisconnectHandler.bind(this);
        gamepad.onGamepadDisconnect = this.gamepadConnectDisconnectHandler.bind(this);
        gamepad.onGamepadAxisChange = this.handleAxisChange.bind(this);
        gamepad.onGamepadButtonChange = this.handleButtonChange.bind(this);
        // setup onscreen emulated gamepad interaction events
        _gamepadEmulator.gamepadEmulator.registerOnScreenGamepadButtonEvents(0, this.buttonHighlightElements.map((elm)=>elm.id.startsWith("shoulder_trigger") ? null : elm
        ), "touched", "pressed");
        _gamepadEmulator.gamepadEmulator.registerOnScreenGamepadAxisEvents(0, [
            {
                xAxisGpadAxis: 0,
                yAxisGpadAxis: 1,
                elem: document.getElementById("gamepad-joystick-touch-area-left")
            },
            {
                xAxisGpadAxis: 2,
                yAxisGpadAxis: 3,
                elem: document.getElementById("gamepad-joystick-touch-area-right")
            }
        ]);
    }
    gamepadConnectDisconnectHandler() {
        // const gamepads = getGamepadsStandardized()
        const gamepads = navigator.getGamepads();
        var connectedGamepadCount = gamepads.reduce((acc, gpad)=>gpad ? acc + 1 : acc
        , 0);
        if (connectedGamepadCount != 0 && gamepads[0].emulated) connectedGamepadCount -= 1;
        _gamepadUi.showGamepadStatus(connectedGamepadCount);
        if (connectedGamepadCount > 1) console.log("WARNING: More than one gamepad connected!", gamepads);
    }
    handleButtonChange(gpadIndex, gamepad, buttonsChangedMask) {
        if (gpadIndex != 0 || !gamepad || !gamepad.buttons) return;
        _gamepadUi.handleGamepadVisualFeedbackButtonEvents(gamepad.buttons);
        if (buttonsChangedMask[6] || buttonsChangedMask[7]) _gamepadUi.handleGamepadVisualFeedbackVariableTriggerButtonEvents(gamepad.buttons, [
            {
                buttonIndex: 6,
                buttonElement: document.getElementById("shoulder_trigger_left_back"),
                axisRange: 26
            },
            {
                buttonIndex: 7,
                buttonElement: document.getElementById("shoulder_trigger_right_back"),
                axisRange: 26
            }, 
        ]);
        if (buttonsChangedMask[8] && buttonsChangedMask[8].released || buttonsChangedMask[9] && buttonsChangedMask[9].released) _gamepadUi.toggleGamepadHelpScreen();
        let noGamepadButtonTouched = true;
        for(let i = 0; i < buttonsChangedMask.length; i++){
            if (buttonsChangedMask[i] && buttonsChangedMask[i].touchDown) {
                _gamepadUi.showHelpTooltip(this.buttonHighlightElements[i], _consts.GAME_CONTROLLER_BUTTON_CONFIG[i].helpLabel);
                noGamepadButtonTouched = false;
            } else if (gamepad.buttons[i] && gamepad.buttons[i].touched) noGamepadButtonTouched = false;
        }
        if (noGamepadButtonTouched) _gamepadUi.showHelpTooltip(null, "Gamepad Help");
    }
    handleAxisChange(gpadIndex, gamepad) {
        // console.log("handleAxisChange", gpadIndex, gamepad, axiesChangedMask)
        if (gpadIndex != 0 || !gamepad || !gamepad.axes) return;
        const axisStates = [
            {
                axisRange: 14,
                xValue: gamepad.axes[0] || 0,
                yValue: gamepad.axes[1] || 0,
                thumbStickElement: document.getElementById("stick_left"),
                upIndicatorElement: document.getElementById("l_stick_up_direction_highlight"),
                downIndicatorElement: document.getElementById("l_stick_down_direction_highlight"),
                leftIndicatorElement: document.getElementById("l_stick_left_direction_highlight"),
                rightIndicatorElement: document.getElementById("l_stick_right_direction_highlight"),
                upHelpText: "Forward",
                downHelpText: "Back",
                leftHelpText: "Turn Left",
                rightHelpText: "Turn Right"
            },
            {
                axisRange: 14,
                xValue: gamepad.axes[2] || 0,
                yValue: gamepad.axes[3] || 0,
                thumbStickElement: document.getElementById("stick_right"),
                upIndicatorElement: document.getElementById("r_stick_up_direction_highlight"),
                downIndicatorElement: document.getElementById("r_stick_down_direction_highlight"),
                leftIndicatorElement: document.getElementById("r_stick_left_direction_highlight"),
                rightIndicatorElement: document.getElementById("r_stick_right_direction_highlight"),
                upHelpText: "Up",
                downHelpText: "Down",
                leftHelpText: "Crabwalk Left",
                rightHelpText: "Crabwalk Right"
            }
        ];
        _gamepadUi.handleGamepadVisualFeedbackAxisEvents(axisStates, 0.4);
    }
}

},{"./gamepadEmulator":"bkbwr","./gamepad-ui":"2JE4J","./libraries/gamepadInterface":"jRoqP","./consts":"2J0f1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bkbwr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "gamepadEmulator", ()=>gamepadEmulator
);
function checkIfPointIsInRect(x, y, rect) {
    return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}
const gamepadEmulator = {
    // The list of emulated gamepads, corresponds 1-1 to the list output by navigator.getGamepads().
    // when an emulated gamepad is "connected" ie: call addEmulatedGamepad(), it is added to this list.
    // when an emulated gamepad is "disconnected" ie: call removeEmulatedGamepad(), it is removed from this list.
    // if a real gamepad is found at the same array index as an emulated gamepad, the navigator.getGamepads() list
    // will report buttons pressed or axies moved on both the real gamepad and the emulated one.
    emulatedGamepads: [],
    // A number of typical buttons recognized by Gamepad API and mapped to
    // standard controls. Any extraneous buttons will have larger indexes.
    DEFAULT_BUTTON_COUNT: 18,
    // A number of typical axes recognized by Gamepad API and mapped to
    // standard controls. Any extraneous axies will have larger indexes.
    DEFAULT_AXIS_COUNT: 4,
    /* creates a new emmulated gamepad at the given index as would be read in navigator.getGamepads
     * @param {number} gpadIndex - the index of the gamepad to create, pass null to create a new gamepad at the next available index
     * @param {number} buttonCount - normally 18, the number of buttons on the gamepad
     * @param {number} axisCount - normally 4, the number of axes on the gamepad
    */ addEmulatedGamepad: function(gpadIndex, buttonCount, axisCount) {
        // create the new gamepad object
        var gpad = {
            connected: true,
            timestamp: Math.floor(Date.now() / 1000),
            buttons: new Array(buttonCount).fill({
                pressed: false,
                value: 0,
                touched: false
            }, 0, buttonCount),
            axes: new Array(axisCount).fill(0, 0, axisCount),
            id: "Emulated Gamepad " + gpadIndex + " (Xinput STANDARD GAMEPAD)",
            mapping: "standard"
        };
        // Add the new gamepad object to the list of emulated gamepads
        if (!gpadIndex) gpadIndex = this.emulatedGamepads.length;
        this.emulatedGamepads[gpadIndex] = gpad;
        // Trigger the (system) gamepad connected event on the window object
        const event = new Event("gamepadconnected");
        event.gamepad = gpad;
        // setTimeout(() => window.dispatchEvent(event), 0);
        // window.dispatchEvent(event);
        return gpad;
    },
    /* removes the emmulated gamepad at the passed index as would be read from the list in navigator.getGamepads
     * @param {number} gpadIndex - the index of the gamepad to remove
    */ disconnectEmulatedGamepad: function(gpadIndex) {
        var gpad = this.emulatedGamepads[gpadIndex];
        if (gpad) {
            this.emulatedGamepads.splice(gpadIndex, 1);
            if (!window.getGamepads()[gpadIndex]) {
                const event = new Event("gamepaddisconnected");
                gpad.connected = false;
                gpad.timestamp = Math.floor(Date.now() / 1000);
                event.gamepad = gpad;
                window.dispatchEvent(event);
            }
        }
    },
    /* emulates pressing a button on the gamepad at the given button index
    gpadIndex - the index of the emulated gamepad to press the button on
    buttonIndex - the index of the button to press
    value - the value to set the button to between 0 and 1 (0 = unpressed, 1 = pressed)
    touched - whether the button is considered "touched" or not, a "pressed" button is always considered "touched"
    */ pressButton: function(gpadIndex, buttonIndex, value, touched) {
        var gpad = this.emulatedGamepads[gpadIndex];
        if (!gpad) gpad = this.addEmulatedGamepad(gpadIndex, this.DEFAULT_BUTTON_COUNT, this.DEFAULT_AXIS_COUNT);
        var isPressed = value > 0.1;
        this.emulatedGamepads[gpadIndex].buttons[buttonIndex] = {
            pressed: isPressed,
            value: value || 0,
            touched: isPressed || touched || false
        };
    // console.log("pressButton", gpadIndex, buttonIndex, value, touched);
    // console.log(navigator.getGamepads()[gpadIndex].buttons[buttonIndex]);
    },
    /* emulates moving an axis on the gamepad at the given axis index
    gpadIndex - the index of the emulated gamepad to move the axis on
    axisIndex - the index of the axis to move
    value - the value to set the axis to between -1 and 1 (0 = center, -1 = left/up, 1 = right/down)
    */ moveAxis: function(gpadIndex, axisIndex, value) {
        var gpad = this.emulatedGamepads[gpadIndex];
        if (!gpad) gpad = this.addEmulatedGamepad(gpadIndex, this.DEFAULT_BUTTON_COUNT, this.DEFAULT_AXIS_COUNT);
        this.emulatedGamepads[gpadIndex].axes[axisIndex] = value;
    },
    /* add event listeners to the html button elements of an onscreen gamepad to emulate gamepad input
        * @param {number} gpadIndex - the index of the emulated gamepad to register events for
        * @param {array} buttonTapZoneElements - an array of elements that are the tap targets for the buttons on the onscreen gamepad, in same order as the gamepad api would use.
        * @param {array} buttonHighlightElements - an array of elements that should have the classes applied for the buttons on the onscreen gamepad, in same order as the gamepad api would use.
        * @param {string} btnTouchedClass - the class to apply to the buttonHighlightElement when it is hovered over or "touched"
        * @param {string} btnPressedClass - the class to apply to the buttonHighlightElement when it is pressed / clicked
    */ registerOnScreenGamepadButtonEvents: function(gpadIndex, buttonTapZoneElements) {
        // for (var btnIndx = 0; btnIndx < buttonTapZoneElements.length; btnIndx++) {
        var self = this;
        buttonTapZoneElements.forEach(function(btnEl, btnIndx) {
            if (!btnEl) return;
            btnEl.addEventListener("pointerover", ()=>{
                // tell the emulator this button is being "touched", ie: hovered over
                self.pressButton(gpadIndex, btnIndx, 0, true);
            });
            btnEl.addEventListener("pointerleave", ()=>{
                // tell the emulator this button is no longer being "touched", ie: not hovered over
                self.pressButton(gpadIndex, btnIndx, 0, false);
            });
            btnEl.addEventListener("pointerdown", ()=>{
                // tell the emulator this button is being pressed, ie: clicked / tapped
                self.pressButton(gpadIndex, btnIndx, 1, true);
            });
            btnEl.addEventListener("pointerup", ()=>{
                // tell the emulator this button is no longer being pressed
                self.pressButton(gpadIndex, btnIndx, 0, true);
            });
        });
    },
    registerOnScreenGamepadAxisEvents: function(gpadIndex, joysticksTouchDetails) {
        var axisTouchRadius = 100;
        var self = this;
        var pointerToJoystickMapping = {
        };
        const pointerMoveHandler = function(me) {
            var pointerId = me.pointerId;
            for(const pointerIdKey in pointerToJoystickMapping)if (pointerIdKey == pointerId) {
                const joystickData = pointerToJoystickMapping[pointerIdKey];
                var deltaX = Math.max(Math.min((me.clientX - joystickData.startX) / axisTouchRadius, 1), -1);
                var deltaY = Math.max(Math.min((me.clientY - joystickData.startY) / axisTouchRadius, 1), -1);
                self.moveAxis(gpadIndex, joystickData.xAxisGpadAxis, deltaX);
                self.moveAxis(gpadIndex, joystickData.yAxisGpadAxis, deltaY);
            }
        };
        const pointerUpHandler = function(me) {
            var pointerId = me.pointerId;
            for(const pointerIdKey in pointerToJoystickMapping)if (pointerIdKey == pointerId) {
                const joystickData = pointerToJoystickMapping[pointerIdKey];
                self.moveAxis(gpadIndex, joystickData.xAxisGpadAxis, 0);
                self.moveAxis(gpadIndex, joystickData.yAxisGpadAxis, 0);
                delete pointerToJoystickMapping[pointerIdKey];
            }
            if (Object.keys(pointerToJoystickMapping).length == 0) {
                // axisHighlightElements[index].classList.remove(axisMovedClass);
                document.removeEventListener("pointermove", pointerMoveHandler, false);
                document.removeEventListener("pointerup", pointerUpHandler, false);
            }
        };
        document.addEventListener("pointerdown", function(de) {
            joysticksTouchDetails.forEach(function(joystickTouchDetails) {
                const targetRect = joystickTouchDetails.elem.getBoundingClientRect();
                if (checkIfPointIsInRect(de.clientX, de.clientY, targetRect)) {
                    joystickTouchDetails.startX = de.clientX;
                    joystickTouchDetails.startY = de.clientY;
                    pointerToJoystickMapping[de.pointerId] = joystickTouchDetails;
                }
            });
            if (Object.keys(pointerToJoystickMapping).length == 1) {
                document.addEventListener("pointermove", pointerMoveHandler, false);
                document.addEventListener("pointerup", pointerUpHandler, false);
            }
        });
    },
    /* overwrite the browser gamepad api getGamepads() to return the emulated gamepad data for gamepad indexes corresponding to emulated gamepads
     so long as the same index don't have a real gamepad connected  */ monkeyPatchGetGamepads: function() {
        var getNativeGamepads = navigator.getGamepads || navigator.webkitGetGamepads || navigator.mozGetGamepads || navigator.msGetGamepads;
        if (getNativeGamepads) getNativeGamepads = getNativeGamepads.bind(navigator);
        var self = this;
        navigator.getGamepads = function() {
            var nativeGamepads = getNativeGamepads != undefined ? getNativeGamepads() : [];
            nativeGamepads = Array.from(nativeGamepads);
            // console.log("nativeGamepads:", nativeGamepads)
            for(var i = 0; i < self.emulatedGamepads.length; i++){
                var n_gpad = nativeGamepads[i];
                var e_gpad = self.emulatedGamepads[i];
                if (e_gpad && n_gpad) {
                    // if both an emulated gamepad and a real one is available for this index,
                    n_gpad.emulated = true; // should have some kind of mixed indication value here
                    for(let btnIdx = 0; btnIdx < e_gpad.buttons.length; btnIdx++){
                        const e_btn = e_gpad.buttons[btnIdx];
                        const n_btn = n_gpad.buttons[btnIdx];
                        if (!e_btn || !n_gpad.buttons[btnIdx]) continue;
                        // nativeGamepads[i].buttons[btnIdx].touched = e_btn.touched || n_btn.touched || false;
                        // nativeGamepads[i].buttons[btnIdx].pressed = e_btn.pressed || n_btn.pressed || false;
                        // nativeGamepads[i].buttons[btnIdx].value = Math.max(e_btn.value, n_btn.value) || 0;
                        nativeGamepads[i].buttons[btnIdx] = {
                            touched: e_btn.touched || n_btn.touched || false,
                            pressed: e_btn.pressed || n_btn.pressed || false,
                            value: Math.max(e_btn.value, n_btn.value) || 0
                        };
                    }
                    for(let axisIndex = 0; axisIndex < e_gpad.axes.length; axisIndex++){
                        const e_axis = e_gpad.axes[axisIndex];
                        const n_axis = n_gpad.axes[axisIndex];
                        nativeGamepads[i].axes[axisIndex] = Math.max(e_axis, n_axis) || 0;
                    }
                // console.log("mixedGamepad:", nativeGamepads[i])
                } else if (e_gpad) {
                    // if only the emulated gamepad is available, use it
                    e_gpad.emulated = true;
                    e_gpad.timestamp = Math.floor(Date.now() / 1000);
                    nativeGamepads[i] = self.cloneGamepad(e_gpad);
                }
            }
            return nativeGamepads;
        };
    },
    cloneGamepad: function(original) {
        if (!original) return original;
        let clone = {
            id: original.id,
            displayId: original.displayId,
            mapping: original.mapping,
            index: original.index,
            emulated: original.emulated,
            timestamp: original.timestamp,
            connected: original.connected,
            axes: new Array(original.axes.length),
            buttons: new Array(original.buttons.length)
        };
        for(let i = 0; i < original.axes.length; ++i)clone.axes[i] = original.axes[i];
        for(let i1 = 0; i1 < original.buttons.length; ++i1){
            let { pressed , value , touched  } = original.buttons[i1];
            touched = touched || false;
            clone.buttons[i1] = {
                pressed,
                value,
                touched
            };
        }
        return clone;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2JE4J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "showExtraniousGamepadsConnected", ()=>showExtraniousGamepadsConnected
);
parcelHelpers.export(exports, "showGamepadConnected", ()=>showGamepadConnected
);
parcelHelpers.export(exports, "showNoGamepads", ()=>showNoGamepads
);
parcelHelpers.export(exports, "toggleGamepadHelpScreen", ()=>toggleGamepadHelpScreen
);
parcelHelpers.export(exports, "showGamepadStatus", ()=>showGamepadStatus
);
parcelHelpers.export(exports, "showNotSupported", ()=>showNotSupported
);
parcelHelpers.export(exports, "showHelpTooltip", ()=>showHelpTooltip
);
parcelHelpers.export(exports, "handleGamepadVisualFeedbackAxisEvents", ()=>handleGamepadVisualFeedbackAxisEvents
);
parcelHelpers.export(exports, "handleGamepadVisualFeedbackButtonEvents", ()=>handleGamepadVisualFeedbackButtonEvents
);
parcelHelpers.export(exports, "handleGamepadVisualFeedbackVariableTriggerButtonEvents", ()=>handleGamepadVisualFeedbackVariableTriggerButtonEvents
);
parcelHelpers.export(exports, "getButtonHighlightElements", ()=>getButtonHighlightElements
);
var _popperLite = require("@popperjs/core/lib/popper-lite");
var _flip = require("@popperjs/core/lib/modifiers/flip");
var _flipDefault = parcelHelpers.interopDefault(_flip);
var _consts = require("./consts");
const gpadButtonHighlightElements = _consts.ONSCREEN_GPAD_BUTTON_LABELS.map((btnLabel)=>document.getElementById(btnLabel + "_highlight")
);
const gamepadHelpTooltip = document.querySelector('#gamepad-help-tooltip');
const gamepadHelpTooltipText = document.querySelector('#gamepad-help-text');
const defaultTooltipTarget = document.querySelector('#select_button');
var currentPopperTarget = defaultTooltipTarget;
const helpTooltip = _popperLite.createPopper({
    getBoundingClientRect: ()=>currentPopperTarget.getBoundingClientRect()
    ,
    contextElement: document.body
}, gamepadHelpTooltip, {
    modifiers: [
        _flipDefault.default
    ],
    placement: 'right',
    strategy: 'fixed'
});
const tooManyGamepadsNotice = document.getElementById("too-many-gamepads-notice");
function showExtraniousGamepadsConnected(tooManyGamepads) {
    tooManyGamepadsNotice.style.display = tooManyGamepads ? "block" : "none";
}
const gamepadContainer = document.getElementById("gamepad-container");
function showGamepadConnected(show) {
    if (show) gamepadContainer.classList.add("gamepad-connected");
    else gamepadContainer.classList.remove("gamepad-connected");
}
const gamepadConnectNotice = document.getElementById("gamepad-connect-notice");
function showNoGamepads(show) {
    gamepadConnectNotice.style.display = show ? "block" : "none";
}
var gamepadHelpVisible = false;
function toggleGamepadHelpScreen() {
    gamepadHelpVisible = !gamepadHelpVisible // toggle it
    ;
    if (gamepadHelpVisible) {
        gamepadContainer.classList.add("help-open");
        this.showHelpTooltip(null);
    } else gamepadContainer.classList.remove("help-open");
    let count = 0;
    var updateFunc = ()=>{
        helpTooltip.update();
        count++;
        if (count < 60) requestAnimationFrame(updateFunc);
    };
    updateFunc();
}
function showGamepadStatus(connectedGamepadCount) {
    this.showNoGamepads(connectedGamepadCount == 0);
    this.showGamepadConnected(connectedGamepadCount == 0);
    this.showExtraniousGamepadsConnected(connectedGamepadCount > 1);
}
function showNotSupported() {
    alert('Gamepad interface not supported, please use a more modern browser.');
    this.showGamepadConnected(true);
}
function showHelpTooltip(btnElem, btnHelpText) {
    if (gamepadHelpVisible) {
        if (btnElem) {
            currentPopperTarget = btnElem;
            gamepadHelpTooltipText.innerText = btnHelpText;
            gamepadHelpTooltip.style.opacity = "0.9";
        } else gamepadHelpTooltip.style.opacity = "0";
    } else if (!btnHelpText) {
        currentPopperTarget = defaultTooltipTarget;
        gamepadHelpTooltipText.innerText = "Gamepad Help";
        gamepadHelpTooltip.style.opacity = "0.8";
    }
    helpTooltip.update();
}
function handleGamepadVisualFeedbackAxisEvents(axiesMaping, directionalHelpThreshold) {
    axiesMaping.forEach(function(axisMap) {
        // if (axisValue > 0 || axisValue < 0) {
        var thumbstick = axisMap.thumbStickElement;
        var axisRange = axisMap.axisRange;
        var xValue = axisMap.xValue || 0;
        var yValue = axisMap.yValue || 0;
        thumbstick.style.transform = `rotateY(${-xValue * 30}deg) rotateX(${yValue * 30}deg) translate(${xValue * axisRange}px,${yValue * axisRange}px)`;
        if (gamepadHelpVisible) {
            if (axisMap.upIndicatorElement && axisMap.downIndicatorElement) {
                if (Math.abs(xValue) < directionalHelpThreshold) {
                    if (yValue < -directionalHelpThreshold) {
                        axisMap.upIndicatorElement.style.opacity = Math.max(-yValue, 0);
                        axisMap.downIndicatorElement.style.opacity = 0;
                        showHelpTooltip(axisMap.upIndicatorElement, axisMap.upHelpText || "None");
                    } else if (yValue > directionalHelpThreshold) {
                        axisMap.upIndicatorElement.style.opacity = 0;
                        axisMap.downIndicatorElement.style.opacity = Math.max(yValue, 0);
                        showHelpTooltip(axisMap.downIndicatorElement, axisMap.downHelpText || "None");
                    } else {
                        axisMap.upIndicatorElement.style.opacity = 0;
                        axisMap.downIndicatorElement.style.opacity = 0;
                    }
                } else {
                    axisMap.upIndicatorElement.style.opacity = 0;
                    axisMap.downIndicatorElement.style.opacity = 0;
                }
            }
            if (axisMap.leftIndicatorElement && axisMap.rightIndicatorElement) {
                if (Math.abs(yValue) < directionalHelpThreshold) {
                    if (xValue < -directionalHelpThreshold) {
                        axisMap.leftIndicatorElement.style.opacity = Math.max(-xValue, 0);
                        axisMap.rightIndicatorElement.style.opacity = 0;
                        showHelpTooltip(axisMap.leftIndicatorElement, axisMap.leftHelpText || "None");
                    } else if (xValue > directionalHelpThreshold) {
                        axisMap.leftIndicatorElement.style.opacity = 0;
                        axisMap.rightIndicatorElement.style.opacity = Math.max(xValue, 0);
                        showHelpTooltip(axisMap.rightIndicatorElement, axisMap.rightHelpText || "None");
                    } else {
                        axisMap.leftIndicatorElement.style.opacity = 0;
                        axisMap.rightIndicatorElement.style.opacity = 0;
                    }
                } else {
                    axisMap.leftIndicatorElement.style.opacity = 0;
                    axisMap.rightIndicatorElement.style.opacity = 0;
                }
            }
        }
    });
}
function setGamepadButtonClass(btnIndx, gamepadButtonStates) {
    var gpadButton = gamepadButtonStates[btnIndx];
    var btnElem = gpadButtonHighlightElements[btnIndx];
    if (!gpadButton || !btnElem) return;
    if (gpadButton.touched) btnElem.classList.add(_consts.ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS);
    else btnElem.classList.remove(_consts.ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS);
    if (gpadButton.pressed) btnElem.classList.add(_consts.ONSCREEN_GPAD_BUTTON_PRESSED_CLASS);
    else btnElem.classList.remove(_consts.ONSCREEN_GPAD_BUTTON_PRESSED_CLASS);
}
function handleGamepadVisualFeedbackButtonEvents(gamepadButtonStates) {
    for(var btnIndx = 0; btnIndx < gamepadButtonStates.length; btnIndx++)setGamepadButtonClass(btnIndx, gamepadButtonStates);
}
function handleGamepadVisualFeedbackVariableTriggerButtonEvents(gamepadButtonStates, triggerConfigs) {
    for(var i = 0; i < triggerConfigs.length; i++){
        const triggerConfig = triggerConfigs[i];
        const btnIndx = triggerConfig.buttonIndex;
        setGamepadButtonClass(btnIndx, gamepadButtonStates);
        var yValue = gamepadButtonStates[btnIndx] ? gamepadButtonStates[btnIndx].value : 0;
        triggerConfig.buttonElement.style.transform = `rotateX(${yValue * 30}deg) translateY(${yValue * triggerConfig.axisRange}px)`;
    }
}
function getButtonHighlightElements() {
    return gpadButtonHighlightElements;
}

},{"@popperjs/core/lib/popper-lite":"gKW1N","@popperjs/core/lib/modifiers/flip":"fv5wq","./consts":"2J0f1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gKW1N":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createPopper", ()=>createPopper
);
parcelHelpers.export(exports, "popperGenerator", ()=>_createPopperJs.popperGenerator
);
parcelHelpers.export(exports, "defaultModifiers", ()=>defaultModifiers
);
parcelHelpers.export(exports, "detectOverflow", ()=>_createPopperJs.detectOverflow
);
var _createPopperJs = require("./createPopper.js");
var _eventListenersJs = require("./modifiers/eventListeners.js");
var _eventListenersJsDefault = parcelHelpers.interopDefault(_eventListenersJs);
var _popperOffsetsJs = require("./modifiers/popperOffsets.js");
var _popperOffsetsJsDefault = parcelHelpers.interopDefault(_popperOffsetsJs);
var _computeStylesJs = require("./modifiers/computeStyles.js");
var _computeStylesJsDefault = parcelHelpers.interopDefault(_computeStylesJs);
var _applyStylesJs = require("./modifiers/applyStyles.js");
var _applyStylesJsDefault = parcelHelpers.interopDefault(_applyStylesJs);
var defaultModifiers = [
    _eventListenersJsDefault.default,
    _popperOffsetsJsDefault.default,
    _computeStylesJsDefault.default,
    _applyStylesJsDefault.default
];
var createPopper = /*#__PURE__*/ _createPopperJs.popperGenerator({
    defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

},{"./createPopper.js":"cHuNp","./modifiers/eventListeners.js":"hBKsL","./modifiers/popperOffsets.js":"6I679","./modifiers/computeStyles.js":"gDlm2","./modifiers/applyStyles.js":"4iMn4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cHuNp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "popperGenerator", ()=>popperGenerator
);
parcelHelpers.export(exports, "createPopper", ()=>createPopper
);
parcelHelpers.export(exports, "detectOverflow", ()=>_detectOverflowJsDefault.default
);
var _getCompositeRectJs = require("./dom-utils/getCompositeRect.js");
var _getCompositeRectJsDefault = parcelHelpers.interopDefault(_getCompositeRectJs);
var _getLayoutRectJs = require("./dom-utils/getLayoutRect.js");
var _getLayoutRectJsDefault = parcelHelpers.interopDefault(_getLayoutRectJs);
var _listScrollParentsJs = require("./dom-utils/listScrollParents.js");
var _listScrollParentsJsDefault = parcelHelpers.interopDefault(_listScrollParentsJs);
var _getOffsetParentJs = require("./dom-utils/getOffsetParent.js");
var _getOffsetParentJsDefault = parcelHelpers.interopDefault(_getOffsetParentJs);
var _getComputedStyleJs = require("./dom-utils/getComputedStyle.js");
var _getComputedStyleJsDefault = parcelHelpers.interopDefault(_getComputedStyleJs);
var _orderModifiersJs = require("./utils/orderModifiers.js");
var _orderModifiersJsDefault = parcelHelpers.interopDefault(_orderModifiersJs);
var _debounceJs = require("./utils/debounce.js");
var _debounceJsDefault = parcelHelpers.interopDefault(_debounceJs);
var _validateModifiersJs = require("./utils/validateModifiers.js");
var _validateModifiersJsDefault = parcelHelpers.interopDefault(_validateModifiersJs);
var _uniqueByJs = require("./utils/uniqueBy.js");
var _uniqueByJsDefault = parcelHelpers.interopDefault(_uniqueByJs);
var _getBasePlacementJs = require("./utils/getBasePlacement.js");
var _getBasePlacementJsDefault = parcelHelpers.interopDefault(_getBasePlacementJs);
var _mergeByNameJs = require("./utils/mergeByName.js");
var _mergeByNameJsDefault = parcelHelpers.interopDefault(_mergeByNameJs);
var _detectOverflowJs = require("./utils/detectOverflow.js");
var _detectOverflowJsDefault = parcelHelpers.interopDefault(_detectOverflowJs);
var _instanceOfJs = require("./dom-utils/instanceOf.js");
var _enumsJs = require("./enums.js");
var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
};
function areValidElements() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
    return !args.some(function(element) {
        return !(element && typeof element.getBoundingClientRect === 'function');
    });
}
function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) generatorOptions = {
    };
    var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference1, popper1, options1) {
        if (options1 === void 0) options1 = defaultOptions;
        var state1 = {
            placement: 'bottom',
            orderedModifiers: [],
            options: Object.assign({
            }, DEFAULT_OPTIONS, defaultOptions),
            modifiersData: {
            },
            elements: {
                reference: reference1,
                popper: popper1
            },
            attributes: {
            },
            styles: {
            }
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
            state: state1,
            setOptions: function setOptions(setOptionsAction) {
                var options = typeof setOptionsAction === 'function' ? setOptionsAction(state1.options) : setOptionsAction;
                cleanupModifierEffects();
                state1.options = Object.assign({
                }, defaultOptions, state1.options, options);
                state1.scrollParents = {
                    reference: _instanceOfJs.isElement(reference1) ? _listScrollParentsJsDefault.default(reference1) : reference1.contextElement ? _listScrollParentsJsDefault.default(reference1.contextElement) : [],
                    popper: _listScrollParentsJsDefault.default(popper1)
                }; // Orders the modifiers based on their dependencies and `phase`
                // properties
                var orderedModifiers = _orderModifiersJsDefault.default(_mergeByNameJsDefault.default([].concat(defaultModifiers, state1.options.modifiers))); // Strip out disabled modifiers
                state1.orderedModifiers = orderedModifiers.filter(function(m) {
                    return m.enabled;
                }); // Validate the provided modifiers so that the consumer will get warned
                var modifiers = _uniqueByJsDefault.default([].concat(orderedModifiers, state1.options.modifiers), function(_ref) {
                    var name = _ref.name;
                    return name;
                });
                _validateModifiersJsDefault.default(modifiers);
                if (_getBasePlacementJsDefault.default(state1.options.placement) === _enumsJs.auto) {
                    var flipModifier = state1.orderedModifiers.find(function(_ref2) {
                        var name = _ref2.name;
                        return name === 'flip';
                    });
                    if (!flipModifier) console.error([
                        'Popper: "auto" placements require the "flip" modifier be',
                        'present and enabled to work.'
                    ].join(' '));
                }
                var _getComputedStyle = _getComputedStyleJsDefault.default(popper1), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
                // cause bugs with positioning, so we'll warn the consumer
                if ([
                    marginTop,
                    marginRight,
                    marginBottom,
                    marginLeft
                ].some(function(margin) {
                    return parseFloat(margin);
                })) console.warn([
                    'Popper: CSS "margin" styles cannot be used to apply padding',
                    'between the popper and its reference element or boundary.',
                    'To replicate margin, use the `offset` modifier, as well as',
                    'the `padding` option in the `preventOverflow` and `flip`',
                    'modifiers.'
                ].join(' '));
                runModifierEffects();
                return instance.update();
            },
            // Sync update – it will always be executed, even if not necessary. This
            // is useful for low frequency updates where sync behavior simplifies the
            // logic.
            // For high frequency updates (e.g. `resize` and `scroll` events), always
            // prefer the async Popper#update method
            forceUpdate: function forceUpdate() {
                if (isDestroyed) return;
                var _state$elements = state1.elements, reference = _state$elements.reference, popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
                // anymore
                if (!areValidElements(reference, popper)) {
                    console.error(INVALID_ELEMENT_ERROR);
                    return;
                } // Store the reference and popper rects to be read by modifiers
                state1.rects = {
                    reference: _getCompositeRectJsDefault.default(reference, _getOffsetParentJsDefault.default(popper), state1.options.strategy === 'fixed'),
                    popper: _getLayoutRectJsDefault.default(popper)
                }; // Modifiers have the ability to reset the current update cycle. The
                // most common use case for this is the `flip` modifier changing the
                // placement, which then needs to re-run all the modifiers, because the
                // logic was previously ran for the previous placement and is therefore
                // stale/incorrect
                state1.reset = false;
                state1.placement = state1.options.placement; // On each update cycle, the `modifiersData` property for each modifier
                // is filled with the initial data specified by the modifier. This means
                // it doesn't persist and is fresh on each update.
                // To ensure persistent data, use `${name}#persistent`
                state1.orderedModifiers.forEach(function(modifier) {
                    return state1.modifiersData[modifier.name] = Object.assign({
                    }, modifier.data);
                });
                var __debug_loops__ = 0;
                for(var index = 0; index < state1.orderedModifiers.length; index++){
                    __debug_loops__ += 1;
                    if (__debug_loops__ > 100) {
                        console.error(INFINITE_LOOP_ERROR);
                        break;
                    }
                    if (state1.reset === true) {
                        state1.reset = false;
                        index = -1;
                        continue;
                    }
                    var _state$orderedModifie = state1.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {
                    } : _state$orderedModifie2, name = _state$orderedModifie.name;
                    if (typeof fn === 'function') state1 = fn({
                        state: state1,
                        options: _options,
                        name: name,
                        instance: instance
                    }) || state1;
                }
            },
            // Async and optimistically optimized update – it will not be executed if
            // not necessary (debounced to run at most once-per-tick)
            update: _debounceJsDefault.default(function() {
                return new Promise(function(resolve) {
                    instance.forceUpdate();
                    resolve(state1);
                });
            }),
            destroy: function destroy() {
                cleanupModifierEffects();
                isDestroyed = true;
            }
        };
        if (!areValidElements(reference1, popper1)) {
            console.error(INVALID_ELEMENT_ERROR);
            return instance;
        }
        instance.setOptions(options1).then(function(state) {
            if (!isDestroyed && options1.onFirstUpdate) options1.onFirstUpdate(state);
        }); // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.
        function runModifierEffects() {
            state1.orderedModifiers.forEach(function(_ref3) {
                var name = _ref3.name, _ref3$options = _ref3.options, options = _ref3$options === void 0 ? {
                } : _ref3$options, effect = _ref3.effect;
                if (typeof effect === 'function') {
                    var cleanupFn = effect({
                        state: state1,
                        name: name,
                        instance: instance,
                        options: options
                    });
                    var noopFn = function noopFn() {
                    };
                    effectCleanupFns.push(cleanupFn || noopFn);
                }
            });
        }
        function cleanupModifierEffects() {
            effectCleanupFns.forEach(function(fn) {
                return fn();
            });
            effectCleanupFns = [];
        }
        return instance;
    };
}
var createPopper = /*#__PURE__*/ popperGenerator(); // eslint-disable-next-line import/no-unused-modules

},{"./dom-utils/getCompositeRect.js":"ijPls","./dom-utils/getLayoutRect.js":"jvjuf","./dom-utils/listScrollParents.js":"2di3T","./dom-utils/getOffsetParent.js":"laoYw","./dom-utils/getComputedStyle.js":"3mZjB","./utils/orderModifiers.js":"N0VO0","./utils/debounce.js":"g6Chr","./utils/validateModifiers.js":"1S5dQ","./utils/uniqueBy.js":"hhl2M","./utils/getBasePlacement.js":"59Wp3","./utils/mergeByName.js":"2zTVN","./utils/detectOverflow.js":"ltCuw","./dom-utils/instanceOf.js":"gYFUC","./enums.js":"lCAq5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ijPls":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getBoundingClientRectJs = require("./getBoundingClientRect.js");
var _getBoundingClientRectJsDefault = parcelHelpers.interopDefault(_getBoundingClientRectJs);
var _getNodeScrollJs = require("./getNodeScroll.js");
var _getNodeScrollJsDefault = parcelHelpers.interopDefault(_getNodeScrollJs);
var _getNodeNameJs = require("./getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
var _instanceOfJs = require("./instanceOf.js");
var _getWindowScrollBarXJs = require("./getWindowScrollBarX.js");
var _getWindowScrollBarXJsDefault = parcelHelpers.interopDefault(_getWindowScrollBarXJs);
var _getDocumentElementJs = require("./getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _isScrollParentJs = require("./isScrollParent.js");
var _isScrollParentJsDefault = parcelHelpers.interopDefault(_isScrollParentJs);
var _mathJs = require("../utils/math.js");
function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = _mathJs.round(rect.width) / element.offsetWidth || 1;
    var scaleY = _mathJs.round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) isFixed = false;
    var isOffsetParentAnElement = _instanceOfJs.isHTMLElement(offsetParent);
    var offsetParentIsScaled = _instanceOfJs.isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = _getDocumentElementJsDefault.default(offsetParent);
    var rect = _getBoundingClientRectJsDefault.default(elementOrVirtualElement, offsetParentIsScaled);
    var scroll = {
        scrollLeft: 0,
        scrollTop: 0
    };
    var offsets = {
        x: 0,
        y: 0
    };
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (_getNodeNameJsDefault.default(offsetParent) !== 'body' || _isScrollParentJsDefault.default(documentElement)) scroll = _getNodeScrollJsDefault.default(offsetParent);
        if (_instanceOfJs.isHTMLElement(offsetParent)) {
            offsets = _getBoundingClientRectJsDefault.default(offsetParent, true);
            offsets.x += offsetParent.clientLeft;
            offsets.y += offsetParent.clientTop;
        } else if (documentElement) offsets.x = _getWindowScrollBarXJsDefault.default(documentElement);
    }
    return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
    };
}
exports.default = getCompositeRect;

},{"./getBoundingClientRect.js":"9CFSQ","./getNodeScroll.js":"bBjCr","./getNodeName.js":"a2Qom","./instanceOf.js":"gYFUC","./getWindowScrollBarX.js":"sz4Ld","./getDocumentElement.js":"eJ9Y1","./isScrollParent.js":"9rLGO","../utils/math.js":"gQqVe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9CFSQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _instanceOfJs = require("./instanceOf.js");
var _mathJs = require("../utils/math.js");
function getBoundingClientRect(element, includeScale) {
    if (includeScale === void 0) includeScale = false;
    var rect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;
    if (_instanceOfJs.isHTMLElement(element) && includeScale) {
        var offsetHeight = element.offsetHeight;
        var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
        // Fallback to 1 in case both values are `0`
        if (offsetWidth > 0) scaleX = _mathJs.round(rect.width) / offsetWidth || 1;
        if (offsetHeight > 0) scaleY = _mathJs.round(rect.height) / offsetHeight || 1;
    }
    return {
        width: rect.width / scaleX,
        height: rect.height / scaleY,
        top: rect.top / scaleY,
        right: rect.right / scaleX,
        bottom: rect.bottom / scaleY,
        left: rect.left / scaleX,
        x: rect.left / scaleX,
        y: rect.top / scaleY
    };
}
exports.default = getBoundingClientRect;

},{"./instanceOf.js":"gYFUC","../utils/math.js":"gQqVe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gYFUC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isElement", ()=>isElement
);
parcelHelpers.export(exports, "isHTMLElement", ()=>isHTMLElement
);
parcelHelpers.export(exports, "isShadowRoot", ()=>isShadowRoot
);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
function isElement(node) {
    var OwnElement = _getWindowJsDefault.default(node).Element;
    return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
    var OwnElement = _getWindowJsDefault.default(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') return false;
    var OwnElement = _getWindowJsDefault.default(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
}

},{"./getWindow.js":"2SkOo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2SkOo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getWindow(node) {
    if (node == null) return window;
    if (node.toString() !== '[object Window]') {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
    }
    return node;
}
exports.default = getWindow;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gQqVe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "max", ()=>max
);
parcelHelpers.export(exports, "min", ()=>min
);
parcelHelpers.export(exports, "round", ()=>round
);
var max = Math.max;
var min = Math.min;
var round = Math.round;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bBjCr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getWindowScrollJs = require("./getWindowScroll.js");
var _getWindowScrollJsDefault = parcelHelpers.interopDefault(_getWindowScrollJs);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
var _instanceOfJs = require("./instanceOf.js");
var _getHTMLElementScrollJs = require("./getHTMLElementScroll.js");
var _getHTMLElementScrollJsDefault = parcelHelpers.interopDefault(_getHTMLElementScrollJs);
function getNodeScroll(node) {
    if (node === _getWindowJsDefault.default(node) || !_instanceOfJs.isHTMLElement(node)) return _getWindowScrollJsDefault.default(node);
    else return _getHTMLElementScrollJsDefault.default(node);
}
exports.default = getNodeScroll;

},{"./getWindowScroll.js":"1XUtN","./getWindow.js":"2SkOo","./instanceOf.js":"gYFUC","./getHTMLElementScroll.js":"6pwY2","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1XUtN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
function getWindowScroll(node) {
    var win = _getWindowJsDefault.default(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
    };
}
exports.default = getWindowScroll;

},{"./getWindow.js":"2SkOo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6pwY2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getHTMLElementScroll(element) {
    return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
    };
}
exports.default = getHTMLElementScroll;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a2Qom":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
}
exports.default = getNodeName;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"sz4Ld":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getBoundingClientRectJs = require("./getBoundingClientRect.js");
var _getBoundingClientRectJsDefault = parcelHelpers.interopDefault(_getBoundingClientRectJs);
var _getDocumentElementJs = require("./getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _getWindowScrollJs = require("./getWindowScroll.js");
var _getWindowScrollJsDefault = parcelHelpers.interopDefault(_getWindowScrollJs);
function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return _getBoundingClientRectJsDefault.default(_getDocumentElementJsDefault.default(element)).left + _getWindowScrollJsDefault.default(element).scrollLeft;
}
exports.default = getWindowScrollBarX;

},{"./getBoundingClientRect.js":"9CFSQ","./getDocumentElement.js":"eJ9Y1","./getWindowScroll.js":"1XUtN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eJ9Y1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _instanceOfJs = require("./instanceOf.js");
function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((_instanceOfJs.isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
exports.default = getDocumentElement;

},{"./instanceOf.js":"gYFUC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9rLGO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getComputedStyleJs = require("./getComputedStyle.js");
var _getComputedStyleJsDefault = parcelHelpers.interopDefault(_getComputedStyleJs);
function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = _getComputedStyleJsDefault.default(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
exports.default = isScrollParent;

},{"./getComputedStyle.js":"3mZjB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3mZjB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
function getComputedStyle(element) {
    return _getWindowJsDefault.default(element).getComputedStyle(element);
}
exports.default = getComputedStyle;

},{"./getWindow.js":"2SkOo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jvjuf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getBoundingClientRectJs = require("./getBoundingClientRect.js"); // Returns the layout rect of an element relative to its offsetParent. Layout
var _getBoundingClientRectJsDefault = parcelHelpers.interopDefault(_getBoundingClientRectJs);
function getLayoutRect(element) {
    var clientRect = _getBoundingClientRectJsDefault.default(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    if (Math.abs(clientRect.width - width) <= 1) width = clientRect.width;
    if (Math.abs(clientRect.height - height) <= 1) height = clientRect.height;
    return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: width,
        height: height
    };
}
exports.default = getLayoutRect;

},{"./getBoundingClientRect.js":"9CFSQ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2di3T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getScrollParentJs = require("./getScrollParent.js");
var _getScrollParentJsDefault = parcelHelpers.interopDefault(_getScrollParentJs);
var _getParentNodeJs = require("./getParentNode.js");
var _getParentNodeJsDefault = parcelHelpers.interopDefault(_getParentNodeJs);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
var _isScrollParentJs = require("./isScrollParent.js");
var _isScrollParentJsDefault = parcelHelpers.interopDefault(_isScrollParentJs);
function listScrollParents(element, list) {
    var _element$ownerDocumen;
    if (list === void 0) list = [];
    var scrollParent = _getScrollParentJsDefault.default(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = _getWindowJsDefault.default(scrollParent);
    var target = isBody ? [
        win
    ].concat(win.visualViewport || [], _isScrollParentJsDefault.default(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : updatedList.concat(listScrollParents(_getParentNodeJsDefault.default(target)));
}
exports.default = listScrollParents;

},{"./getScrollParent.js":"jy4ZS","./getParentNode.js":"bIHpd","./getWindow.js":"2SkOo","./isScrollParent.js":"9rLGO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jy4ZS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getParentNodeJs = require("./getParentNode.js");
var _getParentNodeJsDefault = parcelHelpers.interopDefault(_getParentNodeJs);
var _isScrollParentJs = require("./isScrollParent.js");
var _isScrollParentJsDefault = parcelHelpers.interopDefault(_isScrollParentJs);
var _getNodeNameJs = require("./getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
var _instanceOfJs = require("./instanceOf.js");
function getScrollParent(node) {
    if ([
        'html',
        'body',
        '#document'
    ].indexOf(_getNodeNameJsDefault.default(node)) >= 0) // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
    if (_instanceOfJs.isHTMLElement(node) && _isScrollParentJsDefault.default(node)) return node;
    return getScrollParent(_getParentNodeJsDefault.default(node));
}
exports.default = getScrollParent;

},{"./getParentNode.js":"bIHpd","./isScrollParent.js":"9rLGO","./getNodeName.js":"a2Qom","./instanceOf.js":"gYFUC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bIHpd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getNodeNameJs = require("./getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
var _getDocumentElementJs = require("./getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _instanceOfJs = require("./instanceOf.js");
function getParentNode(element) {
    if (_getNodeNameJsDefault.default(element) === 'html') return element;
    return(// $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || element.parentNode || (_instanceOfJs.isShadowRoot(element) ? element.host : null) || // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    _getDocumentElementJsDefault.default(element) // fallback
    );
}
exports.default = getParentNode;

},{"./getNodeName.js":"a2Qom","./getDocumentElement.js":"eJ9Y1","./instanceOf.js":"gYFUC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"laoYw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
var _getNodeNameJs = require("./getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
var _getComputedStyleJs = require("./getComputedStyle.js");
var _getComputedStyleJsDefault = parcelHelpers.interopDefault(_getComputedStyleJs);
var _instanceOfJs = require("./instanceOf.js");
var _isTableElementJs = require("./isTableElement.js");
var _isTableElementJsDefault = parcelHelpers.interopDefault(_isTableElementJs);
var _getParentNodeJs = require("./getParentNode.js");
var _getParentNodeJsDefault = parcelHelpers.interopDefault(_getParentNodeJs);
function getTrueOffsetParent(element) {
    if (!_instanceOfJs.isHTMLElement(element) || _getComputedStyleJsDefault.default(element).position === 'fixed') return null;
    return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block
function getContainingBlock(element) {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
    var isIE = navigator.userAgent.indexOf('Trident') !== -1;
    if (isIE && _instanceOfJs.isHTMLElement(element)) {
        // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
        var elementCss = _getComputedStyleJsDefault.default(element);
        if (elementCss.position === 'fixed') return null;
    }
    var currentNode = _getParentNodeJsDefault.default(element);
    if (_instanceOfJs.isShadowRoot(currentNode)) currentNode = currentNode.host;
    while(_instanceOfJs.isHTMLElement(currentNode) && [
        'html',
        'body'
    ].indexOf(_getNodeNameJsDefault.default(currentNode)) < 0){
        var css = _getComputedStyleJsDefault.default(currentNode); // This is non-exhaustive but covers the most common CSS properties that
        // create a containing block.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
        if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || [
            'transform',
            'perspective'
        ].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') return currentNode;
        else currentNode = currentNode.parentNode;
    }
    return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
function getOffsetParent(element) {
    var window = _getWindowJsDefault.default(element);
    var offsetParent = getTrueOffsetParent(element);
    while(offsetParent && _isTableElementJsDefault.default(offsetParent) && _getComputedStyleJsDefault.default(offsetParent).position === 'static')offsetParent = getTrueOffsetParent(offsetParent);
    if (offsetParent && (_getNodeNameJsDefault.default(offsetParent) === 'html' || _getNodeNameJsDefault.default(offsetParent) === 'body' && _getComputedStyleJsDefault.default(offsetParent).position === 'static')) return window;
    return offsetParent || getContainingBlock(element) || window;
}
exports.default = getOffsetParent;

},{"./getWindow.js":"2SkOo","./getNodeName.js":"a2Qom","./getComputedStyle.js":"3mZjB","./instanceOf.js":"gYFUC","./isTableElement.js":"2qBb7","./getParentNode.js":"bIHpd","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2qBb7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getNodeNameJs = require("./getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
function isTableElement(element) {
    return [
        'table',
        'td',
        'th'
    ].indexOf(_getNodeNameJsDefault.default(element)) >= 0;
}
exports.default = isTableElement;

},{"./getNodeName.js":"a2Qom","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"N0VO0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _enumsJs = require("../enums.js"); // source: https://stackoverflow.com/questions/49875255
function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function(modifier) {
        map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively
    function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function(dep) {
            if (!visited.has(dep)) {
                var depModifier = map.get(dep);
                if (depModifier) sort(depModifier);
            }
        });
        result.push(modifier);
    }
    modifiers.forEach(function(modifier) {
        if (!visited.has(modifier.name)) // check for visited object
        sort(modifier);
    });
    return result;
}
function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase
    return _enumsJs.modifierPhases.reduce(function(acc, phase) {
        return acc.concat(orderedModifiers.filter(function(modifier) {
            return modifier.phase === phase;
        }));
    }, []);
}
exports.default = orderModifiers;

},{"../enums.js":"lCAq5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lCAq5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "top", ()=>top
);
parcelHelpers.export(exports, "bottom", ()=>bottom
);
parcelHelpers.export(exports, "right", ()=>right
);
parcelHelpers.export(exports, "left", ()=>left
);
parcelHelpers.export(exports, "auto", ()=>auto
);
parcelHelpers.export(exports, "basePlacements", ()=>basePlacements
);
parcelHelpers.export(exports, "start", ()=>start
);
parcelHelpers.export(exports, "end", ()=>end
);
parcelHelpers.export(exports, "clippingParents", ()=>clippingParents
);
parcelHelpers.export(exports, "viewport", ()=>viewport
);
parcelHelpers.export(exports, "popper", ()=>popper
);
parcelHelpers.export(exports, "reference", ()=>reference
);
parcelHelpers.export(exports, "variationPlacements", ()=>variationPlacements
);
parcelHelpers.export(exports, "placements", ()=>placements
);
parcelHelpers.export(exports, "beforeRead", ()=>beforeRead
);
parcelHelpers.export(exports, "read", ()=>read
);
parcelHelpers.export(exports, "afterRead", ()=>afterRead
);
parcelHelpers.export(exports, "beforeMain", ()=>beforeMain
);
parcelHelpers.export(exports, "main", ()=>main
);
parcelHelpers.export(exports, "afterMain", ()=>afterMain
);
parcelHelpers.export(exports, "beforeWrite", ()=>beforeWrite
);
parcelHelpers.export(exports, "write", ()=>write
);
parcelHelpers.export(exports, "afterWrite", ()=>afterWrite
);
parcelHelpers.export(exports, "modifierPhases", ()=>modifierPhases
);
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [
    top,
    bottom,
    right,
    left
];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/ basePlacements.reduce(function(acc, placement) {
    return acc.concat([
        placement + "-" + start,
        placement + "-" + end
    ]);
}, []);
var placements = /*#__PURE__*/ [].concat(basePlacements, [
    auto
]).reduce(function(acc, placement) {
    return acc.concat([
        placement,
        placement + "-" + start,
        placement + "-" + end
    ]);
}, []); // modifiers that need to read the DOM
var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers
var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)
var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [
    beforeRead,
    read,
    afterRead,
    beforeMain,
    main,
    afterMain,
    beforeWrite,
    write,
    afterWrite
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g6Chr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function debounce(fn) {
    var pending;
    return function() {
        if (!pending) pending = new Promise(function(resolve) {
            Promise.resolve().then(function() {
                pending = undefined;
                resolve(fn());
            });
        });
        return pending;
    };
}
exports.default = debounce;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1S5dQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _formatJs = require("./format.js");
var _formatJsDefault = parcelHelpers.interopDefault(_formatJs);
var _enumsJs = require("../enums.js");
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = [
    'name',
    'enabled',
    'phase',
    'fn',
    'effect',
    'requires',
    'options'
];
function validateModifiers(modifiers) {
    modifiers.forEach(function(modifier) {
        [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
        .filter(function(value, index, self) {
            return self.indexOf(value) === index;
        }).forEach(function(key) {
            switch(key){
                case 'name':
                    if (typeof modifier.name !== 'string') console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
                    break;
                case 'enabled':
                    if (typeof modifier.enabled !== 'boolean') console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
                    break;
                case 'phase':
                    if (_enumsJs.modifierPhases.indexOf(modifier.phase) < 0) console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enumsJs.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
                    break;
                case 'fn':
                    if (typeof modifier.fn !== 'function') console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
                    break;
                case 'effect':
                    if (modifier.effect != null && typeof modifier.effect !== 'function') console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
                    break;
                case 'requires':
                    if (modifier.requires != null && !Array.isArray(modifier.requires)) console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
                    break;
                case 'requiresIfExists':
                    if (!Array.isArray(modifier.requiresIfExists)) console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
                    break;
                case 'options':
                case 'data':
                    break;
                default:
                    console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function(s) {
                        return "\"" + s + "\"";
                    }).join(', ') + "; but \"" + key + "\" was provided.");
            }
            modifier.requires && modifier.requires.forEach(function(requirement) {
                if (modifiers.find(function(mod) {
                    return mod.name === requirement;
                }) == null) console.error(_formatJsDefault.default(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
            });
        });
    });
}
exports.default = validateModifiers;

},{"./format.js":"baNIW","../enums.js":"lCAq5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"baNIW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function format(str) {
    for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)args[_key - 1] = arguments[_key];
    return [].concat(args).reduce(function(p, c) {
        return p.replace(/%s/, c);
    }, str);
}
exports.default = format;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hhl2M":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function uniqueBy(arr, fn) {
    var identifiers = new Set();
    return arr.filter(function(item) {
        var identifier = fn(item);
        if (!identifiers.has(identifier)) {
            identifiers.add(identifier);
            return true;
        }
    });
}
exports.default = uniqueBy;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"59Wp3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _enumsJs = require("../enums.js");
function getBasePlacement(placement) {
    return placement.split('-')[0];
}
exports.default = getBasePlacement;

},{"../enums.js":"lCAq5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2zTVN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function mergeByName(modifiers) {
    var merged1 = modifiers.reduce(function(merged, current) {
        var existing = merged[current.name];
        merged[current.name] = existing ? Object.assign({
        }, existing, current, {
            options: Object.assign({
            }, existing.options, current.options),
            data: Object.assign({
            }, existing.data, current.data)
        }) : current;
        return merged;
    }, {
    }); // IE11 does not support Object.values
    return Object.keys(merged1).map(function(key) {
        return merged1[key];
    });
}
exports.default = mergeByName;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ltCuw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getClippingRectJs = require("../dom-utils/getClippingRect.js");
var _getClippingRectJsDefault = parcelHelpers.interopDefault(_getClippingRectJs);
var _getDocumentElementJs = require("../dom-utils/getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _getBoundingClientRectJs = require("../dom-utils/getBoundingClientRect.js");
var _getBoundingClientRectJsDefault = parcelHelpers.interopDefault(_getBoundingClientRectJs);
var _computeOffsetsJs = require("./computeOffsets.js");
var _computeOffsetsJsDefault = parcelHelpers.interopDefault(_computeOffsetsJs);
var _rectToClientRectJs = require("./rectToClientRect.js");
var _rectToClientRectJsDefault = parcelHelpers.interopDefault(_rectToClientRectJs);
var _enumsJs = require("../enums.js");
var _instanceOfJs = require("../dom-utils/instanceOf.js");
var _mergePaddingObjectJs = require("./mergePaddingObject.js");
var _mergePaddingObjectJsDefault = parcelHelpers.interopDefault(_mergePaddingObjectJs);
var _expandToHashMapJs = require("./expandToHashMap.js"); // eslint-disable-next-line import/no-unused-modules
var _expandToHashMapJsDefault = parcelHelpers.interopDefault(_expandToHashMapJs);
function detectOverflow(state, options) {
    if (options === void 0) options = {
    };
    var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? _enumsJs.clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? _enumsJs.viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? _enumsJs.popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = _mergePaddingObjectJsDefault.default(typeof padding !== 'number' ? padding : _expandToHashMapJsDefault.default(padding, _enumsJs.basePlacements));
    var altContext = elementContext === _enumsJs.popper ? _enumsJs.reference : _enumsJs.popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = _getClippingRectJsDefault.default(_instanceOfJs.isElement(element) ? element : element.contextElement || _getDocumentElementJsDefault.default(state.elements.popper), boundary, rootBoundary);
    var referenceClientRect = _getBoundingClientRectJsDefault.default(state.elements.reference);
    var popperOffsets = _computeOffsetsJsDefault.default({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement: placement
    });
    var popperClientRect = _rectToClientRectJsDefault.default(Object.assign({
    }, popperRect, popperOffsets));
    var elementClientRect = elementContext === _enumsJs.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect
    var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element
    if (elementContext === _enumsJs.popper && offsetData) {
        var offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function(key) {
            var multiply = [
                _enumsJs.right,
                _enumsJs.bottom
            ].indexOf(key) >= 0 ? 1 : -1;
            var axis = [
                _enumsJs.top,
                _enumsJs.bottom
            ].indexOf(key) >= 0 ? 'y' : 'x';
            overflowOffsets[key] += offset[axis] * multiply;
        });
    }
    return overflowOffsets;
}
exports.default = detectOverflow;

},{"../dom-utils/getClippingRect.js":"eeg2s","../dom-utils/getDocumentElement.js":"eJ9Y1","../dom-utils/getBoundingClientRect.js":"9CFSQ","./computeOffsets.js":"7jtXk","./rectToClientRect.js":"cQ3tg","../enums.js":"lCAq5","../dom-utils/instanceOf.js":"gYFUC","./mergePaddingObject.js":"lEIf9","./expandToHashMap.js":"iQlH5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eeg2s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _enumsJs = require("../enums.js");
var _getViewportRectJs = require("./getViewportRect.js");
var _getViewportRectJsDefault = parcelHelpers.interopDefault(_getViewportRectJs);
var _getDocumentRectJs = require("./getDocumentRect.js");
var _getDocumentRectJsDefault = parcelHelpers.interopDefault(_getDocumentRectJs);
var _listScrollParentsJs = require("./listScrollParents.js");
var _listScrollParentsJsDefault = parcelHelpers.interopDefault(_listScrollParentsJs);
var _getOffsetParentJs = require("./getOffsetParent.js");
var _getOffsetParentJsDefault = parcelHelpers.interopDefault(_getOffsetParentJs);
var _getDocumentElementJs = require("./getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _getComputedStyleJs = require("./getComputedStyle.js");
var _getComputedStyleJsDefault = parcelHelpers.interopDefault(_getComputedStyleJs);
var _instanceOfJs = require("./instanceOf.js");
var _getBoundingClientRectJs = require("./getBoundingClientRect.js");
var _getBoundingClientRectJsDefault = parcelHelpers.interopDefault(_getBoundingClientRectJs);
var _getParentNodeJs = require("./getParentNode.js");
var _getParentNodeJsDefault = parcelHelpers.interopDefault(_getParentNodeJs);
var _containsJs = require("./contains.js");
var _containsJsDefault = parcelHelpers.interopDefault(_containsJs);
var _getNodeNameJs = require("./getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
var _rectToClientRectJs = require("../utils/rectToClientRect.js");
var _rectToClientRectJsDefault = parcelHelpers.interopDefault(_rectToClientRectJs);
var _mathJs = require("../utils/math.js");
function getInnerBoundingClientRect(element) {
    var rect = _getBoundingClientRectJsDefault.default(element);
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
    return clippingParent === _enumsJs.viewport ? _rectToClientRectJsDefault.default(_getViewportRectJsDefault.default(element)) : _instanceOfJs.isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : _rectToClientRectJsDefault.default(_getDocumentRectJsDefault.default(_getDocumentElementJsDefault.default(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`
function getClippingParents(element) {
    var clippingParents = _listScrollParentsJsDefault.default(_getParentNodeJsDefault.default(element));
    var canEscapeClipping = [
        'absolute',
        'fixed'
    ].indexOf(_getComputedStyleJsDefault.default(element).position) >= 0;
    var clipperElement = canEscapeClipping && _instanceOfJs.isHTMLElement(element) ? _getOffsetParentJsDefault.default(element) : element;
    if (!_instanceOfJs.isElement(clipperElement)) return [];
     // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414
    return clippingParents.filter(function(clippingParent) {
        return _instanceOfJs.isElement(clippingParent) && _containsJsDefault.default(clippingParent, clipperElement) && _getNodeNameJsDefault.default(clippingParent) !== 'body';
    });
} // Gets the maximum area that the element is visible in due to any number of
function getClippingRect(element, boundary, rootBoundary) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [
        rootBoundary
    ]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function(accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent);
        accRect.top = _mathJs.max(rect.top, accRect.top);
        accRect.right = _mathJs.min(rect.right, accRect.right);
        accRect.bottom = _mathJs.min(rect.bottom, accRect.bottom);
        accRect.left = _mathJs.max(rect.left, accRect.left);
        return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
}
exports.default = getClippingRect;

},{"../enums.js":"lCAq5","./getViewportRect.js":"cnH2G","./getDocumentRect.js":"d94SC","./listScrollParents.js":"2di3T","./getOffsetParent.js":"laoYw","./getDocumentElement.js":"eJ9Y1","./getComputedStyle.js":"3mZjB","./instanceOf.js":"gYFUC","./getBoundingClientRect.js":"9CFSQ","./getParentNode.js":"bIHpd","./contains.js":"4QxRR","./getNodeName.js":"a2Qom","../utils/rectToClientRect.js":"cQ3tg","../utils/math.js":"gQqVe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cnH2G":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
var _getDocumentElementJs = require("./getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _getWindowScrollBarXJs = require("./getWindowScrollBarX.js");
var _getWindowScrollBarXJsDefault = parcelHelpers.interopDefault(_getWindowScrollBarXJs);
function getViewportRect(element) {
    var win = _getWindowJsDefault.default(element);
    var html = _getDocumentElementJsDefault.default(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
    // can be obscured underneath it.
    // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
    // if it isn't open, so if this isn't available, the popper will be detected
    // to overflow the bottom of the screen too early.
    if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
        // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
        // errors due to floating point numbers, so we need to check precision.
        // Safari returns a number <= 0, usually < -1 when pinch-zoomed
        // Feature detection fails in mobile emulation mode in Chrome.
        // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
        // 0.001
        // Fallback here: "Not Safari" userAgent
        if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            x = visualViewport.offsetLeft;
            y = visualViewport.offsetTop;
        }
    }
    return {
        width: width,
        height: height,
        x: x + _getWindowScrollBarXJsDefault.default(element),
        y: y
    };
}
exports.default = getViewportRect;

},{"./getWindow.js":"2SkOo","./getDocumentElement.js":"eJ9Y1","./getWindowScrollBarX.js":"sz4Ld","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d94SC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getDocumentElementJs = require("./getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _getComputedStyleJs = require("./getComputedStyle.js");
var _getComputedStyleJsDefault = parcelHelpers.interopDefault(_getComputedStyleJs);
var _getWindowScrollBarXJs = require("./getWindowScrollBarX.js");
var _getWindowScrollBarXJsDefault = parcelHelpers.interopDefault(_getWindowScrollBarXJs);
var _getWindowScrollJs = require("./getWindowScroll.js");
var _getWindowScrollJsDefault = parcelHelpers.interopDefault(_getWindowScrollJs);
var _mathJs = require("../utils/math.js"); // Gets the entire size of the scrollable document area, even extending outside
function getDocumentRect(element) {
    var _element$ownerDocumen;
    var html = _getDocumentElementJsDefault.default(element);
    var winScroll = _getWindowScrollJsDefault.default(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = _mathJs.max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = _mathJs.max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + _getWindowScrollBarXJsDefault.default(element);
    var y = -winScroll.scrollTop;
    if (_getComputedStyleJsDefault.default(body || html).direction === 'rtl') x += _mathJs.max(html.clientWidth, body ? body.clientWidth : 0) - width;
    return {
        width: width,
        height: height,
        x: x,
        y: y
    };
}
exports.default = getDocumentRect;

},{"./getDocumentElement.js":"eJ9Y1","./getComputedStyle.js":"3mZjB","./getWindowScrollBarX.js":"sz4Ld","./getWindowScroll.js":"1XUtN","../utils/math.js":"gQqVe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4QxRR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _instanceOfJs = require("./instanceOf.js");
function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method
    if (parent.contains(child)) return true;
    else if (rootNode && _instanceOfJs.isShadowRoot(rootNode)) {
        var next = child;
        do {
            if (next && parent.isSameNode(next)) return true;
             // $FlowFixMe[prop-missing]: need a better way to handle this...
            next = next.parentNode || next.host;
        }while (next)
    } // Give up, the result is false
    return false;
}
exports.default = contains;

},{"./instanceOf.js":"gYFUC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cQ3tg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function rectToClientRect(rect) {
    return Object.assign({
    }, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
    });
}
exports.default = rectToClientRect;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7jtXk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getBasePlacementJs = require("./getBasePlacement.js");
var _getBasePlacementJsDefault = parcelHelpers.interopDefault(_getBasePlacementJs);
var _getVariationJs = require("./getVariation.js");
var _getVariationJsDefault = parcelHelpers.interopDefault(_getVariationJs);
var _getMainAxisFromPlacementJs = require("./getMainAxisFromPlacement.js");
var _getMainAxisFromPlacementJsDefault = parcelHelpers.interopDefault(_getMainAxisFromPlacementJs);
var _enumsJs = require("../enums.js");
function computeOffsets(_ref) {
    var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
    var basePlacement = placement ? _getBasePlacementJsDefault.default(placement) : null;
    var variation = placement ? _getVariationJsDefault.default(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;
    switch(basePlacement){
        case _enumsJs.top:
            offsets = {
                x: commonX,
                y: reference.y - element.height
            };
            break;
        case _enumsJs.bottom:
            offsets = {
                x: commonX,
                y: reference.y + reference.height
            };
            break;
        case _enumsJs.right:
            offsets = {
                x: reference.x + reference.width,
                y: commonY
            };
            break;
        case _enumsJs.left:
            offsets = {
                x: reference.x - element.width,
                y: commonY
            };
            break;
        default:
            offsets = {
                x: reference.x,
                y: reference.y
            };
    }
    var mainAxis = basePlacement ? _getMainAxisFromPlacementJsDefault.default(basePlacement) : null;
    if (mainAxis != null) {
        var len = mainAxis === 'y' ? 'height' : 'width';
        switch(variation){
            case _enumsJs.start:
                offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
                break;
            case _enumsJs.end:
                offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
                break;
            default:
        }
    }
    return offsets;
}
exports.default = computeOffsets;

},{"./getBasePlacement.js":"59Wp3","./getVariation.js":"hIo7Y","./getMainAxisFromPlacement.js":"1Xlom","../enums.js":"lCAq5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hIo7Y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getVariation(placement) {
    return placement.split('-')[1];
}
exports.default = getVariation;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1Xlom":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getMainAxisFromPlacement(placement) {
    return [
        'top',
        'bottom'
    ].indexOf(placement) >= 0 ? 'x' : 'y';
}
exports.default = getMainAxisFromPlacement;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lEIf9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getFreshSideObjectJs = require("./getFreshSideObject.js");
var _getFreshSideObjectJsDefault = parcelHelpers.interopDefault(_getFreshSideObjectJs);
function mergePaddingObject(paddingObject) {
    return Object.assign({
    }, _getFreshSideObjectJsDefault.default(), paddingObject);
}
exports.default = mergePaddingObject;

},{"./getFreshSideObject.js":"g4xOt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g4xOt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getFreshSideObject() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
}
exports.default = getFreshSideObject;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iQlH5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function expandToHashMap(value, keys) {
    return keys.reduce(function(hashMap, key) {
        hashMap[key] = value;
        return hashMap;
    }, {
    });
}
exports.default = expandToHashMap;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hBKsL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getWindowJs = require("../dom-utils/getWindow.js"); // eslint-disable-next-line import/no-unused-modules
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
var passive = {
    passive: true
};
function effect(_ref) {
    var state = _ref.state, instance = _ref.instance, options = _ref.options;
    var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
    var window = _getWindowJsDefault.default(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
    if (scroll) scrollParents.forEach(function(scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
    });
    if (resize) window.addEventListener('resize', instance.update, passive);
    return function() {
        if (scroll) scrollParents.forEach(function(scrollParent) {
            scrollParent.removeEventListener('scroll', instance.update, passive);
        });
        if (resize) window.removeEventListener('resize', instance.update, passive);
    };
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {
    },
    effect: effect,
    data: {
    }
};

},{"../dom-utils/getWindow.js":"2SkOo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6I679":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _computeOffsetsJs = require("../utils/computeOffsets.js");
var _computeOffsetsJsDefault = parcelHelpers.interopDefault(_computeOffsetsJs);
function popperOffsets(_ref) {
    var state = _ref.state, name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = _computeOffsetsJsDefault.default({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement
    });
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {
    }
};

},{"../utils/computeOffsets.js":"7jtXk","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gDlm2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "mapToStyles", ()=>mapToStyles
);
var _enumsJs = require("../enums.js");
var _getOffsetParentJs = require("../dom-utils/getOffsetParent.js");
var _getOffsetParentJsDefault = parcelHelpers.interopDefault(_getOffsetParentJs);
var _getWindowJs = require("../dom-utils/getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
var _getDocumentElementJs = require("../dom-utils/getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _getComputedStyleJs = require("../dom-utils/getComputedStyle.js");
var _getComputedStyleJsDefault = parcelHelpers.interopDefault(_getComputedStyleJs);
var _getBasePlacementJs = require("../utils/getBasePlacement.js");
var _getBasePlacementJsDefault = parcelHelpers.interopDefault(_getBasePlacementJs);
var _getVariationJs = require("../utils/getVariation.js");
var _getVariationJsDefault = parcelHelpers.interopDefault(_getVariationJs);
var _mathJs = require("../utils/math.js"); // eslint-disable-next-line import/no-unused-modules
var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.
function roundOffsetsByDPR(_ref) {
    var x = _ref.x, y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
        x: _mathJs.round(x * dpr) / dpr || 0,
        y: _mathJs.round(y * dpr) / dpr || 0
    };
}
function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
    var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
        x: x,
        y: y
    }) : {
        x: x,
        y: y
    };
    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = _enumsJs.left;
    var sideY = _enumsJs.top;
    var win = window;
    if (adaptive) {
        var offsetParent = _getOffsetParentJsDefault.default(popper);
        var heightProp = 'clientHeight';
        var widthProp = 'clientWidth';
        if (offsetParent === _getWindowJsDefault.default(popper)) {
            offsetParent = _getDocumentElementJsDefault.default(popper);
            if (_getComputedStyleJsDefault.default(offsetParent).position !== 'static' && position === 'absolute') {
                heightProp = 'scrollHeight';
                widthProp = 'scrollWidth';
            }
        } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it
        if (placement === _enumsJs.top || (placement === _enumsJs.left || placement === _enumsJs.right) && variation === _enumsJs.end) {
            sideY = _enumsJs.bottom;
            var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
            y -= offsetY - popperRect.height;
            y *= gpuAcceleration ? 1 : -1;
        }
        if (placement === _enumsJs.left || (placement === _enumsJs.top || placement === _enumsJs.bottom) && variation === _enumsJs.end) {
            sideX = _enumsJs.right;
            var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
            x -= offsetX - popperRect.width;
            x *= gpuAcceleration ? 1 : -1;
        }
    }
    var commonStyles = Object.assign({
        position: position
    }, adaptive && unsetSides);
    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
        x: x,
        y: y
    }) : {
        x: x,
        y: y
    };
    x = _ref4.x;
    y = _ref4.y;
    if (gpuAcceleration) {
        var _Object$assign;
        return Object.assign({
        }, commonStyles, (_Object$assign = {
        }, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }
    return Object.assign({
    }, commonStyles, (_Object$assign2 = {
    }, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}
function computeStyles(_ref5) {
    var state = _ref5.state, options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var transitionProperty = _getComputedStyleJsDefault.default(state.elements.popper).transitionProperty || '';
    if (adaptive && [
        'transform',
        'top',
        'right',
        'bottom',
        'left'
    ].some(function(property) {
        return transitionProperty.indexOf(property) >= 0;
    })) console.warn([
        'Popper: Detected CSS transitions on at least one of the following',
        'CSS properties: "transform", "top", "right", "bottom", "left".',
        '\n\n',
        'Disable the "computeStyles" modifier\'s `adaptive` option to allow',
        'for smooth transitions, or remove these properties from the CSS',
        'transition declaration on the popper element if only transitioning',
        'opacity or background-color for example.',
        '\n\n',
        'We recommend using the popper element as a wrapper around an inner',
        'element that can have any CSS property transitioned for animations.'
    ].join(' '));
    var commonStyles = {
        placement: _getBasePlacementJsDefault.default(state.placement),
        variation: _getVariationJsDefault.default(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration: gpuAcceleration,
        isFixed: state.options.strategy === 'fixed'
    };
    if (state.modifiersData.popperOffsets != null) state.styles.popper = Object.assign({
    }, state.styles.popper, mapToStyles(Object.assign({
    }, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
    })));
    if (state.modifiersData.arrow != null) state.styles.arrow = Object.assign({
    }, state.styles.arrow, mapToStyles(Object.assign({
    }, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
    })));
    state.attributes.popper = Object.assign({
    }, state.attributes.popper, {
        'data-popper-placement': state.placement
    });
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {
    }
};

},{"../enums.js":"lCAq5","../dom-utils/getOffsetParent.js":"laoYw","../dom-utils/getWindow.js":"2SkOo","../dom-utils/getDocumentElement.js":"eJ9Y1","../dom-utils/getComputedStyle.js":"3mZjB","../utils/getBasePlacement.js":"59Wp3","../utils/getVariation.js":"hIo7Y","../utils/math.js":"gQqVe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4iMn4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getNodeNameJs = require("../dom-utils/getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
var _instanceOfJs = require("../dom-utils/instanceOf.js"); // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow
function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function(name1) {
        var style = state.styles[name1] || {
        };
        var attributes = state.attributes[name1] || {
        };
        var element = state.elements[name1]; // arrow is optional + virtual elements
        if (!_instanceOfJs.isHTMLElement(element) || !_getNodeNameJsDefault.default(element)) return;
         // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe[cannot-write]
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function(name) {
            var value = attributes[name];
            if (value === false) element.removeAttribute(name);
            else element.setAttribute(name, value === true ? '' : value);
        });
    });
}
function effect(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
        popper: {
            position: state.options.strategy,
            left: '0',
            top: '0',
            margin: '0'
        },
        arrow: {
            position: 'absolute'
        },
        reference: {
        }
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
    return function() {
        Object.keys(state.elements).forEach(function(name) {
            var element = state.elements[name];
            var attributes = state.attributes[name] || {
            };
            var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them
            var style1 = styleProperties.reduce(function(style, property) {
                style[property] = '';
                return style;
            }, {
            }); // arrow is optional + virtual elements
            if (!_instanceOfJs.isHTMLElement(element) || !_getNodeNameJsDefault.default(element)) return;
            Object.assign(element.style, style1);
            Object.keys(attributes).forEach(function(attribute) {
                element.removeAttribute(attribute);
            });
        });
    };
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect,
    requires: [
        'computeStyles'
    ]
};

},{"../dom-utils/getNodeName.js":"a2Qom","../dom-utils/instanceOf.js":"gYFUC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fv5wq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getOppositePlacementJs = require("../utils/getOppositePlacement.js");
var _getOppositePlacementJsDefault = parcelHelpers.interopDefault(_getOppositePlacementJs);
var _getBasePlacementJs = require("../utils/getBasePlacement.js");
var _getBasePlacementJsDefault = parcelHelpers.interopDefault(_getBasePlacementJs);
var _getOppositeVariationPlacementJs = require("../utils/getOppositeVariationPlacement.js");
var _getOppositeVariationPlacementJsDefault = parcelHelpers.interopDefault(_getOppositeVariationPlacementJs);
var _detectOverflowJs = require("../utils/detectOverflow.js");
var _detectOverflowJsDefault = parcelHelpers.interopDefault(_detectOverflowJs);
var _computeAutoPlacementJs = require("../utils/computeAutoPlacement.js");
var _computeAutoPlacementJsDefault = parcelHelpers.interopDefault(_computeAutoPlacementJs);
var _enumsJs = require("../enums.js");
var _getVariationJs = require("../utils/getVariation.js"); // eslint-disable-next-line import/no-unused-modules
var _getVariationJsDefault = parcelHelpers.interopDefault(_getVariationJs);
function getExpandedFallbackPlacements(placement) {
    if (_getBasePlacementJsDefault.default(placement) === _enumsJs.auto) return [];
    var oppositePlacement = _getOppositePlacementJsDefault.default(placement);
    return [
        _getOppositeVariationPlacementJsDefault.default(placement),
        oppositePlacement,
        _getOppositeVariationPlacementJsDefault.default(oppositePlacement)
    ];
}
function flip(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    if (state.modifiersData[name]._skip) return;
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = _getBasePlacementJsDefault.default(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [
        _getOppositePlacementJsDefault.default(preferredPlacement)
    ] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [
        preferredPlacement
    ].concat(fallbackPlacements).reduce(function(acc, placement) {
        return acc.concat(_getBasePlacementJsDefault.default(placement) === _enumsJs.auto ? _computeAutoPlacementJsDefault.default(state, {
            placement: placement,
            boundary: boundary,
            rootBoundary: rootBoundary,
            padding: padding,
            flipVariations: flipVariations,
            allowedAutoPlacements: allowedAutoPlacements
        }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];
    for(var i = 0; i < placements.length; i++){
        var placement1 = placements[i];
        var _basePlacement = _getBasePlacementJsDefault.default(placement1);
        var isStartVariation = _getVariationJsDefault.default(placement1) === _enumsJs.start;
        var isVertical = [
            _enumsJs.top,
            _enumsJs.bottom
        ].indexOf(_basePlacement) >= 0;
        var len = isVertical ? 'width' : 'height';
        var overflow = _detectOverflowJsDefault.default(state, {
            placement: placement1,
            boundary: boundary,
            rootBoundary: rootBoundary,
            altBoundary: altBoundary,
            padding: padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? _enumsJs.right : _enumsJs.left : isStartVariation ? _enumsJs.bottom : _enumsJs.top;
        if (referenceRect[len] > popperRect[len]) mainVariationSide = _getOppositePlacementJsDefault.default(mainVariationSide);
        var altVariationSide = _getOppositePlacementJsDefault.default(mainVariationSide);
        var checks = [];
        if (checkMainAxis) checks.push(overflow[_basePlacement] <= 0);
        if (checkAltAxis) checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        if (checks.every(function(check) {
            return check;
        })) {
            firstFittingPlacement = placement1;
            makeFallbackChecks = false;
            break;
        }
        checksMap.set(placement1, checks);
    }
    if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        var numberOfChecks = flipVariations ? 3 : 1;
        var _loop = function _loop(_i) {
            var fittingPlacement = placements.find(function(placement) {
                var checks = checksMap.get(placement);
                if (checks) return checks.slice(0, _i).every(function(check) {
                    return check;
                });
            });
            if (fittingPlacement) {
                firstFittingPlacement = fittingPlacement;
                return "break";
            }
        };
        for(var _i1 = numberOfChecks; _i1 > 0; _i1--){
            var _ret = _loop(_i1);
            if (_ret === "break") break;
        }
    }
    if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
    }
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: [
        'offset'
    ],
    data: {
        _skip: false
    }
};

},{"../utils/getOppositePlacement.js":"a8CY0","../utils/getBasePlacement.js":"59Wp3","../utils/getOppositeVariationPlacement.js":"bKTLC","../utils/detectOverflow.js":"ltCuw","../utils/computeAutoPlacement.js":"gytMj","../enums.js":"lCAq5","../utils/getVariation.js":"hIo7Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a8CY0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
};
function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function(matched) {
        return hash[matched];
    });
}
exports.default = getOppositePlacement;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bKTLC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var hash = {
    start: 'end',
    end: 'start'
};
function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function(matched) {
        return hash[matched];
    });
}
exports.default = getOppositeVariationPlacement;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gytMj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getVariationJs = require("./getVariation.js");
var _getVariationJsDefault = parcelHelpers.interopDefault(_getVariationJs);
var _enumsJs = require("../enums.js");
var _detectOverflowJs = require("./detectOverflow.js");
var _detectOverflowJsDefault = parcelHelpers.interopDefault(_detectOverflowJs);
var _getBasePlacementJs = require("./getBasePlacement.js");
var _getBasePlacementJsDefault = parcelHelpers.interopDefault(_getBasePlacementJs);
function computeAutoPlacement(state, options) {
    if (options === void 0) options = {
    };
    var _options = options, placement1 = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enumsJs.placements : _options$allowedAutoP;
    var variation = _getVariationJsDefault.default(placement1);
    var placements = variation ? flipVariations ? _enumsJs.variationPlacements : _enumsJs.variationPlacements.filter(function(placement) {
        return _getVariationJsDefault.default(placement) === variation;
    }) : _enumsJs.basePlacements;
    var allowedPlacements = placements.filter(function(placement) {
        return allowedAutoPlacements.indexOf(placement) >= 0;
    });
    if (allowedPlacements.length === 0) {
        allowedPlacements = placements;
        console.error([
            'Popper: The `allowedAutoPlacements` option did not allow any',
            'placements. Ensure the `placement` option matches the variation',
            'of the allowed placements.',
            'For example, "auto" cannot be used to allow "bottom-start".',
            'Use "auto-start" instead.'
        ].join(' '));
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...
    var overflows = allowedPlacements.reduce(function(acc, placement) {
        acc[placement] = _detectOverflowJsDefault.default(state, {
            placement: placement,
            boundary: boundary,
            rootBoundary: rootBoundary,
            padding: padding
        })[_getBasePlacementJsDefault.default(placement)];
        return acc;
    }, {
    });
    return Object.keys(overflows).sort(function(a, b) {
        return overflows[a] - overflows[b];
    });
}
exports.default = computeAutoPlacement;

},{"./getVariation.js":"hIo7Y","../enums.js":"lCAq5","./detectOverflow.js":"ltCuw","./getBasePlacement.js":"59Wp3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2J0f1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ROV_PEERID_BASE", ()=>ROV_PEERID_BASE
);
parcelHelpers.export(exports, "peerServerCloudOptions", ()=>peerServerCloudOptions
);
parcelHelpers.export(exports, "peerServerLocalOptions", ()=>peerServerLocalOptions
);
parcelHelpers.export(exports, "GAME_CONTROLLER_BUTTON_CONFIG", ()=>GAME_CONTROLLER_BUTTON_CONFIG
);
parcelHelpers.export(exports, "ONSCREEN_GPAD_BUTTON_LABELS", ()=>ONSCREEN_GPAD_BUTTON_LABELS
);
parcelHelpers.export(exports, "ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS", ()=>ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS
);
parcelHelpers.export(exports, "ONSCREEN_GPAD_BUTTON_PRESSED_CLASS", ()=>ONSCREEN_GPAD_BUTTON_PRESSED_CLASS
);
const ROV_PEERID_BASE = "iROV-";
const peerServerCloudOptions = {
    host: '0.peerjs.com',
    secure: true,
    path: '/',
    port: 443
};
const peerServerLocalOptions = {
    host: 'raspberrypi.local',
    path: '/',
    secure: false,
    port: 9000
};
const GAME_CONTROLLER_BUTTON_CONFIG = [
    {
        btnName: "button_1",
        remoteAction: 'lights',
        helpLabel: "Lights"
    },
    {
        btnName: "button_2",
        remoteAction: 'record',
        helpLabel: "Start/Stop Recording"
    },
    {
        btnName: "button_3",
        remoteAction: 'photo',
        helpLabel: "Take Phtoto"
    },
    {
        btnName: "button_4",
        remoteAction: null,
        helpLabel: "Nothing"
    },
    {
        btnName: "shoulder_btn_front_left",
        remoteAction: null,
        localAction: null,
        helpLabel: "Nothing"
    },
    {
        btnName: "shoulder_btn_front_right",
        remoteAction: 'claw_open',
        helpLabel: "TODO: Open Claw",
        holdAllowed: true
    },
    {
        btnName: "shoulder_trigger_back_left",
        remoteAction: null,
        helpLabel: "Nothing"
    },
    {
        btnName: "shoulder_trigger_back_right",
        remoteAction: 'claw_close',
        helpLabel: "TODO: Close Claw",
        holdAllowed: true
    },
    {
        btnName: "select",
        remoteAction: null,
        helpLabel: "Show/Hide Gamepad Help"
    },
    {
        btnName: "start",
        remoteAction: null,
        helpLabel: "Show/Hide Gamepad Help"
    },
    {
        btnName: "stick_button_left",
        remoteAction: null,
        helpLabel: "Lock Vertical Thruster"
    },
    {
        btnName: "stick_button_right",
        remoteAction: null,
        helpLabel: "Lock Horizontal"
    },
    {
        btnName: "d_pad_up",
        remoteAction: 'exposure_plus',
        helpLabel: "Increase Camera Brightness",
        holdAllowed: true
    },
    {
        btnName: "d_pad_down",
        remoteAction: 'exposure_minus',
        helpLabel: "Decreases Camera Brightness",
        holdAllowed: true
    },
    {
        btnName: "d_pad_left",
        remoteAction: 'v_quality_plus',
        helpLabel: "Decrease Video Quality (reduces latency)",
        holdAllowed: true
    },
    {
        btnName: "d_pad_right",
        remoteAction: 'v_quality_minus',
        helpLabel: "Increase Video Quality (increases latency)",
        holdAllowed: true
    },
    {
        btnName: "vendor",
        remoteAction: null,
        helpLabel: "Nothing"
    }
];
const ONSCREEN_GPAD_BUTTON_LABELS = [
    "button_1",
    "button_2",
    "button_3",
    "button_4",
    "shoulder_btn_front_left",
    "shoulder_btn_front_right",
    "shoulder_trigger_back_left",
    "shoulder_trigger_back_right",
    "select",
    "start",
    "stick_button_left",
    "stick_button_right",
    "d_pad_up",
    "d_pad_down",
    "d_pad_left",
    "d_pad_right"
];
const ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS = "touched", ONSCREEN_GPAD_BUTTON_PRESSED_CLASS = "pressed"; //     'A': { remoteAction: 'photo', desc: 'Take Photo' },
 //     'B': { remoteAction: 'record', desc: 'Start/Stop Recording' },
 //     'X': { remoteAction: null, desc: 'TBD' },
 //     'Y': { remoteAction: null, desc: 'TBD' },
 //     'L1': { remoteAction: 'clawOpen', mode: "btn_hold_allowed", desc: 'Open Claw' },
 //     'R1': { remoteAction: 'clawOpen', mode: "btn_hold_allowed", desc: 'Open Claw' },
 //     'L2': { remoteAction: 'clawClose', mode: "btn_hold_allowed", desc: 'Close Claw' },
 //     'R2': { remoteAction: 'clawClose', mode: "btn_hold_allowed", desc: 'Close Claw' },
 //     'SELECT': { remoteAction: 'bitrate-', mode: "btn_hold_allowed", desc: 'TODO: Decrease Video Quality (lowers latency)' },
 //     'START': { remoteAction: 'bitrate+', mode: "btn_hold_allowed", desc: 'TODO: Increase Video Quality (adds latency)' },
 //     'dpadUp': { remoteAction: 'lights+', mode: "btn_hold_allowed", desc: 'TODO: Increase Intensity of Lights' },
 //     'dpadDown': { remoteAction: 'lights-', mode: "btn_hold_allowed", desc: 'TODO: Decrease Intensity of Lights' },
 //     'dpadLeft': { remoteAction: 'exposure-', mode: "btn_hold_allowed", desc: 'TODO: Dim Camera Exposure' },
 //     'dpadRight': { remoteAction: 'exposure+', mode: "btn_hold_allowed", desc: 'TODO: Brighten Camera Exposure' },
 // }

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jRoqP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Note: this file was written by me (Kyle), and is not a library found on the web.
parcelHelpers.export(exports, "GamepadInterface", ()=>GamepadInterface
);
class GamepadInterface {
    constructor(buttonConfig, updateDelay){
        this.updateDelay = updateDelay || 100;
        this.buttonConfig = buttonConfig;
        this.lastStateOfGamepads = [];
        this.changeMaskOfGamepads = [];
        this.gamepadConnectCallback = null;
        this.gamepadDisconnectCallback = null;
        this.gamepadButtonChangeCallback = null;
        this.gamepadAxisChangeCallback = null;
        this.extraGamepadMappings = [];
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        navigator.getGamepads = navigator.getGamepads || navigator.webkitGetGamepads || navigator.mozGetGamepads || navigator.msGetGamepads;
        if (this.gamepadApiSupported()) this.tickLoop();
    }
    gamepadApiSupported() {
        return !!navigator.getGamepads && !!navigator.getGamepads();
    }
    set buttonsConfig(buttonConfig) {
        this.buttonConfig = buttonConfig;
    }
    set onGamepadConnect(callback) {
        this.gamepadConnectCallback = callback;
        window.addEventListener("gamepadconnected", this.gamepadConnectCallback, true);
    }
    set onGamepadDisconnect(callback) {
        this.gamepadDisconnectCallback = callback;
        window.addEventListener("gamepaddisconnected", this.gamepadDisconnectCallback, true);
    }
    set onGamepadAxisChange(callback) {
        this.gamepadAxisChangeCallback = callback;
    }
    set onGamepadButtonChange(callback) {
        this.gamepadButtonChangeCallback = callback;
    }
    addGamepadMapping(gamepadMapping) {
        this.extraGamepadMappings.push(gamepadMapping);
    }
    tickLoop() {
        // this.pollGamepads();
        this.checkForGamepadChanges();
        // setTimeout(() => {
        requestAnimationFrame(this.tickLoop.bind(this));
    // }, 500)
    }
    checkForGamepadChanges() {
        let gamepads = navigator.getGamepads();
        for(var gi = 0; gi < gamepads.length; gi++){
            let gamepad = gamepads[gi];
            if (!gamepad) continue;
            if (!this.lastStateOfGamepads[gi]) this.lastStateOfGamepads[gi] = gamepad;
            this.checkForAxisChanges(gi, gamepad);
            this.checkForButtonChanges(gi, gamepad);
            // clear the state for a fresh run
            this.lastStateOfGamepads[gi] = gamepad;
        }
    }
    checkForAxisChanges(gamepadIndex, gamepad) {
        let axisState = gamepad.axes;
        if (axisState.length == 0) return;
        const lastGamepadState = this.lastStateOfGamepads[gamepadIndex];
        let lastAxisState = lastGamepadState.axes;
        let axiesChangeMask = [];
        let i, aAxisChangedFlag;
        for(i = 0; i < axisState.length; i++){
            let axisValue = axisState[i];
            let lastAxisValue = lastAxisState[i];
            if (axisValue != lastAxisValue) {
                axiesChangeMask[i] = true;
                aAxisChangedFlag = true;
            } else axiesChangeMask[i] = false;
        }
        // send out event if one or more axes changed
        if (aAxisChangedFlag && this.gamepadAxisChangeCallback) this.gamepadAxisChangeCallback(gamepadIndex, gamepad, axiesChangeMask);
    }
    checkForButtonChanges(gamepadIndex, gamepad) {
        let btnState = gamepad.buttons;
        const lastGamepadState = this.lastStateOfGamepads[gamepadIndex];
        let lastBtnState = lastGamepadState.buttons;
        let buttonChangesMask = [];
        let bi, aButtonChangedFlag = false;
        for(bi = 0; bi < btnState.length; bi++){
            let button = btnState[bi];
            let lastButtonState = lastBtnState[bi];
            let buttonConfig = this.buttonConfig[bi] || {
            };
            let btnChangeMask = {
            };
            if (button.touched && !lastButtonState.touched) {
                btnChangeMask.touchDown = true;
                aButtonChangedFlag = true;
            } else if (!button.touched && lastButtonState.touched) {
                btnChangeMask.touchUp = true;
                aButtonChangedFlag = true;
            }
            if (button.pressed && !lastButtonState.pressed) {
                btnChangeMask.pressed = true;
                aButtonChangedFlag = true;
            } else if (!button.pressed && lastButtonState.pressed) {
                btnChangeMask.released = true;
                aButtonChangedFlag = true;
            }
            if (buttonConfig && buttonConfig.holdAllowed && button.pressed && lastButtonState.pressed) {
                btnChangeMask.heldDown = true;
                aButtonChangedFlag = true;
            }
            if (button.value != lastButtonState.value) {
                btnChangeMask.valueChanged = true;
                aButtonChangedFlag = true;
            }
            const buttonDidChange = Object.keys(btnChangeMask).length > 0;
            buttonChangesMask[bi] = buttonDidChange ? btnChangeMask : false;
        }
        // send out event if one or more buttons changed
        if (aButtonChangedFlag && this.gamepadButtonChangeCallback) this.gamepadButtonChangeCallback(gamepadIndex, gamepad, buttonChangesMask);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"at2SH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleRovMessage", ()=>handleRovMessage
);
parcelHelpers.export(exports, "sendRovMessage", ()=>sendRovMessage
);
const handleRovMessage = (message)=>{
    console.log("Got ROV Message:", message);
};
const sendRovMessage = (message)=>{
    return (callback, onReceive)=>{
        console.log("handleROVMessage: ", message);
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"doATT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "clamp", ()=>clamp
);
/* generateStateChangeFunction is a function generator for an xstate machine that will return a function that will run a callback and send the named state transition with the data or event from the calling transition */ parcelHelpers.export(exports, "generateStateChangeFunction", ()=>generateStateChangeFunction
);
parcelHelpers.export(exports, "calculateDesiredMotion", ()=>calculateDesiredMotion
);
/*
* Gets just the passed name parameter from the query string the curent url:
* Example: if the url is: https://example.com/abc?some-variable-name=somevalue&someotherthing=someothervalue
* then getURLQueryStringVariable("some-variable-name") will return "somevalue"
*/ parcelHelpers.export(exports, "getURLQueryStringVariable", ()=>getURLQueryStringVariable
);
parcelHelpers.export(exports, "isInternetAvailable", ()=>isInternetAvailable
);
parcelHelpers.export(exports, "toggleFullscreen", ()=>toggleFullscreen
);
// Downloads the given link, with an optional filename for the download
parcelHelpers.export(exports, "download", ()=>download
);
function clamp(number, max, min) {
    return Math.max(Math.min(number, max), min);
}
function generateStateChangeFunction(sendStateChange, stateTransition, data, additionalCallback) {
    const func = function(evt) {
        if (additionalCallback) additionalCallback(evt);
        sendStateChange({
            type: stateTransition,
            data: data || evt
        });
    };
    return func;
}
function calculateDesiredMotion(axes) {
    var turn = axes[0].toFixed(3);
    var forward = -1 * axes[1].toFixed(3);
    var strafe = axes[2].toFixed(3);
    var vertical = -1 * axes[3].toFixed(3);
    return {
        thrustVector: [
            strafe,
            forward,
            vertical
        ],
        turnRate: turn
    };
}
function getURLQueryStringVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for(var i = 0; i < vars.length; i++){
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) return decodeURIComponent(pair[1]);
    }
// console.log('Query variable %s not found', variable);
}
function isInternetAvailable(urlToCheck) {
    return new Promise((resolve)=>{
        console.info("checkingUrl", urlToCheck);
        try {
            fetch(urlToCheck).then(()=>{
                resolve(true);
            }).catch((e)=>{
                console.warn("Internet Offline, starting switch to local mode", e);
                resolve(false);
            });
        // setTimeout(() => {
        //     resolve(false)
        // }, 10000)
        } catch (e) {
            console.warn("Error Checking internet, starting switch to local mode", e);
            resolve(false);
        }
    });
}
window.closeFullscreen = ()=>{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    if (fullscreenElement) {
        const removeFullscreenUi = ()=>{
            fullscreenElement.classList.remove('fullscreen-open');
        };
        if (document.exitFullscreen) document.exitFullscreen().then(removeFullscreenUi);
        else if (document.msExitFullscreen) document.msExitFullscreen().then(removeFullscreenUi);
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen().then(removeFullscreenUi);
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen().then(removeFullscreenUi);
    }
};
/* When the toggleFullscreen() export function is executed, open the passed element in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */ window.toggleFullscreen = (e, elem)=>{
    elem = elem || document.documentElement;
    if (e && e.initialTarget) e.initialTarget.classList.toggle('fullscreen-open');
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    const addFullscreenUi = ()=>{
        elem.classList.add('fullscreen-open');
    };
    const removeFullscreenUi = ()=>{
        fullscreenElement.classList.remove('fullscreen-open');
        if (elem !== fullscreenElement) {
            if (elem.requestFullscreen) elem.requestFullscreen().then(addFullscreenUi);
            else if (elem.msRequestFullscreen) elem.msRequestFullscreen().then(addFullscreenUi);
            else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen().then(addFullscreenUi);
            else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT).then(addFullscreenUi);
        }
    };
    if (fullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen().then(removeFullscreenUi);
        else if (document.msExitFullscreen) document.msExitFullscreen().then(removeFullscreenUi);
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen().then(removeFullscreenUi);
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen().then(removeFullscreenUi);
    } else {
        if (elem.requestFullscreen) elem.requestFullscreen().then(addFullscreenUi);
        else if (elem.msRequestFullscreen) elem.msRequestFullscreen().then(addFullscreenUi);
        else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen().then(addFullscreenUi);
        else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT).then(addFullscreenUi);
    }
};
function toggleFullscreen(event, elem) {
    elem = elem || document.documentElement;
    var fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    if (!fullscreenElement || elem !== fullscreenElement) {
        const requestFullscreenFunc = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
        console.log(requestFullscreenFunc);
        requestFullscreenFunc(Element.ALLOW_KEYBOARD_INPUT);
    } else {
        const exitFullscreenFunc = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
        exitFullscreenFunc().then(()=>{
            fullscreenElement.classList.remove('fullscreen-open');
        });
    }
}
function download(url, filename) {
    const a = document.createElement('a') // Create <a> hyperlink element
    ;
    a.href = url // Set the hyperlink URL
    ;
    a.download = filename || "" // if left blank the browser will guess the filename for the downloaded file
    ;
    document.body.appendChild(a) // Append the hyperlink to the document body
    ;
    a.click() // Click the hyperlink
    ;
    document.body.removeChild(a) // Remove the hyperlink from the document body
    ;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"efi6n":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// -------------------------------------------------------------
// ------ UI Stuff ---------------------------------------------
// -------------------------------------------------------------
parcelHelpers.export(exports, "showToastMessage", ()=>showToastMessage
);
parcelHelpers.export(exports, "showToastDialog", ()=>showToastDialog
);
parcelHelpers.export(exports, "showChoiceDialog", ()=>showChoiceDialog
);
parcelHelpers.export(exports, "showROVDisconnectedUi", ()=>showROVDisconnectedUi
);
parcelHelpers.export(exports, "showROVConnectingUi", ()=>showROVConnectingUi
);
parcelHelpers.export(exports, "showROVConnectedUi", ()=>showROVConnectedUi
);
parcelHelpers.export(exports, "showReloadingWebsiteUi", ()=>showReloadingWebsiteUi
);
parcelHelpers.export(exports, "setupConnectBtnClickHandler", ()=>setupConnectBtnClickHandler
);
parcelHelpers.export(exports, "setupDisconnectBtnClickHandler", ()=>setupDisconnectBtnClickHandler
);
parcelHelpers.export(exports, "setupSwitchRovBtnClickHandler", ()=>setupSwitchRovBtnClickHandler
);
parcelHelpers.export(exports, "showScanIpBtn", ()=>showScanIpBtn
);
parcelHelpers.export(exports, "hideScanIpButton", ()=>hideScanIpButton
);
parcelHelpers.export(exports, "showLoadingUi", ()=>showLoadingUi
);
parcelHelpers.export(exports, "hideLoadingUi", ()=>hideLoadingUi
);
parcelHelpers.export(exports, "showLivestreamUi", ()=>showLivestreamUi
);
parcelHelpers.export(exports, "hideLivestreamUi", ()=>hideLivestreamUi
);
parcelHelpers.export(exports, "updateRoleDisplay", ()=>updateRoleDisplay
);
parcelHelpers.export(exports, "updatePingDisplay", ()=>updatePingDisplay
);
parcelHelpers.export(exports, "updateBatteryDisplay", ()=>updateBatteryDisplay
);
parcelHelpers.export(exports, "updateDisplayedSensorValues", ()=>updateDisplayedSensorValues
);
parcelHelpers.export(exports, "setCompassHeading", ()=>setCompassHeading
);
parcelHelpers.export(exports, "setArtificialHorizonBackground", ()=>setArtificialHorizonBackground
) // FOR DEBUGGING COMPASS:
 // document.addEventListener("DOMContentLoaded", function () {
 //     if (window.DeviceOrientationEvent) {
 //         window.addEventListener('deviceorientation', function (eventData) {
 //             // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
 //             // var tiltLR = eventData.gamma;
 //             // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
 //             var tiltFB = eventData.beta;
 //             // this.document.getElementById("connected_rov_display").innerHTML = "tiltLR: " + tiltLR + " tiltFB: " + (tiltFB - 90);
 //             // alpha: The direction the compass of the device aims to in degrees.
 //             var dir = eventData.alpha
 //             setArtificialHorizonBackground(dir, -tiltFB);
 //             // Call the function to use the data on the page.
 //             setCompassHeading(dir);
 //         }, false);
 //     }
 //     setArtificialHorizonBackground(0, 0);
 // });
;
var _toastifyJs = require("toastify-js");
var _toastifyJsDefault = parcelHelpers.interopDefault(_toastifyJs);
function showToastMessage(message, durration, callback) {
    return _toastifyJsDefault.default({
        text: message,
        duration: durration || 5000,
        close: true,
        // className: "dialog-toast",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)"
        },
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        onClick: callback
    }).showToast();
}
function showToastDialog(message, durration, btnName, callback) {
    const toastContent = document.createElement("div");
    toastContent.innerHTML = message;
    if (btnName) {
        const btn = document.createElement("button");
        btn.innerHTML = btnName;
        btn.addEventListener("click", callback);
        toastContent.appendChild(btn);
    }
    return _toastifyJsDefault.default({
        node: toastContent,
        duration: durration || 15000,
        close: btnName != false,
        className: "dialog-toast",
        gravity: "top",
        position: "center",
        stopOnFocus: true
    }).showToast();
}
function showChoiceDialog(message, buttons, callback) {
    const toastContent = document.createElement("div");
    toastContent.innerHTML = message;
    buttons.forEach((button)=>{
        const btn = document.createElement("button");
        btn.innerHTML = button.name;
        btn.addEventListener("click", ()=>{
            callback(button.value);
        });
        toastContent.appendChild(btn);
    });
    return _toastifyJsDefault.default({
        node: toastContent,
        duration: 0,
        close: true,
        className: "dialog-toast",
        gravity: "top",
        position: "center",
        stopOnFocus: true
    }).showToast();
}
const connectBtn = document.getElementById('connect_btn');
const disconnectBtn = document.getElementById('disconnect_btn');
const connectedRovLabel = document.getElementById('connected_rov_label');
function showROVDisconnectedUi() {
    connectBtn.style.display = 'block';
    disconnectBtn.style.display = 'none';
    connectedRovLabel.parentElement.parentElement.classList.add('hidden');
    connectedRovLabel.innerText = 'None';
    hideLoadingUi();
}
function showROVConnectingUi() {
    connectBtn.style.display = 'none';
    connectedRovLabel.parentElement.parentElement.classList.add('hidden');
    showLoadingUi("Searching for ROV...");
}
function showROVConnectedUi(rovName) {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = 'block';
    connectedRovLabel.parentElement.parentElement.classList.remove('hidden');
    if (rovName) connectedRovLabel.innerText = rovName;
    hideLoadingUi();
}
function showReloadingWebsiteUi() {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = 'none';
    connectedRovLabel.parentElement.parentElement.classList.add('hidden');
    showLoadingUi("Reloading Page...");
}
function setupConnectBtnClickHandler(callback) {
    connectBtn.addEventListener('click', callback);
    return ()=>{
        connectBtn.removeEventListener('click', callback);
    };
}
function setupDisconnectBtnClickHandler(callback) {
    connectBtn.addEventListener('click', callback);
    return ()=>{
        connectBtn.removeEventListener('click', callback);
    };
}
const connectedRovButton = document.getElementById('connected_rov_indicator_btn');
function setupSwitchRovBtnClickHandler(callback) {
    connectedRovButton.addEventListener('click', callback);
    return ()=>{
        connectedRovButton.removeEventListener('click', callback);
    };
}
function showScanIpBtn() {
    document.getElementById("scan_for_ip_btn").style.display = "block";
}
function hideScanIpButton() {
    document.getElementById("scan_for_ip_btn").style.display = "none";
}
const loadingIndicator = document.getElementById("site_loading_indicator");
const loadingIndicatorText = document.getElementById("site_loading_text");
function showLoadingUi(loadingMessage) {
    loadingIndicator.style.display = 'block';
    loadingIndicatorText.innerHTML = loadingMessage;
}
function hideLoadingUi() {
    loadingIndicator.style.display = 'none';
}
const livestreamContainer = document.getElementById("livestream_container");
function showLivestreamUi() {
    livestreamContainer.style.display = 'block';
}
function hideLivestreamUi() {
    livestreamContainer.style.display = 'none';
}
var roleDisplayText = document.getElementById('role_display_text');
var takeControlButton = document.getElementById('take_control_btn');
function updateRoleDisplay(isPilot) {
    roleDisplayText.innerText = isPilot ? "Pilot" : "Spectator";
    if (isPilot) takeControlButton.classList.add('hidden');
    else takeControlButton.classList.remove('hidden');
}
var pingDisplay = document.getElementById('ping_value');
function updatePingDisplay(pingTimeMs) {
    pingDisplay.innerText = pingTimeMs;
}
var battDisplay = document.getElementById('battery_value');
function updateBatteryDisplay(batteryVolts, batteryPercent) {
    battDisplay.innerText = batteryVolts + 'V (' + batteryPercent + '%)';
}
var pressureDisplay = document.getElementById('pressure_value');
var tempDisplay = document.getElementById('temp_value');
function updateDisplayedSensorValues(sensorValues) {
    pressureDisplay.innerText = sensorValues.pressure;
    tempDisplay.innerText = sensorValues.temp;
}
/***** COMPASS AND ORIENTATION RELATED UI *******/ // https://codepen.io/fueru/pen/JjjoXez
var compassDisc = document.getElementById("compassDiscImg");
const compassOffset = 135;
function setCompassHeading(headingDeg) {
    var totalDir = -(headingDeg + compassOffset);
    // document.getElementById("direction").innerHTML = "dir: " + Math.ceil(dir) + " + offset(" + offset + ") = " + Math.ceil(totalDir);
    compassDisc.style.transform = `translateX(${totalDir}px)`;
}
const gradientArtificialHorizonBackground = document.body //getElementById("artificial_horizon_gradient");
;
function setArtificialHorizonBackground(roll, pitch) {
    var vShift = Math.min(Math.max(pitch, -90), 90) / 90 * 100;
    gradientArtificialHorizonBackground.style.backgroundImage = `linear-gradient(${roll}deg, rgba(2,0,36,1) ${-100 + vShift}%, rgba(9,88,116,1) ${50 + vShift}%, rgba(10,109,140,1) ${50 + vShift}%, rgba(0,255,235,1) ${200 + vShift}%)`;
}

},{"toastify-js":"96k49","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"96k49":[function(require,module,exports) {
/*!
 * Toastify js 1.11.2
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */ (function(root, factory) {
    if (typeof module === "object" && module.exports) module.exports = factory();
    else root.Toastify = factory();
})(this, function(global) {
    // Object initialization
    var Toastify = function(options) {
        // Returning a new init object
        return new Toastify.lib.init(options);
    }, // Library version
    version = "1.11.2";
    // Set the default global options
    Toastify.defaults = {
        oldestFirst: true,
        text: "Toastify is awesome!",
        node: undefined,
        duration: 3000,
        selector: undefined,
        callback: function() {
        },
        destination: undefined,
        newWindow: false,
        close: false,
        gravity: "toastify-top",
        positionLeft: false,
        position: '',
        backgroundColor: '',
        avatar: "",
        className: "",
        stopOnFocus: true,
        onClick: function() {
        },
        offset: {
            x: 0,
            y: 0
        },
        escapeMarkup: true,
        style: {
            background: ''
        }
    };
    // Defining the prototype of the object
    Toastify.lib = Toastify.prototype = {
        toastify: version,
        constructor: Toastify,
        // Initializing the object with required parameters
        init: function(options) {
            // Verifying and validating the input object
            if (!options) options = {
            };
            // Creating the options object
            this.options = {
            };
            this.toastElement = null;
            // Validating the options
            this.options.text = options.text || Toastify.defaults.text; // Display message
            this.options.node = options.node || Toastify.defaults.node; // Display content as node
            this.options.duration = options.duration === 0 ? 0 : options.duration || Toastify.defaults.duration; // Display duration
            this.options.selector = options.selector || Toastify.defaults.selector; // Parent selector
            this.options.callback = options.callback || Toastify.defaults.callback; // Callback after display
            this.options.destination = options.destination || Toastify.defaults.destination; // On-click destination
            this.options.newWindow = options.newWindow || Toastify.defaults.newWindow; // Open destination in new window
            this.options.close = options.close || Toastify.defaults.close; // Show toast close icon
            this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : Toastify.defaults.gravity; // toast position - top or bottom
            this.options.positionLeft = options.positionLeft || Toastify.defaults.positionLeft; // toast position - left or right
            this.options.position = options.position || Toastify.defaults.position; // toast position - left or right
            this.options.backgroundColor = options.backgroundColor || Toastify.defaults.backgroundColor; // toast background color
            this.options.avatar = options.avatar || Toastify.defaults.avatar; // img element src - url or a path
            this.options.className = options.className || Toastify.defaults.className; // additional class names for the toast
            this.options.stopOnFocus = options.stopOnFocus === undefined ? Toastify.defaults.stopOnFocus : options.stopOnFocus; // stop timeout on focus
            this.options.onClick = options.onClick || Toastify.defaults.onClick; // Callback after click
            this.options.offset = options.offset || Toastify.defaults.offset; // toast offset
            this.options.escapeMarkup = options.escapeMarkup !== undefined ? options.escapeMarkup : Toastify.defaults.escapeMarkup;
            this.options.style = options.style || Toastify.defaults.style;
            if (options.backgroundColor) this.options.style.background = options.backgroundColor;
            // Returning the current object for chaining functions
            return this;
        },
        // Building the DOM element
        buildToast: function() {
            // Validating if the options are defined
            if (!this.options) throw "Toastify is not initialized";
            // Creating the DOM object
            var divElement = document.createElement("div");
            divElement.className = "toastify on " + this.options.className;
            // Positioning toast to left or right or center
            if (!!this.options.position) divElement.className += " toastify-" + this.options.position;
            else // To be depreciated in further versions
            if (this.options.positionLeft === true) {
                divElement.className += " toastify-left";
                console.warn('Property `positionLeft` will be depreciated in further versions. Please use `position` instead.');
            } else // Default position
            divElement.className += " toastify-right";
            // Assigning gravity of element
            divElement.className += " " + this.options.gravity;
            if (this.options.backgroundColor) // This is being deprecated in favor of using the style HTML DOM property
            console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
            // Loop through our style object and apply styles to divElement
            for(var property in this.options.style)divElement.style[property] = this.options.style[property];
            // Adding the toast message/node
            if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) // If we have a valid node, we insert it
            divElement.appendChild(this.options.node);
            else {
                if (this.options.escapeMarkup) divElement.innerText = this.options.text;
                else divElement.innerHTML = this.options.text;
                if (this.options.avatar !== "") {
                    var avatarElement = document.createElement("img");
                    avatarElement.src = this.options.avatar;
                    avatarElement.className = "toastify-avatar";
                    if (this.options.position == "left" || this.options.positionLeft === true) // Adding close icon on the left of content
                    divElement.appendChild(avatarElement);
                    else // Adding close icon on the right of content
                    divElement.insertAdjacentElement("afterbegin", avatarElement);
                }
            }
            // Adding a close icon to the toast
            if (this.options.close === true) {
                // Create a span for close element
                var closeElement = document.createElement("span");
                closeElement.innerHTML = "&#10006;";
                closeElement.className = "toast-close";
                // Triggering the removal of toast from DOM on close click
                closeElement.addEventListener("click", (function(event) {
                    event.stopPropagation();
                    this.removeElement(this.toastElement);
                    window.clearTimeout(this.toastElement.timeOutValue);
                }).bind(this));
                //Calculating screen width
                var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
                // Adding the close icon to the toast element
                // Display on the right if screen width is less than or equal to 360px
                if ((this.options.position == "left" || this.options.positionLeft === true) && width > 360) // Adding close icon on the left of content
                divElement.insertAdjacentElement("afterbegin", closeElement);
                else // Adding close icon on the right of content
                divElement.appendChild(closeElement);
            }
            // Clear timeout while toast is focused
            if (this.options.stopOnFocus && this.options.duration > 0) {
                var self = this;
                // stop countdown
                divElement.addEventListener("mouseover", function(event) {
                    window.clearTimeout(divElement.timeOutValue);
                });
                // add back the timeout
                divElement.addEventListener("mouseleave", function() {
                    divElement.timeOutValue = window.setTimeout(function() {
                        // Remove the toast from DOM
                        self.removeElement(divElement);
                    }, self.options.duration);
                });
            }
            // Adding an on-click destination path
            if (typeof this.options.destination !== "undefined") divElement.addEventListener("click", (function(event) {
                event.stopPropagation();
                if (this.options.newWindow === true) window.open(this.options.destination, "_blank");
                else window.location = this.options.destination;
            }).bind(this));
            if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") divElement.addEventListener("click", (function(event) {
                event.stopPropagation();
                this.options.onClick();
            }).bind(this));
            // Adding offset
            if (typeof this.options.offset === "object") {
                var x = getAxisOffsetAValue("x", this.options);
                var y = getAxisOffsetAValue("y", this.options);
                var xOffset = this.options.position == "left" ? x : "-" + x;
                var yOffset = this.options.gravity == "toastify-top" ? y : "-" + y;
                divElement.style.transform = "translate(" + xOffset + "," + yOffset + ")";
            }
            // Returning the generated element
            return divElement;
        },
        // Displaying the toast
        showToast: function() {
            // Creating the DOM object for the toast
            this.toastElement = this.buildToast();
            // Getting the root element to with the toast needs to be added
            var rootElement;
            if (typeof this.options.selector === "string") rootElement = document.getElementById(this.options.selector);
            else if (this.options.selector instanceof HTMLElement || typeof ShadowRoot !== 'undefined' && this.options.selector instanceof ShadowRoot) rootElement = this.options.selector;
            else rootElement = document.body;
            // Validating if root element is present in DOM
            if (!rootElement) throw "Root element is not defined";
            // Adding the DOM element
            var elementToInsert = Toastify.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
            rootElement.insertBefore(this.toastElement, elementToInsert);
            // Repositioning the toasts in case multiple toasts are present
            Toastify.reposition();
            if (this.options.duration > 0) this.toastElement.timeOutValue = window.setTimeout((function() {
                // Remove the toast from DOM
                this.removeElement(this.toastElement);
            }).bind(this), this.options.duration); // Binding `this` for function invocation
            // Supporting function chaining
            return this;
        },
        hideToast: function() {
            if (this.toastElement.timeOutValue) clearTimeout(this.toastElement.timeOutValue);
            this.removeElement(this.toastElement);
        },
        // Removing the element from the DOM
        removeElement: function(toastElement) {
            // Hiding the element
            // toastElement.classList.remove("on");
            toastElement.className = toastElement.className.replace(" on", "");
            // Removing the element from DOM after transition end
            window.setTimeout((function() {
                // remove options node if any
                if (this.options.node && this.options.node.parentNode) this.options.node.parentNode.removeChild(this.options.node);
                // Remove the element from the DOM, only when the parent node was not removed before.
                if (toastElement.parentNode) toastElement.parentNode.removeChild(toastElement);
                // Calling the callback function
                this.options.callback.call(toastElement);
                // Repositioning the toasts again
                Toastify.reposition();
            }).bind(this), 400); // Binding `this` for function invocation
        }
    };
    // Positioning the toasts on the DOM
    Toastify.reposition = function() {
        // Top margins with gravity
        var topLeftOffsetSize = {
            top: 15,
            bottom: 15
        };
        var topRightOffsetSize = {
            top: 15,
            bottom: 15
        };
        var offsetSize = {
            top: 15,
            bottom: 15
        };
        // Get all toast messages on the DOM
        var allToasts = document.getElementsByClassName("toastify");
        var classUsed;
        // Modifying the position of each toast element
        for(var i = 0; i < allToasts.length; i++){
            // Getting the applied gravity
            if (containsClass(allToasts[i], "toastify-top") === true) classUsed = "toastify-top";
            else classUsed = "toastify-bottom";
            var height = allToasts[i].offsetHeight;
            classUsed = classUsed.substr(9, classUsed.length - 1);
            // Spacing between toasts
            var offset = 15;
            var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            // Show toast in center if screen with less than or equal to 360px
            if (width <= 360) {
                // Setting the position
                allToasts[i].style[classUsed] = offsetSize[classUsed] + "px";
                offsetSize[classUsed] += height + offset;
            } else if (containsClass(allToasts[i], "toastify-left") === true) {
                // Setting the position
                allToasts[i].style[classUsed] = topLeftOffsetSize[classUsed] + "px";
                topLeftOffsetSize[classUsed] += height + offset;
            } else {
                // Setting the position
                allToasts[i].style[classUsed] = topRightOffsetSize[classUsed] + "px";
                topRightOffsetSize[classUsed] += height + offset;
            }
        }
        // Supporting function chaining
        return this;
    };
    // Helper function to get offset.
    function getAxisOffsetAValue(axis, options) {
        if (options.offset[axis]) {
            if (isNaN(options.offset[axis])) return options.offset[axis];
            else return options.offset[axis] + 'px';
        }
        return '0px';
    }
    function containsClass(elem, yourClass) {
        if (!elem || typeof yourClass !== "string") return false;
        else if (elem.className && elem.className.trim().split(/\s+/gi).indexOf(yourClass) > -1) return true;
        else return false;
    }
    // Setting up the prototype for the init object
    Toastify.lib.init.prototype = Toastify.lib;
    // Returning the Toastify function to be assigned to the window object/module
    return Toastify;
});

},{}],"b9dCp":[function(require,module,exports) {
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var _tslib = require('./_virtual/_tslib.js');
var types = require('./types.js');
var actionTypes = require('./actionTypes.js');
var utils = require('./utils.js');
var environment = require('./environment.js');
var initEvent = /*#__PURE__*/ utils.toSCXMLEvent({
    type: actionTypes.init
});
function getActionFunction(actionType, actionFunctionMap) {
    return actionFunctionMap ? actionFunctionMap[actionType] || undefined : undefined;
}
function toActionObject(action, actionFunctionMap) {
    var actionObject;
    if (utils.isString(action) || typeof action === 'number') {
        var exec = getActionFunction(action, actionFunctionMap);
        if (utils.isFunction(exec)) actionObject = {
            type: action,
            exec: exec
        };
        else if (exec) actionObject = exec;
        else actionObject = {
            type: action,
            exec: undefined
        };
    } else if (utils.isFunction(action)) actionObject = {
        // Convert action to string if unnamed
        type: action.name || action.toString(),
        exec: action
    };
    else {
        var exec = getActionFunction(action.type, actionFunctionMap);
        if (utils.isFunction(exec)) actionObject = _tslib.__assign(_tslib.__assign({
        }, action), {
            exec: exec
        });
        else if (exec) {
            var actionType = exec.type || action.type;
            actionObject = _tslib.__assign(_tslib.__assign(_tslib.__assign({
            }, exec), action), {
                type: actionType
            });
        } else actionObject = action;
    }
    return actionObject;
}
var toActionObjects = function(action, actionFunctionMap) {
    if (!action) return [];
    var actions = utils.isArray(action) ? action : [
        action
    ];
    return actions.map(function(subAction) {
        return toActionObject(subAction, actionFunctionMap);
    });
};
function toActivityDefinition(action) {
    var actionObject = toActionObject(action);
    return _tslib.__assign(_tslib.__assign({
        id: utils.isString(action) ? action : actionObject.id
    }, actionObject), {
        type: actionObject.type
    });
}
/**
 * Raises an event. This places the event in the internal event queue, so that
 * the event is immediately consumed by the machine in the current step.
 *
 * @param eventType The event to raise.
 */ function raise(event) {
    if (!utils.isString(event)) return send(event, {
        to: types.SpecialTargets.Internal
    });
    return {
        type: actionTypes.raise,
        event: event
    };
}
function resolveRaise(action) {
    return {
        type: actionTypes.raise,
        _event: utils.toSCXMLEvent(action.event)
    };
}
/**
 * Sends an event. This returns an action that will be read by an interpreter to
 * send the event in the next step, after the current step is finished executing.
 *
 * @param event The event to send.
 * @param options Options to pass into the send event:
 *  - `id` - The unique send event identifier (used with `cancel()`).
 *  - `delay` - The number of milliseconds to delay the sending of the event.
 *  - `to` - The target of this event (by default, the machine the event was sent from).
 */ function send(event, options) {
    return {
        to: options ? options.to : undefined,
        type: actionTypes.send,
        event: utils.isFunction(event) ? event : utils.toEventObject(event),
        delay: options ? options.delay : undefined,
        id: options && options.id !== undefined ? options.id : utils.isFunction(event) ? event.name : utils.getEventType(event)
    };
}
function resolveSend(action, ctx, _event, delaysMap) {
    var meta = {
        _event: _event
    }; // TODO: helper function for resolving Expr
    var resolvedEvent = utils.toSCXMLEvent(utils.isFunction(action.event) ? action.event(ctx, _event.data, meta) : action.event);
    var resolvedDelay;
    if (utils.isString(action.delay)) {
        var configDelay = delaysMap && delaysMap[action.delay];
        resolvedDelay = utils.isFunction(configDelay) ? configDelay(ctx, _event.data, meta) : configDelay;
    } else resolvedDelay = utils.isFunction(action.delay) ? action.delay(ctx, _event.data, meta) : action.delay;
    var resolvedTarget = utils.isFunction(action.to) ? action.to(ctx, _event.data, meta) : action.to;
    return _tslib.__assign(_tslib.__assign({
    }, action), {
        to: resolvedTarget,
        _event: resolvedEvent,
        event: resolvedEvent.data,
        delay: resolvedDelay
    });
}
/**
 * Sends an event to this machine's parent.
 *
 * @param event The event to send to the parent machine.
 * @param options Options to pass into the send event.
 */ function sendParent(event, options) {
    return send(event, _tslib.__assign(_tslib.__assign({
    }, options), {
        to: types.SpecialTargets.Parent
    }));
}
/**
 * Sends an event to an actor.
 *
 * @param actor The `ActorRef` to send the event to.
 * @param event The event to send, or an expression that evaluates to the event to send
 * @param options Send action options
 * @returns An XState send action object
 */ function sendTo(actor, event, options) {
    return send(event, _tslib.__assign(_tslib.__assign({
    }, options), {
        to: actor
    }));
}
/**
 * Sends an update event to this machine's parent.
 */ function sendUpdate() {
    return sendParent(actionTypes.update);
}
/**
 * Sends an event back to the sender of the original event.
 *
 * @param event The event to send back to the sender
 * @param options Options to pass into the send event
 */ function respond(event, options) {
    return send(event, _tslib.__assign(_tslib.__assign({
    }, options), {
        to: function(_, __, _a) {
            var _event = _a._event;
            return _event.origin; // TODO: handle when _event.origin is undefined
        }
    }));
}
var defaultLogExpr = function(context, event) {
    return {
        context: context,
        event: event
    };
};
/**
 *
 * @param expr The expression function to evaluate which will be logged.
 *  Takes in 2 arguments:
 *  - `ctx` - the current state context
 *  - `event` - the event that caused this action to be executed.
 * @param label The label to give to the logged expression.
 */ function log(expr, label) {
    if (expr === void 0) expr = defaultLogExpr;
    return {
        type: actionTypes.log,
        label: label,
        expr: expr
    };
}
var resolveLog = function(action, ctx, _event) {
    return _tslib.__assign(_tslib.__assign({
    }, action), {
        value: utils.isString(action.expr) ? action.expr : action.expr(ctx, _event.data, {
            _event: _event
        })
    });
};
/**
 * Cancels an in-flight `send(...)` action. A canceled sent action will not
 * be executed, nor will its event be sent, unless it has already been sent
 * (e.g., if `cancel(...)` is called after the `send(...)` action's `delay`).
 *
 * @param sendId The `id` of the `send(...)` action to cancel.
 */ var cancel = function(sendId) {
    return {
        type: actionTypes.cancel,
        sendId: sendId
    };
};
/**
 * Starts an activity.
 *
 * @param activity The activity to start.
 */ function start(activity) {
    var activityDef = toActivityDefinition(activity);
    return {
        type: types.ActionTypes.Start,
        activity: activityDef,
        exec: undefined
    };
}
/**
 * Stops an activity.
 *
 * @param actorRef The activity to stop.
 */ function stop(actorRef) {
    var activity = utils.isFunction(actorRef) ? actorRef : toActivityDefinition(actorRef);
    return {
        type: types.ActionTypes.Stop,
        activity: activity,
        exec: undefined
    };
}
function resolveStop(action, context, _event) {
    var actorRefOrString = utils.isFunction(action.activity) ? action.activity(context, _event.data) : action.activity;
    var resolvedActorRef = typeof actorRefOrString === 'string' ? {
        id: actorRefOrString
    } : actorRefOrString;
    var actionObject = {
        type: types.ActionTypes.Stop,
        activity: resolvedActorRef
    };
    return actionObject;
}
/**
 * Updates the current context of the machine.
 *
 * @param assignment An object that represents the partial context to update.
 */ var assign = function(assignment) {
    return {
        type: actionTypes.assign,
        assignment: assignment
    };
};
function isActionObject(action) {
    return typeof action === 'object' && 'type' in action;
}
/**
 * Returns an event type that represents an implicit event that
 * is sent after the specified `delay`.
 *
 * @param delayRef The delay in milliseconds
 * @param id The state node ID where this event is handled
 */ function after(delayRef, id) {
    var idSuffix = id ? "#".concat(id) : '';
    return "".concat(types.ActionTypes.After, "(").concat(delayRef, ")").concat(idSuffix);
}
/**
 * Returns an event that represents that a final state node
 * has been reached in the parent state node.
 *
 * @param id The final state node's parent state node `id`
 * @param data The data to pass into the event
 */ function done(id, data) {
    var type = "".concat(types.ActionTypes.DoneState, ".").concat(id);
    var eventObject = {
        type: type,
        data: data
    };
    eventObject.toString = function() {
        return type;
    };
    return eventObject;
}
/**
 * Returns an event that represents that an invoked service has terminated.
 *
 * An invoked service is terminated when it has reached a top-level final state node,
 * but not when it is canceled.
 *
 * @param id The final state node ID
 * @param data The data to pass into the event
 */ function doneInvoke(id, data) {
    var type = "".concat(types.ActionTypes.DoneInvoke, ".").concat(id);
    var eventObject = {
        type: type,
        data: data
    };
    eventObject.toString = function() {
        return type;
    };
    return eventObject;
}
function error(id, data) {
    var type = "".concat(types.ActionTypes.ErrorPlatform, ".").concat(id);
    var eventObject = {
        type: type,
        data: data
    };
    eventObject.toString = function() {
        return type;
    };
    return eventObject;
}
function pure(getActions) {
    return {
        type: types.ActionTypes.Pure,
        get: getActions
    };
}
/**
 * Forwards (sends) an event to a specified service.
 *
 * @param target The target service to forward the event to.
 * @param options Options to pass into the send action creator.
 */ function forwardTo(target, options) {
    return send(function(_, event) {
        return event;
    }, _tslib.__assign(_tslib.__assign({
    }, options), {
        to: target
    }));
}
/**
 * Escalates an error by sending it as an event to this machine's parent.
 *
 * @param errorData The error data to send, or the expression function that
 * takes in the `context`, `event`, and `meta`, and returns the error data to send.
 * @param options Options to pass into the send action creator.
 */ function escalate(errorData, options) {
    return sendParent(function(context, event, meta) {
        return {
            type: actionTypes.error,
            data: utils.isFunction(errorData) ? errorData(context, event, meta) : errorData
        };
    }, _tslib.__assign(_tslib.__assign({
    }, options), {
        to: types.SpecialTargets.Parent
    }));
}
function choose(conds) {
    return {
        type: types.ActionTypes.Choose,
        conds: conds
    };
}
function resolveActions(machine, currentState, currentContext, _event, actions, preserveActionOrder) {
    if (preserveActionOrder === void 0) preserveActionOrder = false;
    var _a1 = _tslib.__read(preserveActionOrder ? [
        [],
        actions
    ] : utils.partition(actions, function(action) {
        return action.type === actionTypes.assign;
    }), 2), assignActions = _a1[0], otherActions = _a1[1];
    var updatedContext = assignActions.length ? utils.updateContext(currentContext, _event, assignActions, currentState) : currentContext;
    var preservedContexts = preserveActionOrder ? [
        currentContext
    ] : undefined;
    var resolvedActions = utils.flatten(otherActions.map(function(actionObject) {
        var _a;
        switch(actionObject.type){
            case actionTypes.raise:
                return resolveRaise(actionObject);
            case actionTypes.send:
                var sendAction = resolveSend(actionObject, updatedContext, _event, machine.options.delays); // TODO: fix ActionTypes.Init
                if (!environment.IS_PRODUCTION) // warn after resolving as we can create better contextual message here
                utils.warn(!utils.isString(actionObject.delay) || typeof sendAction.delay === 'number', "No delay reference for delay expression '".concat(actionObject.delay, "' was found on machine '").concat(machine.id, "'"));
                return sendAction;
            case actionTypes.log:
                return resolveLog(actionObject, updatedContext, _event);
            case actionTypes.choose:
                var chooseAction = actionObject;
                var matchedActions = (_a = chooseAction.conds.find(function(condition) {
                    var guard = utils.toGuard(condition.cond, machine.options.guards);
                    return !guard || utils.evaluateGuard(machine, guard, updatedContext, _event, currentState);
                })) === null || _a === void 0 ? void 0 : _a.actions;
                if (!matchedActions) return [];
                var _b = _tslib.__read(resolveActions(machine, currentState, updatedContext, _event, toActionObjects(utils.toArray(matchedActions), machine.options.actions), preserveActionOrder), 2), resolvedActionsFromChoose = _b[0], resolvedContextFromChoose = _b[1];
                updatedContext = resolvedContextFromChoose;
                preservedContexts === null || preservedContexts === void 0 || preservedContexts.push(updatedContext);
                return resolvedActionsFromChoose;
            case actionTypes.pure:
                var matchedActions = actionObject.get(updatedContext, _event.data);
                if (!matchedActions) return [];
                var _c = _tslib.__read(resolveActions(machine, currentState, updatedContext, _event, toActionObjects(utils.toArray(matchedActions), machine.options.actions), preserveActionOrder), 2), resolvedActionsFromPure = _c[0], resolvedContext = _c[1];
                updatedContext = resolvedContext;
                preservedContexts === null || preservedContexts === void 0 || preservedContexts.push(updatedContext);
                return resolvedActionsFromPure;
            case actionTypes.stop:
                return resolveStop(actionObject, updatedContext, _event);
            case actionTypes.assign:
                updatedContext = utils.updateContext(updatedContext, _event, [
                    actionObject
                ], currentState);
                preservedContexts === null || preservedContexts === void 0 || preservedContexts.push(updatedContext);
                break;
            default:
                var resolvedActionObject = toActionObject(actionObject, machine.options.actions);
                var exec_1 = resolvedActionObject.exec;
                if (exec_1 && preservedContexts) {
                    var contextIndex_1 = preservedContexts.length - 1;
                    resolvedActionObject = _tslib.__assign(_tslib.__assign({
                    }, resolvedActionObject), {
                        exec: function(_ctx) {
                            var args = [];
                            for(var _i = 1; _i < arguments.length; _i++)args[_i - 1] = arguments[_i];
                            exec_1.apply(void 0, _tslib.__spreadArray([
                                preservedContexts[contextIndex_1]
                            ], _tslib.__read(args), false));
                        }
                    });
                }
                return resolvedActionObject;
        }
    }).filter(function(a) {
        return !!a;
    }));
    return [
        resolvedActions,
        updatedContext
    ];
}
exports.actionTypes = actionTypes;
exports.after = after;
exports.assign = assign;
exports.cancel = cancel;
exports.choose = choose;
exports.done = done;
exports.doneInvoke = doneInvoke;
exports.error = error;
exports.escalate = escalate;
exports.forwardTo = forwardTo;
exports.getActionFunction = getActionFunction;
exports.initEvent = initEvent;
exports.isActionObject = isActionObject;
exports.log = log;
exports.pure = pure;
exports.raise = raise;
exports.resolveActions = resolveActions;
exports.resolveLog = resolveLog;
exports.resolveRaise = resolveRaise;
exports.resolveSend = resolveSend;
exports.resolveStop = resolveStop;
exports.respond = respond;
exports.send = send;
exports.sendParent = sendParent;
exports.sendTo = sendTo;
exports.sendUpdate = sendUpdate;
exports.start = start;
exports.stop = stop;
exports.toActionObject = toActionObject;
exports.toActionObjects = toActionObjects;
exports.toActivityDefinition = toActivityDefinition;

},{"./_virtual/_tslib.js":"3Bp7b","./types.js":"84cIp","./actionTypes.js":"kEepo","./utils.js":"8RFz3","./environment.js":"7oZy5"}],"3Bp7b":[function(require,module,exports) {
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ exports.__assign = function() {
    exports.__assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return exports.__assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {
    };
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
exports.__read = __read;
exports.__rest = __rest;
exports.__spreadArray = __spreadArray;
exports.__values = __values;

},{}],"84cIp":[function(require,module,exports) {
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.ActionTypes = void 0;
(function(ActionTypes) {
    ActionTypes["Start"] = "xstate.start";
    ActionTypes["Stop"] = "xstate.stop";
    ActionTypes["Raise"] = "xstate.raise";
    ActionTypes["Send"] = "xstate.send";
    ActionTypes["Cancel"] = "xstate.cancel";
    ActionTypes["NullEvent"] = "";
    ActionTypes["Assign"] = "xstate.assign";
    ActionTypes["After"] = "xstate.after";
    ActionTypes["DoneState"] = "done.state";
    ActionTypes["DoneInvoke"] = "done.invoke";
    ActionTypes["Log"] = "xstate.log";
    ActionTypes["Init"] = "xstate.init";
    ActionTypes["Invoke"] = "xstate.invoke";
    ActionTypes["ErrorExecution"] = "error.execution";
    ActionTypes["ErrorCommunication"] = "error.communication";
    ActionTypes["ErrorPlatform"] = "error.platform";
    ActionTypes["ErrorCustom"] = "xstate.error";
    ActionTypes["Update"] = "xstate.update";
    ActionTypes["Pure"] = "xstate.pure";
    ActionTypes["Choose"] = "xstate.choose";
})(exports.ActionTypes || (exports.ActionTypes = {
}));
exports.SpecialTargets = void 0;
(function(SpecialTargets) {
    SpecialTargets["Parent"] = "#_parent";
    SpecialTargets["Internal"] = "#_internal";
})(exports.SpecialTargets || (exports.SpecialTargets = {
}));

},{}],"kEepo":[function(require,module,exports) {
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var types = require('./types.js');
var start = types.ActionTypes.Start;
var stop = types.ActionTypes.Stop;
var raise = types.ActionTypes.Raise;
var send = types.ActionTypes.Send;
var cancel = types.ActionTypes.Cancel;
var nullEvent = types.ActionTypes.NullEvent;
var assign = types.ActionTypes.Assign;
var after = types.ActionTypes.After;
var doneState = types.ActionTypes.DoneState;
var log = types.ActionTypes.Log;
var init = types.ActionTypes.Init;
var invoke = types.ActionTypes.Invoke;
var errorExecution = types.ActionTypes.ErrorExecution;
var errorPlatform = types.ActionTypes.ErrorPlatform;
var error = types.ActionTypes.ErrorCustom;
var update = types.ActionTypes.Update;
var choose = types.ActionTypes.Choose;
var pure = types.ActionTypes.Pure;
exports.after = after;
exports.assign = assign;
exports.cancel = cancel;
exports.choose = choose;
exports.doneState = doneState;
exports.error = error;
exports.errorExecution = errorExecution;
exports.errorPlatform = errorPlatform;
exports.init = init;
exports.invoke = invoke;
exports.log = log;
exports.nullEvent = nullEvent;
exports.pure = pure;
exports.raise = raise;
exports.send = send;
exports.start = start;
exports.stop = stop;
exports.update = update;

},{"./types.js":"84cIp"}],"8RFz3":[function(require,module,exports) {
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var _tslib = require('./_virtual/_tslib.js');
var constants = require('./constants.js');
var environment = require('./environment.js');
var _a;
function keys(value) {
    return Object.keys(value);
}
function matchesState(parentStateId, childStateId, delimiter) {
    if (delimiter === void 0) delimiter = constants.STATE_DELIMITER;
    var parentStateValue = toStateValue(parentStateId, delimiter);
    var childStateValue = toStateValue(childStateId, delimiter);
    if (isString(childStateValue)) {
        if (isString(parentStateValue)) return childStateValue === parentStateValue;
         // Parent more specific than child
        return false;
    }
    if (isString(parentStateValue)) return parentStateValue in childStateValue;
    return Object.keys(parentStateValue).every(function(key) {
        if (!(key in childStateValue)) return false;
        return matchesState(parentStateValue[key], childStateValue[key]);
    });
}
function getEventType(event) {
    try {
        return isString(event) || typeof event === 'number' ? "".concat(event) : event.type;
    } catch (e) {
        throw new Error('Events must be strings or objects with a string event.type property.');
    }
}
function getActionType(action) {
    try {
        return isString(action) || typeof action === 'number' ? "".concat(action) : isFunction(action) ? action.name : action.type;
    } catch (e) {
        throw new Error('Actions must be strings or objects with a string action.type property.');
    }
}
function toStatePath(stateId, delimiter) {
    try {
        if (isArray(stateId)) return stateId;
        return stateId.toString().split(delimiter);
    } catch (e) {
        throw new Error("'".concat(stateId, "' is not a valid state path."));
    }
}
function isStateLike(state) {
    return typeof state === 'object' && 'value' in state && 'context' in state && 'event' in state && '_event' in state;
}
function toStateValue(stateValue, delimiter) {
    if (isStateLike(stateValue)) return stateValue.value;
    if (isArray(stateValue)) return pathToStateValue(stateValue);
    if (typeof stateValue !== 'string') return stateValue;
    var statePath = toStatePath(stateValue, delimiter);
    return pathToStateValue(statePath);
}
function pathToStateValue(statePath) {
    if (statePath.length === 1) return statePath[0];
    var value = {
    };
    var marker = value;
    for(var i = 0; i < statePath.length - 1; i++)if (i === statePath.length - 2) marker[statePath[i]] = statePath[i + 1];
    else {
        marker[statePath[i]] = {
        };
        marker = marker[statePath[i]];
    }
    return value;
}
function mapValues(collection, iteratee) {
    var result = {
    };
    var collectionKeys = Object.keys(collection);
    for(var i = 0; i < collectionKeys.length; i++){
        var key = collectionKeys[i];
        result[key] = iteratee(collection[key], key, collection, i);
    }
    return result;
}
function mapFilterValues(collection, iteratee, predicate) {
    var e_1, _a1;
    var result = {
    };
    try {
        for(var _b = _tslib.__values(Object.keys(collection)), _c = _b.next(); !_c.done; _c = _b.next()){
            var key = _c.value;
            var item = collection[key];
            if (!predicate(item)) continue;
            result[key] = iteratee(item, key, collection);
        }
    } catch (e_1_1) {
        e_1 = {
            error: e_1_1
        };
    } finally{
        try {
            if (_c && !_c.done && (_a1 = _b.return)) _a1.call(_b);
        } finally{
            if (e_1) throw e_1.error;
        }
    }
    return result;
}
/**
 * Retrieves a value at the given path.
 * @param props The deep path to the prop of the desired value
 */ var path = function(props) {
    return function(object) {
        var e_2, _a2;
        var result = object;
        try {
            for(var props_1 = _tslib.__values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()){
                var prop = props_1_1.value;
                result = result[prop];
            }
        } catch (e_2_1) {
            e_2 = {
                error: e_2_1
            };
        } finally{
            try {
                if (props_1_1 && !props_1_1.done && (_a2 = props_1.return)) _a2.call(props_1);
            } finally{
                if (e_2) throw e_2.error;
            }
        }
        return result;
    };
};
/**
 * Retrieves a value at the given path via the nested accessor prop.
 * @param props The deep path to the prop of the desired value
 */ function nestedPath(props, accessorProp) {
    return function(object) {
        var e_3, _a3;
        var result = object;
        try {
            for(var props_2 = _tslib.__values(props), props_2_1 = props_2.next(); !props_2_1.done; props_2_1 = props_2.next()){
                var prop = props_2_1.value;
                result = result[accessorProp][prop];
            }
        } catch (e_3_1) {
            e_3 = {
                error: e_3_1
            };
        } finally{
            try {
                if (props_2_1 && !props_2_1.done && (_a3 = props_2.return)) _a3.call(props_2);
            } finally{
                if (e_3) throw e_3.error;
            }
        }
        return result;
    };
}
function toStatePaths(stateValue) {
    if (!stateValue) return [
        []
    ];
    if (isString(stateValue)) return [
        [
            stateValue
        ]
    ];
    var result = flatten(Object.keys(stateValue).map(function(key) {
        var subStateValue = stateValue[key];
        if (typeof subStateValue !== 'string' && (!subStateValue || !Object.keys(subStateValue).length)) return [
            [
                key
            ]
        ];
        return toStatePaths(stateValue[key]).map(function(subPath) {
            return [
                key
            ].concat(subPath);
        });
    }));
    return result;
}
function pathsToStateValue(paths) {
    var e_4, _a4;
    var result = {
    };
    if (paths && paths.length === 1 && paths[0].length === 1) return paths[0][0];
    try {
        for(var paths_1 = _tslib.__values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()){
            var currentPath = paths_1_1.value;
            var marker = result; // tslint:disable-next-line:prefer-for-of
            for(var i = 0; i < currentPath.length; i++){
                var subPath = currentPath[i];
                if (i === currentPath.length - 2) {
                    marker[subPath] = currentPath[i + 1];
                    break;
                }
                marker[subPath] = marker[subPath] || {
                };
                marker = marker[subPath];
            }
        }
    } catch (e_4_1) {
        e_4 = {
            error: e_4_1
        };
    } finally{
        try {
            if (paths_1_1 && !paths_1_1.done && (_a4 = paths_1.return)) _a4.call(paths_1);
        } finally{
            if (e_4) throw e_4.error;
        }
    }
    return result;
}
function flatten(array) {
    var _a5;
    return (_a5 = []).concat.apply(_a5, _tslib.__spreadArray([], _tslib.__read(array), false));
}
function toArrayStrict(value) {
    if (isArray(value)) return value;
    return [
        value
    ];
}
function toArray(value) {
    if (value === undefined) return [];
    return toArrayStrict(value);
}
function mapContext(mapper, context, _event) {
    var e_5, _a6;
    if (isFunction(mapper)) return mapper(context, _event.data);
    var result = {
    };
    try {
        for(var _b = _tslib.__values(Object.keys(mapper)), _c = _b.next(); !_c.done; _c = _b.next()){
            var key = _c.value;
            var subMapper = mapper[key];
            if (isFunction(subMapper)) result[key] = subMapper(context, _event.data);
            else result[key] = subMapper;
        }
    } catch (e_5_1) {
        e_5 = {
            error: e_5_1
        };
    } finally{
        try {
            if (_c && !_c.done && (_a6 = _b.return)) _a6.call(_b);
        } finally{
            if (e_5) throw e_5.error;
        }
    }
    return result;
}
function isBuiltInEvent(eventType) {
    return /^(done|error)\./.test(eventType);
}
function isPromiseLike(value) {
    if (value instanceof Promise) return true;
     // Check if shape matches the Promise/A+ specification for a "thenable".
    if (value !== null && (isFunction(value) || typeof value === 'object') && isFunction(value.then)) return true;
    return false;
}
function isBehavior(value) {
    return value !== null && typeof value === 'object' && 'transition' in value && typeof value.transition === 'function';
}
function partition(items, predicate) {
    var e_6, _a7;
    var _b = _tslib.__read([
        [],
        []
    ], 2), truthy = _b[0], falsy = _b[1];
    try {
        for(var items_1 = _tslib.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()){
            var item = items_1_1.value;
            if (predicate(item)) truthy.push(item);
            else falsy.push(item);
        }
    } catch (e_6_1) {
        e_6 = {
            error: e_6_1
        };
    } finally{
        try {
            if (items_1_1 && !items_1_1.done && (_a7 = items_1.return)) _a7.call(items_1);
        } finally{
            if (e_6) throw e_6.error;
        }
    }
    return [
        truthy,
        falsy
    ];
}
function updateHistoryStates(hist, stateValue) {
    return mapValues(hist.states, function(subHist, key) {
        if (!subHist) return undefined;
        var subStateValue = (isString(stateValue) ? undefined : stateValue[key]) || (subHist ? subHist.current : undefined);
        if (!subStateValue) return undefined;
        return {
            current: subStateValue,
            states: updateHistoryStates(subHist, subStateValue)
        };
    });
}
function updateHistoryValue(hist, stateValue) {
    return {
        current: stateValue,
        states: updateHistoryStates(hist, stateValue)
    };
}
function updateContext(context, _event, assignActions, state) {
    if (!environment.IS_PRODUCTION) exports.warn(!!context, 'Attempting to update undefined context');
    var updatedContext = context ? assignActions.reduce(function(acc, assignAction) {
        var e_7, _a8;
        var assignment = assignAction.assignment;
        var meta = {
            state: state,
            action: assignAction,
            _event: _event
        };
        var partialUpdate = {
        };
        if (isFunction(assignment)) partialUpdate = assignment(acc, _event.data, meta);
        else try {
            for(var _b = _tslib.__values(Object.keys(assignment)), _c = _b.next(); !_c.done; _c = _b.next()){
                var key = _c.value;
                var propAssignment = assignment[key];
                partialUpdate[key] = isFunction(propAssignment) ? propAssignment(acc, _event.data, meta) : propAssignment;
            }
        } catch (e_7_1) {
            e_7 = {
                error: e_7_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a8 = _b.return)) _a8.call(_b);
            } finally{
                if (e_7) throw e_7.error;
            }
        }
        return Object.assign({
        }, acc, partialUpdate);
    }, context) : context;
    return updatedContext;
} // tslint:disable-next-line:no-empty
exports.warn = function() {
};
if (!environment.IS_PRODUCTION) exports.warn = function(condition, message) {
    var error = condition instanceof Error ? condition : undefined;
    if (!error && condition) return;
    if (console !== undefined) {
        var args = [
            "Warning: ".concat(message)
        ];
        if (error) args.push(error);
         // tslint:disable-next-line:no-console
        console.warn.apply(console, args);
    }
};
function isArray(value) {
    return Array.isArray(value);
} // tslint:disable-next-line:ban-types
function isFunction(value) {
    return typeof value === 'function';
}
function isString(value) {
    return typeof value === 'string';
}
function toGuard(condition, guardMap) {
    if (!condition) return undefined;
    if (isString(condition)) return {
        type: constants.DEFAULT_GUARD_TYPE,
        name: condition,
        predicate: guardMap ? guardMap[condition] : undefined
    };
    if (isFunction(condition)) return {
        type: constants.DEFAULT_GUARD_TYPE,
        name: condition.name,
        predicate: condition
    };
    return condition;
}
function isObservable(value) {
    try {
        return 'subscribe' in value && isFunction(value.subscribe);
    } catch (e) {
        return false;
    }
}
var symbolObservable = /*#__PURE__*/ function() {
    return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}(); // TODO: to be removed in v5, left it out just to minimize the scope of the change and maintain compatibility with older versions of integration paackages
var interopSymbols = (_a = {
}, _a[symbolObservable] = function() {
    return this;
}, _a[Symbol.observable] = function() {
    return this;
}, _a);
function isMachine(value) {
    return !!value && '__xstatenode' in value;
}
function isActor(value) {
    return !!value && typeof value.send === 'function';
}
var uniqueId = /*#__PURE__*/ function() {
    var currentId = 0;
    return function() {
        currentId++;
        return currentId.toString(16);
    };
}();
function toEventObject(event, payload // id?: TEvent['type']
) {
    if (isString(event) || typeof event === 'number') return _tslib.__assign({
        type: event
    }, payload);
    return event;
}
function toSCXMLEvent(event, scxmlEvent) {
    if (!isString(event) && '$$type' in event && event.$$type === 'scxml') return event;
    var eventObject = toEventObject(event);
    return _tslib.__assign({
        name: eventObject.type,
        data: eventObject,
        $$type: 'scxml',
        type: 'external'
    }, scxmlEvent);
}
function toTransitionConfigArray(event, configLike) {
    var transitions = toArrayStrict(configLike).map(function(transitionLike) {
        if (typeof transitionLike === 'undefined' || typeof transitionLike === 'string' || isMachine(transitionLike)) return {
            target: transitionLike,
            event: event
        };
        return _tslib.__assign(_tslib.__assign({
        }, transitionLike), {
            event: event
        });
    });
    return transitions;
}
function normalizeTarget(target) {
    if (target === undefined || target === constants.TARGETLESS_KEY) return undefined;
    return toArray(target);
}
function reportUnhandledExceptionOnInvocation(originalError, currentError, id) {
    if (!environment.IS_PRODUCTION) {
        var originalStackTrace = originalError.stack ? " Stacktrace was '".concat(originalError.stack, "'") : '';
        if (originalError === currentError) // tslint:disable-next-line:no-console
        console.error("Missing onError handler for invocation '".concat(id, "', error was '").concat(originalError, "'.").concat(originalStackTrace));
        else {
            var stackTrace = currentError.stack ? " Stacktrace was '".concat(currentError.stack, "'") : ''; // tslint:disable-next-line:no-console
            console.error("Missing onError handler and/or unhandled exception/promise rejection for invocation '".concat(id, "'. ") + "Original error: '".concat(originalError, "'. ").concat(originalStackTrace, " Current error is '").concat(currentError, "'.").concat(stackTrace));
        }
    }
}
function evaluateGuard(machine, guard, context, _event, state) {
    var guards = machine.options.guards;
    var guardMeta = {
        state: state,
        cond: guard,
        _event: _event
    }; // TODO: do not hardcode!
    if (guard.type === constants.DEFAULT_GUARD_TYPE) return ((guards === null || guards === void 0 ? void 0 : guards[guard.name]) || guard.predicate)(context, _event.data, guardMeta);
    var condFn = guards === null || guards === void 0 ? void 0 : guards[guard.type];
    if (!condFn) throw new Error("Guard '".concat(guard.type, "' is not implemented on machine '").concat(machine.id, "'."));
    return condFn(context, _event.data, guardMeta);
}
function toInvokeSource(src) {
    if (typeof src === 'string') return {
        type: src
    };
    return src;
}
function toObserver(nextHandler, errorHandler, completionHandler) {
    if (typeof nextHandler === 'object') return nextHandler;
    var noop = function() {
        return void 0;
    };
    return {
        next: nextHandler,
        error: errorHandler || noop,
        complete: completionHandler || noop
    };
}
function createInvokeId(stateNodeId, index) {
    return "".concat(stateNodeId, ":invocation[").concat(index, "]");
}
exports.createInvokeId = createInvokeId;
exports.evaluateGuard = evaluateGuard;
exports.flatten = flatten;
exports.getActionType = getActionType;
exports.getEventType = getEventType;
exports.interopSymbols = interopSymbols;
exports.isActor = isActor;
exports.isArray = isArray;
exports.isBehavior = isBehavior;
exports.isBuiltInEvent = isBuiltInEvent;
exports.isFunction = isFunction;
exports.isMachine = isMachine;
exports.isObservable = isObservable;
exports.isPromiseLike = isPromiseLike;
exports.isStateLike = isStateLike;
exports.isString = isString;
exports.keys = keys;
exports.mapContext = mapContext;
exports.mapFilterValues = mapFilterValues;
exports.mapValues = mapValues;
exports.matchesState = matchesState;
exports.nestedPath = nestedPath;
exports.normalizeTarget = normalizeTarget;
exports.partition = partition;
exports.path = path;
exports.pathToStateValue = pathToStateValue;
exports.pathsToStateValue = pathsToStateValue;
exports.reportUnhandledExceptionOnInvocation = reportUnhandledExceptionOnInvocation;
exports.symbolObservable = symbolObservable;
exports.toArray = toArray;
exports.toArrayStrict = toArrayStrict;
exports.toEventObject = toEventObject;
exports.toGuard = toGuard;
exports.toInvokeSource = toInvokeSource;
exports.toObserver = toObserver;
exports.toSCXMLEvent = toSCXMLEvent;
exports.toStatePath = toStatePath;
exports.toStatePaths = toStatePaths;
exports.toStateValue = toStateValue;
exports.toTransitionConfigArray = toTransitionConfigArray;
exports.uniqueId = uniqueId;
exports.updateContext = updateContext;
exports.updateHistoryStates = updateHistoryStates;
exports.updateHistoryValue = updateHistoryValue;

},{"./_virtual/_tslib.js":"3Bp7b","./constants.js":"1Q9J9","./environment.js":"7oZy5"}],"1Q9J9":[function(require,module,exports) {
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var STATE_DELIMITER = '.';
var EMPTY_ACTIVITY_MAP = {
};
var DEFAULT_GUARD_TYPE = 'xstate.guard';
var TARGETLESS_KEY = '';
exports.DEFAULT_GUARD_TYPE = DEFAULT_GUARD_TYPE;
exports.EMPTY_ACTIVITY_MAP = EMPTY_ACTIVITY_MAP;
exports.STATE_DELIMITER = STATE_DELIMITER;
exports.TARGETLESS_KEY = TARGETLESS_KEY;

},{}],"7oZy5":[function(require,module,exports) {
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var IS_PRODUCTION = false;
exports.IS_PRODUCTION = IS_PRODUCTION;

},{}],"8TXLV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "siteInitMachine", ()=>siteInitMachine
);
var _xstate = require("xstate");
var _util = require("./util");
var _ui = require("./ui");
var _consts = require("./consts");
const siteInitMachine = /** @xstate-layout N4IgpgJg5mDOIC5SwJYBcwEkB26B0AwgBZgDGA1itlAPo4YBO2YaNAgqaXLAMQCqAJQAydAMo0BAeQBqdAAqJQABwD2qNChXZFIAB6IATAFYADHgBsADhMBOACxGAzOYCMJgw-MAaEAE9ELgDslnhGdo5GLkYGLpZGToEGAL5JPupYuGiEJBRUtPRgTCzsnNw8mAByACoAogIVNVXs0myYQmwAQkI1OqrqmtpIeoaWdhbBdpaBto52NoE2Rj7+CEY2eIEuLnYm0Zb2Jnbmiylp6Bn4xGSU1HTYjMysHFywvJW19Y00kgBiP0KVHpDProAY6fQIAC0bkCeH2LnMBlGNkO5kCdjsy0MYTwzhsCKCNkcBhMpOSqRA6Rw+AA6gBDUG3H4qBg0PiwQo0USkOnYGgdACuaDQWhocgYZVEBDYFX5fCqVUksoIAIIAGkagARXpqUFacGIRwmELxayRAyOBEGFGBLEIRyBWGORyWIIOywWzaWU6U87UrLc3m4JksiQyeQ8KSyTByGg-SR8Cra4G6jT6oYQzYuXGuWbBSxoozmbx+Q2TOGLV2k2ymGzeilUzJ4QPYYO0ZmsqMRmNc6UVCqVADiNDqUgEOv66dAEMt5jhLiNro8RkSBnRduic5MrhcdecrsRjhSFOwKggcB0jcuORu+XuhUeJRe8BTk8G08QkJJjjhTncxhMS0rQMO04jwOwoniaZAIxI1zB9K8snpRl21DdlORbfkhRFPlxW4Cc9XfYYoRJMYkU2YxFxdBFHDtOxjFCAxEUCWYbCYlxjAQv0mxbNs41DLsYwItMiIhIwCw2dx0RibZLDkyw6OOPAEUmaJJg8XcbC4jB-TwARIBQCVSFYDoGBUAB3DlWSqFQw2jBRX0Ig0EHMSJcTWTYbCsUxZhLFYDCYvATAXSiPXCRwbCJbSLgDc4JDAOkIBWZRUzBDNEGLMZTECcTAlcgsLSWUsEHmPA2I9FcPGCIkjwbbj0GEtKPxIpE8HIji-0sajzFo4roR-YxHTy45xN3fZyRSIA */ _xstate.createMachine({
    context: {
        peerServerConfig: {
        },
        rovIpAddr: null
    },
    id: "siteInit",
    initial: "Checking_Internet_Access",
    states: {
        Checking_Internet_Access: {
            invoke: {
                src: "checkInternetAvailable",
                id: "Check_Internet_Available"
            },
            on: {
                URL_IS_ROV_IP: {
                    actions: [
                        "setLocalPeerServerConfig",
                        "showHttpGamepadSupportDisabledAlert", 
                    ],
                    target: "#siteInit.Site_Ready"
                },
                INTERNET_AVAILABLE: {
                    actions: "setCloudPeerServerConfig",
                    target: "#siteInit.Site_Ready"
                },
                INTERNET_OFFLINE: {
                    actions: [
                        "showIpScanButton",
                        "hideLoadingUi"
                    ],
                    target: "#siteInit.Waiting_For_User_Scan_Button_Press"
                }
            }
        },
        Waiting_For_User_Scan_Button_Press: {
            description: "We need this because of browser popup blocking w/o user interaction",
            invoke: {
                src: "setupWaitForUserScanButtonPress",
                id: "wait_for_scan_button_press"
            },
            on: {
                SCAN_BUTTON_CLICKED: {
                    actions: [
                        "showIpScanningUi",
                        "hideIpScanButton"
                    ],
                    target: "#siteInit.Scanning_For_ROV_IP"
                }
            }
        },
        Scanning_For_ROV_IP: {
            invoke: {
                src: "scanForRovIP",
                id: "scan_for_rov_ip_addr"
            },
            on: {
                ROV_IP_FOUND: {
                    actions: "setRovIpAddr",
                    target: "#siteInit.Redirect_Browser_To_ROV_IP"
                },
                IP_SCANNING_ERROR: {
                    actions: [
                        "showIpScanButton",
                        "hideLoadingUi"
                    ],
                    target: "#siteInit.Waiting_For_User_Scan_Button_Press"
                }
            }
        },
        Redirect_Browser_To_ROV_IP: {
            entry: "redirectBrowserToRovIp"
        },
        Site_Ready: {
            entry: "siteReady",
            type: "final"
        }
    }
}, {
    actions: {
        setCloudPeerServerConfig: _xstate.assign({
            peerServerConfig: _consts.peerServerCloudOptions
        }),
        setLocalPeerServerConfig: _xstate.assign({
            peerServerConfig: _consts.peerServerLocalOptions
        }),
        setRovIpAddr: _xstate.assign({
            rovIpAddr: (context, event)=>{
                console.log(event);
                return event.data;
            }
        }),
        showIpScanButton: ()=>{
            _ui.showToastMessage("Click scan to find the ROV locally.");
            _ui.showToastMessage("No internet connection.");
            _ui.showScanIpBtn();
        },
        hideIpScanButton: ()=>{
            _ui.hideScanIpButton();
        },
        hideLoadingUi: ()=>{
            _ui.hideLoadingUi();
        },
        showIpScanningUi: ()=>{
            _ui.showLoadingUi("Scanning for ROV IP address...");
        },
        redirectBrowserToRovIp: (context, event)=>{
            window.location = "http://" + event.data;
        },
        siteReady: _xstate.sendParent((context)=>{
            return {
                type: "SITE_READY",
                data: context
            };
        })
    },
    services: {
        checkInternetAvailable: ()=>{
            _ui.showLoadingUi("Checking internet connection...");
            return (callback)=>{
                _util.isInternetAvailable("https://" + _consts.peerServerCloudOptions.host).then((internetOnline)=>{
                    if (internetOnline) callback("INTERNET_AVAILABLE");
                    else {
                        // INTERNET OFFLINE
                        // check if we are viewing this site at an IP ADDRESS or .local domain
                        // indicating this page was served directly from the rov (presumably)
                        const urlHostParts = window.location.host.split(".");
                        if (urlHostParts.length == 4 && !isNaN(urlHostParts[3]) || urlHostParts.length == 2 && urlHostParts[1] == "local") // in which case we are viewing this site at the rov's ip (presumably)
                        callback("URL_IS_ROV_IP");
                        else // otherwise the internet is just offline
                        callback("INTERNET_OFFLINE");
                    }
                });
            // }
            };
        },
        setupWaitForUserScanButtonPress: ()=>{
            return (callback)=>{
                _ui.showScanIpBtn();
                const onBtnClick = ()=>{
                    callback("SCAN_BUTTON_CLICKED");
                };
                const btnElem = document.getElementById("scan_for_ip_btn");
                btnElem.addEventListener("click", onBtnClick);
                // cleanup function on state exit:
                return ()=>{
                    btnElem.removeEventListener("click", onBtnClick);
                // hideBtnElem()
                };
            };
        },
        scanForRovIP: ()=>{
            return ()=>{
                _ui.showLoadingUi("Scanning for ROV IP address...");
            // setTimeout(() => {
            // hideLoadingUi()
            //   callback({
            //     type: "ROV_IP_FOUND",
            //     data: "UHhh the ip address man!",
            //   });
            // }, 3000);
            };
        }
    },
    guards: {
    }
}); // const machineFunctionsMock = {
 //   actions: {
 //     setCloudPeerServerConfig: assign({
 //       peerServerConfig: {
 //         hi: "clound",
 //       },
 //     }),
 //     setLocalPeerServerConfig: assign({
 //       peerServerConfig: {
 //         hi: "local",
 //       },
 //     }),
 //     setRovIpAddr: assign({
 //       rovIpAddr: (context, event) => {
 //         console.log(event);
 //         return "192.168.1.1.11.1";
 //       },
 //     }),
 //     setGamepadOnscreenFallback: () => { },
 //     redirectBrowserToRovIp: (context, event) => {
 //       // window.location = "http://" + event.data
 //     },
 //   },
 //   services: {
 //     checkInternetAvailable: (context, event) => {
 //       return (callback, onReceive) => {
 //         // // check if we are viewing this site at an IP ADDRESS or .local domain
 //         // // indicating this page was served directly from the rov (presumably)
 //         // const urlHostParts = window.location.host.split(".");
 //         // if (
 //         //   (urlHostParts.length == 4 && parseInt(urlHostParts[3]) != NaN) ||
 //         //   (urlHostParts.length == 2 && urlHostParts[1] == "local")
 //         // ) {
 //         //   callback("URL_IS_ROV_IP");
 //         // } else {
 //         // checkInternetAvailable().then(()=>{
 //         //   callback("INTERNET_AVAILABLE");
 //         // }).catch((e)=>{
 //         //   console.warn("Internet Offline, starting switch to local mode", e)
 //         //   callback("INTERNET_OFFLINE");
 //         // })
 //         // }
 //         setTimeout(() => {
 //           callback("URL_IS_ROV_IP");
 //           // INTERNET_OFFLINE
 //           // URL_IS_ROV_IP
 //         }, 3000);
 //       };
 //     },
 //     setupWaitForUserScanButtonPress: (context, event) => {
 //       return (callback, onReceive) => {
 //         const onBtnClick = () => {
 //           callback("SCAN_BUTTON_CLICKED");
 //         };
 //         // btnElem = makeButtonElem()
 //         // btnElem.addEventListener("click",onBtnClick)
 //         setTimeout(() => {
 //           onBtnClick();
 //         }, 3000);
 //         // cleanup function on state exit:
 //         return () => {
 //           // btnElem.removeEventListener("click",onBtnClick)
 //           // hideBtnElem()
 //         };
 //       };
 //     },
 //     scanForRovIP: (context, event) => {
 //       return (callback, onReceive) => {
 //         setTimeout(() => {
 //           callback({
 //             type: "ROV_IP_FOUND",
 //             data: "hids",
 //           });
 //         }, 3000);
 //       };
 //     },
 //     createGamepadHttpsIframe: (context, event) => {
 //       return (callback, onReceive) => {
 //         setTimeout(() => {
 //           // callback("GAMEPAD_IFRAME_LOADED");
 //           callback("GAMEPAD_IFRAME_LOAD_ERROR");
 //         }, 3000);
 //       };
 //     },
 //   },
 //   guards: {},
 // }

},{"xstate":"2sk4t","./util":"doATT","./ui":"efi6n","./consts":"2J0f1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hGSry":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "peerConnMachine", ()=>peerConnMachine
);
var _xstate = require("xstate");
var _ui = require("./ui");
var _util = require("./util");
var _actions = require("xstate/lib/actions");
// FOR CONVERTING TEXT TO/FROM BINARY FOR SENDING OVER THE WEBRTC DATACHANNEL
const messageEncoder = new TextEncoder(); // always utf-8
const messageDecoder = new TextDecoder(); // always utf-8
const peerConnMachine = /** @xstate-layout N4IgpgJg5mDOIC5QAcxgE4GED2A7XYAxgC4CWeAdAHLbED6O+RxkdAKtnQErYBuAxFwDyANQZCqVAKKY2ASQl0pAZTYBBAEIAZOcoASUgCKIU2WKTJ4TIAB6IAtAEYArACYKAdgBsX194AcAAwejq7+AJyuADQgAJ6IjoEALBT+Po5JzgDMXuEe-q6uWQC+xTGoGIwEJOS41LQMeNUsEOycPALCYgAKUlJc4pIy8or9wlzWyGYWtdZ2CPYRKV7OkUX+jv5JXln+MfEImx6pWW5ZgYFnroE5peVoWE3MtRRVzKwc3HwUhgCGxL9MAALX5MAA2P3+vwYIPBdEMpFghCeJEg-EManUmD0aiGWiUqk0On0Rkm00suDmiCyHnc-n8qx2DOy2w8SX2iA8zkCFBp4XONM2WSSlzuIAqjyYNUob1RrU+HUhAOBoIIEL+AJhqrAYPhiORUpa6MxamxuOk+PkAFkpEIAKpsMnmClUhAeEIURz88KBNIRRKudlxRCrCjhVbh5JJRxs-wlMrih6yimvFEtNpfXhKwGwtXZrVwoSoXDGrE4vHw3SYCTSWROmZWJC2am0ijOEKB9uFVyhLIct3hfy8pKRZxbLLhFbhMUS5MvZMfdrfDU57XqqEFtV0ItgEvKKRUQx0G3KZRqADiUnYQm4onrLqb8ycPdSDK9eW2gRc-g8-a8FwoJItiSIp-x-NwvBnJM03nNNF0zbMVXBfMkK3HcS3PIQ2GPFQz0vOgADFhCtW8RHvWZHwcUJwlSEcvEcGMbmcdsGX7ZxHCyNs-DZL0LjCLJXCgyoYJlOD5SXLMrUgUhV2Qmh6HQ-gbUMOQ1AYcsLQJdRtF0AxjCbKZnQo0B5j8RwKECVxwjyQJJ1CLwkj7YNDi9dxHPDNZuX-bIhMlZpYMNeDFSkiAZNQnUKBCmTNx1RpAogfgRDkQxbToVQuCkNQSIytRDAATXIxsTMQGyKFcXJbMuLZgjjfsGMiQCJ1WQovMueN7mEw0AuaILvii2S1SUoxVPU80pEtOQbXtR0DPJYzmwQQVeXKoCMiyIV6LYmiPJ9bwQI8G5yt8udRPijMOkEUQ6F6fpBlrEYqCULhxkKylKIWEIhy8fJvF8crnCZftypopIOzSZJbJjJJSgTXBsAgOBJmgrrKHkuKevEzNXtdexViHHsvCCMcuTcEJ+3sdwLjjdiRSKTsMmhhNZxEuoF0xxUV3C9dNS5vUkTE7H3sJ5xPRcCcLg8XZQkcftaTc4Gf1CVxmJA46WdTM6FWXKEuZQ3NYvQwXioWUJjj8SJfCCZWBPYv8GqSaNEmyGNu3axNOv806MfO7XlX1sEjYWpxslouzGNOFjnH7XYaOauMewZcNlbVlHWbEn3JOkgaIrRw3ZqMoqg4YziIgFc45fDBi6pcFJwzHBzTYcyCmeRz2081iTIqz3X+pi3U2cD+YAc4sJ6NpDiIi2aJnPqlIHdyCJInOSGU7bjXva1zPQuziERFIBHOGUYh0DAX4AFtt2LQeEh7TiJ3ycJQfWopvDqnttqs910gE-JV+eL33jsz6t3f218TY0lSPyG45dCiV37NZEWENgig3yF+DIf9pTtw3hJMBTh3Sh3ouHZi+Qo7OX+hQFYHgfSDiCIkGMGCHymALm9Y29hwibAoc1dYmxti7HJqEEWj8BLrWyOGHYDsYbFCAA */ _xstate.createMachine({
    context: {
        /* NOTE that the context is really set by the parent machine, not here */ thisPeer: null,
        rovPeerId: null,
        rovDataConnection: null
    },
    exit: "stopPeerConnectionEventHandler",
    id: "peerConnection",
    initial: "Not_Connected_To_Rov",
    states: {
        Not_Connected_To_Rov: {
            entry: [
                "showConnectingUi",
                "connectToRovPeerAndStartPeerConnectionEventHandler", 
            ],
            on: {
                ROV_CONNECTION_ESTABLISHED: {
                    actions: "rovPeerConnectionEstablished",
                    target: "Connected_To_Rov"
                },
                ROV_PEER_CONNECTION_ERROR: {
                    target: "Not_Connected_To_Rov",
                    internal: false
                }
            }
        },
        Connected_To_Rov: {
            entry: "showRovConnectedUi",
            type: "parallel",
            states: {
                DataChannel: {
                    exit: "closeDownDataChannel",
                    initial: "Data_Channel_Open",
                    states: {
                        Data_Channel_Disconnected: {
                            entry: "showConnectingUi",
                            invoke: {
                                src: "watchForRovReconnect",
                                id: "watchForRovReconnect"
                            },
                            on: {
                                DATACHANNEL_ESTABLISHED: {
                                    target: "Data_Channel_Open"
                                },
                                DATACHANNEL_TIMEOUT: {
                                    target: "#peerConnection.Not_Connected_To_Rov"
                                }
                            }
                        },
                        Data_Channel_Open: {
                            entry: "showRovConnectedUi",
                            invoke: [
                                {
                                    src: "handleDataChannelEvents",
                                    id: "handleDataChannelEvents"
                                },
                                {
                                    src: "watchForRovDisconnect",
                                    id: "watchForRovDisconnect"
                                }, 
                            ],
                            on: {
                                DATACHANNEL_DISCONNECT: {
                                    target: "Data_Channel_Disconnected"
                                },
                                SEND_MESSAGE_TO_ROV: {
                                    actions: "sendMessageToRov"
                                },
                                GOT_MESSAGE_FROM_ROV: {
                                    actions: "gotMessageFromRov"
                                }
                            }
                        }
                    }
                },
                MediaChannel: {
                    exit: [
                        "closeDownMediaChannel",
                        "hideLivestreamUi"
                    ],
                    initial: "Not_Open",
                    states: {
                        Not_Open: {
                            description: 'ROV Will "Video Call" this plot, and that is hooked up to trigger the MEDIA_CHANNEL_ESTABLISHED transition',
                            invoke: {
                                src: "awaitMediaCall",
                                id: "awaitMediaCall"
                            },
                            on: {
                                MEDIA_CHANNEL_ESTABLISHED: {
                                    actions: [
                                        "setMediaChannel",
                                        "showMediaChannelConnectedNotice", 
                                    ],
                                    target: "Media_Channel_Connected"
                                }
                            }
                        },
                        Media_Channel_Connected: {
                            invoke: {
                                src: "awaitVideoStream",
                                id: "awaitVideoStream"
                            },
                            on: {
                                VIDEO_STREAM_READY: {
                                    actions: [
                                        "setVideoStream",
                                        "showGotVideoStreamNotice"
                                    ],
                                    target: "Video_Stream_Open"
                                }
                            }
                        },
                        Video_Stream_Open: {
                        }
                    },
                    on: {
                        MEDIA_CHANNEL_TIMEOUT: {
                            target: "#peerConnection.Not_Connected_To_Rov"
                        }
                    }
                }
            },
            on: {
                ROV_PEER_CONNECTION_ERROR: {
                    target: "Not_Connected_To_Rov"
                }
            }
        }
    }
}, {
    actions: {
        showConnectingUi: _ui.showROVConnectingUi,
        showRovConnectedUi: (context, event)=>{
            _ui.showROVConnectedUi(event.data ? event.data.peer : null);
        },
        showMediaChannelConnectedNotice: ()=>{
            _ui.showToastMessage("ROV Media Channel Connected!");
        },
        showGotVideoStreamNotice: ()=>{
            _ui.showToastMessage("Got ROV Video Stream!");
            _ui.hideLoadingUi();
            _ui.showLivestreamUi();
        },
        hideLivestreamUi: ()=>{
            _ui.hideLivestreamUi();
        },
        setMediaChannel: _xstate.assign({
            mediaChannel: (context, event)=>{
                const mediaChannel = event.data;
                return mediaChannel;
            }
        }),
        setVideoStream: _xstate.assign({
            videoStream: (context, event)=>{
                const rovVideoStream = event.data;
                const videoElem = document.getElementById('video-livestream');
                videoElem.srcObject = rovVideoStream; // video.src = URL.createObjectURL(rovVideoStream);
                videoElem.muted = true;
                videoElem.autoplay = true;
                videoElem.controls = false;
                videoElem.play();
                return rovVideoStream;
            }
        }),
        rovPeerConnectionEstablished: _xstate.sendParent("ROV_CONNECTION_ESTABLISHED"),
        sendMessageToRov: (context, event)=>{
            const outgoingMessage = event.data;
            const rovDataConnection = context.rovDataConnection;
            if (!rovDataConnection || !rovDataConnection.open || !rovDataConnection.peerConnection.iceConnectionState || rovDataConnection.peerConnection.iceConnectionState != "connected") {
                console.warn("Tried to send message on closed data channel: ", outgoingMessage);
                return;
            }
            console.log("Sending Datachannel Message: ", outgoingMessage);
            const encodedMessage = messageEncoder.encode(outgoingMessage);
            rovDataConnection.send(encodedMessage);
        },
        gotMessageFromRov: _xstate.sendParent((context, event)=>{
            return {
                type: "GOT_MESSAGE_FROM_ROV",
                data: event.data
            };
        }),
        closeDownMediaChannel: (context)=>{
            console.info("Closing media channel...");
            if (context.mediaChannel) context.mediaChannel.close();
        },
        closeDownDataChannel: (context)=>{
            console.info("Closing data channel...");
            if (context.rovDataConnection) context.rovDataConnection.close();
        },
        connectToRovPeerAndStartPeerConnectionEventHandler: _xstate.assign((context)=>{
            console.log("Connecting to ROV:" + context.rovPeerId);
            const rovDataConnection = context.thisPeer.connect(context.rovPeerId, {
                reliable: true,
                serialization: 'none'
            });
            return {
                rovDataConnection: rovDataConnection,
                peerConnectionEventHandler: _xstate.spawn((sendStateChange)=>{
                    const openHandler = _util.generateStateChangeFunction(sendStateChange, "ROV_CONNECTION_ESTABLISHED", rovDataConnection);
                    const errorHandler = _util.generateStateChangeFunction(sendStateChange, "ROV_PEER_CONNECTION_ERROR", null, (err)=>console.log("ROV_PEER_CONNECTION_ERROR:", err)
                    );
                    rovDataConnection.on("open", openHandler);
                    rovDataConnection.on("error", errorHandler);
                    return ()=>{
                        rovDataConnection.off("open", openHandler);
                        rovDataConnection.off("error", errorHandler);
                    };
                }, "peerConnectionEventHandler")
            };
        }),
        stopPeerConnectionEventHandler: _actions.stop("peerConnectionEventHandler")
    },
    services: {
        awaitMediaCall: (context)=>{
            return (sendStateChange)=>{
            // showLoadingUi("Waiting for ROV Media Call...");
            // const callHandler = generateStateChangeFunction(sendStateChange, "MEDIA_CHANNEL_ESTABLISHED", null, (rovMediaConnection) => {
            //     showToastMessage('Got media call from peer: ' + rovMediaConnection.peer)
            //     rovMediaConnection.answer(null, {
            //         // sdpTransform: function (sdp) {
            //         //     console.log('answer sdp: ', sdp);
            //         //     return sdp;
            //         // }
            //     });
            // })
            // context.thisPeer.on('call', callHandler);
            // const timeoutId = setTimeout(() => {
            //     sendStateChange({ type: "MEDIA_CHANNEL_TIMEOUT" });
            // }, 16000);
            // return () => {
            //     clearTimeout(timeoutId);
            //     context.thisPeer.off('call', callHandler);
            // }
            };
        },
        awaitVideoStream: (context)=>{
            return (sendStateChange)=>{
                console.log("Awaiting video stream from ROV...");
                const videoReadyHandler = _util.generateStateChangeFunction(sendStateChange, "VIDEO_STREAM_READY");
                context.mediaChannel.on('stream', videoReadyHandler);
                const timeoutId = setTimeout(()=>{
                    sendStateChange({
                        type: "MEDIA_CHANNEL_TIMEOUT"
                    });
                }, 16000);
                return ()=>{
                    clearTimeout(timeoutId);
                    context.mediaChannel.off('stream', videoReadyHandler);
                };
            };
        },
        handleDataChannelEvents: (context)=>{
            return (sendStateChange)=>{
                const rovDataConnection = context.rovDataConnection;
                // handle new messages from the datachannel (comming FROM the rov)
                console.log("handleDataChannelEvents:", rovDataConnection);
                const dataMsgRecivedHandler = (encodedMessage)=>{
                    const message = messageDecoder.decode(encodedMessage);
                    sendStateChange({
                        type: "GOT_MESSAGE_FROM_ROV",
                        data: message
                    });
                };
                rovDataConnection.on('data', dataMsgRecivedHandler);
                // cleanup event listeners when the state is exited
                return ()=>{
                    rovDataConnection.off("data", dataMsgRecivedHandler);
                };
            };
        },
        watchForRovDisconnect: (context)=>{
            return (sendStateChange)=>{
                const rovDataConnection = context.rovDataConnection;
                // every second (interval 1000) check if the datachannel peer connection has disconnected
                const intervalId = setInterval(()=>{
                    const connectionState = rovDataConnection.peerConnection ? rovDataConnection.peerConnection.iceConnectionState : "disconnected";
                    if (connectionState == "disconnected") sendStateChange("DATACHANNEL_DISCONNECT");
                }, 1000);
                return ()=>{
                    // cleanup the check interval when the state is exited
                    clearInterval(intervalId);
                };
            };
        },
        watchForRovReconnect: (context)=>{
            return (sendStateChange)=>{
                const rovDataConnection = context.rovDataConnection;
                var datachannelTimeoutCountdown = 10;
                var lastIceConnectionState = "disconnected";
                // every second (interval 1000) check if the datachannel peer connection is still disconnected
                // if it's disconnected: count down a timeout counter, if it's still not connected after the timeout, then fire the DATACHANNEL_TIMEOUT event
                // if it connects: reset the countdown.
                const intervalId = setInterval(()=>{
                    const connectionState = rovDataConnection.peerConnection ? rovDataConnection.peerConnection.iceConnectionState : "disconnected";
                    if (connectionState == "disconnected") {
                        datachannelTimeoutCountdown--;
                        _ui.showToastMessage("Waiting for ROV to Reconnect: " + datachannelTimeoutCountdown, 1000);
                    } else if (connectionState == "connected" && lastIceConnectionState != "connected") {
                        datachannelTimeoutCountdown = 10;
                        _ui.showToastMessage("ROV Reconnected!", 2000);
                        sendStateChange("DATACHANNEL_ESTABLISHED");
                    }
                    lastIceConnectionState = connectionState;
                    // If we have waited too long without the rov reconnecting
                    if (datachannelTimeoutCountdown <= 0) sendStateChange({
                        type: "DATACHANNEL_TIMEOUT"
                    });
                }, 1000);
                return ()=>{
                    // cleanup the check interval when the state is exited
                    clearInterval(intervalId);
                };
            };
        },
        awaitSwitchRovBtnPress: ()=>{
            return (sendStateChange)=>{
                const cleanupFunc = _ui.setupSwitchRovBtnClickHandler(()=>{
                    sendStateChange("CONNECT_TO_NEXT_ROBOT");
                });
                return cleanupFunc;
            };
        }
    }
});
console.log("Peerjs rov Connection Machine: ", peerConnMachine.options);

},{"xstate":"2sk4t","./ui":"efi6n","./util":"doATT","xstate/lib/actions":"b9dCp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3YceA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "peerServerConnMachine", ()=>peerServerConnMachine
);
var _xstate = require("xstate");
var _peerjs = require("peerjs");
var _peerjsDefault = parcelHelpers.interopDefault(_peerjs);
// import * as consts from "./consts";
var _util = require("./util");
var _ui = require("./ui");
// showROVDisconnectedUi, showROVConnectingUi, showROVConnectedUi, setupConnectBtnClickHandler, showToastDialog, hideLoadingUi, setupDisconnectBtnClickHandler, setupSwitchRovBtnClickHandler
const { pure , stop , send , sendParent , assign  } = _xstate.actions;
const FATAL_PEER_ERROR_TYPES = [
    "network",
    "unavailable-id",
    "invalid-id",
    "invalid-key",
    "browser-incompatible",
    "webrtc",
    "server-error",
    "ssl-unavailable",
    "socket-error",
    "socket-closed"
];
const peerServerConnMachine = _xstate.createMachine({
    context: {
        /* NOTE that the context is really set by the parent machine, not here */ peerServerConfig: null,
        peerConnectionTimeout: 0,
        thisPeer: null,
        peerServerEventsHandler: null
    },
    id: "peerServerConnection",
    initial: "Not_Connected_To_Peer_Server",
    exit: [
        "cleanupPeerServerConnection"
    ],
    states: {
        Not_Connected_To_Peer_Server: {
            entry: [
                "setupPeerAndStartPeerServerEventsHandler"
            ],
            on: {
                PEER_SERVER_CONNECTION_ESTABLISHED: {
                    target: "#peerServerConnection.Connected_To_Peer_Server"
                },
                PEERJS_ERROR: {
                    target: "#peerServerConnection.Handling_Error"
                }
            }
        },
        Connected_To_Peer_Server: {
            entry: [
                "showPeerServerConnectedNotice",
                "notifyParentOfPeerServerConnection"
            ],
            invoke: {
                src: "handlePeerSeverEvents",
                id: "handlePeerSeverEvents"
            },
            on: {
                PEERJS_ERROR: {
                    target: "#peerServerConnection.Handling_Error"
                },
                PEER_SERVER_DISCONNECTED: {
                    actions: "showPeerServerDisconnectedNotice",
                    target: "#peerServerConnection.Reconnecting_to_Peer_Server"
                }
            }
        },
        Reconnecting_to_Peer_Server: {
            invoke: {
                src: "reconnectToPeerServer",
                id: "reconnectToPeerServer"
            },
            on: {
                PEER_SERVER_CONNECTION_ESTABLISHED: {
                    actions: "showPeerServerConnectedNotice",
                    target: "#peerServerConnection.Connected_To_Peer_Server"
                },
                PEERJS_ERROR: {
                    target: "#peerServerConnection.Handling_Error"
                }
            }
        },
        Handling_Error: {
            entry: "handlePeerServerError",
            on: {
                PEER_SERVER_CONNECTION_CLOSED: {
                    actions: [
                        "cleanupPeerServerConnection"
                    ],
                    target: "#peerServerConnection.Not_Connected_To_Peer_Server"
                }
            }
        }
    }
}, {
    actions: {
        "showPeerServerConnectedNotice": ()=>{
            _ui.showToastMessage("Connected to Peerjs Server!");
        },
        "showPeerServerDisconnectedNotice": ()=>{
            _ui.showToastMessage("Peerjs Server Disconnected");
        },
        // setupThisPeerWithPeerServer: assign({
        // }),
        "notifyParentOfPeerServerConnection": sendParent((context)=>{
            return {
                type: "PEER_SERVER_CONNECTION_ESTABLISHED",
                data: context.thisPeer
            };
        }),
        "handlePeerServerError": pure((context, event)=>{
            const err = event.data;
            if (err.type == 'browser-incompatible') {
                alert('Your web browser does not support some WebRTC features. Please use a newer or different browser.');
                return sendParent({
                    type: "WEBRTC_FATAL_ERROR"
                });
            } else if (err.type == "webrtc") {
                _ui.showToastMessage("WebRTC protocol error! Reloading website now...");
                return sendParent({
                    type: "WEBRTC_FATAL_ERROR"
                });
            } else if (err.type == "peer-unavailable") return sendParent({
                type: "PEER_NOT_YET_READY_ERROR",
                data: err
            });
            else if (FATAL_PEER_ERROR_TYPES.includes(err.type)) {
                _ui.showToastMessage("Peerjs Server Fatal Error: " + err.type + " Restarting...");
                return sendParent({
                    type: "PEER_SERVER_FATAL_ERROR"
                });
            } else {
                _ui.showToastMessage("Peerjs Server Error: " + err.type + " Restarting...");
                console.dir("Peerjs Server Error: ", err);
                return send({
                    type: "PEER_SERVER_CONNECTION_CLOSED"
                });
            }
        }),
        "cleanupPeerServerConnection": ()=>{
            console.log(pure);
        },
        // assign({
        //     thisPeer: (context) => {
        //         console.log("cleanupPeerServerConnection: ", context.thisPeer)
        //         if (context.thisPeer) {
        //             context.thisPeer.destroy()
        //         }
        //         return null;
        //     }
        // }),
        "setupPeerAndStartPeerServerEventsHandler": assign((context)=>{
            const thisPeer = window.thisPeerjsPeer = new _peerjsDefault.default(null, context.peerServerConfig);
            return {
                thisPeer: thisPeer,
                peerServerEventsHandler: _xstate.spawn((sendStateChange)=>{
                    const openHandler = _util.generateStateChangeFunction(sendStateChange, "PEER_SERVER_CONNECTION_ESTABLISHED", thisPeer);
                    const errHandler = _util.generateStateChangeFunction(sendStateChange, "PEERJS_ERROR", null, console.log);
                    thisPeer.on("open", openHandler);
                    thisPeer.on("error", errHandler);
                    return ()=>{
                        thisPeer.off("open", openHandler);
                        thisPeer.off("error", errHandler);
                    };
                }, "peerServerEventsHandler")
            };
        })
    },
    services: {
        handlePeerSeverEvents: (context)=>{
            return (sendStateChange)=>{
                const errorHandler = _util.generateStateChangeFunction(sendStateChange, "PEERJS_ERROR");
                const disconnectedHandler = _util.generateStateChangeFunction(sendStateChange, "PEER_SERVER_DISCONNECTED");
                context.thisPeer.on("disconnected", disconnectedHandler);
                context.thisPeer.on("error", errorHandler);
                return ()=>{
                    context.thisPeer.off("disconnected", disconnectedHandler);
                    context.thisPeer.off("error", errorHandler);
                };
            };
        },
        reconnectToPeerServer: (context)=>{
            return ()=>{
                _ui.showLoadingUi("Reconnecting to peer server...");
                context.thisPeer.reconnect();
            };
        }
    }
});
console.log("Peerjs Server Connection Machine: ", peerServerConnMachine.options.actions);

},{"xstate":"2sk4t","peerjs":"jvZeO","./util":"doATT","./ui":"efi6n","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jvZeO":[function(require,module,exports) {
parcelRequire = (function(e1, r1, t1, n1) {
    var i1, o = "function" == typeof parcelRequire && parcelRequire, u = "function" == typeof require && undefined;
    function f(t, n) {
        if (!r1[t]) {
            if (!e1[t]) {
                var i = "function" == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && "string" == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw c.code = "MODULE_NOT_FOUND", c;
            }
            p.resolve = function(r) {
                return e1[t][1][r] || r;
            }, p.cache = {
            };
            var l = r1[t] = new f.Module(t);
            e1[t][0].call(l.exports, p, l, l.exports, this);
        }
        function p(e) {
            return f(p.resolve(e));
        }
        return r1[t].exports;
    }
    f.isParcelRequire = !0, f.Module = function(e) {
        this.id = e, this.bundle = f, this.exports = {
        };
    }, f.modules = e1, f.cache = r1, f.parent = o, f.register = function(r2, t) {
        e1[r2] = [
            function(e, r) {
                r.exports = t;
            },
            {
            }
        ];
    };
    for(var c1 = 0; c1 < t1.length; c1++)try {
        f(t1[c1]);
    } catch (e) {
        i1 || (i1 = e);
    }
    if (t1.length) {
        var l1 = f(t1[t1.length - 1]);
        "object" == typeof exports && "undefined" != typeof module ? module.exports = l1 : "function" == typeof define && define.amd ? define(function() {
            return l1;
        }) : n1 && (this[n1] = l1);
    }
    if (parcelRequire = f, i1) throw i1;
    return f;
})({
    "EgBh": [
        function(require, module, exports) {
            var e2 = {
            };
            e2.useBlobBuilder = (function() {
                try {
                    return new Blob([]), !1;
                } catch (e) {
                    return !0;
                }
            })(), e2.useArrayBufferView = !e2.useBlobBuilder && (function() {
                try {
                    return 0 === new Blob([
                        new Uint8Array([])
                    ]).size;
                } catch (e) {
                    return !0;
                }
            })(), module.exports.binaryFeatures = e2;
            var r3 = module.exports.BlobBuilder;
            function t2() {
                this._pieces = [], this._parts = [];
            }
            "undefined" != typeof window && (r3 = module.exports.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder), t2.prototype.append = function(e) {
                "number" == typeof e ? this._pieces.push(e) : (this.flush(), this._parts.push(e));
            }, t2.prototype.flush = function() {
                if (this._pieces.length > 0) {
                    var r = new Uint8Array(this._pieces);
                    e2.useArrayBufferView || (r = r.buffer), this._parts.push(r), this._pieces = [];
                }
            }, t2.prototype.getBuffer = function() {
                if (this.flush(), e2.useBlobBuilder) {
                    for(var t = new r3, i = 0, u = this._parts.length; i < u; i++)t.append(this._parts[i]);
                    return t.getBlob();
                }
                return new Blob(this._parts);
            }, module.exports.BufferBuilder = t2;
        },
        {
        }
    ],
    "kdPp": [
        function(require, module, exports) {
            var t3 = require("./bufferbuilder").BufferBuilder, e3 = require("./bufferbuilder").binaryFeatures, i2 = {
                unpack: function(t) {
                    return new r4(t).unpack();
                },
                pack: function(t) {
                    var e = new n2;
                    return e.pack(t), e.getBuffer();
                }
            };
            function r4(t) {
                this.index = 0, this.dataBuffer = t, this.dataView = new Uint8Array(this.dataBuffer), this.length = this.dataBuffer.byteLength;
            }
            function n2() {
                this.bufferBuilder = new t3;
            }
            function u1(t) {
                var e = t.charCodeAt(0);
                return e <= 2047 ? "00" : e <= 65535 ? "000" : e <= 2097151 ? "0000" : e <= 67108863 ? "00000" : "000000";
            }
            function a1(t) {
                return t.length > 600 ? new Blob([
                    t
                ]).size : t.replace(/[^\u0000-\u007F]/g, u1).length;
            }
            module.exports = i2, r4.prototype.unpack = function() {
                var t, e = this.unpack_uint8();
                if (e < 128) return e;
                if ((224 ^ e) < 32) return (224 ^ e) - 32;
                if ((t = 160 ^ e) <= 15) return this.unpack_raw(t);
                if ((t = 176 ^ e) <= 15) return this.unpack_string(t);
                if ((t = 144 ^ e) <= 15) return this.unpack_array(t);
                if ((t = 128 ^ e) <= 15) return this.unpack_map(t);
                switch(e){
                    case 192:
                        return null;
                    case 193:
                        return;
                    case 194:
                        return !1;
                    case 195:
                        return !0;
                    case 202:
                        return this.unpack_float();
                    case 203:
                        return this.unpack_double();
                    case 204:
                        return this.unpack_uint8();
                    case 205:
                        return this.unpack_uint16();
                    case 206:
                        return this.unpack_uint32();
                    case 207:
                        return this.unpack_uint64();
                    case 208:
                        return this.unpack_int8();
                    case 209:
                        return this.unpack_int16();
                    case 210:
                        return this.unpack_int32();
                    case 211:
                        return this.unpack_int64();
                    case 212:
                    case 213:
                    case 214:
                    case 215:
                        return;
                    case 216:
                        return t = this.unpack_uint16(), this.unpack_string(t);
                    case 217:
                        return t = this.unpack_uint32(), this.unpack_string(t);
                    case 218:
                        return t = this.unpack_uint16(), this.unpack_raw(t);
                    case 219:
                        return t = this.unpack_uint32(), this.unpack_raw(t);
                    case 220:
                        return t = this.unpack_uint16(), this.unpack_array(t);
                    case 221:
                        return t = this.unpack_uint32(), this.unpack_array(t);
                    case 222:
                        return t = this.unpack_uint16(), this.unpack_map(t);
                    case 223:
                        return t = this.unpack_uint32(), this.unpack_map(t);
                }
            }, r4.prototype.unpack_uint8 = function() {
                var t = 255 & this.dataView[this.index];
                return this.index++, t;
            }, r4.prototype.unpack_uint16 = function() {
                var t = this.read(2), e = 256 * (255 & t[0]) + (255 & t[1]);
                return this.index += 2, e;
            }, r4.prototype.unpack_uint32 = function() {
                var t = this.read(4), e = 256 * (256 * (256 * t[0] + t[1]) + t[2]) + t[3];
                return this.index += 4, e;
            }, r4.prototype.unpack_uint64 = function() {
                var t = this.read(8), e = 256 * (256 * (256 * (256 * (256 * (256 * (256 * t[0] + t[1]) + t[2]) + t[3]) + t[4]) + t[5]) + t[6]) + t[7];
                return this.index += 8, e;
            }, r4.prototype.unpack_int8 = function() {
                var t = this.unpack_uint8();
                return t < 128 ? t : t - 256;
            }, r4.prototype.unpack_int16 = function() {
                var t = this.unpack_uint16();
                return t < 32768 ? t : t - 65536;
            }, r4.prototype.unpack_int32 = function() {
                var t = this.unpack_uint32();
                return t < Math.pow(2, 31) ? t : t - Math.pow(2, 32);
            }, r4.prototype.unpack_int64 = function() {
                var t = this.unpack_uint64();
                return t < Math.pow(2, 63) ? t : t - Math.pow(2, 64);
            }, r4.prototype.unpack_raw = function(t) {
                if (this.length < this.index + t) throw new Error("BinaryPackFailure: index is out of range " + this.index + " " + t + " " + this.length);
                var e = this.dataBuffer.slice(this.index, this.index + t);
                return this.index += t, e;
            }, r4.prototype.unpack_string = function(t) {
                for(var e, i, r = this.read(t), n = 0, u = ""; n < t;)(e = r[n]) < 128 ? (u += String.fromCharCode(e), n++) : (192 ^ e) < 32 ? (i = (192 ^ e) << 6 | 63 & r[n + 1], u += String.fromCharCode(i), n += 2) : (i = (15 & e) << 12 | (63 & r[n + 1]) << 6 | 63 & r[n + 2], u += String.fromCharCode(i), n += 3);
                return this.index += t, u;
            }, r4.prototype.unpack_array = function(t) {
                for(var e = new Array(t), i = 0; i < t; i++)e[i] = this.unpack();
                return e;
            }, r4.prototype.unpack_map = function(t) {
                for(var e = {
                }, i = 0; i < t; i++){
                    var r = this.unpack(), n = this.unpack();
                    e[r] = n;
                }
                return e;
            }, r4.prototype.unpack_float = function() {
                var t = this.unpack_uint32(), e = (t >> 23 & 255) - 127;
                return (0 === t >> 31 ? 1 : -1) * (8388607 & t | 8388608) * Math.pow(2, e - 23);
            }, r4.prototype.unpack_double = function() {
                var t = this.unpack_uint32(), e = this.unpack_uint32(), i = (t >> 20 & 2047) - 1023;
                return (0 === t >> 31 ? 1 : -1) * ((1048575 & t | 1048576) * Math.pow(2, i - 20) + e * Math.pow(2, i - 52));
            }, r4.prototype.read = function(t) {
                var e = this.index;
                if (e + t <= this.length) return this.dataView.subarray(e, e + t);
                throw new Error("BinaryPackFailure: read index out of range");
            }, n2.prototype.getBuffer = function() {
                return this.bufferBuilder.getBuffer();
            }, n2.prototype.pack = function(t) {
                var i = typeof t;
                if ("string" === i) this.pack_string(t);
                else if ("number" === i) Math.floor(t) === t ? this.pack_integer(t) : this.pack_double(t);
                else if ("boolean" === i) !0 === t ? this.bufferBuilder.append(195) : !1 === t && this.bufferBuilder.append(194);
                else if ("undefined" === i) this.bufferBuilder.append(192);
                else {
                    if ("object" !== i) throw new Error('Type "' + i + '" not yet supported');
                    if (null === t) this.bufferBuilder.append(192);
                    else {
                        var r = t.constructor;
                        if (r == Array) this.pack_array(t);
                        else if (r == Blob || r == File || t instanceof Blob || t instanceof File) this.pack_bin(t);
                        else if (r == ArrayBuffer) e3.useArrayBufferView ? this.pack_bin(new Uint8Array(t)) : this.pack_bin(t);
                        else if ("BYTES_PER_ELEMENT" in t) e3.useArrayBufferView ? this.pack_bin(new Uint8Array(t.buffer)) : this.pack_bin(t.buffer);
                        else if (r == Object || r.toString().startsWith("class")) this.pack_object(t);
                        else if (r == Date) this.pack_string(t.toString());
                        else {
                            if ("function" != typeof t.toBinaryPack) throw new Error('Type "' + r.toString() + '" not yet supported');
                            this.bufferBuilder.append(t.toBinaryPack());
                        }
                    }
                }
                this.bufferBuilder.flush();
            }, n2.prototype.pack_bin = function(t) {
                var e = t.length || t.byteLength || t.size;
                if (e <= 15) this.pack_uint8(160 + e);
                else if (e <= 65535) this.bufferBuilder.append(218), this.pack_uint16(e);
                else {
                    if (!(e <= 4294967295)) throw new Error("Invalid length");
                    this.bufferBuilder.append(219), this.pack_uint32(e);
                }
                this.bufferBuilder.append(t);
            }, n2.prototype.pack_string = function(t) {
                var e = a1(t);
                if (e <= 15) this.pack_uint8(176 + e);
                else if (e <= 65535) this.bufferBuilder.append(216), this.pack_uint16(e);
                else {
                    if (!(e <= 4294967295)) throw new Error("Invalid length");
                    this.bufferBuilder.append(217), this.pack_uint32(e);
                }
                this.bufferBuilder.append(t);
            }, n2.prototype.pack_array = function(t) {
                var e = t.length;
                if (e <= 15) this.pack_uint8(144 + e);
                else if (e <= 65535) this.bufferBuilder.append(220), this.pack_uint16(e);
                else {
                    if (!(e <= 4294967295)) throw new Error("Invalid length");
                    this.bufferBuilder.append(221), this.pack_uint32(e);
                }
                for(var i = 0; i < e; i++)this.pack(t[i]);
            }, n2.prototype.pack_integer = function(t) {
                if (t >= -32 && t <= 127) this.bufferBuilder.append(255 & t);
                else if (t >= 0 && t <= 255) this.bufferBuilder.append(204), this.pack_uint8(t);
                else if (t >= -128 && t <= 127) this.bufferBuilder.append(208), this.pack_int8(t);
                else if (t >= 0 && t <= 65535) this.bufferBuilder.append(205), this.pack_uint16(t);
                else if (t >= -32768 && t <= 32767) this.bufferBuilder.append(209), this.pack_int16(t);
                else if (t >= 0 && t <= 4294967295) this.bufferBuilder.append(206), this.pack_uint32(t);
                else if (t >= -2147483648 && t <= 2147483647) this.bufferBuilder.append(210), this.pack_int32(t);
                else if (t >= -9223372036854776000 && t <= 9223372036854776000) this.bufferBuilder.append(211), this.pack_int64(t);
                else {
                    if (!(t >= 0 && t <= 18446744073709552000)) throw new Error("Invalid integer");
                    this.bufferBuilder.append(207), this.pack_uint64(t);
                }
            }, n2.prototype.pack_double = function(t) {
                var e = 0;
                t < 0 && (e = 1, t = -t);
                var i = Math.floor(Math.log(t) / Math.LN2), r = t / Math.pow(2, i) - 1, n = Math.floor(r * Math.pow(2, 52)), u = Math.pow(2, 32), a = e << 31 | i + 1023 << 20 | n / u & 1048575, p = n % u;
                this.bufferBuilder.append(203), this.pack_int32(a), this.pack_int32(p);
            }, n2.prototype.pack_object = function(t) {
                var e = Object.keys(t).length;
                if (e <= 15) this.pack_uint8(128 + e);
                else if (e <= 65535) this.bufferBuilder.append(222), this.pack_uint16(e);
                else {
                    if (!(e <= 4294967295)) throw new Error("Invalid length");
                    this.bufferBuilder.append(223), this.pack_uint32(e);
                }
                for(var i in t)t.hasOwnProperty(i) && (this.pack(i), this.pack(t[i]));
            }, n2.prototype.pack_uint8 = function(t) {
                this.bufferBuilder.append(t);
            }, n2.prototype.pack_uint16 = function(t) {
                this.bufferBuilder.append(t >> 8), this.bufferBuilder.append(255 & t);
            }, n2.prototype.pack_uint32 = function(t) {
                var e = 4294967295 & t;
                this.bufferBuilder.append((4278190080 & e) >>> 24), this.bufferBuilder.append((16711680 & e) >>> 16), this.bufferBuilder.append((65280 & e) >>> 8), this.bufferBuilder.append(255 & e);
            }, n2.prototype.pack_uint64 = function(t) {
                var e = t / Math.pow(2, 32), i = t % Math.pow(2, 32);
                this.bufferBuilder.append((4278190080 & e) >>> 24), this.bufferBuilder.append((16711680 & e) >>> 16), this.bufferBuilder.append((65280 & e) >>> 8), this.bufferBuilder.append(255 & e), this.bufferBuilder.append((4278190080 & i) >>> 24), this.bufferBuilder.append((16711680 & i) >>> 16), this.bufferBuilder.append((65280 & i) >>> 8), this.bufferBuilder.append(255 & i);
            }, n2.prototype.pack_int8 = function(t) {
                this.bufferBuilder.append(255 & t);
            }, n2.prototype.pack_int16 = function(t) {
                this.bufferBuilder.append((65280 & t) >> 8), this.bufferBuilder.append(255 & t);
            }, n2.prototype.pack_int32 = function(t) {
                this.bufferBuilder.append(t >>> 24 & 255), this.bufferBuilder.append((16711680 & t) >>> 16), this.bufferBuilder.append((65280 & t) >>> 8), this.bufferBuilder.append(255 & t);
            }, n2.prototype.pack_int64 = function(t) {
                var e = Math.floor(t / Math.pow(2, 32)), i = t % Math.pow(2, 32);
                this.bufferBuilder.append((4278190080 & e) >>> 24), this.bufferBuilder.append((16711680 & e) >>> 16), this.bufferBuilder.append((65280 & e) >>> 8), this.bufferBuilder.append(255 & e), this.bufferBuilder.append((4278190080 & i) >>> 24), this.bufferBuilder.append((16711680 & i) >>> 16), this.bufferBuilder.append((65280 & i) >>> 8), this.bufferBuilder.append(255 & i);
            };
        },
        {
            "./bufferbuilder": "EgBh"
        }
    ],
    "iSxC": [
        function(require, module, exports) {
            "use strict";
            function e4(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e;
            }
            function t4(e5) {
                return (t4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e;
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                })(e5);
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.extractVersion = o1, exports.wrapPeerConnectionEvent = i3, exports.disableLog = s1, exports.disableWarnings = a, exports.log = p, exports.deprecated = u, exports.detectBrowser = c, exports.compactObject = f, exports.walkStats = l, exports.filterStats = v;
            var n3 = !0, r5 = !0;
            function o1(e, t, n) {
                var r = e.match(t);
                return r && r.length >= n && parseInt(r[n], 10);
            }
            function i3(e6, t5, n4) {
                if (e6.RTCPeerConnection) {
                    var r6 = e6.RTCPeerConnection.prototype, o = r6.addEventListener;
                    r6.addEventListener = function(e7, r) {
                        if (e7 !== t5) return o.apply(this, arguments);
                        var i = function(e) {
                            var t = n4(e);
                            t && (r.handleEvent ? r.handleEvent(t) : r(t));
                        };
                        return this._eventMap = this._eventMap || {
                        }, this._eventMap[t5] || (this._eventMap[t5] = new Map), this._eventMap[t5].set(r, i), o.apply(this, [
                            e7,
                            i
                        ]);
                    };
                    var i4 = r6.removeEventListener;
                    r6.removeEventListener = function(e, n) {
                        if (e !== t5 || !this._eventMap || !this._eventMap[t5]) return i4.apply(this, arguments);
                        if (!this._eventMap[t5].has(n)) return i4.apply(this, arguments);
                        var r = this._eventMap[t5].get(n);
                        return this._eventMap[t5].delete(n), 0 === this._eventMap[t5].size && delete this._eventMap[t5], 0 === Object.keys(this._eventMap).length && delete this._eventMap, i4.apply(this, [
                            e,
                            r
                        ]);
                    }, Object.defineProperty(r6, "on" + t5, {
                        get: function() {
                            return this["_on" + t5];
                        },
                        set: function(e) {
                            this["_on" + t5] && (this.removeEventListener(t5, this["_on" + t5]), delete this["_on" + t5]), e && this.addEventListener(t5, this["_on" + t5] = e);
                        },
                        enumerable: !0,
                        configurable: !0
                    });
                }
            }
            function s1(e) {
                return "boolean" != typeof e ? new Error("Argument type: " + t4(e) + ". Please use a boolean.") : (n3 = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled");
            }
            function a(e) {
                return "boolean" != typeof e ? new Error("Argument type: " + t4(e) + ". Please use a boolean.") : (r5 = !e, "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"));
            }
            function p() {
                if ("object" === ("undefined" == typeof window ? "undefined" : t4(window))) {
                    if (n3) return;
                    "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments);
                }
            }
            function u(e, t) {
                r5 && console.warn(e + " is deprecated, please use " + t + " instead.");
            }
            function c(e) {
                var t = {
                    browser: null,
                    version: null
                };
                if (void 0 === e || !e.navigator) return t.browser = "Not a browser.", t;
                var { navigator: n  } = e;
                if (n.mozGetUserMedia) t.browser = "firefox", t.version = o1(n.userAgent, /Firefox\/(\d+)\./, 1);
                else if (n.webkitGetUserMedia || !1 === e.isSecureContext && e.webkitRTCPeerConnection && !e.RTCIceGatherer) t.browser = "chrome", t.version = o1(n.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
                else if (n.mediaDevices && n.userAgent.match(/Edge\/(\d+).(\d+)$/)) t.browser = "edge", t.version = o1(n.userAgent, /Edge\/(\d+).(\d+)$/, 2);
                else {
                    if (!e.RTCPeerConnection || !n.userAgent.match(/AppleWebKit\/(\d+)\./)) return t.browser = "Not a supported browser.", t;
                    t.browser = "safari", t.version = o1(n.userAgent, /AppleWebKit\/(\d+)\./, 1), t.supportsUnifiedPlan = e.RTCRtpTransceiver && "currentDirection" in e.RTCRtpTransceiver.prototype;
                }
                return t;
            }
            function d(e) {
                return "[object Object]" === Object.prototype.toString.call(e);
            }
            function f(t) {
                return d(t) ? Object.keys(t).reduce(function(n, r) {
                    var o = d(t[r]), i = o ? f(t[r]) : t[r], s = o && !Object.keys(i).length;
                    return void 0 === i || s ? n : Object.assign(n, e4({
                    }, r, i));
                }, {
                }) : t;
            }
            function l(e, t6, n) {
                t6 && !n.has(t6.id) && (n.set(t6.id, t6), Object.keys(t6).forEach(function(r) {
                    r.endsWith("Id") ? l(e, e.get(t6[r]), n) : r.endsWith("Ids") && t6[r].forEach(function(t) {
                        l(e, e.get(t), n);
                    });
                }));
            }
            function v(e8, t7, n5) {
                var r = n5 ? "outbound-rtp" : "inbound-rtp", o = new Map;
                if (null === t7) return o;
                var i = [];
                return e8.forEach(function(e) {
                    "track" === e.type && e.trackIdentifier === t7.id && i.push(e);
                }), i.forEach(function(t) {
                    e8.forEach(function(n) {
                        n.type === r && n.trackId === t.id && l(e8, n, o);
                    });
                }), o;
            }
        },
        {
        }
    ],
    "s6SN": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.shimGetUserMedia = i6;
            var e9 = t8(require("../utils.js"));
            function r8() {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap;
                return r8 = function() {
                    return e;
                }, e;
            }
            function t8(e) {
                if (e && e.__esModule) return e;
                if (null === e || "object" != typeof e && "function" != typeof e) return {
                    default: e
                };
                var t = r8();
                if (t && t.has(e)) return t.get(e);
                var o = {
                }, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var i in e)if (Object.prototype.hasOwnProperty.call(e, i)) {
                    var a = n ? Object.getOwnPropertyDescriptor(e, i) : null;
                    a && (a.get || a.set) ? Object.defineProperty(o, i, a) : o[i] = e[i];
                }
                return o.default = e, t && t.set(e, o), o;
            }
            function o2(e10) {
                return (o2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e;
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                })(e10);
            }
            var n6 = e9.log;
            function i6(e11, r9) {
                var t9 = e11 && e11.navigator;
                if (t9.mediaDevices) {
                    var i = function(e12) {
                        if ("object" !== o2(e12) || e12.mandatory || e12.optional) return e12;
                        var r10 = {
                        };
                        return Object.keys(e12).forEach(function(t) {
                            if ("require" !== t && "advanced" !== t && "mediaSource" !== t) {
                                var n = "object" === o2(e12[t]) ? e12[t] : {
                                    ideal: e12[t]
                                };
                                void 0 !== n.exact && "number" == typeof n.exact && (n.min = n.max = n.exact);
                                var i = function(e, r) {
                                    return e ? e + r.charAt(0).toUpperCase() + r.slice(1) : "deviceId" === r ? "sourceId" : r;
                                };
                                if (void 0 !== n.ideal) {
                                    r10.optional = r10.optional || [];
                                    var a = {
                                    };
                                    "number" == typeof n.ideal ? (a[i("min", t)] = n.ideal, r10.optional.push(a), (a = {
                                    })[i("max", t)] = n.ideal, r10.optional.push(a)) : (a[i("", t)] = n.ideal, r10.optional.push(a));
                                }
                                void 0 !== n.exact && "number" != typeof n.exact ? (r10.mandatory = r10.mandatory || {
                                }, r10.mandatory[i("", t)] = n.exact) : [
                                    "min",
                                    "max"
                                ].forEach(function(e) {
                                    void 0 !== n[e] && (r10.mandatory = r10.mandatory || {
                                    }, r10.mandatory[i(e, t)] = n[e]);
                                });
                            }
                        }), e12.advanced && (r10.optional = (r10.optional || []).concat(e12.advanced)), r10;
                    }, a2 = function(e13, a) {
                        if (r9.version >= 61) return a(e13);
                        if ((e13 = JSON.parse(JSON.stringify(e13))) && "object" === o2(e13.audio)) {
                            var c = function(e, r, t) {
                                r in e && !(t in e) && (e[t] = e[r], delete e[r]);
                            };
                            c((e13 = JSON.parse(JSON.stringify(e13))).audio, "autoGainControl", "googAutoGainControl"), c(e13.audio, "noiseSuppression", "googNoiseSuppression"), e13.audio = i(e13.audio);
                        }
                        if (e13 && "object" === o2(e13.video)) {
                            var d = e13.video.facingMode;
                            d = d && ("object" === o2(d) ? d : {
                                ideal: d
                            });
                            var u, s = r9.version < 66;
                            if (d && ("user" === d.exact || "environment" === d.exact || "user" === d.ideal || "environment" === d.ideal) && (!t9.mediaDevices.getSupportedConstraints || !t9.mediaDevices.getSupportedConstraints().facingMode || s)) {
                                if (delete e13.video.facingMode, "environment" === d.exact || "environment" === d.ideal ? u = [
                                    "back",
                                    "rear"
                                ] : "user" !== d.exact && "user" !== d.ideal || (u = [
                                    "front"
                                ]), u) return t9.mediaDevices.enumerateDevices().then(function(r11) {
                                    var t = (r11 = r11.filter(function(e) {
                                        return "videoinput" === e.kind;
                                    })).find(function(e) {
                                        return u.some(function(r) {
                                            return e.label.toLowerCase().includes(r);
                                        });
                                    });
                                    return !t && r11.length && u.includes("back") && (t = r11[r11.length - 1]), t && (e13.video.deviceId = d.exact ? {
                                        exact: t.deviceId
                                    } : {
                                        ideal: t.deviceId
                                    }), e13.video = i(e13.video), n6("chrome: " + JSON.stringify(e13)), a(e13);
                                });
                            }
                            e13.video = i(e13.video);
                        }
                        return n6("chrome: " + JSON.stringify(e13)), a(e13);
                    }, c2 = function(e) {
                        return r9.version >= 64 ? e : {
                            name: ({
                                PermissionDeniedError: "NotAllowedError",
                                PermissionDismissedError: "NotAllowedError",
                                InvalidStateError: "NotAllowedError",
                                DevicesNotFoundError: "NotFoundError",
                                ConstraintNotSatisfiedError: "OverconstrainedError",
                                TrackStartError: "NotReadableError",
                                MediaDeviceFailedDueToShutdown: "NotAllowedError",
                                MediaDeviceKillSwitchOn: "NotAllowedError",
                                TabCaptureError: "AbortError",
                                ScreenCaptureError: "AbortError",
                                DeviceCaptureError: "AbortError"
                            })[e.name] || e.name,
                            message: e.message,
                            constraint: e.constraint || e.constraintName,
                            toString: function() {
                                return this.name + (this.message && ": ") + this.message;
                            }
                        };
                    };
                    if (t9.getUserMedia = (function(e14, r, o) {
                        a2(e14, function(e15) {
                            t9.webkitGetUserMedia(e15, r, function(e) {
                                o && o(c2(e));
                            });
                        });
                    }).bind(t9), t9.mediaDevices.getUserMedia) {
                        var d1 = t9.mediaDevices.getUserMedia.bind(t9.mediaDevices);
                        t9.mediaDevices.getUserMedia = function(e16) {
                            return a2(e16, function(e17) {
                                return d1(e17).then(function(r) {
                                    if (e17.audio && !r.getAudioTracks().length || e17.video && !r.getVideoTracks().length) throw r.getTracks().forEach(function(e) {
                                        e.stop();
                                    }), new DOMException("", "NotFoundError");
                                    return r;
                                }, function(e) {
                                    return Promise.reject(c2(e));
                                });
                            });
                        };
                    }
                }
            }
        },
        {
            "../utils.js": "iSxC"
        }
    ],
    "VHa8": [
        function(require, module, exports) {
            "use strict";
            function e18(e, i7) {
                e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || e.navigator.mediaDevices && ("function" == typeof i7 ? e.navigator.mediaDevices.getDisplayMedia = function(a) {
                    return i7(a).then(function(i) {
                        var t = a.video && a.video.width, o = a.video && a.video.height, d = a.video && a.video.frameRate;
                        return a.video = {
                            mandatory: {
                                chromeMediaSource: "desktop",
                                chromeMediaSourceId: i,
                                maxFrameRate: d || 3
                            }
                        }, t && (a.video.mandatory.maxWidth = t), o && (a.video.mandatory.maxHeight = o), e.navigator.mediaDevices.getUserMedia(a);
                    });
                } : console.error("shimGetDisplayMedia: getSourceId argument is not a function"));
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.shimGetDisplayMedia = e18;
        },
        {
        }
    ],
    "uI5X": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.shimMediaStream = a4, exports.shimOnTrack = c4, exports.shimGetSendersWithDtmf = p, exports.shimGetStats = d, exports.shimSenderReceiverGetStats = h, exports.shimAddTrackRemoveTrackWithNative = f, exports.shimAddTrackRemoveTrack = m, exports.shimPeerConnection = u, exports.fixNegotiationNeeded = l, Object.defineProperty(exports, "shimGetUserMedia", {
                enumerable: !0,
                get: function() {
                    return t10.shimGetUserMedia;
                }
            }), Object.defineProperty(exports, "shimGetDisplayMedia", {
                enumerable: !0,
                get: function() {
                    return r12.shimGetDisplayMedia;
                }
            });
            var e19 = i8(require("../utils.js")), t10 = require("./getusermedia"), r12 = require("./getdisplaymedia");
            function n7() {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap;
                return n7 = function() {
                    return e;
                }, e;
            }
            function i8(e) {
                if (e && e.__esModule) return e;
                if (null === e || "object" != typeof e && "function" != typeof e) return {
                    default: e
                };
                var t = n7();
                if (t && t.has(e)) return t.get(e);
                var r = {
                }, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var o in e)if (Object.prototype.hasOwnProperty.call(e, o)) {
                    var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
                    s && (s.get || s.set) ? Object.defineProperty(r, o, s) : r[o] = e[o];
                }
                return r.default = e, t && t.set(e, r), r;
            }
            function o3(e, t, r) {
                return t in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e;
            }
            function s2(e20) {
                return (s2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e;
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                })(e20);
            }
            function a4(e) {
                e.MediaStream = e.MediaStream || e.webkitMediaStream;
            }
            function c4(t) {
                if ("object" !== s2(t) || !t.RTCPeerConnection || "ontrack" in t.RTCPeerConnection.prototype) e19.wrapPeerConnectionEvent(t, "track", function(e) {
                    return e.transceiver || Object.defineProperty(e, "transceiver", {
                        value: {
                            receiver: e.receiver
                        }
                    }), e;
                });
                else {
                    Object.defineProperty(t.RTCPeerConnection.prototype, "ontrack", {
                        get: function() {
                            return this._ontrack;
                        },
                        set: function(e) {
                            this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e);
                        },
                        enumerable: !0,
                        configurable: !0
                    });
                    var r13 = t.RTCPeerConnection.prototype.setRemoteDescription;
                    t.RTCPeerConnection.prototype.setRemoteDescription = function() {
                        var e21 = this;
                        return this._ontrackpoly || (this._ontrackpoly = function(r) {
                            r.stream.addEventListener("addtrack", function(n) {
                                var i;
                                i = t.RTCPeerConnection.prototype.getReceivers ? e21.getReceivers().find(function(e) {
                                    return e.track && e.track.id === n.track.id;
                                }) : {
                                    track: n.track
                                };
                                var o = new Event("track");
                                o.track = n.track, o.receiver = i, o.transceiver = {
                                    receiver: i
                                }, o.streams = [
                                    r.stream
                                ], e21.dispatchEvent(o);
                            }), r.stream.getTracks().forEach(function(n) {
                                var i;
                                i = t.RTCPeerConnection.prototype.getReceivers ? e21.getReceivers().find(function(e) {
                                    return e.track && e.track.id === n.id;
                                }) : {
                                    track: n
                                };
                                var o = new Event("track");
                                o.track = n, o.receiver = i, o.transceiver = {
                                    receiver: i
                                }, o.streams = [
                                    r.stream
                                ], e21.dispatchEvent(o);
                            });
                        }, this.addEventListener("addstream", this._ontrackpoly)), r13.apply(this, arguments);
                    };
                }
            }
            function p(e22) {
                if ("object" === s2(e22) && e22.RTCPeerConnection && !("getSenders" in e22.RTCPeerConnection.prototype) && "createDTMFSender" in e22.RTCPeerConnection.prototype) {
                    var t11 = function(e, t) {
                        return {
                            track: t,
                            get dtmf () {
                                return void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null), this._dtmf;
                            },
                            _pc: e
                        };
                    };
                    if (!e22.RTCPeerConnection.prototype.getSenders) {
                        e22.RTCPeerConnection.prototype.getSenders = function() {
                            return this._senders = this._senders || [], this._senders.slice();
                        };
                        var r = e22.RTCPeerConnection.prototype.addTrack;
                        e22.RTCPeerConnection.prototype.addTrack = function(e, n) {
                            var i = r.apply(this, arguments);
                            return i || (i = t11(this, e), this._senders.push(i)), i;
                        };
                        var n = e22.RTCPeerConnection.prototype.removeTrack;
                        e22.RTCPeerConnection.prototype.removeTrack = function(e) {
                            n.apply(this, arguments);
                            var t = this._senders.indexOf(e);
                            -1 !== t && this._senders.splice(t, 1);
                        };
                    }
                    var i9 = e22.RTCPeerConnection.prototype.addStream;
                    e22.RTCPeerConnection.prototype.addStream = function(e23) {
                        var r = this;
                        this._senders = this._senders || [], i9.apply(this, [
                            e23
                        ]), e23.getTracks().forEach(function(e) {
                            r._senders.push(t11(r, e));
                        });
                    };
                    var o = e22.RTCPeerConnection.prototype.removeStream;
                    e22.RTCPeerConnection.prototype.removeStream = function(e24) {
                        var t13 = this;
                        this._senders = this._senders || [], o.apply(this, [
                            e24
                        ]), e24.getTracks().forEach(function(e) {
                            var r = t13._senders.find(function(t) {
                                return t.track === e;
                            });
                            r && t13._senders.splice(t13._senders.indexOf(r), 1);
                        });
                    };
                } else if ("object" === s2(e22) && e22.RTCPeerConnection && "getSenders" in e22.RTCPeerConnection.prototype && "createDTMFSender" in e22.RTCPeerConnection.prototype && e22.RTCRtpSender && !("dtmf" in e22.RTCRtpSender.prototype)) {
                    var a = e22.RTCPeerConnection.prototype.getSenders;
                    e22.RTCPeerConnection.prototype.getSenders = function() {
                        var e = this, t14 = a.apply(this, []);
                        return t14.forEach(function(t) {
                            return t._pc = e;
                        }), t14;
                    }, Object.defineProperty(e22.RTCRtpSender.prototype, "dtmf", {
                        get: function() {
                            return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf;
                        }
                    });
                }
            }
            function d(e25) {
                if (e25.RTCPeerConnection) {
                    var t15 = e25.RTCPeerConnection.prototype.getStats;
                    e25.RTCPeerConnection.prototype.getStats = function() {
                        var e26 = this, [r15, n8, i] = arguments;
                        if (arguments.length > 0 && "function" == typeof r15) return t15.apply(this, arguments);
                        if (0 === t15.length && (0 === arguments.length || "function" != typeof r15)) return t15.apply(this, []);
                        var o = function(e27) {
                            var t17 = {
                            };
                            return e27.result().forEach(function(e) {
                                var r = {
                                    id: e.id,
                                    timestamp: e.timestamp,
                                    type: {
                                        localcandidate: "local-candidate",
                                        remotecandidate: "remote-candidate"
                                    }[e.type] || e.type
                                };
                                e.names().forEach(function(t) {
                                    r[t] = e.stat(t);
                                }), t17[r.id] = r;
                            }), t17;
                        }, s = function(e) {
                            return new Map(Object.keys(e).map(function(t) {
                                return [
                                    t,
                                    e[t]
                                ];
                            }));
                        };
                        if (arguments.length >= 2) return t15.apply(this, [
                            function(e) {
                                n8(s(o(e)));
                            },
                            r15
                        ]);
                        return new Promise(function(r, n) {
                            t15.apply(e26, [
                                function(e) {
                                    r(s(o(e)));
                                },
                                n
                            ]);
                        }).then(n8, i);
                    };
                }
            }
            function h(t18) {
                if ("object" === s2(t18) && t18.RTCPeerConnection && t18.RTCRtpSender && t18.RTCRtpReceiver) {
                    if (!("getStats" in t18.RTCRtpSender.prototype)) {
                        var r16 = t18.RTCPeerConnection.prototype.getSenders;
                        r16 && (t18.RTCPeerConnection.prototype.getSenders = function() {
                            var e = this, t19 = r16.apply(this, []);
                            return t19.forEach(function(t) {
                                return t._pc = e;
                            }), t19;
                        });
                        var n = t18.RTCPeerConnection.prototype.addTrack;
                        n && (t18.RTCPeerConnection.prototype.addTrack = function() {
                            var e = n.apply(this, arguments);
                            return e._pc = this, e;
                        }), t18.RTCRtpSender.prototype.getStats = function() {
                            var t = this;
                            return this._pc.getStats().then(function(r) {
                                return e19.filterStats(r, t.track, !0);
                            });
                        };
                    }
                    if (!("getStats" in t18.RTCRtpReceiver.prototype)) {
                        var i = t18.RTCPeerConnection.prototype.getReceivers;
                        i && (t18.RTCPeerConnection.prototype.getReceivers = function() {
                            var e = this, t20 = i.apply(this, []);
                            return t20.forEach(function(t) {
                                return t._pc = e;
                            }), t20;
                        }), e19.wrapPeerConnectionEvent(t18, "track", function(e) {
                            return e.receiver._pc = e.srcElement, e;
                        }), t18.RTCRtpReceiver.prototype.getStats = function() {
                            var t = this;
                            return this._pc.getStats().then(function(r) {
                                return e19.filterStats(r, t.track, !1);
                            });
                        };
                    }
                    if ("getStats" in t18.RTCRtpSender.prototype && "getStats" in t18.RTCRtpReceiver.prototype) {
                        var o = t18.RTCPeerConnection.prototype.getStats;
                        t18.RTCPeerConnection.prototype.getStats = function() {
                            if (arguments.length > 0 && arguments[0] instanceof t18.MediaStreamTrack) {
                                var e28, r, n, i = arguments[0];
                                return this.getSenders().forEach(function(t) {
                                    t.track === i && (e28 ? n = !0 : e28 = t);
                                }), this.getReceivers().forEach(function(e) {
                                    return e.track === i && (r ? n = !0 : r = e), e.track === i;
                                }), n || e28 && r ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : e28 ? e28.getStats() : r ? r.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"));
                            }
                            return o.apply(this, arguments);
                        };
                    }
                }
            }
            function f(e30) {
                e30.RTCPeerConnection.prototype.getLocalStreams = function() {
                    var e = this;
                    return this._shimmedLocalStreams = this._shimmedLocalStreams || {
                    }, Object.keys(this._shimmedLocalStreams).map(function(t) {
                        return e._shimmedLocalStreams[t][0];
                    });
                };
                var t21 = e30.RTCPeerConnection.prototype.addTrack;
                e30.RTCPeerConnection.prototype.addTrack = function(e, r) {
                    if (!r) return t21.apply(this, arguments);
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {
                    };
                    var n = t21.apply(this, arguments);
                    return this._shimmedLocalStreams[r.id] ? -1 === this._shimmedLocalStreams[r.id].indexOf(n) && this._shimmedLocalStreams[r.id].push(n) : this._shimmedLocalStreams[r.id] = [
                        r,
                        n
                    ], n;
                };
                var r19 = e30.RTCPeerConnection.prototype.addStream;
                e30.RTCPeerConnection.prototype.addStream = function(e31) {
                    var t22 = this;
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {
                    }, e31.getTracks().forEach(function(e) {
                        if (t22.getSenders().find(function(t) {
                            return t.track === e;
                        })) throw new DOMException("Track already exists.", "InvalidAccessError");
                    });
                    var n = this.getSenders();
                    r19.apply(this, arguments);
                    var i = this.getSenders().filter(function(e) {
                        return -1 === n.indexOf(e);
                    });
                    this._shimmedLocalStreams[e31.id] = [
                        e31
                    ].concat(i);
                };
                var n9 = e30.RTCPeerConnection.prototype.removeStream;
                e30.RTCPeerConnection.prototype.removeStream = function(e) {
                    return this._shimmedLocalStreams = this._shimmedLocalStreams || {
                    }, delete this._shimmedLocalStreams[e.id], n9.apply(this, arguments);
                };
                var i11 = e30.RTCPeerConnection.prototype.removeTrack;
                e30.RTCPeerConnection.prototype.removeTrack = function(e) {
                    var t = this;
                    return this._shimmedLocalStreams = this._shimmedLocalStreams || {
                    }, e && Object.keys(this._shimmedLocalStreams).forEach(function(r) {
                        var n = t._shimmedLocalStreams[r].indexOf(e);
                        -1 !== n && t._shimmedLocalStreams[r].splice(n, 1), 1 === t._shimmedLocalStreams[r].length && delete t._shimmedLocalStreams[r];
                    }), i11.apply(this, arguments);
                };
            }
            function m(e32, t23) {
                if (e32.RTCPeerConnection) {
                    if (e32.RTCPeerConnection.prototype.addTrack && t23.version >= 65) return f(e32);
                    var r20 = e32.RTCPeerConnection.prototype.getLocalStreams;
                    e32.RTCPeerConnection.prototype.getLocalStreams = function() {
                        var e = this, t = r20.apply(this);
                        return this._reverseStreams = this._reverseStreams || {
                        }, t.map(function(t) {
                            return e._reverseStreams[t.id];
                        });
                    };
                    var n10 = e32.RTCPeerConnection.prototype.addStream;
                    e32.RTCPeerConnection.prototype.addStream = function(t24) {
                        var r = this;
                        if (this._streams = this._streams || {
                        }, this._reverseStreams = this._reverseStreams || {
                        }, t24.getTracks().forEach(function(e) {
                            if (r.getSenders().find(function(t) {
                                return t.track === e;
                            })) throw new DOMException("Track already exists.", "InvalidAccessError");
                        }), !this._reverseStreams[t24.id]) {
                            var i = new e32.MediaStream(t24.getTracks());
                            this._streams[t24.id] = i, this._reverseStreams[i.id] = t24, t24 = i;
                        }
                        n10.apply(this, [
                            t24
                        ]);
                    };
                    var i12 = e32.RTCPeerConnection.prototype.removeStream;
                    e32.RTCPeerConnection.prototype.removeStream = function(e) {
                        this._streams = this._streams || {
                        }, this._reverseStreams = this._reverseStreams || {
                        }, i12.apply(this, [
                            this._streams[e.id] || e
                        ]), delete this._reverseStreams[this._streams[e.id] ? this._streams[e.id].id : e.id], delete this._streams[e.id];
                    }, e32.RTCPeerConnection.prototype.addTrack = function(t, r) {
                        var n = this;
                        if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                        var i = [].slice.call(arguments, 1);
                        if (1 !== i.length || !i[0].getTracks().find(function(e) {
                            return e === t;
                        })) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
                        if (this.getSenders().find(function(e) {
                            return e.track === t;
                        })) throw new DOMException("Track already exists.", "InvalidAccessError");
                        this._streams = this._streams || {
                        }, this._reverseStreams = this._reverseStreams || {
                        };
                        var o = this._streams[r.id];
                        if (o) o.addTrack(t), Promise.resolve().then(function() {
                            n.dispatchEvent(new Event("negotiationneeded"));
                        });
                        else {
                            var s = new e32.MediaStream([
                                t
                            ]);
                            this._streams[r.id] = s, this._reverseStreams[s.id] = r, this.addStream(s);
                        }
                        return this.getSenders().find(function(e) {
                            return e.track === t;
                        });
                    }, [
                        "createOffer",
                        "createAnswer"
                    ].forEach(function(t25) {
                        var r22 = e32.RTCPeerConnection.prototype[t25], n12 = o3({
                        }, t25, function() {
                            var e33 = this, t26 = arguments;
                            return arguments.length && "function" == typeof arguments[0] ? r22.apply(this, [
                                function(r) {
                                    var n = c(e33, r);
                                    t26[0].apply(null, [
                                        n
                                    ]);
                                },
                                function(e) {
                                    t26[1] && t26[1].apply(null, e);
                                },
                                arguments[2]
                            ]) : r22.apply(this, arguments).then(function(t) {
                                return c(e33, t);
                            });
                        });
                        e32.RTCPeerConnection.prototype[t25] = n12[t25];
                    });
                    var s3 = e32.RTCPeerConnection.prototype.setLocalDescription;
                    e32.RTCPeerConnection.prototype.setLocalDescription = function() {
                        var e, t, r;
                        return arguments.length && arguments[0].type ? (arguments[0] = (e = this, t = arguments[0], r = t.sdp, Object.keys(e._reverseStreams || []).forEach(function(t) {
                            var n = e._reverseStreams[t], i = e._streams[n.id];
                            r = r.replace(new RegExp(n.id, "g"), i.id);
                        }), new RTCSessionDescription({
                            type: t.type,
                            sdp: r
                        })), s3.apply(this, arguments)) : s3.apply(this, arguments);
                    };
                    var a = Object.getOwnPropertyDescriptor(e32.RTCPeerConnection.prototype, "localDescription");
                    Object.defineProperty(e32.RTCPeerConnection.prototype, "localDescription", {
                        get: function() {
                            var e = a.get.apply(this);
                            return "" === e.type ? e : c(this, e);
                        }
                    }), e32.RTCPeerConnection.prototype.removeTrack = function(e) {
                        var t27, r = this;
                        if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                        if (!e._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
                        if (!(e._pc === this)) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
                        this._streams = this._streams || {
                        }, Object.keys(this._streams).forEach(function(n) {
                            r._streams[n].getTracks().find(function(t) {
                                return e.track === t;
                            }) && (t27 = r._streams[n]);
                        }), t27 && (1 === t27.getTracks().length ? this.removeStream(this._reverseStreams[t27.id]) : t27.removeTrack(e.track), this.dispatchEvent(new Event("negotiationneeded")));
                    };
                }
                function c(e, t) {
                    var r = t.sdp;
                    return Object.keys(e._reverseStreams || []).forEach(function(t) {
                        var n = e._reverseStreams[t], i = e._streams[n.id];
                        r = r.replace(new RegExp(i.id, "g"), n.id);
                    }), new RTCSessionDescription({
                        type: t.type,
                        sdp: r
                    });
                }
            }
            function u(e, t28) {
                !e.RTCPeerConnection && e.webkitRTCPeerConnection && (e.RTCPeerConnection = e.webkitRTCPeerConnection), e.RTCPeerConnection && t28.version < 53 && [
                    "setLocalDescription",
                    "setRemoteDescription",
                    "addIceCandidate"
                ].forEach(function(t) {
                    var r = e.RTCPeerConnection.prototype[t], n = o3({
                    }, t, function() {
                        return arguments[0] = new ("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), r.apply(this, arguments);
                    });
                    e.RTCPeerConnection.prototype[t] = n[t];
                });
            }
            function l(t29, r) {
                e19.wrapPeerConnectionEvent(t29, "negotiationneeded", function(e) {
                    var t = e.target;
                    if (!(r.version < 72 || t.getConfiguration && "plan-b" === t.getConfiguration().sdpSemantics) || "stable" === t.signalingState) return e;
                });
            }
        },
        {
            "../utils.js": "iSxC",
            "./getusermedia": "s6SN",
            "./getdisplaymedia": "VHa8"
        }
    ],
    "NZ1C": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.filterIceServers = n13;
            var r23 = t30(require("../utils"));
            function e34() {
                if ("function" != typeof WeakMap) return null;
                var r = new WeakMap;
                return e34 = function() {
                    return r;
                }, r;
            }
            function t30(r) {
                if (r && r.__esModule) return r;
                if (null === r || "object" != typeof r && "function" != typeof r) return {
                    default: r
                };
                var t = e34();
                if (t && t.has(r)) return t.get(r);
                var n = {
                }, u = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var i in r)if (Object.prototype.hasOwnProperty.call(r, i)) {
                    var f = u ? Object.getOwnPropertyDescriptor(r, i) : null;
                    f && (f.get || f.set) ? Object.defineProperty(n, i, f) : n[i] = r[i];
                }
                return n.default = r, t && t.set(r, n), n;
            }
            function n13(e35, t31) {
                var n = !1;
                return (e35 = JSON.parse(JSON.stringify(e35))).filter(function(e36) {
                    if (e36 && (e36.urls || e36.url)) {
                        var t = e36.urls || e36.url;
                        e36.url && !e36.urls && r23.deprecated("RTCIceServer.url", "RTCIceServer.urls");
                        var u = "string" == typeof t;
                        return u && (t = [
                            t
                        ]), t = t.filter(function(r) {
                            if (0 === r.indexOf("stun:")) return !1;
                            var e = r.startsWith("turn") && !r.startsWith("turn:[") && r.includes("transport=udp");
                            return e && !n ? (n = !0, !0) : e && !n;
                        }), delete e36.url, e36.urls = u ? t[0] : t, !!t.length;
                    }
                });
            }
        },
        {
            "../utils": "iSxC"
        }
    ],
    "YHvh": [
        function(require, module, exports) {
            "use strict";
            var r24 = {
                generateIdentifier: function() {
                    return Math.random().toString(36).substr(2, 10);
                }
            };
            r24.localCName = r24.generateIdentifier(), r24.splitLines = function(r25) {
                return r25.trim().split("\n").map(function(r) {
                    return r.trim();
                });
            }, r24.splitSections = function(r26) {
                return r26.split("\nm=").map(function(r, e) {
                    return (e > 0 ? "m=" + r : r).trim() + "\r\n";
                });
            }, r24.getDescription = function(e) {
                var t = r24.splitSections(e);
                return t && t[0];
            }, r24.getMediaSections = function(e) {
                var t = r24.splitSections(e);
                return t.shift(), t;
            }, r24.matchPrefix = function(e, t) {
                return r24.splitLines(e).filter(function(r) {
                    return 0 === r.indexOf(t);
                });
            }, r24.parseCandidate = function(r) {
                for(var e, t = {
                    foundation: (e = 0 === r.indexOf("a=candidate:") ? r.substring(12).split(" ") : r.substring(10).split(" "))[0],
                    component: parseInt(e[1], 10),
                    protocol: e[2].toLowerCase(),
                    priority: parseInt(e[3], 10),
                    ip: e[4],
                    address: e[4],
                    port: parseInt(e[5], 10),
                    type: e[7]
                }, a = 8; a < e.length; a += 2)switch(e[a]){
                    case "raddr":
                        t.relatedAddress = e[a + 1];
                        break;
                    case "rport":
                        t.relatedPort = parseInt(e[a + 1], 10);
                        break;
                    case "tcptype":
                        t.tcpType = e[a + 1];
                        break;
                    case "ufrag":
                        t.ufrag = e[a + 1], t.usernameFragment = e[a + 1];
                        break;
                    default:
                        t[e[a]] = e[a + 1];
                }
                return t;
            }, r24.writeCandidate = function(r) {
                var e = [];
                e.push(r.foundation), e.push(r.component), e.push(r.protocol.toUpperCase()), e.push(r.priority), e.push(r.address || r.ip), e.push(r.port);
                var t = r.type;
                return e.push("typ"), e.push(t), "host" !== t && r.relatedAddress && r.relatedPort && (e.push("raddr"), e.push(r.relatedAddress), e.push("rport"), e.push(r.relatedPort)), r.tcpType && "tcp" === r.protocol.toLowerCase() && (e.push("tcptype"), e.push(r.tcpType)), (r.usernameFragment || r.ufrag) && (e.push("ufrag"), e.push(r.usernameFragment || r.ufrag)), "candidate:" + e.join(" ");
            }, r24.parseIceOptions = function(r) {
                return r.substr(14).split(" ");
            }, r24.parseRtpMap = function(r) {
                var e = r.substr(9).split(" "), t = {
                    payloadType: parseInt(e.shift(), 10)
                };
                return e = e[0].split("/"), t.name = e[0], t.clockRate = parseInt(e[1], 10), t.channels = 3 === e.length ? parseInt(e[2], 10) : 1, t.numChannels = t.channels, t;
            }, r24.writeRtpMap = function(r) {
                var e = r.payloadType;
                void 0 !== r.preferredPayloadType && (e = r.preferredPayloadType);
                var t = r.channels || r.numChannels || 1;
                return "a=rtpmap:" + e + " " + r.name + "/" + r.clockRate + (1 !== t ? "/" + t : "") + "\r\n";
            }, r24.parseExtmap = function(r) {
                var e = r.substr(9).split(" ");
                return {
                    id: parseInt(e[0], 10),
                    direction: e[0].indexOf("/") > 0 ? e[0].split("/")[1] : "sendrecv",
                    uri: e[1]
                };
            }, r24.writeExtmap = function(r) {
                return "a=extmap:" + (r.id || r.preferredId) + (r.direction && "sendrecv" !== r.direction ? "/" + r.direction : "") + " " + r.uri + "\r\n";
            }, r24.parseFmtp = function(r) {
                for(var e, t = {
                }, a = r.substr(r.indexOf(" ") + 1).split(";"), n = 0; n < a.length; n++)t[(e = a[n].trim().split("="))[0].trim()] = e[1];
                return t;
            }, r24.writeFmtp = function(r) {
                var e37 = "", t = r.payloadType;
                if (void 0 !== r.preferredPayloadType && (t = r.preferredPayloadType), r.parameters && Object.keys(r.parameters).length) {
                    var a = [];
                    Object.keys(r.parameters).forEach(function(e) {
                        r.parameters[e] ? a.push(e + "=" + r.parameters[e]) : a.push(e);
                    }), e37 += "a=fmtp:" + t + " " + a.join(";") + "\r\n";
                }
                return e37;
            }, r24.parseRtcpFb = function(r) {
                var e = r.substr(r.indexOf(" ") + 1).split(" ");
                return {
                    type: e.shift(),
                    parameter: e.join(" ")
                };
            }, r24.writeRtcpFb = function(r27) {
                var e = "", t = r27.payloadType;
                return void 0 !== r27.preferredPayloadType && (t = r27.preferredPayloadType), r27.rtcpFeedback && r27.rtcpFeedback.length && r27.rtcpFeedback.forEach(function(r) {
                    e += "a=rtcp-fb:" + t + " " + r.type + (r.parameter && r.parameter.length ? " " + r.parameter : "") + "\r\n";
                }), e;
            }, r24.parseSsrcMedia = function(r) {
                var e = r.indexOf(" "), t = {
                    ssrc: parseInt(r.substr(7, e - 7), 10)
                }, a = r.indexOf(":", e);
                return a > -1 ? (t.attribute = r.substr(e + 1, a - e - 1), t.value = r.substr(a + 1)) : t.attribute = r.substr(e + 1), t;
            }, r24.parseSsrcGroup = function(r28) {
                var e = r28.substr(13).split(" ");
                return {
                    semantics: e.shift(),
                    ssrcs: e.map(function(r) {
                        return parseInt(r, 10);
                    })
                };
            }, r24.getMid = function(e) {
                var t = r24.matchPrefix(e, "a=mid:")[0];
                if (t) return t.substr(6);
            }, r24.parseFingerprint = function(r) {
                var e = r.substr(14).split(" ");
                return {
                    algorithm: e[0].toLowerCase(),
                    value: e[1]
                };
            }, r24.getDtlsParameters = function(e, t) {
                return {
                    role: "auto",
                    fingerprints: r24.matchPrefix(e + t, "a=fingerprint:").map(r24.parseFingerprint)
                };
            }, r24.writeDtlsParameters = function(r29, e) {
                var t = "a=setup:" + e + "\r\n";
                return r29.fingerprints.forEach(function(r) {
                    t += "a=fingerprint:" + r.algorithm + " " + r.value + "\r\n";
                }), t;
            }, r24.parseCryptoLine = function(r) {
                var e = r.substr(9).split(" ");
                return {
                    tag: parseInt(e[0], 10),
                    cryptoSuite: e[1],
                    keyParams: e[2],
                    sessionParams: e.slice(3)
                };
            }, r24.writeCryptoLine = function(e) {
                return "a=crypto:" + e.tag + " " + e.cryptoSuite + " " + ("object" == typeof e.keyParams ? r24.writeCryptoKeyParams(e.keyParams) : e.keyParams) + (e.sessionParams ? " " + e.sessionParams.join(" ") : "") + "\r\n";
            }, r24.parseCryptoKeyParams = function(r) {
                if (0 !== r.indexOf("inline:")) return null;
                var e = r.substr(7).split("|");
                return {
                    keyMethod: "inline",
                    keySalt: e[0],
                    lifeTime: e[1],
                    mkiValue: e[2] ? e[2].split(":")[0] : void 0,
                    mkiLength: e[2] ? e[2].split(":")[1] : void 0
                };
            }, r24.writeCryptoKeyParams = function(r) {
                return r.keyMethod + ":" + r.keySalt + (r.lifeTime ? "|" + r.lifeTime : "") + (r.mkiValue && r.mkiLength ? "|" + r.mkiValue + ":" + r.mkiLength : "");
            }, r24.getCryptoParameters = function(e, t) {
                return r24.matchPrefix(e + t, "a=crypto:").map(r24.parseCryptoLine);
            }, r24.getIceParameters = function(e, t) {
                var a = r24.matchPrefix(e + t, "a=ice-ufrag:")[0], n = r24.matchPrefix(e + t, "a=ice-pwd:")[0];
                return a && n ? {
                    usernameFragment: a.substr(12),
                    password: n.substr(10)
                } : null;
            }, r24.writeIceParameters = function(r) {
                return "a=ice-ufrag:" + r.usernameFragment + "\r\na=ice-pwd:" + r.password + "\r\n";
            }, r24.parseRtpParameters = function(e38) {
                for(var t = {
                    codecs: [],
                    headerExtensions: [],
                    fecMechanisms: [],
                    rtcp: []
                }, a = r24.splitLines(e38)[0].split(" "), n = 3; n < a.length; n++){
                    var s = a[n], i = r24.matchPrefix(e38, "a=rtpmap:" + s + " ")[0];
                    if (i) {
                        var p = r24.parseRtpMap(i), c = r24.matchPrefix(e38, "a=fmtp:" + s + " ");
                        switch(p.parameters = c.length ? r24.parseFmtp(c[0]) : {
                        }, p.rtcpFeedback = r24.matchPrefix(e38, "a=rtcp-fb:" + s + " ").map(r24.parseRtcpFb), t.codecs.push(p), p.name.toUpperCase()){
                            case "RED":
                            case "ULPFEC":
                                t.fecMechanisms.push(p.name.toUpperCase());
                        }
                    }
                }
                return r24.matchPrefix(e38, "a=extmap:").forEach(function(e) {
                    t.headerExtensions.push(r24.parseExtmap(e));
                }), t;
            }, r24.writeRtpDescription = function(e39, t) {
                var a = "";
                a += "m=" + e39 + " ", a += t.codecs.length > 0 ? "9" : "0", a += " UDP/TLS/RTP/SAVPF ", a += t.codecs.map(function(r) {
                    return void 0 !== r.preferredPayloadType ? r.preferredPayloadType : r.payloadType;
                }).join(" ") + "\r\n", a += "c=IN IP4 0.0.0.0\r\n", a += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function(e) {
                    a += r24.writeRtpMap(e), a += r24.writeFmtp(e), a += r24.writeRtcpFb(e);
                });
                var n = 0;
                return t.codecs.forEach(function(r) {
                    r.maxptime > n && (n = r.maxptime);
                }), n > 0 && (a += "a=maxptime:" + n + "\r\n"), a += "a=rtcp-mux\r\n", t.headerExtensions && t.headerExtensions.forEach(function(e) {
                    a += r24.writeExtmap(e);
                }), a;
            }, r24.parseRtpEncodingParameters = function(e40) {
                var t, a = [], n = r24.parseRtpParameters(e40), s = -1 !== n.fecMechanisms.indexOf("RED"), i = -1 !== n.fecMechanisms.indexOf("ULPFEC"), p = r24.matchPrefix(e40, "a=ssrc:").map(function(e) {
                    return r24.parseSsrcMedia(e);
                }).filter(function(r) {
                    return "cname" === r.attribute;
                }), c = p.length > 0 && p[0].ssrc, o = r24.matchPrefix(e40, "a=ssrc-group:FID").map(function(r30) {
                    return r30.substr(17).split(" ").map(function(r) {
                        return parseInt(r, 10);
                    });
                });
                o.length > 0 && o[0].length > 1 && o[0][0] === c && (t = o[0][1]), n.codecs.forEach(function(r) {
                    if ("RTX" === r.name.toUpperCase() && r.parameters.apt) {
                        var e = {
                            ssrc: c,
                            codecPayloadType: parseInt(r.parameters.apt, 10)
                        };
                        c && t && (e.rtx = {
                            ssrc: t
                        }), a.push(e), s && ((e = JSON.parse(JSON.stringify(e))).fec = {
                            ssrc: c,
                            mechanism: i ? "red+ulpfec" : "red"
                        }, a.push(e));
                    }
                }), 0 === a.length && c && a.push({
                    ssrc: c
                });
                var u = r24.matchPrefix(e40, "b=");
                return u.length && (u = 0 === u[0].indexOf("b=TIAS:") ? parseInt(u[0].substr(7), 10) : 0 === u[0].indexOf("b=AS:") ? 1000 * parseInt(u[0].substr(5), 10) * 0.95 - 16000 : void 0, a.forEach(function(r) {
                    r.maxBitrate = u;
                })), a;
            }, r24.parseRtcpParameters = function(e41) {
                var t = {
                }, a = r24.matchPrefix(e41, "a=ssrc:").map(function(e) {
                    return r24.parseSsrcMedia(e);
                }).filter(function(r) {
                    return "cname" === r.attribute;
                })[0];
                a && (t.cname = a.value, t.ssrc = a.ssrc);
                var n = r24.matchPrefix(e41, "a=rtcp-rsize");
                t.reducedSize = n.length > 0, t.compound = 0 === n.length;
                var s = r24.matchPrefix(e41, "a=rtcp-mux");
                return t.mux = s.length > 0, t;
            }, r24.parseMsid = function(e42) {
                var t, a = r24.matchPrefix(e42, "a=msid:");
                if (1 === a.length) return {
                    stream: (t = a[0].substr(7).split(" "))[0],
                    track: t[1]
                };
                var n = r24.matchPrefix(e42, "a=ssrc:").map(function(e) {
                    return r24.parseSsrcMedia(e);
                }).filter(function(r) {
                    return "msid" === r.attribute;
                });
                return n.length > 0 ? {
                    stream: (t = n[0].value.split(" "))[0],
                    track: t[1]
                } : void 0;
            }, r24.parseSctpDescription = function(e) {
                var t, a = r24.parseMLine(e), n = r24.matchPrefix(e, "a=max-message-size:");
                n.length > 0 && (t = parseInt(n[0].substr(19), 10)), isNaN(t) && (t = 65536);
                var s = r24.matchPrefix(e, "a=sctp-port:");
                if (s.length > 0) return {
                    port: parseInt(s[0].substr(12), 10),
                    protocol: a.fmt,
                    maxMessageSize: t
                };
                if (r24.matchPrefix(e, "a=sctpmap:").length > 0) {
                    var i = r24.matchPrefix(e, "a=sctpmap:")[0].substr(10).split(" ");
                    return {
                        port: parseInt(i[0], 10),
                        protocol: i[1],
                        maxMessageSize: t
                    };
                }
            }, r24.writeSctpDescription = function(r, e) {
                var t = [];
                return t = "DTLS/SCTP" !== r.protocol ? [
                    "m=" + r.kind + " 9 " + r.protocol + " " + e.protocol + "\r\n",
                    "c=IN IP4 0.0.0.0\r\n",
                    "a=sctp-port:" + e.port + "\r\n"
                ] : [
                    "m=" + r.kind + " 9 " + r.protocol + " " + e.port + "\r\n",
                    "c=IN IP4 0.0.0.0\r\n",
                    "a=sctpmap:" + e.port + " " + e.protocol + " 65535\r\n"
                ], void 0 !== e.maxMessageSize && t.push("a=max-message-size:" + e.maxMessageSize + "\r\n"), t.join("");
            }, r24.generateSessionId = function() {
                return Math.random().toString().substr(2, 21);
            }, r24.writeSessionBoilerplate = function(e, t, a) {
                var n = void 0 !== t ? t : 2;
                return "v=0\r\no=" + (a || "thisisadapterortc") + " " + (e || r24.generateSessionId()) + " " + n + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n";
            }, r24.writeMediaSection = function(e, t, a, n) {
                var s = r24.writeRtpDescription(e.kind, t);
                if (s += r24.writeIceParameters(e.iceGatherer.getLocalParameters()), s += r24.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === a ? "actpass" : "active"), s += "a=mid:" + e.mid + "\r\n", e.direction ? s += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? s += "a=sendrecv\r\n" : e.rtpSender ? s += "a=sendonly\r\n" : e.rtpReceiver ? s += "a=recvonly\r\n" : s += "a=inactive\r\n", e.rtpSender) {
                    var i = "msid:" + n.id + " " + e.rtpSender.track.id + "\r\n";
                    s += "a=" + i, s += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + i, e.sendEncodingParameters[0].rtx && (s += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + i, s += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n");
                }
                return s += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + r24.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (s += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + r24.localCName + "\r\n"), s;
            }, r24.getDirection = function(e, t) {
                for(var a = r24.splitLines(e), n = 0; n < a.length; n++)switch(a[n]){
                    case "a=sendrecv":
                    case "a=sendonly":
                    case "a=recvonly":
                    case "a=inactive":
                        return a[n].substr(2);
                }
                return t ? r24.getDirection(t) : "sendrecv";
            }, r24.getKind = function(e) {
                return r24.splitLines(e)[0].split(" ")[0].substr(2);
            }, r24.isRejected = function(r) {
                return "0" === r.split(" ", 2)[1];
            }, r24.parseMLine = function(e) {
                var t = r24.splitLines(e)[0].substr(2).split(" ");
                return {
                    kind: t[0],
                    port: parseInt(t[1], 10),
                    protocol: t[2],
                    fmt: t.slice(3).join(" ")
                };
            }, r24.parseOLine = function(e) {
                var t = r24.matchPrefix(e, "o=")[0].substr(2).split(" ");
                return {
                    username: t[0],
                    sessionId: t[1],
                    sessionVersion: parseInt(t[2], 10),
                    netType: t[3],
                    addressType: t[4],
                    address: t[5]
                };
            }, r24.isValidSDP = function(e) {
                if ("string" != typeof e || 0 === e.length) return !1;
                for(var t = r24.splitLines(e), a = 0; a < t.length; a++)if (t[a].length < 2 || "=" !== t[a].charAt(1)) return !1;
                return !0;
            }, "object" == typeof module && (module.exports = r24);
        },
        {
        }
    ],
    "NJ2u": [
        function(require, module, exports) {
            "use strict";
            var e43 = require("sdp");
            function t32(e) {
                return ({
                    inboundrtp: "inbound-rtp",
                    outboundrtp: "outbound-rtp",
                    candidatepair: "candidate-pair",
                    localcandidate: "local-candidate",
                    remotecandidate: "remote-candidate"
                })[e.type] || e.type;
            }
            function r31(t, r, n, a, i) {
                var s = e43.writeRtpDescription(t.kind, r);
                if (s += e43.writeIceParameters(t.iceGatherer.getLocalParameters()), s += e43.writeDtlsParameters(t.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass" : i || "active"), s += "a=mid:" + t.mid + "\r\n", t.rtpSender && t.rtpReceiver ? s += "a=sendrecv\r\n" : t.rtpSender ? s += "a=sendonly\r\n" : t.rtpReceiver ? s += "a=recvonly\r\n" : s += "a=inactive\r\n", t.rtpSender) {
                    var o = t.rtpSender._initialTrackId || t.rtpSender.track.id;
                    t.rtpSender._initialTrackId = o;
                    var c = "msid:" + (a ? a.id : "-") + " " + o + "\r\n";
                    s += "a=" + c, s += "a=ssrc:" + t.sendEncodingParameters[0].ssrc + " " + c, t.sendEncodingParameters[0].rtx && (s += "a=ssrc:" + t.sendEncodingParameters[0].rtx.ssrc + " " + c, s += "a=ssrc-group:FID " + t.sendEncodingParameters[0].ssrc + " " + t.sendEncodingParameters[0].rtx.ssrc + "\r\n");
                }
                return s += "a=ssrc:" + t.sendEncodingParameters[0].ssrc + " cname:" + e43.localCName + "\r\n", t.rtpSender && t.sendEncodingParameters[0].rtx && (s += "a=ssrc:" + t.sendEncodingParameters[0].rtx.ssrc + " cname:" + e43.localCName + "\r\n"), s;
            }
            function n14(e44, t) {
                var r = !1;
                return (e44 = JSON.parse(JSON.stringify(e44))).filter(function(e45) {
                    if (e45 && (e45.urls || e45.url)) {
                        var n = e45.urls || e45.url;
                        e45.url && !e45.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
                        var a = "string" == typeof n;
                        return a && (n = [
                            n
                        ]), n = n.filter(function(e) {
                            return 0 === e.indexOf("turn:") && -1 !== e.indexOf("transport=udp") && -1 === e.indexOf("turn:[") && !r ? (r = !0, !0) : 0 === e.indexOf("stun:") && t >= 14393 && -1 === e.indexOf("?transport=udp");
                        }), delete e45.url, e45.urls = a ? n[0] : n, !!n.length;
                    }
                });
            }
            function a5(e46, t33) {
                var r32 = {
                    codecs: [],
                    headerExtensions: [],
                    fecMechanisms: []
                }, n15 = function(e, t) {
                    e = parseInt(e, 10);
                    for(var r = 0; r < t.length; r++)if (t[r].payloadType === e || t[r].preferredPayloadType === e) return t[r];
                }, a6 = function(e, t, r, a) {
                    var i = n15(e.parameters.apt, r), s = n15(t.parameters.apt, a);
                    return i && s && i.name.toLowerCase() === s.name.toLowerCase();
                };
                return e46.codecs.forEach(function(n) {
                    for(var i = 0; i < t33.codecs.length; i++){
                        var s = t33.codecs[i];
                        if (n.name.toLowerCase() === s.name.toLowerCase() && n.clockRate === s.clockRate) {
                            if ("rtx" === n.name.toLowerCase() && n.parameters && s.parameters.apt && !a6(n, s, e46.codecs, t33.codecs)) continue;
                            (s = JSON.parse(JSON.stringify(s))).numChannels = Math.min(n.numChannels, s.numChannels), r32.codecs.push(s), s.rtcpFeedback = s.rtcpFeedback.filter(function(e) {
                                for(var t = 0; t < n.rtcpFeedback.length; t++)if (n.rtcpFeedback[t].type === e.type && n.rtcpFeedback[t].parameter === e.parameter) return !0;
                                return !1;
                            });
                            break;
                        }
                    }
                }), e46.headerExtensions.forEach(function(e) {
                    for(var n = 0; n < t33.headerExtensions.length; n++){
                        var a = t33.headerExtensions[n];
                        if (e.uri === a.uri) {
                            r32.headerExtensions.push(a);
                            break;
                        }
                    }
                }), r32;
            }
            function i14(e, t, r) {
                return -1 !== ({
                    offer: {
                        setLocalDescription: [
                            "stable",
                            "have-local-offer"
                        ],
                        setRemoteDescription: [
                            "stable",
                            "have-remote-offer"
                        ]
                    },
                    answer: {
                        setLocalDescription: [
                            "have-remote-offer",
                            "have-local-pranswer"
                        ],
                        setRemoteDescription: [
                            "have-local-offer",
                            "have-remote-pranswer"
                        ]
                    }
                })[t][e].indexOf(r);
            }
            function s5(e47, t) {
                var r = e47.getRemoteCandidates().find(function(e) {
                    return t.foundation === e.foundation && t.ip === e.ip && t.port === e.port && t.priority === e.priority && t.protocol === e.protocol && t.type === e.type;
                });
                return r || e47.addRemoteCandidate(t), !r;
            }
            function o4(e, t) {
                var r = new Error(t);
                return r.name = e, r.code = ({
                    NotSupportedError: 9,
                    InvalidStateError: 11,
                    InvalidAccessError: 15,
                    TypeError: void 0,
                    OperationError: void 0
                })[e], r;
            }
            module.exports = function(c5, d3) {
                function p1(e, t) {
                    t.addTrack(e), t.dispatchEvent(new c5.MediaStreamTrackEvent("addtrack", {
                        track: e
                    }));
                }
                function l2(e, t, r, n) {
                    var a = new Event("track");
                    a.track = t, a.receiver = r, a.transceiver = {
                        receiver: r
                    }, a.streams = n, c5.setTimeout(function() {
                        e._dispatchEvent("track", a);
                    });
                }
                var f1 = function(t) {
                    var r = this, a = document.createDocumentFragment();
                    if ([
                        "addEventListener",
                        "removeEventListener",
                        "dispatchEvent"
                    ].forEach(function(e) {
                        r[e] = a[e].bind(a);
                    }), this.canTrickleIceCandidates = null, this.needNegotiation = !1, this.localStreams = [], this.remoteStreams = [], this._localDescription = null, this._remoteDescription = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", t = JSON.parse(JSON.stringify(t || {
                    })), this.usingBundle = "max-bundle" === t.bundlePolicy, "negotiate" === t.rtcpMuxPolicy) throw o4("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
                    switch(t.rtcpMuxPolicy || (t.rtcpMuxPolicy = "require"), t.iceTransportPolicy){
                        case "all":
                        case "relay":
                            break;
                        default:
                            t.iceTransportPolicy = "all";
                    }
                    switch(t.bundlePolicy){
                        case "balanced":
                        case "max-compat":
                        case "max-bundle":
                            break;
                        default:
                            t.bundlePolicy = "balanced";
                    }
                    if (t.iceServers = n14(t.iceServers || [], d3), this._iceGatherers = [], t.iceCandidatePoolSize) for(var i = t.iceCandidatePoolSize; i > 0; i--)this._iceGatherers.push(new c5.RTCIceGatherer({
                        iceServers: t.iceServers,
                        gatherPolicy: t.iceTransportPolicy
                    }));
                    else t.iceCandidatePoolSize = 0;
                    this._config = t, this.transceivers = [], this._sdpSessionId = e43.generateSessionId(), this._sdpSessionVersion = 0, this._dtlsRole = void 0, this._isClosed = !1;
                };
                Object.defineProperty(f1.prototype, "localDescription", {
                    configurable: !0,
                    get: function() {
                        return this._localDescription;
                    }
                }), Object.defineProperty(f1.prototype, "remoteDescription", {
                    configurable: !0,
                    get: function() {
                        return this._remoteDescription;
                    }
                }), f1.prototype.onicecandidate = null, f1.prototype.onaddstream = null, f1.prototype.ontrack = null, f1.prototype.onremovestream = null, f1.prototype.onsignalingstatechange = null, f1.prototype.oniceconnectionstatechange = null, f1.prototype.onconnectionstatechange = null, f1.prototype.onicegatheringstatechange = null, f1.prototype.onnegotiationneeded = null, f1.prototype.ondatachannel = null, f1.prototype._dispatchEvent = function(e, t) {
                    this._isClosed || (this.dispatchEvent(t), "function" == typeof this["on" + e] && this["on" + e](t));
                }, f1.prototype._emitGatheringStateChange = function() {
                    var e = new Event("icegatheringstatechange");
                    this._dispatchEvent("icegatheringstatechange", e);
                }, f1.prototype.getConfiguration = function() {
                    return this._config;
                }, f1.prototype.getLocalStreams = function() {
                    return this.localStreams;
                }, f1.prototype.getRemoteStreams = function() {
                    return this.remoteStreams;
                }, f1.prototype._createTransceiver = function(e, t) {
                    var r = this.transceivers.length > 0, n = {
                        track: null,
                        iceGatherer: null,
                        iceTransport: null,
                        dtlsTransport: null,
                        localCapabilities: null,
                        remoteCapabilities: null,
                        rtpSender: null,
                        rtpReceiver: null,
                        kind: e,
                        mid: null,
                        sendEncodingParameters: null,
                        recvEncodingParameters: null,
                        stream: null,
                        associatedRemoteMediaStreams: [],
                        wantReceive: !0
                    };
                    if (this.usingBundle && r) n.iceTransport = this.transceivers[0].iceTransport, n.dtlsTransport = this.transceivers[0].dtlsTransport;
                    else {
                        var a = this._createIceAndDtlsTransports();
                        n.iceTransport = a.iceTransport, n.dtlsTransport = a.dtlsTransport;
                    }
                    return t || this.transceivers.push(n), n;
                }, f1.prototype.addTrack = function(e, t34) {
                    if (this._isClosed) throw o4("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
                    var r;
                    if (this.transceivers.find(function(t) {
                        return t.track === e;
                    })) throw o4("InvalidAccessError", "Track already exists.");
                    for(var n = 0; n < this.transceivers.length; n++)this.transceivers[n].track || this.transceivers[n].kind !== e.kind || (r = this.transceivers[n]);
                    return r || (r = this._createTransceiver(e.kind)), this._maybeFireNegotiationNeeded(), -1 === this.localStreams.indexOf(t34) && this.localStreams.push(t34), r.track = e, r.stream = t34, r.rtpSender = new c5.RTCRtpSender(e, r.dtlsTransport), r.rtpSender;
                }, f1.prototype.addStream = function(e48) {
                    var t = this;
                    if (d3 >= 15025) e48.getTracks().forEach(function(r) {
                        t.addTrack(r, e48);
                    });
                    else {
                        var r33 = e48.clone();
                        e48.getTracks().forEach(function(e49, t) {
                            var n = r33.getTracks()[t];
                            e49.addEventListener("enabled", function(e) {
                                n.enabled = e.enabled;
                            });
                        }), r33.getTracks().forEach(function(e) {
                            t.addTrack(e, r33);
                        });
                    }
                }, f1.prototype.removeTrack = function(e50) {
                    if (this._isClosed) throw o4("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
                    if (!(e50 instanceof c5.RTCRtpSender)) throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
                    var t35 = this.transceivers.find(function(t) {
                        return t.rtpSender === e50;
                    });
                    if (!t35) throw o4("InvalidAccessError", "Sender was not created by this connection.");
                    var r = t35.stream;
                    t35.rtpSender.stop(), t35.rtpSender = null, t35.track = null, t35.stream = null, -1 === this.transceivers.map(function(e) {
                        return e.stream;
                    }).indexOf(r) && this.localStreams.indexOf(r) > -1 && this.localStreams.splice(this.localStreams.indexOf(r), 1), this._maybeFireNegotiationNeeded();
                }, f1.prototype.removeStream = function(e51) {
                    var t36 = this;
                    e51.getTracks().forEach(function(e) {
                        var r = t36.getSenders().find(function(t) {
                            return t.track === e;
                        });
                        r && t36.removeTrack(r);
                    });
                }, f1.prototype.getSenders = function() {
                    return this.transceivers.filter(function(e) {
                        return !!e.rtpSender;
                    }).map(function(e) {
                        return e.rtpSender;
                    });
                }, f1.prototype.getReceivers = function() {
                    return this.transceivers.filter(function(e) {
                        return !!e.rtpReceiver;
                    }).map(function(e) {
                        return e.rtpReceiver;
                    });
                }, f1.prototype._createIceGatherer = function(e, t37) {
                    var r = this;
                    if (t37 && e > 0) return this.transceivers[0].iceGatherer;
                    if (this._iceGatherers.length) return this._iceGatherers.shift();
                    var n = new c5.RTCIceGatherer({
                        iceServers: this._config.iceServers,
                        gatherPolicy: this._config.iceTransportPolicy
                    });
                    return Object.defineProperty(n, "state", {
                        value: "new",
                        writable: !0
                    }), this.transceivers[e].bufferedCandidateEvents = [], this.transceivers[e].bufferCandidates = function(t) {
                        var a = !t.candidate || 0 === Object.keys(t.candidate).length;
                        n.state = a ? "completed" : "gathering", null !== r.transceivers[e].bufferedCandidateEvents && r.transceivers[e].bufferedCandidateEvents.push(t);
                    }, n.addEventListener("localcandidate", this.transceivers[e].bufferCandidates), n;
                }, f1.prototype._gather = function(t, r) {
                    var n = this, a = this.transceivers[r].iceGatherer;
                    if (!a.onlocalcandidate) {
                        var i15 = this.transceivers[r].bufferedCandidateEvents;
                        this.transceivers[r].bufferedCandidateEvents = null, a.removeEventListener("localcandidate", this.transceivers[r].bufferCandidates), a.onlocalcandidate = function(i) {
                            if (!(n.usingBundle && r > 0)) {
                                var s = new Event("icecandidate");
                                s.candidate = {
                                    sdpMid: t,
                                    sdpMLineIndex: r
                                };
                                var o = i.candidate, c = !o || 0 === Object.keys(o).length;
                                if (c) "new" !== a.state && "gathering" !== a.state || (a.state = "completed");
                                else {
                                    "new" === a.state && (a.state = "gathering"), o.component = 1, o.ufrag = a.getLocalParameters().usernameFragment;
                                    var d = e43.writeCandidate(o);
                                    s.candidate = Object.assign(s.candidate, e43.parseCandidate(d)), s.candidate.candidate = d, s.candidate.toJSON = function() {
                                        return {
                                            candidate: s.candidate.candidate,
                                            sdpMid: s.candidate.sdpMid,
                                            sdpMLineIndex: s.candidate.sdpMLineIndex,
                                            usernameFragment: s.candidate.usernameFragment
                                        };
                                    };
                                }
                                var p = e43.getMediaSections(n._localDescription.sdp);
                                p[s.candidate.sdpMLineIndex] += c ? "a=end-of-candidates\r\n" : "a=" + s.candidate.candidate + "\r\n", n._localDescription.sdp = e43.getDescription(n._localDescription.sdp) + p.join("");
                                var l = n.transceivers.every(function(e) {
                                    return e.iceGatherer && "completed" === e.iceGatherer.state;
                                });
                                "gathering" !== n.iceGatheringState && (n.iceGatheringState = "gathering", n._emitGatheringStateChange()), c || n._dispatchEvent("icecandidate", s), l && (n._dispatchEvent("icecandidate", new Event("icecandidate")), n.iceGatheringState = "complete", n._emitGatheringStateChange());
                            }
                        }, c5.setTimeout(function() {
                            i15.forEach(function(e) {
                                a.onlocalcandidate(e);
                            });
                        }, 0);
                    }
                }, f1.prototype._createIceAndDtlsTransports = function() {
                    var e = this, t = new c5.RTCIceTransport(null);
                    t.onicestatechange = function() {
                        e._updateIceConnectionState(), e._updateConnectionState();
                    };
                    var r = new c5.RTCDtlsTransport(t);
                    return r.ondtlsstatechange = function() {
                        e._updateConnectionState();
                    }, r.onerror = function() {
                        Object.defineProperty(r, "state", {
                            value: "failed",
                            writable: !0
                        }), e._updateConnectionState();
                    }, {
                        iceTransport: t,
                        dtlsTransport: r
                    };
                }, f1.prototype._disposeIceAndDtlsTransports = function(e) {
                    var t = this.transceivers[e].iceGatherer;
                    t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
                    var r = this.transceivers[e].iceTransport;
                    r && (delete r.onicestatechange, delete this.transceivers[e].iceTransport);
                    var n = this.transceivers[e].dtlsTransport;
                    n && (delete n.ondtlsstatechange, delete n.onerror, delete this.transceivers[e].dtlsTransport);
                }, f1.prototype._transceive = function(t, r, n) {
                    var i = a5(t.localCapabilities, t.remoteCapabilities);
                    r && t.rtpSender && (i.encodings = t.sendEncodingParameters, i.rtcp = {
                        cname: e43.localCName,
                        compound: t.rtcpParameters.compound
                    }, t.recvEncodingParameters.length && (i.rtcp.ssrc = t.recvEncodingParameters[0].ssrc), t.rtpSender.send(i)), n && t.rtpReceiver && i.codecs.length > 0 && ("video" === t.kind && t.recvEncodingParameters && d3 < 15019 && t.recvEncodingParameters.forEach(function(e) {
                        delete e.rtx;
                    }), t.recvEncodingParameters.length ? i.encodings = t.recvEncodingParameters : i.encodings = [
                        {
                        }
                    ], i.rtcp = {
                        compound: t.rtcpParameters.compound
                    }, t.rtcpParameters.cname && (i.rtcp.cname = t.rtcpParameters.cname), t.sendEncodingParameters.length && (i.rtcp.ssrc = t.sendEncodingParameters[0].ssrc), t.rtpReceiver.receive(i));
                }, f1.prototype.setLocalDescription = function(t38) {
                    var r34, n16, s = this;
                    if (-1 === [
                        "offer",
                        "answer"
                    ].indexOf(t38.type)) return Promise.reject(o4("TypeError", 'Unsupported type "' + t38.type + '"'));
                    if (!i14("setLocalDescription", t38.type, s.signalingState) || s._isClosed) return Promise.reject(o4("InvalidStateError", "Can not set local " + t38.type + " in state " + s.signalingState));
                    if ("offer" === t38.type) r34 = e43.splitSections(t38.sdp), n16 = r34.shift(), r34.forEach(function(t, r) {
                        var n = e43.parseRtpParameters(t);
                        s.transceivers[r].localCapabilities = n;
                    }), s.transceivers.forEach(function(e, t) {
                        s._gather(e.mid, t);
                    });
                    else if ("answer" === t38.type) {
                        r34 = e43.splitSections(s._remoteDescription.sdp), n16 = r34.shift();
                        var c = e43.matchPrefix(n16, "a=ice-lite").length > 0;
                        r34.forEach(function(t, r) {
                            var i = s.transceivers[r], o = i.iceGatherer, d = i.iceTransport, p = i.dtlsTransport, l = i.localCapabilities, f = i.remoteCapabilities;
                            if (!(e43.isRejected(t) && 0 === e43.matchPrefix(t, "a=bundle-only").length) && !i.rejected) {
                                var u = e43.getIceParameters(t, n16), v = e43.getDtlsParameters(t, n16);
                                c && (v.role = "server"), s.usingBundle && 0 !== r || (s._gather(i.mid, r), "new" === d.state && d.start(o, u, c ? "controlling" : "controlled"), "new" === p.state && p.start(v));
                                var h = a5(l, f);
                                s._transceive(i, h.codecs.length > 0, !1);
                            }
                        });
                    }
                    return s._localDescription = {
                        type: t38.type,
                        sdp: t38.sdp
                    }, "offer" === t38.type ? s._updateSignalingState("have-local-offer") : s._updateSignalingState("stable"), Promise.resolve();
                }, f1.prototype.setRemoteDescription = function(t39) {
                    var r35 = this;
                    if (-1 === [
                        "offer",
                        "answer"
                    ].indexOf(t39.type)) return Promise.reject(o4("TypeError", 'Unsupported type "' + t39.type + '"'));
                    if (!i14("setRemoteDescription", t39.type, r35.signalingState) || r35._isClosed) return Promise.reject(o4("InvalidStateError", "Can not set remote " + t39.type + " in state " + r35.signalingState));
                    var n17 = {
                    };
                    r35.remoteStreams.forEach(function(e) {
                        n17[e.id] = e;
                    });
                    var f = [], u3 = e43.splitSections(t39.sdp), v = u3.shift(), h = e43.matchPrefix(v, "a=ice-lite").length > 0, m = e43.matchPrefix(v, "a=group:BUNDLE ").length > 0;
                    r35.usingBundle = m;
                    var g1 = e43.matchPrefix(v, "a=ice-options:")[0];
                    return r35.canTrickleIceCandidates = !!g1 && g1.substr(14).split(" ").indexOf("trickle") >= 0, u3.forEach(function(i, o) {
                        var l = e43.splitLines(i), u = e43.getKind(i), g = e43.isRejected(i) && 0 === e43.matchPrefix(i, "a=bundle-only").length, y = l[0].substr(2).split(" ")[2], S = e43.getDirection(i, v), T = e43.parseMsid(i), E = e43.getMid(i) || e43.generateIdentifier();
                        if (g || "application" === u && ("DTLS/SCTP" === y || "UDP/DTLS/SCTP" === y)) r35.transceivers[o] = {
                            mid: E,
                            kind: u,
                            protocol: y,
                            rejected: !0
                        };
                        else {
                            var C, P, w, R, _, k, b, x, D;
                            !g && r35.transceivers[o] && r35.transceivers[o].rejected && (r35.transceivers[o] = r35._createTransceiver(u, !0));
                            var I, L, M = e43.parseRtpParameters(i);
                            g || (I = e43.getIceParameters(i, v), (L = e43.getDtlsParameters(i, v)).role = "client"), b = e43.parseRtpEncodingParameters(i);
                            var O = e43.parseRtcpParameters(i), G = e43.matchPrefix(i, "a=end-of-candidates", v).length > 0, j = e43.matchPrefix(i, "a=candidate:").map(function(t) {
                                return e43.parseCandidate(t);
                            }).filter(function(e) {
                                return 1 === e.component;
                            });
                            if (("offer" === t39.type || "answer" === t39.type) && !g && m && o > 0 && r35.transceivers[o] && (r35._disposeIceAndDtlsTransports(o), r35.transceivers[o].iceGatherer = r35.transceivers[0].iceGatherer, r35.transceivers[o].iceTransport = r35.transceivers[0].iceTransport, r35.transceivers[o].dtlsTransport = r35.transceivers[0].dtlsTransport, r35.transceivers[o].rtpSender && r35.transceivers[o].rtpSender.setTransport(r35.transceivers[0].dtlsTransport), r35.transceivers[o].rtpReceiver && r35.transceivers[o].rtpReceiver.setTransport(r35.transceivers[0].dtlsTransport)), "offer" !== t39.type || g) {
                                if ("answer" === t39.type && !g) P = (C = r35.transceivers[o]).iceGatherer, w = C.iceTransport, R = C.dtlsTransport, _ = C.rtpReceiver, k = C.sendEncodingParameters, x = C.localCapabilities, r35.transceivers[o].recvEncodingParameters = b, r35.transceivers[o].remoteCapabilities = M, r35.transceivers[o].rtcpParameters = O, j.length && "new" === w.state && (!h && !G || m && 0 !== o ? j.forEach(function(e) {
                                    s5(C.iceTransport, e);
                                }) : w.setRemoteCandidates(j)), m && 0 !== o || ("new" === w.state && w.start(P, I, "controlling"), "new" === R.state && R.start(L)), !a5(C.localCapabilities, C.remoteCapabilities).codecs.filter(function(e) {
                                    return "rtx" === e.name.toLowerCase();
                                }).length && C.sendEncodingParameters[0].rtx && delete C.sendEncodingParameters[0].rtx, r35._transceive(C, "sendrecv" === S || "recvonly" === S, "sendrecv" === S || "sendonly" === S), !_ || "sendrecv" !== S && "sendonly" !== S ? delete C.rtpReceiver : (D = _.track, T ? (n17[T.stream] || (n17[T.stream] = new c5.MediaStream), p1(D, n17[T.stream]), f.push([
                                    D,
                                    _,
                                    n17[T.stream]
                                ])) : (n17.default || (n17.default = new c5.MediaStream), p1(D, n17.default), f.push([
                                    D,
                                    _,
                                    n17.default
                                ])));
                            } else {
                                (C = r35.transceivers[o] || r35._createTransceiver(u)).mid = E, C.iceGatherer || (C.iceGatherer = r35._createIceGatherer(o, m)), j.length && "new" === C.iceTransport.state && (!G || m && 0 !== o ? j.forEach(function(e) {
                                    s5(C.iceTransport, e);
                                }) : C.iceTransport.setRemoteCandidates(j)), x = c5.RTCRtpReceiver.getCapabilities(u), d3 < 15019 && (x.codecs = x.codecs.filter(function(e) {
                                    return "rtx" !== e.name;
                                })), k = C.sendEncodingParameters || [
                                    {
                                        ssrc: 1001 * (2 * o + 2)
                                    }
                                ];
                                var N, A = !1;
                                if ("sendrecv" === S || "sendonly" === S) {
                                    if (A = !C.rtpReceiver, _ = C.rtpReceiver || new c5.RTCRtpReceiver(C.dtlsTransport, u), A) D = _.track, T && "-" === T.stream || (T ? (n17[T.stream] || (n17[T.stream] = new c5.MediaStream, Object.defineProperty(n17[T.stream], "id", {
                                        get: function() {
                                            return T.stream;
                                        }
                                    })), Object.defineProperty(D, "id", {
                                        get: function() {
                                            return T.track;
                                        }
                                    }), N = n17[T.stream]) : (n17.default || (n17.default = new c5.MediaStream), N = n17.default)), N && (p1(D, N), C.associatedRemoteMediaStreams.push(N)), f.push([
                                        D,
                                        _,
                                        N
                                    ]);
                                } else C.rtpReceiver && C.rtpReceiver.track && (C.associatedRemoteMediaStreams.forEach(function(e52) {
                                    var t, r, n = e52.getTracks().find(function(e) {
                                        return e.id === C.rtpReceiver.track.id;
                                    });
                                    n && (t = n, (r = e52).removeTrack(t), r.dispatchEvent(new c5.MediaStreamTrackEvent("removetrack", {
                                        track: t
                                    })));
                                }), C.associatedRemoteMediaStreams = []);
                                C.localCapabilities = x, C.remoteCapabilities = M, C.rtpReceiver = _, C.rtcpParameters = O, C.sendEncodingParameters = k, C.recvEncodingParameters = b, r35._transceive(r35.transceivers[o], !1, A);
                            }
                        }
                    }), void 0 === r35._dtlsRole && (r35._dtlsRole = "offer" === t39.type ? "active" : "passive"), r35._remoteDescription = {
                        type: t39.type,
                        sdp: t39.sdp
                    }, "offer" === t39.type ? r35._updateSignalingState("have-remote-offer") : r35._updateSignalingState("stable"), Object.keys(n17).forEach(function(e53) {
                        var t = n17[e53];
                        if (t.getTracks().length) {
                            if (-1 === r35.remoteStreams.indexOf(t)) {
                                r35.remoteStreams.push(t);
                                var a = new Event("addstream");
                                a.stream = t, c5.setTimeout(function() {
                                    r35._dispatchEvent("addstream", a);
                                });
                            }
                            f.forEach(function(e) {
                                var n = e[0], a = e[1];
                                t.id === e[2].id && l2(r35, n, a, [
                                    t
                                ]);
                            });
                        }
                    }), f.forEach(function(e) {
                        e[2] || l2(r35, e[0], e[1], []);
                    }), c5.setTimeout(function() {
                        r35 && r35.transceivers && r35.transceivers.forEach(function(e) {
                            e.iceTransport && "new" === e.iceTransport.state && e.iceTransport.getRemoteCandidates().length > 0 && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e.iceTransport.addRemoteCandidate({
                            }));
                        });
                    }, 4000), Promise.resolve();
                }, f1.prototype.close = function() {
                    this.transceivers.forEach(function(e) {
                        e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop();
                    }), this._isClosed = !0, this._updateSignalingState("closed");
                }, f1.prototype._updateSignalingState = function(e) {
                    this.signalingState = e;
                    var t = new Event("signalingstatechange");
                    this._dispatchEvent("signalingstatechange", t);
                }, f1.prototype._maybeFireNegotiationNeeded = function() {
                    var e = this;
                    "stable" === this.signalingState && !0 !== this.needNegotiation && (this.needNegotiation = !0, c5.setTimeout(function() {
                        if (e.needNegotiation) {
                            e.needNegotiation = !1;
                            var t = new Event("negotiationneeded");
                            e._dispatchEvent("negotiationneeded", t);
                        }
                    }, 0));
                }, f1.prototype._updateIceConnectionState = function() {
                    var e54, t = {
                        new: 0,
                        closed: 0,
                        checking: 0,
                        connected: 0,
                        completed: 0,
                        disconnected: 0,
                        failed: 0
                    };
                    if (this.transceivers.forEach(function(e) {
                        e.iceTransport && !e.rejected && t[e.iceTransport.state]++;
                    }), e54 = "new", t.failed > 0 ? e54 = "failed" : t.checking > 0 ? e54 = "checking" : t.disconnected > 0 ? e54 = "disconnected" : t.new > 0 ? e54 = "new" : t.connected > 0 ? e54 = "connected" : t.completed > 0 && (e54 = "completed"), e54 !== this.iceConnectionState) {
                        this.iceConnectionState = e54;
                        var r = new Event("iceconnectionstatechange");
                        this._dispatchEvent("iceconnectionstatechange", r);
                    }
                }, f1.prototype._updateConnectionState = function() {
                    var e55, t = {
                        new: 0,
                        closed: 0,
                        connecting: 0,
                        connected: 0,
                        completed: 0,
                        disconnected: 0,
                        failed: 0
                    };
                    if (this.transceivers.forEach(function(e) {
                        e.iceTransport && e.dtlsTransport && !e.rejected && (t[e.iceTransport.state]++, t[e.dtlsTransport.state]++);
                    }), t.connected += t.completed, e55 = "new", t.failed > 0 ? e55 = "failed" : t.connecting > 0 ? e55 = "connecting" : t.disconnected > 0 ? e55 = "disconnected" : t.new > 0 ? e55 = "new" : t.connected > 0 && (e55 = "connected"), e55 !== this.connectionState) {
                        this.connectionState = e55;
                        var r = new Event("connectionstatechange");
                        this._dispatchEvent("connectionstatechange", r);
                    }
                }, f1.prototype.createOffer = function() {
                    var t40 = this;
                    if (t40._isClosed) return Promise.reject(o4("InvalidStateError", "Can not call createOffer after close"));
                    var n18 = t40.transceivers.filter(function(e) {
                        return "audio" === e.kind;
                    }).length, a7 = t40.transceivers.filter(function(e) {
                        return "video" === e.kind;
                    }).length, i17 = arguments[0];
                    if (i17) {
                        if (i17.mandatory || i17.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
                        void 0 !== i17.offerToReceiveAudio && (n18 = !0 === i17.offerToReceiveAudio ? 1 : !1 === i17.offerToReceiveAudio ? 0 : i17.offerToReceiveAudio), void 0 !== i17.offerToReceiveVideo && (a7 = !0 === i17.offerToReceiveVideo ? 1 : !1 === i17.offerToReceiveVideo ? 0 : i17.offerToReceiveVideo);
                    }
                    for(t40.transceivers.forEach(function(e) {
                        "audio" === e.kind ? --n18 < 0 && (e.wantReceive = !1) : "video" === e.kind && --a7 < 0 && (e.wantReceive = !1);
                    }); n18 > 0 || a7 > 0;)n18 > 0 && (t40._createTransceiver("audio"), n18--), a7 > 0 && (t40._createTransceiver("video"), a7--);
                    var s6 = e43.writeSessionBoilerplate(t40._sdpSessionId, t40._sdpSessionVersion++);
                    t40.transceivers.forEach(function(r, n) {
                        var a = r.track, i = r.kind, s = r.mid || e43.generateIdentifier();
                        r.mid = s, r.iceGatherer || (r.iceGatherer = t40._createIceGatherer(n, t40.usingBundle));
                        var o = c5.RTCRtpSender.getCapabilities(i);
                        d3 < 15019 && (o.codecs = o.codecs.filter(function(e) {
                            return "rtx" !== e.name;
                        })), o.codecs.forEach(function(e) {
                            "H264" === e.name && void 0 === e.parameters["level-asymmetry-allowed"] && (e.parameters["level-asymmetry-allowed"] = "1"), r.remoteCapabilities && r.remoteCapabilities.codecs && r.remoteCapabilities.codecs.forEach(function(t) {
                                e.name.toLowerCase() === t.name.toLowerCase() && e.clockRate === t.clockRate && (e.preferredPayloadType = t.payloadType);
                            });
                        }), o.headerExtensions.forEach(function(e) {
                            (r.remoteCapabilities && r.remoteCapabilities.headerExtensions || []).forEach(function(t) {
                                e.uri === t.uri && (e.id = t.id);
                            });
                        });
                        var p = r.sendEncodingParameters || [
                            {
                                ssrc: 1001 * (2 * n + 1)
                            }
                        ];
                        a && d3 >= 15019 && "video" === i && !p[0].rtx && (p[0].rtx = {
                            ssrc: p[0].ssrc + 1
                        }), r.wantReceive && (r.rtpReceiver = new c5.RTCRtpReceiver(r.dtlsTransport, i)), r.localCapabilities = o, r.sendEncodingParameters = p;
                    }), "max-compat" !== t40._config.bundlePolicy && (s6 += "a=group:BUNDLE " + t40.transceivers.map(function(e) {
                        return e.mid;
                    }).join(" ") + "\r\n"), s6 += "a=ice-options:trickle\r\n", t40.transceivers.forEach(function(n, a) {
                        s6 += r31(n, n.localCapabilities, "offer", n.stream, t40._dtlsRole), s6 += "a=rtcp-rsize\r\n", !n.iceGatherer || "new" === t40.iceGatheringState || 0 !== a && t40.usingBundle || (n.iceGatherer.getLocalCandidates().forEach(function(t) {
                            t.component = 1, s6 += "a=" + e43.writeCandidate(t) + "\r\n";
                        }), "completed" === n.iceGatherer.state && (s6 += "a=end-of-candidates\r\n"));
                    });
                    var p2 = new c5.RTCSessionDescription({
                        type: "offer",
                        sdp: s6
                    });
                    return Promise.resolve(p2);
                }, f1.prototype.createAnswer = function() {
                    var t = this;
                    if (t._isClosed) return Promise.reject(o4("InvalidStateError", "Can not call createAnswer after close"));
                    if ("have-remote-offer" !== t.signalingState && "have-local-pranswer" !== t.signalingState) return Promise.reject(o4("InvalidStateError", "Can not call createAnswer in signalingState " + t.signalingState));
                    var n = e43.writeSessionBoilerplate(t._sdpSessionId, t._sdpSessionVersion++);
                    t.usingBundle && (n += "a=group:BUNDLE " + t.transceivers.map(function(e) {
                        return e.mid;
                    }).join(" ") + "\r\n"), n += "a=ice-options:trickle\r\n";
                    var i = e43.getMediaSections(t._remoteDescription.sdp).length;
                    t.transceivers.forEach(function(e56, s) {
                        if (!(s + 1 > i)) {
                            if (e56.rejected) return "application" === e56.kind ? "DTLS/SCTP" === e56.protocol ? n += "m=application 0 DTLS/SCTP 5000\r\n" : n += "m=application 0 " + e56.protocol + " webrtc-datachannel\r\n" : "audio" === e56.kind ? n += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : "video" === e56.kind && (n += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void (n += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e56.mid + "\r\n");
                            var o;
                            if (e56.stream) "audio" === e56.kind ? o = e56.stream.getAudioTracks()[0] : "video" === e56.kind && (o = e56.stream.getVideoTracks()[0]), o && d3 >= 15019 && "video" === e56.kind && !e56.sendEncodingParameters[0].rtx && (e56.sendEncodingParameters[0].rtx = {
                                ssrc: e56.sendEncodingParameters[0].ssrc + 1
                            });
                            var c = a5(e56.localCapabilities, e56.remoteCapabilities);
                            !c.codecs.filter(function(e) {
                                return "rtx" === e.name.toLowerCase();
                            }).length && e56.sendEncodingParameters[0].rtx && delete e56.sendEncodingParameters[0].rtx, n += r31(e56, c, "answer", e56.stream, t._dtlsRole), e56.rtcpParameters && e56.rtcpParameters.reducedSize && (n += "a=rtcp-rsize\r\n");
                        }
                    });
                    var s7 = new c5.RTCSessionDescription({
                        type: "answer",
                        sdp: n
                    });
                    return Promise.resolve(s7);
                }, f1.prototype.addIceCandidate = function(t) {
                    var r, n = this;
                    return t && void 0 === t.sdpMLineIndex && !t.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function(a, i) {
                        if (!n._remoteDescription) return i(o4("InvalidStateError", "Can not add ICE candidate without a remote description"));
                        if (t && "" !== t.candidate) {
                            var c = t.sdpMLineIndex;
                            if (t.sdpMid) {
                                for(var d = 0; d < n.transceivers.length; d++)if (n.transceivers[d].mid === t.sdpMid) {
                                    c = d;
                                    break;
                                }
                            }
                            var p = n.transceivers[c];
                            if (!p) return i(o4("OperationError", "Can not add ICE candidate"));
                            if (p.rejected) return a();
                            var l = Object.keys(t.candidate).length > 0 ? e43.parseCandidate(t.candidate) : {
                            };
                            if ("tcp" === l.protocol && (0 === l.port || 9 === l.port)) return a();
                            if (l.component && 1 !== l.component) return a();
                            if ((0 === c || c > 0 && p.iceTransport !== n.transceivers[0].iceTransport) && !s5(p.iceTransport, l)) return i(o4("OperationError", "Can not add ICE candidate"));
                            var f = t.candidate.trim();
                            0 === f.indexOf("a=") && (f = f.substr(2)), (r = e43.getMediaSections(n._remoteDescription.sdp))[c] += "a=" + (l.type ? f : "end-of-candidates") + "\r\n", n._remoteDescription.sdp = e43.getDescription(n._remoteDescription.sdp) + r.join("");
                        } else for(var u = 0; u < n.transceivers.length && (n.transceivers[u].rejected || (n.transceivers[u].iceTransport.addRemoteCandidate({
                        }), (r = e43.getMediaSections(n._remoteDescription.sdp))[u] += "a=end-of-candidates\r\n", n._remoteDescription.sdp = e43.getDescription(n._remoteDescription.sdp) + r.join(""), !n.usingBundle)); u++);
                        a();
                    });
                }, f1.prototype.getStats = function(e57) {
                    if (e57 && e57 instanceof c5.MediaStreamTrack) {
                        var t = null;
                        if (this.transceivers.forEach(function(r) {
                            r.rtpSender && r.rtpSender.track === e57 ? t = r.rtpSender : r.rtpReceiver && r.rtpReceiver.track === e57 && (t = r.rtpReceiver);
                        }), !t) throw o4("InvalidAccessError", "Invalid selector.");
                        return t.getStats();
                    }
                    var r36 = [];
                    return this.transceivers.forEach(function(e) {
                        [
                            "rtpSender",
                            "rtpReceiver",
                            "iceGatherer",
                            "iceTransport",
                            "dtlsTransport"
                        ].forEach(function(t) {
                            e[t] && r36.push(e[t].getStats());
                        });
                    }), Promise.all(r36).then(function(e58) {
                        var t = new Map;
                        return e58.forEach(function(e59) {
                            e59.forEach(function(e) {
                                t.set(e.id, e);
                            });
                        }), t;
                    });
                };
                [
                    "RTCRtpSender",
                    "RTCRtpReceiver",
                    "RTCIceGatherer",
                    "RTCIceTransport",
                    "RTCDtlsTransport"
                ].forEach(function(e60) {
                    var r37 = c5[e60];
                    if (r37 && r37.prototype && r37.prototype.getStats) {
                        var n19 = r37.prototype.getStats;
                        r37.prototype.getStats = function() {
                            return n19.apply(this).then(function(e) {
                                var r = new Map;
                                return Object.keys(e).forEach(function(n) {
                                    e[n].type = t32(e[n]), r.set(n, e[n]);
                                }), r;
                            });
                        };
                    }
                });
                var u2 = [
                    "createOffer",
                    "createAnswer"
                ];
                return u2.forEach(function(e61) {
                    var t41 = f1.prototype[e61];
                    f1.prototype[e61] = function() {
                        var e = arguments;
                        return "function" == typeof e[0] || "function" == typeof e[1] ? t41.apply(this, [
                            arguments[2]
                        ]).then(function(t) {
                            "function" == typeof e[0] && e[0].apply(null, [
                                t
                            ]);
                        }, function(t) {
                            "function" == typeof e[1] && e[1].apply(null, [
                                t
                            ]);
                        }) : t41.apply(this, arguments);
                    };
                }), (u2 = [
                    "setLocalDescription",
                    "setRemoteDescription",
                    "addIceCandidate"
                ]).forEach(function(e62) {
                    var t42 = f1.prototype[e62];
                    f1.prototype[e62] = function() {
                        var e = arguments;
                        return "function" == typeof e[1] || "function" == typeof e[2] ? t42.apply(this, arguments).then(function() {
                            "function" == typeof e[1] && e[1].apply(null);
                        }, function(t) {
                            "function" == typeof e[2] && e[2].apply(null, [
                                t
                            ]);
                        }) : t42.apply(this, arguments);
                    };
                }), [
                    "getStats"
                ].forEach(function(e63) {
                    var t = f1.prototype[e63];
                    f1.prototype[e63] = function() {
                        var e = arguments;
                        return "function" == typeof e[1] ? t.apply(this, arguments).then(function() {
                            "function" == typeof e[1] && e[1].apply(null);
                        }) : t.apply(this, arguments);
                    };
                }), f1;
            };
        },
        {
            "sdp": "YHvh"
        }
    ],
    "YdKx": [
        function(require, module, exports) {
            "use strict";
            function e64(e65) {
                var r = e65 && e65.navigator, t = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
                r.mediaDevices.getUserMedia = function(e66) {
                    return t(e66).catch(function(e67) {
                        return Promise.reject(function(e) {
                            return {
                                name: ({
                                    PermissionDeniedError: "NotAllowedError"
                                })[e.name] || e.name,
                                message: e.message,
                                constraint: e.constraint,
                                toString: function() {
                                    return this.name;
                                }
                            };
                        }(e67));
                    });
                };
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.shimGetUserMedia = e64;
        },
        {
        }
    ],
    "P3bV": [
        function(require, module, exports) {
            "use strict";
            function e68(e) {
                "getDisplayMedia" in e.navigator && e.navigator.mediaDevices && (e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || (e.navigator.mediaDevices.getDisplayMedia = e.navigator.getDisplayMedia.bind(e.navigator)));
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.shimGetDisplayMedia = e68;
        },
        {
        }
    ],
    "XRic": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.shimPeerConnection = p, exports.shimReplaceTrack = a, Object.defineProperty(exports, "shimGetUserMedia", {
                enumerable: !0,
                get: function() {
                    return n21.shimGetUserMedia;
                }
            }), Object.defineProperty(exports, "shimGetDisplayMedia", {
                enumerable: !0,
                get: function() {
                    return i18.shimGetDisplayMedia;
                }
            });
            var e69 = s(require("../utils")), t43 = require("./filtericeservers"), r38 = o5(require("rtcpeerconnection-shim")), n21 = require("./getusermedia"), i18 = require("./getdisplaymedia");
            function o5(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function c6() {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap;
                return c6 = function() {
                    return e;
                }, e;
            }
            function s(e) {
                if (e && e.__esModule) return e;
                if (null === e || "object" != typeof e && "function" != typeof e) return {
                    default: e
                };
                var t = c6();
                if (t && t.has(e)) return t.get(e);
                var r = {
                }, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var i in e)if (Object.prototype.hasOwnProperty.call(e, i)) {
                    var o = n ? Object.getOwnPropertyDescriptor(e, i) : null;
                    o && (o.get || o.set) ? Object.defineProperty(r, i, o) : r[i] = e[i];
                }
                return r.default = e, t && t.set(e, r), r;
            }
            function p(n, i) {
                if (n.RTCIceGatherer && (n.RTCIceCandidate || (n.RTCIceCandidate = function(e) {
                    return e;
                }), n.RTCSessionDescription || (n.RTCSessionDescription = function(e) {
                    return e;
                }), i.version < 15025)) {
                    var o = Object.getOwnPropertyDescriptor(n.MediaStreamTrack.prototype, "enabled");
                    Object.defineProperty(n.MediaStreamTrack.prototype, "enabled", {
                        set: function(e) {
                            o.set.call(this, e);
                            var t = new Event("enabled");
                            t.enabled = e, this.dispatchEvent(t);
                        }
                    });
                }
                !n.RTCRtpSender || "dtmf" in n.RTCRtpSender.prototype || Object.defineProperty(n.RTCRtpSender.prototype, "dtmf", {
                    get: function() {
                        return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new n.RTCDtmfSender(this) : "video" === this.track.kind && (this._dtmf = null)), this._dtmf;
                    }
                }), n.RTCDtmfSender && !n.RTCDTMFSender && (n.RTCDTMFSender = n.RTCDtmfSender);
                var c = (0, r38.default)(n, i.version);
                n.RTCPeerConnection = function(r) {
                    return r && r.iceServers && (r.iceServers = (0, t43.filterIceServers)(r.iceServers, i.version), e69.log("ICE servers after filtering:", r.iceServers)), new c(r);
                }, n.RTCPeerConnection.prototype = c.prototype;
            }
            function a(e) {
                !e.RTCRtpSender || "replaceTrack" in e.RTCRtpSender.prototype || (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack);
            }
        },
        {
            "../utils": "iSxC",
            "./filtericeservers": "NZ1C",
            "rtcpeerconnection-shim": "NJ2u",
            "./getusermedia": "YdKx",
            "./getdisplaymedia": "P3bV"
        }
    ],
    "GzSv": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.shimGetUserMedia = n22;
            var e70 = o6(require("../utils"));
            function t44() {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap;
                return t44 = function() {
                    return e;
                }, e;
            }
            function o6(e) {
                if (e && e.__esModule) return e;
                if (null === e || "object" != typeof e && "function" != typeof e) return {
                    default: e
                };
                var o = t44();
                if (o && o.has(e)) return o.get(e);
                var r = {
                }, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var i in e)if (Object.prototype.hasOwnProperty.call(e, i)) {
                    var a = n ? Object.getOwnPropertyDescriptor(e, i) : null;
                    a && (a.get || a.set) ? Object.defineProperty(r, i, a) : r[i] = e[i];
                }
                return r.default = e, o && o.set(e, r), r;
            }
            function r39(e71) {
                return (r39 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e;
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                })(e71);
            }
            function n22(t45, o7) {
                var n = t45 && t45.navigator, i = t45 && t45.MediaStreamTrack;
                if (n.getUserMedia = function(t, o, r) {
                    e70.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), n.mediaDevices.getUserMedia(t).then(o, r);
                }, !(o7.version > 55 && "autoGainControl" in n.mediaDevices.getSupportedConstraints())) {
                    var a = function(e, t, o) {
                        t in e && !(o in e) && (e[o] = e[t], delete e[t]);
                    }, s = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
                    if (n.mediaDevices.getUserMedia = function(e) {
                        return "object" === r39(e) && "object" === r39(e.audio) && (e = JSON.parse(JSON.stringify(e)), a(e.audio, "autoGainControl", "mozAutoGainControl"), a(e.audio, "noiseSuppression", "mozNoiseSuppression")), s(e);
                    }, i && i.prototype.getSettings) {
                        var p = i.prototype.getSettings;
                        i.prototype.getSettings = function() {
                            var e = p.apply(this, arguments);
                            return a(e, "mozAutoGainControl", "autoGainControl"), a(e, "mozNoiseSuppression", "noiseSuppression"), e;
                        };
                    }
                    if (i && i.prototype.applyConstraints) {
                        var u = i.prototype.applyConstraints;
                        i.prototype.applyConstraints = function(e) {
                            return "audio" === this.kind && "object" === r39(e) && (e = JSON.parse(JSON.stringify(e)), a(e, "autoGainControl", "mozAutoGainControl"), a(e, "noiseSuppression", "mozNoiseSuppression")), u.apply(this, [
                                e
                            ]);
                        };
                    }
                }
            }
        },
        {
            "../utils": "iSxC"
        }
    ],
    "UuGU": [
        function(require, module, exports) {
            "use strict";
            function e72(e, i) {
                e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || e.navigator.mediaDevices && (e.navigator.mediaDevices.getDisplayMedia = function(a) {
                    if (!a || !a.video) {
                        var t = new DOMException("getDisplayMedia without video constraints is undefined");
                        return t.name = "NotFoundError", t.code = 8, Promise.reject(t);
                    }
                    return !0 === a.video ? a.video = {
                        mediaSource: i
                    } : a.video.mediaSource = i, e.navigator.mediaDevices.getUserMedia(a);
                });
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.shimGetDisplayMedia = e72;
        },
        {
        }
    ],
    "Fzdr": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.shimOnTrack = s, exports.shimPeerConnection = c, exports.shimSenderGetStats = p, exports.shimReceiverGetStats = u, exports.shimRemoveStream = f, exports.shimRTCDataChannel = d, exports.shimAddTransceiver = C, exports.shimGetParameters = y, exports.shimCreateOffer = l, exports.shimCreateAnswer = m, Object.defineProperty(exports, "shimGetUserMedia", {
                enumerable: !0,
                get: function() {
                    return t46.shimGetUserMedia;
                }
            }), Object.defineProperty(exports, "shimGetDisplayMedia", {
                enumerable: !0,
                get: function() {
                    return n23.shimGetDisplayMedia;
                }
            });
            var e73 = o8(require("../utils")), t46 = require("./getusermedia"), n23 = require("./getdisplaymedia");
            function r40() {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap;
                return r40 = function() {
                    return e;
                }, e;
            }
            function o8(e) {
                if (e && e.__esModule) return e;
                if (null === e || "object" != typeof e && "function" != typeof e) return {
                    default: e
                };
                var t = r40();
                if (t && t.has(e)) return t.get(e);
                var n = {
                }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var i in e)if (Object.prototype.hasOwnProperty.call(e, i)) {
                    var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
                    a && (a.get || a.set) ? Object.defineProperty(n, i, a) : n[i] = e[i];
                }
                return n.default = e, t && t.set(e, n), n;
            }
            function i19(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e;
            }
            function a8(e74) {
                return (a8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e;
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                })(e74);
            }
            function s(e) {
                "object" === a8(e) && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                    get: function() {
                        return {
                            receiver: this.receiver
                        };
                    }
                });
            }
            function c(e75, t47) {
                if ("object" === a8(e75) && (e75.RTCPeerConnection || e75.mozRTCPeerConnection)) {
                    !e75.RTCPeerConnection && e75.mozRTCPeerConnection && (e75.RTCPeerConnection = e75.mozRTCPeerConnection), t47.version < 53 && [
                        "setLocalDescription",
                        "setRemoteDescription",
                        "addIceCandidate"
                    ].forEach(function(t) {
                        var n = e75.RTCPeerConnection.prototype[t], r = i19({
                        }, t, function() {
                            return arguments[0] = new ("addIceCandidate" === t ? e75.RTCIceCandidate : e75.RTCSessionDescription)(arguments[0]), n.apply(this, arguments);
                        });
                        e75.RTCPeerConnection.prototype[t] = r[t];
                    });
                    var n24 = {
                        inboundrtp: "inbound-rtp",
                        outboundrtp: "outbound-rtp",
                        candidatepair: "candidate-pair",
                        localcandidate: "local-candidate",
                        remotecandidate: "remote-candidate"
                    }, r41 = e75.RTCPeerConnection.prototype.getStats;
                    e75.RTCPeerConnection.prototype.getStats = function() {
                        var [e76, o, i] = arguments;
                        return r41.apply(this, [
                            e76 || null
                        ]).then(function(e77) {
                            if (t47.version < 53 && !o) try {
                                e77.forEach(function(e) {
                                    e.type = n24[e.type] || e.type;
                                });
                            } catch (r43) {
                                if ("TypeError" !== r43.name) throw r43;
                                e77.forEach(function(t, r) {
                                    e77.set(r, Object.assign({
                                    }, t, {
                                        type: n24[t.type] || t.type
                                    }));
                                });
                            }
                            return e77;
                        }).then(o, i);
                    };
                }
            }
            function p(e78) {
                if ("object" === a8(e78) && e78.RTCPeerConnection && e78.RTCRtpSender && !(e78.RTCRtpSender && "getStats" in e78.RTCRtpSender.prototype)) {
                    var t48 = e78.RTCPeerConnection.prototype.getSenders;
                    t48 && (e78.RTCPeerConnection.prototype.getSenders = function() {
                        var e = this, n = t48.apply(this, []);
                        return n.forEach(function(t) {
                            return t._pc = e;
                        }), n;
                    });
                    var n26 = e78.RTCPeerConnection.prototype.addTrack;
                    n26 && (e78.RTCPeerConnection.prototype.addTrack = function() {
                        var e = n26.apply(this, arguments);
                        return e._pc = this, e;
                    }), e78.RTCRtpSender.prototype.getStats = function() {
                        return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map);
                    };
                }
            }
            function u(t50) {
                if ("object" === a8(t50) && t50.RTCPeerConnection && t50.RTCRtpSender && !(t50.RTCRtpSender && "getStats" in t50.RTCRtpReceiver.prototype)) {
                    var n = t50.RTCPeerConnection.prototype.getReceivers;
                    n && (t50.RTCPeerConnection.prototype.getReceivers = function() {
                        var e = this, t51 = n.apply(this, []);
                        return t51.forEach(function(t) {
                            return t._pc = e;
                        }), t51;
                    }), e73.wrapPeerConnectionEvent(t50, "track", function(e) {
                        return e.receiver._pc = e.srcElement, e;
                    }), t50.RTCRtpReceiver.prototype.getStats = function() {
                        return this._pc.getStats(this.track);
                    };
                }
            }
            function f(t52) {
                !t52.RTCPeerConnection || "removeStream" in t52.RTCPeerConnection.prototype || (t52.RTCPeerConnection.prototype.removeStream = function(t) {
                    var n = this;
                    e73.deprecated("removeStream", "removeTrack"), this.getSenders().forEach(function(e) {
                        e.track && t.getTracks().includes(e.track) && n.removeTrack(e);
                    });
                });
            }
            function d(e) {
                e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel);
            }
            function C(e79) {
                if ("object" === a8(e79) && e79.RTCPeerConnection) {
                    var t = e79.RTCPeerConnection.prototype.addTransceiver;
                    t && (e79.RTCPeerConnection.prototype.addTransceiver = function() {
                        this.setParametersPromises = [];
                        var e80 = arguments[1], n = e80 && "sendEncodings" in e80;
                        n && e80.sendEncodings.forEach(function(e) {
                            if ("rid" in e) {
                                if (!/^[a-z0-9]{0,16}$/i.test(e.rid)) throw new TypeError("Invalid RID value provided.");
                            }
                            if ("scaleResolutionDownBy" in e && !(parseFloat(e.scaleResolutionDownBy) >= 1)) throw new RangeError("scale_resolution_down_by must be >= 1.0");
                            if ("maxFramerate" in e && !(parseFloat(e.maxFramerate) >= 0)) throw new RangeError("max_framerate must be >= 0.0");
                        });
                        var r = t.apply(this, arguments);
                        if (n) {
                            var { sender: o  } = r, i = o.getParameters();
                            "encodings" in i && (1 !== i.encodings.length || 0 !== Object.keys(i.encodings[0]).length) || (i.encodings = e80.sendEncodings, o.sendEncodings = e80.sendEncodings, this.setParametersPromises.push(o.setParameters(i).then(function() {
                                delete o.sendEncodings;
                            }).catch(function() {
                                delete o.sendEncodings;
                            })));
                        }
                        return r;
                    });
                }
            }
            function y(e81) {
                if ("object" === a8(e81) && e81.RTCRtpSender) {
                    var t = e81.RTCRtpSender.prototype.getParameters;
                    t && (e81.RTCRtpSender.prototype.getParameters = function() {
                        var e = t.apply(this, arguments);
                        return "encodings" in e || (e.encodings = [].concat(this.sendEncodings || [
                            {
                            }
                        ])), e;
                    });
                }
            }
            function l(e82) {
                if ("object" === a8(e82) && e82.RTCPeerConnection) {
                    var t = e82.RTCPeerConnection.prototype.createOffer;
                    e82.RTCPeerConnection.prototype.createOffer = function() {
                        var e = arguments, n = this;
                        return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(function() {
                            return t.apply(n, e);
                        }).finally(function() {
                            n.setParametersPromises = [];
                        }) : t.apply(this, arguments);
                    };
                }
            }
            function m(e83) {
                if ("object" === a8(e83) && e83.RTCPeerConnection) {
                    var t = e83.RTCPeerConnection.prototype.createAnswer;
                    e83.RTCPeerConnection.prototype.createAnswer = function() {
                        var e = arguments, n = this;
                        return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(function() {
                            return t.apply(n, e);
                        }).finally(function() {
                            n.setParametersPromises = [];
                        }) : t.apply(this, arguments);
                    };
                }
            }
        },
        {
            "../utils": "iSxC",
            "./getusermedia": "GzSv",
            "./getdisplaymedia": "UuGU"
        }
    ],
    "t1lL": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.shimLocalStreamsAPI = n28, exports.shimRemoteStreamsAPI = i20, exports.shimCallbacksAPI = a9, exports.shimGetUserMedia = c7, exports.shimConstraints = s8, exports.shimRTCIceServerUrls = d, exports.shimTrackEventTransceiver = f, exports.shimCreateOfferLegacy = p, exports.shimAudioContext = u;
            var e84 = r44(require("../utils"));
            function t53() {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap;
                return t53 = function() {
                    return e;
                }, e;
            }
            function r44(e) {
                if (e && e.__esModule) return e;
                if (null === e || "object" != typeof e && "function" != typeof e) return {
                    default: e
                };
                var r = t53();
                if (r && r.has(e)) return r.get(e);
                var o = {
                }, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var i in e)if (Object.prototype.hasOwnProperty.call(e, i)) {
                    var a = n ? Object.getOwnPropertyDescriptor(e, i) : null;
                    a && (a.get || a.set) ? Object.defineProperty(o, i, a) : o[i] = e[i];
                }
                return o.default = e, r && r.set(e, o), o;
            }
            function o9(e85) {
                return (o9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e;
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                })(e85);
            }
            function n28(e86) {
                if ("object" === o9(e86) && e86.RTCPeerConnection) {
                    if ("getLocalStreams" in e86.RTCPeerConnection.prototype || (e86.RTCPeerConnection.prototype.getLocalStreams = function() {
                        return this._localStreams || (this._localStreams = []), this._localStreams;
                    }), !("addStream" in e86.RTCPeerConnection.prototype)) {
                        var t = e86.RTCPeerConnection.prototype.addTrack;
                        e86.RTCPeerConnection.prototype.addStream = function(e) {
                            var r = this;
                            this._localStreams || (this._localStreams = []), this._localStreams.includes(e) || this._localStreams.push(e), e.getAudioTracks().forEach(function(o) {
                                return t.call(r, o, e);
                            }), e.getVideoTracks().forEach(function(o) {
                                return t.call(r, o, e);
                            });
                        }, e86.RTCPeerConnection.prototype.addTrack = function(e87) {
                            for(var r = this, o = arguments.length, n = new Array(o > 1 ? o - 1 : 0), i = 1; i < o; i++)n[i - 1] = arguments[i];
                            return n && n.forEach(function(e) {
                                r._localStreams ? r._localStreams.includes(e) || r._localStreams.push(e) : r._localStreams = [
                                    e
                                ];
                            }), t.apply(this, arguments);
                        };
                    }
                    "removeStream" in e86.RTCPeerConnection.prototype || (e86.RTCPeerConnection.prototype.removeStream = function(e88) {
                        var t = this;
                        this._localStreams || (this._localStreams = []);
                        var r = this._localStreams.indexOf(e88);
                        if (-1 !== r) {
                            this._localStreams.splice(r, 1);
                            var o = e88.getTracks();
                            this.getSenders().forEach(function(e) {
                                o.includes(e.track) && t.removeTrack(e);
                            });
                        }
                    });
                }
            }
            function i20(e89) {
                if ("object" === o9(e89) && e89.RTCPeerConnection && ("getRemoteStreams" in e89.RTCPeerConnection.prototype || (e89.RTCPeerConnection.prototype.getRemoteStreams = function() {
                    return this._remoteStreams ? this._remoteStreams : [];
                }), !("onaddstream" in e89.RTCPeerConnection.prototype))) {
                    Object.defineProperty(e89.RTCPeerConnection.prototype, "onaddstream", {
                        get: function() {
                            return this._onaddstream;
                        },
                        set: function(e90) {
                            var t = this;
                            this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e90), this.addEventListener("track", this._onaddstreampoly = function(e91) {
                                e91.streams.forEach(function(e) {
                                    if (t._remoteStreams || (t._remoteStreams = []), !t._remoteStreams.includes(e)) {
                                        t._remoteStreams.push(e);
                                        var r = new Event("addstream");
                                        r.stream = e, t.dispatchEvent(r);
                                    }
                                });
                            });
                        }
                    });
                    var t54 = e89.RTCPeerConnection.prototype.setRemoteDescription;
                    e89.RTCPeerConnection.prototype.setRemoteDescription = function() {
                        var e = this;
                        return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(t56) {
                            t56.streams.forEach(function(t) {
                                if (e._remoteStreams || (e._remoteStreams = []), !(e._remoteStreams.indexOf(t) >= 0)) {
                                    e._remoteStreams.push(t);
                                    var r = new Event("addstream");
                                    r.stream = t, e.dispatchEvent(r);
                                }
                            });
                        }), t54.apply(e, arguments);
                    };
                }
            }
            function a9(e92) {
                if ("object" === o9(e92) && e92.RTCPeerConnection) {
                    var t57 = e92.RTCPeerConnection.prototype, r45 = t57.createOffer, n29 = t57.createAnswer, i = t57.setLocalDescription, a = t57.setRemoteDescription, c = t57.addIceCandidate;
                    t57.createOffer = function(e, t) {
                        var o = arguments.length >= 2 ? arguments[2] : arguments[0], n = r45.apply(this, [
                            o
                        ]);
                        return t ? (n.then(e, t), Promise.resolve()) : n;
                    }, t57.createAnswer = function(e, t) {
                        var r = arguments.length >= 2 ? arguments[2] : arguments[0], o = n29.apply(this, [
                            r
                        ]);
                        return t ? (o.then(e, t), Promise.resolve()) : o;
                    };
                    var s = function(e, t, r) {
                        var o = i.apply(this, [
                            e
                        ]);
                        return r ? (o.then(t, r), Promise.resolve()) : o;
                    };
                    t57.setLocalDescription = s, s = function(e, t, r) {
                        var o = a.apply(this, [
                            e
                        ]);
                        return r ? (o.then(t, r), Promise.resolve()) : o;
                    }, t57.setRemoteDescription = s, s = function(e, t, r) {
                        var o = c.apply(this, [
                            e
                        ]);
                        return r ? (o.then(t, r), Promise.resolve()) : o;
                    }, t57.addIceCandidate = s;
                }
            }
            function c7(e93) {
                var t = e93 && e93.navigator;
                if (t.mediaDevices && t.mediaDevices.getUserMedia) {
                    var r = t.mediaDevices, o = r.getUserMedia.bind(r);
                    t.mediaDevices.getUserMedia = function(e) {
                        return o(s8(e));
                    };
                }
                !t.getUserMedia && t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = (function(e, r, o) {
                    t.mediaDevices.getUserMedia(e).then(r, o);
                }).bind(t));
            }
            function s8(t) {
                return t && void 0 !== t.video ? Object.assign({
                }, t, {
                    video: e84.compactObject(t.video)
                }) : t;
            }
            function d(t59) {
                if (t59.RTCPeerConnection) {
                    var r = t59.RTCPeerConnection;
                    t59.RTCPeerConnection = function(t, o) {
                        if (t && t.iceServers) {
                            for(var n = [], i = 0; i < t.iceServers.length; i++){
                                var a = t.iceServers[i];
                                !a.hasOwnProperty("urls") && a.hasOwnProperty("url") ? (e84.deprecated("RTCIceServer.url", "RTCIceServer.urls"), (a = JSON.parse(JSON.stringify(a))).urls = a.url, delete a.url, n.push(a)) : n.push(t.iceServers[i]);
                            }
                            t.iceServers = n;
                        }
                        return new r(t, o);
                    }, t59.RTCPeerConnection.prototype = r.prototype, "generateCertificate" in r && Object.defineProperty(t59.RTCPeerConnection, "generateCertificate", {
                        get: function() {
                            return r.generateCertificate;
                        }
                    });
                }
            }
            function f(e) {
                "object" === o9(e) && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                    get: function() {
                        return {
                            receiver: this.receiver
                        };
                    }
                });
            }
            function p(e94) {
                var t = e94.RTCPeerConnection.prototype.createOffer;
                e94.RTCPeerConnection.prototype.createOffer = function(e95) {
                    if (e95) {
                        void 0 !== e95.offerToReceiveAudio && (e95.offerToReceiveAudio = !!e95.offerToReceiveAudio);
                        var r = this.getTransceivers().find(function(e) {
                            return "audio" === e.receiver.track.kind;
                        });
                        !1 === e95.offerToReceiveAudio && r ? "sendrecv" === r.direction ? r.setDirection ? r.setDirection("sendonly") : r.direction = "sendonly" : "recvonly" === r.direction && (r.setDirection ? r.setDirection("inactive") : r.direction = "inactive") : !0 !== e95.offerToReceiveAudio || r || this.addTransceiver("audio"), void 0 !== e95.offerToReceiveVideo && (e95.offerToReceiveVideo = !!e95.offerToReceiveVideo);
                        var o = this.getTransceivers().find(function(e) {
                            return "video" === e.receiver.track.kind;
                        });
                        !1 === e95.offerToReceiveVideo && o ? "sendrecv" === o.direction ? o.setDirection ? o.setDirection("sendonly") : o.direction = "sendonly" : "recvonly" === o.direction && (o.setDirection ? o.setDirection("inactive") : o.direction = "inactive") : !0 !== e95.offerToReceiveVideo || o || this.addTransceiver("video");
                    }
                    return t.apply(this, arguments);
                };
            }
            function u(e) {
                "object" !== o9(e) || e.AudioContext || (e.AudioContext = e.webkitAudioContext);
            }
        },
        {
            "../utils": "iSxC"
        }
    ],
    "GOQK": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.shimRTCIceCandidate = a10, exports.shimMaxMessageSize = c8, exports.shimSendThrowTypeError = s9, exports.shimConnectionState = p3, exports.removeExtmapAllowMixed = d4, exports.shimAddIceCandidateNullOrEmpty = u;
            var e96 = r47(require("sdp")), t60 = o10(require("./utils"));
            function n31() {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap;
                return n31 = function() {
                    return e;
                }, e;
            }
            function o10(e) {
                if (e && e.__esModule) return e;
                if (null === e || "object" != typeof e && "function" != typeof e) return {
                    default: e
                };
                var t = n31();
                if (t && t.has(e)) return t.get(e);
                var o = {
                }, r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var i in e)if (Object.prototype.hasOwnProperty.call(e, i)) {
                    var a = r ? Object.getOwnPropertyDescriptor(e, i) : null;
                    a && (a.get || a.set) ? Object.defineProperty(o, i, a) : o[i] = e[i];
                }
                return o.default = e, t && t.set(e, o), o;
            }
            function r47(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function i21(e97) {
                return (i21 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e;
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                })(e97);
            }
            function a10(n32) {
                if (n32.RTCIceCandidate && !(n32.RTCIceCandidate && "foundation" in n32.RTCIceCandidate.prototype)) {
                    var o = n32.RTCIceCandidate;
                    n32.RTCIceCandidate = function(t) {
                        if ("object" === i21(t) && t.candidate && 0 === t.candidate.indexOf("a=") && ((t = JSON.parse(JSON.stringify(t))).candidate = t.candidate.substr(2)), t.candidate && t.candidate.length) {
                            var n = new o(t), r = e96.default.parseCandidate(t.candidate), a = Object.assign(n, r);
                            return a.toJSON = function() {
                                return {
                                    candidate: a.candidate,
                                    sdpMid: a.sdpMid,
                                    sdpMLineIndex: a.sdpMLineIndex,
                                    usernameFragment: a.usernameFragment
                                };
                            }, a;
                        }
                        return new o(t);
                    }, n32.RTCIceCandidate.prototype = o.prototype, t60.wrapPeerConnectionEvent(n32, "icecandidate", function(e) {
                        return e.candidate && Object.defineProperty(e, "candidate", {
                            value: new n32.RTCIceCandidate(e.candidate),
                            writable: "false"
                        }), e;
                    });
                }
            }
            function c8(t61, n33) {
                if (t61.RTCPeerConnection) {
                    "sctp" in t61.RTCPeerConnection.prototype || Object.defineProperty(t61.RTCPeerConnection.prototype, "sctp", {
                        get: function() {
                            return void 0 === this._sctp ? null : this._sctp;
                        }
                    });
                    var o11 = t61.RTCPeerConnection.prototype.setRemoteDescription;
                    t61.RTCPeerConnection.prototype.setRemoteDescription = function() {
                        if (this._sctp = null, "chrome" === n33.browser && n33.version >= 76) {
                            var { sdpSemantics: t  } = this.getConfiguration();
                            "plan-b" === t && Object.defineProperty(this, "sctp", {
                                get: function() {
                                    return void 0 === this._sctp ? null : this._sctp;
                                },
                                enumerable: !0,
                                configurable: !0
                            });
                        }
                        if ((function(t62) {
                            if (!t62 || !t62.sdp) return !1;
                            var n34 = e96.default.splitSections(t62.sdp);
                            return n34.shift(), n34.some(function(t) {
                                var n = e96.default.parseMLine(t);
                                return n && "application" === n.kind && -1 !== n.protocol.indexOf("SCTP");
                            });
                        })(arguments[0])) {
                            var r48, i22 = function(e) {
                                var t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                                if (null === t || t.length < 2) return -1;
                                var n = parseInt(t[1], 10);
                                return n != n ? -1 : n;
                            }(arguments[0]), a = (p = i22, d = 65536, "firefox" === n33.browser && (d = n33.version < 57 ? -1 === p ? 16384 : 2147483637 : n33.version < 60 ? 57 === n33.version ? 65535 : 65536 : 2147483637), d), c = function(t, o) {
                                var r = 65536;
                                "firefox" === n33.browser && 57 === n33.version && (r = 65535);
                                var i = e96.default.matchPrefix(t.sdp, "a=max-message-size:");
                                return i.length > 0 ? r = parseInt(i[0].substr(19), 10) : "firefox" === n33.browser && -1 !== o && (r = 2147483637), r;
                            }(arguments[0], i22);
                            r48 = 0 === a && 0 === c ? Number.POSITIVE_INFINITY : 0 === a || 0 === c ? Math.max(a, c) : Math.min(a, c);
                            var s = {
                            };
                            Object.defineProperty(s, "maxMessageSize", {
                                get: function() {
                                    return r48;
                                }
                            }), this._sctp = s;
                        }
                        var p, d;
                        return o11.apply(this, arguments);
                    };
                }
            }
            function s9(e98) {
                if (e98.RTCPeerConnection && "createDataChannel" in e98.RTCPeerConnection.prototype) {
                    var n = e98.RTCPeerConnection.prototype.createDataChannel;
                    e98.RTCPeerConnection.prototype.createDataChannel = function() {
                        var e = n.apply(this, arguments);
                        return o13(e, this), e;
                    }, t60.wrapPeerConnectionEvent(e98, "datachannel", function(e) {
                        return o13(e.channel, e.target), e;
                    });
                }
                function o13(e, t) {
                    var n = e.send;
                    e.send = function() {
                        var o = arguments[0], r = o.length || o.size || o.byteLength;
                        if ("open" === e.readyState && t.sctp && r > t.sctp.maxMessageSize) throw new TypeError("Message too large (can send a maximum of " + t.sctp.maxMessageSize + " bytes)");
                        return n.apply(e, arguments);
                    };
                }
            }
            function p3(e99) {
                if (e99.RTCPeerConnection && !("connectionState" in e99.RTCPeerConnection.prototype)) {
                    var t63 = e99.RTCPeerConnection.prototype;
                    Object.defineProperty(t63, "connectionState", {
                        get: function() {
                            return ({
                                completed: "connected",
                                checking: "connecting"
                            })[this.iceConnectionState] || this.iceConnectionState;
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t63, "onconnectionstatechange", {
                        get: function() {
                            return this._onconnectionstatechange || null;
                        },
                        set: function(e) {
                            this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange), e && this.addEventListener("connectionstatechange", this._onconnectionstatechange = e);
                        },
                        enumerable: !0,
                        configurable: !0
                    }), [
                        "setLocalDescription",
                        "setRemoteDescription"
                    ].forEach(function(e100) {
                        var n35 = t63[e100];
                        t63[e100] = function() {
                            return this._connectionstatechangepoly || (this._connectionstatechangepoly = function(e) {
                                var t = e.target;
                                if (t._lastConnectionState !== t.connectionState) {
                                    t._lastConnectionState = t.connectionState;
                                    var n = new Event("connectionstatechange", e);
                                    t.dispatchEvent(n);
                                }
                                return e;
                            }, this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), n35.apply(this, arguments);
                        };
                    });
                }
            }
            function d4(e101, t65) {
                if (e101.RTCPeerConnection && !("chrome" === t65.browser && t65.version >= 71 || "safari" === t65.browser && t65.version >= 605)) {
                    var n = e101.RTCPeerConnection.prototype.setRemoteDescription;
                    e101.RTCPeerConnection.prototype.setRemoteDescription = function(t) {
                        if (t && t.sdp && -1 !== t.sdp.indexOf("\na=extmap-allow-mixed")) {
                            var o = t.sdp.split("\n").filter(function(e) {
                                return "a=extmap-allow-mixed" !== e.trim();
                            }).join("\n");
                            e101.RTCSessionDescription && t instanceof e101.RTCSessionDescription ? arguments[0] = new e101.RTCSessionDescription({
                                type: t.type,
                                sdp: o
                            }) : t.sdp = o;
                        }
                        return n.apply(this, arguments);
                    };
                }
            }
            function u(e, t) {
                if (e.RTCPeerConnection && e.RTCPeerConnection.prototype) {
                    var n = e.RTCPeerConnection.prototype.addIceCandidate;
                    n && 0 !== n.length && (e.RTCPeerConnection.prototype.addIceCandidate = function() {
                        return arguments[0] ? ("chrome" === t.browser && t.version < 78 || "firefox" === t.browser && t.version < 68 || "safari" === t.browser) && arguments[0] && "" === arguments[0].candidate ? Promise.resolve() : n.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
                    });
                }
            }
        },
        {
            "sdp": "YHvh",
            "./utils": "iSxC"
        }
    ],
    "KtlG": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.adapterFactory = o14;
            var e102 = m1(require("./utils")), i24 = m1(require("./chrome/chrome_shim")), r50 = m1(require("./edge/edge_shim")), s10 = m1(require("./firefox/firefox_shim")), t66 = m1(require("./safari/safari_shim")), a11 = m1(require("./common_shim"));
            function n36() {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap;
                return n36 = function() {
                    return e;
                }, e;
            }
            function m1(e) {
                if (e && e.__esModule) return e;
                if (null === e || "object" != typeof e && "function" != typeof e) return {
                    default: e
                };
                var i = n36();
                if (i && i.has(e)) return i.get(e);
                var r = {
                }, s = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var t in e)if (Object.prototype.hasOwnProperty.call(e, t)) {
                    var a = s ? Object.getOwnPropertyDescriptor(e, t) : null;
                    a && (a.get || a.set) ? Object.defineProperty(r, t, a) : r[t] = e[t];
                }
                return r.default = e, i && i.set(e, r), r;
            }
            function o14() {
                var { window: n  } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                }, m = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                    shimChrome: !0,
                    shimFirefox: !0,
                    shimEdge: !0,
                    shimSafari: !0
                }, o = e102.log, h = e102.detectBrowser(n), d = {
                    browserDetails: h,
                    commonShim: a11,
                    extractVersion: e102.extractVersion,
                    disableLog: e102.disableLog,
                    disableWarnings: e102.disableWarnings
                };
                switch(h.browser){
                    case "chrome":
                        if (!i24 || !i24.shimPeerConnection || !m.shimChrome) return o("Chrome shim is not included in this adapter release."), d;
                        if (null === h.version) return o("Chrome shim can not determine version, not shimming."), d;
                        o("adapter.js shimming chrome."), d.browserShim = i24, a11.shimAddIceCandidateNullOrEmpty(n, h), i24.shimGetUserMedia(n, h), i24.shimMediaStream(n, h), i24.shimPeerConnection(n, h), i24.shimOnTrack(n, h), i24.shimAddTrackRemoveTrack(n, h), i24.shimGetSendersWithDtmf(n, h), i24.shimGetStats(n, h), i24.shimSenderReceiverGetStats(n, h), i24.fixNegotiationNeeded(n, h), a11.shimRTCIceCandidate(n, h), a11.shimConnectionState(n, h), a11.shimMaxMessageSize(n, h), a11.shimSendThrowTypeError(n, h), a11.removeExtmapAllowMixed(n, h);
                        break;
                    case "firefox":
                        if (!s10 || !s10.shimPeerConnection || !m.shimFirefox) return o("Firefox shim is not included in this adapter release."), d;
                        o("adapter.js shimming firefox."), d.browserShim = s10, a11.shimAddIceCandidateNullOrEmpty(n, h), s10.shimGetUserMedia(n, h), s10.shimPeerConnection(n, h), s10.shimOnTrack(n, h), s10.shimRemoveStream(n, h), s10.shimSenderGetStats(n, h), s10.shimReceiverGetStats(n, h), s10.shimRTCDataChannel(n, h), s10.shimAddTransceiver(n, h), s10.shimGetParameters(n, h), s10.shimCreateOffer(n, h), s10.shimCreateAnswer(n, h), a11.shimRTCIceCandidate(n, h), a11.shimConnectionState(n, h), a11.shimMaxMessageSize(n, h), a11.shimSendThrowTypeError(n, h);
                        break;
                    case "edge":
                        if (!r50 || !r50.shimPeerConnection || !m.shimEdge) return o("MS edge shim is not included in this adapter release."), d;
                        o("adapter.js shimming edge."), d.browserShim = r50, r50.shimGetUserMedia(n, h), r50.shimGetDisplayMedia(n, h), r50.shimPeerConnection(n, h), r50.shimReplaceTrack(n, h), a11.shimMaxMessageSize(n, h), a11.shimSendThrowTypeError(n, h);
                        break;
                    case "safari":
                        if (!t66 || !m.shimSafari) return o("Safari shim is not included in this adapter release."), d;
                        o("adapter.js shimming safari."), d.browserShim = t66, a11.shimAddIceCandidateNullOrEmpty(n, h), t66.shimRTCIceServerUrls(n, h), t66.shimCreateOfferLegacy(n, h), t66.shimCallbacksAPI(n, h), t66.shimLocalStreamsAPI(n, h), t66.shimRemoteStreamsAPI(n, h), t66.shimTrackEventTransceiver(n, h), t66.shimGetUserMedia(n, h), t66.shimAudioContext(n, h), a11.shimRTCIceCandidate(n, h), a11.shimMaxMessageSize(n, h), a11.shimSendThrowTypeError(n, h), a11.removeExtmapAllowMixed(n, h);
                        break;
                    default:
                        o("Unsupported browser!");
                }
                return d;
            }
        },
        {
            "./utils": "iSxC",
            "./chrome/chrome_shim": "uI5X",
            "./edge/edge_shim": "XRic",
            "./firefox/firefox_shim": "Fzdr",
            "./safari/safari_shim": "t1lL",
            "./common_shim": "GOQK"
        }
    ],
    "tI1X": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.default = void 0;
            var e = require("./adapter_factory.js"), t = (0, e.adapterFactory)({
                window: "undefined" == typeof window ? void 0 : window
            }), d = t;
            exports.default = d;
        },
        {
            "./adapter_factory.js": "KtlG"
        }
    ],
    "sXtV": [
        function(require, module, exports) {
            "use strict";
            var e103 = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.webRTCAdapter = void 0;
            var t = e103(require("webrtc-adapter"));
            exports.webRTCAdapter = t.default;
        },
        {
            "webrtc-adapter": "tI1X"
        }
    ],
    "I31f": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.Supports = void 0;
            var r51 = require("./adapter");
            exports.Supports = new (function() {
                function e104() {
                    this.isIOS = [
                        "iPad",
                        "iPhone",
                        "iPod"
                    ].includes(navigator.platform), this.supportedBrowsers = [
                        "firefox",
                        "chrome",
                        "safari"
                    ], this.minFirefoxVersion = 59, this.minChromeVersion = 72, this.minSafariVersion = 605;
                }
                return e104.prototype.isWebRTCSupported = function() {
                    return "undefined" != typeof RTCPeerConnection;
                }, e104.prototype.isBrowserSupported = function() {
                    var r = this.getBrowser(), e = this.getVersion();
                    return !!this.supportedBrowsers.includes(r) && ("chrome" === r ? e >= this.minChromeVersion : "firefox" === r ? e >= this.minFirefoxVersion : "safari" === r && !this.isIOS && e >= this.minSafariVersion);
                }, e104.prototype.getBrowser = function() {
                    return r51.webRTCAdapter.browserDetails.browser;
                }, e104.prototype.getVersion = function() {
                    return r51.webRTCAdapter.browserDetails.version || 0;
                }, e104.prototype.isUnifiedPlanSupported = function() {
                    var e, i = this.getBrowser(), t = r51.webRTCAdapter.browserDetails.version || 0;
                    if ("chrome" === i && t < 72) return !1;
                    if ("firefox" === i && t >= 59) return !0;
                    if (!(window.RTCRtpTransceiver && "currentDirection" in RTCRtpTransceiver.prototype)) return !1;
                    var o = !1;
                    try {
                        (e = new RTCPeerConnection).addTransceiver("audio"), o = !0;
                    } catch (s) {
                    } finally{
                        e && e.close();
                    }
                    return o;
                }, e104.prototype.toString = function() {
                    return "Supports: \n    browser:" + this.getBrowser() + " \n    version:" + this.getVersion() + " \n    isIOS:" + this.isIOS + " \n    isWebRTCSupported:" + this.isWebRTCSupported() + " \n    isBrowserSupported:" + this.isBrowserSupported() + " \n    isUnifiedPlanSupported:" + this.isUnifiedPlanSupported();
                }, e104;
            }());
        },
        {
            "./adapter": "sXtV"
        }
    ],
    "BHXf": [
        function(require, module, exports) {
            "use strict";
            var e105 = this && this.__createBinding || (Object.create ? function(e, t, r, o) {
                void 0 === o && (o = r), Object.defineProperty(e, o, {
                    enumerable: !0,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, o) {
                void 0 === o && (o = r), e[o] = t[r];
            }), t67 = this && this.__setModuleDefault || (Object.create ? function(e, t) {
                Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t
                });
            } : function(e, t) {
                e.default = t;
            }), r52 = this && this.__importStar || function(r) {
                if (r && r.__esModule) return r;
                var o = {
                };
                if (null != r) for(var n in r)"default" !== n && Object.prototype.hasOwnProperty.call(r, n) && e105(o, r, n);
                return t67(o, r), o;
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.util = void 0;
            var o15 = r52(require("peerjs-js-binarypack")), n37 = require("./supports"), i25 = {
                iceServers: [
                    {
                        urls: "stun:stun.l.google.com:19302"
                    },
                    {
                        urls: "turn:0.peerjs.com:3478",
                        username: "peerjs",
                        credential: "peerjsp"
                    }
                ],
                sdpSemantics: "unified-plan"
            };
            exports.util = new (function() {
                function e106() {
                    this.CLOUD_HOST = "0.peerjs.com", this.CLOUD_PORT = 443, this.chunkedBrowsers = {
                        Chrome: 1,
                        chrome: 1
                    }, this.chunkedMTU = 16300, this.defaultConfig = i25, this.browser = n37.Supports.getBrowser(), this.browserVersion = n37.Supports.getVersion(), this.supports = (function() {
                        var e, t = {
                            browser: n37.Supports.isBrowserSupported(),
                            webRTC: n37.Supports.isWebRTCSupported(),
                            audioVideo: !1,
                            data: !1,
                            binaryBlob: !1,
                            reliable: !1
                        };
                        if (!t.webRTC) return t;
                        try {
                            e = new RTCPeerConnection(i25), t.audioVideo = !0;
                            var r = void 0;
                            try {
                                r = e.createDataChannel("_PEERJSTEST", {
                                    ordered: !0
                                }), t.data = !0, t.reliable = !!r.ordered;
                                try {
                                    r.binaryType = "blob", t.binaryBlob = !n37.Supports.isIOS;
                                } catch (o) {
                                }
                            } catch (o) {
                            } finally{
                                r && r.close();
                            }
                        } catch (o) {
                        } finally{
                            e && e.close();
                        }
                        return t;
                    })(), this.pack = o15.pack, this.unpack = o15.unpack, this._dataCount = 1;
                }
                return e106.prototype.noop = function() {
                }, e106.prototype.validateId = function(e) {
                    return !e || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(e);
                }, e106.prototype.chunk = function(e) {
                    for(var t = [], r = e.size, o = Math.ceil(r / exports.util.chunkedMTU), n = 0, i = 0; i < r;){
                        var a = Math.min(r, i + exports.util.chunkedMTU), u = e.slice(i, a), s = {
                            __peerData: this._dataCount,
                            n: n,
                            data: u,
                            total: o
                        };
                        t.push(s), i = a, n++;
                    }
                    return this._dataCount++, t;
                }, e106.prototype.blobToArrayBuffer = function(e107, t) {
                    var r = new FileReader;
                    return r.onload = function(e) {
                        e.target && t(e.target.result);
                    }, r.readAsArrayBuffer(e107), r;
                }, e106.prototype.binaryStringToArrayBuffer = function(e) {
                    for(var t = new Uint8Array(e.length), r = 0; r < e.length; r++)t[r] = 255 & e.charCodeAt(r);
                    return t.buffer;
                }, e106.prototype.randomToken = function() {
                    return Math.random().toString(36).substr(2);
                }, e106.prototype.isSecure = function() {
                    return "https:" === location.protocol;
                }, e106;
            }());
        },
        {
            "peerjs-js-binarypack": "kdPp",
            "./supports": "I31f"
        }
    ],
    "JJlS": [
        function(require, module, exports) {
            "use strict";
            var e108 = Object.prototype.hasOwnProperty, t68 = "~";
            function n38() {
            }
            function r53(e, t, n) {
                this.fn = e, this.context = t, this.once = n || !1;
            }
            function o16(e, n, o, s, i) {
                if ("function" != typeof o) throw new TypeError("The listener must be a function");
                var c = new r53(o, s || e, i), f = t68 ? t68 + n : n;
                return e._events[f] ? e._events[f].fn ? e._events[f] = [
                    e._events[f],
                    c
                ] : e._events[f].push(c) : (e._events[f] = c, e._eventsCount++), e;
            }
            function s11(e, t) {
                0 == --e._eventsCount ? e._events = new n38 : delete e._events[t];
            }
            function i26() {
                this._events = new n38, this._eventsCount = 0;
            }
            Object.create && (n38.prototype = Object.create(null), (new n38).__proto__ || (t68 = !1)), i26.prototype.eventNames = function() {
                var n, r, o = [];
                if (0 === this._eventsCount) return o;
                for(r in n = this._events)e108.call(n, r) && o.push(t68 ? r.slice(1) : r);
                return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(n)) : o;
            }, i26.prototype.listeners = function(e) {
                var n = t68 ? t68 + e : e, r = this._events[n];
                if (!r) return [];
                if (r.fn) return [
                    r.fn
                ];
                for(var o = 0, s = r.length, i = new Array(s); o < s; o++)i[o] = r[o].fn;
                return i;
            }, i26.prototype.listenerCount = function(e) {
                var n = t68 ? t68 + e : e, r = this._events[n];
                return r ? r.fn ? 1 : r.length : 0;
            }, i26.prototype.emit = function(e, n, r, o, s, i) {
                var c = t68 ? t68 + e : e;
                if (!this._events[c]) return !1;
                var f, u, a = this._events[c], l = arguments.length;
                if (a.fn) {
                    switch(a.once && this.removeListener(e, a.fn, void 0, !0), l){
                        case 1:
                            return a.fn.call(a.context), !0;
                        case 2:
                            return a.fn.call(a.context, n), !0;
                        case 3:
                            return a.fn.call(a.context, n, r), !0;
                        case 4:
                            return a.fn.call(a.context, n, r, o), !0;
                        case 5:
                            return a.fn.call(a.context, n, r, o, s), !0;
                        case 6:
                            return a.fn.call(a.context, n, r, o, s, i), !0;
                    }
                    for(u = 1, f = new Array(l - 1); u < l; u++)f[u - 1] = arguments[u];
                    a.fn.apply(a.context, f);
                } else {
                    var v, h = a.length;
                    for(u = 0; u < h; u++)switch(a[u].once && this.removeListener(e, a[u].fn, void 0, !0), l){
                        case 1:
                            a[u].fn.call(a[u].context);
                            break;
                        case 2:
                            a[u].fn.call(a[u].context, n);
                            break;
                        case 3:
                            a[u].fn.call(a[u].context, n, r);
                            break;
                        case 4:
                            a[u].fn.call(a[u].context, n, r, o);
                            break;
                        default:
                            if (!f) for(v = 1, f = new Array(l - 1); v < l; v++)f[v - 1] = arguments[v];
                            a[u].fn.apply(a[u].context, f);
                    }
                }
                return !0;
            }, i26.prototype.on = function(e, t, n) {
                return o16(this, e, t, n, !1);
            }, i26.prototype.once = function(e, t, n) {
                return o16(this, e, t, n, !0);
            }, i26.prototype.removeListener = function(e, n, r, o) {
                var i = t68 ? t68 + e : e;
                if (!this._events[i]) return this;
                if (!n) return s11(this, i), this;
                var c = this._events[i];
                if (c.fn) c.fn !== n || o && !c.once || r && c.context !== r || s11(this, i);
                else {
                    for(var f = 0, u = [], a = c.length; f < a; f++)(c[f].fn !== n || o && !c[f].once || r && c[f].context !== r) && u.push(c[f]);
                    u.length ? this._events[i] = 1 === u.length ? u[0] : u : s11(this, i);
                }
                return this;
            }, i26.prototype.removeAllListeners = function(e) {
                var r;
                return e ? (r = t68 ? t68 + e : e, this._events[r] && s11(this, r)) : (this._events = new n38, this._eventsCount = 0), this;
            }, i26.prototype.off = i26.prototype.removeListener, i26.prototype.addListener = i26.prototype.on, i26.prefixed = t68, i26.EventEmitter = i26, "undefined" != typeof module && (module.exports = i26);
        },
        {
        }
    ],
    "WOs9": [
        function(require, module, exports) {
            "use strict";
            var r54 = this && this.__read || function(r, e) {
                var o = "function" == typeof Symbol && r[Symbol.iterator];
                if (!o) return r;
                var t, n, l = o.call(r), i = [];
                try {
                    for(; (void 0 === e || e-- > 0) && !(t = l.next()).done;)i.push(t.value);
                } catch (s) {
                    n = {
                        error: s
                    };
                } finally{
                    try {
                        t && !t.done && (o = l.return) && o.call(l);
                    } finally{
                        if (n) throw n.error;
                    }
                }
                return i;
            }, e109 = this && this.__spreadArray || function(r, e) {
                for(var o = 0, t = e.length, n = r.length; o < t; o++, n++)r[n] = e[o];
                return r;
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.LogLevel = void 0;
            var o17, t69 = "PeerJS: ";
            !function(r) {
                r[r.Disabled = 0] = "Disabled", r[r.Errors = 1] = "Errors", r[r.Warnings = 2] = "Warnings", r[r.All = 3] = "All";
            }(o17 = exports.LogLevel || (exports.LogLevel = {
            }));
            var n39 = function() {
                function n40() {
                    this._logLevel = o17.Disabled;
                }
                return Object.defineProperty(n40.prototype, "logLevel", {
                    get: function() {
                        return this._logLevel;
                    },
                    set: function(r) {
                        this._logLevel = r;
                    },
                    enumerable: !1,
                    configurable: !0
                }), n40.prototype.log = function() {
                    for(var t = [], n = 0; n < arguments.length; n++)t[n] = arguments[n];
                    this._logLevel >= o17.All && this._print.apply(this, e109([
                        o17.All
                    ], r54(t)));
                }, n40.prototype.warn = function() {
                    for(var t = [], n = 0; n < arguments.length; n++)t[n] = arguments[n];
                    this._logLevel >= o17.Warnings && this._print.apply(this, e109([
                        o17.Warnings
                    ], r54(t)));
                }, n40.prototype.error = function() {
                    for(var t = [], n = 0; n < arguments.length; n++)t[n] = arguments[n];
                    this._logLevel >= o17.Errors && this._print.apply(this, e109([
                        o17.Errors
                    ], r54(t)));
                }, n40.prototype.setLogFunction = function(r) {
                    this._print = r;
                }, n40.prototype._print = function(n) {
                    for(var l = [], i = 1; i < arguments.length; i++)l[i - 1] = arguments[i];
                    var s = e109([
                        t69
                    ], r54(l));
                    for(var a in s)s[a] instanceof Error && (s[a] = "(" + s[a].name + ") " + s[a].message);
                    n >= o17.All ? console.log.apply(console, e109([], r54(s))) : n >= o17.Warnings ? console.warn.apply(console, e109([
                        "WARNING"
                    ], r54(s))) : n >= o17.Errors && console.error.apply(console, e109([
                        "ERROR"
                    ], r54(s)));
                }, n40;
            }();
            exports.default = new n39;
        },
        {
        }
    ],
    "ZRYf": [
        function(require, module, exports) {
            "use strict";
            var e110, r, o, n, t, a, i;
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.ServerMessageType = exports.SocketEventType = exports.SerializationType = exports.PeerErrorType = exports.PeerEventType = exports.ConnectionType = exports.ConnectionEventType = void 0, (function(e) {
                e.Open = "open", e.Stream = "stream", e.Data = "data", e.Close = "close", e.Error = "error", e.IceStateChanged = "iceStateChanged";
            })(e110 = exports.ConnectionEventType || (exports.ConnectionEventType = {
            })), (function(e) {
                e.Data = "data", e.Media = "media";
            })(r = exports.ConnectionType || (exports.ConnectionType = {
            })), (function(e) {
                e.Open = "open", e.Close = "close", e.Connection = "connection", e.Call = "call", e.Disconnected = "disconnected", e.Error = "error";
            })(o = exports.PeerEventType || (exports.PeerEventType = {
            })), (function(e) {
                e.BrowserIncompatible = "browser-incompatible", e.Disconnected = "disconnected", e.InvalidID = "invalid-id", e.InvalidKey = "invalid-key", e.Network = "network", e.PeerUnavailable = "peer-unavailable", e.SslUnavailable = "ssl-unavailable", e.ServerError = "server-error", e.SocketError = "socket-error", e.SocketClosed = "socket-closed", e.UnavailableID = "unavailable-id", e.WebRTC = "webrtc";
            })(n = exports.PeerErrorType || (exports.PeerErrorType = {
            })), (function(e) {
                e.Binary = "binary", e.BinaryUTF8 = "binary-utf8", e.JSON = "json";
            })(t = exports.SerializationType || (exports.SerializationType = {
            })), (function(e) {
                e.Message = "message", e.Disconnected = "disconnected", e.Error = "error", e.Close = "close";
            })(a = exports.SocketEventType || (exports.SocketEventType = {
            })), (function(e) {
                e.Heartbeat = "HEARTBEAT", e.Candidate = "CANDIDATE", e.Offer = "OFFER", e.Answer = "ANSWER", e.Open = "OPEN", e.Error = "ERROR", e.IdTaken = "ID-TAKEN", e.InvalidKey = "INVALID-KEY", e.Leave = "LEAVE", e.Expire = "EXPIRE";
            })(i = exports.ServerMessageType || (exports.ServerMessageType = {
            }));
        },
        {
        }
    ],
    "wJlv": [
        function(require, module, exports) {
            "use strict";
            var e111 = this && this.__extends || function() {
                var e112 = function(t71, n42) {
                    return (e112 = Object.setPrototypeOf || ({
                        __proto__: []
                    }) instanceof Array && function(e, t) {
                        e.__proto__ = t;
                    } || function(e, t) {
                        for(var n in t)Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    })(t71, n42);
                };
                return function(t, n) {
                    if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
                    function o() {
                        this.constructor = t;
                    }
                    e112(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o);
                };
            }(), t70 = this && this.__read || function(e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n) return e;
                var o, s, r = n.call(e), i = [];
                try {
                    for(; (void 0 === t || t-- > 0) && !(o = r.next()).done;)i.push(o.value);
                } catch (c) {
                    s = {
                        error: c
                    };
                } finally{
                    try {
                        o && !o.done && (n = r.return) && n.call(r);
                    } finally{
                        if (s) throw s.error;
                    }
                }
                return i;
            }, n41 = this && this.__spreadArray || function(e, t) {
                for(var n = 0, o = t.length, s = e.length; n < o; n++, s++)e[s] = t[n];
                return e;
            }, o18 = this && this.__values || function(e) {
                var t = "function" == typeof Symbol && Symbol.iterator, n = t && e[t], o = 0;
                if (n) return n.call(e);
                if (e && "number" == typeof e.length) return {
                    next: function() {
                        return e && o >= e.length && (e = void 0), {
                            value: e && e[o++],
                            done: !e
                        };
                    }
                };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
            }, s12 = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.Socket = void 0;
            var r55 = require("eventemitter3"), i27 = s12(require("./logger")), c9 = require("./enums"), a12 = function(s13) {
                function r56(e, t, n, o, r, i) {
                    void 0 === i && (i = 5000);
                    var c = s13.call(this) || this;
                    c.pingInterval = i, c._disconnected = !0, c._messagesQueue = [];
                    var a = e ? "wss://" : "ws://";
                    return c._baseUrl = a + t + ":" + n + o + "peerjs?key=" + r, c;
                }
                return e111(r56, s13), r56.prototype.start = function(e113, t72) {
                    var n = this;
                    this._id = e113;
                    var o = this._baseUrl + "&id=" + e113 + "&token=" + t72;
                    !this._socket && this._disconnected && (this._socket = new WebSocket(o), this._disconnected = !1, this._socket.onmessage = function(e) {
                        var t;
                        try {
                            t = JSON.parse(e.data), i27.default.log("Server message received:", t);
                        } catch (o) {
                            return void i27.default.log("Invalid server message", e.data);
                        }
                        n.emit(c9.SocketEventType.Message, t);
                    }, this._socket.onclose = function(e) {
                        n._disconnected || (i27.default.log("Socket closed.", e), n._cleanup(), n._disconnected = !0, n.emit(c9.SocketEventType.Disconnected));
                    }, this._socket.onopen = function() {
                        n._disconnected || (n._sendQueuedMessages(), i27.default.log("Socket open"), n._scheduleHeartbeat());
                    });
                }, r56.prototype._scheduleHeartbeat = function() {
                    var e = this;
                    this._wsPingTimer = setTimeout(function() {
                        e._sendHeartbeat();
                    }, this.pingInterval);
                }, r56.prototype._sendHeartbeat = function() {
                    if (this._wsOpen()) {
                        var e = JSON.stringify({
                            type: c9.ServerMessageType.Heartbeat
                        });
                        this._socket.send(e), this._scheduleHeartbeat();
                    } else i27.default.log("Cannot send heartbeat, because socket closed");
                }, r56.prototype._wsOpen = function() {
                    return !!this._socket && 1 === this._socket.readyState;
                }, r56.prototype._sendQueuedMessages = function() {
                    var e, s, r = n41([], t70(this._messagesQueue));
                    this._messagesQueue = [];
                    try {
                        for(var i = o18(r), c = i.next(); !c.done; c = i.next()){
                            var a = c.value;
                            this.send(a);
                        }
                    } catch (u) {
                        e = {
                            error: u
                        };
                    } finally{
                        try {
                            c && !c.done && (s = i.return) && s.call(i);
                        } finally{
                            if (e) throw e.error;
                        }
                    }
                }, r56.prototype.send = function(e) {
                    if (!this._disconnected) {
                        if (this._id) {
                            if (e.type) {
                                if (this._wsOpen()) {
                                    var t = JSON.stringify(e);
                                    this._socket.send(t);
                                }
                            } else this.emit(c9.SocketEventType.Error, "Invalid message");
                        } else this._messagesQueue.push(e);
                    }
                }, r56.prototype.close = function() {
                    this._disconnected || (this._cleanup(), this._disconnected = !0);
                }, r56.prototype._cleanup = function() {
                    this._socket && (this._socket.onopen = this._socket.onmessage = this._socket.onclose = null, this._socket.close(), this._socket = void 0), clearTimeout(this._wsPingTimer);
                }, r56;
            }(r55.EventEmitter);
            exports.Socket = a12;
        },
        {
            "eventemitter3": "JJlS",
            "./logger": "WOs9",
            "./enums": "ZRYf"
        }
    ],
    "HCdX": [
        function(require, module, exports) {
            "use strict";
            var e114 = this && this.__assign || function() {
                return (e114 = Object.assign || function(e) {
                    for(var n, t = 1, o = arguments.length; t < o; t++)for(var i in n = arguments[t])Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
                    return e;
                }).apply(this, arguments);
            }, n43 = this && this.__awaiter || function(e115, n44, t, o) {
                return new (t || (t = Promise))(function(i, r) {
                    function c(e) {
                        try {
                            s(o.next(e));
                        } catch (n) {
                            r(n);
                        }
                    }
                    function a(e) {
                        try {
                            s(o.throw(e));
                        } catch (n) {
                            r(n);
                        }
                    }
                    function s(e116) {
                        var n;
                        e116.done ? i(e116.value) : (n = e116.value, n instanceof t ? n : new t(function(e) {
                            e(n);
                        })).then(c, a);
                    }
                    s((o = o.apply(e115, n44 || [])).next());
                });
            }, t73 = this && this.__generator || function(e, n) {
                var t, o, i, r58, c = {
                    label: 0,
                    sent: function() {
                        if (1 & i[0]) throw i[1];
                        return i[1];
                    },
                    trys: [],
                    ops: []
                };
                function a14(r59) {
                    return function(a15) {
                        return (function(r) {
                            if (t) throw new TypeError("Generator is already executing.");
                            for(; c;)try {
                                if (t = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch(o = 0, i && (r = [
                                    2 & r[0],
                                    i.value
                                ]), r[0]){
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return c.label++, {
                                            value: r[1],
                                            done: !1
                                        };
                                    case 5:
                                        c.label++, o = r[1], r = [
                                            0
                                        ];
                                        continue;
                                    case 7:
                                        r = c.ops.pop(), c.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = c.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            c = 0;
                                            continue;
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            c.label = r[1];
                                            break;
                                        }
                                        if (6 === r[0] && c.label < i[1]) {
                                            c.label = i[1], i = r;
                                            break;
                                        }
                                        if (i && c.label < i[2]) {
                                            c.label = i[2], c.ops.push(r);
                                            break;
                                        }
                                        i[2] && c.ops.pop(), c.trys.pop();
                                        continue;
                                }
                                r = n.call(e, c);
                            } catch (a) {
                                r = [
                                    6,
                                    a
                                ], o = 0;
                            } finally{
                                t = i = 0;
                            }
                            if (5 & r[0]) throw r[1];
                            return {
                                value: r[0] ? r[1] : void 0,
                                done: !0
                            };
                        })([
                            r59,
                            a15
                        ]);
                    };
                }
                return r58 = {
                    next: a14(0),
                    throw: a14(1),
                    return: a14(2)
                }, "function" == typeof Symbol && (r58[Symbol.iterator] = function() {
                    return this;
                }), r58;
            }, o19 = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.Negotiator = void 0;
            var i28 = require("./util"), r57 = o19(require("./logger")), c10 = require("./enums"), a13 = function() {
                function o20(e) {
                    this.connection = e;
                }
                return o20.prototype.startConnection = function(e) {
                    var n = this._startPeerConnection();
                    if (this.connection.peerConnection = n, this.connection.type === c10.ConnectionType.Media && e._stream && this._addTracksToConnection(e._stream, n), e.originator) {
                        if (this.connection.type === c10.ConnectionType.Data) {
                            var t = this.connection, o = {
                                ordered: !!e.reliable
                            }, i = n.createDataChannel(t.label, o);
                            t.initialize(i);
                        }
                        this._makeOffer();
                    } else this.handleSDP("OFFER", e.sdp);
                }, o20.prototype._startPeerConnection = function() {
                    r57.default.log("Creating RTCPeerConnection.");
                    var e = new RTCPeerConnection(this.connection.provider.options.config);
                    return this._setupListeners(e), e;
                }, o20.prototype._setupListeners = function(e117) {
                    var n45 = this, t = this.connection.peer, o = this.connection.connectionId, a16 = this.connection.type, s = this.connection.provider;
                    r57.default.log("Listening for ICE candidates."), e117.onicecandidate = function(e) {
                        e.candidate && e.candidate.candidate && (r57.default.log("Received ICE candidates for " + t + ":", e.candidate), s.socket.send({
                            type: c10.ServerMessageType.Candidate,
                            payload: {
                                candidate: e.candidate,
                                type: a16,
                                connectionId: o
                            },
                            dst: t
                        }));
                    }, e117.oniceconnectionstatechange = function() {
                        switch(e117.iceConnectionState){
                            case "failed":
                                r57.default.log("iceConnectionState is failed, closing connections to " + t), n45.connection.emit(c10.ConnectionEventType.Error, new Error("Negotiation of connection to " + t + " failed.")), n45.connection.close();
                                break;
                            case "closed":
                                r57.default.log("iceConnectionState is closed, closing connections to " + t), n45.connection.emit(c10.ConnectionEventType.Error, new Error("Connection to " + t + " closed.")), n45.connection.close();
                                break;
                            case "disconnected":
                                r57.default.log("iceConnectionState changed to disconnected on the connection with " + t);
                                break;
                            case "completed":
                                e117.onicecandidate = i28.util.noop;
                        }
                        n45.connection.emit(c10.ConnectionEventType.IceStateChanged, e117.iceConnectionState);
                    }, r57.default.log("Listening for data channel"), e117.ondatachannel = function(e) {
                        r57.default.log("Received data channel");
                        var n = e.channel;
                        s.getConnection(t, o).initialize(n);
                    }, r57.default.log("Listening for remote stream"), e117.ontrack = function(e) {
                        r57.default.log("Received remote stream");
                        var i = e.streams[0], a = s.getConnection(t, o);
                        if (a.type === c10.ConnectionType.Media) {
                            var d = a;
                            n45._addStreamToMediaConnection(i, d);
                        }
                    };
                }, o20.prototype.cleanup = function() {
                    r57.default.log("Cleaning up PeerConnection to " + this.connection.peer);
                    var e = this.connection.peerConnection;
                    if (e) {
                        this.connection.peerConnection = null, e.onicecandidate = e.oniceconnectionstatechange = e.ondatachannel = e.ontrack = function() {
                        };
                        var n = "closed" !== e.signalingState, t = !1;
                        if (this.connection.type === c10.ConnectionType.Data) {
                            var o = this.connection.dataChannel;
                            o && (t = !!o.readyState && "closed" !== o.readyState);
                        }
                        (n || t) && e.close();
                    }
                }, o20.prototype._makeOffer = function() {
                    return n43(this, void 0, Promise, function() {
                        var n, o, a, s, d, l, u;
                        return t73(this, function(t) {
                            switch(t.label){
                                case 0:
                                    n = this.connection.peerConnection, o = this.connection.provider, t.label = 1;
                                case 1:
                                    return t.trys.push([
                                        1,
                                        7,
                                        ,
                                        8
                                    ]), [
                                        4,
                                        n.createOffer(this.connection.options.constraints)
                                    ];
                                case 2:
                                    a = t.sent(), r57.default.log("Created offer."), this.connection.options.sdpTransform && "function" == typeof this.connection.options.sdpTransform && (a.sdp = this.connection.options.sdpTransform(a.sdp) || a.sdp), t.label = 3;
                                case 3:
                                    return t.trys.push([
                                        3,
                                        5,
                                        ,
                                        6
                                    ]), [
                                        4,
                                        n.setLocalDescription(a)
                                    ];
                                case 4:
                                    return t.sent(), r57.default.log("Set localDescription:", a, "for:" + this.connection.peer), s = {
                                        sdp: a,
                                        type: this.connection.type,
                                        connectionId: this.connection.connectionId,
                                        metadata: this.connection.metadata,
                                        browser: i28.util.browser
                                    }, this.connection.type === c10.ConnectionType.Data && (d = this.connection, s = e114(e114({
                                    }, s), {
                                        label: d.label,
                                        reliable: d.reliable,
                                        serialization: d.serialization
                                    })), o.socket.send({
                                        type: c10.ServerMessageType.Offer,
                                        payload: s,
                                        dst: this.connection.peer
                                    }), [
                                        3,
                                        6
                                    ];
                                case 5:
                                    return "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer" != (l = t.sent()) && (o.emitError(c10.PeerErrorType.WebRTC, l), r57.default.log("Failed to setLocalDescription, ", l)), [
                                        3,
                                        6
                                    ];
                                case 6:
                                    return [
                                        3,
                                        8
                                    ];
                                case 7:
                                    return u = t.sent(), o.emitError(c10.PeerErrorType.WebRTC, u), r57.default.log("Failed to createOffer, ", u), [
                                        3,
                                        8
                                    ];
                                case 8:
                                    return [
                                        2
                                    ];
                            }
                        });
                    });
                }, o20.prototype._makeAnswer = function() {
                    return n43(this, void 0, Promise, function() {
                        var e, n, o, a, s;
                        return t73(this, function(t) {
                            switch(t.label){
                                case 0:
                                    e = this.connection.peerConnection, n = this.connection.provider, t.label = 1;
                                case 1:
                                    return t.trys.push([
                                        1,
                                        7,
                                        ,
                                        8
                                    ]), [
                                        4,
                                        e.createAnswer()
                                    ];
                                case 2:
                                    o = t.sent(), r57.default.log("Created answer."), this.connection.options.sdpTransform && "function" == typeof this.connection.options.sdpTransform && (o.sdp = this.connection.options.sdpTransform(o.sdp) || o.sdp), t.label = 3;
                                case 3:
                                    return t.trys.push([
                                        3,
                                        5,
                                        ,
                                        6
                                    ]), [
                                        4,
                                        e.setLocalDescription(o)
                                    ];
                                case 4:
                                    return t.sent(), r57.default.log("Set localDescription:", o, "for:" + this.connection.peer), n.socket.send({
                                        type: c10.ServerMessageType.Answer,
                                        payload: {
                                            sdp: o,
                                            type: this.connection.type,
                                            connectionId: this.connection.connectionId,
                                            browser: i28.util.browser
                                        },
                                        dst: this.connection.peer
                                    }), [
                                        3,
                                        6
                                    ];
                                case 5:
                                    return a = t.sent(), n.emitError(c10.PeerErrorType.WebRTC, a), r57.default.log("Failed to setLocalDescription, ", a), [
                                        3,
                                        6
                                    ];
                                case 6:
                                    return [
                                        3,
                                        8
                                    ];
                                case 7:
                                    return s = t.sent(), n.emitError(c10.PeerErrorType.WebRTC, s), r57.default.log("Failed to create answer, ", s), [
                                        3,
                                        8
                                    ];
                                case 8:
                                    return [
                                        2
                                    ];
                            }
                        });
                    });
                }, o20.prototype.handleSDP = function(e, o) {
                    return n43(this, void 0, Promise, function() {
                        var n, i, a, s;
                        return t73(this, function(t) {
                            switch(t.label){
                                case 0:
                                    o = new RTCSessionDescription(o), n = this.connection.peerConnection, i = this.connection.provider, r57.default.log("Setting remote description", o), a = this, t.label = 1;
                                case 1:
                                    return t.trys.push([
                                        1,
                                        5,
                                        ,
                                        6
                                    ]), [
                                        4,
                                        n.setRemoteDescription(o)
                                    ];
                                case 2:
                                    return t.sent(), r57.default.log("Set remoteDescription:" + e + " for:" + this.connection.peer), "OFFER" !== e ? [
                                        3,
                                        4
                                    ] : [
                                        4,
                                        a._makeAnswer()
                                    ];
                                case 3:
                                    t.sent(), t.label = 4;
                                case 4:
                                    return [
                                        3,
                                        6
                                    ];
                                case 5:
                                    return s = t.sent(), i.emitError(c10.PeerErrorType.WebRTC, s), r57.default.log("Failed to setRemoteDescription, ", s), [
                                        3,
                                        6
                                    ];
                                case 6:
                                    return [
                                        2
                                    ];
                            }
                        });
                    });
                }, o20.prototype.handleCandidate = function(e) {
                    return n43(this, void 0, Promise, function() {
                        var n, o, i, a, s, d;
                        return t73(this, function(t) {
                            switch(t.label){
                                case 0:
                                    r57.default.log("handleCandidate:", e), n = e.candidate, o = e.sdpMLineIndex, i = e.sdpMid, a = this.connection.peerConnection, s = this.connection.provider, t.label = 1;
                                case 1:
                                    return t.trys.push([
                                        1,
                                        3,
                                        ,
                                        4
                                    ]), [
                                        4,
                                        a.addIceCandidate(new RTCIceCandidate({
                                            sdpMid: i,
                                            sdpMLineIndex: o,
                                            candidate: n
                                        }))
                                    ];
                                case 2:
                                    return t.sent(), r57.default.log("Added ICE candidate for:" + this.connection.peer), [
                                        3,
                                        4
                                    ];
                                case 3:
                                    return d = t.sent(), s.emitError(c10.PeerErrorType.WebRTC, d), r57.default.log("Failed to handleCandidate, ", d), [
                                        3,
                                        4
                                    ];
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        });
                    });
                }, o20.prototype._addTracksToConnection = function(e, n) {
                    if (r57.default.log("add tracks from stream " + e.id + " to peer connection"), !n.addTrack) return r57.default.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");
                    e.getTracks().forEach(function(t) {
                        n.addTrack(t, e);
                    });
                }, o20.prototype._addStreamToMediaConnection = function(e, n) {
                    r57.default.log("add stream " + e.id + " to media connection " + n.connectionId), n.addStream(e);
                }, o20;
            }();
            exports.Negotiator = a13;
        },
        {
            "./util": "BHXf",
            "./logger": "WOs9",
            "./enums": "ZRYf"
        }
    ],
    "tQFK": [
        function(require, module, exports) {
            "use strict";
            var t74 = this && this.__extends || function() {
                var t75 = function(e119, n47) {
                    return (t75 = Object.setPrototypeOf || ({
                        __proto__: []
                    }) instanceof Array && function(t, e) {
                        t.__proto__ = e;
                    } || function(t, e) {
                        for(var n in e)Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    })(e119, n47);
                };
                return function(e, n) {
                    if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
                    function o() {
                        this.constructor = e;
                    }
                    t75(e, n), e.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o);
                };
            }();
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.BaseConnection = void 0;
            var e118 = require("eventemitter3"), n46 = function(e) {
                function n48(t, n, o) {
                    var r = e.call(this) || this;
                    return r.peer = t, r.provider = n, r.options = o, r._open = !1, r.metadata = o.metadata, r;
                }
                return t74(n48, e), Object.defineProperty(n48.prototype, "open", {
                    get: function() {
                        return this._open;
                    },
                    enumerable: !1,
                    configurable: !0
                }), n48;
            }(e118.EventEmitter);
            exports.BaseConnection = n46;
        },
        {
            "eventemitter3": "JJlS"
        }
    ],
    "dbHP": [
        function(require, module, exports) {
            "use strict";
            var e120 = this && this.__extends || function() {
                var e121 = function(t77, o22) {
                    return (e121 = Object.setPrototypeOf || ({
                        __proto__: []
                    }) instanceof Array && function(e, t) {
                        e.__proto__ = t;
                    } || function(e, t) {
                        for(var o in t)Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    })(t77, o22);
                };
                return function(t, o) {
                    if ("function" != typeof o && null !== o) throw new TypeError("Class extends value " + String(o) + " is not a constructor or null");
                    function r() {
                        this.constructor = t;
                    }
                    e121(t, o), t.prototype = null === o ? Object.create(o) : (r.prototype = o.prototype, new r);
                };
            }(), t76 = this && this.__assign || function() {
                return (t76 = Object.assign || function(e) {
                    for(var t, o = 1, r = arguments.length; o < r; o++)for(var n in t = arguments[o])Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e;
                }).apply(this, arguments);
            }, o21 = this && this.__values || function(e) {
                var t = "function" == typeof Symbol && Symbol.iterator, o = t && e[t], r = 0;
                if (o) return o.call(e);
                if (e && "number" == typeof e.length) return {
                    next: function() {
                        return e && r >= e.length && (e = void 0), {
                            value: e && e[r++],
                            done: !e
                        };
                    }
                };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
            }, r60 = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.MediaConnection = void 0;
            var n49 = require("./util"), i29 = r60(require("./logger")), a17 = require("./negotiator"), s14 = require("./enums"), l3 = require("./baseconnection"), c11 = function(r61) {
                function l4(e, t, o) {
                    var i = r61.call(this, e, t, o) || this;
                    return i._localStream = i.options._stream, i.connectionId = i.options.connectionId || l4.ID_PREFIX + n49.util.randomToken(), i._negotiator = new a17.Negotiator(i), i._localStream && i._negotiator.startConnection({
                        _stream: i._localStream,
                        originator: !0
                    }), i;
                }
                return e120(l4, r61), Object.defineProperty(l4.prototype, "type", {
                    get: function() {
                        return s14.ConnectionType.Media;
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(l4.prototype, "localStream", {
                    get: function() {
                        return this._localStream;
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(l4.prototype, "remoteStream", {
                    get: function() {
                        return this._remoteStream;
                    },
                    enumerable: !1,
                    configurable: !0
                }), l4.prototype.addStream = function(e) {
                    i29.default.log("Receiving stream", e), this._remoteStream = e, r61.prototype.emit.call(this, s14.ConnectionEventType.Stream, e);
                }, l4.prototype.handleMessage = function(e) {
                    var t = e.type, o = e.payload;
                    switch(e.type){
                        case s14.ServerMessageType.Answer:
                            this._negotiator.handleSDP(t, o.sdp), this._open = !0;
                            break;
                        case s14.ServerMessageType.Candidate:
                            this._negotiator.handleCandidate(o.candidate);
                            break;
                        default:
                            i29.default.warn("Unrecognized message type:" + t + " from peer:" + this.peer);
                    }
                }, l4.prototype.answer = function(e, r) {
                    var n, a;
                    if (void 0 === r && (r = {
                    }), this._localStream) i29.default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
                    else {
                        this._localStream = e, r && r.sdpTransform && (this.options.sdpTransform = r.sdpTransform), this._negotiator.startConnection(t76(t76({
                        }, this.options._payload), {
                            _stream: e
                        }));
                        var s = this.provider._getMessages(this.connectionId);
                        try {
                            for(var l = o21(s), c = l.next(); !c.done; c = l.next()){
                                var p = c.value;
                                this.handleMessage(p);
                            }
                        } catch (u) {
                            n = {
                                error: u
                            };
                        } finally{
                            try {
                                c && !c.done && (a = l.return) && a.call(l);
                            } finally{
                                if (n) throw n.error;
                            }
                        }
                        this._open = !0;
                    }
                }, l4.prototype.close = function() {
                    this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this._localStream = null, this._remoteStream = null, this.provider && (this.provider._removeConnection(this), this.provider = null), this.options && this.options._stream && (this.options._stream = null), this.open && (this._open = !1, r61.prototype.emit.call(this, s14.ConnectionEventType.Close));
                }, l4.ID_PREFIX = "mc_", l4;
            }(l3.BaseConnection);
            exports.MediaConnection = c11;
        },
        {
            "./util": "BHXf",
            "./logger": "WOs9",
            "./negotiator": "HCdX",
            "./enums": "ZRYf",
            "./baseconnection": "tQFK"
        }
    ],
    "GGp6": [
        function(require, module, exports) {
            "use strict";
            var e122 = this && this.__extends || function() {
                var e123 = function(t79, r63) {
                    return (e123 = Object.setPrototypeOf || ({
                        __proto__: []
                    }) instanceof Array && function(e, t) {
                        e.__proto__ = t;
                    } || function(e, t) {
                        for(var r in t)Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    })(t79, r63);
                };
                return function(t, r) {
                    if ("function" != typeof r && null !== r) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
                    function o() {
                        this.constructor = t;
                    }
                    e123(t, r), t.prototype = null === r ? Object.create(r) : (o.prototype = r.prototype, new o);
                };
            }(), t78 = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.EncodingQueue = void 0;
            var r62 = require("eventemitter3"), o23 = t78(require("./logger")), n = function(t80) {
                function r() {
                    var e = t80.call(this) || this;
                    return e.fileReader = new FileReader, e._queue = [], e._processing = !1, e.fileReader.onload = function(t) {
                        e._processing = !1, t.target && e.emit("done", t.target.result), e.doNextTask();
                    }, e.fileReader.onerror = function(t) {
                        o23.default.error("EncodingQueue error:", t), e._processing = !1, e.destroy(), e.emit("error", t);
                    }, e;
                }
                return e122(r, t80), Object.defineProperty(r.prototype, "queue", {
                    get: function() {
                        return this._queue;
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(r.prototype, "size", {
                    get: function() {
                        return this.queue.length;
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(r.prototype, "processing", {
                    get: function() {
                        return this._processing;
                    },
                    enumerable: !1,
                    configurable: !0
                }), r.prototype.enque = function(e) {
                    this.queue.push(e), this.processing || this.doNextTask();
                }, r.prototype.destroy = function() {
                    this.fileReader.abort(), this._queue = [];
                }, r.prototype.doNextTask = function() {
                    0 !== this.size && (this.processing || (this._processing = !0, this.fileReader.readAsArrayBuffer(this.queue.shift())));
                }, r;
            }(r62.EventEmitter);
            exports.EncodingQueue = n;
        },
        {
            "eventemitter3": "JJlS",
            "./logger": "WOs9"
        }
    ],
    "GBTQ": [
        function(require, module, exports) {
            "use strict";
            var e124 = this && this.__extends || function() {
                var e125 = function(t82, n51) {
                    return (e125 = Object.setPrototypeOf || ({
                        __proto__: []
                    }) instanceof Array && function(e, t) {
                        e.__proto__ = t;
                    } || function(e, t) {
                        for(var n in t)Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    })(t82, n51);
                };
                return function(t, n) {
                    if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
                    function i() {
                        this.constructor = t;
                    }
                    e125(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i);
                };
            }(), t81 = this && this.__values || function(e) {
                var t = "function" == typeof Symbol && Symbol.iterator, n = t && e[t], i = 0;
                if (n) return n.call(e);
                if (e && "number" == typeof e.length) return {
                    next: function() {
                        return e && i >= e.length && (e = void 0), {
                            value: e && e[i++],
                            done: !e
                        };
                    }
                };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
            }, n50 = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.DataConnection = void 0;
            var i30 = require("./util"), o24 = n50(require("./logger")), r64 = require("./negotiator"), a18 = require("./enums"), s15 = require("./baseconnection"), u4 = require("./encodingQueue"), l5 = function(n52) {
                function s16(e126, t, l) {
                    var f = n52.call(this, e126, t, l) || this;
                    return f.stringify = JSON.stringify, f.parse = JSON.parse, f._buffer = [], f._bufferSize = 0, f._buffering = !1, f._chunkedData = {
                    }, f._encodingQueue = new u4.EncodingQueue, f.connectionId = f.options.connectionId || s16.ID_PREFIX + i30.util.randomToken(), f.label = f.options.label || f.connectionId, f.serialization = f.options.serialization || a18.SerializationType.Binary, f.reliable = !!f.options.reliable, f._encodingQueue.on("done", function(e) {
                        f._bufferedSend(e);
                    }), f._encodingQueue.on("error", function() {
                        o24.default.error("DC#" + f.connectionId + ": Error occured in encoding from blob to arraybuffer, close DC"), f.close();
                    }), f._negotiator = new r64.Negotiator(f), f._negotiator.startConnection(f.options._payload || {
                        originator: !0
                    }), f;
                }
                return e124(s16, n52), Object.defineProperty(s16.prototype, "type", {
                    get: function() {
                        return a18.ConnectionType.Data;
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(s16.prototype, "dataChannel", {
                    get: function() {
                        return this._dc;
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(s16.prototype, "bufferSize", {
                    get: function() {
                        return this._bufferSize;
                    },
                    enumerable: !1,
                    configurable: !0
                }), s16.prototype.initialize = function(e) {
                    this._dc = e, this._configureDataChannel();
                }, s16.prototype._configureDataChannel = function() {
                    var e = this;
                    i30.util.supports.binaryBlob && !i30.util.supports.reliable || (this.dataChannel.binaryType = "arraybuffer"), this.dataChannel.onopen = function() {
                        o24.default.log("DC#" + e.connectionId + " dc connection success"), e._open = !0, e.emit(a18.ConnectionEventType.Open);
                    }, this.dataChannel.onmessage = function(t) {
                        o24.default.log("DC#" + e.connectionId + " dc onmessage:", t.data), e._handleDataMessage(t);
                    }, this.dataChannel.onclose = function() {
                        o24.default.log("DC#" + e.connectionId + " dc closed for:", e.peer), e.close();
                    };
                }, s16.prototype._handleDataMessage = function(e127) {
                    var t = this, o = e127.data, r = o.constructor, s = o;
                    if (this.serialization === a18.SerializationType.Binary || this.serialization === a18.SerializationType.BinaryUTF8) {
                        if (r === Blob) return void i30.util.blobToArrayBuffer(o, function(e) {
                            var n = i30.util.unpack(e);
                            t.emit(a18.ConnectionEventType.Data, n);
                        });
                        if (r === ArrayBuffer) s = i30.util.unpack(o);
                        else if (r === String) {
                            var u = i30.util.binaryStringToArrayBuffer(o);
                            s = i30.util.unpack(u);
                        }
                    } else this.serialization === a18.SerializationType.JSON && (s = this.parse(o));
                    s.__peerData ? this._handleChunk(s) : n52.prototype.emit.call(this, a18.ConnectionEventType.Data, s);
                }, s16.prototype._handleChunk = function(e) {
                    var t = e.__peerData, n = this._chunkedData[t] || {
                        data: [],
                        count: 0,
                        total: e.total
                    };
                    if (n.data[e.n] = e.data, n.count++, this._chunkedData[t] = n, n.total === n.count) {
                        delete this._chunkedData[t];
                        var i = new Blob(n.data);
                        this._handleDataMessage({
                            data: i
                        });
                    }
                }, s16.prototype.close = function() {
                    this._buffer = [], this._bufferSize = 0, this._chunkedData = {
                    }, this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this.provider && (this.provider._removeConnection(this), this.provider = null), this.dataChannel && (this.dataChannel.onopen = null, this.dataChannel.onmessage = null, this.dataChannel.onclose = null, this._dc = null), this._encodingQueue && (this._encodingQueue.destroy(), this._encodingQueue.removeAllListeners(), this._encodingQueue = null), this.open && (this._open = !1, n52.prototype.emit.call(this, a18.ConnectionEventType.Close));
                }, s16.prototype.send = function(e, t) {
                    if (this.open) {
                        if (this.serialization === a18.SerializationType.JSON) this._bufferedSend(this.stringify(e));
                        else if (this.serialization === a18.SerializationType.Binary || this.serialization === a18.SerializationType.BinaryUTF8) {
                            var o = i30.util.pack(e);
                            if (!t && o.size > i30.util.chunkedMTU) return void this._sendChunks(o);
                            i30.util.supports.binaryBlob ? this._bufferedSend(o) : this._encodingQueue.enque(o);
                        } else this._bufferedSend(e);
                    } else n52.prototype.emit.call(this, a18.ConnectionEventType.Error, new Error("Connection is not open. You should listen for the `open` event before sending messages."));
                }, s16.prototype._bufferedSend = function(e) {
                    !this._buffering && this._trySend(e) || (this._buffer.push(e), this._bufferSize = this._buffer.length);
                }, s16.prototype._trySend = function(e) {
                    var t = this;
                    if (!this.open) return !1;
                    if (this.dataChannel.bufferedAmount > s16.MAX_BUFFERED_AMOUNT) return this._buffering = !0, setTimeout(function() {
                        t._buffering = !1, t._tryBuffer();
                    }, 50), !1;
                    try {
                        this.dataChannel.send(e);
                    } catch (n) {
                        return o24.default.error("DC#:" + this.connectionId + " Error when sending:", n), this._buffering = !0, this.close(), !1;
                    }
                    return !0;
                }, s16.prototype._tryBuffer = function() {
                    if (this.open && 0 !== this._buffer.length) {
                        var e = this._buffer[0];
                        this._trySend(e) && (this._buffer.shift(), this._bufferSize = this._buffer.length, this._tryBuffer());
                    }
                }, s16.prototype._sendChunks = function(e) {
                    var n, r, a = i30.util.chunk(e);
                    o24.default.log("DC#" + this.connectionId + " Try to send " + a.length + " chunks...");
                    try {
                        for(var s = t81(a), u = s.next(); !u.done; u = s.next()){
                            var l = u.value;
                            this.send(l, !0);
                        }
                    } catch (f) {
                        n = {
                            error: f
                        };
                    } finally{
                        try {
                            u && !u.done && (r = s.return) && r.call(s);
                        } finally{
                            if (n) throw n.error;
                        }
                    }
                }, s16.prototype.handleMessage = function(e) {
                    var t = e.payload;
                    switch(e.type){
                        case a18.ServerMessageType.Answer:
                            this._negotiator.handleSDP(e.type, t.sdp);
                            break;
                        case a18.ServerMessageType.Candidate:
                            this._negotiator.handleCandidate(t.candidate);
                            break;
                        default:
                            o24.default.warn("Unrecognized message type:", e.type, "from peer:", this.peer);
                    }
                }, s16.ID_PREFIX = "dc_", s16.MAX_BUFFERED_AMOUNT = 8388608, s16;
            }(s15.BaseConnection);
            exports.DataConnection = l5;
        },
        {
            "./util": "BHXf",
            "./logger": "WOs9",
            "./negotiator": "HCdX",
            "./enums": "ZRYf",
            "./baseconnection": "tQFK",
            "./encodingQueue": "GGp6"
        }
    ],
    "in7L": [
        function(require, module, exports) {
            "use strict";
            var t83 = this && this.__awaiter || function(t84, e129, r, o) {
                return new (r || (r = Promise))(function(n, s) {
                    function i(t) {
                        try {
                            a(o.next(t));
                        } catch (e) {
                            s(e);
                        }
                    }
                    function u(t) {
                        try {
                            a(o.throw(t));
                        } catch (e) {
                            s(e);
                        }
                    }
                    function a(t85) {
                        var e;
                        t85.done ? n(t85.value) : (e = t85.value, e instanceof r ? e : new r(function(t) {
                            t(e);
                        })).then(i, u);
                    }
                    a((o = o.apply(t84, e129 || [])).next());
                });
            }, e128 = this && this.__generator || function(t, e) {
                var r, o, n, s18, i = {
                    label: 0,
                    sent: function() {
                        if (1 & n[0]) throw n[1];
                        return n[1];
                    },
                    trys: [],
                    ops: []
                };
                function u5(s19) {
                    return function(u6) {
                        return (function(s) {
                            if (r) throw new TypeError("Generator is already executing.");
                            for(; i;)try {
                                if (r = 1, o && (n = 2 & s[0] ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done) return n;
                                switch(o = 0, n && (s = [
                                    2 & s[0],
                                    n.value
                                ]), s[0]){
                                    case 0:
                                    case 1:
                                        n = s;
                                        break;
                                    case 4:
                                        return i.label++, {
                                            value: s[1],
                                            done: !1
                                        };
                                    case 5:
                                        i.label++, o = s[1], s = [
                                            0
                                        ];
                                        continue;
                                    case 7:
                                        s = i.ops.pop(), i.trys.pop();
                                        continue;
                                    default:
                                        if (!(n = (n = i.trys).length > 0 && n[n.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                            i = 0;
                                            continue;
                                        }
                                        if (3 === s[0] && (!n || s[1] > n[0] && s[1] < n[3])) {
                                            i.label = s[1];
                                            break;
                                        }
                                        if (6 === s[0] && i.label < n[1]) {
                                            i.label = n[1], n = s;
                                            break;
                                        }
                                        if (n && i.label < n[2]) {
                                            i.label = n[2], i.ops.push(s);
                                            break;
                                        }
                                        n[2] && i.ops.pop(), i.trys.pop();
                                        continue;
                                }
                                s = e.call(t, i);
                            } catch (u) {
                                s = [
                                    6,
                                    u
                                ], o = 0;
                            } finally{
                                r = n = 0;
                            }
                            if (5 & s[0]) throw s[1];
                            return {
                                value: s[0] ? s[1] : void 0,
                                done: !0
                            };
                        })([
                            s19,
                            u6
                        ]);
                    };
                }
                return s18 = {
                    next: u5(0),
                    throw: u5(1),
                    return: u5(2)
                }, "function" == typeof Symbol && (s18[Symbol.iterator] = function() {
                    return this;
                }), s18;
            }, r65 = this && this.__importDefault || function(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.API = void 0;
            var o25 = require("./util"), n53 = r65(require("./logger")), s17 = function() {
                function r66(t) {
                    this._options = t;
                }
                return r66.prototype._buildUrl = function(t) {
                    var e = (this._options.secure ? "https://" : "http://") + this._options.host + ":" + this._options.port + this._options.path + this._options.key + "/" + t;
                    return e += "?ts=" + (new Date).getTime() + Math.random();
                }, r66.prototype.retrieveId = function() {
                    return t83(this, void 0, Promise, function() {
                        var t, r, s, i;
                        return e128(this, function(e) {
                            switch(e.label){
                                case 0:
                                    t = this._buildUrl("id"), e.label = 1;
                                case 1:
                                    return e.trys.push([
                                        1,
                                        3,
                                        ,
                                        4
                                    ]), [
                                        4,
                                        fetch(t)
                                    ];
                                case 2:
                                    if (200 !== (r = e.sent()).status) throw new Error("Error. Status:" + r.status);
                                    return [
                                        2,
                                        r.text()
                                    ];
                                case 3:
                                    throw s = e.sent(), n53.default.error("Error retrieving ID", s), i = "", "/" === this._options.path && this._options.host !== o25.util.CLOUD_HOST && (i = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."), new Error("Could not get an ID from the server." + i);
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        });
                    });
                }, r66.prototype.listAllPeers = function() {
                    return t83(this, void 0, Promise, function() {
                        var t, r, s, i;
                        return e128(this, function(e) {
                            switch(e.label){
                                case 0:
                                    t = this._buildUrl("peers"), e.label = 1;
                                case 1:
                                    return e.trys.push([
                                        1,
                                        3,
                                        ,
                                        4
                                    ]), [
                                        4,
                                        fetch(t)
                                    ];
                                case 2:
                                    if (200 !== (r = e.sent()).status) {
                                        if (401 === r.status) throw s = "", s = this._options.host === o25.util.CLOUD_HOST ? "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key." : "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.", new Error("It doesn't look like you have permission to list peers IDs. " + s);
                                        throw new Error("Error. Status:" + r.status);
                                    }
                                    return [
                                        2,
                                        r.json()
                                    ];
                                case 3:
                                    throw i = e.sent(), n53.default.error("Error retrieving list peers", i), new Error("Could not get list peers from the server." + i);
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        });
                    });
                }, r66;
            }();
            exports.API = s17;
        },
        {
            "./util": "BHXf",
            "./logger": "WOs9"
        }
    ],
    "Hxpd": [
        function(require, module, exports) {
            "use strict";
            var e130 = this && this.__extends || function() {
                var e131 = function(t87, n55) {
                    return (e131 = Object.setPrototypeOf || ({
                        __proto__: []
                    }) instanceof Array && function(e, t) {
                        e.__proto__ = t;
                    } || function(e, t) {
                        for(var n in t)Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    })(t87, n55);
                };
                return function(t, n) {
                    if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
                    function r() {
                        this.constructor = t;
                    }
                    e131(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r);
                };
            }(), t86 = this && this.__assign || function() {
                return (t86 = Object.assign || function(e) {
                    for(var t, n = 1, r = arguments.length; n < r; n++)for(var o in t = arguments[n])Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                }).apply(this, arguments);
            }, n54 = this && this.__values || function(e) {
                var t = "function" == typeof Symbol && Symbol.iterator, n = t && e[t], r = 0;
                if (n) return n.call(e);
                if (e && "number" == typeof e.length) return {
                    next: function() {
                        return e && r >= e.length && (e = void 0), {
                            value: e && e[r++],
                            done: !e
                        };
                    }
                };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
            }, r67 = this && this.__read || function(e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n) return e;
                var r, o, i = n.call(e), s = [];
                try {
                    for(; (void 0 === t || t-- > 0) && !(r = i.next()).done;)s.push(r.value);
                } catch (a) {
                    o = {
                        error: a
                    };
                } finally{
                    try {
                        r && !r.done && (n = i.return) && n.call(i);
                    } finally{
                        if (o) throw o.error;
                    }
                }
                return s;
            }, o26 = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.Peer = void 0;
            var i31 = require("eventemitter3"), s20 = require("./util"), a19 = o26(require("./logger")), c12 = require("./socket"), l6 = require("./mediaconnection"), u7 = require("./dataconnection"), d = require("./enums"), p4 = require("./api"), h1 = function() {
                return function() {
                };
            }(), f2 = function(o27) {
                function i32(e132, n) {
                    var r, c = o27.call(this) || this;
                    return c._id = null, c._lastServerId = null, c._destroyed = !1, c._disconnected = !1, c._open = !1, c._connections = new Map, c._lostMessages = new Map, e132 && e132.constructor == Object ? n = e132 : e132 && (r = e132.toString()), n = t86({
                        debug: 0,
                        host: s20.util.CLOUD_HOST,
                        port: s20.util.CLOUD_PORT,
                        path: "/",
                        key: i32.DEFAULT_KEY,
                        token: s20.util.randomToken(),
                        config: s20.util.defaultConfig
                    }, n), c._options = n, "/" === c._options.host && (c._options.host = window.location.hostname), c._options.path && ("/" !== c._options.path[0] && (c._options.path = "/" + c._options.path), "/" !== c._options.path[c._options.path.length - 1] && (c._options.path += "/")), void 0 === c._options.secure && c._options.host !== s20.util.CLOUD_HOST ? c._options.secure = s20.util.isSecure() : c._options.host == s20.util.CLOUD_HOST && (c._options.secure = !0), c._options.logFunction && a19.default.setLogFunction(c._options.logFunction), a19.default.logLevel = c._options.debug || 0, c._api = new p4.API(n), c._socket = c._createServerConnection(), s20.util.supports.audioVideo || s20.util.supports.data ? r && !s20.util.validateId(r) ? (c._delayedAbort(d.PeerErrorType.InvalidID, 'ID "' + r + '" is invalid'), c) : (r ? c._initialize(r) : c._api.retrieveId().then(function(e) {
                        return c._initialize(e);
                    }).catch(function(e) {
                        return c._abort(d.PeerErrorType.ServerError, e);
                    }), c) : (c._delayedAbort(d.PeerErrorType.BrowserIncompatible, "The current browser does not support WebRTC"), c);
                }
                return e130(i32, o27), Object.defineProperty(i32.prototype, "id", {
                    get: function() {
                        return this._id;
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(i32.prototype, "options", {
                    get: function() {
                        return this._options;
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(i32.prototype, "open", {
                    get: function() {
                        return this._open;
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(i32.prototype, "socket", {
                    get: function() {
                        return this._socket;
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(i32.prototype, "connections", {
                    get: function() {
                        var e, t, o = Object.create(null);
                        try {
                            for(var i = n54(this._connections), s = i.next(); !s.done; s = i.next()){
                                var a = r67(s.value, 2), c = a[0], l = a[1];
                                o[c] = l;
                            }
                        } catch (u) {
                            e = {
                                error: u
                            };
                        } finally{
                            try {
                                s && !s.done && (t = i.return) && t.call(i);
                            } finally{
                                if (e) throw e.error;
                            }
                        }
                        return o;
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(i32.prototype, "destroyed", {
                    get: function() {
                        return this._destroyed;
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(i32.prototype, "disconnected", {
                    get: function() {
                        return this._disconnected;
                    },
                    enumerable: !1,
                    configurable: !0
                }), i32.prototype._createServerConnection = function() {
                    var e = this, t88 = new c12.Socket(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.pingInterval);
                    return t88.on(d.SocketEventType.Message, function(t) {
                        e._handleMessage(t);
                    }), t88.on(d.SocketEventType.Error, function(t) {
                        e._abort(d.PeerErrorType.SocketError, t);
                    }), t88.on(d.SocketEventType.Disconnected, function() {
                        e.disconnected || (e.emitError(d.PeerErrorType.Network, "Lost connection to server."), e.disconnect());
                    }), t88.on(d.SocketEventType.Close, function() {
                        e.disconnected || e._abort(d.PeerErrorType.SocketClosed, "Underlying socket is already closed.");
                    }), t88;
                }, i32.prototype._initialize = function(e) {
                    this._id = e, this.socket.start(e, this._options.token);
                }, i32.prototype._handleMessage = function(e) {
                    var t, r, o = e.type, i = e.payload, s = e.src;
                    switch(o){
                        case d.ServerMessageType.Open:
                            this._lastServerId = this.id, this._open = !0, this.emit(d.PeerEventType.Open, this.id);
                            break;
                        case d.ServerMessageType.Error:
                            this._abort(d.PeerErrorType.ServerError, i.msg);
                            break;
                        case d.ServerMessageType.IdTaken:
                            this._abort(d.PeerErrorType.UnavailableID, 'ID "' + this.id + '" is taken');
                            break;
                        case d.ServerMessageType.InvalidKey:
                            this._abort(d.PeerErrorType.InvalidKey, 'API KEY "' + this._options.key + '" is invalid');
                            break;
                        case d.ServerMessageType.Leave:
                            a19.default.log("Received leave message from " + s), this._cleanupPeer(s), this._connections.delete(s);
                            break;
                        case d.ServerMessageType.Expire:
                            this.emitError(d.PeerErrorType.PeerUnavailable, "Could not connect to peer " + s);
                            break;
                        case d.ServerMessageType.Offer:
                            var c = i.connectionId;
                            if ((_ = this.getConnection(s, c)) && (_.close(), a19.default.warn("Offer received for existing Connection ID:" + c)), i.type === d.ConnectionType.Media) _ = new l6.MediaConnection(s, this, {
                                connectionId: c,
                                _payload: i,
                                metadata: i.metadata
                            }), this._addConnection(s, _), this.emit(d.PeerEventType.Call, _);
                            else {
                                if (i.type !== d.ConnectionType.Data) return void a19.default.warn("Received malformed connection type:" + i.type);
                                _ = new u7.DataConnection(s, this, {
                                    connectionId: c,
                                    _payload: i,
                                    metadata: i.metadata,
                                    label: i.label,
                                    serialization: i.serialization,
                                    reliable: i.reliable
                                }), this._addConnection(s, _), this.emit(d.PeerEventType.Connection, _);
                            }
                            var p = this._getMessages(c);
                            try {
                                for(var h = n54(p), f = h.next(); !f.done; f = h.next()){
                                    var y = f.value;
                                    _.handleMessage(y);
                                }
                            } catch (v) {
                                t = {
                                    error: v
                                };
                            } finally{
                                try {
                                    f && !f.done && (r = h.return) && r.call(h);
                                } finally{
                                    if (t) throw t.error;
                                }
                            }
                            break;
                        default:
                            if (!i) return void a19.default.warn("You received a malformed message from " + s + " of type " + o);
                            var _;
                            c = i.connectionId;
                            (_ = this.getConnection(s, c)) && _.peerConnection ? _.handleMessage(e) : c ? this._storeMessage(c, e) : a19.default.warn("You received an unrecognized message:", e);
                    }
                }, i32.prototype._storeMessage = function(e, t) {
                    this._lostMessages.has(e) || this._lostMessages.set(e, []), this._lostMessages.get(e).push(t);
                }, i32.prototype._getMessages = function(e) {
                    var t = this._lostMessages.get(e);
                    return t ? (this._lostMessages.delete(e), t) : [];
                }, i32.prototype.connect = function(e, t) {
                    if (void 0 === t && (t = {
                    }), this.disconnected) return a19.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."), void this.emitError(d.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
                    var n = new u7.DataConnection(e, this, t);
                    return this._addConnection(e, n), n;
                }, i32.prototype.call = function(e, t, n) {
                    if (void 0 === n && (n = {
                    }), this.disconnected) return a19.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."), void this.emitError(d.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
                    if (t) {
                        n._stream = t;
                        var r = new l6.MediaConnection(e, this, n);
                        return this._addConnection(e, r), r;
                    }
                    a19.default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
                }, i32.prototype._addConnection = function(e, t) {
                    a19.default.log("add connection " + t.type + ":" + t.connectionId + " to peerId:" + e), this._connections.has(e) || this._connections.set(e, []), this._connections.get(e).push(t);
                }, i32.prototype._removeConnection = function(e) {
                    var t = this._connections.get(e.peer);
                    if (t) {
                        var n = t.indexOf(e);
                        -1 !== n && t.splice(n, 1);
                    }
                    this._lostMessages.delete(e.connectionId);
                }, i32.prototype.getConnection = function(e, t) {
                    var r, o, i = this._connections.get(e);
                    if (!i) return null;
                    try {
                        for(var s = n54(i), a = s.next(); !a.done; a = s.next()){
                            var c = a.value;
                            if (c.connectionId === t) return c;
                        }
                    } catch (l) {
                        r = {
                            error: l
                        };
                    } finally{
                        try {
                            a && !a.done && (o = s.return) && o.call(s);
                        } finally{
                            if (r) throw r.error;
                        }
                    }
                    return null;
                }, i32.prototype._delayedAbort = function(e, t) {
                    var n = this;
                    setTimeout(function() {
                        n._abort(e, t);
                    }, 0);
                }, i32.prototype._abort = function(e, t) {
                    a19.default.error("Aborting!"), this.emitError(e, t), this._lastServerId ? this.disconnect() : this.destroy();
                }, i32.prototype.emitError = function(e, t) {
                    var n;
                    a19.default.error("Error:", t), (n = "string" == typeof t ? new Error(t) : t).type = e, this.emit(d.PeerEventType.Error, n);
                }, i32.prototype.destroy = function() {
                    this.destroyed || (a19.default.log("Destroy peer with ID:" + this.id), this.disconnect(), this._cleanup(), this._destroyed = !0, this.emit(d.PeerEventType.Close));
                }, i32.prototype._cleanup = function() {
                    var e, t;
                    try {
                        for(var r = n54(this._connections.keys()), o = r.next(); !o.done; o = r.next()){
                            var i = o.value;
                            this._cleanupPeer(i), this._connections.delete(i);
                        }
                    } catch (s) {
                        e = {
                            error: s
                        };
                    } finally{
                        try {
                            o && !o.done && (t = r.return) && t.call(r);
                        } finally{
                            if (e) throw e.error;
                        }
                    }
                    this.socket.removeAllListeners();
                }, i32.prototype._cleanupPeer = function(e) {
                    var t, r, o = this._connections.get(e);
                    if (o) try {
                        for(var i = n54(o), s = i.next(); !s.done; s = i.next())s.value.close();
                    } catch (a) {
                        t = {
                            error: a
                        };
                    } finally{
                        try {
                            s && !s.done && (r = i.return) && r.call(i);
                        } finally{
                            if (t) throw t.error;
                        }
                    }
                }, i32.prototype.disconnect = function() {
                    if (!this.disconnected) {
                        var e = this.id;
                        a19.default.log("Disconnect peer with ID:" + e), this._disconnected = !0, this._open = !1, this.socket.close(), this._lastServerId = e, this._id = null, this.emit(d.PeerEventType.Disconnected, e);
                    }
                }, i32.prototype.reconnect = function() {
                    if (this.disconnected && !this.destroyed) a19.default.log("Attempting reconnection to server with ID " + this._lastServerId), this._disconnected = !1, this._initialize(this._lastServerId);
                    else {
                        if (this.destroyed) throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
                        if (this.disconnected || this.open) throw new Error("Peer " + this.id + " cannot reconnect because it is not disconnected from the server!");
                        a19.default.error("In a hurry? We're still trying to make the initial connection!");
                    }
                }, i32.prototype.listAllPeers = function(e133) {
                    var t89 = this;
                    void 0 === e133 && (e133 = function(e) {
                    }), this._api.listAllPeers().then(function(t) {
                        return e133(t);
                    }).catch(function(e) {
                        return t89._abort(d.PeerErrorType.ServerError, e);
                    });
                }, i32.DEFAULT_KEY = "peerjs", i32;
            }(i31.EventEmitter);
            exports.Peer = f2;
        },
        {
            "eventemitter3": "JJlS",
            "./util": "BHXf",
            "./logger": "WOs9",
            "./socket": "wJlv",
            "./mediaconnection": "dbHP",
            "./dataconnection": "GBTQ",
            "./enums": "ZRYf",
            "./api": "in7L"
        }
    ],
    "iTK6": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.peerjs = void 0;
            var e = require("./util"), r = require("./peer");
            exports.peerjs = {
                Peer: r.Peer,
                util: e.util
            }, exports.default = r.Peer, window.peerjs = exports.peerjs, window.Peer = r.Peer;
        },
        {
            "./util": "BHXf",
            "./peer": "Hxpd"
        }
    ]
}, {
}, [
    "iTK6"
], null) //# sourceMappingURL=/peerjs.min.js.map
;

},{}],"dczPN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DisclosureNav", ()=>DisclosureNav
);
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   Supplemental JS for the disclosure menu keyboard behavior
 */ 'use strict';
class DisclosureNav {
    constructor(domNode){
        this.rootNode = domNode;
        this.controlledNodes = [];
        this.openIndex = null;
        this.useArrowKeys = true;
        this.topLevelNodes = [
            ...this.rootNode.querySelectorAll('.main-link, button[aria-expanded][aria-controls]'), 
        ];
        this.topLevelNodes.forEach((node)=>{
            // handle button + menu
            if (node.tagName.toLowerCase() === 'button' && node.hasAttribute('aria-controls')) {
                const menu = node.parentNode.querySelector('ul');
                if (menu) {
                    // save ref controlled menu
                    this.controlledNodes.push(menu);
                    // collapse menus
                    node.setAttribute('aria-expanded', 'false');
                    this.toggleMenu(menu, false);
                    // attach event listeners
                    menu.addEventListener('keydown', this.onMenuKeyDown.bind(this));
                    node.addEventListener('click', this.onButtonClick.bind(this));
                    node.addEventListener('keydown', this.onButtonKeyDown.bind(this));
                }
            } else {
                this.controlledNodes.push(null);
                node.addEventListener('keydown', this.onLinkKeyDown.bind(this));
            }
        });
        this.rootNode.addEventListener('focusout', this.onBlur.bind(this));
    }
    controlFocusByKey(keyboardEvent, nodeList, currentIndex) {
        switch(keyboardEvent.key){
            case 'ArrowUp':
            case 'ArrowLeft':
                keyboardEvent.preventDefault();
                if (currentIndex > -1) {
                    var prevIndex = Math.max(0, currentIndex - 1);
                    nodeList[prevIndex].focus();
                }
                break;
            case 'ArrowDown':
            case 'ArrowRight':
                keyboardEvent.preventDefault();
                if (currentIndex > -1) {
                    var nextIndex = Math.min(nodeList.length - 1, currentIndex + 1);
                    nodeList[nextIndex].focus();
                }
                break;
            case 'Home':
                keyboardEvent.preventDefault();
                nodeList[0].focus();
                break;
            case 'End':
                keyboardEvent.preventDefault();
                nodeList[nodeList.length - 1].focus();
                break;
        }
    }
    // public function to close open menu
    close() {
        this.toggleExpand(this.openIndex, false);
    }
    onBlur(event) {
        var menuContainsFocus = this.rootNode.contains(event.relatedTarget);
        if (!menuContainsFocus && this.openIndex !== null) this.toggleExpand(this.openIndex, false);
    }
    onButtonClick(event) {
        var button = event.target;
        var buttonIndex = this.topLevelNodes.indexOf(button);
        var buttonExpanded = button.getAttribute('aria-expanded') === 'true';
        this.toggleExpand(buttonIndex, !buttonExpanded);
    }
    onButtonKeyDown(event) {
        var targetButtonIndex = this.topLevelNodes.indexOf(document.activeElement);
        // close on escape
        if (event.key === 'Escape') this.toggleExpand(this.openIndex, false);
        else if (this.useArrowKeys && this.openIndex === targetButtonIndex && event.key === 'ArrowDown') {
            event.preventDefault();
            this.controlledNodes[this.openIndex].querySelector('a').focus();
        } else if (this.useArrowKeys) this.controlFocusByKey(event, this.topLevelNodes, targetButtonIndex);
    }
    onLinkKeyDown(event) {
        var targetLinkIndex = this.topLevelNodes.indexOf(document.activeElement);
        // handle arrow key navigation between top-level buttons, if set
        if (this.useArrowKeys) this.controlFocusByKey(event, this.topLevelNodes, targetLinkIndex);
    }
    onMenuKeyDown(event) {
        if (this.openIndex === null) return;
        var menuLinks = Array.prototype.slice.call(this.controlledNodes[this.openIndex].querySelectorAll('a'));
        var currentIndex = menuLinks.indexOf(document.activeElement);
        // close on escape
        if (event.key === 'Escape') {
            this.topLevelNodes[this.openIndex].focus();
            this.toggleExpand(this.openIndex, false);
        } else if (this.useArrowKeys) this.controlFocusByKey(event, menuLinks, currentIndex);
    }
    toggleExpand(index, expanded) {
        // close open menu, if applicable
        if (this.openIndex !== index) this.toggleExpand(this.openIndex, false);
        // handle menu at called index
        if (this.topLevelNodes[index]) {
            this.openIndex = expanded ? index : null;
            this.topLevelNodes[index].setAttribute('aria-expanded', expanded);
            this.toggleMenu(this.controlledNodes[index], expanded);
        }
    }
    toggleMenu(domNode, show) {
        if (domNode) domNode.style.display = show ? 'block' : 'none';
    }
    updateKeyControls(useArrowKeys) {
        this.useArrowKeys = useArrowKeys;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["g9TDx","1SICI"], "1SICI", "parcelRequire8802")

//# sourceMappingURL=index.18dbc454.js.map
