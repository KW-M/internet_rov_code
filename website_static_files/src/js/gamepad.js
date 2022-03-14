import joymap from "joymap"

const DEFAULT_GAMEPAD_HELP_MSG = "Press any button on your controller or onscreen."
const DEFUALT_BUTTON_ORDER = [
    "A",
    "B",
    "X",
    "Y",
    "L1",
    "R1",
    "L2",
    "R2",
    "select",
    "start",
    "stick_button_left",
    "stick_button_right",
    "dpadUp",
    "dpadDown",
    "dpadLeft",
    "dpadRight"
]


// Gamepad help section

var gamepadHelpVisible = false;
const gamepadHelpText = document.getElementById("gamepad-help-text")
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

export function initGamepadSupport(gamepadUi, gamepadEmulator, gamepadUpdatedCallback) {

    // As of 2012, it seems impossible to detect Gamepad API support
    // in Firefox, hence we need to hardcode it in gamepadSupportAvailable.
    navigator.getGamepads = navigator.getGamepads || navigator.webkitGamepads || navigator.webkitGetGamepads
    var gamepadSupportAvailable = !!navigator.getGamepads || (navigator.userAgent.indexOf('Firefox/') != -1);
    if (!gamepadSupportAvailable) {
        // It doesn't seem Gamepad API is available ' show a message telling
        // the visitor about it.
        gamepadUi.showNotSupported();
        return false;
    }

    const buttonHighlightElements = gamepadUi.getButtonHighlightElements();
    gamepadEmulator.monkeyPatchGetGamepads()
    // gamepadEmulator.addEmulatedGamepad(0, gamepadEmulator.DEFAULT_BUTTON_COUNT, gamepadEmulator.DEFAULT_AXIS_COUNT)
    gamepadEmulator.registerOnScreenGamepadButtonEvents(0, buttonHighlightElements);
    gamepadEmulator.registerOnScreenGamepadAxisEvents(0, [{
        xAxisGpadAxis: 0,
        yAxisGpadAxis: 1,
        elem: document.getElementById("gamepad-joystick-touch-area-left"),
    }, {
        xAxisGpadAxis: 2,
        yAxisGpadAxis: 3,
        elem: document.getElementById("gamepad-joystick-touch-area-right"),
    }]);

    setupGamepadHelp();

    // otherwise gamepad support is available. so initilize the joymap library
    var lastGamepadCount = 0;
    var lastGamepadId = "";
    var joyMod = joymap.createQueryModule({ threshold: 0.2, clampThreshold: true });;
    const gpadMap = joymap.createJoymap({
        autoConnect: true, // autoconnect gets confused by the gamepad emulation, as it causes the gamepad id to change, so we connect manually
        // do stuff immediately after each Gamepad Poll (should/will be called about 60 times per second)
        onPoll: function gamepadUpdate() {

            // check if a gamepad was just connected or disconnected:
            const gamepads = gpadMap.getGamepads()
            const gamepadCount = gamepads.length;
            if (gamepadCount != lastGamepadCount || (gamepads[0] && gamepads[0].id != lastGamepadId)) {
                if (gamepadCount == 0) {
                    gamepadUi.showNoGamepads();
                    lastGamepadCount = 0;
                    lastGamepadId = "";
                    return;
                } else if (gamepadCount >= 1) {
                    if (joyMod) gpadMap.removeModule(joyMod);
                    console.log(joyMod)
                    joyMod = joymap.createQueryModule({ threshold: 0.2, clampThreshold: true });
                    gpadMap.addModule(joyMod);
                    console.log(joyMod)

                    gamepadUi.showGamepadsConnected(gamepads);
                    console.log(joyMod.getAllButtons(), joyMod.getAllSticks(), joyMod.getAllMappers())
                }
                lastGamepadCount = gamepadCount;
                lastGamepadId = gamepads[0].id;
            }

            // console.log("g:", gpadMap.getGamepads())
            var buttonStates = joyMod.getAllButtons();
            if (buttonStates["A"]) {
                buttonStates = DEFUALT_BUTTON_ORDER.map((key) => buttonStates[key])
                gamepadUi.handleGamepadVisualFeedbackButtonEvents(buttonStates, buttonHighlightElements, "touched", "pressed");
            }

            var axisStates = joyMod.getAllSticks();
            if (axisStates["L"] && axisStates["R"]) {
                axisStates = [
                    {
                        thumbStickElement: document.getElementById("stick_left"),
                        axisRange: 14,
                        xValue: axisStates.L.value[0],
                        yValue: axisStates.L.value[1],
                    },
                    {
                        thumbStickElement: document.getElementById("stick_right"),
                        axisRange: 14,
                        xValue: axisStates.R.value[0],
                        yValue: axisStates.R.value[1],
                    }
                ]

                gamepadUi.handleGamepadVisualFeedbackAxisEvents(axisStates, "axis-hovered", "axis-moved");
            }

            gamepadUpdatedCallback(joyMod.getAllButtons(), joyMod.getAllSticks(), joyMod.getAllMappers())
        }
    });
    gpadMap.addModule(joyMod);
    gpadMap.start();
}