// this
function makeJsonApiRequest(url) {
    return fetch(url).then((response) => {
        return json.parse(response.text().split('\n')[0])
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
    showToastMessage("Sending Shutdown Request...")
    makeJsonApiRequest("/uwsgi/shutdown").then((result) => {
        console.log(result)
        showToastMessage("Please wait 20 seconds before unplugging")
        showToastMessage("ROV:" + result['message'])
    })
}

function rebootROV() {
    showToastMessage("Sending Reboot Request...")
    makeJsonApiRequest("/uwsgi/reboot").then((result) => {
        console.log(result)
        showToastMessage("Press Connect again in ~30 seconds")
        showToastMessage("ROV:" + result['message'])
    })
}

function restartROVServices() {
    showToastMessage("Sending Service Restart Request (Please Wait)...")
    makeJsonApiRequest("/uwsgi/restart_services").then((result) => {
        console.log(result)
        showToastMessage("Click this message to view full output...", () => {
            window.open().document.write(result['message'])
        })
        showToastMessage("ROV Services have Restarted...")
    })
}

function rePullROVGithubCode() {
    showToastMessage("Sending Pull Request (Please Wait)...")
    makeJsonApiRequest("/uwsgi/pull_github_code").then((result) => {
        console.log(result)
        showToastMessage("Make sure to click restart ROV services in about 30 seconds")
        showToastMessage("Click this message to view full output...", () => {
            window.open().document.write(result['message'])
        })
        showToastMessage("Code changes pulled from main branch...")
    })
}