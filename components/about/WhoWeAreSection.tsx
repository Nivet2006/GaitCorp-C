"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";

const words = ["WHO", "WE", "ARE"];

export default function WhoWeAreSection() {
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!subRef.current) return;
    gsap.to(subRef.current, {
      color: "#ffffff",
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center">
      <Image
        src="/images/about/iron-pour.jpg"
        alt="Iron pour at Gait Engineering"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.9) 100%)",
        }}
      />
      <div className="container-gait relative z-10 pt-40 pb-24 text-center">
        <p className="mb-6 font-mono text-xs text-white">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2 text-primary">/</span>
          <span className="text-primary">About</span>
        </p>
        <h1 className="mb-6 font-bebas text-[clamp(80px,12vw,160px)] leading-none text-white">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mr-4 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <p ref={subRef} className="mb-8 font-dm text-2xl text-primary">
          Driven by Experience, Defined by Precision
        </p>
        <p className="mx-auto max-w-[700px] font-dm text-base leading-relaxed text-muted">
          At Gait Engineers, we specialize in delivering high-quality, cost-effective
          solutions in non-ferrous castings and Special Purpose Machines (SPM). With over
          20 years of expertise, we provide comprehensive services from feasibility studies
          to project execution, ensuring precision, efficiency, and customer satisfaction.
        </p>
      </div>
    </section>
  );
}
