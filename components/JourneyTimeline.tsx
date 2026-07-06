"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const ITEMS: TimelineItem[] = [
  {
    year: "2014",
    title: "Interaction Designer at HCL",
    description: "Chennai. Where the journey began.",
  },
  {
    year: "2015",
    title: "Behance Award for Best UX Designer",
    description: "Held at Zoho, Chennai.",
  },
  {
    year: "2016",
    title: "Interaction Designer at Keastone Software Labs",
    description: "Bengaluru.",
  },
  {
    year: "2017",
    title: "Usability Expert at Siemens",
    description: "Bengaluru.",
  },
  {
    year: "2019",
    title: "Columnist at UX Mint",
    description: "Madrasters Core Member.",
  },
  {
    year: "2020",
    title: "Senior UX Designer at Verizon",
    description: "Chennai.",
  },
  {
    year: "2022",
    title: "Senior UX Designer at Siemens",
    description: "Bengaluru.",
  },
  {
    year: "2024",
    title: "Lead UX Designer at Siemens",
    description: "Bengaluru.",
  },
  {
    year: "2025",
    title: "Dravintel Academy for UX Thinking",
    description: "Teaching designers how to think, not just design.",
  },
  {
    year: "2026",
    title: "Author of Before the Screen",
    description: "22 Laws of UX Thinking.",
  },
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

function TimelineEntry({ item, index }: { item: TimelineItem; index: number }) {
  const entryRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  // Scrubbed by scroll: starts as the entry enters the viewport bottom,
  // lands as it reaches the upper-middle. Reverses when scrolling back.
  // The non-preset offset also keeps framer-motion on JS-driven tracking.
  const { scrollYProgress } = useScroll({
    target: entryRef,
    offset: ["start end", "start 0.45"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [isLeft ? -160 : 160, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [isLeft ? -4 : 4, 0]);
  const dotScale = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <div
      ref={entryRef}
      className={`relative flex md:w-1/2 ${
        isLeft
          ? "md:mr-auto md:justify-end md:pr-12 md:text-right"
          : "md:ml-auto md:justify-start md:pl-12"
      } pl-10 md:pl-12 ${isLeft ? "md:pl-0" : ""}`}
    >
      {/* Dot pops onto the line as the card lands */}
      <motion.span
        className={`absolute top-2 h-3 w-3 rounded-full bg-[#acec00] ${
          isLeft
            ? "left-[7px] md:left-auto md:right-[-6.5px]"
            : "left-[7px] md:left-[-6.5px]"
        }`}
        style={{ scale: dotScale, willChange: "transform" }}
      />
      <motion.div
        className="max-w-md"
        style={{ x, opacity, rotate, willChange: "opacity, transform" }}
      >
        <p className="text-sm font-semibold tracking-widest text-[#acec00]">
          {item.year}
        </p>
        <h3
          className="mt-2 text-xl text-white md:text-2xl"
          style={{ fontWeight: 700, letterSpacing: "-0.03em" }}
        >
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-neutral-400 md:text-base">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function JourneyTimeline() {
  return (
    <section
      id="journey"
      className="relative z-20 overflow-hidden bg-[#0d0d0d] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          style={{ willChange: "opacity, transform" }}
        >
          <h2
            className="text-center text-4xl text-white md:text-5xl"
            style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            The Journey
          </h2>
          <p className="mt-4 text-center text-neutral-500">
            13 years. One mission. Zero shortcuts.
          </p>
        </motion.div>

        <div className="relative mt-16 flex flex-col gap-14">
          {/* Center line (left-aligned on mobile) */}
          <span className="absolute bottom-0 top-0 w-px bg-white/15 left-[12px] md:left-1/2 md:-translate-x-1/2" />
          {ITEMS.map((item, index) => (
            <TimelineEntry key={item.year} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
