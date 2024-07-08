//api key
const apiKey = "9ad181ccac33af9759bb52f96e34e1cf";

//variables
const userCity = document.querySelector("#citySearch");
const searchButton = document.querySelector(".searchBtn");
const searchHistory = document.querySelector(".searchHistory");
const weatherForecast = document.querySelector(".weatherToday");
const renderCards = document.querySelector(".renderCards");

rendersearchHistory();

//fetch request
function getCity(city) {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(queryURL)

    .then((response) => response.json())
    .then ((data) => {
        renderWeather(data);
        saveSearches(city);
        getForecast(city);
    })

    .catch((error) => {
        console.log("Error fetching data: ", error);
        alert("Location not found" + city);

    });
}

// get forecast
const getForecast = (city) => {
    const forecastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(forecastQueryUrl)
        .then((response) => response.json())
        .then((data) => {
            renderForecast(data);
        })
        .catch((error) => {
            console.error("Error in fetching forecast:", error);
            alert("Data not found For." + city);
        });
};

const renderWeather = (data) => {
    let liveDate = new Date().toLocaleDateString();
    const temp = (data.main.temp - 273.15) * 1.8 + 32;

    weatherForecast.innerHTML = `
        <h1 class="fw-bold m-2">${data.name} (${liveDate})</h1>
        <p class="m-2">Temperature: ${temp.toFixed(2)} °F
        </br>Wind Speed: ${data.wind.speed} MPH 
        </br>Humidity: ${data.main.humidity}%</p>`;
    }

//render five day forecast
const renderForecast = function (data) {
    renderCards.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const forecast = data.list[i * 8];
        const date = new Date();
        date.setDate(date.getDate() + (i + 1));
        const tempF = (forecast.main.temp - 273.15) * 1.8 + 32;

        const card = document.createElement("div");
        card.classList.add("card", "m-3");
        card.innerHTML = `
        <h4>${date.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
        })}</h4> 
            <div>${createIcon.outerHTML}</div>
            <p>Temp: </br>${tempF.toFixed(2)}°F</p>
            <p>Wind: </br>${forecast.wind.speed} MPH</p>
            <p>Humidity: </br>${forecast.main.humidity}%`;

        renderCards.appendChild(card);
    }
};

// local storage
function saveSearches(city) {
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!searchHistory.includes(city)) {
        searchHistory.unshift(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        renderCityBtn(city);
    }
}

//search history
function renderCityBtn(city) {
    const currentBtn = Array.from(
        searchHistory.querySelectorAll("btn")).find((btn) => btn.textContent === city);

        if (!currentBtn) {
            const btn = document.createElement("button");
            btn.textContent = city;
            btn.className = "btn m-2 btn-primary cityButton";
            button.setAttribute("data-city", city);
            button.addEventListener("click", () => {
                getCity(city);
                getForecast(city);
            });
            searchHistory.prepend(button);
        }
    }

    //search btn
searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    const city = userCity.value.trim();
    if (city) {
        renderCityBtn(city);
        getCity(city);
        getForecast(city);
        userCity.value = "";
    } else { 
        alert("enter city to search");
    }
});

function rendersearchHistory() {
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistory.forEach((city) => {
        renderCityBtn(city);
    });
}


