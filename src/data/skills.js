/**
 * =====================================================================
 * Technical Skills Data (src/data/skills.js)
 * =====================================================================
 * Grouped technical skills according to Ravindu's engineering profile:
 * 1. Networking (Cisco, Routing, Switching, Topologies)
 * 2. Network Security & Defense (ACLs, Firewalls, Port Security)
 * 3. DevOps & CI/CD (Docker, Linux, Git, Jenkins, GitHub Actions)
 * 4. Systems & Cloud (Linux Administration, Server Config, Bash)
 * 5. Programming & Scripting (Python, C, JavaScript, React)
 * 6. Databases & Storage (PostgreSQL, MongoDB, Atlas, SQL)
 */

export const skillCategories = [
  {
    id: "networking",
    title: "Network Engineering",
    subtitle: "Routing, Switching & Cisco Topologies",
    icon: "Network",
    accentColor: "from-cyan-500/20 to-blue-500/20",
    themeColor: "cyan",
    skills: [
      { name: "Cisco Networking", level: "CCNA Prep" },
      { name: "VLANs & Trunking", level: "802.1Q" },
      { name: "Inter-VLAN Routing", level: "Sub-interfaces" },
      { name: "Dynamic Routing", level: "RIP v2" },
      { name: "Static Routing", level: "Configured" },
      { name: "Cisco Packet Tracer", level: "Simulation" },
      { name: "IP Subnetting / CIDR", level: "IPv4 Planning" },
      { name: "DHCP & DNS Services", level: "Configured" },
      { name: "Network Diagnostics", level: "Ping / Tracert" }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Tooling",
    subtitle: "Containers, CI Workflows & Linux",
    icon: "Boxes",
    accentColor: "from-blue-500/20 to-indigo-500/20",
    themeColor: "blue",
    skills: [
      { name: "Docker", level: "Containers" },
      { name: "Git Version Control", level: "Core" },
      { name: "GitHub", level: "Collaboration" },
      { name: "GitHub Actions", level: "Workflows" },
      { name: "Jenkins", level: "CI Pipelines" },
      { name: "Linux Environment", level: "Ubuntu / CLI" }
    ]
  },
  {
    id: "programming",
    title: "Software & Frontend",
    subtitle: "Modern Programming & Web Interfaces",
    icon: "Code2",
    accentColor: "from-amber-500/20 to-orange-500/20",
    themeColor: "amber",
    skills: [
      { name: "Python", level: "Programming" },
      { name: "C Language", level: "Core Systems" },
      { name: "JavaScript (ES6+)", level: "Modern Web" },
      { name: "React 19", level: "UI Library" },
      { name: "Tailwind CSS", level: "Responsive UI" },
      { name: "HTML5 & CSS3", level: "Semantic Web" }
    ]
  },
  {
    id: "databases",
    title: "Backend & Databases",
    subtitle: "APIs, Relational SQL & NoSQL Stores",
    icon: "Database",
    accentColor: "from-purple-500/20 to-indigo-500/20",
    themeColor: "purple",
    skills: [
      { name: "Node.js", level: "Runtime" },
      { name: "Express.js", level: "REST APIs" },
      { name: "MongoDB", level: "NoSQL Database" },
      { name: "MongoDB Atlas", level: "Cloud Cluster" },
      { name: "PostgreSQL", level: "Relational SQL" },
      { name: "SQL Queries", level: "Data Modeling" },
      { name: "CRUD Operations", level: "Full-Stack" }
    ]
  }
];

export default skillCategories;
