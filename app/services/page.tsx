"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ServicesPageHero from "@/components/services/ServicesPageHero";
import ServicesSidebar from "@/components/services/ServicesSidebar";
import ServicesContent from "@/components/services/ServicesContent";
import CastingTypesSection from "@/components/services/CastingTypesSection";
import InnerPageCTA from "@/components/shared/InnerPageCTA";
import { pageTransition } from "@/lib/animations";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("Casting Manufacturing");
  const [activeSub, setActiveSub] = useState("Prototype Development");

  return (
    <motion.div {...pageTransition}>
      <ServicesPageHero />
      <section className="bg-dark-bg py-16 lg:py-24">
        <div className="container-gait flex flex-col gap-12 lg:flex-row lg:gap-20">
          <ServicesSidebar
            activeCategory={activeCategory}
            activeSub={activeSub}
            onSelect={(cat, sub) => {
              setActiveCategory(cat);
              setActiveSub(sub);
            }}
          />
          <ServicesContent category={activeCategory} subcategory={activeSub} />
        </div>
      </section>
      <CastingTypesSection />
      <InnerPageCTA
        title="READY TO ENGINEER YOUR NEXT CASTING PROJECT?"
        buttonText="Get In Touch"
      />
    </motion.div>
  );
}
