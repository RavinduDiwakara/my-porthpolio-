import React from "react";
import DynamicIcon from "./DynamicIcon";

/**
 * =====================================================================
 * SocialIcon Component
 * =====================================================================
 * A reusable accessible button/link for external social profiles
 * (GitHub, LinkedIn, Email). Supports Black & White themes.
 */
export default function SocialIcon({ icon, href, label }) {
  const isMail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isMail ? "_self" : "_blank"}
      rel={isMail ? "" : "noopener noreferrer"}
      aria-label={label}
      className="p-3 rounded-xl bg-white dark:bg-theme-card border-2 border-slate-300 dark:border-theme text-slate-700 dark:text-theme-secondary hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500 dark:hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-theme-card-hover shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
    >
      <DynamicIcon name={icon} className="w-5 h-5" />
      <span className="sr-only">{label}</span>
    </a>
  );
}
