"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SectionLabel from "@/components/ui/SectionLabel";
import { clients } from "@/lib/data";
import "swiper/css";

export default function ClientsSection() {
  const allClients = [...clients, ...clients];

  return (
    <section className="section-padding bg-dark-surface">
      <div className="container-gait mb-12 text-center">
        <SectionLabel className="justify-center">Partnerships</SectionLabel>
        <h2 className="font-dm text-[clamp(28px,4vw,48px)] font-bold text-white">
          Trusted by Industry Leaders, Powered by Partnerships
        </h2>
      </div>

      <div className="clients-mask relative overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4000}
          loop
          slidesPerView="auto"
          spaceBetween={60}
          allowTouchMove={false}
          className="!overflow-visible"
        >
          {allClients.map((client, i) => (
            <SwiperSlide key={i} style={{ width: "auto" }}>
              <div className="group relative h-[60px] w-[120px]">
                <Image
                  src={client.src}
                  alt={client.alt}
                  width={120}
                  height={60}
                  className="h-[60px] w-auto object-contain grayscale brightness-[0.6] transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
