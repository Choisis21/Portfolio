import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About me", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "w-full fixed top-3 z-50 transition-all duration-300",
          scrolled
            ? "bg-neutral-900/70 backdrop-blur-xl top-0 border-b border-white/10 shadow-md"
            : "bg-transparent"
        )}
      >
        <div className="container flex justify-center">
          <div
            className={cn(
              "w-full max-w-6xl flex items-center justify-between px-6 py-3 transition-all duration-300",
              scrolled
                ? "rounded-none bg-transparent px-0"
                : "rounded-full bg-neutral-800"
            )}
          >
            <a href="#hero" className="flex items-center gap-2 text-xl font-bold">
              <span className="text-orange-500 font-extrabold">{`{Dev}`}</span>
              <span className="text-white">Chosen</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActive(item.name)}
                  className={cn(
                    "relative py-2 text-gray-300 hover:text-white transition",
                    active === item.name && "text-white"
                  )}
                >
                  {item.name}

                  {active === item.name && (
                    <span className="shooting-track">
                      <span className="shooting-star-head" />
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#projects"
                className="px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition"
              >
                View Projects
              </a>
              <ThemeToggle insideNavbar />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center space-y-8 text-xl lg:hidden transition-all",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => {
              setActive(item.name);
              setIsMenuOpen(false);
            }}
            className="text-white hover:text-orange-400 transition"
          >
            {item.name}
          </a>
        ))}

        <a
          href="#projects"
          onClick={() => setIsMenuOpen(false)}
          className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition"
        >
          View Projects
        </a>

        <ThemeToggle insideNavbar onClick={() => setIsMenuOpen(false)} />
      </div>

      {/* Shooting Star Animation */}
      <style>
        {`
          .shooting-track {
            position: absolute;
            left: 0;
            bottom: -8px;
            width: 100%;
            height: 4px;
            background: linear-gradient(
              to right,
              transparent,
              #fde68a,
              #fb923c
            );
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
            0% {
              left: 0;
              opacity: 0;
              transform: scale(0.6);
            }
            30% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              left: 85%; /* stop before going out of bounds */
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </>
  );
};
