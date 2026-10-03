/**
 * =====================================================================
 * Career Focus Data ("What I'm Building Toward")
 * =====================================================================
 * This file defines the 4 core technology pillars that define
 * your career aspirations and learning trajectory as an undergraduate.
 */

export const careerPillars = [
  {
    id: "network-engineering",
    title: "Network Engineering",
    tagline: "Enterprise Routing, Switching & Security",
    icon: "Network",
    accentColor: "from-blue-500/10 via-cyan-500/10 to-transparent",
    borderColor: "group-hover:border-cyan-500/40",
    description:
      "Building strong foundations in enterprise networking, multi-site routing, switching, VLAN architectures, security policies, and packet-level troubleshooting.",
    technologies: [
      "Cisco IOS",
      "VLANs & Trunks",
      "Dynamic Routing (RIP/OSPF)",
      "ACLs & Firewalls",
      "Wireshark / Packet Analysis",
      "Subnetting & CIDR"
    ]
  },
  {
    id: "devops-engineering",
    title: "DevOps Engineering",
    tagline: "CI/CD Pipelines & Containerization",
    icon: "Boxes",
    accentColor: "from-cyan-500/10 via-teal-500/10 to-transparent",
    borderColor: "group-hover:border-teal-500/40",
    description:
      "Bridging development and operations by standardizing containerized applications, automating integration/deployment pipelines, and minimizing manual overhead.",
    technologies: [
      "Docker & Containers",
      "Docker Compose",
      "GitHub Actions",
      "Jenkins Automation",
      "Git Flow & Version Control",
      "Linux Server Administration"
    ]
  },
  {
    id: "cloud-engineering",
    title: "Cloud Engineering",
    tagline: "Scalable & Resilient Cloud Architectures",
    icon: "Cloud",
    accentColor: "from-sky-500/10 via-blue-500/10 to-transparent",
    borderColor: "group-hover:border-sky-500/40",
    description:
      "Designing fault-tolerant, scalable, and highly available infrastructure leveraging modern cloud service providers, VPCs, and serverless compute models.",
    technologies: [
      "AWS Cloud Foundations",
      "Amazon EC2 & S3",
      "Virtual Private Cloud (VPC)",
      "Cloud Security & IAM",
      "Cloud Economics & Optimization"
    ]
  },
  {
    id: "infrastructure-automation",
    title: "Infrastructure & Automation",
    tagline: "Scripting, Linux & Operational Reliability",
    icon: "Terminal",
    accentColor: "from-indigo-500/10 via-violet-500/10 to-transparent",
    borderColor: "group-hover:border-indigo-500/40",
    description:
      "Writing reusable scripts and automated configurations to manage Linux environments predictably, eliminate repetitive tasks, and ensure system uptime.",
    technologies: [
      "Linux OS Administration",
      "Bash Shell Scripting",
      "Python Automation",
      "Infrastructure As Code Concepts",
      "Log Monitoring & Health Checks"
    ]
  }
];
