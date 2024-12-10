import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentCoordinates } from "@/services/getCurrentCoordinates";
import { getWeather } from "@/services/getWeather";
import { requestForegroundPermissionsAsync } from "@/services/locationPermission";

type WeatherContextType = {
  inputLocation: string;
  location: string;
  setinputLocation: (input: string) => void;
  geoLocationPermission: string;
  setLocationPermission: (granted: string) => void;
  setGeolocationText: () => void;
  saveLocation: (text?: string) => void;
  weatherConditions: WeatherConditions;
  updateWeatherConditions: (location: Location) => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
  resetweatherConditions: () => void;
};

export const WeatherContext = createContext<WeatherContextType | null>(null);

type ContextProviderProps = {
  children: ReactNode;
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error(
      "useWeatherContext must be used within a WeatherContextProvider"
    );
  }
  return context;
};

function WeatherContextProvider({ children }: ContextProviderProps) {
  const [geoLocationPermission, setGeoLocationPermission] =
    useState<string>("idle");
  const [inputLocation, setinputLocation] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [weatherConditions, setWeatherConditions] = useState<WeatherConditions>(
    {
      currentWeather: {
        temperature: 0,
        description: "",
        windSpeed: 0,
        weatherCode: 0,
      },
      todayWeather: {
        time: undefined,
        temperature: [],
        description: [],
        windSpeed: [],
        weatherCode: [],
      },
      weeklyWeather: {
        date: [],
        minTemperature: [],
        maxTemperature: [],
        description: [],
        weatherCode: [],
      },
    }
  );

  const resetweatherConditions = () => {
    setWeatherConditions({
      currentWeather: {
        temperature: 0,
        description: "",
        windSpeed: 0,
        weatherCode: 0,
      },
      todayWeather: {
        time: undefined,
        temperature: [],
        description: [],
        windSpeed: [],
        weatherCode: [],
      },
      weeklyWeather: {
        date: [],
        minTemperature: [],
        maxTemperature: [],
        description: [],
        weatherCode: [],
      },
    });
    setLocation("");
  };

  useEffect(() => {
    askGeolocationPermission();
  }, []);

  const askGeolocationPermission = async (): Promise<void> => {
    try {
      const response = await requestForegroundPermissionsAsync();

      const permissionGranted = response.status;
      setGeoLocationPermission(permissionGranted);

      if (permissionGranted === "granted") {
        await setGeolocationText();
      } else if (permissionGranted === "denied") {
        setError("Location permission not granted");
        resetweatherConditions();
      }
    } catch (error) {
      setError("Error requesting geolocation permission");
      resetweatherConditions();
    }
  };

  const setLocationPermission = (granted: string) => {
    setGeoLocationPermission(granted);
  };

  const saveLocation = (location: string = inputLocation) => {
    setLocation(location);
    setinputLocation("");
  };

  const updateWeatherConditions = async (location: Location) => {
    if (!location) {
      return;
    }
    try {
      const weather = await getWeather(location);
      setWeatherConditions(weather);
    } catch (error) {
      console.error("Failed to update weather conditions:", error);
      resetweatherConditions();
      setError("Error fetching weather data");
    }
  };

  const setGeolocationText = async () => {
    console.log("Setting geolocation text", geoLocationPermission);
    if (geoLocationPermission !== "granted") {
      setError("Location permission not granted");
      resetweatherConditions();
      return;
    }
    try {
      setError(null);
      const location = await getCurrentCoordinates();
      if (typeof location === "string") {
        return;
      }
      setLocation(`${location.name}, ${location.admin1}, ${location.country}`);
      updateWeatherConditions(location);
    } catch (error) {
      resetweatherConditions();
      setError("Error fetching location or weather data");
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        inputLocation,
        location,
        setinputLocation,
        saveLocation,
        geoLocationPermission,
        setLocationPermission,
        setGeolocationText,
        weatherConditions,
        updateWeatherConditions,
        error,
        setError,
        resetweatherConditions,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherContextProvider;
