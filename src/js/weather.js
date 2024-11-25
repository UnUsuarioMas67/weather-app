import {
  fromUnixTime as dateFromUnixTime,
  format as formatDate,
} from "date-fns";

const API_KEY = "HPBLYE9ZNT2US2HH8RP5DFP8X";

async function fetchWeatherResponse(location, unitGroup = "metric") {
  try {
    return await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}&unitGroup=${unitGroup}&elements=tempmax,tempmin,temp,conditions,description,datetime,datetimeEpoch,hours,icon&iconSet=icons2`,
      { mode: "cors" },
    );
  } catch (error) {
    console.log(error);
  }
}

function getCurrentWeather(weather) {
  const location = weather.resolvedAddress;
  const date = dateFromUnixTime(weather.currentConditions.datetimeEpoch);
  const formattedDate = formatDate(date, "EEEE',' MMM do");
  const icon = weather.currentConditions.icon;
  const temp = weather.currentConditions.temp;
  const tempmin = weather.days[0].tempmin;
  const tempmax = weather.days[0].tempmax;
  const conditions = weather.currentConditions.conditions;

  return {
    location,
    formattedDate,
    icon,
    temp,
    tempmin,
    tempmax,
    conditions,
  };
}

function get24HourWeather(weather) {
  const output = [];

  const currentHour = weather.currentConditions.datetime;
  let dayIndex = 0;
  let hoursLeft = 24;

  while (hoursLeft > 0) {
    const hours = weather.days[dayIndex].hours;
    const nextHourIndex =
      hours.findIndex((hour) => hour.datetime === currentHour) + 1;

    const startingIndex = dayIndex === 0 ? nextHourIndex : 0;

    for (let i = startingIndex; i < hours.length; i++) {
      const time = hours[i].datetime.split(":").slice(0, 2).join(":");
      const icon = hours[i].icon;
      const temp = hours[i].temp;

      output.push({ time, icon, temp });

      hoursLeft--;
      if (hoursLeft === 0) {
        break;
      }
    }

    dayIndex++;
  }

  return output;
}

function get6DaysForecast(weather) {
  const output = [];

  for (let i = 1; i < 7; i++) {
    const dayObj = weather.days[i];
    const date = dateFromUnixTime(dayObj.datetimeEpoch);
    const formattedDate = formatDate(date, "E M'/'d");
    const icon = dayObj.icon;
    const tempmin = dayObj.tempmin;
    const tempmax = dayObj.tempmax;

    output.push({ formattedDate, icon, tempmin, tempmax });
  }

  return output;
}

export {
  fetchWeatherResponse,
  getCurrentWeather,
  get24HourWeather,
  get6DaysForecast,
};
