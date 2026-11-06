'use client';

import React from 'react';

interface LiquidGlassButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: 'frosted' | 'orange';
  className?: string;
  showArrow?: boolean;
}

export function LiquidGlassButton({
  children,
  variant = 'frosted',
  className = '',
  showArrow = true,
  ...props
}: LiquidGlassButtonProps) {
  const isOrange = variant === 'orange';

  return (
    // Outer optical wrapper with contrast filtering
    <div className="relative inline-flex [filter:contrast(2.2)]">
      <a
        {...props}
        className={`group relative z-10 inline-flex items-center justify-between gap-4 px-6 py-3.5 rounded-full select-none cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-0.5 active:scale-95 will-change-transform ${className}`}
        style={{
          // Exactly matching your nav bar pill's gradient
          background: isOrange
            ? 'linear-gradient(180deg, rgba(239, 104, 36, 0.85) 0%, rgba(255, 91, 34, 0.62) 100%)'
            : 'rgba(255, 255, 255, 0.22)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          border: isOrange
            ? '0px solid rgba(255, 255, 255, 0.55)'
            : '1px double rgba(51, 51, 51, 0.08)',
          // Exactly matching your nav bar's '--pn-pill-shadow'
          boxShadow: isOrange
            ? `
              inset 3.5px 4.5px 3.5px 0px rgba(255, 255, 255, 0.95),
              inset 0.5px -0.5px 1px 0 rgba(255, 255, 255, 0.95),
              0 8px 24px -4px rgba(250, 69, 8, 0.45)
            `
            : `
              inset 2px -2px 1px -1px rgba(255, 255, 255, 0.9),
              inset -2px 2px 1px -1px rgba(255, 255, 255, 0.9),
              inset 6px -6px 1px -6px rgba(255, 255, 255, 0.55),
              inset -6px 6px 1px -6px rgba(255, 255, 255, 0.55),
              inset 0 0 2px rgba(0, 0, 0, 0.5),
              0 8px 20px -4px rgba(0, 0, 0, 0.12)
            `,
        }}
      >
        {/* Layer 1: Internal Blurred Depth Inset */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-2 top-1/3 bottom-1.5 rounded-full blur-[6px] ${
            isOrange ? 'border border-black/20' : 'border border-black/40'
          }`}
        />

        {/* Layer 2: 45-degree Specular Reflection Ring */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full blur-[6px] transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(45deg, rgba(255, 255, 255, 0.85) 0%, transparent 22%, transparent 78%, rgba(255, 255, 255, 0.85) 100%)`,
          }}
        />

        {/* Layer 3: Sub-surface Refraction Rim */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-[3px] rounded-full blur-[1px] ${
            isOrange ? 'border border-white/50' : 'border border-white/40'
          }`}
        />

        {/* Button Content Label */}
        <span
          className={`relative z-20 text-xs uppercase tracking-wider font-semibold transition-colors duration-200 ${
            isOrange ? 'text-white' : 'text-ink/80 group-hover:text-ink'
          }`}
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))',
          }}
        >
          {children}
        </span>

        {/* Pill Icon / Chevron */}
        {showArrow && (
          <span
            className={`relative z-20 flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 group-active:scale-95 ${
              isOrange
                ? 'bg-white text-[rgb(239,104,36)] shadow-[0_0_8px_rgba(0,0,0,0.18)]'
                : 'bg-ink text-white shadow-[0_0_8px_rgba(0,0,0,0.25)]'
            }`}
          >
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M779.18 473.23L322.35 16.41c-21.41-21.41-56.12-21.41-77.53 0-21.41 21.41-21.41 56.12 0 77.53l418.06 418.06-418.06 418.06c-21.41 21.41-21.41 56.12 0 77.53 10.71 10.71 24.76 16.06 38.77 16.06s28.06-5.35 38.77-16.06l456.82-456.82c21.41-21.41 21.41-56.12 0-77.54z" />
            </svg>
          </span>
        )}
      </a>
    </div>
  );
}