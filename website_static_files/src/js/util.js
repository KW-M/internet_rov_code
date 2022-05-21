

export function clamp(number, max, min) {
    return Math.max(Math.min(number, max), min)
}


/* generateStateChangeFunction is a function generator for an xstate machine that will return a function that will run a callback and send the named state transition with the data or event from the calling transition */
export function generateStateChangeFunction(sendStateChange, stateTransition, data, additionalCallback) {
    const func = function (evt) {
        if (additionalCallback) additionalCallback(evt)
        sendStateChange({ type: stateTransition, data: (data || evt) });
    }
    return func;
}

export function calculateDesiredMotion(axes) {
    var turn = axes[0].toFixed(3);
    var forward = -1 * axes[1].toFixed(3);
    var strafe = axes[2].toFixed(3);
    var vertical = -1 * axes[3].toFixed(3);
    return {
        thrustVector: [strafe, forward, vertical], // vector in the form [x,y,z]
        turnRate: turn,
    }
}

/*
* Gets just the passed name parameter from the query string the curent url:
* Example: if the url is: https://example.com/abc?some-variable-name=somevalue&someotherthing=someothervalue
* then getURLQueryStringVariable("some-variable-name") will return "somevalue"
*/
export function getURLQueryStringVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    // console.log('Query variable %s not found', variable);
}

export function isInternetAvailable(urlToCheck) {
    return new Promise((resolve) => {
        console.info("checkingUrl", urlToCheck);
        try {
            fetch(urlToCheck).then(() => { resolve(true) }).catch((e) => {
                console.warn("Internet Offline, starting switch to local mode", e)
                resolve(false)
            });
            // setTimeout(() => {
            //     resolve(false)
            // }, 10000)
        } catch (e) {
            console.warn("Error Checking internet, starting switch to local mode", e)
            resolve(false)
        }
    })
}

window.closeFullscreen = () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    if (fullscreenElement) {
        const removeFullscreenUi = () => {
            fullscreenElement.classList.remove('fullscreen-open');
        };
        if (document.exitFullscreen) {
            document.exitFullscreen().then(removeFullscreenUi);
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen().then(removeFullscreenUi);
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen().then(removeFullscreenUi);
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen().then(removeFullscreenUi);
        }
    }
}

/* When the toggleFullscreen() export function is executed, open the passed element in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
window.toggleFullscreen = (e, elem) => {
    elem = elem || document.documentElement;
    if (e && e.initialTarget) e.initialTarget.classList.toggle('fullscreen-open');
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

    const addFullscreenUi = () => {
        elem.classList.add('fullscreen-open');
    };

    const removeFullscreenUi = () => {
        fullscreenElement.classList.remove('fullscreen-open');
        if (elem !== fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen().then(addFullscreenUi);
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen().then(addFullscreenUi);
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen().then(addFullscreenUi);
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT).then(addFullscreenUi);
            }
        }
    };

    if (fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(removeFullscreenUi);
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen().then(removeFullscreenUi);
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen().then(removeFullscreenUi);
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen().then(removeFullscreenUi);
        }
    } else {
        if (elem.requestFullscreen) {
            elem.requestFullscreen().then(addFullscreenUi);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen().then(addFullscreenUi);
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen().then(addFullscreenUi);
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT).then(addFullscreenUi);
        }
    }
}

export function toggleFullscreen(event, elem) {
    elem = elem || document.documentElement;
    var fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    if (!fullscreenElement || elem !== fullscreenElement) {
        const requestFullscreenFunc = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
        console.log(requestFullscreenFunc)
        requestFullscreenFunc(Element.ALLOW_KEYBOARD_INPUT)
    } else {
        const exitFullscreenFunc = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
        exitFullscreenFunc().then(() => {
            fullscreenElement.classList.remove('fullscreen-open');
        });
    }
}

// Downloads the given link, with an optional filename for the download
export function download(url, filename) {
    const a = document.createElement('a') // Create <a> hyperlink element
    a.href = url // Set the hyperlink URL
    a.download = filename || "" // if left blank the browser will guess the filename for the downloaded file
    document.body.appendChild(a) // Append the hyperlink to the document body
    a.click() // Click the hyperlink
    document.body.removeChild(a) // Remove the hyperlink from the document body
}
