"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline";
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const springX = useSpring(0, { stiffness: 150, damping: 15 });
  const springY = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = Math.max(-8, Math.min(8, (e.clientX - centerX) * 0.15));
    const offsetY = Math.max(-8, Math.min(8, (e.clientY - centerY) * 0.15));
    springX.set(offsetX);
    springY.set(offsetY);
  };

  const handleMouseLeave = () => {
    springX.set(0);
    springY.set(0);
  };

  const baseClass = cn(
    "inline-block rounded font-dm text-lg font-semibold transition-all duration-300",
    variant === "primary"
      ? "bg-primary px-10 py-4 text-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(237,29,36,0.5)]"
      : "border border-white/30 bg-transparent px-10 py-4 text-white hover:border-primary hover:bg-primary hover:text-white",
    className
  );

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(baseClass, className?.includes("w-full") && "flex w-full items-center justify-center")}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
