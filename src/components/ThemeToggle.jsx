import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

/**
 * =====================================================================
 * ThemeToggle Component
 * =====================================================================
 * Accessible, animated switcher between Black Theme and White Theme.
 * Uses Lucide React Sun and Moon icons with smooth Framer Motion rotation.
 */
export default function ThemeToggle({ className = "" }) {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to White Theme" : "Switch to Black Theme"}
      title={isDark ? "Switch to White Theme" : "Switch to Black Theme"}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer ${
        isDark
          ? "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-800"
          : "bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-300 hover:bg-slate-200"
      } ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-slate-800" />
        )}
      </motion.div>
    </button>
  );
}
