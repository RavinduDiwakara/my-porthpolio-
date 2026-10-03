/**
 * =====================================================================
 * Technical Skills Data
 * =====================================================================
 * This file contains all technical skills grouped by category.
 * To add a new skill or category, simply add an entry to the array below.
 * Each category includes an icon name (from lucide-react) and a brief summary.
 */

export const skillCategories = [
  {
    id: "networking",
    title: "Computer Networking",
    subtitle: "Enterprise Routing, Switching & Topologies",
    icon: "Network",
    accentColor: "from-blue-500/20 to-cyan-500/20",
    borderColor: "hover:border-cyan-500/50",
    skills: [
      { name: "Cisco Networking", level: "Practical" },
      { name: "VLANs & VLAN Trunking", level: "Configured" },
      { name: "Inter-VLAN Routing", level: "Configured" },
      { name: "DHCP & DNS", level: "Configured" },
      { name: "RIP v2 Dynamic Routing", level: "Configured" },
      { name: "Access Control Lists (ACL)", level: "Configured" },
      { name: "Port Security", level: "Configured" },
      { name: "Network Troubleshooting", level: "Hands-on" },
      { name: "Cisco Packet Tracer", level: "Simulated" },
      { name: "IP Subnetting / CIDR (IPv4)", level: "Core" }
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
      { name: "Linux System Administration", level: "Hands-on" },
      { name: "Docker & Containerization", level: "Practical" },
      { name: "Docker Compose", level: "Practical" },
      { name: "Git & Version Control", level: "Daily" },
      { name: "GitHub Workflows", level: "Active" },
      { name: "Bash Scripting", level: "Scripting" },
      { name: "Jenkins Automation", level: "Foundational" },
      { name: "GitHub Actions", level: "Workflows" },
      { name: "CI/CD Fundamentals", level: "Pipelines" }
    ]
  },
  {
    id: "security",
    title: "Network & Systems Security",
    subtitle: "Defense, Access Control & Threat Mitigation",
    icon: "ShieldCheck",
    accentColor: "from-indigo-500/20 to-blue-500/20",
    borderColor: "hover:border-indigo-500/50",
    skills: [
      { name: "Network Security Fundamentals", level: "Core" },
      { name: "Application Security", level: "Best Practices" },
      { name: "Secure SDLC", level: "Principles" },
      { name: "Threat Modeling", level: "Conceptual" },
      { name: "VPN Configurations", level: "Hands-on" },
      { name: "AAA (Auth/Authoriz/Account)", level: "Concepts" },
      { name: "NAC (Network Access Control)", level: "Concepts" },
      { name: "802.1X Port Authentication", level: "Protocols" }
    ]
  },
  {
    id: "programming",
    title: "Programming & Scripting",
    subtitle: "Software Development & System Scripting",
    icon: "Code2",
    accentColor: "from-sky-500/20 to-blue-500/20",
    borderColor: "hover:border-sky-500/50",
    skills: [
      { name: "Python", level: "Scripting & Dev" },
      { name: "C Language", level: "Low-level Systems" },
      { name: "JavaScript (ES6+)", level: "Modern Frontend" },
      { name: "React", level: "Component UI" }
    ]
  },
  {
    id: "databases",
    title: "Databases & Storage",
    subtitle: "Data Modeling & Cloud Persistence",
    icon: "Database",
    accentColor: "from-emerald-500/20 to-teal-500/20",
    borderColor: "hover:border-emerald-500/50",
    skills: [
      { name: "MongoDB", level: "NoSQL" },
      { name: "MongoDB Atlas", level: "Cloud Database" },
      { name: "PostgreSQL", level: "Relational SQL" }
    ]
  }
];
