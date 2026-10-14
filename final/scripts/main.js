
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuButton.textContent = isOpen ? "×" : "☰";
  });
}

const yearElement = document.querySelector("#currentyear");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const modifiedElement = document.querySelector("#lastModified");
if (modifiedElement) {
  modifiedElement.textContent = document.lastModified;
}

const occasionForm = document.querySelector("#quick-occasion");

if (occasionForm) {
  occasionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const occasion = document.querySelector("#home-occasion").value;

    try {
      localStorage.setItem("secretGardenOccasion", occasion);
      window.location.href = "bouquet.html";
    } catch {
      window.location.href = "bouquet.html";
    }
  });
}
