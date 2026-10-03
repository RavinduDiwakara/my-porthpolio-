import React from "react";
import { motion } from "framer-motion";

/**
 * =====================================================================
 * SectionTitle Component
 * =====================================================================
 * A reusable heading component for sections (About, Skills, Projects, etc.)
 * Provides consistent typography, technical badge accents, and smooth
 * scroll-triggered entrance animations.
 *
 * @param {string} badge - Small uppercase tech tag (e.g. "CAPABILITIES")
 * @param {string} title - Primary section title (e.g. "Technical Skills")
 * @param {string} subtitle - Optional descriptive sentence
 * @param {string} align - Alignment of text: "center" (default) or "left"
 */
export default function SectionTitle({
  badge,
  title,
  subtitle,
  align = "center"
}) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-12 md:mb-16 ${isCenter ? "text-center mx-auto max-w-2xl" : "text-left max-w-2xl"}`}
    >
      {/* Small glowing technical category badge */}
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shadow-sm shadow-cyan-950/50 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {badge}
        </div>
      )}

      {/* Main section heading with subtle gradient text */}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
        {title}
      </h2>

      {/* Optional explanatory subtitle */}
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Subtle decorative accent divider line */}
      <div
        className={`mt-4 h-1 w-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full ${
          isCenter ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
