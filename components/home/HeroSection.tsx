"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleField from "@/components/three/ParticleField";
import RotatingGear from "@/components/three/RotatingGear";
import MagneticButton from "@/components/ui/MagneticButton";
import SplitLine from "@/components/ui/SplitLine";

const rotatingWords = ["CASTINGS", "SPM SYSTEMS", "PRECISION", "INNOVATION"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!imageWrapRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      imageWrapRef.current,
      { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
      {
        clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 1.4,
        ease: "power4.inOut",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-dark-bg"
    >
      {/* Diagonal mesh — not the old left-gradient-on-photo layout */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          backgroundImage: `
            linear-gradient(105deg, #0a0a0a 0%, #0a0a0a 42%, transparent 42%),
            radial-gradient(ellipse at 80% 20%, rgba(237,29,36,0.12) 0%, transparent 50%)
          `,
        }}
      />

      {/* Right panel — cinematic image reveal */}
      <motion.div
        ref={imageWrapRef}
        style={{ scale: imageScale, y: imageY }}
        className="absolute inset-y-0 right-0 w-full lg:w-[58%]"
      >
        <Image
          src="/images/hero/hero-bg-img.jpg"
          alt="Industrial engineering"
          fill
          priority
          className="object-cover"
          sizes="60vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-dark-bg/20 to-dark-bg/90 lg:to-dark-bg/40" />
        <ParticleField />
      </motion.div>

      {/* Vertical stroke title — old site uses horizontal stacked words */}
      <div className="pointer-events-none absolute right-4 top-1/2 z-[4] hidden -translate-y-1/2 lg:block">
        <p
          className="font-bebas text-[clamp(120px,15vw,200px)] leading-none text-transparent"
          style={{ WebkitTextStroke: "1px rgba(237,29,36,0.15)" }}
        >
          GAIT
        </p>
      </div>

      {/* 3D accent */}
      <div className="absolute bottom-32 right-[8%] z-[5] hidden opacity-80 lg:block">
        <RotatingGear className="h-28 w-28" />
      </div>

      {/* Left content — asymmetric, outline typography */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-6 pb-28 pt-28 lg:max-w-[50%] lg:justify-center lg:px-16 lg:pb-20 lg:pt-0 xl:px-24"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8 h-px bg-primary"
        />

        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
          Bangalore · Est. 20+ Years
        </p>

        <h1 className="mb-2 font-bebas text-[clamp(52px,8vw,100px)] leading-[0.95] text-white">
          ENGINEERING
        </h1>
        <div className="mb-6 h-[clamp(52px,8vw,100px)] overflow-hidden">
          <AnimateWord word={rotatingWords[wordIndex]} />
        </div>

        <p
          className="mb-10 max-w-md font-dm text-base leading-relaxed text-muted lg:text-lg"
          style={{ borderLeft: "2px solid #ed1d24", paddingLeft: "1.25rem" }}
        >
          Non-ferrous castings & special-purpose machines — engineered with
          industrial-grade precision for partners who demand more than
          off-the-shelf solutions.
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <MagneticButton href="/contact">Start a Project</MagneticButton>
          <Link
            href="/services"
            data-cursor-hover
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white"
          >
            <span className="h-px w-8 bg-white transition-all group-hover:w-12 group-hover:bg-primary" />
            Capabilities
          </Link>
        </div>

        <SplitLine className="my-12 max-w-md" />

        {/* Glass stat chips — not inline dividers like old site */}
        <div className="flex flex-wrap gap-3">
          {[
            { v: "20+", l: "Years" },
            { v: "500+", l: "Projects" },
            { v: "100%", l: "On-Time" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.12 }}
              className="rounded-lg border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md"
            >
              <p className="font-bebas text-3xl text-primary">{s.v}</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted">
                {s.l}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll line indicator */}
      <motion.div
        className="absolute bottom-8 left-6 z-10 flex items-center gap-4 lg:left-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="h-16 w-px bg-primary/50"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted [writing-mode:vertical-lr]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

function AnimateWord({ word }: { word: string }) {
  return (
    <motion.h2
      key={word}
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="font-bebas text-[clamp(52px,8vw,100px)] leading-[0.95] text-primary"
    >
      {word}
    </motion.h2>
  );
}
