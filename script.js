const apiKey = "38fa122b89ce4c2b4bc8018d2477c255";
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const locationDisplay = document.getElementById("location");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeatherData(city);
  } else {
    alert("Enter city name!");
  }
});

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (response.status === 404) {
      alert("Can not find the city");
      return;
    }

    if (!response.ok) {
      throw new Error("Unable to retrieve weather data");
    }

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeatherData(data) {
  const { name, main, weather } = data;
  
  // Location with icon
  locationDisplay.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${name}`;
  
  // Temperature with icon
  temperatureDisplay.innerHTML = `<i class="fas fa-thermometer-half"></i> ${main.temp}°C`;

  // Description with dynamic icon based on weather condition
  const weatherCondition = weather[0].main.toLowerCase();
  let iconClass = "fas fa-cloud-sun"; // Default icon

  switch (weatherCondition) {
    case "clear":
      iconClass = "fas fa-sun";
      break;
    case "clouds":
      iconClass = "fas fa-cloud";
      break;
    case "rain":
      iconClass = "fas fa-cloud-showers-heavy";
      break;
    case "snow":
      iconClass = "fas fa-snowflake";
      break;
    case "thunderstorm":
      iconClass = "fas fa-bolt";
      break;
  }

  descriptionDisplay.innerHTML = `<i class="${iconClass}"></i> ${weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}`;
}
