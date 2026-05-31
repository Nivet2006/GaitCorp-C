"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import { pageTransition } from "@/lib/animations";

export default function ContactPage() {
  return (
    <motion.div {...pageTransition}>
      <PageHero title="CONTACT US" breadcrumb="Home / Contact" />
      <section className="section-padding bg-dark-bg">
        <div className="container-gait grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
