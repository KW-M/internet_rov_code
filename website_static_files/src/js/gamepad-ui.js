import { createPopper } from '@popperjs/core/lib/popper-lite';
import flip from '@popperjs/core/lib/modifiers/flip';
import { ONSCREEN_GPAD_BUTTON_LABELS, ONSCREEN_GPAD_BUTTON_PRESSED_CLASS, ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS } from './consts';

const gpadButtonHighlightElements = ONSCREEN_GPAD_BUTTON_LABELS.map((btnLabel) => document.getElementById(btnLabel + "_highlight"));

const gamepadHelpTooltip = document.querySelector('#gamepad-help-tooltip');
const gamepadHelpTooltipText = document.querySelector('#gamepad-help-text');
const defaultTooltipTarget = document.querySelector('#select_button');
var currentPopperTarget = defaultTooltipTarget;

const helpTooltip = createPopper({
    getBoundingClientRect: () => currentPopperTarget.getBoundingClientRect(),
    contextElement: document.body,
}, gamepadHelpTooltip, {
    modifiers: [flip],
    placement: 'right',
    strategy: 'fixed',
});

const tooManyGamepadsNotice = document.getElementById("too-many-gamepads-notice")
export function showExtraniousGamepadsConnected(tooManyGamepads) {
    tooManyGamepadsNotice.style.display = tooManyGamepads ? "block" : "none";
}

const gamepadContainer = document.getElementById("gamepad-container");
export function showGamepadConnected(show) {
    if (show) {
        gamepadContainer.classList.add("gamepad-connected");
    } else {
        gamepadContainer.classList.remove("gamepad-connected");
    }
}

const gamepadConnectNotice = document.getElementById("gamepad-connect-notice")
export function showNoGamepads(show) {
    gamepadConnectNotice.style.display = show ? "block" : "none";
}

var gamepadHelpVisible = false;
export function toggleGamepadHelpScreen() {
    gamepadHelpVisible = !gamepadHelpVisible // toggle it
    if (gamepadHelpVisible) {
        gamepadContainer.classList.add("help-open")
        this.showHelpTooltip(null);
    } else {
        gamepadContainer.classList.remove("help-open")
    }

    let count = 0;
    var updateFunc = () => { helpTooltip.update(); count++; if (count < 60) requestAnimationFrame(updateFunc) }
    updateFunc();
}

export function showGamepadStatus(connectedGamepadCount) {
    this.showNoGamepads(connectedGamepadCount == 0);
    this.showGamepadConnected(connectedGamepadCount == 0);
    this.showExtraniousGamepadsConnected(connectedGamepadCount > 1);
}

export function showNotSupported() {
    alert('Gamepad interface not supported, please use a more modern browser.');
    this.showGamepadConnected(true);
}

export function showHelpTooltip(btnElem, btnHelpText) {
    if (gamepadHelpVisible) {
        if (btnElem) {
            currentPopperTarget = btnElem;
            gamepadHelpTooltipText.innerText = btnHelpText;
            gamepadHelpTooltip.style.opacity = "0.9";
        } else {
            gamepadHelpTooltip.style.opacity = "0";
        }
    } else if (!btnHelpText) {
        currentPopperTarget = defaultTooltipTarget;
        gamepadHelpTooltipText.innerText = "Gamepad Help";
        gamepadHelpTooltip.style.opacity = "0.8";
    }
    helpTooltip.update()
}

export function handleGamepadVisualFeedbackAxisEvents(axiesMaping, directionalHelpThreshold) { //axisHoveredClass, axisMovedClass
    axiesMaping.forEach(function (axisMap) {
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
                    }
                    else if (xValue > directionalHelpThreshold) {
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

    if (gpadButton.touched) {
        btnElem.classList.add(ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS);
    } else {
        btnElem.classList.remove(ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS);
    }

    if (gpadButton.pressed) {
        btnElem.classList.add(ONSCREEN_GPAD_BUTTON_PRESSED_CLASS);
    } else {
        btnElem.classList.remove(ONSCREEN_GPAD_BUTTON_PRESSED_CLASS);
    }
}

export function handleGamepadVisualFeedbackButtonEvents(gamepadButtonStates) {
    for (var btnIndx = 0; btnIndx < gamepadButtonStates.length; btnIndx++) {
        setGamepadButtonClass(btnIndx, gamepadButtonStates);
    }
}

export function handleGamepadVisualFeedbackVariableTriggerButtonEvents(gamepadButtonStates, triggerConfigs) { //axisHoveredClass, axisMovedClass
    for (var i = 0; i < triggerConfigs.length; i++) {
        const triggerConfig = triggerConfigs[i];
        const btnIndx = triggerConfig.buttonIndex;
        setGamepadButtonClass(btnIndx, gamepadButtonStates);
        var yValue = gamepadButtonStates[btnIndx] ? gamepadButtonStates[btnIndx].value : 0;
        triggerConfig.buttonElement.style.transform = `rotateX(${yValue * 30}deg) translateY(${yValue * triggerConfig.axisRange}px)`;
    }
}

export function getButtonHighlightElements() {
    return gpadButtonHighlightElements
}