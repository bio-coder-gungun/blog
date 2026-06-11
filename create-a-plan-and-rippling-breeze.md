# Blog Build Plan — bio-coder-gungun

## Context

Build a personal blog from scratch in `/Users/shagun/Documents/Blog` with three distinct content arms, clean aesthetics, and support for mathematical equations, interactive visualizations, and graphs. The blog will be deployed to GitHub Pages under `bio-coder-gungun.github.io/blog`. The design is inspired by Distill.pub's academic clarity but implemented as a modern multi-post blog rather than a single-article template.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 App Router + TypeScript | Static export, file-based routing, RSC for MDX |
| Content | MDX via `next-mdx-remote/rsc` | Lets posts use custom React components (Plotly, etc.) |
| Styling | Tailwind CSS + `@tailwindcss/typography` | Utility-first, `prose` class for article body |
| Math | remark-math + rehype-katex | Server-side LaTeX → KaTeX HTML, no client JS needed |
| Code highlighting | rehype-prism-plus | Token-level syntax highlighting via rehype |
| Visualizations | Plotly.js via `next/dynamic { ssr: false }` | Required for static export compatibility |
| Python tooling | conda environment | Prototyping charts/analyses before embedding in MDX |

---

## Three Blog Arms

| Arm | URL Path | Color | Purpose |
|---|---|---|---|
| Mathematical Intuition | `/mathematical-intuition` | Indigo `#4338CA` | Geometric/probabilistic intuition for math concepts |
| Translational Biology | `/translational-biology` | Teal `#0F766E` | Bench-to-bedside science behind clinical breakthroughs |
| Tools & News in Clinical Research | `/tools-and-news` | Rose `#E11D48` | Reviews, tutorials, and news on clinical research tools |

---

## Directory Structure

```
Blog/                                          # /Users/shagun/Documents/Blog
├── .github/
│   └── workflows/
│       └── deploy.yml                         # GitHub Actions → GitHub Pages
├── .gitignore
├── conda-environment.yml                      # Python authoring tools
├── next.config.mjs                            # Static export, basePath
├── tailwind.config.ts
├── tsconfig.json
├── package.json                               # type: module (ESM)
├── postcss.config.mjs
├── public/
│   └── .nojekyll                              # Prevents GitHub Pages Jekyll from hiding _next/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                         # Root layout: Nav, KaTeX CSS, Prism CSS
│   │   ├── page.tsx                           # Home: hero + recent posts across all arms
│   │   ├── globals.css                        # Tailwind directives
│   │   ├── mathematical-intuition/
│   │   │   ├── page.tsx                       # Arm listing page
│   │   │   └── [slug]/page.tsx                # Post page (template for all arms)
│   │   ├── translational-biology/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── tools-and-news/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   │
│   ├── components/
│   │   ├── Nav.tsx                            # Top nav with arm links + color indicators
│   │   ├── Footer.tsx
│   │   ├── PostCard.tsx                       # Card for listing pages (arm-colored border)
│   │   ├── ArmHero.tsx                        # Section banner with arm name + description
│   │   ├── MDXContent.tsx                     # Thin wrapper around compileMDX output
│   │   ├── PlotlyChart.tsx                    # Dynamic import, ssr: false
│   │   └── mdx-components/index.tsx           # MDX component registry (PlotlyChart, etc.)
│   │
│   ├── lib/
│   │   ├── types.ts                           # PostFrontmatter, Post, ArmSlug interfaces
│   │   ├── arms.ts                            # ARMS array with slug/name/color/path
│   │   └── posts.ts                           # getAllPosts, getPostsByArm, getPost, etc.
│   │
│   └── styles/
│       └── prism-theme.css                    # Optional: custom token colors
│
└── content/
    ├── mathematical-intuition/
    │   ├── fourier-intuition.mdx              # Sample post
    │   └── bayesian-prior.mdx                 # Sample post
    ├── translational-biology/
    │   ├── crispr-delivery.mdx                # Sample post
    │   └── biomarker-validation.mdx           # Sample post
    └── tools-and-news/
        ├── r-vs-python-clinical.mdx            # Sample post
        └── fda-ai-guidance.mdx                # Sample post
```

---

## Key Implementation Details

### `package.json` (core deps)

```json
{
  "type": "module",
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next-mdx-remote": "^5.0.0",
    "gray-matter": "^4.0.3",
    "remark-gfm": "^4.0.0",
    "remark-math": "^6.0.0",
    "rehype-katex": "^7.0.0",
    "rehype-prism-plus": "^2.0.0",
    "katex": "^0.16.0",
    "plotly.js-dist-min": "^2.33.0",
    "react-plotly.js": "^2.6.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.13",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

> **ESM note:** remark-math v6, rehype-katex v7, rehype-prism-plus v2, remark-gfm v4 are all ESM-only. `"type": "module"` in `package.json` is required. All config files must use `.mjs` extension.

### `next.config.mjs`

```js
const nextConfig = {
  output: 'export',
  basePath: '/blog',        // Must match GitHub repo name exactly
  assetPrefix: '/blog/',    // Trailing slash required
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}
export default nextConfig
```

### MDX Frontmatter Schema

Every post in `content/` uses this frontmatter:

```yaml
---
title: "Fourier Transform: Building Intuition from Circles"
slug: "fourier-intuition"
arm: "mathematical-intuition"
date: "2024-03-15"
tags: ["fourier", "signal-processing", "visualization"]
description: "A geometric approach to understanding the Fourier transform."
draft: false
---
```

`arm` is one of: `mathematical-intuition` | `translational-biology` | `tools-and-news`

### `lib/posts.ts` pattern

- `getAllPosts()` — reads all arms, parses frontmatter via gray-matter, filters `draft: true` in production, sorts newest-first
- `getPostsByArm(arm)` — filters getAllPosts by arm slug
- `getPost(arm, slug)` — single post lookup
- `getAllPostParams()` — returns `{ arm, slug }[]` for `generateStaticParams`
- `getRecentPosts(n)` — top N across all arms for home page

**Critical:** `generateStaticParams` must be exported from every `[slug]/page.tsx` or `next build` fails with static export.

### Math in MDX (KaTeX)

Plugin chain in `compileMDX` options:
```
remarkPlugins: [remarkGfm, remarkMath]
rehypePlugins: [rehypeKatex, [rehypePrismPlus, { ignoreMissing: true }]]
```

Import KaTeX CSS in `layout.tsx`:
```ts
import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism-tomorrow.css'
```

Inline math: `$E = mc^2$`
Display math: `$$\hat{f}(\xi) = \int f(x) e^{-2\pi i x\xi} dx$$`

### Plotly (client-side only)

`PlotlyChart.tsx`:
```tsx
'use client'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false, loading: () => <div>Loading chart...</div> })
export default function PlotlyChart(props) { return <Plot {...props} /> }
```

Register in `mdx-components/index.tsx` so MDX authors can use `<PlotlyChart data={[...]} layout={{...}} />` without imports.

### Aesthetics

- Light background (`bg-white` / `bg-gray-50`)
- Each arm's landing page and post headers use the arm's hex color as accent
- `PostCard` components have a left border colored by arm
- Nav bar has color dots per arm section
- `@tailwindcss/typography` `prose prose-lg` class for article body
- Max width `max-w-3xl mx-auto` for readability

---

## conda-environment.yml

```yaml
name: blog-authoring
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.11
  - jupyterlab=4.*
  - numpy=1.*
  - pandas=2.*
  - scipy=1.*
  - matplotlib=3.*
  - pip
  - pip:
    - plotly==5.*
    - kaleido==0.2.*     # Static image export from Plotly
    - nbformat>=5.9
    - nbconvert>=7.0
```

Usage: `conda env create -f conda-environment.yml && conda activate blog-authoring`

---

## GitHub Actions Deployment

`.github/workflows/deploy.yml`:
- Trigger: push to `main`, manual dispatch
- Permissions: `pages: write`, `id-token: write`
- Steps: checkout → setup-node@v4 (node 20, cache npm) → `npm ci` → `npm run build` → `touch out/.nojekyll` → `upload-pages-artifact` (path: `out/`) → `deploy-pages`

---

## GitHub Setup Instructions

**One-time setup (before first push):**

1. **Create repo** at github.com as `bio-coder-gungun` → repo name `blog` (public). Do NOT initialize with README/gitignore.

2. **Verify basePath** in `next.config.mjs` matches repo name: `basePath: '/blog'`

3. **Initialize and push:**
   ```bash
   cd /Users/shagun/Documents/Blog
   git init
   git add .
   git commit -m "Initial blog scaffold"
   git branch -M main
   git remote add origin https://github.com/bio-coder-gungun/blog.git
   git push -u origin main
   ```

4. **Enable GitHub Pages via Actions:** GitHub repo → Settings → Pages → Source: **GitHub Actions** (not a branch).

5. **Verify deploy:** Actions tab should show "Deploy to GitHub Pages" running. On success, site is live at `https://bio-coder-gungun.github.io/blog`.

6. **Future posts:** Add `.mdx` file to `content/<arm>/`, push to main — CI deploys automatically.

**Custom domain (optional later):**
- Add `CNAME` file to `public/` with domain name
- Set DNS CNAME → `bio-coder-gungun.github.io`
- Remove `basePath`/`assetPrefix` from `next.config.mjs`

---

## Verification

After implementation:
1. `npm run dev` — visit `localhost:3000`. Check: home page loads, arm nav links work, post pages render.
2. Test a post with `$inline math$` and `$$display math$$` — should render as KaTeX.
3. Test a post with `<PlotlyChart>` — chart should appear (may flash loading state briefly).
4. Test a code block with a language tag — should have syntax highlighting.
5. `npm run build` — must complete without errors. Check `out/` directory exists.
6. After GitHub push, confirm Actions workflow goes green and `bio-coder-gungun.github.io/blog` loads.
