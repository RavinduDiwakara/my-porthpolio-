import React, { useState, useEffect } from "react";
import { Search, Award, Filter, ChevronDown, ChevronUp } from "lucide-react";
import SectionTitle from "./SectionTitle";
import CertificationCard from "./CertificationCard";
import CertificateModal from "./CertificateModal";
import certificateService from "../services/certificateService";
import { CERTIFICATION_CATEGORIES } from "../data/certifications";

/**
 * =====================================================================
 * Certifications Component
 * =====================================================================
 * Complete Certificate Management & Showcase section:
 * - Category filter tabs: All, Networking, DevOps, Cloud, Cybersecurity, Programming, Other
 * - Search input for instant keyword lookup
 * - Interactive certificate cards with hover effects
 * - Responsive "View More" toggle button (limits items on mobile to prevent excessive scrolling)
 * - Lightbox modal integration for viewing full certificates
 */
export default function Certifications() {
  const [certs, setCerts] = useState(() => certificateService.getCertifications());
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Responsive pagination state
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleStorageUpdate = () => {
      setCerts(certificateService.getCertifications());
    };
    window.addEventListener("portfolio-storage-update", handleStorageUpdate);
    return () => window.removeEventListener("portfolio-storage-update", handleStorageUpdate);
  }, []);

  // Detect mobile screen width (< 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset expansion whenever category filter or search query changes
  useEffect(() => {
    setIsExpanded(false);
  }, [activeCategory, searchQuery]);

  const handleOpenModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCert(null);
  };

  // Filter by category and search query
  const filteredCerts = certs.filter((cert) => {
    const matchesCategory =
      activeCategory === "All" ||
      (cert.category && cert.category.toLowerCase() === activeCategory.toLowerCase());

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      (cert.title && cert.title.toLowerCase().includes(query)) ||
      (cert.name && cert.name.toLowerCase().includes(query)) ||
      (cert.organization && cert.organization.toLowerCase().includes(query)) ||
      (cert.issuer && cert.issuer.toLowerCase().includes(query)) ||
      (cert.description && cert.description.toLowerCase().includes(query)) ||
      (cert.topics && cert.topics.some((t) => t.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  // Limit initial items on mobile (3 items) and desktop (6 items)
  const initialLimit = isMobile ? 3 : 6;
  const hasMore = filteredCerts.length > initialLimit;
  const visibleCerts = isExpanded ? filteredCerts : filteredCerts.slice(0, initialLimit);

  const handleToggleExpand = () => {
    if (isExpanded) {
      setIsExpanded(false);
      const section = document.getElementById("certifications");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <section
      id="certifications"
      aria-label="Certifications and Professional Tracks"
      className="py-20 md:py-28 relative bg-theme-bg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="CREDENTIALS & KNOWLEDGE"
          title="Certifications & Learning"
          subtitle="Formal industry certifications, academic specializations, and structured curriculum tracks in networking, DevOps, cloud, and cybersecurity."
        />

        {/* Search Bar & Category Controls */}
        <div className="mb-10 space-y-4 max-w-3xl mx-auto">
          {/* Real-time Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-muted">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certificates by title, Cisco, AWS, DevOps, topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-theme-card border border-slate-300 dark:border-theme text-theme text-sm placeholder:text-theme-muted focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-mono text-theme-muted hover:text-theme cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Horizontally scrollable Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:justify-center">
            {CERTIFICATION_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const count =
                category === "All"
                  ? certs.length
                  : certs.filter(
                      (c) => c.category && c.category.toLowerCase() === category.toLowerCase()
                    ).length;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer ${
                    isActive
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25 ring-1 ring-cyan-400/50"
                      : "bg-white dark:bg-theme-card text-slate-700 dark:text-theme-secondary hover:text-slate-950 dark:hover:text-theme hover:bg-slate-100 dark:hover:bg-theme-card-hover border border-slate-300 dark:border-theme shadow-sm"
                  }`}
                >
                  <span>{category}</span>
                  <span className={`ml-1.5 text-[10px] ${isActive ? "opacity-90 font-bold" : "opacity-75"}`}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredCerts.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-theme-card border border-theme">
            <Award className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-theme">No certificates found</h3>
            <p className="text-sm text-theme-muted mt-1 max-w-md mx-auto">
              No certifications match your active filter or search criteria "{searchQuery}". Try selecting another category or resetting the search.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-mono bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Certificates Responsive Grid */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleCerts.map((cert, index) => (
                <CertificationCard
                  key={cert.id}
                  cert={cert}
                  index={index}
                  onOpenImage={handleOpenModal}
                />
              ))}
            </div>

            {/* View More / Show Less Action Button */}
            {hasMore && (
              <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={handleToggleExpand}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold bg-white dark:bg-theme-card hover:bg-slate-100 dark:hover:bg-theme-card-hover text-slate-900 dark:text-theme border-2 border-cyan-500/60 hover:border-cyan-500 shadow-md shadow-slate-200 dark:shadow-cyan-950/30 transition-all cursor-pointer group active:scale-95"
                >
                  {isExpanded ? (
                    <>
                      <span>Show Fewer Certificates</span>
                      <ChevronUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  ) : (
                    <>
                      <span>View More Certificates</span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-400 font-bold border border-cyan-300 dark:border-cyan-500/40">
                        +{filteredCerts.length - initialLimit} More
                      </span>
                      <ChevronDown className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-[11px] font-mono text-theme-muted">
                  Showing {visibleCerts.length} of {filteredCerts.length} certificates
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Full Certificate Lightbox Modal */}
      <CertificateModal
        cert={selectedCert}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
