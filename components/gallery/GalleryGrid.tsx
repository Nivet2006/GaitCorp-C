"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GalleryGrid() {
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!heroImageRef.current) return;

    gsap.fromTo(
      heroImageRef.current,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section className="section-padding bg-dark-bg">
      <div className="container-gait">
        <div
          ref={heroImageRef}
          className="group relative mb-12 h-[600px] overflow-hidden rounded-lg"
        >
          <Image
            src="/images/gallery/gallery-img.jpg"
            alt="Gait Engineering gallery"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-dark-bg/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center gap-3">
              <Eye size={24} className="text-white" />
              <span className="font-mono text-sm uppercase tracking-widest text-white">
                Gallery
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex h-[240px] items-center justify-center rounded-lg border border-dashed border-dark-border bg-dark-elevated"
            >
              <span className="font-dm text-sm text-muted">Project Image</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
