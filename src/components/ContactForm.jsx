import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import MailImg from "../assets/mail.webp";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

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

    if (!captchaValue) {
      alert("Please verify that you are not a robot.");
      return;
    }

    setLoading(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      service: formData.service,
      message: formData.message,
      "g-recaptcha-response": captchaValue,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        "service_igrlmbc",
        "template_kjee7om",
        templateParams,
        "ySuudj3tO2K2Q3wSS"
      )
      .then(() =>
        emailjs.send(
          "service_igrlmbc",
          "template_rzvfwf9",
          templateParams,
          "ySuudj3tO2K2Q3wSS"
        )
      )
      .then(() => {
        setLoading(false);
        setSubmitted(true);
        setCaptchaValue(null);
        setFormData({ name: "", email: "", service: "", message: "" });
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

  const isBusy = loading || submitted;

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24"
    >
      <div className="container px-4">
        <motion.div
          className="card mx-auto max-w-5xl overflow-hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {isBusy ? (
            /* ---------- FULL-WIDTH STATUS PANEL ---------- */
            <div className="relative flex min-h-[28rem] flex-col items-center justify-center gap-6 overflow-hidden bg-primary/5 p-8 text-center sm:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
              />

              {loading ? (
                <>
                  <motion.img
                    src={MailImg}
                    alt=""
                    aria-hidden="true"
                    className="relative w-28 drop-shadow-xl sm:w-36"
                    animate={{ y: [0, -14, 0] }}
                    transition={{
                      duration: 2.2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />

                  {/* comet streak */}
                  <div className="relative h-14 w-full max-w-md overflow-hidden">
                    <motion.div
                      initial={{ x: "-130%" }}
                      animate={{ x: "130%" }}
                      transition={{
                        duration: 1.4,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                      className="absolute top-1/2 left-0 h-[5px] w-40 rounded-full bg-gradient-to-r from-transparent via-yellow-100 to-orange-400"
                    >
                      <div className="absolute -right-2.5 -top-[7px] h-5 w-5 rounded-full bg-white shadow-[0_0_14px_5px_rgba(255,255,255,0.8)]" />
                    </motion.div>
                  </div>

                  <div className="relative space-y-2">
                    <p className="text-xl font-semibold sm:text-2xl">
                      Launching transmission&#8230;
                    </p>
                    <p className="text-sm opacity-70">
                      Hold tight while your message clears the atmosphere.
                    </p>
                  </div>
                </>
              ) : (
                <motion.div
                  className="relative flex flex-col items-center gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="animate-pulse-subtle text-7xl sm:text-8xl">
                    &#128752;
                  </div>
                  <h2 className="text-glow text-2xl font-bold sm:text-3xl">
                    Transmission Received
                  </h2>
                  <p className="max-w-md text-sm opacity-80 sm:text-base">
                    Mission Control has received your message and will respond
                    soon.
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
            /* ---------- TWO-COLUMN FORM LAYOUT ---------- */
            <div className="grid lg:grid-cols-2">
              {/* LEFT: ILLUSTRATION PANEL */}
              <aside className="relative flex flex-col items-center justify-center gap-6 overflow-hidden border-b border-border bg-primary/10 p-8 text-center sm:p-10 lg:border-b-0 lg:border-r">
                {/* soft glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
                />

                <motion.img
                  src={MailImg}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="relative w-40 drop-shadow-xl sm:w-48 lg:w-56"
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />

                <div className="relative">
                  <h2 className="text-glow mb-2 text-2xl font-bold sm:text-3xl">
                    Contact Mission Control
                  </h2>
                  <p className="text-sm opacity-80 sm:text-base">
                    Send a signal across the stars &#10024;
                  </p>
                </div>

                <ul className="relative space-y-2 text-sm opacity-80">
                  <li>Websites, landing pages &amp; e-commerce</li>
                  <li>SEO/AEO and performance tuning</li>
                  <li>Redesigns, maintenance &amp; support</li>
                </ul>
              </aside>

              {/* RIGHT: FORM PANEL */}
              <div className="flex min-h-[32rem] flex-col justify-center p-6 sm:p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-left text-sm font-medium"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Captain Jane"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-border bg-background px-4 py-2.5"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-left text-sm font-medium"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="captainjane@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-border bg-background px-4 py-2.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="mb-2 block text-left text-sm font-medium"
                    >
                      Service Required
                    </label>
                    <div className="relative w-full">
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-md border border-border bg-background px-4 py-2.5"
                      >
                        <option value="">Select a service</option>
                        <option value="Website Development">
                          Website Development
                        </option>
                        <option value="SEO & AEO (AI Search Visibility)">
                          SEO &amp; AEO (AI Search Visibility)
                        </option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="E-commerce Website">
                          E-commerce Website
                        </option>
                        <option value="Website Redesign">
                          Website Redesign
                        </option>
                        <option value="Maintenance & Support">
                          Maintenance &amp; Support
                        </option>
                        <option value="Other">Other</option>
                      </select>
                      {/* Down Arrow Icon */}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-left text-sm font-medium"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Your Transmission..."
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full resize-none rounded-md border border-border bg-background px-4 py-2.5"
                    />
                  </div>

                  {/* CAPTCHA */}
                  <div className="flex justify-center overflow-hidden">
                    <div className="origin-center scale-90 sm:scale-100">
                      <ReCAPTCHA
                        sitekey="6LfnBzEsAAAAAHazTGHVGB9ENCtD62Ril4mE5rwJ"
                        onChange={(value) => setCaptchaValue(value)}
                      />
                    </div>
                  </div>

                  <button type="submit" className="cosmic-button w-full">
                    Launch Message &#128640;
                  </button>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
