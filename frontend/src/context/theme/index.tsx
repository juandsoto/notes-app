import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

interface Props {
  children: JSX.Element | JSX.Element[];
}

type Theme = "light" | "dark";

interface IThemeContext {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme | null>>;
}

const initialTheme: Theme = "light";

const ThemeContext = createContext<IThemeContext>({
  theme: initialTheme,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: Props): JSX.Element => {
  const [theme, setTheme, { clearValue }] = useLocalStorage<Theme | null>("theme", initialTheme);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme: theme!, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
