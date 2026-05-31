"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { contactInfo } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticCard from "@/components/ui/MagneticCard";

const channels = [
  {
    icon: Phone,
    label: "Direct line",
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: MapPin,
    label: "Facility",
    value: contactInfo.address,
  },
];

export default function ContactInfo() {
  return (
    <div className="lg:sticky lg:top-28">
      <ScrollReveal direction="left">
        <h2 className="font-bebas text-[clamp(32px,5vw,56px)] leading-[0.95] text-white">
          PARTNER WITH
          <br />
          <span className="text-primary">GAIT ENGINEERING</span>
        </h2>
        <p className="mt-6 font-dm text-muted">
          Discuss castings, SPM, or prototyping — our Bangalore team responds within one
          business day.
        </p>
      </ScrollReveal>

      <div className="mt-12 space-y-4">
        {channels.map((ch, i) => (
          <ScrollReveal key={ch.label} direction="left" delay={i * 0.1}>
            <MagneticCard tilt={5}>
              {ch.href ? (
                <a
                  href={ch.href}
                  data-cursor-hover
                  className="group flex items-start gap-5 rounded-2xl border border-dark-border bg-dark-surface/50 p-6 transition-colors hover:border-primary/50"
                >
                  <ChannelBody {...ch} link />
                </a>
              ) : (
                <div className="flex items-start gap-5 rounded-2xl border border-dark-border bg-dark-surface/50 p-6">
                  <ChannelBody {...ch} />
                </div>
              )}
            </MagneticCard>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal direction="scale" className="mt-8">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-dark-border">
          <Image
            src="/images/contact/contact-us.jpg"
            alt="Gait Engineering facility"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent" />
          <p className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-white">
            K.R. Puram · Bangalore
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}

function ChannelBody({
  icon: Icon,
  label,
  value,
  link,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  link?: boolean;
}) {
  return (
    <>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
        <Icon size={20} className="text-primary" />
      </div>
      <div className="flex-1">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          {label}
        </p>
        <p className="mt-1 font-dm text-base font-semibold text-white">{value}</p>
      </div>
      {link && (
        <ArrowUpRight
          size={18}
          className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
        />
      )}
    </>
  );
}
