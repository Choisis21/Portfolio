import React from "react";
import profileImg from "../assets/Chosen.jpg"; 
import CurlyBracesIcon from "../assets/curly-braces.svg";

const AboutSection = () => {
  return (
    <section className="w-full py-16 lg:py-36 -my-3.5 text-[#141414]"
    style={{ backgroundColor: "#F8F3EB" }}
    id="about">
      {/* Container for layout */}
      <div className="container flex flex-col-reverse md:flex-row items-center gap-12">

        {/* ------------------------------
            LEFT SIDE — IMAGE + DECOR
        --------------------------------*/}
        <div className="relative w-full md:w-1/2 flex justify-center">
          {/* Circular background shape */}
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/20 -z-10 animate-float" />

          {/* Profile Image */}
          <img
            src={profileImg}
            alt="Developer portrait"
            className="w-60 md:w-72 lg:w-80 object-cover rounded-xl shadow-xl animate-fade-in"
          />

          {/* Decorative lightning icon */}
          <span className="absolute top-4 right-6 text-primary text-3xl animate-float font-bold">
            ⚡
          </span>

          <span
            className="absolute bottom-3 -left-4 sm:bottom-4 sm:left-4 md:-bottom-10 md:-left-8 lg:bottom-6 lg:left-8 font-bold">
            <img
              src={CurlyBracesIcon}
              alt="curly braces"
              className=" w-12 h-12 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 object-contain rotate-20 animate-float"
            />
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
        </div>

        {/* ------------------------------
            RIGHT SIDE — TEXT CONTENT
        --------------------------------*/}
        <div className="w-full md:w-1/2 text-left animate-fade-in-delay-1">
          {/* Section heading */}
          <p className="uppercase tracking-widest text-sm mb-2">About</p>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            ABOUT ME
          </h2>

          {/* Description */}
          <p className="leading-relaxed text-base md:text-lg mb-4">
            I’m a passionate Web Developer who loves turning ideas into
            interactive digital experiences. I focus on creating clean,
            responsive, and user-friendly websites that not only look good but
            also perform smoothly across all devices.
          </p>

          <p className="leading-relaxed text-base md:text-lg mb-4">
            With a strong eye for design and detail, I enjoy blending creativity
            and functionality to build websites that leave a lasting impression.
            I work with modern technologies like <span className="font-semibold">HTML, CSS, JavaScript, React, and Node.js</span>,
            and I'm always learning new tools to stay ahead in the ever-evolving
            tech space.
          </p>

          <p className="leading-relaxed text-base md:text-lg mb-8">
            When I’m not coding, I'm exploring design trends, improving my UI/UX
            skills, or brainstorming ways to make the web more intuitive and
            engaging.
          </p>

          {/* Buttons Row */}
          <div className="flex items-center gap-8">
            <button className="cosmic-button text-lg px-8">
              Projects
            </button>

            <button className="text-primary underline underline-offset-4 hover:text-primary/70 transition">
              Let’s connect →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;






