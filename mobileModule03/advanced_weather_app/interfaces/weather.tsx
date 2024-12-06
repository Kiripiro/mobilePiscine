type WeatherMetric = number;

interface WeatherBase {
  temperature: WeatherMetric;
  description: string;
  windSpeed: WeatherMetric;
  weatherCode: number;
}

interface CurrentWeather extends WeatherBase {}

interface TodayWeather {
  time: Date[] | undefined;
  temperature: WeatherMetric[];
  description: string[];
  windSpeed: WeatherMetric[];
  weatherCode: number[];
}

interface WeeklyWeather {
  date: Date[];
  minTemperature: WeatherMetric[];
  maxTemperature: WeatherMetric[];
  description: string[];
  weatherCode: number[];
}

interface WeatherConditions {
  currentWeather: CurrentWeather;
  todayWeather: TodayWeather;
  weeklyWeather: WeeklyWeather;
}
