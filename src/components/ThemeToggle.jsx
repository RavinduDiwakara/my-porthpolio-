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
      onClick={(e) => toggleTheme(e)}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer ${
        isDark
          ? "bg-[#18181b] border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/80 shadow-sm"
          : "bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 shadow-sm"
      } ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          // Crisp, clean modern Sun (stroke-only, no pixelated glow)
          <Sun className="w-[18px] h-[18px] text-zinc-300 hover:text-amber-300 transition-colors stroke-[1.8]" />
        ) : (
          // Crisp, modern crescent Moon (stroke-only, no dark fill)
          <Moon className="w-[18px] h-[18px] text-slate-700 hover:text-cyan-600 transition-colors stroke-[1.8]" />
        )}
      </motion.div>
    </button>
  );
}
