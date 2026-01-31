# kingemma.dev

A production-ready personal portfolio website for Emmanuel Tagbor, built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + CSS Variables
- **CMS**: Contentful (GraphQL)
- **Animation**: Framer Motion (used sparingly)
- **Deployment**: Vercel (recommended)

## Architecture Decisions

### Server Components by Default

All pages and layouts are Server Components unless interaction is required. This minimizes client-side JavaScript and improves performance.

### Client Components

Only used for:
- Interactive hero animation
- Theme/accent switching
- Contact form
- Animated sections (scroll reveals)

### ISR (Incremental Static Regeneration)

Content pages revalidate every 60 seconds, allowing updates without rebuilds while maintaining fast static delivery.

### CSS Variables for Theming

Three-layer theming system:
1. **Color mode**: Light / Dark / System
2. **Accent color**: Violet / Emerald / Amber / Rose / Cyan

All colors reference CSS custom properties, enabling runtime theme switching without layout recalculation.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
npm start
```

### Bundle Analysis

```bash
npm run analyze
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_api_token
CONTENTFUL_ENVIRONMENT=master

# Site Configuration (optional)
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

**Note**: The site works without Contentful configured, showing placeholder content during development.

## Contentful Schema

### Content Types

#### 1. Blog Post (`blogPost`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | Short text | Yes | Post title |
| slug | Short text | Yes | URL slug (unique) |
| excerpt | Long text | Yes | Brief summary |
| content | Rich text | Yes | Post body (supports MDX) |
| featuredImage | Media | No | Hero image |
| tags | Short text (list) | No | Post categories |
| readingTime | Integer | No | Calculated reading time |
| author | Reference (Author) | No | Post author |

#### 2. TIL Entry (`til`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | Short text | Yes | Entry title |
| slug | Short text | Yes | URL slug (unique) |
| content | Rich text | Yes | Entry content |
| category | Short text | Yes | Category (CSS, TypeScript, etc.) |
| tags | Short text (list) | No | Tags |

#### 3. Project (`project`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | Short text | Yes | Project title |
| slug | Short text | Yes | URL slug (unique) |
| summary | Long text | Yes | Brief description |
| problem | Long text | Yes | Problem statement |
| constraints | Short text (list) | No | Project constraints |
| solution | Rich text | Yes | Solution description |
| impact | Short text | Yes | Impact summary |
| metrics | JSON | No | Key metrics |
| technologies | Short text (list) | Yes | Tech stack |
| featuredImage | Media | No | Project hero image |
| gallery | Media (list) | No | Project screenshots |
| featured | Boolean | Yes | Show on homepage |
| order | Integer | Yes | Sort order |

#### 4. Author (`author`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | Short text | Yes | Author name |
| bio | Long text | No | Short bio |
| avatar | Media | No | Profile picture |
| twitter | Short text | No | Twitter handle |
| github | Short text | No | GitHub username |
| linkedin | Short text | No | LinkedIn URL |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── blog/               # Blog section
│   ├── til/                # TIL section
│   ├── projects/           # Projects section
│   └── contact/            # Contact page
├── components/
│   ├── layout/             # Layout components (Nav, Footer)
│   ├── providers/          # Context providers
│   ├── sections/           # Page sections (Hero, About, etc.)
│   └── ui/                 # Reusable UI components
├── hooks/                  # Custom React hooks
└── lib/
    ├── contentful/         # Contentful client & queries
    └── utils/              # Utility functions
```

## Performance Targets

- **Lighthouse Score**: 95+
- **LCP**: < 2.5s
- **CLS**: ≈ 0
- **JavaScript Bundle**: < 170kb gzipped

## Animation Guidelines

1. **No animation without purpose** - Every animation should enhance understanding
2. **Respect prefers-reduced-motion** - All animations check user preferences
3. **Avoid layout-shifting animations** - Use `transform` and `opacity` only
4. **Prefer CSS over JS** - Use IntersectionObserver + CSS for scroll animations

## TODOs for Expansion

- [ ] Implement full Contentful integration
- [ ] Add MDX processing with Shiki syntax highlighting
- [ ] Create table of contents for blog posts
- [ ] Add RSS feed
- [ ] Implement sitemap generation
- [ ] Add Open Graph images
- [ ] Set up Lighthouse CI
- [ ] Add Storybook for component documentation
- [ ] Implement contact form backend (Formspree, Resend, etc.)
- [ ] Add loading states and skeletons
- [ ] Implement search functionality

## License

MIT
