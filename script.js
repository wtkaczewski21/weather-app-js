const APIKey = "3abdf8a62ba801586deef0ea6aaa5351";

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", () => {
  const city = document.querySelector(".search-input").value;
  getWeather(city);
});

searchInput.addEventListener("keyup", (event) => {
  const city = document.querySelector(".search-input").value;
  if (event.key == "Enter") {
    getWeather(city);
  }
});

function getWeather(city) {
  if (city === "") return;

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      APIKey
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        document.querySelector(".weather404").classList.remove("not-found");
        document.querySelector(".weather-info").classList.add("hidden");
        return;
      }
      document.querySelector(".weather-info").classList.remove("hidden");
      document.querySelector(".weather404").classList.add("not-found");
      displayWeather(data);
    });
}

function displayWeather(data) {
  const city = document.querySelector(".search-input").value;
  const name = data.name;
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".temperature").innerText = temp.toFixed(0) + "℃";
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText =
    "Wind Speed: " + windSpeed.toFixed(1) + "km/h";
  document.body.style.background =
    'url("https://source.unsplash.com/1920x1080/?' + city + ',city") center';
}
