import React, { useState, useEffect } from "react";
import Portfolio from "./pages/Portfolio";
import Admin from "./pages/Admin";
import { useTheme } from "./hooks/useTheme";
import ErrorBoundary from "./components/ErrorBoundary";

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
        <Admin onExitAdmin={navigateToPortfolio} />
      ) : (
        <Portfolio onNavigateAdmin={navigateToAdmin} />
      )}
    </ErrorBoundary>
  );
}

