//api key
const apiKey = "9ad181ccac33af9759bb52f96e34e1cf";

//variables
const userCity = document.querySelector("#city-search");
const searchButton = document.querySelector(".searchBtn");
const searchHistory = document.querySelector(".searchHistory");
const weatherForecast = document.querySelector(".weatherToday");
const renderCards = document.querySelector(".renderCards");

searchHistory();

//fetch request
function getCity(city) {
    const queryURL = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(queryURL)

    .then((response) => response.json())
    .then ((data) => {
        displayWeather(data);
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
    const temp = (data.main.temp - 306.3) * 1.8 + 32;

    weatherForecast.innerHTML = `
        <h1 class="fw-bold m-2">${data.name} (${liveDate})</h1>
        <p class="m-2">Temperature: ${temp.toFixed(2)} °F
        </br>Wind Speed: ${data.wind.speed} MPH 
        </br>Humidity: ${data.main.humidity}%</p>`;
 
    }




//search history
function renderCityBtn(city) {
    const currentBtn = Array.from(
        searchHistory.querySelectorAll("button")).find((btn) => btn.textContent === city);

        if (!currentBtn) {
            const btn = document.createElement("button");
            btn.textContent = city;
            btn.className = "btn m-2 btn-primary cityButton";
            button.setAttribute("data-city", city);
            button.addEventListener("click", () => {
                getCity(city);
                retrieveForecast(city);
            });
            cityHistory.prepend(button);
        }
    }

