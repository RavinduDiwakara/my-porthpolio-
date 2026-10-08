import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, ChevronRight } from "lucide-react";
import portfolioService from "../services/portfolioService";
import ThemeToggle from "./ThemeToggle";

/**
 * =====================================================================
 * Navbar Component
 * =====================================================================
 * Sticky navigation bar supporting:
 * - Black Theme & White Theme switching
 * - Dynamic profile data from centralized profileService
 * - Glassmorphic backdrop blur responding to scroll
 * - Active section tracking with highlight indicator
 * - Animated mobile drawer menu
 * - Direct CV download CTA button
 */
export default function Navbar() {
  const [profile, setProfile] = useState(() => portfolioService.getProfile());
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Re-fetch profile on storage updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      setProfile(portfolioService.getProfile());
    };
    window.addEventListener("portfolio-storage-update", handleStorageUpdate);
    return () => window.removeEventListener("portfolio-storage-update", handleStorageUpdate);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Education", href: "#education" },
    { name: "Focus", href: "#focus" },
    { name: "Contact", href: "#contact" }
  ];

  // Scroll listener for glassmorphism and active section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-md border-b border-theme shadow-lg shadow-black/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavLinkClick(e, "#home")}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-sm shadow-cyan-500/20 group-hover:shadow-cyan-500/50 transition-shadow">
              <div className="w-full h-full bg-theme-bg rounded-[11px] flex items-center justify-center">
                <span className="font-mono font-bold text-sm tracking-wider text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 transition-colors">
                  {profile.monogram || "RD"}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-theme group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {profile.shortName?.toUpperCase() || "RAVINDU"}
              </span>
              <span className="text-[10px] font-mono text-theme-muted tracking-wider">
                NETWORKING // DEVOPS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/85 dark:bg-theme-card/80 backdrop-blur-md border border-slate-300 dark:border-theme rounded-full px-4 py-1.5 shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-cyan-700 dark:text-cyan-400 font-bold"
                      : "text-slate-700 dark:text-theme-secondary hover:text-slate-950 dark:hover:text-theme hover:bg-slate-100 dark:hover:bg-theme-card-hover"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-cyan-100/90 border border-cyan-400/70 dark:bg-cyan-950/40 dark:border-cyan-500/40 -z-10 shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA: Theme Toggle + Download CV */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            <a
              href={profile.resumeUrl}
              download="Ravindu-Diwakara-CV.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20 dark:shadow-cyan-950/30 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="p-2.5 rounded-xl bg-white dark:bg-theme-card border-2 border-slate-300 dark:border-theme text-slate-800 dark:text-theme-secondary hover:text-slate-950 dark:hover:text-theme hover:border-slate-400 dark:hover:border-theme-border-hover shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[var(--nav-bg)] backdrop-blur-xl border-b border-theme overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-cyan-100/90 border border-cyan-400 text-cyan-800 dark:bg-cyan-950/30 dark:border-cyan-500/40 dark:text-cyan-400 font-bold"
                        : "text-slate-700 dark:text-theme-secondary hover:bg-slate-100 dark:hover:bg-theme-card-hover hover:text-slate-950 dark:hover:text-theme"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </a>
                );
              })}

              <div className="pt-4 border-t border-theme">
                <a
                  href={profile.resumeUrl}
                  download="Ravindu-Diwakara-CV.pdf"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono shadow-md active:scale-[0.99] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV (PDF)</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
