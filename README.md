# Vaibhav Bansal — Portfolio v2

A modern, responsive portfolio for an AI software engineer and product builder.

**Live site:** [vaibhavbansal.in](https://www.vaibhavbansal.in)

## Highlights

- 18 featured project case studies and a searchable 70-project archive
- Individual, indexable project pages enriched from GitHub documentation and repository evidence
- Live npm lifetime-download totals
- GitHub contribution, streak, repository, and profile signals
- LeetCode profile integration
- Build-time Medium, long-form YouTube, and Shorts snapshots with resilient live-feed enhancement
- Four color themes with matching portrait and note treatments
- Responsive editorial layouts and reduced-motion support
- Route-specific SEO metadata, structured data, sitemap, and prerendered HTML

## Stack

- React 18 and React Router
- Styled Components and MUI icons
- Framer Motion
- Public npm, GitHub, Medium, YouTube, and LeetCode data sources
- Create React App production build with a custom SEO prerender step

## Local development

```bash
npm install
npm start
```

Create the production build:

```bash
npm run build
```

The pre-build step refreshes public creator content. The post-build step generates route-specific HTML for the seven primary pages, 70 project pages, the custom 404 page, structured data, feeds, `projects.json`, `llms.txt`, and `llms-full.txt`.

Refresh public data manually when needed:

```bash
npm run sync:creator-content
npm run sync:project-details
```

## Version history

- `v2.0.0` / `main` — current modern interactive portfolio
- `legacy-v1` / `legacy` — previous portfolio preserved for reference

## Repository

[github.com/VaibhavBansal26/new-portfolio-vb](https://github.com/VaibhavBansal26/new-portfolio-vb)
