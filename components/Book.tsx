"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";

const AMAZON_URL =
  "https://www.amazon.com/Before-Screen-22-Laws-Thinking-ebook/dp/B0GKFRZZFS";

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

interface LeafProps {
  progress: MotionValue<number>;
  /** [start, end] progress window when this leaf flips open (0 → -180deg). */
  open: [number, number];
  /** [start, end] progress window when this leaf flips shut again. */
  close: [number, number];
  zRight: number;
  zLeft: number;
  front: React.ReactNode;
  back: React.ReactNode;
}

/**
 * One sheet of the book. Anchored on the spine (left edge), it rotates from
 * the right stack to the left stack and back. While mid-flip it is raised
 * above both stacks.
 */
function Leaf({ progress, open, close, zRight, zLeft, front, back }: LeafProps) {
  const rotateY = useTransform(
    progress,
    [0, open[0], open[1], close[0], close[1], 1],
    [0, 0, -180, -180, 0, 0]
  );
  const zIndex = useTransform(
    progress,
    [
      0,
      open[0] - 0.001,
      open[0],
      open[1],
      open[1] + 0.001,
      close[0] - 0.001,
      close[0],
      close[1],
      close[1] + 0.001,
      1,
    ],
    [zRight, zRight, 100, 100, zLeft, zLeft, 100, 100, zRight, zRight]
  );

  return (
    <motion.div
      className="absolute left-1/2 top-0 h-full w-1/2"
      style={{
        rotateY,
        zIndex,
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-r-md"
        style={{ backfaceVisibility: "hidden" }}
      >
        {front}
      </div>
      <div
        className="absolute inset-0 overflow-hidden rounded-l-md"
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        {back}
      </div>
    </motion.div>
  );
}

function Paper({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-black/10 bg-[#f5f1e6] p-6 text-center md:p-8">
      {children}
    </div>
  );
}

function FlipBook({ progress }: { progress: MotionValue<number> }) {
  // The spread is two covers wide; keep the visual centre on the book itself
  // while it is closed at the start and end.
  const x = useTransform(
    progress,
    [0, 0.1, 0.9, 1],
    ["-25%", "0%", "0%", "-25%"]
  );

  return (
    <div style={{ perspective: "2000px" }}>
      <motion.div
        className="relative h-[240px] w-[328px] sm:h-[380px] sm:w-[520px] md:h-[440px] md:w-[600px]"
        style={{ x, transformStyle: "preserve-3d" }}
      >
        {/* Back board: the base of the right stack */}
        <div className="absolute left-1/2 top-0 z-[1] h-full w-1/2 rounded-r-md border border-black/10 bg-[#efe9da] shadow-[24px_36px_70px_rgba(0,0,0,0.55)]" />

        {/* Front cover */}
        <Leaf
          progress={progress}
          open={[0.1, 0.26]}
          close={[0.88, 0.97]}
          zRight={40}
          zLeft={10}
          front={
            <Image
              src="/before the screen.png"
              alt="Before the Screen: The 22 Laws of UX Thinking, by Udaya Kumar Sivagurunathan"
              fill
              sizes="300px"
              className="object-cover object-right"
            />
          }
          back={<Paper />}
        />

        {/* Page 1 */}
        <Leaf
          progress={progress}
          open={[0.26, 0.4]}
          close={[0.8, 0.88]}
          zRight={38}
          zLeft={12}
          front={
            <Paper>
              <span className="block h-1 w-8 bg-[#acec00]" />
              <p
                className="text-lg text-neutral-900 md:text-2xl"
                style={{ fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                Before the Screen
              </p>
              <p className="text-[0.65rem] tracking-[0.3em] text-neutral-500 md:text-xs">
                THE 22 LAWS OF UX THINKING
              </p>
            </Paper>
          }
          back={
            <Paper>
              <p className="max-w-[24ch] text-sm italic leading-relaxed text-neutral-700 md:text-base">
                &ldquo;The most important part of UX happens long before
                anything appears on a screen.&rdquo;
              </p>
            </Paper>
          }
        />

        {/* Page 2 */}
        <Leaf
          progress={progress}
          open={[0.4, 0.54]}
          close={[0.72, 0.8]}
          zRight={36}
          zLeft={14}
          front={
            <Paper>
              <p
                className="text-4xl text-neutral-900 md:text-6xl"
                style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
              >
                22
              </p>
              <p className="text-[0.65rem] tracking-[0.25em] text-neutral-500 md:text-xs">
                MENTAL SHIFTS. ONE WAY OF THINKING.
              </p>
            </Paper>
          }
          back={
            <Paper>
              <p className="max-w-[22ch] text-sm leading-relaxed text-neutral-700 md:text-base">
                UX is not just design, it is business.
              </p>
            </Paper>
          }
        />

        {/* Page 3 */}
        <Leaf
          progress={progress}
          open={[0.54, 0.62]}
          close={[0.64, 0.72]}
          zRight={34}
          zLeft={16}
          front={
            <Paper>
              <p className="text-[0.65rem] tracking-[0.25em] text-neutral-500 md:text-xs">
                AVAILABLE ON AMAZON
              </p>
              <p className="text-sm text-neutral-700 md:text-base">
                Free with Kindle Unlimited
              </p>
            </Paper>
          }
          back={<Paper />}
        />
      </motion.div>
    </div>
  );
}

function BookStory() {
  return (
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
          Not a how-to book, a how-to-think book. Before the Screen goes beyond
          interfaces into how users think, behave, and make decisions.
        </p>
        <p>
          Each of the 22 laws is a mental shift: a way to reason about
          experience, strategy, and behaviour before a single pixel is drawn.
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
  );
}

export default function Book() {
  const flipRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: flipRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="book" className="relative z-20 bg-[#0d0d0d]">
      <div ref={flipRef} className="relative" style={{ height: "300vh" }}>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-[55%_45%] md:gap-6 md:px-12">
            {/* The flip book, driven by scroll */}
            <div className="flex justify-center">
              <FlipBook progress={scrollYProgress} />
            </div>

            {/* Story beside the book on desktop only; mobile gets it below */}
            <div className="hidden md:block">
              <BookStory />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: story after the flip sequence */}
      <div className="px-6 pb-24 pt-4 md:hidden">
        <BookStory />
      </div>
    </section>
  );
}
