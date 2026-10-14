
const grid = document.querySelector("#flower-grid");
const count = document.querySelector("#flower-count");
const searchInput = document.querySelector("#flower-search");
const colorFilter = document.querySelector("#color-filter");
const occasionFilter = document.querySelector("#occasion-filter");
const modal = document.querySelector("#flower-modal");
const modalClose = document.querySelector("#modal-close");

let flowers = [];
let favorites = [];

try {
  const saved = JSON.parse(
    localStorage.getItem("secretGardenFavorites") || "[]"
  );

  favorites = Array.isArray(saved) ? saved : [];
} catch {
  favorites = [];
}

function saveFavorites() {
  try {
    localStorage.setItem(
      "secretGardenFavorites",
      JSON.stringify(favorites)
    );
  } catch {
    // The flower guide remains usable if storage is unavailable.
  }
}

function getColors(flower) {
  return flower.colors || [flower.color || "Unspecified"];
}

function makeCard(flower) {
  const article = document.createElement("article");
  article.className = "flower-card";

  const favorite = favorites.includes(flower.id);
  const colors = getColors(flower);

  article.innerHTML = `
    <img
      src="${flower.image}"
      alt="${flower.name}"
      width="600"
      height="450"
      loading="lazy"
      decoding="async"
    >
    <div class="flower-card-content">
      <p class="eyebrow">Discover this bloom</p>
      <h2>${flower.name}</h2>
      <p class="botanical-name">${flower.botanical}</p>
      <p class="meaning">${flower.meaning}</p>
      <p>${flower.description}</p>
      <p class="color-list">
        <strong>Available colors:</strong> ${colors.join(", ")}
      </p>
      <span class="tag">${flower.occasion}</span>
      <div class="card-actions">
        <button class="text-button details-button" type="button">
          Explore meanings
        </button>
        <button
          class="favorite-button"
          type="button"
          aria-pressed="${favorite}"
          aria-label="${favorite ? "Remove" : "Add"} ${flower.name} ${favorite ? "from" : "to"} favorites"
        >${favorite ? "♥" : "♡"}</button>
      </div>
    </div>
  `;

  article.querySelector(".details-button").addEventListener(
    "click",
    () => openFlowerModal(flower)
  );

  article.querySelector(".favorite-button").addEventListener(
    "click",
    () => {
      if (favorites.includes(flower.id)) {
        favorites = favorites.filter((id) => id !== flower.id);
      } else {
        favorites = [...favorites, flower.id];
      }

      saveFavorites();
      renderFlowers();
    }
  );

  return article;
}

function renderFlowers() {
  if (!grid || !searchInput || !colorFilter || !occasionFilter) {
    return;
  }

  const term = searchInput.value.trim().toLowerCase();
  const selectedColor = colorFilter.value;
  const selectedOccasion = occasionFilter.value;

  const filtered = flowers.filter((flower) => {
    const colors = getColors(flower);

    const searchable = [
      flower.name,
      flower.botanical,
      flower.meaning,
      flower.description,
      flower.western,
      flower.eastern,
      flower.occasion,
      ...colors
    ].join(" ").toLowerCase();

    return searchable.includes(term)
      && (!selectedColor || colors.includes(selectedColor))
      && (!selectedOccasion || flower.occasion === selectedOccasion);
  });

  grid.replaceChildren();

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent =
      "No flowers match your search. Try a different color or keyword.";
    grid.appendChild(empty);
  } else {
    filtered.forEach((flower) => {
      grid.appendChild(makeCard(flower));
    });
  }

  if (count) {
    count.textContent =
      `${filtered.length} of ${flowers.length} flowers shown`;
  }
}

function openFlowerModal(flower) {
  const image = document.querySelector("#modal-image");

  image.src = flower.image;
  image.alt = flower.name;
  image.loading = "lazy";
  image.decoding = "async";

  document.querySelector("#modal-botanical").textContent =
    flower.botanical;
  document.querySelector("#modal-title").textContent =
    flower.name;
  document.querySelector("#modal-meaning").textContent =
    `Traditional meaning: ${flower.meaning}`;
  document.querySelector("#modal-description").textContent =
    flower.description;
  document.querySelector("#modal-color").textContent =
    `Colors: ${getColors(flower).join(", ")}`;
  document.querySelector("#modal-occasion").textContent =
    `Suggested occasion: ${flower.occasion}`;

  const western = document.querySelector("#modal-western");
  const eastern = document.querySelector("#modal-eastern");

  if (western) {
    western.textContent = flower.western || "No additional information available.";
  }

  if (eastern) {
    eastern.textContent = flower.eastern || "No additional information available.";
  }

  modal.showModal();
}

if (modalClose && modal) {
  modalClose.addEventListener("click", () => modal.close());

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
}

searchInput?.addEventListener("input", renderFlowers);
colorFilter?.addEventListener("change", renderFlowers);
occasionFilter?.addEventListener("change", renderFlowers);

async function loadFlowers() {
  try {
    const response = await fetch("data/flowers.json");

    if (!response.ok) {
      throw new Error("Unable to load flower data.");
    }

    const data = await response.json();

    if (!Array.isArray(data.flowers)) {
      throw new Error("Invalid flower data.");
    }

    flowers = data.flowers;

    const params = new URLSearchParams(window.location.search);
    const selectedFlower = params.get("flower");
    const selectedOccasion = params.get("occasion");

    if (selectedOccasion) {
      const matchingFlower = flowers.find(
        (flower) => flower.occasion === selectedOccasion
      );

      if (matchingFlower) {
        occasionFilter.value = selectedOccasion;
      }
    }

    renderFlowers();

    if (selectedFlower) {
      const flower = flowers.find(
        (item) => item.id === selectedFlower
      );

      if (flower) {
        openFlowerModal(flower);
      }
    }
  } catch {
    if (count) {
      count.textContent =
        "We could not load the flower guide. Please try again later.";
    }

    if (grid) {
      grid.replaceChildren();
    }
  }
}

loadFlowers();

