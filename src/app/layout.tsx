import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

/**
 * Root Layout
 * 
 * Architecture:
 * - Server Component by default
 * - ThemeProvider for client-side theme management
 * - Script injection prevents theme flash (FOUC)
 * 
 * Performance:
 * - Geist font loaded via next/font (no layout shift)
 * - suppressHydrationWarning prevents mismatch on theme attributes
 */

export const metadata: Metadata = {
  title: {
    default: 'kingemma.dev | Senior Software Engineer',
    template: '%s | kingemma.dev',
  },
  description:
    'Senior Software Engineer specializing in building performant, accessible web applications with modern technologies.',
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Web Development',
    'Emmanuel Tagbor',
    'KingEmma',
  ],
  authors: [{ name: 'Emmanuel Tagbor' }],
  creator: 'Emmanuel Tagbor',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'kingemma.dev',
    title: 'kingemma.dev | Senior Software Engineer',
    description:
      'Senior Software Engineer specializing in building performant, accessible web applications.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'kingemma.dev | Senior Software Engineer',
    creator: '@KingEmmaDev',
    description:
      'Senior Software Engineer specializing in building performant, accessible web applications.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0a09' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// Script to prevent theme flash on page load
const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('portfolio-theme') || 'system';
      const accent = localStorage.getItem('portfolio-accent') || 'violet';
      const resolved = theme === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : theme;
      document.documentElement.setAttribute('data-theme', resolved);
      document.documentElement.setAttribute('data-accent', accent);
      document.documentElement.classList.add(resolved);
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <ThemeProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
