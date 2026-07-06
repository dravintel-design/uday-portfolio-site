"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const VIDEOS: Video[] = [
  {
    id: "NXB3B16MIs0",
    title: "Agentic AI UX",
    thumbnail: "https://i.ytimg.com/vi/NXB3B16MIs0/maxresdefault.jpg",
  },
  {
    id: "Q2sEJkt1EN0",
    title: "UX is the new CEO Skill",
    thumbnail: "https://i.ytimg.com/vi/Q2sEJkt1EN0/maxresdefault.jpg",
  },
  {
    id: "Q1q6DT-xBbc",
    title: "Business Design Explained: Before You Build Anything, Watch This",
    // This video has no maxres thumbnail; sddefault is cropped by object-cover.
    thumbnail: "https://i.ytimg.com/vi/Q1q6DT-xBbc/sddefault.jpg",
  },
];

const AUTO_ADVANCE_MS = 3000;
const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

// Direction-aware slide: next comes in from the right, previous from the left.
const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction * 90,
    opacity: 0,
    scale: 1.04,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
  exit: (direction: number) => ({
    x: direction * -90,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.5, ease: "easeIn" },
  }),
};

function Chevron({ flipped }: { flipped?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 ${flipped ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function UxThinking() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const video = VIDEOS[index];

  const goTo = useCallback((target: number, dir: number) => {
    setSlide([(target + VIDEOS.length) % VIDEOS.length, dir]);
  }, []);

  // Auto-advance every 3s; restarts after any change, pauses while hovered.
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setSlide(([current]) => [(current + 1) % VIDEOS.length, 1]);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, index]);

  return (
    <section
      id="ux-thinking"
      className="relative z-20 bg-[#0d0d0d] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          style={{ willChange: "opacity, transform" }}
        >
          <h2
            className="text-4xl text-white md:text-5xl"
            style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            UX Thinking
          </h2>
          <p className="mt-4 text-neutral-500">
            Ideas on design, AI, and business, from the Dravintel channel.
          </p>
        </motion.div>

        {/* Netflix-style hero banner */}
        <motion.div
          className="relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-[#151515]"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ willChange: "opacity, transform" }}
        >
          <div className="relative aspect-video md:aspect-[21/9]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="group absolute inset-0 block"
                style={{ willChange: "opacity, transform" }}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1152px"
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                {/* Netflix-style scrim: dark from the left and bottom */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Slide content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
                  <p className="text-xs font-semibold tracking-[0.3em] text-[#acec00]">
                    NOW PLAYING · {String(index + 1).padStart(2, "0")} /{" "}
                    {String(VIDEOS.length).padStart(2, "0")}
                  </p>
                  <h3
                    className="mt-3 max-w-2xl text-white"
                    style={{
                      fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                    }}
                  >
                    {video.title}
                  </h3>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm text-black transition-colors duration-300 group-hover:bg-[#acec00] md:px-6 md:py-3">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                        aria-hidden
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span style={{ fontWeight: 700 }}>Watch on YouTube</span>
                    </span>
                    <span className="hidden text-sm text-neutral-400 md:block">
                      Dravintel
                    </span>
                  </div>
                </div>
              </motion.a>
            </AnimatePresence>

            {/* Prev / Next arrows */}
            <button
              type="button"
              aria-label="Previous video"
              onClick={() => goTo(index - 1, -1)}
              className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-transparent hover:bg-[#acec00] hover:text-black md:left-6"
            >
              <Chevron flipped />
            </button>
            <button
              type="button"
              aria-label="Next video"
              onClick={() => goTo(index + 1, 1)}
              className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-transparent hover:bg-[#acec00] hover:text-black md:right-6"
            >
              <Chevron />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-2 md:flex">
              {VIDEOS.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  aria-label={`Go to video ${i + 1}`}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index
                      ? "w-8 bg-[#acec00]"
                      : "w-3 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Up-next strip: monochrome until active or hovered */}
        <div className="mt-6 grid grid-cols-3 gap-4 md:gap-6">
          {VIDEOS.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`group relative overflow-hidden rounded-xl border text-left transition-all duration-300 ${
                i === index
                  ? "border-[#acec00]/70"
                  : "border-white/10 hover:border-white/30"
              }`}
              aria-label={`Play ${v.title}`}
            >
              <div className="relative aspect-video">
                <Image
                  src={v.thumbnail}
                  alt={v.title}
                  fill
                  sizes="(max-width: 768px) 33vw, 370px"
                  className={`object-cover transition-all duration-500 ${
                    i === index
                      ? "grayscale-0"
                      : "grayscale group-hover:grayscale-0"
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${
                    i === index ? "opacity-0" : "opacity-100 group-hover:opacity-30"
                  }`}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
