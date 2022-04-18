// import { showToastMessage } from "./ui"

// function makeJsonApiRequest(url) {
//     return fetch(url).then((response) => {
//         console.log(response)
//         return response.text()
//     }).then((responseText) => {
//         if (!responseText) {
//             throw Error("Got no response from rov")
//         }
//         try {
//             responseObject = JSON.parse(responseText)
//         } catch (e) {
//             throw Error("Got invalid JSON from rov: " + responseText)
//         }
//         if (responseObject['status'] != 'ok') {
//             throw Error(result['message'])
//         }
//         return responseObject
//     }).catch((e) => {
//         console.error(e)
//         showToastMessage("Click this message to view full error...", () => {
//             window.open().document.write(e.toString())
//         })
//         showToastMessage("Error: " + e.toString().substring(0, 60))
//         throw Error(e);
//     })
// }

// function makeJsonApiRequestThroughWebrtc(url) {
//     then((responseText) => {
//         if (!responseText) {
//             throw Error("Got no response from rov")
//         }
//         try {
//             responseObject = JSON.parse(responseText)
//         } catch (e) {
//             throw Error("Got invalid JSON from rov: " + responseText)
//         }
//         if (responseObject['status'] != 'ok') {
//             throw Error(result['message'])
//         }
//         return responseObject
//     }).catch((e) => {
//         console.error(e)
//         showToastMessage("Click this message to view full error...", () => {
//             window.open().document.write(e.toString())
//         })
//         showToastMessage("Error: " + e.toString().substring(0, 60))
//         throw Error(e);
//     })
// }

// function makeROVApiRequest(action) {
//     return makeJsonApiRequest("/api/" + action)
// }
