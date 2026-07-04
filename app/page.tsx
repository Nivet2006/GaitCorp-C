"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  useEffect(() => {
    // Register ScrollTrigger to ensure it is ready
    gsap.registerPlugin(ScrollTrigger);

    // Get all sections we want to snap to
    const sections = gsap.utils.toArray<HTMLElement>(".snap-section");
    if (sections.length === 0) return;

    // Create a ScrollTrigger that listens to body scroll and snaps
    const snapTrigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: (value) => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = value * scrollHeight;

          let closest = 0;
          let minDiff = Infinity;

          sections.forEach((section) => {
            const sectionScroll = section.offsetTop;
            const diff = Math.abs(currentScroll - sectionScroll);
            if (diff < minDiff) {
              minDiff = diff;
              closest = sectionScroll / scrollHeight;
            }
          });

          return closest;
        },
        duration: { min: 0.2, max: 0.6 },
        delay: 0.1,
        ease: "power2.out",
      },
    });

    return () => {
      snapTrigger.kill();
    };
  }, []);

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

