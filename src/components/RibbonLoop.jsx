import React, { useEffect, useRef } from "react";

const ribbonItems = ["HTML5", "Wordpress", "CSS", "JavaScript", "Tailwind", "React", "SEO", "Next.js"];

export default function RibbonLoop({ type = "dark" }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let speed = 0.7; // Scroll speed
    let frame;

    const loop = () => {
      container.scrollLeft += speed;

      const half = container.scrollWidth / 2;

      // Seamless loop
      if (container.scrollLeft >= half) {
        container.scrollLeft = 0;
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      {/* Ribbon Structure */}
      <div className={`ribbon-wrapper ${type === "dark" ? "ribbon-dark" : "ribbon-orange"}`}>
        <div
          ref={scrollRef}
          className="ribbon-track-js flex items-center justify-center gap-10 overflow-hidden whitespace-nowrap select-none"
        >
          {[...ribbonItems, ...ribbonItems].map((item, i) => (
            <span key={i} className="font-semibold flex-shrink-0 text-center">
              {item} ★
            </span>
          ))}
        </div>
      </div>

      {/* Embedded CSS */}
      <style>{`
        /* ===============================
           Ribbon Wrapper
        =============================== */
        .ribbon-wrapper {
          width: 100%;
          overflow: hidden;
          padding: 16px 0;
          position: relative;
          transform-origin: center;
        }

        /* ===============================
           Ribbon Slants
        =============================== */
        .ribbon-dark {
          transform: skewY(-3deg);
          background: repeating-linear-gradient(
            -45deg,
            #2b2b2b 0px,
            #2b2b2b 14px,
            #1c1c1c 14px,
            #1c1c1c 28px
          );
          z-index: 3;
        }

        .ribbon-orange {
          transform: skewY(2.5deg);
          margin-top: -22px;
          background: repeating-linear-gradient(
            -45deg,
            #ff7a26 0px,
            #ff7a26 14px,
            #e8681f 14px,
            #e8681f 28px
          );
          z-index: 2;
        }

        /* ===============================
           JS Loop Track Styles
        =============================== */
        .ribbon-track-js span {
          color: #ffe7d3;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }

        /* Responsive Sizes */
        @media (max-width: 768px) {
          .ribbon-wrapper {
            padding: 12px 0;
          }
          .ribbon-track-js span {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .ribbon-track-js span {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </>
  );
}
