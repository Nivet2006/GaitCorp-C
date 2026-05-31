"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useLenis } from "lenis/react";

const SHOW_AFTER_PX = 80;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useLenis((instance) => {
    setVisible(instance.scroll > SHOW_AFTER_PX);
  });

  const scrollToTop = () => {
    lenis?.scrollTo(0, { duration: 1.1 });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[9990] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-dark-bg/90 text-primary shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors hover:border-primary/40 hover:bg-dark-surface sm:bottom-8 sm:right-8"
        >
          <ChevronUp size={22} strokeWidth={2.5} aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
