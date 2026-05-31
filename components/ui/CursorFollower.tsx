"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollower() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 100, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 100, damping: 28 });

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
        !!target.closest("a, button, [data-cursor-hover]")
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      mq.removeEventListener("change", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary"
        style={{
          x: springX,
          y: springY,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 1 : 0.6,
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ x: cursorX, y: cursorY }}
      />
    </>
  );
}
