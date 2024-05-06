function displayWeather(response) {
  const weatherData = response.data;
  const temperatureElement = document.querySelector("#temperature");
  const cityElement = document.querySelector("#city");
  const descriptionElement = document.querySelector("#description");
  const humidityElement = document.querySelector("#humidity");
  const windSpeedElement = document.querySelector("#wind-speed");
  const timeElement = document.querySelector("#present-time");
  const iconElement = document.querySelector("#icon");

  cityElement.textContent = weatherData.city;
  timeElement.textContent = formatDate(new Date(weatherData.time * 1000));
  descriptionElement.textContent = weatherData.condition.description;
  humidityElement.textContent = `${weatherData.temperature.humidity}%`;
  windSpeedElement.textContent = `${weatherData.wind.speed} km/h`;
  temperatureElement.textContent = Math.round(weatherData.temperature.current);
  iconElement.innerHTML = `<img src="${weatherData.condition.icon_url}" alt="${weatherData.condition.description}" class="weather-app-icon" />`;
}

function formatDate(date) {
  const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  const hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  const apiKey = "1e3ta0b12c0doee6ef46f9943cf90f96";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(displayWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-input");
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== "") {
    searchCity(searchTerm);
  } else {
    const errorMessage = "Please enter a city name.";
    displayError(errorMessage);
  }
}

const searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
 searchCity("united kingdom");
