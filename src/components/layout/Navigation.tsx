'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { AccentSwitcher } from '@/components/ui/AccentSwitcher';

/**
 * Navigation Component
 * 
 * Features:
 * - Sticky glassmorphic design
 * - Scroll-aware: subtle visual change after scrolling
 * - Keyboard-first focus styles
 * - Mobile responsive (hamburger on small screens)
 * 
 * Performance:
 * - Uses CSS transforms only for animations
 * - Scroll listener with passive flag
 * - No layout-shifting animations
 */

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/til', label: 'TIL' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Performance: passive scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300 ease-out',
        isScrolled
          ? 'glass py-3 shadow-sm'
          : 'bg-transparent py-5'
      )}
    >
      <nav className="section-container flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          href="/"
          className={cn(
            'font-semibold text-lg tracking-tight',
            'text-foreground hover:text-accent',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-accent focus-visible:ring-offset-2',
            'focus-visible:ring-offset-surface rounded-sm'
          )}
        >
          <span className="font-mono text-accent">{'>'}</span> kingemma.dev
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg',
                'text-foreground-muted hover:text-foreground',
                'hover:bg-accent-muted',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-accent focus-visible:ring-offset-2',
                'focus-visible:ring-offset-surface'
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="w-px h-6 bg-border mx-2" aria-hidden="true" />

          {/* Theme controls */}
          <div className="flex items-center gap-1">
            <AccentSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            'md:hidden p-2 rounded-lg',
            'text-foreground-muted hover:text-foreground',
            'hover:bg-accent-muted',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-accent'
          )}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden',
          'overflow-hidden transition-all duration-300 ease-out',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="section-container py-4 space-y-1 glass border-t border-border">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'block px-4 py-3 text-sm font-medium rounded-lg',
                'text-foreground-muted hover:text-foreground',
                'hover:bg-accent-muted',
                'transition-colors duration-200'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 px-4 pt-3 border-t border-border">
            <AccentSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
