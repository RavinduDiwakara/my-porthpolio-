import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import SectionTitle from "./SectionTitle";
import portfolioService from "../services/portfolioService";

/**
 * =====================================================================
 * Contact Component ("Let's Connect")
 * =====================================================================
 * Direct communication channels and interactive message form.
 * Supports Black & White theme styling and centralized profile data.
 */
export default function Contact() {
  const [profile, setProfile] = useState(() => portfolioService.getProfile());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setProfile(portfolioService.getProfile());
    };
    window.addEventListener("portfolio-storage-update", handleStorageUpdate);
    return () => window.removeEventListener("portfolio-storage-update", handleStorageUpdate);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please provide a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please include a message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 6000);
    }, 1000);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Collaboration"
      className="py-20 md:py-28 relative bg-theme-surface border-t border-theme"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="GET IN TOUCH"
          title="Let's Connect"
          subtitle="I'm always interested in learning, collaborating on technical projects, and connecting with people in networking, DevOps, and cloud technologies."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          {/* Left Column: Direct Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-theme tracking-tight">
                Open to Opportunities &amp; Knowledge Sharing
              </h3>
              <p className="mt-3 text-sm text-theme-secondary leading-relaxed">
                Whether you'd like to discuss Cisco network topologies, Docker containerization, academic projects, or upcoming engineering opportunities, feel free to reach out.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              {/* Email */}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 transition-all duration-200 group shadow-sm"
              >
                <div className="p-3 rounded-xl bg-cyan-950/40 text-cyan-500 border border-cyan-800/40 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-mono text-theme-muted block uppercase">
                    University Email
                  </span>
                  <span className="text-sm font-medium text-theme group-hover:text-cyan-500 transition-colors truncate block">
                    {profile.email}
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 transition-all duration-200 group shadow-sm"
              >
                <div className="p-3 rounded-xl bg-blue-950/40 text-blue-500 border border-blue-800/40 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-theme-muted block uppercase">
                    LinkedIn Network
                  </span>
                  <span className="text-sm font-medium text-theme group-hover:text-cyan-500 transition-colors">
                    linkedin.com/in/ravindu-diwakara
                  </span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 transition-all duration-200 group shadow-sm"
              >
                <div className="p-3 rounded-xl bg-theme-surface text-theme border border-theme group-hover:scale-105 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-theme-muted block uppercase">
                    GitHub Profile
                  </span>
                  <span className="text-sm font-medium text-theme group-hover:text-cyan-500 transition-colors">
                    github.com/RavinduDiwakara
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-theme-card border border-theme shadow-sm">
                <div className="p-3 rounded-xl bg-teal-950/40 text-teal-500 border border-teal-800/40">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-theme-muted block uppercase">
                    Location
                  </span>
                  <span className="text-sm font-medium text-theme">
                    {profile.location}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="p-7 sm:p-8 rounded-2xl bg-theme-card border border-theme shadow-lg">
              <h4 className="text-xl font-bold text-theme mb-2">
                Send a Direct Message
              </h4>
              <p className="text-xs font-mono text-theme-muted mb-6">
                Fill in the details below and I will get back to you shortly.
              </p>

              {/* Success Notification Alert */}
              {submitSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex items-start gap-3 text-emerald-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-xs text-emerald-400/90 mt-0.5">
                      Thank you for reaching out. I will respond to your email as soon as possible.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono uppercase tracking-wider text-theme-secondary mb-1.5"
                    >
                      Your Name <span className="text-cyan-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Silva"
                      className={`w-full px-4 py-2.5 rounded-xl bg-theme-surface border text-theme text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? "border-red-500/70 focus:ring-red-500/40"
                          : "border-theme focus:border-cyan-500 focus:ring-cyan-500/30"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase tracking-wider text-theme-secondary mb-1.5"
                    >
                      Your Email <span className="text-cyan-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-theme-surface border text-theme text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? "border-red-500/70 focus:ring-red-500/40"
                          : "border-theme focus:border-cyan-500 focus:ring-cyan-500/30"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono uppercase tracking-wider text-theme-secondary mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Inquiry / Internship / Project Collaboration"
                    className="w-full px-4 py-2.5 rounded-xl bg-theme-surface border border-theme text-theme text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-theme-secondary mb-1.5"
                  >
                    Your Message <span className="text-cyan-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello Ravindu, I came across your portfolio and wanted to reach out regarding..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-theme-surface border text-theme text-sm focus:outline-none focus:ring-2 transition-all resize-y ${
                      errors.message
                        ? "border-red-500/70 focus:ring-red-500/40"
                        : "border-theme focus:border-cyan-500 focus:ring-cyan-500/30"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-950/40 transition-all duration-300 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
