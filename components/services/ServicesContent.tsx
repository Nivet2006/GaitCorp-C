"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { capabilities } from "@/lib/data";
import MagneticCard from "@/components/ui/MagneticCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ServicesContentProps {
  category: string;
  subcategory: string;
}

export default function ServicesContent({
  category,
  subcategory,
}: ServicesContentProps) {
  const key = `${category}-${subcategory}`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
          {category}
          {subcategory ? ` · ${subcategory}` : ""}
        </p>
        <h2 className="mb-12 font-bebas text-[clamp(36px,5vw,64px)] leading-[0.95] text-white">
          PRECISION PROTOTYPES,
          <br />
          <span className="text-primary">PRODUCTION READY</span>
        </h2>

        <div className="mb-20 space-y-4">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={cap.num} direction="left" delay={i * 0.08}>
              <MagneticCard
                tilt={6}
                className="glass-panel group flex gap-6 rounded-2xl p-6 transition-colors hover:border-primary/30"
              >
                <span className="font-bebas text-5xl text-primary/30 transition-colors group-hover:text-primary">
                  {cap.num}
                </span>
                <div>
                  <h3 className="font-dm text-xl font-semibold text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-2 font-dm text-sm text-muted">{cap.description}</p>
                </div>
              </MagneticCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
            Product showcase
          </p>
          <h3 className="mb-8 font-bebas text-4xl text-white">OUR PRODUCTS</h3>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-12">
          {[1, 2, 3].map((n, i) => (
            <ScrollReveal
              key={n}
              direction="scale"
              delay={i * 0.1}
              className={cnSpan(i)}
            >
              <div className="group relative min-h-[280px] overflow-hidden rounded-2xl border border-dark-border">
                <Image
                  src={`/images/products/our-product${n}.jpg`}
                  alt={`Product ${n}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 font-mono text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  0{n}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function cnSpan(i: number) {
  if (i === 0) return "md:col-span-7 md:row-span-2";
  return "md:col-span-5";
}
