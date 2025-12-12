import React from "react";
import { Wrench, Globe } from "lucide-react";
import Anglebracket from "../assets/angle-brackets.svg";
import Curly from "../assets/curly.svg";
import serviceImg from "../assets/Chosen.jpg";

// Shared icon styling → same size, centered alignment
const iconWrapper =
  "w-12 h-12 flex items-center justify-center text-foreground text-3xl mx-auto";

const ServicesSection = () => {
  return (
    <section className="w-full mt-3.5 py-16 relative"
    id="services">
      <div className="container px-4 md:px-8 lg:px-0">

        {/* ---- HEADER ---- */}
        <div className="hidden md:flex justify-between items-center mb-12 animate-fade-in">
          {/* ---- LEFT: Title ---- */}
          <div>
            <p className="text-sm opacity-70 mb-1 tracking-wide">My services</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Services <span className="text-primary">I Provide</span>
            </h2>
          </div>

          {/* ---- RIGHT: Button + Text ---- */}
          <div className="flex items-center space-x-4">
            <button className="cosmic-button animate-fade-in-delay-2">
              Hire me
            </button>
            <span className="text-sm opacity-70">------------- Let's connect</span>
          </div>
        </div>

        {/* ---- HEADER CENTERED FOR MOBILE ---- */}
        <div className="flex flex-col items-center text-center mb-8 md:hidden animate-fade-in">
          <p className="text-sm opacity-70 mb-1 tracking-wide">My services</p>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Services <span className="text-primary">I Provide</span>
          </h2>
        </div>

        {/* ---- MAIN GRID ---- */}
        <div className="grid lg:grid-cols-2 lg:pt-16 gap-10 items-center">

          {/* ---- LEFT: SERVICE CARDS (TEXT) ---- */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* WEB DEVELOPMENT */}
            <div className="card card-hover animate-fade-in-delay-1 text-center sm:text-left lg:mb-15">
              <div className={iconWrapper}>{`</>`}</div>
              <h3 className="font-semibold text-lg mt-3 mb-2">Web Development</h3>
              <p className="text-sm opacity-75">
                Building fast, responsive, and scalable websites using modern tech and best practices.
              </p>
            </div>

            {/* FRONT-END DEVELOPMENT */}
            <div className="card card-hover animate-fade-in-delay-2 text-center sm:text-left lg:mt-15">
              <div className={iconWrapper}>{`{...}`}</div>
              <h3 className="font-semibold text-lg mt-3 mb-2">Front-End Development</h3>
              <p className="text-sm opacity-75">
                Transforming UI designs into interactive, high-performance web experiences.
              </p>
            </div>

            {/* WEBSITE MAINTENANCE */}
            <div className="card card-hover animate-fade-in-delay-3 text-center sm:text-left lg:mb-15">
              <div className={iconWrapper}>
                <Wrench className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg mt-3 mb-2">Website Maintenance</h3>
              <p className="text-sm opacity-75">
                Keeping your website secure, updated, and running smoothly.
              </p>
            </div>

            {/* DNS MANAGEMENT */}
            <div className="card card-hover animate-fade-in-delay-4 text-center sm:text-left lg:mt-15">
              <div className={iconWrapper}>
                <Globe className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg mt-3 mb-2">DNS Management</h3>
              <p className="text-sm opacity-75">
                Managing DNS records, domain routing, and secure connectivity.
              </p>
            </div>
          </div>

          {/* ---- RIGHT: IMAGE ---- */}
          <div className="relative flex justify-center mt-10 lg:mt-0">
            <div className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-primary/20 rounded-full -z-10 top-6"></div>

            <img
              src={serviceImg}
              alt="Service provider"
              className="w-52 rounded-xl sm:w-60 md:w-72 lg:w-80 object-cover animate-fade-in-delay-1"
            />

            {/* Dotted pattern */}
          <div className="absolute md:-right-13 -right-8 -top-40 grid grid-cols-4 gap-2 opacity-40">
            {Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"
              />
            ))}
          </div>

           <span
              className="absolute bottom-3 -left-4 sm:bottom-4 sm:left-4 md:-bottom-10 md:-left-8 lg:bottom-6 lg:left-8 font-bold">
               <img
                src={Anglebracket}
                alt="curly braces"
                className=" w-12 h-12 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 object-contain rotate-20 animate-float"
               />
            </span>

            <span
              className="absolute right-2 sm:right-8 top-8 text-primary text-2xl sm:text-3xl">
               <img
                src={Curly}
                alt="curly braces"
                className=" w-12 h-12 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 object-contain rotate-20 animate-float"
               />
            </span>
            
          </div>

        </div>

        {/* ---- BUTTON BELOW CARDS FOR MOBILE ---- */}
        <div className="flex flex-col items-center mt-10 md:hidden space-y-3 animate-fade-in">
          <button className="cosmic-button w-48">
            Hire me
          </button>
          <span className="text-sm opacity-70">------------- Let's connect</span>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
