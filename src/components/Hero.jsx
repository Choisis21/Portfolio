import React from "react";
import heroImg from "../assets/Chosen.jpg";
import cvFile from "../assets/Chosen.pdf";
import htmlIcon from "../assets/html.svg";
import cssIcon from "../assets/css.svg";
import wordpressIcon from "../assets/wordpress.svg";
import javascriptIcon from "../assets/javascript.svg";
import reactIcon from "../assets/react.svg";

import RibbonLoop from "../components/RibbonLoop";

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section className="container relative z-0 min-h-[calc(100vh-120px)] flex flex-col justify-center pt-30 pb-16 md:pb-24"
      id="hero">

        {/* Greeting */}
        <div className="animate-fade-in delay-100">
          <span className="inline-block px-4 py-1 rounded-full border text-sm">
            Hello
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-bold mt-4 animate-fade-in-delay-1">
          I am <span className="text-primary">Chosen</span>
        </h1>

        <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-6 animate-fade-in-delay-2">
          A Web Developer
        </h2>

        {/* Main Layout */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20 mt-10">

          {/* Text + Quote */}
          <div className="text-left max-w-lg animate-fade-in-delay-3">
            <blockquote className="text-sm md:text-base opacity-80 border-l-4 border-primary pl-4">
              Chosen delivers exceptional web solutions that drive real results.
              Highly recommended for brands that value performance and precision.
            </blockquote>

            <a
             href={cvFile}
             download="Chosen.pdf"
             className="cosmic-button mt-6 inline-block text-center"
            >
             Download CV
            </a>
          </div>

          {/* Profile Image + Floating Icons */}
          <div className="relative animate-fade-in-delay-4">
            <img
              src={heroImg}
              className="w-52 md:w-72 lg:w-80 object-cover rounded-full shadow-lg"
              alt="Chosen - Web Developer"
            />

            {/* Floating skill icons */}
            <img src={htmlIcon} className="w-10 absolute lg:-top-10 -top-8 lg:left-20 left-10 animate-float" alt="HTML Icon" />
            <img src={cssIcon} className="w-10 absolute top-10 -right-4 animate-float" alt="CSS Icon" />
            <img src={wordpressIcon} className="w-10 absolute -bottom-4 right-4 animate-float" alt="WordPress Icon" />
            <img src={javascriptIcon} className="w-10 absolute -left-4 lg:bottom-5 -bottom-5 animate-float" alt="JavaScript Icon" />
            <img src={reactIcon} className="w-10 absolute top-20 lg:top-24 lg:-left-14 -left-10 animate-float" alt="React Icon" />
          </div>

          {/* Stats */}
          <div className="text-center lg:text-left space-y-4 lg:space-y-6 animate-fade-in-delay-4">
            <div>
              <p className="text-primary text-3xl font-bold">100</p>
              <p className="opacity-70 text-sm">Projects done</p>
            </div>

            <div>
              <p className="text-primary text-3xl font-bold">20+</p>
              <p className="opacity-70 text-sm">Years of experience</p>
            </div>

            <div>
              <p className="text-primary text-3xl font-bold">74</p>
              <p className="opacity-70 text-sm">Clients served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ribbons */}
      <RibbonLoop type="dark" />
      <RibbonLoop type="orange" />
    </>
  );
}
