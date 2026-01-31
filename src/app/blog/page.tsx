import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { isContentfulConfigured } from '@/lib/contentful/client';

/**
 * Blog Page (Server Component)
 * 
 * Architecture:
 * - Fetches posts from Contentful
 * - Static generation with ISR
 * - Fallback for development without Contentful
 * 
 * Performance:
 * - Server Component - no client JS
 * - ISR revalidation every 60 seconds
 * 
 * TODO: Implement full Contentful integration
 */

// Placeholder posts for development
const placeholderPosts = [
  {
    slug: 'building-performant-react-apps',
    title: 'Building Performant React Applications',
    excerpt:
      'A deep dive into React performance optimization, from memo and useMemo to code splitting and virtualization.',
    publishedAt: '2024-01-15',
    readingTime: 8,
    tags: ['React', 'Performance', 'JavaScript'],
  },
  {
    slug: 'typescript-patterns',
    title: 'Advanced TypeScript Patterns I Use Every Day',
    excerpt:
      'Practical TypeScript patterns that make your code safer and more maintainable, from discriminated unions to branded types.',
    publishedAt: '2024-01-08',
    readingTime: 12,
    tags: ['TypeScript', 'Patterns', 'Best Practices'],
  },
  {
    slug: 'design-system-journey',
    title: 'Our Design System Journey: From Chaos to Consistency',
    excerpt:
      'How we built and scaled a design system across 12 product teams, including the technical and organizational challenges we faced.',
    publishedAt: '2023-12-20',
    readingTime: 15,
    tags: ['Design Systems', 'React', 'Architecture'],
  },
];

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function BlogPage() {
  // TODO: Fetch from Contentful when configured
  // const posts = isContentfulConfigured() ? await fetchBlogPosts() : placeholderPosts;
  const posts = placeholderPosts;

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-lg text-foreground-muted">
            Thoughts on software engineering, architecture decisions, and lessons
            learned building web applications at scale.
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
              <strong>Development Mode:</strong> Showing placeholder posts.
              Configure Contentful environment variables to fetch real content.
            </p>
          </div>
        )}

        {/* Posts list */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className={cn(
                  'block p-6 md:p-8 rounded-2xl',
                  'bg-surface-elevated border border-border',
                  'hover:border-accent/30 hover:shadow-md',
                  'transition-all duration-300',
                  'group'
                )}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-sm text-foreground-subtle mb-3">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readingTime} min read</span>
                    </div>

                    {/* Title */}
                    <h2
                      className={cn(
                        'text-xl md:text-2xl font-semibold',
                        'text-foreground group-hover:text-accent',
                        'transition-colors duration-200'
                      )}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-3 text-foreground-muted line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            'px-2.5 py-0.5 text-xs font-medium rounded-full',
                            'bg-accent-muted text-accent'
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className={cn(
                      'hidden md:flex items-center justify-center',
                      'w-10 h-10 rounded-full',
                      'bg-surface border border-border',
                      'text-foreground-subtle group-hover:text-accent',
                      'group-hover:border-accent/30',
                      'transition-all duration-200'
                    )}
                  >
                    <svg
                      className={cn(
                        'w-4 h-4 transform transition-transform duration-200',
                        'group-hover:translate-x-0.5'
                      )}
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
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
