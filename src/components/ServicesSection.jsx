import React from "react";
import { motion } from "framer-motion";
import { Wrench, Globe } from "lucide-react";
import Anglebracket from "../assets/angle-brackets.svg";
import Curly from "../assets/curly.svg";
import serviceImg from "../assets/Chosen.jpg";

/* ------------------ ANIMATION VARIANTS ------------------ */

const cardFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fadeOnly = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* ------------------ SHARED ICON STYLING ------------------ */

const iconWrapper =
  "w-12 h-12 flex items-center justify-center text-foreground text-3xl mx-auto";

/* ------------------ COMPONENT ------------------ */

const ServicesSection = () => {
  return (
    <motion.section
      id="services"
      className="w-full mt-3.5 py-16 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="container px-4 md:px-8 lg:px-0">

        {/* ---------- HEADER (DESKTOP) ---------- */}
        <motion.div
          className="hidden md:flex justify-between items-center mb-12"
          variants={fadeOnly}
        >
          <div>
            <p className="text-sm opacity-70 mb-1 tracking-wide">My services</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Services <span className="text-primary">I Provide</span>
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#contact">
              <button className="cosmic-button cursor-pointer">
                Hire me
              </button>
            </a>
            <span className="text-sm opacity-70">
              ------------- Let's connect
            </span>
          </div>
        </motion.div>

        {/* ---------- HEADER (MOBILE) ---------- */}
        <motion.div
          className="flex flex-col items-center text-center mb-8 md:hidden"
          variants={fadeOnly}
        >
          <p className="text-sm opacity-70 mb-1 tracking-wide">My services</p>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Services <span className="text-primary">I Provide</span>
          </h2>
        </motion.div>

        {/* ---------- MAIN GRID ---------- */}
        <div className="grid lg:grid-cols-2 lg:pt-16 gap-10 items-center">

          {/* ---------- SERVICE CARDS ---------- */}
          <motion.div
            className="grid sm:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {/* WEB DEVELOPMENT */}
            <motion.div
              className="card card-hover pt-5 pb-10 px-10 text-center sm:text-left lg:mb-15"
              variants={cardFadeUp}
            >
              <div className={iconWrapper}>{`</>`}</div>
              <h3 className="font-semibold text-lg mt-3 mb-2">
                Web Development
              </h3>
              <p className="text-sm opacity-75">
                Building fast, responsive, and scalable websites using modern tech and best practices.
              </p>
            </motion.div>

            {/* FRONT-END DEVELOPMENT */}
            <motion.div
              className="card card-hover pt-5 pb-10 px-10 text-center sm:text-left lg:mt-15"
              variants={cardFadeUp}
            >
              <div className={iconWrapper}>{`{...}`}</div>
              <h3 className="font-semibold text-lg mt-3 mb-2">
                Front-End Development
              </h3>
              <p className="text-sm opacity-75">
                Transforming UI designs into interactive, high-performance web experiences.
              </p>
            </motion.div>

            {/* WEBSITE MAINTENANCE */}
            <motion.div
              className="card card-hover pt-5 pb-10 px-10 text-center sm:text-left lg:mb-15"
              variants={cardFadeUp}
            >
              <div className={iconWrapper}>
                <Wrench className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg mt-3 mb-2">
                Website Maintenance
              </h3>
              <p className="text-sm opacity-75">
                Keeping your website secure, updated, and running smoothly.
              </p>
            </motion.div>

            {/* DNS MANAGEMENT */}
            <motion.div
              className="card card-hover pt-5 pb-10 px-10 text-center sm:text-left lg:mt-15"
              variants={cardFadeUp}
            >
              <div className={iconWrapper}>
                <Globe className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg mt-3 mb-2">
                DNS Management
              </h3>
              <p className="text-sm opacity-75">
                Managing DNS records, domain routing, and secure connectivity.
              </p>
            </motion.div>
          </motion.div>

          {/* ---------- IMAGE SECTION ---------- */}
          <motion.div
            className="relative flex justify-center mt-10 lg:mt-0"
            variants={fadeOnly}
          >
            <div className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-primary/20 rounded-full -z-10 top-6"></div>

            <motion.img
              src={serviceImg}
              alt="Service provider"
              className="w-52 rounded-xl sm:w-60 md:w-72 lg:w-80 object-cover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            />

            <span className="absolute bottom-3 -left-4 sm:bottom-4 sm:left-4 md:-bottom-10 md:-left-8 lg:bottom-6 lg:left-8">
              <img
                src={Anglebracket}
                alt="angle brackets"
                className="w-12 h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 animate-float"
              />
            </span>

            <span className="absolute right-2 sm:right-8 top-8">
              <img
                src={Curly}
                alt="curly braces"
                className="w-12 h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 animate-float"
              />
            </span>
          </motion.div>
        </div>

        {/* ---------- MOBILE CTA ---------- */}
        <motion.div
          className="flex flex-col items-center mt-10 md:hidden space-y-3"
          variants={fadeOnly}
        >
          <button className="cosmic-button w-48">Hire me</button>
          <span className="text-sm opacity-70">
            ------------- Let's connect
          </span>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default ServicesSection;
