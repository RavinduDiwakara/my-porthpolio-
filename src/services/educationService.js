/**
 * =====================================================================
 * Education Service (src/services/educationService.js)
 * =====================================================================
 * Manages education timeline data with persistence.
 */

import defaultEducation from "../data/education";
import { getStoredData, setStoredData, removeStoredData, STORAGE_KEYS } from "../utils/storage";

export const educationService = {
  getEducation() {
    return getStoredData(STORAGE_KEYS.EDUCATION, defaultEducation);
  },

  saveEducation(educationData) {
    setStoredData(STORAGE_KEYS.EDUCATION, educationData);
    return educationData;
  },

  resetEducation() {
    removeStoredData(STORAGE_KEYS.EDUCATION);
    return defaultEducation;
  }
};

export default educationService;
