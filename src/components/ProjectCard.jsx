import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, CheckCircle2 } from "lucide-react";
import DynamicIcon from "./DynamicIcon";

/**
 * =====================================================================
 * ProjectCard Component
 * =====================================================================
 * Displays an individual engineering project with:
 * - Visual topology / system preview banner with zoom hover effect
 * - Project title, category badge, and concise summary
 * - Key features checklist
 * - Technology stack pill tags
 * - Interactive GitHub link and live demo buttons
 *
 * @param {object} project - Project details from projects.js
 * @param {number} index - Index for staggered viewport entry animations
 */
export default function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className="group relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-950/30 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* 
        Project Visual Header / Architecture Banner
        Includes a simulated technical status bar with terminal dot controls
      */}
      <div className="relative h-48 w-full bg-slate-950 overflow-hidden border-b border-slate-800 flex items-center justify-center p-6">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        {/* Radial cyan highlight on hover */}
        <div className="absolute inset-0 bg-radial-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Terminal Header Bar */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-slate-400 font-mono text-[11px]">
              topology://{project.id}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-cyan-950/80 border border-cyan-800/60 text-cyan-300">
            {project.badge}
          </span>
        </div>

        {/* Central Illustrated Technical Graphic (Dynamic Icon + Pulse Circle) */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-3 transform group-hover:scale-110 transition-transform duration-500">
          <div className="relative p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-cyan-400 shadow-lg shadow-cyan-950/50">
            <DynamicIcon name={project.icon} className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping opacity-75" />
          </div>
          <p className="mt-2 text-xs font-mono text-slate-400 font-medium">
            {project.category}
          </p>
        </div>
      </div>

      {/* Project Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          {/* Project Summary */}
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            {project.summary}
          </p>

          {/* Key Features List */}
          <div className="mt-5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
              Key Architecture & Capabilities:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {project.features.slice(0, 4).map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used Pills */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.technologies.map((tech, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800/80 text-cyan-200 border border-slate-700/60 group-hover:border-cyan-500/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons: GitHub Link and optional Demo */}
        <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-cyan-600 hover:text-white border border-slate-700/80 hover:border-cyan-500 transition-all duration-200 shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </a>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-800/50 transition-all duration-200"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
