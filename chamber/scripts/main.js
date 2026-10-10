const visitMessage = document.querySelector("#visit-message");

if (visitMessage) {
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();

    if (lastVisit === null) {
        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const elapsedMilliseconds = currentVisit - Number(lastVisit);
        const daysSinceVisit = Math.floor(
            elapsedMilliseconds / millisecondsPerDay
        );

        if (daysSinceVisit === 0) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayWord = daysSinceVisit === 1 ? "day" : "days";

            visitMessage.textContent =
                `You last visited ${daysSinceVisit} ${dayWord} ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit.toString());
}