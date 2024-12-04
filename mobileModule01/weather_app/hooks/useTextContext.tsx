import React, { ReactNode, createContext, useContext, useState } from 'react';

type TextContextType = {
  inputText: string;
  text: string;
  setInputText: (input: string) => void;
  setGeolocationText: () => void;
  saveText: () => void;
};

export const TextContext = createContext<TextContextType | null>(null);

type ContextProviderProps = {
  children: ReactNode;
};

export const useTextContext = () => {
  const context = useContext(TextContext);
  if (!context) {
    throw new Error('useTextContext must be used within a TextContextProvider');
  }
  return context;
};



function TextContextProvider({ children }: ContextProviderProps) {
  const [inputText, setInputText] = useState<string>('');
  const [text, setText] = useState<string>('');

  const saveText = () => {
    setText(inputText);
    setInputText('');
  };

  const setGeolocationText = () => {
    setText('Geolocation');
  };

  return (
    <TextContext.Provider value={{ inputText, text, setInputText, saveText, setGeolocationText }}>
      {children}
    </TextContext.Provider>
  );
}

export default TextContextProvider;
