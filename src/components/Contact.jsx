import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2, AlertCircle, ExternalLink, Key } from "lucide-react";
import SectionTitle from "./SectionTitle";
import portfolioService from "../services/portfolioService";
import emailService from "../services/emailService";

/**
 * =====================================================================
 * Contact Component ("Let's Connect")
 * =====================================================================
 * Direct communication channels and active message form.
 * Directly sends inquiries to: ravindudiwakara01@gmail.com
 * via Web3Forms API with instant mailto fallback.
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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (errorMessage) {
      setErrorMessage("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrorMessage("");

    const result = await emailService.sendContactMessage(formData);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitSuccess(true);
      setSuccessMessage(result.message);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 9000);
    } else {
      setErrorMessage(result.message);
    }
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
              {/* Primary / Personal Email */}
              <a
                href="mailto:ravindudiwakara01@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 transition-all duration-200 group shadow-sm"
              >
                <div className="p-3 rounded-xl bg-cyan-100 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-500 border border-cyan-300 dark:border-cyan-800/40 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-theme-muted block uppercase">
                      Direct Email
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/20 font-semibold">
                      Primary
                    </span>
                  </div>
                  <span className="text-sm font-medium text-theme group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors truncate block">
                    ravindudiwakara01@gmail.com
                  </span>
                </div>
              </a>

              {/* University Email */}
              <a
                href={`mailto:${profile.universityEmail || "2023T01857@stu.cmb.ac.lk"}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-theme-card border border-theme hover:border-cyan-500/50 transition-all duration-200 group shadow-sm"
              >
                <div className="p-3 rounded-xl bg-teal-100 dark:bg-slate-900 text-teal-700 dark:text-teal-400 border border-teal-300 dark:border-teal-800/40 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-mono text-theme-muted block uppercase">
                    University Email
                  </span>
                  <span className="text-sm font-medium text-theme group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate block">
                    {profile.universityEmail || "2023T01857@stu.cmb.ac.lk"}
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
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-500 border border-blue-300 dark:border-blue-800/40 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-theme-muted block uppercase">
                    LinkedIn Network
                  </span>
                  <span className="text-sm font-medium text-theme group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors">
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
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-theme-surface text-slate-800 dark:text-theme border border-slate-300 dark:border-theme group-hover:scale-105 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-theme-muted block uppercase">
                    GitHub Profile
                  </span>
                  <span className="text-sm font-medium text-theme group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors">
                    github.com/RavinduDiwakara
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-theme-card border border-theme shadow-sm">
                <div className="p-3 rounded-xl bg-emerald-100 dark:bg-teal-950/40 text-emerald-700 dark:text-teal-500 border border-emerald-300 dark:border-teal-800/40">
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
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h4 className="text-xl font-bold text-theme">
                    Send a Direct Message
                  </h4>
                  <p className="text-xs font-mono text-theme-muted mt-1">
                    Delivered directly to: <span className="text-cyan-700 dark:text-cyan-400 font-bold">ravindudiwakara01@gmail.com</span>
                  </p>
                </div>
              </div>

              {/* Success Notification Alert */}
              {submitSuccess && (
                <div className="my-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/50 flex items-start gap-3 text-emerald-800 dark:text-emerald-400 text-sm shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-900 dark:text-emerald-300">Message sent successfully!</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400/90 mt-0.5">
                      {successMessage || "Thank you for reaching out! Your message was delivered directly to ravindudiwakara01@gmail.com and I will get back to you shortly."}
                    </p>
                  </div>
                </div>
              )}

              {/* Error Notification Alert & Fallback */}
              {errorMessage && (
                <div className="my-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-500/50 text-red-800 dark:text-red-300 text-sm space-y-3 shadow-xs">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900 dark:text-red-200">Unable to send message</p>
                      <p className="text-xs text-red-700 dark:text-red-300/90 mt-0.5 leading-relaxed">
                        {errorMessage}
                      </p>
                    </div>
                  </div>

                  {/* Fallback button to open mailto with filled details */}
                  <div className="pt-2 border-t border-red-200 dark:border-red-800/40 flex flex-wrap items-center gap-3">
                    <a
                      href={emailService.getMailtoLink(formData)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-red-600 hover:bg-red-700 text-white dark:bg-red-900/60 dark:hover:bg-red-800/70 border border-red-600 dark:border-red-700/60 transition-colors shadow-xs active:scale-95 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send via Email Client (mailto)</span>
                    </a>
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 dark:shadow-cyan-950/40 transition-all duration-300 disabled:opacity-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
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
