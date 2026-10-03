import React, { useState } from "react";
import { GraduationCap, RotateCcw, CheckCircle2, Save } from "lucide-react";
import educationService from "../../services/educationService";

/**
 * =====================================================================
 * EducationEditor Component (src/components/admin/EducationEditor.jsx)
 * =====================================================================
 * Manage academic timeline milestones.
 */
export default function EducationEditor() {
  const [education, setEducation] = useState(() => educationService.getEducation());
  const [statusMessage, setStatusMessage] = useState(null);

  const handleFieldChange = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const handleSave = () => {
    educationService.saveEducation(education);
    setStatusMessage({ type: "success", text: "Education timeline updated successfully!" });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleReset = () => {
    if (window.confirm("Reset education timeline back to default credentials?")) {
      const reset = educationService.resetEducation();
      setEducation(reset);
      setStatusMessage({ type: "info", text: "Education reset to defaults." });
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme">
        <div>
          <h1 className="text-2xl font-bold text-theme tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-cyan-500" />
            <span>Education Editor</span>
          </h1>
          <p className="text-xs font-mono text-theme-muted mt-1">
            Update your academic milestones, university degrees, and exam rankings.
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
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl text-xs font-mono flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Timeline Milestones Cards */}
      <div className="space-y-6">
        {education.map((item, index) => (
          <div
            key={item.id || index}
            className="p-6 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-theme pb-3">
              <span className="text-xs font-mono font-bold text-cyan-500 uppercase">
                Milestone #{index + 1}: {item.badge || item.institution}
              </span>
              <span className="text-xs font-mono text-theme-muted">{item.status}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  Institution Name
                </label>
                <input
                  type="text"
                  value={item.institution}
                  onChange={(e) => handleFieldChange(index, "institution", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  Degree / Stream
                </label>
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => handleFieldChange(index, "degree", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  Period / Year
                </label>
                <input
                  type="text"
                  value={item.period}
                  onChange={(e) => handleFieldChange(index, "period", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  Highlight (e.g. GPA / Rank / Z-Score)
                </label>
                <input
                  type="text"
                  value={item.highlight}
                  onChange={(e) => handleFieldChange(index, "highlight", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-theme-secondary mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(e) => handleFieldChange(index, "description", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
