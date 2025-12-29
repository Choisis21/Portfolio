import React from "react";
import { motion } from "framer-motion";
import { CodeXml,Braces } from "lucide-react";
import profileImg from "../assets/Olu.jpg";
import cvFile from "../assets/Chosen.pdf";

/* ------------------------------
   Animation Variants
--------------------------------*/
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerText = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="w-full py-16 lg:py-36 -my-3.5 bg-background text-foreground transition-colors z-10"
    >
      <div className="container flex flex-col-reverse md:flex-row items-center gap-12">
        {/* ------------------------------
            LEFT — IMAGE + DECOR
        --------------------------------*/}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative w-full md:w-1/2 flex justify-center"
        >
          {/* Circular background */}
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/20 -z-10 animate-float" />

          {/* Profile Image (Lazy Loaded) */}
          <img
            src={profileImg}
            alt="Portrait of Chosen Akinnola"
            loading="lazy"
            decoding="async"
            className="w-60 h-53 lg:h-100 md:w-72 lg:w-80 object-cover rounded-xl shadow-xl bg-card"
          />

         {/* Code XML icon */}
        <span className="absolute top-4 -right-5 lg:right-20 text-primary rotate-20 animate-float">
          <CodeXml className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" strokeWidth={2.5}/>
        </span>


         <span className="absolute bottom-3 -left-4 sm:bottom-4 sm:left-4 md:-bottom-10 md:-left-8 lg:bottom-6 lg:left-8 text-primary rotate-20 animate-float opacity-80">
           <Braces className="w-12 h-12 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-20 lg:h-20" strokeWidth={2.5} />
        </span>


          {/* Dotted pattern */}
          <div className="absolute md:-left-13 -left-8 top-10 grid grid-cols-4 gap-2 opacity-40">
            {Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 bg-primary/60 rounded-full animate-pulse-subtle"
              />
            ))}
          </div>
        </motion.div>

        {/* ------------------------------
            RIGHT — TEXT CONTENT
        --------------------------------*/}
        <motion.div
          variants={staggerText}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full md:w-1/2 z-10 text-left"
        >
          {/* Section label */}
          <motion.p
            variants={fadeUp}
            className="uppercase tracking-widest text-sm mb-2 text-primary"
          >
            About
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-extrabold mb-6"
          >
            ABOUT ME
          </motion.h2>

          {/* Body text */}
          <motion.p
            variants={fadeUp}
            className="leading-relaxed text-base md:text-lg mb-4 text-foreground/90"
          >
            I am a passionate Front-End Web Developer who loves turning ideas into
            interactive digital experiences. I focus on creating clean,
            responsive, and user-friendly websites that not only look good but
            also perform smoothly across all devices.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="leading-relaxed text-base md:text-lg mb-4 text-foreground/90"
          >
            With a strong eye for design and detail, I enjoy blending creativity
            and functionality to build websites that leave a lasting impression.
            I work with modern technologies like{" "}
            <span className="font-semibold text-primary">
              HTML, CSS, JavaScript, React, Next.js
            </span>{" "}
            and CMS platforms such as{" "}
            <span className="font-semibold text-primary">
              WordPress and Shopify
            </span>
            , and I am always learning new tools to stay ahead in the
            ever-evolving tech space.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="leading-relaxed text-base md:text-lg mb-8 text-foreground/90"
          >
            When I am not coding, I am exploring design trends, improving my UI/UX
            skills, or brainstorming ways to make the web more intuitive and
            engaging.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp} className="flex items-center gap-8">
            <a
              href={cvFile}
              download="Chosen.pdf"
              className="cosmic-button cursor-pointer text-md px-5"
            >
              Download CV
            </a>

            <a href="#contact">
              <button className="text-primary underline cursor-pointer underline-offset-4 hover:text-primary/70 transition">
                Let’s connect →
              </button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
