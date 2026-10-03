import React from "react";
import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

/**
 * =====================================================================
 * Projects Component
 * =====================================================================
 * Showcases Ravindu's practical projects spanning Cisco network simulations,
 * multi-container Docker environments, automated CI/CD pipelines, and full-stack
 * MERN application architectures.
 *
 * All project data is pulled dynamically from `src/data/projects.js`.
 */
export default function Projects() {
  return (
    <section
      id="projects"
      aria-label="Featured Engineering Projects"
      className="py-20 md:py-28 relative bg-slate-950/70 border-t border-b border-slate-900"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionTitle
          badge="PORTFOLIO HIGHLIGHTS"
          title="Featured Projects"
          subtitle="Practical engineering implementations demonstrating network architecture design, containerization, pipeline automation, and modern web application development."
        />

        {/* 
          Projects Grid:
          Displays projects in a responsive two-column layout on medium/large screens
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* GitHub Repositories Link Prompt */}
        <div className="mt-14 text-center">
          <p className="text-sm text-slate-400 font-mono">
            Interested in more repositories and technical lab configurations?
          </p>
          <a
            href="https://github.com/RavinduDiwakara"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors group"
          >
            <span>Browse all repositories on GitHub</span>
            <span className="transform group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
