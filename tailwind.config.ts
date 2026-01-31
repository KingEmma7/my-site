import type { Config } from 'tailwindcss';

/**
 * Tailwind Configuration
 * 
 * Design System Notes:
 * - Uses CSS variables for theming (dark/light + accent colors)
 * - Typography scale optimized for readability
 * - Spacing follows 4px base unit
 * - Colors reference CSS custom properties for runtime theming
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // Typography: Using Geist for a modern, technical feel
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },

      // Colors: Reference CSS variables for runtime theme switching
      colors: {
        // Background layers
        surface: {
          DEFAULT: 'var(--surface)',
          elevated: 'var(--surface-elevated)',
          overlay: 'var(--surface-overlay)',
        },
        // Text hierarchy
        foreground: {
          DEFAULT: 'var(--foreground)',
          muted: 'var(--foreground-muted)',
          subtle: 'var(--foreground-subtle)',
        },
        // Accent color (switchable at runtime)
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          muted: 'var(--accent-muted)',
        },
        // Semantic colors
        border: 'var(--border)',
        ring: 'var(--ring)',
      },

      // Spacing: Extended scale for larger layouts
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // Animation: Performance-optimized keyframes
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-up': 'fade-up 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
      },

      // Backdrop blur for glassmorphism
      backdropBlur: {
        xs: '2px',
      },

      // Typography plugin configuration
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--foreground)',
            '--tw-prose-headings': 'var(--foreground)',
            '--tw-prose-links': 'var(--accent)',
            '--tw-prose-code': 'var(--foreground)',
            '--tw-prose-pre-bg': 'var(--surface-elevated)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
