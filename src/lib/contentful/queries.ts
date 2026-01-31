/**
 * Contentful GraphQL Queries
 * 
 * Performance Notes:
 * - Only request fields you need
 * - Use fragments for reusable field selections
 * - Limit results for preview sections
 */

// ===========================================
// Fragments
// ===========================================

export const ASSET_FRAGMENT = `
  fragment AssetFields on Asset {
    sys {
      id
    }
    title
    description
    url
    width
    height
  }
`;

export const AUTHOR_FRAGMENT = `
  fragment AuthorFields on Author {
    name
    bio
    avatar {
      ...AssetFields
    }
    twitter
    github
    linkedin
  }
`;

// ===========================================
// Blog Queries
// ===========================================

export const GET_ALL_BLOG_POSTS = `
  ${ASSET_FRAGMENT}
  ${AUTHOR_FRAGMENT}

  query GetAllBlogPosts($limit: Int, $skip: Int) {
    blogPostCollection(
      order: sys_publishedAt_DESC,
      limit: $limit,
      skip: $skip
    ) {
      total
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        title
        slug
        excerpt
        featuredImage {
          ...AssetFields
        }
        tags
        readingTime
        author {
          ...AuthorFields
        }
      }
    }
  }
`;

export const GET_BLOG_POST_BY_SLUG = `
  ${ASSET_FRAGMENT}
  ${AUTHOR_FRAGMENT}

  query GetBlogPostBySlug($slug: String!) {
    blogPostCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        title
        slug
        excerpt
        content {
          json
        }
        featuredImage {
          ...AssetFields
        }
        tags
        readingTime
        author {
          ...AuthorFields
        }
      }
    }
  }
`;

export const GET_BLOG_POST_SLUGS = `
  query GetBlogPostSlugs {
    blogPostCollection {
      items {
        slug
      }
    }
  }
`;

// ===========================================
// TIL Queries
// ===========================================

export const GET_ALL_TIL_ENTRIES = `
  query GetAllTILEntries($limit: Int, $skip: Int) {
    tilCollection(
      order: sys_publishedAt_DESC,
      limit: $limit,
      skip: $skip
    ) {
      total
      items {
        sys {
          id
          publishedAt
        }
        title
        slug
        content {
          json
        }
        tags
        category
      }
    }
  }
`;

export const GET_TIL_BY_SLUG = `
  query GetTILBySlug($slug: String!) {
    tilCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
          publishedAt
        }
        title
        slug
        content {
          json
        }
        tags
        category
      }
    }
  }
`;

// ===========================================
// Project Queries
// ===========================================

export const GET_ALL_PROJECTS = `
  ${ASSET_FRAGMENT}

  query GetAllProjects($featured: Boolean) {
    projectCollection(
      order: order_ASC,
      where: { featured: $featured }
    ) {
      total
      items {
        sys {
          id
        }
        title
        slug
        summary
        problem
        impact
        technologies
        featuredImage {
          ...AssetFields
        }
        featured
        order
      }
    }
  }
`;

export const GET_PROJECT_BY_SLUG = `
  ${ASSET_FRAGMENT}

  query GetProjectBySlug($slug: String!) {
    projectCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
        }
        title
        slug
        summary
        problem
        constraints
        solution {
          json
        }
        impact
        metrics
        technologies
        featuredImage {
          ...AssetFields
        }
        gallery {
          ...AssetFields
        }
        featured
      }
    }
  }
`;

export const GET_PROJECT_SLUGS = `
  query GetProjectSlugs {
    projectCollection {
      items {
        slug
      }
    }
  }
`;
