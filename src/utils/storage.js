/**
 * =====================================================================
 * LocalStorage Management Utilities (src/utils/storage.js)
 * =====================================================================
 * Handles persistent client-side data operations for the portfolio.
 * Provides safe JSON serialization, error handling, and key constants.
 */

export const STORAGE_KEYS = {
  PROFILE: "portfolio-profile-v4",
  PROJECTS: "portfolio-projects-v3",
  CERTIFICATIONS: "portfolio-certifications-v4",
  SKILLS: "portfolio-skills-v3",
  EDUCATION: "portfolio-education-v2",
  CAREER_FOCUS: "portfolio-career-focus",
  THEME: "portfolio-theme",
  AUTH: "portfolio-admin-auth",
  SESSION: "portfolio-admin-session"
};

/**
 * Retrieve stored data by key with a fallback default value
 * @param {string} key - LocalStorage key
 * @param {*} fallback - Default value if key is not found or invalid
 * @returns {*} Parsed value from localStorage or fallback
 */
export function getStoredData(key, fallback = null) {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    if (item === null || item === undefined) return fallback;
    return JSON.parse(item);
  } catch (error) {
    console.warn(`[storage] Error reading key "${key}":`, error);
    return fallback;
  }
}

/**
 * Store data under key in localStorage
 * @param {string} key - LocalStorage key
 * @param {*} value - Value to serialize and store
 * @returns {boolean} Success status
 */
export function setStoredData(key, value) {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom storage event for in-tab reactivity across components
    window.dispatchEvent(new CustomEvent("portfolio-storage-update", { detail: { key, value } }));
    return true;
  } catch (error) {
    console.error(`[storage] Error saving key "${key}":`, error);
    return false;
  }
}

/**
 * Remove stored data by key
 * @param {string} key - LocalStorage key
 * @returns {boolean} Success status
 */
export function removeStoredData(key) {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent("portfolio-storage-update", { detail: { key, value: null } }));
    return true;
  } catch (error) {
    console.error(`[storage] Error removing key "${key}":`, error);
    return false;
  }
}

/**
 * Clear all portfolio-specific data from localStorage
 */
export function clearAllPortfolioData() {
  if (typeof window === "undefined") return;
  const contentKeys = [
    STORAGE_KEYS.PROFILE,
    STORAGE_KEYS.PROJECTS,
    STORAGE_KEYS.CERTIFICATIONS,
    STORAGE_KEYS.SKILLS,
    STORAGE_KEYS.EDUCATION,
    STORAGE_KEYS.CAREER_FOCUS
  ];
  contentKeys.forEach((key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.warn(`[storage] Error clearing ${key}`, err);
    }
  });
  window.dispatchEvent(new CustomEvent("portfolio-storage-update", { detail: { key: "all", value: null } }));
}
