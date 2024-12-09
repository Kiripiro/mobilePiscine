import { SFSymbol } from "expo-symbols";

type WeatherDescription = {
  code: number;
  description: string;
};

export const weatherCodeMapper: WeatherDescription[] = [
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

export const weatherIconMapping: Record<number, string> = {
  0: "sun.max.fill", // Clear sky
  1: "sun.max.fill", // Mainly clear
  2: "cloud.sun.fill", // Partly cloudy
  3: "cloud.fill", // Overcast
  45: "cloud.fog.fill", // Fog
  48: "cloud.fog.fill", // Depositing rime fog
  51: "cloud.drizzle.fill", // Drizzle: Light intensity
  53: "cloud.drizzle.fill", // Drizzle: Moderate intensity
  55: "cloud.drizzle.fill", // Drizzle: Dense intensity
  61: "cloud.rain.fill", // Rain: Slight intensity
  63: "cloud.rain.fill", // Rain: Moderate intensity
  65: "cloud.rain.fill", // Rain: Heavy intensity
  66: "cloud.sleet.fill", // Freezing Rain: Light intensity
  67: "cloud.sleet.fill", // Freezing Rain: Heavy intensity
  71: "snowflake.fill", // Snow: Slight intensity
  73: "snowflake.fill", // Snow: Moderate intensity
  75: "snowflake.fill", // Snow: Heavy intensity
  77: "snowflake.fill", // Snow grains
  80: "cloud.rain.fill", // Rain showers: Slight intensity
  81: "cloud.rain.fill", // Rain showers: Moderate intensity
  82: "cloud.rain.fill", // Rain showers: Violent intensity
  95: "cloud.bolt.fill", // Thunderstorm: Slight or moderate
  96: "cloud.bolt.rain.fill", // Thunderstorm with hail
  99: "cloud.bolt.rain.fill", // Thunderstorm with heavy hail
};

/**
 * Returns the icon name for a given weather code.
 * @param code - The weather code.
 * @returns The icon name, or a default icon if the code is not found.
 */
export function getWeatherIcon(code: number): SFSymbol {
  return weatherIconMapping[code] as SFSymbol;
}
