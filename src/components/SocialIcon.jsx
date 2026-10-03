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
      className="p-3 rounded-xl bg-theme-card border border-theme text-theme-secondary hover:text-cyan-500 hover:border-cyan-500/50 hover:bg-theme-card-hover hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
    >
      <DynamicIcon name={icon} className="w-5 h-5" />
      <span className="sr-only">{label}</span>
    </a>
  );
}
