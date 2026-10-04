/**
 * =====================================================================
 * Certifications Data File (src/data/certifications.js)
 * =====================================================================
 * Verified credentials and professional tracks categorized by domain:
 * 1. Networking
 * 2. DevOps
 * 3. Cloud
 * 4. Cybersecurity
 * 5. Programming
 * 6. Other
 */

export const CERTIFICATION_CATEGORIES = [
  "All",
  "Networking",
  "DevOps",
  "Cloud",
  "Cybersecurity",
  "Programming",
  "Other"
];

export const certifications = [
  {
    id: "cisco-network-fundamentals-specialization",
    title: "Network Fundamentals Specialization",
    name: "Network Fundamentals Specialization",
    organization: "Cisco Learning and Certifications",
    issuer: "Cisco Learning and Certifications",
    category: "Networking",
    year: "2026",
    description:
      "4-Course online Specialization authorized by Cisco Learning and Certifications offered through Coursera. Builds a rigorous foundation in key networking concepts, architectures, network segmentation, routing policies, access-lists, and traffic forwarding across diverse IT environments.",
    image: "/certificates/cisco-network-fundamentals-specialization.png",
    credentialUrl: "https://coursera.org/verify/specialization/KEB29D2BPLTL",
    credentialId: "KEB29D2BPLTL",
    verified: true,
    topics: [
      "Network Architecture Fundamentals & Campus Hierarchies",
      "Overview of Important Protocols (TCP/IP, UDP, ICMP, DHCP, DNS)",
      "Network Management Approaches, SNMP Monitoring & Baselines",
      "Network Security Principles & Threat Mitigation"
    ]
  },
  {
    id: "cisco-network-security-principles",
    title: "Network Security Principles",
    name: "Network Security Principles",
    organization: "Cisco Learning and Certifications",
    issuer: "Cisco Learning and Certifications",
    category: "Cybersecurity",
    year: "2026",
    description:
      "Official course authorized by Cisco Learning and Certifications offered through Coursera. Focuses on foundational network defense, threat surface analysis, Access Control Lists (ACLs), authentication mechanisms, firewall architectures, and secure device administration.",
    image: "/certificates/cisco-network-security-principles.png",
    credentialUrl: "https://coursera.org/verify/MSRPXKKXDVXZ",
    credentialId: "MSRPXKKXDVXZ",
    verified: true,
    topics: [
      "Network Defense Architecture & Threat Surface Minimization",
      "Standard & Extended Access Control Lists (ACLs)",
      "AAA Frameworks, Secure Shell (SSH) & Device Hardening",
      "Stateful Firewall Concepts, NAT & Port Security"
    ]
  },
  {
    id: "cisco-network-architecture-fundamentals",
    title: "Network Architecture Fundamentals",
    name: "Network Architecture Fundamentals",
    organization: "Cisco Learning and Certifications",
    issuer: "Cisco Learning and Certifications",
    category: "Networking",
    year: "2026",
    description:
      "Official course authorized by Cisco Learning and Certifications offered through Coursera, covering enterprise network topologies, campus LAN design, core/distribution/access tiers, physical vs. logical topologies, and packet forwarding.",
    image: "/certificates/cisco-network-architecture-fundamentals.png",
    credentialUrl: "https://coursera.org/verify/YK90PZWLEFO6",
    credentialId: "YK90PZWLEFO6",
    verified: true,
    topics: [
      "Enterprise Network Topologies & Tiered Hierarchical Design",
      "Core, Distribution & Access Layer Architecture",
      "Physical Cabling vs. Logical Addressing Schemes",
      "Campus LAN Segmentation & Switching Foundations"
    ]
  },
  {
    id: "cisco-overview-important-protocols",
    title: "Overview of Important Protocols",
    name: "Overview of Important Protocols",
    organization: "Cisco Learning and Certifications",
    issuer: "Cisco Learning and Certifications",
    category: "Networking",
    year: "2026",
    description:
      "Official course authorized by Cisco Learning and Certifications offered through Coursera, covering the TCP/IP and OSI models, protocol encapsulation, IPv4/IPv6 addressing, ICMP diagnostics, DHCP configuration, and DNS resolution.",
    image: "/certificates/cisco-overview-important-protocols.png",
    credentialUrl: "https://coursera.org/verify/I81Z04873ZD4",
    credentialId: "I81Z04873ZD4",
    verified: true,
    topics: [
      "OSI 7-Layer & TCP/IP Protocol Stack Architecture",
      "IPv4 & IPv6 Subnetting, Unicast, Multicast & Anycast",
      "DHCP Automation, DNS Name Resolution & ARP Mapping",
      "TCP Three-Way Handshake, UDP Streaming & Flow Control"
    ]
  },
  {
    id: "cisco-network-management",
    title: "Network Management Approaches",
    name: "Network Management Approaches",
    organization: "Cisco Learning and Certifications",
    issuer: "Cisco Learning and Certifications",
    category: "Networking",
    year: "2026",
    description:
      "Official course authorized by Cisco Learning and Certifications offered through Coursera, focusing on modern enterprise network management methodologies, infrastructure monitoring, configuration workflows, and operational network frameworks.",
    image: "/certificates/cisco-network-management.png",
    credentialUrl: "https://coursera.org/verify/Z50FID1IOD1A",
    credentialId: "Z50FID1IOD1A",
    verified: true,
    topics: [
      "Enterprise Network Management Approaches",
      "Monitoring Protocols (SNMPv2/v3, Syslog, Telemetry)",
      "Network Configuration & Operational Policies",
      "Network Diagnostics, Health Monitoring & Mitigation"
    ]
  },
  {
    id: "redhat-linux-fundamentals",
    title: "Red Hat Linux Fundamentals (RH104)",
    name: "Red Hat Linux Fundamentals (RH104)",
    organization: "Red Hat",
    issuer: "Red Hat Global Learning Services",
    category: "DevOps",
    year: "2024",
    description:
      "Official Red Hat Academy training (RH104 - RHA Ver. 9.1) covering core enterprise Linux fundamentals, file system navigation, command-line operations, user permissions, and system administration.",
    image: "/certificates/redhat-linux-fundamentals.png",
    credentialUrl: "https://www.credly.com/badges/a4ba474f-a811-474d-b736-1c55ee2c32a8",
    credentialId: "a4ba474f-a811-474d-b736-1c55ee2c32a8",
    verified: true,
    topics: [
      "Red Hat Enterprise Linux (RHEL 9.1) Operating System",
      "Linux Command Line Interface (CLI) Mastery",
      "File System Hierarchy, Permissions & Ownership",
      "Process Management & Service Control"
    ]
  },
  {
    id: "aws-cloud-foundations",
    title: "AWS Academy Cloud Foundations",
    name: "AWS Academy Cloud Foundations",
    organization: "AWS Academy",
    issuer: "AWS Academy / Amazon Web Services",
    category: "Cloud",
    year: "2024",
    description:
      "Official 20-hour AWS Academy graduate training badge demonstrating foundational mastery of AWS cloud architecture, compute/storage/database services, IAM security, and cloud economics.",
    image: "/certificates/aws-cloud-foundations.png",
    credentialUrl: "https://www.credly.com/go/m9OeTT2O",
    credentialId: "m9OeTT2O",
    verified: true,
    topics: [
      "AWS Global Infrastructure & Region Architecture",
      "Security, Identity & Access Management (IAM)",
      "Compute & Storage (Amazon EC2, S3, RDS)",
      "VPC Networking, Subnets & Cloud Economics"
    ]
  },
  {
    id: "docker-fundamentals",
    title: "Getting Started with Docker",
    name: "Getting Started with Docker",
    organization: "Simplilearn SkillUp",
    issuer: "Simplilearn SkillUp",
    category: "DevOps",
    year: "2024",
    description:
      "Practical containerization course covering Docker engine architecture, container lifecycles, crafting Dockerfiles, image optimization, volume storage, and multi-container deployment.",
    image: "/certificates/docker-fundamentals.png",
    credentialUrl: "https://www.simplilearn.com/skillup-certificate",
    credentialId: "9860481",
    verified: true,
    topics: [
      "Containerization Principles & Docker CLI",
      "Dockerfile Construction & Layer Caching",
      "Container Networking & Volume Persistence",
      "Microservices Isolation & Deployment"
    ]
  },
  {
    id: "devops-101",
    title: "DevOps 101: What is DevOps?",
    name: "DevOps 101: What is DevOps?",
    organization: "Simplilearn SkillUp",
    issuer: "Simplilearn SkillUp",
    category: "DevOps",
    year: "2024",
    description:
      "Curriculum exploring DevOps culture, continuous integration and continuous deployment (CI/CD) pipelines, infrastructure as code, automated testing, and collaborative delivery lifecycles.",
    image: "/certificates/devops-101.png",
    credentialUrl: "https://www.simplilearn.com/skillup-certificate",
    credentialId: "9831581",
    verified: true,
    topics: [
      "DevOps Culture & Continuous Delivery Mindset",
      "CI/CD Pipeline Workflow & Automation",
      "Infrastructure as Code (IaC) Principles",
      "Continuous Monitoring & Feedback Loops"
    ]
  },
  {
    id: "ibm-git-github",
    title: "Getting Started with Git and GitHub",
    name: "Getting Started with Git and GitHub",
    organization: "IBM",
    issuer: "IBM / Coursera",
    category: "DevOps",
    year: "2024",
    description:
      "Online course authorized by IBM and offered through Coursera, covering distributed version control with Git, branch management, collaborative workflows on GitHub, and code review lifecycles.",
    image: "/certificates/ibm-git-github.png",
    credentialUrl: "https://coursera.org/verify/NPSHHZDIJ6ZS",
    credentialId: "NPSHHZDIJ6ZS",
    verified: true,
    topics: [
      "Git Distributed Version Control & CLI",
      "Branching, Merging & Conflict Handling",
      "GitHub Repositories, Pull Requests & Issues",
      "Collaborative Team Development Workflows"
    ]
  },
  {
    id: "uom-web-design",
    title: "Web Design for Beginners",
    name: "Web Design for Beginners",
    organization: "University of Moratuwa (CODL)",
    issuer: "Department of Information Technology, University of Moratuwa",
    category: "Programming",
    year: "2024",
    description:
      "Online learning programme conducted by the Department of Information Technology, Faculty of Information Technology, University of Moratuwa, Sri Lanka, covering responsive web layout, semantic HTML5, modern CSS styling, and UI design principles.",
    image: "/certificates/uom-web-design.png",
    credentialUrl: "https://open.uom.lk/verify",
    credentialId: "g9Hz7EGN90",
    verified: true,
    topics: [
      "Responsive Web Layout & Semantic HTML5",
      "Modern CSS Styling, Flexbox & Grid Systems",
      "UI/UX Design Fundamentals & Usability",
      "Cross-Browser Compatibility & Web Standards"
    ]
  },
  {
    id: "uom-python-programming",
    title: "Python Programming",
    name: "Python Programming",
    organization: "University of Moratuwa (CODL)",
    issuer: "Department of Computer Science & Engineering, University of Moratuwa",
    category: "Programming",
    year: "2024",
    description:
      "Comprehensive online learning programme conducted by the Department of Computer Science & Engineering, Faculty of Engineering, University of Moratuwa, Sri Lanka, focusing on software development logic, modular programming, and procedural automation.",
    image: "/certificates/uom-python-programming.png",
    credentialUrl: "https://open.uom.lk/verify",
    credentialId: "fOzQKgSDM0",
    verified: true,
    topics: [
      "Python Syntax, Variables & Flow Control",
      "Modular Code Architecture & Reusable Functions",
      "Data Structures, Collections & File Processing",
      "Algorithmic Thinking & Automation Scripting"
    ]
  },
  {
    id: "uom-python-beginners",
    title: "Python for Beginners",
    name: "Python for Beginners",
    organization: "University of Moratuwa (CODL)",
    issuer: "Department of Computer Science & Engineering, University of Moratuwa",
    category: "Programming",
    year: "2024",
    description:
      "Foundational programming curriculum conducted by the Department of Computer Science & Engineering, University of Moratuwa, Sri Lanka, covering syntax, computational logic, data types, and core algorithmic control.",
    image: "/certificates/uom-python-beginners.png",
    credentialUrl: "https://open.uom.lk/verify",
    credentialId: "BWgbgM17I1",
    verified: true,
    topics: [
      "Introduction to Python Programming & Logic",
      "Data Types, Operators & Conditionals",
      "Iterative Loops & Control Statements",
      "Basic Functions & Program Flow"
    ]
  }
];

export default certifications;
