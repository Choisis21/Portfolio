import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Web and System Support",
    company: "Freelance",
    period: "2025 — Present",
    description:
      "Designing and developing high-performance, responsive websites for clients across various industries. Focused on clean UI, scalability, and performance optimization.",
    tech: ["React", "TailwindCSS", "JavaScript", "WordPress"],
  },
  {
    role: "Web Developer",
    company: "Creative Agency",
    period: "2024 — 2025",
    description:
      "Collaborated with designers to convert UI/UX designs into interactive web interfaces. Improved accessibility, responsiveness, and cross-browser compatibility.",
    tech: ["HTML", "CSS", "JavaScript", "Figma"],
  },
  {
    role: "Junior Web Developer",
    company: "Bite Agency, Lagos.",
    period: "2020 — 2021",
    description:
      "Assisted in building and maintaining websites, fixing bugs, and implementing new features while learning modern development workflows.",
    tech: ["HTML", "CSS", "Python"],
  },
  {
    role: "Intern Web Developer",
    company: "Just Novate Technologies, Lagos.",
    period: "2020 — 2022",
    description:
      "Assisted in building and maintaining websites, fixing bugs, and implementing new features while learning modern development workflows.",
    tech: ["HTML", "CSS", "Python", "WordPress"],
  },
];

// Animation variants
const cardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    y: 30,
    x: direction === "left" ? -40 : 40,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Experience = () => {
  return (
    <section className="relative py-24">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="max-w-xl mx-auto text-foreground/80">
            A timeline of my professional journey, highlighting the roles and
            experiences that shaped my skills.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-px bg-border md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-6 ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-4 md:left-1/2 top-6 h-3 w-3 rounded-full bg-primary md:-translate-x-1/2"
                  />

                  {/* Spacer (desktop) */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <div className="md:w-1/2">
                    <motion.div
                      custom={isEven ? "right" : "left"}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-80px" }}
                      className="card card-hover p-6 text-left"
                    >
                      <span className="text-sm text-primary font-medium">
                        {exp.period}
                      </span>

                      <h3 className="mt-2 text-xl font-semibold">
                        {exp.role}
                      </h3>

                      <p className="text-sm text-foreground/70 mb-4">
                        {exp.company}
                      </p>

                      <p className="text-sm text-foreground/80 mb-4">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full
                                       bg-primary/10 text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
