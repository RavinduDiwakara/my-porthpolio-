import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import CareerFocus from "./components/CareerFocus";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/**
 * =====================================================================
 * Main Application Component (App.jsx)
 * =====================================================================
 * This is the root component that brings together all the portfolio sections.
 * The website layout follows a clean single-page architecture with smooth
 * scrolling between sections:
 *
 * 1. Navbar       - Sticky navigation with glassmorphism & section indicator
 * 2. Hero         - Dynamic introduction with animated network topology mesh
 * 3. About Me     - Personal background, mindset, and academic stat cards
 * 4. Skills       - Categorized technical proficiencies & interactive cards
 * 5. Projects     - Featured networking, DevOps, and full-stack projects
 * 6. Certs        - Cisco, AWS Academy, and DevOps certification credentials
 * 7. Education    - Timeline highlighting University of Colombo & GCE A/L
 * 8. Career Focus - Long-term engineering focus ("What I'm Building Toward")
 * 9. Contact      - Direct channels and responsive message form
 * 10. Footer      - Monogram branding, back-to-top button, and copyright
 */
export default function App() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
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
      <Footer />
    </div>
  );
}
