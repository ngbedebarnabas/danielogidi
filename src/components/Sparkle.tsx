import type { SVGProps } from "react";

/** 12-ray burst, echoes the asterisk motif in the design reference. */
export function Burst({ className, ...p }: SVGProps<SVGSVGElement>) {
  const rays = Array.from({ length: 6 }, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden {...p}>
      {rays.map((deg) => (
        <rect
          key={deg}
          x="43"
          y="2"
          width="14"
          height="96"
          rx="7"
          fill="currentColor"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
    </svg>
  );
}

/** 4-point star. */
export function Star4({ className, ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden {...p}>
      <path
        d="M50 0c3 26 24 47 50 50-26 3-47 24-50 50-3-26-24-47-50-50C26 47 47 26 50 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
