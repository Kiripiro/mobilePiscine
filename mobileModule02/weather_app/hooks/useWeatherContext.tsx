import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { getCurrentCoordinates } from '@/services/getCurrentCoordinates';
import { getWeather } from '@/services/getWeather';
import { requestForegroundPermissionsAsync } from '@/services/locationPermission';

type WeatherContextType = {
  inputLocation: string;
  location: string;
  setinputLocation: (input: string) => void;
  geoLocationPermission: boolean;
  setLocationPermission: (granted: boolean) => void;
  setGeolocationText: () => void;
  saveLocation: (text?: string) => void;
  weatherConditions: WeatherConditions;
  updateWeatherConditions: (location: Location) => Promise<void>;
};

export const WeatherContext = createContext<WeatherContextType | null>(null);

type ContextProviderProps = {
  children: ReactNode;
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherContextProvider');
  }
  return context;
};

function WeatherContextProvider({ children }: ContextProviderProps) {
  const [geoLocationPermission , setGeoLocationPermission] = useState<boolean>(false);
  const [inputLocation, setinputLocation] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [weatherConditions, setWeatherConditions] = useState<WeatherConditions>({
    currentWeather: {
      temperature: 0,
      description: '',
      windSpeed: 0,
    },
    todayWeather: {
      time: undefined,
      temperature: [],
      description: [],
      windSpeed: [],
    },
    weeklyWeather: {
      date: [],
      minTemperature: [],
      maxTemperature: [],
      description: [],
    },
  });

  useEffect(() => {
    askGeolocationPermission();
  }, []);

  const askGeolocationPermission = async (): Promise<void> => {
    try {
      console.log('requesting permission');
      const response = await requestForegroundPermissionsAsync();
      console.log('Permission response:', response);
  
      const permissionGranted = response.status === 'granted';
      setGeoLocationPermission(permissionGranted);
      console.log('Location permission:', permissionGranted);
  
      if (permissionGranted) {
        await setGeolocationText();
      } else {
        console.error('Location permission not granted');
      }
    } catch (error) {
      console.error('Error requesting geolocation permission:', error);
    }
  };
  

  const setLocationPermission = (granted: boolean) => {
    setGeoLocationPermission(granted);
  }

  const saveLocation = (location: string = inputLocation) => {
    setLocation(location);
    setinputLocation('');
  };

  const updateWeatherConditions = async (location: Location) => {
    if (!location) {
      console.error('Location not provided');
      return;
    }
    try {
      const weather = await getWeather(location);
      console.log('Weather conditions:', weather);
      setWeatherConditions(weather);
    } catch (error) {
      console.error('Error updating weather conditions:', error);
    }
  };

  const setGeolocationText = async () => {
    try {
      const location = await getCurrentCoordinates();
      if (typeof location === 'string') {
        console.error('Error fetching coordinates:', location);
        return;
      }
      setLocation(`${location.name}, ${location.admin1}, ${location.country}`);
      updateWeatherConditions(location);

    } catch (error) {
      console.error('Error fetching location or weather data:', error);
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
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherContextProvider;
