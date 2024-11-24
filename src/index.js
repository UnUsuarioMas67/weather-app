import "./style.css";
import {
  fetchWeatherData,
  get24HourWeather,
  getCurrentWeather,
  get6DaysForecast,
} from "./js/weather.js";
import { getIcon } from "./js/icons.js";
import { createElement } from "./js/create-elem.js";

const searchBtn = document.querySelector("#search-bar .search-btn");
const searchInput = document.querySelector("#search-input");

let useMetric = true;

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value;
  const weather = await fetchWeatherData(query, useMetric ? "metric" : "us");

  renderCurrentWeather(weather);
  renderHourlyWeather(weather);
  console.log(weather);
});

const temperature = function (temp) {
  return `${temp}${useMetric ? "ºC" : "ºF"}`;
};

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

  currentTemp.textContent = temperature(temp);
  tempminElem.textContent = temperature(tempmin);
  tempmaxElem.textContent = temperature(tempmax);

  conditionElem.textContent = conditions;
};

const renderHourlyWeather = (weather) => {
  const data = get24HourWeather(weather);

  const hourlyWeatherSection = document.querySelector("#hourly-weather");
  hourlyWeatherSection.textContent = "";

  for (const hour of data) {
    const item = createElement("div", "hourly-weather-item");

    const weatherTime = createElement("p", "hourly-weather-time");
    weatherTime.textContent = hour.time;

    const iconContainer = createElement("div", "hourly-weather-icon");
    iconContainer.append(
      createElement("img", "", {
        src: getIcon(hour.icon),
        alt: hour.icon,
        width: "56",
      }),
    );

    const weatherTemp = createElement("p", "hourly-temp");
    weatherTemp.textContent = temperature(hour.temp);

    item.append(weatherTime, iconContainer, weatherTemp);

    hourlyWeatherSection.append(item);
  }
};
