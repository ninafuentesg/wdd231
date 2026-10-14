
const bouquetForm = document.querySelector("#bouquet-form");
const flowerSelect = document.querySelector("#flower-choice");
const occasionSelect = document.querySelector("#occasion");
const timestampInput = document.querySelector("#timestamp");

async function populateFlowerOptions() {
  try {
    const response = await fetch("data/flowers.json");

    if (!response.ok) {
      throw new Error("Could not load the flowers.");
    }

    const data = await response.json();

    data.flowers.forEach((flower) => {
      const option = document.createElement("option");
      option.value = flower.name;
      option.textContent = `${flower.name} — ${flower.meaning}`;
      flowerSelect.appendChild(option);
    });

    const savedOccasion = localStorage.getItem("secretGardenOccasion");

    if (
      savedOccasion &&
      [...occasionSelect.options].some((option) => option.value === savedOccasion)
    ) {
      occasionSelect.value = savedOccasion;
    }
  } catch {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Flower options could not be loaded";
    option.disabled = true;
    flowerSelect.appendChild(option);
  }
}

if (bouquetForm) {
  timestampInput.value = new Date().toISOString();

  bouquetForm.addEventListener("submit", () => {
    timestampInput.value = new Date().toISOString();
  });

  populateFlowerOptions();
}
