"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import ParallaxImage from "@/components/ui/ParallaxImage";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { slideLeft, slideRight } from "@/lib/animations";

const bullets = [
  "Providing comprehensive end-to-end project execution for maximum efficiency",
  "Ensuring precision, quality, and timely delivery in every project",
  "Delivering high-performance die casting and SPM solutions with cutting-edge technology",
];

const stats = [
  { target: 20, suffix: "+", label: "Years of Expertise" },
  { target: 500, suffix: "+", label: "Projects Delivered" },
  { target: 100, suffix: "%", label: "On-Time Delivery" },
];

export default function AboutSection() {
  return (
    <motion.section
      className="section-padding bg-[#0f0f0f]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container-gait">
        <div className="grid items-center gap-16 lg:grid-cols-5">
          <motion.div variants={slideLeft} className="lg:col-span-3">
            <SectionLabel>About Our Company</SectionLabel>
            <RevealText
              text="DRIVEN BY EXPERIENCE, DEFINED BY PRECISION"
              className="section-title mb-6 font-bebas text-white"
            />
            <p className="mb-8 max-w-[520px] font-dm text-base text-muted">
              Gait Engineers is led by a professional with over two decades of industry
              expertise, specializing in castings manufacturing and SPM (Special Purpose
              Machines) consulting. We provide end-to-end solutions, from feasibility
              studies to project execution, ensuring quality and efficiency.
            </p>
            <ul className="mb-12 space-y-4">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="group flex items-start gap-3 border-l-2 border-transparent pl-4 transition-colors hover:border-primary/30"
                >
                  <ChevronRight size={16} className="mt-1 shrink-0 text-primary" />
                  <span className="font-dm text-[15px] text-white">{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-8">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8">
                  {i > 0 && <div className="h-16 w-px bg-dark-border" />}
                  <div>
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                      className="font-bebas text-6xl text-primary"
                    />
                    <p className="font-mono text-xs uppercase text-muted">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={slideRight} className="relative lg:col-span-2">
            <span className="pointer-events-none absolute -left-4 top-1/4 font-bebas text-[100px] leading-none text-primary/[0.04]">
              Our Company
            </span>
            <div className="relative">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-2 top-[20%] z-10 h-[60%] w-1 origin-top bg-primary"
              />
              <ParallaxImage
                src="/images/about/about_worker.jpg"
                alt="Gait engineering team at work"
                height={500}
                className="rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
