"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { slideLeft, slideRight } from "@/lib/animations";

export default function VisionMissionSection() {
  return (
    <>
      <section className="min-h-[600px] bg-dark-bg">
        <div className="grid min-h-[600px] lg:grid-cols-2">
          <div className="relative min-h-[400px] lg:min-h-full">
            <Image
              src="/images/about/our-vision.jpg"
              alt="Our Vision"
              fill
              className="object-cover parallax-img"
              sizes="50vw"
            />
          </div>
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center p-8 lg:p-16 xl:p-24"
          >
            <SectionLabel>Our Vision</SectionLabel>
            <h2 className="mb-6 font-bebas text-[64px] leading-tight text-white">
              Shaping the Future of Engineering with Innovation and Precision
            </h2>
            <p className="mb-6 max-w-lg font-dm text-base leading-relaxed text-muted">
              To be a leading provider of innovative, high-quality engineering solutions,
              setting benchmarks for precision and customer satisfaction in the manufacturing
              industry.
            </p>
            <div className="h-1 w-16 bg-primary" />
          </motion.div>
        </div>
      </section>

      <section className="min-h-[600px] bg-dark-surface">
        <div className="grid min-h-[600px] lg:grid-cols-2">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-2 flex flex-col justify-center p-8 lg:order-1 lg:p-16 xl:p-24"
          >
            <SectionLabel>Our Mission</SectionLabel>
            <h2 className="mb-6 font-bebas text-[64px] leading-tight text-white">
              Shaping the Future of Engineering with Innovation and Precision
            </h2>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="space-y-4"
            >
              {[
                "To deliver advanced engineering solutions with a focus on quality, efficiency, and innovation.",
                "To build lasting relationships by understanding and exceeding client expectations.",
                "To improve and adopt technologies to provide the best possible solutions.",
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex items-start gap-3 font-dm text-base text-white"
                >
                  <span className="text-primary">◆</span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <div className="relative order-1 min-h-[400px] lg:order-2 lg:min-h-full">
            <Image
              src="/images/about/our-mission.jpg"
              alt="Our Mission"
              fill
              className="object-cover parallax-img"
              sizes="50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
