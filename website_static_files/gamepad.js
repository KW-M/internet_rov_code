/**
 * Copyright 2012 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author mwichary@google.com (Marcin Wichary)
 * Modified by Christopher R.
 */

var gamepadSupport = {
    // A number of typical buttons recognized by Gamepad API and mapped to
    // standard controls. Any extraneous buttons will have larger indexes.
    TYPICAL_BUTTON_COUNT: 18,

    // A number of typical axes recognized by Gamepad API and mapped to
    // standard controls. Any extraneous buttons will have larger indexes.
    TYPICAL_AXIS_COUNT: 4,

    // Whether we're requestAnimationFrameing like it's 1999.
    ticking: false,

    // The canonical list of attached gamepads, without 'holes' (always
    // starting at [0]) and unified between Firefox and Chrome.
    gamepads: [],

    // Remembers the connected gamepads at the last check; used in Chrome
    // to figure out when gamepads get connected or disconnected, since no
    // events are fired.
    prevRawGamepadTypes: [],

    // Previous timestamps for gamepad state; used in Chrome to not bother with
    // analyzing the polled data if nothing changed (timestamp is the same
    // as last time).
    prevTimestamps: [],

    // reference to the gamepad UI object
    // gets set in the init function from the passed variable
    gamepadUi: null,

    /**
     * Initialize support for Gamepad API.
     */
    init: function (gamepadUi) {
        this.gamepadUi = gamepadUi;

        // As of 2012, it seems impossible to detect Gamepad API support
        // in Firefox, hence we need to hardcode it in gamepadSupportAvailable.
        // (The preceding two clauses are for Chrome.)
        navigator.getGamepads = navigator.getGamepads || navigator.webkitGamepads || navigator.webkitGetGamepads;
        var gamepadSupportAvailable = navigator.getGamepads || (navigator.userAgent.indexOf('Firefox/') != -1);

        if (!gamepadSupportAvailable) {
            // It doesn't seem Gamepad API is available ' show a message telling
            // the visitor about it.
            this.gamepadUi.showNotSupported();
        } else {
            // Firefox supports the connect/disconnect event, so we attach event
            // handlers to those.
            window.addEventListener('gamepadconnected',
                this.onGamepadConnect, false);
            window.addEventListener('gamepaddisconnected',
                this.onGamepadDisconnect, false);

            // Since Chrome only supports polling, we initiate polling loop straight
            // away. For Firefox, we will only do it if we get a connect event.
            if (!!navigator.getGamepads || !!navigator.webkitGamepads || !!navigator.webkitGetGamepads) {
                this.startPolling();
            }
        }
    },

    /**
     * React to a new gamepad being connected.
     */
    onGamepadConnect: function (event) {
        // Add the new gamepad on the list of gamepads to look after.
        this.gamepads.push(event.gamepad);

        // Ask the this.gamepadUi to update the screen to show more gamepads.
        this.gamepadUi.updateGamepads(this.gamepads);

        // Start the polling loop to monitor button changes.
        this.startPolling();
    },

    /**
     * React to a gamepad being unplugged.
     */
    onGamepadDisconnect: function (event) {
        // Remove the gamepad from the list of gamepads to monitor.
        for (var i in this.gamepads) {
            if (this.gamepads[i].index == event.gamepad.index) {
                this.gamepads.splice(i, 1);
                break;
            }
        }

        // If no gamepads are left, stop the polling loop.
        if (this.gamepads.length == 0) {
            this.stopPolling();
        }

        // Ask the this.gamepadUi to update the screen to remove the gamepad.
        this.gamepadUi.updateGamepads(this.gamepads);
    },

    /**
     * Starts a polling loop to check for gamepad state.
     */
    startPolling: function () {
        // Don't accidentally start a second loop, man.
        if (!this.ticking) {
            this.ticking = true;
            this.tick();
        }
    },

    /**
     * Stops a polling loop by setting a flag which will prevent the next
     * requestAnimationFrame() from being scheduled.
     */
    stopPolling: function () {
        this.ticking = false;
    },

    /**
     * A function called with each requestAnimationFrame(). Polls the gamepad
     * status and schedules another poll.
     */
    tick: function () {
        this.pollStatus();
        this.scheduleNextTick();
    },

    scheduleNextTick: function () {
        // Only schedule the next frame if we haven't decided to stop via
        // stopPolling() before.
        if (this.ticking) {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(this.tick);
            } else if (window.mozRequestAnimationFrame) {
                window.mozRequestAnimationFrame(this.tick);
            } else if (window.webkitRequestAnimationFrame) {
                window.webkitRequestAnimationFrame(this.tick);
            }
            // Note lack of setTimeout since all the browsers that support
            // Gamepad API are already supporting requestAnimationFrame().
        }
    },

    /**
     * Checks for the gamepad status. Monitors the necessary data and notices
     * the differences from previous state (buttons for Chrome/Firefox). If differences are noticed, asks
     * to update the display accordingly. Should run as close to 60 frames per
     * second as possible.
     */
    pollStatus: function () {
        // Poll to see if gamepads are connected or disconnected. Necessary
        // only on Chrome.
        this.pollGamepads();

        for (var i in this.gamepads) {
            var gamepad = this.gamepads[i];

            // Don't do anything if the current timestamp is the same as previous
            // one, which means that the state of the gamepad hasn't changed.
            // This is only supported by Chrome right now, so the first check
            // makes sure we're not doing anything if the timestamps are empty
            // or undefined.
            if (gamepad.timestamp &&
                (gamepad.timestamp == this.prevTimestamps[i])) {
                continue;
            }
            this.prevTimestamps[i] = gamepad.timestamp;
            this.updateDisplay(i);
        }
    },

    // This function is called only on Chrome, which does not yet support
    // connection/disconnection events, but requires you to monitor
    // an array for changes.
    pollGamepads: function () {

        // Get the array of gamepads ' the first method (function call)
        // is the most modern one, the second is there for compatibility with
        // slightly older versions of Chrome, but it shouldn't be necessary
        // for long.
        var rawGamepads =
            (navigator.getGamepads && navigator.getGamepads()) ||
            (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) ||
            navigator.webkitGamepads;

        if (rawGamepads) {
            // We don't want to use rawGamepads coming straight from the browser,
            // since it can have 'holes' (e.g. if you plug two gamepads, and then
            // unplug the first one, the remaining one will be at index [1]).
            this.gamepads = [];
            this.gamepadsRaw = [];

            //var rawFixedGamepads = {};
            //for(var i = 0, ii = 0; i <= rawGamepads.length; i++){
            //    if (typeof rawGamepads[i] == "object" && rawGamepads[i].id.indexOf("(Vendor: b58e Product: 9e84)") !== -1) continue;
            //    rawFixedGamepads[ii] = rawGamepads[i];
            //    rawFixedGamepads.length = i;
            //    ii++;
            //}
            //console.log(rawFixedGamepads);
            //rawGamepads = rawFixedGamepads;


            // We only refresh the display when we detect some gamepads are new
            // or removed; we do it by comparing raw gamepad table entries to
            // 'undefined.'
            var gamepadsChanged = false;

            for (var i = 0; i < rawGamepads.length; i++) {
                if (typeof rawGamepads[i] != this.prevRawGamepadTypes[i]) {
                    gamepadsChanged = true;
                    this.prevRawGamepadTypes[i] = typeof rawGamepads[i];
                }
                //console.log(rawGamepads[i].id);
                //if (rawGamepads[i] == undefined || rawGamepads[i].id.indexOf("(Vendor: b58e Product: 9e84)") !== -1) continue;
                if (rawGamepads[i] && controllerRebinds != "" && typeof controllerRebinds.mapping != 'undefined' && controllerRebinds.mapping.length > 0) {
                    var remapObj = $.extend(true, {}, rawGamepads[i]);
                    for (var b = 0; b < remapObj.buttons.length; b++) {
                        remapObj.buttons[b] = $.extend({}, rawGamepads[i].buttons[b]);
                    }
                    for (var m = 0; m < controllerRebinds.mapping.length; m++) {
                        var bindmap = controllerRebinds.mapping[m];
                        var noMap = bindmap.disabled;
                        var tType = bindmap.targetType;
                        var tMap = bindmap.target;
                        if (tType == "buttons" && typeof remapObj[tType][tMap] == "undefined") {
                            remapObj[tType][tMap] = {};
                        }

                        function stickToButton(stickObj) {
                            //contrary to the function's name, it turns buttons into buttons too
                            if (stickObj.choiceType == "buttons") {
                                return rawGamepads[i].buttons[stickObj.choice].value;
                            } else {
                                var axisVal = rawGamepads[i].axes[stickObj.choice];
                                switch (stickObj.choiceOperand) {
                                    case "+":
                                        return (axisVal > 0) ? axisVal : 0;
                                        break;
                                    case "-":
                                        return (axisVal < 0) ? Math.abs(axisVal) : 0;
                                        break;
                                    default:
                                        return 0;
                                }
                            }
                        }

                        function makeAxis(positiveAxis, negativeAxis) {
                            return positiveAxis - negativeAxis;
                        }

                        /***
                         * This should function as a somewhat wrapper function to allow an easier way of producing
                         * values on remapping. Should the bindmap have no data for axis configuration, the mapping is
                         * then sent off to the stickToButton function which then produces the appropriate values.
                         *
                         * This tends to get slightly trickier when I have to actually account for when an axis is
                         * broken as I first have to manipulate the raw data, then return proper values, either as a
                         * button or an axis.
                         * */
                        function bindWrapper(stickObj) {
                            if (tType == "dpad") {
                                dpadPOV(stickObj);
                                return;
                            }
                            if (typeof stickObj.axesConfig == "undefined") {
                                setMapping(stickObj, {});
                                return;
                            }
                            fixAxes(stickObj);
                        }

                        function choiceValue(mapObj) {
                            var value;
                            switch (mapObj.choiceType) {
                                case "":
                                    return choiceValue(mapObj.positive);
                                    break;
                                case "axes":
                                    value = rawGamepads[i].axes[mapObj.choice];
                                    break;
                                case "buttons":
                                    value = rawGamepads[i].buttons[mapObj.choice].value;
                                    break;
                                default:
                                    value = 0;
                            }
                            return value;
                        }

                        //To fix axes, we assume all fixes are trigger type and use that to create a stick when needed
                        function fixAxes(stickObj) {
                            var startValue = +stickObj.axesConfig.lowValue;
                            var endValue = +stickObj.axesConfig.highValue;

                            var isFlipped = (endValue < startValue);

                            if (isFlipped) {
                                var temp = startValue;
                                startValue = endValue;
                                endValue = temp;
                            }

                            var zeroOffset = startValue * -1;
                            var axisVal = choiceValue(stickObj);

                            //By adding the offset to the current value and end value, we can normalize the input
                            var newValue = (axisVal + zeroOffset) / (endValue + zeroOffset);

                            //In the event the start and end are swapped, we account for it but subtracting the value from 1
                            newValue = (isFlipped) ? (1 - newValue) : newValue;

                            switch (stickObj.axesConfig.type) {
                                case "trigger":
                                    break;
                                case "stick":
                                    newValue = (-1 + (newValue * 2));
                                    break;
                                default:
                                    setMapping(stickObj, {});
                                    return;
                            }
                            setMapping(stickObj, newValue);
                        }

                        function dpadPOV(stickObj) {
                            var up, down, left, right, upright, downright, downleft, upleft, value;
                            setMapping({ targetType: "buttons", target: 12 }, 0);
                            setMapping({ targetType: "buttons", target: 13 }, 0);
                            setMapping({ targetType: "buttons", target: 14 }, 0);
                            setMapping({ targetType: "buttons", target: 15 }, 0);
                            if (stickObj.disabled) return;
                            up = stickObj.positions.up;
                            down = stickObj.positions.down;
                            left = stickObj.positions.left;
                            right = stickObj.positions.right;
                            upright = stickObj.positions.upright;
                            downright = stickObj.positions.downright;
                            downleft = stickObj.positions.downleft;
                            upleft = stickObj.positions.upleft;
                            value = choiceValue(stickObj);

                            function isWithinRange(val, target) {
                                if (val >= target - 0.001 && val <= target + 0.001)
                                    return true
                                else
                                    return false

                            }

                            if (isWithinRange(value, up)) {
                                setMapping({ targetType: "buttons", target: 12 }, 1);
                            } else if (isWithinRange(value, down)) {
                                setMapping({ targetType: "buttons", target: 13 }, 1);
                            } else if (isWithinRange(value, left)) {
                                setMapping({ targetType: "buttons", target: 14 }, 1);
                            } else if (isWithinRange(value, right)) {
                                setMapping({ targetType: "buttons", target: 15 }, 1);
                            } else if (isWithinRange(value, upright)) {
                                setMapping({ targetType: "buttons", target: 12 }, 1);
                                setMapping({ targetType: "buttons", target: 15 }, 1);
                            } else if (isWithinRange(value, downright)) {
                                setMapping({ targetType: "buttons", target: 15 }, 1);
                                setMapping({ targetType: "buttons", target: 13 }, 1);
                            } else if (isWithinRange(value, downleft)) {
                                setMapping({ targetType: "buttons", target: 13 }, 1);
                                setMapping({ targetType: "buttons", target: 14 }, 1);
                            } else if (isWithinRange(value, upleft)) {
                                setMapping({ targetType: "buttons", target: 14 }, 1);
                                setMapping({ targetType: "buttons", target: 12 }, 1);
                            }
                        }

                        /***
                         * This is to easily set the remapped item properly, whether it's a stick or axis as per defined
                         * by the bindmap.
                         * */
                        function setMapping(stickObj, setValue) {
                            switch (typeof setValue) {
                                case "number":
                                case "Number":
                                    if (stickObj.targetType == "axes") {
                                        remapObj[stickObj.targetType][stickObj.target] = setValue;
                                    } else {
                                        remapObj[stickObj.targetType][stickObj.target].value = setValue;
                                    }
                                    break;
                                case "object":
                                case "Object":
                                    if (stickObj.targetType == "axes") {
                                        remapObj[stickObj.targetType][stickObj.target] = makeAxis(stickToButton(stickObj.positive), stickToButton(stickObj.negative));
                                    } else {
                                        remapObj[stickObj.targetType][stickObj.target].value = stickToButton(stickObj);
                                    }
                                    break;
                                default:
                            }
                        }

                        try {
                            if (noMap && tType != "dpad") {
                                setMapping(bindmap, 0);
                            } else {
                                bindWrapper(bindmap);
                            }
                        } catch (e) {
                            //console.log("ERROR IN MAPPING: ", e);
                        }
                    }
                    this.gamepads.push(remapObj);
                    this.gamepadsRaw.push(rawGamepads[i]);
                } else if (rawGamepads[i]) {
                    this.gamepads.push(rawGamepads[i]);
                    this.gamepadsRaw.push(rawGamepads[i]);
                }
            }

            // Ask the this.gamepadUi to refresh the visual representations of gamepads
            // on the screen.
            if (gamepadsChanged) {
                this.gamepadUi.updateGamepads(this.gamepads);
            }
        }
    },

    // Call the this.gamepadUi with new state and ask it to update the visual
    // representation of a given gamepad.
    updateDisplay: function (gamepadId) {
        if (pnumber == "") {
            var gamepadRaw = this.gamepadsRaw[gamepadId];
            for (var b in gamepadRaw.buttons) {
                this.gamepadUi.updateRawButton(gamepadRaw.buttons[b], gamepadId, b);
            }
            for (var a in gamepadRaw.axes) {
                this.gamepadUi.updateRawAxis(gamepadRaw.axes[a], gamepadId, a);
            }
        }


        var gamepad = this.gamepads[gamepadId];

        // Update all the buttons (and their corresponding labels) on screen.
        this.gamepadUi.queueButton(gamepad.buttons[0], gamepadId, 'button-1');
        this.gamepadUi.queueButton(gamepad.buttons[1], gamepadId, 'button-2');
        this.gamepadUi.queueButton(gamepad.buttons[2], gamepadId, 'button-3');
        this.gamepadUi.queueButton(gamepad.buttons[3], gamepadId, 'button-4');

        this.gamepadUi.queueButton(gamepad.buttons[4], gamepadId, 'button-left-shoulder-top');
        this.gamepadUi.queueTrigger(gamepad.buttons[6], gamepadId, 'button-left-shoulder-bottom');
        this.gamepadUi.queueTriggerDigital(gamepad.buttons[6], gamepadId, 'button-left-shoulder-bottom-digital');
        this.gamepadUi.queueButton(gamepad.buttons[5], gamepadId, 'button-right-shoulder-top');
        this.gamepadUi.queueTrigger(gamepad.buttons[7], gamepadId, 'button-right-shoulder-bottom');
        this.gamepadUi.queueTriggerDigital(gamepad.buttons[7], gamepadId, 'button-right-shoulder-bottom-digital');

        this.gamepadUi.queueButton(gamepad.buttons[8], gamepadId, 'button-select');
        this.gamepadUi.queueButton(gamepad.buttons[9], gamepadId, 'button-start');

        this.gamepadUi.queueButton(gamepad.buttons[10], gamepadId, 'stick-1');
        this.gamepadUi.queueButton(gamepad.buttons[11], gamepadId, 'stick-2');

        this.gamepadUi.queueButton(gamepad.buttons[12], gamepadId, 'button-dpad-top');
        this.gamepadUi.queueButton(gamepad.buttons[13], gamepadId, 'button-dpad-bottom');
        this.gamepadUi.queueButton(gamepad.buttons[14], gamepadId, 'button-dpad-left');
        this.gamepadUi.queueButton(gamepad.buttons[15], gamepadId, 'button-dpad-right');
        this.gamepadUi.queueButton(gamepad.buttons[16], gamepadId, 'button-meta');
        this.gamepadUi.queueButton(gamepad.buttons[17], gamepadId, 'touch-pad');
        this.gamepadUi.queueStick(gamepad.buttons[12], 'up', gamepadId, 'arcade-stick');
        this.gamepadUi.queueStick(gamepad.buttons[13], 'down', gamepadId, 'arcade-stick');
        this.gamepadUi.queueStick(gamepad.buttons[14], 'left', gamepadId, 'arcade-stick');
        this.gamepadUi.queueStick(gamepad.buttons[15], 'right', gamepadId, 'arcade-stick');

        // Update all the analogue sticks.
        this.gamepadUi.queueAxis(gamepad.axes[0], gamepad.axes[1], gamepadId, 'stick-1');
        this.gamepadUi.queueAxis(gamepad.axes[2], gamepad.axes[3], gamepadId, 'stick-2');

        // Update extraneous buttons.
        var extraButtonId = this.TYPICAL_BUTTON_COUNT;
        while (typeof gamepad.buttons[extraButtonId] != 'undefined') {
            //this.gamepadUi.queueButton(gamepad.buttons[extraButtonId], gamepadId,
            //    'extra-button-' + extraButtonId);

            extraButtonId++;
        }

        // Update extraneous axes.
        var extraAxisId = this.TYPICAL_AXIS_COUNT;
        while (typeof gamepad.axes[extraAxisId] != 'undefined') {
            //this.gamepadUi.queueAxis(gamepad.axes[extraAxisId], gamepadId,
            //    'extra-axis-' + extraAxisId);

            extraAxisId++;
        }

    }
};