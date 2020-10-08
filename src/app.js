let now = new Date();
let currentTimeDate = document.querySelector("#current-time-date");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

currentTimeDate.innerHTML = `${hours}:${minutes}, ${day} ${month} ${date}, ${year}`;

function displayWeatherCondition(response) {
  document.querySelector("#current-city-displayed").innerHTML =
    response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "d077de28ca0d9666603e584385e14f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "d077de28ca0d9666603e584385e14f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#change-city-input").value;
  search(city);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#change-city-form");
searchForm.addEventListener("submit", handleSubmit);
let searchButton = document.querySelector("#change-city-button");
searchForm.addEventListener("click", handleSubmit);

search("New York");
