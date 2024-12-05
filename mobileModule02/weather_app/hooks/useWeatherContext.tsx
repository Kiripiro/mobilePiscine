import React, { ReactNode, createContext, useContext, useState } from 'react';
import { getCurrentLocation } from '@/services/getCurrentLocation';
import { getWeather } from '@/services/getWeather'; // Assurez-vous que le chemin est correct

type WeatherContextType = {
  inputText: string;
  text: string;
  setInputText: (input: string) => void;
  setGeolocationText: () => void;
  saveText: (text?: string) => void;
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
  const [inputText, setInputText] = useState<string>('');
  const [text, setText] = useState<string>('');
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

  const saveText = (text: string = inputText) => {
    setText(text);
    setInputText('');
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
      const location = await getCurrentLocation();
      setText(location.message);
    } catch (error) {
      console.error('Error fetching location or weather data:', error);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        inputText,
        text,
        setInputText,
        saveText,
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
