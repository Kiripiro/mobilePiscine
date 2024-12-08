import { weatherCodeMapper } from "../constants/weatherCodeMapper";

export const getWeatherDescription = (code: number): string => {
  const weather = weatherCodeMapper.find((entry) => entry.code === code);
  return weather ? weather.description : "Unknown weather condition";
};

async function getCurrentWeather(location: Location) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code,wind_speed_10m`
  );

  const data = await response.json();
  return {
    temperature: data.current.temperature_2m,
    description: getWeatherDescription(data.current.weather_code),
    weatherCode: data.current.weather_code,
    windSpeed: data.current.wind_speed_10m,
  };
}

async function getTodayWeather(location: Location) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,weather_code,wind_speed_10m&forecast_days=1`
  );

  const data = await response.json();
  return {
    time: data.hourly.time,
    temperature: data.hourly.temperature_2m,
    description: data.hourly.weather_code.map((code: number) =>
      getWeatherDescription(code)
    ),
    weatherCode: data.hourly.weather_code.map((code: number) => code),
    windSpeed: data.hourly.wind_speed_10m,
  };
}

async function getWeeklyWeather(location: Location) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code`
  );

  const data = await response.json();
  return {
    date: data.daily.time,
    minTemperature: data.daily.temperature_2m_min,
    maxTemperature: data.daily.temperature_2m_max,
    description: data.daily.weather_code.map((code: number) =>
      getWeatherDescription(code)
    ),
    weatherCode: data.daily.weather_code.map((code: number) => code),
  };
}

export async function getWeather(location: Location) {
  const currentWeather = await getCurrentWeather(location);
  const todayWeather = await getTodayWeather(location);
  const weeklyWeather = await getWeeklyWeather(location);

  return {
    currentWeather,
    todayWeather,
    weeklyWeather,
  };
}
