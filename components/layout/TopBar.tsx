import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function TopBar() {
  return (
    <div className="relative z-50 flex h-10 items-center justify-between bg-primary px-4 sm:px-8 lg:px-16">
      <p className="font-mono text-xs text-white">
        Welcome to <strong>GAIT</strong> Engineers
      </p>
      <div className="flex items-center gap-4">
        {socials.map(({ icon: Icon, href, label }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            className="text-white transition-opacity hover:opacity-80"
          >
            <Icon size={16} />
          </Link>
        ))}
      </div>
    </div>
  );
}
