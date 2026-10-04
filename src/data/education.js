/**
 * =====================================================================
 * Education Timeline Data (src/data/education.js)
 * =====================================================================
 * Academic milestones for Ravindu Diwakara:
 * 1. Bachelor of Information and Communication Technology (BICT), University of Colombo (Faculty of Technology)
 * 2. GCE Advanced Level Technology Stream (SFT: A, ICT: A, ET: B, Z-Score: 2.125, Island Rank: 285)
 */

export const educationTimeline = [
  {
    id: "university-of-colombo",
    institution: "University of Colombo",
    degree: "Bachelor of Information and Communication Technology (BICT)",
    period: "2023 – Present (Undergraduate)",
    location: "Colombo, Sri Lanka",
    badge: "Current Degree",
    status: "In Progress",
    highlight: "Faculty of Technology",
    description:
      "Pursuing an undergraduate degree with deep emphasis on computer networks, systems infrastructure, distributed systems, software engineering principles, and database management.",
    keyPoints: [
      "Rigorous coursework in Data Communication & Computer Networks",
      "Operating Systems, Linux Internals, and Systems Architecture",
      "Database Systems, Software Modeling, and Security Principles",
      "Practical collaborative lab sessions and network design projects"
    ]
  },
  {
    id: "gce-advanced-level",
    institution: "G.C.E. Advanced Level Examination",
    degree: "Technology Stream",
    period: "Completed",
    location: "Southern Province, Sri Lanka",
    badge: "Top Rank Achievement",
    status: "Completed",
    highlight: "Z-Score: 2.125 | Island Rank: 285",
    description:
      "Achieved outstanding results in the highly competitive National G.C.E. Advanced Level Examination in the Technology Stream, securing admission to the University of Colombo.",
    results: [
      { subject: "Science for Technology (SFT)", grade: "A" },
      { subject: "Information & Communication Technology (ICT)", grade: "A" },
      { subject: "Engineering Technology (ET)", grade: "B" }
    ],
    keyPoints: [
      "Island Rank: 285 nationwide",
      "Z-Score: 2.125",
      "Solid foundations in electrical fundamentals, digital logic, and computing"
    ]
  }
];

export default educationTimeline;
