// ======================================
// MOBILE NAVIGATION
// ======================================

const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");
});


// ======================================
// FOOTER DATE
// ======================================

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;


// ======================================
// WEATHER
// ======================================

const apiKey = "7a07a7d84271cff0b974fb92c594256e";

// Cajamarca coordinates
const latitude = -7.1617;
const longitude = -78.5128;

const weatherURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=en&appid=${apiKey}`;


async function getWeather() {

    try {

        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("Weather data could not be loaded.");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {

        console.error(error);

        document.querySelector("#current-weather").innerHTML =
            "<p>Weather information is currently unavailable.</p>";

    }

}


function displayWeather(data) {

    const current = data.list[0];

    const temperature = Math.round(current.main.temp);
    const description = current.weather[0].description;
    const icon = current.weather[0].icon;

    document.querySelector("#current-weather").innerHTML = `

        <div class="weather-main">

            <img
                class="weather-icon"
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
            >

            <div>
                <div class="temperature">${temperature}°C</div>
                <p class="weather-description">${description}</p>
            </div>

        </div>

        <p>Humidity: ${current.main.humidity}%</p>
    `;




    const forecastContainer = document.querySelector("#forecast");

    forecastContainer.innerHTML = "";

    const forecastDays = [];
    const today = new Date().getDate();

    data.list.forEach(item => {

        const date = new Date(item.dt * 1000);
        const day = date.getDate();

        if (day !== today && !forecastDays.some(f => f.day === day)) {

            forecastDays.push({
                day: day,
                date: date,
                temp: Math.round(item.main.temp),
                icon: item.weather[0].icon,
                description: item.weather[0].description
            });

        }

    });


    forecastDays.slice(0, 3).forEach(day => {

        const dayName = day.date.toLocaleDateString("en-US", {
            weekday: "short"
        });

        forecastContainer.innerHTML += `

            <div class="forecast-day">

                <h4>${dayName}</h4>

                <img
                    src="https://openweathermap.org/img/wn/${day.icon}.png"
                    alt="${day.description}"
                >

                <p class="forecast-temp">${day.temp}°C</p>

            </div>

        `;

    });

}


getWeather();


// ======================================
// MEMBER SPOTLIGHTS
// ======================================

async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(
                `Members data could not be loaded: ${response.status}`
            );
        }

        const data = await response.json();

        console.log("Members loaded:", data);

        displaySpotlights(data.members);

    } catch (error) {

        console.error("Member error:", error);

        document.querySelector("#spotlights").innerHTML =
            "<p>Business information is currently unavailable.</p>";
    }
}

function getMemberImagePath(imageName) {

    if (!imageName) {
        return "images/placeholder.jpg";
    }

    if (
        imageName.startsWith("images/") ||
        imageName.startsWith("./images/")
    ) {
        return imageName;
    }

    // If it only contains the file name
    return `images/${imageName}`;
}

function displaySpotlights(members) {

    // Only Gold (3) and Silver (2)
    const qualifiedMembers = members.filter(
        member =>
            member.membership === 2 ||
            member.membership === 3
    );


    // Shuffle the members randomly
    const shuffledMembers = [...qualifiedMembers].sort(
        () => Math.random() - 0.5
    );


    // Show 2 or 3 businesses
    const selectedMembers = shuffledMembers.slice(0, 3);


    const spotlightContainer =
        document.querySelector("#spotlights");

    spotlightContainer.innerHTML = "";


    selectedMembers.forEach(member => {

        const membershipName =
            member.membership === 3
                ? "Gold Member"
                : "Silver Member";


       spotlightContainer.innerHTML += `
    <article class="spotlight-card">

        <img
            src="images/negocios/${member.image}"
            alt="${member.name} logo"
            loading="lazy"
        >

        <h3>${member.name}</h3>

        <p>
            <strong>Phone:</strong>
            ${member.phone}
        </p>

        <p>
            <strong>Address:</strong>
            ${member.address}
        </p>

        <p>
            <strong>Website:</strong>
            <a
                href="${member.website}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Visit website
            </a>
        </p>

        <span class="membership">
            ${membershipName}
        </span>

    </article>
`;

    });

}


getMembers();