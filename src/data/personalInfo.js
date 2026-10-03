/**
 * =====================================================================
 * Personal Information Data File
 * =====================================================================
 * This file centralizes your core personal and contact information.
 * When you need to update your email, title, social links, or bio,
 * you can edit this single file without touching any UI component!
 */

export const personalInfo = {
  // Your full name as shown across headers and hero sections
  name: "H.U.G. Ravindu Diwakara",
  shortName: "Ravindu Diwakara",
  monogram: "RD",

  // Your professional identity
  title: "Networking & DevOps Enthusiast",
  subtitle: "Undergraduate & Aspiring Technology Professional",

  // Academic status and university
  degree: "Bachelor of Information and Communication Technology (BICT)",
  university: "University of Colombo",
  gpa: "3.621",

  // Current physical location
  location: "Galle, Sri Lanka",

  // Contact details & external profiles
  email: "2023T01857@stu.cmb.ac.lk",
  github: "https://github.com/RavinduDiwakara",
  linkedin: "https://www.linkedin.com/in/ravindu-diwakara-95912b311",

  // Path to your CV file located in the /public folder
  // Simply place your 'Ravindu-Diwakara-CV.pdf' inside the 'public' folder
  resumeUrl: "/Ravindu-Diwakara-CV.pdf",

  // Hero section short bio
  heroBio:
    "Building my skills in networking, infrastructure, automation, cloud technologies, and DevOps practices.",

  // Detailed biography used in the 'About Me' section
  aboutBio: [
    "I am an Information and Communication Technology undergraduate at the University of Colombo with a strong interest in computer networking, DevOps, cloud technologies, and infrastructure.",
    "I enjoy learning through practical projects and experimenting with technologies such as Cisco networking, Linux, Docker, Git, CI/CD tools, and cloud platforms.",
    "My goal is to develop strong practical skills and build a career in networking, DevOps, and infrastructure engineering."
  ],

  // Key metrics / statistic badges shown in the About section
  stats: [
    {
      label: "Current GPA",
      value: "3.621",
      detail: "BICT, University of Colombo",
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
      value: "Galle, Sri Lanka",
      detail: "Open to Remote & On-site",
      icon: "MapPin"
    }
  ]
};
