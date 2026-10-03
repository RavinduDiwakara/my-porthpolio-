/**
 * =====================================================================
 * Certificate Service (src/services/certificateService.js)
 * =====================================================================
 * CRUD service for certifications.
 * Supports add, edit, delete, and category filtering.
 */

import defaultCerts from "../data/certifications";
import { getStoredData, setStoredData, removeStoredData, STORAGE_KEYS } from "../utils/storage";

export const certificateService = {
  /**
   * Get all certifications
   */
  getCertifications() {
    return getStoredData(STORAGE_KEYS.CERTIFICATIONS, defaultCerts);
  },

  /**
   * Save entire certificate list
   */
  saveCertifications(certsList) {
    setStoredData(STORAGE_KEYS.CERTIFICATIONS, certsList);
    return certsList;
  },

  /**
   * Add a new certificate
   */
  addCertificate(newCert) {
    const current = this.getCertifications();
    const certWithId = {
      ...newCert,
      id: newCert.id || `cert-${Date.now()}`,
      name: newCert.title || newCert.name,
      title: newCert.title || newCert.name,
      organization: newCert.organization || newCert.issuer,
      issuer: newCert.organization || newCert.issuer,
      image: newCert.image || "/certificates/network-fundamentals.png"
    };
    const updated = [certWithId, ...current];
    this.saveCertifications(updated);
    return certWithId;
  },

  /**
   * Update an existing certificate by ID
   */
  updateCertificate(updatedCert) {
    const current = this.getCertifications();
    const normalized = {
      ...updatedCert,
      name: updatedCert.title || updatedCert.name,
      title: updatedCert.title || updatedCert.name,
      organization: updatedCert.organization || updatedCert.issuer,
      issuer: updatedCert.organization || updatedCert.issuer
    };
    const updated = current.map((c) => (c.id === normalized.id ? normalized : c));
    this.saveCertifications(updated);
    return normalized;
  },

  /**
   * Delete a certificate by ID
   */
  deleteCertificate(id) {
    const current = this.getCertifications();
    const updated = current.filter((c) => c.id !== id);
    this.saveCertifications(updated);
    return updated;
  },

  /**
   * Reset certificates to original default data
   */
  resetCertifications() {
    removeStoredData(STORAGE_KEYS.CERTIFICATIONS);
    return defaultCerts;
  }
};

export default certificateService;
