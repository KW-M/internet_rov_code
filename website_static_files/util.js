function clamp(number, max, min) {
    return Math.max(Math.min(number, max), min)
}

function calculateDesiredMotion(axes) {
    var turn = axes[0].toFixed(3);
    var forward = -1 * axes[1].toFixed(3);
    var strafe = axes[2].toFixed(3);
    var vertical = -1 * axes[3].toFixed(3);
    return {
        thrustVector: [strafe, forward, vertical], // vector in the form [x,y,z]
        turnRate: turn,
    }
}

/* When the openFullscreen() function is executed, open the passed element in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
function toggleFullscreen(elem) {
    elem = elem || document.documentElement;

    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        e.initialTarget.classList.toggle('fullscreen-open');
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}