import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

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
      .then(() => {
        setLoading(false);
        setSubmitted(true);

        setFormData({
          name: "",
          email: "",
          service: "",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 4000);
      })
      .catch((error) => {
        setLoading(false);
        console.error("EmailJS error:", error);
        alert("Failed to send message. Please try again.");
      });
  };

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

          {/* 🌠 SHOOTING STAR PRELOADER */}
          {loading ? (
            <div className="relative h-32 overflow-hidden flex items-center">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="absolute top-1/2 left-10 h-[4px] w-50 bg-gradient-to-r from-transparent via-yellow-100 to-orange-400 rounded-full"
              >
                {/* Star head */}
                <div className="absolute -right-2 -top-1 w-4 h-4 bg-white rounded-full shadow-[0_0_8px_3px_rgba(255,255,255,0.8)]"></div>
              </motion.div>

              <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm opacity-80">
                Launching transmission…
              </p>
            </div>
          ) : submitted ? (
            /* 🛰️ SUCCESS MESSAGE */
            <motion.div
              className="flex flex-col items-center text-center py-10 space-y-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-6xl animate-pulse-subtle">🛰️</div>
              <p className="text-lg font-medium">Transmission Received</p>
              <p className="text-sm opacity-80 max-w-xs">
                Mission Control has received your message and will respond soon.
              </p>
            </motion.div>
          ) : (
            /* ✨ FORM */
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-sm text-left font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Captain Jane"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md bg-background border border-border px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-sm text-left font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="captainjane@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md bg-background border border-border px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-sm text-left font-medium mb-2">
                  Service Required
                </label>
                <div className="relative w-full">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md bg-background border border-border px-4 py-2.5 appearance-none"
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
                  {/* Custom dropdown arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-left font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Your Transmission..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md bg-background border border-border px-4 py-2.5 resize-none"
                />
              </div>

              <button type="submit" className="cosmic-button w-full">
                Launch Message 🚀
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
