"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GalleryPageHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[60vh] items-end overflow-hidden bg-dark-bg pt-32 lg:pt-36"
    >
      <motion.div style={{ opacity, scale }} className="container-gait pb-16">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-3 text-primary">/</span>
          <span className="text-primary">Gallery</span>
        </p>
        <h1 className="font-bebas text-[clamp(64px,12vw,140px)] leading-[0.85] text-white">
          CRAFT IN
          <br />
          <span className="text-stroke">MOTION</span>
        </h1>
        <p className="mt-6 max-w-md font-dm text-muted">
          Precision-engineered die-casting and SPM solutions — captured in the field.
        </p>
      </motion.div>
    </section>
  );
}
