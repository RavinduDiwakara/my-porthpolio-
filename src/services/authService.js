/**
 * =====================================================================
 * Admin Authentication Service (src/services/authService.js)
 * =====================================================================
 * Manages admin authentication credentials, login sessions, password updates,
 * and security-based password resets for Ravindu Diwakara's portfolio.
 */

import { STORAGE_KEYS, getStoredData, setStoredData, removeStoredData } from "../utils/storage";

// Default credentials specified by the portfolio owner
export const DEFAULT_ADMIN_CREDENTIALS = {
  username: "RavinduDiwakara",
  password: "-2003/April",
  recoveryEmail: "2023t01857@stu.cmb.ac.lk",
  recoveryStudentId: "2023t01857",
  securityQuestion: "What is your University Student ID number?",
  securityAnswer: "2023t01857"
};

class AuthService {
  /**
   * Retrieve active admin credentials from localStorage or fallback to defaults
   */
  getCredentials() {
    const stored = getStoredData(STORAGE_KEYS.AUTH, null);
    if (!stored) {
      return { ...DEFAULT_ADMIN_CREDENTIALS };
    }
    return {
      username: stored.username || DEFAULT_ADMIN_CREDENTIALS.username,
      password: stored.password || DEFAULT_ADMIN_CREDENTIALS.password,
      recoveryEmail: stored.recoveryEmail || DEFAULT_ADMIN_CREDENTIALS.recoveryEmail,
      recoveryStudentId: stored.recoveryStudentId || DEFAULT_ADMIN_CREDENTIALS.recoveryStudentId,
      securityQuestion: stored.securityQuestion || DEFAULT_ADMIN_CREDENTIALS.securityQuestion,
      securityAnswer: stored.securityAnswer || DEFAULT_ADMIN_CREDENTIALS.securityAnswer,
      lastUpdated: stored.lastUpdated || null
    };
  }

  /**
   * Check if the current browser session has an authenticated admin session
   */
  isAuthenticated() {
    if (typeof window === "undefined") return false;

    // Check sessionStorage first
    try {
      const sessionData = window.sessionStorage.getItem(STORAGE_KEYS.SESSION);
      if (sessionData) {
        const parsed = JSON.parse(sessionData);
        if (parsed?.authenticated) return true;
      }
    } catch (e) {
      console.warn("[authService] Error parsing sessionStorage:", e);
    }

    // Check localStorage (for "remember me" sessions)
    try {
      const localSession = window.localStorage.getItem(STORAGE_KEYS.SESSION);
      if (localSession) {
        const parsed = JSON.parse(localSession);
        if (parsed?.authenticated) return true;
      }
    } catch (e) {
      console.warn("[authService] Error parsing localStorage session:", e);
    }

    return false;
  }

  /**
   * Get current session metadata
   */
  getCurrentUser() {
    if (!this.isAuthenticated()) return null;
    const creds = this.getCredentials();
    return {
      username: creds.username,
      email: creds.recoveryEmail
    };
  }

  /**
   * Authenticate admin with username and password
   * @param {string} username
   * @param {string} password
   * @param {boolean} rememberMe
   * @returns {{ success: boolean, error?: string }}
   */
  login(username, password, rememberMe = false) {
    if (!username || !password) {
      return { success: false, error: "Please enter both username and password." };
    }

    const currentCreds = this.getCredentials();
    const cleanUser = String(username).trim();
    const cleanPass = String(password).trim();

    // Verify username (case-insensitive check) and password (exact match)
    const isUserValid = cleanUser.toLowerCase() === currentCreds.username.toLowerCase();
    const isPassValid = cleanPass === currentCreds.password;

    if (!isUserValid || !isPassValid) {
      return {
        success: false,
        error: "Invalid username or password. Please verify your credentials and try again."
      };
    }

    // Create session payload
    const sessionPayload = {
      authenticated: true,
      username: currentCreds.username,
      loggedInAt: new Date().toISOString()
    };

    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionPayload));
        if (rememberMe) {
          window.localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionPayload));
        } else {
          window.localStorage.removeItem(STORAGE_KEYS.SESSION);
        }
        window.dispatchEvent(new CustomEvent("portfolio-auth-update", { detail: { authenticated: true } }));
      } catch (err) {
        console.error("[authService] Error storing session:", err);
      }
    }

    return { success: true };
  }

  /**
   * Terminate active admin session
   */
  logout() {
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(STORAGE_KEYS.SESSION);
        window.localStorage.removeItem(STORAGE_KEYS.SESSION);
        window.dispatchEvent(new CustomEvent("portfolio-auth-update", { detail: { authenticated: false } }));
      } catch (err) {
        console.error("[authService] Error during logout:", err);
      }
    }
  }

  /**
   * Reset password with identity verification
   * Verified by matching either:
   * 1. Registered Email (2023t01857@stu.cmb.ac.lk)
   * 2. University Student ID (2023t01857)
   *
   * @param {Object} params
   * @param {string} params.username
   * @param {string} params.recoveryInput (email or student ID)
   * @param {string} params.newPassword
   * @param {string} params.confirmPassword
   * @returns {{ success: boolean, error?: string, message?: string }}
   */
  resetPassword({ username, recoveryInput, newPassword, confirmPassword }) {
    if (!recoveryInput || !newPassword || !confirmPassword) {
      return { success: false, error: "All required fields must be filled." };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: "New passwords do not match. Please re-enter." };
    }

    if (newPassword.length < 6) {
      return { success: false, error: "New password must be at least 6 characters long." };
    }

    const currentCreds = this.getCredentials();
    const cleanUser = String(username || "").trim().toLowerCase();
    const cleanInput = String(recoveryInput).trim().toLowerCase();

    // Verify username if provided
    if (cleanUser && cleanUser !== currentCreds.username.toLowerCase()) {
      return { success: false, error: "The provided username does not match admin records." };
    }

    // Verify recovery input against email or student ID
    const validEmail = currentCreds.recoveryEmail.toLowerCase();
    const validId = currentCreds.recoveryStudentId.toLowerCase();
    const isVerified = cleanInput === validEmail || cleanInput === validId;

    if (!isVerified) {
      return {
        success: false,
        error: "Verification failed. Please enter your valid registered university email (e.g., 2023t01857@stu.cmb.ac.lk) or Student ID."
      };
    }

    // Save updated password
    const updated = {
      ...currentCreds,
      password: String(newPassword).trim(),
      lastUpdated: new Date().toISOString()
    };

    setStoredData(STORAGE_KEYS.AUTH, updated);

    return {
      success: true,
      message: "Password has been reset successfully! You can now log in with your new password."
    };
  }

  /**
   * Change password from inside the dashboard (requires current password)
   */
  changePassword({ currentPassword, newPassword, confirmPassword }) {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return { success: false, error: "Please fill in all password fields." };
    }

    const currentCreds = this.getCredentials();
    if (String(currentPassword).trim() !== currentCreds.password) {
      return { success: false, error: "Current password is incorrect." };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: "New passwords do not match." };
    }

    if (newPassword.length < 6) {
      return { success: false, error: "New password must be at least 6 characters long." };
    }

    const updated = {
      ...currentCreds,
      password: String(newPassword).trim(),
      lastUpdated: new Date().toISOString()
    };

    setStoredData(STORAGE_KEYS.AUTH, updated);

    return {
      success: true,
      message: "Admin password successfully updated!"
    };
  }

  /**
   * Reset credentials back to factory defaults
   */
  resetToDefaultCredentials() {
    setStoredData(STORAGE_KEYS.AUTH, { ...DEFAULT_ADMIN_CREDENTIALS });
    return {
      success: true,
      message: "Credentials have been restored to initial defaults (Username: RavinduDiwakara, Password: -2003/April)."
    };
  }
}

export const authService = new AuthService();
export default authService;
