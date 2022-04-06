import { getGamepads, isSupported, tryRemapStdLayout, poll, pollEvents } from "@maulingmonkey/gamepad/modular";

const gamepadLibPrefs = { deadZone: 0.15, standardize: true, keepNonstandard: false, keepInactive: true, keepNull: true }

export const gamepadApiSupported = isSupported;

export function onGamepadConnect(callback) {
  addEventListener("mmk-gamepad-connected", callback);
}

export function onGamepadDisconnect(callback) {
  addEventListener("mmk-gamepad-connected", callback);
}

export function onGamepadButtonValueChange(callback) {
  addEventListener("mmk-gamepad-button-value", callback);
}

export function onGamepadAxisValueChange(callback) {
  addEventListener("mmk-gamepad-axis-value", callback);
}

export function getGamepadsStandardized() {
  return getGamepads(gamepadLibPrefs).map((gp) => {
    var gpad = tryRemapStdLayout(gp);
    // gpad.parsedId = parseGamepadId(gpad.id);
    gpad.emulated = gpad.emulated || false;
    return gpad;
  });
}

export function startGamepadEventLoop() {
  poll(() => {
    pollEvents(gamepadLibPrefs);
  });
}
