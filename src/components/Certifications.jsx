import React, { useState } from "react";
import SectionTitle from "./SectionTitle";
import CertificationCard from "./CertificationCard";
import DynamicIcon from "./DynamicIcon";
import { certificationFields } from "../data/certifications";

/**
 * =====================================================================
 * Certifications Component
 * =====================================================================
 * Displays professional certifications organized by technical field
 * (Networking, Cloud Computing, DevOps & Systems).
 *
 * Includes an interactive tab switcher to filter certifications or view all,
 * highlighting Cisco Network Fundamentals Specialization and AWS Academy tracks.
 */
export default function Certifications() {
  // Active category filter: "all" or specific fieldId ("networking", "cloud", "devops-systems")
  const [activeTab, setActiveTab] = useState("all");

  // Flatten certificates or filter by chosen tab
  const filteredCertificates =
    activeTab === "all"
      ? certificationFields.flatMap((field) => field.certificates)
      : certificationFields.find((field) => field.fieldId === activeTab)
          ?.certificates || [];

  return (
    <section
      id="certifications"
      aria-label="Certifications and Professional Tracks"
      className="py-20 md:py-28 relative bg-[#030712]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionTitle
          badge="CREDENTIALS & KNOWLEDGE"
          title="Certifications & Learning"
          subtitle="Formal industry certifications, academic specializations, and structured curriculum tracks in networking, cloud computing, and DevOps."
        />

        {/* 
          Category Filter Buttons:
          Allows visitors to filter between Networking, Cloud, DevOps, or view All
        */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
              activeTab === "all"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800"
            }`}
          >
            All Tracks ({certificationFields.flatMap((f) => f.certificates).length})
          </button>

          {certificationFields.map((field) => {
            const isActive = activeTab === field.fieldId;
            return (
              <button
                key={field.fieldId}
                onClick={() => setActiveTab(field.fieldId)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  isActive
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                    : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800"
                }`}
              >
                <DynamicIcon name={field.icon} className="w-3.5 h-3.5" />
                <span>{field.fieldName}</span>
              </button>
            );
          })}
        </div>

        {/* 
          Certificates Grid:
          Renders reusable CertificationCard components
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
