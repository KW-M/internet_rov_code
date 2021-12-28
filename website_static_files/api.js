// this
function makeJsonApiRequest(url) {
    return fetch(url).then((response) => {
        response.json()
    }).then((result) => {
        if (!result) {
            throw Error("Got no response from rov")
        } else if (result['error']) {
            throw Error(result['error'])
        }
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
    if (confirm("Are you sure you want to restart services? - The ROV will be on a different ngrok url when done.")) {
        showToastMessage("Sending Service Restart Request (Please Wait)...")
        makeJsonApiRequest("/uwsgi/restart_services").then((result) => {
            console.log(result)
            showToastMessage("Click this message to view full output...", () => {
                window.open().document.write(result['message'] + "|" + (result['error'] || ""))
            })
            showToastMessage("ROV Services have Restarted...")
        })
    }
}

function rePullROVGithubCode() {
    showToastMessage("Sending Pull Request (Please Wait)...")
    makeJsonApiRequest("/uwsgi/pull_github_code").then((result) => {
        console.log(result)
        showToastMessage("Make sure to click restart ROV services in about 30 seconds")
        showToastMessage("Click this message to view full output...", () => {
            window.open().document.write(result['message'] + " | " + (result['error'] || ""))
        })
        showToastMessage("Code changes pulled from main branch...")
    })
}