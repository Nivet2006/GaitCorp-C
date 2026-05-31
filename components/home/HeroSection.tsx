"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleField from "@/components/three/ParticleField";
import MagneticButton from "@/components/ui/MagneticButton";
import { fadeIn } from "@/lib/animations";

const headlineWords = ["EXPERTS", "IN", "CASTINGS", "AND", "SPM", "SOLUTIONS"];

const wordVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stats = [
  { value: "20+", label: "Years of Expertise" },
  { value: "500+", label: "Projects Delivered" },
  { value: "100%", label: "On-Time Delivery" },
];

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!contentRef.current) return;

    gsap.to(contentRef.current, {
      y: -100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <Image
        src="/images/hero/hero-bg-img.jpg"
        alt="Industrial engineering"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,10,0.92) 50%, rgba(10,10,10,0.6) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to top, rgba(237,29,36,0.15) 0%, transparent 40%)",
        }}
      />
      <ParticleField />

      <div ref={contentRef} className="container-gait relative z-10 pt-32 pb-24">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mb-6 font-mono text-xs tracking-[0.2em] text-primary"
        >
          [ ENGINEERING EXCELLENCE ]
        </motion.p>

        <h1 className="hero-title mb-8 font-bebas text-white">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="mr-[0.15em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-10 max-w-[520px] font-dm text-lg text-muted"
        >
          Delivering High-Quality, Cost-Effective Casting & SPM Solutions with
          Precision, Professionalism, and a Commitment to Excellence
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-16 flex flex-wrap gap-4"
        >
          <MagneticButton href="/contact">Get In Touch</MagneticButton>
          <Link
            href="/services"
            className="inline-flex items-center rounded border border-white/30 px-10 py-4 font-dm text-lg font-semibold text-white transition-all duration-300 hover:border-primary hover:text-primary"
          >
            View Services
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap items-center gap-8"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8">
              {i > 0 && <div className="hidden h-12 w-px bg-dark-border sm:block" />}
              <div>
                <p className="font-bebas text-5xl text-white">{stat.value}</p>
                <p className="font-mono text-[11px] uppercase text-muted">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <ChevronDown size={28} className="animate-bounce-slow text-white" />
      </div>
    </section>
  );
}
