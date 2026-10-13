import React, { useState, useEffect } from "react";
import SectionTitle from "./SectionTitle";
import SkillCard from "./SkillCard";
import skillsService from "../services/skillsService";

/**
 * =====================================================================
 * Skills Component
 * =====================================================================
 * Renders categorized technical proficiencies:
 * - Networking (Cisco, VLAN, Routing, DHCP, CIDR)
 * - DevOps & Infrastructure (Linux, Docker, Git, CI/CD, Jenkins)
 * - Security (Firewalls, VPN, AAA, NAC, 802.1X)
 * - Programming (Python, C, JavaScript, React)
 * - Databases (MongoDB, Atlas, PostgreSQL)
 *
 * Fully data-driven with live storage sync.
 */
export default function Skills() {
  const [categories, setCategories] = useState(() => skillsService.getSkills());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setCategories(skillsService.getSkills());
    };
    window.addEventListener("portfolio-storage-update", handleStorageUpdate);
    return () => window.removeEventListener("portfolio-storage-update", handleStorageUpdate);
  }, []);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
