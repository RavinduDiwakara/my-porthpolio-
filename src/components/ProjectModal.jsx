import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  Network,
  CheckCircle2,
  Table,
  ChevronDown,
  ChevronUp,
  Layers,
  ShieldCheck,
  Server,
  Terminal,
  Activity,
  Maximize2
} from "lucide-react";
import DynamicIcon from "./DynamicIcon";

/**
 * =====================================================================
 * ProjectModal Component (src/components/ProjectModal.jsx)
 * =====================================================================
 * High-definition technical case study modal for networking and infrastructure projects:
 * - Topology architecture preview with zoom capability
 * - Collapsible VLAN configuration table
 * - My Contributions & implementation details
 * - Router connectivity & routing specifications
 * - Network services & security highlights
 * - Testing & validation checklist
 * - DevOps relevance & skills breakdown
 * - Responsive, mobile-optimized, and accessible
 */
export default function ProjectModal({ project, isOpen, onClose }) {
  const [isVlanExpanded, setIsVlanExpanded] = useState(true);
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setSelectedScreenshotIndex(0);
    setIsVlanExpanded(true);
  }, [project]);

  if (!project) return null;

  const currentScreenshot =
    project.screenshots && project.screenshots.length > 0
      ? project.screenshots[selectedScreenshotIndex]
      : project.image;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Dimmed backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-zinc-700/60 bg-zinc-950 text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3 overflow-hidden pr-4">
                <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-800/60 text-cyan-400 shrink-0">
                  <DynamicIcon name={project.icon || "Network"} className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
                      {project.badge || project.category}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                      {project.type || "Technical Case Study"}
                    </span>
                  </div>
                  <h3
                    id="project-modal-title"
                    className="text-base sm:text-lg font-bold text-white tracking-tight truncate mt-0.5"
                  >
                    {project.title}
                  </h3>
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

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* Architecture Topology Viewport */}
              {currentScreenshot && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden shadow-inner">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/80 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span>Cisco Packet Tracer Architecture Topology</span>
                    </div>
                    {project.screenshots && project.screenshots.length > 1 && (
                      <div className="flex items-center gap-1.5">
                        {project.screenshots.map((_, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => setSelectedScreenshotIndex(sIdx)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                              selectedScreenshotIndex === sIdx
                                ? "bg-cyan-500 text-slate-950 font-bold"
                                : "bg-zinc-800 text-zinc-400 hover:text-white"
                            }`}
                          >
                            View {sIdx + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative group/zoom aspect-[16/9] sm:aspect-[21/9] bg-zinc-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                    <img
                      src={currentScreenshot}
                      alt={project.title}
                      className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300"
                    />
                  </div>
                </div>
              )}

              {/* Subtitle / Overview Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" />
                  <span>Project Overview</span>
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.description || project.summary}
                </p>
                {project.architectureOverview && (
                  <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                    {project.architectureOverview}
                  </p>
                )}
              </div>

              {/* My Contributions (CV-Ready Technical Section) */}
              {project.contributions && (
                <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 space-y-1.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                    <Terminal className="w-4 h-4" />
                    <span>My Contributions &amp; Implementation</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                    {project.contributions}
                  </p>
                </div>
              )}

              {/* Collapsible VLAN Table */}
              {project.vlanTable && project.vlanTable.length > 0 && (
                <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/40">
                  <button
                    type="button"
                    onClick={() => setIsVlanExpanded(!isVlanExpanded)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left bg-zinc-900 hover:bg-zinc-850 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Table className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        VLAN Segmentation Table
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">
                        {project.vlanTable.length} VLANs
                      </span>
                    </div>
                    {isVlanExpanded ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    )}
                  </button>

                  {isVlanExpanded && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800 uppercase text-[10px]">
                          <tr>
                            {project.vlanTable[0]?.floor && (
                              <th className="px-3.5 py-2.5">Floor</th>
                            )}
                            <th className="px-3.5 py-2.5">VLAN ID</th>
                            <th className="px-3.5 py-2.5">Department / Segment</th>
                            {project.vlanTable[0]?.network && (
                              <th className="px-3.5 py-2.5">Network Subnet</th>
                            )}
                            {project.vlanTable[0]?.gateway && (
                              <th className="px-3.5 py-2.5">Gateway IP</th>
                            )}
                            {project.vlanTable[0]?.site && (
                              <th className="px-3.5 py-2.5">Site / Location</th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                          {project.vlanTable.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-zinc-800/30 transition-colors">
                              {row.floor && (
                                <td className="px-3.5 py-2 text-zinc-400 font-medium">
                                  {row.floor}
                                </td>
                              )}
                              <td className="px-3.5 py-2 text-cyan-400 font-bold">
                                VLAN {row.vlan}
                              </td>
                              <td className="px-3.5 py-2 text-white">{row.department}</td>
                              {row.network && (
                                <td className="px-3.5 py-2 text-emerald-400 font-mono">
                                  {row.network}
                                </td>
                              )}
                              {row.gateway && (
                                <td className="px-3.5 py-2 text-sky-400 font-mono">
                                  {row.gateway}
                                </td>
                              )}
                              {row.site && (
                                <td className="px-3.5 py-2 text-zinc-400">{row.site}</td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Router Connectivity & Security Details */}
              {(project.routerConnectivity || project.routingOverview || project.securityHighlight) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(project.routerConnectivity || project.routingOverview) && (
                    <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                        <Network className="w-4 h-4" />
                        <span>Router &amp; WAN Connectivity</span>
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {project.routerConnectivity || project.routingOverview}
                      </p>
                    </div>
                  )}

                  {project.securityHighlight && (
                    <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-800/40 space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Security &amp; Remote Administration</span>
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {project.securityHighlight}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Network Services Grid */}
              {project.networkServices && project.networkServices.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Configured Network Services</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {project.networkServices.map((svc, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                      >
                        <span className="text-xs font-bold font-mono text-cyan-400 block mb-0.5">
                          {svc.title}
                        </span>
                        <p className="text-[11px] text-zinc-300 leading-snug">{svc.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features & Architecture Highlights */}
              {project.features && project.features.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Key Architecture Highlights</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                    {project.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testing & Validation Section */}
              {project.testing && project.testing.length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                    <Activity className="w-4 h-4" />
                    <span>Testing &amp; Validation Results</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                    {project.testing.map((tItem, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{tItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* DevOps Relevance */}
              {project.devopsRelevance && (
                <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-800/40 space-y-1.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                    DevOps &amp; Cloud Infrastructure Relevance
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {project.devopsRelevance}
                  </p>
                </div>
              )}

              {/* Technologies Tag Cloud */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    Technologies &amp; Protocols
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-700/80 text-cyan-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Bar */}
            <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <span className="text-xs font-mono text-zinc-400">
                Created by <strong className="text-zinc-200">H.U.G. Ravindu Diwakara</strong>
              </span>

              <div className="flex items-center gap-2.5">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
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
