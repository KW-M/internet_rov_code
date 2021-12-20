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
        showToastMessage("Error: " + e.toString())
        throw Error(e);
    })
}

function shutdownROV() {
    makeJsonApiRequest("/uwsgi/shutdown").then((result) => {
        console.log(result)
        showToastMessage("Please wait 20 seconds before unplugging")
        showToastMessage("ROV Shutting Down...")
    })
}

function rebootROV() {
    makeJsonApiRequest("/uwsgi/reboot").then((result) => {
        console.log(result)
        showToastMessage("Press Connect again in ~30 seconds")
        showToastMessage("ROV Rebooting...")
    })
}

function restartROVServices() {
    makeJsonApiRequest("/uwsgi/restart_services").then((result) => {
        console.log(result)
        showToastMessage("Press Connect button again in about 8 seconds")
        showToastMessage("ROV Restarting Services...")
    })
}

function rePullROVGithubCode() {
    makeJsonApiRequest("/uwsgi/pull_github_code").then((result) => {
        console.log(result)
        showToastMessage("Make sure to click restart ROV services in about 30 seconds")
        showToastMessage("Pulling latest code changes from main branch...")
    })
}