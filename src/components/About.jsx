import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Network, Terminal, MapPin, CheckCircle2 } from "lucide-react";
import SectionTitle from "./SectionTitle";
import portfolioService from "../services/portfolioService";

/**
 * =====================================================================
 * About Component
 * =====================================================================
 * Highlights Ravindu's background as an undergraduate student at the
 * University of Colombo, his passion for hands-on networking and DevOps,
 * and key performance metrics (Degree, Focus, Career Direction, Location).
 */
export default function About() {
  const [profile, setProfile] = useState(() => portfolioService.getProfile());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setProfile(portfolioService.getProfile());
    };
    window.addEventListener("portfolio-storage-update", handleStorageUpdate);
    return () => window.removeEventListener("portfolio-storage-update", handleStorageUpdate);
  }, []);

  return (
    <section
      id="about"
      aria-label="About Ravindu Diwakara"
      className="py-20 md:py-28 relative bg-theme-surface border-t border-b border-theme"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="BIOGRAPHY & ASPIRATIONS"
          title="About Me"
          subtitle="An aspiring Networking and DevOps engineer passionate about practical infrastructure, automation, and continuous learning."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Narrative Biography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-5 text-theme-secondary leading-relaxed text-base sm:text-lg"
          >
            {/* Identity Quick Card with Photo */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-theme-card border border-theme shadow-sm">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-cyan-500/50 shadow-md">
                <img
                  src={profile.profileImage || "/profile/ravindu-profile.png"}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/ravindu.jpg";
                  }}
                />
              </div>
              <div className="overflow-hidden">
                <h3 className="text-base font-bold text-theme tracking-tight">
                  {profile.name}
                </h3>
                <p className="text-xs font-mono text-cyan-500 font-semibold truncate">
                  {profile.title}
                </p>
                <p className="text-xs text-theme-muted mt-0.5">
                  {profile.university} • {profile.location}
                </p>
              </div>
            </div>

            {Array.isArray(profile.aboutBio) ? (
              profile.aboutBio.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-theme-secondary">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-theme-secondary">{profile.description}</p>
            )}

            {/* Practical Mindset Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-theme">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-theme-card border border-theme shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Hands-on Lab Experimentation</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-theme-card border border-theme shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Cisco &amp; Linux Infrastructure</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-theme-card border border-theme shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Containerized Workflows (Docker)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-theme-card border border-theme shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Continuous Integration (CI/CD)</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Statistics / Academic Milestone Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Stat Card 1: University */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 shadow-sm transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
                  Higher Education
                </span>
                <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-800/40">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-theme tracking-tight">
                Colombo
              </div>
              <div className="mt-1 text-xs text-theme font-medium">
                University of Colombo
              </div>
              <div className="mt-1 text-[11px] text-theme-muted font-mono">
                Faculty of Technology
              </div>
            </motion.div>

            {/* Stat Card 2: Degree */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 shadow-sm transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
                  Degree Program
                </span>
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-800/40">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-theme tracking-tight">
                BICT
              </div>
              <div className="mt-1 text-xs text-theme font-medium">
                Undergraduate
              </div>
              <div className="mt-1 text-[11px] text-theme-muted font-mono">
                Faculty of Technology
              </div>
            </motion.div>

            {/* Stat Card 3: Primary Focus */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 shadow-sm transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
                  Technical Core
                </span>
                <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-300 dark:border-teal-800/40">
                  <Network className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-theme tracking-tight">
                Networking
              </div>
              <div className="mt-1 text-xs text-theme font-medium">
                Primary Focus
              </div>
              <div className="mt-1 text-[11px] text-theme-muted font-mono">
                Routing, Switching, VLANs
              </div>
            </motion.div>

            {/* Stat Card 4: Career Direction */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 shadow-sm transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
                  Target Trajectory
                </span>
                <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-300 dark:border-sky-800/40">
                  <Terminal className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-theme tracking-tight">
                DevOps
              </div>
              <div className="mt-1 text-xs text-theme font-medium">
                Career Direction
              </div>
              <div className="mt-1 text-[11px] text-theme-muted font-mono">
                Cloud, CI/CD, Infrastructure
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
