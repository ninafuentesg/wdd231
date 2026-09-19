const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");


async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        displayMembers(data.members);

    } catch (error) {

        console.error("Unable to load members:", error);

        membersContainer.innerHTML = `
            <p>Unable to load the business directory.</p>
        `;
    }
}


function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        const membershipName = getMembershipName(member.membership);

        card.innerHTML = `
            <img
                class="member-image"
                src="images/negocios/${member.image}"
                alt="${member.name} business"
                loading="lazy"
            >

            <div class="member-content">

                <h3>${member.name}</h3>

                <p>${member.description}</p>

                <p>${member.address}</p>

                <p>${member.phone}</p>

                <span class="member-level">
                    ${membershipName}
                </span>

                <br>

                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Website
                </a>

            </div>
        `;

        membersContainer.appendChild(card);
    });
}


function getMembershipName(level) {

    if (level === 3) {
        return "⭐ Gold Member";
    }

    if (level === 2) {
        return "Silver Member";
    }

    return "Member";
}


/* GRID / LIST */

gridButton.addEventListener("click", () => {

    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});


listButton.addEventListener("click", () => {

    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});


/* MOBILE MENU */

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

});


/* FOOTER */

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;


/* LOAD MEMBERS */

getMembers();