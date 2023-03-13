import { getMyIpGeolocation } from "./geolocation";
import { connectToLivekit } from "./livekit";


const urlParams = new URLSearchParams(location.search);
connectToLivekit({
    ForceLocal: (urlParams.get("ForceLocal") || "").toLowerCase() === 'true',
    RovRoomName: urlParams.get("RovRoomName"),
    CloudAPIKey: urlParams.get("CloudAPIKey"),
    CloudSecretKey: urlParams.get("CloudSecretKey"),
    LocalAPIKey: urlParams.get("LocalAPIKey"),
    LocalSecretKey: urlParams.get("LocalSecretKey"),
}).then(() => { console.log('connected?'); });

// console.log(getFrontendAccessToken(urlParams.get("CloudAPIKey"), urlParams.get("CloudSecretKey"), "PERSON" + Date.now().toString()))
