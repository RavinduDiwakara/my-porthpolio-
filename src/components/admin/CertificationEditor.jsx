import React, { useState } from "react";
import { Award, Plus, Edit2, Trash2, RotateCcw, CheckCircle2, X, ExternalLink, Image as ImageIcon } from "lucide-react";
import certificateService from "../../services/certificateService";
import { CERTIFICATION_CATEGORIES } from "../../data/certifications";

/**
 * =====================================================================
 * CertificationEditor Component (src/components/admin/CertificationEditor.jsx)
 * =====================================================================
 * Manage certificates:
 * - Add certificate
 * - Edit certificate
 * - Delete certificate
 * - Reset to defaults
 * - Assign categories (Networking, DevOps, Cloud, Cybersecurity, Programming, Other)
 */
export default function CertificationEditor() {
  const [certs, setCerts] = useState(() => certificateService.getCertifications());
  const [editingCert, setEditingCert] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const availableCategories = CERTIFICATION_CATEGORIES.filter((c) => c !== "All");

  const initialFormState = {
    id: "",
    title: "",
    organization: "",
    category: "Networking",
    year: "2024",
    description: "",
    image: "/certificates/network-fundamentals.png",
    credentialUrl: "",
    credentialId: ""
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setEditingCert(null);
    setFormData(initialFormState);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingCert(cert);
    setFormData({
      ...cert,
      title: cert.title || cert.name || "",
      organization: cert.organization || cert.issuer || ""
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = certificateService.deleteCertificate(id);
      setCerts(updated);
      setStatusMessage({ type: "info", text: `Deleted certificate: "${title}"` });
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all certifications back to default credentials?")) {
      const reset = certificateService.resetCertifications();
      setCerts(reset);
      setStatusMessage({ type: "info", text: "Certifications reset to defaults." });
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const certPayload = {
      ...formData,
      name: formData.title,
      issuer: formData.organization
    };

    if (editingCert) {
      certificateService.updateCertificate(certPayload);
      setStatusMessage({ type: "success", text: `Updated "${certPayload.title}" successfully!` });
    } else {
      certificateService.addCertificate(certPayload);
      setStatusMessage({ type: "success", text: `Added new certificate "${certPayload.title}"!` });
    }

    setCerts(certificateService.getCertifications());
    setIsFormOpen(false);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme">
        <div>
          <h1 className="text-2xl font-bold text-theme tracking-tight flex items-center gap-2.5">
            <Award className="w-6 h-6 text-cyan-500" />
            <span>Certification Editor</span>
          </h1>
          <p className="text-xs font-mono text-theme-muted mt-1">
            Manage your credentials across Networking, DevOps, Cloud, Cybersecurity, and Programming.
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
            <span>Add Certificate</span>
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

      {/* Certificates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl bg-theme-card border border-theme flex flex-col justify-between shadow-sm hover:border-cyan-500/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950/40 border border-cyan-800/40 text-cyan-500">
                  {cert.category}
                </span>
                <span className="text-[11px] font-mono text-theme-muted">{cert.year}</span>
              </div>

              <h3 className="text-base font-bold text-theme tracking-tight">
                {cert.title || cert.name}
              </h3>
              <p className="text-xs font-mono text-cyan-500 mt-1">
                {cert.organization || cert.issuer}
              </p>
              <p className="mt-2 text-xs text-theme-secondary line-clamp-2 leading-relaxed">
                {cert.description}
              </p>

              {cert.credentialId && (
                <p className="mt-2 text-[10px] font-mono text-theme-muted">
                  ID: {cert.credentialId}
                </p>
              )}
            </div>

            {/* Actions Bar */}
            <div className="mt-5 pt-3 border-t border-theme-subtle flex items-center justify-between">
              <span className="text-[11px] font-mono text-theme-muted truncate max-w-[120px]">
                {cert.image}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(cert)}
                  className="p-1.5 rounded-lg bg-theme-surface hover:bg-theme-card-hover border border-theme text-theme hover:text-cyan-500 cursor-pointer"
                  title="Edit Certificate"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cert.id, cert.title || cert.name)}
                  className="p-1.5 rounded-lg bg-theme-surface hover:bg-red-500/10 border border-theme text-theme-muted hover:text-red-500 cursor-pointer"
                  title="Delete Certificate"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Certificate Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-theme-card border border-theme rounded-2xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-theme">
              <h2 className="text-base font-bold text-theme">
                {editingCert ? `Edit: ${editingCert.title || editingCert.name}` : "Add New Certificate"}
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
                <div className="sm:col-span-2">
                  <label className="block text-theme-secondary mb-1">Certificate Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-theme-secondary mb-1">Organization / Platform *</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Cisco / AWS / Coursera"
                    className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-theme-secondary mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans"
                  >
                    {availableCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-theme-secondary mb-1">Year / Issued Date</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g. 2024"
                    className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-theme-secondary mb-1">Credential ID (Optional)</label>
                  <input
                    type="text"
                    value={formData.credentialId}
                    onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                    placeholder="e.g. CSCO-NET-2024"
                    className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-theme-secondary mb-1">
                    Image Path (in public/certificates/, e.g. /certificates/network-fundamentals.png)
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-theme-secondary mb-1">
                    Certificate Verification URL (Link to Credential / Issuer)
                  </label>
                  <input
                    type="url"
                    value={formData.credentialUrl}
                    onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-theme-secondary mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 font-sans leading-relaxed"
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
                  {editingCert ? "Save Changes" : "Add Certificate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
