"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Handshake,
  Settings2,
  ShieldCheck,
  Lightbulb,
  TrendingDown,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { achievements } from "@/lib/data";
import { usePinHorizontalScroll } from "@/lib/scroll-hooks";
import ScrollReveal from "@/components/ui/ScrollReveal";

const iconMap: Record<string, LucideIcon> = {
  Handshake,
  Settings2,
  ShieldCheck,
  Lightbulb,
  TrendingDown,
  Layers,
};

export default function AchievementsSection() {
  const pinRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  usePinHorizontalScroll(pinRef, trackRef);

  return (
    <section className="bg-[#0f0f0f]">
      <div className="container-gait py-20">
        <ScrollReveal direction="up">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
            Milestones
          </p>
          <h2 className="anime-split max-w-3xl font-bebas text-[clamp(40px,6vw,72px)] leading-[0.95] text-white">
            ACHIEVEMENTS THAT
            <span className="anime-wave text-primary"> DEFINE US</span>
          </h2>
        </ScrollReveal>
      </div>

      <section ref={pinRef} className="relative h-screen overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full items-stretch gap-6 px-6 will-change-transform lg:px-16"
        >
          {achievements.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="anime-reveal-rotate anime-glow flex h-[70vh] w-[85vw] shrink-0 flex-col justify-between rounded-2xl border border-dark-border bg-dark-surface p-10 md:w-[400px]"
              >
                <div>
                  <span className="font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-8 flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                    <Icon size={32} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-dm text-2xl font-bold text-white">{item.title}</h3>
                  <p className="mt-4 font-dm text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </section>
  );
}
