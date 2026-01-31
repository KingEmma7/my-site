'use client';

import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils/cn';

/**
 * Projects Preview Section
 * 
 * Architecture:
 * - Case-study driven presentation
 * - Each project shows Problem → Solution → Impact
 * - Links to full project page or live site
 * 
 * Performance:
 * - No images in preview (loaded on project page)
 * - Simple CSS animations
 * - Semantic HTML for accessibility
 */

const featuredProjects = [
  {
    slug: 'constract',
    title: 'Constract - Construction Materials Platform',
    problem: 'Construction industry in Ghana faced procurement delays, material theft, overbilling, and lack of logistics transparency.',
    solution: 'Built a digital procurement platform with real-time tracking, supplier management, and transparent pricing across Ghana.',
    impact: '5,000+ materials available, 50+ trusted suppliers, 24/7 support',
    tags: ['Next.js', 'TypeScript', 'Real-time Tracking', 'Payment Integration'],
    url: 'https://constract.org',
  },
  {
    slug: 'ars-wovenu-memorial-chapel',
    title: 'ARS Wovenu Memorial Chapel',
    problem: 'Church needed a modern digital presence for sermons, events, and multi-language spiritual resources.',
    solution: 'Developed a feature-rich website with sermon archives, pocket calendar in 3 languages, member portal, and event management.',
    impact: 'Multi-language support, sermon streaming, member authentication',
    tags: ['Next.js', 'Multi-language', 'CMS', 'Authentication'],
    url: 'https://arswovenumemorialchapel.org',
  },
  {
    slug: 'kofi-asiedu-mahama',
    title: 'Kofi Asiedu-Mahama - Author Portfolio',
    problem: 'Author needed a professional online presence to promote his book and build an engaged community.',
    solution: 'Created an elegant landing page with book promotion, research papers section, and newsletter integration.',
    impact: 'Book sales integration, newsletter signup, social media presence',
    tags: ['Next.js', 'Tailwind CSS', 'Newsletter', 'Responsive'],
    url: 'https://kofiasiedumahama.com',
  },
];

export function ProjectsPreview() {
  return (
    <section
      className="py-24 md:py-32 bg-surface-elevated"
      aria-labelledby="projects-heading"
    >
      <div className="section-container">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2
              id="projects-heading"
              className={cn(
                'text-3xl md:text-4xl font-bold tracking-tight',
                'text-foreground'
              )}
            >
              Featured Projects
            </h2>
            <p className="mt-4 text-foreground-muted text-lg max-w-xl">
              Selected work demonstrating problem-solving approach,
              technical decisions, and measurable outcomes.
            </p>
          </div>
          <Link
            href="/projects"
            className={cn(
              'mt-6 md:mt-0 inline-flex items-center gap-2',
              'text-accent font-medium hover:text-accent-hover',
              'transition-colors duration-200'
            )}
          >
            View all projects
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </AnimatedSection>

        <div className="space-y-6">
          {featuredProjects.map((project, index) => (
            <AnimatedSection key={project.slug} delay={index * 100}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'block group p-6 md:p-8 rounded-2xl',
                  'bg-surface border border-border',
                  'hover:border-accent/30 hover:shadow-lg',
                  'transition-all duration-300'
                )}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Project info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
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

                    <div className="mt-4 space-y-3 text-foreground-muted">
                      <p>
                        <span className="font-medium text-foreground">
                          Challenge:
                        </span>{' '}
                        {project.problem}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Approach:
                        </span>{' '}
                        {project.solution}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            'px-3 py-1 text-xs font-medium rounded-full',
                            'bg-accent-muted text-accent'
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact metric */}
                  <div
                    className={cn(
                      'lg:w-64 flex-shrink-0',
                      'p-4 rounded-xl bg-accent-muted',
                      'border border-accent/20'
                    )}
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-accent mb-2">
                      Key Features
                    </p>
                    <p className="text-foreground font-medium">
                      {project.impact}
                    </p>
                  </div>
                </div>

                {/* Arrow indicator */}
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
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
