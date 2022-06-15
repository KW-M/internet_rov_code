
// import { startGamepadEventLoop, getGamepadsStandardized, gamepadApiSupported, onGamepadAxisValueChange, onGamepadButtonValueChange, onGamepadConnect, onGamepadDisconnect } from "./gamepad_mmk"
import { gamepadEmulator } from "./gamepadEmulator"
import { getButtonHighlightElements, handleGamepadVisualFeedbackAxisEvents, handleGamepadVisualFeedbackButtonEvents, handleGamepadVisualFeedbackVariableTriggerButtonEvents, showGamepadStatus, showHelpTooltip, showNotSupported as showGamepadNotSupported, toggleGamepadHelpScreen } from "./gamepad-ui"
import { GamepadInterface } from "./libraries/gamepadInterface";
import { GAME_CONTROLLER_BUTTON_CONFIG } from "./consts";

export class GamepadController {
    constructor() {
        this.touchedGpadButtonCount = 0
        this.buttonHighlightElements = getButtonHighlightElements();

        // override the default browser gamepad api with the gamepad emulator before setting up the events,
        // the emulator will either use the real gamepad api if a gamepad is plugged in or it will inject the onscreen gamepad as if it were comming from the gamepad api.
        gamepadEmulator.monkeyPatchGetGamepads();

        // initilize the GamepadInterface class with the config from the consts file
        const gamepad = new GamepadInterface(GAME_CONTROLLER_BUTTON_CONFIG);
        if (!gamepad) showGamepadNotSupported();

        // setupgamepad lib gamepad events.
        gamepad.onGamepadConnect = this.gamepadConnectDisconnectHandler.bind(this)
        gamepad.onGamepadDisconnect = this.gamepadConnectDisconnectHandler.bind(this)
        gamepad.onGamepadAxisChange = this.handleAxisChange.bind(this)
        gamepad.onGamepadButtonChange = this.handleButtonChange.bind(this)

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
        // const gamepads = getGamepadsStandardized()
        const gamepads = navigator.getGamepads();
        var connectedGamepadCount = gamepads.reduce((acc, gpad) => gpad ? acc + 1 : acc, 0);
        if (connectedGamepadCount != 0 && gamepads[0].emulated) connectedGamepadCount -= 1;
        showGamepadStatus(connectedGamepadCount);
        if (connectedGamepadCount > 1) console.log("WARNING: More than one gamepad connected!", gamepads);
    }

    setupExternalEventListenerCallbacks(onButtonChange, onAxisChange) {
        this.onButtonChange = onButtonChange;
        this.onAxisChange = onAxisChange;
    }

    clearExternalEventListenerCallbacks() {
        this.onButtonChange = null;
        this.onAxisChange = null;
    }

    handleButtonChange(gpadIndex, gamepad, buttonsChangedMask) {
        if (gpadIndex != 0 || !gamepad || !gamepad.buttons) return;

        if (this.onButtonChange) this.onButtonChange(gamepad, buttonsChangedMask);

        handleGamepadVisualFeedbackButtonEvents(gamepad.buttons);

        if (buttonsChangedMask[6] || buttonsChangedMask[7]) {
            handleGamepadVisualFeedbackVariableTriggerButtonEvents(gamepad.buttons, [
                {
                    buttonIndex: 6,
                    buttonElement: document.getElementById("shoulder_trigger_left_back"),
                    axisRange: 26,
                },
                {
                    buttonIndex: 7,
                    buttonElement: document.getElementById("shoulder_trigger_right_back"),
                    axisRange: 26,
                },
            ]);
        }

        if ((buttonsChangedMask[8] && buttonsChangedMask[8].released) || (buttonsChangedMask[9] && buttonsChangedMask[9].released)) {
            toggleGamepadHelpScreen();
        }

        let noGamepadButtonTouched = true;
        for (let i = 0; i < buttonsChangedMask.length; i++) {
            if (buttonsChangedMask[i] && buttonsChangedMask[i].touchDown) {
                showHelpTooltip(this.buttonHighlightElements[i], GAME_CONTROLLER_BUTTON_CONFIG[i].helpLabel);
                noGamepadButtonTouched = false;
            } else if (gamepad.buttons[i] && gamepad.buttons[i].touched) {
                noGamepadButtonTouched = false;
            }
        }

        if (noGamepadButtonTouched) showHelpTooltip(null, "Gamepad Help");
    }

    handleAxisChange(gpadIndex, gamepad) {

        // console.log("handleAxisChange", gpadIndex, gamepad, axiesChangedMask)
        if (gpadIndex != 0 || !gamepad || !gamepad.axes) return;

        if (this.onAxisChange) this.onAxisChange(gamepad);

        const axisStates = [{
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
            rightHelpText: "Turn Right",
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
            rightHelpText: "Crabwalk Right",
        }]
        handleGamepadVisualFeedbackAxisEvents(axisStates, 0.4);
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
