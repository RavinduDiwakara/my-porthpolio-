import React, { useState, useEffect } from "react";
import {
  FolderGit2,
  Award,
  Wrench,
  GraduationCap,
  User,
  ArrowRight,
  Database,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Server,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react";
import AdminLayout from "../components/admin/AdminLayout";
import AdminLogin from "../components/admin/AdminLogin";
import ProfileEditor from "../components/admin/ProfileEditor";
import ProjectEditor from "../components/admin/ProjectEditor";
import CertificationEditor from "../components/admin/CertificationEditor";
import SkillsEditor from "../components/admin/SkillsEditor";
import EducationEditor from "../components/admin/EducationEditor";

import portfolioService from "../services/portfolioService";
import projectService from "../services/projectService";
import certificateService from "../services/certificateService";
import skillsService from "../services/skillsService";
import educationService from "../services/educationService";
import authService from "../services/authService";
import { clearAllPortfolioData, setStoredData, STORAGE_KEYS } from "../utils/storage";

/**
 * =====================================================================
 * Admin Page (src/pages/Admin.jsx)
 * =====================================================================
 * Admin dashboard for portfolio maintenance with secure login & reset password.
 */
export default function Admin({ onExitAdmin }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    profile: portfolioService.getProfile(),
    projects: projectService.getProjects(),
    certifications: certificateService.getCertifications(),
    skills: skillsService.getSkills(),
    education: educationService.getEducation()
  });

  const [settingsNotice, setSettingsNotice] = useState(null);

  // Security & Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordNotice, setPasswordNotice] = useState(null);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Sync auth state
  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(authService.isAuthenticated());
    };
    window.addEventListener("portfolio-auth-update", syncAuth);
    return () => window.removeEventListener("portfolio-auth-update", syncAuth);
  }, []);

  // Sync stats when tabs switch or storage updates
  useEffect(() => {
    const refreshStats = () => {
      setStats({
        profile: portfolioService.getProfile(),
        projects: projectService.getProjects(),
        certifications: certificateService.getCertifications(),
        skills: skillsService.getSkills(),
        education: educationService.getEducation()
      });
    };

    window.addEventListener("portfolio-storage-update", refreshStats);
    return () => window.removeEventListener("portfolio-storage-update", refreshStats);
  }, []);

  // Export current data as JSON backup
  const handleExportData = () => {
    const fullBackup = {
      profile: stats.profile,
      projects: stats.projects,
      certifications: stats.certifications,
      skills: stats.skills,
      education: stats.education,
      exportedAt: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio-data-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setSettingsNotice({ type: "success", text: "Portfolio data exported successfully as JSON!" });
    setTimeout(() => setSettingsNotice(null), 3500);
  };

  // Import JSON backup
  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.profile) setStoredData(STORAGE_KEYS.PROFILE, parsed.profile);
        if (parsed.projects) setStoredData(STORAGE_KEYS.PROJECTS, parsed.projects);
        if (parsed.certifications) setStoredData(STORAGE_KEYS.CERTIFICATIONS, parsed.certifications);
        if (parsed.skills) setStoredData(STORAGE_KEYS.SKILLS, parsed.skills);
        if (parsed.education) setStoredData(STORAGE_KEYS.EDUCATION, parsed.education);

        setSettingsNotice({ type: "success", text: "Data restored successfully from backup file!" });
        setTimeout(() => setSettingsNotice(null), 3500);
      } catch (err) {
        alert("Failed to parse JSON backup file. Please ensure it is a valid portfolio backup.");
      }
    };
    reader.readAsText(file);
  };

  // Reset all to defaults
  const handleResetAll = () => {
    if (window.confirm("WARNING: This will reset all Profile, Projects, Skills, Certifications, and Education to code defaults. Continue?")) {
      clearAllPortfolioData();
      setSettingsNotice({ type: "info", text: "All data reset to original defaults." });
      setTimeout(() => setSettingsNotice(null), 3500);
    }
  };

  // Change password handler
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordNotice(null);
    const res = authService.changePassword({
      currentPassword,
      newPassword,
      confirmPassword: confirmNewPassword
    });

    if (res.success) {
      setPasswordNotice({ type: "success", text: res.message });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setTimeout(() => setPasswordNotice(null), 4000);
    } else {
      setPasswordNotice({ type: "error", text: res.error });
    }
  };

  // Restore factory default credentials
  const handleResetCredentialsToDefault = () => {
    if (
      window.confirm(
        "Restore default admin credentials? (Username: RavinduDiwakara, Password: -2003/April)"
      )
    ) {
      const res = authService.resetToDefaultCredentials();
      setPasswordNotice({ type: "info", text: res.message });
      setTimeout(() => setPasswordNotice(null), 4000);
    }
  };

  // Logout handler
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  // Authentication Guard
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setIsAuthenticated(true)}
        onExitToPortfolio={onExitAdmin}
      />
    );
  }

  const totalSkillPills = stats.skills.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0);

  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onExitAdmin={onExitAdmin}
      onLogout={handleLogout}
    >
      {/* Tab: Dashboard Overview */}
      {activeTab === "dashboard" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-theme tracking-tight">
              Welcome back, {stats.profile.shortName || "Ravindu"}!
            </h1>
            <p className="text-xs sm:text-sm font-mono text-theme-muted mt-1">
              Manage your personal portfolio content, certificates, projects, and skills from this central dashboard.
            </p>
          </div>

          {/* Overview Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Projects */}
            <div
              onClick={() => setActiveTab("projects")}
              className="p-5 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
                  Total Projects
                </span>
                <div className="p-2 rounded-xl bg-cyan-950/40 text-cyan-500 border border-cyan-800/40">
                  <FolderGit2 className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-theme font-mono">
                {stats.projects.length}
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs font-mono text-cyan-500 group-hover:translate-x-1 transition-transform">
                <span>Manage projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Total Certifications */}
            <div
              onClick={() => setActiveTab("certifications")}
              className="p-5 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
                  Certifications
                </span>
                <div className="p-2 rounded-xl bg-teal-950/40 text-teal-500 border border-teal-800/40">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-theme font-mono">
                {stats.certifications.length}
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs font-mono text-teal-500 group-hover:translate-x-1 transition-transform">
                <span>Manage credentials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Total Skills */}
            <div
              onClick={() => setActiveTab("skills")}
              className="p-5 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
                  Total Skills
                </span>
                <div className="p-2 rounded-xl bg-blue-950/40 text-blue-500 border border-blue-800/40">
                  <Wrench className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-theme font-mono">
                {totalSkillPills}
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs font-mono text-blue-500 group-hover:translate-x-1 transition-transform">
                <span>Across {stats.skills.length} categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Academic Status */}
            <div
              onClick={() => setActiveTab("education")}
              className="p-5 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
                  Education
                </span>
                <div className="p-2 rounded-xl bg-emerald-950/40 text-emerald-500 border border-emerald-800/40">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-theme truncate">
                BICT Degree
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs font-mono text-emerald-500 group-hover:translate-x-1 transition-transform truncate">
                <span>Univ. of Colombo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Quick Launch Hub */}
          <div className="p-6 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-4">
            <h2 className="text-sm font-mono font-bold text-cyan-500 uppercase tracking-wider">
              Quick Management Shortcuts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setActiveTab("profile")}
                className="p-4 rounded-xl bg-theme-surface hover:bg-theme-card-hover border border-theme flex items-center gap-3 text-left transition-all cursor-pointer"
              >
                <div className="p-2.5 rounded-lg bg-cyan-950/40 text-cyan-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-theme">Edit Profile &amp; Bio</h3>
                  <p className="text-[11px] font-mono text-theme-muted">Title, Bio, Links</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("projects")}
                className="p-4 rounded-xl bg-theme-surface hover:bg-theme-card-hover border border-theme flex items-center gap-3 text-left transition-all cursor-pointer"
              >
                <div className="p-2.5 rounded-lg bg-blue-950/40 text-blue-500">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-theme">Add / Edit Projects</h3>
                  <p className="text-[11px] font-mono text-theme-muted">Packet Tracer, Docker</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("certifications")}
                className="p-4 rounded-xl bg-theme-surface hover:bg-theme-card-hover border border-theme flex items-center gap-3 text-left transition-all cursor-pointer"
              >
                <div className="p-2.5 rounded-lg bg-teal-950/40 text-teal-500">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-theme">Add Certificates</h3>
                  <p className="text-[11px] font-mono text-theme-muted">Cisco, AWS, Linux</p>
                </div>
              </button>
            </div>
          </div>

          {/* Architecture Readiness Card */}
          <div className="p-6 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-cyan-500 font-mono font-bold text-xs uppercase">
              <Server className="w-4 h-4" />
              <span>Full-Stack Architecture Plan</span>
            </div>
            <p className="text-xs text-theme-secondary leading-relaxed">
              This portfolio is architected with a dedicated Service Layer (<code className="text-cyan-500 font-mono">src/services/</code>).
              Currently, it reads and writes to browser localStorage. When you are ready to connect a Node.js + Express.js + MongoDB backend,
              you only need to update the methods in <code className="text-cyan-500 font-mono">portfolioService.js</code>, <code className="text-cyan-500 font-mono">projectService.js</code>, and <code className="text-cyan-500 font-mono">certificateService.js</code> to make REST API requests!
            </p>
          </div>
        </div>
      )}

      {/* Tab: Profile */}
      {activeTab === "profile" && <ProfileEditor />}

      {/* Tab: Skills */}
      {activeTab === "skills" && <SkillsEditor />}

      {/* Tab: Projects */}
      {activeTab === "projects" && <ProjectEditor />}

      {/* Tab: Certifications */}
      {activeTab === "certifications" && <CertificationEditor />}

      {/* Tab: Education */}
      {activeTab === "education" && <EducationEditor />}

      {/* Tab: Settings & Backup */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="pb-4 border-b border-theme">
            <h1 className="text-2xl font-bold text-theme tracking-tight flex items-center gap-2.5">
              <Database className="w-6 h-6 text-cyan-500" />
              <span>Data Settings &amp; Backup</span>
            </h1>
            <p className="text-xs font-mono text-theme-muted mt-1">
              Export your portfolio data as JSON, restore from a backup file, or reset all data to default.
            </p>
          </div>

          {settingsNotice && (
            <div className="p-4 rounded-xl text-xs font-mono flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{settingsNotice.text}</span>
            </div>
          )}

          {/* Admin Credentials & Password Security Card */}
          <div className="p-6 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-theme">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-cyan-500" />
                  <h2 className="text-sm font-bold text-theme">Admin Security &amp; Password</h2>
                </div>
                <p className="text-xs text-theme-muted font-mono">
                  Manage your admin login password and view registered recovery details.
                </p>
              </div>

              {/* Status Pills */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  User: <strong>RavinduDiwakara</strong>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
                  Recovery: <strong>2023t01857@stu.cmb.ac.lk</strong>
                </span>
              </div>
            </div>

            {/* Password Notice */}
            {passwordNotice && (
              <div
                className={`p-3.5 rounded-xl text-xs font-mono flex items-center gap-2.5 ${
                  passwordNotice.type === "success"
                    ? "bg-emerald-950/40 border border-emerald-500/40 text-emerald-400"
                    : passwordNotice.type === "info"
                    ? "bg-blue-950/40 border border-blue-500/40 text-blue-400"
                    : "bg-red-950/40 border border-red-500/40 text-red-400"
                }`}
              >
                {passwordNotice.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{passwordNotice.text}</span>
              </div>
            )}

            {/* Change Password Form */}
            <form onSubmit={handleChangePassword} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {/* Current Password */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-theme-secondary">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full pl-3 pr-9 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme p-1 cursor-pointer"
                  >
                    {showCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-theme-secondary">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full pl-3 pr-9 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme p-1 cursor-pointer"
                  >
                    {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-theme-secondary">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    required
                    minLength={6}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full pl-3 pr-9 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme p-1 cursor-pointer"
                  >
                    {showConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="sm:col-span-3 flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white cursor-pointer shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Update Password</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetCredentialsToDefault}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-theme-muted hover:text-amber-400 bg-theme-surface hover:bg-theme-card-hover border border-theme cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restore Default Credentials (-2003/April)</span>
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Export */}
            <div className="p-6 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-theme">Export Portfolio Backup</h2>
              <p className="text-xs text-theme-secondary leading-relaxed">
                Download a complete JSON snapshot containing all your edited profile, project, certification, and skill data.
              </p>
              <button
                type="button"
                onClick={handleExportData}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON Backup</span>
              </button>
            </div>

            {/* Import */}
            <div className="p-6 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-theme">Import / Restore Backup</h2>
              <p className="text-xs text-theme-secondary leading-relaxed">
                Restore your previously exported JSON file into browser storage.
              </p>
              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-theme-surface hover:bg-theme-card-hover border border-theme text-theme cursor-pointer shadow-sm">
                <Upload className="w-4 h-4 text-cyan-500" />
                <span>Select JSON File</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
            </div>

            {/* Reset All */}
            <div className="p-6 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-3 sm:col-span-2">
              <h2 className="text-sm font-bold text-red-400">Reset All Stored Data</h2>
              <p className="text-xs text-theme-secondary leading-relaxed">
                Clears all custom localStorage edits and reloads the original source data from <code className="text-cyan-500 font-mono">src/data/</code>.
              </p>
              <button
                type="button"
                onClick={handleResetAll}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-red-400 bg-red-950/20 hover:bg-red-950/40 border border-red-800/40 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All to Defaults</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
