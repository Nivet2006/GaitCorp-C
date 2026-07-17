"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SplitLine from "@/components/ui/SplitLine";

export default function FounderSection() {

  return (
    <section className="relative overflow-hidden bg-dark-bg py-24 lg:py-32">
      <div className="container-gait">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="w-full">
            <ScrollReveal direction="up">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
                Founder&apos;s story
              </p>
              <h2 className="anime-split font-bebas text-[clamp(40px,6vw,72px)] leading-[0.95] text-white">
                LED BY
                <br />
                <span className="anime-shimmer text-primary">VISION</span>
              </h2>
              <SplitLine className="my-8 mx-auto" />
              <p className="font-dm text-base leading-[1.9] text-muted">
                R.C. Ramesh Babu brings over 20 years of expertise in castings and SPM
                solutions. His leadership ensures every project meets the highest standards
                of quality and professionalism.
              </p>
              <p className="mt-8 font-dm text-2xl italic text-primary">
                R.C. Ramesh Babu
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                Founder & Director
              </p>
              <ul className="mt-10 space-y-4 inline-block text-left">
                {[
                  "30+ years of industry expertise",
                  "Specialist in Castings & SPM Solutions",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 font-dm text-white"
                  >
                    <span className="font-mono text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
