'use client';

import React, { type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils/cn';

/**
 * Animated Section Component
 * 
 * Features:
 * - CSS-based scroll animations (no Framer Motion runtime cost)
 * - Uses IntersectionObserver for triggering
 * - Respects reduced motion preferences
 * - Customizable animation direction and delay
 * 
 * Performance:
 * - Animations use transform and opacity only (GPU accelerated)
 * - Observer disconnects after first trigger
 * - No layout shift (elements maintain their space)
 */

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'fade';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: AnimationDirection;
  delay?: number;
  threshold?: number;
  as?: React.ElementType;
}

const directionStyles: Record<AnimationDirection, string> = {
  up: 'translate-y-8',
  down: '-translate-y-8',
  left: 'translate-x-8',
  right: '-translate-x-8',
  fade: 'translate-y-0',
};

export function AnimatedSection({
  children,
  className,
  direction = 'up',
  delay = 0,
  threshold = 0.1,
  as: Component = 'div',
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    triggerOnce: true,
  });

  // If reduced motion, render without animation
  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'transition-all duration-700 ease-out',
        !isIntersecting && cn('opacity-0', directionStyles[direction]),
        isIntersecting && 'opacity-100 translate-x-0 translate-y-0',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
