"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactBannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  useEffect(() => {
    if (!textRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      textRef.current.querySelectorAll("[data-word]"),
      { y: 80, opacity: 0, rotateX: -40 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      }
    );
  }, []);

  const words = ["PRECISION", "IN", "EVERY", "CAST."];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] overflow-hidden"
    >
      {/* Split layout — old site: centered text on full-bleed image */}
      <div className="absolute inset-0 lg:w-1/2 lg:left-auto lg:right-0">
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
          <Image
            src="/images/hero/contact-hero-bg.jpg"
            alt="Partner with GAIT"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-dark-bg/50 lg:bg-gradient-to-r lg:from-dark-bg lg:to-transparent" />
      </div>

      <div className="absolute inset-0 hidden bg-dark-bg lg:block lg:w-1/2" />

      <div className="container-gait relative z-10 flex min-h-[90vh] items-center">
        <motion.div
          ref={textRef}
          style={{ x: textX, perspective: 800 }}
          className="max-w-xl py-20 lg:py-0"
        >
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
            Partner with us
          </p>
          <h2 className="anime-split mb-8 font-bebas text-[clamp(48px,8vw,88px)] leading-[0.95] text-white">
            {words.map((w) => (
              <span
                key={w}
                data-word
                className="mr-[0.2em] inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {w === "PRECISION" ? (
                  <span className="text-primary">{w}</span>
                ) : (
                  w
                )}
              </span>
            ))}
            <br />
            <span data-word className="inline-block text-white/40">
              EXCELLENCE
            </span>{" "}
            <span data-word className="inline-block text-primary">
              DELIVERED.
            </span>
          </h2>
          <p
            data-word
            className="anime-reveal-left mb-10 max-w-md font-dm text-lg text-muted"
          >
            High-quality die casting & SPM partnerships built on measurable outcomes.
          </p>
          <div data-word>
            <MagneticButton href="/contact">Initiate Partnership</MagneticButton>
          </div>

          {/* Decorative laser lines */}
          <motion.div
            className="anime-glow absolute -left-4 top-1/2 hidden h-32 w-px bg-primary lg:block"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ originY: 0.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
