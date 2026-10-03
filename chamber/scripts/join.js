
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
// FORM TIMESTAMP
// ======================================

const timestampField = document.querySelector("#timestamp");

timestampField.value = new Date().toISOString();


// ======================================
// MEMBERSHIP MODALS
// ======================================

const learnMoreLinks = document.querySelectorAll(".learn-more");

learnMoreLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const modalId = link.dataset.modal;
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
        }
    });
});


// Close modal buttons
document.querySelectorAll(".close-modal").forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});


// Close modal when clicking outside its content
document.querySelectorAll(".benefit-modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.close();
        }
    });
});