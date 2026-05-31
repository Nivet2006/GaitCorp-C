import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { contactInfo } from "@/lib/data";

const cards = [
  { icon: Phone, label: "Phone", value: contactInfo.phone, href: `tel:${contactInfo.phone}` },
  { icon: Mail, label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: MapPin, label: "Address", value: contactInfo.address },
];

export default function ContactInfo() {
  return (
    <div>
      <SectionLabel>Contact Us</SectionLabel>
      <h1 className="mb-6 font-dm text-[clamp(28px,4vw,40px)] font-bold leading-tight text-white">
        Partner with <span className="text-primary">Gait Engineering</span> for Excellence
        in Die Casting!
      </h1>
      <p className="mb-10 font-dm text-base text-muted">
        Get in touch with us today to discuss your project requirements. Our team is ready
        to deliver precision-engineered solutions tailored to your needs.
      </p>

      <div className="mb-10 space-y-4">
        {cards.map(({ icon: Icon, label, value, href }) => (
          <div
            key={label}
            className="flex gap-4 rounded-lg border border-dark-border bg-dark-surface p-5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
              <Icon size={20} className="text-primary" />
            </div>
            <div>
              <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                {label}
              </p>
              {href ? (
                <a href={href} className="font-dm text-base font-semibold text-white hover:text-primary">
                  {value}
                </a>
              ) : (
                <p className="font-dm text-base font-semibold text-white">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="relative h-[400px] overflow-hidden rounded-lg">
        <Image
          src="/images/contact/contact-us.jpg"
          alt="Contact Gait Engineering"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
    </div>
  );
}
