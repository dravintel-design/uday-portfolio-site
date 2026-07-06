const QUICK_LINKS: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Journey", href: "#journey" },
  { label: "The Book", href: "#book" },
  { label: "UX Thinking", href: "#ux-thinking" },
  { label: "Testimonials", href: "#testimonials" },
];

const SOCIALS: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/udaya-kumar-sivagurunathan-a9593148/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/uk_on_ux/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.48 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.15a4 4 0 1 1 0-7.99 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@DravintelUX/videos",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative z-20 bg-[#0a0a0a] pt-24 md:pt-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-16 md:grid-cols-3 md:px-12">
        {/* Left — name, tagline, socials */}
        <div>
          <h3
            className="text-2xl text-white"
            style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            Udaya Kumar Sivagurunathan
          </h3>
          <p className="mt-3 text-neutral-400">
            Building experience that lasts forever.
          </p>
          <div className="mt-6 flex gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition hover:text-[#acec00]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Center — quick links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-neutral-300 transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — contact & blogs */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Contact
          </h4>
          <a
            href="mailto:dravintel@gmail.com"
            className="mt-5 block text-neutral-300 transition hover:text-white"
          >
            dravintel@gmail.com
          </a>
          <h4 className="mt-8 text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Blogs
          </h4>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href="https://substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 transition hover:text-white"
              >
                Substack Newsletter
              </a>
            </li>
            <li>
              <a
                href="https://medium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 transition hover:text-white"
              >
                Medium Articles
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-sm text-neutral-500">
          © 2026 Udaya Kumar Sivagurunathan. Built with AI, designed with
          intention.
        </p>
      </div>
    </footer>
  );
}
