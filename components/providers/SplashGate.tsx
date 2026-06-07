"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SplashScreen, { shouldSkipSplash } from "@/components/ui/SplashScreen";

export default function SplashGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    setSplashDone(shouldSkipSplash());
    setHydrated(true);
  }, []);

  const showSplash = hydrated && !splashDone;
  const showContent = hydrated && splashDone;

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={() => setSplashDone(true)} />
      )}

      {/* Prevent content flash before hydration */}
      {!hydrated && (
        <div className="fixed inset-0 z-[10040] bg-dark-bg" aria-hidden />
      )}

      <motion.div
        initial={false}
        animate={{
          opacity: showContent ? 1 : 0,
        }}
        transition={{
          duration: 0.7,
          delay: showContent ? 0.2 : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
        aria-hidden={!showContent}
        className={showContent ? undefined : "pointer-events-none invisible"}
      >
        {children}
      </motion.div>
    </>
  );
}
