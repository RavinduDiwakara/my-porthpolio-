import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "./SectionTitle";
import SkillCard from "./SkillCard";
import skillsService from "../services/skillsService";

/**
 * =====================================================================
 * Skills Component
 * =====================================================================
 * Renders categorized technical proficiencies:
 * - 6 balanced categories in a clean 3x2 grid
 * - Domain filter tabs for fast recruiter filtering
 * - Staggered animations and verified competency tags
 */
export default function Skills() {
  const [categories, setCategories] = useState(() => skillsService.getSkills());
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const handleStorageUpdate = () => {
      setCategories(skillsService.getSkills());
    };
    window.addEventListener("portfolio-storage-update", handleStorageUpdate);
    return () => window.removeEventListener("portfolio-storage-update", handleStorageUpdate);
  }, []);

  const filterTabs = [
    { id: "all", label: "All Proficiencies" },
    { id: "networking", label: "Network Engineering" },
    { id: "devops", label: "DevOps & Tools" },
    { id: "software", label: "Software & Databases" }
  ];

  const filteredCategories = useMemo(() => {
    if (activeFilter === "all") return categories;
    if (activeFilter === "networking") {
      return categories.filter((c) => c.id === "networking");
    }
    if (activeFilter === "devops") {
      return categories.filter((c) => c.id === "devops");
    }
    if (activeFilter === "software") {
      return categories.filter((c) => c.id === "programming" || c.id === "databases");
    }
    return categories;
  }, [categories, activeFilter]);

  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="py-20 md:py-28 relative bg-theme-bg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="TECHNICAL COMPETENCIES"
          title="Technical Skills"
          subtitle="Core hands-on proficiencies developed through university lab coursework, personal experimentation, and technical simulations."
        />

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                type="button"
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-950/40"
                    : "bg-theme-card hover:bg-theme-card-hover border border-theme text-theme-secondary hover:text-theme"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Balanced 2x2 Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, index) => (
              <SkillCard key={category.id} category={category} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
