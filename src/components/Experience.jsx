import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    role: "Web Developer",
    company: "Zuma Host",
    period: "2025 — Present",
    description:
      "I am the Senior Web Developer at Zuma Host, a web hosting company providing web hosting and professional web development services. Collaborating with other designers to implement clean UI/UX designs.",
    tech: ["React", "TailwindCSS", "JavaScript", "Framer Motion"],
  },
  {
    role: "Web and System Support",
    company: "Freelance",
    period: "Sep 2025 — Oct 2025",
    description:
      "I developed a user-friendly reseller hosting website, customized theme files for specific design needs, and integrated Clientexec with API keys and webhooks to automate client management and billing processes.",
    tech: ["WordPress", "Clientexec", "APIs", "Webhooks"],
  },
  {
    role: "Junior Web Developer",
    company: "Bite Agency, Lagos.",
    period: "2022 — 2024",
    description:
      "Assisted in building and maintaining websites, fixing bugs, and implementing new features while learning modern development workflows.",
    tech: ["WordPress", "Woo-Commerce", "Elementor"],
  },
  {
    role: "Intern Web Developer",
    company: "Just Novate Technologies, Lagos.",
    period: "2020 — 2022",
    description:
      "I began my web development journey using WordPress on localhost with XAMPP, then progressed to building live projects, including personal, legal, and eCommerce websites, gaining hands-on experience with real-world development workflows.",
    tech: ["WordPress", "XAMPP", "CSS",],
  },
];

// Animation variants
const cardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    y: 30,
    x: direction === "left" ? -40 : 40,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// GitHub Logo SVG Component
const GitHubLogo = () => (
  <svg height="24" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" fill="currentColor" className="text-[#c9d1d9]">
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
  </svg>
);

// External Link Icon
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

// Tooltip Component - Responsive z-index for mobile/tablet
const Tooltip = ({ day, isVisible }) => {
  if (!day || !isVisible) return null;
  
  const date = new Date(day.date);
  const formattedDate = date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
  
  const contributionText = day.count === 1 ? 'contribution' : 'contributions';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      // Higher z-index on mobile/tablet (z-[99999]) vs desktop (z-[9999])
      className="absolute z-[99999] lg:z-[9999] px-3 py-2 text-xs bg-[#6e7681] text-white rounded-md whitespace-nowrap pointer-events-none shadow-lg"
      style={{ 
        bottom: 'calc(100% + 8px)',
        left: '0',
        transform: 'translateX(0)',
      }}
    >
      <div className="font-semibold">{day.count} {contributionText} on {formattedDate}</div>
      {/* Arrow - positioned at bottom center */}
      <div className="absolute top-full left-2 transform -translate-x-0 border-4 border-transparent border-t-[#6e7681]"></div>
    </motion.div>
  );
};

// GitHub Contribution Graph Component
const GitHubContributionGraph = ({ username = "Choisis21", token }) => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalContributions, setTotalContributions] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState([]);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [clickedDay, setClickedDay] = useState(null);

  // Generate last 7 years dynamically
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 7; i++) {
      years.push(currentYear - i);
    }
    setAvailableYears(years);
    setSelectedYear(currentYear);
  }, []);

  useEffect(() => {
    const fetchContributions = async () => {
      if (!token) {
        setError("GitHub token required");
        setLoading(false);
        return;
      }

      const fromDate = `${selectedYear}-01-01T00:00:00Z`;
      const toDate = `${selectedYear}-12-31T23:59:59Z`;

      const query = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    weekday
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            variables: { 
              username,
              from: fromDate,
              to: toDate
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        const calendar = data.data.user.contributionsCollection.contributionCalendar;
        setTotalContributions(calendar.totalContributions);
        
        const weeks = calendar.weeks || [];
        const grid = weeks.map((week) => 
          week.contributionDays.map((day) => ({
            count: day.contributionCount,
            date: day.date,
            weekday: day.weekday,
          }))
        );
        
        setContributions(grid);
        setLoading(false);
      } catch (err) {
        console.error("GitHub API Error:", err);
        setError(err.message || "Failed to load contributions");
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username, token, selectedYear]);

  // Orange color scheme
  const getColorClass = (count) => {
    if (count === 0) return "bg-[#161b22]";
    if (count < 5) return "bg-[#9e4c03]";
    if (count < 10) return "bg-[#d87600]";
    if (count < 20) return "bg-[#fb8500]";
    return "bg-[#ffa657]";
  };

  // Generate month labels
  const generateMonthLabels = () => {
    if (contributions.length === 0) return [];
    
    const months = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let lastMonth = -1;
    
    contributions.forEach((week, weekIndex) => {
      if (week.length > 0) {
        const date = new Date(week[0].date);
        const month = date.getMonth();
        
        if (month !== lastMonth) {
          months.push({ name: monthNames[month], index: weekIndex });
          lastMonth = month;
        }
      }
    });
    
    return months;
  };

  const monthLabels = generateMonthLabels();

  const handleDayClick = (day) => {
    setClickedDay(clickedDay?.date === day.date ? null : day);
  };

  const handleDayHover = (day) => {
    setHoveredDay(day);
    setClickedDay(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32 text-[#8b949e]">
        <div className="animate-pulse">Loading contributions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-sm text-[#8b949e] py-8">
        <p className="text-red-400 mb-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row lg:items-start justify-center gap-8">
      {/* Main Graph Container - centered */}
      <div className="bg-[#0d1117] rounded-lg border border-[#30363d] overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <GitHubLogo />
            <span className="text-[#c9d1d9] font-semibold text-sm">{username}</span>
          </div>
          <a 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[#8b949e] hover:text-[#c9d1d9] text-sm transition-colors"
          >
            View on GitHub
            <ExternalLinkIcon />
          </a>
        </div>

        {/* Calendar Content - Increased padding top on mobile/tablet */}
        <div className="p-4 pt-8 lg:pt-4">
          {/* Contributions Count + Legend */}
<div className="mb-4 ml-[30px] text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
  {/* Left: Contribution Count */}
  <div>
    <span className="text-[#c9d1d9] font-semibold">{totalContributions}</span>
    <span className="text-[#8b949e]"> contributions in {selectedYear}</span>
  </div>

  {/* Right: Legend */}
  <div className="hidden lg:flex items-center gap-2 text-xs text-[#8b949e]">
    <span>Less</span>
      <div className="flex gap-[2px]">
       <div className="w-[10px] h-[10px] rounded-[2px] bg-[#161b22]"></div>
       <div className="w-[10px] h-[10px] rounded-[2px] bg-[#9e4c03]"></div>
       <div className="w-[10px] h-[10px] rounded-[2px] bg-[#d87600]"></div>
       <div className="w-[10px] h-[10px] rounded-[2px] bg-[#fb8500]"></div>
       <div className="w-[10px] h-[10px] rounded-[2px] bg-[#ffa657]"></div>
      </div>
    <span>More</span>
   </div>
  </div>

          {/* Graph Container - no scrollbar on desktop, increased padding top on mobile */}
          <div className="overflow-x-auto lg:overflow-visible pb-2 pt-4 lg:pt-0 scrollbar-thin scrollbar-thumb-[#30363d] scrollbar-track-transparent">
            <div className="min-w-max lg:min-w-0">
              {/* Month Labels */}
              <div className="flex text-xs text-[#8b949e] mb-1 ml-[30px]">
                {monthLabels.map((month, idx) => (
                  <div 
                    key={idx} 
                    className="w-[10px] text-center"
                    style={{ 
                      marginLeft: idx === 0 ? 0 : `${(month.index - monthLabels[idx-1].index) * 13 - 10}px`
                    }}
                  >
                    {month.name}
                  </div>
                ))}
              </div>

              {/* Grid with Day Labels */}
              <div className="flex">
                {/* Day Labels */}
                <div className="flex flex-col justify-between mr-2 text-xs text-[#8b949e] h-[91px]">
                  <span className="h-[12px] leading-[12px]">Mon</span>
                  <span className="h-[12px] leading-[12px]">Wed</span>
                  <span className="h-[12px] leading-[12px]">Fri</span>
                </div>

                {/* Contribution Grid */}
                <div className="flex gap-[3px]">
                  {contributions.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                      {week.map((day, dayIndex) => {
                        const isActive = hoveredDay?.date === day.date || clickedDay?.date === day.date;
                        return (
                          <div
                            key={dayIndex}
                            className="relative"
                            onMouseEnter={() => handleDayHover(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            onClick={() => handleDayClick(day)}
                          >
                            <AnimatePresence>
                              {isActive && (
                                <Tooltip day={day} isVisible={true} />
                              )}
                            </AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ 
                                duration: 0.2, 
                                delay: (weekIndex * 7 + dayIndex) * 0.002 
                              }}
                              className={`w-[10px] h-[10px] rounded-[2px] ${getColorClass(day.count)} hover:ring-1 hover:ring-[#8b949e] cursor-pointer transition-all`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex lg:hidden items-center gap-2 mt-3 ml-[30px] text-xs text-[#8b949e]">
            <span>Less</span>
            <div className="flex gap-[2px]">
              <div className="w-[10px] h-[10px] rounded-[2px] bg-[#161b22]"></div>
              <div className="w-[10px] h-[10px] rounded-[2px] bg-[#9e4c03]"></div>
              <div className="w-[10px] h-[10px] rounded-[2px] bg-[#d87600]"></div>
              <div className="w-[10px] h-[10px] rounded-[2px] bg-[#fb8500]"></div>
              <div className="w-[10px] h-[10px] rounded-[2px] bg-[#ffa657]"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Year Selector - Outside container on desktop, bottom on mobile */}
      <div className="lg:w-auto">
        {/* Mobile/Tablet: Horizontal scroll at bottom with extra padding */}
        <div className="lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-[#30363d] scrollbar-track-transparent">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap ${
                  selectedYear === year
                    ? "bg-[#1f6feb] text-white"
                    : "text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: Vertical stack outside container */}
        <div className="hidden lg:flex flex-col gap-2">
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap ${
                selectedYear === year
                  ? "bg-[#1f6feb] text-white"
                  : "text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  return (
    <section 
    id="experience"
    className="relative py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="max-w-xl mx-auto text-foreground/80">
            A timeline of my professional journey, highlighting the roles and
            experiences that shaped my skills.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-px bg-border md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-6 ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-4 md:left-1/2 top-6 h-3 w-3 rounded-full bg-primary md:-translate-x-1/2"
                  />

                  <div className="hidden md:block md:w-1/2" />

                  <div className="md:w-1/2">
                    <motion.div
                      custom={isEven ? "right" : "left"}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-80px" }}
                      className="card card-hover p-6 text-left"
                    >
                      <span className="font-heading text-sm text-primary px-3 lg:px-0 font-medium">
                        {exp.period}
                      </span>

                      <h3 className="font-heading mt-2 text-xl px-3 lg:px-0 font-semibold">
                        {exp.role}
                      </h3>

                      <p className="px-3 lg:px-0 text-sm text-foreground/70 mb-4">
                        {exp.company}
                      </p>

                      <p className="px-3 lg:px-0 text-sm text-foreground/80 mb-4">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap px-3 lg:px-0 gap-2">
                        {exp.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* GitHub Contributions Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24 max-w-5xl mx-auto"
        >
          {/* Centered Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Open Source <span className="text-primary">Contributions</span>
            </h3>
            <p className="text-foreground/70 text-sm">
              My real-time GitHub activity
            </p>
          </div>

          <GitHubContributionGraph 
            username="Choisis21" 
            token={GITHUB_TOKEN}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;