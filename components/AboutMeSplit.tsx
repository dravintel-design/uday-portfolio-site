"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 13, suffix: "+", label: "Years in UX" },
  { value: 4, suffix: "", label: "Global Companies" },
  { value: 22, suffix: "", label: "Laws of UX Thinking" },
  { value: 1, suffix: "", label: "Academy for UX Thinking" },
];

const COUNT_DURATION_MS = 1800;

function StatCounter({ stat, start }: { stat: Stat; start: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frameId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / COUNT_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(stat.value * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [start, stat.value]);

  return (
    <div>
      <p
        className="text-6xl text-white md:text-7xl"
        style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
      >
        {current}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-neutral-500 md:text-base">{stat.label}</p>
    </div>
  );
}

export default function AboutMeSplit() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-20 bg-[#0d0d0d] py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-[40%_60%] md:gap-8 md:px-12">
        <div className="grid grid-cols-2 gap-10 md:gap-12">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} stat={stat} start={inView} />
          ))}
        </div>

        <div className="md:pl-8">
          <h2
            className="text-4xl text-white md:text-5xl"
            style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            13 Years in UX. One Vision for India.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-neutral-400 md:text-lg">
            <p>
              My journey began in 2014 as an Interaction Designer at HCL in
              Chennai. Thirteen years, four global companies, and one Behance
              award later, I lead UX at Siemens, designing experiences used by
              people around the world.
            </p>
            <p>
              Along the way I learned that great design isn&apos;t about
              screens. It&apos;s about thinking. That belief became Dravintel
              Academy for UX Thinking, and my book{" "}
              <em>Before the Screen: 22 Laws of UX Thinking</em>, teaching
              designers how to think before they draw a single pixel.
            </p>
            <p>
              My vision is bigger than my career: to make India the design
              differentiator for the world: not a follower of the West, but
              the place where experience is built to last forever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
