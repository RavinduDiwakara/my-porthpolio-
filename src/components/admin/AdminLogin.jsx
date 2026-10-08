import React, { useState } from "react";
import {
  Lock,
  User,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Shield,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Mail,
  HelpCircle,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import authService, { DEFAULT_ADMIN_CREDENTIALS } from "../../services/authService";
import ThemeToggle from "../ThemeToggle";

/**
 * =====================================================================
 * AdminLogin Component (src/components/admin/AdminLogin.jsx)
 * =====================================================================
 * Secure, modern login and password reset interface for portfolio owner.
 * Features:
 * - Direct authentication with username & password
 * - Secure password reset with student email / ID verification
 * - Show/hide password toggles
 * - Polished cyber-aesthetic card with Framer Motion animations
 */
export default function AdminLogin({ onLoginSuccess, onExitToPortfolio }) {
  const [mode, setMode] = useState("login"); // "login" | "reset"

  // Login form state
  const [username, setUsername] = useState("RavinduDiwakara");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset password form state
  const [resetUsername, setResetUsername] = useState("RavinduDiwakara");
  const [recoveryInput, setRecoveryInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  // Handle Login submission
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    setIsSubmitting(true);

    setTimeout(() => {
      const result = authService.login(username, password, rememberMe);
      setIsSubmitting(false);

      if (result.success) {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setLoginError(result.error || "Authentication failed. Please verify credentials.");
      }
    }, 300);
  };

  // Handle Reset Password submission
  const handleResetPassword = (e) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");
    setIsSubmitting(true);

    setTimeout(() => {
      const result = authService.resetPassword({
        username: resetUsername,
        recoveryInput,
        newPassword,
        confirmPassword
      });
      setIsSubmitting(false);

      if (result.success) {
        setResetSuccess(result.message);
        // Pre-fill login username and switch back to login after short delay
        setUsername(resetUsername);
        setPassword(newPassword);
        setTimeout(() => {
          setMode("login");
          setResetSuccess("");
        }, 2200);
      } else {
        setResetError(result.error || "Password reset failed.");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Decorative Tech Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
      </div>

      {/* Top Bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <button
          onClick={onExitToPortfolio}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-theme-card border border-slate-300 dark:border-theme text-xs font-mono font-bold text-slate-800 dark:text-theme-muted hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500 shadow-xs transition-all cursor-pointer group active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-600 dark:text-cyan-400" />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Centered Auth Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-md bg-theme-card/95 backdrop-blur-xl border border-theme rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/20 relative"
        >
          {/* Subtle Top Accent Glow Line */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

          {/* Form Switcher Views */}
          <AnimatePresence mode="wait">
            {mode === "login" ? (
              /* ================= LOGIN MODE ================= */
              <motion.div
                key="login-mode"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 mb-1">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-theme">
                    Admin Portal
                  </h1>
                  <p className="text-xs font-mono text-theme-muted">
                    Authenticate to manage portfolio content &amp; credentials
                  </p>
                </div>

                {/* Login Error Alert */}
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-500/40 text-red-800 dark:text-red-400 text-xs flex items-start gap-2.5 font-mono shadow-xs"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </motion.div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Username Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium font-mono text-theme-secondary">
                      Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        autoComplete="username"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-theme-surface border border-theme text-theme text-sm placeholder:text-theme-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-medium font-mono text-theme-secondary">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setResetError("");
                          setResetSuccess("");
                          setMode("reset");
                        }}
                        className="text-[11px] font-mono text-cyan-500 hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        Reset password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        autoComplete="current-password"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-theme-surface border border-theme text-theme text-sm placeholder:text-theme-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme p-1 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me Option */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-theme text-cyan-500 focus:ring-cyan-500/20 w-4 h-4 cursor-pointer accent-cyan-500"
                      />
                      <span className="text-xs font-mono text-theme-muted">
                        Remember session
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs font-mono tracking-wider uppercase bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer Help Note */}
                <div className="pt-4 border-t border-theme/60 text-center">
                  <div className="text-[11px] font-mono text-theme-muted flex items-center justify-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Protected administrative portal for Ravindu Diwakara</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ================= RESET PASSWORD MODE ================= */
              <motion.div
                key="reset-mode"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/25 mb-1">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-theme">
                    Reset Password
                  </h1>
                  <p className="text-xs text-theme-muted leading-relaxed">
                    Verify your identity via registered university email or Student ID to set a new password.
                  </p>
                </div>

                {/* Success Message */}
                {resetSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs flex items-start gap-2.5 font-mono"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{resetSuccess}</span>
                  </motion.div>
                )}

                {/* Error Message */}
                {resetError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/40 text-red-400 text-xs flex items-start gap-2.5 font-mono"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{resetError}</span>
                  </motion.div>
                )}

                {/* Reset Form */}
                <form onSubmit={handleResetPassword} className="space-y-3.5">
                  {/* Admin Username */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium font-mono text-theme-secondary">
                      Admin Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
                      <input
                        type="text"
                        required
                        value={resetUsername}
                        onChange={(e) => setResetUsername(e.target.value)}
                        placeholder="RavinduDiwakara"
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Registered Email / ID Verification */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-medium font-mono text-theme-secondary">
                        Registered University Email or Student ID
                      </label>
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
                      <input
                        type="text"
                        required
                        value={recoveryInput}
                        onChange={(e) => setRecoveryInput(e.target.value)}
                        placeholder="2023t01857@stu.cmb.ac.lk"
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <span className="text-[10px] text-theme-muted block font-mono pl-1">
                      Hint: 2023t01857@stu.cmb.ac.lk (or student ID: 2023t01857)
                    </span>
                  </div>

                  {/* New Password */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium font-mono text-theme-secondary">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        minLength={6}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password (min. 6 characters)"
                        className="w-full pl-10 pr-10 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme p-1 cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium font-mono text-theme-secondary">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        minLength={6}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full pl-10 pr-10 py-2 rounded-xl bg-theme-surface border border-theme text-theme text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme p-1 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs font-mono tracking-wider uppercase bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Reset &amp; Save Password</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setResetError("");
                        setResetSuccess("");
                        setMode("login");
                      }}
                      className="w-full py-2 rounded-xl text-xs font-mono text-theme-muted hover:text-theme transition-colors cursor-pointer"
                    >
                      Cancel and Return to Login
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-4 text-center">
        <p className="text-[11px] font-mono text-theme-muted">
          Portfolio Control Panel &copy; {new Date().getFullYear()} Ravindu Diwakara. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
