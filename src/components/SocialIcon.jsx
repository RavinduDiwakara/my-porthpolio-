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

  // Brand-specific accent hover styles
  const getBrandHoverStyles = () => {
    switch (icon?.toLowerCase()) {
      case "github":
        return "hover:text-white hover:border-zinc-500 hover:shadow-zinc-500/20";
      case "linkedin":
        return "hover:text-[#0a66c2] hover:border-[#0a66c2]/50 hover:shadow-[#0a66c2]/20";
      case "mail":
        return "hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-cyan-500/20";
      default:
        return "hover:text-cyan-500 hover:border-cyan-500/50";
    }
  };

  return (
    <a
      href={href}
      target={isMail ? "_self" : "_blank"}
      rel={isMail ? "" : "noopener noreferrer"}
      aria-label={label}
      className={`p-2.5 rounded-xl bg-theme-card border border-theme text-theme-secondary ${getBrandHoverStyles()} hover:bg-theme-card-hover hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50`}
    >
      <DynamicIcon name={icon} className="w-4 h-4" />
      <span className="sr-only">{label}</span>
    </a>
  );
}
