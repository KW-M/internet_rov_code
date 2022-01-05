// this
function makeJsonApiRequest(url) {
    return fetch(url).then((response) => {
        console.log(response)
        return response.text()
    }).then((responseText) => {
        if (!responseText) {
            throw Error("Got no response from rov")
        }
        try {
            responseObject = JSON.parse(responseText)
        } catch (e) {
            throw Error("Got invalid JSON from rov: " + responseText)
        }
        if (responseObject['status'] != 'ok') {
            throw Error(result['message'])
        }
        return responseObject
    }).catch((e) => {
        console.error(e)
        showToastMessage("Click this message to view full error...", () => {
            window.open().document.write(e.toString())
        })
        showToastMessage("Error: " + e.toString().substring(0, 60))
        throw Error(e);
    })
}

function shutdownROV() {
    if (confirm("Are you sure you want to shutdown the ROV? - The ROV will be on a different ngrok url when rebooted.")) {
        showToastMessage("Sending Shutdown Request...")
        makeJsonApiRequest("/uwsgi/shutdown").then((result) => {
            console.log(result)
            showToastMessage("Please wait 20 seconds before unplugging")
            showToastMessage("ROV:" + result['message'])
        })
    }
}

function rebootROV() {
    if (confirm("Are you sure you want to reboot the ROV? - The ROV will be on a different ngrok url when rebooted.")) {
        showToastMessage("Sending Reboot Request...")
        makeJsonApiRequest("/uwsgi/reboot").then((result) => {
            console.log(result)
            showToastMessage("Press Connect again in ~30 seconds")
            showToastMessage("ROV:" + result['message'])
        })
    }
}

function restartROVServices() {
    if (confirm("Are you sure you want to restart services? - The ROV may appear to stop responding and be on a different ngrok url when done.")) {
        window.open("/uwsgi/restart_services")
        // showToastMessage("Sending Service Restart Request (Please Wait)...")
        // makeJsonApiRequest("/uwsgi/restart_services").then((result) => {
        //     console.log(result)
        //     showToastMessage("Click this message to view full output...", () => {
        //         window.open().document.write(result['message'] + "|" + (result['error'] || ""))
        //     })
        //     showToastMessage("ROV Services have Restarted...")
        // })
    }
}

function rePullROVGithubCode() {
    alert("Make sure to choose 'Restart ROV Services' from this menu after the pull completes to fully apply any code changes.")
    window.open("/uwsgi/pull_github_code")
    // .then((result) => {
    //     console.log(result)
    //     showToastMessage("Make sure to click restart ROV services in about 30 seconds")
    //     showToastMessage("Click this message to view full output...", () => {
    //         window.open().document.write(result['message'] + " | " + (result['error'] || ""))
    //     })
    //     showToastMessage("Code changes pulled from main branch...")
    // })
}

function enableWifi() {
    showToastMessage("Sending Enable Wifi Command...")
    makeJsonApiRequest("/uwsgi/enable_wifi").then((result) => {
        showToastMessage("Done. Click to view full output...", () => {
            window.open().document.write(result['message'] + " | " + (result['error'] || ""))
        })
    })
}

function disableWifi() {
    if (confirm("Are you sure you want to disable wifi? - Make sure you are connected via the teather or some other method.")) {
        showToastMessage("Sending Disable Wifi Command...")
        makeJsonApiRequest("/uwsgi/disable_wifi").then((result) => {
            showToastMessage("Done. Click to view full output...", () => {
                window.open().document.write(result['message'] + " | " + (result['error'] || ""))
            })
        })
    }
}

function takePhoto() {
    download("/uv4l_dashboard/stream/snapshot.jpeg")
}