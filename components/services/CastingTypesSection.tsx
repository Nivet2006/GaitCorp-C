import Image from "next/image";

const sandCasting = [
  { material: "Aluminium", image: "/images/products/Sand-cast1.jpg" },
  { material: "Brass", image: "/images/products/Sand-cast2.jpg" },
  { material: "Lead", image: "/images/products/sand-cast3.jpg" },
];

const gravityDie = [
  { material: "Aluminium", image: "/images/products/gravity-die1.jpg" },
  { material: "Brass", image: "/images/products/gravity-die2.jpg" },
];

function CastingGrid({
  title,
  label,
  items,
  cols,
}: {
  title: string;
  label: string;
  items: { material: string; image: string }[];
  cols: number;
}) {
  return (
    <div className="mb-16">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
        {label}
      </p>
      <h3 className="mb-8 font-dm text-2xl font-bold text-white">{title}</h3>
      <div
        className={`grid gap-4 ${
          cols === 3 ? "sm:grid-cols-3" : cols === 2 ? "sm:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {items.map((item) => (
          <div key={item.material}>
            <div className="group relative mb-3 h-[240px] overflow-hidden rounded-lg border border-transparent transition-all hover:scale-[1.04] hover:border-primary/50">
              <Image
                src={item.image}
                alt={`${title} - ${item.material}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <p className="font-dm text-sm font-semibold text-white">{item.material}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CastingTypesSection() {
  return (
    <section className="section-padding border-t border-dark-border bg-[#0f0f0f]">
      <div className="container-gait">
        <CastingGrid
          label="Casting Type 01"
          title="Sand Casting"
          items={sandCasting}
          cols={3}
        />
        <CastingGrid
          label="Casting Type 02"
          title="Gravity Die Casting"
          items={gravityDie}
          cols={2}
        />
        <CastingGrid
          label="Casting Type 03"
          title="Pressure Die Casting"
          items={[{ material: "Aluminium", image: "/images/products/pressure-die1.jpg" }]}
          cols={1}
        />
      </div>
    </section>
  );
}
