import { GraphQLClient } from 'graphql-request';

/**
 * Contentful GraphQL Client
 * 
 * Architecture:
 * - Uses GraphQL for efficient data fetching
 * - Environment variables for configuration
 * - Revalidation settings for ISR
 * 
 * Performance:
 * - Query only needed fields (no over-fetching)
 * - Built-in caching with Next.js fetch
 * - ISR for content updates without rebuilds
 * 
 * Setup:
 * 1. Create Contentful space
 * 2. Add environment variables (see .env.example)
 * 3. Create content types per schema below
 */

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_TOKEN;
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT ?? 'master';

// ISR revalidation period in seconds
export const REVALIDATE_PERIOD = 60; // 1 minute

function getEndpoint(_preview = false): string {
  if (!CONTENTFUL_SPACE_ID) {
    throw new Error('CONTENTFUL_SPACE_ID is not defined');
  }

  // Note: In production, you might use different endpoints for preview
  // const host = preview ? 'preview.contentful.com' : 'cdn.contentful.com';
  return `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}`;
}

function getClient(preview = false): GraphQLClient {
  const endpoint = getEndpoint(preview);
  const token = preview ? CONTENTFUL_PREVIEW_TOKEN : CONTENTFUL_ACCESS_TOKEN;

  if (!token) {
    throw new Error(
      preview
        ? 'CONTENTFUL_PREVIEW_TOKEN is not defined'
        : 'CONTENTFUL_ACCESS_TOKEN is not defined'
    );
  }

  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Fetch data from Contentful GraphQL API
 * 
 * @param query - GraphQL query string
 * @param variables - Query variables
 * @param preview - Use preview API (draft content)
 */
export async function fetchContentful<T>(
  query: string,
  variables?: Record<string, unknown>,
  preview = false
): Promise<T> {
  const client = getClient(preview);

  try {
    const data = await client.request<T>(query, variables);
    return data;
  } catch (error) {
    console.error('Contentful fetch error:', error);
    throw error;
  }
}

/**
 * Check if Contentful is configured
 * Useful for graceful degradation during development
 */
export function isContentfulConfigured(): boolean {
  return Boolean(CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN);
}
