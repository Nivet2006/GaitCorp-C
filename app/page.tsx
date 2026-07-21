"use client";

import { motion } from "framer-motion";
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
  return (
    <motion.div {...pageTransition}>
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <ServicesSection />
      <ContactBannerSection />
      <ClientsSection />
      <TestimonialsSection />
      <InnerPageCTA
        title="ENGINEER SOMETHING EXTRAORDINARY WITH GAIT"
        buttonText="Start a Project"
      />
    </motion.div>
  );
}

