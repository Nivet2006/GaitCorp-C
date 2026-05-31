"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

const ease = [0.16, 1, 0.3, 1] as const;
const AUTO_ADVANCE_MS = 6000;
const spring = { type: "spring" as const, stiffness: 260, damping: 32 };
const GOLD = "#f5c542";
const GOLD_LIGHT = "#ffe08a";
const GOLD_DARK = "#c9971a";

function SparklingStar({
  filled,
  index,
  active,
}: {
  filled: boolean;
  index: number;
  active: boolean;
}) {
  return (
    <motion.span
      className="relative inline-flex"
      initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
      animate={
        active
          ? {
              opacity: 1,
              scale: 1,
              rotate: 0,
            }
          : { opacity: 0, scale: 0.4, rotate: -20 }
      }
      transition={{ duration: 0.45, delay: index * 0.08, ease }}
    >
      {filled && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full blur-sm"
          style={{ background: `radial-gradient(circle, ${GOLD_LIGHT} 0%, transparent 70%)` }}
          animate={
            active
              ? {
                  opacity: [0.12, 0.28, 0.12],
                  scale: [0.95, 1.08, 0.95],
                }
              : { opacity: 0, scale: 0.95 }
          }
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: index * 0.35,
            ease: "easeInOut",
          }}
        />
      )}
      <motion.span
        animate={
          active && filled
            ? {
                filter: [
                  `drop-shadow(0 0 1px ${GOLD}) drop-shadow(0 0 3px ${GOLD_LIGHT})`,
                  `drop-shadow(0 0 2px ${GOLD_LIGHT}) drop-shadow(0 0 5px ${GOLD})`,
                  `drop-shadow(0 0 1px ${GOLD}) drop-shadow(0 0 3px ${GOLD_LIGHT})`,
                ],
                scale: [1, 1.06, 1],
              }
            : { filter: "none", scale: 1 }
        }
        transition={{
          duration: 2.4,
          repeat: Infinity,
          delay: index * 0.3,
          ease: "easeInOut",
        }}
      >
        <Star
          size={20}
          fill={filled ? GOLD : "transparent"}
          color={filled ? GOLD_DARK : "#2a2a2a"}
          strokeWidth={filled ? 1.5 : 1.75}
        />
      </motion.span>
    </motion.span>
  );
}

const slideContent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const slideItem = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease },
  },
};

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({
  testimonial,
  slideIndex,
  active,
}: {
  testimonial: Testimonial;
  slideIndex: number;
  active: boolean;
}) {
  return (
    <motion.div
      variants={slideContent}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      className="rounded-2xl border border-dark-border bg-dark-surface/80 p-10 backdrop-blur-xl md:p-16"
    >
      <motion.div variants={slideItem} className="mb-8 flex gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <SparklingStar
            key={i}
            index={i}
            active={active}
            filled={i < testimonial.stars}
          />
        ))}
      </motion.div>
      <motion.blockquote
        variants={slideItem}
        className="mb-12 max-w-4xl font-dm text-xl leading-relaxed text-white/90 md:text-2xl md:leading-relaxed"
      >
        &ldquo;{testimonial.quote}&rdquo;
      </motion.blockquote>
      <motion.div variants={slideItem} className="flex items-center gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary font-dm font-bold text-white">
          {getInitials(testimonial.author)}
        </div>
        <div>
          <p className="font-dm text-lg font-semibold text-white">
            {testimonial.author}
          </p>
          <p className="font-mono text-xs text-muted">{testimonial.designation}</p>
        </div>
        <span className="ml-auto font-mono text-6xl font-bold text-white/5">
          0{slideIndex + 1}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + testimonials.length) % testimonials.length);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [paused]);

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

        <div
          className="relative min-h-[360px] overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${index * 100}%` }}
            transition={spring}
          >
            {testimonials.map((testimonial, i) => (
              <div key={testimonial.author + i} className="w-full shrink-0">
                <TestimonialCard
                  testimonial={testimonial}
                  slideIndex={i}
                  active={index === i}
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="py-2"
            >
              <motion.div
                className="h-1.5 rounded-full"
                animate={{
                  width: i === index ? 32 : 8,
                  backgroundColor: i === index ? "#ed1d24" : "#2a2a2a",
                }}
                transition={spring}
              />
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2 sm:hidden">
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
