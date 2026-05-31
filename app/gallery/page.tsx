"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { pageTransition } from "@/lib/animations";

export default function GalleryPage() {
  return (
    <motion.div {...pageTransition}>
      <PageHero
        title="OUR GALLERY"
        breadcrumb="Home / Gallery"
        subtitle="Crafting Excellence, One Cast at a Time."
        description="Explore our precision-engineered die-casting solutions in action."
      />
      <GalleryGrid />
    </motion.div>
  );
}
