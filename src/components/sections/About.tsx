'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils/cn';

/**
 * About / Why Hire Me Section
 * 
 * Architecture:
 * - Card-based layout highlighting key strengths
 * - Each card animates on first viewport entry
 * - Content focuses on decision-making, trade-offs, and impact
 * 
 * Performance:
 * - CSS-only animations via AnimatedSection
 * - Staggered delays for orchestrated reveal
 * - No complex interactions
 */

const strengths = [
  {
    title: 'Architectural Thinking',
    description:
      'I design systems that scale. From choosing the right data structures to planning for future requirements, I prioritize maintainability without over-engineering.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    title: 'Performance Obsessed',
    description:
      'Every millisecond matters. I optimize critical paths, minimize bundle sizes, and make data-driven decisions using Core Web Vitals and real user metrics.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Accessibility First',
    description:
      "Inclusive design isn't an afterthought. I build with WCAG guidelines in mind, ensuring everyone can use what I create—regardless of ability.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Clear Communication',
    description:
      'Technical decisions require context. I document reasoning, explain trade-offs to stakeholders, and ensure teams understand the "why" behind the "what".',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

export function About() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="about-heading">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16">
          <h2
            id="about-heading"
            className={cn(
              'text-3xl md:text-4xl font-bold tracking-tight',
              'text-foreground'
            )}
          >
            Why Work With Me
          </h2>
          <p className="mt-4 text-foreground-muted text-lg max-w-2xl mx-auto">
            Beyond writing code, I bring a holistic perspective to engineering
            challenges—balancing technical excellence with business impact.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strengths.map((strength, index) => (
            <AnimatedSection
              key={strength.title}
              delay={index * 100}
              className={cn(
                'group relative p-6 md:p-8 rounded-2xl',
                'bg-surface-elevated border border-border',
                'hover:border-accent/30 hover:shadow-md',
                'transition-all duration-300'
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  'inline-flex p-3 rounded-xl mb-4',
                  'bg-accent-muted text-accent',
                  'group-hover:bg-accent group-hover:text-white',
                  'transition-colors duration-300'
                )}
              >
                {strength.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {strength.title}
              </h3>
              <p className="text-foreground-muted leading-relaxed">
                {strength.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
