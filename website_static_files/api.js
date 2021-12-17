// this
function makeJsonApiRequest(url) {
    return fetch(url).then((response) => {
        response.json()
    }).then((result) => {
        if (result['error']) {
            throw Error(result['error'])
        }
    }).catch((e) => {
        console.error(e)
        showToastMessage("Error: " + e.toString())
        throw Error(e);
    })
}

function shutdownROV() {
    makeJsonApiRequest("/api/shutdown").then((result) => {
        showToastMessage("Please wait 20 seconds before unplugging")
        showToastMessage("ROV Shutting Down...")
    })
}

function rebootROV() {
    makeJsonApiRequest("/api/reboot").then((result) => {
        showToastMessage("Press Connect again in ~30 seconds")
        showToastMessage("ROV Rebooting...")
    })
}

function restartROVServices() {
    makeJsonApiRequest("/api/restart_services").then((result) => {
        showToastMessage("Press Connect button again in about 8 seconds")
        showToastMessage("ROV Restarting Services...")
    })
}