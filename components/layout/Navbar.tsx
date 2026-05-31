"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Phone, Mail, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-10 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-dark-border bg-dark-bg/95 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="container-gait flex h-20 items-center justify-between">
          <Link href="/" className="relative z-10 shrink-0">
            <Image
              src="/logo.svg"
              alt="Gait Engineers"
              width={140}
              height={50}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "nav-link",
                  pathname === link.path && "active text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href="tel:+919449262225"
              className="flex items-center gap-2 font-mono text-xs text-muted"
            >
              <Phone size={14} className="text-primary" />
              +91 94492 62225
            </a>
            <a
              href="mailto:ramesh@gaitcorp.in"
              className="flex items-center gap-2 font-mono text-xs text-muted"
            >
              <Mail size={14} className="text-primary" />
              ramesh@gaitcorp.in
            </a>
          </div>

          <button
            type="button"
            className="relative z-50 text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-dark-bg lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "font-dm text-2xl text-white",
                      pathname === link.path && "text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
