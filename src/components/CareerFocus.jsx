import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import DynamicIcon from "./DynamicIcon";
import portfolioService from "../services/portfolioService";

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
 */
export default function CareerFocus() {
  const [pillars, setPillars] = useState(() => portfolioService.getCareerFocus());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setPillars(portfolioService.getCareerFocus());
    };
    window.addEventListener("portfolio-storage-update", handleStorageUpdate);
    return () => window.removeEventListener("portfolio-storage-update", handleStorageUpdate);
  }, []);

  return (
    <section
      id="focus"
      aria-label="What I am Building Toward"
      className="py-20 md:py-28 relative bg-theme-bg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="LONG-TERM VISION"
          title="What I'm Building Toward"
          subtitle="Aligning undergraduate computer science fundamentals with modern production infrastructure and cloud engineering practices."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl p-7 bg-theme-card border border-theme transition-all duration-300 hover:border-cyan-500/50 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pillar.accentColor || "from-cyan-500/10 to-transparent"} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Header: Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3.5 rounded-xl bg-theme-surface border border-theme text-cyan-500 group-hover:scale-110 transition-all duration-300">
                    <DynamicIcon name={pillar.icon || "Network"} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-theme tracking-tight group-hover:text-cyan-500 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-500">
                      {pillar.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-theme-secondary leading-relaxed">
                  {pillar.description}
                </p>

                {/* Associated Technologies */}
                {pillar.technologies && pillar.technologies.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-theme-subtle">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-theme-muted mb-2 font-medium">
                      Core Target Stacks:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-theme-surface text-theme border border-theme"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
