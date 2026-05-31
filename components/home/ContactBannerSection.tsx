"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactBannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -20 },
        {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative flex h-[600px] items-center overflow-hidden">
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/images/hero/contact-hero-bg.jpg"
          alt="Contact Gait Engineering"
          fill
          className="object-cover parallax-img"
          sizes="100vw"
        />
      </div>
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "rgba(10,10,10,0.75), linear-gradient(135deg, rgba(237,29,36,0.3), transparent 60%)",
          backgroundBlendMode: "normal",
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(135deg, rgba(237,29,36,0.3), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 z-[1] bg-dark-bg/75" />

      <div className="container-gait relative z-10 text-center">
        <p className="mb-4 font-mono text-xs tracking-[0.2em] text-white">
          [ PARTNER WITH US ]
        </p>
        <div className="relative mx-auto mb-6 flex max-w-5xl items-center justify-center gap-6">
          <div className="hidden h-20 w-0.5 rotate-45 bg-primary sm:block" />
          <h2 className="font-bebas text-[clamp(48px,8vw,96px)] leading-tight text-white">
            <span className="text-primary">PRECISION</span> IN EVERY CAST,{" "}
            <span className="text-primary">EXCELLENCE</span> IN EVERY PRODUCT.
          </h2>
          <div className="hidden h-20 w-0.5 rotate-45 bg-primary sm:block" />
        </div>
        <p className="mb-10 font-dm text-lg text-white/70">
          Partner with us for high-quality die casting solutions
        </p>
        <MagneticButton href="/contact" variant="outline" className="uppercase tracking-wider">
          Get In Touch
        </MagneticButton>
      </div>
    </section>
  );
}
