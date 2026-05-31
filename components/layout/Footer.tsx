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
        GAIT ENGINEERING
      </motion.div>

      <div className="container-gait relative py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Image src="/logo.svg" alt="GAIT" width={140} height={50} className="mb-6" />
            <p className="max-w-xs font-dm text-sm text-muted">
              Precision non-ferrous castings & SPM — Bangalore, India.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-12 gap-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-primary"
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
          <p className="font-mono text-[10px] text-[#4a4a4a]">
            <a
              href="https://devcreationsblr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Dev Creations and Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
