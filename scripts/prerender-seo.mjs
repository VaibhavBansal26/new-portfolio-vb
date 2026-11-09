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
const buildDate = new Date().toISOString().slice(0, 10);
const canonicalPath = route => route === '/' ? '/' : `${route.replace(/\/+$/, '')}/`;

if (!fs.existsSync(templatePath)) throw new Error('build/index.html was not found. Run this after react-scripts build.');

const loadDefaultArray = (relativePath, exportName) => {
  const source = fs.readFileSync(path.join(projectDir, relativePath), 'utf8')
    .replace(/^import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?\s*$/gm, (_, identifier, assetPath) => `const ${identifier} = ${JSON.stringify(assetPath)};`)
    .replace(new RegExp(`export\\s+default\\s+${exportName}\\s*;?`), `return ${exportName};`);
  return Function(`"use strict";\n${source}`)();
};

const portfolios = loadDefaultArray('src/data/portfolios.js', 'portfolios');
const certificates = loadDefaultArray('src/data/certification.js', 'certificates');
const projectDetailsPath = path.join(projectDir, 'src/data/projectDetails.json');
const projectDetails = fs.existsSync(projectDetailsPath)
  ? JSON.parse(fs.readFileSync(projectDetailsPath, 'utf8')).projects || {}
  : {};
const creatorContentPath = path.join(projectDir, 'src/data/creatorContent.json');
const creatorContent = fs.existsSync(creatorContentPath)
  ? JSON.parse(fs.readFileSync(creatorContentPath, 'utf8'))
  : { mediumPosts: [], youtube: { videos: [], shorts: [] } };

const packages = [
  { name: 'grapesjs-advance-components', description: '41 accessible, themeable GrapesJS blocks, custom block APIs, multi-page export and bring-your-own-model AI.', url: 'https://www.npmjs.com/package/grapesjs-advance-components' },
  { name: 'promptsite', description: 'Turn one sentence into an audited, ready-to-deploy multi-page website using your own model and visual editing.', url: 'https://www.npmjs.com/package/promptsite' },
  { name: 'captra', description: 'An AI-native JavaScript framework for typed capabilities, agents, memory, tools and generated UI.', url: 'https://www.npmjs.com/package/captra' },
  { name: 'create-captra', description: 'Create a new Captra application from the command line.', url: 'https://www.npmjs.com/package/create-captra' },
];

const research = {
  title: 'Obstacle Avoidance Using Stereo Vision and Depth Maps for Visual Aid Devices',
  description: 'A real-time obstacle detection framework for visually impaired users combining stereo cameras, ultrasonic sensors and on-device processing.',
  url: 'https://doi.org/10.1007/s42452-020-2815-z',
  publisher: 'Springer Nature · SN Applied Sciences',
  datePublished: '2020-06-01',
};

const fallbackArticles = [
  { title: 'I Built a CLI That Turns One Sentence Into a Website—and Refuses to Ship Your API Keys', description: 'Architecture and safety decisions behind a multi-page AI website generator, visual editor, secret scanning and one-command deployment.', url: 'https://medium.com/@vaibhav.bansal945/ai-website-generator-cli-blocks-leaked-api-keys-e5f19ebbac62' },
  { title: 'Build a Minimal RAG Pipeline in 50 Lines of Python', description: 'Chunk, index, retrieve and assemble grounded prompts with one dependency, zero API keys and no framework.', url: 'https://medium.com/@vaibhav.bansal945/build-a-minimal-rag-pipeline-in-50-lines-of-python-no-framework-required-4c1d7db275b9' },
  { title: 'CSR, SSR, ISR, and SSG: Which Rendering Method Is Right for You?', description: 'A practical comparison of rendering strategies through performance, freshness and developer experience.', url: 'https://medium.com/@vaibhav.bansal945/exploring-csr-ssr-isr-and-ssg-which-rendering-method-is-right-for-you-6c7c20793c08' },
];

const fallbackVideos = [
  { id: 'Gad5vz1Pkcc', title: 'Natural disaster prediction, from raw signals to a working system', description: 'A full walkthrough of the data, deep-learning models and engineering decisions behind a disaster-intelligence project.' },
  { id: 'ZcIbqeIAC0Y', title: 'Real-time logs through Kafka, Airflow and Elasticsearch', description: 'Build a streaming pipeline, schedule the workflow with Airflow and make the result searchable.' },
  { id: '_bjaJZPFovM', title: 'Car-price prediction with a complete MLOps toolbox', description: 'Model serving, experiment tracking, containers, PostgreSQL, MinIO and Debezium.' },
  { id: 'Z1XzofG0cNE', title: 'A music-streaming app built as a three-tier system', description: 'Frontend, services, databases, Kubernetes deployment and Jenkins pipeline working as one product.' },
  { id: 'VKSf1NfdjTU', title: 'Designing a complete medallion architecture in Azure', description: 'An end-to-end data-engineering walkthrough from ingestion through transformation and serving.' },
  { id: 'ucCxmocb8W8', title: 'Connecting Power BI to Athena from a Mac', description: 'A practical bridge between local analytics tooling and AWS using EC2.' },
].map(video => ({ ...video, url: `https://www.youtube.com/watch?v=${video.id}` }));

const articles = creatorContent.mediumPosts?.length
  ? creatorContent.mediumPosts.map(article => ({ title: article.title, description: article.summary, url: article.link, datePublished: article.publishedAt, thumbnail: article.thumbnail }))
  : fallbackArticles;
const longVideos = creatorContent.youtube?.videos?.length
  ? creatorContent.youtube.videos.map(video => ({ ...video, description: video.copy || `${video.title}, published on Vaibhav Bansal Code.`, url: video.link || `https://www.youtube.com/watch?v=${video.id}` }))
  : fallbackVideos;
const shorts = (creatorContent.youtube?.shorts || []).map(video => ({ ...video, description: video.copy || `${video.title}, a YouTube Short by Vaibhav Bansal.`, url: video.link || `https://www.youtube.com/shorts/${video.id}` }));
const videos = [...longVideos, ...shorts];

const roles = [
  { dates: 'January–May 2025', title: 'Graduate Student Assistant', organization: 'University at Buffalo, SUNY', description: 'Supported Applied Machine Learning at Scale for a 90+ student cohort, helping teams move from notebooks to reproducible data and MLOps workflows.', technologies: ['Python', 'SQL', 'Spark', 'Kafka', 'AWS', 'Docker', 'Hopsworks'] },
  { dates: 'August 2024–January 2025', title: 'Graduate Teaching Assistant', organization: 'University at Buffalo, SUNY', description: 'Led 20+ practical labs and supported more than 130 students across Python, SQL, machine learning and Docker fundamentals.', technologies: ['Python', 'SQL', 'Machine Learning', 'Docker'] },
  { dates: 'September 2021–January 2024', title: 'Software Engineer', organization: 'DashClicks India Ltd.', description: 'Built a GrapesJS and React website builder, reusable visual components, payment experiences, form-builder extensions and realtime support tooling.', technologies: ['React', 'GrapesJS', 'JavaScript', 'Form.io', 'Sockets', 'Draft.js'] },
  { dates: 'August 2020–September 2021', title: 'Software Engineer', organization: 'Wipro Technologies India Ltd.', description: 'Developed payment and productivity tooling including Vantiv and EMV parsers, JIRA worklog software and MX payment-terminal support.', technologies: ['Python', 'Flask', 'C++', 'AWS', 'Payments'] },
  { dates: '2018 and 2019', title: 'Front-end Industrial Intern', organization: 'Smart Software Solutions', description: 'Barcode integration and industrial web applications.', technologies: ['Web development', 'Barcode systems'] },
  { dates: 'June 2018', title: 'Industrial Intern', organization: 'J.K. Tyre India', description: 'Oracle training and data-management foundations.', technologies: ['Oracle', 'Data management'] },
  { dates: 'June 2017', title: 'Web Development Intern', organization: 'E-Biz Technocrats', description: 'Online newspaper and blog-management products across the full web stack.', technologies: ['Web development', 'Full stack'] },
];

const escapeHtml = value => String(value ?? '')
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

const slugify = value => String(value || 'project').normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const projectSlug = project => slugify(project.title || `project-${project.id}`);
const projectDescription = project => project.featured?.copy || `${project.title} is a ${project.category || 'software'} project by Vaibhav Bansal${project.text ? ` built with ${project.text}` : ''}.`;
const projectTechnologies = project => (project.featured?.tags || String(project.text || '').split(',')).map(value => String(value).trim()).filter(Boolean);
const repositoryDetails = project => projectDetails[projectSlug(project)] || null;

const duplicateSlugs = portfolios.map(projectSlug).filter((slug, index, all) => all.indexOf(slug) !== index);
if (duplicateSlugs.length) throw new Error(`Duplicate project slugs: ${[...new Set(duplicateSlugs)].join(', ')}`);

const canonicalizeInternalLinks = html => html.replace(/href="(\/[^"?#]*)([?#][^"]*)?"/g, (_, pathname, suffix = '') => `href="${canonicalPath(pathname)}${suffix}"`);
const renderProjectList = items => `<ol>${items.map(project => `<li><article><h3><a href="/projects/${projectSlug(project)}/">${escapeHtml(project.title)}</a></h3><p><strong>${escapeHtml(project.category)}</strong> — ${escapeHtml(projectDescription(project))}</p><p>${escapeHtml(projectTechnologies(project).join(' · '))}</p>${project.link1 ? `<a href="${escapeHtml(project.link1)}">Source repository</a>` : ''}</article></li>`).join('')}</ol>`;

const routeContent = {
  '/': `<main data-seo-shell><header><h1>Vaibhav Bansal — AI Software Engineer</h1><p>AI software engineer with 5+ years building scalable full-stack, data and machine-learning products with Python, React and AWS.</p></header><section><h2>Top 18 projects</h2>${renderProjectList(portfolios.filter(project => project.featured).slice(0, 18))}</section><section><h2>Open-source npm packages</h2><ul>${packages.map(item => `<li><a href="${item.url}"><strong>${item.name}</strong></a> — ${escapeHtml(item.description)}</li>`).join('')}</ul></section><section><h2>Published research</h2><p><a href="${research.url}"><strong>${research.title}</strong></a> — ${research.description} ${research.publisher}.</p></section><nav aria-label="Portfolio pages"><a href="/about">About</a> · <a href="/resume">Experience</a> · <a href="/portfolios">All ${portfolios.length} projects</a> · <a href="/blogs">Writing and videos</a> · <a href="/certification">Credentials</a> · <a href="/contact">Contact</a></nav></main>`,
  '/about': `<main data-seo-shell><h1>About Vaibhav Bansal</h1><p>Vaibhav is an AI software engineer with 5+ years of experience across full-stack products, data engineering, machine learning and cloud infrastructure. He builds grounded, observable AI systems with people in the loop.</p><h2>Education</h2><ul><li>M.S. Data Science — University at Buffalo, SUNY · GPA 3.833 / 4</li><li>B.Tech Computer Science — VIT University · CGPA 8.62 / 10</li></ul><h2>Engineering principles</h2><ul><li>Build for clarity</li><li>Measure the outcome</li><li>Share what works</li></ul><p>Based in Buffalo, New York, with roots in India. Languages: English, Hindi and French.</p><a href="/resume">View complete experience</a></main>`,
  '/resume': `<main data-seo-shell><h1>Software Engineering and AI Experience</h1><p>Five-plus years of product engineering, applied machine learning and technical teaching.</p><section><h2>Experience</h2>${roles.map(role => `<article><h3>${escapeHtml(role.title)} — ${escapeHtml(role.organization)}</h3><p><strong>${escapeHtml(role.dates)}</strong></p><p>${escapeHtml(role.description)}</p><p>${escapeHtml(role.technologies.join(' · '))}</p></article>`).join('')}</section><section><h2>Education</h2><ul><li>M.S. Data Science, University at Buffalo, SUNY, 2024–2025</li><li>B.Tech Computer Science, VIT University, 2016–2020</li></ul></section><a href="/portfolios">Explore projects</a></main>`,
  '/portfolios': `<main data-seo-shell><h1>AI, Data and Full-Stack Projects</h1><p>${portfolios.length} projects spanning applied AI, machine learning, data engineering, MLOps, developer tools and full-stack products.</p>${renderProjectList(portfolios)}</main>`,
  '/blogs': `<main data-seo-shell><h1>Writing and Videos</h1><p>Articles and technical videos about AI systems, retrieval-augmented generation, developer tooling, web architecture and data engineering.</p><p>Creator snapshot updated ${escapeHtml(creatorContent.generatedAt || buildDate)}.</p><section><h2>Articles</h2>${articles.map(article => `<article><h3><a href="${article.url}">${escapeHtml(article.title)}</a></h3><p>${escapeHtml(article.description)}</p></article>`).join('')}</section><section><h2>Long-form videos from Vaibhav Bansal Code</h2>${longVideos.map(video => `<article><h3><a href="${video.url}">${escapeHtml(video.title)}</a></h3><p>${escapeHtml(video.description)}</p></article>`).join('')}</section>${shorts.length ? `<section><h2>YouTube Shorts</h2>${shorts.map(video => `<article><h3><a href="${video.url}">${escapeHtml(video.title)}</a></h3><p>${escapeHtml(video.description)}</p></article>`).join('')}</section>` : ''}</main>`,
  '/certification': `<main data-seo-shell><h1>Credentials and Certifications</h1><p>${certificates.length} verified credentials spanning data science, machine learning, cloud computing, software engineering and modern web development.</p><ol>${certificates.map(certificate => `<li><a href="${escapeHtml(certificate.link)}"><strong>${escapeHtml(certificate.title)}</strong></a> — ${escapeHtml(certificate.by)}</li>`).join('')}</ol><a href="/resume">View professional experience</a></main>`,
  '/contact': `<main data-seo-shell><h1>Contact Vaibhav Bansal</h1><p>Get in touch about AI engineering, full-stack development, data systems, open-source collaboration and product opportunities.</p><ul><li><a href="mailto:vaibhav.bansal945@gmail.com">vaibhav.bansal945@gmail.com</a></li><li><a href="https://github.com/VaibhavBansal26">GitHub</a></li><li><a href="https://www.linkedin.com/in/vaibhavbansal-profile/">LinkedIn</a></li><li><a href="https://www.youtube.com/@VaibhavBansalCode">YouTube</a></li><li><a href="https://orcid.org/0000-0002-5433-0385">ORCID</a></li></ul></main>`,
  '404': `<main data-seo-shell><h1>Page not found</h1><p>The requested page has moved or does not exist.</p><a href="/">Return to Vaibhav Bansal's portfolio</a></main>`,
};

const replaceMeta = (html, selector, value) => {
  const escaped = escapeHtml(value);
  const attribute = selector.startsWith('property:') ? 'property' : 'name';
  const key = selector.slice(selector.indexOf(':') + 1);
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?>`, 'i');
  return html.replace(pattern, match => match.replace(/content="[^"]*"/i, `content="${escaped}"`));
};

const profileMainEntity = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: 'Vaibhav Bansal',
  alternateName: 'VaibhavBansal26',
  description: 'AI software engineer and full-stack developer building practical AI, data and web products.',
  url: `${siteUrl}/`,
  image: `${siteUrl}/avatar-light3.jpeg`,
};

const basePageSchema = (info, canonical) => ({
  '@context': 'https://schema.org', '@type': info.type, name: info.title,
  description: info.description, url: canonical,
  isPartOf: { '@id': `${siteUrl}/#website` }, about: { '@id': `${siteUrl}/#person` }, inLanguage: 'en-US',
  ...(info.type === 'ProfilePage' ? { mainEntity: profileMainEntity } : {}),
});

const schemaForRoute = (routeKey, info, canonical) => {
  const page = basePageSchema(info, canonical);
  if (routeKey === '/') return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...page, '@context': undefined },
      { '@type': 'ScholarlyArticle', headline: research.title, description: research.description, url: research.url, datePublished: research.datePublished, author: { '@id': `${siteUrl}/#person` }, publisher: { '@type': 'Organization', name: 'Springer Nature' } },
      ...packages.map(item => ({ '@type': 'SoftwareApplication', name: item.name, description: item.description, url: item.url, applicationCategory: 'DeveloperApplication', author: { '@id': `${siteUrl}/#person` } })),
    ],
  };
  if (routeKey === '/portfolios') return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...page, '@context': undefined, mainEntity: { '@id': `${canonical}#projects` } },
      { '@type': 'ItemList', '@id': `${canonical}#projects`, name: 'Projects by Vaibhav Bansal', numberOfItems: portfolios.length, itemListElement: portfolios.map((project, index) => ({ '@type': 'ListItem', position: index + 1, url: `${siteUrl}/projects/${projectSlug(project)}/`, name: project.title })) },
    ],
  };
  if (routeKey === '/blogs') return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...page, '@context': undefined },
      ...articles.map(article => ({ '@type': 'BlogPosting', headline: article.title, description: article.description, url: article.url, datePublished: article.datePublished, image: article.thumbnail || undefined, author: { '@id': `${siteUrl}/#person` } })),
      ...videos.map(video => ({ '@type': 'VideoObject', name: video.title, description: video.description, url: video.url, embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`, thumbnailUrl: video.thumbnail || `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`, uploadDate: video.publishedAt || undefined, duration: video.duration || undefined, creator: { '@id': `${siteUrl}/#person` } })),
    ],
  };
  return page;
};

const renderRoute = (baseHtml, routeKey, info, content = routeContent[routeKey], schema = null) => {
  const pathname = routeKey === '404' ? '/404' : routeKey;
  const canonical = `${siteUrl}${canonicalPath(pathname)}`;
  let html = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(info.title)}</title>`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}">`)
    .replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${canonicalizeInternalLinks(content)}</div>`);
  html = replaceMeta(html, 'name:description', info.description);
  html = replaceMeta(html, 'name:robots', info.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  html = replaceMeta(html, 'property:og:title', info.title);
  html = replaceMeta(html, 'property:og:description', info.description);
  html = replaceMeta(html, 'property:og:url', canonical);
  html = replaceMeta(html, 'property:og:image', socialImage);
  html = replaceMeta(html, 'name:twitter:title', info.title);
  html = replaceMeta(html, 'name:twitter:description', info.description);
  html = replaceMeta(html, 'name:twitter:image', socialImage);
  if (!info.noindex) html = html.replace('</head>', `<script id="route-structured-data" type="application/ld+json">${JSON.stringify(schema || schemaForRoute(routeKey, info, canonical))}</script></head>`);
  return html;
};

const baseHtml = fs.readFileSync(templatePath, 'utf8');
fs.writeFileSync(templatePath, renderRoute(baseHtml, '/', meta['/']));

Object.entries(meta).forEach(([route, info]) => {
  if (route === '/') return;
  if (route === '404') return fs.writeFileSync(path.join(buildDir, '404.html'), renderRoute(baseHtml, route, info));
  const routeDir = path.join(buildDir, route.slice(1));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), renderRoute(baseHtml, route, info));
});

portfolios.forEach(project => {
  const slug = projectSlug(project);
  const route = `/projects/${slug}`;
  const description = projectDescription(project);
  const repository = repositoryDetails(project);
  const readmeOverview = repository?.overview && repository.overview !== description ? repository.overview : '';
  const features = repository?.features || [];
  const demoAssets = repository?.demoAssets || [];
  const info = { title: `${project.title} — Vaibhav Bansal`, description, type: 'WebPage' };
  const architectureLabel = repository?.architectureSource === 'documentation' ? 'Documented architecture and workflow' : 'Architecture inferred from repository structure';
  const content = `<main data-seo-shell><p><a href="/portfolios">← All projects</a></p><article><h1>${escapeHtml(project.title)}</h1><p><strong>${escapeHtml(project.category)}</strong></p><p>${escapeHtml(description)}</p>${readmeOverview ? `<h2>Repository overview</h2><p>${escapeHtml(readmeOverview)}</p>` : ''}${features.length ? `<h2>Project features</h2><ul>${features.map(feature => `<li>${escapeHtml(feature)}</li>`).join('')}</ul>` : ''}${repository?.architecture ? `<h2>${escapeHtml(architectureLabel)}</h2><p>${escapeHtml(repository.architecture)}</p>` : ''}<h2>Technology</h2><p>${escapeHtml(projectTechnologies(project).join(' · '))}</p>${repository ? `<h2>Repository snapshot</h2><p>${repository.primaryLanguage ? `${escapeHtml(repository.primaryLanguage)} · ` : ''}${repository.stars} stars · ${repository.forks} forks · updated ${escapeHtml(repository.updatedAt || '')}</p>` : ''}${demoAssets.length ? `<h2>Demos and evidence</h2><ul>${demoAssets.map(asset => `<li><a href="${escapeHtml(asset.url)}">${escapeHtml(asset.label)}</a>${asset.source ? ` — ${escapeHtml(asset.source)}` : ''}</li>`).join('')}</ul>` : ''}<h2>Project links</h2><ul>${project.link1 ? `<li><a href="${escapeHtml(project.link1)}">Source repository</a></li>` : ''}${repository?.readmeUrl ? `<li><a href="${escapeHtml(repository.readmeUrl)}">Source README</a></li>` : ''}${project.link2 ? `<li><a href="${escapeHtml(project.link2)}">Project demo</a></li>` : ''}${project.link3 ? `<li><a href="${escapeHtml(project.link3)}">Live project</a></li>` : ''}</ul></article></main>`;
  const schema = { '@context': 'https://schema.org', '@type': 'SoftwareSourceCode', name: project.title, description, url: `${siteUrl}${canonicalPath(route)}`, codeRepository: project.link1 || undefined, programmingLanguage: [...new Set([...projectTechnologies(project), repository?.primaryLanguage].filter(Boolean))], keywords: repository?.topics?.length ? repository.topics : projectTechnologies(project), dateModified: repository?.updatedAt, sameAs: demoAssets.map(asset => asset.url), author: { '@id': `${siteUrl}/#person` }, isPartOf: { '@id': `${siteUrl}/#website` } };
  const routeDir = path.join(buildDir, 'projects', slug);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), renderRoute(baseHtml, route, info, content, schema));
});

const projectIndex = portfolios.map(project => ({
  id: project.id, slug: projectSlug(project), title: project.title, category: project.category,
  description: projectDescription(project), technologies: projectTechnologies(project),
  url: `${siteUrl}/projects/${projectSlug(project)}/`, repository: project.link1 || null,
  demo: project.link2 || null, live_url: project.link3 || null, featured: Boolean(project.featured),
  readme: repositoryDetails(project)?.readmeUrl || null,
  readme_overview: repositoryDetails(project)?.overview || null,
  overview_source: repositoryDetails(project)?.overviewSource || null,
  verified_features: repositoryDetails(project)?.features || [],
  features_source: repositoryDetails(project)?.featuresSource || null,
  architecture: repositoryDetails(project)?.architecture || null,
  architecture_source: repositoryDetails(project)?.architectureSource || null,
  repository_snapshot: repositoryDetails(project) ? {
    primary_language: repositoryDetails(project).primaryLanguage,
    topics: repositoryDetails(project).topics,
    stars: repositoryDetails(project).stars,
    forks: repositoryDetails(project).forks,
    updated_at: repositoryDetails(project).updatedAt,
  } : null,
  demo_assets: repositoryDetails(project)?.demoAssets || [],
}));

fs.writeFileSync(path.join(buildDir, 'projects.json'), JSON.stringify({ name: 'Projects by Vaibhav Bansal', url: `${siteUrl}/portfolios/`, generated_at: new Date().toISOString(), count: projectIndex.length, projects: projectIndex }, null, 2));

const feedItems = [
  ...articles.map((article, index) => ({ id: article.url, url: article.url, title: article.title, summary: article.description, date_published: article.datePublished, tags: ['article', 'medium', index === 0 ? 'latest' : 'archive'] })),
  ...longVideos.map(video => ({ id: video.url, url: video.url, title: video.title, summary: video.description, tags: ['video', 'youtube', 'long-form'] })),
  ...shorts.map(video => ({ id: video.url, url: video.url, title: video.title, summary: video.description, tags: ['video', 'youtube', 'short'] })),
];
fs.writeFileSync(path.join(buildDir, 'feed.json'), JSON.stringify({ version: 'https://jsonfeed.org/version/1.1', title: 'Vaibhav Bansal — Writing, videos and engineering updates', home_page_url: `${siteUrl}/`, feed_url: `${siteUrl}/feed.json`, authors: [{ name: 'Vaibhav Bansal', url: `${siteUrl}/` }], items: feedItems }, null, 2));
const rssItems = feedItems.map(item => `<item><title>${escapeHtml(item.title)}</title><link>${escapeHtml(item.url)}</link><guid>${escapeHtml(item.id)}</guid><description>${escapeHtml(item.summary)}</description></item>`).join('');
fs.writeFileSync(path.join(buildDir, 'feed.xml'), `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Vaibhav Bansal — Writing and videos</title><link>${siteUrl}/</link><description>AI systems, developer tools, architecture and data engineering.</description>${rssItems}</channel></rss>`);

const coreLinks = [['Home', `${siteUrl}/`], ['About', `${siteUrl}/about/`], ['Experience', `${siteUrl}/resume/`], ['Projects', `${siteUrl}/portfolios/`], ['Writing and videos', `${siteUrl}/blogs/`], ['Credentials', `${siteUrl}/certification/`], ['Contact', `${siteUrl}/contact/`], ['Project data', `${siteUrl}/projects.json`], ['JSON feed', `${siteUrl}/feed.json`], ['RSS feed', `${siteUrl}/feed.xml`]];
const llms = `# Vaibhav Bansal\n\n> AI software engineer with 5+ years building full-stack products, data platforms, machine-learning systems and open-source developer tools.\n\nThis is Vaibhav Bansal's interactive technical portfolio. The related professional profile is https://www.thevaibhavbansal.com/. Both sites describe the same person.\n\n## Core pages\n${coreLinks.map(([label, url]) => `- [${label}](${url})`).join('\n')}\n\n## Identity\n- GitHub: https://github.com/VaibhavBansal26\n- LinkedIn: https://www.linkedin.com/in/vaibhavbansal-profile/\n- ORCID: https://orcid.org/0000-0002-5433-0385\n- Medium: https://medium.com/@vaibhav.bansal945\n- YouTube: https://www.youtube.com/@VaibhavBansalCode\n\n## Highlights\n- ${portfolios.length} projects across AI, data engineering, full stack and developer tooling\n- Four npm packages: ${packages.map(item => item.name).join(', ')}\n- Springer Nature research: ${research.title}\n- M.S. Data Science, University at Buffalo, SUNY\n`;
fs.writeFileSync(path.join(buildDir, 'llms.txt'), llms);
const llmsFull = `${llms}\n## Experience\n${roles.map(role => `### ${role.title} — ${role.organization}\n${role.dates}. ${role.description}\nTechnologies: ${role.technologies.join(', ')}.`).join('\n\n')}\n\n## Projects\n${projectIndex.map(project => `### ${project.title}\nCategory: ${project.category}\n${project.description}${project.readme_overview ? `\nREADME overview: ${project.readme_overview}` : ''}${project.verified_features.length ? `\nVerified features:\n${project.verified_features.map(feature => `- ${feature}`).join('\n')}` : ''}${project.architecture ? `\nArchitecture: ${project.architecture}` : ''}\nTechnologies: ${project.technologies.join(', ')}\nPage: ${project.url}${project.repository ? `\nRepository: ${project.repository}` : ''}${project.readme ? `\nREADME: ${project.readme}` : ''}`).join('\n\n')}\n\n## npm packages\n${packages.map(item => `### ${item.name}\n${item.description}\n${item.url}`).join('\n\n')}\n\n## Research\n### ${research.title}\n${research.description}\nPublished by ${research.publisher}.\n${research.url}\n\n## Writing\n${articles.map(article => `- [${article.title}](${article.url}) — ${article.description}`).join('\n')}\n\n## Long-form videos\n${longVideos.map(video => `- [${video.title}](${video.url}) — ${video.description}`).join('\n')}\n\n## YouTube Shorts\n${shorts.map(video => `- [${video.title}](${video.url}) — ${video.description}`).join('\n')}\n`;
fs.writeFileSync(path.join(buildDir, 'llms-full.txt'), llmsFull);

const sitemapRoutes = [...Object.keys(meta).filter(route => route !== '404'), ...portfolios.map(project => `/projects/${projectSlug(project)}`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes.map(route => `  <url><loc>${siteUrl}${canonicalPath(route)}</loc><lastmod>${buildDate}</lastmod></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);

console.log(`Generated crawler HTML for ${Object.keys(meta).length - 1} main pages and ${portfolios.length} project pages.`);
console.log(`Generated projects.json, feed.json, feed.xml, llms.txt and llms-full.txt with ${projectIndex.length} projects.`);
