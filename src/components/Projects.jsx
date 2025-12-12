import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiSearch } from "react-icons/fi";

// PORTFOLIO IMAGES
import AnnaImg from "../assets/raven.png";
import GuvenImg from "../assets/drpm.png";
import ChosenImg from "../assets/chosen.png";
import NoahImg from "../assets/chosen2.png";
import ChukwuImg from "../assets/raven.png";
import PatrickImg from "../assets/drpm.png";

const categories = ["All", "Code", "No Code", "Dark", "Light", "Minimalist", "Fancy"];

const items = [
  { name: "Anna Filou", img: AnnaImg, link: "https://corvusaurum.com/", category: "Code", type: "NGO", description: "Professional website project." },
  { name: "Güven Sözmen", img: GuvenImg, link: "https://divineroyalpriesthood.org/", category: "Dark", type: "NFT", description: "Clean minimalist portfolio." },
  { name: "Chosen Akinnola", img: ChosenImg, link: "https://chosen-akinnola.vercel.app/", category: "Dark", type: "Portfolio", description: "Dark space-themed portfolio website." },
  { name: "Noah Buscher", img: NoahImg, link: "https://chosen-akinnola.vercel.app/", category: "Dark", type: "Portfolio", description: "High-performance coded website." },
  { name: "Chukwuemeke Ofuzor", img: ChukwuImg, link: "https://divineroyalpriesthood.org/", category: "Light", type: "Client", description: "Bold dark interface." },
  { name: "Patrick David", img: PatrickImg, link: "https://corvusaurum.com/", category: "Dark", type: "E-commerce", description: "Premium elegant design." },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-10 lg:py-40" id="projects">
      <h2 className="text-left text-3xl font-bold mb-8 text-foreground">Projects</h2>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      <div className="w-full flex flex-col sm:flex-row flex-wrap justify-between sm:items-center gap-4 mb-10">
        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap gap-4 text-base font-semibold justify-center sm:justify-start w-full sm:w-auto">
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(c)}
              className={`cursor-pointer transition ${selectedCategory === c ? "text-primary" : "hover:text-primary/70"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* SEARCH INPUT */}
        <div className="relative w-full sm:w-60 md:w-64">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full border border-border rounded-full py-2 px-4 pr-10 text-sm outline-none
              focus:border-primary/70 bg-card text-foreground placeholder:text-foreground/50
              dark:bg-card-dark dark:text-foreground-dark dark:placeholder:text-foreground-dark/50
            "
          />
          <FiSearch
            className="
              absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none
              text-foreground/70 dark:text-foreground-dark/70
            "
          />
        </div>
      </div>

      {/* PROJECT CARDS */}
      {filteredItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full py-20 text-center text-white/50 text-lg"
        >
          No results found.
        </motion.div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <motion.div
              key={index}
              className="card card-hover overflow-hidden transition group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              {/* IMAGE */}
              <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-y-auto overflow-x-hidden scrollbar-hide rounded-t-xl">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full object-cover min-h-full"
                />
              </div>

              {/* HOVER OVERLAY */}
              <div className="absolute top-0 left-0 w-full h-64 md:h-72 lg:h-80 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white text-left z-20 pointer-events-none rounded-t-xl">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span className="text-xs mt-1 px-2 py-1 rounded-full bg-primary/80 inline-block">{item.type}</span>
              </div>

              {/* EXTERNAL LINK */}
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="absolute top-3 right-3 z-30 rounded-full p-2 opacity-70 hover:opacity-100 transition bg-card"
              >
                <FiExternalLink className="text-primary w-5 h-5" />
              </a>

              {/* DETAILS */}
              <div className="px-3 pb-4 md:px-4 mt-2 text-foreground text-left">
                <p className="my-6">{item.description}</p>

                {/* ITEM TYPE BADGE with theme-aware colors */}
                <span
                  className="
                    px-3 py-1 mr-2 rounded-full text-xs font-semibold
                    bg-card text-foreground
                    dark:bg-card-dark dark:text-foreground-dark
                    transition-colors duration-300
                  "
                >
                  {item.type}
                </span>

                {/* CATEGORY BADGE */}
                <span className="px-3 py-1 rounded-full bg-primary text-xs text-primary-foreground font-semibold">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
