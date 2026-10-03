import React from "react";
import { ArrowUp, Heart, Terminal } from "lucide-react";
import { personalInfo } from "../data/personalInfo";
import SocialIcon from "./SocialIcon";

/**
 * =====================================================================
 * Footer Component
 * =====================================================================
 * Clean engineering footer with:
 * - Monogram and identity summary
 * - Quick anchor links to key sections
 * - Social connection links (GitHub, LinkedIn, Email)
 * - "Back to top" smooth scroll button
 * - Copyright & tech stack disclosure
 */
export default function Footer() {
  // Smooth scroll to top helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#02050c] border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Monogram Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
              <span className="font-mono font-bold text-xs text-cyan-400">
                {personalInfo.monogram}
              </span>
            </div>
            <div>
              <p className="font-bold text-slate-200 tracking-tight">
                {personalInfo.name}
              </p>
              <p className="text-xs font-mono text-slate-500">
                {personalInfo.title}
              </p>
            </div>
          </div>

          {/* Social Icons Bar */}
          <div className="flex items-center gap-2">
            <SocialIcon
              icon="Github"
              href={personalInfo.github}
              label="Ravindu Diwakara GitHub Profile"
            />
            <SocialIcon
              icon="Linkedin"
              href={personalInfo.linkedin}
              label="Ravindu Diwakara LinkedIn Profile"
            />
            <SocialIcon
              icon="Mail"
              href={`mailto:${personalInfo.email}`}
              label="Email Ravindu Diwakara"
            />
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        {/* Divider line */}
        <div className="h-px w-full bg-slate-900 my-8" />

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1.5">
            <span>Built with React, Vite, Tailwind CSS &amp; Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
