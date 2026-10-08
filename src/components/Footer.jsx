import React, { useState, useEffect } from "react";
import { ArrowUp, Lock } from "lucide-react";
import portfolioService from "../services/portfolioService";
import SocialIcon from "./SocialIcon";

/**
 * =====================================================================
 * Footer Component
 * =====================================================================
 * Clean engineering footer with:
 * - Monogram and identity summary from portfolioService
 * - Social connection links (GitHub, LinkedIn, Email)
 * - "Back to top" smooth scroll button
 * - Discrete "Admin" access link for the portfolio owner
 * - Copyright & tech stack disclosure
 */
export default function Footer({ onNavigateAdmin }) {
  const [profile, setProfile] = useState(() => portfolioService.getProfile());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setProfile(portfolioService.getProfile());
    };
    window.addEventListener("portfolio-storage-update", handleStorageUpdate);
    return () => window.removeEventListener("portfolio-storage-update", handleStorageUpdate);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdminClick = (e) => {
    e.preventDefault();
    if (onNavigateAdmin) {
      onNavigateAdmin();
    } else {
      window.location.hash = "#/admin";
    }
  };

  return (
    <footer className="relative bg-theme-surface border-t border-theme text-theme-muted text-sm transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Monogram Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-theme-card border border-theme flex items-center justify-center shadow-sm">
              <span className="font-mono font-bold text-xs text-cyan-500">
                {profile.monogram || "RD"}
              </span>
            </div>
            <div>
              <p className="font-bold text-theme tracking-tight">
                {profile.name}
              </p>
              <p className="text-xs font-mono text-theme-muted">
                {profile.title}
              </p>
            </div>
          </div>

          {/* Social Icons Bar */}
          <div className="flex items-center gap-2">
            <SocialIcon
              icon="Github"
              href={profile.github}
              label="Ravindu Diwakara GitHub Profile"
            />
            <SocialIcon
              icon="Linkedin"
              href={profile.linkedin}
              label="Ravindu Diwakara LinkedIn Profile"
            />
            <SocialIcon
              icon="Mail"
              href={`mailto:${profile.email}`}
              label="Email Ravindu Diwakara"
            />
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-theme-card border border-slate-300 dark:border-theme text-xs font-mono text-slate-800 dark:text-theme-secondary hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          </button>
        </div>

        {/* Divider line */}
        <div className="h-px w-full bg-theme-border my-8" />

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-theme-muted text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span>Built with React, Vite, Tailwind CSS &amp; Framer Motion</span>

            {/* Discrete Owner Admin Link (Requirement 17) */}
            <a
              href="#/admin"
              onClick={handleAdminClick}
              title="Portfolio Owner Administration"
              className="inline-flex items-center gap-1 text-[11px] text-theme-muted hover:text-cyan-500 opacity-40 hover:opacity-100 transition-all cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
