import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Education from "../components/Education";
import CareerFocus from "../components/CareerFocus";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

/**
 * =====================================================================
 * Portfolio Page (src/pages/Portfolio.jsx)
 * =====================================================================
 * The public-facing portfolio view:
 * 1. Navbar       - Sticky header with Monogram, Nav links & Theme Switcher
 * 2. Hero         - Dynamic intro with official photo, network canvas & CTAs
 * 3. About Me     - Personal biography, technical mindset & academic stats
 * 4. Skills       - Categorized technical competencies
 * 5. Projects     - Featured Cisco simulations, Docker, CI/CD, and MERN apps
 * 6. Certs        - Filterable credentials with search & lightbox modal
 * 7. Education    - Visual academic timeline (University of Colombo & A/L)
 * 8. Career Focus - Core long-term engineering trajectory
 * 9. Contact      - Direct communication channels & validation form
 * 10. Footer      - Branding, back-to-top, and discrete admin access link
 */
export default function Portfolio({ onNavigateAdmin }) {
  return (
    <div className="min-h-screen bg-theme-bg text-theme flex flex-col selection:bg-cyan-500/30 selection:text-cyan-400">
      {/* Fixed top navigation bar */}
      <Navbar />

      {/* Main content flow */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Education />
        <CareerFocus />
        <Contact />
      </main>

      {/* Footer at the bottom of the page */}
      <Footer onNavigateAdmin={onNavigateAdmin} />
    </div>
  );
}
