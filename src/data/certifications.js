/**
 * =====================================================================
 * Certifications & Professional Learning Data
 * =====================================================================
 * Grouped into distinct fields (Networking, Cloud Computing, DevOps & Systems)
 * so visitors can easily filter or browse certifications by technical domain.
 * To add a new certificate, simply add an entry to the appropriate field array!
 */

export const certificationFields = [
  {
    fieldId: "networking",
    fieldName: "Networking Certifications",
    icon: "Network",
    description: "Foundational and specialized credentials in enterprise networking architectures and protocols.",
    certificates: [
      {
        id: "cisco-network-fundamentals",
        name: "Network Fundamentals Specialization",
        issuer: "Cisco Learning and Certifications",
        year: "2024",
        status: "Completed",
        badge: "Specialization",
        description:
          "Comprehensive Cisco specialization covering end-to-end network architecture, routing & switching protocols, operational management approaches, and foundational defense principles.",
        topics: [
          "Network Architecture Fundamentals",
          "Overview of Important Protocols (TCP/IP, UDP, ICMP, DNS, DHCP)",
          "Network Management Approaches & Monitoring",
          "Network Security Principles & Threat Mitigation"
        ],
        credentialUrl: "#", // Replace with your Cisco verification link or badge URL
        verified: true
      },
      {
        id: "cisco-packet-tracer",
        name: "Cisco Packet Tracer Network Simulation",
        issuer: "Cisco Networking Academy",
        year: "2024",
        status: "Completed",
        badge: "Practical Training",
        description:
          "Hands-on network design, topology construction, switch configuration, IP addressing schemes, and troubleshooting complex multi-subnet networks.",
        topics: [
          "Switch & Router Configuration",
          "VLAN Trunking & Inter-VLAN Routing",
          "Dynamic Routing Protocols",
          "Packet Flow & Protocol Inspection"
        ],
        credentialUrl: "#",
        verified: true
      }
    ]
  },
  {
    fieldId: "cloud",
    fieldName: "Cloud Computing Certifications",
    icon: "Cloud",
    description: "Cloud architectural concepts, managed infrastructure, and cloud security frameworks.",
    certificates: [
      {
        id: "aws-academy-cloud-foundations",
        name: "AWS Academy Cloud Foundations",
        issuer: "AWS Academy",
        year: "In Progress / 2024",
        status: "Enrolled",
        badge: "AWS Official",
        description:
          "Core AWS cloud infrastructure, global network regions, IAM security, VPC networking, EC2 compute instances, S3 storage, and cloud economics.",
        topics: [
          "Cloud Computing Concepts & Global Infrastructure",
          "AWS Security, Identity & Access Management (IAM)",
          "Compute Services (Amazon EC2, Lambda)",
          "Networking Services (VPC, Subnets, Route Tables)"
        ],
        credentialUrl: "#", // Update with AWS Academy badge link once issued
        verified: false
      },
      {
        id: "aws-academy-cloud-architecting",
        name: "AWS Academy Cloud Architecting",
        issuer: "AWS Academy",
        year: "Upcoming",
        status: "Planned",
        badge: "AWS Curriculum",
        description:
          "Designing highly available, scalable, resilient, and decoupled cloud architectures on Amazon Web Services following the Well-Architected Framework.",
        topics: [
          "High Availability & Fault Tolerance",
          "Virtual Private Cloud (VPC) Peering & Gateways",
          "Elastic Load Balancing & Auto Scaling",
          "Multi-Tier Application Architectures"
        ],
        credentialUrl: "#",
        verified: false
      }
    ]
  },
  {
    fieldId: "devops-systems",
    fieldName: "DevOps, Linux & Systems",
    icon: "Server",
    description: "Linux administration, container technologies, and continuous delivery methodologies.",
    certificates: [
      {
        id: "linux-fundamentals",
        name: "Linux Administration & Command Line",
        issuer: "Self-Paced / Academy Track",
        year: "2024",
        status: "Practical Track",
        badge: "Systems",
        description:
          "Mastery of core Linux command-line utilities, permission management, file hierarchy standard (FHS), process control, and system configuration.",
        topics: [
          "File Permissions & User Management",
          "Shell Scripting & Command Chaining",
          "Process Monitoring & Systemd Services",
          "Networking Configuration on Linux"
        ],
        credentialUrl: "#",
        verified: true
      },
      {
        id: "docker-essentials",
        name: "Docker Containerization Fundamentals",
        issuer: "DevOps Learning Track",
        year: "2024",
        status: "Practical Track",
        badge: "DevOps",
        description:
          "Container lifecycle management, writing efficient Dockerfiles, network isolation, multi-container compose stacks, and volume data persistence.",
        topics: [
          "Container Lifecycle & Commands",
          "Dockerfile Optimization",
          "Docker Compose Stacks",
          "Persistent Storage & Networking"
        ],
        credentialUrl: "#",
        verified: true
      }
    ]
  }
];
