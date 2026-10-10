
const visitMessage = document.querySelector("#visit-message");

if (visitMessage) {
    const storageKey = "cajamarcaDiscoverLastVisit";
    const now = Date.now();
    const lastVisit = localStorage.getItem(storageKey);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    if (lastVisit === null) {
        visitMessage.textContent =
            "Welcome! Let us help you discover Cajamarca.";
    } else {
        const elapsedMilliseconds = now - Number(lastVisit);

        const daysSinceVisit = Math.floor(
            elapsedMilliseconds / millisecondsPerDay
        );

        if (!Number.isFinite(Number(lastVisit)) ||
            Number(lastVisit) > now ||
            daysSinceVisit < 0) {

            visitMessage.textContent =
                "Welcome back! Let us help you discover Cajamarca.";

        } else if (daysSinceVisit === 0) {
            visitMessage.textContent =
                "Welcome back! You visited today.";

        } else if (daysSinceVisit === 1) {
            visitMessage.textContent =
                "You last visited 1 day ago.";

        } else {
            visitMessage.textContent =
                `You last visited ${daysSinceVisit} days ago.`;
        }
    }

    localStorage.setItem(storageKey, String(now));
}



const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}