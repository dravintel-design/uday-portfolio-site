"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

const FRAME_COUNT = 121;

function frameSrc(index: number): string {
  return `/sequence/frame_${String(index).padStart(3, "0")}.webp`;
}

interface ScrollyCanvasProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

export default function ScrollyCanvas({ heroRef }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const isLoaded = loadedCount >= FRAME_COUNT;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const image = imagesRef.current[index];
    if (!canvas || !image || !image.complete || image.naturalWidth === 0) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    // object-fit: cover — scale to fill, center crop
    const scale = Math.max(
      canvas.width / image.naturalWidth,
      canvas.height / image.naturalHeight
    );
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const offsetX = (canvas.width - drawWidth) / 2;
    const offsetY = (canvas.height - drawHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const image = new Image();
      image.src = frameSrc(i);
      const onSettled = () => {
        if (cancelled) return;
        setLoadedCount((count) => count + 1);
      };
      image.onload = () => {
        onSettled();
        if (!cancelled && i === currentFrameRef.current) {
          drawFrame(i);
        }
      };
      image.onerror = onSettled;
      images.push(image);
    }
    imagesRef.current = images;

    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
    };
  }, [drawFrame]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(progress * FRAME_COUNT))
    );
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      requestAnimationFrame(() => drawFrame(frameIndex));
    }
  });

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ display: "block" }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0d0d0d]">
          <p className="text-sm font-semibold tracking-[0.3em] text-white/70">
            LOADING {Math.round((loadedCount / FRAME_COUNT) * 100)}%
          </p>
        </div>
      )}
      {/* Bottom-weighted scrim: keeps the face clear while grounding the text */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/70" />
    </div>
  );
}
