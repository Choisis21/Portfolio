import { useState, useEffect, useRef } from "react";
import { TextAlignEnd, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "About me", href: "#about", id: "about" },
  { name: "Services", href: "#services", id: "services" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);

  // Track scroll (disabled while menu is open)
  useEffect(() => {
    if (isMenuOpen) return;

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  // Active section tracking
  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;

      const midpoint = window.scrollY + window.innerHeight / 2;

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (!section) continue;

        const { offsetTop, offsetHeight } = section;
        if (midpoint >= offsetTop && midpoint < offsetTop + offsetHeight) {
          setActive(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  const handleNavClick = (item) => {
    const section = document.getElementById(item.id);

    if (section) {
      isProgrammaticScroll.current = true;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(item.id);

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 700);
    }

    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "w-full fixed z-50 transition-all duration-300 ease-out",
          isMenuOpen
            ? "translate-y-0 bg-transparent"
            : scrolled
            ? "bg-neutral-900/70 backdrop-blur-xl border-b border-white/10 shadow-md translate-y-0"
            : "bg-transparent translate-y-3"
        )}
      >
        <div className="container flex justify-center">
          <div
            className={cn(
              "w-full max-w-6xl flex items-center justify-between px-6 py-3 transition-all duration-300",
              !isMenuOpen && scrolled
                ? "rounded-none bg-transparent px-0"
                : "rounded-full bg-neutral-800"
            )}
          >
            {/* Logo */}
            <a href="#hero" className="text-xl font-bold">
              <span className="text-orange-500 font-extrabold">
                {`{ Chosen }`}
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex gap-8 text-sm font-medium">
              {navItems.map((item) => {
                const isActive = active === item.id;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item);
                    }}
                    className={cn(
                      "relative py-2 text-gray-300 hover:text-white transition",
                      isActive && "text-white"
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <span className="shooting-track">
                        <span className="shooting-star-head" />
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#projects"
                className="px-5 py-2 rounded-full bg-white text-black font-medium"
              >
                View Projects
              </a>
              <ThemeToggle insideNavbar />
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMenuOpen ? <X size={26} /> : <TextAlignEnd size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 top-0 h-screen overflow-hidden z-40 bg-black/80 backdrop-blur-md flex flex-col items-center pt-8 space-y-6 text-xl lg:hidden transition-all duration-300",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end mr-6 text-white p-2"
          >
            <X size={26} />
          </button>

          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item);
              }}
              className={cn(
                "text-white hover:text-orange-400 transition",
                active === item.id && "text-orange-400"
              )}
            >
              {item.name}
            </a>
          ))}

          <a
            href="#projects"
            onClick={() => setIsMenuOpen(false)}
            className="px-8 py-3 rounded-full bg-white text-black font-medium"
          >
            View Projects
          </a>

          <ThemeToggle insideNavbar onClick={() => setIsMenuOpen(false)} />
        </div>
      </nav>

      {/* Shooting Star Styles */}
      <style>
        {`
          .shooting-track {
            position: absolute;
            left: 0;
            bottom: -8px;
            width: 100%;
            height: 4px;
            background: linear-gradient(to right, transparent, #fde68a, #fb923c);
            border-radius: 999px;
            overflow: hidden;
          }

          .shooting-star-head {
            position: absolute;
            top: -6px;
            left: 0;
            width: 16px;
            height: 16px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 16px 6px rgba(255, 255, 255, 0.95);
            animation: shootAcross 0.6s ease-out forwards;
          }

          @keyframes shootAcross {
            0% { left: 0; opacity: 0; transform: scale(0.6); }
            30% { opacity: 1; transform: scale(1); }
            100% { left: 85%; opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </>
  );
};
