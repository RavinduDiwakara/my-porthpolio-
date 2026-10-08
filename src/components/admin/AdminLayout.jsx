import React, { useState } from "react";
import { Menu, ArrowLeft, LogOut } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import ThemeToggle from "../ThemeToggle";

/**
 * =====================================================================
 * AdminLayout Component (src/components/admin/AdminLayout.jsx)
 * =====================================================================
 * Master layout shell for the admin view.
 * Handles sidebar toggling, responsive layout padding, and header controls.
 */
export default function AdminLayout({
  activeTab,
  setActiveTab,
  onExitAdmin,
  onLogout,
  children
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-theme-bg text-theme flex">
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onExitAdmin={onExitAdmin}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all">
        {/* Mobile Top App Bar */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-theme-card/90 backdrop-blur-md border-b border-theme shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open sidebar"
              className="p-2 rounded-xl bg-white dark:bg-theme-surface border border-slate-300 dark:border-theme text-slate-800 dark:text-theme hover:bg-slate-50 dark:hover:bg-theme-card cursor-pointer shadow-xs"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold tracking-tight text-theme">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {onLogout && (
              <button
                onClick={onLogout}
                title="Log Out"
                className="p-1.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/40 cursor-pointer shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-white dark:bg-theme-surface border border-slate-300 dark:border-theme text-slate-800 dark:text-theme hover:text-cyan-600 dark:hover:text-cyan-500 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
