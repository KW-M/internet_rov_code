//https://dmitripavlutin.com/timeout-fetch-request/
async function fetchWithTimeout(url, options = {}) {
    const { timeout = 5000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);
    return response;
}

function checkInternetConnection() {
    // try to connect to our peerjs server in the "cloud"
    console.info("Checking Internet Connection...")
    return fetchWithTimeout("https://" + peerServerCloudOptions.host + peerServerCloudOptions.path).catch((error) => {
        console.warn("Error Reaching Internet: ", error)
        return false // signal to the then block that an error happened
    }).then((response) => {
        return response && response.ok
    })
}


// document.writeln("isSecureContext: ", isSecureContext)
// document.writeln("protocol: ", location.protocol)
// document.writeln("getGpads: ", navigator.getGamepads ? JSON.stringify(navigator.getGamepads()) : "not available")
// var iframe = document.createElement('iframe');
// iframe.onload = function () {
//     var div = document.createElement('div');
//     div.innerText = 'The iframe onload event has fired';
//     document.body.appendChild(div);
// }
// iframe.src = 'https://kw-m.github.io/portfolio/';
// document.body.appendChild(iframe);

// setTimeout(() => {
//     window.location.protocol = "https:"
// }, 8000)