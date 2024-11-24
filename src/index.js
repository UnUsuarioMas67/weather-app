import "./style.css";
import {
  fetchWeatherData,
  get24HourWeather,
  getCurrentWeather,
  get6DaysForecast,
} from "./js/weather.js";
import { getIcon } from "./js/icons.js";

const searchBtn = document.querySelector("#search-bar .search-btn");
const searchInput = document.querySelector("#search-input");

let useMetric = true;

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value;
  const weather = await fetchWeatherData(query, useMetric ? "metric" : "us");

  renderCurrentWeather(weather);
  console.log(weather);
});

const renderCurrentWeather = (weather) => {
  const cityName = document.querySelector("#current-weather .city-name");
  const currentDate = document.querySelector("#current-weather .current-date");
  const weatherIcon = document.querySelector(
    "#current-weather .current-weather-icon > img",
  );
  const currentTemp = document.querySelector("#current-weather .current-temp");
  const conditionElem = document.querySelector(
    "#current-weather .current-condition",
  );
  const tempminElem = document.querySelector(
    "#current-weather .current-temp-min",
  );
  const tempmaxElem = document.querySelector(
    "#current-weather .current-temp-max",
  );

  const { location, formattedDate, icon, temp, tempmin, tempmax, conditions } =
    getCurrentWeather(weather);

  cityName.textContent = location;
  currentDate.textContent = formattedDate;

  weatherIcon.src = getIcon(icon);
  weatherIcon.alt = icon;

  currentTemp.textContent = `${temp}${useMetric ? "ºC" : "ºF"}`;
  tempminElem.textContent = `${tempmin}${useMetric ? "ºC" : "ºF"}`;
  tempmaxElem.textContent = `${tempmax}${useMetric ? "ºC" : "ºF"}`;

  conditionElem.textContent = conditions;
};
