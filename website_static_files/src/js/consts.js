export const ROV_PEERID_BASE = "go-robot-";

// FOR A PEERJS SERVER RUNNING IN THE CLOUD (Heroku, but could be changed to connect to the peerjs cloud or elsewhere)
export const peerServerCloudOptions = {
    host: "ssrov-peerjs-server.herokuapp.com",//"0.peerjs.com",//
    secure: true,
    path: '/',
    port: 443,
}

// export const peerServerCloudOptions = {
//     host: "localhost",
//     secure: false,
//     path: '/',
//     key: "peerjs",
//     port: 9129,
// }

// FOR A PEERJS SERVER RUNNING ON THE ROV Raspberry Pi:
export const peerServerLocalOptions = {
    host: 'raspberrypi.local', // or whatever ip the raspberrypi is at
    path: '/',
    secure: false,
    port: 9000,
}

/******* UI RELATED CONSTANTS ********/

export const LOADING_MESSAGES = {
    "default": "Loading...",
    "ip-scan": "Scanning for ROV IP address...",
    "internet-check": "Checking internet access...",
    "server-connecting": "Connecting to peer server...",
    "server-reconnecting": "Reconnecting to peer server...",
    "webrtc-connecting": "Searching for ROV...",
    "webrtc-reconnecting": "Reconnecting to ROV...",
    "reloading-site": "Reloading site...",
    "awaiting-video-call": "Waiting for livestream...",
    "awaiting-rov-reconnect": "Waiting for ROV to reconnect...",
}

/****** GAMEPAD RELATED ***********/

// export const TOUCHED_BUTTON_EQUIVELANT_VALUE = 0.5;
export const GAME_CONTROLLER_BUTTON_CONFIG = [
    { btnName: "button_1", remoteAction: 'lights', helpLabel: "Lights" },
    { btnName: "button_2", remoteAction: 'record', helpLabel: "Start/Stop Recording" },
    { btnName: "button_3", remoteAction: 'photo', helpLabel: "Take Phtoto" },
    { btnName: "button_4", remoteAction: null, helpLabel: "Nothing" },
    { btnName: "shoulder_btn_front_left", remoteAction: null, localAction: null, helpLabel: "Nothing" },
    { btnName: "shoulder_btn_front_right", remoteAction: 'claw_open', helpLabel: "TODO: Open Claw", holdAllowed: true, },
    { btnName: "shoulder_trigger_back_left", remoteAction: null, helpLabel: "Nothing" },
    { btnName: "shoulder_trigger_back_right", remoteAction: 'claw_close', helpLabel: "TODO: Close Claw", holdAllowed: true, },
    { btnName: "select", remoteAction: null, helpLabel: "Show/Hide Gamepad Help" },
    { btnName: "start", remoteAction: null, helpLabel: "Show/Hide Gamepad Help" },
    { btnName: "stick_button_left", remoteAction: null, helpLabel: "Lock Vertical Thruster" },
    { btnName: "stick_button_right", remoteAction: null, helpLabel: "Lock Horizontal" },
    { btnName: "d_pad_up", remoteAction: 'exposure_plus', helpLabel: "Increase Camera Brightness", holdAllowed: true, },
    { btnName: "d_pad_down", remoteAction: 'exposure_minus', helpLabel: "Decreases Camera Brightness", holdAllowed: true, },
    { btnName: "d_pad_left", remoteAction: 'v_quality_plus', helpLabel: "Decrease Video Quality (reduces latency)", holdAllowed: true, },
    { btnName: "d_pad_right", remoteAction: 'v_quality_minus', helpLabel: "Increase Video Quality (increases latency)", holdAllowed: true, },
    { btnName: "vendor", remoteAction: null, helpLabel: "Nothing" }, // note that the vendor button is often used by windows / android, so we can't use it.
];


export const ONSCREEN_GPAD_BUTTON_LABELS = [
    "button_1",
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
    "d_pad_right"
]

export const ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS = "touched", ONSCREEN_GPAD_BUTTON_PRESSED_CLASS = "pressed";


    //     'A': { remoteAction: 'photo', desc: 'Take Photo' },
    //     'B': { remoteAction: 'record', desc: 'Start/Stop Recording' },
    //     'X': { remoteAction: null, desc: 'TBD' },
    //     'Y': { remoteAction: null, desc: 'TBD' },
    //     'L1': { remoteAction: 'clawOpen', mode: "btn_hold_allowed", desc: 'Open Claw' },
    //     'R1': { remoteAction: 'clawOpen', mode: "btn_hold_allowed", desc: 'Open Claw' },
    //     'L2': { remoteAction: 'clawClose', mode: "btn_hold_allowed", desc: 'Close Claw' },
    //     'R2': { remoteAction: 'clawClose', mode: "btn_hold_allowed", desc: 'Close Claw' },
    //     'SELECT': { remoteAction: 'bitrate-', mode: "btn_hold_allowed", desc: 'TODO: Decrease Video Quality (lowers latency)' },
    //     'START': { remoteAction: 'bitrate+', mode: "btn_hold_allowed", desc: 'TODO: Increase Video Quality (adds latency)' },
    //     'dpadUp': { remoteAction: 'lights+', mode: "btn_hold_allowed", desc: 'TODO: Increase Intensity of Lights' },
    //     'dpadDown': { remoteAction: 'lights-', mode: "btn_hold_allowed", desc: 'TODO: Decrease Intensity of Lights' },
    //     'dpadLeft': { remoteAction: 'exposure-', mode: "btn_hold_allowed", desc: 'TODO: Dim Camera Exposure' },
    //     'dpadRight': { remoteAction: 'exposure+', mode: "btn_hold_allowed", desc: 'TODO: Brighten Camera Exposure' },
    // }
