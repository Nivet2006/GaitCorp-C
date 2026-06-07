"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { usePinHorizontalScroll } from "@/lib/scroll-hooks";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ServicesSection() {
  const pinRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  usePinHorizontalScroll(pinRef, trackRef);

  return (
    <section ref={pinRef} className="relative bg-[#0f0f0f]">
      <div className="container-gait py-20">
        <ScrollReveal direction="up">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
                Capabilities
              </p>
              <h2 className="anime-split max-w-2xl font-bebas text-[clamp(40px,6vw,80px)] leading-[0.95] text-white">
                SCROLL THROUGH
                <br />
                OUR ENGINEERING STACK
              </h2>
            </div>
            <p className="max-w-sm font-dm text-sm text-muted">
              Scroll to drive a pinned horizontal gallery of our core engineering disciplines.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* GSAP-pinned horizontal track */}
      <div className="h-screen overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full items-center gap-6 px-6 will-change-transform lg:px-16"
          style={{ width: "max-content" }}
        >
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, rotateY: -8 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="anime-reveal-rotate anime-magnetic group relative h-[70vh] w-[85vw] shrink-0 overflow-hidden rounded-2xl border border-dark-border md:w-[420px] lg:w-[480px]"
              style={{ perspective: 1000 }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="480px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="mb-4 font-mono text-[10px] tracking-[0.3em] text-primary">
                  0{i + 1} — {service.category}
                </span>
                <h3 className="mb-3 font-dm text-3xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="max-h-0 overflow-hidden font-dm text-sm text-muted opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                  {service.description}
                </p>
                <ArrowUpRight
                  className="mt-4 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                  size={28}
                />
              </div>
            </motion.article>
          ))}

          <Link
            href="/services"
            data-cursor-hover
            className="anime-pop anime-glow flex h-[70vh] w-[85vw] shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 transition-colors hover:bg-primary/10 md:w-[320px]"
          >
            <ArrowUpRight size={56} className="mb-6 text-primary" />
            <span className="font-bebas text-4xl text-white">ALL SERVICES</span>
            <span className="mt-2 font-mono text-xs text-muted">EXPLORE →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
