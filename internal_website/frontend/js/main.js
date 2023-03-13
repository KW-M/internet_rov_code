import { connectToLivekitRoom, listLivekitRooms } from "./livekit";
import { waitfor } from "../../js/util"

const urlParams = new URLSearchParams(location.search);
const rovChooserElem = document.getElementById("rov_chooser")
let rooms = [];



async function start() {
    console.log("Starting")
    while (true) {
        const rooms = await listLivekitRooms()
        if (rooms.length > 0) {
            rovChooserElem.innerHTML = "";
            rooms.forEach(room => {
                const button = document.createElement("button");
                const { accessToken } = JSON.parse(room.metadata)
                console.log("room " + room.name + " accessToken", accessToken)
                button.innerText = "Connect to " + room.name;
                button.onclick = () => { connectToLivekitRoom(room.name, accessToken); }
                rovChooserElem.appendChild(button);
            });
        } else {
            rovChooserElem.innerHTML = "Searching...";
        }
        await waitfor(1000);
    }
}
start()
