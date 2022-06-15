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
            var F = function F() {};
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
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
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
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
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
    bundle.hotData = {};
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
var _constsJs = require("./consts.js");
var _inspect = require("@xstate/inspect");
var _gamepadJs = require("./gamepad.js");
var _utilJs = require("./util.js");
var _uiJs = require("./ui.js");
// import { stop } from "xstate/lib/actions";
var _siteInit = require("./siteInit");
var _rovConnectionMachine = require("./rovConnectionMachine");
var _thisPeerSetupMachineJs = require("./thisPeerSetupMachine.js");
var _rovMediaChannelMachine = require("./rovMediaChannelMachine");
let globalContext = {
    debugXstateMode: !!_utilJs.getURLQueryStringVariable("debug"),
    peerServerConfig: {},
    rovIpAddr: "",
    rovPeerIdEndNumber: parseInt(localStorage.getItem("rovPeerIdEndNumber") || 0),
    attemptingNewRovPeerId: false,
    thisPeer: null
};
/* init gamepad support */ new _gamepadJs.GamepadController();
// Show the rov name in the ui:
_uiJs.setCurrentRovName(_constsJs.ROV_PEERID_BASE + globalContext.rovPeerIdEndNumber);
// Show the xstate inspector if the debug query string is present
if (globalContext.debugXstateMode) _inspect.inspect({
    iframe: false
});
_siteInit.runSiteInitMachine(globalContext, (eventName1)=>{
    _uiJs.hideLoadingUi("internet-check");
    console.log("siteInit: ", eventName1);
    const RovMediaChannelMachine = _rovMediaChannelMachine.startRovMediaChannelMachine(globalContext);
    const RovConnectionMachine = _rovConnectionMachine.startRovConnectionMachine(globalContext, (eventName)=>{
        console.log("rovConnectionMachine: ", eventName);
        if (eventName === "ROV_CONNECTION_FAILED") {
            _uiJs.showToastMessage("ROV Connection Failed");
            _uiJs.showROVDisconnectedUi();
        } else if (eventName === "ROV_DATACHANNEL_OPEN") RovMediaChannelMachine.send("ROV_CONNECTION_READY");
    });
    const ThisPeerSetupMachine = _thisPeerSetupMachineJs.startThisPeerSetupMachine(globalContext, (eventName)=>{
        console.log("ThisPeerSetupMachine: ", eventName);
        RovConnectionMachine.send(eventName); // EventName WILL BE EITHER: "THIS_PEER_DESTROYED", "THIS_PEER_READY";
    });
    _uiJs.setupConnectBtnClickHandler(()=>{
        RovConnectionMachine.send("DO_CONNECT");
    });
    _uiJs.setupDisconnectBtnClickHandler(()=>{
        RovConnectionMachine.send("DO_DISCONNECT");
        RovMediaChannelMachine.send("DO_DISCONNECT");
    });
    const switchToNextRovPeerId = ()=>{
        globalContext.rovPeerIdEndNumber++;
        _uiJs.setCurrentRovName(_constsJs.ROV_PEERID_BASE + globalContext.rovPeerIdEndNumber);
        localStorage.setItem("rovPeerIdEndNumber", globalContext.rovPeerIdEndNumber);
        RovConnectionMachine.send("DO_DISCONNECT");
        RovMediaChannelMachine.send("DO_DISCONNECT");
    // RovConnectionMachine.send("DO_CONNECT");
    };
    const switchToPrevRovPeerId = ()=>{
        globalContext.rovPeerIdEndNumber = Math.max(0, globalContext.rovPeerIdEndNumber - 1);
        _uiJs.setCurrentRovName(_constsJs.ROV_PEERID_BASE + globalContext.rovPeerIdEndNumber);
        localStorage.setItem("rovPeerIdEndNumber", globalContext.rovPeerIdEndNumber);
        RovConnectionMachine.send("DO_DISCONNECT");
        RovMediaChannelMachine.send("DO_DISCONNECT");
    // RovConnectionMachine.send("DO_CONNECT");
    };
    _uiJs.setupSwitchRovBtnClickHandlers(switchToPrevRovPeerId, switchToNextRovPeerId);
});

},{"./consts.js":"2J0f1","@xstate/inspect":"39FuP","./gamepad.js":"2YxSr","./util.js":"doATT","./ui.js":"efi6n","./siteInit":"8TXLV","./rovConnectionMachine":"aaTha","./thisPeerSetupMachine.js":"2lhJt","./rovMediaChannelMachine":"jNZ32"}],"2J0f1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ROV_PEERID_BASE", ()=>ROV_PEERID_BASE
);
parcelHelpers.export(exports, "peerServerCloudOptions", ()=>peerServerCloudOptions
);
parcelHelpers.export(exports, "peerServerLocalOptions", ()=>peerServerLocalOptions
);
parcelHelpers.export(exports, "LOADING_MESSAGES", ()=>LOADING_MESSAGES
);
parcelHelpers.export(exports, "GAME_CONTROLLER_BUTTON_CONFIG", ()=>GAME_CONTROLLER_BUTTON_CONFIG
);
parcelHelpers.export(exports, "ONSCREEN_GPAD_BUTTON_LABELS", ()=>ONSCREEN_GPAD_BUTTON_LABELS
);
parcelHelpers.export(exports, "ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS", ()=>ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS
);
parcelHelpers.export(exports, "ONSCREEN_GPAD_BUTTON_PRESSED_CLASS", ()=>ONSCREEN_GPAD_BUTTON_PRESSED_CLASS
);
const ROV_PEERID_BASE = "go-relay-";
const peerServerCloudOptions = {
    host: "0.peerjs.com",
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
const LOADING_MESSAGES = {
    "default": "Loading...",
    "ip-scan": "Scanning for ROV IP address...",
    "internet-check": "Checking internet access...",
    "server-connecting": "Connecting to peer server...",
    "server-reconnecting": "Reconnecting to peer server...",
    "webrtc-connecting": "Searching for ROV...",
    "webrtc-reconnecting": "Reconnecting to ROV...",
    "reloading-site": "Reloading site...",
    "awaiting-video-call": "Waiting for livestream...",
    "awaiting-rov-reconnect": "Waiting for ROV to reconnect..."
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

},{}],"39FuP":[function(require,module,exports) {
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
    var withDefaults = _tslibJs.__assign(_tslibJs.__assign({}, defaultInspectorOptions), options);
    return _tslibJs.__assign(_tslibJs.__assign({}, withDefaults), {
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
            var inspectEvent = _tslibJs.__assign(_tslibJs.__assign({}, event.data), {
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
    var _a = options || {}, _b = _a.window, ownWindow = _b === void 0 ? window : _b, _c = _a.targetWindow, targetWindow = _c === void 0 ? window.self === window.top ? window.opener : window.parent : _c;
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2sk4t":[function(require,module,exports) {
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
        if (_utilsJs.isFunction(exec)) actionObject = _tslibJs.__assign(_tslibJs.__assign({}, action), {
            exec: exec
        });
        else if (exec) {
            var actionType = exec.type || action.type;
            actionObject = _tslibJs.__assign(_tslibJs.__assign(_tslibJs.__assign({}, exec), action), {
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
    return _tslibJs.__assign(_tslibJs.__assign({}, action), {
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
    return send(event, _tslibJs.__assign(_tslibJs.__assign({}, options), {
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
    return send(event, _tslibJs.__assign(_tslibJs.__assign({}, options), {
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
    return send(event, _tslibJs.__assign(_tslibJs.__assign({}, options), {
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
    return _tslibJs.__assign(_tslibJs.__assign({}, action), {
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
    }, _tslibJs.__assign(_tslibJs.__assign({}, options), {
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
    }, _tslibJs.__assign(_tslibJs.__assign({}, options), {
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
                    resolvedActionObject = _tslibJs.__assign(_tslibJs.__assign({}, resolvedActionObject), {
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
    var t = {};
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
})(ActionTypes || (ActionTypes = {}));
var SpecialTargets;
(function(SpecialTargets1) {
    SpecialTargets1["Parent"] = "#_parent";
    SpecialTargets1["Internal"] = "#_internal";
})(SpecialTargets || (SpecialTargets = {}));

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
    var value = {};
    var marker = value;
    for(var i = 0; i < statePath.length - 1; i++)if (i === statePath.length - 2) marker[statePath[i]] = statePath[i + 1];
    else {
        marker[statePath[i]] = {};
        marker = marker[statePath[i]];
    }
    return value;
}
function mapValues(collection, iteratee) {
    var result = {};
    var collectionKeys = Object.keys(collection);
    for(var i = 0; i < collectionKeys.length; i++){
        var key = collectionKeys[i];
        result[key] = iteratee(collection[key], key, collection, i);
    }
    return result;
}
function mapFilterValues(collection, iteratee, predicate) {
    var e_1, _a1;
    var result = {};
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
    var result = {};
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
                marker[subPath] = marker[subPath] || {};
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
    var result = {};
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
        var partialUpdate = {};
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
        return Object.assign({}, acc, partialUpdate);
    }, context) : context;
    return updatedContext;
} // tslint:disable-next-line:no-empty
var warn = function() {};
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
var interopSymbols = (_a = {}, _a[symbolObservable] = function() {
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
        return _tslibJs.__assign(_tslibJs.__assign({}, transitionLike), {
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
var EMPTY_ACTIVITY_MAP = {};
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
})(InterpreterStatus || (InterpreterStatus = {}));
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
        this.delayedEventsMap = {};
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
            target.send(_tslibJs.__assign(_tslibJs.__assign({}, event), {
                name: event.name === _actionTypesJs.error ? "".concat(_actionsJs.error(_this.id)) : event.name,
                origin: _this.sessionId
            }));
            else // Send normal events to other targets
            target.send(event.data);
        };
        var resolvedOptions = _tslibJs.__assign(_tslibJs.__assign({}, Interpreter1.defaultOptions), options);
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
        else if (_utilsJs.isMachine(entity)) return this.spawnMachine(entity, _tslibJs.__assign(_tslibJs.__assign({}, options), {
            id: name
        }));
        else if (_utilsJs.isBehavior(entity)) return this.spawnBehavior(entity, name);
        else throw new Error("Unable to spawn entity \"".concat(name, "\" of type \"").concat(typeof entity, "\"."));
    };
    Interpreter1.prototype.spawnMachine = function(machine, options) {
        var _this = this;
        if (options === void 0) options = {};
        var childService = new Interpreter1(machine, _tslibJs.__assign(_tslibJs.__assign({}, this.options), {
            parent: this,
            id: options.id || machine.id
        }));
        var resolvedOptions = _tslibJs.__assign(_tslibJs.__assign({}, DEFAULT_SPAWN_OPTIONS), options);
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
    if (_utilsJs.isString(nameOrOptions)) return _tslibJs.__assign(_tslibJs.__assign({}, DEFAULT_SPAWN_OPTIONS), {
        name: nameOrOptions
    });
    return _tslibJs.__assign(_tslibJs.__assign(_tslibJs.__assign({}, DEFAULT_SPAWN_OPTIONS), {
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
    var boundAction = _tslibJs.__assign(_tslibJs.__assign({}, action), {
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
        this.meta = {};
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
                meta: {},
                events: [],
                configuration: [],
                transitions: [],
                children: {}
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
            children: {}
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
                children: {}
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
        return _tslibJs.__assign(_tslibJs.__assign({}, jsonValues), {
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
    if (!childStateNodes) return {}; // todo: fix?
    if (baseNode.type === 'compound') {
        var childStateNode = childStateNodes[0];
        if (childStateNode) {
            if (isLeafNode(childStateNode)) return childStateNode.key;
        } else return {};
    }
    var stateValue = {};
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
    }, {});
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
        this.options = _tslibJs.__assign(_tslibJs.__assign({}, defaultOptions), options);
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
    if (options === void 0) options = {};
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
var EMPTY_OBJECT = {};
var isStateId = function(str) {
    return str[0] === STATE_IDENTIFIER;
};
var createDefaultOptions = function() {
    return {
        actions: {},
        guards: {},
        services: {},
        activities: {},
        delays: {}
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
            candidates: {},
            delayedTransitions: undefined
        };
        this.idMap = {};
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
        this.schema = this.parent ? this.machine.schema : (_a1 = this.config.schema) !== null && _a1 !== void 0 ? _a1 : {};
        this.description = this.config.description;
        if (!_environmentJs.IS_PRODUCTION) _utilsJs.warn(!('parallel' in this.config), "The \"parallel\" property is deprecated and will be removed in version 4.1. ".concat(this.config.parallel ? "Replace with `type: 'parallel'`" : "Use `type: '".concat(this.type, "'`"), " in the config for state node '").concat(this.id, "' instead."));
        this.initial = this.config.initial;
        this.states = this.config.states ? _utilsJs.mapValues(this.config.states, function(stateConfig, key) {
            var _a;
            var stateNode = new StateNode1(stateConfig, {}, undefined, {
                parent: _this,
                key: key
            });
            Object.assign(_this.idMap, _tslibJs.__assign((_a = {}, _a[stateNode.id] = stateNode, _a), stateNode.idMap));
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
                _this.machine.options.services = _tslibJs.__assign((_a = {}, _a[invokeId] = invokeConfig, _a), _this.machine.options.services);
                return _invokeUtilsJs.toInvokeDefinition({
                    src: invokeId,
                    id: invokeId
                });
            } else if (_utilsJs.isString(invokeConfig.src)) {
                var invokeId = invokeConfig.id || _utilsJs.createInvokeId(_this.id, i);
                return _invokeUtilsJs.toInvokeDefinition(_tslibJs.__assign(_tslibJs.__assign({}, invokeConfig), {
                    id: invokeId,
                    src: invokeConfig.src
                }));
            } else if (_utilsJs.isMachine(invokeConfig.src) || _utilsJs.isFunction(invokeConfig.src)) {
                var invokeId = invokeConfig.id || _utilsJs.createInvokeId(_this.id, i);
                _this.machine.options.services = _tslibJs.__assign((_b = {}, _b[invokeId] = invokeConfig.src, _b), _this.machine.options.services);
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
            actions: _tslibJs.__assign(_tslibJs.__assign({}, actions), options.actions),
            activities: _tslibJs.__assign(_tslibJs.__assign({}, activities), options.activities),
            guards: _tslibJs.__assign(_tslibJs.__assign({}, guards), options.guards),
            services: _tslibJs.__assign(_tslibJs.__assign({}, services), options.services),
            delays: _tslibJs.__assign(_tslibJs.__assign({}, delays), options.delays)
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
            }, {});
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
            return _tslibJs.__assign(_tslibJs.__assign({}, transition), {
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
                return _tslibJs.__assign(_tslibJs.__assign({}, transition), {
                    event: eventType,
                    delay: resolvedDelay
                });
            });
        }));
        return delayedTransitions.map(function(delayedTransition) {
            var delay = delayedTransition.delay;
            return _tslibJs.__assign(_tslibJs.__assign({}, _this.formatTransition(delayedTransition)), {
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
            return initialStateValue !== undefined ? this.getStateNodes((_a = {}, _a[stateValue] = initialStateValue, _a)) : [
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
        return new _stateJs.State(_tslibJs.__assign(_tslibJs.__assign({}, stateFromConfig), {
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
        var transitionMap = {};
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
        var activities = currentState ? _tslibJs.__assign({}, currentState.activities) : {};
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
        }, currentState ? _tslibJs.__assign({}, currentState.children) : {});
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
            activities: resolvedStateValue ? activities : currentState ? currentState.activities : {},
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
                    if (subStateNode.type === 'parallel' || subStateNode.type === 'compound') return _a = {}, _a[stateValue] = subStateNode.initialStateValue, _a;
                    return stateValue;
                }
                if (!Object.keys(stateValue).length) return this.initialStateValue || {};
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
                initialStateValue = _stateUtilsJs.isLeafNode(this.states[this.initial]) ? this.initial : (_a = {}, _a[this.initial] = this.states[this.initial].initialStateValue, _a);
            } else // The finite state value of a machine without child states is just an empty object
            initialStateValue = {};
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
        var transition = _tslibJs.__assign(_tslibJs.__assign({}, transitionConfig), {
            actions: _actionsJs.toActionObjects(_utilsJs.toArray(transitionConfig.actions)),
            cond: _utilsJs.toGuard(transitionConfig.cond, guards),
            target: target,
            source: this,
            internal: internal,
            eventType: transitionConfig.event,
            toJSON: function() {
                return _tslibJs.__assign(_tslibJs.__assign({}, transition), {
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
            return _tslibJs.__assign(_tslibJs.__assign({}, invokeDef), {
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
            pendingConnection: {},
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
    var selected = {};
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
    return _utilsJs.stringify(_tslibJs.__assign(_tslibJs.__assign({}, value), serialized));
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
            return _tslibJs.__assign(_tslibJs.__assign({}, event), {
                event: JSON.parse(event.event)
            });
        case 'service.register':
            return _tslibJs.__assign(_tslibJs.__assign({}, event), {
                machine: _xstate.createMachine(JSON.parse(event.machine)),
                state: parseState(event.state)
            });
        case 'service.state':
            return _tslibJs.__assign(_tslibJs.__assign({}, event), {
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
            var tmp = {};
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
    constructor(buttonHandlers, axisChangedHandler){
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
        var pointerToJoystickMapping = {};
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
    if (generatorOptions === void 0) generatorOptions = {};
    var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference1, popper1, options1) {
        if (options1 === void 0) options1 = defaultOptions;
        var state1 = {
            placement: 'bottom',
            orderedModifiers: [],
            options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
            modifiersData: {},
            elements: {
                reference: reference1,
                popper: popper1
            },
            attributes: {},
            styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
            state: state1,
            setOptions: function setOptions(setOptionsAction) {
                var options = typeof setOptionsAction === 'function' ? setOptionsAction(state1.options) : setOptionsAction;
                cleanupModifierEffects();
                state1.options = Object.assign({}, defaultOptions, state1.options, options);
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
                    return state1.modifiersData[modifier.name] = Object.assign({}, modifier.data);
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
                    var _state$orderedModifie = state1.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
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
                var name = _ref3.name, _ref3$options = _ref3.options, options = _ref3$options === void 0 ? {} : _ref3$options, effect = _ref3.effect;
                if (typeof effect === 'function') {
                    var cleanupFn = effect({
                        state: state1,
                        name: name,
                        instance: instance,
                        options: options
                    });
                    var noopFn = function noopFn() {};
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
        merged[current.name] = existing ? Object.assign({}, existing, current, {
            options: Object.assign({}, existing.options, current.options),
            data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged;
    }, {}); // IE11 does not support Object.values
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
    if (options === void 0) options = {};
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
    var popperClientRect = _rectToClientRectJsDefault.default(Object.assign({}, popperRect, popperOffsets));
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
    return Object.assign({}, rect, {
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
    return Object.assign({}, _getFreshSideObjectJsDefault.default(), paddingObject);
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
    }, {});
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
    fn: function fn() {},
    effect: effect,
    data: {}
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
    data: {}
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
        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }
    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
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
    if (state.modifiersData.popperOffsets != null) state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
    })));
    if (state.modifiersData.arrow != null) state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
    })));
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-placement': state.placement
    });
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
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
        var style = state.styles[name1] || {};
        var attributes = state.attributes[name1] || {};
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
        reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
    return function() {
        Object.keys(state.elements).forEach(function(name) {
            var element = state.elements[name];
            var attributes = state.attributes[name] || {};
            var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them
            var style1 = styleProperties.reduce(function(style, property) {
                style[property] = '';
                return style;
            }, {}); // arrow is optional + virtual elements
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
    if (options === void 0) options = {};
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
    }, {});
    return Object.keys(overflows).sort(function(a, b) {
        return overflows[a] - overflows[b];
    });
}
exports.default = computeAutoPlacement;

},{"./getVariation.js":"hIo7Y","../enums.js":"lCAq5","./detectOverflow.js":"ltCuw","./getBasePlacement.js":"59Wp3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jRoqP":[function(require,module,exports) {
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
        navigator.gamepadInputEmulation = "gamepad"; // Microsoft edge fix
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
            let buttonConfig = this.buttonConfig[bi] || {};
            let btnChangeMask = {};
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
// ----- Simple Element Generators -----
parcelHelpers.export(exports, "createButtons", ()=>createButtons
);
parcelHelpers.export(exports, "createTitle", ()=>createTitle
);
parcelHelpers.export(exports, "showBackdrop", ()=>showBackdrop
);
parcelHelpers.export(exports, "hideBackdrop", ()=>hideBackdrop
);
// -----  Toast Notifications -----
parcelHelpers.export(exports, "showToastMessage", ()=>showToastMessage
);
// -----  Toastify Based Dialogs -----
parcelHelpers.export(exports, "showToastDialog", ()=>showToastDialog
);
parcelHelpers.export(exports, "showPasswordPrompt", ()=>showPasswordPrompt
);
parcelHelpers.export(exports, "showScrollableTextPopup", ()=>showScrollableTextPopup
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
parcelHelpers.export(exports, "hideRovConnectionBar", ()=>hideRovConnectionBar
);
parcelHelpers.export(exports, "showRovConnectionBar", ()=>showRovConnectionBar
);
parcelHelpers.export(exports, "setCurrentRovName", ()=>setCurrentRovName
);
parcelHelpers.export(exports, "setupConnectBtnClickHandler", ()=>setupConnectBtnClickHandler
);
parcelHelpers.export(exports, "setupDisconnectBtnClickHandler", ()=>setupDisconnectBtnClickHandler
);
parcelHelpers.export(exports, "setupSwitchRovBtnClickHandlers", ()=>setupSwitchRovBtnClickHandlers
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
parcelHelpers.export(exports, "setClientPeerIdDisplay", ()=>setClientPeerIdDisplay
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
 //             // this.document.getElementById("rov_connection_bar").innerHTML = "tiltLR: " + tiltLR + " tiltFB: " + (tiltFB - 90);
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
var _utils = require("xstate/lib/utils");
var _consts = require("./consts");
function createButtons(btnNames, callback) {
    return btnNames.map((btnName)=>{
        const btn = document.createElement("button");
        btn.innerHTML = btnName;
        btn.dataset.name = btnName;
        btn.addEventListener("click", ()=>callback(btnName)
        );
        return btn;
    });
}
function createTitle(titleName) {
    const msg = document.createElement("h4");
    msg.innerText = titleName;
    return msg;
}
// -----  White Backdrop -----
const backdrop = document.getElementById("backdrop");
let backdropClickCallback = null;
function showBackdrop(callback) {
    backdrop.classList.remove("hidden");
    backdropClickCallback = function() {
        if (callback) callback(null);
        hideBackdrop();
    };
    backdrop.addEventListener("click", backdropClickCallback);
}
function hideBackdrop() {
    backdrop.classList.add("hidden");
    backdrop.removeEventListener("click", backdropClickCallback);
}
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
function showToastDialog(htmlElements, options, exraClassNames) {
    const toast = _toastifyJsDefault.default(Object.assign({
        text: " ",
        duration: 15000,
        close: false,
        className: "dialog-toast",
        gravity: "top",
        position: "center",
        stopOnFocus: true
    }, options)).showToast();
    htmlElements.forEach((e)=>{
        console.log(e);
        toast.toastElement.appendChild(e);
    });
    if (exraClassNames && _utils.isArray(exraClassNames)) exraClassNames.forEach((name)=>{
        toast.toastElement.classList.add(name);
    });
    return toast;
}
function showPasswordPrompt(message, callback) {
    let toast = null;
    const title = createTitle(message);
    const input = document.createElement("input");
    input.type = "password";
    input.placeholder = "Password";
    const btns = createButtons([
        "Ok",
        "Cancel"
    ], (chosenButton)=>{
        hideBackdrop();
        toast.hideToast();
        if (callback && chosenButton == "Ok") callback(input.value);
        else if (callback) callback(null);
    });
    toast = showToastDialog([
        title,
        input
    ].concat(btns), {
        gravity: "bottom",
        duration: -1
    }, [
        "password-prompt"
    ]);
    showBackdrop(()=>{
        toast.hideToast();
        hideBackdrop();
        if (callback) callback(null);
    });
    return toast;
}
function showScrollableTextPopup(title, callback) {
    let toast = null;
    const titleElm = createTitle(title);
    const content = document.createElement("pre");
    const closeFunc = ()=>{
        toast.hideToast();
        hideBackdrop();
        if (callback) callback(null);
    };
    const btns = createButtons([
        "Close"
    ], closeFunc);
    toast = showToastDialog([
        titleElm,
        content
    ].concat(btns), {
        gravity: "bottom",
        duration: -1
    }, [
        "scrollable-text-popup"
    ]);
    showBackdrop(closeFunc);
    return (textLine)=>{
        content.appendChild(document.createTextNode(textLine));
        // keep scrolling down as new content is added (unless the user has scrolled up / is no longer at the bottom)
        if (content.scrollTop + content.clientHeight + 100 > content.scrollHeight) content.scrollTop = content.scrollHeight;
    };
}
function showChoiceDialog(title, buttons, callback) {
    let toast = null;
    const titleElm = createTitle(title);
    const closeFunc = ()=>{
        hideBackdrop();
        toast.hideToast();
    };
    const btns = createButtons([
        ...buttons,
        "Cancel"
    ], (chosenButton)=>{
        console.log("here");
        closeFunc();
        callback(chosenButton);
    });
    toast = showToastDialog([
        titleElm
    ].concat(btns), {
        gravity: "bottom",
        duration: -1
    }, [
        "choice-popup"
    ]);
    showBackdrop(closeFunc);
    return toast;
}
const connectBtn = document.getElementById('connect_btn');
const disconnectBtn = document.getElementById('disconnect_btn');
const connectedRovLabel = document.getElementById('connected_rov_label');
const rovConnectionBar = document.getElementById('rov_connection_bar');
function showROVDisconnectedUi() {
    connectBtn.style.display = 'block';
    disconnectBtn.style.display = 'none';
    hideLoadingUi("all");
    showRovConnectionBar();
}
function showROVConnectingUi(rovPeerId) {
    connectBtn.style.display = 'none';
    showLoadingUi("webrtc-connecting", "Searching for " + rovPeerId);
    hideRovConnectionBar();
}
function showROVConnectedUi() {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = 'block';
    hideLoadingUi("webrtc-connecting");
    hideLoadingUi("webrtc-reconnecting");
    showRovConnectionBar();
}
function showReloadingWebsiteUi() {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = 'none';
    connectedRovLabel.parentElement.parentElement.classList.add('hidden');
    showLoadingUi("reloading-site");
}
function hideRovConnectionBar() {
    rovConnectionBar.classList.add('hidden');
}
function showRovConnectionBar() {
    rovConnectionBar.classList.remove('hidden');
}
function setCurrentRovName(name) {
    connectBtn.innerText = "Connect to " + name;
    connectedRovLabel.innerText = name;
}
function setupConnectBtnClickHandler(callback) {
    connectBtn.addEventListener('click', callback);
    return ()=>{
        connectBtn.removeEventListener('click', callback);
    };
}
function setupDisconnectBtnClickHandler(callback) {
    disconnectBtn.addEventListener('click', callback);
    return ()=>{
        disconnectBtn.removeEventListener('click', callback);
    };
}
const switchToPrevRovBtn = document.getElementById('switch_to_prev_rov_btn');
const switchToNextRovBtn = document.getElementById('switch_to_next_rov_btn');
function setupSwitchRovBtnClickHandlers(prevRovCallback, nextRovCallback) {
    switchToPrevRovBtn.addEventListener('click', prevRovCallback);
    switchToNextRovBtn.addEventListener('click', nextRovCallback);
    return ()=>{
        switchToPrevRovBtn.removeEventListener('click', prevRovCallback);
        switchToNextRovBtn.removeEventListener('click', nextRovCallback);
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
let loadingStack = {};
function showLoadingUi(loadingMsgId, loadingMessage) {
    const message = loadingStack[loadingMsgId] = loadingMessage || _consts.LOADING_MESSAGES[loadingMsgId] || _consts.LOADING_MESSAGES["default"];
    loadingIndicator.style.display = 'block';
    loadingIndicatorText.innerHTML = message;
}
function hideLoadingUi(loadingMsgId) {
    // remove the loading message from the stack
    delete loadingStack[loadingMsgId];
    // if there are no more messages in the stack, hide the loading indicator, otherwise show the top message
    const loadingStackIds = Object.keys(loadingStack);
    if (loadingMsgId == "all" || loadingStackIds.length == 0) {
        loadingIndicator.style.display = 'none';
        loadingStack = {};
        console.log("here", loadingMsgId);
    } else {
        const msg = loadingStack[loadingStackIds[loadingStackIds.length - 1]];
        loadingIndicatorText.innerHTML = msg || _consts.LOADING_MESSAGES["default"];
    }
}
const livestreamContainer = document.getElementById("livestream_container");
function showLivestreamUi() {
    livestreamContainer.style.display = 'block';
}
function hideLivestreamUi() {
    livestreamContainer.style.display = 'none';
}
const clientPeerIdLabel = document.getElementById("client_peer_id_label");
function setClientPeerIdDisplay(clientPeerId) {
    clientPeerIdLabel.innerText = clientPeerId;
}
const roleDisplayText = document.getElementById('role_display_text');
const takeControlButton = document.getElementById('take_control_btn');
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

},{"toastify-js":"96k49","xstate/lib/utils":"8RFz3","./consts":"2J0f1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"96k49":[function(require,module,exports) {
/*!
 * Toastify js 1.11.2
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */ (function(root, factory) {
    if (module.exports) module.exports = factory();
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
        callback: function() {},
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
        onClick: function() {},
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
            if (!options) options = {};
            // Creating the options object
            this.options = {};
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

},{}],"8RFz3":[function(require,module,exports) {
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
    var value = {};
    var marker = value;
    for(var i = 0; i < statePath.length - 1; i++)if (i === statePath.length - 2) marker[statePath[i]] = statePath[i + 1];
    else {
        marker[statePath[i]] = {};
        marker = marker[statePath[i]];
    }
    return value;
}
function mapValues(collection, iteratee) {
    var result = {};
    var collectionKeys = Object.keys(collection);
    for(var i = 0; i < collectionKeys.length; i++){
        var key = collectionKeys[i];
        result[key] = iteratee(collection[key], key, collection, i);
    }
    return result;
}
function mapFilterValues(collection, iteratee, predicate) {
    var e_1, _a1;
    var result = {};
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
    var result = {};
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
                marker[subPath] = marker[subPath] || {};
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
    var result = {};
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
        var partialUpdate = {};
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
        return Object.assign({}, acc, partialUpdate);
    }, context) : context;
    return updatedContext;
} // tslint:disable-next-line:no-empty
exports.warn = function() {};
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
var interopSymbols = (_a = {}, _a[symbolObservable] = function() {
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
        return _tslib.__assign(_tslib.__assign({}, transitionLike), {
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

},{"./_virtual/_tslib.js":"3Bp7b","./constants.js":"1Q9J9","./environment.js":"7oZy5"}],"3Bp7b":[function(require,module,exports) {
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
    var t = {};
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

},{}],"1Q9J9":[function(require,module,exports) {
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var STATE_DELIMITER = '.';
var EMPTY_ACTIVITY_MAP = {};
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
parcelHelpers.export(exports, "runSiteInitMachine", ()=>runSiteInitMachine
);
var _xstate = require("xstate");
var _util = require("./util");
var _ui = require("./ui");
var _consts = require("./consts");
const runSiteInitMachine = (globalContext, sendParentCallback)=>{
    const siteInitMachine = /** @xstate-layout N4IgpgJg5mDOIC5SwJYBcwEkB26B0AwgBZgDGA1itlAPo4YBO2YaNAgqaXLAMQCqAJQAydAMo0BAeQBqdAAqJQABwD2qNChXZFIAB6IATAFYADHgBsADhMBOACxGAzOYCMJgw-MAaEAE9ELgDslnhGdo5GLkYGLpZGToEGAL5JPupYuGiEJBRUtPRgTCzsnNw8mAByACoAogIVNVXs0myYQmwAQkI1OqrqmtpIeoaWdhbBdpaBto52NoE2Rj7+CEY2eIEuLnYm0Zb2Jnbmiylp6Bn4xGSU1HTYjMysHFywvJW19Y00kgBiP0KVHpDProAY6fQIAC0bkCeH2LnMBlGNkO5kCdjsy0MYTwzhsCKCNkcBhMpOSqRA6Rw+AA6gBDUG3H4qBg0PiwQo0USkOnYGgdACuaDQWhocgYZVEBDYFX5fCqVUksoIAIIAGkagARXpqUFacGIRwmELxayRAyOBEGFGBLEIRyBWGORyWIIOywWzaWU6U87UrLc3m4JksiQyeQ8KSyTByGg-SR8Cra4G6jT6oYQzYuXGuWbBSxoozmbx+Q2TOGLV2k2ymGzeilUzJ4QPYYO0ZmsqMRmNc6UVCqVADiNDqUgEOv66dAEMt5jhLiNro8RkSBnRduic5MrhcdecrsRjhSFOwKggcB0jcuORu+XuhUeJRe8BTk8G08QkJJjjhTncxhMS0rQMO04jwOwoniaZAIxI1zB9K8snpRl21DdlORbfkhRFPlxW4Cc9XfYYoRJMYkU2YxFxdBFHDtOxjFCAxEUCWYbCYlxjAQv0mxbNs41DLsYwItMiIhIwCw2dx0RibZLDkyw6OOPAEUmaJJg8XcbC4jB-TwARIBQCVSFYDoGBUAB3DlWSqFQw2jBRX0Ig0EHMSJcTWTYbCsUxZhLFYDCYvATAXSiPXCRwbCJbSLgDc4JDAOkIBWZRUzBDNEGLMZTECcTAlcgsLSWUsEHmPA2I9FcPGCIkjwbbj0GEtKPxIpE8HIji-0sajzFo4roR-YxHTy45xN3fZyRSIA */ _xstate.createMachine({
        context: {
            peerServerConfig: {},
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
            setCloudPeerServerConfig: ()=>{
                globalContext.peerServerConfig = _consts.peerServerCloudOptions;
            },
            setLocalPeerServerConfig: ()=>{
                globalContext.peerServerConfig = _consts.peerServerLocalOptions;
            },
            setRovIpAddr: (_, event)=>{
                globalContext.rovIpAddr = event.data;
            },
            showIpScanButton: ()=>{
                _ui.showToastMessage("Click scan to find the ROV locally.");
                _ui.showToastMessage("No internet connection.");
                _ui.showScanIpBtn();
            },
            hideIpScanButton: ()=>{
                _ui.hideScanIpButton();
            },
            hideLoadingUi: ()=>{
                _ui.hideLoadingUi("ip-scan");
                _ui.hideLoadingUi("internet-check");
            },
            showIpScanningUi: ()=>{
                _ui.showLoadingUi("ip-scan");
            },
            redirectBrowserToRovIp: (_, event)=>{
                window.location = "http://" + event.data;
            },
            siteReady: ()=>{
                sendParentCallback("SITE_READY");
            }
        },
        services: {
            checkInternetAvailable: ()=>{
                _ui.showLoadingUi("internet-check");
                return (callback)=>{
                    const config = _consts.peerServerCloudOptions;
                    _util.isInternetAvailable((config.secure ? "https://" : "http://") + config.host + ":" + config.port).then((internetOnline)=>{
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
                    _ui.showLoadingUi("ip-scan");
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
        guards: {}
    });
    const runningMachine = _xstate.interpret(siteInitMachine, {
        devTools: globalContext.debugXstateMode
    }).start();
    return runningMachine;
};

},{"xstate":"2sk4t","./util":"doATT","./ui":"efi6n","./consts":"2J0f1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aaTha":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "startRovConnectionMachine", ()=>startRovConnectionMachine
);
var _xstate = require("xstate");
var _ui = require("./ui");
var _util = require("./util");
var _messageHandler = require("./messageHandler");
var _consts = require("./consts");
// FOR CONVERTING TEXT TO/FROM BINARY FOR SENDING OVER THE WEBRTC DATACHANNEL
const messageEncoder = new TextEncoder(); // always utf-8
const messageDecoder = new TextDecoder(); // always utf-8
const startRovConnectionMachine = (globalContext, sendParentCallback)=>{
    let eventHandlers = {};
    const sendEventToSelf = (event)=>{
        console.log("Sending event to self:", event);
        if (runningMachine) runningMachine.send(event);
    };
    // create the machine
    const rovConnectionMachine = /** @xstate-layout N4IgpgJg5mDOIC5QCcD2A3AwqgdjsAxgC4CWuAsgIYEAWJ+AdEXbAAphjICqO9JpAGxIAvSAGIAKgAkAkgGUA+qwCiygEoK1ygIIARAJqJQAB1Sx+ZHEZAAPRAEYAHADYALA1cBOAMyOADM4ArP7eAOwANCAAnogATPaeDG7egYHOoc5+3m7OsQC+eZFoWLj4xJZUtPRgTCzsnDx8giLiugDyCrrymG0Acr3KmBLWpuakuNZ2CE5uHj7+QSER0YiufonBrvaxsa6u2dveBUUY2HiE4ziVdIzMJGwcyDK8zaIQYiNmFhNItnGxfnsDD8fniflCnnWfkCrkiMQQ-iSQVimW89i8W1cxxAxTOZUu12qDAIpQu4mk8iUqg0umUcgkaja+mUuk+Y0sk0QjhcDFigUBkL5jlCQrhqyyDHs3k8nhRYUc3lcgSOhRxp1J5Qo1BuNRJ52I4j6nW0Em0mCk2n6ygAMp1un0BkMWWzvlZflNuc5efyEqDgiLgmKECKva4A-ZQjDvNlPI5sbiNQTtUS9fjWh0unIelahi7LpyETy+QK-cLRStC+4QbFQq4goDQo5PM54+r9UmqoxUxdLM8LEI3mIjboTWaLVbbW0VL08xz3XF0gwQj5Ywlo4FPLCK44NwxowFQiCd6Fa62Su2Ksmu4ney8SAPybJFCp1J06Qymc7fqNXQWUaElyyFdHDXFJNyDFF3HsZxoNiGVvDgnZ7DPPEey1TtdRvXA+1eQ1eipV91EZNRZx+UApn-QDpWlECfDArd4U8UJvAYfkRU3FIXB2FtVQTC90J1YksJwHD7xad52jtLMHUGYZvy+fN5wQSjlxo0CNwYhx7F3LYpUcPYUTcTcUOEwlr34kS7wfd4bFgIhKCIGpKAAM0c5AAAp+RBABKMQ+PxS8MKEizROs0i3XIhcANU1c6I0oNtjrPd0iY5iIy8YITIssyagAd0oCwcCgAAxVBkDUQhhKHfCR1Nc1LQGSdp3CgtmyBJVnGjBDQSbRwg06jZtNlOtAj5WJFSygKBKJfLCpKsqKu7TUcGqzRBhkoYZCNCQZHIZQ2i4OSTAUudIumTFJR3bw-D2CMT18INQmg4E0TWFxoTrdFJrQq4rzygrSCK0rysqizJCfAiaXfRlmVZeT2TIv5zvRS7lRurYT2YvqKxhWJJScHZYkccaMh3b7lpyhhZsB+aQaWy4xEkzNs0dI6QB-RSzvRFGnDR27MYeitckScFXBAwIns+rxyY7QSaEoARHIkjoWdklqlIBPZJVBCNnFlBI9mcBL7EBJJQRBNFnBgiM42xHBUAgOBrH8n7KbuB4Gl4KzxPVrnnCLE84ObHZsliINXHiBhGzSRVcghdJT14tspt+oL3fqJ5vbeX2kfG-2PClInYz1sNAiDJsANg2MZTrJtPBlwLBPpyAc6mCWgVXMW4IVdd7HLiWl1SflgnlMJ66T88U8p+nb37H34d-JSI4SlFHAYWNRoVTrpUNhvpsYan6FpxbhNbrSmI8G7-erEC+W8R7pVY8EiY+wE0T31O5YVpWz+U9YgXSHrbkTYboynLjKVicERq5H2E2ZCE9UIUz+r-Jwj0khtQjOCGEN0Eg8QKEAA */ _xstate.createMachine({
        id: "rovConnectionMachine",
        initial: "thisPeerUninitilized",
        states: {
            thisPeerUninitilized: {
                on: {
                    THIS_PEER_READY: {
                        description: 'this event is sent by the parent when the "thisPeerSetupMachine" has just created the peer (but does not wait for peerjs "open" event)',
                        target: "thisPeerInitilized"
                    },
                    DO_DISCONNECT: {
                        actions: [
                            "cleanupEventListeners",
                            "showRovDisconnectedUi"
                        ],
                        target: "halted"
                    }
                }
            },
            thisPeerInitilized: {
                always: {
                    actions: "connectToRov",
                    target: "connectionInitilized"
                }
            },
            connected: {
                entry: "sendParent_rovDatachannelOpen",
                on: {
                    THIS_PEER_DESTROYED: {
                        actions: "cleanupEventListeners",
                        target: "thisPeerUninitilized"
                    },
                    ON_DATACHANNEL_DISCONNECTED: {
                        actions: "startReconnectCountdown",
                        target: "waitingForReconnection"
                    },
                    DO_DISCONNECT: {
                        actions: [
                            "cleanupEventListeners",
                            "showRovDisconnectedUi"
                        ],
                        target: "halted"
                    }
                }
            },
            connectionInitilized: {
                exit: "clearRovConnectionTimeout",
                on: {
                    ON_DATACHANNEL_OPEN: {
                        actions: [
                            "addDatachannelEventHandlers", 
                        ],
                        target: "connected"
                    },
                    THIS_PEER_DESTROYED: {
                        actions: "cleanupEventListeners",
                        target: "thisPeerUninitilized"
                    },
                    ON_PEER_ERROR: {
                        actions: [
                            "cleanupEventListeners",
                            "sendParent_rovConnectionFailed",
                            "showRovDisconnectedUi"
                        ],
                        cond: "peerErr=peer-unavailable",
                        target: "halted"
                    },
                    DO_DISCONNECT: {
                        actions: [
                            "cleanupEventListeners",
                            "showRovDisconnectedUi"
                        ],
                        target: "halted"
                    },
                    CONNECTION_TIMEOUT: {
                        actions: "cleanupEventListeners",
                        description: "(timeout)",
                        target: "thisPeerInitilized"
                    }
                }
            },
            waitingForReconnection: {
                on: {
                    ON_DATACHANNEL_OPEN: {
                        actions: "stopReconnectCountdown",
                        target: "connected"
                    },
                    ON_RECONNECTION_TIMEOUT: {
                        actions: [
                            "cleanupEventListeners",
                            "sendParent_rovConnectionFailed",
                            "showRovDisconnectedUi"
                        ],
                        target: "halted"
                    },
                    THIS_PEER_DESTROYED: {
                        actions: "cleanupEventListeners",
                        target: "thisPeerUninitilized"
                    },
                    DO_DISCONNECT: {
                        actions: "cleanupEventListeners",
                        target: "halted"
                    }
                }
            },
            halted: {
                on: {
                    DO_CONNECT: [
                        {
                            cond: "thisPeerIsReady",
                            target: "thisPeerInitilized"
                        },
                        {
                            target: "thisPeerUninitilized"
                        }, 
                    ]
                }
            }
        }
    }, {
        guards: {
            'thisPeerIsReady': ()=>{
                return !!globalContext.thisPeer;
            },
            'peerErr=peer-unavailable': (_, event)=>{
                return event.data.type === "peer-unavailable";
            }
        },
        actions: {
            "showRovDisconnectedUi": ()=>{
                _ui.showROVDisconnectedUi();
            },
            'sendParent_rovDatachannelOpen': ()=>{
                sendParentCallback("ROV_DATACHANNEL_OPEN");
            },
            'sendParent_rovConnectionFailed': ()=>{
                sendParentCallback("ROV_CONNECTION_FAILED");
            },
            'connectToRov': ()=>{
                // get the rovPeerId string by combining the end number and rov peer id base
                const rovPeerId = _consts.ROV_PEERID_BASE + globalContext.rovPeerIdEndNumber;
                // connect to the rov
                console.info("connecting to rov peer: " + rovPeerId);
                _ui.showROVConnectingUi(rovPeerId);
                const rovDataConnection = globalContext.rovDataConnection = globalContext.thisPeer.connect(rovPeerId, {
                    reliable: true,
                    serialization: 'none'
                });
                // setup the connection event listeners:
                eventHandlers['onOpen'] = _util.generateStateChangeFunction(sendEventToSelf, 'ON_DATACHANNEL_OPEN', null, ()=>{
                    _ui.showToastMessage("Rov datachannel Open!");
                });
                rovDataConnection.on('open', eventHandlers['onOpen']);
                eventHandlers['onError'] = _util.generateStateChangeFunction(sendEventToSelf, 'ON_DATACHANNEL_ERROR', null, (err)=>{
                    console.warn("!!!UNHANDLED!! DATACHANNEL_ERROR:", err);
                });
                rovDataConnection.on('error', eventHandlers['onError']);
                eventHandlers['onClose'] = _util.generateStateChangeFunction(sendEventToSelf, 'ON_DATACHANNEL_CLOSE', null, (event)=>{
                    console.warn("!!UNHANDLED!! DATACHANNEL_CLOSE:", event);
                });
                rovDataConnection.on('close', eventHandlers['onClose']);
                eventHandlers['onPeerError'] = _util.generateStateChangeFunction(sendEventToSelf, 'ON_PEER_ERROR', null);
                globalContext.thisPeer.on('error', eventHandlers['onPeerError']);
                // setup a timeout in case the connection takes too long
                globalContext.rovConnectionTimeout = setTimeout(()=>{
                    sendEventToSelf('CONNECTION_TIMEOUT');
                }, 8000); // 8 seconds
            },
            'cleanupEventListeners': ()=>{
                _messageHandler.MessageHandler.setSendMessageCallback(null);
                clearInterval(globalContext.datachannelDisconnectCheckIntervalId);
                clearInterval(globalContext.datachannelReconnectCountdown);
                if (globalContext.stopPingLoop) globalContext.stopPingLoop();
                if (globalContext.thisPeer) globalContext.thisPeer.off('error', eventHandlers['onPeerError']);
                globalContext.rovDataConnection.off('open', eventHandlers['onOpen']);
                globalContext.rovDataConnection.off('close', eventHandlers['onClose']);
                globalContext.rovDataConnection.off('error', eventHandlers['onError']);
                globalContext.rovDataConnection.off('data', eventHandlers['onData']);
                globalContext.rovDataConnection.close();
                globalContext.rovDataConnection = null;
            },
            "clearRovConnectionTimeout": ()=>{
                clearTimeout(globalContext.rovConnectionTimeout);
            },
            'addDatachannelEventHandlers': ()=>{
                _ui.showToastMessage("Connected to ROV!");
                _ui.showROVConnectedUi();
                const rovDataConnection = globalContext.rovDataConnection;
                // Handle sending messages to rov:
                _messageHandler.MessageHandler.globalContext = globalContext;
                _messageHandler.MessageHandler.setSendMessageCallback((message)=>{
                    const encodedMessage = messageEncoder.encode(message);
                    rovDataConnection.send(encodedMessage);
                });
                // handle reciving messages from rov:
                const dataMsgRecivedHandler = eventHandlers['onData'] = (encodedMessage)=>{
                    const message = messageDecoder.decode(encodedMessage);
                    console.log("ROV_DATA_CHANNEL_DATA", message);
                    _messageHandler.MessageHandler.handleRecivedMessage(message);
                };
                rovDataConnection.on('data', dataMsgRecivedHandler);
                // Keep checking if the datachannel goes offline: (every half second (interval 500) check if the datachannel peer connection state is "disconnected")
                globalContext.datachannelDisconnectCheckIntervalId = setInterval(()=>{
                    const connectionState = rovDataConnection.peerConnection ? globalContext.rovDataConnection.peerConnection.iceConnectionState : "disconnected";
                    if (connectionState == "disconnected") sendEventToSelf("ON_DATACHANNEL_DISCONNECTED");
                }, 500);
                // finally tell the rov to begin sending us the video livestream:
                _messageHandler.MessageHandler.sendRovMessage({
                    action: "begin_video_stream"
                });
                // start sending ping messages to the ROV (as a heartbeat signal & used for the net ping stat):
                globalContext.stopPingLoop = _messageHandler.RovActions.startPingMessageSenderLoop();
            },
            'startReconnectCountdown': ()=>{
                const rovDataConnection = globalContext.rovDataConnection;
                var datachannelTimeoutCountdown = 10;
                var lastIceConnectionState = "disconnected";
                if (globalContext.stopPingLoop) globalContext.stopPingLoop();
                // every second (interval 1000) check if the datachannel peer connection is still disconnected
                // if it's disconnected: count down a timeout counter, if it's still not connected after the timeout, then fire the DATACHANNEL_TIMEOUT event
                // if it connects: reset the countdown.
                globalContext.datachannelReconnectCountdown = setInterval(()=>{
                    const connectionState = rovDataConnection.peerConnection ? rovDataConnection.peerConnection.iceConnectionState : "disconnected";
                    if (connectionState == "disconnected" && datachannelTimeoutCountdown > 0) {
                        datachannelTimeoutCountdown--;
                        _ui.showToastMessage("Waiting for ROV to Reconnect: " + datachannelTimeoutCountdown, 1000);
                    } else if (connectionState == "connected" && lastIceConnectionState != "connected") {
                        datachannelTimeoutCountdown = 10;
                        _ui.showToastMessage("ROV Reconnected!", 2000);
                        sendEventToSelf("ON_DATACHANNEL_OPEN");
                    } else // If we have waited too long without the rov reconnecting
                    sendEventToSelf("ON_RECONNECTION_TIMEOUT");
                    lastIceConnectionState = connectionState;
                }, 1000);
            },
            'stopReconnectCountdown': ()=>{
                clearInterval(globalContext.datachannelReconnectCountdown);
            },
            "debugReload": ()=>{
                // var reloadCount = localStorage.getItem("reloadCount") || 0;
                // console.log("reloadCount: ", reloadCount, reloadCount == -1);
                // if (reloadCount == -1 || reloadCount > 8) {
                // setTimeout(() => { localStorage.setItem("reloadCount", 0); window.location.reload() }, 1000);
                // } else {
                // reloadCount++;
                // localStorage.setItem("reloadCount", reloadCount);
                setTimeout(()=>{
                    window.location.reload();
                }, 10);
            // }
            }
        }
    });
    const runningMachine = _xstate.interpret(rovConnectionMachine, {
        devTools: globalContext.debugXstateMode
    }).start();
    return runningMachine;
};

},{"xstate":"2sk4t","./ui":"efi6n","./util":"doATT","./messageHandler":"at2SH","./consts":"2J0f1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"at2SH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MessageHandler", ()=>MessageHandler
);
parcelHelpers.export(exports, "RovActions", ()=>RovActions
);
var _ui = require("./ui");
var _uuid = require("uuid");
let lastTimeRecvdPong = NaN;
class MessageHandler {
    // replyContinuityCallbacks: keep track of functions to run when we get a reply to a message we sent with some "cid" aka continuityId
    // object format: (key is the cid of the sent message): { '1234': { callback: function() {}, original_msg: "{action:'move'}" }, etc... }
    static replyContinuityCallbacks = {};
    // refrence to the global context object from main.js
    static globalContext;
    // sendMessageCallback: Function that will send the message to the rov peer.
    // This callback should be set in the constructor below.
    static sendMessageCallback = ()=>{};
    static setSendMessageCallback = (callback)=>{
        MessageHandler.sendMessageCallback = callback;
    };
    // sendRovMessage: Send a message to the rov peer and setup reply callbacks based on a message cid if reply(ies) are expected.
    static sendRovMessage = (msgObject, replyCallback)=>{
        // setup the reply callback
        let cid = msgObject["cid"];
        if (!cid) cid = msgObject["cid"] = _uuid.v4().substring(0, 8); // generate a random cid if none is provided
        if (!MessageHandler.replyContinuityCallbacks[cid]) MessageHandler.replyContinuityCallbacks[cid] = {
            original_msg: msgObject
        };
        if (replyCallback) MessageHandler.replyContinuityCallbacks[cid].callback = replyCallback;
        // send the message to the rov
        const messageString = JSON.stringify(msgObject);
        if (MessageHandler.sendMessageCallback) MessageHandler.sendMessageCallback(messageString);
    };
    static handlePasswordChallenge(msg_cid) {
        _ui.showPasswordPrompt("Please enter the piloting password", (password)=>{
            if (password) {
                const msg_data = {
                    "cid": msg_cid,
                    "action": "password_attempt",
                    "val": password
                };
                MessageHandler.sendRovMessage(msg_data, null);
            } else // remove the reply callback if the user cancels the password prompt (empty password)
            delete MessageHandler.replyContinuityCallbacks[msg_cid];
        });
    }
    static handleReplyMsgRecived(msg_data, msg_cid) {
        const msg_status = msg_data["status"];
        const msg_value = msg_data["val"];
        const replyContinuityCallback = MessageHandler.replyContinuityCallbacks[msg_cid].callback;
        if (msg_status == "error") {
            console.warn("Rov Action Error: " + msg_value);
            _ui.showToastMessage(msg_value);
        } else if (msg_status == "pong") {
            console.log("Ping->Pong received");
            lastTimeRecvdPong = Date.now();
            const networkPingDelay = lastTimeRecvdPong - Number.parseFloat(msg_value) // since the rpi replies with the ms time we sent in the ping in the pong message
            ;
            _ui.updatePingDisplay(networkPingDelay);
        } else if (msg_status == "done") {
            if (replyContinuityCallback) replyContinuityCallback(msg_data);
            else _ui.showToastMessage(MessageHandler.replyContinuityCallbacks[msg_cid].originalMsgData.action + ": OK");
        } else if (msg_status == "password-required") MessageHandler.handlePasswordChallenge(msg_cid);
        else if (msg_status == "password-invalid") {
            _ui.showToastMessage("Invalid password");
            MessageHandler.handlePasswordChallenge(msg_cid);
        } else if (msg_status == "password-accepted") {
            _ui.showToastMessage("Password accepted");
            const originalMsgData = MessageHandler.replyContinuityCallbacks[msg_cid].original_msg;
            console.log("originalMsgData: ", originalMsgData);
            MessageHandler.sendRovMessage(originalMsgData, null);
        } else if (replyContinuityCallback) replyContinuityCallback(msg_data);
    }
    static handlePilotChange(newPilotId) {
        if (MessageHandler.globalContext.thisPeer && newPilotId == MessageHandler.globalContext.thisPeer.id) {
            _ui.showToastMessage("You are now the pilot");
            _ui.updateRoleDisplay(true);
        } else {
            _ui.showToastMessage("ROV Pilot has changed to " + newPilotId);
            _ui.updateRoleDisplay(false);
        }
    }
    static handleBroadcastMsgRecived(msg_data) {
        const msg_status = msg_data["status"];
        const msg_value = msg_data["val"];
        if (msg_status == "error") console.error("Rov Error: " + msg_value);
        else if (msg_status == "sensor_update") _ui.updateDisplayedSensorValues(msg_value);
        else if (msg_status == "pilot-changed") MessageHandler.handlePilotChange(msg_value);
    }
    static handleRecivedMessage(messageString) {
        console.log("Recived message: " + messageString);
        const msg_data = JSON.parse(messageString);
        const msg_cid = msg_data["cid"];
        if (msg_cid && msg_cid in MessageHandler.replyContinuityCallbacks) // --- this IS a reply to a message we sent ---
        MessageHandler.handleReplyMsgRecived(msg_data, msg_cid);
        else // --- this is NOT a reply to a message we sent ---
        MessageHandler.handleBroadcastMsgRecived(msg_data);
    }
}
class RovActions {
    // ==== Helpers =====
    static sendActionAndWaitForDone(msg_data, callback) {
        let responseMessage = "";
        MessageHandler.sendRovMessage(msg_data, (response)=>{
            const responseText = response["val"] || "";
            responseMessage += responseText + "\n";
            const status = response["status"];
            if (status && callback) {
                if (status == "done") callback(responseMessage);
                else if (status == "error") callback("Error: " + responseMessage);
            }
        });
    }
    static startPingMessageSenderLoop() {
        const intervalId = setInterval(()=>{
            MessageHandler.sendRovMessage({
                "action": "ping",
                "val": Date.now()
            });
        }, 2000);
        return ()=>{
            clearInterval(intervalId);
        } // return a cleanup function
        ;
    }
    // ======= Actions ========
    static takeControl() {
        // attempt to become the designated pilot for this rov, rov will send a passowrd prompt response if not already authorized
        MessageHandler.sendRovMessage({
            "action": "take_control"
        }, null);
    }
    static moveRov(thrustVector, turnRate) {
        MessageHandler.sendRovMessage({
            "action": "move",
            "val": {
                thrustVector: thrustVector,
                turnRate: turnRate
            }
        }, null);
    }
    static toggleLights() {
        MessageHandler.sendRovMessage({
            "action": "toggle_lights"
        }, null);
    }
    static shutdownRov = ()=>{
        if (confirm("Are you sure you want to shutdown the ROV?")) {
            _ui.showToastMessage("Sending Shutdown Request...");
            RovActions.sendActionAndWaitForDone({
                "action": "shutdown_rov"
            }, (doneMsg)=>{
                _ui.showToastMessage("Please wait 20 seconds before unplugging");
                _ui.showToastMessage("ROV:" + doneMsg);
            });
        }
    };
    static rebootRov = ()=>{
        if (confirm("Are you sure you want to reboot the ROV?")) {
            _ui.showToastMessage("Sending Reboot Request...");
            RovActions.sendActionAndWaitForDone({
                "action": "reboot_rov"
            }, (doneMsg)=>{
                _ui.showToastMessage("Press Connect again in about 30 seconds");
                _ui.showToastMessage("ROV:" + doneMsg);
            });
        }
    };
    static restartRovServices = ()=>{
        if (confirm("Are you sure you want to restart services? - The ROV will stop responding for about a minute and then you can re-connect.")) {
            const addTextToPopup = _ui.showScrollableTextPopup("Restarting ROV Services...");
            addTextToPopup("Sending Service Restart Request (Please Wait)...\n");
            MessageHandler.sendRovMessage({
                "action": "restart_rov_services"
            }, (response)=>{
                if (response['status'] == "error") addTextToPopup("\nError:\n" + response['val']);
                else if (response['val']) addTextToPopup(response['val']);
                else if (response['status'] == "done") addTextToPopup("\n\nDone");
            });
        }
    };
    static getRovStatusReport = ()=>{
        const addTextToPopup = _ui.showScrollableTextPopup("ROV Status Report...");
        addTextToPopup("Sending Status Request (Please Wait)...\n");
        MessageHandler.sendRovMessage({
            "action": "rov_status_report"
        }, (response)=>{
            if (response['status'] == "error") addTextToPopup("\nError:\n" + response['val']);
            else if (response['val']) addTextToPopup(response['val']);
            else if (response['status'] == "done") addTextToPopup("\n\nDone");
        });
    };
    static getRovLogs = ()=>{
        const addTextToPopup = _ui.showScrollableTextPopup("ROV Logs...");
        addTextToPopup("Sending Logs Request (Please Wait)...\n");
        MessageHandler.sendRovMessage({
            "action": "rov_logs"
        }, (response)=>{
            if (response['status'] == "error") addTextToPopup("\nError:\n" + response['val']);
            else if (response['val']) addTextToPopup(response['val']);
            else if (response['status'] == "done") addTextToPopup("\n\nDone");
        });
    };
    static rePullRovGithubCode = ()=>{
        alert("Make sure to choose 'Restart ROV Services' from this menu after the pull completes.");
        const addTextToPopup = _ui.showScrollableTextPopup("Pulling Updated Code...");
        addTextToPopup("Sending Code Pull Request (Please Wait)...\n");
        MessageHandler.sendRovMessage({
            "action": "pull_rov_github_code"
        }, (response)=>{
            if (response['status'] == "error") addTextToPopup("\nError:\n" + response['val']);
            else if (response['val']) addTextToPopup(response['val']);
            else if (response['status'] == "done") {
                addTextToPopup("\n\nDone");
                addTextToPopup("Please run 'Restart ROV Services' from the same menu in ~30 seconds to fully apply any code changes.");
            }
        });
    };
    static enableRovWifi = ()=>{
        _ui.showToastMessage("Sending Enable Wifi Command...");
        RovActions.sendActionAndWaitForDone({
            "action": "enable_wifi"
        }, (doneMsg)=>{
            _ui.showToastMessage("Wifi Enabled! " + doneMsg);
        });
    };
    static disableRovWifi = ()=>{
        if (confirm("Are you sure you want to disable rov wifi? If the ROV is connected via wifi, don't do this!")) {
            _ui.showToastMessage("Sending Disable Wifi Command...");
            RovActions.sendActionAndWaitForDone({
                "action": "disable_wifi"
            }, (doneMsg)=>{
                _ui.showToastMessage("Wifi Disabled! " + doneMsg);
            });
        }
    };
}
window.RovActions = RovActions;

},{"./ui":"efi6n","uuid":"j4KJi","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j4KJi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "v1", ()=>_v1JsDefault.default
);
parcelHelpers.export(exports, "v3", ()=>_v3JsDefault.default
);
parcelHelpers.export(exports, "v4", ()=>_v4JsDefault.default
);
parcelHelpers.export(exports, "v5", ()=>_v5JsDefault.default
);
parcelHelpers.export(exports, "NIL", ()=>_nilJsDefault.default
);
parcelHelpers.export(exports, "version", ()=>_versionJsDefault.default
);
parcelHelpers.export(exports, "validate", ()=>_validateJsDefault.default
);
parcelHelpers.export(exports, "stringify", ()=>_stringifyJsDefault.default
);
parcelHelpers.export(exports, "parse", ()=>_parseJsDefault.default
);
var _v1Js = require("./v1.js");
var _v1JsDefault = parcelHelpers.interopDefault(_v1Js);
var _v3Js = require("./v3.js");
var _v3JsDefault = parcelHelpers.interopDefault(_v3Js);
var _v4Js = require("./v4.js");
var _v4JsDefault = parcelHelpers.interopDefault(_v4Js);
var _v5Js = require("./v5.js");
var _v5JsDefault = parcelHelpers.interopDefault(_v5Js);
var _nilJs = require("./nil.js");
var _nilJsDefault = parcelHelpers.interopDefault(_nilJs);
var _versionJs = require("./version.js");
var _versionJsDefault = parcelHelpers.interopDefault(_versionJs);
var _validateJs = require("./validate.js");
var _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
var _stringifyJs = require("./stringify.js");
var _stringifyJsDefault = parcelHelpers.interopDefault(_stringifyJs);
var _parseJs = require("./parse.js");
var _parseJsDefault = parcelHelpers.interopDefault(_parseJs);

},{"./v1.js":false,"./v3.js":false,"./v4.js":"8zJtu","./v5.js":false,"./nil.js":false,"./version.js":false,"./validate.js":"eHPgI","./stringify.js":"5Y9F1","./parse.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8zJtu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rngJs = require("./rng.js");
var _rngJsDefault = parcelHelpers.interopDefault(_rngJs);
var _stringifyJs = require("./stringify.js");
var _stringifyJsDefault = parcelHelpers.interopDefault(_stringifyJs);
function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || _rngJsDefault.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(var i = 0; i < 16; ++i)buf[offset + i] = rnds[i];
        return buf;
    }
    return _stringifyJsDefault.default(rnds);
}
exports.default = v4;

},{"./rng.js":"2psyE","./stringify.js":"5Y9F1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2psyE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
        // find the complete implementation of crypto (msCrypto) on IE11.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
        if (!getRandomValues) throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
    return getRandomValues(rnds8);
}
exports.default = rng;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5Y9F1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _validateJs = require("./validate.js");
var _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ var byteToHex = [];
for(var i = 0; i < 256; ++i)byteToHex.push((i + 256).toString(16).substr(1));
function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!_validateJsDefault.default(uuid)) throw TypeError('Stringified UUID is invalid');
    return uuid;
}
exports.default = stringify;

},{"./validate.js":"eHPgI","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eHPgI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _regexJs = require("./regex.js");
var _regexJsDefault = parcelHelpers.interopDefault(_regexJs);
function validate(uuid) {
    return typeof uuid === 'string' && _regexJsDefault.default.test(uuid);
}
exports.default = validate;

},{"./regex.js":"bUa5g","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bUa5g":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2lhJt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "startThisPeerSetupMachine", ()=>startThisPeerSetupMachine
);
var _xstate = require("xstate");
var _peerjs = require("peerjs/dist/peerjs");
var _peerjsDefault = parcelHelpers.interopDefault(_peerjs);
var _uuid = require("uuid");
// import * as consts from "./consts";
var _util = require("./util");
var _ui = require("./ui");
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
const startThisPeerSetupMachine = (globalContext, sendParentCallback)=>{
    let eventHandlers = {};
    const sendEventToSelf = (event)=>{
        if (runningMachine) runningMachine.send(event);
    };
    const thisPeerSetupMachine = /** @xstate-layout N4IgpgJg5mDOIC5QBcAWBLWAFMYBOAymMgK4AOAsgIYDGGAdmAHQn3pvLoA26AXpAGJEoMgHtY6TqPrCQAD0QA2AEzKmABkUBOZQFZ1AFi0B2YwGZFADgA0IAJ6JV6psstvl645YCM63bq1FAF8g2zRMHHwiUkpaBmZ2SW4+QQB5ADkAfVSsAFF02TEJKRkkeURLXUsmbwtAswMPA2bdWwcEYwNnM10G40VFY10Dcy0QsIxsXEJicmo6dgSOZP4IAQzM3IAlLdStwvEk6VkFBBU1TR19I1MLG3tEM08XA2Geg3dLYNCQcKmo2axBaMJiJTg8VYCOSwZBUZDMKgAM3heAAFJZ1JiAJQCP6RGYxebxUHLCGQA7FdDHMqnHwGFy1MydCzqZRdRRtRCBJgNJzeKreLRmNzeca-Sb46JzOKLJiiMhgejrLLbXb7MpFI6lUCnbwfJgBYwmAaWV7GdRmTkIZS+DSWVzaAK+DzfCYRaZSoHE+WK5WZADCABlUgRchStSdEHrqobjVYzRard5lGYasoVMM3EytH5LGK8R7AUTZT6lRsACIASQI-oy6Vy-oAKuGSpGELpk0wRf5et5BublFa2boeV5BYZBgZ48Z8xLC4SZSDUFQuPC1nhiHh2iJDq2aVH9bH+vHdObLQ8OiP+SpDKoLGZXKKxfRRBA4LICwCF8DmKwwStyQ1XcqW1coECMbpvEsHNjG8TotHtLQk2aA10yndRk38aCoNnd0v2lH8SSSMkIBbEC2xMLQakUZNoJ0HojXPdo2Xpa5FCnFobS8AxcP+AkCO9BVQM1PcdSjbxR1cDEtCMEYaOMIczFTVw9GFSxzX5QVeMlItF2YZdV0AndKWpMSEAAWjMKj7SzbwoPjOyFIvKwmEUXQBinJStDs3pdG0+cBMWMjTLA8zFFTGzLDMOyvlNRyrXM+lor0LpEMaLQhT8kIgiAA */ _xstate.createMachine({
        id: "thisPeerSetupMachine",
        initial: "uninitilized",
        states: {
            uninitilized: {
                always: {
                    actions: "InitThisPeer",
                    target: "initilized"
                }
            },
            initilized: {
                exit: "clearThisPeerConnectionTimeout",
                on: {
                    ON_OPEN: {
                        actions: "hideServerConnectLoadingMsg",
                        target: "open"
                    },
                    ON_ERROR: [
                        {
                            actions: [
                                "showBrowserIncompatibleErrorUi",
                                "destroyPeer"
                            ],
                            cond: "peerErr=browser-incompatible",
                            target: "halted"
                        },
                        {
                            actions: [
                                "destroyPeer",
                                "clearSavedThisPeerId"
                            ],
                            cond: "peerErr=unavailable-id",
                            target: "uninitilized"
                        },
                        {
                            actions: "destroyPeer",
                            cond: "peerErr!=peer-unavailable",
                            target: "halted"
                        },
                        {
                            actions: [
                                "destroyPeer",
                                "showFatalErrorUi"
                            ],
                            cond: "peerErr_IsAutoRecoverable",
                            target: "uninitilized"
                        }, 
                    ],
                    CONNECTION_TIMEOUT: {
                        actions: "destroyPeer",
                        target: "uninitilized"
                    }
                }
            },
            open: {
                on: {
                    ON_ERROR: [
                        {
                            actions: [
                                "showWebrtcErrorUi",
                                "destroyPeer"
                            ],
                            cond: "peerErr=webrtc",
                            target: "halted"
                        },
                        {
                            actions: [
                                "destroyPeer",
                                "clearSavedThisPeerId"
                            ],
                            cond: "peerErr=unavailable-id",
                            target: "uninitilized"
                        },
                        {
                            actions: "destroyPeer",
                            cond: "peerErr!=peer-unavailable",
                            target: "halted"
                        },
                        {
                            actions: [
                                "destroyPeer",
                                "showFatalErrorUi"
                            ],
                            cond: "peerErr_IsAutoRecoverable",
                            target: "uninitilized"
                        }, 
                    ],
                    ON_CLOSE: {
                        actions: "destroyPeer",
                        target: "uninitilized"
                    },
                    ON_DISCONNECT: {
                        actions: "reconnect",
                        target: "initilized"
                    }
                }
            },
            halted: {
                on: {
                    retry: {
                        target: "uninitilized"
                    }
                }
            }
        }
    }, {
        actions: {
            "InitThisPeer": ()=>{
                _ui.showLoadingUi("server-connecting");
                // get our saved peer id or make a new one if one isn't saved:
                var ourPeerId = localStorage.getItem('thisPeerId');
                if (!ourPeerId) {
                    ourPeerId = "iROV_Pilot_" + _uuid.v4().slice(0, 8);
                    localStorage.setItem('thisPeerId', ourPeerId); // save for future runs
                }
                _ui.setClientPeerIdDisplay(ourPeerId);
                // setup the peer object and event listeners:
                globalContext.thisPeer = new _peerjsDefault.default(ourPeerId, globalContext.peerServerConfig);
                eventHandlers['onOpen'] = _util.generateStateChangeFunction(sendEventToSelf, 'ON_OPEN', null, ()=>{
                    _ui.showToastMessage("Connected to Peerjs Server!");
                    // tell the main ui that the thisPeer object is ready to use:
                    sendParentCallback("THIS_PEER_READY");
                });
                globalContext.thisPeer.on('open', eventHandlers['onOpen']);
                eventHandlers['onError'] = _util.generateStateChangeFunction(sendEventToSelf, 'ON_ERROR', null);
                globalContext.thisPeer.on('error', eventHandlers['onError']);
                eventHandlers['onClose'] = _util.generateStateChangeFunction(sendEventToSelf, 'ON_CLOSE', null, ()=>{
                    _ui.showToastMessage("Peerjs Server Connection Closed!");
                });
                globalContext.thisPeer.on('close', eventHandlers['onClose']);
                eventHandlers['onDisconnected'] = _util.generateStateChangeFunction(sendEventToSelf, 'ON_DISCONNECT', ()=>{
                    _ui.showToastMessage("Peerjs Server Disconnected!");
                });
                globalContext.thisPeer.on('disconnected', eventHandlers['onDisconnected']);
                // setup a timeout in case the connection takes too long
                globalContext.thisPeerConnectionTimeout = setTimeout(()=>{
                    sendEventToSelf('CONNECTION_TIMEOUT');
                }, 10000); // 10 seconds
            },
            "clearThisPeerConnectionTimeout": ()=>{
                clearTimeout(globalContext.thisPeerConnectionTimeout);
            },
            'hideServerConnectLoadingMsg': ()=>{
                _ui.hideLoadingUi("server-connecting");
                _ui.hideLoadingUi("server-reconnecting");
            },
            "destroyPeer": ()=>{
                globalContext.thisPeer.off('open', eventHandlers['onOpen']);
                globalContext.thisPeer.off('error', eventHandlers['onError']);
                globalContext.thisPeer.off('close', eventHandlers['onClose']);
                globalContext.thisPeer.off('disconnected', eventHandlers['onDisconnected']);
                globalContext.thisPeer.destroy();
                globalContext.thisPeer = null;
                sendParentCallback("THIS_PEER_DESTROYED");
            },
            'clearSavedThisPeerId': ()=>{
                localStorage.removeItem('thisPeerId');
            },
            'reconnect': ()=>{
                globalContext.thisPeer.reconnect();
                _ui.showLoadingUi("server-reconnecting");
            },
            "showFatalErrorUi": (_, event)=>{
                _ui.showToastMessage("Peerjs Server Fatal Error: " + event.data.type + " Restarting...");
                console.dir("Peerjs Server Error: ", event.data);
            },
            "showBrowserIncompatibleErrorUi": ()=>{
                alert('Your web browser does not support some WebRTC features. Please use a newer or different browser.');
            },
            "showWebrtcErrorUi": ()=>{
                _ui.showToastMessage("WebRTC protocol error! Reloading website now...");
                if (globalContext.stressTest) localStorage.setItem("reloadCount", -1); //for debug
                _ui.showReloadingWebsiteUi();
                setTimeout(()=>{
                    location.reload();
                }, globalContext.stressTest || 3000);
            }
        },
        guards: {
            "peerErr_IsAutoRecoverable": (_, event)=>{
                const err = event.data;
                return FATAL_PEER_ERROR_TYPES.includes(err.type);
            },
            "peerErr=unavailable-id": (_, event)=>{
                const err = event.data;
                return err.type === "unavailable-id";
            },
            "peerErr!=peer-unavailable": (_, event)=>{
                const err = event.data;
                return err.type !== "peer-unavailable";
            },
            "peerErr=webrtc": (_, event)=>{
                const err = event.data;
                return err.type === "webrtc";
            },
            "peerErr=browser-incompatible": (_, event)=>{
                return event.data === "browser-incompatible";
            }
        }
    });
    const runningMachine = _xstate.interpret(thisPeerSetupMachine, {
        devTools: globalContext.debugXstateMode
    }).start();
    return runningMachine;
};

},{"xstate":"2sk4t","peerjs/dist/peerjs":"k0vf3","uuid":"j4KJi","./util":"doATT","./ui":"efi6n","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k0vf3":[function(require,module,exports) {
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = function(modules, cache, entry, globalName) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
    var nodeRequire = undefined;
    function newRequire(name, jumped) {
        if (!cache[name]) {
            if (!modules[name]) {
                // if we cannot find the module within our internal map or
                // cache jump to the current global require ie. the last bundle
                // that was added to the page.
                var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
                if (!jumped && currentRequire) return currentRequire(name, true);
                // If there are other bundles on this page the require from the
                // previous one is saved to 'previousRequire'. Repeat this as
                // many times as there are bundles until the module is found or
                // we exhaust the require chain.
                if (previousRequire) return previousRequire(name, true);
                // Try the node require function if it exists.
                if (nodeRequire && typeof name === 'string') return nodeRequire(name);
                var err = new Error('Cannot find module \'' + name + '\'');
                err.code = 'MODULE_NOT_FOUND';
                throw err;
            }
            localRequire.resolve = resolve;
            localRequire.cache = {};
            var module = cache[name] = new newRequire.Module(name);
            modules[name][0].call(module.exports, localRequire, module, module.exports, this);
        }
        return cache[name].exports;
        function localRequire(x) {
            return newRequire(localRequire.resolve(x));
        }
        function resolve(x) {
            return modules[name][1][x] || x;
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
    newRequire.register = function(id, exports) {
        modules[id] = [
            function(require, module) {
                module.exports = exports;
            },
            {}
        ];
    };
    var error;
    for(var i = 0; i < entry.length; i++)try {
        newRequire(entry[i]);
    } catch (e) {
        // Save first error but execute all entries
        if (!error) error = e;
    }
    if (entry.length) {
        // Expose entry point to Node, AMD or browser globals
        // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
        var mainExports = newRequire(entry[entry.length - 1]);
        module.exports = mainExports;
    }
    // Override the current require with this new one
    parcelRequire = newRequire;
    if (error) // throw error from earlier, _after updating parcelRequire_
    throw error;
    return newRequire;
}({
    "EgBh": [
        function(require, module, exports) {
            var binaryFeatures = {};
            binaryFeatures.useBlobBuilder = function() {
                try {
                    new Blob([]);
                    return false;
                } catch (e) {
                    return true;
                }
            }();
            binaryFeatures.useArrayBufferView = !binaryFeatures.useBlobBuilder && function() {
                try {
                    return new Blob([
                        new Uint8Array([])
                    ]).size === 0;
                } catch (e) {
                    return true;
                }
            }();
            module.exports.binaryFeatures = binaryFeatures;
            var BlobBuilder = module.exports.BlobBuilder;
            if (typeof window !== 'undefined') BlobBuilder = module.exports.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;
            function BufferBuilder() {
                this._pieces = [];
                this._parts = [];
            }
            BufferBuilder.prototype.append = function(data) {
                if (typeof data === 'number') this._pieces.push(data);
                else {
                    this.flush();
                    this._parts.push(data);
                }
            };
            BufferBuilder.prototype.flush = function() {
                if (this._pieces.length > 0) {
                    var buf = new Uint8Array(this._pieces);
                    if (!binaryFeatures.useArrayBufferView) buf = buf.buffer;
                    this._parts.push(buf);
                    this._pieces = [];
                }
            };
            BufferBuilder.prototype.getBuffer = function() {
                this.flush();
                if (binaryFeatures.useBlobBuilder) {
                    var builder = new BlobBuilder();
                    for(var i = 0, ii = this._parts.length; i < ii; i++)builder.append(this._parts[i]);
                    return builder.getBlob();
                } else return new Blob(this._parts);
            };
            module.exports.BufferBuilder = BufferBuilder;
        },
        {}
    ],
    "kdPp": [
        function(require, module, exports) {
            var BufferBuilder = require('./bufferbuilder').BufferBuilder;
            var binaryFeatures = require('./bufferbuilder').binaryFeatures;
            var BinaryPack = {
                unpack: function(data) {
                    var unpacker = new Unpacker(data);
                    return unpacker.unpack();
                },
                pack: function(data) {
                    var packer = new Packer();
                    packer.pack(data);
                    var buffer = packer.getBuffer();
                    return buffer;
                }
            };
            module.exports = BinaryPack;
            function Unpacker(data) {
                // Data is ArrayBuffer
                this.index = 0;
                this.dataBuffer = data;
                this.dataView = new Uint8Array(this.dataBuffer);
                this.length = this.dataBuffer.byteLength;
            }
            Unpacker.prototype.unpack = function() {
                var type = this.unpack_uint8();
                if (type < 128) return type;
                else if ((type ^ 224) < 32) return (type ^ 224) - 32;
                var size;
                if ((size = type ^ 160) <= 15) return this.unpack_raw(size);
                else if ((size = type ^ 176) <= 15) return this.unpack_string(size);
                else if ((size = type ^ 144) <= 15) return this.unpack_array(size);
                else if ((size = type ^ 128) <= 15) return this.unpack_map(size);
                switch(type){
                    case 192:
                        return null;
                    case 193:
                        return undefined;
                    case 194:
                        return false;
                    case 195:
                        return true;
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
                        return undefined;
                    case 213:
                        return undefined;
                    case 214:
                        return undefined;
                    case 215:
                        return undefined;
                    case 216:
                        size = this.unpack_uint16();
                        return this.unpack_string(size);
                    case 217:
                        size = this.unpack_uint32();
                        return this.unpack_string(size);
                    case 218:
                        size = this.unpack_uint16();
                        return this.unpack_raw(size);
                    case 219:
                        size = this.unpack_uint32();
                        return this.unpack_raw(size);
                    case 220:
                        size = this.unpack_uint16();
                        return this.unpack_array(size);
                    case 221:
                        size = this.unpack_uint32();
                        return this.unpack_array(size);
                    case 222:
                        size = this.unpack_uint16();
                        return this.unpack_map(size);
                    case 223:
                        size = this.unpack_uint32();
                        return this.unpack_map(size);
                }
            };
            Unpacker.prototype.unpack_uint8 = function() {
                var byte = this.dataView[this.index] & 255;
                this.index++;
                return byte;
            };
            Unpacker.prototype.unpack_uint16 = function() {
                var bytes = this.read(2);
                var uint16 = (bytes[0] & 255) * 256 + (bytes[1] & 255);
                this.index += 2;
                return uint16;
            };
            Unpacker.prototype.unpack_uint32 = function() {
                var bytes = this.read(4);
                var uint32 = ((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3];
                this.index += 4;
                return uint32;
            };
            Unpacker.prototype.unpack_uint64 = function() {
                var bytes = this.read(8);
                var uint64 = ((((((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3]) * 256 + bytes[4]) * 256 + bytes[5]) * 256 + bytes[6]) * 256 + bytes[7];
                this.index += 8;
                return uint64;
            };
            Unpacker.prototype.unpack_int8 = function() {
                var uint8 = this.unpack_uint8();
                return uint8 < 128 ? uint8 : uint8 - 256;
            };
            Unpacker.prototype.unpack_int16 = function() {
                var uint16 = this.unpack_uint16();
                return uint16 < 32768 ? uint16 : uint16 - 65536;
            };
            Unpacker.prototype.unpack_int32 = function() {
                var uint32 = this.unpack_uint32();
                return uint32 < Math.pow(2, 31) ? uint32 : uint32 - Math.pow(2, 32);
            };
            Unpacker.prototype.unpack_int64 = function() {
                var uint64 = this.unpack_uint64();
                return uint64 < Math.pow(2, 63) ? uint64 : uint64 - Math.pow(2, 64);
            };
            Unpacker.prototype.unpack_raw = function(size) {
                if (this.length < this.index + size) throw new Error("BinaryPackFailure: index is out of range " + this.index + ' ' + size + ' ' + this.length);
                var buf = this.dataBuffer.slice(this.index, this.index + size);
                this.index += size;
                // buf = util.bufferToString(buf);
                return buf;
            };
            Unpacker.prototype.unpack_string = function(size) {
                var bytes = this.read(size);
                var i = 0;
                var str = '';
                var c;
                var code;
                while(i < size){
                    c = bytes[i];
                    if (c < 128) {
                        str += String.fromCharCode(c);
                        i++;
                    } else if ((c ^ 192) < 32) {
                        code = (c ^ 192) << 6 | bytes[i + 1] & 63;
                        str += String.fromCharCode(code);
                        i += 2;
                    } else {
                        code = (c & 15) << 12 | (bytes[i + 1] & 63) << 6 | bytes[i + 2] & 63;
                        str += String.fromCharCode(code);
                        i += 3;
                    }
                }
                this.index += size;
                return str;
            };
            Unpacker.prototype.unpack_array = function(size) {
                var objects = new Array(size);
                for(var i = 0; i < size; i++)objects[i] = this.unpack();
                return objects;
            };
            Unpacker.prototype.unpack_map = function(size) {
                var map = {};
                for(var i = 0; i < size; i++){
                    var key = this.unpack();
                    var value = this.unpack();
                    map[key] = value;
                }
                return map;
            };
            Unpacker.prototype.unpack_float = function() {
                var uint32 = this.unpack_uint32();
                var sign = uint32 >> 31;
                var exp = (uint32 >> 23 & 255) - 127;
                var fraction = uint32 & 8388607 | 8388608;
                return (sign === 0 ? 1 : -1) * fraction * Math.pow(2, exp - 23);
            };
            Unpacker.prototype.unpack_double = function() {
                var h32 = this.unpack_uint32();
                var l32 = this.unpack_uint32();
                var sign = h32 >> 31;
                var exp = (h32 >> 20 & 2047) - 1023;
                var hfrac = h32 & 1048575 | 1048576;
                var frac = hfrac * Math.pow(2, exp - 20) + l32 * Math.pow(2, exp - 52);
                return (sign === 0 ? 1 : -1) * frac;
            };
            Unpacker.prototype.read = function(length) {
                var j = this.index;
                if (j + length <= this.length) return this.dataView.subarray(j, j + length);
                else throw new Error('BinaryPackFailure: read index out of range');
            };
            function Packer() {
                this.bufferBuilder = new BufferBuilder();
            }
            Packer.prototype.getBuffer = function() {
                return this.bufferBuilder.getBuffer();
            };
            Packer.prototype.pack = function(value) {
                var type = typeof value;
                if (type === 'string') this.pack_string(value);
                else if (type === 'number') {
                    if (Math.floor(value) === value) this.pack_integer(value);
                    else this.pack_double(value);
                } else if (type === 'boolean') {
                    if (value === true) this.bufferBuilder.append(195);
                    else if (value === false) this.bufferBuilder.append(194);
                } else if (type === 'undefined') this.bufferBuilder.append(192);
                else if (type === 'object') {
                    if (value === null) this.bufferBuilder.append(192);
                    else {
                        var constructor = value.constructor;
                        if (constructor == Array) this.pack_array(value);
                        else if (constructor == Blob || constructor == File || value instanceof Blob || value instanceof File) this.pack_bin(value);
                        else if (constructor == ArrayBuffer) {
                            if (binaryFeatures.useArrayBufferView) this.pack_bin(new Uint8Array(value));
                            else this.pack_bin(value);
                        } else if ('BYTES_PER_ELEMENT' in value) {
                            if (binaryFeatures.useArrayBufferView) this.pack_bin(new Uint8Array(value.buffer));
                            else this.pack_bin(value.buffer);
                        } else if (constructor == Object || constructor.toString().startsWith('class')) this.pack_object(value);
                        else if (constructor == Date) this.pack_string(value.toString());
                        else if (typeof value.toBinaryPack === 'function') this.bufferBuilder.append(value.toBinaryPack());
                        else throw new Error('Type "' + constructor.toString() + '" not yet supported');
                    }
                } else throw new Error('Type "' + type + '" not yet supported');
                this.bufferBuilder.flush();
            };
            Packer.prototype.pack_bin = function(blob) {
                var length = blob.length || blob.byteLength || blob.size;
                if (length <= 15) this.pack_uint8(160 + length);
                else if (length <= 65535) {
                    this.bufferBuilder.append(218);
                    this.pack_uint16(length);
                } else if (length <= 4294967295) {
                    this.bufferBuilder.append(219);
                    this.pack_uint32(length);
                } else throw new Error('Invalid length');
                this.bufferBuilder.append(blob);
            };
            Packer.prototype.pack_string = function(str) {
                var length = utf8Length(str);
                if (length <= 15) this.pack_uint8(176 + length);
                else if (length <= 65535) {
                    this.bufferBuilder.append(216);
                    this.pack_uint16(length);
                } else if (length <= 4294967295) {
                    this.bufferBuilder.append(217);
                    this.pack_uint32(length);
                } else throw new Error('Invalid length');
                this.bufferBuilder.append(str);
            };
            Packer.prototype.pack_array = function(ary) {
                var length = ary.length;
                if (length <= 15) this.pack_uint8(144 + length);
                else if (length <= 65535) {
                    this.bufferBuilder.append(220);
                    this.pack_uint16(length);
                } else if (length <= 4294967295) {
                    this.bufferBuilder.append(221);
                    this.pack_uint32(length);
                } else throw new Error('Invalid length');
                for(var i = 0; i < length; i++)this.pack(ary[i]);
            };
            Packer.prototype.pack_integer = function(num) {
                if (num >= -32 && num <= 127) this.bufferBuilder.append(num & 255);
                else if (num >= 0 && num <= 255) {
                    this.bufferBuilder.append(204);
                    this.pack_uint8(num);
                } else if (num >= -128 && num <= 127) {
                    this.bufferBuilder.append(208);
                    this.pack_int8(num);
                } else if (num >= 0 && num <= 65535) {
                    this.bufferBuilder.append(205);
                    this.pack_uint16(num);
                } else if (num >= -32768 && num <= 32767) {
                    this.bufferBuilder.append(209);
                    this.pack_int16(num);
                } else if (num >= 0 && num <= 4294967295) {
                    this.bufferBuilder.append(206);
                    this.pack_uint32(num);
                } else if (num >= -2147483648 && num <= 2147483647) {
                    this.bufferBuilder.append(210);
                    this.pack_int32(num);
                } else if (num >= -9223372036854776000 && num <= 9223372036854776000) {
                    this.bufferBuilder.append(211);
                    this.pack_int64(num);
                } else if (num >= 0 && num <= 18446744073709552000) {
                    this.bufferBuilder.append(207);
                    this.pack_uint64(num);
                } else throw new Error('Invalid integer');
            };
            Packer.prototype.pack_double = function(num) {
                var sign = 0;
                if (num < 0) {
                    sign = 1;
                    num = -num;
                }
                var exp = Math.floor(Math.log(num) / Math.LN2);
                var frac0 = num / Math.pow(2, exp) - 1;
                var frac1 = Math.floor(frac0 * Math.pow(2, 52));
                var b32 = Math.pow(2, 32);
                var h32 = sign << 31 | exp + 1023 << 20 | frac1 / b32 & 1048575;
                var l32 = frac1 % b32;
                this.bufferBuilder.append(203);
                this.pack_int32(h32);
                this.pack_int32(l32);
            };
            Packer.prototype.pack_object = function(obj) {
                var keys = Object.keys(obj);
                var length = keys.length;
                if (length <= 15) this.pack_uint8(128 + length);
                else if (length <= 65535) {
                    this.bufferBuilder.append(222);
                    this.pack_uint16(length);
                } else if (length <= 4294967295) {
                    this.bufferBuilder.append(223);
                    this.pack_uint32(length);
                } else throw new Error('Invalid length');
                for(var prop in obj)if (obj.hasOwnProperty(prop)) {
                    this.pack(prop);
                    this.pack(obj[prop]);
                }
            };
            Packer.prototype.pack_uint8 = function(num) {
                this.bufferBuilder.append(num);
            };
            Packer.prototype.pack_uint16 = function(num) {
                this.bufferBuilder.append(num >> 8);
                this.bufferBuilder.append(num & 255);
            };
            Packer.prototype.pack_uint32 = function(num) {
                var n = num & 4294967295;
                this.bufferBuilder.append((n & 4278190080) >>> 24);
                this.bufferBuilder.append((n & 16711680) >>> 16);
                this.bufferBuilder.append((n & 65280) >>> 8);
                this.bufferBuilder.append(n & 255);
            };
            Packer.prototype.pack_uint64 = function(num) {
                var high = num / Math.pow(2, 32);
                var low = num % Math.pow(2, 32);
                this.bufferBuilder.append((high & 4278190080) >>> 24);
                this.bufferBuilder.append((high & 16711680) >>> 16);
                this.bufferBuilder.append((high & 65280) >>> 8);
                this.bufferBuilder.append(high & 255);
                this.bufferBuilder.append((low & 4278190080) >>> 24);
                this.bufferBuilder.append((low & 16711680) >>> 16);
                this.bufferBuilder.append((low & 65280) >>> 8);
                this.bufferBuilder.append(low & 255);
            };
            Packer.prototype.pack_int8 = function(num) {
                this.bufferBuilder.append(num & 255);
            };
            Packer.prototype.pack_int16 = function(num) {
                this.bufferBuilder.append((num & 65280) >> 8);
                this.bufferBuilder.append(num & 255);
            };
            Packer.prototype.pack_int32 = function(num) {
                this.bufferBuilder.append(num >>> 24 & 255);
                this.bufferBuilder.append((num & 16711680) >>> 16);
                this.bufferBuilder.append((num & 65280) >>> 8);
                this.bufferBuilder.append(num & 255);
            };
            Packer.prototype.pack_int64 = function(num) {
                var high = Math.floor(num / Math.pow(2, 32));
                var low = num % Math.pow(2, 32);
                this.bufferBuilder.append((high & 4278190080) >>> 24);
                this.bufferBuilder.append((high & 16711680) >>> 16);
                this.bufferBuilder.append((high & 65280) >>> 8);
                this.bufferBuilder.append(high & 255);
                this.bufferBuilder.append((low & 4278190080) >>> 24);
                this.bufferBuilder.append((low & 16711680) >>> 16);
                this.bufferBuilder.append((low & 65280) >>> 8);
                this.bufferBuilder.append(low & 255);
            };
            function _utf8Replace(m) {
                var code = m.charCodeAt(0);
                if (code <= 2047) return '00';
                if (code <= 65535) return '000';
                if (code <= 2097151) return '0000';
                if (code <= 67108863) return '00000';
                return '000000';
            }
            function utf8Length(str) {
                if (str.length > 600) // Blob method faster for large strings
                return new Blob([
                    str
                ]).size;
                else return str.replace(/[^\u0000-\u007F]/g, _utf8Replace).length;
            }
        },
        {
            "./bufferbuilder": "EgBh"
        }
    ],
    "iSxC": [
        function(require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.extractVersion = extractVersion;
            exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
            exports.disableLog = disableLog;
            exports.disableWarnings = disableWarnings;
            exports.log = log;
            exports.deprecated = deprecated;
            exports.detectBrowser = detectBrowser;
            exports.compactObject = compactObject;
            exports.walkStats = walkStats;
            exports.filterStats = filterStats;
            function _defineProperty(obj, key, value) {
                if (key in obj) Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
                else obj[key] = value;
                return obj;
            }
            function _typeof(obj1) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function(obj) {
                    return typeof obj;
                };
                else _typeof = function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                return _typeof(obj1);
            }
            var logDisabled_ = true;
            var deprecationWarnings_ = true;
            /**
 * Extract browser version out of the provided user agent string.
 *
 * @param {!string} uastring userAgent string.
 * @param {!string} expr Regular expression used as match criteria.
 * @param {!number} pos position in the version string to be returned.
 * @return {!number} browser version.
 */ function extractVersion(uastring, expr, pos) {
                var match = uastring.match(expr);
                return match && match.length >= pos && parseInt(match[pos], 10);
            } // Wraps the peerconnection event eventNameToWrap in a function
            // which returns the modified event object (or false to prevent
            // the event).
            function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
                if (!window.RTCPeerConnection) return;
                var proto = window.RTCPeerConnection.prototype;
                var nativeAddEventListener = proto.addEventListener;
                proto.addEventListener = function(nativeEventName, cb) {
                    if (nativeEventName !== eventNameToWrap) return nativeAddEventListener.apply(this, arguments);
                    var wrappedCallback = function(e) {
                        var modifiedEvent = wrapper(e);
                        if (modifiedEvent) {
                            if (cb.handleEvent) cb.handleEvent(modifiedEvent);
                            else cb(modifiedEvent);
                        }
                    };
                    this._eventMap = this._eventMap || {};
                    if (!this._eventMap[eventNameToWrap]) this._eventMap[eventNameToWrap] = new Map();
                    this._eventMap[eventNameToWrap].set(cb, wrappedCallback);
                    return nativeAddEventListener.apply(this, [
                        nativeEventName,
                        wrappedCallback
                    ]);
                };
                var nativeRemoveEventListener = proto.removeEventListener;
                proto.removeEventListener = function(nativeEventName, cb) {
                    if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[eventNameToWrap]) return nativeRemoveEventListener.apply(this, arguments);
                    if (!this._eventMap[eventNameToWrap].has(cb)) return nativeRemoveEventListener.apply(this, arguments);
                    var unwrappedCb = this._eventMap[eventNameToWrap].get(cb);
                    this._eventMap[eventNameToWrap].delete(cb);
                    if (this._eventMap[eventNameToWrap].size === 0) delete this._eventMap[eventNameToWrap];
                    if (Object.keys(this._eventMap).length === 0) delete this._eventMap;
                    return nativeRemoveEventListener.apply(this, [
                        nativeEventName,
                        unwrappedCb
                    ]);
                };
                Object.defineProperty(proto, 'on' + eventNameToWrap, {
                    get: function() {
                        return this['_on' + eventNameToWrap];
                    },
                    set: function(cb) {
                        if (this['_on' + eventNameToWrap]) {
                            this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
                            delete this['_on' + eventNameToWrap];
                        }
                        if (cb) this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
                    },
                    enumerable: true,
                    configurable: true
                });
            }
            function disableLog(bool) {
                if (typeof bool !== 'boolean') return new Error('Argument type: ' + _typeof(bool) + '. Please use a boolean.');
                logDisabled_ = bool;
                return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
            }
            /**
 * Disable or enable deprecation warnings
 * @param {!boolean} bool set to true to disable warnings.
 */ function disableWarnings(bool) {
                if (typeof bool !== 'boolean') return new Error('Argument type: ' + _typeof(bool) + '. Please use a boolean.');
                deprecationWarnings_ = !bool;
                return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
            }
            function log() {
                if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
                    if (logDisabled_) return;
                    if (typeof console !== 'undefined' && typeof console.log === 'function') console.log.apply(console, arguments);
                }
            }
            /**
 * Shows a deprecation warning suggesting the modern and spec-compatible API.
 */ function deprecated(oldMethod, newMethod) {
                if (!deprecationWarnings_) return;
                console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
            }
            /**
 * Browser detector.
 *
 * @return {object} result containing browser and version
 *     properties.
 */ function detectBrowser(window) {
                // Returned result object.
                var result = {
                    browser: null,
                    version: null
                }; // Fail early if it's not a browser
                if (typeof window === 'undefined' || !window.navigator) {
                    result.browser = 'Not a browser.';
                    return result;
                }
                var { navigator: navigator  } = window;
                if (navigator.mozGetUserMedia) {
                    // Firefox.
                    result.browser = 'firefox';
                    result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
                } else if (navigator.webkitGetUserMedia || window.isSecureContext === false && window.webkitRTCPeerConnection && !window.RTCIceGatherer) {
                    // Chrome, Chromium, Webview, Opera.
                    // Version matches Chrome/WebRTC version.
                    // Chrome 74 removed webkitGetUserMedia on http as well so we need the
                    // more complicated fallback to webkitRTCPeerConnection.
                    result.browser = 'chrome';
                    result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
                } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
                    // Edge.
                    result.browser = 'edge';
                    result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
                } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
                    // Safari.
                    result.browser = 'safari';
                    result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
                    result.supportsUnifiedPlan = window.RTCRtpTransceiver && 'currentDirection' in window.RTCRtpTransceiver.prototype;
                } else {
                    // Default fallthrough: not supported.
                    result.browser = 'Not a supported browser.';
                    return result;
                }
                return result;
            }
            /**
 * Checks if something is an object.
 *
 * @param {*} val The something you want to check.
 * @return true if val is an object, false otherwise.
 */ function isObject(val) {
                return Object.prototype.toString.call(val) === '[object Object]';
            }
            /**
 * Remove all empty objects and undefined values
 * from a nested object -- an enhanced and vanilla version
 * of Lodash's `compact`.
 */ function compactObject(data) {
                if (!isObject(data)) return data;
                return Object.keys(data).reduce(function(accumulator, key) {
                    var isObj = isObject(data[key]);
                    var value = isObj ? compactObject(data[key]) : data[key];
                    var isEmptyObject = isObj && !Object.keys(value).length;
                    if (value === undefined || isEmptyObject) return accumulator;
                    return Object.assign(accumulator, _defineProperty({}, key, value));
                }, {});
            }
            /* iterates the stats graph recursively. */ function walkStats(stats, base, resultSet) {
                if (!base || resultSet.has(base.id)) return;
                resultSet.set(base.id, base);
                Object.keys(base).forEach(function(name) {
                    if (name.endsWith('Id')) walkStats(stats, stats.get(base[name]), resultSet);
                    else if (name.endsWith('Ids')) base[name].forEach(function(id) {
                        walkStats(stats, stats.get(id), resultSet);
                    });
                });
            }
            /* filter getStats for a sender/receiver track. */ function filterStats(result, track, outbound) {
                var streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
                var filteredResult = new Map();
                if (track === null) return filteredResult;
                var trackStats = [];
                result.forEach(function(value) {
                    if (value.type === 'track' && value.trackIdentifier === track.id) trackStats.push(value);
                });
                trackStats.forEach(function(trackStat) {
                    result.forEach(function(stats) {
                        if (stats.type === streamStatsType && stats.trackId === trackStat.id) walkStats(result, stats, filteredResult);
                    });
                });
                return filteredResult;
            }
        },
        {}
    ],
    "s6SN": [
        function(require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimGetUserMedia = shimGetUserMedia;
            var utils = _interopRequireWildcard(require("../utils.js"));
            function _getRequireWildcardCache() {
                if (typeof WeakMap !== "function") return null;
                var cache = new WeakMap();
                _getRequireWildcardCache = function() {
                    return cache;
                };
                return cache;
            }
            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) return obj;
                if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
                    default: obj
                };
                var cache = _getRequireWildcardCache();
                if (cache && cache.has(obj)) return cache.get(obj);
                var newObj = {};
                var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                    if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
                    else newObj[key] = obj[key];
                }
                newObj.default = obj;
                if (cache) cache.set(obj, newObj);
                return newObj;
            }
            function _typeof(obj2) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function(obj) {
                    return typeof obj;
                };
                else _typeof = function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                return _typeof(obj2);
            }
            var logging = utils.log;
            function shimGetUserMedia(window, browserDetails) {
                var navigator = window && window.navigator;
                if (!navigator.mediaDevices) return;
                var constraintsToChrome_ = function(c) {
                    if (_typeof(c) !== 'object' || c.mandatory || c.optional) return c;
                    var cc = {};
                    Object.keys(c).forEach(function(key) {
                        if (key === 'require' || key === 'advanced' || key === 'mediaSource') return;
                        var r = _typeof(c[key]) === 'object' ? c[key] : {
                            ideal: c[key]
                        };
                        if (r.exact !== undefined && typeof r.exact === 'number') r.min = r.max = r.exact;
                        var oldname_ = function(prefix, name) {
                            if (prefix) return prefix + name.charAt(0).toUpperCase() + name.slice(1);
                            return name === 'deviceId' ? 'sourceId' : name;
                        };
                        if (r.ideal !== undefined) {
                            cc.optional = cc.optional || [];
                            var oc = {};
                            if (typeof r.ideal === 'number') {
                                oc[oldname_('min', key)] = r.ideal;
                                cc.optional.push(oc);
                                oc = {};
                                oc[oldname_('max', key)] = r.ideal;
                                cc.optional.push(oc);
                            } else {
                                oc[oldname_('', key)] = r.ideal;
                                cc.optional.push(oc);
                            }
                        }
                        if (r.exact !== undefined && typeof r.exact !== 'number') {
                            cc.mandatory = cc.mandatory || {};
                            cc.mandatory[oldname_('', key)] = r.exact;
                        } else [
                            'min',
                            'max'
                        ].forEach(function(mix) {
                            if (r[mix] !== undefined) {
                                cc.mandatory = cc.mandatory || {};
                                cc.mandatory[oldname_(mix, key)] = r[mix];
                            }
                        });
                    });
                    if (c.advanced) cc.optional = (cc.optional || []).concat(c.advanced);
                    return cc;
                };
                var shimConstraints_ = function(constraints, func) {
                    if (browserDetails.version >= 61) return func(constraints);
                    constraints = JSON.parse(JSON.stringify(constraints));
                    if (constraints && _typeof(constraints.audio) === 'object') {
                        var remap = function(obj, a, b) {
                            if (a in obj && !(b in obj)) {
                                obj[b] = obj[a];
                                delete obj[a];
                            }
                        };
                        constraints = JSON.parse(JSON.stringify(constraints));
                        remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
                        remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
                        constraints.audio = constraintsToChrome_(constraints.audio);
                    }
                    if (constraints && _typeof(constraints.video) === 'object') {
                        // Shim facingMode for mobile & surface pro.
                        var face = constraints.video.facingMode;
                        face = face && (_typeof(face) === 'object' ? face : {
                            ideal: face
                        });
                        var getSupportedFacingModeLies = browserDetails.version < 66;
                        if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
                            delete constraints.video.facingMode;
                            var matches;
                            if (face.exact === 'environment' || face.ideal === 'environment') matches = [
                                'back',
                                'rear'
                            ];
                            else if (face.exact === 'user' || face.ideal === 'user') matches = [
                                'front'
                            ];
                            if (matches) // Look for matches in label, or use last cam for back (typical).
                            return navigator.mediaDevices.enumerateDevices().then(function(devices) {
                                devices = devices.filter(function(d) {
                                    return d.kind === 'videoinput';
                                });
                                var dev = devices.find(function(d) {
                                    return matches.some(function(match) {
                                        return d.label.toLowerCase().includes(match);
                                    });
                                });
                                if (!dev && devices.length && matches.includes('back')) dev = devices[devices.length - 1]; // more likely the back cam
                                if (dev) constraints.video.deviceId = face.exact ? {
                                    exact: dev.deviceId
                                } : {
                                    ideal: dev.deviceId
                                };
                                constraints.video = constraintsToChrome_(constraints.video);
                                logging('chrome: ' + JSON.stringify(constraints));
                                return func(constraints);
                            });
                        }
                        constraints.video = constraintsToChrome_(constraints.video);
                    }
                    logging('chrome: ' + JSON.stringify(constraints));
                    return func(constraints);
                };
                var shimError_ = function(e) {
                    if (browserDetails.version >= 64) return e;
                    return {
                        name: ({
                            PermissionDeniedError: 'NotAllowedError',
                            PermissionDismissedError: 'NotAllowedError',
                            InvalidStateError: 'NotAllowedError',
                            DevicesNotFoundError: 'NotFoundError',
                            ConstraintNotSatisfiedError: 'OverconstrainedError',
                            TrackStartError: 'NotReadableError',
                            MediaDeviceFailedDueToShutdown: 'NotAllowedError',
                            MediaDeviceKillSwitchOn: 'NotAllowedError',
                            TabCaptureError: 'AbortError',
                            ScreenCaptureError: 'AbortError',
                            DeviceCaptureError: 'AbortError'
                        })[e.name] || e.name,
                        message: e.message,
                        constraint: e.constraint || e.constraintName,
                        toString: function() {
                            return this.name + (this.message && ': ') + this.message;
                        }
                    };
                };
                var getUserMedia_ = function(constraints, onSuccess, onError) {
                    shimConstraints_(constraints, function(c) {
                        navigator.webkitGetUserMedia(c, onSuccess, function(e) {
                            if (onError) onError(shimError_(e));
                        });
                    });
                };
                navigator.getUserMedia = getUserMedia_.bind(navigator); // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
                // function which returns a Promise, it does not accept spec-style
                // constraints.
                if (navigator.mediaDevices.getUserMedia) {
                    var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                    navigator.mediaDevices.getUserMedia = function(cs) {
                        return shimConstraints_(cs, function(c) {
                            return origGetUserMedia(c).then(function(stream) {
                                if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
                                    stream.getTracks().forEach(function(track) {
                                        track.stop();
                                    });
                                    throw new DOMException('', 'NotFoundError');
                                }
                                return stream;
                            }, function(e) {
                                return Promise.reject(shimError_(e));
                            });
                        });
                    };
                }
            }
        },
        {
            "../utils.js": "iSxC"
        }
    ],
    "VHa8": [
        function(require, module, exports) {
            /*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimGetDisplayMedia = shimGetDisplayMedia;
            function shimGetDisplayMedia(window, getSourceId) {
                if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) return;
                if (!window.navigator.mediaDevices) return;
                 // getSourceId is a function that returns a promise resolving with
                // the sourceId of the screen/window/tab to be shared.
                if (typeof getSourceId !== 'function') {
                    console.error("shimGetDisplayMedia: getSourceId argument is not a function");
                    return;
                }
                window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
                    return getSourceId(constraints).then(function(sourceId) {
                        var widthSpecified = constraints.video && constraints.video.width;
                        var heightSpecified = constraints.video && constraints.video.height;
                        var frameRateSpecified = constraints.video && constraints.video.frameRate;
                        constraints.video = {
                            mandatory: {
                                chromeMediaSource: 'desktop',
                                chromeMediaSourceId: sourceId,
                                maxFrameRate: frameRateSpecified || 3
                            }
                        };
                        if (widthSpecified) constraints.video.mandatory.maxWidth = widthSpecified;
                        if (heightSpecified) constraints.video.mandatory.maxHeight = heightSpecified;
                        return window.navigator.mediaDevices.getUserMedia(constraints);
                    });
                };
            }
        },
        {}
    ],
    "uI5X": [
        function(require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimMediaStream = shimMediaStream;
            exports.shimOnTrack = shimOnTrack;
            exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
            exports.shimGetStats = shimGetStats;
            exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
            exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
            exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
            exports.shimPeerConnection = shimPeerConnection;
            exports.fixNegotiationNeeded = fixNegotiationNeeded;
            Object.defineProperty(exports, "shimGetUserMedia", {
                enumerable: true,
                get: function() {
                    return _getusermedia.shimGetUserMedia;
                }
            });
            Object.defineProperty(exports, "shimGetDisplayMedia", {
                enumerable: true,
                get: function() {
                    return _getdisplaymedia.shimGetDisplayMedia;
                }
            });
            var utils = _interopRequireWildcard(require("../utils.js"));
            var _getusermedia = require("./getusermedia");
            var _getdisplaymedia = require("./getdisplaymedia");
            function _getRequireWildcardCache() {
                if (typeof WeakMap !== "function") return null;
                var cache = new WeakMap();
                _getRequireWildcardCache = function() {
                    return cache;
                };
                return cache;
            }
            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) return obj;
                if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
                    default: obj
                };
                var cache = _getRequireWildcardCache();
                if (cache && cache.has(obj)) return cache.get(obj);
                var newObj = {};
                var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                    if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
                    else newObj[key] = obj[key];
                }
                newObj.default = obj;
                if (cache) cache.set(obj, newObj);
                return newObj;
            }
            function _defineProperty(obj, key, value) {
                if (key in obj) Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
                else obj[key] = value;
                return obj;
            }
            function _typeof(obj3) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function(obj) {
                    return typeof obj;
                };
                else _typeof = function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                return _typeof(obj3);
            }
            function shimMediaStream(window) {
                window.MediaStream = window.MediaStream || window.webkitMediaStream;
            }
            function shimOnTrack(window) {
                if (_typeof(window) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
                    Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
                        get: function() {
                            return this._ontrack;
                        },
                        set: function(f) {
                            if (this._ontrack) this.removeEventListener('track', this._ontrack);
                            this.addEventListener('track', this._ontrack = f);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
                    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
                        var _this = this;
                        if (!this._ontrackpoly) {
                            this._ontrackpoly = function(e) {
                                // onaddstream does not fire when a track is added to an existing
                                // stream. But stream.onaddtrack is implemented so we use that.
                                e.stream.addEventListener('addtrack', function(te) {
                                    var receiver;
                                    if (window.RTCPeerConnection.prototype.getReceivers) receiver = _this.getReceivers().find(function(r) {
                                        return r.track && r.track.id === te.track.id;
                                    });
                                    else receiver = {
                                        track: te.track
                                    };
                                    var event = new Event('track');
                                    event.track = te.track;
                                    event.receiver = receiver;
                                    event.transceiver = {
                                        receiver: receiver
                                    };
                                    event.streams = [
                                        e.stream
                                    ];
                                    _this.dispatchEvent(event);
                                });
                                e.stream.getTracks().forEach(function(track) {
                                    var receiver;
                                    if (window.RTCPeerConnection.prototype.getReceivers) receiver = _this.getReceivers().find(function(r) {
                                        return r.track && r.track.id === track.id;
                                    });
                                    else receiver = {
                                        track: track
                                    };
                                    var event = new Event('track');
                                    event.track = track;
                                    event.receiver = receiver;
                                    event.transceiver = {
                                        receiver: receiver
                                    };
                                    event.streams = [
                                        e.stream
                                    ];
                                    _this.dispatchEvent(event);
                                });
                            };
                            this.addEventListener('addstream', this._ontrackpoly);
                        }
                        return origSetRemoteDescription.apply(this, arguments);
                    };
                } else // even if RTCRtpTransceiver is in window, it is only used and
                // emitted in unified-plan. Unfortunately this means we need
                // to unconditionally wrap the event.
                utils.wrapPeerConnectionEvent(window, 'track', function(e) {
                    if (!e.transceiver) Object.defineProperty(e, 'transceiver', {
                        value: {
                            receiver: e.receiver
                        }
                    });
                    return e;
                });
            }
            function shimGetSendersWithDtmf(window) {
                // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
                if (_typeof(window) === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
                    var shimSenderWithDtmf = function(pc, track) {
                        return {
                            track: track,
                            get dtmf () {
                                if (this._dtmf === undefined) {
                                    if (track.kind === 'audio') this._dtmf = pc.createDTMFSender(track);
                                    else this._dtmf = null;
                                }
                                return this._dtmf;
                            },
                            _pc: pc
                        };
                    }; // augment addTrack when getSenders is not available.
                    if (!window.RTCPeerConnection.prototype.getSenders) {
                        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                            this._senders = this._senders || [];
                            return this._senders.slice(); // return a copy of the internal state.
                        };
                        var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                        window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                            var sender = origAddTrack.apply(this, arguments);
                            if (!sender) {
                                sender = shimSenderWithDtmf(this, track);
                                this._senders.push(sender);
                            }
                            return sender;
                        };
                        var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
                        window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
                            origRemoveTrack.apply(this, arguments);
                            var idx = this._senders.indexOf(sender);
                            if (idx !== -1) this._senders.splice(idx, 1);
                        };
                    }
                    var origAddStream = window.RTCPeerConnection.prototype.addStream;
                    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                        var _this2 = this;
                        this._senders = this._senders || [];
                        origAddStream.apply(this, [
                            stream
                        ]);
                        stream.getTracks().forEach(function(track) {
                            _this2._senders.push(shimSenderWithDtmf(_this2, track));
                        });
                    };
                    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
                    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                        var _this3 = this;
                        this._senders = this._senders || [];
                        origRemoveStream.apply(this, [
                            stream
                        ]);
                        stream.getTracks().forEach(function(track) {
                            var sender = _this3._senders.find(function(s) {
                                return s.track === track;
                            });
                            if (sender) // remove sender
                            _this3._senders.splice(_this3._senders.indexOf(sender), 1);
                        });
                    };
                } else if (_typeof(window) === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
                    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
                    window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                        var _this4 = this;
                        var senders = origGetSenders.apply(this, []);
                        senders.forEach(function(sender) {
                            return sender._pc = _this4;
                        });
                        return senders;
                    };
                    Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
                        get: function() {
                            if (this._dtmf === undefined) {
                                if (this.track.kind === 'audio') this._dtmf = this._pc.createDTMFSender(this.track);
                                else this._dtmf = null;
                            }
                            return this._dtmf;
                        }
                    });
                }
            }
            function shimGetStats(window) {
                if (!window.RTCPeerConnection) return;
                var origGetStats = window.RTCPeerConnection.prototype.getStats;
                window.RTCPeerConnection.prototype.getStats = function getStats() {
                    var _this5 = this;
                    var [selector, onSucc, onErr] = arguments; // If selector is a function then we are in the old style stats so just
                    // pass back the original getStats format to avoid breaking old users.
                    if (arguments.length > 0 && typeof selector === 'function') return origGetStats.apply(this, arguments);
                     // When spec-style getStats is supported, return those when called with
                    // either no arguments or the selector argument is null.
                    if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== 'function')) return origGetStats.apply(this, []);
                    var fixChromeStats_ = function(response) {
                        var standardReport = {};
                        var reports = response.result();
                        reports.forEach(function(report) {
                            var standardStats = {
                                id: report.id,
                                timestamp: report.timestamp,
                                type: {
                                    localcandidate: 'local-candidate',
                                    remotecandidate: 'remote-candidate'
                                }[report.type] || report.type
                            };
                            report.names().forEach(function(name) {
                                standardStats[name] = report.stat(name);
                            });
                            standardReport[standardStats.id] = standardStats;
                        });
                        return standardReport;
                    }; // shim getStats with maplike support
                    var makeMapStats = function(stats) {
                        return new Map(Object.keys(stats).map(function(key) {
                            return [
                                key,
                                stats[key]
                            ];
                        }));
                    };
                    if (arguments.length >= 2) {
                        var successCallbackWrapper_ = function(response) {
                            onSucc(makeMapStats(fixChromeStats_(response)));
                        };
                        return origGetStats.apply(this, [
                            successCallbackWrapper_,
                            selector
                        ]);
                    } // promise-support
                    return new Promise(function(resolve, reject) {
                        origGetStats.apply(_this5, [
                            function(response) {
                                resolve(makeMapStats(fixChromeStats_(response)));
                            },
                            reject
                        ]);
                    }).then(onSucc, onErr);
                };
            }
            function shimSenderReceiverGetStats(window) {
                if (!(_typeof(window) === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) return;
                 // shim sender stats.
                if (!('getStats' in window.RTCRtpSender.prototype)) {
                    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
                    if (origGetSenders) window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                        var _this6 = this;
                        var senders = origGetSenders.apply(this, []);
                        senders.forEach(function(sender) {
                            return sender._pc = _this6;
                        });
                        return senders;
                    };
                    var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                    if (origAddTrack) window.RTCPeerConnection.prototype.addTrack = function addTrack() {
                        var sender = origAddTrack.apply(this, arguments);
                        sender._pc = this;
                        return sender;
                    };
                    window.RTCRtpSender.prototype.getStats = function getStats() {
                        var sender = this;
                        return this._pc.getStats().then(function(result) {
                            return(/* Note: this will include stats of all senders that
           *   send a track with the same id as sender.track as
           *   it is not possible to identify the RTCRtpSender.
           */ utils.filterStats(result, sender.track, true));
                        });
                    };
                } // shim receiver stats.
                if (!('getStats' in window.RTCRtpReceiver.prototype)) {
                    var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
                    if (origGetReceivers) window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
                        var _this7 = this;
                        var receivers = origGetReceivers.apply(this, []);
                        receivers.forEach(function(receiver) {
                            return receiver._pc = _this7;
                        });
                        return receivers;
                    };
                    utils.wrapPeerConnectionEvent(window, 'track', function(e) {
                        e.receiver._pc = e.srcElement;
                        return e;
                    });
                    window.RTCRtpReceiver.prototype.getStats = function getStats() {
                        var receiver = this;
                        return this._pc.getStats().then(function(result) {
                            return utils.filterStats(result, receiver.track, false);
                        });
                    };
                }
                if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) return;
                 // shim RTCPeerConnection.getStats(track).
                var origGetStats = window.RTCPeerConnection.prototype.getStats;
                window.RTCPeerConnection.prototype.getStats = function getStats() {
                    if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
                        var track = arguments[0];
                        var sender;
                        var receiver;
                        var err;
                        this.getSenders().forEach(function(s) {
                            if (s.track === track) {
                                if (sender) err = true;
                                else sender = s;
                            }
                        });
                        this.getReceivers().forEach(function(r) {
                            if (r.track === track) {
                                if (receiver) err = true;
                                else receiver = r;
                            }
                            return r.track === track;
                        });
                        if (err || sender && receiver) return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
                        else if (sender) return sender.getStats();
                        else if (receiver) return receiver.getStats();
                        return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
                    }
                    return origGetStats.apply(this, arguments);
                };
            }
            function shimAddTrackRemoveTrackWithNative(window) {
                // shim addTrack/removeTrack with native variants in order to make
                // the interactions with legacy getLocalStreams behave as in other browsers.
                // Keeps a mapping stream.id => [stream, rtpsenders...]
                window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
                    var _this8 = this;
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                    return Object.keys(this._shimmedLocalStreams).map(function(streamId) {
                        return _this8._shimmedLocalStreams[streamId][0];
                    });
                };
                var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                    if (!stream) return origAddTrack.apply(this, arguments);
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                    var sender = origAddTrack.apply(this, arguments);
                    if (!this._shimmedLocalStreams[stream.id]) this._shimmedLocalStreams[stream.id] = [
                        stream,
                        sender
                    ];
                    else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) this._shimmedLocalStreams[stream.id].push(sender);
                    return sender;
                };
                var origAddStream = window.RTCPeerConnection.prototype.addStream;
                window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                    var _this9 = this;
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                    stream.getTracks().forEach(function(track) {
                        var alreadyExists = _this9.getSenders().find(function(s) {
                            return s.track === track;
                        });
                        if (alreadyExists) throw new DOMException('Track already exists.', 'InvalidAccessError');
                    });
                    var existingSenders = this.getSenders();
                    origAddStream.apply(this, arguments);
                    var newSenders = this.getSenders().filter(function(newSender) {
                        return existingSenders.indexOf(newSender) === -1;
                    });
                    this._shimmedLocalStreams[stream.id] = [
                        stream
                    ].concat(newSenders);
                };
                var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
                window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                    delete this._shimmedLocalStreams[stream.id];
                    return origRemoveStream.apply(this, arguments);
                };
                var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
                window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
                    var _this10 = this;
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                    if (sender) Object.keys(this._shimmedLocalStreams).forEach(function(streamId) {
                        var idx = _this10._shimmedLocalStreams[streamId].indexOf(sender);
                        if (idx !== -1) _this10._shimmedLocalStreams[streamId].splice(idx, 1);
                        if (_this10._shimmedLocalStreams[streamId].length === 1) delete _this10._shimmedLocalStreams[streamId];
                    });
                    return origRemoveTrack.apply(this, arguments);
                };
            }
            function shimAddTrackRemoveTrack(window, browserDetails) {
                if (!window.RTCPeerConnection) return;
                 // shim addTrack and removeTrack.
                if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) return shimAddTrackRemoveTrackWithNative(window);
                 // also shim pc.getLocalStreams when addTrack is shimmed
                // to return the original streams.
                var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
                window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
                    var _this11 = this;
                    var nativeStreams = origGetLocalStreams.apply(this);
                    this._reverseStreams = this._reverseStreams || {};
                    return nativeStreams.map(function(stream) {
                        return _this11._reverseStreams[stream.id];
                    });
                };
                var origAddStream = window.RTCPeerConnection.prototype.addStream;
                window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                    var _this12 = this;
                    this._streams = this._streams || {};
                    this._reverseStreams = this._reverseStreams || {};
                    stream.getTracks().forEach(function(track) {
                        var alreadyExists = _this12.getSenders().find(function(s) {
                            return s.track === track;
                        });
                        if (alreadyExists) throw new DOMException('Track already exists.', 'InvalidAccessError');
                    }); // Add identity mapping for consistency with addTrack.
                    // Unless this is being used with a stream from addTrack.
                    if (!this._reverseStreams[stream.id]) {
                        var newStream = new window.MediaStream(stream.getTracks());
                        this._streams[stream.id] = newStream;
                        this._reverseStreams[newStream.id] = stream;
                        stream = newStream;
                    }
                    origAddStream.apply(this, [
                        stream
                    ]);
                };
                var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
                window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                    this._streams = this._streams || {};
                    this._reverseStreams = this._reverseStreams || {};
                    origRemoveStream.apply(this, [
                        this._streams[stream.id] || stream
                    ]);
                    delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
                    delete this._streams[stream.id];
                };
                window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                    var _this13 = this;
                    if (this.signalingState === 'closed') throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
                    var streams = [].slice.call(arguments, 1);
                    if (streams.length !== 1 || !streams[0].getTracks().find(function(t) {
                        return t === track;
                    })) // this is not fully correct but all we can manage without
                    // [[associated MediaStreams]] internal slot.
                    throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", 'NotSupportedError');
                    var alreadyExists = this.getSenders().find(function(s) {
                        return s.track === track;
                    });
                    if (alreadyExists) throw new DOMException('Track already exists.', 'InvalidAccessError');
                    this._streams = this._streams || {};
                    this._reverseStreams = this._reverseStreams || {};
                    var oldStream = this._streams[stream.id];
                    if (oldStream) {
                        // this is using odd Chrome behaviour, use with caution:
                        // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
                        // Note: we rely on the high-level addTrack/dtmf shim to
                        // create the sender with a dtmf sender.
                        oldStream.addTrack(track); // Trigger ONN async.
                        Promise.resolve().then(function() {
                            _this13.dispatchEvent(new Event('negotiationneeded'));
                        });
                    } else {
                        var newStream = new window.MediaStream([
                            track
                        ]);
                        this._streams[stream.id] = newStream;
                        this._reverseStreams[newStream.id] = stream;
                        this.addStream(newStream);
                    }
                    return this.getSenders().find(function(s) {
                        return s.track === track;
                    });
                }; // replace the internal stream id with the external one and
                // vice versa.
                function replaceInternalStreamId(pc, description) {
                    var sdp = description.sdp;
                    Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
                        var externalStream = pc._reverseStreams[internalId];
                        var internalStream = pc._streams[externalStream.id];
                        sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
                    });
                    return new RTCSessionDescription({
                        type: description.type,
                        sdp: sdp
                    });
                }
                function replaceExternalStreamId(pc, description) {
                    var sdp = description.sdp;
                    Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
                        var externalStream = pc._reverseStreams[internalId];
                        var internalStream = pc._streams[externalStream.id];
                        sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
                    });
                    return new RTCSessionDescription({
                        type: description.type,
                        sdp: sdp
                    });
                }
                [
                    'createOffer',
                    'createAnswer'
                ].forEach(function(method) {
                    var nativeMethod = window.RTCPeerConnection.prototype[method];
                    var methodObj = _defineProperty({}, method, function() {
                        var _this14 = this;
                        var args = arguments;
                        var isLegacyCall = arguments.length && typeof arguments[0] === 'function';
                        if (isLegacyCall) return nativeMethod.apply(this, [
                            function(description) {
                                var desc = replaceInternalStreamId(_this14, description);
                                args[0].apply(null, [
                                    desc
                                ]);
                            },
                            function(err) {
                                if (args[1]) args[1].apply(null, err);
                            },
                            arguments[2]
                        ]);
                        return nativeMethod.apply(this, arguments).then(function(description) {
                            return replaceInternalStreamId(_this14, description);
                        });
                    });
                    window.RTCPeerConnection.prototype[method] = methodObj[method];
                });
                var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
                window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
                    if (!arguments.length || !arguments[0].type) return origSetLocalDescription.apply(this, arguments);
                    arguments[0] = replaceExternalStreamId(this, arguments[0]);
                    return origSetLocalDescription.apply(this, arguments);
                }; // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier
                var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
                Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
                    get: function() {
                        var description = origLocalDescription.get.apply(this);
                        if (description.type === '') return description;
                        return replaceInternalStreamId(this, description);
                    }
                });
                window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
                    var _this15 = this;
                    if (this.signalingState === 'closed') throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
                     // We can not yet check for sender instanceof RTCRtpSender
                    // since we shim RTPSender. So we check if sender._pc is set.
                    if (!sender._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", 'TypeError');
                    var isLocal = sender._pc === this;
                    if (!isLocal) throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
                     // Search for the native stream the senders track belongs to.
                    this._streams = this._streams || {};
                    var stream;
                    Object.keys(this._streams).forEach(function(streamid) {
                        var hasTrack = _this15._streams[streamid].getTracks().find(function(track) {
                            return sender.track === track;
                        });
                        if (hasTrack) stream = _this15._streams[streamid];
                    });
                    if (stream) {
                        if (stream.getTracks().length === 1) // if this is the last track of the stream, remove the stream. This
                        // takes care of any shimmed _senders.
                        this.removeStream(this._reverseStreams[stream.id]);
                        else // relying on the same odd chrome behaviour as above.
                        stream.removeTrack(sender.track);
                        this.dispatchEvent(new Event('negotiationneeded'));
                    }
                };
            }
            function shimPeerConnection(window, browserDetails) {
                if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) // very basic support for old versions.
                window.RTCPeerConnection = window.webkitRTCPeerConnection;
                if (!window.RTCPeerConnection) return;
                 // shim implicit creation of RTCSessionDescription/RTCIceCandidate
                if (browserDetails.version < 53) [
                    'setLocalDescription',
                    'setRemoteDescription',
                    'addIceCandidate'
                ].forEach(function(method) {
                    var nativeMethod = window.RTCPeerConnection.prototype[method];
                    var methodObj = _defineProperty({}, method, function() {
                        arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
                        return nativeMethod.apply(this, arguments);
                    });
                    window.RTCPeerConnection.prototype[method] = methodObj[method];
                });
            } // Attempt to fix ONN in plan-b mode.
            function fixNegotiationNeeded(window, browserDetails) {
                utils.wrapPeerConnectionEvent(window, 'negotiationneeded', function(e) {
                    var pc = e.target;
                    if (browserDetails.version < 72 || pc.getConfiguration && pc.getConfiguration().sdpSemantics === 'plan-b') {
                        if (pc.signalingState !== 'stable') return;
                    }
                    return e;
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
            /*
 *  Copyright (c) 2018 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.filterIceServers = filterIceServers;
            var utils = _interopRequireWildcard(require("../utils"));
            function _getRequireWildcardCache() {
                if (typeof WeakMap !== "function") return null;
                var cache = new WeakMap();
                _getRequireWildcardCache = function() {
                    return cache;
                };
                return cache;
            }
            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) return obj;
                if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
                    default: obj
                };
                var cache = _getRequireWildcardCache();
                if (cache && cache.has(obj)) return cache.get(obj);
                var newObj = {};
                var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                    if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
                    else newObj[key] = obj[key];
                }
                newObj.default = obj;
                if (cache) cache.set(obj, newObj);
                return newObj;
            }
            // Edge does not like
            // 1) stun: filtered after 14393 unless ?transport=udp is present
            // 2) turn: that does not have all of turn:host:port?transport=udp
            // 3) turn: with ipv6 addresses
            // 4) turn: occurring muliple times
            function filterIceServers(iceServers, edgeVersion) {
                var hasTurn = false;
                iceServers = JSON.parse(JSON.stringify(iceServers));
                return iceServers.filter(function(server) {
                    if (server && (server.urls || server.url)) {
                        var urls = server.urls || server.url;
                        if (server.url && !server.urls) utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                        var isString = typeof urls === 'string';
                        if (isString) urls = [
                            urls
                        ];
                        urls = urls.filter(function(url) {
                            // filter STUN unconditionally.
                            if (url.indexOf('stun:') === 0) return false;
                            var validTurn = url.startsWith('turn') && !url.startsWith('turn:[') && url.includes('transport=udp');
                            if (validTurn && !hasTurn) {
                                hasTurn = true;
                                return true;
                            }
                            return validTurn && !hasTurn;
                        });
                        delete server.url;
                        server.urls = isString ? urls[0] : urls;
                        return !!urls.length;
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
            /* eslint-env node */ 'use strict';
            // SDP helpers.
            var SDPUtils = {};
            // Generate an alphanumeric identifier for cname or mids.
            // TODO: use UUIDs instead? https://gist.github.com/jed/982883
            SDPUtils.generateIdentifier = function() {
                return Math.random().toString(36).substr(2, 10);
            };
            // The RTCP CNAME used by all peerconnections from the same JS.
            SDPUtils.localCName = SDPUtils.generateIdentifier();
            // Splits SDP into lines, dealing with both CRLF and LF.
            SDPUtils.splitLines = function(blob) {
                return blob.trim().split('\n').map(function(line) {
                    return line.trim();
                });
            };
            // Splits SDP into sessionpart and mediasections. Ensures CRLF.
            SDPUtils.splitSections = function(blob) {
                var parts = blob.split('\nm=');
                return parts.map(function(part, index) {
                    return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
                });
            };
            // returns the session description.
            SDPUtils.getDescription = function(blob) {
                var sections = SDPUtils.splitSections(blob);
                return sections && sections[0];
            };
            // returns the individual media sections.
            SDPUtils.getMediaSections = function(blob) {
                var sections = SDPUtils.splitSections(blob);
                sections.shift();
                return sections;
            };
            // Returns lines that start with a certain prefix.
            SDPUtils.matchPrefix = function(blob, prefix) {
                return SDPUtils.splitLines(blob).filter(function(line) {
                    return line.indexOf(prefix) === 0;
                });
            };
            // Parses an ICE candidate line. Sample input:
            // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
            // rport 55996"
            SDPUtils.parseCandidate = function(line) {
                var parts;
                // Parse both variants.
                if (line.indexOf('a=candidate:') === 0) parts = line.substring(12).split(' ');
                else parts = line.substring(10).split(' ');
                var candidate = {
                    foundation: parts[0],
                    component: parseInt(parts[1], 10),
                    protocol: parts[2].toLowerCase(),
                    priority: parseInt(parts[3], 10),
                    ip: parts[4],
                    address: parts[4],
                    port: parseInt(parts[5], 10),
                    // skip parts[6] == 'typ'
                    type: parts[7]
                };
                for(var i = 8; i < parts.length; i += 2)switch(parts[i]){
                    case 'raddr':
                        candidate.relatedAddress = parts[i + 1];
                        break;
                    case 'rport':
                        candidate.relatedPort = parseInt(parts[i + 1], 10);
                        break;
                    case 'tcptype':
                        candidate.tcpType = parts[i + 1];
                        break;
                    case 'ufrag':
                        candidate.ufrag = parts[i + 1]; // for backward compability.
                        candidate.usernameFragment = parts[i + 1];
                        break;
                    default:
                        candidate[parts[i]] = parts[i + 1];
                        break;
                }
                return candidate;
            };
            // Translates a candidate object into SDP candidate attribute.
            SDPUtils.writeCandidate = function(candidate) {
                var sdp = [];
                sdp.push(candidate.foundation);
                sdp.push(candidate.component);
                sdp.push(candidate.protocol.toUpperCase());
                sdp.push(candidate.priority);
                sdp.push(candidate.address || candidate.ip);
                sdp.push(candidate.port);
                var type = candidate.type;
                sdp.push('typ');
                sdp.push(type);
                if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
                    sdp.push('raddr');
                    sdp.push(candidate.relatedAddress);
                    sdp.push('rport');
                    sdp.push(candidate.relatedPort);
                }
                if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
                    sdp.push('tcptype');
                    sdp.push(candidate.tcpType);
                }
                if (candidate.usernameFragment || candidate.ufrag) {
                    sdp.push('ufrag');
                    sdp.push(candidate.usernameFragment || candidate.ufrag);
                }
                return 'candidate:' + sdp.join(' ');
            };
            // Parses an ice-options line, returns an array of option tags.
            // a=ice-options:foo bar
            SDPUtils.parseIceOptions = function(line) {
                return line.substr(14).split(' ');
            };
            // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
            // a=rtpmap:111 opus/48000/2
            SDPUtils.parseRtpMap = function(line) {
                var parts = line.substr(9).split(' ');
                var parsed = {
                    payloadType: parseInt(parts.shift(), 10) // was: id
                };
                parts = parts[0].split('/');
                parsed.name = parts[0];
                parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
                parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
                // legacy alias, got renamed back to channels in ORTC.
                parsed.numChannels = parsed.channels;
                return parsed;
            };
            // Generate an a=rtpmap line from RTCRtpCodecCapability or
            // RTCRtpCodecParameters.
            SDPUtils.writeRtpMap = function(codec) {
                var pt = codec.payloadType;
                if (codec.preferredPayloadType !== undefined) pt = codec.preferredPayloadType;
                var channels = codec.channels || codec.numChannels || 1;
                return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (channels !== 1 ? '/' + channels : '') + '\r\n';
            };
            // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
            // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
            // a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
            SDPUtils.parseExtmap = function(line) {
                var parts = line.substr(9).split(' ');
                return {
                    id: parseInt(parts[0], 10),
                    direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
                    uri: parts[1]
                };
            };
            // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
            // RTCRtpHeaderExtension.
            SDPUtils.writeExtmap = function(headerExtension) {
                return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== 'sendrecv' ? '/' + headerExtension.direction : '') + ' ' + headerExtension.uri + '\r\n';
            };
            // Parses an ftmp line, returns dictionary. Sample input:
            // a=fmtp:96 vbr=on;cng=on
            // Also deals with vbr=on; cng=on
            SDPUtils.parseFmtp = function(line) {
                var parsed = {};
                var kv;
                var parts = line.substr(line.indexOf(' ') + 1).split(';');
                for(var j = 0; j < parts.length; j++){
                    kv = parts[j].trim().split('=');
                    parsed[kv[0].trim()] = kv[1];
                }
                return parsed;
            };
            // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
            SDPUtils.writeFmtp = function(codec) {
                var line = '';
                var pt = codec.payloadType;
                if (codec.preferredPayloadType !== undefined) pt = codec.preferredPayloadType;
                if (codec.parameters && Object.keys(codec.parameters).length) {
                    var params = [];
                    Object.keys(codec.parameters).forEach(function(param) {
                        if (codec.parameters[param]) params.push(param + '=' + codec.parameters[param]);
                        else params.push(param);
                    });
                    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
                }
                return line;
            };
            // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
            // a=rtcp-fb:98 nack rpsi
            SDPUtils.parseRtcpFb = function(line) {
                var parts = line.substr(line.indexOf(' ') + 1).split(' ');
                return {
                    type: parts.shift(),
                    parameter: parts.join(' ')
                };
            };
            // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
            SDPUtils.writeRtcpFb = function(codec) {
                var lines = '';
                var pt = codec.payloadType;
                if (codec.preferredPayloadType !== undefined) pt = codec.preferredPayloadType;
                if (codec.rtcpFeedback && codec.rtcpFeedback.length) // FIXME: special handling for trr-int?
                codec.rtcpFeedback.forEach(function(fb) {
                    lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') + '\r\n';
                });
                return lines;
            };
            // Parses an RFC 5576 ssrc media attribute. Sample input:
            // a=ssrc:3735928559 cname:something
            SDPUtils.parseSsrcMedia = function(line) {
                var sp = line.indexOf(' ');
                var parts = {
                    ssrc: parseInt(line.substr(7, sp - 7), 10)
                };
                var colon = line.indexOf(':', sp);
                if (colon > -1) {
                    parts.attribute = line.substr(sp + 1, colon - sp - 1);
                    parts.value = line.substr(colon + 1);
                } else parts.attribute = line.substr(sp + 1);
                return parts;
            };
            SDPUtils.parseSsrcGroup = function(line) {
                var parts = line.substr(13).split(' ');
                return {
                    semantics: parts.shift(),
                    ssrcs: parts.map(function(ssrc) {
                        return parseInt(ssrc, 10);
                    })
                };
            };
            // Extracts the MID (RFC 5888) from a media section.
            // returns the MID or undefined if no mid line was found.
            SDPUtils.getMid = function(mediaSection) {
                var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
                if (mid) return mid.substr(6);
            };
            SDPUtils.parseFingerprint = function(line) {
                var parts = line.substr(14).split(' ');
                return {
                    algorithm: parts[0].toLowerCase(),
                    value: parts[1]
                };
            };
            // Extracts DTLS parameters from SDP media section or sessionpart.
            // FIXME: for consistency with other functions this should only
            //   get the fingerprint line as input. See also getIceParameters.
            SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
                var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=fingerprint:');
                // Note: a=setup line is ignored since we use the 'auto' role.
                // Note2: 'algorithm' is not case sensitive except in Edge.
                return {
                    role: 'auto',
                    fingerprints: lines.map(SDPUtils.parseFingerprint)
                };
            };
            // Serializes DTLS parameters to SDP.
            SDPUtils.writeDtlsParameters = function(params, setupType) {
                var sdp = 'a=setup:' + setupType + '\r\n';
                params.fingerprints.forEach(function(fp) {
                    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
                });
                return sdp;
            };
            // Parses a=crypto lines into
            //   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
            SDPUtils.parseCryptoLine = function(line) {
                var parts = line.substr(9).split(' ');
                return {
                    tag: parseInt(parts[0], 10),
                    cryptoSuite: parts[1],
                    keyParams: parts[2],
                    sessionParams: parts.slice(3)
                };
            };
            SDPUtils.writeCryptoLine = function(parameters) {
                return 'a=crypto:' + parameters.tag + ' ' + parameters.cryptoSuite + ' ' + (typeof parameters.keyParams === 'object' ? SDPUtils.writeCryptoKeyParams(parameters.keyParams) : parameters.keyParams) + (parameters.sessionParams ? ' ' + parameters.sessionParams.join(' ') : '') + '\r\n';
            };
            // Parses the crypto key parameters into
            //   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
            SDPUtils.parseCryptoKeyParams = function(keyParams) {
                if (keyParams.indexOf('inline:') !== 0) return null;
                var parts = keyParams.substr(7).split('|');
                return {
                    keyMethod: 'inline',
                    keySalt: parts[0],
                    lifeTime: parts[1],
                    mkiValue: parts[2] ? parts[2].split(':')[0] : undefined,
                    mkiLength: parts[2] ? parts[2].split(':')[1] : undefined
                };
            };
            SDPUtils.writeCryptoKeyParams = function(keyParams) {
                return keyParams.keyMethod + ':' + keyParams.keySalt + (keyParams.lifeTime ? '|' + keyParams.lifeTime : '') + (keyParams.mkiValue && keyParams.mkiLength ? '|' + keyParams.mkiValue + ':' + keyParams.mkiLength : '');
            };
            // Extracts all SDES paramters.
            SDPUtils.getCryptoParameters = function(mediaSection, sessionpart) {
                var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=crypto:');
                return lines.map(SDPUtils.parseCryptoLine);
            };
            // Parses ICE information from SDP media section or sessionpart.
            // FIXME: for consistency with other functions this should only
            //   get the ice-ufrag and ice-pwd lines as input.
            SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
                var ufrag = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=ice-ufrag:')[0];
                var pwd = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=ice-pwd:')[0];
                if (!(ufrag && pwd)) return null;
                return {
                    usernameFragment: ufrag.substr(12),
                    password: pwd.substr(10)
                };
            };
            // Serializes ICE parameters to SDP.
            SDPUtils.writeIceParameters = function(params) {
                return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
            };
            // Parses the SDP media section and returns RTCRtpParameters.
            SDPUtils.parseRtpParameters = function(mediaSection) {
                var description = {
                    codecs: [],
                    headerExtensions: [],
                    fecMechanisms: [],
                    rtcp: []
                };
                var lines = SDPUtils.splitLines(mediaSection);
                var mline = lines[0].split(' ');
                for(var i = 3; i < mline.length; i++){
                    var pt = mline[i];
                    var rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];
                    if (rtpmapline) {
                        var codec = SDPUtils.parseRtpMap(rtpmapline);
                        var fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' ');
                        // Only the first a=fmtp:<pt> is considered.
                        codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
                        codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
                        description.codecs.push(codec);
                        // parse FEC mechanisms from rtpmap lines.
                        switch(codec.name.toUpperCase()){
                            case 'RED':
                            case 'ULPFEC':
                                description.fecMechanisms.push(codec.name.toUpperCase());
                                break;
                            default:
                                break;
                        }
                    }
                }
                SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
                    description.headerExtensions.push(SDPUtils.parseExtmap(line));
                });
                // FIXME: parse rtcp.
                return description;
            };
            // Generates parts of the SDP media section describing the capabilities /
            // parameters.
            SDPUtils.writeRtpDescription = function(kind, caps) {
                var sdp = '';
                // Build the mline.
                sdp += 'm=' + kind + ' ';
                sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
                sdp += ' UDP/TLS/RTP/SAVPF ';
                sdp += caps.codecs.map(function(codec) {
                    if (codec.preferredPayloadType !== undefined) return codec.preferredPayloadType;
                    return codec.payloadType;
                }).join(' ') + '\r\n';
                sdp += 'c=IN IP4 0.0.0.0\r\n';
                sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';
                // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
                caps.codecs.forEach(function(codec) {
                    sdp += SDPUtils.writeRtpMap(codec);
                    sdp += SDPUtils.writeFmtp(codec);
                    sdp += SDPUtils.writeRtcpFb(codec);
                });
                var maxptime = 0;
                caps.codecs.forEach(function(codec) {
                    if (codec.maxptime > maxptime) maxptime = codec.maxptime;
                });
                if (maxptime > 0) sdp += 'a=maxptime:' + maxptime + '\r\n';
                sdp += 'a=rtcp-mux\r\n';
                if (caps.headerExtensions) caps.headerExtensions.forEach(function(extension) {
                    sdp += SDPUtils.writeExtmap(extension);
                });
                // FIXME: write fecMechanisms.
                return sdp;
            };
            // Parses the SDP media section and returns an array of
            // RTCRtpEncodingParameters.
            SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
                var encodingParameters = [];
                var description = SDPUtils.parseRtpParameters(mediaSection);
                var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
                var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;
                // filter a=ssrc:... cname:, ignore PlanB-msid
                var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function(line) {
                    return SDPUtils.parseSsrcMedia(line);
                }).filter(function(parts) {
                    return parts.attribute === 'cname';
                });
                var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
                var secondarySsrc;
                var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map(function(line) {
                    var parts = line.substr(17).split(' ');
                    return parts.map(function(part) {
                        return parseInt(part, 10);
                    });
                });
                if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) secondarySsrc = flows[0][1];
                description.codecs.forEach(function(codec) {
                    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
                        var encParam = {
                            ssrc: primarySsrc,
                            codecPayloadType: parseInt(codec.parameters.apt, 10)
                        };
                        if (primarySsrc && secondarySsrc) encParam.rtx = {
                            ssrc: secondarySsrc
                        };
                        encodingParameters.push(encParam);
                        if (hasRed) {
                            encParam = JSON.parse(JSON.stringify(encParam));
                            encParam.fec = {
                                ssrc: primarySsrc,
                                mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
                            };
                            encodingParameters.push(encParam);
                        }
                    }
                });
                if (encodingParameters.length === 0 && primarySsrc) encodingParameters.push({
                    ssrc: primarySsrc
                });
                // we support both b=AS and b=TIAS but interpret AS as TIAS.
                var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
                if (bandwidth.length) {
                    if (bandwidth[0].indexOf('b=TIAS:') === 0) bandwidth = parseInt(bandwidth[0].substr(7), 10);
                    else if (bandwidth[0].indexOf('b=AS:') === 0) // use formula from JSEP to convert b=AS to TIAS value.
                    bandwidth = parseInt(bandwidth[0].substr(5), 10) * 950 - 16000;
                    else bandwidth = undefined;
                    encodingParameters.forEach(function(params) {
                        params.maxBitrate = bandwidth;
                    });
                }
                return encodingParameters;
            };
            // parses http://draft.ortc.org/#rtcrtcpparameters*
            SDPUtils.parseRtcpParameters = function(mediaSection) {
                var rtcpParameters = {};
                // Gets the first SSRC. Note tha with RTX there might be multiple
                // SSRCs.
                var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function(line) {
                    return SDPUtils.parseSsrcMedia(line);
                }).filter(function(obj) {
                    return obj.attribute === 'cname';
                })[0];
                if (remoteSsrc) {
                    rtcpParameters.cname = remoteSsrc.value;
                    rtcpParameters.ssrc = remoteSsrc.ssrc;
                }
                // Edge uses the compound attribute instead of reducedSize
                // compound is !reducedSize
                var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
                rtcpParameters.reducedSize = rsize.length > 0;
                rtcpParameters.compound = rsize.length === 0;
                // parses the rtcp-mux attrіbute.
                // Note that Edge does not support unmuxed RTCP.
                var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
                rtcpParameters.mux = mux.length > 0;
                return rtcpParameters;
            };
            // parses either a=msid: or a=ssrc:... msid lines and returns
            // the id of the MediaStream and MediaStreamTrack.
            SDPUtils.parseMsid = function(mediaSection) {
                var parts;
                var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
                if (spec.length === 1) {
                    parts = spec[0].substr(7).split(' ');
                    return {
                        stream: parts[0],
                        track: parts[1]
                    };
                }
                var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function(line) {
                    return SDPUtils.parseSsrcMedia(line);
                }).filter(function(msidParts) {
                    return msidParts.attribute === 'msid';
                });
                if (planB.length > 0) {
                    parts = planB[0].value.split(' ');
                    return {
                        stream: parts[0],
                        track: parts[1]
                    };
                }
            };
            // SCTP
            // parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
            // to draft-ietf-mmusic-sctp-sdp-05
            SDPUtils.parseSctpDescription = function(mediaSection) {
                var mline = SDPUtils.parseMLine(mediaSection);
                var maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
                var maxMessageSize;
                if (maxSizeLine.length > 0) maxMessageSize = parseInt(maxSizeLine[0].substr(19), 10);
                if (isNaN(maxMessageSize)) maxMessageSize = 65536;
                var sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
                if (sctpPort.length > 0) return {
                    port: parseInt(sctpPort[0].substr(12), 10),
                    protocol: mline.fmt,
                    maxMessageSize: maxMessageSize
                };
                var sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
                if (sctpMapLines.length > 0) {
                    var parts = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:')[0].substr(10).split(' ');
                    return {
                        port: parseInt(parts[0], 10),
                        protocol: parts[1],
                        maxMessageSize: maxMessageSize
                    };
                }
            };
            // SCTP
            // outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
            // support by now receiving in this format, unless we originally parsed
            // as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
            // protocol of DTLS/SCTP -- without UDP/ or TCP/)
            SDPUtils.writeSctpDescription = function(media, sctp) {
                var output = [];
                if (media.protocol !== 'DTLS/SCTP') output = [
                    'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n',
                    'c=IN IP4 0.0.0.0\r\n',
                    'a=sctp-port:' + sctp.port + '\r\n'
                ];
                else output = [
                    'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n',
                    'c=IN IP4 0.0.0.0\r\n',
                    'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n'
                ];
                if (sctp.maxMessageSize !== undefined) output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
                return output.join('');
            };
            // Generate a session ID for SDP.
            // https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
            // recommends using a cryptographically random +ve 64-bit value
            // but right now this should be acceptable and within the right range
            SDPUtils.generateSessionId = function() {
                return Math.random().toString().substr(2, 21);
            };
            // Write boilder plate for start of SDP
            // sessId argument is optional - if not supplied it will
            // be generated randomly
            // sessVersion is optional and defaults to 2
            // sessUser is optional and defaults to 'thisisadapterortc'
            SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
                var sessionId;
                var version = sessVer !== undefined ? sessVer : 2;
                if (sessId) sessionId = sessId;
                else sessionId = SDPUtils.generateSessionId();
                var user = sessUser || 'thisisadapterortc';
                // FIXME: sess-id should be an NTP timestamp.
                return "v=0\r\no=" + user + ' ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
            };
            SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
                var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);
                // Map ICE parameters (ufrag, pwd) to SDP.
                sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());
                // Map DTLS parameters to SDP.
                sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : 'active');
                sdp += 'a=mid:' + transceiver.mid + '\r\n';
                if (transceiver.direction) sdp += 'a=' + transceiver.direction + '\r\n';
                else if (transceiver.rtpSender && transceiver.rtpReceiver) sdp += 'a=sendrecv\r\n';
                else if (transceiver.rtpSender) sdp += 'a=sendonly\r\n';
                else if (transceiver.rtpReceiver) sdp += 'a=recvonly\r\n';
                else sdp += 'a=inactive\r\n';
                if (transceiver.rtpSender) {
                    // spec.
                    var msid = 'msid:' + stream.id + ' ' + transceiver.rtpSender.track.id + '\r\n';
                    sdp += 'a=' + msid;
                    // for Chrome.
                    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;
                    if (transceiver.sendEncodingParameters[0].rtx) {
                        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
                        sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
                    }
                }
                // FIXME: this should be written by writeRtpDescription.
                sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
                if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
                return sdp;
            };
            // Gets the direction from the mediaSection or the sessionpart.
            SDPUtils.getDirection = function(mediaSection, sessionpart) {
                // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
                var lines = SDPUtils.splitLines(mediaSection);
                for(var i = 0; i < lines.length; i++)switch(lines[i]){
                    case 'a=sendrecv':
                    case 'a=sendonly':
                    case 'a=recvonly':
                    case 'a=inactive':
                        return lines[i].substr(2);
                    default:
                }
                if (sessionpart) return SDPUtils.getDirection(sessionpart);
                return 'sendrecv';
            };
            SDPUtils.getKind = function(mediaSection) {
                var lines = SDPUtils.splitLines(mediaSection);
                var mline = lines[0].split(' ');
                return mline[0].substr(2);
            };
            SDPUtils.isRejected = function(mediaSection) {
                return mediaSection.split(' ', 2)[1] === '0';
            };
            SDPUtils.parseMLine = function(mediaSection) {
                var lines = SDPUtils.splitLines(mediaSection);
                var parts = lines[0].substr(2).split(' ');
                return {
                    kind: parts[0],
                    port: parseInt(parts[1], 10),
                    protocol: parts[2],
                    fmt: parts.slice(3).join(' ')
                };
            };
            SDPUtils.parseOLine = function(mediaSection) {
                var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
                var parts = line.substr(2).split(' ');
                return {
                    username: parts[0],
                    sessionId: parts[1],
                    sessionVersion: parseInt(parts[2], 10),
                    netType: parts[3],
                    addressType: parts[4],
                    address: parts[5]
                };
            };
            // a very naive interpretation of a valid SDP.
            SDPUtils.isValidSDP = function(blob) {
                if (typeof blob !== 'string' || blob.length === 0) return false;
                var lines = SDPUtils.splitLines(blob);
                for(var i = 0; i < lines.length; i++){
                    if (lines[i].length < 2 || lines[i].charAt(1) !== '=') return false;
                // TODO: check the modifier a bit more.
                }
                return true;
            };
            // Expose public methods.
            if (typeof module === 'object') module.exports = SDPUtils;
        },
        {}
    ],
    "NJ2u": [
        function(require, module, exports) {
            /*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            var SDPUtils = require('sdp');
            function fixStatsType(stat) {
                return ({
                    inboundrtp: 'inbound-rtp',
                    outboundrtp: 'outbound-rtp',
                    candidatepair: 'candidate-pair',
                    localcandidate: 'local-candidate',
                    remotecandidate: 'remote-candidate'
                })[stat.type] || stat.type;
            }
            function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
                var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps); // Map ICE parameters (ufrag, pwd) to SDP.
                sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters()); // Map DTLS parameters to SDP.
                sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : dtlsRole || 'active');
                sdp += 'a=mid:' + transceiver.mid + '\r\n';
                if (transceiver.rtpSender && transceiver.rtpReceiver) sdp += 'a=sendrecv\r\n';
                else if (transceiver.rtpSender) sdp += 'a=sendonly\r\n';
                else if (transceiver.rtpReceiver) sdp += 'a=recvonly\r\n';
                else sdp += 'a=inactive\r\n';
                if (transceiver.rtpSender) {
                    var trackId = transceiver.rtpSender._initialTrackId || transceiver.rtpSender.track.id;
                    transceiver.rtpSender._initialTrackId = trackId; // spec.
                    var msid = 'msid:' + (stream ? stream.id : '-') + ' ' + trackId + '\r\n';
                    sdp += 'a=' + msid; // for Chrome. Legacy should no longer be required.
                    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid; // RTX
                    if (transceiver.sendEncodingParameters[0].rtx) {
                        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
                        sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
                    }
                } // FIXME: this should be written by writeRtpDescription.
                sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
                if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
                return sdp;
            } // Edge does not like
            // 1) stun: filtered after 14393 unless ?transport=udp is present
            // 2) turn: that does not have all of turn:host:port?transport=udp
            // 3) turn: with ipv6 addresses
            // 4) turn: occurring muliple times
            function filterIceServers(iceServers, edgeVersion) {
                var hasTurn = false;
                iceServers = JSON.parse(JSON.stringify(iceServers));
                return iceServers.filter(function(server) {
                    if (server && (server.urls || server.url)) {
                        var urls = server.urls || server.url;
                        if (server.url && !server.urls) console.warn('RTCIceServer.url is deprecated! Use urls instead.');
                        var isString = typeof urls === 'string';
                        if (isString) urls = [
                            urls
                        ];
                        urls = urls.filter(function(url) {
                            var validTurn = url.indexOf('turn:') === 0 && url.indexOf('transport=udp') !== -1 && url.indexOf('turn:[') === -1 && !hasTurn;
                            if (validTurn) {
                                hasTurn = true;
                                return true;
                            }
                            return url.indexOf('stun:') === 0 && edgeVersion >= 14393 && url.indexOf('?transport=udp') === -1;
                        });
                        delete server.url;
                        server.urls = isString ? urls[0] : urls;
                        return !!urls.length;
                    }
                });
            } // Determines the intersection of local and remote capabilities.
            function getCommonCapabilities(localCapabilities, remoteCapabilities) {
                var commonCapabilities = {
                    codecs: [],
                    headerExtensions: [],
                    fecMechanisms: []
                };
                var findCodecByPayloadType = function(pt, codecs) {
                    pt = parseInt(pt, 10);
                    for(var i = 0; i < codecs.length; i++){
                        if (codecs[i].payloadType === pt || codecs[i].preferredPayloadType === pt) return codecs[i];
                    }
                };
                var rtxCapabilityMatches = function(lRtx, rRtx, lCodecs, rCodecs) {
                    var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
                    var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
                    return lCodec && rCodec && lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
                };
                localCapabilities.codecs.forEach(function(lCodec) {
                    for(var i = 0; i < remoteCapabilities.codecs.length; i++){
                        var rCodec = remoteCapabilities.codecs[i];
                        if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() && lCodec.clockRate === rCodec.clockRate) {
                            if (lCodec.name.toLowerCase() === 'rtx' && lCodec.parameters && rCodec.parameters.apt) {
                                // for RTX we need to find the local rtx that has a apt
                                // which points to the same local codec as the remote one.
                                if (!rtxCapabilityMatches(lCodec, rCodec, localCapabilities.codecs, remoteCapabilities.codecs)) continue;
                            }
                            rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
                            // number of channels is the highest common number of channels
                            rCodec.numChannels = Math.min(lCodec.numChannels, rCodec.numChannels); // push rCodec so we reply with offerer payload type
                            commonCapabilities.codecs.push(rCodec); // determine common feedback mechanisms
                            rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
                                for(var j = 0; j < lCodec.rtcpFeedback.length; j++){
                                    if (lCodec.rtcpFeedback[j].type === fb.type && lCodec.rtcpFeedback[j].parameter === fb.parameter) return true;
                                }
                                return false;
                            }); // FIXME: also need to determine .parameters
                            break;
                        }
                    }
                });
                localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
                    for(var i = 0; i < remoteCapabilities.headerExtensions.length; i++){
                        var rHeaderExtension = remoteCapabilities.headerExtensions[i];
                        if (lHeaderExtension.uri === rHeaderExtension.uri) {
                            commonCapabilities.headerExtensions.push(rHeaderExtension);
                            break;
                        }
                    }
                }); // FIXME: fecMechanisms
                return commonCapabilities;
            } // is action=setLocalDescription with type allowed in signalingState
            function isActionAllowedInSignalingState(action, type, signalingState) {
                return ({
                    offer: {
                        setLocalDescription: [
                            'stable',
                            'have-local-offer'
                        ],
                        setRemoteDescription: [
                            'stable',
                            'have-remote-offer'
                        ]
                    },
                    answer: {
                        setLocalDescription: [
                            'have-remote-offer',
                            'have-local-pranswer'
                        ],
                        setRemoteDescription: [
                            'have-local-offer',
                            'have-remote-pranswer'
                        ]
                    }
                })[type][action].indexOf(signalingState) !== -1;
            }
            function maybeAddCandidate(iceTransport, candidate) {
                // Edge's internal representation adds some fields therefore
                // not all fieldѕ are taken into account.
                var alreadyAdded = iceTransport.getRemoteCandidates().find(function(remoteCandidate) {
                    return candidate.foundation === remoteCandidate.foundation && candidate.ip === remoteCandidate.ip && candidate.port === remoteCandidate.port && candidate.priority === remoteCandidate.priority && candidate.protocol === remoteCandidate.protocol && candidate.type === remoteCandidate.type;
                });
                if (!alreadyAdded) iceTransport.addRemoteCandidate(candidate);
                return !alreadyAdded;
            }
            function makeError(name, description) {
                var e = new Error(description);
                e.name = name; // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
                e.code = ({
                    NotSupportedError: 9,
                    InvalidStateError: 11,
                    InvalidAccessError: 15,
                    TypeError: undefined,
                    OperationError: undefined
                })[name];
                return e;
            }
            module.exports = function(window, edgeVersion) {
                // https://w3c.github.io/mediacapture-main/#mediastream
                // Helper function to add the track to the stream and
                // dispatch the event ourselves.
                function addTrackToStreamAndFireEvent(track, stream) {
                    stream.addTrack(track);
                    stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack', {
                        track: track
                    }));
                }
                function removeTrackFromStreamAndFireEvent(track, stream) {
                    stream.removeTrack(track);
                    stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack', {
                        track: track
                    }));
                }
                function fireAddTrack(pc, track, receiver, streams) {
                    var trackEvent = new Event('track');
                    trackEvent.track = track;
                    trackEvent.receiver = receiver;
                    trackEvent.transceiver = {
                        receiver: receiver
                    };
                    trackEvent.streams = streams;
                    window.setTimeout(function() {
                        pc._dispatchEvent('track', trackEvent);
                    });
                }
                var RTCPeerConnection = function(config) {
                    var pc = this;
                    var _eventTarget = document.createDocumentFragment();
                    [
                        'addEventListener',
                        'removeEventListener',
                        'dispatchEvent'
                    ].forEach(function(method) {
                        pc[method] = _eventTarget[method].bind(_eventTarget);
                    });
                    this.canTrickleIceCandidates = null;
                    this.needNegotiation = false;
                    this.localStreams = [];
                    this.remoteStreams = [];
                    this._localDescription = null;
                    this._remoteDescription = null;
                    this.signalingState = 'stable';
                    this.iceConnectionState = 'new';
                    this.connectionState = 'new';
                    this.iceGatheringState = 'new';
                    config = JSON.parse(JSON.stringify(config || {}));
                    this.usingBundle = config.bundlePolicy === 'max-bundle';
                    if (config.rtcpMuxPolicy === 'negotiate') throw makeError('NotSupportedError', 'rtcpMuxPolicy \'negotiate\' is not supported');
                    else if (!config.rtcpMuxPolicy) config.rtcpMuxPolicy = 'require';
                    switch(config.iceTransportPolicy){
                        case 'all':
                        case 'relay':
                            break;
                        default:
                            config.iceTransportPolicy = 'all';
                            break;
                    }
                    switch(config.bundlePolicy){
                        case 'balanced':
                        case 'max-compat':
                        case 'max-bundle':
                            break;
                        default:
                            config.bundlePolicy = 'balanced';
                            break;
                    }
                    config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);
                    this._iceGatherers = [];
                    if (config.iceCandidatePoolSize) for(var i = config.iceCandidatePoolSize; i > 0; i--)this._iceGatherers.push(new window.RTCIceGatherer({
                        iceServers: config.iceServers,
                        gatherPolicy: config.iceTransportPolicy
                    }));
                    else config.iceCandidatePoolSize = 0;
                    this._config = config; // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
                    // everything that is needed to describe a SDP m-line.
                    this.transceivers = [];
                    this._sdpSessionId = SDPUtils.generateSessionId();
                    this._sdpSessionVersion = 0;
                    this._dtlsRole = undefined; // role for a=setup to use in answers.
                    this._isClosed = false;
                };
                Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
                    configurable: true,
                    get: function() {
                        return this._localDescription;
                    }
                });
                Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
                    configurable: true,
                    get: function() {
                        return this._remoteDescription;
                    }
                }); // set up event handlers on prototype
                RTCPeerConnection.prototype.onicecandidate = null;
                RTCPeerConnection.prototype.onaddstream = null;
                RTCPeerConnection.prototype.ontrack = null;
                RTCPeerConnection.prototype.onremovestream = null;
                RTCPeerConnection.prototype.onsignalingstatechange = null;
                RTCPeerConnection.prototype.oniceconnectionstatechange = null;
                RTCPeerConnection.prototype.onconnectionstatechange = null;
                RTCPeerConnection.prototype.onicegatheringstatechange = null;
                RTCPeerConnection.prototype.onnegotiationneeded = null;
                RTCPeerConnection.prototype.ondatachannel = null;
                RTCPeerConnection.prototype._dispatchEvent = function(name, event) {
                    if (this._isClosed) return;
                    this.dispatchEvent(event);
                    if (typeof this['on' + name] === 'function') this['on' + name](event);
                };
                RTCPeerConnection.prototype._emitGatheringStateChange = function() {
                    var event = new Event('icegatheringstatechange');
                    this._dispatchEvent('icegatheringstatechange', event);
                };
                RTCPeerConnection.prototype.getConfiguration = function() {
                    return this._config;
                };
                RTCPeerConnection.prototype.getLocalStreams = function() {
                    return this.localStreams;
                };
                RTCPeerConnection.prototype.getRemoteStreams = function() {
                    return this.remoteStreams;
                }; // internal helper to create a transceiver object.
                // (which is not yet the same as the WebRTC 1.0 transceiver)
                RTCPeerConnection.prototype._createTransceiver = function(kind, doNotAdd) {
                    var hasBundleTransport = this.transceivers.length > 0;
                    var transceiver = {
                        track: null,
                        iceGatherer: null,
                        iceTransport: null,
                        dtlsTransport: null,
                        localCapabilities: null,
                        remoteCapabilities: null,
                        rtpSender: null,
                        rtpReceiver: null,
                        kind: kind,
                        mid: null,
                        sendEncodingParameters: null,
                        recvEncodingParameters: null,
                        stream: null,
                        associatedRemoteMediaStreams: [],
                        wantReceive: true
                    };
                    if (this.usingBundle && hasBundleTransport) {
                        transceiver.iceTransport = this.transceivers[0].iceTransport;
                        transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
                    } else {
                        var transports = this._createIceAndDtlsTransports();
                        transceiver.iceTransport = transports.iceTransport;
                        transceiver.dtlsTransport = transports.dtlsTransport;
                    }
                    if (!doNotAdd) this.transceivers.push(transceiver);
                    return transceiver;
                };
                RTCPeerConnection.prototype.addTrack = function(track, stream) {
                    if (this._isClosed) throw makeError('InvalidStateError', 'Attempted to call addTrack on a closed peerconnection.');
                    var alreadyExists = this.transceivers.find(function(s) {
                        return s.track === track;
                    });
                    if (alreadyExists) throw makeError('InvalidAccessError', 'Track already exists.');
                    var transceiver;
                    for(var i = 0; i < this.transceivers.length; i++)if (!this.transceivers[i].track && this.transceivers[i].kind === track.kind) transceiver = this.transceivers[i];
                    if (!transceiver) transceiver = this._createTransceiver(track.kind);
                    this._maybeFireNegotiationNeeded();
                    if (this.localStreams.indexOf(stream) === -1) this.localStreams.push(stream);
                    transceiver.track = track;
                    transceiver.stream = stream;
                    transceiver.rtpSender = new window.RTCRtpSender(track, transceiver.dtlsTransport);
                    return transceiver.rtpSender;
                };
                RTCPeerConnection.prototype.addStream = function(stream) {
                    var pc = this;
                    if (edgeVersion >= 15025) stream.getTracks().forEach(function(track) {
                        pc.addTrack(track, stream);
                    });
                    else {
                        // Clone is necessary for local demos mostly, attaching directly
                        // to two different senders does not work (build 10547).
                        // Fixed in 15025 (or earlier)
                        var clonedStream = stream.clone();
                        stream.getTracks().forEach(function(track, idx) {
                            var clonedTrack = clonedStream.getTracks()[idx];
                            track.addEventListener('enabled', function(event) {
                                clonedTrack.enabled = event.enabled;
                            });
                        });
                        clonedStream.getTracks().forEach(function(track) {
                            pc.addTrack(track, clonedStream);
                        });
                    }
                };
                RTCPeerConnection.prototype.removeTrack = function(sender) {
                    if (this._isClosed) throw makeError('InvalidStateError', 'Attempted to call removeTrack on a closed peerconnection.');
                    if (!(sender instanceof window.RTCRtpSender)) throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
                    var transceiver = this.transceivers.find(function(t) {
                        return t.rtpSender === sender;
                    });
                    if (!transceiver) throw makeError('InvalidAccessError', 'Sender was not created by this connection.');
                    var stream = transceiver.stream;
                    transceiver.rtpSender.stop();
                    transceiver.rtpSender = null;
                    transceiver.track = null;
                    transceiver.stream = null; // remove the stream from the set of local streams
                    var localStreams = this.transceivers.map(function(t) {
                        return t.stream;
                    });
                    if (localStreams.indexOf(stream) === -1 && this.localStreams.indexOf(stream) > -1) this.localStreams.splice(this.localStreams.indexOf(stream), 1);
                    this._maybeFireNegotiationNeeded();
                };
                RTCPeerConnection.prototype.removeStream = function(stream) {
                    var pc = this;
                    stream.getTracks().forEach(function(track) {
                        var sender = pc.getSenders().find(function(s) {
                            return s.track === track;
                        });
                        if (sender) pc.removeTrack(sender);
                    });
                };
                RTCPeerConnection.prototype.getSenders = function() {
                    return this.transceivers.filter(function(transceiver) {
                        return !!transceiver.rtpSender;
                    }).map(function(transceiver) {
                        return transceiver.rtpSender;
                    });
                };
                RTCPeerConnection.prototype.getReceivers = function() {
                    return this.transceivers.filter(function(transceiver) {
                        return !!transceiver.rtpReceiver;
                    }).map(function(transceiver) {
                        return transceiver.rtpReceiver;
                    });
                };
                RTCPeerConnection.prototype._createIceGatherer = function(sdpMLineIndex, usingBundle) {
                    var pc = this;
                    if (usingBundle && sdpMLineIndex > 0) return this.transceivers[0].iceGatherer;
                    else if (this._iceGatherers.length) return this._iceGatherers.shift();
                    var iceGatherer = new window.RTCIceGatherer({
                        iceServers: this._config.iceServers,
                        gatherPolicy: this._config.iceTransportPolicy
                    });
                    Object.defineProperty(iceGatherer, 'state', {
                        value: 'new',
                        writable: true
                    });
                    this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
                    this.transceivers[sdpMLineIndex].bufferCandidates = function(event) {
                        var end = !event.candidate || Object.keys(event.candidate).length === 0; // polyfill since RTCIceGatherer.state is not implemented in
                        // Edge 10547 yet.
                        iceGatherer.state = end ? 'completed' : 'gathering';
                        if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
                    };
                    iceGatherer.addEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
                    return iceGatherer;
                }; // start gathering from an RTCIceGatherer.
                RTCPeerConnection.prototype._gather = function(mid, sdpMLineIndex) {
                    var pc = this;
                    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
                    if (iceGatherer.onlocalcandidate) return;
                    var bufferedCandidateEvents = this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
                    this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
                    iceGatherer.removeEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
                    iceGatherer.onlocalcandidate = function(evt) {
                        if (pc.usingBundle && sdpMLineIndex > 0) // if we know that we use bundle we can drop candidates with
                        // ѕdpMLineIndex > 0. If we don't do this then our state gets
                        // confused since we dispose the extra ice gatherer.
                        return;
                        var event = new Event('icecandidate');
                        event.candidate = {
                            sdpMid: mid,
                            sdpMLineIndex: sdpMLineIndex
                        };
                        var cand = evt.candidate; // Edge emits an empty object for RTCIceCandidateComplete‥
                        var end = !cand || Object.keys(cand).length === 0;
                        if (end) // polyfill since RTCIceGatherer.state is not implemented in
                        // Edge 10547 yet.
                        {
                            if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') iceGatherer.state = 'completed';
                        } else {
                            if (iceGatherer.state === 'new') iceGatherer.state = 'gathering';
                             // RTCIceCandidate doesn't have a component, needs to be added
                            cand.component = 1; // also the usernameFragment. TODO: update SDP to take both variants.
                            cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;
                            var serializedCandidate = SDPUtils.writeCandidate(cand);
                            event.candidate = Object.assign(event.candidate, SDPUtils.parseCandidate(serializedCandidate));
                            event.candidate.candidate = serializedCandidate;
                            event.candidate.toJSON = function() {
                                return {
                                    candidate: event.candidate.candidate,
                                    sdpMid: event.candidate.sdpMid,
                                    sdpMLineIndex: event.candidate.sdpMLineIndex,
                                    usernameFragment: event.candidate.usernameFragment
                                };
                            };
                        } // update local description.
                        var sections = SDPUtils.getMediaSections(pc._localDescription.sdp);
                        if (!end) sections[event.candidate.sdpMLineIndex] += 'a=' + event.candidate.candidate + '\r\n';
                        else sections[event.candidate.sdpMLineIndex] += 'a=end-of-candidates\r\n';
                        pc._localDescription.sdp = SDPUtils.getDescription(pc._localDescription.sdp) + sections.join('');
                        var complete = pc.transceivers.every(function(transceiver) {
                            return transceiver.iceGatherer && transceiver.iceGatherer.state === 'completed';
                        });
                        if (pc.iceGatheringState !== 'gathering') {
                            pc.iceGatheringState = 'gathering';
                            pc._emitGatheringStateChange();
                        } // Emit candidate. Also emit null candidate when all gatherers are
                        // complete.
                        if (!end) pc._dispatchEvent('icecandidate', event);
                        if (complete) {
                            pc._dispatchEvent('icecandidate', new Event('icecandidate'));
                            pc.iceGatheringState = 'complete';
                            pc._emitGatheringStateChange();
                        }
                    }; // emit already gathered candidates.
                    window.setTimeout(function() {
                        bufferedCandidateEvents.forEach(function(e) {
                            iceGatherer.onlocalcandidate(e);
                        });
                    }, 0);
                }; // Create ICE transport and DTLS transport.
                RTCPeerConnection.prototype._createIceAndDtlsTransports = function() {
                    var pc = this;
                    var iceTransport = new window.RTCIceTransport(null);
                    iceTransport.onicestatechange = function() {
                        pc._updateIceConnectionState();
                        pc._updateConnectionState();
                    };
                    var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
                    dtlsTransport.ondtlsstatechange = function() {
                        pc._updateConnectionState();
                    };
                    dtlsTransport.onerror = function() {
                        // onerror does not set state to failed by itself.
                        Object.defineProperty(dtlsTransport, 'state', {
                            value: 'failed',
                            writable: true
                        });
                        pc._updateConnectionState();
                    };
                    return {
                        iceTransport: iceTransport,
                        dtlsTransport: dtlsTransport
                    };
                }; // Destroy ICE gatherer, ICE transport and DTLS transport.
                // Without triggering the callbacks.
                RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function(sdpMLineIndex) {
                    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
                    if (iceGatherer) {
                        delete iceGatherer.onlocalcandidate;
                        delete this.transceivers[sdpMLineIndex].iceGatherer;
                    }
                    var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
                    if (iceTransport) {
                        delete iceTransport.onicestatechange;
                        delete this.transceivers[sdpMLineIndex].iceTransport;
                    }
                    var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
                    if (dtlsTransport) {
                        delete dtlsTransport.ondtlsstatechange;
                        delete dtlsTransport.onerror;
                        delete this.transceivers[sdpMLineIndex].dtlsTransport;
                    }
                }; // Start the RTP Sender and Receiver for a transceiver.
                RTCPeerConnection.prototype._transceive = function(transceiver, send, recv) {
                    var params = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
                    if (send && transceiver.rtpSender) {
                        params.encodings = transceiver.sendEncodingParameters;
                        params.rtcp = {
                            cname: SDPUtils.localCName,
                            compound: transceiver.rtcpParameters.compound
                        };
                        if (transceiver.recvEncodingParameters.length) params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
                        transceiver.rtpSender.send(params);
                    }
                    if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
                        // remove RTX field in Edge 14942
                        if (transceiver.kind === 'video' && transceiver.recvEncodingParameters && edgeVersion < 15019) transceiver.recvEncodingParameters.forEach(function(p) {
                            delete p.rtx;
                        });
                        if (transceiver.recvEncodingParameters.length) params.encodings = transceiver.recvEncodingParameters;
                        else params.encodings = [
                            {}
                        ];
                        params.rtcp = {
                            compound: transceiver.rtcpParameters.compound
                        };
                        if (transceiver.rtcpParameters.cname) params.rtcp.cname = transceiver.rtcpParameters.cname;
                        if (transceiver.sendEncodingParameters.length) params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
                        transceiver.rtpReceiver.receive(params);
                    }
                };
                RTCPeerConnection.prototype.setLocalDescription = function(description) {
                    var pc = this; // Note: pranswer is not supported.
                    if ([
                        'offer',
                        'answer'
                    ].indexOf(description.type) === -1) return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
                    if (!isActionAllowedInSignalingState('setLocalDescription', description.type, pc.signalingState) || pc._isClosed) return Promise.reject(makeError('InvalidStateError', 'Can not set local ' + description.type + ' in state ' + pc.signalingState));
                    var sections;
                    var sessionpart;
                    if (description.type === 'offer') {
                        // VERY limited support for SDP munging. Limited to:
                        // * changing the order of codecs
                        sections = SDPUtils.splitSections(description.sdp);
                        sessionpart = sections.shift();
                        sections.forEach(function(mediaSection, sdpMLineIndex) {
                            var caps = SDPUtils.parseRtpParameters(mediaSection);
                            pc.transceivers[sdpMLineIndex].localCapabilities = caps;
                        });
                        pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
                            pc._gather(transceiver.mid, sdpMLineIndex);
                        });
                    } else if (description.type === 'answer') {
                        sections = SDPUtils.splitSections(pc._remoteDescription.sdp);
                        sessionpart = sections.shift();
                        var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
                        sections.forEach(function(mediaSection, sdpMLineIndex) {
                            var transceiver = pc.transceivers[sdpMLineIndex];
                            var iceGatherer = transceiver.iceGatherer;
                            var iceTransport = transceiver.iceTransport;
                            var dtlsTransport = transceiver.dtlsTransport;
                            var localCapabilities = transceiver.localCapabilities;
                            var remoteCapabilities = transceiver.remoteCapabilities; // treat bundle-only as not-rejected.
                            var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
                            if (!rejected && !transceiver.rejected) {
                                var remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
                                var remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
                                if (isIceLite) remoteDtlsParameters.role = 'server';
                                if (!pc.usingBundle || sdpMLineIndex === 0) {
                                    pc._gather(transceiver.mid, sdpMLineIndex);
                                    if (iceTransport.state === 'new') iceTransport.start(iceGatherer, remoteIceParameters, isIceLite ? 'controlling' : 'controlled');
                                    if (dtlsTransport.state === 'new') dtlsTransport.start(remoteDtlsParameters);
                                } // Calculate intersection of capabilities.
                                var params = getCommonCapabilities(localCapabilities, remoteCapabilities); // Start the RTCRtpSender. The RTCRtpReceiver for this
                                // transceiver has already been started in setRemoteDescription.
                                pc._transceive(transceiver, params.codecs.length > 0, false);
                            }
                        });
                    }
                    pc._localDescription = {
                        type: description.type,
                        sdp: description.sdp
                    };
                    if (description.type === 'offer') pc._updateSignalingState('have-local-offer');
                    else pc._updateSignalingState('stable');
                    return Promise.resolve();
                };
                RTCPeerConnection.prototype.setRemoteDescription = function(description) {
                    var pc = this; // Note: pranswer is not supported.
                    if ([
                        'offer',
                        'answer'
                    ].indexOf(description.type) === -1) return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
                    if (!isActionAllowedInSignalingState('setRemoteDescription', description.type, pc.signalingState) || pc._isClosed) return Promise.reject(makeError('InvalidStateError', 'Can not set remote ' + description.type + ' in state ' + pc.signalingState));
                    var streams = {};
                    pc.remoteStreams.forEach(function(stream) {
                        streams[stream.id] = stream;
                    });
                    var receiverList = [];
                    var sections = SDPUtils.splitSections(description.sdp);
                    var sessionpart = sections.shift();
                    var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
                    var usingBundle = SDPUtils.matchPrefix(sessionpart, 'a=group:BUNDLE ').length > 0;
                    pc.usingBundle = usingBundle;
                    var iceOptions = SDPUtils.matchPrefix(sessionpart, 'a=ice-options:')[0];
                    if (iceOptions) pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ').indexOf('trickle') >= 0;
                    else pc.canTrickleIceCandidates = false;
                    sections.forEach(function(mediaSection, sdpMLineIndex) {
                        var lines = SDPUtils.splitLines(mediaSection);
                        var kind = SDPUtils.getKind(mediaSection); // treat bundle-only as not-rejected.
                        var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
                        var protocol = lines[0].substr(2).split(' ')[2];
                        var direction = SDPUtils.getDirection(mediaSection, sessionpart);
                        var remoteMsid = SDPUtils.parseMsid(mediaSection);
                        var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier(); // Reject datachannels which are not implemented yet.
                        if (rejected || kind === 'application' && (protocol === 'DTLS/SCTP' || protocol === 'UDP/DTLS/SCTP')) {
                            // TODO: this is dangerous in the case where a non-rejected m-line
                            //     becomes rejected.
                            pc.transceivers[sdpMLineIndex] = {
                                mid: mid,
                                kind: kind,
                                protocol: protocol,
                                rejected: true
                            };
                            return;
                        }
                        if (!rejected && pc.transceivers[sdpMLineIndex] && pc.transceivers[sdpMLineIndex].rejected) // recycle a rejected transceiver.
                        pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
                        var transceiver;
                        var iceGatherer;
                        var iceTransport;
                        var dtlsTransport;
                        var rtpReceiver;
                        var sendEncodingParameters;
                        var recvEncodingParameters;
                        var localCapabilities;
                        var track; // FIXME: ensure the mediaSection has rtcp-mux set.
                        var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
                        var remoteIceParameters;
                        var remoteDtlsParameters;
                        if (!rejected) {
                            remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
                            remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
                            remoteDtlsParameters.role = 'client';
                        }
                        recvEncodingParameters = SDPUtils.parseRtpEncodingParameters(mediaSection);
                        var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);
                        var isComplete = SDPUtils.matchPrefix(mediaSection, 'a=end-of-candidates', sessionpart).length > 0;
                        var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:').map(function(cand) {
                            return SDPUtils.parseCandidate(cand);
                        }).filter(function(cand) {
                            return cand.component === 1;
                        }); // Check if we can use BUNDLE and dispose transports.
                        if ((description.type === 'offer' || description.type === 'answer') && !rejected && usingBundle && sdpMLineIndex > 0 && pc.transceivers[sdpMLineIndex]) {
                            pc._disposeIceAndDtlsTransports(sdpMLineIndex);
                            pc.transceivers[sdpMLineIndex].iceGatherer = pc.transceivers[0].iceGatherer;
                            pc.transceivers[sdpMLineIndex].iceTransport = pc.transceivers[0].iceTransport;
                            pc.transceivers[sdpMLineIndex].dtlsTransport = pc.transceivers[0].dtlsTransport;
                            if (pc.transceivers[sdpMLineIndex].rtpSender) pc.transceivers[sdpMLineIndex].rtpSender.setTransport(pc.transceivers[0].dtlsTransport);
                            if (pc.transceivers[sdpMLineIndex].rtpReceiver) pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(pc.transceivers[0].dtlsTransport);
                        }
                        if (description.type === 'offer' && !rejected) {
                            transceiver = pc.transceivers[sdpMLineIndex] || pc._createTransceiver(kind);
                            transceiver.mid = mid;
                            if (!transceiver.iceGatherer) transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, usingBundle);
                            if (cands.length && transceiver.iceTransport.state === 'new') {
                                if (isComplete && (!usingBundle || sdpMLineIndex === 0)) transceiver.iceTransport.setRemoteCandidates(cands);
                                else cands.forEach(function(candidate) {
                                    maybeAddCandidate(transceiver.iceTransport, candidate);
                                });
                            }
                            localCapabilities = window.RTCRtpReceiver.getCapabilities(kind); // filter RTX until additional stuff needed for RTX is implemented
                            // in adapter.js
                            if (edgeVersion < 15019) localCapabilities.codecs = localCapabilities.codecs.filter(function(codec) {
                                return codec.name !== 'rtx';
                            });
                            sendEncodingParameters = transceiver.sendEncodingParameters || [
                                {
                                    ssrc: (2 * sdpMLineIndex + 2) * 1001
                                }
                            ]; // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                            var isNewTrack = false;
                            if (direction === 'sendrecv' || direction === 'sendonly') {
                                isNewTrack = !transceiver.rtpReceiver;
                                rtpReceiver = transceiver.rtpReceiver || new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
                                if (isNewTrack) {
                                    var stream;
                                    track = rtpReceiver.track; // FIXME: does not work with Plan B.
                                    if (remoteMsid && remoteMsid.stream === '-') ;
                                    else if (remoteMsid) {
                                        if (!streams[remoteMsid.stream]) {
                                            streams[remoteMsid.stream] = new window.MediaStream();
                                            Object.defineProperty(streams[remoteMsid.stream], 'id', {
                                                get: function() {
                                                    return remoteMsid.stream;
                                                }
                                            });
                                        }
                                        Object.defineProperty(track, 'id', {
                                            get: function() {
                                                return remoteMsid.track;
                                            }
                                        });
                                        stream = streams[remoteMsid.stream];
                                    } else {
                                        if (!streams.default) streams.default = new window.MediaStream();
                                        stream = streams.default;
                                    }
                                    if (stream) {
                                        addTrackToStreamAndFireEvent(track, stream);
                                        transceiver.associatedRemoteMediaStreams.push(stream);
                                    }
                                    receiverList.push([
                                        track,
                                        rtpReceiver,
                                        stream
                                    ]);
                                }
                            } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
                                transceiver.associatedRemoteMediaStreams.forEach(function(s) {
                                    var nativeTrack = s.getTracks().find(function(t) {
                                        return t.id === transceiver.rtpReceiver.track.id;
                                    });
                                    if (nativeTrack) removeTrackFromStreamAndFireEvent(nativeTrack, s);
                                });
                                transceiver.associatedRemoteMediaStreams = [];
                            }
                            transceiver.localCapabilities = localCapabilities;
                            transceiver.remoteCapabilities = remoteCapabilities;
                            transceiver.rtpReceiver = rtpReceiver;
                            transceiver.rtcpParameters = rtcpParameters;
                            transceiver.sendEncodingParameters = sendEncodingParameters;
                            transceiver.recvEncodingParameters = recvEncodingParameters; // Start the RTCRtpReceiver now. The RTPSender is started in
                            // setLocalDescription.
                            pc._transceive(pc.transceivers[sdpMLineIndex], false, isNewTrack);
                        } else if (description.type === 'answer' && !rejected) {
                            transceiver = pc.transceivers[sdpMLineIndex];
                            iceGatherer = transceiver.iceGatherer;
                            iceTransport = transceiver.iceTransport;
                            dtlsTransport = transceiver.dtlsTransport;
                            rtpReceiver = transceiver.rtpReceiver;
                            sendEncodingParameters = transceiver.sendEncodingParameters;
                            localCapabilities = transceiver.localCapabilities;
                            pc.transceivers[sdpMLineIndex].recvEncodingParameters = recvEncodingParameters;
                            pc.transceivers[sdpMLineIndex].remoteCapabilities = remoteCapabilities;
                            pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;
                            if (cands.length && iceTransport.state === 'new') {
                                if ((isIceLite || isComplete) && (!usingBundle || sdpMLineIndex === 0)) iceTransport.setRemoteCandidates(cands);
                                else cands.forEach(function(candidate) {
                                    maybeAddCandidate(transceiver.iceTransport, candidate);
                                });
                            }
                            if (!usingBundle || sdpMLineIndex === 0) {
                                if (iceTransport.state === 'new') iceTransport.start(iceGatherer, remoteIceParameters, 'controlling');
                                if (dtlsTransport.state === 'new') dtlsTransport.start(remoteDtlsParameters);
                            } // If the offer contained RTX but the answer did not,
                            // remove RTX from sendEncodingParameters.
                            var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
                            var hasRtx = commonCapabilities.codecs.filter(function(c) {
                                return c.name.toLowerCase() === 'rtx';
                            }).length;
                            if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) delete transceiver.sendEncodingParameters[0].rtx;
                            pc._transceive(transceiver, direction === 'sendrecv' || direction === 'recvonly', direction === 'sendrecv' || direction === 'sendonly'); // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                            if (rtpReceiver && (direction === 'sendrecv' || direction === 'sendonly')) {
                                track = rtpReceiver.track;
                                if (remoteMsid) {
                                    if (!streams[remoteMsid.stream]) streams[remoteMsid.stream] = new window.MediaStream();
                                    addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
                                    receiverList.push([
                                        track,
                                        rtpReceiver,
                                        streams[remoteMsid.stream]
                                    ]);
                                } else {
                                    if (!streams.default) streams.default = new window.MediaStream();
                                    addTrackToStreamAndFireEvent(track, streams.default);
                                    receiverList.push([
                                        track,
                                        rtpReceiver,
                                        streams.default
                                    ]);
                                }
                            } else // FIXME: actually the receiver should be created later.
                            delete transceiver.rtpReceiver;
                        }
                    });
                    if (pc._dtlsRole === undefined) pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
                    pc._remoteDescription = {
                        type: description.type,
                        sdp: description.sdp
                    };
                    if (description.type === 'offer') pc._updateSignalingState('have-remote-offer');
                    else pc._updateSignalingState('stable');
                    Object.keys(streams).forEach(function(sid) {
                        var stream = streams[sid];
                        if (stream.getTracks().length) {
                            if (pc.remoteStreams.indexOf(stream) === -1) {
                                pc.remoteStreams.push(stream);
                                var event = new Event('addstream');
                                event.stream = stream;
                                window.setTimeout(function() {
                                    pc._dispatchEvent('addstream', event);
                                });
                            }
                            receiverList.forEach(function(item) {
                                var track = item[0];
                                var receiver = item[1];
                                if (stream.id !== item[2].id) return;
                                fireAddTrack(pc, track, receiver, [
                                    stream
                                ]);
                            });
                        }
                    });
                    receiverList.forEach(function(item) {
                        if (item[2]) return;
                        fireAddTrack(pc, item[0], item[1], []);
                    }); // check whether addIceCandidate({}) was called within four seconds after
                    // setRemoteDescription.
                    window.setTimeout(function() {
                        if (!(pc && pc.transceivers)) return;
                        pc.transceivers.forEach(function(transceiver) {
                            if (transceiver.iceTransport && transceiver.iceTransport.state === 'new' && transceiver.iceTransport.getRemoteCandidates().length > 0) {
                                console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification");
                                transceiver.iceTransport.addRemoteCandidate({});
                            }
                        });
                    }, 4000);
                    return Promise.resolve();
                };
                RTCPeerConnection.prototype.close = function() {
                    this.transceivers.forEach(function(transceiver) {
                        /* not yet
      if (transceiver.iceGatherer) {
        transceiver.iceGatherer.close();
      }
      */ if (transceiver.iceTransport) transceiver.iceTransport.stop();
                        if (transceiver.dtlsTransport) transceiver.dtlsTransport.stop();
                        if (transceiver.rtpSender) transceiver.rtpSender.stop();
                        if (transceiver.rtpReceiver) transceiver.rtpReceiver.stop();
                    }); // FIXME: clean up tracks, local streams, remote streams, etc
                    this._isClosed = true;
                    this._updateSignalingState('closed');
                }; // Update the signaling state.
                RTCPeerConnection.prototype._updateSignalingState = function(newState) {
                    this.signalingState = newState;
                    var event = new Event('signalingstatechange');
                    this._dispatchEvent('signalingstatechange', event);
                }; // Determine whether to fire the negotiationneeded event.
                RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
                    var pc = this;
                    if (this.signalingState !== 'stable' || this.needNegotiation === true) return;
                    this.needNegotiation = true;
                    window.setTimeout(function() {
                        if (pc.needNegotiation) {
                            pc.needNegotiation = false;
                            var event = new Event('negotiationneeded');
                            pc._dispatchEvent('negotiationneeded', event);
                        }
                    }, 0);
                }; // Update the ice connection state.
                RTCPeerConnection.prototype._updateIceConnectionState = function() {
                    var newState;
                    var states = {
                        'new': 0,
                        closed: 0,
                        checking: 0,
                        connected: 0,
                        completed: 0,
                        disconnected: 0,
                        failed: 0
                    };
                    this.transceivers.forEach(function(transceiver) {
                        if (transceiver.iceTransport && !transceiver.rejected) states[transceiver.iceTransport.state]++;
                    });
                    newState = 'new';
                    if (states.failed > 0) newState = 'failed';
                    else if (states.checking > 0) newState = 'checking';
                    else if (states.disconnected > 0) newState = 'disconnected';
                    else if (states.new > 0) newState = 'new';
                    else if (states.connected > 0) newState = 'connected';
                    else if (states.completed > 0) newState = 'completed';
                    if (newState !== this.iceConnectionState) {
                        this.iceConnectionState = newState;
                        var event = new Event('iceconnectionstatechange');
                        this._dispatchEvent('iceconnectionstatechange', event);
                    }
                }; // Update the connection state.
                RTCPeerConnection.prototype._updateConnectionState = function() {
                    var newState;
                    var states = {
                        'new': 0,
                        closed: 0,
                        connecting: 0,
                        connected: 0,
                        completed: 0,
                        disconnected: 0,
                        failed: 0
                    };
                    this.transceivers.forEach(function(transceiver) {
                        if (transceiver.iceTransport && transceiver.dtlsTransport && !transceiver.rejected) {
                            states[transceiver.iceTransport.state]++;
                            states[transceiver.dtlsTransport.state]++;
                        }
                    }); // ICETransport.completed and connected are the same for this purpose.
                    states.connected += states.completed;
                    newState = 'new';
                    if (states.failed > 0) newState = 'failed';
                    else if (states.connecting > 0) newState = 'connecting';
                    else if (states.disconnected > 0) newState = 'disconnected';
                    else if (states.new > 0) newState = 'new';
                    else if (states.connected > 0) newState = 'connected';
                    if (newState !== this.connectionState) {
                        this.connectionState = newState;
                        var event = new Event('connectionstatechange');
                        this._dispatchEvent('connectionstatechange', event);
                    }
                };
                RTCPeerConnection.prototype.createOffer = function() {
                    var pc = this;
                    if (pc._isClosed) return Promise.reject(makeError('InvalidStateError', 'Can not call createOffer after close'));
                    var numAudioTracks = pc.transceivers.filter(function(t) {
                        return t.kind === 'audio';
                    }).length;
                    var numVideoTracks = pc.transceivers.filter(function(t) {
                        return t.kind === 'video';
                    }).length; // Determine number of audio and video tracks we need to send/recv.
                    var offerOptions = arguments[0];
                    if (offerOptions) {
                        // Reject Chrome legacy constraints.
                        if (offerOptions.mandatory || offerOptions.optional) throw new TypeError('Legacy mandatory/optional constraints not supported.');
                        if (offerOptions.offerToReceiveAudio !== undefined) {
                            if (offerOptions.offerToReceiveAudio === true) numAudioTracks = 1;
                            else if (offerOptions.offerToReceiveAudio === false) numAudioTracks = 0;
                            else numAudioTracks = offerOptions.offerToReceiveAudio;
                        }
                        if (offerOptions.offerToReceiveVideo !== undefined) {
                            if (offerOptions.offerToReceiveVideo === true) numVideoTracks = 1;
                            else if (offerOptions.offerToReceiveVideo === false) numVideoTracks = 0;
                            else numVideoTracks = offerOptions.offerToReceiveVideo;
                        }
                    }
                    pc.transceivers.forEach(function(transceiver) {
                        if (transceiver.kind === 'audio') {
                            numAudioTracks--;
                            if (numAudioTracks < 0) transceiver.wantReceive = false;
                        } else if (transceiver.kind === 'video') {
                            numVideoTracks--;
                            if (numVideoTracks < 0) transceiver.wantReceive = false;
                        }
                    }); // Create M-lines for recvonly streams.
                    while(numAudioTracks > 0 || numVideoTracks > 0){
                        if (numAudioTracks > 0) {
                            pc._createTransceiver('audio');
                            numAudioTracks--;
                        }
                        if (numVideoTracks > 0) {
                            pc._createTransceiver('video');
                            numVideoTracks--;
                        }
                    }
                    var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
                    pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
                        // For each track, create an ice gatherer, ice transport,
                        // dtls transport, potentially rtpsender and rtpreceiver.
                        var track = transceiver.track;
                        var kind = transceiver.kind;
                        var mid = transceiver.mid || SDPUtils.generateIdentifier();
                        transceiver.mid = mid;
                        if (!transceiver.iceGatherer) transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, pc.usingBundle);
                        var localCapabilities = window.RTCRtpSender.getCapabilities(kind); // filter RTX until additional stuff needed for RTX is implemented
                        // in adapter.js
                        if (edgeVersion < 15019) localCapabilities.codecs = localCapabilities.codecs.filter(function(codec) {
                            return codec.name !== 'rtx';
                        });
                        localCapabilities.codecs.forEach(function(codec) {
                            // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
                            // by adding level-asymmetry-allowed=1
                            if (codec.name === 'H264' && codec.parameters['level-asymmetry-allowed'] === undefined) codec.parameters['level-asymmetry-allowed'] = '1';
                             // for subsequent offers, we might have to re-use the payload
                            // type of the last offer.
                            if (transceiver.remoteCapabilities && transceiver.remoteCapabilities.codecs) transceiver.remoteCapabilities.codecs.forEach(function(remoteCodec) {
                                if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() && codec.clockRate === remoteCodec.clockRate) codec.preferredPayloadType = remoteCodec.payloadType;
                            });
                        });
                        localCapabilities.headerExtensions.forEach(function(hdrExt) {
                            var remoteExtensions = transceiver.remoteCapabilities && transceiver.remoteCapabilities.headerExtensions || [];
                            remoteExtensions.forEach(function(rHdrExt) {
                                if (hdrExt.uri === rHdrExt.uri) hdrExt.id = rHdrExt.id;
                            });
                        }); // generate an ssrc now, to be used later in rtpSender.send
                        var sendEncodingParameters = transceiver.sendEncodingParameters || [
                            {
                                ssrc: (2 * sdpMLineIndex + 1) * 1001
                            }
                        ];
                        if (track) // add RTX
                        {
                            if (edgeVersion >= 15019 && kind === 'video' && !sendEncodingParameters[0].rtx) sendEncodingParameters[0].rtx = {
                                ssrc: sendEncodingParameters[0].ssrc + 1
                            };
                        }
                        if (transceiver.wantReceive) transceiver.rtpReceiver = new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
                        transceiver.localCapabilities = localCapabilities;
                        transceiver.sendEncodingParameters = sendEncodingParameters;
                    }); // always offer BUNDLE and dispose on return if not supported.
                    if (pc._config.bundlePolicy !== 'max-compat') sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
                        return t.mid;
                    }).join(' ') + '\r\n';
                    sdp += 'a=ice-options:trickle\r\n';
                    pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
                        sdp += writeMediaSection(transceiver, transceiver.localCapabilities, 'offer', transceiver.stream, pc._dtlsRole);
                        sdp += 'a=rtcp-rsize\r\n';
                        if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' && (sdpMLineIndex === 0 || !pc.usingBundle)) {
                            transceiver.iceGatherer.getLocalCandidates().forEach(function(cand) {
                                cand.component = 1;
                                sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
                            });
                            if (transceiver.iceGatherer.state === 'completed') sdp += 'a=end-of-candidates\r\n';
                        }
                    });
                    var desc = new window.RTCSessionDescription({
                        type: 'offer',
                        sdp: sdp
                    });
                    return Promise.resolve(desc);
                };
                RTCPeerConnection.prototype.createAnswer = function() {
                    var pc = this;
                    if (pc._isClosed) return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer after close'));
                    if (!(pc.signalingState === 'have-remote-offer' || pc.signalingState === 'have-local-pranswer')) return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer in signalingState ' + pc.signalingState));
                    var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
                    if (pc.usingBundle) sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
                        return t.mid;
                    }).join(' ') + '\r\n';
                    sdp += 'a=ice-options:trickle\r\n';
                    var mediaSectionsInOffer = SDPUtils.getMediaSections(pc._remoteDescription.sdp).length;
                    pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
                        if (sdpMLineIndex + 1 > mediaSectionsInOffer) return;
                        if (transceiver.rejected) {
                            if (transceiver.kind === 'application') {
                                if (transceiver.protocol === 'DTLS/SCTP') // legacy fmt
                                sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
                                else sdp += 'm=application 0 ' + transceiver.protocol + ' webrtc-datachannel\r\n';
                            } else if (transceiver.kind === 'audio') sdp += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n";
                            else if (transceiver.kind === 'video') sdp += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n";
                            sdp += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + transceiver.mid + '\r\n';
                            return;
                        } // FIXME: look at direction.
                        if (transceiver.stream) {
                            var localTrack;
                            if (transceiver.kind === 'audio') localTrack = transceiver.stream.getAudioTracks()[0];
                            else if (transceiver.kind === 'video') localTrack = transceiver.stream.getVideoTracks()[0];
                            if (localTrack) // add RTX
                            {
                                if (edgeVersion >= 15019 && transceiver.kind === 'video' && !transceiver.sendEncodingParameters[0].rtx) transceiver.sendEncodingParameters[0].rtx = {
                                    ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
                                };
                            }
                        } // Calculate intersection of capabilities.
                        var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
                        var hasRtx = commonCapabilities.codecs.filter(function(c) {
                            return c.name.toLowerCase() === 'rtx';
                        }).length;
                        if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) delete transceiver.sendEncodingParameters[0].rtx;
                        sdp += writeMediaSection(transceiver, commonCapabilities, 'answer', transceiver.stream, pc._dtlsRole);
                        if (transceiver.rtcpParameters && transceiver.rtcpParameters.reducedSize) sdp += 'a=rtcp-rsize\r\n';
                    });
                    var desc = new window.RTCSessionDescription({
                        type: 'answer',
                        sdp: sdp
                    });
                    return Promise.resolve(desc);
                };
                RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
                    var pc = this;
                    var sections;
                    if (candidate && !(candidate.sdpMLineIndex !== undefined || candidate.sdpMid)) return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
                     // TODO: needs to go into ops queue.
                    return new Promise(function(resolve, reject) {
                        if (!pc._remoteDescription) return reject(makeError('InvalidStateError', 'Can not add ICE candidate without a remote description'));
                        else if (!candidate || candidate.candidate === '') for(var j = 0; j < pc.transceivers.length; j++){
                            if (pc.transceivers[j].rejected) continue;
                            pc.transceivers[j].iceTransport.addRemoteCandidate({});
                            sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                            sections[j] += 'a=end-of-candidates\r\n';
                            pc._remoteDescription.sdp = SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join('');
                            if (pc.usingBundle) break;
                        }
                        else {
                            var sdpMLineIndex = candidate.sdpMLineIndex;
                            if (candidate.sdpMid) {
                                for(var i = 0; i < pc.transceivers.length; i++)if (pc.transceivers[i].mid === candidate.sdpMid) {
                                    sdpMLineIndex = i;
                                    break;
                                }
                            }
                            var transceiver = pc.transceivers[sdpMLineIndex];
                            if (transceiver) {
                                if (transceiver.rejected) return resolve();
                                var cand = Object.keys(candidate.candidate).length > 0 ? SDPUtils.parseCandidate(candidate.candidate) : {}; // Ignore Chrome's invalid candidates since Edge does not like them.
                                if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) return resolve();
                                 // Ignore RTCP candidates, we assume RTCP-MUX.
                                if (cand.component && cand.component !== 1) return resolve();
                                 // when using bundle, avoid adding candidates to the wrong
                                // ice transport. And avoid adding candidates added in the SDP.
                                if (sdpMLineIndex === 0 || sdpMLineIndex > 0 && transceiver.iceTransport !== pc.transceivers[0].iceTransport) {
                                    if (!maybeAddCandidate(transceiver.iceTransport, cand)) return reject(makeError('OperationError', 'Can not add ICE candidate'));
                                } // update the remoteDescription.
                                var candidateString = candidate.candidate.trim();
                                if (candidateString.indexOf('a=') === 0) candidateString = candidateString.substr(2);
                                sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                                sections[sdpMLineIndex] += 'a=' + (cand.type ? candidateString : 'end-of-candidates') + '\r\n';
                                pc._remoteDescription.sdp = SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join('');
                            } else return reject(makeError('OperationError', 'Can not add ICE candidate'));
                        }
                        resolve();
                    });
                };
                RTCPeerConnection.prototype.getStats = function(selector) {
                    if (selector && selector instanceof window.MediaStreamTrack) {
                        var senderOrReceiver = null;
                        this.transceivers.forEach(function(transceiver) {
                            if (transceiver.rtpSender && transceiver.rtpSender.track === selector) senderOrReceiver = transceiver.rtpSender;
                            else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track === selector) senderOrReceiver = transceiver.rtpReceiver;
                        });
                        if (!senderOrReceiver) throw makeError('InvalidAccessError', 'Invalid selector.');
                        return senderOrReceiver.getStats();
                    }
                    var promises = [];
                    this.transceivers.forEach(function(transceiver) {
                        [
                            'rtpSender',
                            'rtpReceiver',
                            'iceGatherer',
                            'iceTransport',
                            'dtlsTransport'
                        ].forEach(function(method) {
                            if (transceiver[method]) promises.push(transceiver[method].getStats());
                        });
                    });
                    return Promise.all(promises).then(function(allStats) {
                        var results = new Map();
                        allStats.forEach(function(stats) {
                            stats.forEach(function(stat) {
                                results.set(stat.id, stat);
                            });
                        });
                        return results;
                    });
                }; // fix low-level stat names and return Map instead of object.
                var ortcObjects = [
                    'RTCRtpSender',
                    'RTCRtpReceiver',
                    'RTCIceGatherer',
                    'RTCIceTransport',
                    'RTCDtlsTransport'
                ];
                ortcObjects.forEach(function(ortcObjectName) {
                    var obj = window[ortcObjectName];
                    if (obj && obj.prototype && obj.prototype.getStats) {
                        var nativeGetstats = obj.prototype.getStats;
                        obj.prototype.getStats = function() {
                            return nativeGetstats.apply(this).then(function(nativeStats) {
                                var mapStats = new Map();
                                Object.keys(nativeStats).forEach(function(id) {
                                    nativeStats[id].type = fixStatsType(nativeStats[id]);
                                    mapStats.set(id, nativeStats[id]);
                                });
                                return mapStats;
                            });
                        };
                    }
                }); // legacy callback shims. Should be moved to adapter.js some days.
                var methods = [
                    'createOffer',
                    'createAnswer'
                ];
                methods.forEach(function(method) {
                    var nativeMethod = RTCPeerConnection.prototype[method];
                    RTCPeerConnection.prototype[method] = function() {
                        var args = arguments;
                        if (typeof args[0] === 'function' || typeof args[1] === 'function') // legacy
                        return nativeMethod.apply(this, [
                            arguments[2]
                        ]).then(function(description) {
                            if (typeof args[0] === 'function') args[0].apply(null, [
                                description
                            ]);
                        }, function(error) {
                            if (typeof args[1] === 'function') args[1].apply(null, [
                                error
                            ]);
                        });
                        return nativeMethod.apply(this, arguments);
                    };
                });
                methods = [
                    'setLocalDescription',
                    'setRemoteDescription',
                    'addIceCandidate'
                ];
                methods.forEach(function(method) {
                    var nativeMethod = RTCPeerConnection.prototype[method];
                    RTCPeerConnection.prototype[method] = function() {
                        var args = arguments;
                        if (typeof args[1] === 'function' || typeof args[2] === 'function') // legacy
                        return nativeMethod.apply(this, arguments).then(function() {
                            if (typeof args[1] === 'function') args[1].apply(null);
                        }, function(error) {
                            if (typeof args[2] === 'function') args[2].apply(null, [
                                error
                            ]);
                        });
                        return nativeMethod.apply(this, arguments);
                    };
                }); // getStats is special. It doesn't have a spec legacy method yet we support
                // getStats(something, cb) without error callbacks.
                [
                    'getStats'
                ].forEach(function(method) {
                    var nativeMethod = RTCPeerConnection.prototype[method];
                    RTCPeerConnection.prototype[method] = function() {
                        var args = arguments;
                        if (typeof args[1] === 'function') return nativeMethod.apply(this, arguments).then(function() {
                            if (typeof args[1] === 'function') args[1].apply(null);
                        });
                        return nativeMethod.apply(this, arguments);
                    };
                });
                return RTCPeerConnection;
            };
        },
        {
            "sdp": "YHvh"
        }
    ],
    "YdKx": [
        function(require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimGetUserMedia = shimGetUserMedia;
            function shimGetUserMedia(window) {
                var navigator = window && window.navigator;
                var shimError_ = function(e) {
                    return {
                        name: ({
                            PermissionDeniedError: 'NotAllowedError'
                        })[e.name] || e.name,
                        message: e.message,
                        constraint: e.constraint,
                        toString: function() {
                            return this.name;
                        }
                    };
                }; // getUserMedia error shim.
                var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                navigator.mediaDevices.getUserMedia = function(c) {
                    return origGetUserMedia(c).catch(function(e) {
                        return Promise.reject(shimError_(e));
                    });
                };
            }
        },
        {}
    ],
    "P3bV": [
        function(require, module, exports) {
            /*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimGetDisplayMedia = shimGetDisplayMedia;
            function shimGetDisplayMedia(window) {
                if (!('getDisplayMedia' in window.navigator)) return;
                if (!window.navigator.mediaDevices) return;
                if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) return;
                window.navigator.mediaDevices.getDisplayMedia = window.navigator.getDisplayMedia.bind(window.navigator);
            }
        },
        {}
    ],
    "XRic": [
        function(require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimPeerConnection = shimPeerConnection;
            exports.shimReplaceTrack = shimReplaceTrack;
            Object.defineProperty(exports, "shimGetUserMedia", {
                enumerable: true,
                get: function() {
                    return _getusermedia.shimGetUserMedia;
                }
            });
            Object.defineProperty(exports, "shimGetDisplayMedia", {
                enumerable: true,
                get: function() {
                    return _getdisplaymedia.shimGetDisplayMedia;
                }
            });
            var utils = _interopRequireWildcard(require("../utils"));
            var _filtericeservers = require("./filtericeservers");
            var _rtcpeerconnectionShim = _interopRequireDefault(require("rtcpeerconnection-shim"));
            var _getusermedia = require("./getusermedia");
            var _getdisplaymedia = require("./getdisplaymedia");
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _getRequireWildcardCache() {
                if (typeof WeakMap !== "function") return null;
                var cache = new WeakMap();
                _getRequireWildcardCache = function() {
                    return cache;
                };
                return cache;
            }
            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) return obj;
                if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
                    default: obj
                };
                var cache = _getRequireWildcardCache();
                if (cache && cache.has(obj)) return cache.get(obj);
                var newObj = {};
                var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                    if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
                    else newObj[key] = obj[key];
                }
                newObj.default = obj;
                if (cache) cache.set(obj, newObj);
                return newObj;
            }
            function shimPeerConnection(window, browserDetails) {
                if (window.RTCIceGatherer) {
                    if (!window.RTCIceCandidate) window.RTCIceCandidate = function RTCIceCandidate(args) {
                        return args;
                    };
                    if (!window.RTCSessionDescription) window.RTCSessionDescription = function RTCSessionDescription(args) {
                        return args;
                    };
                     // this adds an additional event listener to MediaStrackTrack that signals
                    // when a tracks enabled property was changed. Workaround for a bug in
                    // addStream, see below. No longer required in 15025+
                    if (browserDetails.version < 15025) {
                        var origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
                        Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
                            set: function(value) {
                                origMSTEnabled.set.call(this, value);
                                var ev = new Event('enabled');
                                ev.enabled = value;
                                this.dispatchEvent(ev);
                            }
                        });
                    }
                } // ORTC defines the DTMF sender a bit different.
                // https://github.com/w3c/ortc/issues/714
                if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
                    get: function() {
                        if (this._dtmf === undefined) {
                            if (this.track.kind === 'audio') this._dtmf = new window.RTCDtmfSender(this);
                            else if (this.track.kind === 'video') this._dtmf = null;
                        }
                        return this._dtmf;
                    }
                });
                 // Edge currently only implements the RTCDtmfSender, not the
                // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
                if (window.RTCDtmfSender && !window.RTCDTMFSender) window.RTCDTMFSender = window.RTCDtmfSender;
                var RTCPeerConnectionShim = (0, _rtcpeerconnectionShim.default)(window, browserDetails.version);
                window.RTCPeerConnection = function RTCPeerConnection(config) {
                    if (config && config.iceServers) {
                        config.iceServers = (0, _filtericeservers.filterIceServers)(config.iceServers, browserDetails.version);
                        utils.log('ICE servers after filtering:', config.iceServers);
                    }
                    return new RTCPeerConnectionShim(config);
                };
                window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
            }
            function shimReplaceTrack(window) {
                // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
                if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
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
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimGetUserMedia = shimGetUserMedia;
            var utils = _interopRequireWildcard(require("../utils"));
            function _getRequireWildcardCache() {
                if (typeof WeakMap !== "function") return null;
                var cache = new WeakMap();
                _getRequireWildcardCache = function() {
                    return cache;
                };
                return cache;
            }
            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) return obj;
                if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
                    default: obj
                };
                var cache = _getRequireWildcardCache();
                if (cache && cache.has(obj)) return cache.get(obj);
                var newObj = {};
                var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                    if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
                    else newObj[key] = obj[key];
                }
                newObj.default = obj;
                if (cache) cache.set(obj, newObj);
                return newObj;
            }
            function _typeof(obj4) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function(obj) {
                    return typeof obj;
                };
                else _typeof = function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                return _typeof(obj4);
            }
            function shimGetUserMedia(window, browserDetails) {
                var navigator = window && window.navigator;
                var MediaStreamTrack = window && window.MediaStreamTrack;
                navigator.getUserMedia = function(constraints, onSuccess, onError) {
                    // Replace Firefox 44+'s deprecation warning with unprefixed version.
                    utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
                    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
                };
                if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
                    var remap = function(obj, a, b) {
                        if (a in obj && !(b in obj)) {
                            obj[b] = obj[a];
                            delete obj[a];
                        }
                    };
                    var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                    navigator.mediaDevices.getUserMedia = function(c) {
                        if (_typeof(c) === 'object' && _typeof(c.audio) === 'object') {
                            c = JSON.parse(JSON.stringify(c));
                            remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
                            remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
                        }
                        return nativeGetUserMedia(c);
                    };
                    if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
                        var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
                        MediaStreamTrack.prototype.getSettings = function() {
                            var obj = nativeGetSettings.apply(this, arguments);
                            remap(obj, 'mozAutoGainControl', 'autoGainControl');
                            remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
                            return obj;
                        };
                    }
                    if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
                        var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
                        MediaStreamTrack.prototype.applyConstraints = function(c) {
                            if (this.kind === 'audio' && _typeof(c) === 'object') {
                                c = JSON.parse(JSON.stringify(c));
                                remap(c, 'autoGainControl', 'mozAutoGainControl');
                                remap(c, 'noiseSuppression', 'mozNoiseSuppression');
                            }
                            return nativeApplyConstraints.apply(this, [
                                c
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
            /*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimGetDisplayMedia = shimGetDisplayMedia;
            function shimGetDisplayMedia(window, preferredMediaSource) {
                if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) return;
                if (!window.navigator.mediaDevices) return;
                window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
                    if (!(constraints && constraints.video)) {
                        var err = new DOMException("getDisplayMedia without video constraints is undefined");
                        err.name = 'NotFoundError'; // from https://heycam.github.io/webidl/#idl-DOMException-error-names
                        err.code = 8;
                        return Promise.reject(err);
                    }
                    if (constraints.video === true) constraints.video = {
                        mediaSource: preferredMediaSource
                    };
                    else constraints.video.mediaSource = preferredMediaSource;
                    return window.navigator.mediaDevices.getUserMedia(constraints);
                };
            }
        },
        {}
    ],
    "Fzdr": [
        function(require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimOnTrack = shimOnTrack;
            exports.shimPeerConnection = shimPeerConnection;
            exports.shimSenderGetStats = shimSenderGetStats;
            exports.shimReceiverGetStats = shimReceiverGetStats;
            exports.shimRemoveStream = shimRemoveStream;
            exports.shimRTCDataChannel = shimRTCDataChannel;
            exports.shimAddTransceiver = shimAddTransceiver;
            exports.shimGetParameters = shimGetParameters;
            exports.shimCreateOffer = shimCreateOffer;
            exports.shimCreateAnswer = shimCreateAnswer;
            Object.defineProperty(exports, "shimGetUserMedia", {
                enumerable: true,
                get: function() {
                    return _getusermedia.shimGetUserMedia;
                }
            });
            Object.defineProperty(exports, "shimGetDisplayMedia", {
                enumerable: true,
                get: function() {
                    return _getdisplaymedia.shimGetDisplayMedia;
                }
            });
            var utils = _interopRequireWildcard(require("../utils"));
            var _getusermedia = require("./getusermedia");
            var _getdisplaymedia = require("./getdisplaymedia");
            function _getRequireWildcardCache() {
                if (typeof WeakMap !== "function") return null;
                var cache = new WeakMap();
                _getRequireWildcardCache = function() {
                    return cache;
                };
                return cache;
            }
            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) return obj;
                if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
                    default: obj
                };
                var cache = _getRequireWildcardCache();
                if (cache && cache.has(obj)) return cache.get(obj);
                var newObj = {};
                var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                    if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
                    else newObj[key] = obj[key];
                }
                newObj.default = obj;
                if (cache) cache.set(obj, newObj);
                return newObj;
            }
            function _defineProperty(obj, key, value) {
                if (key in obj) Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
                else obj[key] = value;
                return obj;
            }
            function _typeof(obj5) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function(obj) {
                    return typeof obj;
                };
                else _typeof = function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                return _typeof(obj5);
            }
            function shimOnTrack(window) {
                if (_typeof(window) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
                    get: function() {
                        return {
                            receiver: this.receiver
                        };
                    }
                });
            }
            function shimPeerConnection(window, browserDetails) {
                if (_typeof(window) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) return; // probably media.peerconnection.enabled=false in about:config
                if (!window.RTCPeerConnection && window.mozRTCPeerConnection) // very basic support for old versions.
                window.RTCPeerConnection = window.mozRTCPeerConnection;
                if (browserDetails.version < 53) // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
                [
                    'setLocalDescription',
                    'setRemoteDescription',
                    'addIceCandidate'
                ].forEach(function(method) {
                    var nativeMethod = window.RTCPeerConnection.prototype[method];
                    var methodObj = _defineProperty({}, method, function() {
                        arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
                        return nativeMethod.apply(this, arguments);
                    });
                    window.RTCPeerConnection.prototype[method] = methodObj[method];
                });
                var modernStatsTypes = {
                    inboundrtp: 'inbound-rtp',
                    outboundrtp: 'outbound-rtp',
                    candidatepair: 'candidate-pair',
                    localcandidate: 'local-candidate',
                    remotecandidate: 'remote-candidate'
                };
                var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
                window.RTCPeerConnection.prototype.getStats = function getStats() {
                    var [selector, onSucc, onErr] = arguments;
                    return nativeGetStats.apply(this, [
                        selector || null
                    ]).then(function(stats) {
                        if (browserDetails.version < 53 && !onSucc) // Shim only promise getStats with spec-hyphens in type names
                        // Leave callback version alone; misc old uses of forEach before Map
                        try {
                            stats.forEach(function(stat) {
                                stat.type = modernStatsTypes[stat.type] || stat.type;
                            });
                        } catch (e) {
                            if (e.name !== 'TypeError') throw e;
                             // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                            stats.forEach(function(stat, i) {
                                stats.set(i, Object.assign({}, stat, {
                                    type: modernStatsTypes[stat.type] || stat.type
                                }));
                            });
                        }
                        return stats;
                    }).then(onSucc, onErr);
                };
            }
            function shimSenderGetStats(window) {
                if (!(_typeof(window) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) return;
                if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) return;
                var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
                if (origGetSenders) window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                    var _this = this;
                    var senders = origGetSenders.apply(this, []);
                    senders.forEach(function(sender) {
                        return sender._pc = _this;
                    });
                    return senders;
                };
                var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                if (origAddTrack) window.RTCPeerConnection.prototype.addTrack = function addTrack() {
                    var sender = origAddTrack.apply(this, arguments);
                    sender._pc = this;
                    return sender;
                };
                window.RTCRtpSender.prototype.getStats = function getStats() {
                    return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
                };
            }
            function shimReceiverGetStats(window) {
                if (!(_typeof(window) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) return;
                if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) return;
                var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
                if (origGetReceivers) window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
                    var _this2 = this;
                    var receivers = origGetReceivers.apply(this, []);
                    receivers.forEach(function(receiver) {
                        return receiver._pc = _this2;
                    });
                    return receivers;
                };
                utils.wrapPeerConnectionEvent(window, 'track', function(e) {
                    e.receiver._pc = e.srcElement;
                    return e;
                });
                window.RTCRtpReceiver.prototype.getStats = function getStats() {
                    return this._pc.getStats(this.track);
                };
            }
            function shimRemoveStream(window) {
                if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) return;
                window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                    var _this3 = this;
                    utils.deprecated('removeStream', 'removeTrack');
                    this.getSenders().forEach(function(sender) {
                        if (sender.track && stream.getTracks().includes(sender.track)) _this3.removeTrack(sender);
                    });
                };
            }
            function shimRTCDataChannel(window) {
                // rename DataChannel to RTCDataChannel (native fix in FF60):
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
                if (window.DataChannel && !window.RTCDataChannel) window.RTCDataChannel = window.DataChannel;
            }
            function shimAddTransceiver(window) {
                // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
                // Firefox ignores the init sendEncodings options passed to addTransceiver
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
                if (!(_typeof(window) === 'object' && window.RTCPeerConnection)) return;
                var origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
                if (origAddTransceiver) window.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
                    this.setParametersPromises = [];
                    var initParameters = arguments[1];
                    var shouldPerformCheck = initParameters && 'sendEncodings' in initParameters;
                    if (shouldPerformCheck) // If sendEncodings params are provided, validate grammar
                    initParameters.sendEncodings.forEach(function(encodingParam) {
                        if ('rid' in encodingParam) {
                            var ridRegex = /^[a-z0-9]{0,16}$/i;
                            if (!ridRegex.test(encodingParam.rid)) throw new TypeError('Invalid RID value provided.');
                        }
                        if ('scaleResolutionDownBy' in encodingParam) {
                            if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1)) throw new RangeError('scale_resolution_down_by must be >= 1.0');
                        }
                        if ('maxFramerate' in encodingParam) {
                            if (!(parseFloat(encodingParam.maxFramerate) >= 0)) throw new RangeError('max_framerate must be >= 0.0');
                        }
                    });
                    var transceiver = origAddTransceiver.apply(this, arguments);
                    if (shouldPerformCheck) {
                        // Check if the init options were applied. If not we do this in an
                        // asynchronous way and save the promise reference in a global object.
                        // This is an ugly hack, but at the same time is way more robust than
                        // checking the sender parameters before and after the createOffer
                        // Also note that after the createoffer we are not 100% sure that
                        // the params were asynchronously applied so we might miss the
                        // opportunity to recreate offer.
                        var { sender: sender  } = transceiver;
                        var params = sender.getParameters();
                        if (!('encodings' in params) || params.encodings.length === 1 && Object.keys(params.encodings[0]).length === 0) {
                            params.encodings = initParameters.sendEncodings;
                            sender.sendEncodings = initParameters.sendEncodings;
                            this.setParametersPromises.push(sender.setParameters(params).then(function() {
                                delete sender.sendEncodings;
                            }).catch(function() {
                                delete sender.sendEncodings;
                            }));
                        }
                    }
                    return transceiver;
                };
            }
            function shimGetParameters(window) {
                if (!(_typeof(window) === 'object' && window.RTCRtpSender)) return;
                var origGetParameters = window.RTCRtpSender.prototype.getParameters;
                if (origGetParameters) window.RTCRtpSender.prototype.getParameters = function getParameters() {
                    var params = origGetParameters.apply(this, arguments);
                    if (!('encodings' in params)) params.encodings = [].concat(this.sendEncodings || [
                        {}
                    ]);
                    return params;
                };
            }
            function shimCreateOffer(window) {
                // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
                // Firefox ignores the init sendEncodings options passed to addTransceiver
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
                if (!(_typeof(window) === 'object' && window.RTCPeerConnection)) return;
                var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
                window.RTCPeerConnection.prototype.createOffer = function createOffer() {
                    var _arguments = arguments, _this4 = this;
                    if (this.setParametersPromises && this.setParametersPromises.length) return Promise.all(this.setParametersPromises).then(function() {
                        return origCreateOffer.apply(_this4, _arguments);
                    }).finally(function() {
                        _this4.setParametersPromises = [];
                    });
                    return origCreateOffer.apply(this, arguments);
                };
            }
            function shimCreateAnswer(window) {
                // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
                // Firefox ignores the init sendEncodings options passed to addTransceiver
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
                if (!(_typeof(window) === 'object' && window.RTCPeerConnection)) return;
                var origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
                window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
                    var _arguments2 = arguments, _this5 = this;
                    if (this.setParametersPromises && this.setParametersPromises.length) return Promise.all(this.setParametersPromises).then(function() {
                        return origCreateAnswer.apply(_this5, _arguments2);
                    }).finally(function() {
                        _this5.setParametersPromises = [];
                    });
                    return origCreateAnswer.apply(this, arguments);
                };
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
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
            exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
            exports.shimCallbacksAPI = shimCallbacksAPI;
            exports.shimGetUserMedia = shimGetUserMedia;
            exports.shimConstraints = shimConstraints;
            exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
            exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
            exports.shimCreateOfferLegacy = shimCreateOfferLegacy;
            exports.shimAudioContext = shimAudioContext;
            var utils = _interopRequireWildcard(require("../utils"));
            function _getRequireWildcardCache() {
                if (typeof WeakMap !== "function") return null;
                var cache = new WeakMap();
                _getRequireWildcardCache = function() {
                    return cache;
                };
                return cache;
            }
            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) return obj;
                if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
                    default: obj
                };
                var cache = _getRequireWildcardCache();
                if (cache && cache.has(obj)) return cache.get(obj);
                var newObj = {};
                var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                    if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
                    else newObj[key] = obj[key];
                }
                newObj.default = obj;
                if (cache) cache.set(obj, newObj);
                return newObj;
            }
            function _typeof(obj6) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function(obj) {
                    return typeof obj;
                };
                else _typeof = function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                return _typeof(obj6);
            }
            function shimLocalStreamsAPI(window) {
                if (_typeof(window) !== 'object' || !window.RTCPeerConnection) return;
                if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
                    if (!this._localStreams) this._localStreams = [];
                    return this._localStreams;
                };
                if (!('addStream' in window.RTCPeerConnection.prototype)) {
                    var _addTrack = window.RTCPeerConnection.prototype.addTrack;
                    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                        var _this = this;
                        if (!this._localStreams) this._localStreams = [];
                        if (!this._localStreams.includes(stream)) this._localStreams.push(stream);
                         // Try to emulate Chrome's behaviour of adding in audio-video order.
                        // Safari orders by track id.
                        stream.getAudioTracks().forEach(function(track) {
                            return _addTrack.call(_this, track, stream);
                        });
                        stream.getVideoTracks().forEach(function(track) {
                            return _addTrack.call(_this, track, stream);
                        });
                    };
                    window.RTCPeerConnection.prototype.addTrack = function addTrack(track) {
                        var _this2 = this;
                        for(var _len = arguments.length, streams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)streams[_key - 1] = arguments[_key];
                        if (streams) streams.forEach(function(stream) {
                            if (!_this2._localStreams) _this2._localStreams = [
                                stream
                            ];
                            else if (!_this2._localStreams.includes(stream)) _this2._localStreams.push(stream);
                        });
                        return _addTrack.apply(this, arguments);
                    };
                }
                if (!('removeStream' in window.RTCPeerConnection.prototype)) window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                    var _this3 = this;
                    if (!this._localStreams) this._localStreams = [];
                    var index = this._localStreams.indexOf(stream);
                    if (index === -1) return;
                    this._localStreams.splice(index, 1);
                    var tracks = stream.getTracks();
                    this.getSenders().forEach(function(sender) {
                        if (tracks.includes(sender.track)) _this3.removeTrack(sender);
                    });
                };
            }
            function shimRemoteStreamsAPI(window) {
                if (_typeof(window) !== 'object' || !window.RTCPeerConnection) return;
                if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
                    return this._remoteStreams ? this._remoteStreams : [];
                };
                if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
                    Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
                        get: function() {
                            return this._onaddstream;
                        },
                        set: function(f) {
                            var _this4 = this;
                            if (this._onaddstream) {
                                this.removeEventListener('addstream', this._onaddstream);
                                this.removeEventListener('track', this._onaddstreampoly);
                            }
                            this.addEventListener('addstream', this._onaddstream = f);
                            this.addEventListener('track', this._onaddstreampoly = function(e) {
                                e.streams.forEach(function(stream) {
                                    if (!_this4._remoteStreams) _this4._remoteStreams = [];
                                    if (_this4._remoteStreams.includes(stream)) return;
                                    _this4._remoteStreams.push(stream);
                                    var event = new Event('addstream');
                                    event.stream = stream;
                                    _this4.dispatchEvent(event);
                                });
                            });
                        }
                    });
                    var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
                    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
                        var pc = this;
                        if (!this._onaddstreampoly) this.addEventListener('track', this._onaddstreampoly = function(e) {
                            e.streams.forEach(function(stream) {
                                if (!pc._remoteStreams) pc._remoteStreams = [];
                                if (pc._remoteStreams.indexOf(stream) >= 0) return;
                                pc._remoteStreams.push(stream);
                                var event = new Event('addstream');
                                event.stream = stream;
                                pc.dispatchEvent(event);
                            });
                        });
                        return origSetRemoteDescription.apply(pc, arguments);
                    };
                }
            }
            function shimCallbacksAPI(window) {
                if (_typeof(window) !== 'object' || !window.RTCPeerConnection) return;
                var prototype = window.RTCPeerConnection.prototype;
                var origCreateOffer = prototype.createOffer;
                var origCreateAnswer = prototype.createAnswer;
                var setLocalDescription = prototype.setLocalDescription;
                var setRemoteDescription = prototype.setRemoteDescription;
                var addIceCandidate = prototype.addIceCandidate;
                prototype.createOffer = function createOffer(successCallback, failureCallback) {
                    var options = arguments.length >= 2 ? arguments[2] : arguments[0];
                    var promise = origCreateOffer.apply(this, [
                        options
                    ]);
                    if (!failureCallback) return promise;
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };
                prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
                    var options = arguments.length >= 2 ? arguments[2] : arguments[0];
                    var promise = origCreateAnswer.apply(this, [
                        options
                    ]);
                    if (!failureCallback) return promise;
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };
                var withCallback = function(description, successCallback, failureCallback) {
                    var promise = setLocalDescription.apply(this, [
                        description
                    ]);
                    if (!failureCallback) return promise;
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };
                prototype.setLocalDescription = withCallback;
                withCallback = function(description, successCallback, failureCallback) {
                    var promise = setRemoteDescription.apply(this, [
                        description
                    ]);
                    if (!failureCallback) return promise;
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };
                prototype.setRemoteDescription = withCallback;
                withCallback = function(candidate, successCallback, failureCallback) {
                    var promise = addIceCandidate.apply(this, [
                        candidate
                    ]);
                    if (!failureCallback) return promise;
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };
                prototype.addIceCandidate = withCallback;
            }
            function shimGetUserMedia(window) {
                var navigator = window && window.navigator;
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    // shim not needed in Safari 12.1
                    var mediaDevices = navigator.mediaDevices;
                    var _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
                    navigator.mediaDevices.getUserMedia = function(constraints) {
                        return _getUserMedia(shimConstraints(constraints));
                    };
                }
                if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) navigator.getUserMedia = (function getUserMedia(constraints, cb, errcb) {
                    navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
                }).bind(navigator);
            }
            function shimConstraints(constraints) {
                if (constraints && constraints.video !== undefined) return Object.assign({}, constraints, {
                    video: utils.compactObject(constraints.video)
                });
                return constraints;
            }
            function shimRTCIceServerUrls(window) {
                if (!window.RTCPeerConnection) return;
                 // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
                var OrigPeerConnection = window.RTCPeerConnection;
                window.RTCPeerConnection = function RTCPeerConnection(pcConfig, pcConstraints) {
                    if (pcConfig && pcConfig.iceServers) {
                        var newIceServers = [];
                        for(var i = 0; i < pcConfig.iceServers.length; i++){
                            var server = pcConfig.iceServers[i];
                            if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
                                utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                                server = JSON.parse(JSON.stringify(server));
                                server.urls = server.url;
                                delete server.url;
                                newIceServers.push(server);
                            } else newIceServers.push(pcConfig.iceServers[i]);
                        }
                        pcConfig.iceServers = newIceServers;
                    }
                    return new OrigPeerConnection(pcConfig, pcConstraints);
                };
                window.RTCPeerConnection.prototype = OrigPeerConnection.prototype; // wrap static methods. Currently just generateCertificate.
                if ('generateCertificate' in OrigPeerConnection) Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
                    get: function() {
                        return OrigPeerConnection.generateCertificate;
                    }
                });
            }
            function shimTrackEventTransceiver(window) {
                // Add event.transceiver member over deprecated event.receiver
                if (_typeof(window) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
                    get: function() {
                        return {
                            receiver: this.receiver
                        };
                    }
                });
            }
            function shimCreateOfferLegacy(window) {
                var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
                window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
                    if (offerOptions) {
                        if (typeof offerOptions.offerToReceiveAudio !== 'undefined') // support bit values
                        offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
                        var audioTransceiver = this.getTransceivers().find(function(transceiver) {
                            return transceiver.receiver.track.kind === 'audio';
                        });
                        if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
                            if (audioTransceiver.direction === 'sendrecv') {
                                if (audioTransceiver.setDirection) audioTransceiver.setDirection('sendonly');
                                else audioTransceiver.direction = 'sendonly';
                            } else if (audioTransceiver.direction === 'recvonly') {
                                if (audioTransceiver.setDirection) audioTransceiver.setDirection('inactive');
                                else audioTransceiver.direction = 'inactive';
                            }
                        } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) this.addTransceiver('audio');
                        if (typeof offerOptions.offerToReceiveVideo !== 'undefined') // support bit values
                        offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
                        var videoTransceiver = this.getTransceivers().find(function(transceiver) {
                            return transceiver.receiver.track.kind === 'video';
                        });
                        if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
                            if (videoTransceiver.direction === 'sendrecv') {
                                if (videoTransceiver.setDirection) videoTransceiver.setDirection('sendonly');
                                else videoTransceiver.direction = 'sendonly';
                            } else if (videoTransceiver.direction === 'recvonly') {
                                if (videoTransceiver.setDirection) videoTransceiver.setDirection('inactive');
                                else videoTransceiver.direction = 'inactive';
                            }
                        } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) this.addTransceiver('video');
                    }
                    return origCreateOffer.apply(this, arguments);
                };
            }
            function shimAudioContext(window) {
                if (_typeof(window) !== 'object' || window.AudioContext) return;
                window.AudioContext = window.webkitAudioContext;
            }
        },
        {
            "../utils": "iSxC"
        }
    ],
    "GOQK": [
        function(require, module, exports) {
            /*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimRTCIceCandidate = shimRTCIceCandidate;
            exports.shimMaxMessageSize = shimMaxMessageSize;
            exports.shimSendThrowTypeError = shimSendThrowTypeError;
            exports.shimConnectionState = shimConnectionState;
            exports.removeExtmapAllowMixed = removeExtmapAllowMixed;
            exports.shimAddIceCandidateNullOrEmpty = shimAddIceCandidateNullOrEmpty;
            var _sdp = _interopRequireDefault(require("sdp"));
            var utils = _interopRequireWildcard(require("./utils"));
            function _getRequireWildcardCache() {
                if (typeof WeakMap !== "function") return null;
                var cache = new WeakMap();
                _getRequireWildcardCache = function() {
                    return cache;
                };
                return cache;
            }
            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) return obj;
                if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
                    default: obj
                };
                var cache = _getRequireWildcardCache();
                if (cache && cache.has(obj)) return cache.get(obj);
                var newObj = {};
                var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                    if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
                    else newObj[key] = obj[key];
                }
                newObj.default = obj;
                if (cache) cache.set(obj, newObj);
                return newObj;
            }
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _typeof(obj7) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function(obj) {
                    return typeof obj;
                };
                else _typeof = function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                return _typeof(obj7);
            }
            function shimRTCIceCandidate(window) {
                // foundation is arbitrarily chosen as an indicator for full support for
                // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
                if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) return;
                var NativeRTCIceCandidate = window.RTCIceCandidate;
                window.RTCIceCandidate = function RTCIceCandidate(args) {
                    // Remove the a= which shouldn't be part of the candidate string.
                    if (_typeof(args) === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
                        args = JSON.parse(JSON.stringify(args));
                        args.candidate = args.candidate.substr(2);
                    }
                    if (args.candidate && args.candidate.length) {
                        // Augment the native candidate with the parsed fields.
                        var nativeCandidate = new NativeRTCIceCandidate(args);
                        var parsedCandidate = _sdp.default.parseCandidate(args.candidate);
                        var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate); // Add a serializer that does not serialize the extra attributes.
                        augmentedCandidate.toJSON = function toJSON() {
                            return {
                                candidate: augmentedCandidate.candidate,
                                sdpMid: augmentedCandidate.sdpMid,
                                sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                                usernameFragment: augmentedCandidate.usernameFragment
                            };
                        };
                        return augmentedCandidate;
                    }
                    return new NativeRTCIceCandidate(args);
                };
                window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype; // Hook up the augmented candidate in onicecandidate and
                // addEventListener('icecandidate', ...)
                utils.wrapPeerConnectionEvent(window, 'icecandidate', function(e) {
                    if (e.candidate) Object.defineProperty(e, 'candidate', {
                        value: new window.RTCIceCandidate(e.candidate),
                        writable: 'false'
                    });
                    return e;
                });
            }
            function shimMaxMessageSize(window, browserDetails) {
                if (!window.RTCPeerConnection) return;
                if (!('sctp' in window.RTCPeerConnection.prototype)) Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
                    get: function() {
                        return typeof this._sctp === 'undefined' ? null : this._sctp;
                    }
                });
                var sctpInDescription = function(description) {
                    if (!description || !description.sdp) return false;
                    var sections = _sdp.default.splitSections(description.sdp);
                    sections.shift();
                    return sections.some(function(mediaSection) {
                        var mLine = _sdp.default.parseMLine(mediaSection);
                        return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
                    });
                };
                var getRemoteFirefoxVersion = function(description) {
                    // TODO: Is there a better solution for detecting Firefox?
                    var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                    if (match === null || match.length < 2) return -1;
                    var version = parseInt(match[1], 10); // Test for NaN (yes, this is ugly)
                    return version !== version ? -1 : version;
                };
                var getCanSendMaxMessageSize = function(remoteIsFirefox) {
                    // Every implementation we know can send at least 64 KiB.
                    // Note: Although Chrome is technically able to send up to 256 KiB, the
                    //       data does not reach the other peer reliably.
                    //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
                    var canSendMaxMessageSize = 65536;
                    if (browserDetails.browser === 'firefox') {
                        if (browserDetails.version < 57) {
                            if (remoteIsFirefox === -1) // FF < 57 will send in 16 KiB chunks using the deprecated PPID
                            // fragmentation.
                            canSendMaxMessageSize = 16384;
                            else // However, other FF (and RAWRTC) can reassemble PPID-fragmented
                            // messages. Thus, supporting ~2 GiB when sending.
                            canSendMaxMessageSize = 2147483637;
                        } else if (browserDetails.version < 60) // Currently, all FF >= 57 will reset the remote maximum message size
                        // to the default value when a data channel is created at a later
                        // stage. :(
                        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
                        canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
                        else // FF >= 60 supports sending ~2 GiB
                        canSendMaxMessageSize = 2147483637;
                    }
                    return canSendMaxMessageSize;
                };
                var getMaxMessageSize = function(description, remoteIsFirefox) {
                    // Note: 65536 bytes is the default value from the SDP spec. Also,
                    //       every implementation we know supports receiving 65536 bytes.
                    var maxMessageSize = 65536; // FF 57 has a slightly incorrect default remote max message size, so
                    // we need to adjust it here to avoid a failure when sending.
                    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
                    if (browserDetails.browser === 'firefox' && browserDetails.version === 57) maxMessageSize = 65535;
                    var match = _sdp.default.matchPrefix(description.sdp, 'a=max-message-size:');
                    if (match.length > 0) maxMessageSize = parseInt(match[0].substr(19), 10);
                    else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) // If the maximum message size is not present in the remote SDP and
                    // both local and remote are Firefox, the remote peer can receive
                    // ~2 GiB.
                    maxMessageSize = 2147483637;
                    return maxMessageSize;
                };
                var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
                window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
                    this._sctp = null; // Chrome decided to not expose .sctp in plan-b mode.
                    // As usual, adapter.js has to do an 'ugly worakaround'
                    // to cover up the mess.
                    if (browserDetails.browser === 'chrome' && browserDetails.version >= 76) {
                        var { sdpSemantics: sdpSemantics  } = this.getConfiguration();
                        if (sdpSemantics === 'plan-b') Object.defineProperty(this, 'sctp', {
                            get: function() {
                                return typeof this._sctp === 'undefined' ? null : this._sctp;
                            },
                            enumerable: true,
                            configurable: true
                        });
                    }
                    if (sctpInDescription(arguments[0])) {
                        // Check if the remote is FF.
                        var isFirefox = getRemoteFirefoxVersion(arguments[0]); // Get the maximum message size the local peer is capable of sending
                        var canSendMMS = getCanSendMaxMessageSize(isFirefox); // Get the maximum message size of the remote peer.
                        var remoteMMS = getMaxMessageSize(arguments[0], isFirefox); // Determine final maximum message size
                        var maxMessageSize;
                        if (canSendMMS === 0 && remoteMMS === 0) maxMessageSize = Number.POSITIVE_INFINITY;
                        else if (canSendMMS === 0 || remoteMMS === 0) maxMessageSize = Math.max(canSendMMS, remoteMMS);
                        else maxMessageSize = Math.min(canSendMMS, remoteMMS);
                         // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
                        // attribute.
                        var sctp = {};
                        Object.defineProperty(sctp, 'maxMessageSize', {
                            get: function() {
                                return maxMessageSize;
                            }
                        });
                        this._sctp = sctp;
                    }
                    return origSetRemoteDescription.apply(this, arguments);
                };
            }
            function shimSendThrowTypeError(window) {
                if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) return;
                 // Note: Although Firefox >= 57 has a native implementation, the maximum
                //       message size can be reset for all data channels at a later stage.
                //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
                function wrapDcSend(dc, pc) {
                    var origDataChannelSend = dc.send;
                    dc.send = function send() {
                        var data = arguments[0];
                        var length = data.length || data.size || data.byteLength;
                        if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
                        return origDataChannelSend.apply(dc, arguments);
                    };
                }
                var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
                window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
                    var dataChannel = origCreateDataChannel.apply(this, arguments);
                    wrapDcSend(dataChannel, this);
                    return dataChannel;
                };
                utils.wrapPeerConnectionEvent(window, 'datachannel', function(e) {
                    wrapDcSend(e.channel, e.target);
                    return e;
                });
            }
            /* shims RTCConnectionState by pretending it is the same as iceConnectionState.
 * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
 * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
 * since DTLS failures would be hidden. See
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
 * for the Firefox tracking bug.
 */ function shimConnectionState(window) {
                if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) return;
                var proto = window.RTCPeerConnection.prototype;
                Object.defineProperty(proto, 'connectionState', {
                    get: function() {
                        return ({
                            completed: 'connected',
                            checking: 'connecting'
                        })[this.iceConnectionState] || this.iceConnectionState;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(proto, 'onconnectionstatechange', {
                    get: function() {
                        return this._onconnectionstatechange || null;
                    },
                    set: function(cb) {
                        if (this._onconnectionstatechange) {
                            this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
                            delete this._onconnectionstatechange;
                        }
                        if (cb) this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
                    },
                    enumerable: true,
                    configurable: true
                });
                [
                    'setLocalDescription',
                    'setRemoteDescription'
                ].forEach(function(method) {
                    var origMethod = proto[method];
                    proto[method] = function() {
                        if (!this._connectionstatechangepoly) {
                            this._connectionstatechangepoly = function(e) {
                                var pc = e.target;
                                if (pc._lastConnectionState !== pc.connectionState) {
                                    pc._lastConnectionState = pc.connectionState;
                                    var newEvent = new Event('connectionstatechange', e);
                                    pc.dispatchEvent(newEvent);
                                }
                                return e;
                            };
                            this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
                        }
                        return origMethod.apply(this, arguments);
                    };
                });
            }
            function removeExtmapAllowMixed(window, browserDetails) {
                /* remove a=extmap-allow-mixed for webrtc.org < M71 */ if (!window.RTCPeerConnection) return;
                if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) return;
                if (browserDetails.browser === 'safari' && browserDetails.version >= 605) return;
                var nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
                window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
                    if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
                        var sdp = desc.sdp.split('\n').filter(function(line) {
                            return line.trim() !== 'a=extmap-allow-mixed';
                        }).join('\n'); // Safari enforces read-only-ness of RTCSessionDescription fields.
                        if (window.RTCSessionDescription && desc instanceof window.RTCSessionDescription) arguments[0] = new window.RTCSessionDescription({
                            type: desc.type,
                            sdp: sdp
                        });
                        else desc.sdp = sdp;
                    }
                    return nativeSRD.apply(this, arguments);
                };
            }
            function shimAddIceCandidateNullOrEmpty(window, browserDetails) {
                // Support for addIceCandidate(null or undefined)
                // as well as addIceCandidate({candidate: "", ...})
                // https://bugs.chromium.org/p/chromium/issues/detail?id=978582
                // Note: must be called before other polyfills which change the signature.
                if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) return;
                var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
                if (!nativeAddIceCandidate || nativeAddIceCandidate.length === 0) return;
                window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
                    if (!arguments[0]) {
                        if (arguments[1]) arguments[1].apply(null);
                        return Promise.resolve();
                    } // Firefox 68+ emits and processes {candidate: "", ...}, ignore
                    // in older versions.
                    // Native support for ignoring exists for Chrome M77+.
                    // Safari ignores as well, exact version unknown but works in the same
                    // version that also ignores addIceCandidate(null).
                    if ((browserDetails.browser === 'chrome' && browserDetails.version < 78 || browserDetails.browser === 'firefox' && browserDetails.version < 68 || browserDetails.browser === 'safari') && arguments[0] && arguments[0].candidate === '') return Promise.resolve();
                    return nativeAddIceCandidate.apply(this, arguments);
                };
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
                value: true
            });
            exports.adapterFactory = adapterFactory;
            var utils = _interopRequireWildcard(require("./utils"));
            var chromeShim = _interopRequireWildcard(require("./chrome/chrome_shim"));
            var edgeShim = _interopRequireWildcard(require("./edge/edge_shim"));
            var firefoxShim = _interopRequireWildcard(require("./firefox/firefox_shim"));
            var safariShim = _interopRequireWildcard(require("./safari/safari_shim"));
            var commonShim = _interopRequireWildcard(require("./common_shim"));
            function _getRequireWildcardCache() {
                if (typeof WeakMap !== "function") return null;
                var cache = new WeakMap();
                _getRequireWildcardCache = function() {
                    return cache;
                };
                return cache;
            }
            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) return obj;
                if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
                    default: obj
                };
                var cache = _getRequireWildcardCache();
                if (cache && cache.has(obj)) return cache.get(obj);
                var newObj = {};
                var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                    if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
                    else newObj[key] = obj[key];
                }
                newObj.default = obj;
                if (cache) cache.set(obj, newObj);
                return newObj;
            }
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ // Browser shims.
            // Shimming starts here.
            function adapterFactory() {
                var { window: window  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                    shimChrome: true,
                    shimFirefox: true,
                    shimEdge: true,
                    shimSafari: true
                };
                // Utils.
                var logging = utils.log;
                var browserDetails = utils.detectBrowser(window);
                var adapter = {
                    browserDetails: browserDetails,
                    commonShim: commonShim,
                    extractVersion: utils.extractVersion,
                    disableLog: utils.disableLog,
                    disableWarnings: utils.disableWarnings
                }; // Shim browser if found.
                switch(browserDetails.browser){
                    case 'chrome':
                        if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
                            logging('Chrome shim is not included in this adapter release.');
                            return adapter;
                        }
                        if (browserDetails.version === null) {
                            logging('Chrome shim can not determine version, not shimming.');
                            return adapter;
                        }
                        logging('adapter.js shimming chrome.'); // Export to the adapter global object visible in the browser.
                        adapter.browserShim = chromeShim; // Must be called before shimPeerConnection.
                        commonShim.shimAddIceCandidateNullOrEmpty(window, browserDetails);
                        chromeShim.shimGetUserMedia(window, browserDetails);
                        chromeShim.shimMediaStream(window, browserDetails);
                        chromeShim.shimPeerConnection(window, browserDetails);
                        chromeShim.shimOnTrack(window, browserDetails);
                        chromeShim.shimAddTrackRemoveTrack(window, browserDetails);
                        chromeShim.shimGetSendersWithDtmf(window, browserDetails);
                        chromeShim.shimGetStats(window, browserDetails);
                        chromeShim.shimSenderReceiverGetStats(window, browserDetails);
                        chromeShim.fixNegotiationNeeded(window, browserDetails);
                        commonShim.shimRTCIceCandidate(window, browserDetails);
                        commonShim.shimConnectionState(window, browserDetails);
                        commonShim.shimMaxMessageSize(window, browserDetails);
                        commonShim.shimSendThrowTypeError(window, browserDetails);
                        commonShim.removeExtmapAllowMixed(window, browserDetails);
                        break;
                    case 'firefox':
                        if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
                            logging('Firefox shim is not included in this adapter release.');
                            return adapter;
                        }
                        logging('adapter.js shimming firefox.'); // Export to the adapter global object visible in the browser.
                        adapter.browserShim = firefoxShim; // Must be called before shimPeerConnection.
                        commonShim.shimAddIceCandidateNullOrEmpty(window, browserDetails);
                        firefoxShim.shimGetUserMedia(window, browserDetails);
                        firefoxShim.shimPeerConnection(window, browserDetails);
                        firefoxShim.shimOnTrack(window, browserDetails);
                        firefoxShim.shimRemoveStream(window, browserDetails);
                        firefoxShim.shimSenderGetStats(window, browserDetails);
                        firefoxShim.shimReceiverGetStats(window, browserDetails);
                        firefoxShim.shimRTCDataChannel(window, browserDetails);
                        firefoxShim.shimAddTransceiver(window, browserDetails);
                        firefoxShim.shimGetParameters(window, browserDetails);
                        firefoxShim.shimCreateOffer(window, browserDetails);
                        firefoxShim.shimCreateAnswer(window, browserDetails);
                        commonShim.shimRTCIceCandidate(window, browserDetails);
                        commonShim.shimConnectionState(window, browserDetails);
                        commonShim.shimMaxMessageSize(window, browserDetails);
                        commonShim.shimSendThrowTypeError(window, browserDetails);
                        break;
                    case 'edge':
                        if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
                            logging('MS edge shim is not included in this adapter release.');
                            return adapter;
                        }
                        logging('adapter.js shimming edge.'); // Export to the adapter global object visible in the browser.
                        adapter.browserShim = edgeShim;
                        edgeShim.shimGetUserMedia(window, browserDetails);
                        edgeShim.shimGetDisplayMedia(window, browserDetails);
                        edgeShim.shimPeerConnection(window, browserDetails);
                        edgeShim.shimReplaceTrack(window, browserDetails); // the edge shim implements the full RTCIceCandidate object.
                        commonShim.shimMaxMessageSize(window, browserDetails);
                        commonShim.shimSendThrowTypeError(window, browserDetails);
                        break;
                    case 'safari':
                        if (!safariShim || !options.shimSafari) {
                            logging('Safari shim is not included in this adapter release.');
                            return adapter;
                        }
                        logging('adapter.js shimming safari.'); // Export to the adapter global object visible in the browser.
                        adapter.browserShim = safariShim; // Must be called before shimCallbackAPI.
                        commonShim.shimAddIceCandidateNullOrEmpty(window, browserDetails);
                        safariShim.shimRTCIceServerUrls(window, browserDetails);
                        safariShim.shimCreateOfferLegacy(window, browserDetails);
                        safariShim.shimCallbacksAPI(window, browserDetails);
                        safariShim.shimLocalStreamsAPI(window, browserDetails);
                        safariShim.shimRemoteStreamsAPI(window, browserDetails);
                        safariShim.shimTrackEventTransceiver(window, browserDetails);
                        safariShim.shimGetUserMedia(window, browserDetails);
                        safariShim.shimAudioContext(window, browserDetails);
                        commonShim.shimRTCIceCandidate(window, browserDetails);
                        commonShim.shimMaxMessageSize(window, browserDetails);
                        commonShim.shimSendThrowTypeError(window, browserDetails);
                        commonShim.removeExtmapAllowMixed(window, browserDetails);
                        break;
                    default:
                        logging('Unsupported browser!');
                        break;
                }
                return adapter;
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
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = void 0;
            var _adapter_factory = require("./adapter_factory.js");
            var adapter = (0, _adapter_factory.adapterFactory)({
                window: typeof window === 'undefined' ? undefined : window
            });
            var _default = adapter;
            exports.default = _default;
        },
        {
            "./adapter_factory.js": "KtlG"
        }
    ],
    "sXtV": [
        function(require, module, exports) {
            "use strict";
            var __importDefault = this && this.__importDefault || function(mod) {
                return mod && mod.__esModule ? mod : {
                    "default": mod
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.webRTCAdapter = void 0;
            var webrtc_adapter_1 = __importDefault(require("webrtc-adapter"));
            exports.webRTCAdapter = webrtc_adapter_1.default;
        },
        {
            "webrtc-adapter": "tI1X"
        }
    ],
    "I31f": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Supports = void 0;
            var adapter_1 = require("./adapter");
            exports.Supports = new /** @class */ (function() {
                function class_1() {
                    this.isIOS = [
                        'iPad',
                        'iPhone',
                        'iPod'
                    ].includes(navigator.platform);
                    this.supportedBrowsers = [
                        'firefox',
                        'chrome',
                        'safari'
                    ];
                    this.minFirefoxVersion = 59;
                    this.minChromeVersion = 72;
                    this.minSafariVersion = 605;
                }
                class_1.prototype.isWebRTCSupported = function() {
                    return typeof RTCPeerConnection !== 'undefined';
                };
                class_1.prototype.isBrowserSupported = function() {
                    var browser = this.getBrowser();
                    var version = this.getVersion();
                    var validBrowser = this.supportedBrowsers.includes(browser);
                    if (!validBrowser) return false;
                    if (browser === 'chrome') return version >= this.minChromeVersion;
                    if (browser === 'firefox') return version >= this.minFirefoxVersion;
                    if (browser === 'safari') return !this.isIOS && version >= this.minSafariVersion;
                    return false;
                };
                class_1.prototype.getBrowser = function() {
                    return adapter_1.webRTCAdapter.browserDetails.browser;
                };
                class_1.prototype.getVersion = function() {
                    return adapter_1.webRTCAdapter.browserDetails.version || 0;
                };
                class_1.prototype.isUnifiedPlanSupported = function() {
                    var browser = this.getBrowser();
                    var version = adapter_1.webRTCAdapter.browserDetails.version || 0;
                    if (browser === 'chrome' && version < 72) return false;
                    if (browser === 'firefox' && version >= 59) return true;
                    if (!window.RTCRtpTransceiver || !('currentDirection' in RTCRtpTransceiver.prototype)) return false;
                    var tempPc;
                    var supported = false;
                    try {
                        tempPc = new RTCPeerConnection();
                        tempPc.addTransceiver('audio');
                        supported = true;
                    } catch (e) {} finally{
                        if (tempPc) tempPc.close();
                    }
                    return supported;
                };
                class_1.prototype.toString = function() {
                    return "Supports: \n    browser:" + this.getBrowser() + " \n    version:" + this.getVersion() + " \n    isIOS:" + this.isIOS + " \n    isWebRTCSupported:" + this.isWebRTCSupported() + " \n    isBrowserSupported:" + this.isBrowserSupported() + " \n    isUnifiedPlanSupported:" + this.isUnifiedPlanSupported();
                };
                return class_1;
            }())();
        },
        {
            "./adapter": "sXtV"
        }
    ],
    "BHXf": [
        function(require, module, exports) {
            "use strict";
            var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
                if (k2 === undefined) k2 = k;
                Object.defineProperty(o, k2, {
                    enumerable: true,
                    get: function get() {
                        return m[k];
                    }
                });
            } : function(o, m, k, k2) {
                if (k2 === undefined) k2 = k;
                o[k2] = m[k];
            });
            var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
                Object.defineProperty(o, "default", {
                    enumerable: true,
                    value: v
                });
            } : function(o, v) {
                o["default"] = v;
            });
            var __importStar = this && this.__importStar || function(mod) {
                if (mod && mod.__esModule) return mod;
                var result = {};
                if (mod != null) {
                    for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
                }
                __setModuleDefault(result, mod);
                return result;
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.util = void 0;
            var BinaryPack = __importStar(require("peerjs-js-binarypack"));
            var supports_1 = require("./supports");
            var DEFAULT_CONFIG = {
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
            exports.util = new /** @class */ (function() {
                function class_1() {
                    this.CLOUD_HOST = "0.peerjs.com";
                    this.CLOUD_PORT = 443; // Browsers that need chunking:
                    this.chunkedBrowsers = {
                        Chrome: 1,
                        chrome: 1
                    };
                    this.chunkedMTU = 16300; // The original 60000 bytes setting does not work when sending data from Firefox to Chrome, which is "cut off" after 16384 bytes and delivered individually.
                    // Returns browser-agnostic default config
                    this.defaultConfig = DEFAULT_CONFIG;
                    this.browser = supports_1.Supports.getBrowser();
                    this.browserVersion = supports_1.Supports.getVersion(); // Lists which features are supported
                    this.supports = function() {
                        var supported = {
                            browser: supports_1.Supports.isBrowserSupported(),
                            webRTC: supports_1.Supports.isWebRTCSupported(),
                            audioVideo: false,
                            data: false,
                            binaryBlob: false,
                            reliable: false
                        };
                        if (!supported.webRTC) return supported;
                        var pc;
                        try {
                            pc = new RTCPeerConnection(DEFAULT_CONFIG);
                            supported.audioVideo = true;
                            var dc = void 0;
                            try {
                                dc = pc.createDataChannel("_PEERJSTEST", {
                                    ordered: true
                                });
                                supported.data = true;
                                supported.reliable = !!dc.ordered; // Binary test
                                try {
                                    dc.binaryType = "blob";
                                    supported.binaryBlob = !supports_1.Supports.isIOS;
                                } catch (e) {}
                            } catch (e) {} finally{
                                if (dc) dc.close();
                            }
                        } catch (e) {} finally{
                            if (pc) pc.close();
                        }
                        return supported;
                    }();
                    this.pack = BinaryPack.pack;
                    this.unpack = BinaryPack.unpack; // Binary stuff
                    this._dataCount = 1;
                }
                class_1.prototype.noop = function() {}; // Ensure alphanumeric ids
                class_1.prototype.validateId = function(id) {
                    // Allow empty ids
                    return !id || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(id);
                };
                class_1.prototype.chunk = function(blob) {
                    var chunks = [];
                    var size = blob.size;
                    var total = Math.ceil(size / exports.util.chunkedMTU);
                    var index = 0;
                    var start = 0;
                    while(start < size){
                        var end = Math.min(size, start + exports.util.chunkedMTU);
                        var b = blob.slice(start, end);
                        var chunk = {
                            __peerData: this._dataCount,
                            n: index,
                            data: b,
                            total: total
                        };
                        chunks.push(chunk);
                        start = end;
                        index++;
                    }
                    this._dataCount++;
                    return chunks;
                };
                class_1.prototype.blobToArrayBuffer = function(blob, cb) {
                    var fr = new FileReader();
                    fr.onload = function(evt) {
                        if (evt.target) cb(evt.target.result);
                    };
                    fr.readAsArrayBuffer(blob);
                    return fr;
                };
                class_1.prototype.binaryStringToArrayBuffer = function(binary) {
                    var byteArray = new Uint8Array(binary.length);
                    for(var i = 0; i < binary.length; i++)byteArray[i] = binary.charCodeAt(i) & 255;
                    return byteArray.buffer;
                };
                class_1.prototype.randomToken = function() {
                    return Math.random().toString(36).substr(2);
                };
                class_1.prototype.isSecure = function() {
                    return location.protocol === "https:";
                };
                return class_1;
            }())();
        },
        {
            "peerjs-js-binarypack": "kdPp",
            "./supports": "I31f"
        }
    ],
    "JJlS": [
        function(require, module, exports) {
            'use strict';
            var has = Object.prototype.hasOwnProperty, prefix = '~';
            /**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */ function Events() {}
            //
            // We try to not inherit from `Object.prototype`. In some engines creating an
            // instance in this way is faster than calling `Object.create(null)` directly.
            // If `Object.create(null)` is not supported we prefix the event names with a
            // character to make sure that the built-in object properties are not
            // overridden or used as an attack vector.
            //
            if (Object.create) {
                Events.prototype = Object.create(null);
                //
                // This hack is needed because the `__proto__` property is still inherited in
                // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
                //
                if (!new Events().__proto__) prefix = false;
            }
            /**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */ function EE(fn, context, once) {
                this.fn = fn;
                this.context = context;
                this.once = once || false;
            }
            /**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */ function addListener(emitter, event, fn, context, once) {
                if (typeof fn !== 'function') throw new TypeError('The listener must be a function');
                var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
                if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
                else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
                else emitter._events[evt] = [
                    emitter._events[evt],
                    listener
                ];
                return emitter;
            }
            /**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */ function clearEvent(emitter, evt) {
                if (--emitter._eventsCount === 0) emitter._events = new Events();
                else delete emitter._events[evt];
            }
            /**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */ function EventEmitter() {
                this._events = new Events();
                this._eventsCount = 0;
            }
            /**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */ EventEmitter.prototype.eventNames = function eventNames() {
                var names = [], events, name;
                if (this._eventsCount === 0) return names;
                for(name in events = this._events)if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
                if (Object.getOwnPropertySymbols) return names.concat(Object.getOwnPropertySymbols(events));
                return names;
            };
            /**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */ EventEmitter.prototype.listeners = function listeners(event) {
                var evt = prefix ? prefix + event : event, handlers = this._events[evt];
                if (!handlers) return [];
                if (handlers.fn) return [
                    handlers.fn
                ];
                for(var i = 0, l = handlers.length, ee = new Array(l); i < l; i++)ee[i] = handlers[i].fn;
                return ee;
            };
            /**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */ EventEmitter.prototype.listenerCount = function listenerCount(event) {
                var evt = prefix ? prefix + event : event, listeners = this._events[evt];
                if (!listeners) return 0;
                if (listeners.fn) return 1;
                return listeners.length;
            };
            /**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */ EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
                var evt = prefix ? prefix + event : event;
                if (!this._events[evt]) return false;
                var listeners = this._events[evt], len = arguments.length, args, i;
                if (listeners.fn) {
                    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
                    switch(len){
                        case 1:
                            return listeners.fn.call(listeners.context), true;
                        case 2:
                            return listeners.fn.call(listeners.context, a1), true;
                        case 3:
                            return listeners.fn.call(listeners.context, a1, a2), true;
                        case 4:
                            return listeners.fn.call(listeners.context, a1, a2, a3), true;
                        case 5:
                            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
                        case 6:
                            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
                    }
                    for(i = 1, args = new Array(len - 1); i < len; i++)args[i - 1] = arguments[i];
                    listeners.fn.apply(listeners.context, args);
                } else {
                    var length = listeners.length, j;
                    for(i = 0; i < length; i++){
                        if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
                        switch(len){
                            case 1:
                                listeners[i].fn.call(listeners[i].context);
                                break;
                            case 2:
                                listeners[i].fn.call(listeners[i].context, a1);
                                break;
                            case 3:
                                listeners[i].fn.call(listeners[i].context, a1, a2);
                                break;
                            case 4:
                                listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                                break;
                            default:
                                if (!args) for(j = 1, args = new Array(len - 1); j < len; j++)args[j - 1] = arguments[j];
                                listeners[i].fn.apply(listeners[i].context, args);
                        }
                    }
                }
                return true;
            };
            /**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.on = function on(event, fn, context) {
                return addListener(this, event, fn, context, false);
            };
            /**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.once = function once(event, fn, context) {
                return addListener(this, event, fn, context, true);
            };
            /**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
                var evt = prefix ? prefix + event : event;
                if (!this._events[evt]) return this;
                if (!fn) {
                    clearEvent(this, evt);
                    return this;
                }
                var listeners = this._events[evt];
                if (listeners.fn) {
                    if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) clearEvent(this, evt);
                } else {
                    for(var i = 0, events = [], length = listeners.length; i < length; i++)if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) events.push(listeners[i]);
                    //
                    // Reset the array, or remove it completely if we have no more listeners.
                    //
                    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
                    else clearEvent(this, evt);
                }
                return this;
            };
            /**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
                var evt;
                if (event) {
                    evt = prefix ? prefix + event : event;
                    if (this._events[evt]) clearEvent(this, evt);
                } else {
                    this._events = new Events();
                    this._eventsCount = 0;
                }
                return this;
            };
            //
            // Alias methods names because people roll like that.
            //
            EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
            EventEmitter.prototype.addListener = EventEmitter.prototype.on;
            //
            // Expose the prefix.
            //
            EventEmitter.prefixed = prefix;
            //
            // Allow `EventEmitter` to be imported as module namespace.
            //
            EventEmitter.EventEmitter = EventEmitter;
            //
            // Expose the module.
            //
            if ('undefined' !== typeof module) module.exports = EventEmitter;
        },
        {}
    ],
    "WOs9": [
        function(require, module, exports) {
            "use strict";
            var __read = this && this.__read || function(o, n) {
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
            };
            var __spreadArray = this && this.__spreadArray || function(to, from) {
                for(var i = 0, il = from.length, j = to.length; i < il; i++, j++)to[j] = from[i];
                return to;
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.LogLevel = void 0;
            var LOG_PREFIX = 'PeerJS: ';
            /*
Prints log messages depending on the debug level passed in. Defaults to 0.
0  Prints no logs.
1  Prints only errors.
2  Prints errors and warnings.
3  Prints all logs.
*/ var LogLevel1;
            (function(LogLevel) {
                LogLevel[LogLevel["Disabled"] = 0] = "Disabled";
                LogLevel[LogLevel["Errors"] = 1] = "Errors";
                LogLevel[LogLevel["Warnings"] = 2] = "Warnings";
                LogLevel[LogLevel["All"] = 3] = "All";
            })(LogLevel1 = exports.LogLevel || (exports.LogLevel = {}));
            var Logger1 = /** @class */ function() {
                function Logger() {
                    this._logLevel = LogLevel1.Disabled;
                }
                Object.defineProperty(Logger.prototype, "logLevel", {
                    get: function get() {
                        return this._logLevel;
                    },
                    set: function set(logLevel) {
                        this._logLevel = logLevel;
                    },
                    enumerable: false,
                    configurable: true
                });
                Logger.prototype.log = function() {
                    var args = [];
                    for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
                    if (this._logLevel >= LogLevel1.All) this._print.apply(this, __spreadArray([
                        LogLevel1.All
                    ], __read(args)));
                };
                Logger.prototype.warn = function() {
                    var args = [];
                    for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
                    if (this._logLevel >= LogLevel1.Warnings) this._print.apply(this, __spreadArray([
                        LogLevel1.Warnings
                    ], __read(args)));
                };
                Logger.prototype.error = function() {
                    var args = [];
                    for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
                    if (this._logLevel >= LogLevel1.Errors) this._print.apply(this, __spreadArray([
                        LogLevel1.Errors
                    ], __read(args)));
                };
                Logger.prototype.setLogFunction = function(fn) {
                    this._print = fn;
                };
                Logger.prototype._print = function(logLevel) {
                    var rest = [];
                    for(var _i = 1; _i < arguments.length; _i++)rest[_i - 1] = arguments[_i];
                    var copy = __spreadArray([
                        LOG_PREFIX
                    ], __read(rest));
                    for(var i in copy)if (copy[i] instanceof Error) copy[i] = "(" + copy[i].name + ") " + copy[i].message;
                    if (logLevel >= LogLevel1.All) console.log.apply(console, __spreadArray([], __read(copy)));
                    else if (logLevel >= LogLevel1.Warnings) console.warn.apply(console, __spreadArray([
                        "WARNING"
                    ], __read(copy)));
                    else if (logLevel >= LogLevel1.Errors) console.error.apply(console, __spreadArray([
                        "ERROR"
                    ], __read(copy)));
                };
                return Logger;
            }();
            exports.default = new Logger1();
        },
        {}
    ],
    "ZRYf": [
        function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.ServerMessageType = exports.SocketEventType = exports.SerializationType = exports.PeerErrorType = exports.PeerEventType = exports.ConnectionType = exports.ConnectionEventType = void 0;
            var ConnectionEventType1;
            (function(ConnectionEventType) {
                ConnectionEventType["Open"] = "open";
                ConnectionEventType["Stream"] = "stream";
                ConnectionEventType["Data"] = "data";
                ConnectionEventType["Close"] = "close";
                ConnectionEventType["Error"] = "error";
                ConnectionEventType["IceStateChanged"] = "iceStateChanged";
            })(ConnectionEventType1 = exports.ConnectionEventType || (exports.ConnectionEventType = {}));
            var ConnectionType1;
            (function(ConnectionType) {
                ConnectionType["Data"] = "data";
                ConnectionType["Media"] = "media";
            })(ConnectionType1 = exports.ConnectionType || (exports.ConnectionType = {}));
            var PeerEventType1;
            (function(PeerEventType) {
                PeerEventType["Open"] = "open";
                PeerEventType["Close"] = "close";
                PeerEventType["Connection"] = "connection";
                PeerEventType["Call"] = "call";
                PeerEventType["Disconnected"] = "disconnected";
                PeerEventType["Error"] = "error";
            })(PeerEventType1 = exports.PeerEventType || (exports.PeerEventType = {}));
            var PeerErrorType1;
            (function(PeerErrorType) {
                PeerErrorType["BrowserIncompatible"] = "browser-incompatible";
                PeerErrorType["Disconnected"] = "disconnected";
                PeerErrorType["InvalidID"] = "invalid-id";
                PeerErrorType["InvalidKey"] = "invalid-key";
                PeerErrorType["Network"] = "network";
                PeerErrorType["PeerUnavailable"] = "peer-unavailable";
                PeerErrorType["SslUnavailable"] = "ssl-unavailable";
                PeerErrorType["ServerError"] = "server-error";
                PeerErrorType["SocketError"] = "socket-error";
                PeerErrorType["SocketClosed"] = "socket-closed";
                PeerErrorType["UnavailableID"] = "unavailable-id";
                PeerErrorType["WebRTC"] = "webrtc";
            })(PeerErrorType1 = exports.PeerErrorType || (exports.PeerErrorType = {}));
            var SerializationType1;
            (function(SerializationType) {
                SerializationType["Binary"] = "binary";
                SerializationType["BinaryUTF8"] = "binary-utf8";
                SerializationType["JSON"] = "json";
            })(SerializationType1 = exports.SerializationType || (exports.SerializationType = {}));
            var SocketEventType1;
            (function(SocketEventType) {
                SocketEventType["Message"] = "message";
                SocketEventType["Disconnected"] = "disconnected";
                SocketEventType["Error"] = "error";
                SocketEventType["Close"] = "close";
            })(SocketEventType1 = exports.SocketEventType || (exports.SocketEventType = {}));
            var ServerMessageType1;
            (function(ServerMessageType) {
                ServerMessageType["Heartbeat"] = "HEARTBEAT";
                ServerMessageType["Candidate"] = "CANDIDATE";
                ServerMessageType["Offer"] = "OFFER";
                ServerMessageType["Answer"] = "ANSWER";
                ServerMessageType["Open"] = "OPEN";
                ServerMessageType["Error"] = "ERROR";
                ServerMessageType["IdTaken"] = "ID-TAKEN";
                ServerMessageType["InvalidKey"] = "INVALID-KEY";
                ServerMessageType["Leave"] = "LEAVE";
                ServerMessageType["Expire"] = "EXPIRE"; // The offer sent to a peer has expired without response.
            })(ServerMessageType1 = exports.ServerMessageType || (exports.ServerMessageType = {}));
        },
        {}
    ],
    "wJlv": [
        function(require, module, exports) {
            "use strict";
            var __extends = this && this.__extends || function() {
                var _extendStatics = function extendStatics(d1, b1) {
                    _extendStatics = Object.setPrototypeOf || ({
                        __proto__: []
                    }) instanceof Array && function(d, b) {
                        d.__proto__ = b;
                    } || function(d, b) {
                        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                    };
                    return _extendStatics(d1, b1);
                };
                return function(d, b) {
                    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                    _extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var __read = this && this.__read || function(o, n) {
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
            };
            var __spreadArray = this && this.__spreadArray || function(to, from) {
                for(var i = 0, il = from.length, j = to.length; i < il; i++, j++)to[j] = from[i];
                return to;
            };
            var __values = this && this.__values || function(o) {
                var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
                if (m) return m.call(o);
                if (o && typeof o.length === "number") return {
                    next: function next() {
                        if (o && i >= o.length) o = void 0;
                        return {
                            value: o && o[i++],
                            done: !o
                        };
                    }
                };
                throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
            };
            var __importDefault = this && this.__importDefault || function(mod) {
                return mod && mod.__esModule ? mod : {
                    "default": mod
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Socket = void 0;
            var eventemitter3_1 = require("eventemitter3");
            var logger_1 = __importDefault(require("./logger"));
            var enums_1 = require("./enums");
            /**
 * An abstraction on top of WebSockets to provide fastest
 * possible connection for peers.
 */ var Socket1 = /** @class */ function(_super) {
                __extends(Socket, _super);
                function Socket(secure, host, port, path, key, pingInterval) {
                    if (pingInterval === void 0) pingInterval = 5000;
                    var _this = _super.call(this) || this;
                    _this.pingInterval = pingInterval;
                    _this._disconnected = true;
                    _this._messagesQueue = [];
                    var wsProtocol = secure ? "wss://" : "ws://";
                    _this._baseUrl = wsProtocol + host + ":" + port + path + "peerjs?key=" + key;
                    return _this;
                }
                Socket.prototype.start = function(id, token) {
                    var _this = this;
                    this._id = id;
                    var wsUrl = this._baseUrl + "&id=" + id + "&token=" + token;
                    if (!!this._socket || !this._disconnected) return;
                    this._socket = new WebSocket(wsUrl);
                    this._disconnected = false;
                    this._socket.onmessage = function(event) {
                        var data;
                        try {
                            data = JSON.parse(event.data);
                            logger_1.default.log("Server message received:", data);
                        } catch (e) {
                            logger_1.default.log("Invalid server message", event.data);
                            return;
                        }
                        _this.emit(enums_1.SocketEventType.Message, data);
                    };
                    this._socket.onclose = function(event) {
                        if (_this._disconnected) return;
                        logger_1.default.log("Socket closed.", event);
                        _this._cleanup();
                        _this._disconnected = true;
                        _this.emit(enums_1.SocketEventType.Disconnected);
                    }; // Take care of the queue of connections if necessary and make sure Peer knows
                    // socket is open.
                    this._socket.onopen = function() {
                        if (_this._disconnected) return;
                        _this._sendQueuedMessages();
                        logger_1.default.log("Socket open");
                        _this._scheduleHeartbeat();
                    };
                };
                Socket.prototype._scheduleHeartbeat = function() {
                    var _this = this;
                    this._wsPingTimer = setTimeout(function() {
                        _this._sendHeartbeat();
                    }, this.pingInterval);
                };
                Socket.prototype._sendHeartbeat = function() {
                    if (!this._wsOpen()) {
                        logger_1.default.log("Cannot send heartbeat, because socket closed");
                        return;
                    }
                    var message = JSON.stringify({
                        type: enums_1.ServerMessageType.Heartbeat
                    });
                    this._socket.send(message);
                    this._scheduleHeartbeat();
                };
                /** Is the websocket currently open? */ Socket.prototype._wsOpen = function() {
                    return !!this._socket && this._socket.readyState === 1;
                };
                /** Send queued messages. */ Socket.prototype._sendQueuedMessages = function() {
                    var e_1, _a; //Create copy of queue and clear it,
                    //because send method push the message back to queue if smth will go wrong
                    var copiedQueue = __spreadArray([], __read(this._messagesQueue));
                    this._messagesQueue = [];
                    try {
                        for(var copiedQueue_1 = __values(copiedQueue), copiedQueue_1_1 = copiedQueue_1.next(); !copiedQueue_1_1.done; copiedQueue_1_1 = copiedQueue_1.next()){
                            var message = copiedQueue_1_1.value;
                            this.send(message);
                        }
                    } catch (e_1_1) {
                        e_1 = {
                            error: e_1_1
                        };
                    } finally{
                        try {
                            if (copiedQueue_1_1 && !copiedQueue_1_1.done && (_a = copiedQueue_1.return)) _a.call(copiedQueue_1);
                        } finally{
                            if (e_1) throw e_1.error;
                        }
                    }
                };
                /** Exposed send for DC & Peer. */ Socket.prototype.send = function(data) {
                    if (this._disconnected) return;
                     // If we didn't get an ID yet, we can't yet send anything so we should queue
                    // up these messages.
                    if (!this._id) {
                        this._messagesQueue.push(data);
                        return;
                    }
                    if (!data.type) {
                        this.emit(enums_1.SocketEventType.Error, "Invalid message");
                        return;
                    }
                    if (!this._wsOpen()) return;
                    var message = JSON.stringify(data);
                    this._socket.send(message);
                };
                Socket.prototype.close = function() {
                    if (this._disconnected) return;
                    this._cleanup();
                    this._disconnected = true;
                };
                Socket.prototype._cleanup = function() {
                    if (this._socket) {
                        this._socket.onopen = this._socket.onmessage = this._socket.onclose = null;
                        this._socket.close();
                        this._socket = undefined;
                    }
                    clearTimeout(this._wsPingTimer);
                };
                return Socket;
            }(eventemitter3_1.EventEmitter);
            exports.Socket = Socket1;
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
            var __assign = this && this.__assign || function() {
                __assign = Object.assign || function(t) {
                    for(var s, i = 1, n = arguments.length; i < n; i++){
                        s = arguments[i];
                        for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };
            var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                    return value instanceof P ? value : new P(function(resolve) {
                        resolve(value);
                    });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator["throw"](value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            var __generator = this && this.__generator || function(thisArg, body) {
                var _ = {
                    label: 0,
                    sent: function sent() {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: []
                }, f, y, t, g;
                return g = {
                    next: verb(0),
                    "throw": verb(1),
                    "return": verb(2)
                }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
                    return this;
                }), g;
                function verb(n) {
                    return function(v) {
                        return step([
                            n,
                            v
                        ]);
                    };
                }
                function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while(_){
                        try {
                            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                            if (y = 0, t) op = [
                                op[0] & 2,
                                t.value
                            ];
                            switch(op[0]){
                                case 0:
                                case 1:
                                    t = op;
                                    break;
                                case 4:
                                    _.label++;
                                    return {
                                        value: op[1],
                                        done: false
                                    };
                                case 5:
                                    _.label++;
                                    y = op[1];
                                    op = [
                                        0
                                    ];
                                    continue;
                                case 7:
                                    op = _.ops.pop();
                                    _.trys.pop();
                                    continue;
                                default:
                                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                        _ = 0;
                                        continue;
                                    }
                                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                                        _.label = op[1];
                                        break;
                                    }
                                    if (op[0] === 6 && _.label < t[1]) {
                                        _.label = t[1];
                                        t = op;
                                        break;
                                    }
                                    if (t && _.label < t[2]) {
                                        _.label = t[2];
                                        _.ops.push(op);
                                        break;
                                    }
                                    if (t[2]) _.ops.pop();
                                    _.trys.pop();
                                    continue;
                            }
                            op = body.call(thisArg, _);
                        } catch (e) {
                            op = [
                                6,
                                e
                            ];
                            y = 0;
                        } finally{
                            f = t = 0;
                        }
                    }
                    if (op[0] & 5) throw op[1];
                    return {
                        value: op[0] ? op[1] : void 0,
                        done: true
                    };
                }
            };
            var __importDefault = this && this.__importDefault || function(mod) {
                return mod && mod.__esModule ? mod : {
                    "default": mod
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Negotiator = void 0;
            var util_1 = require("./util");
            var logger_1 = __importDefault(require("./logger"));
            var enums_1 = require("./enums");
            /**
 * Manages all negotiations between Peers.
 */ var Negotiator1 = /** @class */ function() {
                function Negotiator(connection) {
                    this.connection = connection;
                }
                /** Returns a PeerConnection object set up correctly (for data, media). */ Negotiator.prototype.startConnection = function(options) {
                    var peerConnection = this._startPeerConnection(); // Set the connection's PC.
                    this.connection.peerConnection = peerConnection;
                    if (this.connection.type === enums_1.ConnectionType.Media && options._stream) this._addTracksToConnection(options._stream, peerConnection);
                     // What do we need to do now?
                    if (options.originator) {
                        if (this.connection.type === enums_1.ConnectionType.Data) {
                            var dataConnection = this.connection;
                            var config = {
                                ordered: !!options.reliable
                            };
                            var dataChannel = peerConnection.createDataChannel(dataConnection.label, config);
                            dataConnection.initialize(dataChannel);
                        }
                        this._makeOffer();
                    } else this.handleSDP("OFFER", options.sdp);
                };
                /** Start a PC. */ Negotiator.prototype._startPeerConnection = function() {
                    logger_1.default.log("Creating RTCPeerConnection.");
                    var peerConnection = new RTCPeerConnection(this.connection.provider.options.config);
                    this._setupListeners(peerConnection);
                    return peerConnection;
                };
                /** Set up various WebRTC listeners. */ Negotiator.prototype._setupListeners = function(peerConnection) {
                    var _this = this;
                    var peerId = this.connection.peer;
                    var connectionId = this.connection.connectionId;
                    var connectionType = this.connection.type;
                    var provider = this.connection.provider; // ICE CANDIDATES.
                    logger_1.default.log("Listening for ICE candidates.");
                    peerConnection.onicecandidate = function(evt) {
                        if (!evt.candidate || !evt.candidate.candidate) return;
                        logger_1.default.log("Received ICE candidates for " + peerId + ":", evt.candidate);
                        provider.socket.send({
                            type: enums_1.ServerMessageType.Candidate,
                            payload: {
                                candidate: evt.candidate,
                                type: connectionType,
                                connectionId: connectionId
                            },
                            dst: peerId
                        });
                    };
                    peerConnection.oniceconnectionstatechange = function() {
                        switch(peerConnection.iceConnectionState){
                            case "failed":
                                logger_1.default.log("iceConnectionState is failed, closing connections to " + peerId);
                                _this.connection.emit(enums_1.ConnectionEventType.Error, new Error("Negotiation of connection to " + peerId + " failed."));
                                _this.connection.close();
                                break;
                            case "closed":
                                logger_1.default.log("iceConnectionState is closed, closing connections to " + peerId);
                                _this.connection.emit(enums_1.ConnectionEventType.Error, new Error("Connection to " + peerId + " closed."));
                                _this.connection.close();
                                break;
                            case "disconnected":
                                logger_1.default.log("iceConnectionState changed to disconnected on the connection with " + peerId);
                                break;
                            case "completed":
                                peerConnection.onicecandidate = util_1.util.noop;
                                break;
                        }
                        _this.connection.emit(enums_1.ConnectionEventType.IceStateChanged, peerConnection.iceConnectionState);
                    }; // DATACONNECTION.
                    logger_1.default.log("Listening for data channel"); // Fired between offer and answer, so options should already be saved
                    // in the options hash.
                    peerConnection.ondatachannel = function(evt) {
                        logger_1.default.log("Received data channel");
                        var dataChannel = evt.channel;
                        var connection = provider.getConnection(peerId, connectionId);
                        connection.initialize(dataChannel);
                    }; // MEDIACONNECTION.
                    logger_1.default.log("Listening for remote stream");
                    peerConnection.ontrack = function(evt) {
                        logger_1.default.log("Received remote stream");
                        var stream = evt.streams[0];
                        var connection = provider.getConnection(peerId, connectionId);
                        if (connection.type === enums_1.ConnectionType.Media) {
                            var mediaConnection = connection;
                            _this._addStreamToMediaConnection(stream, mediaConnection);
                        }
                    };
                };
                Negotiator.prototype.cleanup = function() {
                    logger_1.default.log("Cleaning up PeerConnection to " + this.connection.peer);
                    var peerConnection = this.connection.peerConnection;
                    if (!peerConnection) return;
                    this.connection.peerConnection = null; //unsubscribe from all PeerConnection's events
                    peerConnection.onicecandidate = peerConnection.oniceconnectionstatechange = peerConnection.ondatachannel = peerConnection.ontrack = function() {};
                    var peerConnectionNotClosed = peerConnection.signalingState !== "closed";
                    var dataChannelNotClosed = false;
                    if (this.connection.type === enums_1.ConnectionType.Data) {
                        var dataConnection = this.connection;
                        var dataChannel = dataConnection.dataChannel;
                        if (dataChannel) dataChannelNotClosed = !!dataChannel.readyState && dataChannel.readyState !== "closed";
                    }
                    if (peerConnectionNotClosed || dataChannelNotClosed) peerConnection.close();
                };
                Negotiator.prototype._makeOffer = function() {
                    return __awaiter(this, void 0, Promise, function() {
                        var peerConnection, provider, offer, payload, dataConnection, err_2, err_1_1;
                        return __generator(this, function(_a) {
                            switch(_a.label){
                                case 0:
                                    peerConnection = this.connection.peerConnection;
                                    provider = this.connection.provider;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([
                                        1,
                                        7,
                                        ,
                                        8
                                    ]);
                                    return [
                                        4,
                                        peerConnection.createOffer(this.connection.options.constraints)
                                    ];
                                case 2:
                                    offer = _a.sent();
                                    logger_1.default.log("Created offer.");
                                    if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === 'function') offer.sdp = this.connection.options.sdpTransform(offer.sdp) || offer.sdp;
                                    _a.label = 3;
                                case 3:
                                    _a.trys.push([
                                        3,
                                        5,
                                        ,
                                        6
                                    ]);
                                    return [
                                        4,
                                        peerConnection.setLocalDescription(offer)
                                    ];
                                case 4:
                                    _a.sent();
                                    logger_1.default.log("Set localDescription:", offer, "for:" + this.connection.peer);
                                    payload = {
                                        sdp: offer,
                                        type: this.connection.type,
                                        connectionId: this.connection.connectionId,
                                        metadata: this.connection.metadata,
                                        browser: util_1.util.browser
                                    };
                                    if (this.connection.type === enums_1.ConnectionType.Data) {
                                        dataConnection = this.connection;
                                        payload = __assign(__assign({}, payload), {
                                            label: dataConnection.label,
                                            reliable: dataConnection.reliable,
                                            serialization: dataConnection.serialization
                                        });
                                    }
                                    provider.socket.send({
                                        type: enums_1.ServerMessageType.Offer,
                                        payload: payload,
                                        dst: this.connection.peer
                                    });
                                    return [
                                        3,
                                        6
                                    ];
                                case 5:
                                    err_2 = _a.sent(); // TODO: investigate why _makeOffer is being called from the answer
                                    if (err_2 != "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer") {
                                        provider.emitError(enums_1.PeerErrorType.WebRTC, err_2);
                                        logger_1.default.log("Failed to setLocalDescription, ", err_2);
                                    }
                                    return [
                                        3,
                                        6
                                    ];
                                case 6:
                                    return [
                                        3,
                                        8
                                    ];
                                case 7:
                                    err_1_1 = _a.sent();
                                    provider.emitError(enums_1.PeerErrorType.WebRTC, err_1_1);
                                    logger_1.default.log("Failed to createOffer, ", err_1_1);
                                    return [
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
                };
                Negotiator.prototype._makeAnswer = function() {
                    return __awaiter(this, void 0, Promise, function() {
                        var peerConnection, provider, answer, err_3, err_1_2;
                        return __generator(this, function(_a) {
                            switch(_a.label){
                                case 0:
                                    peerConnection = this.connection.peerConnection;
                                    provider = this.connection.provider;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([
                                        1,
                                        7,
                                        ,
                                        8
                                    ]);
                                    return [
                                        4,
                                        peerConnection.createAnswer()
                                    ];
                                case 2:
                                    answer = _a.sent();
                                    logger_1.default.log("Created answer.");
                                    if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === 'function') answer.sdp = this.connection.options.sdpTransform(answer.sdp) || answer.sdp;
                                    _a.label = 3;
                                case 3:
                                    _a.trys.push([
                                        3,
                                        5,
                                        ,
                                        6
                                    ]);
                                    return [
                                        4,
                                        peerConnection.setLocalDescription(answer)
                                    ];
                                case 4:
                                    _a.sent();
                                    logger_1.default.log("Set localDescription:", answer, "for:" + this.connection.peer);
                                    provider.socket.send({
                                        type: enums_1.ServerMessageType.Answer,
                                        payload: {
                                            sdp: answer,
                                            type: this.connection.type,
                                            connectionId: this.connection.connectionId,
                                            browser: util_1.util.browser
                                        },
                                        dst: this.connection.peer
                                    });
                                    return [
                                        3,
                                        6
                                    ];
                                case 5:
                                    err_3 = _a.sent();
                                    provider.emitError(enums_1.PeerErrorType.WebRTC, err_3);
                                    logger_1.default.log("Failed to setLocalDescription, ", err_3);
                                    return [
                                        3,
                                        6
                                    ];
                                case 6:
                                    return [
                                        3,
                                        8
                                    ];
                                case 7:
                                    err_1_2 = _a.sent();
                                    provider.emitError(enums_1.PeerErrorType.WebRTC, err_1_2);
                                    logger_1.default.log("Failed to create answer, ", err_1_2);
                                    return [
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
                };
                /** Handle an SDP. */ Negotiator.prototype.handleSDP = function(type, sdp) {
                    return __awaiter(this, void 0, Promise, function() {
                        var peerConnection, provider, self, err_4;
                        return __generator(this, function(_a) {
                            switch(_a.label){
                                case 0:
                                    sdp = new RTCSessionDescription(sdp);
                                    peerConnection = this.connection.peerConnection;
                                    provider = this.connection.provider;
                                    logger_1.default.log("Setting remote description", sdp);
                                    self = this;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([
                                        1,
                                        5,
                                        ,
                                        6
                                    ]);
                                    return [
                                        4,
                                        peerConnection.setRemoteDescription(sdp)
                                    ];
                                case 2:
                                    _a.sent();
                                    logger_1.default.log("Set remoteDescription:" + type + " for:" + this.connection.peer);
                                    if (!(type === "OFFER")) return [
                                        3,
                                        4
                                    ];
                                    return [
                                        4,
                                        self._makeAnswer()
                                    ];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4:
                                    return [
                                        3,
                                        6
                                    ];
                                case 5:
                                    err_4 = _a.sent();
                                    provider.emitError(enums_1.PeerErrorType.WebRTC, err_4);
                                    logger_1.default.log("Failed to setRemoteDescription, ", err_4);
                                    return [
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
                };
                /** Handle a candidate. */ Negotiator.prototype.handleCandidate = function(ice) {
                    return __awaiter(this, void 0, Promise, function() {
                        var candidate, sdpMLineIndex, sdpMid, peerConnection, provider, err_5;
                        return __generator(this, function(_a) {
                            switch(_a.label){
                                case 0:
                                    logger_1.default.log("handleCandidate:", ice);
                                    candidate = ice.candidate;
                                    sdpMLineIndex = ice.sdpMLineIndex;
                                    sdpMid = ice.sdpMid;
                                    peerConnection = this.connection.peerConnection;
                                    provider = this.connection.provider;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([
                                        1,
                                        3,
                                        ,
                                        4
                                    ]);
                                    return [
                                        4,
                                        peerConnection.addIceCandidate(new RTCIceCandidate({
                                            sdpMid: sdpMid,
                                            sdpMLineIndex: sdpMLineIndex,
                                            candidate: candidate
                                        }))
                                    ];
                                case 2:
                                    _a.sent();
                                    logger_1.default.log("Added ICE candidate for:" + this.connection.peer);
                                    return [
                                        3,
                                        4
                                    ];
                                case 3:
                                    err_5 = _a.sent();
                                    provider.emitError(enums_1.PeerErrorType.WebRTC, err_5);
                                    logger_1.default.log("Failed to handleCandidate, ", err_5);
                                    return [
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
                };
                Negotiator.prototype._addTracksToConnection = function(stream, peerConnection) {
                    logger_1.default.log("add tracks from stream " + stream.id + " to peer connection");
                    if (!peerConnection.addTrack) return logger_1.default.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");
                    stream.getTracks().forEach(function(track) {
                        peerConnection.addTrack(track, stream);
                    });
                };
                Negotiator.prototype._addStreamToMediaConnection = function(stream, mediaConnection) {
                    logger_1.default.log("add stream " + stream.id + " to media connection " + mediaConnection.connectionId);
                    mediaConnection.addStream(stream);
                };
                return Negotiator;
            }();
            exports.Negotiator = Negotiator1;
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
            var __extends = this && this.__extends || function() {
                var _extendStatics = function extendStatics(d2, b2) {
                    _extendStatics = Object.setPrototypeOf || ({
                        __proto__: []
                    }) instanceof Array && function(d, b) {
                        d.__proto__ = b;
                    } || function(d, b) {
                        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                    };
                    return _extendStatics(d2, b2);
                };
                return function(d, b) {
                    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                    _extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.BaseConnection = void 0;
            var eventemitter3_1 = require("eventemitter3");
            var BaseConnection1 = /** @class */ function(_super) {
                __extends(BaseConnection, _super);
                function BaseConnection(peer, provider, options) {
                    var _this = _super.call(this) || this;
                    _this.peer = peer;
                    _this.provider = provider;
                    _this.options = options;
                    _this._open = false;
                    _this.metadata = options.metadata;
                    return _this;
                }
                Object.defineProperty(BaseConnection.prototype, "open", {
                    get: function get() {
                        return this._open;
                    },
                    enumerable: false,
                    configurable: true
                });
                return BaseConnection;
            }(eventemitter3_1.EventEmitter);
            exports.BaseConnection = BaseConnection1;
        },
        {
            "eventemitter3": "JJlS"
        }
    ],
    "dbHP": [
        function(require, module, exports) {
            "use strict";
            var __extends = this && this.__extends || function() {
                var _extendStatics = function extendStatics(d3, b3) {
                    _extendStatics = Object.setPrototypeOf || ({
                        __proto__: []
                    }) instanceof Array && function(d, b) {
                        d.__proto__ = b;
                    } || function(d, b) {
                        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                    };
                    return _extendStatics(d3, b3);
                };
                return function(d, b) {
                    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                    _extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var __assign = this && this.__assign || function() {
                __assign = Object.assign || function(t) {
                    for(var s, i = 1, n = arguments.length; i < n; i++){
                        s = arguments[i];
                        for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };
            var __values = this && this.__values || function(o) {
                var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
                if (m) return m.call(o);
                if (o && typeof o.length === "number") return {
                    next: function next() {
                        if (o && i >= o.length) o = void 0;
                        return {
                            value: o && o[i++],
                            done: !o
                        };
                    }
                };
                throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
            };
            var __importDefault = this && this.__importDefault || function(mod) {
                return mod && mod.__esModule ? mod : {
                    "default": mod
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.MediaConnection = void 0;
            var util_1 = require("./util");
            var logger_1 = __importDefault(require("./logger"));
            var negotiator_1 = require("./negotiator");
            var enums_1 = require("./enums");
            var baseconnection_1 = require("./baseconnection");
            /**
 * Wraps the streaming interface between two Peers.
 */ var MediaConnection1 = /** @class */ function(_super) {
                __extends(MediaConnection, _super);
                function MediaConnection(peerId, provider, options) {
                    var _this = _super.call(this, peerId, provider, options) || this;
                    _this._localStream = _this.options._stream;
                    _this.connectionId = _this.options.connectionId || MediaConnection.ID_PREFIX + util_1.util.randomToken();
                    _this._negotiator = new negotiator_1.Negotiator(_this);
                    if (_this._localStream) _this._negotiator.startConnection({
                        _stream: _this._localStream,
                        originator: true
                    });
                    return _this;
                }
                Object.defineProperty(MediaConnection.prototype, "type", {
                    get: function get() {
                        return enums_1.ConnectionType.Media;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(MediaConnection.prototype, "localStream", {
                    get: function get() {
                        return this._localStream;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(MediaConnection.prototype, "remoteStream", {
                    get: function get() {
                        return this._remoteStream;
                    },
                    enumerable: false,
                    configurable: true
                });
                MediaConnection.prototype.addStream = function(remoteStream) {
                    logger_1.default.log("Receiving stream", remoteStream);
                    this._remoteStream = remoteStream;
                    _super.prototype.emit.call(this, enums_1.ConnectionEventType.Stream, remoteStream); // Should we call this `open`?
                };
                MediaConnection.prototype.handleMessage = function(message) {
                    var type = message.type;
                    var payload = message.payload;
                    switch(message.type){
                        case enums_1.ServerMessageType.Answer:
                            // Forward to negotiator
                            this._negotiator.handleSDP(type, payload.sdp);
                            this._open = true;
                            break;
                        case enums_1.ServerMessageType.Candidate:
                            this._negotiator.handleCandidate(payload.candidate);
                            break;
                        default:
                            logger_1.default.warn("Unrecognized message type:" + type + " from peer:" + this.peer);
                            break;
                    }
                };
                MediaConnection.prototype.answer = function(stream, options) {
                    var e_1, _a;
                    if (options === void 0) options = {};
                    if (this._localStream) {
                        logger_1.default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
                        return;
                    }
                    this._localStream = stream;
                    if (options && options.sdpTransform) this.options.sdpTransform = options.sdpTransform;
                    this._negotiator.startConnection(__assign(__assign({}, this.options._payload), {
                        _stream: stream
                    })); // Retrieve lost messages stored because PeerConnection not set up.
                    var messages = this.provider._getMessages(this.connectionId);
                    try {
                        for(var messages_1 = __values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()){
                            var message = messages_1_1.value;
                            this.handleMessage(message);
                        }
                    } catch (e_1_1) {
                        e_1 = {
                            error: e_1_1
                        };
                    } finally{
                        try {
                            if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
                        } finally{
                            if (e_1) throw e_1.error;
                        }
                    }
                    this._open = true;
                };
                /**
   * Exposed functionality for users.
   */ /** Allows user to close connection. */ MediaConnection.prototype.close = function() {
                    if (this._negotiator) {
                        this._negotiator.cleanup();
                        this._negotiator = null;
                    }
                    this._localStream = null;
                    this._remoteStream = null;
                    if (this.provider) {
                        this.provider._removeConnection(this);
                        this.provider = null;
                    }
                    if (this.options && this.options._stream) this.options._stream = null;
                    if (!this.open) return;
                    this._open = false;
                    _super.prototype.emit.call(this, enums_1.ConnectionEventType.Close);
                };
                MediaConnection.ID_PREFIX = "mc_";
                return MediaConnection;
            }(baseconnection_1.BaseConnection);
            exports.MediaConnection = MediaConnection1;
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
            var __extends = this && this.__extends || function() {
                var _extendStatics = function extendStatics(d4, b4) {
                    _extendStatics = Object.setPrototypeOf || ({
                        __proto__: []
                    }) instanceof Array && function(d, b) {
                        d.__proto__ = b;
                    } || function(d, b) {
                        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                    };
                    return _extendStatics(d4, b4);
                };
                return function(d, b) {
                    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                    _extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var __importDefault = this && this.__importDefault || function(mod) {
                return mod && mod.__esModule ? mod : {
                    "default": mod
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.EncodingQueue = void 0;
            var eventemitter3_1 = require("eventemitter3");
            var logger_1 = __importDefault(require("./logger"));
            var EncodingQueue1 = /** @class */ function(_super) {
                __extends(EncodingQueue, _super);
                function EncodingQueue() {
                    var _this = _super.call(this) || this;
                    _this.fileReader = new FileReader();
                    _this._queue = [];
                    _this._processing = false;
                    _this.fileReader.onload = function(evt) {
                        _this._processing = false;
                        if (evt.target) _this.emit('done', evt.target.result);
                        _this.doNextTask();
                    };
                    _this.fileReader.onerror = function(evt) {
                        logger_1.default.error("EncodingQueue error:", evt);
                        _this._processing = false;
                        _this.destroy();
                        _this.emit('error', evt);
                    };
                    return _this;
                }
                Object.defineProperty(EncodingQueue.prototype, "queue", {
                    get: function get() {
                        return this._queue;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(EncodingQueue.prototype, "size", {
                    get: function get() {
                        return this.queue.length;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(EncodingQueue.prototype, "processing", {
                    get: function get() {
                        return this._processing;
                    },
                    enumerable: false,
                    configurable: true
                });
                EncodingQueue.prototype.enque = function(blob) {
                    this.queue.push(blob);
                    if (this.processing) return;
                    this.doNextTask();
                };
                EncodingQueue.prototype.destroy = function() {
                    this.fileReader.abort();
                    this._queue = [];
                };
                EncodingQueue.prototype.doNextTask = function() {
                    if (this.size === 0) return;
                    if (this.processing) return;
                    this._processing = true;
                    this.fileReader.readAsArrayBuffer(this.queue.shift());
                };
                return EncodingQueue;
            }(eventemitter3_1.EventEmitter);
            exports.EncodingQueue = EncodingQueue1;
        },
        {
            "eventemitter3": "JJlS",
            "./logger": "WOs9"
        }
    ],
    "GBTQ": [
        function(require, module, exports) {
            "use strict";
            var __extends = this && this.__extends || function() {
                var _extendStatics = function extendStatics(d5, b5) {
                    _extendStatics = Object.setPrototypeOf || ({
                        __proto__: []
                    }) instanceof Array && function(d, b) {
                        d.__proto__ = b;
                    } || function(d, b) {
                        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                    };
                    return _extendStatics(d5, b5);
                };
                return function(d, b) {
                    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                    _extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var __values = this && this.__values || function(o) {
                var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
                if (m) return m.call(o);
                if (o && typeof o.length === "number") return {
                    next: function next() {
                        if (o && i >= o.length) o = void 0;
                        return {
                            value: o && o[i++],
                            done: !o
                        };
                    }
                };
                throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
            };
            var __importDefault = this && this.__importDefault || function(mod) {
                return mod && mod.__esModule ? mod : {
                    "default": mod
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.DataConnection = void 0;
            var util_1 = require("./util");
            var logger_1 = __importDefault(require("./logger"));
            var negotiator_1 = require("./negotiator");
            var enums_1 = require("./enums");
            var baseconnection_1 = require("./baseconnection");
            var encodingQueue_1 = require("./encodingQueue");
            /**
 * Wraps a DataChannel between two Peers.
 */ var DataConnection1 = /** @class */ function(_super) {
                __extends(DataConnection, _super);
                function DataConnection(peerId, provider, options) {
                    var _this = _super.call(this, peerId, provider, options) || this;
                    _this.stringify = JSON.stringify;
                    _this.parse = JSON.parse;
                    _this._buffer = [];
                    _this._bufferSize = 0;
                    _this._buffering = false;
                    _this._chunkedData = {};
                    _this._encodingQueue = new encodingQueue_1.EncodingQueue();
                    _this.connectionId = _this.options.connectionId || DataConnection.ID_PREFIX + util_1.util.randomToken();
                    _this.label = _this.options.label || _this.connectionId;
                    _this.serialization = _this.options.serialization || enums_1.SerializationType.Binary;
                    _this.reliable = !!_this.options.reliable;
                    _this._encodingQueue.on('done', function(ab) {
                        _this._bufferedSend(ab);
                    });
                    _this._encodingQueue.on('error', function() {
                        logger_1.default.error("DC#" + _this.connectionId + ": Error occured in encoding from blob to arraybuffer, close DC");
                        _this.close();
                    });
                    _this._negotiator = new negotiator_1.Negotiator(_this);
                    _this._negotiator.startConnection(_this.options._payload || {
                        originator: true
                    });
                    return _this;
                }
                Object.defineProperty(DataConnection.prototype, "type", {
                    get: function get() {
                        return enums_1.ConnectionType.Data;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(DataConnection.prototype, "dataChannel", {
                    get: function get() {
                        return this._dc;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(DataConnection.prototype, "bufferSize", {
                    get: function get() {
                        return this._bufferSize;
                    },
                    enumerable: false,
                    configurable: true
                });
                /** Called by the Negotiator when the DataChannel is ready. */ DataConnection.prototype.initialize = function(dc) {
                    this._dc = dc;
                    this._configureDataChannel();
                };
                DataConnection.prototype._configureDataChannel = function() {
                    var _this = this;
                    if (!util_1.util.supports.binaryBlob || util_1.util.supports.reliable) this.dataChannel.binaryType = "arraybuffer";
                    this.dataChannel.onopen = function() {
                        logger_1.default.log("DC#" + _this.connectionId + " dc connection success");
                        _this._open = true;
                        _this.emit(enums_1.ConnectionEventType.Open);
                    };
                    this.dataChannel.onmessage = function(e) {
                        logger_1.default.log("DC#" + _this.connectionId + " dc onmessage:", e.data);
                        _this._handleDataMessage(e);
                    };
                    this.dataChannel.onclose = function() {
                        logger_1.default.log("DC#" + _this.connectionId + " dc closed for:", _this.peer);
                        _this.close();
                    };
                }; // Handles a DataChannel message.
                DataConnection.prototype._handleDataMessage = function(_a) {
                    var _this = this;
                    var data = _a.data;
                    var datatype = data.constructor;
                    var isBinarySerialization = this.serialization === enums_1.SerializationType.Binary || this.serialization === enums_1.SerializationType.BinaryUTF8;
                    var deserializedData = data;
                    if (isBinarySerialization) {
                        if (datatype === Blob) {
                            // Datatype should never be blob
                            util_1.util.blobToArrayBuffer(data, function(ab) {
                                var unpackedData = util_1.util.unpack(ab);
                                _this.emit(enums_1.ConnectionEventType.Data, unpackedData);
                            });
                            return;
                        } else if (datatype === ArrayBuffer) deserializedData = util_1.util.unpack(data);
                        else if (datatype === String) {
                            // String fallback for binary data for browsers that don't support binary yet
                            var ab1 = util_1.util.binaryStringToArrayBuffer(data);
                            deserializedData = util_1.util.unpack(ab1);
                        }
                    } else if (this.serialization === enums_1.SerializationType.JSON) deserializedData = this.parse(data);
                     // Check if we've chunked--if so, piece things back together.
                    // We're guaranteed that this isn't 0.
                    if (deserializedData.__peerData) {
                        this._handleChunk(deserializedData);
                        return;
                    }
                    _super.prototype.emit.call(this, enums_1.ConnectionEventType.Data, deserializedData);
                };
                DataConnection.prototype._handleChunk = function(data) {
                    var id = data.__peerData;
                    var chunkInfo = this._chunkedData[id] || {
                        data: [],
                        count: 0,
                        total: data.total
                    };
                    chunkInfo.data[data.n] = data.data;
                    chunkInfo.count++;
                    this._chunkedData[id] = chunkInfo;
                    if (chunkInfo.total === chunkInfo.count) {
                        // Clean up before making the recursive call to `_handleDataMessage`.
                        delete this._chunkedData[id]; // We've received all the chunks--time to construct the complete data.
                        var data_1 = new Blob(chunkInfo.data);
                        this._handleDataMessage({
                            data: data_1
                        });
                    }
                };
                /**
   * Exposed functionality for users.
   */ /** Allows user to close connection. */ DataConnection.prototype.close = function() {
                    this._buffer = [];
                    this._bufferSize = 0;
                    this._chunkedData = {};
                    if (this._negotiator) {
                        this._negotiator.cleanup();
                        this._negotiator = null;
                    }
                    if (this.provider) {
                        this.provider._removeConnection(this);
                        this.provider = null;
                    }
                    if (this.dataChannel) {
                        this.dataChannel.onopen = null;
                        this.dataChannel.onmessage = null;
                        this.dataChannel.onclose = null;
                        this._dc = null;
                    }
                    if (this._encodingQueue) {
                        this._encodingQueue.destroy();
                        this._encodingQueue.removeAllListeners();
                        this._encodingQueue = null;
                    }
                    if (!this.open) return;
                    this._open = false;
                    _super.prototype.emit.call(this, enums_1.ConnectionEventType.Close);
                };
                /** Allows user to send data. */ DataConnection.prototype.send = function(data, chunked) {
                    if (!this.open) {
                        _super.prototype.emit.call(this, enums_1.ConnectionEventType.Error, new Error("Connection is not open. You should listen for the `open` event before sending messages."));
                        return;
                    }
                    if (this.serialization === enums_1.SerializationType.JSON) this._bufferedSend(this.stringify(data));
                    else if (this.serialization === enums_1.SerializationType.Binary || this.serialization === enums_1.SerializationType.BinaryUTF8) {
                        var blob = util_1.util.pack(data);
                        if (!chunked && blob.size > util_1.util.chunkedMTU) {
                            this._sendChunks(blob);
                            return;
                        }
                        if (!util_1.util.supports.binaryBlob) // We only do this if we really need to (e.g. blobs are not supported),
                        // because this conversion is costly.
                        this._encodingQueue.enque(blob);
                        else this._bufferedSend(blob);
                    } else this._bufferedSend(data);
                };
                DataConnection.prototype._bufferedSend = function(msg) {
                    if (this._buffering || !this._trySend(msg)) {
                        this._buffer.push(msg);
                        this._bufferSize = this._buffer.length;
                    }
                }; // Returns true if the send succeeds.
                DataConnection.prototype._trySend = function(msg) {
                    var _this = this;
                    if (!this.open) return false;
                    if (this.dataChannel.bufferedAmount > DataConnection.MAX_BUFFERED_AMOUNT) {
                        this._buffering = true;
                        setTimeout(function() {
                            _this._buffering = false;
                            _this._tryBuffer();
                        }, 50);
                        return false;
                    }
                    try {
                        this.dataChannel.send(msg);
                    } catch (e) {
                        logger_1.default.error("DC#:" + this.connectionId + " Error when sending:", e);
                        this._buffering = true;
                        this.close();
                        return false;
                    }
                    return true;
                }; // Try to send the first message in the buffer.
                DataConnection.prototype._tryBuffer = function() {
                    if (!this.open) return;
                    if (this._buffer.length === 0) return;
                    var msg = this._buffer[0];
                    if (this._trySend(msg)) {
                        this._buffer.shift();
                        this._bufferSize = this._buffer.length;
                        this._tryBuffer();
                    }
                };
                DataConnection.prototype._sendChunks = function(blob) {
                    var e_1, _a;
                    var blobs = util_1.util.chunk(blob);
                    logger_1.default.log("DC#" + this.connectionId + " Try to send " + blobs.length + " chunks...");
                    try {
                        for(var blobs_1 = __values(blobs), blobs_1_1 = blobs_1.next(); !blobs_1_1.done; blobs_1_1 = blobs_1.next()){
                            var blob_1 = blobs_1_1.value;
                            this.send(blob_1, true);
                        }
                    } catch (e_1_1) {
                        e_1 = {
                            error: e_1_1
                        };
                    } finally{
                        try {
                            if (blobs_1_1 && !blobs_1_1.done && (_a = blobs_1.return)) _a.call(blobs_1);
                        } finally{
                            if (e_1) throw e_1.error;
                        }
                    }
                };
                DataConnection.prototype.handleMessage = function(message) {
                    var payload = message.payload;
                    switch(message.type){
                        case enums_1.ServerMessageType.Answer:
                            this._negotiator.handleSDP(message.type, payload.sdp);
                            break;
                        case enums_1.ServerMessageType.Candidate:
                            this._negotiator.handleCandidate(payload.candidate);
                            break;
                        default:
                            logger_1.default.warn("Unrecognized message type:", message.type, "from peer:", this.peer);
                            break;
                    }
                };
                DataConnection.ID_PREFIX = "dc_";
                DataConnection.MAX_BUFFERED_AMOUNT = 8388608;
                return DataConnection;
            }(baseconnection_1.BaseConnection);
            exports.DataConnection = DataConnection1;
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
            var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                    return value instanceof P ? value : new P(function(resolve) {
                        resolve(value);
                    });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator["throw"](value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            var __generator = this && this.__generator || function(thisArg, body) {
                var _ = {
                    label: 0,
                    sent: function sent() {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    },
                    trys: [],
                    ops: []
                }, f, y, t, g;
                return g = {
                    next: verb(0),
                    "throw": verb(1),
                    "return": verb(2)
                }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
                    return this;
                }), g;
                function verb(n) {
                    return function(v) {
                        return step([
                            n,
                            v
                        ]);
                    };
                }
                function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while(_){
                        try {
                            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                            if (y = 0, t) op = [
                                op[0] & 2,
                                t.value
                            ];
                            switch(op[0]){
                                case 0:
                                case 1:
                                    t = op;
                                    break;
                                case 4:
                                    _.label++;
                                    return {
                                        value: op[1],
                                        done: false
                                    };
                                case 5:
                                    _.label++;
                                    y = op[1];
                                    op = [
                                        0
                                    ];
                                    continue;
                                case 7:
                                    op = _.ops.pop();
                                    _.trys.pop();
                                    continue;
                                default:
                                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                        _ = 0;
                                        continue;
                                    }
                                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                                        _.label = op[1];
                                        break;
                                    }
                                    if (op[0] === 6 && _.label < t[1]) {
                                        _.label = t[1];
                                        t = op;
                                        break;
                                    }
                                    if (t && _.label < t[2]) {
                                        _.label = t[2];
                                        _.ops.push(op);
                                        break;
                                    }
                                    if (t[2]) _.ops.pop();
                                    _.trys.pop();
                                    continue;
                            }
                            op = body.call(thisArg, _);
                        } catch (e) {
                            op = [
                                6,
                                e
                            ];
                            y = 0;
                        } finally{
                            f = t = 0;
                        }
                    }
                    if (op[0] & 5) throw op[1];
                    return {
                        value: op[0] ? op[1] : void 0,
                        done: true
                    };
                }
            };
            var __importDefault = this && this.__importDefault || function(mod) {
                return mod && mod.__esModule ? mod : {
                    "default": mod
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.API = void 0;
            var util_1 = require("./util");
            var logger_1 = __importDefault(require("./logger"));
            var API1 = /** @class */ function() {
                function API(_options) {
                    this._options = _options;
                }
                API.prototype._buildUrl = function(method) {
                    var protocol = this._options.secure ? "https://" : "http://";
                    var url = protocol + this._options.host + ":" + this._options.port + this._options.path + this._options.key + "/" + method;
                    var queryString = "?ts=" + new Date().getTime() + "" + Math.random();
                    url += queryString;
                    return url;
                };
                /** Get a unique ID from the server via XHR and initialize with it. */ API.prototype.retrieveId = function() {
                    return __awaiter(this, void 0, Promise, function() {
                        var url, response, error_1, pathError;
                        return __generator(this, function(_a) {
                            switch(_a.label){
                                case 0:
                                    url = this._buildUrl("id");
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([
                                        1,
                                        3,
                                        ,
                                        4
                                    ]);
                                    return [
                                        4,
                                        fetch(url)
                                    ];
                                case 2:
                                    response = _a.sent();
                                    if (response.status !== 200) throw new Error("Error. Status:" + response.status);
                                    return [
                                        2,
                                        response.text()
                                    ];
                                case 3:
                                    error_1 = _a.sent();
                                    logger_1.default.error("Error retrieving ID", error_1);
                                    pathError = "";
                                    if (this._options.path === "/" && this._options.host !== util_1.util.CLOUD_HOST) pathError = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer.";
                                    throw new Error("Could not get an ID from the server." + pathError);
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        });
                    });
                };
                /** @deprecated */ API.prototype.listAllPeers = function() {
                    return __awaiter(this, void 0, Promise, function() {
                        var url, response, helpfulError, error_2;
                        return __generator(this, function(_a) {
                            switch(_a.label){
                                case 0:
                                    url = this._buildUrl("peers");
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([
                                        1,
                                        3,
                                        ,
                                        4
                                    ]);
                                    return [
                                        4,
                                        fetch(url)
                                    ];
                                case 2:
                                    response = _a.sent();
                                    if (response.status !== 200) {
                                        if (response.status === 401) {
                                            helpfulError = "";
                                            if (this._options.host === util_1.util.CLOUD_HOST) helpfulError = "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.";
                                            else helpfulError = "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.";
                                            throw new Error("It doesn't look like you have permission to list peers IDs. " + helpfulError);
                                        }
                                        throw new Error("Error. Status:" + response.status);
                                    }
                                    return [
                                        2,
                                        response.json()
                                    ];
                                case 3:
                                    error_2 = _a.sent();
                                    logger_1.default.error("Error retrieving list peers", error_2);
                                    throw new Error("Could not get list peers from the server." + error_2);
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        });
                    });
                };
                return API;
            }();
            exports.API = API1;
        },
        {
            "./util": "BHXf",
            "./logger": "WOs9"
        }
    ],
    "Hxpd": [
        function(require, module, exports) {
            "use strict";
            var __extends = this && this.__extends || function() {
                var _extendStatics = function extendStatics(d6, b6) {
                    _extendStatics = Object.setPrototypeOf || ({
                        __proto__: []
                    }) instanceof Array && function(d, b) {
                        d.__proto__ = b;
                    } || function(d, b) {
                        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                    };
                    return _extendStatics(d6, b6);
                };
                return function(d, b) {
                    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                    _extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var __assign = this && this.__assign || function() {
                __assign = Object.assign || function(t) {
                    for(var s, i = 1, n = arguments.length; i < n; i++){
                        s = arguments[i];
                        for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };
            var __values = this && this.__values || function(o) {
                var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
                if (m) return m.call(o);
                if (o && typeof o.length === "number") return {
                    next: function next() {
                        if (o && i >= o.length) o = void 0;
                        return {
                            value: o && o[i++],
                            done: !o
                        };
                    }
                };
                throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
            };
            var __read = this && this.__read || function(o, n) {
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
            };
            var __importDefault = this && this.__importDefault || function(mod) {
                return mod && mod.__esModule ? mod : {
                    "default": mod
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Peer = void 0;
            var eventemitter3_1 = require("eventemitter3");
            var util_1 = require("./util");
            var logger_1 = __importDefault(require("./logger"));
            var socket_1 = require("./socket");
            var mediaconnection_1 = require("./mediaconnection");
            var dataconnection_1 = require("./dataconnection");
            var enums_1 = require("./enums");
            var api_1 = require("./api");
            var PeerOptions1 = /** @class */ function() {
                function PeerOptions() {}
                return PeerOptions;
            }();
            /**
 * A peer who can initiate connections with other peers.
 */ var Peer1 = /** @class */ function(_super) {
                __extends(Peer, _super);
                function Peer(id1, options) {
                    var _this = _super.call(this) || this;
                    _this._id = null;
                    _this._lastServerId = null; // States.
                    _this._destroyed = false; // Connections have been killed
                    _this._disconnected = false; // Connection to PeerServer killed but P2P connections still active
                    _this._open = false; // Sockets and such are not yet open.
                    _this._connections = new Map(); // All connections for this peer.
                    _this._lostMessages = new Map(); // src => [list of messages]
                    var userId; // Deal with overloading
                    if (id1 && id1.constructor == Object) options = id1;
                    else if (id1) userId = id1.toString();
                     // Configurize options
                    options = __assign({
                        debug: 0,
                        host: util_1.util.CLOUD_HOST,
                        port: util_1.util.CLOUD_PORT,
                        path: "/",
                        key: Peer.DEFAULT_KEY,
                        token: util_1.util.randomToken(),
                        config: util_1.util.defaultConfig
                    }, options);
                    _this._options = options; // Detect relative URL host.
                    if (_this._options.host === "/") _this._options.host = window.location.hostname;
                     // Set path correctly.
                    if (_this._options.path) {
                        if (_this._options.path[0] !== "/") _this._options.path = "/" + _this._options.path;
                        if (_this._options.path[_this._options.path.length - 1] !== "/") _this._options.path += "/";
                    } // Set whether we use SSL to same as current host
                    if (_this._options.secure === undefined && _this._options.host !== util_1.util.CLOUD_HOST) _this._options.secure = util_1.util.isSecure();
                    else if (_this._options.host == util_1.util.CLOUD_HOST) _this._options.secure = true;
                     // Set a custom log function if present
                    if (_this._options.logFunction) logger_1.default.setLogFunction(_this._options.logFunction);
                    logger_1.default.logLevel = _this._options.debug || 0;
                    _this._api = new api_1.API(options);
                    _this._socket = _this._createServerConnection(); // Sanity checks
                    // Ensure WebRTC supported
                    if (!util_1.util.supports.audioVideo && !util_1.util.supports.data) {
                        _this._delayedAbort(enums_1.PeerErrorType.BrowserIncompatible, "The current browser does not support WebRTC");
                        return _this;
                    } // Ensure alphanumeric id
                    if (!!userId && !util_1.util.validateId(userId)) {
                        _this._delayedAbort(enums_1.PeerErrorType.InvalidID, "ID \"" + userId + "\" is invalid");
                        return _this;
                    }
                    if (userId) _this._initialize(userId);
                    else _this._api.retrieveId().then(function(id) {
                        return _this._initialize(id);
                    }).catch(function(error) {
                        return _this._abort(enums_1.PeerErrorType.ServerError, error);
                    });
                    return _this;
                }
                Object.defineProperty(Peer.prototype, "id", {
                    get: function get() {
                        return this._id;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Peer.prototype, "options", {
                    get: function get() {
                        return this._options;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Peer.prototype, "open", {
                    get: function get() {
                        return this._open;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Peer.prototype, "socket", {
                    get: function get() {
                        return this._socket;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Peer.prototype, "connections", {
                    /**
     * @deprecated
     * Return type will change from Object to Map<string,[]>
     */ get: function get() {
                        var e_1, _a;
                        var plainConnections = Object.create(null);
                        try {
                            for(var _b = __values(this._connections), _c = _b.next(); !_c.done; _c = _b.next()){
                                var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
                                plainConnections[k] = v;
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
                        return plainConnections;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Peer.prototype, "destroyed", {
                    get: function get() {
                        return this._destroyed;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Peer.prototype, "disconnected", {
                    get: function get() {
                        return this._disconnected;
                    },
                    enumerable: false,
                    configurable: true
                });
                Peer.prototype._createServerConnection = function() {
                    var _this = this;
                    var socket = new socket_1.Socket(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.pingInterval);
                    socket.on(enums_1.SocketEventType.Message, function(data) {
                        _this._handleMessage(data);
                    });
                    socket.on(enums_1.SocketEventType.Error, function(error) {
                        _this._abort(enums_1.PeerErrorType.SocketError, error);
                    });
                    socket.on(enums_1.SocketEventType.Disconnected, function() {
                        if (_this.disconnected) return;
                        _this.emitError(enums_1.PeerErrorType.Network, "Lost connection to server.");
                        _this.disconnect();
                    });
                    socket.on(enums_1.SocketEventType.Close, function() {
                        if (_this.disconnected) return;
                        _this._abort(enums_1.PeerErrorType.SocketClosed, "Underlying socket is already closed.");
                    });
                    return socket;
                };
                /** Initialize a connection with the server. */ Peer.prototype._initialize = function(id) {
                    this._id = id;
                    this.socket.start(id, this._options.token);
                };
                /** Handles messages from the server. */ Peer.prototype._handleMessage = function(message) {
                    var e_2, _a;
                    var type = message.type;
                    var payload = message.payload;
                    var peerId = message.src;
                    switch(type){
                        case enums_1.ServerMessageType.Open:
                            // The connection to the server is open.
                            this._lastServerId = this.id;
                            this._open = true;
                            this.emit(enums_1.PeerEventType.Open, this.id);
                            break;
                        case enums_1.ServerMessageType.Error:
                            // Server error.
                            this._abort(enums_1.PeerErrorType.ServerError, payload.msg);
                            break;
                        case enums_1.ServerMessageType.IdTaken:
                            // The selected ID is taken.
                            this._abort(enums_1.PeerErrorType.UnavailableID, "ID \"" + this.id + "\" is taken");
                            break;
                        case enums_1.ServerMessageType.InvalidKey:
                            // The given API key cannot be found.
                            this._abort(enums_1.PeerErrorType.InvalidKey, "API KEY \"" + this._options.key + "\" is invalid");
                            break;
                        case enums_1.ServerMessageType.Leave:
                            // Another peer has closed its connection to this peer.
                            logger_1.default.log("Received leave message from " + peerId);
                            this._cleanupPeer(peerId);
                            this._connections.delete(peerId);
                            break;
                        case enums_1.ServerMessageType.Expire:
                            // The offer sent to a peer has expired without response.
                            this.emitError(enums_1.PeerErrorType.PeerUnavailable, "Could not connect to peer " + peerId);
                            break;
                        case enums_1.ServerMessageType.Offer:
                            // we should consider switching this to CALL/CONNECT, but this is the least breaking option.
                            var connectionId = payload.connectionId;
                            var connection = this.getConnection(peerId, connectionId);
                            if (connection) {
                                connection.close();
                                logger_1.default.warn("Offer received for existing Connection ID:" + connectionId);
                            } // Create a new connection.
                            if (payload.type === enums_1.ConnectionType.Media) {
                                connection = new mediaconnection_1.MediaConnection(peerId, this, {
                                    connectionId: connectionId,
                                    _payload: payload,
                                    metadata: payload.metadata
                                });
                                this._addConnection(peerId, connection);
                                this.emit(enums_1.PeerEventType.Call, connection);
                            } else if (payload.type === enums_1.ConnectionType.Data) {
                                connection = new dataconnection_1.DataConnection(peerId, this, {
                                    connectionId: connectionId,
                                    _payload: payload,
                                    metadata: payload.metadata,
                                    label: payload.label,
                                    serialization: payload.serialization,
                                    reliable: payload.reliable
                                });
                                this._addConnection(peerId, connection);
                                this.emit(enums_1.PeerEventType.Connection, connection);
                            } else {
                                logger_1.default.warn("Received malformed connection type:" + payload.type);
                                return;
                            } // Find messages.
                            var messages = this._getMessages(connectionId);
                            try {
                                for(var messages_1 = __values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()){
                                    var message_1 = messages_1_1.value;
                                    connection.handleMessage(message_1);
                                }
                            } catch (e_2_1) {
                                e_2 = {
                                    error: e_2_1
                                };
                            } finally{
                                try {
                                    if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
                                } finally{
                                    if (e_2) throw e_2.error;
                                }
                            }
                            break;
                        default:
                            if (!payload) {
                                logger_1.default.warn("You received a malformed message from " + peerId + " of type " + type);
                                return;
                            }
                            var connectionId = payload.connectionId;
                            var connection = this.getConnection(peerId, connectionId);
                            if (connection && connection.peerConnection) // Pass it on.
                            connection.handleMessage(message);
                            else if (connectionId) // Store for possible later use
                            this._storeMessage(connectionId, message);
                            else logger_1.default.warn("You received an unrecognized message:", message);
                            break;
                    }
                };
                /** Stores messages without a set up connection, to be claimed later. */ Peer.prototype._storeMessage = function(connectionId, message) {
                    if (!this._lostMessages.has(connectionId)) this._lostMessages.set(connectionId, []);
                    this._lostMessages.get(connectionId).push(message);
                };
                /** Retrieve messages from lost message store */ //TODO Change it to private
                Peer.prototype._getMessages = function(connectionId) {
                    var messages = this._lostMessages.get(connectionId);
                    if (messages) {
                        this._lostMessages.delete(connectionId);
                        return messages;
                    }
                    return [];
                };
                /**
   * Returns a DataConnection to the specified peer. See documentation for a
   * complete list of options.
   */ Peer.prototype.connect = function(peer, options) {
                    if (options === void 0) options = {};
                    if (this.disconnected) {
                        logger_1.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available.");
                        this.emitError(enums_1.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
                        return;
                    }
                    var dataConnection = new dataconnection_1.DataConnection(peer, this, options);
                    this._addConnection(peer, dataConnection);
                    return dataConnection;
                };
                /**
   * Returns a MediaConnection to the specified peer. See documentation for a
   * complete list of options.
   */ Peer.prototype.call = function(peer, stream, options) {
                    if (options === void 0) options = {};
                    if (this.disconnected) {
                        logger_1.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect.");
                        this.emitError(enums_1.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
                        return;
                    }
                    if (!stream) {
                        logger_1.default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
                        return;
                    }
                    options._stream = stream;
                    var mediaConnection = new mediaconnection_1.MediaConnection(peer, this, options);
                    this._addConnection(peer, mediaConnection);
                    return mediaConnection;
                };
                /** Add a data/media connection to this peer. */ Peer.prototype._addConnection = function(peerId, connection) {
                    logger_1.default.log("add connection " + connection.type + ":" + connection.connectionId + " to peerId:" + peerId);
                    if (!this._connections.has(peerId)) this._connections.set(peerId, []);
                    this._connections.get(peerId).push(connection);
                }; //TODO should be private
                Peer.prototype._removeConnection = function(connection) {
                    var connections = this._connections.get(connection.peer);
                    if (connections) {
                        var index = connections.indexOf(connection);
                        if (index !== -1) connections.splice(index, 1);
                    } //remove from lost messages
                    this._lostMessages.delete(connection.connectionId);
                };
                /** Retrieve a data/media connection for this peer. */ Peer.prototype.getConnection = function(peerId, connectionId) {
                    var e_3, _a;
                    var connections = this._connections.get(peerId);
                    if (!connections) return null;
                    try {
                        for(var connections_1 = __values(connections), connections_1_1 = connections_1.next(); !connections_1_1.done; connections_1_1 = connections_1.next()){
                            var connection = connections_1_1.value;
                            if (connection.connectionId === connectionId) return connection;
                        }
                    } catch (e_3_1) {
                        e_3 = {
                            error: e_3_1
                        };
                    } finally{
                        try {
                            if (connections_1_1 && !connections_1_1.done && (_a = connections_1.return)) _a.call(connections_1);
                        } finally{
                            if (e_3) throw e_3.error;
                        }
                    }
                    return null;
                };
                Peer.prototype._delayedAbort = function(type, message) {
                    var _this = this;
                    setTimeout(function() {
                        _this._abort(type, message);
                    }, 0);
                };
                /**
   * Emits an error message and destroys the Peer.
   * The Peer is not destroyed if it's in a disconnected state, in which case
   * it retains its disconnected state and its existing connections.
   */ Peer.prototype._abort = function(type, message) {
                    logger_1.default.error("Aborting!");
                    this.emitError(type, message);
                    if (!this._lastServerId) this.destroy();
                    else this.disconnect();
                };
                /** Emits a typed error message. */ Peer.prototype.emitError = function(type, err) {
                    logger_1.default.error("Error:", err);
                    var error;
                    if (typeof err === "string") error = new Error(err);
                    else error = err;
                    error.type = type;
                    this.emit(enums_1.PeerEventType.Error, error);
                };
                /**
   * Destroys the Peer: closes all active connections as well as the connection
   *  to the server.
   * Warning: The peer can no longer create or accept connections after being
   *  destroyed.
   */ Peer.prototype.destroy = function() {
                    if (this.destroyed) return;
                    logger_1.default.log("Destroy peer with ID:" + this.id);
                    this.disconnect();
                    this._cleanup();
                    this._destroyed = true;
                    this.emit(enums_1.PeerEventType.Close);
                };
                /** Disconnects every connection on this peer. */ Peer.prototype._cleanup = function() {
                    var e_4, _a;
                    try {
                        for(var _b = __values(this._connections.keys()), _c = _b.next(); !_c.done; _c = _b.next()){
                            var peerId = _c.value;
                            this._cleanupPeer(peerId);
                            this._connections.delete(peerId);
                        }
                    } catch (e_4_1) {
                        e_4 = {
                            error: e_4_1
                        };
                    } finally{
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        } finally{
                            if (e_4) throw e_4.error;
                        }
                    }
                    this.socket.removeAllListeners();
                };
                /** Closes all connections to this peer. */ Peer.prototype._cleanupPeer = function(peerId) {
                    var e_5, _a;
                    var connections = this._connections.get(peerId);
                    if (!connections) return;
                    try {
                        for(var connections_2 = __values(connections), connections_2_1 = connections_2.next(); !connections_2_1.done; connections_2_1 = connections_2.next()){
                            var connection = connections_2_1.value;
                            connection.close();
                        }
                    } catch (e_5_1) {
                        e_5 = {
                            error: e_5_1
                        };
                    } finally{
                        try {
                            if (connections_2_1 && !connections_2_1.done && (_a = connections_2.return)) _a.call(connections_2);
                        } finally{
                            if (e_5) throw e_5.error;
                        }
                    }
                };
                /**
   * Disconnects the Peer's connection to the PeerServer. Does not close any
   *  active connections.
   * Warning: The peer can no longer create or accept connections after being
   *  disconnected. It also cannot reconnect to the server.
   */ Peer.prototype.disconnect = function() {
                    if (this.disconnected) return;
                    var currentId = this.id;
                    logger_1.default.log("Disconnect peer with ID:" + currentId);
                    this._disconnected = true;
                    this._open = false;
                    this.socket.close();
                    this._lastServerId = currentId;
                    this._id = null;
                    this.emit(enums_1.PeerEventType.Disconnected, currentId);
                };
                /** Attempts to reconnect with the same ID. */ Peer.prototype.reconnect = function() {
                    if (this.disconnected && !this.destroyed) {
                        logger_1.default.log("Attempting reconnection to server with ID " + this._lastServerId);
                        this._disconnected = false;
                        this._initialize(this._lastServerId);
                    } else if (this.destroyed) throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
                    else if (!this.disconnected && !this.open) // Do nothing. We're still connecting the first time.
                    logger_1.default.error("In a hurry? We're still trying to make the initial connection!");
                    else throw new Error("Peer " + this.id + " cannot reconnect because it is not disconnected from the server!");
                };
                /**
   * Get a list of available peer IDs. If you're running your own server, you'll
   * want to set allow_discovery: true in the PeerServer options. If you're using
   * the cloud server, email team@peerjs.com to get the functionality enabled for
   * your key.
   */ Peer.prototype.listAllPeers = function(cb) {
                    var _this = this;
                    if (cb === void 0) cb = function cb(_) {};
                    this._api.listAllPeers().then(function(peers) {
                        return cb(peers);
                    }).catch(function(error) {
                        return _this._abort(enums_1.PeerErrorType.ServerError, error);
                    });
                };
                Peer.DEFAULT_KEY = "peerjs";
                return Peer;
            }(eventemitter3_1.EventEmitter);
            exports.Peer = Peer1;
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
                value: true
            });
            exports.peerjs = void 0;
            var util_1 = require("./util");
            var peer_1 = require("./peer");
            exports.peerjs = {
                Peer: peer_1.Peer,
                util: util_1.util
            };
            exports.default = peer_1.Peer;
            window.peerjs = exports.peerjs;
            /** @deprecated Should use peerjs namespace */ window.Peer = peer_1.Peer;
        },
        {
            "./util": "BHXf",
            "./peer": "Hxpd"
        }
    ]
}, {}, [
    "iTK6"
], null) //# sourceMappingURL=/peerjs.js.map
;

},{}],"jNZ32":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "startRovMediaChannelMachine", ()=>startRovMediaChannelMachine
);
var _xstate = require("xstate");
var _ui = require("./ui");
var _util = require("./util");
const startRovMediaChannelMachine = (globalContext)=>{
    let eventHandlers = {};
    const sendEventToSelf = (event)=>{
        if (runningMachine) runningMachine.send(event);
    };
    // create the machine
    const rovMediaChannelMachine = /** @xstate-layout N4IgpgJg5mDOIC5QCcD2A3AspAlgQwGEALPAO1LABtM8BjInCgOgBcHYAFMMZAVVMY4WOSjgBekAMQAVABIBJAMoB9DgFE1AJWWa1AQQAiATUSgADqlhCcqUqZAAPRAEYA7ADYmAZgCs7gBwADMGuAJxeACw+rgA0IACeiABMSZ7+oa7OSc7+Pl5Jof7uzgC+JXFoWLiEJORUNPSMYKzsXDz8gsKiEhCSBgDyygZKBP0AcmNqBNL2FlbCtvZOCG6evgHBgWGR0XGJCAU+TIFerq4RAXkFRWUVGNgQ+MRkFNR0DMxsOJzcyPICXXEUlmlmsiyQjhcmWOSX8ES8gXC-lcSS2e0QkUCTGczlCsMKKUCERu5RAlQeT1qrwaH2atFsFFoLCkciUqg02gMakU0k0-SMagMIPmNjsEOWzncWPc8IKoWcgSSrn8+XRCC8uSYqMCKqVoS2hXctzJ92qzzqb0azHpdSZUnGQz00j0BFkegmagAMkMRuNJtNBcKwWLQBKpUwZflQvLFcrVQlEPCsbCkqdoj5Qj5iUbSeSzVT6u8mkwbYzmb0Bj7FKMPdMgwsQ5CVuHI3KFUrdWqIq4jl53F55ciU4bjXnHjUXoWrXSGWAmaL-tZuvaxo7na73ZNvf11GN66KlslFUx-LkUe48ciFaEImqUmkMlkcldDaVc6bx+bqUXrbP57ZF0BHoZAUFR1C0IZuV5flAwhOZg0PA5j1PaJUkvTJEVvBMDmhDIihlfxCWzUcP0pSdLVpEs-wbQCRCBXoHXA7QtD5TR93BUMjySE8zzQ2EMJvNUvDcY4pVRM59TCEk7iqT8Cwo4tSznGiATo4DK2Gas-SmGY4NBBtENRbiUPPdDryw-Ysy8JhM1cKMZQiREURI2SyItGlFOohdVOXXoa39aR5AdQLMDUfpeF08x9IPcUuJ41CL348y1QAWmJFyKQndyf2aAB3PBrFIKAADFUGQTQ5y82xJAdAwnRdN0PW3Xd2MbCUiiYPJnHWfwcR8VMIgsxAM1cbFwklHsggiQofAy-NyI85h8sKkqyoqpT-1IGrV10fydKC1cQrCiLWsQnJPC6nq+oGoaEBlbilW7BUszxYlZvfVysu-acmGW4QitK8rKttBsQLZJjIJ5PkBSFPSRQ4ptzs64SrucfrIlu1wTgjAju1SMIZrmuSFpy36Cv+1agY20GNN9WtIpAeCDNilYOsuvxerRm7UtCHMZMyr8p0okhKHLPpBj2us4YQlm0ecE9VjRnxEROeN9nOfwmHOft9VTdwNfe0lSFQCA4HsMc3O+yivh+doBB8+jTpZlL3FTTqIlSPtU16wj-FSlVjkCV35Sxuy-B7InLaF4sbbaP4HZ6J3OIQQI1RyeWziSHxCMCLNup9yOvuj38QcgJOm1T7DslCd2fElCIFUIjxTkLwWFJLstvKXR3peZ5PK-2LPRuEs4LklJIG6id7+fm7Kfr+xhKfWqrGyZmL+6ExEmA9wavFOHVcURVv5MW5oRfLcvlgHjFuzGrG0Y8VMCjfGfibn2lL8QF3b6zT3XY1HIsJUqSk1rzEOod04DTKGUIAA */ _xstate.createMachine({
        id: "rovMediaChannelMachine",
        initial: "rovNotConnected",
        states: {
            rovNotConnected: {
                on: {
                    ROV_CONNECTION_READY: {
                        description: 'this event is sent by the parent when the "rovConnectionMachine" has connected to the ROV',
                        target: "rovConnectionOpen"
                    }
                }
            },
            rovConnectionOpen: {
                always: {
                    actions: "addMediaChannelEventHandlers",
                    target: "awaitingVideoStream"
                }
            },
            awaitingVideoStream: {
                on: {
                    VIDEO_LIVESTREAM_READY: {
                        actions: [
                            "setVideoStream",
                            "showGotVideoStreamNotice",
                            "clearMediaChannelConnectionTimeout"
                        ],
                        target: "videoStreamReady"
                    },
                    DO_DISCONNECT: {
                        actions: [
                            "cleanupEventListeners"
                        ],
                        target: "rovNotConnected"
                    },
                    MEDIA_CHANNEL_TIMEOUT: {
                        actions: "cleanupEventListeners",
                        description: "(timeout)",
                        target: "rovConnectionOpen"
                    }
                }
            },
            videoStreamReady: {
                on: {
                    // ON_VIDEO_DISCONNECTED: {
                    //     actions: "startReconnectCountdown",
                    //     target: "waitingForReconnection",
                    // },
                    DO_DISCONNECT: {
                        actions: [
                            "cleanupEventListeners",
                            "hideLivestreamUi"
                        ],
                        target: "rovNotConnected"
                    }
                }
            }
        }
    }, {
        actions: {
            // "showWaitingForMediaChannelNotice": () => { showLoadingUi("Waiting for ROV livestream...") },
            // "showMediaChannelConnectedNotice": () => { showToastMessage("ROV Media Channel Connected!") },
            "showGotVideoStreamNotice": ()=>{
                _ui.showToastMessage("Got ROV Video Stream!");
                _ui.hideLoadingUi("awaiting-video-call");
                _ui.showLivestreamUi();
                console.info("Got Video Stream!");
            },
            "hideLivestreamUi": ()=>{
                _ui.hideLivestreamUi();
            },
            'cleanupEventListeners': ()=>{
                globalContext.thisPeer.off('call', eventHandlers["callHandler"]);
                if (globalContext.mediaChannel) {
                    globalContext.mediaChannel.off('stream', eventHandlers["videoReadyHandler"]);
                    // globalContext.mediaChannel.off('close', eventHandlers["videoCloseHandler"]);
                    console.info("Closing media channel...");
                    globalContext.mediaChannel.close();
                    globalContext.mediaChannel = null;
                }
            },
            "clearMediaChannelConnectionTimeout": ()=>{
                clearTimeout(globalContext.mediaChannelTimeout);
            // clearInterval(globalContext.datachannelDisconnectCheckIntervalId);
            // clearInterval(globalContext.datachannelReconnectCountdown);
            },
            "setVideoStream": (_, event)=>{
                const rovVideoStream = event.data;
                const videoElem = document.getElementById('video-livestream');
                videoElem.srcObject = rovVideoStream; // video.src = URL.createObjectURL(rovVideoStream);
                videoElem.muted = true;
                videoElem.autoplay = true;
                videoElem.controls = false;
                videoElem.play();
                globalContext.videoStream = rovVideoStream;
                console.info("Got Video Streasm!", rovVideoStream);
            },
            'addMediaChannelEventHandlers': ()=>{
                _ui.showLoadingUi("awaiting-video-call");
                const callHandler = eventHandlers["callHandler"] = _util.generateStateChangeFunction(sendEventToSelf, "MEDIA_CHANNEL_ESTABLISHED", null, (rovMediaConnection)=>{
                    // showToastMessage('Got media call from peer: ' + rovMediaConnection.peer)
                    globalContext.mediaChannel = rovMediaConnection;
                    console.log("Got media call: ", rovMediaConnection);
                    const videoReadyHandler = eventHandlers['videoReadyHandler'] = _util.generateStateChangeFunction(sendEventToSelf, "VIDEO_LIVESTREAM_READY");
                    rovMediaConnection.answer(null);
                    rovMediaConnection.on('stream', (a)=>{
                        console.log("Got stream: ", a);
                        videoReadyHandler(a);
                    });
                });
                globalContext.thisPeer.on('call', callHandler);
                globalContext.mediaChannelTimeout = setTimeout(()=>{
                    sendEventToSelf({
                        type: "MEDIA_CHANNEL_TIMEOUT"
                    });
                }, 16000);
            // // Keep checking if the datachannel goes offline: (every half second (interval 500) check if the datachannel peer connection state is "disconnected")
            // globalContext.datachannelDisconnectCheckIntervalId = setInterval(() => {
            //     const connectionState = rovDataConnection.peerConnection ? globalContext.rovDataConnection.peerConnection.iceConnectionState : "disconnected";
            //     if (connectionState == "disconnected") sendEventToSelf("ON_DATACHANNEL_DISCONNECTED");
            // }, 500);
            }
        }
    });
    const runningMachine = _xstate.interpret(rovMediaChannelMachine, {
        devTools: globalContext.debugXstateMode
    }).start();
    return runningMachine;
} ///--- actions for media connection machine:
 // 'cleanupEventListeners': () => {
 //     return () => { // return a cleanup / stop function
 //         context.thisPeer.off('call', callHandler);
 //         if (context.mediaChannel) {
 //             console.info("Closing media channel...");
 //             context.mediaChannel.close();
 //         }
 // }
 // "setMediaChannel": (_, event) => {
 //     globalContext.mediaChannel = event.data;
 // },
 // "setVideoStream": (_, event) => {
 //     const rovVideoStream = event.data
 //     const videoElem = document.getElementById('video-livestream');
 //     videoElem.srcObject = rovVideoStream;  // video.src = URL.createObjectURL(rovVideoStream);
 //     videoElem.muted = true
 //     videoElem.autoplay = true
 //     videoElem.controls = false
 //     videoElem.play();
 //     globalContext.videoStream = rovVideoStream;
 // },
 // "awaitMediaCall": () => {
 //     return (sendStateChange) => {
 //         showLoadingUi("awaiting-video-call");
 //         const callHandler = generateStateChangeFunction(sendStateChange, "MEDIA_CHANNEL_ESTABLISHED", null, (rovMediaConnection) => {
 //             showToastMessage('Got media call from peer: ' + rovMediaConnection.peer)
 //             rovMediaConnection.answer(null, {
 //                 // sdpTransform: function (sdp) {
 //                 //     console.log('answer sdp: ', sdp);
 //                 //     return sdp;
 //                 // }
 //             });
 //         })
 //         context.thisPeer.on('call', callHandler);
 //         const timeoutId = setTimeout(() => {
 //             sendStateChange({ type: "MEDIA_CHANNEL_TIMEOUT" });
 //         }, 16000);
 //         return () => {
 //             clearTimeout(timeoutId);
 //             context.thisPeer.off('call', callHandler);
 //         }
 //     };
 // },
 // "awaitVideoStream": () => {
 //     return (sendStateChange) => {
 //         console.log("Awaiting video stream from ROV...");
 //         const videoReadyHandler = generateStateChangeFunction(sendStateChange, "VIDEO_STREAM_READY")
 //         context.mediaChannel.on('stream', videoReadyHandler);
 //         const timeoutId = setTimeout(() => {
 //             sendStateChange({ type: "MEDIA_CHANNEL_TIMEOUT" });
 //         }, 16000);
 //         return () => {
 //             clearTimeout(timeoutId);
 //             context.mediaChannel.off('stream', videoReadyHandler);
 //         }
 //     };
 // },
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
;

},{"xstate":"2sk4t","./ui":"efi6n","./util":"doATT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["g9TDx","1SICI"], "1SICI", "parcelRequire8802")

//# sourceMappingURL=index.18dbc454.js.map
