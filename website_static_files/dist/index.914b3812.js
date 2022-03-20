/**
 * Minified by jsDelivr using Terser v5.7.1.
 * Original file: /npm/toastify-js@1.11.1/src/toastify.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */ /*!
 * Toastify js 1.11.1
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */ !function(t, o) {
    "object" == typeof module && module.exports ? module.exports = o() : t.Toastify = o();
}(this, function(t1) {
    var o1 = function(t) {
        return new o1.lib.init(t);
    };
    function i1(t, o) {
        return o.offset[t] ? isNaN(o.offset[t]) ? o.offset[t] : o.offset[t] + "px" : "0px";
    }
    function s1(t, o) {
        return !(!t || "string" != typeof o) && !!(t.className && t.className.trim().split(/\s+/gi).indexOf(o) > -1);
    }
    return o1.defaults = {
        oldestFirst: !0,
        text: "Toastify is awesome!",
        node: void 0,
        duration: 3000,
        selector: void 0,
        callback: function() {
        },
        destination: void 0,
        newWindow: !1,
        close: !1,
        gravity: "toastify-top",
        positionLeft: !1,
        position: "",
        backgroundColor: "",
        avatar: "",
        className: "",
        stopOnFocus: !0,
        onClick: function() {
        },
        offset: {
            x: 0,
            y: 0
        },
        escapeMarkup: !0,
        style: {
            background: ""
        }
    }, o1.lib = o1.prototype = {
        toastify: "1.11.1",
        constructor: o1,
        init: function(t) {
            return t || (t = {
            }), this.options = {
            }, this.toastElement = null, this.options.text = t.text || o1.defaults.text, this.options.node = t.node || o1.defaults.node, this.options.duration = 0 === t.duration ? 0 : t.duration || o1.defaults.duration, this.options.selector = t.selector || o1.defaults.selector, this.options.callback = t.callback || o1.defaults.callback, this.options.destination = t.destination || o1.defaults.destination, this.options.newWindow = t.newWindow || o1.defaults.newWindow, this.options.close = t.close || o1.defaults.close, this.options.gravity = "bottom" === t.gravity ? "toastify-bottom" : o1.defaults.gravity, this.options.positionLeft = t.positionLeft || o1.defaults.positionLeft, this.options.position = t.position || o1.defaults.position, this.options.backgroundColor = t.backgroundColor || o1.defaults.backgroundColor, this.options.avatar = t.avatar || o1.defaults.avatar, this.options.className = t.className || o1.defaults.className, this.options.stopOnFocus = void 0 === t.stopOnFocus ? o1.defaults.stopOnFocus : t.stopOnFocus, this.options.onClick = t.onClick || o1.defaults.onClick, this.options.offset = t.offset || o1.defaults.offset, this.options.escapeMarkup = void 0 !== t.escapeMarkup ? t.escapeMarkup : o1.defaults.escapeMarkup, this.options.style = t.style || o1.defaults.style, this.options.style.background = o1.defaults.backgroundColor || t.backgroundColor, this;
        },
        buildToast: function() {
            if (!this.options) throw "Toastify is not initialized";
            var t2 = document.createElement("div");
            for(var o in t2.className = "toastify on " + this.options.className, this.options.position ? t2.className += " toastify-" + this.options.position : !0 === this.options.positionLeft ? (t2.className += " toastify-left", console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")) : t2.className += " toastify-right", t2.className += " " + this.options.gravity, this.options.backgroundColor && console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.'), this.options.style)t2.style[o] = this.options.style[o];
            if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) t2.appendChild(this.options.node);
            else if (this.options.escapeMarkup ? t2.innerText = this.options.text : t2.innerHTML = this.options.text, "" !== this.options.avatar) {
                var s = document.createElement("img");
                s.src = this.options.avatar, s.className = "toastify-avatar", "left" == this.options.position || !0 === this.options.positionLeft ? t2.appendChild(s) : t2.insertAdjacentElement("afterbegin", s);
            }
            if (!0 === this.options.close) {
                var e = document.createElement("span");
                e.innerHTML = "&#10006;", e.className = "toast-close", e.addEventListener("click", (function(t) {
                    t.stopPropagation(), this.removeElement(this.toastElement), window.clearTimeout(this.toastElement.timeOutValue);
                }).bind(this));
                var n = window.innerWidth > 0 ? window.innerWidth : screen.width;
                ("left" == this.options.position || !0 === this.options.positionLeft) && n > 360 ? t2.insertAdjacentElement("afterbegin", e) : t2.appendChild(e);
            }
            if (this.options.stopOnFocus && this.options.duration > 0) {
                var a = this;
                t2.addEventListener("mouseover", function(o) {
                    window.clearTimeout(t2.timeOutValue);
                }), t2.addEventListener("mouseleave", function() {
                    t2.timeOutValue = window.setTimeout(function() {
                        a.removeElement(t2);
                    }, a.options.duration);
                });
            }
            if (void 0 !== this.options.destination && t2.addEventListener("click", (function(t) {
                t.stopPropagation(), !0 === this.options.newWindow ? window.open(this.options.destination, "_blank") : window.location = this.options.destination;
            }).bind(this)), "function" == typeof this.options.onClick && void 0 === this.options.destination && t2.addEventListener("click", (function(t) {
                t.stopPropagation(), this.options.onClick();
            }).bind(this)), "object" == typeof this.options.offset) {
                var l = i1("x", this.options), r = i1("y", this.options), p = "left" == this.options.position ? l : "-" + l, d = "toastify-top" == this.options.gravity ? r : "-" + r;
                t2.style.transform = "translate(" + p + "," + d + ")";
            }
            return t2;
        },
        showToast: function() {
            var t;
            if (this.toastElement = this.buildToast(), !(t = "string" == typeof this.options.selector ? document.getElementById(this.options.selector) : this.options.selector instanceof HTMLElement || this.options.selector instanceof ShadowRoot ? this.options.selector : document.body)) throw "Root element is not defined";
            var i = o1.defaults.oldestFirst ? t.firstChild : t.lastChild;
            return t.insertBefore(this.toastElement, i), o1.reposition(), this.options.duration > 0 && (this.toastElement.timeOutValue = window.setTimeout((function() {
                this.removeElement(this.toastElement);
            }).bind(this), this.options.duration)), this;
        },
        hideToast: function() {
            this.toastElement.timeOutValue && clearTimeout(this.toastElement.timeOutValue), this.removeElement(this.toastElement);
        },
        removeElement: function(t) {
            t.className = t.className.replace(" on", ""), window.setTimeout((function() {
                this.options.node && this.options.node.parentNode && this.options.node.parentNode.removeChild(this.options.node), t.parentNode && t.parentNode.removeChild(t), this.options.callback.call(t), o1.reposition();
            }).bind(this), 400);
        }
    }, o1.reposition = function() {
        for(var t, o = {
            top: 15,
            bottom: 15
        }, i = {
            top: 15,
            bottom: 15
        }, e = {
            top: 15,
            bottom: 15
        }, n = document.getElementsByClassName("toastify"), a = 0; a < n.length; a++){
            t = !0 === s1(n[a], "toastify-top") ? "toastify-top" : "toastify-bottom";
            var l = n[a].offsetHeight;
            t = t.substr(9, t.length - 1);
            (window.innerWidth > 0 ? window.innerWidth : screen.width) <= 360 ? (n[a].style[t] = e[t] + "px", e[t] += l + 15) : !0 === s1(n[a], "toastify-left") ? (n[a].style[t] = o[t] + "px", o[t] += l + 15) : (n[a].style[t] = i[t] + "px", i[t] += l + 15);
        }
        return this;
    }, o1.lib.init.prototype = o1.lib, o1;
}); //# sourceMappingURL=/sm/2e2424817ac1c034496bed80fd4537eff4f27b3a785831ea2249388a4710c8f7.map

//# sourceMappingURL=index.914b3812.js.map
