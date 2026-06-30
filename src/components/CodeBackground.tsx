import type { ReactNode } from 'react';

export default function CodeBackground({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute select-none font-mono text-xs leading-relaxed whitespace-pre opacity-[0.09] blur-[0.5px] ${className}`}
    >
      {children}
    </div>
  );
}
