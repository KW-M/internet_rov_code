const btnLabels = ["button_1",
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
    "d_pad_right"]


const onscreenGamepadLeft = document.getElementById("onscreen-gamepad-left");
const onscreenGamepadRight = document.getElementById("onscreen-gamepad-right");
const gamepadConnectNotice = document.getElementById("gamepad-connect-notice")
const tooManyGamepadsNotice = document.getElementById("too-many-gamepads-notice")
export const gamepadUi = {
    showExtraniousGamepadsConnected: function (tooManyGamepads) {
        tooManyGamepadsNotice.style.display = tooManyGamepads ? "block" : "none";
    },

    showEmulatedGamepad: function (show) {
        onscreenGamepadLeft.style.opacity = onscreenGamepadRight.style.opacity = show ? "1" : "0.5";
    },

    showNoGamepads: function (show) {
        gamepadConnectNotice.style.display = show ? "block" : "none";
    },

    showGamepadStatus: function (connectedGamepadCount) {
        this.showNoGamepads(connectedGamepadCount == 0);
        this.showEmulatedGamepad(connectedGamepadCount == 0);
        this.showExtraniousGamepadsConnected(connectedGamepadCount > 1);
    },

    showNotSupported: function () {
        alert('Gamepad interface not supported, please use a more modern browser.');
        this.showEmulatedGamepad(true);
    },

    handleGamepadVisualFeedbackAxisEvents: (axiesMaping, axisHoveredClass, axisMovedClass) => {
        axiesMaping.forEach(function (axisMap) {
            // if (axisValue > 0 || axisValue < 0) {
            var thumbstick = axisMap.thumbStickElement;
            var axisRange = axisMap.axisRange;
            var xValue = axisMap.xValue || 0;
            var yValue = axisMap.yValue || 0;
            // thumbstick.classList.add(axisMovedClass);
            thumbstick.style.transform = `rotateY(${-xValue * 30}deg) rotateX(${yValue * 30}deg) translate(${xValue * axisRange}px,${yValue * axisRange}px)`;
            // thumbstick.style.transformOrigin = "center";
            // } else {
            //     // thumbstick.classList.remove(axisMovedClass);
            // }
        });
    },

    handleGamepadVisualFeedbackButtonEvents: (gamepadButtonStates, buttonHighlightElements, btnHoveredClass, btnPressedClass) => {
        for (var btnIndx = 0; btnIndx < gamepadButtonStates.length; btnIndx++) {
            var gpadButton = gamepadButtonStates[btnIndx];
            var btnElem = buttonHighlightElements[btnIndx];
            if (!gpadButton || !btnElem) continue;
            // console.log(gpadButton, btnElem, btnHoveredClass, btnPressedClass)
            if (gpadButton.touched) {
                btnElem.classList.add(btnHoveredClass);
            } else {
                btnElem.classList.remove(btnHoveredClass);
            }

            if (gpadButton.pressed) {
                btnElem.classList.add(btnPressedClass);
            } else {
                btnElem.classList.remove(btnPressedClass);
            }
        }
    },

    getButtonHighlightElements: () => {
        return btnLabels.map(btnLabel => document.getElementById(btnLabel + "_highlight"));
    }
}


// handleGamepadConnected: function (gamepadDevice) {
//     // a new gamepad connected
//     console.log('Gamepad Connected:', gamepadDevice);
//     showToastMessage("Gamepad Connected: " + gamepadDevice);
// },

// handleGamepadDisconnected: function (device) {
//     // gamepad disconnected
//     console.log('Gamepad Disconnected:', device);
// },