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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl p-6 bg-theme-card border border-theme transition-all duration-300 hover:border-cyan-500/50 shadow-sm hover:shadow-xl flex flex-col justify-between`}
    >
      {/* Subtle top ambient glow gradient */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.accentColor || "from-cyan-500/10 to-transparent"} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="relative z-10">
        {/* Card Header: Category Icon + Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-theme-surface border border-theme text-cyan-500 group-hover:scale-105 transition-all duration-300">
            <DynamicIcon name={category.icon || "Boxes"} className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-theme tracking-tight group-hover:text-cyan-500 transition-colors">
              {category.title}
            </h3>
            <p className="text-xs font-mono text-theme-muted">
              {category.subtitle}
            </p>
          </div>
        </div>

        {/* Divider line inside card */}
        <div className="h-px w-full bg-theme-subtle my-4" />

        {/* Skill Pills / Badges Grid */}
        <div className="flex flex-wrap gap-2 pt-1">
          {category.skills.map((skill, sIdx) => (
            <span
              key={sIdx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-theme-surface border border-theme text-theme hover:text-cyan-500 hover:border-cyan-500/40 transition-all duration-200 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              {typeof skill === "string" ? skill : skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* Footer detail: total skills count */}
      <div className="relative z-10 mt-6 pt-3 border-t border-theme-subtle flex items-center justify-between text-xs font-mono text-theme-muted">
        <span>{category.skills.length} core proficiencies</span>
        <span className="text-cyan-500 group-hover:text-cyan-400 transition-colors font-semibold">
          ACTIVE
        </span>
      </div>
    </motion.div>
  );
}
