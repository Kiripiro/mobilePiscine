type WeatherDescription = {
  code: number;
  description: string;
};

const weatherCodeMapper: WeatherDescription[] = [
  { code: 0, description: "Clear sky" },
  { code: 1, description: "Mainly clear" },
  { code: 2, description: "Partly cloudy" },
  { code: 3, description: "Overcast" },
  { code: 45, description: "Fog" },
  { code: 48, description: "Depositing rime fog" },
  { code: 51, description: "Drizzle: Light intensity" },
  { code: 53, description: "Drizzle: Moderate intensity" },
  { code: 55, description: "Drizzle: Dense intensity" },
  { code: 56, description: "Freezing Drizzle: Light intensity" },
  { code: 57, description: "Freezing Drizzle: Dense intensity" },
  { code: 61, description: "Rain: Slight intensity" },
  { code: 63, description: "Rain: Moderate intensity" },
  { code: 65, description: "Rain: Heavy intensity" },
  { code: 66, description: "Freezing Rain: Light intensity" },
  { code: 67, description: "Freezing Rain: Heavy intensity" },
  { code: 71, description: "Snow fall: Slight intensity" },
  { code: 73, description: "Snow fall: Moderate intensity" },
  { code: 75, description: "Snow fall: Heavy intensity" },
  { code: 77, description: "Snow grains" },
  { code: 80, description: "Rain showers: Slight intensity" },
  { code: 81, description: "Rain showers: Moderate intensity" },
  { code: 82, description: "Rain showers: Violent intensity" },
  { code: 85, description: "Snow showers: Slight intensity" },
  { code: 86, description: "Snow showers: Heavy intensity" },
  { code: 95, description: "Thunderstorm: Slight or moderate" },
  { code: 96, description: "Thunderstorm with slight hail" },
  { code: 99, description: "Thunderstorm with heavy hail" },
];

export const getWeatherDescription = (code: number): string => {
  const weather = weatherCodeMapper.find((entry) => entry.code === code);
  return weather ? weather.description : "Unknown weather condition";
};


async function getCurrentWeather(location: Location) {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code,wind_speed_10m`);

  const data = await response.json();
  return {
    temperature: data.current.temperature_2m,
    description: getWeatherDescription(data.current.weather_code),
    windSpeed: data.current.wind_speed_10m,
  };
}

async function getTodayWeather(location: Location) {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,weather_code,wind_speed_10m&forecast_days=1`);

  const data = await response.json();
  return {
    time: data.hourly.time,
    temperature: data.hourly.temperature_2m,
    description: data.hourly.weather_code.map((code: number) => getWeatherDescription(code)),
    windSpeed: data.hourly.wind_speed_10m,
  };
}

async function getWeeklyWeather(location: Location) {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code`);

  const data = await response.json();
  return {
    date: data.daily.time,
    minTemperature: data.daily.temperature_2m_min,
    maxTemperature: data.daily.temperature_2m_max,
    description: data.daily.weather_code.map((code: number) => getWeatherDescription(code)),
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