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



