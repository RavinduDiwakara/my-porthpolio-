import { useState, useEffect, useCallback } from "react";
import { flushSync } from "react-dom";
import { STORAGE_KEYS } from "../utils/storage";

const THEME_CHANGE_EVENT = "portfolio-theme-change";

/**
 * =====================================================================
 * Custom Hook: useTheme
 * =====================================================================
 * Manages the Black & White theme state with ripple transition:
 * - Reads saved theme from localStorage (default: "dark" / Black theme)
 * - Updates <html data-theme="dark"|"light"> and classes
 * - Performs circular expanding ripple effect originating from toggle button
 * - Persists theme selection to localStorage
 * - Synchronizes across all instances via CustomEvent
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === "light" || saved === "dark") return saved;
    return "dark"; // Default Black theme
  });

  // Apply theme attributes to root
  const applyThemeToDOM = useCallback((newTheme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-theme", newTheme);
    if (newTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    window.localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  }, []);

  // Listen for sync events from other toggle instances
  useEffect(() => {
    const handleThemeSync = (e) => {
      if (e.detail && (e.detail === "dark" || e.detail === "light")) {
        setThemeState(e.detail);
        applyThemeToDOM(e.detail);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeSync);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeSync);
  }, [applyThemeToDOM]);

  // Initial sync on mount
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme, applyThemeToDOM]);

  const toggleTheme = useCallback(
    (event) => {
      const nextTheme = theme === "dark" ? "light" : "dark";

      // Check if browser supports View Transition API and user has not requested reduced motion
      const supportsViewTransition =
        typeof document !== "undefined" &&
        "startViewTransition" in document &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!supportsViewTransition) {
        setThemeState(nextTheme);
        applyThemeToDOM(nextTheme);
        window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: nextTheme }));
        return;
      }

      // Compute origin of ripple from click event or element center
      let x = event?.clientX;
      let y = event?.clientY;

      if ((x === undefined || y === undefined || (x === 0 && y === 0)) && event?.currentTarget) {
        const rect = event.currentTarget.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }

      if (x === undefined || y === undefined) {
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
      }

      // Max radius to fully cover screen from click point
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // Add transitioning class to prevent conflicting CSS transitions
      document.documentElement.classList.add("theme-transitioning");

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setThemeState(nextTheme);
          applyThemeToDOM(nextTheme);
          window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: nextTheme }));
        });
      });

      transition.ready
        .then(() => {
          const animation = document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
              ]
            },
            {
              duration: 550,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)"
            }
          );
          return animation.finished;
        })
        .finally(() => {
          document.documentElement.classList.remove("theme-transitioning");
        });
    },
    [theme, applyThemeToDOM]
  );

  const setTheme = useCallback(
    (newTheme) => {
      if (newTheme === "light" || newTheme === "dark") {
        setThemeState(newTheme);
        applyThemeToDOM(newTheme);
        window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: newTheme }));
      }
    },
    [applyThemeToDOM]
  );

  return {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    toggleTheme,
    setTheme
  };
}

export default useTheme;
