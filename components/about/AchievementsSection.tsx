"use client";

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
import { staggerContainer, scaleIn } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  Handshake,
  Settings2,
  ShieldCheck,
  Lightbulb,
  TrendingDown,
  Layers,
};

export default function AchievementsSection() {
  return (
    <section className="section-padding bg-dark-bg">
      <div className="container-gait">
        <p className="mx-auto mb-16 max-w-[800px] text-center font-dm text-[clamp(20px,3vw,28px)] leading-relaxed text-muted">
          Shaping a future of engineering excellence through groundbreaking achievements
          and unwavering dedication
        </p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {achievements.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="rounded-lg border border-dark-border bg-dark-surface p-10 transition-all duration-300 hover:border-primary hover:bg-dark-elevated hover:shadow-[0_16px_48px_rgba(237,29,36,0.08)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                  <Icon size={28} className="text-primary" />
                </div>
                <h3 className="mt-6 font-dm text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 font-dm text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
