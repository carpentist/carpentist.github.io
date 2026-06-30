import type { ReactNode, HTMLAttributes } from 'react';
import { useCardTilt } from '../hooks/useCardTilt';

interface TiltCardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: 'div' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  maxTilt?: number;
  className?: string;
  glareClassName?: string;
}

export default function TiltCard({
  children,
  as: Tag = 'div',
  href,
  maxTilt = 5,
  className = '',
  glareClassName = '',
  ...rest
}: TiltCardProps) {
  const { ref, tiltStyle, glareStyle, handlers } = useCardTilt(maxTilt);

  const merged = {
    ref: ref as any,
    className: `${className} overflow-hidden isolation-isolate`.trim(),
    style: { isolation: 'isolate', ...tiltStyle } as React.CSSProperties,
    ...handlers,
    ...rest,
  };

  // Glare sits on top (positioned) but is pointer-events-none and largely transparent.
  // Content is visible through it. No wrapper needed — preserves the caller's flex/grid layout.
  const glare = (
    <div
      className={`pointer-events-none absolute inset-0 ${glareClassName}`}
      style={glareStyle}
    />
  );

  if (Tag === 'a') {
    return (
      <a {...merged} href={href}>
        {children}
        {glare}
      </a>
    );
  }

  return (
    <div {...merged}>
      {children}
      {glare}
    </div>
  );
}
