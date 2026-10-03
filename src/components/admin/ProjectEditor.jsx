import React, { useState } from "react";
import { FolderGit2, Plus, Edit2, Trash2, RotateCcw, CheckCircle2, X, ExternalLink, Github } from "lucide-react";
import projectService from "../../services/projectService";

/**
 * =====================================================================
 * ProjectEditor Component (src/components/admin/ProjectEditor.jsx)
 * =====================================================================
 * Manage portfolio engineering projects:
 * - Add new project
 * - Edit existing project
 * - Delete project
 * - Reset to defaults
 */
export default function ProjectEditor() {
  const [projects, setProjects] = useState(() => projectService.getProjects());
  const [editingProject, setEditingProject] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const initialFormState = {
    id: "",
    title: "",
    category: "Computer Networking",
    badge: "Infrastructure",
    summary: "",
    description: "",
    technologies: "",
    features: "",
    githubUrl: "https://github.com/RavinduDiwakara",
    demoUrl: "",
    icon: "FolderGit2"
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData(initialFormState);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies || "",
      features: Array.isArray(project.features) ? project.features.join("\n") : project.features || ""
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete the project "${title}"?`)) {
      const updated = projectService.deleteProject(id);
      setProjects(updated);
      setStatusMessage({ type: "info", text: `Deleted project: "${title}"` });
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all projects back to the original default projects?")) {
      const reset = projectService.resetProjects();
      setProjects(reset);
      setStatusMessage({ type: "info", text: "Projects reset to defaults." });
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const techArray = formData.technologies
      ? formData.technologies.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const featureArray = formData.features
      ? formData.features.split("\n").map((f) => f.trim()).filter(Boolean)
      : [];

    const projectPayload = {
      ...formData,
      technologies: techArray,
      features: featureArray
    };

    if (editingProject) {
      projectService.updateProject(projectPayload);
      setStatusMessage({ type: "success", text: `Updated "${projectPayload.title}" successfully!` });
    } else {
      projectService.addProject(projectPayload);
      setStatusMessage({ type: "success", text: `Added new project "${projectPayload.title}"!` });
    }

    setProjects(projectService.getProjects());
    setIsFormOpen(false);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme">
        <div>
          <h1 className="text-2xl font-bold text-theme tracking-tight flex items-center gap-2.5">
            <FolderGit2 className="w-6 h-6 text-cyan-500" />
            <span>Project Editor</span>
          </h1>
          <p className="text-xs font-mono text-theme-muted mt-1">
            Manage your featured networking, DevOps, CI/CD, and full-stack projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono bg-theme-surface hover:bg-theme-card-hover border border-theme text-theme transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {statusMessage && (
        <div className="p-4 rounded-xl text-xs font-mono flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-5 rounded-2xl bg-theme-card border border-theme flex flex-col justify-between shadow-sm hover:border-cyan-500/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950/40 border border-cyan-800/40 text-cyan-500">
                  {project.category}
                </span>
                <span className="text-[11px] font-mono text-theme-muted">{project.badge}</span>
              </div>

              <h3 className="text-base font-bold text-theme tracking-tight">{project.title}</h3>
              <p className="mt-2 text-xs text-theme-secondary line-clamp-2 leading-relaxed">
                {project.summary}
              </p>

              {/* Technologies Badges */}
              {project.technologies && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.technologies.slice(0, 5).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-theme-surface text-cyan-500 border border-theme"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="text-[10px] font-mono text-theme-muted self-center">
                      +{project.technologies.length - 5} more
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="mt-5 pt-3 border-t border-theme-subtle flex items-center justify-between">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-theme-muted hover:text-cyan-500 flex items-center gap-1"
              >
                <Github className="w-3 h-3" />
                <span>GitHub Repo</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(project)}
                  className="p-1.5 rounded-lg bg-theme-surface hover:bg-theme-card-hover border border-theme text-theme hover:text-cyan-500 cursor-pointer"
                  title="Edit Project"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="p-1.5 rounded-lg bg-theme-surface hover:bg-red-500/10 border border-theme text-theme-muted hover:text-red-500 cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Project Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-theme-card border border-theme rounded-2xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-theme">
              <h2 className="text-base font-bold text-theme">
                {editingProject ? `Edit: ${editingProject.title}` : "Add New Project"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-lg text-theme-muted hover:text-theme hover:bg-theme-surface cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-secondary mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-theme-secondary mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-theme-secondary mb-1">Badge (e.g. Cisco Simulation)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-theme-secondary mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-theme-secondary mb-1">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-theme-secondary mb-1">
                  Technologies (comma-separated, e.g. Cisco Packet Tracer, VLAN, RIP v2)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-theme-secondary mb-1">
                  Key Capabilities / Features (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans leading-relaxed"
                  placeholder="VLAN segmentation with 802.1Q trunk links&#10;Router-on-a-Stick architecture&#10;RIP v2 routing protocol"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-theme">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-theme-surface hover:bg-theme-card-hover border border-theme text-theme cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 cursor-pointer shadow-md"
                >
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
