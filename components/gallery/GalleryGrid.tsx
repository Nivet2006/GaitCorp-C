"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticCard from "@/components/ui/MagneticCard";

const placeholders = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  span: i === 0 || i === 3 ? "md:col-span-8 md:row-span-2" : "md:col-span-4",
}));

export default function GalleryGrid() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!featuredRef.current) return;
    gsap.fromTo(
      featuredRef.current,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: featuredRef.current, start: "top 85%" },
      }
    );
  }, []);

  return (
    <section className="bg-dark-bg pb-24 lg:pb-32">
      <div className="container-gait">
        <div
          ref={featuredRef}
          className="anime-reveal-scale anime-parallax group relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl border border-dark-border md:mb-12"
          data-anime-depth="0.08"
          onMouseEnter={() => setHovered(-1)}
          onMouseLeave={() => setHovered(null)}
        >
          <Image
            src="/images/gallery/gallery-img.jpg"
            alt="Featured gallery"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="100vw"
            priority
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-dark-bg/70"
            initial={false}
            animate={{ opacity: hovered === -1 ? 1 : 0 }}
          >
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
                Featured
              </p>
              <p className="mt-2 font-bebas text-5xl text-white">PRECISION CASTING</p>
            </div>
          </motion.div>
        </div>

        <div className="anime-stagger grid auto-rows-[200px] gap-4 md:grid-cols-12 md:auto-rows-[180px]">
          {placeholders.map((slot, i) => (
            <ScrollReveal
              key={slot.id}
              direction="clip"
              delay={i * 0.06}
              className={slot.span}
            >
              <MagneticCard
                tilt={8}
                className="anime-pop anime-magnetic relative h-full min-h-[200px] overflow-hidden rounded-2xl border border-dashed border-dark-border bg-dark-elevated transition-colors hover:border-primary/40"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <span className="font-mono text-[10px] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 font-dm text-sm text-muted">Project slot</span>
                  <span className="mt-4 font-mono text-[9px] uppercase tracking-widest text-muted/60">
                    Coming soon
                  </span>
                </div>
                {hovered === i && (
                  <motion.div
                    layoutId="gallery-hover"
                    className="absolute inset-0 border-2 border-primary"
                  />
                )}
              </MagneticCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ParallaxStrip />
    </section>
  );
}

function ParallaxStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <div ref={ref} className="mt-20 overflow-hidden border-y border-dark-border py-8">
      <motion.div style={{ x }} className="flex gap-12 whitespace-nowrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="anime-float font-bebas text-6xl text-white/[0.04] md:text-8xl"
          >
            GAIT ENGINEERING · GALLERY ·
          </span>
        ))}
      </motion.div>
    </div>
  );
}
