
const details = document.querySelector("#confirmation-details");
const params = new URLSearchParams(window.location.search);

const fields = [
  ["name", "Your name"],
  ["occasion", "Occasion"],
  ["flower", "Flower"],
  ["color", "Preferred color"],
  ["recipient", "Recipient"],
  ["message", "Personal message"],
  ["timestamp", "Submission date and time"]
];

fields.forEach(([key, label]) => {
  const value = params.get(key);

  if (!value) return;

  const item = document.createElement("div");
  item.className = "confirmation-item";

  const term = document.createElement("dt");
  term.textContent = label;

  const description = document.createElement("dd");

  if (key === "timestamp") {
    const parsedDate = new Date(value);
    description.textContent = Number.isNaN(parsedDate.getTime())
      ? value
      : parsedDate.toLocaleString();
  } else {
    description.textContent = value;
  }

  item.append(term, description);
  details.appendChild(item);
});

if (!details.children.length) {
  details.innerHTML = `
    <div class="confirmation-item">
      <dt>No submission found</dt>
      <dd>Please visit the bouquet page to create your floral story.</dd>
    </div>
  `;
}
