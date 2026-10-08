import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  FolderGit2,
  Terminal,
  Shield,
  Network,
  Boxes,
  GraduationCap
} from "lucide-react";
import portfolioService from "../services/portfolioService";
import NetworkCanvas from "./NetworkCanvas";
import SocialIcon from "./SocialIcon";

/**
 * =====================================================================
 * Hero Component
 * =====================================================================
 * Dynamic landing hero for Ravindu Diwakara:
 * - Real profile data from centralized portfolioService
 * - Support for Black & White themes with refined contrast
 * - High-definition official portrait with glowing border
 * - Interactive network mesh canvas
 * - Fast CTAs and verified social links
 */
export default function Hero() {
  const [profile, setProfile] = useState(() => portfolioService.getProfile());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setProfile(portfolioService.getProfile());
    };
    window.addEventListener("portfolio-storage-update", handleStorageUpdate);
    return () => window.removeEventListener("portfolio-storage-update", handleStorageUpdate);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" }
    }
  };

  const floatingVariant = (yOffset = 8, duration = 3) => ({
    animate: {
      y: [-yOffset / 2, yOffset / 2, -yOffset / 2],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  });

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-theme-bg"
    >
      {/* Background Visual Layer: Interactive Network Canvas */}
      <NetworkCanvas />

      {/* Ambient gradient lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Narrative & Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-theme-card border border-theme text-theme-secondary shadow-sm mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>BICT Undergraduate</span>
              <span className="text-theme-muted">•</span>
              <span className="text-cyan-500 font-semibold">{profile.university}</span>
            </motion.div>

            {/* Primary Greeting and Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-theme mb-3 leading-tight"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </motion.h1>

            {/* Professional Title & Location */}
            <motion.div variants={itemVariants} className="mb-5">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-theme flex items-center justify-center lg:justify-start gap-2.5 flex-wrap">
                <span className="text-cyan-500 font-mono">&gt;</span>
                <span>{profile.title}</span>
                <span className="hidden sm:inline text-theme-muted">|</span>
                <span className="text-theme-secondary text-base sm:text-xl font-normal">
                  {profile.location}
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-base sm:text-lg text-theme-secondary leading-relaxed mb-6"
            >
              {profile.description || profile.heroBio}
            </motion.p>

            {/* Quick Technical Keywords Bar */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8 text-xs font-mono"
            >
              <span className="px-3 py-1.5 rounded-lg bg-theme-card border border-theme flex items-center gap-1.5 text-theme">
                <Network className="w-3.5 h-3.5 text-cyan-500" />
                Network Engineering
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-theme-card border border-theme flex items-center gap-1.5 text-theme">
                <Terminal className="w-3.5 h-3.5 text-sky-500" />
                DevOps &amp; Linux
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-theme-card border border-theme flex items-center gap-1.5 text-theme">
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                Security &amp; Cloud
              </span>
            </motion.div>

            {/* Call-to-Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto mb-8"
            >
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 dark:shadow-cyan-950/40 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>View My Projects</span>
              </a>

              <a
                href={profile.resumeUrl}
                download="Ravindu-Diwakara-CV.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-white dark:bg-theme-card hover:bg-slate-50 dark:hover:bg-theme-card-hover text-slate-900 dark:text-theme border-2 border-slate-300 dark:border-theme hover:border-cyan-500 dark:hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Download CV</span>
              </a>
            </motion.div>

            {/* Social Profiles Bar */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <SocialIcon
                icon="Github"
                href={profile.github}
                label="Ravindu Diwakara on GitHub"
              />
              <SocialIcon
                icon="Linkedin"
                href={profile.linkedin}
                label="Ravindu Diwakara on LinkedIn"
              />
              <SocialIcon
                icon="Mail"
                href={`mailto:${profile.email}`}
                label="Email Ravindu Diwakara"
              />
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Official High-Tech Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-72 sm:w-84 md:w-96">
              {/* Radiant background blur */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-teal-500/25 blur-2xl opacity-70 animate-pulse pointer-events-none" />

              {/* High-tech Framed Photo Container */}
              <div className="relative rounded-3xl p-2 bg-gradient-to-b from-cyan-500/40 via-theme-border to-blue-600/40 shadow-2xl">
                <div className="relative rounded-[22px] overflow-hidden bg-theme-surface aspect-[4/4.6] flex items-center justify-center">
                  <img
                    src={profile.profileImage || "/profile/ravindu-profile.png"}
                    alt={`${profile.name} - Networking & DevOps`}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    loading="eager"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/ravindu.jpg";
                    }}
                  />

                  {/* Gradient shadow at bottom of photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Terminal Nameplate Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800 flex items-center justify-between text-left">
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">
                        {profile.shortName}
                      </p>
                      <p className="text-[10px] font-mono text-cyan-400">
                        BICT • Univ. of Colombo
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-950/80 border border-emerald-700/60 text-[10px] font-mono text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Metric Badge 1: Top-Left (Cisco Networking) */}
              <motion.div
                variants={floatingVariant(8, 3.2)}
                animate="animate"
                className="absolute -top-3 -left-4 sm:-left-6 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-theme-card/95 backdrop-blur-md border border-cyan-500/40 shadow-lg text-xs font-mono text-theme"
              >
                <div className="p-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-400">
                  <Network className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-theme-muted block">Focus</span>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-500">Cisco Networks</span>
                </div>
              </motion.div>

              {/* Floating Metric Badge 2: Bottom-Right (Docker & DevOps) */}
              <motion.div
                variants={floatingVariant(10, 3.8)}
                animate="animate"
                className="absolute -bottom-4 -right-4 sm:-right-6 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-theme-card/95 backdrop-blur-md border border-blue-500/40 shadow-lg text-xs font-mono text-theme"
              >
                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400">
                  <Boxes className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-theme-muted block">Practices</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-500">Docker &amp; CI/CD</span>
                </div>
              </motion.div>

              {/* Floating Metric Badge 3: Top-Right (Education) */}
              <motion.div
                variants={floatingVariant(6, 2.8)}
                animate="animate"
                className="absolute top-10 -right-4 sm:-right-6 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-theme-card/95 backdrop-blur-md border border-emerald-500/40 shadow-md text-xs font-mono text-emerald-700 dark:text-emerald-500"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="font-bold">UoC • BICT</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#about"
            aria-label="Scroll down to About section"
            className="flex flex-col items-center gap-2 text-xs font-mono text-theme-muted hover:text-cyan-500 transition-colors"
          >
            <span>EXPLORE</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-cyan-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
