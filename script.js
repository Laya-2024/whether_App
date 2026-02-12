const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

// Navigation
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(sec => sec.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// Search weather
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      alert("City not found!");
      return;
    }
    const data = await response.json();
    displayWeather(data);
  } catch {
    alert("Error fetching weather data.");
  }
}

function displayWeather(data) {
  document.getElementById("city-name").textContent = data.name;
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("temperature").textContent = data.main.temp;
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("wind").textContent = data.wind.speed;
  document.getElementById("weather-icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.getElementById("weather-result").classList.remove("hidden");
}

// Location weather
const locBtn = document.getElementById("loc-btn");
locBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation not supported.");
  }
});

async function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    displayLocWeather(data);
  } catch {
    alert("Error fetching location weather.");
  }
}

function error() {
  alert("Unable to retrieve your location.");
}

function displayLocWeather(data) {
  document.getElementById("loc-city").textContent = data.name;
  document.getElementById("loc-desc").textContent = data.weather[0].description;
  document.getElementById("loc-temp").textContent = data.main.temp;
  document.getElementById("loc-humidity").textContent = data.main.humidity;
  document.getElementById("loc-wind").textContent = data.wind.speed;
  document.getElementById("loc-icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.getElementById("loc-weather").classList.remove("hidden");
}
