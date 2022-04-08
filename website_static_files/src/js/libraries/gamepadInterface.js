// Note: this file was written by me (Kyle), and is not a library found on the web.

export class GamepadInterface {

    constructor(buttonConfig, updateDelay) {
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

        if (this.gamepadApiSupported()) {
            this.tickLoop();
        }
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
        for (var gi = 0; gi < gamepads.length; gi++) {
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
        for (i = 0; i < axisState.length; i++) {
            let axisValue = axisState[i];
            let lastAxisValue = lastAxisState[i];
            if (axisValue != lastAxisValue) {
                axiesChangeMask[i] = true;
                aAxisChangedFlag = true;
            } else {
                axiesChangeMask[i] = false;
            }
        }

        // send out event if one or more axes changed
        if (aAxisChangedFlag && this.gamepadAxisChangeCallback) {
            this.gamepadAxisChangeCallback(gamepadIndex, gamepad, axiesChangeMask);
        }
    }

    checkForButtonChanges(gamepadIndex, gamepad) {
        let btnState = gamepad.buttons;
        const lastGamepadState = this.lastStateOfGamepads[gamepadIndex];
        let lastBtnState = lastGamepadState.buttons;

        let buttonChangesMask = [];

        let bi, aButtonChangedFlag = false;
        for (bi = 0; bi < btnState.length; bi++) {

            let button = btnState[bi];
            let lastButtonState = lastBtnState[bi];
            let buttonConfig = this.buttonConfig[bi] || {};

            let btnChangeMask = {}

            if (button.touched && !lastButtonState.touched) {
                btnChangeMask.touchDown = true;
                aButtonChangedFlag = true;
            } else if (!button.touched && lastButtonState.touched) {
                btnChangeMask.touchUp = true;
                aButtonChangedFlag = true;
            }

            if (button.pressed && !lastButtonState.pressed) {
                btnChangeMask.pressed = true
                aButtonChangedFlag = true;
            } else if (!button.pressed && lastButtonState.pressed) {
                btnChangeMask.released = true
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
        if (aButtonChangedFlag && this.gamepadButtonChangeCallback) {
            this.gamepadButtonChangeCallback(gamepadIndex, gamepad, buttonChangesMask);
        }
    }

}
