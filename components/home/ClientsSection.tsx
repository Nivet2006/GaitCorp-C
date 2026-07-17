"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { clients } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";

const AUTO_ADVANCE_MS = 2000;

export default function ClientsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);


  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % clients.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="relative overflow-hidden bg-dark-surface py-24 lg:py-32">
      <div className="container-gait">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <ScrollReveal direction="left">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
              Alliances
            </p>
            <h2 className="anime-split font-bebas text-[clamp(40px,6vw,72px)] leading-[0.95] text-white">
              TRUSTED BY
              <br />
              <span className="anime-wave text-primary">INDUSTRY LEADERS</span>
            </h2>
            <p className="mt-6 font-dm text-muted">
              Explore our partner constellation — hover each node to reveal the alliance.
            </p>
          </ScrollReveal>

          {/* Orbital logo display */}
          <div
            className="anime-reveal-scale relative mx-auto flex h-[320px] w-[320px] items-center justify-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <motion.div
              className="anime-spin absolute inset-0 rounded-full border border-dark-border"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="anime-spin-reverse absolute inset-8 rounded-full border border-primary/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="anime-glow relative z-10 flex h-32 w-48 items-center justify-center rounded-xl border border-dark-border bg-dark-elevated p-6"
              >
                <Image
                  src={clients[active % clients.length].src}
                  alt={clients[active % clients.length].alt}
                  width={140}
                  height={70}
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
            {clients.map((client, i) => {
              const angle = (i / clients.length) * Math.PI * 2 - Math.PI / 2;
              const r = 140;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              return (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setActive(i % clients.length)}
                  onFocus={() => setActive(i % clients.length)}
                  className="anime-pop anime-magnetic absolute flex h-14 w-14 items-center justify-center rounded-full border border-dark-border bg-dark-bg transition-all hover:scale-110 hover:border-primary"
                  style={{
                    left: `calc(50% + ${x}px - 28px)`,
                    top: `calc(50% + ${y}px - 28px)`,
                  }}
                >
                  <Image
                    src={client.src}
                    alt={client.alt}
                    width={36}
                    height={20}
                    className="object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
