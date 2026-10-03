import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import DynamicIcon from "./DynamicIcon";
import { careerPillars } from "../data/careerFocus";

/**
 * =====================================================================
 * CareerFocus Component ("What I'm Building Toward")
 * =====================================================================
 * Visualizes Ravindu's long-term technical aspirations and core engineering
 * disciplines:
 * 1. Network Engineering
 * 2. DevOps Engineering
 * 3. Cloud Engineering
 * 4. Infrastructure & Automation
 *
 * Each pillar highlights the focus area, key objectives, and relevant technologies.
 */
export default function CareerFocus() {
  return (
    <section
      id="focus"
      aria-label="What I am Building Toward"
      className="py-20 md:py-28 relative bg-[#030712]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionTitle
          badge="LONG-TERM VISION"
          title="What I'm Building Toward"
          subtitle="Aligning undergraduate computer science fundamentals with modern production infrastructure and cloud engineering practices."
        />

        {/* 
          Four Career Pillars Grid:
          2 columns on desktop, 1 on mobile
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careerPillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className={`group relative rounded-2xl p-7 bg-slate-900/60 backdrop-blur-md border border-slate-800 transition-all duration-300 ${pillar.borderColor} hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between`}
            >
              {/* Subtle gradient wash on hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pillar.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Header: Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/70 text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300">
                    <DynamicIcon name={pillar.icon} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/80">
                      {pillar.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Associated Technologies */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-medium">
                    Core Target Stacks:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-950/80 text-slate-300 border border-slate-800 group-hover:border-cyan-500/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
