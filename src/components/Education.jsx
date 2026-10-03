import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { educationTimeline } from "../data/education";

/**
 * =====================================================================
 * Education Component
 * =====================================================================
 * Visual vertical timeline showcasing academic achievements:
 * - Bachelor of Information & Communication Technology (BICT) at University of Colombo (GPA: 3.621)
 * - G.C.E. Advanced Level Technology Stream (Z-Score: 2.125, Island Rank: 285)
 *
 * Implements smooth scroll animations for timeline nodes and connector line.
 */
export default function Education() {
  return (
    <section
      id="education"
      aria-label="Education and Academic Background"
      className="py-20 md:py-28 relative bg-slate-950/70 border-t border-b border-slate-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionTitle
          badge="ACADEMIC BACKGROUND"
          title="Education"
          subtitle="Foundational computer science, networking theory, and engineering coursework backing practical technical implementation."
        />

        {/* 
          Vertical Timeline Container:
          Central glowing vertical line connecting milestone nodes
        */}
        <div className="relative mt-12">
          {/* Vertical continuous accent line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-blue-500 to-slate-800" />

          <div className="space-y-12">
            {educationTimeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* 
                    Central Timeline Node Marker:
                    Glowing pulsing point at each milestone on the line
                  */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-md shadow-cyan-500/30">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  </div>

                  {/* Spacer for two-sided alignment on desktop */}
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
                    <div className="p-6 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-lg">
                      {/* Top Header: Badge + Period */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-cyan-950/70 border border-cyan-800/60 text-cyan-300">
                          {item.badge}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      {/* Institution & Degree */}
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {item.institution}
                      </h3>
                      <p className="text-sm font-medium text-cyan-400 mt-0.5">
                        {item.degree}
                      </p>

                      {/* Prominent Highlight / GPA or Rank */}
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono font-semibold text-emerald-400">
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.highlight}</span>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Subject Results (GCE A/L) if available */}
                      {item.results && (
                        <div className="mt-4 pt-3 border-t border-slate-800/60">
                          <p className="text-[11px] font-mono uppercase text-slate-400 mb-2">
                            Key Subject Grades:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {item.results.map((res, rIdx) => (
                              <div
                                key={rIdx}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono"
                              >
                                <span className="text-slate-300 truncate mr-2">
                                  {res.subject}
                                </span>
                                <span className="font-bold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded">
                                  {res.grade}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Points Checklist */}
                      {item.keyPoints && (
                        <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-1.5">
                          {item.keyPoints.map((point, kIdx) => (
                            <div
                              key={kIdx}
                              className="flex items-start gap-2 text-xs text-slate-300"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
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
