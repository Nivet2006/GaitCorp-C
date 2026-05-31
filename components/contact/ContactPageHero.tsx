"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ContactPageHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section ref={ref} className="relative min-h-[70vh] overflow-hidden bg-dark-bg">
      <motion.div style={{ y: imgY }} className="absolute inset-0 opacity-30">
        <Image
          src="/images/contact/contact-us.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg/90 to-dark-bg" />
      </motion.div>

      <div className="container-gait relative z-10 flex min-h-[70vh] flex-col justify-end pb-20 pt-32">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
          <Link href="/" className="hover:text-primary">
            Index
          </Link>
          <span className="mx-3 text-primary">/</span>
          <span className="text-primary">Contact</span>
        </p>
        <h1 className="font-bebas text-[clamp(64px,12vw,140px)] leading-[0.85] text-white">
          LET&apos;S
          <br />
          <span className="text-primary">CONNECT</span>
        </h1>
      </div>
    </section>
  );
}
