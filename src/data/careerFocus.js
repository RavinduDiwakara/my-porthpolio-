/**
 * =====================================================================
 * Career Focus Data ("What I'm Building Toward")
 * =====================================================================
 * Defines core engineering disciplines and learning trajectories:
 * - Network Engineering: Current academic foundation and practical lab focus
 * - DevOps & Cloud Deployment: Future learning goal (Docker, CI/CD, deployment)
 */

export const careerPillars = [
  {
    id: "network-engineering",
    title: "Network Engineering",
    tagline: "Enterprise Routing, Switching & Security",
    icon: "Network",
    status: "Current Core Foundation",
    statusType: "foundation",
    topicsLabel: "Core Foundation Topics:",
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
    id: "devops-cloud-deployment",
    title: "DevOps & Cloud Deployment",
    tagline: "CI/CD Pipelines, Containers & Deployment Workflows",
    icon: "Boxes",
    status: "Future Learning Goal",
    statusType: "future-goal",
    topicsLabel: "Planned Learning Topics:",
    accentColor: "from-cyan-500/10 via-teal-500/10 to-transparent",
    borderColor: "group-hover:border-teal-500/40",
    description:
      "Working toward understanding how networking, Docker, cloud platforms, and CI/CD tools work together to deploy, monitor, and maintain modern applications.",
    technologies: [
      "Docker",
      "GitHub Actions",
      "Jenkins",
      "AWS Deployment"
    ]
  }
];

export default careerPillars;
