import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "About me", href: "#about", id: "about" },
  { name: "Services", href: "#services", id: "services" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  const containerRef = useRef(null);
  const indicatorRef = useRef(null);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      let current = "Home";
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.3) current = item.name;
      }

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shooting star movement
  useEffect(() => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    const activeLink = container.querySelector(`[data-nav="${active}"]`);
    if (!activeLink) return;

    const left = activeLink.offsetLeft;
    const width = activeLink.offsetWidth;

    // Instant “teleport” before animation
    indicator.style.transition = "none";
    indicator.style.left = left + "px";
    indicator.style.width = width + "px";

    // Trigger shooting star animation
    indicator.classList.remove("shoot");
    void indicator.offsetWidth; // Force reflow
    indicator.classList.add("shoot");

    // Smooth movement after teleport
    requestAnimationFrame(() => {
      indicator.style.transition = "left 0.35s ease, width 0.25s ease";
    });
  }, [active]);

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
        <div className="container flex justify-center transition-all duration-300">
          <div
            className={cn(
              `
                w-full max-w-6xl 
                flex items-center justify-between
                px-6 py-3
                transition-all duration-300
              `,
              scrolled
                ? "rounded-none bg-transparent border-none shadow-none px-0"
                : "rounded-full bg-neutral-800"
            )}
          >
            <a href="#hero" className="flex items-center gap-2 text-xl font-bold">
              <span className="text-orange-500 font-extrabold">{`{Dev}`}</span>
              <span className="text-white">Chosen</span>
            </a>

            {/* Desktop nav */}
            <div
              ref={containerRef}
              className="relative hidden md:flex items-center gap-8 text-sm font-medium"
            >
              {/* 🌠 SHOOTING STAR INDICATOR */}
              <div
                ref={indicatorRef}
                className="
                  absolute bottom-[-5px]
                  h-[3px]
                  bg-gradient-to-r 
                  from-transparent 
                  via-yellow-100 
                  to-orange-400
                  rounded-full
                  opacity-100
                  pointer-events-none
                  overflow-visible
                  shoot
                "
                style={{ left: 0, width: 0 }}
              >
                {/* Shooting star head */}
                <div
                  className="
                    absolute
                    top-[-3px]
                    right-[-6px]
                    w-[8px]
                    h-[8px]
                    bg-white
                    rounded-full
                    shadow-[0_0_8px_3px_rgba(255,255,255,0.8)]
                    star-head
                  "
                ></div>

                <style>
                  {`
                    /* Shooting star streak animation */
                    .shoot .star-head {
                      animation: shootTrail 0.35s ease forwards;
                    }

                    @keyframes shootTrail {
                      0% {
                        transform: translateX(-40px) scale(0.4);
                        opacity: 0;
                      }
                      40% {
                        opacity: 1;
                      }
                      100% {
                        transform: translateX(0) scale(1);
                        opacity: 1;
                      }
                    }
                  `}
                </style>
              </div>

              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  data-nav={item.name}
                  className={cn(
                    "relative py-2 transition text-gray-200 hover:text-white",
                    active === item.name ? "text-white" : ""
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#projects"
                className="px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition"
              >
                View Projects
              </a>
              <ThemeToggle insideNavbar />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center space-y-8 text-xl md:hidden transition-all",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
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
    </>
  );
};
