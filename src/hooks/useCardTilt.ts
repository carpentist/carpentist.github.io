import { useCallback, useRef, useState } from 'react';

interface TiltValues {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
  scale: number;
}

export function useCardTilt(maxTilt = 6) {
  const ref = useRef<HTMLElement>(null);
  const [values, setValues] = useState<TiltValues>({
    rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, scale: 1,
  });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setValues({
      rotateX: (0.5 - y) * maxTilt,
      rotateY: (x - 0.5) * maxTilt * 1.2,
      glareX: x * 100,
      glareY: y * 100,
      scale: 1.015,
    });
  }, [maxTilt]);

  const onLeave = useCallback(() => {
    setValues({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, scale: 1 });
  }, []);

  const idle = values.rotateX === 0 && values.rotateY === 0;

  return {
    ref,
    tiltStyle: {
      transform: `perspective(900px) rotateX(${values.rotateX}deg) rotateY(${values.rotateY}deg) scale3d(${values.scale},${values.scale},1)`,
      transition: idle ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.08s ease-out',
    },
    glareStyle: {
      background: `radial-gradient(circle at ${values.glareX}% ${values.glareY}%, rgba(242,138,87,0.07) 0%, transparent 55%)`,
      opacity: idle ? 0 : 1,
      transition: idle ? 'opacity 0.4s ease' : 'opacity 0.08s ease',
    },
    handlers: { onMouseMove: onMove, onMouseLeave: onLeave },
  };
}
