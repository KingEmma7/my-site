import { notFound, redirect } from 'next/navigation';

/**
 * Project Detail Page (Server Component)
 * 
 * For now, redirects to the live project URL.
 * In the future, this can be expanded to full case studies.
 */

const projects: Record<string, { title: string; url: string }> = {
  'constract': {
    title: 'Constract - Construction Materials Platform',
    url: 'https://constract.org',
  },
  'ars-wovenu-memorial-chapel': {
    title: 'ARS Wovenu Memorial Chapel',
    url: 'https://arswovenumemorialchapel.org',
  },
  'kofi-asiedu-mahama': {
    title: 'Kofi Asiedu-Mahama - Author Portfolio',
    url: 'https://kofiasiedumahama.com',
  },
  'estees-bakery': {
    title: "Estee's Bakery",
    url: 'https://esteesbakery.com',
  },
  'king-pizza-shop': {
    title: "King's Pizza Shop",
    url: 'https://king-pizza-shop.vercel.app',
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: `View ${project.title} - a project by Emmanuel Tagbor`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    notFound();
  }

  // Redirect to the live project URL
  redirect(project.url);
}
