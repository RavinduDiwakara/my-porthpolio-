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
  name: "H.U.G. Ravindu Diwakara",
  shortName: "Ravindu Diwakara",
  monogram: "RD",
  title: "Networking & DevOps Enthusiast",
  subtitle: "BICT Undergraduate & Infrastructure Enthusiast",

  // Physical location
  location: "Galle, Elpitiya, Sri Lanka",

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
    "I am an Information and Communication Technology undergraduate at the University of Colombo with a strong interest in Networking, DevOps, Cloud Computing, Infrastructure, and Network Security. I enjoy building practical projects, learning modern infrastructure technologies, and improving my technical skills through hands-on development.",

  // Hero section concise narrative
  heroBio:
    "I am an Information and Communication Technology undergraduate at the University of Colombo with a strong interest in Networking, DevOps, Cloud Computing, Infrastructure, and Network Security. I enjoy building practical projects, learning modern infrastructure technologies, and improving my technical skills through hands-on development.",

  // About section multi-paragraph elaboration
  aboutBio: [
    "I am an Information and Communication Technology undergraduate at the University of Colombo with a strong interest in Networking, DevOps, Cloud Computing, Infrastructure, and Network Security.",
    "I enjoy building practical projects, learning modern infrastructure technologies, and improving my technical skills through hands-on development.",
    "My focus centers on enterprise network architecture, Linux environments, containerization with Docker, CI/CD automation pipelines, and infrastructure reliability."
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
