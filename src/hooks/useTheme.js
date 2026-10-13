import { useState, useEffect } from "react";
import { STORAGE_KEYS } from "../utils/storage";

/**
 * =====================================================================
 * Custom Hook: useTheme
 * =====================================================================
 * Manages the Black & White theme state:
 * - Reads saved theme from localStorage (default: "dark" / Black theme)
 * - Updates <html data-theme="dark"|"light"> and classes
 * - Persists theme selection to localStorage
 * - Synchronizes across tabs and components
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === "light" || saved === "dark") return saved;
    return "dark"; // Default Black theme
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    window.localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setTheme = (newTheme) => {
    if (newTheme === "light" || newTheme === "dark") {
      setThemeState(newTheme);
    }
  };

  return {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    toggleTheme,
    setTheme
  };
}

export default useTheme;
