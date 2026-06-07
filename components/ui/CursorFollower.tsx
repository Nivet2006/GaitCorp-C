"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const BRACKET = 10;
const GAP = 14;

export default function CursorFollower() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 280, damping: 32 });
  const springY = useSpring(cursorY, { stiffness: 280, damping: 32 });
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    setIsDesktop(mq.matches);
    document.documentElement.classList.toggle("cursor-custom", mq.matches);

    const onResize = () => {
      setIsDesktop(mq.matches);
      document.documentElement.classList.toggle("cursor-custom", mq.matches);
    };
    mq.addEventListener("change", onResize);

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest("a, button, [data-cursor-hover], input, textarea, select, label")
      );
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      mq.removeEventListener("change", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  const spread = isHovering ? GAP + 10 : GAP;
  const bracketLen = isHovering ? BRACKET + 4 : BRACKET;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
          opacity: isHovering ? 0.35 : 0.15,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      />

      {/* Precision reticle */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ x: springX, y: springY }}
        animate={{ scale: isClicking ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Corner brackets — precision targeting reticle */}
        <motion.span
          className="absolute border-l-[1.5px] border-t-[1.5px] border-solid"
          style={{
            top: -spread,
            left: -spread,
            width: bracketLen,
            height: bracketLen,
            borderColor: isHovering ? "#ed1d24" : "rgba(255,255,255,0.7)",
          }}
        />
        <motion.span
          className="absolute border-r-[1.5px] border-t-[1.5px] border-solid"
          style={{
            top: -spread,
            right: -spread,
            width: bracketLen,
            height: bracketLen,
            borderColor: isHovering ? "#ed1d24" : "rgba(255,255,255,0.7)",
          }}
        />
        <motion.span
          className="absolute border-b-[1.5px] border-l-[1.5px] border-solid"
          style={{
            bottom: -spread,
            left: -spread,
            width: bracketLen,
            height: bracketLen,
            borderColor: isHovering ? "#ed1d24" : "rgba(255,255,255,0.7)",
          }}
        />
        <motion.span
          className="absolute border-b-[1.5px] border-r-[1.5px] border-solid"
          style={{
            bottom: -spread,
            right: -spread,
            width: bracketLen,
            height: bracketLen,
            borderColor: isHovering ? "#ed1d24" : "rgba(255,255,255,0.7)",
          }}
        />

        {/* Crosshair lines */}
        <motion.span
          className="absolute left-1/2 top-1/2 h-px -translate-x-1/2 -translate-y-1/2 bg-white/50"
          animate={{ width: isHovering ? 28 : 18 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
        <motion.span
          className="absolute left-1/2 top-1/2 w-px -translate-x-1/2 -translate-y-1/2 bg-white/50"
          animate={{ height: isHovering ? 28 : 18 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />

        {/* Center dot */}
        <motion.span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
          animate={{
            width: isHovering ? 6 : 4,
            height: isHovering ? 6 : 4,
            boxShadow: isHovering
              ? "0 0 12px rgba(237,29,36,0.8)"
              : "0 0 0px transparent",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />

      </motion.div>
    </>
  );
}
