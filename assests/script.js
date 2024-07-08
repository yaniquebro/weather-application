//api key
const apiKey = 9ad181ccac33af9759bb52f96e34e1cf;

//variables
const userCity = document.querySelector("#city-search");
const searchButton = document.querySelector(".searchBtn");
const cityHistory = document.querySelector(".searchHistory");
const weatherForecast = document.querySelector(".weatherToday");
const renderCards = document.querySelector(".renderCards");

let city;

const queryURL = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

fetch(queryURL)