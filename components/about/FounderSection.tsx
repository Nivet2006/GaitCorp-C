"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticCard from "@/components/ui/MagneticCard";
import SplitLine from "@/components/ui/SplitLine";

export default function FounderSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgX = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-dark-bg py-24 lg:py-32">
      <div className="container-gait">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <ScrollReveal direction="right">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
                Founder&apos;s story
              </p>
              <h2 className="anime-split font-bebas text-[clamp(40px,6vw,72px)] leading-[0.95] text-white">
                LED BY
                <br />
                <span className="anime-shimmer text-primary">VISION</span>
              </h2>
              <SplitLine className="my-8" />
              <p className="font-dm text-base leading-[1.9] text-muted">
                R.C. Ramesh Babu brings over 20 years of expertise in castings and SPM
                solutions. His leadership ensures every project meets the highest standards
                of quality and professionalism.
              </p>
              <p className="mt-8 font-dm text-2xl italic text-primary">
                R.C. Ramesh Babu
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                Founder & Director
              </p>
              <ul className="mt-10 space-y-4">
                {[
                  "30+ years of industry expertise",
                  "Specialist in Castings & SPM Solutions",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 font-dm text-white"
                  >
                    <span className="font-mono text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <motion.div style={{ x: imgX }} className="relative">
              <MagneticCard className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-dark-border">
                <Image
                  src="/images/about/founder.jpg"
                  alt="R.C. Ramesh Babu"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </MagneticCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
