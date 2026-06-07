"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { contactInfo } from "@/lib/data";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-dark-border bg-dark-bg">
      <motion.div
        className="pointer-events-none absolute -bottom-20 left-0 right-0 text-center font-bebas text-[18vw] leading-none text-white/[0.02]"
        initial={{ x: "0%" }}
        whileInView={{ x: "-10%" }}
        viewport={{ once: false }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      >
        GAIT ENGINEERINS
      </motion.div>

      <div className="container-gait relative py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Image
              src="/no-bg-logo-main.png"
              alt="GAIT Engineers"
              width={160}
              height={94}
              className="mb-6 h-24 w-auto"
            />
            <p className="anime-reveal-left max-w-xs font-dm text-sm text-muted">
              Precision non-ferrous castings & SPM — Bangalore, India.
            </p>
          </div>

          <nav className="anime-stagger flex flex-wrap gap-x-12 gap-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="anime-reveal anime-magnetic group flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-primary"
              >
                {link.label}
                <ArrowUpRight
                  size={12}
                  className="opacity-0 transition-all group-hover:opacity-100"
                />
              </Link>
            ))}
          </nav>

          <div className="font-mono text-xs text-muted">
            <a href={`tel:${contactInfo.phone}`} className="block hover:text-primary">
              {contactInfo.phone}
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="mt-2 block hover:text-primary"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-dark-border pt-8 sm:flex-row">
          <p className="font-mono text-[10px] text-[#4a4a4a]">
            ©2025 Gait Engineering Works
          </p>
          <motion.a
            href="https://devcreationsblr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex"
            aria-label="Dev Creations and Solutions"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <motion.span
              className="pointer-events-none absolute inset-0 -inset-x-4 -inset-y-2 rounded-full blur-xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, transparent 70%)",
              }}
              variants={{
                rest: { opacity: 0, scale: 0.8 },
                hover: { opacity: 1, scale: 1.15 },
                tap: { opacity: 0.7, scale: 1 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            />
            <motion.span
              variants={{
                rest: {
                  scale: 1,
                  filter: "drop-shadow(0 0 0px rgba(255,255,255,0))",
                },
                hover: {
                  scale: 1.05,
                  filter:
                    "drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 18px rgba(255,255,255,0.55)) drop-shadow(0 0 32px rgba(255,255,255,0.25))",
                },
                tap: { scale: 0.98 },
              }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
            >
              <Image
                src="/dot-work-white.png"
                alt="Dev Creations and Solutions"
                width={240}
                height={160}
                className="relative z-10 h-20 w-auto sm:h-24"
              />
            </motion.span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
