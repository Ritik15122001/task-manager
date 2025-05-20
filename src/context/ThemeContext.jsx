import React, { createContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useLocalStorage('theme', 
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const toggleTheme = () => setDark(prev => !prev);

  useEffect(() => {
    document.body.className = dark ? 'dark' : '';
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
