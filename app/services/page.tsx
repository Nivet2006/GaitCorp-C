"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import ServicesSidebar from "@/components/services/ServicesSidebar";
import ServicesContent from "@/components/services/ServicesContent";
import CastingTypesSection from "@/components/services/CastingTypesSection";
import { pageTransition } from "@/lib/animations";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("Casting Manufacturing");
  const [activeSub, setActiveSub] = useState("Prototype Development");

  return (
    <motion.div {...pageTransition}>
      <PageHero title="OUR SERVICES" breadcrumb="Home / Services" />
      <section className="section-padding bg-dark-bg">
        <div className="container-gait flex flex-col gap-10 lg:flex-row">
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
    </motion.div>
  );
}
