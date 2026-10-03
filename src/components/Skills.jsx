import React from "react";
import SectionTitle from "./SectionTitle";
import SkillCard from "./SkillCard";
import { skillCategories } from "../data/skills";

/**
 * =====================================================================
 * Skills Component
 * =====================================================================
 * Renders the categorized technical proficiencies:
 * - Networking (Cisco, VLAN, Routing, DHCP, CIDR)
 * - DevOps & Infrastructure (Linux, Docker, Git, CI/CD, Jenkins)
 * - Security (Firewalls, VPN, AAA, NAC, 802.1X)
 * - Programming (Python, C, JavaScript, React)
 * - Databases (MongoDB, Atlas, PostgreSQL)
 *
 * Utilizes data mapping from `skills.js` to ensure the portfolio is easily
 * maintained and updated without altering UI JSX markup.
 */
export default function Skills() {
  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="py-20 md:py-28 relative bg-[#030712]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionTitle
          badge="TECHNICAL COMPETENCIES"
          title="Technical Skills"
          subtitle="Core hands-on proficiencies developed through university lab coursework, personal experimentation, and technical simulations."
        />

        {/* 
          Skills Cards Grid:
          Staggered entrance animations handled inside SkillCard based on array index
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
