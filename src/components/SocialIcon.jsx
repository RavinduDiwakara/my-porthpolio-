import React from "react";
import DynamicIcon from "./DynamicIcon";

/**
 * =====================================================================
 * SocialIcon Component
 * =====================================================================
 * A reusable accessible button/link for external social profiles
 * (GitHub, LinkedIn, Email). Includes subtle hover elevation and glowing borders.
 *
 * @param {string} icon - Name of the icon ('Github', 'Linkedin', 'Mail')
 * @param {string} href - Destination URL or mailto link
 * @param {string} label - Screen reader accessible label
 */
export default function SocialIcon({ icon, href, label }) {
  const isMail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isMail ? "_self" : "_blank"}
      rel={isMail ? "" : "noopener noreferrer"}
      aria-label={label}
      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-cyan-950/40 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
    >
      <DynamicIcon name={icon} className="w-5 h-5" />
      <span className="sr-only">{label}</span>
    </a>
  );
}
