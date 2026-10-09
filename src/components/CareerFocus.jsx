import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, CheckCircle2 } from "lucide-react";
import SectionTitle from "./SectionTitle";
import DynamicIcon from "./DynamicIcon";
import portfolioService from "../services/portfolioService";

/**
 * =====================================================================
 * CareerFocus Component ("What I'm Building Toward")
 * =====================================================================
 * Visualizes Ravindu's long-term technical aspirations and core engineering
 * disciplines:
 * 1. Network Engineering (Current Core Foundation)
 * 2. Cloud Engineering (Future Learning Goal)
 * 3. Infrastructure & Automation (Future Learning Goal)
 * 4. DevOps & Cloud Deployment (Future Learning Goal)
 *
 * Designed with strict clarity between current skills and future learning goals.
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

  const foundationCount = pillars.filter(
    (p) => p.statusType === "foundation" || p.status?.includes("Foundation")
  ).length;
  const futureGoalCount = pillars.filter(
    (p) => p.statusType === "future-goal" || p.status?.includes("Goal")
  ).length;

  return (
    <section
      id="focus"
      aria-label="What I am Building Toward"
      className="py-20 md:py-28 relative bg-theme-bg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="LONG-TERM CAREER TRAJECTORY"
          title="What I'm Building Toward"
          subtitle="Bridging undergraduate ICT and enterprise networking fundamentals with upcoming practical learning in DevOps, containerization, and cloud deployment."
        />

        {/* Roadmap Clarification Banner */}
        <div className="mb-8 p-4 rounded-xl bg-theme-surface border border-theme flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-theme-secondary shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 shrink-0">
              <Compass className="w-4 h-4" />
            </span>
            <span>
              <strong className="text-theme font-semibold">Learning Roadmap Note:</strong> Emerging deployment and automation tools are designated as future learning goals, clearly distinguished from active coursework and completed projects.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto text-[11px] font-mono">
            {foundationCount > 0 && (
              <span className="inline-flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                Current Foundation ({foundationCount})
              </span>
            )}
            {futureGoalCount > 0 && (
              <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Future Goals ({futureGoalCount})
              </span>
            )}
          </div>
        </div>

        {/* 2x2 Grid of Career Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => {
            const isFutureGoal = pillar.statusType === "future-goal" || pillar.status === "Future Learning Goal";

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl p-6 sm:p-7 bg-theme-card border border-theme transition-all duration-300 hover:border-cyan-500/50 shadow-sm hover:shadow-xl flex flex-col justify-between`}
              >
                {/* Ambient glow on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pillar.accentColor || "from-cyan-500/10 to-transparent"} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Header: Icon + Title + Status Label */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3.5">
                        <div className="p-3 rounded-xl bg-theme-surface border border-theme text-cyan-500 group-hover:scale-105 transition-all duration-300 shadow-sm shrink-0">
                          <DynamicIcon name={pillar.icon || "Network"} className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-theme tracking-tight group-hover:text-cyan-500 transition-colors">
                            {pillar.title}
                          </h3>
                          <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                            {pillar.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Prominent Status Label */}
                      <div className="self-start shrink-0">
                        {isFutureGoal ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wide bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 shadow-xs">
                            <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span>{pillar.status || "Future Learning Goal"}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wide bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse shrink-0" />
                            <span>{pillar.status || "Current Core Foundation"}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-sm text-theme-secondary leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Planned Learning Topics / Associated Technologies */}
                    {pillar.technologies && pillar.technologies.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-theme-subtle">
                        <div className="flex items-center justify-between mb-2.5">
                          <p className="text-[11px] font-mono uppercase tracking-wider text-theme-muted font-medium">
                            {pillar.topicsLabel || (isFutureGoal ? "Planned Learning Topics:" : "Core Foundation Topics:")}
                          </p>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                              isFutureGoal
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-cyan-600 dark:text-cyan-400"
                            }`}
                          >
                            {isFutureGoal ? "Study Trajectory" : "Active Focus"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {pillar.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-theme-surface border text-theme transition-colors ${
                                isFutureGoal
                                  ? "border-theme hover:border-amber-500/40"
                                  : "border-theme hover:border-cyan-500/40"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isFutureGoal
                                    ? "bg-amber-500 dark:bg-amber-400"
                                    : "bg-cyan-500 dark:bg-cyan-400"
                                }`}
                              />
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Detail */}
                  <div className="mt-6 pt-3.5 border-t border-theme-subtle flex items-center justify-between text-xs font-mono text-theme-muted">
                    <span className="inline-flex items-center gap-1.5">
                      {isFutureGoal ? (
                        <>
                          <Compass className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>Trajectory: Self-Directed Skill Building</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                          <span>Status: Academic Coursework & Labs</span>
                        </>
                      )}
                    </span>
                    <span
                      className={`font-mono text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded ${
                        isFutureGoal
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                      }`}
                    >
                      {isFutureGoal ? "ROADMAP" : "ACTIVE"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
