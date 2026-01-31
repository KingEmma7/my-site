'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

/**
 * Theme System
 * 
 * Three-layer theming:
 * 1. Color mode: light | dark | system
 * 2. Accent color: violet | emerald | amber | rose | cyan
 * 
 * Performance notes:
 * - Theme stored in localStorage to prevent flash
 * - Script injection in layout.tsx handles initial theme
 * - No hydration mismatch via suppressHydrationWarning
 */

type Theme = 'light' | 'dark' | 'system';
type Accent = 'violet' | 'emerald' | 'amber' | 'rose' | 'cyan';

interface ThemeContextValue {
  theme: Theme;
  accent: Accent;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_KEY = 'portfolio-theme';
const ACCENT_KEY = 'portfolio-accent';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  defaultAccent?: Accent;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  defaultAccent = 'violet',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [accent, setAccentState] = useState<Accent>(defaultAccent);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Initialize from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const storedAccent = localStorage.getItem(ACCENT_KEY) as Accent | null;

    if (storedTheme) setThemeState(storedTheme);
    if (storedAccent) setAccentState(storedAccent);
  }, []);

  // Update resolved theme and document attributes
  useEffect(() => {
    const resolved = theme === 'system' ? getSystemTheme() : theme;
    setResolvedTheme(resolved);

    // Update document
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolved);
  }, [theme]);

  // Update accent attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setResolvedTheme(getSystemTheme());
      document.documentElement.setAttribute('data-theme', getSystemTheme());
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  }, []);

  const setAccent = useCallback((newAccent: Accent) => {
    setAccentState(newAccent);
    localStorage.setItem(ACCENT_KEY, newAccent);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, accent, resolvedTheme, setTheme, setAccent }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
