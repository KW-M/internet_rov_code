/// @ts-ignore
import swFile from "../serviceworker?url"

const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        console.log("serviceWorker swFile", swFile)
        try {
            navigator.serviceWorker.getRegistration().then(function (registration) {
                if (registration) {
                    console.log("SW Already Registered, Unregistering")
                    registration.unregister();
                    // window.location.reload();
                }
            });
            const registration = await navigator.serviceWorker.register(swFile, {
                // scope: "/",
            });
            if (registration.installing) {
                console.log("Service worker installing");
            } else if (registration.waiting) {
                console.log("Service worker installed");
            } else if (registration.active) {
                console.log("Service worker active");
            }
        } catch (error) {
            console.error(`SW Registration failed with ${error}`);
        }
    }
};
