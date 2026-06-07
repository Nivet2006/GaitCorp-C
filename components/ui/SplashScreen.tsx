"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createTimeline, stagger, splitText } from "animejs";

const SPLASH_KEY = "gait-splash-seen";
const MIN_DURATION_MS = 3800;

interface SplashScreenProps {
  onComplete: () => void;
}

export function shouldSkipSplash(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SPLASH_KEY) === "1";
}

export function markSplashSeen(): void {
  sessionStorage.setItem(SPLASH_KEY, "1");
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"active" | "exit" | "done">("active");
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const startTime = useRef(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.classList.remove("cursor-custom");
    startTime.current = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      const pct = Math.min(100, Math.round((elapsed / MIN_DURATION_MS) * 100));
      setProgress(pct);
    }, 40);

    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, MIN_DURATION_MS);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;

    const gridLines = rootRef.current.querySelectorAll("[data-splash-grid]");
    const brackets = rootRef.current.querySelectorAll("[data-splash-bracket]");
    const logo = rootRef.current.querySelector("[data-splash-logo]");
    const subtitle = rootRef.current.querySelector("[data-splash-subtitle]");
    const statusLines = rootRef.current.querySelectorAll("[data-splash-status]");
    const scanLine = rootRef.current.querySelector("[data-splash-scan]");

    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(gridLines, {
      opacity: [0, 1],
      scale: [1.05, 1],
      duration: 900,
      delay: stagger(40),
    })
      .add(brackets, {
        opacity: [0, 1],
        scale: [1.4, 1],
        duration: 700,
        delay: stagger(60, { from: "center" }),
        ease: "outBack",
      }, 200);

    if (scanLine) {
      tl.add(scanLine, {
        translateY: ["-100%", "200%"],
        opacity: [0, 0.6, 0],
        duration: 1400,
        ease: "inOutSine",
      }, 400);
    }

    if (logo) {
      tl.add(logo, {
        opacity: [0, 1],
        scale: [0.7, 1],
        rotate: [-6, 0],
        duration: 900,
        ease: "outBack",
      }, 500);
    }

    if (titleRef.current) {
      const split = splitText(titleRef.current, { chars: true });
      tl.add(split.chars, {
        opacity: [0, 1],
        y: [40, 0],
        rotateX: [-90, 0],
        duration: 700,
        delay: stagger(35, { from: "center" }),
        ease: "outBack",
      }, 900);
    }

    if (subtitle) {
      tl.add(subtitle, {
        opacity: [0, 1],
        x: [-30, 0],
        duration: 600,
      }, 1400);
    }

    tl.add(statusLines, {
      opacity: [0, 1],
      x: [20, 0],
      duration: 500,
      delay: stagger(120),
    }, 1600);

    return () => {
      tl.revert();
    };
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    const timer = setTimeout(() => {
      setPhase("done");
      markSplashSeen();
      document.body.style.overflow = "";
      onComplete();
    }, 950);
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {(phase === "active" || phase === "exit") && (
        <motion.div
          key="splash"
          ref={rootRef}
          className="fixed inset-0 z-[10050] flex items-center justify-center overflow-hidden bg-[#050505]"
        >
          {/* Top exit panel */}
          <motion.div
            className="absolute inset-x-0 top-0 z-20 h-1/2 bg-[#050505]"
            initial={{ y: 0 }}
            animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Bottom exit panel */}
          <motion.div
            className="absolute inset-x-0 bottom-0 z-20 h-1/2 bg-[#050505]"
            initial={{ y: 0 }}
            animate={phase === "exit" ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Blueprint grid */}
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  data-splash-grid
                  x1={`${(i + 1) * (100 / 13)}%`}
                  y1="0"
                  x2={`${(i + 1) * (100 / 13)}%`}
                  y2="100%"
                  stroke="rgba(237,29,36,0.12)"
                  strokeWidth="0.5"
                  opacity={0}
                />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  data-splash-grid
                  x1="0"
                  y1={`${(i + 1) * (100 / 9)}%`}
                  x2="100%"
                  y2={`${(i + 1) * (100 / 9)}%`}
                  stroke="rgba(237,29,36,0.12)"
                  strokeWidth="0.5"
                  opacity={0}
                />
              ))}
            </svg>
          </div>

          {/* Radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(237,29,36,0.14) 0%, transparent 55%)",
            }}
          />

          {/* Scan line */}
          <div
            data-splash-scan
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0"
          />

          {/* Corner brackets */}
          {(
            [
              "top-8 left-8 border-l border-t",
              "top-8 right-8 border-r border-t",
              "bottom-8 left-8 border-l border-b",
              "bottom-8 right-8 border-r border-b",
            ] as const
          ).map((cls) => (
            <span
              key={cls}
              data-splash-bracket
              className={`pointer-events-none absolute h-12 w-12 border-primary/60 opacity-0 sm:h-16 sm:w-16 ${cls}`}
            />
          ))}

          {/* HUD readouts */}
          <div className="pointer-events-none absolute left-6 top-8 hidden font-mono text-[9px] uppercase tracking-[0.3em] text-muted sm:block">
            <p data-splash-status className="opacity-0">
              SYS · BOOT SEQUENCE
            </p>
            <p data-splash-status className="mt-2 opacity-0 text-primary">
              GAIT-CORP / v2.0
            </p>
          </div>
          <div className="pointer-events-none absolute right-6 top-8 hidden text-right font-mono text-[9px] uppercase tracking-[0.3em] text-muted sm:block">
            <p data-splash-status className="opacity-0">
              Bangalore · India
            </p>
            <p data-splash-status className="mt-2 opacity-0">
              Est. 20+ Years
            </p>
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <div data-splash-logo className="relative mb-8 opacity-0">
              <div className="absolute -inset-6 rounded-full bg-primary/20 blur-2xl" />
              <Image
                src="/no-bg-logo-main.png"
                alt="GAIT Engineering Works"
                width={200}
                height={117}
                priority
                className="relative h-24 w-auto sm:h-32"
              />
            </div>

            <h1
              ref={titleRef}
              className="font-bebas text-[clamp(52px,12vw,120px)] leading-none tracking-wide text-white"
              style={{ perspective: "600px" }}
            >
              GAIT ENGINEERING
            </h1>

            <p
              data-splash-subtitle
              className="mt-4 max-w-md font-mono text-[10px] uppercase tracking-[0.45em] text-primary opacity-0 sm:text-xs"
            >
              Precision Castings &amp; Special Purpose Machines
            </p>

            {/* Progress */}
            <div className="mt-12 w-56 sm:w-72">
              <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-muted">
                <span>Initializing</span>
                <span className="text-primary">{progress}%</span>
              </div>
              <div className="h-px overflow-hidden bg-white/10">
                <motion.div
                  className="h-full origin-left bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
            </div>
          </div>

          {/* Bottom status */}
          <div className="pointer-events-none absolute bottom-8 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-[0.35em] text-muted/70">
            <p data-splash-status className="opacity-0">
              Non-Ferrous Castings · SPM Design · Die Casting
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
