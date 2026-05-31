"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
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
  const [openCategories, setOpenCategories] = useState<string[]>([
    "Casting Manufacturing",
  ]);

  const toggle = (name: string) => {
    setOpenCategories((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <aside className="sticky top-28 w-full shrink-0 rounded-lg border border-dark-border bg-dark-surface p-6 lg:w-[300px]">
      <ul className="space-y-2">
        {serviceCategories.map((cat) => {
          const isOpen = openCategories.includes(cat.name);
          const hasSubs = cat.subcategories.length > 0;

          return (
            <li key={cat.name}>
              <button
                type="button"
                onClick={() => {
                  if (hasSubs) toggle(cat.name);
                  else onSelect(cat.name, "");
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded px-3 py-3 font-dm text-base font-semibold text-white transition-colors hover:bg-dark-elevated",
                  activeCategory === cat.name && "border-l-2 border-primary bg-dark-elevated"
                )}
              >
                {cat.name}
                {hasSubs &&
                  (isOpen ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  ))}
              </button>
              <AnimatePresence>
                {hasSubs && isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-2"
                  >
                    {cat.subcategories.map((sub) => (
                      <li key={sub}>
                        <button
                          type="button"
                          onClick={() => onSelect(cat.name, sub)}
                          className={cn(
                            "w-full rounded py-2 pl-4 text-left font-dm text-sm text-muted transition-colors hover:text-white",
                            activeSub === sub &&
                              "font-mono text-primary"
                          )}
                        >
                          {sub}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
