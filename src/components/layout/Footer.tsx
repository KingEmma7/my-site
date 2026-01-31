import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

/**
 * Footer Component (Server Component)
 * 
 * Performance: This is a Server Component - no client JS
 * Simple, clean footer with essential links and copyright
 */

const footerLinks = {
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/til', label: 'TIL' },
    { href: '/contact', label: 'Contact' },
  ],
  social: [
    { href: 'https://github.com/KingEmma7', label: 'GitHub', external: true },
    { href: 'https://www.linkedin.com/in/emmanuel-tagbor-dev/', label: 'LinkedIn', external: true },
    { href: 'https://x.com/KingEmmaDev', label: 'X (Twitter)', external: true },
  ],
} as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="space-y-4">
            <Link
              href="/"
              className={cn(
                'font-semibold text-lg tracking-tight inline-block',
                'text-foreground hover:text-accent',
                'transition-colors duration-200'
              )}
            >
              <span className="font-mono text-accent">{'>'}</span> kingemma.dev
            </Link>
            <p className="text-foreground-muted text-sm max-w-xs">
              Senior Software Engineer crafting thoughtful digital experiences
              with performance and accessibility at the forefront.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm text-foreground-muted hover:text-foreground',
                      'transition-colors duration-200'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social column */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Connect</h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'text-sm text-foreground-muted hover:text-foreground',
                      'transition-colors duration-200',
                      'inline-flex items-center gap-1'
                    )}
                  >
                    {link.label}
                    <svg
                      className="w-3 h-3 opacity-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground-subtle">
            © {currentYear} Emmanuel Tagbor. All rights reserved.
          </p>
          <p className="text-sm text-foreground-subtle">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
