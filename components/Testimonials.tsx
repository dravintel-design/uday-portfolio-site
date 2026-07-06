interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I know Uday as a curious person who always wanted to explore the depth in design, connecting from nature and learning design and exploring the possibilities to provide best experience in building products. Someone who never settles down with ordinary thoughts. Wish him a fantastic journey in design.",
    name: "Kingsley S",
    role: "Founder, OctaKidz · UXMINT LLP · Visiting Faculty for Design at IIFC",
  },
  {
    quote:
      "Bold, energetic, brilliant speaker, thinker, challenger, trustworthy. Still remember his campus interview: out of the entire class he is the only guy who spoke and questioned us. Guess what happened after that... we hired him.",
    name: "Thulasiram L",
    role: "Experience Design",
  },
  {
    quote:
      "Udaya's creative thinking, expertise and positive attitude as an Interaction Designer made him an absolute pleasure to work with. He continually delivered results, excelled in providing exceptional usability solutions and showed genuine integrity as a team member. His strengths in problem solving and communication make him a valuable contributor to my team. I would highly recommend him!",
    name: "Saravanan NC",
    role: "Product Design · User Experience at Publicis Sapient · Design Systems",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-20 bg-[#0d0d0d] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <h2
          className="text-4xl text-white md:text-5xl"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          Testimonials
        </h2>
        <p className="mt-4 text-neutral-500">
          What colleagues and leaders say about working with me.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#1a1a1a] p-8 transition duration-300 hover:-translate-y-1 hover:border-white/30"
            >
              <div>
                <span
                  aria-hidden
                  className="text-5xl leading-none text-[#acec00]"
                  style={{ fontWeight: 800 }}
                >
                  &ldquo;
                </span>
                <blockquote className="mt-3 text-sm leading-relaxed text-neutral-300 md:text-base">
                  {testimonial.quote}
                </blockquote>
              </div>
              <figcaption className="mt-8">
                <p
                  className="text-white"
                  style={{ fontWeight: 700, letterSpacing: "-0.03em" }}
                >
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  {testimonial.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
