import React, { useState, useEffect } from "react";
import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import projectService from "../services/projectService";

/**
 * =====================================================================
 * Projects Component (src/components/Projects.jsx)
 * =====================================================================
 * Showcases Ravindu's practical projects spanning Cisco network simulations,
 * multi-campus and multi-site enterprise topologies, multi-container Docker environments,
 * automated CI/CD pipelines, and full-stack MERN application architectures.
 *
 * Includes interactive full-screen architecture case study modal.
 */
export default function Projects() {
  const [projectsList, setProjectsList] = useState(() => projectService.getProjects());
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleStorageUpdate = () => {
      setProjectsList(projectService.getProjects());
    };
    window.addEventListener("portfolio-storage-update", handleStorageUpdate);
    return () => window.removeEventListener("portfolio-storage-update", handleStorageUpdate);
  }, []);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      aria-label="Featured Engineering Projects"
      className="py-20 md:py-28 relative bg-theme-surface border-t border-b border-theme"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="PORTFOLIO HIGHLIGHTS"
          title="Featured Projects"
          subtitle="Practical engineering implementations demonstrating network architecture design, VLAN segmentation, dynamic routing, containerization, and modern infrastructure."
        />

        {/* Projects Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsList.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        {/* GitHub Repositories Link Prompt */}
        <div className="mt-14 text-center">
          <p className="text-sm text-theme-secondary font-mono">
            Interested in more repositories and technical lab configurations?
          </p>
          <a
            href="https://github.com/RavinduDiwakara"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 font-medium text-sm transition-colors group"
          >
            <span>Browse all repositories on GitHub</span>
            <span className="transform group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </a>
        </div>
      </div>

      {/* Interactive Project Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
