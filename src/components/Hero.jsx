import React from "react";
import { motion } from "framer-motion";

import heroImg from "../assets/Chosen.jpg";
import htmlIcon from "../assets/html.svg";
import cssIcon from "../assets/css.svg";
import wordpressIcon from "../assets/wordpress.svg";
import javascriptIcon from "../assets/javascript.svg";
import reactIcon from "../assets/react.svg";

import RibbonLoop from "../components/RibbonLoop";

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="container relative z-0 min-h-[calc(100vh-120px)] flex flex-col justify-center pt-30 pb-16 md:pb-24"
      >
        {/* Greeting */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="inline-block px-4 py-1 rounded-full border text-sm">
            Hello
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-3xl md:text-5xl font-bold mt-4 "
        >
          I am <span className="text-primary">Chosen</span>
        </motion.h1>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-2xl md:text-4xl font-[Exo_2,_sans-serif] font-semibold mt-2 mb-6"
        >
          A Web Developer
        </motion.h2>

        {/* Main Layout */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20 mt-10">
          {/* Text + Quote */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-left max-w-lg"

          >
            <blockquote className="text-sm md:text-base opacity-80 border-l-4 border-primary pl-4">
              I build fast, scalable, and conversion-focused websites for modern
              brands. Highly recommended for brands that value performance and
              precision.
            </blockquote>

            <a href="#contact">
              <button className="cosmic-button cursor-pointer mt-6 inline-block text-center">
                Let&apos;s Talk
              </button>
            </a>
          </motion.div>

          {/* Profile Image + Floating Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <img
              src={heroImg}
              className="w-52 md:w-72 lg:w-80 object-cover rounded-full shadow-lg"
              alt="Chosen - Web Developer"
              loading="lazy"
            />

            {/* Floating skill icons */}
            <img
              src={htmlIcon}
              className="w-10 absolute lg:-top-10 -top-8 lg:left-20 left-10 animate-float"
              alt="HTML Icon"
              loading="lazy"
            />
            <img
              src={cssIcon}
              className="w-10 absolute top-10 -right-4 animate-float"
              alt="CSS Icon"
              loading="lazy"
            />
            <img
              src={wordpressIcon}
              className="w-10 absolute -bottom-4 right-4 animate-float"
              alt="WordPress Icon"
              loading="lazy"
            />
            <img
              src={javascriptIcon}
              className="w-10 absolute -left-4 lg:bottom-5 -bottom-5 animate-float"
              alt="JavaScript Icon"
              loading="lazy"
            />
            <img
              src={reactIcon}
              className="w-10 absolute top-20 lg:top-24 lg:-left-14 -left-10 animate-float"
              alt="React Icon"
              loading="lazy"
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="text-center lg:text-left space-y-4 lg:space-y-6"
          >
            <div>
              <p className="text-primary text-3xl font-bold">10+</p>
              <p className="opacity-70 text-sm">Projects Delivered</p>
            </div>

            <div>
              <p className="text-primary text-3xl font-bold">5+</p>
              <p className="opacity-70 text-sm">Years of experience</p>
            </div>

            <div>
              <p className="text-primary text-3xl font-bold">98%</p>
              <p className="opacity-70 text-sm">Client Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ribbons */}
      <RibbonLoop type="dark" />
      <RibbonLoop type="orange" />
    </>
  );
}
