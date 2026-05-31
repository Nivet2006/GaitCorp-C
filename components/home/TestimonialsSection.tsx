"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { testimonials } from "@/lib/data";
import { staggerContainer, fadeUp } from "@/lib/animations";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-dark-bg">
      <div className="container-gait">
        <div className="mb-16 text-center">
          <SectionLabel className="justify-center">Testimonials</SectionLabel>
          <h2 className="font-bebas text-[clamp(40px,6vw,64px)] text-white">
            What Our Clients Say
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="relative rounded-lg border border-dark-border bg-dark-surface p-8 transition-all duration-400 hover:border-primary hover:shadow-[0_20px_60px_rgba(237,29,36,0.1)]"
            >
              <span className="absolute left-6 top-4 font-bebas text-[80px] leading-none text-primary/20">
                &ldquo;
              </span>
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < t.stars ? "#ed1d24" : "#2a2a2a"}
                    color={i < t.stars ? "#ed1d24" : "#2a2a2a"}
                  />
                ))}
              </div>
              <p className="mb-6 font-dm text-base italic leading-relaxed text-[#a0a0a0]">
                {t.quote}
              </p>
              <div className="mb-6 h-px bg-dark-border" />
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-dm text-sm font-bold text-white">
                  {getInitials(t.author)}
                </div>
                <div>
                  <p className="font-dm font-semibold text-white">{t.author}</p>
                  <p className="font-dm text-[13px] text-muted">{t.designation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
