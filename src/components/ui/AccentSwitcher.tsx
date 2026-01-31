'use client';

import { useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { cn } from '@/lib/utils/cn';

/**
 * Accent Color Switcher
 * 
 * Features:
 * - Dropdown with color options
 * - Visual preview of each accent
 * - Keyboard accessible
 * 
 * Note: This affects accent colors throughout the site
 * Consider limiting to hero/UI accents only for a more refined look
 */

const accents = [
  { value: 'violet', label: 'Violet', class: 'bg-violet-500' },
  { value: 'emerald', label: 'Emerald', class: 'bg-emerald-500' },
  { value: 'amber', label: 'Amber', class: 'bg-amber-500' },
  { value: 'rose', label: 'Rose', class: 'bg-rose-500' },
  { value: 'cyan', label: 'Cyan', class: 'bg-cyan-500' },
] as const;

type AccentValue = typeof accents[number]['value'];

export function AccentSwitcher() {
  const { accent, setAccent } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentAccent = accents.find((a) => a.value === accent) ?? accents[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'p-2 rounded-lg',
          'text-foreground-muted hover:text-foreground',
          'hover:bg-accent-muted',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-accent focus-visible:ring-offset-2',
          'focus-visible:ring-offset-surface'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Accent color: ${currentAccent?.label ?? 'Violet'}`}
      >
        <span
          className={cn(
            'block w-5 h-5 rounded-full',
            'ring-2 ring-border',
            currentAccent?.class ?? 'bg-violet-500'
          )}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close on click outside */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown menu */}
          <div
            className={cn(
              'absolute right-0 top-full mt-2 z-20',
              'w-40 py-1',
              'glass rounded-lg shadow-lg',
              'animate-scale-in origin-top-right'
            )}
            role="listbox"
            aria-label="Select accent color"
          >
            {accents.map((accentOption) => (
              <button
                key={accentOption.value}
                type="button"
                role="option"
                aria-selected={accent === accentOption.value}
                onClick={() => {
                  setAccent(accentOption.value as AccentValue);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-3 py-2 flex items-center gap-3',
                  'text-sm text-left',
                  'hover:bg-accent-muted',
                  'transition-colors duration-150',
                  accent === accentOption.value && 'bg-accent-muted'
                )}
              >
                <span
                  className={cn(
                    'w-4 h-4 rounded-full flex-shrink-0',
                    accentOption.class
                  )}
                />
                <span className="text-foreground">{accentOption.label}</span>
                {accent === accentOption.value && (
                  <svg
                    className="w-4 h-4 ml-auto text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
