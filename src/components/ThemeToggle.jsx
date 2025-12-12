import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ insideNavbar = false, onClick }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setIsDark(saved !== "light"); // true if dark or first load
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);

    if (onClick) onClick(); // optional callback, e.g., close mobile menu
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full border border-neutral-300 dark:border-neutral-500 transition-all duration-200 hover:scale-105 hover:border-neutral-400 dark:hover:border-neutral-500",
        insideNavbar
          ? "bg-transparent text-black dark:text-white hover:bg-neutral-200/30 dark:hover:bg-white/10"
          : "fixed top-5 right-5 z-50 bg-neutral-100 dark:bg-neutral-800"
      )}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-300" />
      ) : (
        <Moon className="h-5 w-5 text-blue-300" />
      )}
    </button>
  );
};
