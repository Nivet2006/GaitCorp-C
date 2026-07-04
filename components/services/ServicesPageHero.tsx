"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitLine from "@/components/ui/SplitLine";

export default function ServicesPageHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-end overflow-hidden bg-dark-bg pt-32 lg:pt-36"
    >
      <motion.div
        style={{ y, opacity }}
        className="container-gait relative z-10 pb-20"
      >
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-3 text-primary">/</span>
          <span className="text-primary">Capabilities</span>
        </p>
        <h1 className="font-bebas text-[clamp(64px,12vw,140px)] leading-[0.9] text-white">
          OUR
          <br />
          <span className="text-primary">SERVICES</span>
        </h1>
        <p className="mt-6 max-w-lg font-dm text-lg text-muted">
          From prototype castings to full SPM automation — explore our engineering stack.
        </p>
        <SplitLine className="mt-10 max-w-md" />
      </motion.div>

      {/* Animated grid lines */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 h-full w-px bg-white/[0.03]"
            style={{ left: `${(i + 1) * 12.5}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.08, duration: 1.2 }}
          />
        ))}
      </div>
    </section>
  );
}
