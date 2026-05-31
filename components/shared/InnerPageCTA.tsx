"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import SplitLine from "@/components/ui/SplitLine";

interface InnerPageCTAProps {
  label?: string;
  title: string;
  href?: string;
  buttonText?: string;
}

export default function InnerPageCTA({
  label = "Next step",
  title,
  href = "/contact",
  buttonText = "Start a Project",
}: InnerPageCTAProps) {
  return (
    <section className="relative overflow-hidden border-t border-dark-border bg-dark-surface py-24 lg:py-32">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(circle at 0% 50%, rgba(237,29,36,0.2), transparent 50%)",
            "radial-gradient(circle at 100% 50%, rgba(237,29,36,0.2), transparent 50%)",
            "radial-gradient(circle at 0% 50%, rgba(237,29,36,0.2), transparent 50%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <div className="container-gait relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
            {label}
          </p>
          <h2 className="max-w-2xl font-bebas text-[clamp(36px,6vw,64px)] leading-[0.95] text-white">
            {title}
          </h2>
          <SplitLine className="mt-8 max-w-xs" />
        </div>
        <MagneticButton href={href}>{buttonText}</MagneticButton>
      </div>
    </section>
  );
}
