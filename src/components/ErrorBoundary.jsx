import React from "react";
import { AlertTriangle, RefreshCw, Trash2 } from "lucide-react";

/**
 * =====================================================================
 * ErrorBoundary Component
 * =====================================================================
 * Catches JavaScript errors anywhere in the child component tree,
 * logs the error, and displays a resilient fallback UI instead of crashing
 * to a blank screen.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ErrorBoundary caught an unhandled error]:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetCacheAndReload = () => {
    try {
      window.localStorage.clear();
      window.sessionStorage.clear();
    } catch (e) {
      console.warn("Could not clear storage:", e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-8 rounded-2xl bg-[#0b1329] border border-cyan-900/50 shadow-2xl text-center space-y-5">
            <div className="inline-flex p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Something went wrong</h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                The portfolio encountered a temporary rendering issue. You can reload the page or reset the local cache.
              </p>
              {this.state.error && (
                <div className="mt-3 p-3 rounded-lg bg-black/40 border border-slate-800 text-left overflow-auto max-h-32 text-[11px] font-mono text-red-400">
                  {this.state.error.message || String(this.state.error)}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleResetCacheAndReload}
                className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 transition-colors cursor-pointer"
                title="Clears cached local data and reloads"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Cache</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
