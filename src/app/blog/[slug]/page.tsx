import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

/**
 * Blog Post Page (Server Component)
 * 
 * Architecture:
 * - MDX content rendering
 * - Reading time calculation
 * - Table of contents (TODO)
 * - Syntax highlighting with Shiki
 * 
 * Performance:
 * - Server Component - no client JS for content
 * - ISR for content updates
 * 
 * TODO: Implement Contentful + MDX integration
 */

// Placeholder blog posts
const posts: Record<
  string,
  {
    title: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    readingTime: number;
    tags: string[];
  }
> = {
  'building-performant-react-apps': {
    title: 'Building Performant React Applications',
    excerpt:
      'A deep dive into React performance optimization, from memo and useMemo to code splitting and virtualization.',
    content: `
## Understanding React's Rendering Model

Before optimizing, it's crucial to understand how React decides what to re-render. React's reconciliation algorithm compares the previous and current virtual DOM trees, updating only what's changed.

The key insight: **a component re-renders when its parent re-renders, regardless of whether its props changed.**

## The Optimization Toolkit

### 1. React.memo for Pure Components

Wrap components in \`React.memo\` when they:
- Receive the same props frequently
- Are expensive to render
- Are used in lists

\`\`\`tsx
const ExpensiveComponent = React.memo(({ data }) => {
  // Expensive computation here
  return <div>{/* ... */}</div>;
});
\`\`\`

### 2. useMemo for Expensive Calculations

Use \`useMemo\` for computationally expensive operations that don't need to run on every render:

\`\`\`tsx
const sortedItems = useMemo(() => {
  return items.sort((a, b) => b.score - a.score);
}, [items]);
\`\`\`

### 3. useCallback for Stable References

When passing callbacks to memoized children, stabilize references with \`useCallback\`:

\`\`\`tsx
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);
\`\`\`

## Code Splitting Strategies

### Route-based Splitting

Next.js handles this automatically. Each page is a separate chunk.

### Component-based Splitting

For heavy components that aren't immediately visible:

\`\`\`tsx
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});
\`\`\`

## Virtualization for Long Lists

When rendering thousands of items, virtualize:

\`\`\`tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });
  
  // Render only visible items
}
\`\`\`

## Measuring Performance

Use React DevTools Profiler and Web Vitals to measure actual impact. Don't optimize prematurely—measure first, then optimize what matters.
    `,
    publishedAt: '2024-01-15',
    readingTime: 8,
    tags: ['React', 'Performance', 'JavaScript'],
  },
  'typescript-patterns': {
    title: 'Advanced TypeScript Patterns I Use Every Day',
    excerpt:
      'Practical TypeScript patterns that make your code safer and more maintainable.',
    content: `
## Discriminated Unions

One of TypeScript's most powerful features for modeling state:

\`\`\`tsx
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
\`\`\`

TypeScript narrows the type based on the status field.

## Branded Types

Prevent mixing up primitive types that represent different concepts:

\`\`\`tsx
type UserId = string & { readonly brand: unique symbol };
type OrderId = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

// Now these can't be mixed up
function getUser(id: UserId) { /* ... */ }
function getOrder(id: OrderId) { /* ... */ }
\`\`\`

## The satisfies Operator

Validate types while preserving inference:

\`\`\`tsx
const config = {
  port: 3000,
  host: 'localhost',
} satisfies Record<string, string | number>;

// config.port is inferred as number, not string | number
\`\`\`

More patterns in the full article...
    `,
    publishedAt: '2024-01-08',
    readingTime: 12,
    tags: ['TypeScript', 'Patterns', 'Best Practices'],
  },
  'design-system-journey': {
    title: 'Our Design System Journey: From Chaos to Consistency',
    excerpt:
      'How we built and scaled a design system across 12 product teams.',
    content: `
## The Starting Point

When I joined, we had 12 product teams building with inconsistent patterns. Button styles varied wildly, color palettes were team-specific, and every new feature meant reinventing the wheel.

## Phase 1: Design Tokens

We started with tokens—the atomic building blocks:

\`\`\`json
{
  "color": {
    "brand": {
      "primary": { "value": "#7c3aed" },
      "secondary": { "value": "#10b981" }
    }
  },
  "spacing": {
    "sm": { "value": "8px" },
    "md": { "value": "16px" }
  }
}
\`\`\`

## Phase 2: Component Library

Built on top of tokens, components encode design decisions:

- Accessibility baked in
- Consistent API patterns
- Themeable via tokens

## Phase 3: Adoption

The hardest part isn't building—it's getting teams to use it. We focused on:

1. Developer experience (great docs, easy installation)
2. Migration tools (automated codemods)
3. Executive sponsorship

## Results

- 40% faster feature development
- 60% reduction in design QA cycles
- 100% team adoption

Full case study coming soon...
    `,
    publishedAt: '2023-12-20',
    readingTime: 15,
    tags: ['Design Systems', 'React', 'Architecture'],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen pt-32 pb-20">
      <div className="section-container">
        {/* Back link */}
        <Link
          href="/blog"
          className={cn(
            'inline-flex items-center gap-2 mb-8',
            'text-foreground-muted hover:text-foreground',
            'transition-colors duration-200'
          )}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <header className="max-w-3xl mb-12">
          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-foreground-subtle mb-4">
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

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {post.title}
          </h1>

          <p className="text-xl text-foreground-muted">{post.excerpt}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'px-3 py-1 text-sm font-medium rounded-full',
                  'bg-accent-muted text-accent'
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="max-w-3xl prose-custom">
          {/* 
            TODO: Replace with MDX rendering
            This is placeholder content rendering
          */}
          <div className="space-y-6 text-foreground-muted leading-relaxed">
            {post.content.split('\n\n').map((paragraph, index) => {
              // Simple markdown-like rendering
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={index}
                    className="text-2xl font-bold text-foreground mt-12 mb-4"
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={index}
                    className="text-xl font-semibold text-foreground mt-8 mb-3"
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('```')) {
                const lines = paragraph.split('\n');
                const code = lines.slice(1, -1).join('\n');
                return (
                  <pre
                    key={index}
                    className="p-4 rounded-lg bg-surface-elevated overflow-x-auto text-sm font-mono"
                  >
                    <code>{code}</code>
                  </pre>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Author / CTA */}
        <div className="max-w-3xl mt-16 pt-12 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                Thanks for reading!
              </h3>
              <p className="text-foreground-muted mt-1">
                Have questions or feedback? I&apos;d love to hear from you.
              </p>
            </div>
            <Link
              href="/contact"
              className={cn(
                'inline-flex items-center justify-center',
                'px-6 py-3 rounded-lg',
                'border border-border',
                'text-foreground font-medium',
                'hover:bg-accent-muted hover:border-accent',
                'transition-colors duration-200'
              )}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
