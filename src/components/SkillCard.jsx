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
 * - Micro-interaction on hover (4px lift, subtle border glow, icon scale)
 * - Modern dark glassmorphic styling with cyan/blue accents
 *
 * @param {object} category - Category data containing title, icon, and skills array
 * @param {number} index - Index used for staggered animation delays
 */
export default function SkillCard({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl p-6 bg-slate-900/60 backdrop-blur-md border border-slate-800 transition-all duration-300 ${category.borderColor} hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between`}
    >
      {/* Subtle top ambient glow gradient activated on hover */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="relative z-10">
        {/* Card Header: Category Icon + Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-cyan-400 group-hover:scale-105 group-hover:text-cyan-300 transition-all duration-300">
            <DynamicIcon name={category.icon} className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
              {category.title}
            </h3>
            <p className="text-xs font-mono text-slate-400">
              {category.subtitle}
            </p>
          </div>
        </div>

        {/* Divider line inside card */}
        <div className="h-px w-full bg-slate-800 my-4 group-hover:bg-slate-700/60 transition-colors" />

        {/* Skill Pills / Badges Grid */}
        <div className="flex flex-wrap gap-2 pt-1">
          {category.skills.map((skill, sIdx) => (
            <span
              key={sIdx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-950/70 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-200 cursor-default"
            >
              <span className="w-1 h-1 rounded-full bg-cyan-400/80" />
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* Footer detail: total skills count */}
      <div className="relative z-10 mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500">
        <span>{category.skills.length} core proficiencies</span>
        <span className="text-cyan-500/60 group-hover:text-cyan-400 transition-colors font-semibold">
          ACTIVE
        </span>
      </div>
    </motion.div>
  );
}
