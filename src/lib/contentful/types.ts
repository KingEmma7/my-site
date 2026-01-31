/**
 * Contentful Type Definitions
 * 
 * These types mirror the Contentful content models.
 * Keep in sync with your Contentful space.
 * 
 * TODO: Consider using contentful-typescript-codegen for auto-generation
 */

// Rich text content from Contentful
import type { Document } from '@contentful/rich-text-types';

// ===========================================
// Asset Types
// ===========================================

export interface ContentfulAsset {
  sys: {
    id: string;
  };
  title: string;
  description: string;
  url: string;
  width: number;
  height: number;
}

// ===========================================
// Blog Post
// ===========================================

export interface BlogPost {
  sys: {
    id: string;
    publishedAt: string;
    firstPublishedAt: string;
  };
  title: string;
  slug: string;
  excerpt: string;
  content: {
    json: Document;
  };
  featuredImage: ContentfulAsset | null;
  tags: string[];
  readingTime: number;
  author: Author | null;
}

export interface BlogPostCollection {
  blogPostCollection: {
    items: BlogPost[];
    total: number;
  };
}

// ===========================================
// TIL (Today I Learned)
// ===========================================

export interface TILEntry {
  sys: {
    id: string;
    publishedAt: string;
  };
  title: string;
  slug: string;
  content: {
    json: Document;
  };
  tags: string[];
  category: string;
}

export interface TILCollection {
  tilCollection: {
    items: TILEntry[];
    total: number;
  };
}

// ===========================================
// Project (Case Study)
// ===========================================

export interface Project {
  sys: {
    id: string;
  };
  title: string;
  slug: string;
  summary: string;
  problem: string;
  constraints: string[];
  solution: {
    json: Document;
  };
  impact: string;
  metrics: ProjectMetric[];
  technologies: string[];
  featuredImage: ContentfulAsset | null;
  gallery: ContentfulAsset[];
  featured: boolean;
  order: number;
}

export interface ProjectMetric {
  label: string;
  value: string;
  improvement?: string;
}

export interface ProjectCollection {
  projectCollection: {
    items: Project[];
    total: number;
  };
}

// ===========================================
// Author
// ===========================================

export interface Author {
  name: string;
  bio: string;
  avatar: ContentfulAsset | null;
  twitter: string | null;
  github: string | null;
  linkedin: string | null;
}
