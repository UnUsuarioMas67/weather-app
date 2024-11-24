const ICONS = {
  "clear-day": require("../images/clear-day.svg"),
  "clear-night": require("../images/clear-night.svg"),
  cloudy: require("../images/cloudy.svg"),
  fog: require("../images/fog.svg"),
  hail: require("../images/hail.svg"),
  "partly-cloudy-day": require("../images/partly-cloudy-day.svg"),
  "partly-cloudy-night": require("../images/partly-cloudy-night.svg"),
  "rain-snow-showers-day": require("../images/rain-snow-showers-day.svg"),
  "rain-snow-showers-night": require("../images/rain-snow-showers-night.svg"),
  "rain-snow": require("../images/rain-snow.svg"),
  rain: require("../images/rain.svg"),
  "showers-day": require("../images/showers-day.svg"),
  "showers-night": require("../images/showers-night.svg"),
  sleet: require("../images/sleet.svg"),
  "snow-showers-day": require("../images/snow-showers-day.svg"),
  "snow-showers-night": require("../images/snow-showers-night.svg"),
  "thunder-rain": require("../images/thunder-rain.svg"),
  "thunder-showers-day": require("../images/thunder-showers-day.svg"),
  "thunder-showers-night": require("../images/thunder-showers-night.svg"),
  thunder: require("../images/thunder.svg"),
  wind: require("../images/wind.svg"),
};

const getIcon = function (key) {
  return ICONS[key];
};

export { getIcon };
