"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SplitLine from "@/components/ui/SplitLine";

interface PageHeroProps {
  title: string;
  breadcrumb: string;
  subtitle?: string;
  description?: string;
}

export default function PageHero({
  title,
  breadcrumb,
  subtitle,
  description,
}: PageHeroProps) {
  const parts = breadcrumb.split(" / ");

  return (
    <section className="relative overflow-hidden bg-dark-bg pt-32 pb-16 lg:pt-40 lg:pb-24">
      <motion.div
        className="pointer-events-none absolute -right-10 top-0 font-bebas text-[30vw] leading-none text-white/[0.03]"
        initial={{ x: 40 }}
        animate={{ x: 0 }}
        transition={{ duration: 1.2 }}
      >
        {title.split(" ")[0]}
      </motion.div>

      <div className="container-gait relative">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 font-mono text-[10px] uppercase tracking-[0.35em] text-muted"
        >
          {parts.map((part, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2 text-primary">/</span>}
              {i === parts.length - 1 ? (
                <span className="text-primary">{part}</span>
              ) : (
                <Link href={i === 0 ? "/" : "#"} className="hover:text-white">
                  {part}
                </Link>
              )}
            </span>
          ))}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="anime-split font-bebas text-[clamp(56px,10vw,120px)] leading-[0.9] text-white"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-4 font-dm text-xl text-primary"
          >
            {subtitle}
          </motion.p>
        )}
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-4 max-w-xl font-dm text-muted"
          >
            {description}
          </motion.p>
        )}
        <SplitLine className="mt-10 max-w-md" />
      </div>
    </section>
  );
}
