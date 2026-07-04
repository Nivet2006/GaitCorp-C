"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import ContactBannerSection from "@/components/home/ContactBannerSection";
import ClientsSection from "@/components/home/ClientsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import InnerPageCTA from "@/components/shared/InnerPageCTA";
import { pageTransition } from "@/lib/animations";

export default function HomePage() {
  const lenis = useLenis();
  const activeIndexRef = useRef(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (!lenis) return;

    // Get all sections to snap to
    const sections = Array.from(document.querySelectorAll(".snap-section")) as HTMLElement[];
    if (sections.length === 0) return;

    // Sync index with current scroll position on mount or manual scroll
    const syncIndex = () => {
      if (isScrollingRef.current) return;
      const scrollPos = window.scrollY;
      let closestIndex = 0;
      let minDiff = Infinity;

      sections.forEach((section, index) => {
        const offset = (section as HTMLElement).offsetTop;
        const diff = Math.abs(scrollPos - offset);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = index;
        }
      });
      activeIndexRef.current = closestIndex;
    };

    lenis.on("scroll", syncIndex);

    const handleScrollTo = (direction: number) => {
      let nextIndex = activeIndexRef.current + direction;
      if (nextIndex >= 0 && nextIndex < sections.length) {
        isScrollingRef.current = true;
        activeIndexRef.current = nextIndex;

        lenis.scrollTo(sections[nextIndex], {
          immediate: false,
          duration: 1.2,
          lock: true,
          onComplete: () => {
            // Add a small delay to prevent rapid scroll triggers
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 100);
          },
        });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 10) return; // Ignore micro-scrolls
      e.preventDefault();

      if (isScrollingRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      handleScrollTo(direction);
    };

    // Mobile Swipe Snapping
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrollingRef.current) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;

      if (Math.abs(diffY) > 50) {
        const direction = diffY > 0 ? 1 : -1;
        handleScrollTo(direction);
      }
    };

    // Event Listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      lenis.off("scroll", syncIndex);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [lenis]);

  return (
    <motion.div {...pageTransition}>
      <div className="snap-section">
        <HeroSection />
      </div>
      <MarqueeStrip />
      <div className="snap-section">
        <AboutSection />
      </div>
      <div className="snap-section">
        <ServicesSection />
      </div>
      <div className="snap-section">
        <ContactBannerSection />
      </div>
      <div className="snap-section">
        <ClientsSection />
      </div>
      <div className="snap-section">
        <TestimonialsSection />
      </div>
      <div className="snap-section">
        <InnerPageCTA
          title="ENGINEER SOMETHING EXTRAORDINARY WITH GAIT"
          buttonText="Start a Project"
        />
      </div>
    </motion.div>
  );
}


