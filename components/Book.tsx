"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const AMAZON_URL =
  "https://www.amazon.com/Before-Screen-22-Laws-Thinking-ebook/dp/B0GKFRZZFS";

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const coverVariants: Variants = {
  hidden: { opacity: 0, y: 48, rotateY: -38 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: -22,
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

const contentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

/**
 * CSS-built 3D book. Replace the cover face content with a real cover
 * image (next/image, fill) once the artwork is available.
 */
function BookCover() {
  return (
    <div style={{ perspective: "1400px" }}>
      <motion.div
        variants={coverVariants}
        whileHover={{ rotateY: -8, scale: 1.03 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative h-[380px] w-[260px] md:h-[440px] md:w-[300px]"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Spine — matches the yellow cover */}
        <div
          className="absolute left-0 top-0 h-full w-[34px] bg-[#e3d824]"
          style={{
            transform: "rotateY(90deg)",
            transformOrigin: "left center",
          }}
        />
        {/* Page block */}
        <div
          className="absolute right-0 top-[4px] h-[calc(100%-8px)] w-[30px] rounded-r-sm bg-neutral-200"
          style={{
            transform: "rotateY(90deg) translateZ(-15px)",
            transformOrigin: "right center",
            backgroundImage:
              "repeating-linear-gradient(to bottom, #e5e5e5 0px, #e5e5e5 2px, #cfcfcf 3px)",
          }}
        />
        {/* Front cover — the artwork is a full print wrap (back/spine/front),
            object-right shows the front-cover panel */}
        <div className="absolute inset-0 overflow-hidden rounded-r-md rounded-l-sm border border-black/10 shadow-[20px_30px_60px_rgba(0,0,0,0.6)]">
          <Image
            src="/before the screen.png"
            alt="Before the Screen: The 22 Laws of UX Thinking, by Udaya Kumar Sivagurunathan"
            fill
            sizes="300px"
            className="object-cover object-right"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function Book() {
  return (
    <section id="book" className="relative z-20 bg-[#0d0d0d] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[45%_55%] md:gap-8">
          {/* Left — 3D cover */}
          <motion.div
            className="flex justify-center md:justify-end md:pr-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <BookCover />
          </motion.div>

          {/* Right — book story */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.p
              variants={lineVariants}
              className="text-sm font-semibold tracking-[0.3em] text-[#acec00]"
            >
              THE BOOK
            </motion.p>
            <motion.h2
              variants={lineVariants}
              className="mt-4 text-4xl text-white md:text-5xl"
              style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Before the Screen
            </motion.h2>
            <motion.p
              variants={lineVariants}
              className="mt-2 text-lg text-neutral-400 md:text-xl"
              style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              22 Laws of UX Thinking
            </motion.p>
            <motion.div
              variants={lineVariants}
              className="mt-6 space-y-4 text-base leading-relaxed text-neutral-400 md:text-lg"
            >
              <p>
                Not a how-to book, a how-to-think book. Before the Screen goes
                beyond interfaces into how users think, behave, and make
                decisions.
              </p>
              <p>
                Each of the 22 laws is a mental shift: a way to reason about
                experience, strategy, and behaviour before a single pixel is
                drawn.
              </p>
            </motion.div>
            <motion.div
              variants={lineVariants}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#acec00] px-7 py-3 text-sm text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c3f733]"
                style={{ fontWeight: 700 }}
              >
                Get it on Amazon
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
              <span className="text-sm text-neutral-500">
                Free with Kindle Unlimited
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
