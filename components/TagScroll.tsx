const TAGS: string[] = [
  "UX AI Educator",
  "13 Years in UX",
  "Lead UX Designer",
  "Agentic AI Architect",
  "Usability Expert",
  "Behance Award Winner",
  "Author: Before the Screen",
  "Dravintel Academy",
  "UX Mint Columnist",
  "Design for India",
];

function TagRow({ direction }: { direction: "left" | "right" }) {
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="flex overflow-hidden">
      <div className={`flex w-max shrink-0 items-center gap-4 pr-4 ${animationClass}`}>
        {/* Content duplicated so the -50% translate loops seamlessly */}
        {[...TAGS, ...TAGS].map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="whitespace-nowrap rounded-full border border-white/20 px-6 py-2 text-sm text-white md:text-base"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TagScroll() {
  return (
    <section className="relative z-20 flex flex-col gap-6 bg-[#111111] py-16">
      <TagRow direction="left" />
      <TagRow direction="right" />
    </section>
  );
}
