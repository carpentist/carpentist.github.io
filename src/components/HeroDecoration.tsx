export default function HeroDecoration() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Large abstract ring — top right */}
      <svg
        className="absolute -top-32 right-[10%] h-[500px] w-[500px] opacity-[0.06] lg:h-[700px] lg:w-[700px]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="190" stroke="white" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="160" stroke="white" strokeWidth="0.3" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="130" stroke="white" strokeWidth="0.3" />
        <circle cx="200" cy="200" r="100" stroke="#06b6d4" strokeWidth="0.4" strokeDasharray="2 8" />
        {/* Radial lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="200" y1="200"
            x2={200 + 190 * Math.cos((angle * Math.PI) / 180)}
            y2={200 + 190 * Math.sin((angle * Math.PI) / 180)}
            stroke="white"
            strokeWidth="0.2"
            opacity="0.4"
          />
        ))}
        {/* Accent dots on the outer ring */}
        {[30, 120, 210, 300].map((angle) => (
          <circle
            key={angle}
            cx={200 + 190 * Math.cos((angle * Math.PI) / 180)}
            cy={200 + 190 * Math.sin((angle * Math.PI) / 180)}
            r="2"
            fill="#06b6d4"
            opacity="0.6"
          />
        ))}
      </svg>

      {/* Geometric blocks — bottom left */}
      <svg
        className="absolute bottom-32 left-[5%] h-[300px] w-[300px] opacity-[0.04] lg:h-[400px] lg:w-[400px]"
        viewBox="0 0 300 300"
        fill="none"
      >
        <rect x="20" y="20" width="120" height="120" rx="2" stroke="white" strokeWidth="0.5" />
        <rect x="160" y="20" width="120" height="120" rx="2" stroke="white" strokeWidth="0.5" />
        <rect x="20" y="160" width="80" height="120" rx="2" stroke="white" strokeWidth="0.5" />
        <rect x="120" y="160" width="160" height="120" rx="2" stroke="white" strokeWidth="0.5" />
        {/* Filled accent */}
        <rect x="40" y="40" width="80" height="80" rx="1" fill="#06b6d4" opacity="0.08" />
        <rect x="140" y="180" width="120" height="80" rx="1" fill="white" opacity="0.03" />
        {/* Connecting lines */}
        <line x1="140" y1="80" x2="160" y2="80" stroke="white" strokeWidth="0.3" />
        <line x1="100" y1="140" x2="100" y2="160" stroke="white" strokeWidth="0.3" />
      </svg>

      {/* Subtle data-flow lines — right side */}
      <svg
        className="absolute right-0 top-1/3 h-[250px] w-[120px] opacity-[0.05]"
        viewBox="0 0 120 250"
        fill="none"
      >
        {[0, 30, 60, 90, 120, 150, 180, 210, 240].map((y, i) => (
          <g key={y}>
            <circle cx="12" cy={y} r="1.5" fill="white" opacity={0.5 + (i % 3) * 0.15} />
            <line x1="18" y1={y} x2={60 + (i % 3) * 15} y2={y} stroke="white" strokeWidth="0.3" opacity="0.4" />
            <circle cx={70 + (i % 3) * 15} cy={y} r="1" fill="#06b6d4" opacity={0.3 + (i % 2) * 0.2} />
          </g>
        ))}
      </svg>

      {/* Gradient mesh — center ambient */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(6_182_212_/_0.04)_0%,transparent_70%)]" />
    </div>
  );
}
