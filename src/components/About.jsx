import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Network, Terminal, MapPin, CheckCircle2, Shield, Boxes } from "lucide-react";
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
            className="lg:col-span-7 space-y-6 text-theme-secondary leading-relaxed text-base sm:text-lg"
          >
            {/* Storytelling Narrative Paragraphs */}
            <div className="space-y-4">
              {Array.isArray(profile.aboutBio) ? (
                profile.aboutBio.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-theme-secondary leading-relaxed">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-theme-secondary leading-relaxed">{profile.description}</p>
              )}
            </div>

            {/* Practical Mindset Highlights with Micro-Interactions */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-theme">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-theme-card border border-theme hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all shadow-sm">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Hands-on Lab Simulation</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-theme-card border border-theme hover:border-sky-500/40 hover:bg-sky-500/5 transition-all shadow-sm">
                <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Cisco &amp; Linux Enterprise</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-theme-card border border-theme hover:border-blue-500/40 hover:bg-blue-500/5 transition-all shadow-sm">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Containerized Docker Workflows</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-theme-card border border-theme hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all shadow-sm">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Automated CI/CD Delivery</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 4 Distinct Technical Value Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pillar 1: Academic Base */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 shadow-sm transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider font-semibold">
                  Academic Base
                </span>
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl font-bold text-theme tracking-tight">
                BICT (Hons)
              </div>
              <div className="mt-1 text-xs text-theme font-medium">
                University of Colombo
              </div>
              <div className="mt-1 text-[11px] text-theme-muted font-mono">
                Faculty of Technology
              </div>
            </motion.div>

            {/* Pillar 2: Network Core */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-theme-card border border-theme hover:border-sky-500/50 shadow-sm transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider font-semibold">
                  Network Core
                </span>
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500 border border-sky-500/20">
                  <Network className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl font-bold text-theme tracking-tight">
                Routing &amp; Switch
              </div>
              <div className="mt-1 text-xs text-theme font-medium">
                Cisco CCNA Prep
              </div>
              <div className="mt-1 text-[11px] text-theme-muted font-mono">
                OSPF, VLANs &amp; Subnetting
              </div>
            </motion.div>

            {/* Pillar 3: DevOps & Cloud */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-theme-card border border-theme hover:border-blue-500/50 shadow-sm transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider font-semibold">
                  DevOps &amp; Cloud
                </span>
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  <Boxes className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl font-bold text-theme tracking-tight">
                Docker &amp; CI/CD
              </div>
              <div className="mt-1 text-xs text-theme font-medium">
                Linux Systems &amp; Bash
              </div>
              <div className="mt-1 text-[11px] text-theme-muted font-mono">
                Automated Deployments
              </div>
            </motion.div>

            {/* Pillar 4: Security Mindset */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-theme-card border border-theme hover:border-emerald-500/50 shadow-sm transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider font-semibold">
                  Reliability
                </span>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <Shield className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl font-bold text-theme tracking-tight">
                Security &amp; Ops
              </div>
              <div className="mt-1 text-xs text-theme font-medium">
                Infrastructure Defense
              </div>
              <div className="mt-1 text-[11px] text-theme-muted font-mono">
                ACLs, Firewalls &amp; Uptime
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
