import { showPasswordPrompt, showScrollableTextPopup, showToastDialog, showToastMessage } from "./ui";
import { v4 as uuidV4 } from "uuid"

export class MessageHandler {

    // replyContinuityCallbacks: keep track of functions to run when we get a reply to a message we sent with some "cid" aka continuityId
    // object format: (key is the cid of the sent message): { '1234': { callback: function() {}, original_msg: "{action:'move'}" }, etc... }
    static replyContinuityCallbacks = {};

    // sendMessageCallback: Function that will send the message to the rov peer.
    // This callback should be set in the constructor below.
    static sendMessageCallback = () => { };

    constructor(sendMessageCallback) {
        this.sendMessageCallback = sendMessageCallback;
    }

    // sendRovMessage: Send a message to the rov peer and setup reply callbacks based on a message cid if reply(ies) are expected.
    static sendRovMessage = (msgObject, replyCallback) => {
        const messageString = JSON.stringify(msgObject);
        console.log("Sending message: " + messageString);

        // setup the reply callback
        let cid = msgObject["cid"] = msgObject["cid"] || uuidV4().substring(0, 8); // generate a random cid if none is provided
        if (!MessageHandler.replyContinuityCallbacks[cid]) MessageHandler.replyContinuityCallbacks[cid] = { original_msg: msgObject };
        if (replyCallback) MessageHandler.replyContinuityCallbacks[cid].callback = replyCallback;

        // send the message to the rov
        this.sendMessageCallback(messageString);
    }

    handlePasswordChallenge(msg_cid) {
        showPasswordPrompt("Please enter the piloting password", (password) => {
            if (password) {
                const msg_data = {
                    "cid": msg_cid,
                    "action": "password-response",
                    "val": password
                };
                MessageHandler.sendRovMessage(msg_data, null);
            } else {
                // remove the reply callback if the user cancels the password prompt (empty password)
                delete MessageHandler.replyContinuityCallbacks[msg_cid]
            }
        })
    }

    handleReplyMsgRecived(msg_data, msg_cid) {
        const msg_status = msg_data["status"];
        const msg_value = msg_data["value"];
        const replyContinuityCallback = MessageHandler.replyContinuityCallbacks[msg_cid].callback

        if (msg_status == "error") {
            console.error("Rov Action Error: " + msg_value);

        } else if (msg_status == "ok") {
            if (replyContinuityCallback) replyContinuityCallback(msg_data);
            else showToastMessage(MessageHandler.replyContinuityCallbacks[msg_cid].originalMsgData.action + ": OK");

        } else if (msg_status == "password-requried") {
            this.handlePasswordChallenge(msg_cid);

        } else if (msg_status == "password-invalid") {
            showToastDialog("Invalid password");
            this.handlePasswordChallenge(msg_cid);

        } else if (msg_status == "password-accepted") {
            showToastDialog("Password accepted");
            const originalMsgData = MessageHandler.replyContinuityCallbacks[msg_cid].original_msg
            MessageHandler.MessagesendRovMessage(originalMsgData);

        } else if (replyContinuityCallback) {
            replyContinuityCallback(msg_data);
        }
    }

    handlePilotChange(newPilotId) {
        showToastMessage("ROV Pilot has changed to " + newPilotId);
    }

    handleBroadcastMsgRecived(msg_data) {
        const msg_status = msg_data["status"];
        const msg_value = msg_data["val"];

        if (msg_status == "error") {
            console.error("Rov Error: " + msg_value);

        } else if (msg_status == "pilotHasChanged") {
            this.handlePilotChange(msg_value);


        }

    }

    handleRecivedMessage(messageString) {
        console.log("Recived message: " + messageString);
        const msg_data = JSON.parse(messageString);
        const msg_cid = msg_data["cid"];

        if (msg_cid && msg_cid in MessageHandler.replyContinuityCallbacks) {

            // --- this IS a reply to a message we sent ---
            this.handleReplyMsgRecived(msg_data, msg_cid);

        } else {

            // --- this is NOT a reply to a message we sent ---
            this.handleBroadcastMsgRecived(msg_data);

        }
    }


}

export class RovActions {

    // ==== Helpers =====

    static sendActionAndWaitForDone(action, callback) {
        let responseMessage = "";
        MessageHandler.sendRovMessage({ "action": action }, (response) => {

            const responseText = response["val"] || ""
            responseMessage += responseText + "\n";

            const status = response["status"]
            if (status && callback) {
                if (status == "done") callback(responseMessage);
                else if (status == "error") callback("Error: " + responseMessage);
            }

        })
    }

    static startPingMessageSenderLoop() {
        const intervalId = setInterval(() => {
            MessageHandler.sendRovMessage({ "ping": Date.now() });
        }, 2000)
        return () => { clearInterval(intervalId) } // return a cleanup function
    }

    // ======= Actions ========

    static moveRov(thrustVector, turnRate) {
        MessageHandler.sendRovMessage({ "action": "move", "val": { thrustVector: thrustVector, turnRate: turnRate } }, null);
    }

    static toggleLights() {
        MessageHandler.sendRovMessage({ "action": "toggle_lights" }, null);
    }



    static shutdownRov = () => {
        if (confirm("Are you sure you want to shutdown the ROV? - The ROV will be on a different ngrok url when rebooted.")) {
            showToastMessage("Sending Shutdown Request...")
            RovActions.sendActionAndWaitForDone({ "action": "shutdown_rov" }, (doneMsg) => {
                showToastMessage("Please wait 20 seconds before unplugging")
                showToastMessage("ROV:" + doneMsg)
            })
        }
    }

    static rebootRov = () => {
        if (confirm("Are you sure you want to reboot the ROV? - The ROV will be on a different ngrok url when rebooted.")) {
            showToastMessage("Sending Reboot Request...")
            RovActions.sendActionAndWaitForDone({ "action": "reboot_rov" }, (doneMsg) => {
                showToastMessage("Press Connect again in ~30 seconds")
                showToastMessage("ROV:" + doneMsg)
            })
        }
    }

    static restartRovServices = () => {
        if (confirm("Are you sure you want to restart services? - The ROV will stop responding for about minute and then you will need to re-connect")) {
            const addTextToPopup = showScrollableTextPopup("Restarting ROV Services...")
            addTextToPopup("Sending Service Restart Request (Please Wait)...")
            MessageHandler.sendRovMessage({ "action": "restart_rov_services" }, (response) => {
                if (response['val']) addTextToPopup(response['val'])
                if (response['error']) addTextToPopup("\nError:\n" + response['error']);
            })
        }
    }

    static getRovStatusReport = () => {
        const addTextToPopup = showScrollableTextPopup("ROV Status Report...")
        addTextToPopup("Sending Status Request (Please Wait)...")
        MessageHandler.sendRovMessage({ "action": "rov_status_report_report" }, (response) => {
            if (response['val']) addTextToPopup(response['val'])
            if (response['error']) addTextToPopup("\nError:\n" + response['error']);
        })
    }

    static rePullRovGithubCode = () => {
        alert("Make sure to choose 'Restart ROV Services' from this menu after the pull completes.")
        const addTextToPopup = showScrollableTextPopup("Pulling Updated Code...")
        addTextToPopup("Sending Code Pull Request (Please Wait)...")
        MessageHandler.sendRovMessage({ "action": "pull_rov_github_code" }, (response) => {
            if (response['val']) addTextToPopup(response['val'])
            if (response['error']) addTextToPopup("\nError:\n" + response['error']);
            else if (response['done']) {
                addTextToPopup("\n\nDone.")
                addTextToPopup("Please run 'Restart ROV Services' from the same menu in ~30 seconds to fully apply any code changes.")
            }
        });
    }

    static enableRovWifi = () => {
        showToastMessage("Sending Enable Wifi Command...")
        RovActions.sendActionAndWaitForDone({ "action": "enable_wifi" }, (doneMsg) => {
            showToastMessage("Wifi Enabled! " + doneMsg)
        })
    }

    static disableRovWifi = () => {
        if (confirm("Are you sure you want to disable rov wifi? If the ROV is connected via wifi, don't do this!")) {
            showToastMessage("Sending Disable Wifi Command...")
            RovActions.sendActionAndWaitForDone({ "action": "disable_wifi" }, (doneMsg) => {
                showToastMessage("Wifi Disabled! " + doneMsg)
            })
        }
    }

}
