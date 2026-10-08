import React, { useState, useEffect, lazy, Suspense } from "react";
import Portfolio from "./pages/Portfolio";
import { useTheme } from "./hooks/useTheme";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy-load Admin dashboard so visitors to the public portfolio don't download admin code
const Admin = lazy(() => import("./pages/Admin"));

/**
 * =====================================================================
 * Root Application Component (src/App.jsx)
 * =====================================================================
 * Handles client-side route dispatching:
 * - Public Portfolio: "/" (or any normal anchor)
 * - Admin Mode: "/admin" or "#/admin"
 *
 * Automatically keeps browser history and URL in sync.
 */
export default function App() {
  // Initialize theme tokens
  useTheme();

  // Helper to determine if current URL targets admin
  const isAdminRoute = () => {
    if (typeof window === "undefined") return false;
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return pathname === "/admin" || pathname === "/admin/" || hash === "#/admin" || hash.startsWith("#/admin");
  };

  const [currentRoute, setCurrentRoute] = useState(() => (isAdminRoute() ? "admin" : "portfolio"));

  useEffect(() => {
    const handleLocationChange = () => {
      if (isAdminRoute()) {
        setCurrentRoute("admin");
      } else {
        setCurrentRoute("portfolio");
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const navigateToAdmin = () => {
    setCurrentRoute("admin");
    window.history.pushState({}, "", "/admin");
  };

  const navigateToPortfolio = () => {
    setCurrentRoute("portfolio");
    window.history.pushState({}, "", "/");
  };

  return (
    <ErrorBoundary>
      {currentRoute === "admin" ? (
        <Suspense
          fallback={
            <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-slate-200">
              <div className="relative w-12 h-12 mb-4">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping"></div>
                <div className="w-12 h-12 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"></div>
              </div>
              <p className="font-mono text-xs tracking-wider text-cyan-400/80 uppercase">Loading Management Console...</p>
            </div>
          }
        >
          <Admin onExitAdmin={navigateToPortfolio} />
        </Suspense>
      ) : (
        <Portfolio onNavigateAdmin={navigateToAdmin} />
      )}
    </ErrorBoundary>
  );
}

