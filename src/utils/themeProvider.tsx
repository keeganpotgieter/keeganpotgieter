import config from '../../config.json';
import Themes from '../../themes.json';
import { Theme } from '../interfaces/theme';
import React, { useEffect, useState } from 'react';

const args = {
  ls: [],
  random: [],
  set: [
    {
      name: 'theme',
      type: 'string',
    },
  ],
};

export interface ThemeContextType {
  setTheme: (name: string) => string;
  theme: Theme;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
);

interface Props {
  children: React.ReactNode;
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

const themeCache: { [key: string]: Theme } = {};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, _setTheme] = useState<Theme>(config.theme);

  const setTheme = (theme: Theme) => {
    _setTheme(theme);
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute('content', theme.background);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      const cachedTheme = themeCache[savedTheme.toLowerCase()];
      if (cachedTheme) {
        setTheme(cachedTheme);
      } else {
        const index = Themes.findIndex(
          (colorScheme) =>
            colorScheme.name.toLowerCase() === savedTheme.toLowerCase(),
        );
        const selectedTheme = index === -1 ? config.theme : Themes[index];
        themeCache[savedTheme.toLowerCase()] = selectedTheme;
        setTheme(selectedTheme);
      }
    } else {
      document
        .querySelector("meta[name='theme-color']")
        ?.setAttribute('content', theme.background);
    }
  }, []);

  const handleSetTheme = (name: string) => {
    const index = Themes.findIndex(
      (colorScheme) => colorScheme.name.toLowerCase() === name,
    );

    if (index === -1) {
      return `Theme '${name}' not found. Try 'theme ls' to see the list of available themes.`;
    }

    setTheme(Themes[index]);

    localStorage.setItem('theme', name);

    return `Theme ${Themes[index].name} set successfully!`;
  };

  const value = React.useMemo(
    () => ({ theme, setTheme: handleSetTheme }),
    [theme, handleSetTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
