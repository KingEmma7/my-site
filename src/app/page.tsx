import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { ProjectsPreview } from '@/components/sections/ProjectsPreview';

/**
 * Home Page
 * 
 * Architecture:
 * - Server Component (default) - Hero, About, ProjectsPreview are client components
 *   but this page itself is a Server Component wrapper
 * - Sections are loaded in order for optimal LCP
 * 
 * Performance:
 * - Critical CSS inlined by Next.js
 * - Above-fold content (Hero) loads first
 * - Below-fold sections use IntersectionObserver for animations
 * 
 * TODO: Add TIL preview section
 * TODO: Add latest blog posts section
 * TODO: Add contact CTA section
 */

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsPreview />

      {/* 
        TODO: Add these sections:
        
        <LatestPosts /> - Latest 3 blog posts from Contentful
        <TILPreview /> - Recent TIL entries
        <ContactCTA /> - Simple CTA to contact page
      */}
    </>
  );
}
