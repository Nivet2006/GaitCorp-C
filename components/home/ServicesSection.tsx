"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { services } from "@/lib/data";
import { staggerContainer, scaleIn } from "@/lib/animations";

export default function ServicesSection() {
  return (
    <section className="section-padding bg-dark-bg">
      <div className="container-gait">
        <div className="mb-16 text-center">
          <SectionLabel className="justify-center">Our Services</SectionLabel>
          <h2 className="mx-auto max-w-4xl font-dm text-[clamp(36px,5vw,64px)] font-bold leading-tight text-white">
            Engineering excellence from feasibility to execution.
          </h2>
          <div className="mx-auto mt-6 h-0.5 w-16 bg-primary" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={scaleIn}
              whileHover="hover"
              className="group relative h-[360px] overflow-hidden rounded-lg"
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
              <div
                className="absolute inset-0 transition-all duration-500 group-hover:bg-[rgba(10,10,10,0.98)]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 60%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 border-b-[3px] border-transparent p-6 transition-all duration-300 group-hover:border-primary">
                <span className="mb-3 inline-block bg-primary px-3 py-1 font-mono text-[11px] uppercase text-white">
                  {service.category}
                </span>
                <h3 className="font-dm text-[22px] font-bold text-white">{service.title}</h3>
                <p className="mt-2 translate-y-5 font-dm text-sm text-muted opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {service.description}
                </p>
                <ArrowUpRight
                  size={24}
                  className="mt-4 translate-y-4 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                />
              </div>
            </motion.div>
          ))}

          <motion.div variants={scaleIn}>
            <Link
              href="/services"
              className="group flex h-[360px] flex-col items-center justify-center rounded-lg bg-primary transition-all duration-300 hover:scale-[1.02] hover:bg-primary-dark"
            >
              <ArrowUpRight size={48} className="mb-4 text-white" />
              <h3 className="font-bebas text-[32px] text-white">View All Services</h3>
              <p className="mt-2 font-dm text-sm text-white/80">
                See our complete capabilities →
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
