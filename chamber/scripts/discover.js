
const visitMessage = document.querySelector("#visit-message");
const storageKey = "cajamarcaDiscoverLastVisit";

if (visitMessage) {
    const currentVisit = Date.now();
    const previousVisit = Number(localStorage.getItem(storageKey));

    if (!previousVisit || !Number.isFinite(previousVisit)) {
        visitMessage.textContent =
            "Welcome! This is your first visit. Discover the places that make Cajamarca special.";
    } else {
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const elapsedTime = Math.max(0, currentVisit - previousVisit);
        const daysElapsed = Math.floor(elapsedTime / millisecondsPerDay);

        if (daysElapsed === 0) {
            visitMessage.textContent =
                "You last visited today. Enjoy exploring Cajamarca!";
        } else if (daysElapsed === 1) {
            visitMessage.textContent =
                "You last visited 1 day ago. Welcome back!";
        } else {
            visitMessage.textContent =
                `You last visited ${daysElapsed} days ago. Welcome back!`;
        }
    }

    localStorage.setItem(storageKey, String(currentVisit));
}