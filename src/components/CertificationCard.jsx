import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ExternalLink } from "lucide-react";

/**
 * =====================================================================
 * CertificationCard Component
 * =====================================================================
 * Renders an individual certification credential or active learning track.
 * Features:
 * - Issuer badge and status badge (Completed, Enrolled, Planned)
 * - Detailed curriculum topics breakdown
 * - Verification link placeholder
 * - Polished hover glow effect
 *
 * @param {object} cert - Certificate object from certifications.js
 * @param {number} index - Index for staggered animations
 */
export default function CertificationCard({ cert, index }) {
  // Determine status pill badge style based on completion status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-950/70 text-emerald-400 border-emerald-800/60";
      case "Enrolled":
        return "bg-cyan-950/70 text-cyan-400 border-cyan-800/60";
      case "Planned":
        return "bg-slate-800 text-slate-400 border-slate-700";
      default:
        return "bg-blue-950/70 text-blue-400 border-blue-800/60";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl p-6 bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Top Meta: Issuer & Status Badge */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-cyan-400">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono text-cyan-300 font-medium">
              {cert.issuer}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500">{cert.year}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-mono border ${getStatusBadge(
                cert.status
              )}`}
            >
              {cert.status}
            </span>
          </div>
        </div>

        {/* Certificate Title */}
        <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors mt-2">
          {cert.name}
        </h4>

        {/* Description */}
        <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
          {cert.description}
        </p>

        {/* Key Curriculum Topics */}
        {cert.topics && cert.topics.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/60">
            <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
              Syllabus Topics Covered:
            </p>
            <ul className="space-y-1.5">
              {cert.topics.map((topic, tIdx) => (
                <li
                  key={tIdx}
                  className="flex items-start gap-2 text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Credential Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
        <span className="font-mono text-slate-500">
          {cert.verified ? "Verified Credential" : "Curriculum Track"}
        </span>
        {cert.credentialUrl && cert.credentialUrl !== "#" ? (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            <span>Verify</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-slate-500 font-mono text-[11px]">
            Academic Record
          </span>
        )}
      </div>
    </motion.div>
  );
}
