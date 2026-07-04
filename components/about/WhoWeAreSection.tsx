"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function WhoWeAreSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] items-end overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="/images/about/iron-pour.jpg"
          alt="Iron pour"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/70 to-dark-bg/30" />

      <motion.div
        style={{ opacity }}
        className="container-gait relative z-10 pb-24 pt-32"
      >
        <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.35em] text-white/60">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-3 text-primary">/</span>
          <span className="text-primary">About</span>
        </p>
        <h1 className="anime-split font-bebas text-[clamp(72px,14vw,180px)] leading-[0.85] text-white">
          WHO
          <br />
          <span className="anime-glitch text-stroke">WE</span>
          <br />
          <span className="anime-wave text-primary">ARE</span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="anime-reveal-blur mt-8 max-w-2xl font-dm text-lg text-muted"
        >
          Driven by experience, defined by precision — two decades of castings &
          SPM excellence from Bangalore.
        </motion.p>
      </motion.div>
    </section>
  );
}
