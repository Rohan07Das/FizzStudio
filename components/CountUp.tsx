'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  to,
  from = 0,
  duration = 2.2, // seconds
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: CountUpProps) {
  const [val, setVal] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const startTime = performance.now();
          const totalMs = duration * 1000;

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / totalMs, 1);

            // Quintic / Exponential ease-out for ultra smooth deceleration
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = from + (to - from) * easeOut;

            setVal(current);

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setVal(to);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, from, duration]);

  const formatted = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}