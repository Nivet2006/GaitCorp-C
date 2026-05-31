"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-dark-bg py-24 lg:py-32">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(237,29,36,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(237,29,36,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(237,29,36,0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container-gait">
        <ScrollReveal className="mb-16 flex items-end justify-between">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
              Voices
            </p>
            <h2 className="font-bebas text-[clamp(40px,6vw,72px)] text-white">
              CLIENT TESTIMONIALS
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-dark-border transition-colors hover:border-primary hover:bg-primary/10"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-dark-border transition-colors hover:border-primary hover:bg-primary/10"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </ScrollReveal>

        {/* Single large card — not 3-column grid like gaitcorp.in */}
        <div className="relative min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 80, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -80, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-dark-border bg-dark-surface/80 p-10 backdrop-blur-xl md:p-16"
            >
              <div className="mb-8 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < t.stars ? "#ed1d24" : "transparent"}
                    color={i < t.stars ? "#ed1d24" : "#2a2a2a"}
                  />
                ))}
              </div>
              <blockquote className="mb-12 max-w-4xl font-dm text-xl leading-relaxed text-white/90 md:text-2xl md:leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary font-dm font-bold text-white">
                  {getInitials(t.author)}
                </div>
                <div>
                  <p className="font-dm text-lg font-semibold text-white">{t.author}</p>
                  <p className="font-mono text-xs text-muted">{t.designation}</p>
                </div>
                <span className="ml-auto font-mono text-6xl font-bold text-white/5">
                  0{index + 1}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2 sm:hidden">
          <button type="button" onClick={prev} aria-label="Previous">
            <ChevronLeft />
          </button>
          <button type="button" onClick={next} aria-label="Next">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
