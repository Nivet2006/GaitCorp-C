import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "mb-4 flex items-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary",
        className
      )}
    >
      <span className="mr-3 h-px w-6 bg-primary" />
      {children}
    </div>
  );
}
