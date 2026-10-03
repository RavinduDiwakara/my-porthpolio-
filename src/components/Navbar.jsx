import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Terminal, ChevronRight } from "lucide-react";
import { personalInfo } from "../data/personalInfo";

/**
 * =====================================================================
 * Navbar Component
 * =====================================================================
 * Sticky navigation bar with:
 * - Dynamic glassmorphic background that blurs when scrolled
 * - Active section tracking with highlight indicator
 * - Animated mobile drawer menu
 * - Direct CV download CTA button
 */
export default function Navbar() {
  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);
  // State to track whether user has scrolled past top
  const [isScrolled, setIsScrolled] = useState(false);
  // State for active section id (e.g. 'home', 'about', 'skills')
  const [activeSection, setActiveSection] = useState("home");

  // Navigation menu items
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

  // Scroll listener to update navbar background opacity and active link
  useEffect(() => {
    const handleScroll = () => {
      // Toggle navbar glass background when scrolled > 20px
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll position
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

  // Closes mobile menu when a nav link is clicked
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
          ? "bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3"
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
            {/* Technical Monogram Badge */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-sm shadow-cyan-500/20 group-hover:shadow-cyan-500/50 transition-shadow">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <span className="font-mono font-bold text-sm tracking-wider text-cyan-400 group-hover:text-cyan-300">
                  {personalInfo.monogram}
                </span>
              </div>
            </div>

            {/* Name & Title */}
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                RAVINDU
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                NETWORKING // DEVOPS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-cyan-400 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-cyan-950/60 border border-cyan-500/40 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Download CV Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={personalInfo.resumeUrl}
              download="Ravindu-Diwakara-CV.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-950/50 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/90 overflow-hidden"
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
                        ? "bg-cyan-950/50 border border-cyan-500/40 text-cyan-400"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </a>
                );
              })}

              <div className="pt-4 border-t border-slate-800/80">
                <a
                  href={personalInfo.resumeUrl}
                  download="Ravindu-Diwakara-CV.pdf"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono shadow-md"
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
