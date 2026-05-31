"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticCard from "@/components/ui/MagneticCard";
import SplitLine from "@/components/ui/SplitLine";

const pillars = [
  {
    num: "01",
    title: "End-to-End Execution",
    text: "Feasibility through commissioning — one accountable partner.",
  },
  {
    num: "02",
    title: "Precision Delivery",
    text: "Quality systems built for on-time, spec-perfect output.",
  },
  {
    num: "03",
    title: "Advanced SPM",
    text: "Automation and special machines tailored to your line.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-dark-bg py-24 lg:py-32">
      <motion.div
        style={{ x: bgX }}
        className="pointer-events-none absolute -right-20 top-20 font-bebas text-[20vw] leading-none text-white/[0.02]"
      >
        PRECISION
      </motion.div>

      <div className="container-gait">
        <ScrollReveal direction="left" className="mb-16 max-w-3xl">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
            Who we are
          </p>
          <h2 className="font-bebas text-[clamp(48px,7vw,96px)] leading-[0.95] text-white">
            TWO DECADES OF
            <br />
            <span className="text-primary">INDUSTRIAL CRAFT</span>
          </h2>
        </ScrollReveal>

        {/* Bento grid — old site uses simple 60/40 split */}
        <div className="grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-12">
          <ScrollReveal direction="clip" className="md:col-span-7 md:row-span-2">
            <MagneticCard className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-dark-border md:min-h-[480px]">
              <Image
                src="/images/about/about_worker.jpg"
                alt="Engineering team"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-dm text-sm leading-relaxed text-white/80">
                  Gait Engineers delivers non-ferrous castings and SPM consulting
                  with over 20 years of manufacturing leadership in Bangalore.
                </p>
              </div>
            </MagneticCard>
          </ScrollReveal>

          {pillars.map((p, i) => (
            <ScrollReveal
              key={p.num}
              direction="up"
              delay={i * 0.1}
              className="md:col-span-5"
            >
              <motion.div
                whileHover={{ borderColor: "rgba(237,29,36,0.6)" }}
                className="flex h-full flex-col justify-between rounded-2xl border border-dark-border bg-dark-surface p-8"
              >
                <span className="font-mono text-xs text-primary">{p.num}</span>
                <div>
                  <h3 className="mb-2 font-dm text-xl font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="font-dm text-sm text-muted">{p.text}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}

          <ScrollReveal direction="scale" className="md:col-span-4">
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
              <AnimatedCounter
                target={20}
                suffix="+"
                className="font-bebas text-7xl text-primary"
              />
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                Years expertise
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale" className="md:col-span-4">
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dark-border bg-dark-elevated p-8 text-center">
              <AnimatedCounter
                target={500}
                suffix="+"
                className="font-bebas text-7xl text-white"
              />
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                Projects delivered
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale" className="md:col-span-4">
            <Link
              href="/about"
              data-cursor-hover
              className="group flex h-full min-h-[160px] flex-col items-center justify-center rounded-2xl border border-dark-border bg-dark-surface p-8 transition-colors hover:border-primary"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                Discover
              </span>
              <span className="mt-2 font-bebas text-3xl text-white group-hover:text-primary">
                Our Story →
              </span>
            </Link>
          </ScrollReveal>
        </div>

        <SplitLine className="mt-20" />
      </div>
    </section>
  );
}
