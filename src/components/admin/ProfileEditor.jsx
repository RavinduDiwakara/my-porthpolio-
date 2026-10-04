import React, { useState, useEffect } from "react";
import { User, Save, RotateCcw, CheckCircle2, Image as ImageIcon, MapPin, Mail, Github, Linkedin, GraduationCap } from "lucide-react";
import portfolioService from "../../services/portfolioService";

/**
 * =====================================================================
 * ProfileEditor Component (src/components/admin/ProfileEditor.jsx)
 * =====================================================================
 * Allows editing personal, academic, and contact details with instant
 * persistence to localStorage and live preview.
 */
export default function ProfileEditor() {
  const [formData, setFormData] = useState(() => portfolioService.getProfile());
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    portfolioService.updateProfile(formData);
    setStatusMessage({ type: "success", text: "Profile details updated successfully!" });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset profile details back to initial defaults?")) {
      const reset = portfolioService.resetProfile();
      setFormData(reset);
      setStatusMessage({ type: "info", text: "Profile reset to initial defaults." });
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme">
        <div>
          <h1 className="text-2xl font-bold text-theme tracking-tight flex items-center gap-2.5">
            <User className="w-6 h-6 text-cyan-500" />
            <span>Profile Editor</span>
          </h1>
          <p className="text-xs font-mono text-theme-muted mt-1">
            Update your core identity, contact links, university information, and bio.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono bg-theme-surface hover:bg-theme-card-hover border border-theme text-theme transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Status Message */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs font-mono flex items-center gap-2 ${
            statusMessage.type === "success"
              ? "bg-emerald-950/40 border border-emerald-500/40 text-emerald-400"
              : "bg-blue-950/40 border border-blue-500/40 text-blue-400"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-5">
          {/* Identity Block */}
          <div className="p-6 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-4">
            <h2 className="text-sm font-mono uppercase font-bold text-cyan-500 tracking-wider">
              Identity &amp; Titles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  Short Display Name
                </label>
                <input
                  type="text"
                  name="shortName"
                  value={formData.shortName || ""}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Academic Block */}
          <div className="p-6 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-4">
            <h2 className="text-sm font-mono uppercase font-bold text-cyan-500 tracking-wider">
              Academic Credentials
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-3">
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  Degree / Program
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree || ""}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  University Name
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university || ""}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Contact & Socials Block */}
          <div className="p-6 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-4">
            <h2 className="text-sm font-mono uppercase font-bold text-cyan-500 tracking-wider">
              Contact &amp; Profiles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  Resume File URL (in /public)
                </label>
                <input
                  type="text"
                  name="resumeUrl"
                  value={formData.resumeUrl || ""}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github || ""}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin || ""}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Bio & Description Block */}
          <div className="p-6 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-4">
            <h2 className="text-sm font-mono uppercase font-bold text-cyan-500 tracking-wider">
              Profile Description
            </h2>

            <div>
              <label className="block text-xs font-mono text-theme-secondary mb-1">
                Primary Bio Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description || ""}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Profile Photo & Card Preview */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-4">
            <h2 className="text-sm font-mono uppercase font-bold text-cyan-500 tracking-wider">
              Profile Photo Preview
            </h2>

            <div>
              <label className="block text-xs font-mono text-theme-secondary mb-1">
                Image Path (e.g. /profile/ravindu-profile.png)
              </label>
              <input
                type="text"
                name="profileImage"
                value={formData.profileImage || ""}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-xs font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Preview Card */}
            <div className="rounded-2xl p-4 bg-theme-surface border border-theme flex flex-col items-center text-center">
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-lg mb-3">
                <img
                  src={formData.profileImage || "/profile/ravindu-profile.png"}
                  alt={formData.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/ravindu.jpg";
                  }}
                />
              </div>
              <h3 className="font-bold text-base text-theme">{formData.name}</h3>
              <p className="text-xs font-mono text-cyan-500 mt-0.5">{formData.title}</p>
              <p className="text-xs text-theme-muted mt-1">{formData.university}</p>
              <p className="text-[11px] font-mono text-emerald-500 mt-1">{formData.degree}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-theme-card border border-theme text-xs space-y-2">
            <h3 className="font-mono font-bold text-theme uppercase">Photo Instructions</h3>
            <p className="text-theme-secondary leading-relaxed">
              Place your image inside <code className="text-cyan-500 font-mono">public/profile/</code> as <code className="text-cyan-500 font-mono">ravindu-profile.png</code>.
            </p>
            <p className="text-theme-muted">
              Any changes saved here will immediately update Hero, About, and Footer across the portfolio.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
