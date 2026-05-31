"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { slideLeft, slideRight } from "@/lib/animations";

export default function FounderSection() {
  return (
    <section className="section-padding bg-[#0f0f0f]">
      <div className="container-gait">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
            <div className="absolute -left-1.5 -top-1.5 h-[60px] w-[60px] border-l-[3px] border-t-[3px] border-primary" />
            <div className="absolute -bottom-1.5 -right-1.5 h-[60px] w-[60px] border-b-[3px] border-r-[3px] border-primary" />
            <div className="absolute -bottom-4 -left-4 grid grid-cols-5 gap-2 opacity-30">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-primary" />
              ))}
            </div>
            <div className="relative h-[560px] overflow-hidden">
              <Image
                src="/images/about/founder.jpg"
                alt="R.C. Ramesh Babu, Founder"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionLabel>Founder&apos;s Story</SectionLabel>
            <h2 className="mb-6 font-dm text-[40px] font-bold text-white">
              Engineering Excellence, Led by Vision
            </h2>
            <p className="mb-8 font-dm text-base leading-[1.9] text-muted">
              R.C. Ramesh Babu, the driving force behind Gait Engineers, brings over 20 years
              of expertise in castings and SPM solutions. With a deep understanding of
              manufacturing and a passion for precision, he founded Gait Engineers to deliver
              reliable, efficient, and innovative solutions. His leadership ensures every
              project meets the highest standards of quality and professionalism.
            </p>
            <p className="mb-2 font-dm text-2xl italic text-primary underline decoration-primary decoration-1 underline-offset-4">
              R.C. Ramesh Babu
            </p>
            <p className="mb-8 font-mono text-xs text-muted">
              Founder & Director, Gait Engineering Works
            </p>
            <ul className="space-y-3">
              {[
                "20+ years of industry expertise",
                "Specialist in Castings & SPM Solutions",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-dm text-white">
                  <span className="text-primary">◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
