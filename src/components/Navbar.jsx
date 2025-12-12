import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About me", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
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

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative py-2 text-gray-200 hover:text-white transition"
                >
                  {item.name}
                  {item.name === "Home" && (
                    <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-orange-500 rounded-full" />
                  )}
                </a>
              ))}
            </div>

            {/* DESKTOP ACTIONS */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#contact"
                className="px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition"
              >
                Hire me
              </a>

              <ThemeToggle insideNavbar />
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
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
          href="#contact"
          onClick={() => setIsMenuOpen(false)}
          className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition"
        >
          Hire me
        </a>

        {/* MOBILE THEME TOGGLE */}
        <ThemeToggle insideNavbar onClick={() => setIsMenuOpen(false)} />
      </div>
    </>
  );
};
