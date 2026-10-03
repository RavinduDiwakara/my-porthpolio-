/**
 * =====================================================================
 * Portfolio Service (src/services/portfolioService.js)
 * =====================================================================
 * Backend-ready data abstraction for profile and career focus.
 * Currently backed by localStorage. To integrate Node.js + Express + MongoDB:
 * simply replace the getStoredData / setStoredData calls with fetch('/api/profile')!
 */

import defaultProfile from "../data/profile";
import { careerPillars as defaultCareerPillars } from "../data/careerFocus";
import { getStoredData, setStoredData, removeStoredData, STORAGE_KEYS } from "../utils/storage";

export const portfolioService = {
  /**
   * Fetch current profile data (from localStorage if edited, otherwise default)
   */
  getProfile() {
    return getStoredData(STORAGE_KEYS.PROFILE, defaultProfile);
  },

  /**
   * Save updated profile data
   */
  updateProfile(updatedData) {
    const merged = { ...defaultProfile, ...updatedData };
    setStoredData(STORAGE_KEYS.PROFILE, merged);
    return merged;
  },

  /**
   * Reset profile to the original code default
   */
  resetProfile() {
    removeStoredData(STORAGE_KEYS.PROFILE);
    return defaultProfile;
  },

  /**
   * Fetch career focus pillars
   */
  getCareerFocus() {
    return getStoredData(STORAGE_KEYS.CAREER_FOCUS, defaultCareerPillars);
  },

  /**
   * Save career focus pillars
   */
  updateCareerFocus(pillars) {
    setStoredData(STORAGE_KEYS.CAREER_FOCUS, pillars);
    return pillars;
  },

  /**
   * Reset career focus to defaults
   */
  resetCareerFocus() {
    removeStoredData(STORAGE_KEYS.CAREER_FOCUS);
    return defaultCareerPillars;
  }
};

export default portfolioService;
