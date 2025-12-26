import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { Maximize2 } from "lucide-react";

// PORTFOLIO IMAGES
import CorvusImg from "../assets/raven.png";
import DRPMImg from "../assets/drpm.png";
import ChosenImg from "../assets/Dark.png";
import ZumaImg from "../assets/zuma.png";
import VFImg from "../assets/victorias-foundacion.png";
import VCImg from "../assets/victoriascloud.png";

const categories = ["All", "Code", "CMS", "Dark", "Light", "Web Hosting"];

const items = [
  {
    name: "Corvus Aurum",
    img: CorvusImg,
    link: "https://corvusaurum.com/",
    category: ["CMS", "Dark"],
    type: "NFT",
    description:
      "A gold-backed NFT platform with OpenSea listings and MetaMask integration, developed as a subsidiary of a premium ring business.",
  },
  {
    name: "Divine Royal Priesthood Ministry",
    img: DRPMImg,
    link: "https://divineroyalpriesthood.org/",
    category: ["CMS", "Light"],
    type: "NGO",
    description:
      "A Christian NGO restoring hope through skills training, food aid, and financial support for the elderly and widowed.",
  },
  {
    name: "Chosen Akinnola",
    img: ChosenImg,
    link: "https://chosen-akinnola.vercel.app/",
    category: ["Dark", "Light", "Code"],
    type: "Portfolio",
    description:
      "A modern space-themed website built with React, Tailwind CSS, and supporting libraries including Framer Motion and Lucide.",
  },
  {
    name: "Zuma Host",
    img: ZumaImg,
    category: ["Light", "Code", "Web Hosting"],
    type: "Web Hosting",
    description:
      "A web hosting business built with React, automating billing, accounts, emails, webhooks, and handling support tickets.",
  },
  {
    name: "Victoria's Foundation",
    img: VFImg,
    category: ["Light", "CMS"],
    type: "NGO",
    description:
      "A Netherlands-based NGO enhancing living conditions by providing skill training to empower and uplift communities.",
  },
  {
    name: "Victoria's Cloud",
    img: VCImg,
    category: ["Light", "CMS", "Web Hosting"],
    type: "Web Hosting",
    description:
      "Fast, scalable web hosting in the Netherlands, generating profits to support Victoria’s Foundation’s community programs.",
  },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeImage, setActiveImage] = useState(null);

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category.includes(selectedCategory);

    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section
      className="w-full px-4 md:px-10 lg:px-20 py-10 lg:py-40 font-body"
      id="projects"
    >
      <h2 className="text-left text-3xl font-bold mb-8 text-foreground font-heading">
        Projects
      </h2>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      {/* FILTERS */}
      <div className="w-full flex flex-col sm:flex-row flex-wrap justify-between sm:items-center gap-4 mb-10">
        <div className="flex flex-wrap gap-4 text-base font-semibold justify-center sm:justify-start w-full sm:w-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`cursor-pointer transition ${
                selectedCategory === c
                  ? "text-primary"
                  : "hover:text-primary/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

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
        </div>
      </div>

      {/* CARDS */}
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
          {filteredItems.map((item, index) => {
            const showLightboxIcon = index >= filteredItems.length - 3;

            return (
              <motion.div
                key={index}
                className="card card-hover overflow-hidden transition group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                viewport={{ once: true }}
              >
                {/* IMAGE */}
                <div
                  className={`relative w-full h-64 md:h-72 lg:h-80 overflow-y-auto overflow-x-hidden scrollbar-hide rounded-t-xl ${
                    !item.link ? "cursor-pointer" : ""
                  }`}
                  onClick={() => !item.link && setActiveImage(item)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full object-cover min-h-full"
                  />
                </div>

                {/* HOVER OVERLAY */}
                <div className="absolute top-0 left-0 w-full h-64 md:h-72 lg:h-80 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white text-left z-20 pointer-events-none rounded-t-xl">
                  <h3 className="text-lg font-semibold font-heading">
                    {item.name}
                  </h3>
                  <span className="text-xs mt-1 px-2 py-1 rounded-full bg-primary/80 inline-block">
                    {item.type}
                  </span>

                  {/* LIGHTBOX ICON */}
                  {showLightboxIcon && (
                    <Maximize2 className="absolute inset-0 m-auto w-10 h-10 text-white opacity-80 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
                  )}
                </div>

                {/* EXTERNAL LINK */}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-3 right-3 z-30 rounded-full p-2 opacity-70 hover:opacity-100 transition bg-card"
                  >
                    <FiExternalLink className="text-primary w-5 h-5" />
                  </a>
                )}

                {/* DETAILS */}
                <div className="px-3 pb-4 md:px-4 mt-2 text-foreground text-left font-body">
                  <p className="my-6">{item.description}</p>

                  <span className="type-badge mr-2">
  {item.type}
</span>


                  <span className="px-3 py-1 rounded-full bg-primary text-xs text-primary-foreground font-semibold">
                    {item.category[0]}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* IMAGE POPUP */}
      {activeImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActiveImage(null)}
        >
          <motion.div
            className="relative max-w-5xl w-full max-h-[90vh] bg-card dark:bg-card-dark rounded-xl overflow-hidden"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-border text-left">
              <h3 className="font-heading text-lg text-foreground">
                {activeImage.name}
              </h3>
              <button
                onClick={() => setActiveImage(null)}
                className="text-foreground/70 hover:text-primary text-xl"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto max-h-[80vh] scrollbar-hide">
              <img
                src={activeImage.img}
                alt={activeImage.name}
                className="w-full object-contain"
              />
            </div>

            <div className="px-4 py-4 text-left text-foreground">
              <p>{activeImage.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
