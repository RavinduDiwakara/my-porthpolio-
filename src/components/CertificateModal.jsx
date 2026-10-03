import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, Calendar, ShieldCheck, Download } from "lucide-react";

/**
 * =====================================================================
 * CertificateModal Component (Lightbox)
 * =====================================================================
 * High-definition lightbox modal for viewing certificate credentials.
 * Features:
 * - Full resolution preview with responsive containment
 * - Keyboard support: ESC closes modal
 * - Body scroll lock while modal is visible
 * - Touch-friendly and mobile-optimized
 * - Direct external verification link & credential metadata
 */
export default function CertificateModal({ cert, isOpen, onClose }) {
  // ESC key listener & body scroll prevention
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Save previous overflow style and lock scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!cert) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Dimmed backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-zinc-700/60 bg-zinc-950 text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-sm">
              <div className="flex items-center gap-2.5 overflow-hidden pr-4">
                <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800/60 text-cyan-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <h3
                    id="cert-modal-title"
                    className="text-sm font-bold text-white truncate"
                  >
                    {cert.title || cert.name}
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400 truncate">
                    {cert.organization || cert.issuer} • {cert.category}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Image Viewport */}
            <div className="relative flex-1 min-h-[260px] sm:min-h-[380px] max-h-[60vh] bg-zinc-900/50 flex items-center justify-center p-3 sm:p-6 overflow-auto">
              <img
                src={cert.image}
                alt={cert.title || cert.name}
                className="max-h-full max-w-full object-contain rounded-xl shadow-lg border border-zinc-800"
                onError={(e) => {
                  // Fallback to placeholder if custom file not yet placed
                  e.target.onerror = null;
                  e.target.src = "/certificates/network-fundamentals.png";
                }}
              />
            </div>

            {/* Modal Footer Info & Actions */}
            <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-semibold">
                    {cert.category}
                  </span>
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" /> {cert.year}
                  </span>
                  {cert.credentialId && (
                    <span className="text-zinc-400">
                      ID: <span className="text-zinc-200">{cert.credentialId}</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-300 line-clamp-2 max-w-2xl pt-1">
                  {cert.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0">
                {cert.credentialUrl && cert.credentialUrl !== "#" ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono shadow-md transition-all cursor-pointer"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Academic Verified</span>
                  </span>
                )}

                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
