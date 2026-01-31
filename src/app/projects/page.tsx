import { cn } from '@/lib/utils/cn';
import { isContentfulConfigured } from '@/lib/contentful/client';

/**
 * Projects Page (Server Component)
 * 
 * Architecture:
 * - Case-study driven presentation
 * - Each project: Problem → Constraints → Solution → Impact
 * - Fetches from Contentful when configured
 * 
 * Performance:
 * - Server Component - no client JS
 * - Images lazy loaded with next/image
 * - ISR for content updates
 */

// Real projects
const projects = [
  {
    slug: 'constract',
    title: 'Constract - Construction Materials Platform',
    summary: 'A digital procurement platform streamlining construction material ordering and delivery across Ghana.',
    problem: 'Construction industry in Ghana faced procurement delays, material theft, overbilling, and lack of logistics transparency.',
    impact: '5,000+ materials available, 50+ trusted suppliers, 24/7 customer support',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Real-time Tracking', 'Payment Integration'],
    url: 'https://constract.org',
    featured: true,
  },
  {
    slug: 'ars-wovenu-memorial-chapel',
    title: 'ARS Wovenu Memorial Chapel',
    summary: 'A feature-rich church website with sermon archives, event management, multi-language pocket calendar, and member portal.',
    problem: 'The church needed a modern digital presence to connect with members, share sermons, manage events, and provide spiritual resources in multiple languages.',
    impact: 'Multi-language support (English, Akan, Ewe), sermon streaming, member sign-in portal',
    technologies: ['Next.js', 'TypeScript', 'Content Management', 'Multi-language', 'Member Authentication'],
    url: 'https://arswovenumemorialchapel.org',
    featured: true,
  },
  {
    slug: 'kofi-asiedu-mahama',
    title: 'Kofi Asiedu-Mahama - Author Portfolio',
    summary: 'A professional landing page for a thought leader and wealth psychology expert, featuring book promotion and newsletter signup.',
    problem: 'The author needed a professional online presence to promote his book, share research, and build an engaged community.',
    impact: 'Book sales integration, newsletter subscription, social media integration',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Newsletter Integration', 'Responsive Design'],
    url: 'https://kofiasiedumahama.com',
    featured: true,
  },
  {
    slug: 'estees-bakery',
    title: "Estee's Bakery",
    summary: 'A delightful e-commerce website for a local bakery showcasing their products and enabling online orders.',
    problem: 'The bakery needed an online presence to showcase their products, reach more customers, and streamline ordering.',
    impact: 'Online product catalog, order management, beautiful product showcase',
    technologies: ['Next.js', 'E-commerce', 'Tailwind CSS', 'Responsive Design'],
    url: 'https://esteesbakery.com',
    featured: false,
  },
  {
    slug: 'king-pizza-shop',
    title: "King's Pizza Shop",
    summary: 'A modern pizza ordering web app with shopping cart functionality and a clean, appetizing design.',
    problem: 'Personal project to demonstrate e-commerce capabilities with cart management and product browsing.',
    impact: 'Shopping cart functionality, product catalog, Ghana Cedis pricing',
    technologies: ['React', 'JavaScript', 'CSS', 'State Management', 'Vercel'],
    url: 'https://king-pizza-shop.vercel.app',
    featured: false,
  },
];

export const revalidate = 60;

export default async function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Projects
          </h1>
          <p className="text-lg text-foreground-muted">
            Selected work demonstrating problem-solving approach, technical
            decisions, and measurable business impact.
          </p>
        </div>

        {/* Development notice */}
        {!isContentfulConfigured() && (
          <div
            className={cn(
              'mb-8 p-4 rounded-lg',
              'bg-accent/10 border border-accent/20',
              'text-accent'
            )}
          >
            <p className="text-sm">
              <strong>Live Projects:</strong> Click on any project to visit the live site.
            </p>
          </div>
        )}

        {/* Featured Projects */}
        <section className="mb-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-subtle mb-8">
            Featured Projects
          </h2>
          <div className="space-y-6">
            {featuredProjects.map((project) => (
              <a
                key={project.slug}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'block p-6 md:p-8 rounded-2xl',
                  'bg-surface-elevated border border-border',
                  'hover:border-accent/30 hover:shadow-lg',
                  'transition-all duration-300',
                  'group'
                )}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3
                        className={cn(
                          'text-xl md:text-2xl font-semibold',
                          'text-foreground group-hover:text-accent',
                          'transition-colors duration-200'
                        )}
                      >
                        {project.title}
                      </h3>
                      <svg
                        className="w-4 h-4 text-foreground-subtle group-hover:text-accent transition-colors"
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
                    </div>
                    <p className="mt-2 text-foreground-muted">
                      {project.summary}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-foreground-muted">
                      <p>
                        <span className="font-medium text-foreground">Challenge:</span>{' '}
                        {project.problem}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className={cn(
                            'px-2.5 py-0.5 text-xs font-medium rounded-full',
                            'bg-accent-muted text-accent'
                          )}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  <div
                    className={cn(
                      'lg:w-56 flex-shrink-0',
                      'p-4 rounded-xl bg-accent-muted',
                      'border border-accent/20'
                    )}
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-accent mb-2">
                      Key Features
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {project.impact}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div
                  className={cn(
                    'mt-6 flex items-center gap-2 text-sm',
                    'text-foreground-subtle group-hover:text-accent',
                    'transition-colors duration-200'
                  )}
                >
                  <span>Visit live site</span>
                  <svg
                    className={cn(
                      'w-4 h-4 transform transition-transform duration-200',
                      'group-hover:translate-x-1'
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
              </a>
            ))}
          </div>
        </section>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <section>
            <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-subtle mb-8">
              Other Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project) => (
                <a
                  key={project.slug}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'block p-6 rounded-xl',
                    'bg-surface-elevated border border-border',
                    'hover:border-accent/30 hover:shadow-md',
                    'transition-all duration-300',
                    'group'
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3
                      className={cn(
                        'text-lg font-semibold',
                        'text-foreground group-hover:text-accent',
                        'transition-colors duration-200'
                      )}
                    >
                      {project.title}
                    </h3>
                    <svg
                      className="w-3.5 h-3.5 text-foreground-subtle group-hover:text-accent transition-colors"
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
                  </div>
                  <p className="mt-2 text-sm text-foreground-muted line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-foreground-subtle"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
