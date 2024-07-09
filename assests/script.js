// API key
const apiKey = "9ad181ccac33af9759bb52f96e34e1cf";

// Variables
const citySearch = document.querySelector("#citySearch");
const searchButton = document.querySelector(".searchButton");
const searchHistory = document.querySelector(".searchHistory");
const weatherForecast = document.querySelector(".weatherToday");
const renderCards = document.querySelector(".renderCards");

// Function to fetch weather data for a city
function getCity(city) {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
        renderWeather(data);
        saveSearches(city);
        getForecast(city);
    })
    .catch((error) => {
        console.log("Error fetching data: ", error);
        alert("Location not found: " + city);
    });
}

// Event listener for the search button
searchButton.addEventListener("click", function() {
    const city = citySearch.value;
    getCity(city);
});
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

    if( !data.main || !data.weather || !data.weather[0]) {
        console.error("Error in fetching data:", data);
        return;
    }

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
            <p>Temp: </br>${tempF.toFixed(2)}°F</p>
            <p>Wind: </br>${forecast.wind.speed} MPH</p>
            <p>Humidity: </br>${forecast.main.humidity}%`;

        renderCards.appendChild(card);
    }
};

// local storage
function saveSearches(city) {
    const searchHistoryData = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!searchHistoryData.includes(city)) {
        searchHistoryData.unshift(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistoryData));
        renderCityBtn(city);
    }
}

//search history
function renderCityBtn(city) {
    const currentBtn = Array.from(
        searchHistory.querySelectorAll("button")).find((btn) => btn.textContent === city);

        if (!currentBtn) {
            const btn = document.createElement("button");
            btn.textContent = city;
            btn.className = "btn m-2 btn-primary cityButton";
            btn.setAttribute("data-city", city);
            btn.addEventListener("click", () => {
                getCity(city);
                getForecast(city);
            });
            searchHistory.prepend(btn);
        }
    }

    //search btn
    searchButton.addEventListener("click", (event) => {
        event.preventDefault();
        const city = citySearch.value.trim();
        if (city) {
            renderCityBtn(city);
            getCity(city);
            getForecast(city);
            citySearch.value = "";
        } else {
            alert("enter a city to search.");
    }
});

function rendersearchHistory() {
    const searchHistoryData = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistoryData.forEach((city) => {
        renderCityBtn(city);
    });
 }