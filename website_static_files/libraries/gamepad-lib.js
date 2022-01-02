// Note: this file was written by me (Kyle), and is not a library found on the web.
// We are not using this lib, but it is helpful.

var DEFAULT_GAMEPAD_HELP_MSG = "Press any button on your controller or onscreen."
var GAME_CONTROLLER_BUTTONS = [
    { btnName: "button_1", btnFunction: "Todo: Lights On/Off" },
    { btnName: "button_2", btnFunction: "Todo: Start/Stop Recording" },
    { btnName: "button_3", btnFunction: "Todo: Take Phtoto" },
    { btnName: "button_4", btnFunction: "Todo: Something" },
    { btnName: "shoulder_btn_front_left", btnFunction: "TODO: Something" },
    { btnName: "shoulder_btn_front_right", btnFunction: "TODO: Something" },
    { btnName: "shoulder_trigger_back_left", btnFunction: "TODO: Open Claw" },
    { btnName: "shoulder_trigger_back_right", btnFunction: "TODO: Close Claw" },
    { btnName: "select", btnFunction: "" },
    { btnName: "start", btnFunction: "" },
    { btnName: "stick_button_left", btnFunction: "Lock Vertical Thruster" },
    { btnName: "stick_button_right", btnFunction: "Lock Horizontal" },
    { btnName: "d_pad_up", btnFunction: "Increase Camera Brightness" },
    { btnName: "d_pad_down", btnFunction: "Decreases Camera Brightness" },
    { btnName: "d_pad_left", btnFunction: "Decrease Bitrate (reduces latency & quality)" },
    { btnName: "d_pad_right", btnFunction: "Increase Bitrate (increases quality & latency)" },
    { btnName: "vendor", btnFunction: "Show this help" },
];


/**
 * Call this function to start watching for a gamepad to connect and get updates when button or axis state changes.
 * @param {Object} interfaceConfig - an object like the following:
 * {
 *  handleGamepadConnected: function (connectionEvent) {} - will get passed the event object returned by the "gamepadconnected" browser event.
 *  handleGamepadDisconnected: function (connectionEvent) {} - will get passed the event object returned by the "gamepaddisconnected" browser event.
 *  handleGamepadStateChange: function (gamepadState,gamepadChangesMask) {} - will get passed:
        gamepadState: the current state of gamepad 0 as returned by navigator.getGamepads(),
        gamepadChangesMask: An object with the following fields:
        {
            axesDidChange: True if any axis changed in the last gamepad update loop,
            changedAxes: [ An array with the same length as gamepadState.axes where the bolean value at a given index represents whether that axis changed in the last gamepad update loop ]
            buttonsDidChange: True if any button value changed in the last gamepad update loop,
            changedButtons: [ An array with the same length as gamepadState.buttons where the bolean value at a given index represents whether that button was pressed, realeased or changed value in the last gamepad update loop ]
        }
 * }
 */
function initilizeGamepadInterface(interfaceConfig) {

    var lastGamepadState = { buttons: [], axes: [] }
    var emulatedGamepadState = { buttons: [], axes: [] } // State of the gamepad as emulated by onscreen buttons
    var gamepadChangesMask = { axesDidChange: false, changedAxes: [], buttonsDidChange: false, changedButtons: [] }

    this.GAME_CONTROLLER_BUTTONS = GAME_CONTROLLER_BUTTONS;

    // setup the gamepad events passed to this function so that they have the same scope as 'this' function
    interfaceConfig.handleGamepadConnected.bind(this);
    interfaceConfig.handleGamepadDisconnected.bind(this);
    interfaceConfig.handleGamepadStateChange.bind(this);

    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    function gamepadStateUpdateLoop() {
        var gpad = navigator.getGamepads()[0];
        if (gpad == undefined) return; // exit if the gamepad has been disconnected

        // find buttons that changed from the last gamepad state to the current.
        var lastButtonState = lastGamepadState.buttons;
        gamepadChangesMask.buttonsDidChange = false;
        gamepadChangesMask.changedButtons = gpad.buttons.map((newButtonValue, btnIndex) => {
            if (lastButtonState[btnIndex] == undefined || lastButtonState[btnIndex].value !== newButtonValue.value) {
                gamepadChangesMask.buttonsDidChange = true;
                return true;
            } else return false;
        });

        var lastAxisState = lastGamepadState.axes;
        gamepadChangesMask.axesDidChange = false;
        gamepadChangesMask.changedAxes = gpad.axes.map((newAxisValue, axisIndex) => {
            if (lastAxisState[axisIndex] == undefined || lastAxisState[axisIndex] !== newAxisValue) {
                gamepadChangesMask.axesDidChange = true;
                return true;
            } else return false;
        });

        // if something changed call the handleGamepadStateChange function given to us in the interfaceConfig parameter of the initilizeGamepadInterface function above.
        if (gamepadChangesMask.axesDidChange || gamepadChangesMask.buttonsDidChange) {
            interfaceConfig.handleGamepadStateChange(gpad, gamepadChangesMask)
            handleGamepadHelpHighlights(gpad.buttons, gamepadChangesMask.changedButtons)
        }

        // Debugging:
        // console.log("Button state (current,didChange):", gpad.buttons.map((b) => b.value), changedButtons.map((b) => Number(b)))
        // console.log("Axies state  (current,didChange):", gpad.axes, changedAxes)

        // update the lastGamepadState so it will be ready to compare to the new gamepad state on the next loop:
        lastGamepadState = { buttons: gpad.buttons, axes: gpad.axes }

        // Request that the browser calls this function again on the next frame after a timeout:
        // This effectively makes the gamepadStateUpdateLoop() function into a loop, but it runs
        // between the browser frames for better performance thanks to requestAnimationFrame().
        setTimeout(() => {
            requestAnimationFrame(gamepadStateUpdateLoop);
        }, 100); // wait roughly this number of miliseconds before running again.
    }

    setupGamepadHelp();
    navigator.getGamepads = navigator.getGamepads || navigator.webkitGamepads || navigator.webkitGetGamepads;
    if (!navigator.getGamepads) {
        alert('This browser does not support gamepads. Please update your browser - Any modern browser should work.');
    } else {
        // gamepad api is supported
        window.addEventListener('gamepadconnected', function (e) {
            // if (navigator.getGamepads().length > 1) return; // if the user for some reason connects more than one gamepad, don't trigger again.
            interfaceConfig.handleGamepadConnected(e)
            requestAnimationFrame(gamepadStateUpdateLoop);
        });
        window.addEventListener('gamepaddisconnected', function (e) {
            if (navigator.getGamepads().length > 0) return; // if the user somehow disconnected only one of several gamepads, don't disable gamepad mode
            lastGamepadState = { buttons: [], axes: [] }
            interfaceConfig.handleGamepadDisconnected(e)
            gamepadHelpToggleButton.style.display = 'none'
        });

    }
    setupOnscreenGamepadEvents()
}

function setupOnscreenGamepadEvents() {
    for (let i = 0; i < GAME_CONTROLLER_BUTTONS.length; i++) {
        var btnDetails = GAME_CONTROLLER_BUTTONS[i]
        var highlightElem = document.getElementById(`${btnDetails.btnName}_highlight`)
        console.log(i, btnDetails, highlightElem)
        if (!highlightElem) continue;
        highlightElem.addEventListener('pointerover', function (event) {
            event.currentTarget.setAttribute("style", "visibility:visible;opacity:0.5;")
        });
        highlightElem.addEventListener('pointerout', function (event) {
            event.currentTarget.setAttribute("style", "visibility:hidden;");
        });
        highlightElem.addEventListener('pointerdown', function (event) {
            event.currentTarget.setAttribute("style", "visibility:visible;opacity:1;");
        });
        highlightElem.addEventListener('pointerup', function (event) {
            event.currentTarget.setAttribute("style", "visibility:visible;opacity:0.5;");
        });
    }
}

// Gamepad help section

var gamepadHelpVisible = false;
function setupGamepadHelp() {
    var gamepadContainer = document.getElementById("gamepad-container")
    var gamepadHelpToggleButton = document.getElementById("gamepad-help-button")
    gamepadHelpToggleButton.onclick = () => {
        if (gamepadHelpVisible == false) {
            gamepadContainer.classList.add("help-open")
            gamepadHelpToggleButton.innerText = "Close Help"
            gamepadHelpText.innerText = 'Press or click any button to see help'
        } else {
            gamepadContainer.classList.remove("help-open")
            gamepadHelpToggleButton.innerText = "Gamepad Help"
        }
        gamepadHelpVisible = !gamepadHelpVisible // toggle it
    }
}


// taken roughly from https://codesandbox.io/s/u4o9w?file=/src/recorder.js
var gamepadHelpText = document.getElementById("gamepad-help-text")
var pressedBtnCount = 0;
// var highlights = [].slice.call(document.querySelectorAll('svg [id$="_highlight"]'));
function handleGamepadHelpHighlights(buttonStates, changedButtons) {
    for (let btnNum = 0; btnNum < buttonStates.length; btnNum++) {
        if (changedButtons[btnNum] == true) {
            var btnDetails = GAME_CONTROLLER_BUTTONS[btnNum]
            var highlightElem = document.getElementById(`${btnDetails.btnName}_highlight`)
            // console.log(btnNum, btnDetails, highlightElem)
            if (buttonStates[btnNum].value > 0.1) {
                if (highlightElem) highlightElem.setAttribute("style", "visibility:visible");
                gamepadHelpText.innerText = btnDetails.btnFunction
                pressedBtnCount++;
            } else {
                if (highlightElem) highlightElem.setAttribute("style", "visibility:hidden")
                pressedBtnCount--;
            }
        }
    }
    // if no single button is pressed, show the defualt help text
    if (pressedBtnCount != 1) {
        gamepadHelpText.innerText = DEFAULT_GAMEPAD_HELP_MSG
    }
}


        // gamepadState.LEFT_STICK_X, gamepadState.LEFT_STICK_Y
        // let axisDebug1 = document.getElementById("axis-debug-1")
        // axisDebug1.style.left = gamepadState.LEFT_STICK_X * 50 + 50
        // axisDebug1.style.bottom = gamepadState.LEFT_STICK_y * 50 + 50
        // let axisDebug2 = document.getElementById("axis-debug-2")
        // axisDebug1.style.left = gamepadState.RIGHT_STICK_X * 50 + 50
        // axisDebug1.style.bottom = gamepadState.RIGHT_STICK_y * 50 + 50