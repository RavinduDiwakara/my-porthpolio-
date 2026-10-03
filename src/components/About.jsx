import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Network, Terminal, MapPin, CheckCircle2 } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { personalInfo } from "../data/personalInfo";

/**
 * =====================================================================
 * About Component
 * =====================================================================
 * Highlights Ravindu's background as an undergraduate student at the
 * University of Colombo, his passion for hands-on networking and DevOps,
 * and key performance metrics (GPA, Degree, Focus, Location).
 */
export default function About() {
  return (
    <section
      id="about"
      aria-label="About Ravindu Diwakara"
      className="py-20 md:py-28 relative bg-slate-950/60 border-t border-b border-slate-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
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
            className="lg:col-span-7 space-y-5 text-slate-300 leading-relaxed text-base sm:text-lg"
          >
            {personalInfo.aboutBio.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-slate-300">
                {paragraph}
              </p>
            ))}

            {/* Practical Mindset Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-200">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Hands-on Lab Experimentation</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Cisco & Linux Infrastructure</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Containerized Workflows (Docker)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Continuous Integration (CI/CD)</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Statistics / Academic Milestone Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Stat Card 1: GPA */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-950/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Academic Record
                </span>
                <div className="p-2 rounded-lg bg-cyan-950/50 text-cyan-400 border border-cyan-800/40">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-white font-mono tracking-tight text-cyan-400">
                3.621
              </div>
              <div className="mt-1 text-xs text-slate-300 font-medium">
                Current GPA
              </div>
              <div className="mt-1 text-[11px] text-slate-500 font-mono">
                University of Colombo (BICT)
              </div>
            </motion.div>

            {/* Stat Card 2: Degree */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-950/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Degree Program
                </span>
                <div className="p-2 rounded-lg bg-blue-950/50 text-blue-400 border border-blue-800/40">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">
                BICT
              </div>
              <div className="mt-1 text-xs text-slate-300 font-medium">
                Undergraduate
              </div>
              <div className="mt-1 text-[11px] text-slate-500 font-mono">
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
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-950/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Technical Core
                </span>
                <div className="p-2 rounded-lg bg-teal-950/50 text-teal-400 border border-teal-800/40">
                  <Network className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">
                Networking
              </div>
              <div className="mt-1 text-xs text-slate-300 font-medium">
                Primary Focus
              </div>
              <div className="mt-1 text-[11px] text-slate-500 font-mono">
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
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-950/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Target Trajectory
                </span>
                <div className="p-2 rounded-lg bg-sky-950/50 text-sky-400 border border-sky-800/40">
                  <Terminal className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">
                DevOps
              </div>
              <div className="mt-1 text-xs text-slate-300 font-medium">
                Career Direction
              </div>
              <div className="mt-1 text-[11px] text-slate-500 font-mono">
                Cloud, CI/CD, Infrastructure
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
