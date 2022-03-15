export default function () {
    var getGamepadsStore = [];
    const iframeElem = document.createElement("iframe");
    iframeElem.src = "./gamepadIframe.html";
    document.body.appendChild(iframeElem);
    window.addEventListener("message", (event) => {
      const msgData = event.data;
      if (msgData.source != "gamepad_iframe") return;
      // handle events
  
      console.log(msgData);
      if (msgData.event === "iframeReady") {
        console.log("gamepadFrameReady");
      } else if (msgData.event === "gamepadConnected") {
        const event = new Event("gamepadconnected");
        Object.assign(event, msgData.eventData);
        window.dispatchEvent(event);
      } else if (msgData.event === "gamepadDisconnected") {
        const event = new Event("gamepaddisconnected");
        Object.assign(event, msgData.eventData);
        window.dispatchEvent(event);
      } else if (msgData.event === "gamepadUpdate") {
        // if (!(getGamepadsStore[0])) getGamepadsStore.push(msgData.eventData);
        // else getGamepadsStore[0] === msgData.eventData;
      }
    });
    navigator.getGamepads = () => {
      // if (getGamepadsStore.length > 0) console.log(getGamepadsStore);
      return getGamepadsStore;
    };
  }