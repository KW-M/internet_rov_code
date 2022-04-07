
import { startGamepadEventLoop, getGamepadsStandardized, gamepadApiSupported, onGamepadAxisValueChange, onGamepadButtonValueChange, onGamepadConnect, onGamepadDisconnect } from "./gamepad_mmk"
import { gamepadEmulator } from "./gamepadEmulator"
import { gamepadUi } from "./gamepad-ui"
import { Gamepad } from "./libraries/gamepad";

const gamepadLib = new Gamepad();

export class gamepadController {
    constructor() {
        this.touchedGpadButtonCount = 0
        this.buttonHighlightElements = gamepadUi.getButtonHighlightElements();
        if (!gamepadApiSupported()) gamepadUi.showNotSupported();

        // override the default browser gamepad api with the gamepad emulator before setting up the events,
        // the emulator will either use the real gamepad api if a gamepad is plugged in or it will inject the onscreen gamepad as if it were comming from the gamepad api.
        gamepadEmulator.monkeyPatchGetGamepads();

        // setup maulingmonkey gamepad lib gamepad events and event loop.
        gamepadLib.bind(Gamepad.Event.CONNECTED, (e) => { console.log("onGamepadConnect", e); this.gamepadConnectDisconnectHandler() })
        gamepadLib.bind(Gamepad.Event.DISCONNECTED, (e) => { console.log("onGamepadDisconnect", e); this.gamepadConnectDisconnectHandler() })
        gamepadLib.bind(Gamepad.Event.AXIS_CHANGED, (e) => { if (e) this.handleAxisChange(e) })
        gamepadLib.bind(Gamepad.Event.BUTTON_DOWN, (e) => { if (e) this.handleButtonChange(e, true) })
        gamepadLib.bind(Gamepad.Event.BUTTON_UP, (e) => { if (e) this.handleButtonChange(e, false) })
        // startGamepadEventLoop();
        console.log(gamepadLib)

        // setup onscreen emulated gamepad interaction events
        gamepadEmulator.registerOnScreenGamepadButtonEvents(0, this.buttonHighlightElements.map((elm) => elm.id.startsWith("shoulder_trigger") ? null : elm), "touched", "pressed");
        gamepadEmulator.registerOnScreenGamepadAxisEvents(0, [{
            xAxisGpadAxis: 0,
            yAxisGpadAxis: 1,
            elem: document.getElementById("gamepad-joystick-touch-area-left"),
        }, {
            xAxisGpadAxis: 2,
            yAxisGpadAxis: 3,
            elem: document.getElementById("gamepad-joystick-touch-area-right"),
        }]);
    }
    gamepadConnectDisconnectHandler() {
        const gamepads = getGamepadsStandardized()

        console.log(gamepads)
        var connectedGamepadCount = gamepads.length;
        if (connectedGamepadCount != 0 && gamepads[0].emulated) connectedGamepadCount -= 1;
        gamepadUi.showGamepadStatus(connectedGamepadCount);
    }
    handleButtonChange(e, pressed) {
        console.log(e, pressed)

        const gamepad = getGamepadsStandardized()[0]
        if (!gamepad || !gamepad.buttons) return;

        const buttonStates = gamepad.buttons
        gamepadUi.handleGamepadVisualFeedbackButtonEvents(buttonStates, this.buttonHighlightElements, "touched", "pressed");

        const variableButtonStates = [
            {
                thumbStickElement: document.getElementById("shoulder_trigger_left_back"),
                axisRange: 26,
                yValue: gamepad.buttons[6].value || 0,
            },
            {
                thumbStickElement: document.getElementById("shoulder_trigger_right_back"),
                axisRange: 26,
                yValue: gamepad.buttons[7].value || 0,
            },
        ]
        gamepadUi.handleGamepadVisualFeedbackAxisEvents(variableButtonStates, "axis-hovered", "axis-moved");
        console.log("onGamepadButtonValueChange", buttonStates[e.buttonIndex], this.buttonHighlightElements[e.buttonIndex]);
        if (e.buttonIndex && buttonStates[e.buttonIndex].touched) {
            gamepadUi.showHelpTooltip(this.buttonHighlightElements[e.buttonIndex], e.buttonIndex);
            this.touchedGpadButtonCount += 1;
        } else {
            this.touchedGpadButtonCount -= 1;
        }
        if (this.touchedGpadButtonCount == 0) {
            gamepadUi.showHelpTooltip(null);
        }

    }
    handleAxisChange() {

        const gamepad = getGamepadsStandardized()[0]
        if (!gamepad || !gamepad.axes) return;

        // console.log("onGamepadAxisValueChange", e);

        const axisStates = [{
            thumbStickElement: document.getElementById("stick_left"),
            axisRange: 14,
            xValue: gamepad.axes[0] || 0,
            yValue: gamepad.axes[1] || 0,
        },
        {
            thumbStickElement: document.getElementById("stick_right"),
            axisRange: 14,
            xValue: gamepad.axes[2] || 0,
            yValue: gamepad.axes[3] || 0,
        }]
        gamepadUi.handleGamepadVisualFeedbackAxisEvents(axisStates, "axis-hovered", "axis-moved");
    }
}



// const DEFAULT_GAMEPAD_HELP_MSG = "Press any button on your controller or onscreen."
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
//         gamepadUi.showNotSupported();
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
//                 gamepadUi.showNoGamepads();
//                 lastGamepadCount = 0;
//                 lastGamepadId = "";
//                 return;
//             } else if (gamepadCount >= 1) {
//                 if (joyMod) gpadMap.removeModule(joyMod);
//                 console.log(joyMod)
//                 joyMod = joymap.createQueryModule({ threshold: 0.2, clampThreshold: true });
//                 gpadMap.addModule(joyMod);
//                 console.log(joyMod)

//                 gamepadUi.showGamepadsConnected(gamepads);
//                 console.log(joyMod.getAllButtons(), joyMod.getAllSticks(), joyMod.getAllMappers())
//             }
//             lastGamepadCount = gamepadCount;
//             lastGamepadId = gamepads[0].id;
//         }


//         gamepadUpdatedCallback(joyMod.getAllButtons(), joyMod.getAllSticks(), joyMod.getAllMappers())
//     }
// }
// }