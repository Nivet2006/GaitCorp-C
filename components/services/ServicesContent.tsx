"use client";

import Image from "next/image";
import { capabilities } from "@/lib/data";

interface ServicesContentProps {
  category: string;
  subcategory: string;
}

export default function ServicesContent({ category, subcategory }: ServicesContentProps) {
  const breadcrumb = subcategory
    ? `Services / ${category} / ${subcategory}`
    : `Services / ${category}`;

  return (
    <div className="flex-1">
      <p className="mb-4 font-mono text-xs text-muted">{breadcrumb}</p>
      <h1 className="mb-10 font-dm text-[clamp(28px,4vw,40px)] font-bold text-white">
        Precision Prototypes, Perfected for{" "}
        <span className="text-primary">Production</span>
      </h1>

      <div className="mb-16 grid gap-4 sm:grid-cols-2">
        {capabilities.map((cap) => (
          <div
            key={cap.num}
            className="group rounded-lg border border-dark-border bg-dark-surface p-6 transition-all hover:border-l-[3px] hover:border-l-primary"
          >
            <span className="font-mono text-xs text-primary">{cap.num}</span>
            <h3 className="mt-2 font-dm text-lg font-semibold text-white">{cap.title}</h3>
            <p className="mt-2 font-dm text-sm text-muted">{cap.description}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-8 font-dm text-2xl font-bold text-white">Our Products</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="group relative h-[280px] overflow-hidden rounded-lg"
          >
            <Image
              src={`/images/products/our-product${n}.jpg`}
              alt={`Product ${n}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
