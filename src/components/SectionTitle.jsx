import React from "react";
import { motion } from "framer-motion";

/**
 * =====================================================================
 * SectionTitle Component
 * =====================================================================
 * Reusable section heading with technical badge accents and theme support.
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
          className={`inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-cyan-950/30 border border-cyan-500/30 text-cyan-500 shadow-sm ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {badge}
        </div>
      )}

      {/* Main section heading */}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-theme">
        {title}
      </h2>

      {/* Optional explanatory subtitle */}
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-theme-secondary leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Decorative accent divider line */}
      <div
        className={`mt-4 h-1 w-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full ${
          isCenter ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
