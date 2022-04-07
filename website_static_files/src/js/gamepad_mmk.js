import { getGamepads, isSupported, poll, pollEvents } from "@maulingmonkey/gamepad/modular";

// TURNS OUT THESE AREN't USED BY THE library
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
    gp.emulated = gp.id.startsWith("Emulated");
    return gp;
  });
}

export function startGamepadEventLoop() {
  poll(() => {
    pollEvents(gamepadLibPrefs);
  });
}
