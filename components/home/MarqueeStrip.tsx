"use client";

import { motion } from "framer-motion";

const items = [
  "NON-FERROUS CASTINGS",
  "SPM DESIGN",
  "DIE CASTING",
  "PROTOTYPING",
  "FABRICATION",
  "QUALITY ASSURED",
];

export default function MarqueeStrip() {
  return (
    <section className="relative overflow-hidden border-y border-dark-border bg-dark-surface py-0">
      {/* Dual-direction marquees — not the old solid red bar */}
      <div className="flex flex-col gap-0">
        <div className="overflow-hidden py-5">
          <motion.div
            className="flex w-max gap-16 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {[...items, ...items].map((t, i) => (
              <span
                key={i}
                className="font-bebas text-3xl text-white/20 md:text-4xl"
              >
                {t}
                <span className="mx-8 text-primary">◆</span>
              </span>
            ))}
          </motion.div>
        </div>
        <div className="overflow-hidden border-t border-dark-border bg-dark-bg py-5">
          <motion.div
            className="flex w-max gap-16 whitespace-nowrap"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...items, ...items].reverse().map((t, i) => (
              <span
                key={i}
                className="font-mono text-xs uppercase tracking-[0.4em] text-primary/60"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
