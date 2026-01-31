'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

/**
 * Animated Eyes Component
 * 
 * Features:
 * - Eyes follow mouse position when input is focused
 * - Blinks occasionally for personality
 * - Fully SVG-based (no canvas, lightweight)
 * - Respects reduced motion preferences
 * 
 * Performance:
 * - Uses requestAnimationFrame for smooth updates
 * - Only animates when input is focused
 * - Simple math, no heavy calculations
 */

interface AnimatedEyesProps {
  isFocused: boolean;
  className?: string;
}

export function AnimatedEyes({ isFocused, className }: AnimatedEyesProps) {
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number | null>(null);

  // Handle mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current || !isFocused || prefersReducedMotion) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const svg = containerRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate direction from center to mouse
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // Normalize and limit movement
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 8; // Maximum pupil movement
      const normalizedDistance = Math.min(distance / 200, 1);

      const x = (dx / distance) * maxDistance * normalizedDistance || 0;
      const y = (dy / distance) * maxDistance * normalizedDistance || 0;

      setPupilPosition({ x, y });
    });
  }, [isFocused, prefersReducedMotion]);

  // Mouse tracking
  useEffect(() => {
    if (!isFocused || prefersReducedMotion) {
      setPupilPosition({ x: 0, y: 0 });
      return;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isFocused, handleMouseMove, prefersReducedMotion]);

  // Occasional blink
  useEffect(() => {
    if (prefersReducedMotion) return;

    const blinkInterval = setInterval(() => {
      // Random blink every 2-5 seconds
      const shouldBlink = Math.random() > 0.7;
      if (shouldBlink) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 2000);

    return () => clearInterval(blinkInterval);
  }, [prefersReducedMotion]);

  // For reduced motion, show static eyes
  if (prefersReducedMotion) {
    return (
      <svg
        className={cn('w-24 h-12', className)}
        viewBox="0 0 120 60"
        fill="none"
        aria-hidden="true"
      >
        {/* Left eye */}
        <ellipse cx="30" cy="30" rx="20" ry="24" fill="white" stroke="currentColor" strokeWidth="2" />
        <circle cx="30" cy="30" r="8" fill="currentColor" />
        <circle cx="33" cy="27" r="2" fill="white" />

        {/* Right eye */}
        <ellipse cx="90" cy="30" rx="20" ry="24" fill="white" stroke="currentColor" strokeWidth="2" />
        <circle cx="90" cy="30" r="8" fill="currentColor" />
        <circle cx="93" cy="27" r="2" fill="white" />
      </svg>
    );
  }

  return (
    <svg
      ref={containerRef}
      className={cn('w-24 h-12 transition-transform duration-200', className)}
      viewBox="0 0 120 60"
      fill="none"
      aria-hidden="true"
    >
      {/* Left eye */}
      <ellipse
        cx="30"
        cy="30"
        rx="20"
        ry={isBlinking ? 2 : 24}
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
        className="transition-all duration-75"
      />
      {!isBlinking && (
        <>
          <circle
            cx={30 + pupilPosition.x}
            cy={30 + pupilPosition.y}
            r="8"
            fill="currentColor"
            className="transition-all duration-100"
          />
          <circle
            cx={33 + pupilPosition.x}
            cy={27 + pupilPosition.y}
            r="2"
            fill="white"
            className="transition-all duration-100"
          />
        </>
      )}

      {/* Right eye */}
      <ellipse
        cx="90"
        cy="30"
        rx="20"
        ry={isBlinking ? 2 : 24}
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
        className="transition-all duration-75"
      />
      {!isBlinking && (
        <>
          <circle
            cx={90 + pupilPosition.x}
            cy={30 + pupilPosition.y}
            r="8"
            fill="currentColor"
            className="transition-all duration-100"
          />
          <circle
            cx={93 + pupilPosition.x}
            cy={27 + pupilPosition.y}
            r="2"
            fill="white"
            className="transition-all duration-100"
          />
        </>
      )}
    </svg>
  );
}
