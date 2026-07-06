"use client";

import { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import TagScroll from "@/components/TagScroll";
import AboutMeSplit from "@/components/AboutMeSplit";
import ServicesGrid from "@/components/ServicesGrid";
import JourneyTimeline from "@/components/JourneyTimeline";
import Book from "@/components/Book";
import UxThinking from "@/components/UxThinking";
import Testimonials from "@/components/Testimonials";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-[#0d0d0d]">
      <div ref={heroRef} style={{ position: "relative", height: "500vh" }}>
        <ScrollyCanvas heroRef={heroRef} />
        <Overlay heroRef={heroRef} />
      </div>
      <TagScroll />
      <AboutMeSplit />
      <ServicesGrid />
      <JourneyTimeline />
      <Book />
      <UxThinking />
      <Testimonials />
      <Connect />
      <Footer />
    </main>
  );
}
