import React from "react";
import {
  LayoutDashboard,
  User,
  Wrench,
  FolderGit2,
  Award,
  GraduationCap,
  Settings,
  ArrowLeft,
  X,
  ShieldCheck,
  LogOut
} from "lucide-react";
import ThemeToggle from "../ThemeToggle";

/**
 * =====================================================================
 * AdminSidebar Component (src/components/admin/AdminSidebar.jsx)
 * =====================================================================
 * Navigation sidebar for the portfolio administration dashboard.
 * Supports:
 * - Active tab switching
 * - Mobile responsive drawer mode
 * - Theme switcher integration
 * - Quick exit back to public portfolio
 * - Secure logout
 */
export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
  onExitAdmin,
  onLogout
}) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Profile Editor", icon: User },
    { id: "skills", label: "Skills Editor", icon: Wrench },
    { id: "projects", label: "Project Editor", icon: FolderGit2 },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "settings", label: "Settings & Backup", icon: Settings }
  ];

  const handleSelectTab = (id) => {
    setActiveTab(id);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden cursor-pointer"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-theme-card border-r border-theme flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header Bar */}
          <div className="p-5 border-b border-theme flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md shadow-cyan-500/20">
                AD
              </div>
              <div>
                <h2 className="text-sm font-bold text-theme tracking-tight">
                  Portfolio Admin
                </h2>
                <span className="text-[10px] font-mono text-cyan-500 font-semibold uppercase">
                  Local Dev Mode
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <ThemeToggle className="p-1.5" />
              {/* Mobile Close Button */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-theme-muted hover:text-theme hover:bg-theme-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Authenticated Status Badge */}
          <div className="m-4 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs">
            <div className="flex items-center gap-1.5 font-semibold font-mono text-[11px] mb-1">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
              <span>AUTHENTICATED</span>
            </div>
            <p className="text-[11px] text-theme-muted font-mono leading-snug">
              User: <span className="text-cyan-400 font-semibold">RavinduDiwakara</span>
            </p>
          </div>

          {/* Nav Items */}
          <nav className="px-3 space-y-1 mt-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                      : "text-theme-secondary hover:text-theme hover:bg-theme-surface"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer: Exit back to public portfolio and Log Out */}
        <div className="p-4 border-t border-theme space-y-2">
          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-red-400 bg-red-950/20 hover:bg-red-950/40 border border-red-800/40 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          )}

          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-theme-muted hover:text-theme bg-theme-surface hover:bg-theme-card-hover border border-theme transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit to Portfolio</span>
          </button>
        </div>
      </aside>
    </>
  );
}
