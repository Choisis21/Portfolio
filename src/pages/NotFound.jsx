import React from "react";
import { Navbar } from "../components/Navbar"
import { StarBackground } from "../components/StarBackground";

/**
 * Space-themed 404 page
 * Uses your Tailwind + custom CSS utilities
 */
const NotFound = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground flex items-center justify-center">

      <StarBackground />

      {/* 🚀 Main Content */}
      <div className="relative z-10 container px-6 text-center">

        {/* Floating planet */}
        <div
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full
                     bg-primary text-primary-foreground shadow-lg"
          style={{ animation: "var(--animate-float)" }}
        >
          <span className="text-4xl sm:text-5xl">🪐</span>
        </div>

        {/* 404 Title */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-glow"
          style={{ opacity: 0, animation: "var(--animate-fade-in)" }}
        >
          404
        </h1>

        {/* Subtitle */}
        <p
          className="mt-4 text-lg sm:text-xl"
          style={{ opacity: 0, animation: "var(--animate-fade-in-delay-1)" }}
        >
          Lost in the cosmos
        </p>

        {/* Description */}
        <p
          className="mt-2 text-sm sm:text-base text-muted-foreground"
          style={{ opacity: 0, animation: "var(--animate-fade-in-delay-2)" }}
        >
          The page you’re looking for has drifted beyond the galaxy.
        </p>

        {/* Action Button */}
        <div
          className="mt-8"
          style={{ opacity: 0, animation: "var(--animate-fade-in-delay-3)" }}
        >
          <a href="/" className="cosmic-button inline-block">
            Return Home 🚀
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
