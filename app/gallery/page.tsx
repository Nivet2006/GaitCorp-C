"use client";

import { motion } from "framer-motion";
import GalleryPageHero from "@/components/gallery/GalleryPageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import InnerPageCTA from "@/components/shared/InnerPageCTA";
import { pageTransition } from "@/lib/animations";

export default function GalleryPage() {
  return (
    <motion.div {...pageTransition}>
      <GalleryPageHero />
      <GalleryGrid />
      <InnerPageCTA
        title="SEE YOUR PROJECT IN OUR GALLERY NEXT"
        buttonText="Start a Conversation"
      />
    </motion.div>
  );
}
