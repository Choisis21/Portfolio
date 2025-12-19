import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

/**
 * Space-themed Contact Form
 * --------------------------------
 * • Fully responsive (mobile → tablet → desktop)
 * • Light / Dark mode via theme tokens
 * • Clean animations (Framer Motion)
 * • No hardcoded colors
 * • Accessible & maintainable
 */
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  /* =====================
     FORM HANDLERS
  ====================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Explicit EmailJS template params (aligned with template)
    const templateParams = {
      name: formData.name,
      email: formData.email,
      service: formData.service,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        "service_igrlmbc",
        "template_kjee7om",
        templateParams,
        "ySuudj3tO2K2Q3wSS"
      )
      .then(
        () => {
          setSubmitted(true);

          setFormData({
            name: "",
            email: "",
            service: "",
            message: "",
          });

          setTimeout(() => setSubmitted(false), 4000);
        },
        (error) => {
          console.error("EmailJS error:", error);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  /* =====================
     ANIMATION VARIANTS
  ====================== */
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24"
    >
      <div className="absolute inset-0 -z-10">
        <span className="star w-1 h-1 top-[20%] left-[15%] animate-pulse-subtle" />
        <span className="star w-1.5 h-1.5 top-[45%] left-[75%] animate-pulse-subtle" />
        <span className="star w-1 h-1 top-[70%] left-[35%] animate-pulse-subtle" />
        <span className="meteor w-40 h-0.5 top-[10%] left-[80%] animate-meteor" />
      </div>

      <div className="container px-4">
        <motion.div
          className="card card-hover mx-auto max-w-lg sm:max-w-xl p-6 sm:p-8 md:p-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <header className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-glow mb-2">
              Contact Mission Control
            </h2>
            <p className="text-sm sm:text-base opacity-80">
              Send a signal across the stars ✨
            </p>
          </header>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Name */}
              <div className="animate-fade-in-delay-1">
                <label className="block text-sm text-left font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Captain Jane"
                  required
                  className="w-full rounded-md bg-background border border-border px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
                />
              </div>

              {/* Email */}
              <div className="animate-fade-in-delay-2">
                <label className="block text-sm text-left font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@galaxy.com"
                  required
                  className="w-full rounded-md bg-background border border-border px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
                />
              </div>

              {/* Service */}
              <div className="animate-fade-in-delay-3">
                <label className="block text-sm text-left font-medium mb-2">
                  Service Required
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md bg-background border border-border px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
                >
                  <option value="">Select a service</option>
                  <option value="Website Design">Website Design</option>
                  <option value="Website Development">
                    Website Development
                  </option>
                  <option value="UI/UX Design">UI / UX Design</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="E-commerce Website">
                    E-commerce Website
                  </option>
                  <option value="Website Redesign">Website Redesign</option>
                  <option value="Maintenance & Support">
                    Maintenance & Support
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="animate-fade-in-delay-4">
                <label className="block text-sm font-medium text-left mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your transmission..."
                  required
                  className="w-full rounded-md bg-background border border-border px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-primary/60 transition resize-none"
                />
              </div>

              <div className="pt-3 sm:pt-4 text-center">
                <button type="submit" className="cursor-pointer cosmic-button">
                  Launch Message 🚀
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              className="flex flex-col items-center text-center py-10 space-y-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-6xl animate-pulse-subtle">🛰️</div>
              <p className="text-lg font-medium">
                Transmission Received
              </p>
              <p className="text-sm opacity-80 max-w-xs">
                Mission Control has received your message and will respond soon.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
