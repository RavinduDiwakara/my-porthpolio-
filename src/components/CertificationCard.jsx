import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ExternalLink, Image as ImageIcon, Eye } from "lucide-react";

/**
 * =====================================================================
 * CertificationCard Component
 * =====================================================================
 * Renders an individual certificate credential.
 * Features:
 * - Organization & category badges
 * - Certificate title and summary description
 * - Key syllabus topics
 * - Direct external verification link
 * - "View Certificate Image" button opening the Lightbox modal
 */
export default function CertificationCard({ cert, index, onOpenImage }) {
  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "Networking":
        return "bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-400 dark:border-cyan-800/60 font-semibold";
      case "DevOps":
        return "bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-400 dark:border-teal-800/60 font-semibold";
      case "Cloud":
        return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/60 font-semibold";
      case "Cybersecurity":
        return "bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-400 dark:border-indigo-800/60 font-semibold";
      case "Programming":
        return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800/60 font-semibold";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 font-semibold";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl p-5 sm:p-6 bg-theme-card border border-theme hover:border-cyan-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Top Meta: Organization & Year/Category */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-800/40 text-cyan-700 dark:text-cyan-400">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
              {cert.organization || cert.issuer}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-theme-muted">{cert.year}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-mono border ${getCategoryBadgeClass(
                cert.category
              )}`}
            >
              {cert.category}
            </span>
          </div>
        </div>

        {/* Certificate Title */}
        <h4 className="text-lg font-bold text-theme tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mt-2">
          {cert.title || cert.name}
        </h4>

        {/* Description */}
        <p className="mt-2.5 text-xs text-theme-secondary leading-relaxed">
          {cert.description}
        </p>

        {/* Optional Certificate Thumbnail Preview with Click-to-Zoom */}
        {cert.image && (
          <div
            onClick={() => onOpenImage && onOpenImage(cert)}
            className="mt-4 relative rounded-xl overflow-hidden border border-theme-subtle group/thumb cursor-pointer aspect-[16/9] bg-theme-surface flex items-center justify-center"
            title="Click to view full certificate"
          >
            <img
              src={cert.image}
              alt={cert.title || cert.name}
              className="w-full h-full object-contain p-2 group-hover/thumb:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/certificates/network-fundamentals.png";
              }}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-mono text-white font-medium">
              <Eye className="w-4 h-4" />
              <span>View Full Certificate</span>
            </div>
          </div>
        )}

        {/* Key Syllabus Topics */}
        {cert.topics && cert.topics.length > 0 && (
          <div className="mt-4 pt-3 border-t border-theme-subtle">
            <p className="text-[11px] font-mono uppercase tracking-wider text-theme-muted mb-2 font-semibold">
              Key Competencies:
            </p>
            <ul className="space-y-1.5">
              {cert.topics.map((topic, tIdx) => (
                <li
                  key={tIdx}
                  className="flex items-start gap-2 text-xs text-theme-secondary"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Card Footer: Credential Actions */}
      <div className="mt-6 pt-4 border-t border-theme-subtle flex items-center justify-between text-xs">
        {cert.image ? (
          <button
            onClick={() => onOpenImage && onOpenImage(cert)}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-theme-secondary hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition-colors cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>View Image</span>
          </button>
        ) : (
          <span className="font-mono text-theme-muted text-[11px]">
            Academic Verified
          </span>
        )}

        {cert.credentialUrl && cert.credentialUrl !== "#" ? (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 text-cyan-700 dark:text-cyan-400 border border-cyan-300/80 dark:border-cyan-800/60 transition-all shadow-xs"
          >
            <span>View Certificate</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-theme-muted font-mono text-[11px]">
            {cert.credentialId ? `ID: ${cert.credentialId}` : "Issued"}
          </span>
        )}
      </div>
    </motion.div>
  );
}
