/**
 * =====================================================================
 * Project Service (src/services/projectService.js)
 * =====================================================================
 * CRUD service for portfolio projects.
 * Supports add, edit, delete, and reset.
 */

import defaultProjects from "../data/projects";
import { getStoredData, setStoredData, removeStoredData, STORAGE_KEYS } from "../utils/storage";

export const projectService = {
  /**
   * Get all projects
   */
  getProjects() {
    return getStoredData(STORAGE_KEYS.PROJECTS, defaultProjects);
  },

  /**
   * Save entire project list
   */
  saveProjects(projectsList) {
    setStoredData(STORAGE_KEYS.PROJECTS, projectsList);
    return projectsList;
  },

  /**
   * Add a new project
   */
  addProject(newProject) {
    const current = this.getProjects();
    const projectWithId = {
      ...newProject,
      id: newProject.id || `proj-${Date.now()}`
    };
    const updated = [projectWithId, ...current];
    this.saveProjects(updated);
    return projectWithId;
  },

  /**
   * Update an existing project by ID
   */
  updateProject(updatedProject) {
    const current = this.getProjects();
    const updated = current.map((p) => (p.id === updatedProject.id ? updatedProject : p));
    this.saveProjects(updated);
    return updatedProject;
  },

  /**
   * Delete a project by ID
   */
  deleteProject(id) {
    const current = this.getProjects();
    const updated = current.filter((p) => p.id !== id);
    this.saveProjects(updated);
    return updated;
  },

  /**
   * Reset projects to original default data
   */
  resetProjects() {
    removeStoredData(STORAGE_KEYS.PROJECTS);
    return defaultProjects;
  }
};

export default projectService;
