/**
 * =====================================================================
 * Featured Projects Data
 * =====================================================================
 * This file contains the technical projects featured on the portfolio.
 * You can add new projects by copying an existing object structure and
 * filling in the title, description, tags, key features, and URLs.
 */

export const projects = [
  {
    id: "enterprise-network-design",
    title: "Enterprise Multi-Site Network Design",
    category: "Computer Networking",
    badge: "Cisco Simulation",
    featured: true,
    summary:
      "Designed and configured a resilient multi-site enterprise network using Cisco Packet Tracer with VLAN segmentation, inter-VLAN routing, and dynamic routing protocols.",
    description:
      "A comprehensive network engineering simulation connecting Headquarters (HQ), Branch offices, and an isolated Web/DMZ infrastructure. Configured Router-on-a-Stick for inter-VLAN communication, dynamic IP provisioning via DHCP servers, internal DNS resolution, and RIP v2 dynamic routing for automated route propagation across WAN links.",
    technologies: [
      "Cisco Packet Tracer",
      "VLAN & Trunking",
      "Inter-VLAN Routing",
      "Router-on-a-Stick",
      "RIP v2",
      "DHCP & DNS",
      "Subnetting (CIDR)",
      "Network Troubleshooting"
    ],
    features: [
      "Headquarters (HQ) & Branch multi-office topology setup",
      "Dedicated Web / DMZ network isolation",
      "VLAN segmentation with 802.1Q encapsulation trunk links",
      "Router-on-a-Stick architecture for efficient inter-VLAN traffic",
      "RIP v2 dynamic routing protocol across gateway routers",
      "Centralized DHCP server for automatic host IP addressing",
      "Internal DNS configuration and network verification testing"
    ],
    // Repository link: you can update this to the exact repository URL
    githubUrl: "https://github.com/RavinduDiwakara",
    demoUrl: null, // Set to a live URL or architecture diagram if available
    type: "Networking Infrastructure",
    icon: "Network"
  },
  {
    id: "docker-containerization",
    title: "Docker & Containerization Projects",
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
    githubUrl: "https://github.com/RavinduDiwakara",
    demoUrl: null,
    type: "DevOps / Infrastructure",
    icon: "Boxes"
  },
  {
    id: "cicd-pipeline",
    title: "CI/CD Pipeline Project",
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
    githubUrl: "https://github.com/RavinduDiwakara",
    demoUrl: null,
    type: "DevOps Automation",
    icon: "Workflow"
  },
  {
    id: "mern-application",
    title: "Full-Stack MERN Application",
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
    githubUrl: "https://github.com/RavinduDiwakara",
    demoUrl: null,
    type: "Full-Stack Development",
    icon: "Code2"
  }
];
