/**
 * =====================================================================
 * Technical Skills Data (src/data/skills.js)
 * =====================================================================
 * Grouped technical skills according to Ravindu's real profile:
 * - Networking
 * - DevOps & Infrastructure
 * - Security
 * - Programming
 * - Databases
 */

export const skillCategories = [
  {
    id: "networking",
    title: "Networking",
    subtitle: "Enterprise Routing, Switching & Topologies",
    icon: "Network",
    accentColor: "from-blue-500/20 to-cyan-500/20",
    borderColor: "hover:border-cyan-500/50",
    skills: [
      { name: "Cisco Networking", level: "Configured" },
      { name: "VLANs", level: "Configured" },
      { name: "VLAN Trunking", level: "Configured" },
      { name: "Inter-VLAN Routing", level: "Configured" },
      { name: "DHCP", level: "Configured" },
      { name: "RIP v2", level: "Configured" },
      { name: "ACL", level: "Configured" },
      { name: "Port Security", level: "Configured" },
      { name: "Network Troubleshooting", level: "Hands-on" },
      { name: "Cisco Packet Tracer", level: "Simulated" },
      { name: "IP Subnetting/CIDR", level: "Core" }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Infrastructure",
    subtitle: "Containerization, CI/CD & Linux Automation",
    icon: "Boxes",
    accentColor: "from-cyan-500/20 to-teal-500/20",
    borderColor: "hover:border-teal-500/50",
    skills: [
      { name: "Linux", level: "Administration" },
      { name: "Docker", level: "Containers" },
      { name: "Git", level: "Version Control" },
      { name: "GitHub", level: "Collaboration" },
      { name: "Bash", level: "Shell Scripting" },
      { name: "Jenkins", level: "CI Pipelines" },
      { name: "GitHub Actions", level: "Automations" },
      { name: "CI/CD Fundamentals", level: "Workflows" }
    ]
  },
  {
    id: "programming",
    title: "Programming",
    subtitle: "Software Engineering & System Scripting",
    icon: "Code2",
    accentColor: "from-sky-500/20 to-blue-500/20",
    borderColor: "hover:border-sky-500/50",
    skills: [
      { name: "Python", level: "Scripting & Dev" },
      { name: "C", level: "Systems Programming" },
      { name: "JavaScript", level: "ES6+ Web" },
      { name: "React", level: "Frontend UI" }
    ]
  },
  {
    id: "databases",
    title: "Databases",
    subtitle: "Data Modeling & Storage",
    icon: "Database",
    accentColor: "from-emerald-500/20 to-teal-500/20",
    borderColor: "hover:border-emerald-500/50",
    skills: [
      { name: "MongoDB", level: "NoSQL Database" },
      { name: "MongoDB Atlas", level: "Cloud Database" },
      { name: "PostgreSQL", level: "Relational SQL" }
    ]
  }
];

export default skillCategories;
