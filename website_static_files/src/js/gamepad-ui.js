var btnLabels = ["button_1",
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

const gamepadUi = {
    showGamepadsConnected: function (gamepads) {
        document.getElementById("gamepad-connect-notice").style.display = "none";
        if (gamepads.length > 1) {
            document.getElementById("too-many-gamepads-notice").style.display = "block";
        } else {
            document.getElementById("too-many-gamepads-notice").style.display = "none";
        }
        console.log("gamepads:", gamepads)
        if (gamepads[0] && gamepads[0].emulated == true) {
            document.getElementById("onscreen-gamepad-left").style.opacity = "1";
            document.getElementById("onscreen-gamepad-right").style.opacity = "1";
        } else {
            document.getElementById("onscreen-gamepad-left").style.opacity = "0.5";
            document.getElementById("onscreen-gamepad-right").style.opacity = "0.5";
        }
    },

    showNoGamepads: function () {
        document.getElementById("gamepad-connect-notice").style.display = "block";
        document.getElementById("onscreen-gamepad-left").style.opacity = "1";
        document.getElementById("onscreen-gamepad-right").style.opacity = "1";
    },

    showNotSupported: function () {
        alert('Gamepad interface not supported, please use a more modern browser.');
    },

    handleGamepadVisualFeedbackAxisEvents: (axiesMaping, axisHoveredClass, axisMovedClass) => {
        axiesMaping.forEach(function (axisMap, index) {
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
        };
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