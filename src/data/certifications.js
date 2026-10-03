/**
 * =====================================================================
 * Certifications Data File (src/data/certifications.js)
 * =====================================================================
 * Categories supported:
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
    id: "network-fundamentals",
    title: "Network Fundamentals Specialization",
    name: "Network Fundamentals Specialization",
    organization: "Cisco Learning and Certifications",
    issuer: "Cisco Learning and Certifications",
    category: "Networking",
    year: "2024",
    description:
      "Comprehensive Cisco specialization covering end-to-end network architecture, routing & switching protocols, operational management approaches, and foundational defense principles.",
    image: "/certificates/network-fundamentals.png",
    credentialUrl: "https://www.cisco.com/",
    credentialId: "CSCO-NET-2024-8192",
    verified: true,
    topics: [
      "Network Architecture Fundamentals",
      "Important Protocols (TCP/IP, UDP, ICMP, DNS, DHCP)",
      "Network Management Approaches & Monitoring",
      "Network Security Principles & Threat Mitigation"
    ]
  },
  {
    id: "cisco-packet-tracer",
    title: "Cisco Packet Tracer Network Simulation",
    name: "Cisco Packet Tracer Network Simulation",
    organization: "Cisco Networking Academy",
    issuer: "Cisco Networking Academy",
    category: "Networking",
    year: "2024",
    description:
      "Hands-on network design, topology construction, switch configuration, IP addressing schemes, and troubleshooting complex multi-subnet networks.",
    image: "/certificates/network-fundamentals.png",
    credentialUrl: "https://www.netacad.com/",
    credentialId: "CSCO-PKT-2024-5012",
    verified: true,
    topics: [
      "Switch & Router Configuration",
      "VLAN Trunking & Inter-VLAN Routing",
      "Dynamic Routing Protocols (RIP v2)",
      "Packet Flow & Protocol Inspection"
    ]
  },
  {
    id: "network-security-mitigation",
    title: "Network Security & Threat Defense",
    name: "Network Security & Threat Defense",
    organization: "Cisco Networking Academy",
    issuer: "Cisco Networking Academy",
    category: "Cybersecurity",
    year: "2024",
    description:
      "Implementation of security policies, ACL filters, AAA frameworks, VPN tunnels, and 802.1X port security to mitigate network vulnerabilities.",
    image: "/certificates/network-security.png",
    credentialUrl: "https://www.netacad.com/",
    credentialId: "SEC-NET-9481-UOC",
    verified: true,
    topics: [
      "Access Control Lists (ACL)",
      "Port Security & MAC Filtering",
      "VPN Configurations & Encryption",
      "AAA & Network Access Control (NAC)"
    ]
  },
  {
    id: "aws-cloud-foundations",
    title: "AWS Academy Cloud Foundations",
    name: "AWS Academy Cloud Foundations",
    organization: "AWS Academy",
    issuer: "AWS Academy",
    category: "Cloud",
    year: "2024",
    description:
      "Core AWS cloud infrastructure, global network regions, IAM security, VPC networking, EC2 compute instances, S3 storage, and cloud economics.",
    image: "/certificates/aws-cloud.png",
    credentialUrl: "https://aws.amazon.com/training/awsacademy/",
    credentialId: "AWS-ACAD-2024-3829",
    verified: true,
    topics: [
      "Cloud Computing Concepts & Global Infrastructure",
      "AWS Security, Identity & Access Management (IAM)",
      "Compute Services (Amazon EC2, Lambda)",
      "Networking Services (VPC, Subnets, Route Tables)"
    ]
  },
  {
    id: "linux-administration",
    title: "Linux Administration & Command Line",
    name: "Linux Administration & Command Line",
    organization: "Open Source Academy / Self-Paced",
    issuer: "Open Source Academy",
    category: "DevOps",
    year: "2024",
    description:
      "Mastery of core Linux command-line utilities, permission management, file hierarchy standard (FHS), process control, and system configuration.",
    image: "/certificates/linux.png",
    credentialUrl: "https://www.kernel.org/",
    credentialId: "LNX-ADM-7721-RD",
    verified: true,
    topics: [
      "File Permissions & User Management",
      "Shell Scripting & Command Chaining",
      "Process Monitoring & Systemd Services",
      "Networking Configuration on Linux"
    ]
  },
  {
    id: "docker-ci-cd",
    title: "Docker Containerization & CI/CD Pipelines",
    name: "Docker Containerization & CI/CD Pipelines",
    organization: "DevOps Learning Track",
    issuer: "DevOps Learning Track",
    category: "DevOps",
    year: "2024",
    description:
      "Container lifecycle management, writing efficient Dockerfiles, multi-stage builds, Docker Compose orchestration, and automated pipeline integration.",
    image: "/certificates/docker-devops.png",
    credentialUrl: "https://www.docker.com/",
    credentialId: "DOC-CI-2024-5541",
    verified: true,
    topics: [
      "Container Lifecycle & Commands",
      "Dockerfile Optimization & Multi-stage",
      "Docker Compose Stacks & Networks",
      "GitHub Actions & CI/CD Automation"
    ]
  }
];

export default certifications;
