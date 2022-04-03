export const handleRovMessage = (message) => {
    console.log("Got ROV Message:", message);
}

export const sendRovMessage = (message) => {
    return (callback, onReceive) => {
        console.log("handleROVMessage: ", message);
    }
}