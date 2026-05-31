"use client";

import { motion } from "framer-motion";
import WhoWeAreSection from "@/components/about/WhoWeAreSection";
import FounderSection from "@/components/about/FounderSection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import AchievementsSection from "@/components/about/AchievementsSection";
import InnerPageCTA from "@/components/shared/InnerPageCTA";
import { pageTransition } from "@/lib/animations";

export default function AboutPage() {
  return (
    <motion.div {...pageTransition}>
      <WhoWeAreSection />
      <FounderSection />
      <VisionMissionSection />
      <AchievementsSection />
      <InnerPageCTA
        label="Work with us"
        title="LET'S BUILD YOUR NEXT ENGINEERING MILESTONE"
        buttonText="Contact Our Team"
      />
    </motion.div>
  );
}
