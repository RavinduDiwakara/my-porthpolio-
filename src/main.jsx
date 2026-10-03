import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

/**
 * =====================================================================
 * Application Entry Point (main.jsx)
 * =====================================================================
 * This file bootstraps the React application.
 * It selects the DOM node with id="root" from index.html, initializes
 * React's concurrent root renderer, and renders the top-level <App /> component.
 */
const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Failed to find the root element to mount React application.");
}
