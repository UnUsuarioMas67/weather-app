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
const unitSwitchBtn = document.querySelector("#unit-switch .unit-switch-btn");

let useMetric = true;
let latestSearch = "";

searchBtn.addEventListener("click", () => {
  performSearch(searchInput.value);
  latestSearch = searchInput.value;
});

unitSwitchBtn.addEventListener("click", () => {
  useMetric = !useMetric;
  unitSwitchBtn.classList.remove("metric", "us");
  unitSwitchBtn.classList.add(useMetric ? "metric" : "us");

  if (latestSearch !== "") {
    performSearch(latestSearch);
  }
})

const performSearch = async function(query) {
  const weather = await fetchWeatherData(query, useMetric ? "metric" : "us");

  renderCurrentWeather(weather);
  renderHourlyWeather(weather);
  renderForecast(weather);
  console.log(weather);
}

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

  for (const h of data) {
    const item = createElement("div", "hourly-weather-item");

    const weatherTime = createElement("p", "hourly-weather-time");
    weatherTime.textContent = h.time;

    const iconContainer = createElement("div", "hourly-weather-icon");
    iconContainer.append(
      createElement("img", "", {
        src: getIcon(h.icon),
        alt: h.icon,
        width: "56",
      }),
    );

    const weatherTemp = createElement("p", "hourly-temp");
    weatherTemp.textContent = temperature(h.temp);

    item.append(weatherTime, iconContainer, weatherTemp);

    hourlyWeatherSection.append(item);
  }
};

const renderForecast = (weather) => {
  const data = get6DaysForecast(weather);

  const forecastContainer = document.querySelector("#forecast > .container");
  forecastContainer.textContent = "";

  for (const f of data) {
    const item = createElement("div", "forecast-item");

    const date = createElement("p", "forecast-date");
    date.textContent = f.formattedDate;

    const iconContainer = createElement("div", "forecast-icon");
    iconContainer.append(
      createElement("img", "", {
        src: getIcon(f.icon),
        alt: f.icon,
        width: "48",
      }),
    );

    const tempRange = createElement("p", "forecast-temp-range");
    tempRange.textContent = `Min: ${temperature(f.tempmin)} | Max: ${temperature(f.tempmax)}`;

    item.append(date, iconContainer, tempRange);

    forecastContainer.append(item);
  }
};
