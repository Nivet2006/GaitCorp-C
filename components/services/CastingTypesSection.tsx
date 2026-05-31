"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const sections = [
  {
    label: "Type 01",
    title: "Sand Casting",
    items: [
      { material: "Aluminium", image: "/images/products/Sand-cast1.jpg" },
      { material: "Brass", image: "/images/products/Sand-cast2.jpg" },
      { material: "Lead", image: "/images/products/sand-cast3.jpg" },
    ],
  },
  {
    label: "Type 02",
    title: "Gravity Die Casting",
    items: [
      { material: "Aluminium", image: "/images/products/gravity-die1.jpg" },
      { material: "Brass", image: "/images/products/gravity-die2.jpg" },
    ],
  },
  {
    label: "Type 03",
    title: "Pressure Die Casting",
    items: [
      { material: "Aluminium", image: "/images/products/pressure-die1.jpg" },
    ],
  },
];

export default function CastingTypesSection() {
  return (
    <section className="border-t border-dark-border bg-[#0f0f0f] py-24 lg:py-32">
      <div className="container-gait mb-16">
        <ScrollReveal direction="up">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
            Materials
          </p>
          <h2 className="font-bebas text-[clamp(40px,6vw,80px)] text-white">
            CASTING <span className="text-primary">SPECTRUM</span>
          </h2>
        </ScrollReveal>
      </div>

      <div className="space-y-32">
        {sections.map((section, si) => (
          <CastingBlock key={section.title} section={section} index={si} />
        ))}
      </div>
    </section>
  );
}

function CastingBlock({
  section,
  index,
}: {
  section: (typeof sections)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? "5%" : "-5%", index % 2 === 0 ? "-5%" : "5%"]);

  return (
    <div ref={ref} className="container-gait">
      <div className="mb-10 flex items-end justify-between gap-8">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
            {section.label}
          </span>
          <h3 className="mt-2 font-bebas text-5xl text-white">{section.title}</h3>
        </div>
        <span className="font-bebas text-8xl text-white/5">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <motion.div style={{ x }} className="flex gap-4 overflow-x-auto pb-4 lg:gap-6">
        {section.items.map((item, i) => (
          <motion.div
            key={item.material}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative h-[320px] w-[280px] shrink-0 overflow-hidden rounded-2xl border border-dark-border lg:h-[400px] lg:w-[360px]"
          >
            <Image
              src={item.image}
              alt={`${section.title} ${item.material}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="360px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {item.material}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
