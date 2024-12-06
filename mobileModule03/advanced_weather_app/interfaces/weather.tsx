type WeatherMetric = number;

interface WeatherBase {
  temperature: WeatherMetric;
  description: string;
  windSpeed: WeatherMetric;
}

interface CurrentWeather extends WeatherBase {}

interface TodayWeather {
  time: Date[] | undefined;
  temperature: WeatherMetric[];
  description: string[];
  windSpeed: WeatherMetric[];
}

interface WeeklyWeather {
  date: Date[];
  minTemperature: WeatherMetric[];
  maxTemperature: WeatherMetric[];
  description: string[];
}

interface WeatherConditions {
  currentWeather: CurrentWeather;
  todayWeather: TodayWeather;
  weeklyWeather: WeeklyWeather;
}
