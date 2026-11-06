'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

interface LiquidGlassSliderProps {
  min?: number;
  max?: number;
  value: number;
  onChange: (val: number) => void;
}

export default function LiquidGlassSlider({
  min = 14,
  max = 45,
  value,
  onChange,
}: LiquidGlassSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Internal smooth continuous percentage (0 - 100) for sub-pixel animation
  const [smoothPercent, setSmoothPercent] = useState(() => {
    return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  });

  const lastReportedVal = useRef(value);
  const rafId = useRef<number | null>(null);

  // Sync internal position when external value changes while NOT dragging
  useEffect(() => {
    if (!isDragging) {
      const targetPercent = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
      setSmoothPercent(targetPercent);
      lastReportedVal.current = value;
    }
  }, [value, min, max, isDragging]);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const rawPercent = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));

      // Instant 1:1 sub-pixel update
      setSmoothPercent(rawPercent);

      // Throttled notification to React parent so numbers update cleanly
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const roundedVal = Math.round(min + (rawPercent / 100) * (max - min));
        if (roundedVal !== lastReportedVal.current) {
          lastReportedVal.current = roundedVal;
          onChange(roundedVal);
        }
      });
    },
    [min, max, onChange]
  );

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateFromClientX(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateFromClientX(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        updateFromClientX(e.clientX);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        updateFromClientX(e.touches[0].clientX);
      }
    };

    const stopDrag = () => {
      setIsDragging(false);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };

    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove, { passive: false });
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchmove', onTouchMove, { passive: true });
      document.addEventListener('touchend', stopDrag);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', stopDrag);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isDragging, updateFromClientX]);

  return (
    <div className="w-full flex items-center justify-center py-6 select-none">
      {/* SVG Liquid Filter */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <filter id="mini-liquid-lens" x="-50%" y="-50%" width="200%" height="200%">
          <feImage
            x="0"
            y="0"
            result="normalMap"
            href="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3CradialGradient id='invmap' cx='50%25' cy='50%25' r='75%25'%3E%3Cstop offset='0%25' stop-color='rgb(128,128,255)'/%3E%3Cstop offset='90%25' stop-color='rgb(255,255,255)'/%3E%3C/radialGradient%3E%3Crect width='100%25' height='100%25' fill='url(%23invmap)'/%3E%3C/svg%3E"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="normalMap"
            scale="-252"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feMerge>
            <feMergeNode in="displaced" />
          </feMerge>
        </filter>
      </svg>

      <style jsx>{`
        .slider-container {
          position: relative;
          width: 100%;
          max-width: 100%;
          height: 10px;
          background: #E5E5EA;
          border-radius: 999px;
          touch-action: none;
        }

        .slider-progress {
          position: absolute;
          height: 100%;
          background: linear-gradient(117deg, #FF6A1A 0%, #EF6824 100%);
          border-radius: 999px;
          z-index: 1;
          will-change: width;
          box-shadow: 0 2px 8px -2px rgba(239, 104, 36, 0.4);
        }

        .slider-thumb-glass {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 65px;
          height: 42px;
          border-radius: 999px;
          cursor: pointer;
          z-index: 2;
          background-color: #fff;
          box-shadow: 0 4px 14px 0 rgba(239, 104, 36, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.08);
          overflow: hidden;
          will-change: left, transform;
          transition: transform 0.15s ease, height 0.15s ease;
        }

        .slider-thumb-glass-filter {
          position: absolute;
          inset: 0;
          z-index: 0;
          backdrop-filter: blur(0.6px);
          -webkit-backdrop-filter: blur(0.6px);
          filter: url(#mini-liquid-lens);
        }

        .slider-thumb-glass-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background-color: rgba(255, 255, 255, 0.15);
        }

        .slider-thumb-glass-specular {
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: inherit;
          box-shadow:
            inset 1.5px 1.5px 0 rgba(255, 255, 255, 0.95),
            inset 1px 3px 0 rgba(239, 104, 36, 0.2),
            inset 0 0 22px rgba(255, 255, 255, 0.65),
            inset -1px -1px 0 rgba(239, 104, 36, 0.15);
        }

        .slider-thumb-glass-filter,
        .slider-thumb-glass-overlay,
        .slider-thumb-glass-specular {
          opacity: 0;
        }

        .slider-thumb-glass.active {
          background-color: transparent;
          box-shadow: none;
        }

        .slider-thumb-glass.active .slider-thumb-glass-filter,
        .slider-thumb-glass.active .slider-thumb-glass-overlay,
        .slider-thumb-glass.active .slider-thumb-glass-specular {
          opacity: 1;
        }

        .slider-thumb-glass:active {
          transform: translate(-50%, -50%) scaleY(0.98) scaleX(1.1);
        }
      `}</style>

      {/* Slider Structure */}
      <div
        id="slider"
        ref={sliderRef}
        className="slider-container"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <div
          id="progress"
          className="slider-progress"
          style={{ width: `${smoothPercent}%` }}
        />
        <div
          id="thumb"
          ref={thumbRef}
          className={`slider-thumb-glass ${isDragging ? 'active' : ''}`}
          style={{ left: `${smoothPercent}%` }}
        >
          <div className="slider-thumb-glass-filter" />
          <div className="slider-thumb-glass-overlay" />
          <div className="slider-thumb-glass-specular" />
        </div>
      </div>
    </div>
  );
}