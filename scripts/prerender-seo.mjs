import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const buildDir = path.join(projectDir, 'build');
const meta = JSON.parse(fs.readFileSync(path.join(projectDir, 'src/seo/siteMeta.json'), 'utf8'));
const templatePath = path.join(buildDir, 'index.html');
const siteUrl = 'https://vaibhavbansal.in';
const socialImage = `${siteUrl}/og-vaibhav-bansal.jpg`;

if (!fs.existsSync(templatePath)) {
  throw new Error('build/index.html was not found. Run the SEO renderer after react-scripts build.');
}

const routeContent = {
  '/': `<main data-seo-shell><header><h1>Vaibhav Bansal — AI Software Engineer</h1><p>AI software engineer with 5+ years building scalable full-stack, data and machine-learning products with Python, React and AWS.</p></header><section><h2>Selected work</h2><p>Explore nine featured projects, four open-source npm packages, a Springer Nature research paper and a Times Square feature.</p></section><nav aria-label="Portfolio pages"><a href="/about">About</a> · <a href="/resume">Experience</a> · <a href="/portfolios">Projects</a> · <a href="/blogs">Writing</a> · <a href="/certification">Credentials</a> · <a href="/contact">Contact</a></nav></main>`,
  '/about': `<main data-seo-shell><h1>About Vaibhav Bansal</h1><p>Vaibhav is an AI software engineer working across full-stack products, data engineering, machine learning and cloud infrastructure. He holds an M.S. in Data Science from the University at Buffalo.</p><h2>Engineering philosophy</h2><p>Build for clarity, measure the outcome and share what works.</p><a href="/resume">View experience</a></main>`,
  '/resume': `<main data-seo-shell><h1>Software Engineering and AI Experience</h1><p>Five-plus years of product engineering, applied machine learning and technical teaching across DashClicks, Wipro and the University at Buffalo.</p><h2>Selected experience</h2><ul><li>Graduate Student Assistant — University at Buffalo</li><li>Graduate Teaching Assistant — University at Buffalo</li><li>Software Engineer — DashClicks</li><li>Software Engineer — Wipro</li></ul><a href="/portfolios">Explore projects</a></main>`,
  '/portfolios': `<main data-seo-shell><h1>AI, Data and Full-Stack Projects</h1><p>A growing archive of AI systems, machine-learning products, data platforms, developer tools and full-stack applications built by Vaibhav Bansal.</p><h2>Featured areas</h2><ul><li>Applied AI and machine learning</li><li>Data engineering and MLOps</li><li>React and full-stack product development</li><li>Open-source developer tooling</li></ul></main>`,
  '/blogs': `<main data-seo-shell><h1>Writing and Videos</h1><p>Articles and technical videos about AI systems, retrieval-augmented generation, developer tooling, web architecture and data engineering.</p><h2>Featured writing</h2><ul><li>Build a Minimal RAG Pipeline in 50 Lines of Python</li><li>CSR, SSR, ISR and SSG</li><li>Building an AI website generator without leaking API keys</li></ul></main>`,
  '/certification': `<main data-seo-shell><h1>Credentials and Certifications</h1><p>Verified learning and professional credentials spanning data science, machine learning, cloud computing, software engineering and modern web development.</p><a href="/resume">View professional experience</a></main>`,
  '/contact': `<main data-seo-shell><h1>Contact Vaibhav Bansal</h1><p>Get in touch about AI engineering, full-stack development, data systems, open-source collaboration and product opportunities.</p><p><a href="mailto:vaibhav.bansal945@gmail.com">vaibhav.bansal945@gmail.com</a></p></main>`,
  '404': `<main data-seo-shell><h1>Page not found</h1><p>The requested page has moved or does not exist.</p><a href="/">Return to Vaibhav Bansal's portfolio</a></main>`
};

const escapeAttribute = value => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const replaceMeta = (html, selector, value) => {
  const escaped = escapeAttribute(value);
  const pattern = selector.startsWith('property:')
    ? new RegExp(`<meta\\s+property="${selector.slice(9)}"\\s+content="[^"]*"\\s*\\/?>(?![\\s\\S]*<meta\\s+property="${selector.slice(9)}")`, 'i')
    : new RegExp(`<meta\\s+name="${selector.slice(5)}"\\s+content="[^"]*"\\s*\\/?>(?![\\s\\S]*<meta\\s+name="${selector.slice(5)}")`, 'i');
  return html.replace(pattern, match => match.replace(/content="[^"]*"/i, `content="${escaped}"`));
};

const renderRoute = (baseHtml, routeKey, info) => {
  const pathname = routeKey === '404' ? '/404' : routeKey;
  const canonical = `${siteUrl}${pathname === '/' ? '/' : pathname}`;
  let html = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(info.title)}</title>`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}">`)
    .replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${routeContent[routeKey]}</div>`);

  html = replaceMeta(html, 'name:description', info.description);
  html = replaceMeta(html, 'name:robots', info.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  html = replaceMeta(html, 'property:og:title', info.title);
  html = replaceMeta(html, 'property:og:description', info.description);
  html = replaceMeta(html, 'property:og:url', canonical);
  html = replaceMeta(html, 'property:og:image', socialImage);
  html = replaceMeta(html, 'name:twitter:title', info.title);
  html = replaceMeta(html, 'name:twitter:description', info.description);
  html = replaceMeta(html, 'name:twitter:image', socialImage);

  if (!info.noindex) {
    const routeSchema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': info.type,
      name: info.title,
      description: info.description,
      url: canonical,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#person` },
      inLanguage: 'en-US'
    });
    html = html.replace('</head>', `<script id="route-structured-data" type="application/ld+json">${routeSchema}</script></head>`);
  }
  return html;
};

const baseHtml = fs.readFileSync(templatePath, 'utf8');
fs.writeFileSync(templatePath, renderRoute(baseHtml, '/', meta['/']));

Object.entries(meta).forEach(([route, info]) => {
  if (route === '/') return;
  if (route === '404') {
    fs.writeFileSync(path.join(buildDir, '404.html'), renderRoute(baseHtml, route, info));
    return;
  }
  const routeDir = path.join(buildDir, route.slice(1));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), renderRoute(baseHtml, route, info));
});

const sitemapPath = path.join(buildDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const buildDate = new Date().toISOString().slice(0, 10);
  const sitemap = fs.readFileSync(sitemapPath, 'utf8').replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${buildDate}</lastmod>`);
  fs.writeFileSync(sitemapPath, sitemap);
}

console.log(`Generated route-specific SEO HTML for ${Object.keys(meta).length - 1} indexable pages plus 404.html.`);
