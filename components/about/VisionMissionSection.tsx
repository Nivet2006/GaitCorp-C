"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function VisionMissionSection() {
  return (
    <>
      <PinnedPanel
        label="Vision"
        index="01"
        title="SHAPING TOMORROW'S ENGINEERING"
        body="To be a leading provider of innovative, high-quality engineering solutions, setting benchmarks for precision and customer satisfaction in the manufacturing industry."
        image="/images/about/our-vision.jpg"
        imageSide="right"
      />
      <PinnedPanel
        label="Mission"
        index="02"
        title="INNOVATION WITH PRECISION"
        body=""
        bullets={[
          "Deliver advanced engineering solutions with focus on quality, efficiency, and innovation.",
          "Build lasting relationships by exceeding client expectations.",
          "Adopt future-ready technologies for the best possible outcomes.",
        ]}
        image="/images/about/our-mission.jpg"
        imageSide="left"
        dark
      />
    </>
  );
}

function PinnedPanel({
  label,
  index,
  title,
  body,
  bullets,
  image,
  imageSide,
  dark,
}: {
  label: string;
  index: string;
  title: string;
  body: string;
  bullets?: string[];
  image: string;
  imageSide: "left" | "right";
  dark?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      className={`relative min-h-screen overflow-hidden ${dark ? "bg-dark-surface" : "bg-dark-bg"}`}
    >
      <div
        className={`grid min-h-screen lg:grid-cols-2 ${
          imageSide === "left" ? "" : ""
        }`}
      >
        <motion.div
          className={`relative min-h-[50vh] lg:min-h-full ${
            imageSide === "right" ? "lg:order-2" : ""
          }`}
          style={{ scale: imgScale }}
        >
          <Image src={image} alt={label} fill className="object-cover" sizes="50vw" />
          <div className="absolute inset-0 bg-dark-bg/30" />
        </motion.div>

        <motion.div
          style={{ y: textY }}
          className={`flex flex-col justify-center p-8 lg:p-20 xl:p-28 ${
            imageSide === "right" ? "lg:order-1" : ""
          }`}
        >
          <ScrollReveal direction="up">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
              {label} · {index}
            </span>
            <h2 className="anime-split anime-reveal mt-4 font-bebas text-[clamp(40px,6vw,72px)] leading-[0.95] text-white">
              {title}
            </h2>
            {body && (
              <p className="mt-6 max-w-lg font-dm text-lg leading-relaxed text-muted">
                {body}
              </p>
            )}
            {bullets && (
              <ul className="mt-8 space-y-4">
                {bullets.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="anime-reveal-left border-l-2 border-primary/40 pl-6 font-dm text-white"
                  >
                    {b}
                  </motion.li>
                ))}
              </ul>
            )}
          </ScrollReveal>
        </motion.div>
      </div>
    </section>
  );
}
