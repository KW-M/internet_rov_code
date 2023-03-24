
document.addEventListener("visibilitychange", function logData() {
    // if (document.visibilityState === "hidden") {
    //     navigator.sendBeacon("/log", analyticsData);
    // }
    // if (document.visibilityState === "visible") {
    //     backgroundMusic.play();
    // } else {
    //     backgroundMusic.pause();
    // }
});

// window.addEventListener('popstate', alert);

// window.onpagehide = () => {
//     alert("wow")
// };

// const pushUrl = (href) => {
//   history.pushState({}, '', href);
//   window.dispatchEvent(new Event('popstate'));
// };


// var uglyHax = function () {
//     var done = function () {
//         console.log("cb", iframe.contentWindow.location, iframe.contentWindow.document.readyState);
//         uglyHax();
//     };
//     iframe.contentWindow.addEventListener("unload", function unloadListener() {
//         iframe.contentWindow.removeEventListener("unload", unloadListener); // Firefox remembers, other browsers don't
//         setTimeout(function () {
//             // IE10, IE11, Opera, PhantomJS, Chrome has a complete new document at this point
//             // Chrome on Karma, Firefox has a loading new document at this point
//             iframe.contentWindow.document.readyState; // IE10 and IE11 sometimes fails if I don't access it twice, idk. how or why
//             if (iframe.contentWindow.document.readyState === "complete")
//                 done();
//             else
//                 iframe.contentWindow.addEventListener("load", function () {
//                     setTimeout(done, 0);
//                 });
//         }, 0);
//     });
// };
// uglyHax();

function iframeURLChange(iframe, callback) {
    var lastDispatched = null;

    var dispatchChange = function () {
        var newHref = iframe.contentWindow.location.href;

        if (newHref !== lastDispatched) {
            callback(newHref);
            lastDispatched = newHref;
        }
    };

    var unloadHandler = function () {
        // Timeout needed because the URL changes immediately after
        // the `unload` event is dispatched.
        setTimeout(dispatchChange, 0);
    };

    function attachUnload() {
        // Remove the unloadHandler in case it was already attached.
        // Otherwise, there will be two handlers, which is unnecessary.
        iframe.contentWindow.removeEventListener("unload", unloadHandler);
        iframe.contentWindow.addEventListener("unload", unloadHandler);
    }

    iframe.addEventListener("load", function () {
        attachUnload();

        // Just in case the change wasn't dispatched during the unload event...
        dispatchChange();
    });

    attachUnload();
}

// Usage:
iframeURLChange(iframe, function (newURL) {
    console.log("URL changed:", newURL);
});
