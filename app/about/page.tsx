"use client";

import { motion } from "framer-motion";
import WhoWeAreSection from "@/components/about/WhoWeAreSection";
import FounderSection from "@/components/about/FounderSection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import AchievementsSection from "@/components/about/AchievementsSection";
import { pageTransition } from "@/lib/animations";

export default function AboutPage() {
  return (
    <motion.div {...pageTransition} className="-mt-[120px]">
      <WhoWeAreSection />
      <FounderSection />
      <VisionMissionSection />
      <AchievementsSection />
    </motion.div>
  );
}
