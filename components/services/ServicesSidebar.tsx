"use client";

import { motion } from "framer-motion";
import { serviceCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ServicesSidebarProps {
  activeCategory: string;
  activeSub: string;
  onSelect: (category: string, sub: string) => void;
}

export default function ServicesSidebar({
  activeCategory,
  activeSub,
  onSelect,
}: ServicesSidebarProps) {
  let index = 0;

  return (
    <nav className="flex flex-col gap-2 lg:sticky lg:top-28 lg:w-72">
      <p className="mb-4 hidden font-mono text-[10px] uppercase tracking-[0.35em] text-primary lg:block">
        Select discipline
      </p>
      {serviceCategories.map((cat) => {
        const catIndex = ++index;
        const subs = cat.subcategories.length > 0 ? cat.subcategories : [cat.name];

        return (
          <div key={cat.name} className="mb-4">
            <button
              type="button"
              onClick={() => onSelect(cat.name, subs[0] ?? "")}
              className={cn(
                "group flex w-full items-baseline gap-4 border-b border-dark-border py-4 text-left transition-colors",
                activeCategory === cat.name && "border-primary"
              )}
            >
              <span
                className={cn(
                  "font-mono text-xs transition-colors",
                  activeCategory === cat.name ? "text-primary" : "text-muted"
                )}
              >
                {String(catIndex).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "font-dm text-sm font-semibold uppercase tracking-wide transition-colors lg:text-base",
                  activeCategory === cat.name
                    ? "text-white"
                    : "text-muted group-hover:text-white"
                )}
              >
                {cat.name}
              </span>
            </button>
            {cat.subcategories.length > 0 && (
              <div className="ml-8 mt-1 space-y-1 border-l border-dark-border pl-4">
                {cat.subcategories.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => onSelect(cat.name, sub)}
                    className={cn(
                      "block w-full py-2 text-left font-dm text-xs transition-colors",
                      activeSub === sub && activeCategory === cat.name
                        ? "text-primary"
                        : "text-muted hover:text-white"
                    )}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
            {activeCategory === cat.name && (
              <motion.div
                layoutId="service-active"
                className="mt-2 h-0.5 w-full bg-primary"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
