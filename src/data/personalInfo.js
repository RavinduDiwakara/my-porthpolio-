/**
 * =====================================================================
 * Backward Compatibility Layer (src/data/personalInfo.js)
 * =====================================================================
 * Re-exports the centralized profile object from `profile.js`.
 * This ensures any components importing { personalInfo } from this file
 * remain completely functional while transitioning to the data-driven architecture.
 */

import profile from "./profile";

export const personalInfo = profile;
export default profile;
