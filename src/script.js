let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${day}`;
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minutes}`;

function displayDefaultWeather(response) {
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let cityForecast = document.querySelector("#city-forecast");
  let forecast = response.data.weather[0].description;
  cityForecast.innerHTML = `${forecast}`;

  let precipitation = document.querySelector("#details-precipitation");
  let precipitationDetails = response.data.main.humidity;
  precipitation.innerHTML = `${precipitationDetails}%`;

  let wind = document.querySelector("#details-wind");
  let windDetails = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windDetails}`;
}

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityName = document.querySelector("#city-name");
  let inputValueUpperCase =
    searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1);
  cityName.innerHTML = `${inputValueUpperCase}`;
  let cityUrl = searchInput.value.toLowerCase();

  let apiKey = "ab1f27fbaadfd901bfff8bb239240d0d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityUrl}&units=${unit}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(getWeather);
}

function getWeather(response) {
  console.log(response);
  let cityCurrentTemp = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.main.temp);
  cityCurrentTemp.innerHTML = `${temperature}°C`;

  let cityForecast = document.querySelector("#city-forecast");
  let forecast = response.data.weather[0].description;
  cityForecast.innerHTML = `${forecast}`;

  let precipitation = document.querySelector("#details-precipitation");
  let precipitationDetails = response.data.main.humidity;
  precipitation.innerHTML = `${precipitationDetails}%`;

  let wind = document.querySelector("#details-wind");
  let windDetails = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windDetails}`;
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCity);
}

function getCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ab1f27fbaadfd901bfff8bb239240d0d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(getCurrentCity);
}

function getCurrentCity(response) {
  console.log(response);
  let currentCity = document.querySelector("#city-name");
  currentCity.innerHTML = response.data.name;
  let currentTemp = document.querySelector("#current-temp");
  let currentTempRound = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${currentTempRound}°C`;
  let cityForecast = document.querySelector("#city-forecast");
  let forecast = response.data.weather[0].description;
  cityForecast.innerHTML = `${forecast}`;
  let precipitation = document.querySelector("#details-precipitation");
  let precipitationDetails = response.data.main.humidity;
  precipitation.innerHTML = `${precipitationDetails}%`;

  let wind = document.querySelector("#details-wind");
  let windDetails = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windDetails}`;
}

let cityUrl = "new york";
let apiKey = "ab1f27fbaadfd901bfff8bb239240d0d";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityUrl}&units=${unit}&appid=${apiKey}`;

axios.get(apiUrl).then(displayDefaultWeather);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

let currentCityButton = document.querySelector("#current-city");
currentCityButton.addEventListener("click", getPosition);

/*function showCelcius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "30°";
}

function showFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "86°";
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelcius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);*/
