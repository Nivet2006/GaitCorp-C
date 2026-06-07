"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Info, Wrench, Images, Mail, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof Home> = {
  "/": Home,
  "/about": Info,
  "/services": Wrench,
  "/gallery": Images,
  "/contact": Mail,
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.div
        className="fixed left-4 top-4 z-50 sm:left-6 sm:top-6 lg:left-10 lg:top-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/" className="block">
          <motion.div
            className="relative flex items-center overflow-hidden rounded-2xl border border-white/10 bg-dark-bg/90 px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={{
              rest: {
                scale: 1,
                y: 0,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.45)",
              },
              hover: {
                scale: 1.05,
                y: -3,
                boxShadow:
                  "0 14px 40px rgba(237, 29, 36, 0.18), 0 8px 32px rgba(0, 0, 0, 0.55)",
              },
              tap: { scale: 0.98, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent"
              variants={{
                rest: { borderColor: "rgba(255, 255, 255, 0.1)" },
                hover: { borderColor: "rgba(237, 29, 36, 0.5)" },
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-primary/25 to-transparent"
              variants={{
                rest: { x: "-120%", opacity: 0 },
                hover: { x: "120%", opacity: 1 },
              }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.04 },
                tap: { scale: 0.98 },
              }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              <Image
                src="/no-bg-logo-main.png"
                alt="GAIT Engineers"
                width={120}
                height={70}
                className="relative z-10 h-14 w-auto"
                priority
              />
            </motion.div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Floating dock nav — completely unlike gaitcorp.in top menu */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 lg:flex"
      >
        <div
          data-anime-nav-dock
          className="anime-shimmer flex items-center gap-1 rounded-full border border-white/10 bg-dark-bg/80 px-2 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          {navLinks.map((link) => {
            const Icon = iconMap[link.path] ?? Home;
            const active = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                data-cursor-hover
                className={cn(
                  "anime-magnetic group relative flex items-center gap-2 rounded-full px-4 py-2.5 transition-all duration-300",
                  active ? "anime-glow bg-primary text-white" : "text-muted hover:text-white"
                )}
              >
                <Icon size={16} />
                <span
                  className={cn(
                    "max-w-0 overflow-hidden font-mono text-[10px] uppercase tracking-widest transition-all duration-300 group-hover:max-w-[120px]",
                    active && "max-w-[120px]"
                  )}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-dark-bg/80 backdrop-blur-md lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-dark-bg"
          >
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-6 top-6 text-white"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
              }}
              className="flex flex-1 flex-col justify-center px-12"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  variants={{
                    hidden: { opacity: 0, x: 60 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-dark-border py-6"
                  >
                    <span className="font-mono text-xs text-primary">
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "font-bebas text-5xl text-white transition-colors group-hover:text-primary",
                        pathname === link.path && "text-primary"
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <div className="border-t border-dark-border p-8 font-mono text-xs text-muted">
              <a href="tel:+919449262225" className="block hover:text-primary">
                +91 94492 62225
              </a>
              <a href="mailto:ramesh@gaitcorp.in" className="mt-2 block hover:text-primary">
                ramesh@gaitcorp.in
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
