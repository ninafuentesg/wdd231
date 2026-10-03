
// ======================================
// MOBILE NAVIGATION
// ======================================

const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});


// ======================================
// FOOTER DATE
// ======================================

document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    document.lastModified;


// ======================================
// DISPLAY FORM INFORMATION
// ======================================

const params = new URLSearchParams(window.location.search);

const fields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "organization"
];

fields.forEach(field => {
    const value = params.get(field) || "Not provided";
    document.querySelector(`#display-${field}`).textContent = value;
});


// ======================================
// DISPLAY TIMESTAMP
// ======================================

const timestamp = params.get("timestamp");
const timestampDisplay = document.querySelector("#display-timestamp");

if (timestamp) {
    const date = new Date(timestamp);

    timestampDisplay.textContent = Number.isNaN(date.getTime())
        ? "Not available"
        : date.toLocaleString();
} else {
    timestampDisplay.textContent = "Not available";
}