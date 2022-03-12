// test for ssl / https secure connection by attempting to load a script over https which sets the global variable sslCertTrusted
export function isHttpsAvailable(call) {
    // make sure the /sslTest.js script exists beforehand!
    return new Promise((resolve, reject) => {
        if (location.protocol.includes('https')) {
            resolve(true)
        } else {
            
            // otherwise try to test this
            window.sslCertTrusted = false;
            const sslTestCallback = () => {
                if (window.sslCertTrusted) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }

            try {
                var sslTestScript = document.createElement('script');
                sslTestScript.src = 'https://' + window.location.host + '/sslTest.js';
                document.body.appendChild(sslTestScript);
                sslTestScript.addEventListener('load', sslTestCallback);
                sslTestScript.addEventListener('error', sslTestCallback);
            } catch (e) {
                console.log(e);
                sslTestCallback()
            }
        }
    })
}

export function switchToHttpsIfAvailable() {
    isHttpsAvailable().then(function (httpsAvailable) {
        if (confirm("Game controller support may only work if this page is accessed over an ssl (aka: https://) secure connection. Switch to secure connection?")) {
            if (httpsAvailable) {
                // redirect to https:// (ie secure ssl)
                location.protocol = 'https:'
            } else {
                var m = `Your browser will say a warning message about insecure connection because of a self-signed certificate.
                        In firefox: Click advanced, then 'accept risk' or 'proceede anyway'.
                        In Chrome: type 'thisisunsafe' on the warning page (without quotes)`
                if (confirm(m)) {
                    // redirect to https:// (ie secure ssl)
                    location.protocol = 'https:';
                }
            }
        }
    })
}
