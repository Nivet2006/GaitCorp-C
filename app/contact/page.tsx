"use client";

import { motion } from "framer-motion";
import ContactPageHero from "@/components/contact/ContactPageHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import { pageTransition } from "@/lib/animations";

export default function ContactPage() {
  return (
    <motion.div {...pageTransition}>
      <ContactPageHero />
      <section className="relative bg-dark-bg py-16 lg:py-24">
        <div className="container-gait grid gap-16 lg:grid-cols-2 lg:gap-24">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </motion.div>
  );
}
