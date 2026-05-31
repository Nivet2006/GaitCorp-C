import Link from "next/link";

interface PageHeroProps {
  title: string;
  breadcrumb: string;
  subtitle?: string;
  description?: string;
}

export default function PageHero({
  title,
  breadcrumb,
  subtitle,
  description,
}: PageHeroProps) {
  const parts = breadcrumb.split(" / ");

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{
        minHeight: description ? 400 : 300,
        background:
          "radial-gradient(ellipse at 50% 150%, rgba(237,29,36,0.15) 0%, transparent 60%), #0a0a0a",
      }}
    >
      <div className="container-gait py-16">
        <p className="mb-4 font-mono text-xs text-white">
          {parts.map((part, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2 text-primary">/</span>}
              {i === parts.length - 1 ? (
                <span className="text-primary">{part}</span>
              ) : (
                <Link href={i === 0 ? "/" : "#"} className="hover:text-primary">
                  {part}
                </Link>
              )}
            </span>
          ))}
        </p>
        <h1 className="font-bebas text-[clamp(64px,10vw,120px)] leading-none text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 font-dm text-xl text-primary">{subtitle}</p>
        )}
        {description && (
          <p className="mt-4 max-w-2xl font-dm text-base text-muted">{description}</p>
        )}
        <div className="mt-6 h-0.5 w-16 bg-primary" />
      </div>
    </section>
  );
}
