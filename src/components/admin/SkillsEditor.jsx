import React, { useState } from "react";
import { Wrench, Plus, Trash2, RotateCcw, CheckCircle2 } from "lucide-react";
import skillsService from "../../services/skillsService";

/**
 * =====================================================================
 * SkillsEditor Component (src/components/admin/SkillsEditor.jsx)
 * =====================================================================
 * Manage categorized technical skills:
 * - Add new skills to any category
 * - Remove skills
 * - Reset to defaults
 */
export default function SkillsEditor() {
  const [categories, setCategories] = useState(() => skillsService.getSkills());
  const [newSkillName, setNewSkillName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("networking");
  const [statusMessage, setStatusMessage] = useState(null);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const updated = categories.map((cat) => {
      if (cat.id === selectedCategoryId) {
        return {
          ...cat,
          skills: [...cat.skills, { name: newSkillName.trim(), level: "Proficient" }]
        };
      }
      return cat;
    });

    skillsService.saveSkills(updated);
    setCategories(updated);
    setStatusMessage({ type: "success", text: `Added "${newSkillName.trim()}" to skills!` });
    setNewSkillName("");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleDeleteSkill = (catId, skillIndex) => {
    const updated = categories.map((cat) => {
      if (cat.id === catId) {
        const newSkills = [...cat.skills];
        newSkills.splice(skillIndex, 1);
        return { ...cat, skills: newSkills };
      }
      return cat;
    });

    skillsService.saveSkills(updated);
    setCategories(updated);
  };

  const handleReset = () => {
    if (window.confirm("Reset all technical skills back to original defaults?")) {
      const reset = skillsService.resetSkills();
      setCategories(reset);
      setStatusMessage({ type: "info", text: "Skills reset to initial defaults." });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme">
        <div>
          <h1 className="text-2xl font-bold text-theme tracking-tight flex items-center gap-2.5">
            <Wrench className="w-6 h-6 text-cyan-500" />
            <span>Skills Editor</span>
          </h1>
          <p className="text-xs font-mono text-theme-muted mt-1">
            Manage and expand your categorized technical proficiencies.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono bg-theme-surface hover:bg-theme-card-hover border border-theme text-theme transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl text-xs font-mono flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Quick Add Form */}
      <form
        onSubmit={handleAddSkill}
        className="p-5 rounded-2xl bg-theme-card border border-theme shadow-sm flex flex-col sm:flex-row gap-3 items-end"
      >
        <div className="flex-1 w-full">
          <label className="block text-xs font-mono text-theme-secondary mb-1">
            Skill Name (e.g. Terraform, Kubernetes, Ansible)
          </label>
          <input
            type="text"
            required
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="Type skill name..."
            className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="w-full sm:w-64">
          <label className="block text-xs font-mono text-theme-secondary mb-1">
            Target Category
          </label>
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors cursor-pointer shrink-0"
        >
          Add Skill
        </button>
      </form>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-5 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-theme">{category.title}</h3>
                <p className="text-xs font-mono text-theme-muted">{category.subtitle}</p>
              </div>
              <span className="text-xs font-mono text-cyan-500 bg-cyan-950/40 px-2 py-0.5 rounded">
                {category.skills.length} skills
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {category.skills.map((skill, sIdx) => {
                const skillName = typeof skill === "string" ? skill : skill.name;
                return (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-theme-surface border border-theme text-theme group"
                  >
                    <span>{skillName}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(category.id, sIdx)}
                      className="text-theme-muted hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
