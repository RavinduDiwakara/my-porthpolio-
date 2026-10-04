/**
 * =====================================================================
 * Featured Projects Data (src/data/projects.js)
 * =====================================================================
 * Detailed engineering case studies covering:
 * 1. ABC University Multi-Campus Network Design (Cisco Packet Tracer)
 * 2. Enterprise Multi-Site Network Design with VLAN Segmentation & RIPv2
 * 3. Vic Modern Hotel — Multi-Floor Enterprise Network
 * 4. Docker & Containerization Projects
 * 5. CI/CD Pipeline Automation Project
 * 6. Full-Stack MERN Application
 */

export const projects = [
  {
    id: "abc-university-network",
    title: "ABC University Multi-Campus Network Design",
    subtitle: "Enterprise network infrastructure designed and implemented using Cisco Packet Tracer.",
    category: "Computer Networking",
    badge: "Enterprise Network",
    featured: true,
    summary:
      "Designed and implemented a scalable multi-campus university network using Cisco Packet Tracer. The network connects three main-campus buildings and a Health & Sciences campus, with VLAN-based segmentation, inter-VLAN routing, RIPv2 dynamic routing, router-based DHCP, static routing, 802.1Q trunking, and switch port security.",
    description:
      "Designed and implemented a scalable multi-campus university network using Cisco Packet Tracer. The network connects three main-campus buildings and a Health & Sciences campus, with VLAN-based segmentation, inter-VLAN routing, RIPv2 dynamic routing, router-based DHCP, static routing, 802.1Q trunking, and switch port security.",
    image: "/projects/abc-university-network.png",
    screenshots: [
      "/projects/abc-university-network.png",
      "/projects/abc-network-test1.png",
      "/projects/abc-network-test2.png"
    ],
    architectureOverview:
      "The network consists of a Main Campus with three buildings and a smaller Health & Sciences Campus. Departments and student laboratories are logically separated using VLANs, while routers and multilayer switching provide inter-network communication.",
    vlanTable: [
      { vlan: 10, department: "Administration", network: "192.168.1.0/24" },
      { vlan: 20, department: "Human Resources", network: "192.168.2.0/24" },
      { vlan: 30, department: "Finance", network: "192.168.3.0/24" },
      { vlan: 40, department: "Business", network: "192.168.4.0/24" },
      { vlan: 50, department: "Engineering & Computing", network: "192.168.5.0/24" },
      { vlan: 60, department: "Art & Design", network: "192.168.6.0/24" },
      { vlan: 70, department: "Student Labs", network: "192.168.7.0/24" },
      { vlan: 80, department: "IT Department", network: "192.168.8.0/24" },
      { vlan: 90, department: "Health & Sciences Staff", network: "192.168.9.0/24" },
      { vlan: 100, department: "Health & Sciences Labs", network: "192.168.10.0/24" }
    ],
    technologies: [
      "Cisco Packet Tracer",
      "VLAN",
      "802.1Q",
      "Inter-VLAN Routing",
      "RIPv2",
      "Static Routing",
      "DHCP",
      "IP Subnetting",
      "Port Security",
      "LAN/WAN",
      "Network Troubleshooting"
    ],
    contributions:
      "Designed the network topology, planned the IP addressing scheme, configured VLANs and trunk links, implemented inter-VLAN routing, configured router-based DHCP, implemented RIPv2 and static routing, applied switch port security, configured server connectivity, and performed end-to-end network testing and troubleshooting.",
    features: [
      "Multi-campus network architecture (Main Campus & Health Sciences Campus)",
      "VLAN segmentation for departments and student faculties",
      "Inter-VLAN routing & Multilayer switching",
      "RIPv2 dynamic routing protocol across campus gateways",
      "Static routing for external network and cloud connectivity",
      "Router-based DHCP IP address assignment",
      "802.1Q trunking across switches and routers",
      "Switch port security on departmental access ports",
      "Internal university servers & External email server connectivity",
      "End-to-end connectivity verification and ICMP testing"
    ],
    testing: [
      "Verified VLAN-to-VLAN connectivity across campus buildings",
      "Tested DHCP address assignment for all departmental clients",
      "Verified inter-campus communication via gateway routers",
      "Tested RIPv2 route propagation and network convergence",
      "Verified external email server connectivity through WAN link",
      "Tested 802.1Q trunk links between access and core switches",
      "Verified port-security configuration to prevent unauthorized MACs",
      "Performed end-to-end ping/connectivity validation tests"
    ],
    githubUrl: "https://github.com/RavinduDiwakara/ABC-University-Multi-Campus-Network-Design-Cisco-Packet-Tracer",
    demoUrl: null,
    type: "Networking Infrastructure",
    icon: "Network"
  },
  {
    id: "enterprise-multi-site-network",
    title: "Enterprise Multi-Site Network Design with VLAN Segmentation & RIPv2",
    subtitle: "Multi-site enterprise network connecting Branch, HQ, and Web network with dynamic routing.",
    category: "Computer Networking",
    badge: "Cisco Simulation",
    featured: true,
    summary:
      "Designed and configured a multi-site enterprise network connecting a Branch office, HQ office, and Web network using Cisco Packet Tracer. Implemented VLAN segmentation, inter-VLAN routing, RIPv2 dynamic routing, DHCP, DNS, and web services to demonstrate enterprise network design and infrastructure management.",
    description:
      "Designed and configured a multi-site enterprise network connecting a Branch office, HQ office, and Web network using Cisco Packet Tracer. Implemented VLAN segmentation, inter-VLAN routing, RIPv2 dynamic routing, DHCP, DNS, and web services to demonstrate enterprise network design and infrastructure management.",
    image: "/projects/multinetwork.png",
    screenshots: [
      "/projects/multinetwork.png",
      "/projects/multinetwork-test1.png"
    ],
    architectureOverview:
      "The network consists of a Branch office, HQ office, and Web network interconnected through multiple routers. Departmental networks are separated using VLANs, while router-on-a-stick provides inter-VLAN communication.",
    vlanTable: [
      { vlan: 10, department: "IT", gateway: "192.168.10.1", site: "Branch Office" },
      { vlan: 20, department: "HR", gateway: "192.168.10.129", site: "Branch Office" },
      { vlan: 30, department: "Sales", gateway: "192.168.10.193", site: "Branch Office" },
      { vlan: 40, department: "Operations / DHCP", gateway: "DHCP Configured", site: "Branch Office" },
      { vlan: 11, department: "Management", gateway: "192.168.11.1", site: "HQ Office" },
      { vlan: 12, department: "Wireless", gateway: "192.168.12.1", site: "HQ Office" }
    ],
    routingOverview:
      "RIPv2 was configured across the Branch, HQ, and Web routers to enable automatic route exchange and communication between different network segments.",
    networkServices: [
      { title: "DHCP", detail: "Automatic IP address assignment for departmental hosts" },
      { title: "DNS", detail: "Configured local DNS record mapping for ict.com" },
      { title: "Web Server", detail: "HTTP web service accessible across all routed branch and HQ segments" }
    ],
    technologies: [
      "Cisco Packet Tracer",
      "VLAN",
      "802.1Q Trunking",
      "Inter-VLAN Routing",
      "Router-on-a-Stick",
      "RIPv2",
      "IP Subnetting",
      "CIDR",
      "DHCP",
      "DNS",
      "Web Server",
      "Network Troubleshooting"
    ],
    features: [
      "Multi-site enterprise network (Branch / HQ / Web topology)",
      "VLAN segmentation with 802.1Q encapsulation trunk links",
      "Router-on-a-Stick architecture for Inter-VLAN Routing",
      "RIPv2 dynamic routing protocol across WAN gateway routers",
      "Centralized DHCP server for automatic host IP provisioning",
      "Internal DNS configuration and network verification testing",
      "IP subnetting and comprehensive network troubleshooting"
    ],
    skillsDemonstrated: [
      { category: "Network Design", items: ["Enterprise topology design", "IP addressing & CIDR subnetting", "VLAN planning"] },
      { category: "Routing & Switching", items: ["VLAN configuration", "802.1Q trunking", "Router-on-a-stick", "RIPv2 dynamic routing"] },
      { category: "Network Services", items: ["DHCP automated provisioning", "DNS local domain resolution", "Web server hosting"] },
      { category: "Troubleshooting", items: ["Connectivity testing", "Routing table verification (show ip route)", "IOS configuration troubleshooting"] }
    ],
    devopsRelevance:
      "This project provides a strong networking foundation for DevOps and infrastructure engineering by developing practical knowledge of IP addressing, routing, segmentation, DNS, DHCP, and distributed network communication. These concepts are directly applicable when configuring cloud VPCs, Kubernetes container networks, and microservice meshes.",
    testing: [
      "Tested inter-VLAN connectivity via Router-on-a-Stick",
      "Verified DHCP address assignment for client workstations",
      "Verified DNS resolution for internal domain ict.com",
      "Tested communication between Branch and HQ offices",
      "Verified RIPv2 dynamic route propagation across WAN routers",
      "Tested access to the Web Server from all subnets",
      "Troubleshot connectivity issues using Cisco IOS commands"
    ],
    githubUrl: "https://github.com/RavinduDiwakara/Enterprise-Multi-Site-Network-Design-with-VLAN-Segmentation-and-RIP-v2-Routing",
    demoUrl: null,
    type: "Networking Infrastructure",
    icon: "Network"
  },
  {
    id: "vic-modern-hotel-network",
    title: "Vic Modern Hotel — Multi-Floor Enterprise Network",
    subtitle: "Secure 3-floor enterprise network with VLANs, RIP routing, Wi-Fi, and SSH remote management.",
    category: "Computer Networking",
    badge: "Enterprise Simulation",
    featured: true,
    summary:
      "Designed and implemented a secure multi-floor enterprise network for Vic Modern Hotel using Cisco Packet Tracer. The network provides departmental VLAN segmentation, inter-VLAN routing, DHCP, RIP dynamic routing, wireless connectivity, printer access, and secure SSH-based remote router management.",
    description:
      "Designed and implemented a secure multi-floor enterprise network for Vic Modern Hotel using Cisco Packet Tracer. The network provides departmental VLAN segmentation, inter-VLAN routing, DHCP, RIP dynamic routing, wireless connectivity, printer access, and secure SSH-based remote router management.",
    image: "/projects/abc-university-network.png",
    architectureOverview:
      "This project involved designing and implementing a multi-floor enterprise network infrastructure for Vic Modern Hotel using Cisco Packet Tracer. The network was designed to provide secure departmental segmentation, dynamic IP addressing, inter-floor communication, wireless access, dynamic routing, and secure remote network management.",
    vlanTable: [
      { floor: "1st", department: "Reception", vlan: 80, network: "192.168.8.0/24" },
      { floor: "1st", department: "Store", vlan: 70, network: "192.168.7.0/24" },
      { floor: "1st", department: "Logistics", vlan: 60, network: "192.168.6.0/24" },
      { floor: "2nd", department: "Finance", vlan: 50, network: "192.168.5.0/24" },
      { floor: "2nd", department: "HR", vlan: 40, network: "192.168.4.0/24" },
      { floor: "2nd", department: "Sales/Marketing", vlan: 30, network: "192.168.3.0/24" },
      { floor: "3rd", department: "Admin", vlan: 20, network: "192.168.2.0/24" },
      { floor: "3rd", department: "IT", vlan: 10, network: "192.168.1.0/24" }
    ],
    routerConnectivity:
      "Three routers are interconnected using Serial DCE links: Router 1 ─── Router 2 (10.10.10.0/30), Router 2 ─── Router 3 (10.10.10.4/30), Router 1 ─── Router 3 (10.10.10.8/30). RIP was configured to dynamically advertise departmental networks between the three routers, enabling communication across floors and VLANs.",
    securityHighlight:
      "SSH was configured on all three routers to provide secure remote administration. A dedicated Test-PC in the IT department was used to verify remote SSH connectivity and router management (PC > ssh -l admin <router-ip>).",
    networkServices: [
      { title: "DHCP", detail: "Automatic IP address allocation for departmental devices" },
      { title: "RIP", detail: "Dynamic routing between the three interconnected routers" },
      { title: "Wireless", detail: "Wi-Fi connectivity for supported guest and staff devices" },
      { title: "SSH", detail: "Secure encrypted remote router administration" },
      { title: "Printers", detail: "Departmental network printer connectivity" }
    ],
    technologies: [
      "Cisco Packet Tracer",
      "VLAN",
      "Inter-VLAN Routing",
      "DHCP",
      "RIP",
      "SSH Remote Admin",
      "Wi-Fi",
      "Serial DCE Links",
      "Network Security"
    ],
    features: [
      "3-floor enterprise network topology",
      "8 departmental VLANs across 3 physical floors",
      "Inter-VLAN and inter-floor communication",
      "DHCP-based dynamic IP addressing",
      "RIP dynamic routing over Serial DCE links",
      "Wireless access point connectivity",
      "Departmental printer connectivity",
      "Secure SSH remote router administration",
      "End-to-end network verification and troubleshooting"
    ],
    testing: [
      "Tested connectivity between departments, VLANs, floors, and routers",
      "Verified DHCP address assignment across all floors",
      "Verified inter-VLAN and inter-floor communication",
      "Confirmed RIP route propagation across Serial DCE mesh",
      "Tested wireless device connectivity and printer access",
      "Verified secure SSH remote router login from IT Test-PC"
    ],
    skillsDemonstrated: [
      { category: "Network Design", items: ["Enterprise network architecture", "Multi-floor network design", "IP addressing and subnetting"] },
      { category: "Routing & Switching", items: ["VLAN configuration", "Inter-VLAN routing", "Router-on-a-stick", "RIP dynamic routing"] },
      { category: "Network Services", items: ["DHCP IP allocation", "Wireless networking", "Printer connectivity"] },
      { category: "Security", items: ["SSH remote administration", "Network segmentation & access control"] },
      { category: "Troubleshooting", items: ["Connectivity testing", "Routing verification", "Network configuration troubleshooting"] }
    ],
    githubUrl: "https://github.com/RavinduDiwakara/Vic-Modern-Hotel-Enterprise-Network-Design-Implementation",
    demoUrl: null,
    type: "Networking Infrastructure",
    icon: "Building2"
  },
  {
    id: "docker-containerization",
    title: "Docker & Containerization Projects",
    subtitle: "Production-ready containerization with Docker, multi-stage builds, and Docker Compose.",
    category: "DevOps & Containers",
    badge: "Containerization",
    featured: true,
    summary:
      "Practical projects focused on containerizing multi-tier web applications using Dockerfiles, multi-stage builds, and Docker Compose.",
    description:
      "Explored containerization workflows by transforming full-stack applications into portable, reproducible container images. Implemented multi-stage Docker builds to minimize final image footprint, authored docker-compose.yml files for orchestrating frontend, backend, and database services with isolated bridge networks and volume persistence.",
    technologies: [
      "Docker",
      "Docker Compose",
      "Linux",
      "Node.js",
      "React",
      "Vite",
      "Multi-stage Builds",
      "Alpine Linux"
    ],
    features: [
      "Optimized Dockerfiles with multi-stage build layers",
      "Multi-container orchestration with Docker Compose",
      "Isolated container networks for database security",
      "Persistent volume mounting for data safety",
      "Environment variable management for dev/prod parity",
      "Lightweight Alpine Linux based deployment targets"
    ],
    testing: [
      "Verified multi-stage build image size reduction",
      "Tested container-to-container service networking",
      "Tested persistent volume data durability across restarts",
      "Validated environment variable isolation between dev and prod"
    ],
    githubUrl: "https://github.com/RavinduDiwakara",
    demoUrl: null,
    type: "DevOps / Infrastructure",
    icon: "Boxes"
  },
  {
    id: "cicd-pipeline",
    title: "CI/CD Pipeline Project",
    subtitle: "Automated build, test, and continuous deployment workflows.",
    category: "DevOps Automation",
    badge: "Automation Workflow",
    featured: true,
    summary:
      "A practical CI/CD learning project exploring automated build, testing, and continuous deployment workflows using GitHub Actions and Jenkins.",
    description:
      "Built automated continuous integration and continuous delivery pipelines to streamline code quality verification and deployment. Configured automated triggers on code push, linting checks, automated test suites, Docker image building and tagging, and deployment automation stages.",
    technologies: [
      "GitHub Actions",
      "Jenkins",
      "Git Workflows",
      "Docker",
      "Node.js",
      "Bash Scripting",
      "CI/CD Principles"
    ],
    features: [
      "Automated pipeline triggers on pull requests and commits",
      "Automated linting and test verification stages",
      "Automated Docker container build and image tagging",
      "Jenkins declarative pipeline automation scripts",
      "Build status badges and error alert notifications",
      "Fast feedback loop for developer productivity"
    ],
    testing: [
      "Tested automated test suite execution on pull request",
      "Verified build fail alerts and branch protection rules",
      "Tested automated container build and DockerHub push"
    ],
    githubUrl: "https://github.com/RavinduDiwakara",
    demoUrl: null,
    type: "DevOps Automation",
    icon: "Workflow"
  },
  {
    id: "mern-application",
    title: "Full-Stack MERN Application",
    subtitle: "Production-ready MERN application with JWT authentication and admin dashboard.",
    category: "Full-Stack Engineering",
    badge: "Full-Stack App",
    featured: true,
    summary:
      "A full-stack web application built using MongoDB, Express, React, and Node.js with secure authentication, admin controls, and product management.",
    description:
      "Developed a complete web application featuring RESTful API design, MongoDB Atlas data modeling, secure JSON Web Token (JWT) user authentication, password hashing with bcrypt, and an administrative control panel for managing product catalogs with real-time UI updates.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT Authentication",
      "Tailwind CSS",
      "RESTful API"
    ],
    features: [
      "JWT-based user registration, login, and protected routes",
      "Administrative dashboard for catalog and inventory management",
      "Complete CRUD operations backed by MongoDB Atlas",
      "Responsive, clean modern UI styled with Tailwind CSS",
      "Secure API endpoints with request validation middleware"
    ],
    testing: [
      "Tested RESTful endpoint response codes and payload schemas",
      "Verified JWT authentication header handling and expiration",
      "Tested CRUD database operations with MongoDB Atlas"
    ],
    githubUrl: "https://github.com/RavinduDiwakara",
    demoUrl: null,
    type: "Full-Stack Development",
    icon: "Code2"
  }
];

export default projects;
