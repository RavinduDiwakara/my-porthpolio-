import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, CheckCircle2 } from "lucide-react";
import DynamicIcon from "./DynamicIcon";

/**
 * =====================================================================
 * ProjectCard Component
 * =====================================================================
 * Displays an individual engineering project with:
 * - Technical topology header with simulated terminal status controls
 * - Project title, category badge, and concise summary
 * - Key features checklist
 * - Technology stack pill tags
 * - Interactive GitHub link and live demo buttons
 */
export default function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className="group relative rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Project Visual Header / Architecture Banner */}
      <div className="relative h-48 w-full bg-theme-surface overflow-hidden border-b border-theme flex items-center justify-center p-6">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        {/* Radial highlight on hover */}
        <div className="absolute inset-0 bg-radial-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Terminal Header Bar */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-theme-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-theme-muted font-mono text-[11px]">
              topology://{project.id}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-cyan-950/40 border border-cyan-800/40 text-cyan-500">
            {project.badge || "Project"}
          </span>
        </div>

        {/* Central Illustrated Technical Graphic */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-3 transform group-hover:scale-110 transition-transform duration-500">
          <div className="relative p-4 rounded-2xl bg-theme-card border border-theme text-cyan-500 shadow-md">
            <DynamicIcon name={project.icon || "FolderGit2"} className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping opacity-75" />
          </div>
          <p className="mt-2 text-xs font-mono text-theme-muted font-medium">
            {project.category}
          </p>
        </div>
      </div>

      {/* Project Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-theme tracking-tight group-hover:text-cyan-500 transition-colors">
            {project.title}
          </h3>

          {/* Project Summary */}
          <p className="mt-3 text-sm text-theme-secondary leading-relaxed">
            {project.summary}
          </p>

          {/* Key Features List */}
          {project.features && project.features.length > 0 && (
            <div className="mt-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-theme-muted mb-2 font-semibold">
                Key Architecture &amp; Capabilities:
              </h4>
              <ul className="space-y-1.5 text-xs text-theme-secondary">
                {project.features.slice(0, 4).map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used Pills */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.technologies.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-theme-surface text-cyan-500 border border-theme"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons: GitHub Link and optional Demo */}
        <div className="mt-8 pt-5 border-t border-theme-subtle flex items-center justify-between gap-3">
          <a
            href={project.githubUrl || "https://github.com/RavinduDiwakara"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-theme bg-theme-surface hover:bg-cyan-600 hover:text-white border border-theme hover:border-cyan-500 transition-all duration-200 shadow-sm cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </a>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-cyan-500 hover:text-cyan-400 bg-cyan-950/20 hover:bg-cyan-950/40 border border-cyan-800/40 transition-all duration-200 cursor-pointer"
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
