import React from "react";
import {
  Network,
  Boxes,
  ShieldCheck,
  Code2,
  Database,
  Cloud,
  Server,
  Workflow,
  Terminal,
  GraduationCap,
  MapPin,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Download,
  Award,
  Layers,
  CheckCircle2,
  Cpu,
  Router,
  Flame,
  Globe,
  Radio
} from "lucide-react";

/**
 * =====================================================================
 * DynamicIcon Component
 * =====================================================================
 * Dynamically resolves and renders a Lucide React icon based on a string name.
 * Prevents having to manually import and switch on icon components in data-driven loops.
 *
 * @param {string} name - Name of the Lucide icon
 * @param {string} className - Optional Tailwind CSS class names
 * @param {number} size - Icon size in pixels
 */
export default function DynamicIcon({ name, className = "w-5 h-5", size = 20 }) {
  const iconMap = {
    Network,
    Boxes,
    ShieldCheck,
    Code2,
    Database,
    Cloud,
    Server,
    Workflow,
    Terminal,
    GraduationCap,
    MapPin,
    Mail,
    Github,
    Linkedin,
    ExternalLink,
    ChevronRight,
    Download,
    Award,
    Layers,
    CheckCircle2,
    Cpu,
    Router,
    Flame,
    Globe,
    Radio
  };

  const IconComponent = iconMap[name] || Terminal; // Fallback to Terminal if name not matched

  return <IconComponent className={className} size={size} aria-hidden="true" />;
}
