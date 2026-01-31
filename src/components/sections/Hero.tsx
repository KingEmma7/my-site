'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

/**
 * Hero Section with Cursor-Based Spotlight Animation + Profile Image
 * 
 * Features:
 * - Split layout: text left, image right
 * - Magnetic spotlight that follows cursor (deeper effect)
 * - Image with blur/overlay that clears on hover
 * - Techy scroll indicator
 * - Graceful degradation for reduced motion
 * 
 * Performance:
 * - Uses CSS transforms only (GPU accelerated)
 * - Throttled mouse tracking via requestAnimationFrame
 * - next/image for optimized image loading
 */

interface MousePosition {
  x: number;
  y: number;
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  // Performance: Throttle mouse tracking with requestAnimationFrame
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setMousePosition({ x, y });
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseenter', () => setIsHovering(true));
    container.addEventListener('mouseleave', () => setIsHovering(false));

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', () => setIsHovering(true));
      container.removeEventListener('mouseleave', () => setIsHovering(false));
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, prefersReducedMotion]);

  // Calculate spotlight position
  const spotlightX = mousePosition.x * 100;
  const spotlightY = mousePosition.y * 100;

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative min-h-screen flex items-center overflow-hidden',
        'pt-24 pb-16 md:pt-32 md:pb-24'
      )}
      aria-label="Hero section"
    >
      {/* Background gradient layers - DEEPER effect */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `
            radial-gradient(
              ellipse 60% 40% at ${prefersReducedMotion ? 50 : spotlightX}% ${prefersReducedMotion ? 30 : spotlightY}%,
              var(--accent) 0%,
              transparent 60%
            )
          `,
          opacity: prefersReducedMotion ? 0.15 : isHovering ? 0.25 : 0.1,
        }}
        aria-hidden="true"
      />

      {/* Secondary glow layer for more depth */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at ${prefersReducedMotion ? 50 : spotlightX}% ${prefersReducedMotion ? 30 : spotlightY}%,
              var(--accent-muted) 0%,
              transparent 50%
            )
          `,
          opacity: prefersReducedMotion ? 0.3 : isHovering ? 0.6 : 0.2,
        }}
        aria-hidden="true"
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      {/* Content - Split Layout */}
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Greeting */}
            <motion.p
              className="text-accent font-mono text-sm md:text-base mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: 0.4 }}
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name - the statement piece */}
            <motion.h1
              className={cn(
                'text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold',
                'tracking-tight leading-[1.1]',
                'bg-gradient-to-br from-foreground via-foreground to-foreground-muted',
                'bg-clip-text text-transparent',
                'pb-2'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Emmanuel Tagbor
            </motion.h1>

            {/* Title */}
            <motion.p
              className={cn(
                'text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl',
                'text-foreground-muted font-light',
                'mt-4 md:mt-6'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.2,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Senior Software Engineer
            </motion.p>

            {/* Bio */}
            <motion.p
              className={cn(
                'text-foreground-muted text-base md:text-lg',
                'max-w-xl mt-6 md:mt-8',
                'leading-relaxed',
                'mx-auto lg:mx-0'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.3,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              I build performant, accessible web applications with a focus on
              user experience and engineering excellence. Passionate about
              thoughtful architecture and elegant solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mt-10 md:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.4,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href="/projects"
                className={cn(
                  'inline-flex items-center justify-center',
                  'px-6 py-3 rounded-lg',
                  'bg-accent text-white font-medium',
                  'hover:bg-accent-hover',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-accent focus-visible:ring-offset-2',
                  'focus-visible:ring-offset-surface'
                )}
              >
                View Projects
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/contact"
                className={cn(
                  'inline-flex items-center justify-center',
                  'px-6 py-3 rounded-lg',
                  'border border-border',
                  'text-foreground font-medium',
                  'hover:bg-accent-muted hover:border-accent',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-accent focus-visible:ring-offset-2',
                  'focus-visible:ring-offset-surface'
                )}
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Profile Image with blur/reveal effect */}
          <motion.div
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.3,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Glow effect behind image */}
            <div
              className={cn(
                'absolute inset-0 rounded-2xl',
                'bg-gradient-to-br from-accent/30 via-accent/15 to-transparent',
                'blur-3xl scale-110',
                'transition-opacity duration-500',
                isImageHovered ? 'opacity-100' : 'opacity-40'
              )}
              aria-hidden="true"
            />

            {/* Image container */}
            <div
              className={cn(
                'relative w-72 h-96 sm:w-80 sm:h-[28rem] lg:w-96 lg:h-[32rem]',
                'rounded-2xl overflow-hidden',
                'border border-border/50',
                'shadow-2xl shadow-accent/10',
                'cursor-pointer'
              )}
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              {/* The image - blurred by default, clear on hover */}
              <Image
                src="/images/emmanuel-office.JPG"
                alt="Emmanuel Tagbor - Senior Software Engineer"
                fill
                className={cn(
                  'object-cover object-top',
                  'transition-all duration-700 ease-out',
                  isImageHovered ? 'blur-0 scale-100' : 'blur-[2px] scale-105'
                )}
                priority
                sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
              />

              {/* Overlay that fades on hover */}
              <div
                className={cn(
                  'absolute inset-0 z-10',
                  'bg-gradient-to-b from-surface/40 via-surface/20 to-surface/60',
                  'transition-opacity duration-500 ease-out',
                  isImageHovered ? 'opacity-0' : 'opacity-100'
                )}
                aria-hidden="true"
              />

              {/* Accent border that appears on hover */}
              <div
                className={cn(
                  'absolute inset-0 rounded-2xl z-20',
                  'border-2 transition-all duration-500',
                  isImageHovered ? 'border-accent/40' : 'border-transparent'
                )}
                aria-hidden="true"
              />

              {/* "Hover to reveal" hint - hidden on hover */}
              <div
                className={cn(
                  'absolute bottom-4 left-1/2 -translate-x-1/2 z-20',
                  'px-3 py-1.5 rounded-full',
                  'bg-surface/80 backdrop-blur-sm',
                  'text-xs font-medium text-foreground-muted',
                  'transition-opacity duration-300',
                  isImageHovered ? 'opacity-0' : 'opacity-100'
                )}
              >
                Hover to reveal
              </div>
            </div>

            {/* Decorative elements */}
            <div
              className={cn(
                'absolute -top-4 -right-4 w-24 h-24',
                'border border-accent/20 rounded-full',
                'hidden lg:block'
              )}
              aria-hidden="true"
            />
            <div
              className={cn(
                'absolute -bottom-6 -left-6 w-16 h-16',
                'bg-accent/10 rounded-full blur-xl',
                'hidden lg:block'
              )}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Scroll indicator - Techy code brackets */}
        <motion.div
          className={cn(
            'absolute bottom-4 left-1/2 -translate-x-1/2',
            'flex flex-col items-center gap-2',
            'text-foreground-subtle',
            'hidden md:flex'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: prefersReducedMotion ? 0 : 0.8,
            duration: 0.6,
          }}
        >
          <span className="text-xs font-mono uppercase tracking-wider">
            scroll
          </span>
          <motion.div
            className="flex flex-col items-center"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, 6, 0],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Techy chevrons/arrows */}
            <svg
              className="w-6 h-6 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <svg
              className="w-6 h-6 text-accent/50 -mt-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
