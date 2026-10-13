/**
 * =====================================================================
 * Centralized Profile Data (src/data/profile.js)
 * =====================================================================
 * This file centralizes all personal, academic, and contact information.
 * Any updates made here will automatically propagate across the portfolio
 * components (Navbar, Hero, About, Contact, Footer, and Admin).
 */

const profile = {
  // Full personal and professional identity
  name: "Ravindu Diwakara",
  fullName: "H.U.G. Ravindu Diwakara",
  shortName: "Ravindu Diwakara",
  monogram: "RD",
  title: "Network Engineer & DevOps Practitioner",
  subtitle: "BICT Undergraduate & Infrastructure Engineer",

  // Physical location
  location: "Galle, Sri Lanka",
  fullLocation: "Galle, Elpitiya, Sri Lanka",

  // Academic credentials
  education: "Bachelor of Information and Communication Technology (BICT)",
  degree: "Bachelor of Information and Communication Technology (BICT)",
  university: "University of Colombo",
  faculty: "Faculty of Technology",
  // Contact details & external profiles
  email: "ravindudiwakara01@gmail.com",
  personalEmail: "ravindudiwakara01@gmail.com",
  universityEmail: "2023T01857@stu.cmb.ac.lk",
  github: "https://github.com/RavinduDiwakara",
  linkedin: "https://www.linkedin.com/in/ravindu-diwakara-95912b311",

  // Paths to static assets in /public folder
  resumeUrl: "/Ravindu-Diwakara-CV.pdf",
  profileImage: "/profile/ravindu-profile.png",

  // Core description as requested by the user
  description:
    "Information and Communication Technology undergraduate at the University of Colombo specializing in enterprise network design, Linux systems administration, and automated CI/CD pipelines with Docker.",

  // Hero section concise narrative
  heroBio:
    "Information and Communication Technology undergraduate at the University of Colombo specializing in enterprise network design, Linux systems administration, and automated CI/CD pipelines with Docker.",

  // About section multi-paragraph elaboration (Technical Storytelling)
  aboutBio: [
    "As an Information & Communication Technology undergraduate at the University of Colombo, my academic foundation is rooted in computer systems, telecommunications, and operating system internals.",
    "I believe true engineering competency comes from hands-on implementation. I actively design and test enterprise network topologies—configuring multi-area OSPF, VLAN segmentation, and ACL security policies in Cisco environments, while managing bare-metal and virtualized Linux servers.",
    "My current focus is bridging physical and logical network infrastructure with modern DevOps practices—automating reproducible environments through Docker containerization and deploying robust CI/CD pipelines."
  ],

  // Career Focus areas
  careerFocus: [
    "Network Engineering",
    "DevOps & Cloud Deployment"
  ],

  // Academic & professional highlights displayed in the About section
  stats: [
    {
      label: "Institution",
      value: "University of Colombo",
      detail: "Faculty of Technology",
      icon: "GraduationCap"
    },
    {
      label: "Primary Focus",
      value: "Networking",
      detail: "Routing, Switching & Security",
      icon: "Network"
    },
    {
      label: "Career Direction",
      value: "DevOps & Cloud",
      detail: "Automation, CI/CD & Containers",
      icon: "Terminal"
    },
    {
      label: "Location",
      value: "Galle, Elpitiya, Sri Lanka",
      detail: "Open to Opportunities",
      icon: "MapPin"
    }
  ]
};

export default profile;
export { profile };
