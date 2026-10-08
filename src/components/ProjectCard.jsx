import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, CheckCircle2, Layers, Eye } from "lucide-react";
import DynamicIcon from "./DynamicIcon";

/**
 * =====================================================================
 * ProjectCard Component (src/components/ProjectCard.jsx)
 * =====================================================================
 * Displays an individual engineering project with:
 * - Technical topology header / screenshot banner with click-to-zoom
 * - Project title, category badge, and subtitle
 * - Concise summary
 * - Key features checklist
 * - Technology stack pill tags
 * - Interactive "Explore Architecture" case study modal button
 * - Direct GitHub link
 */
export default function ProjectCard({ project, index, onOpenModal }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="group relative rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Project Visual Header / Architecture Banner */}
      <div
        onClick={() => onOpenModal && onOpenModal(project)}
        className="relative h-52 w-full bg-theme-surface overflow-hidden border-b border-theme flex items-center justify-center cursor-pointer group/banner"
        title="Click to view full architecture & case study"
      >
        {project.image ? (
          <div className="relative w-full h-full bg-zinc-950 flex items-center justify-center p-3">
            <img
              src={project.image}
              alt={project.title}
              className="max-h-full max-w-full object-contain group-hover/banner:scale-105 transition-transform duration-500"
            />
            {/* Hover overlay prompt */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/banner:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-xs font-mono text-white font-medium backdrop-blur-[2px]">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Explore Architecture &amp; VLANs</span>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
            <div className="absolute inset-0 bg-grid-pattern opacity-40" />
            <div className="absolute inset-0 bg-radial-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
              <div className="relative p-4 rounded-2xl bg-theme-card border border-theme text-cyan-500 shadow-md">
                <DynamicIcon name={project.icon || "FolderGit2"} className="w-8 h-8" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping opacity-75" />
              </div>
              <p className="mt-2 text-xs font-mono text-theme-muted font-medium">
                {project.category}
              </p>
            </div>
          </div>
        )}

        {/* Terminal Header Bar */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-theme-muted pointer-events-none z-10">
          <div className="flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-red-500/70" />
            <span className="w-2 h-2 rounded-full bg-amber-500/70" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
            <span className="ml-1.5 text-zinc-300 font-mono text-[10px]">
              cisco://{project.id}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 shadow-sm backdrop-blur-sm">
            {project.badge || "Case Study"}
          </span>
        </div>
      </div>

      {/* Project Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtitle / Department context */}
          {project.subtitle && (
            <p className="text-xs font-mono text-cyan-500 font-semibold mb-1">
              {project.subtitle}
            </p>
          )}

          {/* Project Title */}
          <h3
            onClick={() => onOpenModal && onOpenModal(project)}
            className="text-xl sm:text-2xl font-bold text-theme tracking-tight group-hover:text-cyan-500 transition-colors cursor-pointer"
          >
            {project.title}
          </h3>

          {/* Project Summary */}
          <p className="mt-3 text-sm text-theme-secondary leading-relaxed">
            {project.summary || project.description}
          </p>

          {/* Key Features List */}
          {project.features && project.features.length > 0 && (
            <div className="mt-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-theme-muted mb-2 font-semibold">
                Architecture &amp; Features:
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
              {project.technologies.slice(0, 7).map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-theme-surface text-cyan-500 border border-theme font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 7 && (
                <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-theme-surface text-theme-muted border border-theme">
                  +{project.technologies.length - 7} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons: Explore Case Study and GitHub Link */}
        <div className="mt-7 pt-4 border-t border-theme-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => onOpenModal && onOpenModal(project)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Explore Architecture</span>
          </button>

          <a
            href={project.githubUrl || "https://github.com/RavinduDiwakara"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-medium text-slate-800 dark:text-theme bg-white dark:bg-theme-surface hover:bg-slate-100 dark:hover:bg-theme-card-hover border border-slate-300 dark:border-theme shadow-sm transition-colors cursor-pointer"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
