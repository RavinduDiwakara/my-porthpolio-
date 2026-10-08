import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, CheckCircle2 } from "lucide-react";
import SectionTitle from "./SectionTitle";
import educationService from "../services/educationService";

/**
 * =====================================================================
 * Education Component
 * =====================================================================
 * Visual vertical timeline showcasing academic achievements:
 * - Bachelor of Information & Communication Technology (BICT) at University of Colombo (Faculty of Technology)
 * - G.C.E. Advanced Level Technology Stream (Z-Score: 2.125, Island Rank: 285)
 *
 * Fully data-driven with Black & White theme support.
 */
export default function Education() {
  const [timeline, setTimeline] = useState(() => educationService.getEducation());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setTimeline(educationService.getEducation());
    };
    window.addEventListener("portfolio-storage-update", handleStorageUpdate);
    return () => window.removeEventListener("portfolio-storage-update", handleStorageUpdate);
  }, []);

  return (
    <section
      id="education"
      aria-label="Education and Academic Background"
      className="py-20 md:py-28 relative bg-theme-surface border-t border-b border-theme"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="ACADEMIC BACKGROUND"
          title="Education"
          subtitle="Foundational computer science, networking theory, and engineering coursework backing practical technical implementation."
        />

        {/* Vertical Timeline Container */}
        <div className="relative mt-12">
          {/* Vertical continuous accent line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-blue-500 to-theme-border" />

          <div className="space-y-12">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Timeline Node Marker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-theme-bg border-2 border-cyan-500 shadow-md shadow-cyan-500/20">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  </div>

                  {/* Spacer for two-sided alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Timeline Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`ml-12 md:ml-0 w-[calc(100%-3rem)] md:w-1/2 ${
                      isEven ? "md:pr-10" : "md:pl-10"
                    }`}
                  >
                    <div className="p-6 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-md">
                      {/* Top Header: Badge + Period */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-100 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-800/40 text-cyan-800 dark:text-cyan-400">
                          {item.badge}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-theme-muted">
                          <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-500" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      {/* Institution & Degree */}
                      <h3 className="text-xl font-bold text-theme tracking-tight">
                        {item.institution}
                      </h3>
                      <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-400 mt-0.5">
                        {item.degree}
                      </p>

                      {/* Highlight Badge */}
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-theme-surface border border-emerald-300 dark:border-theme text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 shadow-xs">
                        <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{item.highlight}</span>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-sm text-theme-secondary leading-relaxed">
                        {item.description}
                      </p>

                      {/* Subject Results (GCE A/L) */}
                      {item.results && (
                        <div className="mt-4 pt-3 border-t border-theme-subtle">
                          <p className="text-[11px] font-mono uppercase text-theme-muted mb-2 font-medium">
                            Key Subject Grades:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {item.results.map((res, rIdx) => (
                              <div
                                key={rIdx}
                                className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-theme-surface border border-slate-300 dark:border-theme flex items-center justify-between text-xs font-mono shadow-xs"
                              >
                                <span className="text-slate-700 dark:text-theme-secondary truncate mr-2 font-medium">
                                  {res.subject}
                                </span>
                                <span className="font-bold text-cyan-800 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-800/40 px-1.5 py-0.5 rounded">
                                  {res.grade}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Points Checklist */}
                      {item.keyPoints && (
                        <div className="mt-4 pt-3 border-t border-theme-subtle space-y-1.5">
                          {item.keyPoints.map((point, kIdx) => (
                            <div
                              key={kIdx}
                              className="flex items-start gap-2 text-xs text-theme-secondary"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
