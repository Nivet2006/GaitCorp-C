import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { contactInfo } from "@/lib/data";

const quickLinks = [
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms and Conditions", href: "#" },
];

const serviceLinks = [
  "Non-Ferrous Castings",
  "Tools Jigs & Fixtures",
  "Special Purpose Machines",
  "Fabrication & Erection",
  "Prototype Development",
];

const socials = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-bg">
      <div className="container-gait pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image src="/logo.svg" alt="Gait Engineering Works" width={160} height={60} className="mb-4" />
            <p className="mb-6 font-dm text-sm text-muted">
              Gait Engineering Works — precision non-ferrous castings and SPM solutions for over 20 years.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-border text-muted transition-all hover:border-primary hover:bg-primary hover:text-white"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-dm text-sm text-muted transition-all hover:pl-2 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <Link
                    href="/services"
                    className="font-dm text-sm text-muted transition-all hover:pl-2 hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-primary" />
                <a href={`tel:${contactInfo.phone}`} className="font-dm text-sm text-muted hover:text-primary">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-primary" />
                <a href={`mailto:${contactInfo.email}`} className="font-dm text-sm text-muted hover:text-primary">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="font-dm text-sm text-muted">{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px bg-dark-border" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-xs text-[#4a4a4a]">
            ©2025 Gait Engineering Works. All rights reserved.
          </p>
          <p className="font-mono text-xs text-[#4a4a4a]">
            Powered by{" "}
            <a
              href="https://devcreationsblr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              Dev Creations and Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
