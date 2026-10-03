import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, FolderGit2, Terminal, Shield, Network } from "lucide-react";
import { personalInfo } from "../data/personalInfo";
import NetworkCanvas from "./NetworkCanvas";
import SocialIcon from "./SocialIcon";

/**
 * =====================================================================
 * Hero Component
 * =====================================================================
 * The primary landing section of the portfolio.
 * Highlights:
 * - Dynamic network node canvas animation representing network topology
 * - Staggered Framer Motion entrance sequence for typography, buttons & links
 * - Quick calls-to-action: "View My Projects" and "Download CV"
 * - Direct social links (GitHub, LinkedIn, Email)
 */
export default function Hero() {
  // Animation container variants for staggered children entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1
      }
    }
  };

  // Upward sliding animation variant for individual elements
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#030712]"
    >
      {/* 
        Background Visual Layer:
        Interactive Network Canvas rendering simulated packet nodes and connections
      */}
      <NetworkCanvas />

      {/* Ambient gradient lighting in the background for depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Status Badge: Undergraduate at University of Colombo */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-slate-900/80 border border-slate-800 text-slate-300 shadow-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>BICT Undergraduate</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400">University of Colombo</span>
          </motion.div>

          {/* Primary Greeting and Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Professional Title */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-200 flex items-center justify-center gap-2.5 flex-wrap">
              <span className="text-cyan-400 font-mono">&gt;</span>
              <span>{personalInfo.title}</span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="text-slate-400 text-lg sm:text-xl font-normal">
                Galle, Sri Lanka
              </span>
            </h2>
          </motion.div>

          {/* Bio Summary */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed mb-8"
          >
            {personalInfo.heroBio}
          </motion.p>

          {/* Quick Technical Keywords Bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs font-mono text-slate-400"
          >
            <span className="px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              Cisco Networking
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              Linux & Docker
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              CI/CD & Security
            </span>
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10"
          >
            {/* View Projects Button */}
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-950/50 hover:shadow-cyan-900/40 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>View My Projects</span>
            </a>

            {/* Download CV Button */}
            <a
              href={personalInfo.resumeUrl}
              download="Ravindu-Diwakara-CV.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download CV</span>
            </a>
          </motion.div>

          {/* Social Profiles Bar */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 pt-2"
          >
            <SocialIcon
              icon="Github"
              href={personalInfo.github}
              label="Ravindu Diwakara on GitHub"
            />
            <SocialIcon
              icon="Linkedin"
              href={personalInfo.linkedin}
              label="Ravindu Diwakara on LinkedIn"
            />
            <SocialIcon
              icon="Mail"
              href={`mailto:${personalInfo.email}`}
              label="Email Ravindu Diwakara"
            />
          </motion.div>
        </motion.div>

        {/* Scroll-down cue indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#about"
            aria-label="Scroll down to About section"
            className="flex flex-col items-center gap-2 text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors"
          >
            <span>EXPLORE</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
