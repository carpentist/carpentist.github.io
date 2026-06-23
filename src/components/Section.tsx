import type { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const { ref, visible } = useScrollReveal();

  return (
    <section id={id} className="relative py-28 lg:py-36">
      <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
        <div className="mx-auto max-w-[1700px] px-8 lg:px-16">
          {(title || subtitle) && (
            <div className="mb-16">
              {subtitle && (
                <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
                  {subtitle}
                </p>
              )}
              {title && (
                <h2 className="text-3xl font-light tracking-tight text-zinc-100 lg:text-4xl">
                  {title}
                </h2>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
