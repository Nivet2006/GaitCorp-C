export default function MarqueeStrip() {
  const text =
    "CASTINGS · SPM SOLUTIONS · PRECISION ENGINEERING · QUALITY · INNOVATION · ";

  return (
    <div className="overflow-hidden bg-primary py-4">
      <div className="marquee-text flex whitespace-nowrap">
        <span className="font-bebas text-2xl tracking-wider text-white">
          {text.repeat(4)}
        </span>
        <span className="font-bebas text-2xl tracking-wider text-white" aria-hidden>
          {text.repeat(4)}
        </span>
      </div>
    </div>
  );
}
