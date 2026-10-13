/**
 * =====================================================================
 * Skills Service (src/services/skillsService.js)
 * =====================================================================
 * Manages categorized skills data with persistence.
 */

import defaultSkills from "../data/skills";
import { getStoredData, setStoredData, removeStoredData, STORAGE_KEYS } from "../utils/storage";

export const skillsService = {
  getSkills() {
    return getStoredData(STORAGE_KEYS.SKILLS, defaultSkills);
  },

  saveSkills(skillsData) {
    setStoredData(STORAGE_KEYS.SKILLS, skillsData);
    return skillsData;
  },

  resetSkills() {
    removeStoredData(STORAGE_KEYS.SKILLS);
    return defaultSkills;
  }
};

export default skillsService;
