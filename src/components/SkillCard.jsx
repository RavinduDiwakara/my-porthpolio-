import React from "react";
import { motion } from "framer-motion";
import DynamicIcon from "./DynamicIcon";

/**
 * =====================================================================
 * SkillCard Component
 * =====================================================================
 * Renders an individual skill category (e.g. Networking, DevOps).
 * Features:
 * - Staggered viewport entrance animation
 * - Micro-interaction on hover (lift, border glow, icon scale)
 * - Black & White theme support with clean contrast
 */
export default function SkillCard({ category, index }) {
  // Theme-specific accent color mapping
  const colorStyles = {
    cyan: {
      icon: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
      dot: "bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.6)]",
      hover: "hover:border-cyan-500/50 hover:shadow-cyan-950/20",
      tag: "text-cyan-500",
      border: "border-cyan-500/20"
    },
    emerald: {
      icon: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      dot: "bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.6)]",
      hover: "hover:border-emerald-500/50 hover:shadow-emerald-950/20",
      tag: "text-emerald-500",
      border: "border-emerald-500/20"
    },
    blue: {
      icon: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      dot: "bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.6)]",
      hover: "hover:border-blue-500/50 hover:shadow-blue-950/20",
      tag: "text-blue-500",
      border: "border-blue-500/20"
    },
    sky: {
      icon: "text-sky-500 bg-sky-500/10 border-sky-500/20",
      dot: "bg-sky-400 shadow-[0_0_6px_rgba(14,165,233,0.6)]",
      hover: "hover:border-sky-500/50 hover:shadow-sky-950/20",
      tag: "text-sky-500",
      border: "border-sky-500/20"
    },
    amber: {
      icon: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      dot: "bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]",
      hover: "hover:border-amber-500/50 hover:shadow-amber-950/20",
      tag: "text-amber-500",
      border: "border-amber-500/20"
    },
    purple: {
      icon: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      dot: "bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.6)]",
      hover: "hover:border-purple-500/50 hover:shadow-purple-950/20",
      tag: "text-purple-500",
      border: "border-purple-500/20"
    }
  };

  const scheme = colorStyles[category.themeColor] || colorStyles.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl p-6 bg-theme-card border border-theme transition-all duration-300 ${scheme.hover} shadow-sm hover:shadow-xl flex flex-col justify-between`}
    >
      {/* Subtle top ambient glow gradient */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.accentColor || "from-cyan-500/10 to-transparent"} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="relative z-10">
        {/* Card Header: Category Icon + Title */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className={`p-2.5 rounded-xl border ${scheme.icon} group-hover:scale-105 transition-all duration-300 shrink-0`}>
            <DynamicIcon name={category.icon || "Boxes"} className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-lg font-bold text-theme tracking-tight group-hover:text-cyan-400 transition-colors">
              {category.title}
            </h3>
            <p className="text-[11px] font-mono text-theme-muted truncate">
              {category.subtitle}
            </p>
          </div>
        </div>

        {/* Divider line inside card */}
        <div className="h-px w-full bg-theme-subtle my-3.5" />

        {/* Skill Pills Grid with Proficiency Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {category.skills.map((skill, sIdx) => {
            const skillName = typeof skill === "string" ? skill : skill.name;
            const skillLevel = typeof skill === "object" ? skill.level : null;

            return (
              <span
                key={sIdx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-theme-surface border border-theme text-theme hover:border-cyan-500/40 transition-all duration-200 cursor-default group/pill"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${scheme.dot}`} />
                <span>{skillName}</span>
                {skillLevel && (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-theme-card border border-theme text-theme-muted group-hover/pill:text-cyan-400 transition-colors">
                    {skillLevel}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>

      {/* Footer detail: total skills count & verified status */}
      <div className="relative z-10 mt-5 pt-3 border-t border-theme-subtle flex items-center justify-between text-xs font-mono text-theme-muted">
        <span>{category.skills.length} proficiencies</span>
        <span className={`text-[11px] font-semibold tracking-wider uppercase ${scheme.tag}`}>
          VERIFIED
        </span>
      </div>
    </motion.div>
  );
}
