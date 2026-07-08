"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface OverlayProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

export default function Overlay({ heroRef }: OverlayProps) {
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Keyframes are padded to span the full 0–1 range: framer-motion may promote
  // these to native ViewTimeline animations, where any unkeyframed range
  // interpolates back to the element's base opacity instead of holding.

  // PHASE 1 — Ghost watermark (0.00–0.28)
  const ghostOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.18, 0.28, 1],
    [1, 1, 1, 0, 0]
  );
  // The flanking letters drift apart as they fade out
  const ghostLeftX = useTransform(
    scrollYProgress,
    [0, 0.28, 1],
    [0, -80, -80]
  );
  const ghostRightX = useTransform(scrollYProgress, [0, 0.28, 1], [0, 80, 80]);

  // PHASE 2 — Name intro block (0.28–0.52)
  const nameOpacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.38, 0.44, 0.52, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const nameY = useTransform(
    scrollYProgress,
    [0, 0.28, 0.52, 1],
    [60, 60, -60, -60]
  );

  // PHASE 3 — Role statement (0.52–0.78)
  const roleOpacity = useTransform(
    scrollYProgress,
    [0, 0.52, 0.62, 0.7, 0.78, 1],
    [0, 0, 1, 1, 0, 0]
  );
  // Glides in from the left as the photo settles into its right-side profile
  const roleX = useTransform(
    scrollYProgress,
    [0, 0.52, 0.64, 1],
    [-80, -80, 0, 0]
  );

  // PHASE 4 — Main headline (0.78–1.00)
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.78, 0.88, 0.96, 1.0],
    [0, 0, 1, 1, 0]
  );
  const headlineX = useTransform(
    scrollYProgress,
    [0, 0.78, 0.9, 1],
    [-80, -80, 0, 0]
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {/* PHASE 1 — U and K flank the centred portrait, drifting apart on scroll */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          opacity: ghostOpacity,
          willChange: "opacity",
        }}
      >
        <h1 className="sr-only">UK</h1>
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            left: "clamp(1rem, 7vw, 8rem)",
            top: "50%",
            x: ghostLeftX,
            y: "-50%",
            fontSize: "clamp(5rem, 16vw, 15rem)",
            fontWeight: 800,
            lineHeight: 1,
            // Hollow, outlined letterforms
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.45)",
            willChange: "transform",
          }}
        >
          U
        </motion.span>
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            right: "clamp(1rem, 7vw, 8rem)",
            top: "50%",
            x: ghostRightX,
            y: "-50%",
            fontSize: "clamp(5rem, 16vw, 15rem)",
            fontWeight: 800,
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.45)",
            willChange: "transform",
          }}
        >
          K<span style={{ WebkitTextStroke: "0px", color: "#acec00" }}>.</span>
        </motion.span>

        {/* Scroll cue: the hero is scroll-driven, so invite the first scroll */}
        <motion.div
          className="absolute bottom-[5vh] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.35em] text-white/60 md:text-sm">
            Always Up
          </p>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-[#acec00]"
            aria-hidden
          >
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </motion.div>
      </motion.div>

      {/* PHASE 2 — Name intro block (bottom-anchored so the face stays clear) */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "1rem",
          padding: "0 1.5rem 9vh",
          opacity: nameOpacity,
          y: nameY,
          willChange: "opacity, transform",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          Udaya Kumar
          <span
            style={{
              display: "block",
              fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginTop: "0.5rem",
              color: "rgba(255, 255, 255, 0.85)",
            }}
          >
            Sivagurunathan.
          </span>
        </h2>
        <p className="text-sm font-medium tracking-widest text-white/60 md:text-base">
          An Author · 13 Years in UX · Lead UX Designer
        </p>
      </motion.div>

      {/* PHASE 3 — Role statement (left side: the photo faces left from the right) */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 1.5rem 0 clamp(1.5rem, 7vw, 7rem)",
          opacity: roleOpacity,
          x: roleX,
          willChange: "opacity, transform",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2.5rem, 6vw, 6rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            textAlign: "left",
            whiteSpace: "pre-line",
          }}
        >
          {"Author &\nUX AI Educator."}
        </h2>
      </motion.div>

      {/* PHASE 4 — Main headline (left side: the photo faces left from the right) */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "1.25rem",
          padding: "0 1.5rem 0 clamp(1.5rem, 7vw, 7rem)",
          opacity: headlineOpacity,
          x: headlineX,
          willChange: "opacity, transform",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            textAlign: "left",
            whiteSpace: "pre-line",
          }}
        >
          {"Building Experience\nThat Lasts Forever."}
        </h2>
        <p className="text-sm font-medium tracking-widest text-white/60 md:text-base">
          Making India the design differentiator for the world
        </p>
      </motion.div>
    </div>
  );
}
