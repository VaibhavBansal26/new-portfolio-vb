# Design QA

- Source visual truth:
  - `/Users/vaibhavbansal/Desktop/Screenshot 2026-10-29 at 10.41.55 PM.png` for the ash-edge defect.
  - `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/outputs/portfolio-home-system-motion.jpg` for the previous navigation and landing layout.
  - `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/outputs/portfolio-experience-desktop.jpg` and `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/outputs/portfolio-writing-desktop.jpg` for the previous page designs.
- Browser-rendered implementation:
  - `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/outputs/portfolio-home-menu-strip.jpg`
  - `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/outputs/portfolio-ash-feathered.jpg`
  - `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/outputs/portfolio-experience-redesign.jpg`
  - `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/outputs/portfolio-writing-redesign.jpg`
  - Mobile: `portfolio-home-strip-mobile.jpg`, `portfolio-mobile-menu-redesign.jpg`, `portfolio-experience-redesign-mobile.jpg`, and `portfolio-writing-redesign-mobile.jpg`.
  - Current home ash state: `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/work/new-portfolio-vb/qa-evidence/home-ash-top-balanced.png`.
  - Current Writing media lab: `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/work/new-portfolio-vb/qa-evidence/writing-media-lab.png` and `writing-carousel.png`.
- Combined comparison inputs:
  - `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/outputs/design-comparison-ash-seam.png`
  - `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/outputs/design-comparison-navigation-experience-writing.png`
- Viewports: desktop `1440 × 900`; mobile `390 × 844`; device scale factor `1`.
- Source pixels: ash defect `608 × 886`; previous home `1440 × 900`; previous Experience and Writing `1440 × 1100`, cropped to the same `1440 × 900` top viewport for comparison.
- Implementation pixels: desktop captures `1440 × 900`; mobile captures `390 × 844`; ash comparison uses a `608 × 886` crop from the desktop implementation.
- State: Porcelain theme; home resting and portrait-focus states; Experience and Writing route starts; mobile navigation open and closed.

## Findings

No actionable P0, P1, or P2 findings remain.

## Full-view comparison evidence

The six-panel route comparison shows the previous and revised home, Experience, and Writing pages at equal `1440 × 900` desktop viewports. The wider indexed navigation has more consistent vertical rhythm and clearer active-state affordance without reducing hero legibility. Experience now establishes measurable impact above a structured career map rather than a generic three-row summary. Writing now leads with verified video evidence and current published work while preserving the existing editorial type scale and token system.

The mobile captures confirm that the revised display headlines wrap intentionally, statistics remain readable, the download CTA retains a practical tap target, and the two-column mobile navigation does not overlap page content.

## Focused region comparison evidence

The ash comparison normalizes the user screenshot and a current portrait crop to `608 × 886`. The previous vertical gray seam has been removed. The final effect uses a transparent, powdery soot asset with independent north, crown, east, west, and south motion layers. The ash field sits above the cloth only while active; its transparent center keeps the face readable while the upper corners now visibly shed ash upward and outward.

## Required fidelity surfaces

- Fonts and typography: Space Grotesk, Inter, JetBrains Mono, and Caveat retain their established display, body, metadata, and handwritten roles. New headlines use the same optical scale and letter spacing; mobile wrapping remains intentional rather than clipped.
- Spacing and layout rhythm: the desktop rail grows from `184px` to `218px`, with indexed 42px navigation rows, clearer grouping, and more breathing room. Page sections preserve the portfolio's square editorial grid, thin dividers, and strong vertical cadence. No horizontal overflow was observed at `390px`.
- Colors and visual tokens: all new surfaces use the existing theme variables. Blue, mint, amber, paper, ink, and rail colors remain consistent and continue to respond to theme switching. The landing signal strip is intentionally low-contrast.
- Image quality and asset fidelity: the portrait's normal and burned states share identical registration. The transparent `ash-particles-v3.png` asset replaces the earlier confetti-like treatment, and `writing-ai-doodles.png` adds a quiet AI-character/sketch layer without competing with text. The YouTube feature uses official privacy-enhanced embeds rather than placeholder imagery.
- Copy and content: Experience is grounded in the repository's detailed roles, cohorts, projects, internships, education, GPA, and CGPA. Writing includes the three supplied Medium articles and a six-video carousel sourced from the supplied channel, led by `Natural disaster prediction using deep learning and machine learning` at approximately 10K views.
- Icons and affordances: MUI icons preserve the site's icon family. Desktop navigation adds a consistent directional icon, article cards expose external-link affordances, and the video provides both an embedded player and a direct YouTube CTA.
- Accessibility and motion: semantic links, headings, iframe title, focus treatments, labels, and reduced-motion behavior remain present. Route changes now reset scroll position. Moving strips are disabled by the global reduced-motion rule.

## Comparison history

### Current pass

- [P2] The ash still read as bottom-weighted; the upper cloth edge did not visibly release particulate matter.
  - Fix: raised the ash stacking layer, increased the north plume's travel and opacity, and added an offset crown plume that exits through both upper corners.
  - Post-fix evidence: `qa-evidence/home-ash-top-balanced.png`.
- [P2] The Writing page's single embedded video did not support browsing the rest of the supplied channel.
  - Fix: added a six-video thumbnail carousel with selected-state copy, previous/next controls, live iframe swapping, and theme-aware editorial motion.
  - Post-fix evidence: `qa-evidence/writing-media-lab.png` and `qa-evidence/writing-carousel.png`.
- [P3] The Writing page background felt too static for the requested entertaining, AI-led tone.
  - Fix: introduced low-opacity hand-drawn technical sketches, a friendly AI character, and three handwritten wall notes while preserving content contrast.

- [P2] The ash image exposed a straight gray raster boundary behind the burned portrait.
  - Fix: expanded the ash field, feathered its outer alpha with a radial mask, and reduced the drop-shadow weight.
  - Post-fix evidence: `portfolio-ash-feathered.jpg` and `design-comparison-ash-seam.png`.
- [P2] The desktop rail felt congested and lacked a strong information hierarchy.
  - Fix: widened the rail, numbered the navigation, increased row spacing, clarified the active state, and separated brand, index, theme, and availability groups.
  - Post-fix evidence: `portfolio-home-menu-strip.jpg` and `portfolio-mobile-menu-redesign.jpg`.
- [P2] Experience omitted several repository-backed roles and reduced career history to generic summaries.
  - Fix: rebuilt the page with four detailed chapters, measurable impact, early internships, capabilities, and accurate education data.
  - Post-fix evidence: `portfolio-experience-redesign.jpg` and `portfolio-experience-redesign-mobile.jpg`.
- [P2] Writing contained only one article and placeholder draft notes, with no channel content.
  - Fix: added all three supplied Medium articles, verified and embedded the channel's top video, and added editorial card and ticker motion.
  - Post-fix evidence: `portfolio-writing-redesign.jpg` and `portfolio-writing-redesign-mobile.jpg`.
- [P2] Route navigation preserved the previous page's scroll position, causing new pages to open near their footer.
  - Fix: reset scroll position on pathname changes.
  - Post-fix evidence: Writing and Experience captures open at their page heroes after navigation.

## Interaction and responsive checks

- Desktop navigation hover, active state, route changes, portrait focus/burn state, top/corner/side/bottom ash release, and ash restoration checked.
- Mobile menu open/close and Work, Experience, and Writing navigation checked.
- YouTube embed loaded visibly; the Next control swaps the iframe, heading, copy, and selected thumbnail; direct YouTube and Medium links remain semantic external links.
- Desktop `1440 × 900` and mobile `390 × 844` inspected.
- Browser console: zero errors and zero warnings.
- Production build: compiled successfully.

## October 30 live-content refinement

- Source visual truth:
  - `/Users/vaibhavbansal/Desktop/Screenshot 2026-10-30 at 12.55.06 PM.png` (`1290 × 654`) for the package download-number regression.
  - `/Users/vaibhavbansal/Desktop/Screenshot 2026-10-30 at 12.55.00 PM.png` (`1366 × 946`) for the GitHub card before contribution history and streak data.
- Browser-rendered implementation:
  - `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/work/new-portfolio-vb/qa-evidence/package-downloads-final.png` (`1280 × 720`).
  - `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/work/new-portfolio-vb/qa-evidence/github-activity-final.png` (`1280 × 720`).
  - `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/work/new-portfolio-vb/qa-evidence/writing-final.png` (`1280 × 4356`).
- Combined comparison inputs:
  - `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/work/new-portfolio-vb/qa-evidence/package-before-after.png`.
  - `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/work/new-portfolio-vb/qa-evidence/github-before-after.png`.
- Viewports: desktop `1280 × 720`; mobile `390 × 844`; device scale factor `1`.
- Normalization: each focused source and implementation image was proportionally scaled to `720px` high and placed in one side-by-side comparison image. The Writing page was also inspected as a browser-rendered full-page capture.
- State: Porcelain theme; live npm/GitHub/LeetCode data loaded; live YouTube and Medium feeds loaded; long-form slider at rest and after Next; mobile Writing route start.

### Findings and comparison history

- [P1] Animated npm totals inherited the metadata `span` rule and rendered at `8px`, removing the intended bold blue hierarchy.
  - Fix: restricted metadata styling to the direct sibling label and restored the animated number to the display font at `64px`, `800` weight, and the active theme color.
  - Post-fix evidence: `qa-evidence/package-before-after.png`; measured first-number box `140.29 × 51.20px` with a `64px` computed font.
- [P1] GitHub statistics showed only profile totals and did not communicate daily consistency or streaks.
  - Fix: added a live 365-day contribution calendar and a theme-aware current/longest streak card, while retaining repository totals and the recently updated project.
  - Post-fix evidence: `qa-evidence/github-before-after.png`; both SVG endpoints returned `200 image/svg+xml` and rendered at natural dimensions.
- [P2] Video browsing used a compact thumbnail strip and did not distinguish audience favorite, newest long-form upload, and Shorts.
  - Fix: made the 10K+ view disaster-prediction walkthrough the permanent lead, created a separate live-feed latest-video feature, added a horizontally snapping long-form slider with working previous/next controls, and placed Shorts in a dedicated portrait rail.
  - Post-fix evidence: `qa-evidence/writing-final.png`; the Next control moved the rail from `0` to `284px`.
- [P2] The audience-favorite slot was initially tied to one hardcoded video and would not react when another upload surpassed it.
  - Fix: parse live `media:statistics` view totals from YouTube's public XML feed and recompute the highest-viewed upload on each 30-minute feed refresh. The RSS fallback remains available if the view-count proxy is temporarily unavailable.
  - Post-fix evidence: browser QA rendered `Most watched · 10.1K views · live`, six long-form slider cards, and two Shorts from bundle `main.d5303748.js` with zero console errors.
- [P2] Only the newest Medium item was consumed, so future posts had no explicit archive placement.
  - Fix: the feed now ingests up to eight posts. The newest automatically becomes the full-width highlighted card and older posts flow into the article grid.
  - Post-fix evidence: the live newest title appears in `.latest-article`; three current feed posts rendered during QA.

### Required fidelity surfaces

- Fonts and typography: package totals visibly restore the display-font hierarchy; video and article headings reuse the existing display, body, mono, and handwritten type roles.
- Spacing and layout rhythm: featured video, latest upload, horizontal rail, Shorts, and article grid have distinct vertical chapters. Desktop and `390px` mobile layouts showed no horizontal overflow.
- Colors and visual tokens: all local surfaces use existing paper, blue, mint, amber, ink, and line tokens. GitHub streak colors are generated from the active portfolio theme.
- Image quality and asset fidelity: official YouTube thumbnails, privacy-enhanced embeds, GitHub contribution SVG, GitHub streak SVG, and LeetCode profile card load at their natural dimensions without placeholders.
- Copy and content: the page explicitly identifies the most-watched video, latest full video, Shorts, automatic feed refresh, and where a newly published Medium post appears.
- Accessibility and interaction: slider buttons have accessible names; YouTube iframes and thumbnails have descriptive titles/alt text; semantic external links remain intact; reduced-motion mode disables smooth movement.

### Final checks

- Desktop home: `1280px` content width, no horizontal overflow.
- Desktop Writing: `1280px` content width, no horizontal overflow.
- Mobile Writing: `390px` content width, no horizontal overflow; featured grid collapses to one column and cards measure `354px`.
- Browser console: zero errors and zero warnings.
- Production build: compiled successfully; route-specific SEO prerender completed.

final result: passed

## October 30 layered casefile project cards

- Selected concept: layered casefile cards with a dark image rail, oversized project index, floating signal note, two proof cells, technology pills, and a full-width case-study action.
- Source visual truth: `/Users/vaibhavbansal/.codex/generated_images/01a18437-bc20-74e3-86e2-41d12d280543/exec-876a1a7b-39ea-475d-bef9-a407535c0c96.png` (`1487 × 1058`).
- Browser-rendered desktop implementation: `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/work/new-portfolio-vb/qa-evidence/project-cards-casefile-final.png` (`1222 × 1024` focused section crop from a `1440 × 1024` viewport).
- Browser-rendered mobile implementation: `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/work/new-portfolio-vb/qa-evidence/project-cards-casefile-mobile.png` (`390 × 844`).
- Normalized side-by-side comparison: `/Users/vaibhavbansal/Documents/Codex/2026-10-28/h/work/new-portfolio-vb/qa-evidence/project-cards-casefile-comparison.png` (`1996 × 768`).
- State: Porcelain theme; nine selected projects; grid at rest.

### Fidelity findings

- [P2] The previous project cards read as a flat list and did not separate identity, evidence, stack, and action.
  - Fix: introduced layered sheet depth, a dark media metadata rail, numbered side spine, floating project signal, a structured two-cell proof band, and a stronger full-width CTA.
- [P2] Long repository titles and descriptions competed with the visual hierarchy.
  - Fix: added concise display titles and one-sentence summaries while preserving the original repository destinations and technology data.
- [P2] Mobile needed the same editorial hierarchy without horizontal compression.
  - Fix: retained the card's numbered spine and evidence cells in a single-column `354px` card. The page measured `390px` body width at a `390px` viewport with no horizontal overflow.

### Required fidelity surfaces

- Typography: established display, mono, and body font roles are preserved; numbering and titles now carry the visual hierarchy from the selected concept.
- Spacing and layout: three equal desktop columns become two and then one through existing breakpoints; all nine cards remain aligned without staggered offsets.
- Colors and themes: cards use `--project-surface`, `--blue`, `--mint-strong`, `--paper`, `--ink`, and line tokens so the layers continue to respond to every portfolio theme.
- Images: original project screenshots remain the source imagery; the new dark rail and mild parallax improve legibility without replacing project evidence.
- Copy: proof labels are derived from known project stacks and repository descriptions; no invented performance metrics were introduced.
- Accessibility and motion: semantic article/link structure, descriptive link labels, keyboard focus, reduced-motion handling, and direct external project links remain intact.

### Final checks

- Desktop: nine cards rendered at `275 × 524px` in the focused `1440 × 1024` QA viewport; no horizontal overflow.
- Mobile: nine cards rendered one per row at `354 × 519px`; no horizontal overflow.
- Browser console: zero errors and zero warnings.
- React review: static project metadata remains module-scoped; motion values avoid React rerenders; reduced-motion and focus behavior are preserved.
- Production build and route-specific SEO prerender: compiled successfully.

final result: passed
