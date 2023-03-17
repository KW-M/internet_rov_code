

export function waitfor(millisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
    })
}

export function appendLog(...args: any[]) {
    console.log(...args)
    const txtElem = document.createElement('p');
    txtElem.innerText = args.map(arg => JSON.stringify(arg)).join(' | ');
    document.body.appendChild(txtElem)
}

export function getWebsocketURL(urlEndpoint: string, forceSSL: boolean = false) {
    return urlEndpoint.replace("http", "ws"); // works with https:// too because wss:// is the https version
}

export function buildQueryString(userQuery) {
    //store query parameters in a temporary variable
    const query: string[] = [];
    //loop through user query object
    for (var key in userQuery) {
        //encode the keys and values this is most necessary for search inputs
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(userQuery[key]));
    }
    //construct new URL
    let new_url = window.location.toString() + (query.length ? '?' + query.join('&') : '');
    return (new_url);
}
