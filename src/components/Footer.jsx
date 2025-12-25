import React from "react";

/**
 * Small responsive footer
 * - Automatically adapts to light & dark mode
 * - Minimal, clean, and space-themed
 * - Mobile-first and accessible
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* =========================
          SUBTLE COSMIC BACKGROUND
      ========================== */}
      <div className="absolute inset-0 -z-10">
        {/* Soft stars */}
        <span className="star w-1 h-1 top-[40%] left-[20%] animate-pulse-subtle" />
        <span className="star w-1 h-1 top-[60%] left-[75%] animate-pulse-subtle" />
      </div>

      {/* =========================
          FOOTER CONTENT
      ========================== */}
      <div
        className="
          container
          px-4
          py-6 sm:py-8
          border-t border-border
          text-center
        "
      >
        {/* Brand / Copyright */}
        <p className="font-body text-xs sm:text-sm opacity-80">
          © {currentYear}{" "}
          <span className="font-medium text-glow">
            Chosen Akinnola
          </span>
          . All rights reserved.
        </p>

        {/* Optional tagline */}
        <p className="mt-1 text-[11px] sm:text-xs opacity-60">
          Built with ❤️ among the stars
        </p>
      </div>
    </footer>
  );
}
