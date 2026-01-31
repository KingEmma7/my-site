import { cn } from '@/lib/utils/cn';
import { isContentfulConfigured } from '@/lib/contentful/client';

/**
 * TIL (Today I Learned) Page (Server Component)
 * 
 * Architecture:
 * - Lightweight knowledge log
 * - Fetches from Contentful TIL content type
 * - Chronological display, minimal animation
 * 
 * Performance:
 * - Server Component - no client JS
 * - Simple layout for fast rendering
 * - ISR for content updates
 * 
 * Why TIL?
 * - Shows curiosity and continuous learning
 * - Lower barrier to publish than full blog posts
 * - Signals engineering maturity
 */

// Placeholder TIL entries
const placeholderEntries = [
  {
    slug: 'css-has-selector',
    title: 'The :has() selector is finally widely supported',
    content: 'The parent selector we\'ve wanted for years is now available in all major browsers. Use it for conditional styling based on child elements.',
    publishedAt: '2024-01-20',
    category: 'CSS',
    tags: ['CSS', 'Selectors'],
  },
  {
    slug: 'typescript-satisfies',
    title: 'TypeScript satisfies operator for better inference',
    content: 'The satisfies operator validates types while preserving narrower inference. Perfect for configuration objects where you want type safety without losing literal types.',
    publishedAt: '2024-01-18',
    category: 'TypeScript',
    tags: ['TypeScript', 'Types'],
  },
  {
    slug: 'git-switch',
    title: 'git switch is cleaner than git checkout',
    content: 'Use git switch for branch operations and git restore for file operations. Clearer intent than the overloaded checkout command.',
    publishedAt: '2024-01-15',
    category: 'Git',
    tags: ['Git', 'CLI'],
  },
  {
    slug: 'react-compiler',
    title: 'React Compiler auto-memoizes components',
    content: 'The new React Compiler (React Forget) automatically applies memoization, potentially eliminating the need for manual useMemo and useCallback.',
    publishedAt: '2024-01-12',
    category: 'React',
    tags: ['React', 'Performance'],
  },
  {
    slug: 'node-test-runner',
    title: 'Node.js has a built-in test runner now',
    content: 'Since Node 18, you can use node --test to run tests without external dependencies. Great for small projects and libraries.',
    publishedAt: '2024-01-10',
    category: 'Node.js',
    tags: ['Node.js', 'Testing'],
  },
];

export const revalidate = 60;

export default async function TILPage() {
  // TODO: Fetch from Contentful when configured
  const entries = placeholderEntries;

  // Group by year-month
  const groupedEntries = entries.reduce(
    (acc, entry) => {
      const date = new Date(entry.publishedAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });

      const existing = acc.find((group) => group.key === key);
      if (existing) {
        existing.entries.push(entry);
      } else {
        acc.push({ key, label: monthLabel, entries: [entry] });
      }
      return acc;
    },
    [] as Array<{ key: string; label: string; entries: typeof entries }>
  );

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Today I Learned
          </h1>
          <p className="text-lg text-foreground-muted">
            A collection of bite-sized learnings—small discoveries that are worth
            remembering. Updated regularly as I explore new concepts.
          </p>
        </div>

        {/* Development notice */}
        {!isContentfulConfigured() && (
          <div
            className={cn(
              'mb-8 p-4 rounded-lg',
              'bg-amber-500/10 border border-amber-500/20',
              'text-amber-700 dark:text-amber-300'
            )}
          >
            <p className="text-sm">
              <strong>Development Mode:</strong> Showing placeholder entries.
              Configure Contentful to fetch real content.
            </p>
          </div>
        )}

        {/* Entries grouped by month */}
        <div className="space-y-12">
          {groupedEntries.map((group) => (
            <section key={group.key}>
              <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-subtle mb-6">
                {group.label}
              </h2>
              <div className="space-y-4">
                {group.entries.map((entry) => (
                  <article
                    key={entry.slug}
                    className={cn(
                      'p-5 rounded-xl',
                      'bg-surface-elevated border border-border',
                      'hover:border-accent/20',
                      'transition-colors duration-200'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Category badge */}
                      <span
                        className={cn(
                          'flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-md',
                          'bg-accent-muted text-accent'
                        )}
                      >
                        {entry.category}
                      </span>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground mb-1">
                          {entry.title}
                        </h3>
                        <p className="text-sm text-foreground-muted">
                          {entry.content}
                        </p>
                        <time
                          dateTime={entry.publishedAt}
                          className="block mt-2 text-xs text-foreground-subtle"
                        >
                          {new Date(entry.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
