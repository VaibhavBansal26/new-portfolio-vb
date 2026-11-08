import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const outputPath = path.join(projectDir, 'src/data/projectDetails.json');

const loadPortfolios = () => {
  const source = fs.readFileSync(path.join(projectDir, 'src/data/portfolios.js'), 'utf8')
    .replace(/^import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?\s*$/gm, (_, identifier, assetPath) => `const ${identifier} = ${JSON.stringify(assetPath)};`)
    .replace(/export\s+default\s+portfolios\s*;?/, 'return portfolios;');
  return Function(`"use strict";\n${source}`)();
};

const slugify = value => String(value || 'project').normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const parseRepository = value => {
  try {
    const url = new URL(value);
    if (url.hostname !== 'github.com') return null;
    const [owner, repository] = url.pathname.split('/').filter(Boolean);
    if (!owner || !repository) return null;
    return { owner, repository: repository.replace(/\.git$/, ''), fullName: `${owner}/${repository.replace(/\.git$/, '')}` };
  } catch {
    return null;
  }
};

const ghApi = async (endpoint, raw = false) => {
  const args = ['api'];
  if (raw) args.push('-H', 'Accept: application/vnd.github.raw+json');
  args.push(endpoint);
  const { stdout } = await execFileAsync('gh', args, { maxBuffer: 12 * 1024 * 1024 });
  return raw ? stdout : JSON.parse(stdout);
};

const ghRawFile = (repository, filePath, branch) => ghApi(`repos/${repository}/contents/${filePath.split('/').map(encodeURIComponent).join('/')}?ref=${encodeURIComponent(branch)}`, true);

const stripMarkdown = value => String(value || '')
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/<!--([\s\S]*?)-->/g, ' ')
  .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
  .replace(/<img\b[^>]*>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/[`*_~>#|]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const readmeSections = markdown => {
  const sections = [];
  let current = { heading: 'Introduction', body: [] };
  String(markdown || '').split(/\r?\n/).forEach(line => {
    const heading = line.match(/^#{1,6}\s+(.+)$/);
    if (heading) {
      sections.push(current);
      current = { heading: stripMarkdown(heading[1]), body: [] };
    } else current.body.push(line);
  });
  sections.push(current);
  return sections.filter(section => section.body.some(line => line.trim()));
};

const usefulParagraphs = body => body.join('\n').split(/\n\s*\n/)
  .map(stripMarkdown)
  .filter(value => value.length >= 45 && !/^(installation|usage|npm install|pip install|license|table of contents)/i.test(value));

const sectionMatching = (sections, pattern) => sections.find(section => pattern.test(section.heading));

const extractBullets = section => (section?.body || [])
  .map(line => line.match(/^\s*(?:[-*+] |\d+[.)]\s+)(.+)$/)?.[1])
  .filter(Boolean).map(stripMarkdown).filter(value => value.length >= 8).slice(0, 7);

const extractTableRows = section => (section?.body || [])
  .map(line => line.trim())
  .filter(line => /^\|.*\|$/.test(line) && !/^\|?[\s|:-]+\|?$/.test(line))
  .map(line => line.split('|').slice(1, -1).map(stripMarkdown).filter(Boolean))
  .filter((cells, index) => cells.length >= 2 && index > 0)
  .map(cells => `${cells[0]}: ${cells.slice(1).join(' — ')}`)
  .slice(0, 7);

const extractFeatureHeadings = sections => sections
  .map(section => section.heading)
  .filter(heading => heading && heading !== 'Introduction' && heading.length <= 90)
  .filter(heading => !/^(use|more)$|setup|install|usage|run it|configuration|environment|license|contribut|documentation|roadmap|not done|things to know|test|deploy/i.test(heading))
  .slice(0, 7);

const extractFlow = markdown => [...String(markdown || '').matchAll(/```[^\n]*\n([\s\S]*?)```/g)]
  .map(match => match[1])
  .find(block => /(?:─▶|→|->)/.test(block) && block.split(/\r?\n/).length <= 8 && block.length <= 1000);

const resolveGithubUrl = (target, repository, branch) => {
  if (!target || target.startsWith('#') || target.startsWith('mailto:')) return null;
  if (/^https?:\/\//i.test(target)) return target;
  const clean = target.replace(/^\.\//, '').replace(/^\//, '');
  return `https://github.com/${repository}/blob/${branch}/${clean}`;
};

const extractDemoLinks = (markdown, repository, branch) => {
  const candidates = [];
  for (const match of String(markdown || '').matchAll(/\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) candidates.push({ label: stripMarkdown(match[1]), target: match[2] });
  for (const match of String(markdown || '').matchAll(/<(?:a|img|video|source)[^>]+(?:href|src)=["']([^"']+)["'][^>]*>/gi)) candidates.push({ label: 'Demo asset', target: match[1] });
  const seen = new Set();
  return candidates.filter(item => /demo|preview|screenshot|walkthrough|video|youtube|youtu\.be|\.gif|\.mp4/i.test(`${item.label} ${item.target}`))
    .map(item => ({ label: item.label || 'Demo', url: resolveGithubUrl(item.target, repository, branch) }))
    .filter(item => item.url && !seen.has(item.url) && seen.add(item.url)).slice(0, 6);
};

const humanizePath = filePath => path.basename(filePath, path.extname(filePath))
  .replace(/[_-]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, value => value.toUpperCase());

const repositoryFeatures = tree => {
  const featureFiles = tree
    .filter(item => item.type === 'blob')
    .map(item => item.path)
    .filter(filePath => /(?:^|\/)(?:pages|screens|features|modules|routes|workflows)\/.+\.(?:js|jsx|ts|tsx|py|vue|svelte)$/i.test(filePath))
    .filter(filePath => !/(?:^|\/)(?:index|__init__|layout|test|spec|types?|utils?)\.[^.]+$/i.test(filePath));
  return [...new Set(featureFiles.map(humanizePath))].slice(0, 7);
};

const architectureFromTree = (tree, project, metadata) => {
  const files = tree.filter(item => item.type === 'blob').map(item => item.path);
  const directories = [...new Set(files.filter(filePath => filePath.includes('/')).map(filePath => filePath.split('/')[0]).filter(value => value && !value.startsWith('.') && !/^(?:node_modules|public|assets?|images?|tests?|coverage)$/i.test(value)))].slice(0, 6);
  const manifests = [
    ['Dockerfile', 'Docker'], ['docker-compose', 'Docker Compose'], ['package.json', 'Node package manifest'],
    ['requirements.txt', 'Python requirements'], ['pyproject.toml', 'Python project manifest'],
    ['pom.xml', 'Maven'], ['build.gradle', 'Gradle'], ['go.mod', 'Go modules'],
  ].filter(([needle]) => files.some(filePath => filePath.toLowerCase().includes(needle.toLowerCase()))).map(([, label]) => label);
  const stack = String(project.text || '').split(',').map(value => value.trim()).filter(Boolean).slice(0, 5);
  const parts = [];
  if (metadata.language || stack.length) parts.push(`The implementation is centered on ${[metadata.language, ...stack].filter(Boolean).filter((value, index, all) => all.indexOf(value) === index).slice(0, 5).join(', ')}.`);
  if (directories.length) parts.push(`The repository is organized into ${directories.join(', ')}${directories.length > 1 ? ' areas' : ''}.`);
  if (manifests.length) parts.push(`Delivery and dependency evidence includes ${manifests.join(', ')}.`);
  return parts.join(' ');
};

const treeDemoAssets = (tree, repository, branch) => tree
  .filter(item => item.type === 'blob')
  .map(item => item.path)
  .filter(filePath => /\.(?:gif|mp4|webm|mov|png|jpe?g|webp)$/i.test(filePath))
  .filter(filePath => /demo|preview|screenshot|walkthrough|showcase|docs\/(?:images?|media|assets?)/i.test(filePath))
  .filter(filePath => !/node_modules|coverage|dist\//i.test(filePath))
  .slice(0, 8)
  .map(filePath => ({ label: humanizePath(filePath), url: `https://github.com/${repository}/blob/${branch}/${filePath.split('/').map(encodeURIComponent).join('/')}`, source: 'repository-file' }));

const mergeAssets = (...groups) => {
  const seen = new Set();
  return groups.flat().filter(Boolean).filter(item => item.url && !seen.has(item.url) && seen.add(item.url)).slice(0, 8);
};

const selectedFeatureFallbacks = project => {
  const values = (project.featured?.signals || []).map(signal => `${signal.label}: ${signal.value}`);
  if (project.featured?.category || project.category) values.push(`Product focus: ${project.featured?.category || project.category}`);
  const stack = String(project.text || '').split(',').map(value => value.trim()).filter(Boolean).slice(0, 5);
  if (stack.length) values.push(`Core implementation: ${stack.join(', ')}`);
  return values;
};

const enrichRepository = async project => {
  const parsed = parseRepository(project.link1);
  if (!parsed) return [slugify(project.title), null];
  try {
    const metadata = await ghApi(`repos/${parsed.fullName}`);
    let tree = [];
    try { tree = (await ghApi(`repos/${parsed.fullName}/git/trees/${encodeURIComponent(metadata.default_branch)}?recursive=1`)).tree || []; } catch { /* Tree evidence is optional. */ }
    let readme = '';
    let readmePath = 'README.md';
    try { readme = await ghApi(`repos/${parsed.fullName}/readme`, true); } catch { /* Repository may not have a README. */ }
    if (!readme) {
      const alternateReadme = tree.find(item => item.type === 'blob' && /(?:^|\/)readme[^/]*\.(?:md|mdx|txt)$/i.test(item.path));
      if (alternateReadme) try { readme = await ghRawFile(parsed.fullName, alternateReadme.path, metadata.default_branch); readmePath = alternateReadme.path; } catch { /* Continue with repository structure. */ }
    }
    const evidenceDocs = tree
      .filter(item => item.type === 'blob')
      .map(item => item.path)
      .filter(filePath => /(?:architecture|system[-_ ]?design|technical[-_ ]?design|workflow|pipeline|data[-_ ]?flow).*(?:md|mdx|txt)$/i.test(filePath))
      .filter(filePath => !/readme/i.test(filePath)).slice(0, 2);
    const evidenceText = [];
    for (const filePath of evidenceDocs) {
      try { evidenceText.push(await ghRawFile(parsed.fullName, filePath, metadata.default_branch)); } catch { /* A linked document can disappear between tree and content calls. */ }
    }
    const combinedDocumentation = [readme, ...evidenceText].filter(Boolean).join('\n\n');
    const sections = readmeSections(combinedDocumentation);
    const overviewSection = sectionMatching(sections, /overview|about|introduction|what is|why/i) || sections[0];
    const overviewParagraphs = usefulParagraphs(overviewSection?.body || []);
    const documentationOverview = overviewParagraphs.slice(0, 2).join(' ') || usefulParagraphs(sections.flatMap(section => section.body))[0] || metadata.description || '';
    const weakDocumentationOverview = /^(?:this bundle contains|installation|setup|usage)\b/i.test(documentationOverview);
    const overview = weakDocumentationOverview && project.featured?.copy ? project.featured.copy : documentationOverview || (project.featured ? project.featured.copy : '');
    const featuresSection = sectionMatching(sections, /feature|capabilit|what it does|highlights|key function/i);
    const architectureSection = sectionMatching(sections, /architecture|system design|how it works|workflow|pipeline|data flow|stack|components/i);
    const architectureText = usefulParagraphs(architectureSection?.body || []).slice(0, 2).join(' ');
    const flow = extractFlow(readme);
    const features = extractBullets(featuresSection);
    const tableFeatures = extractTableRows(featuresSection);
    const overviewFeatures = extractBullets(overviewSection);
    const documentedFeatures = features.length ? features : tableFeatures.length ? tableFeatures : featuresSection ? overviewFeatures : extractFeatureHeadings(sections);
    const fileFeatures = repositoryFeatures(tree);
    const selectedFallbacks = project.featured ? selectedFeatureFallbacks(project) : [];
    const finalFeatures = [...new Set([...(featuresSection ? documentedFeatures : fileFeatures), ...documentedFeatures, ...overviewFeatures, ...selectedFallbacks])].slice(0, 7);
    const documentedArchitecture = architectureText || (flow ? stripMarkdown(flow) : '');
    const architecture = documentedArchitecture || (project.featured ? architectureFromTree(tree, project, metadata) : '');
    const readmeAssets = extractDemoLinks(combinedDocumentation, parsed.fullName, metadata.default_branch).map(item => ({ ...item, source: 'documentation' }));
    const repositoryAssets = treeDemoAssets(tree, parsed.fullName, metadata.default_branch);
    const explicitAssets = project.featured ? [
      project.link2 && { label: 'Project demo', url: project.link2, source: 'portfolio' },
      project.link3 && { label: 'Live project', url: project.link3, source: 'portfolio' },
      /^https?:\/\//i.test(project.image || '') && { label: 'Project preview', url: project.image, source: 'portfolio' },
      { label: 'Source and implementation', url: metadata.html_url, source: 'repository' },
    ] : [];
    const details = {
      repository: parsed.fullName,
      repositoryUrl: metadata.html_url,
      readmeUrl: readme ? `${metadata.html_url}/blob/${metadata.default_branch}/${readmePath.split('/').map(encodeURIComponent).join('/')}` : `${metadata.html_url}#readme`,
      defaultBranch: metadata.default_branch,
      repositoryDescription: metadata.description || null,
      overview: overview.slice(0, 1200),
      overviewSource: documentationOverview && !weakDocumentationOverview ? 'documentation' : project.featured ? 'portfolio' : null,
      features: finalFeatures,
      featuresSource: documentedFeatures.length ? 'documentation' : fileFeatures.length ? 'repository-structure' : selectedFallbacks.length ? 'portfolio' : null,
      architecture: architecture.slice(0, 1600),
      architectureSource: documentedArchitecture ? 'documentation' : architecture ? 'repository-structure' : null,
      primaryLanguage: metadata.language || null,
      topics: metadata.topics || [],
      stars: metadata.stargazers_count || 0,
      forks: metadata.forks_count || 0,
      homepage: metadata.homepage || null,
      updatedAt: metadata.updated_at,
      inspectedFiles: evidenceDocs,
      demoAssets: mergeAssets(readmeAssets, repositoryAssets, explicitAssets),
    };
    return [slugify(project.title), details];
  } catch (error) {
    process.stderr.write(`Could not enrich ${parsed.fullName}: ${error.message}\n`);
    return [slugify(project.title), { repository: parsed.fullName, repositoryUrl: project.link1, error: 'README metadata unavailable' }];
  }
};

const projects = loadPortfolios();
const queue = [...projects];
const results = [];
const worker = async () => {
  while (queue.length) {
    const project = queue.shift();
    results.push(await enrichRepository(project));
    process.stdout.write(`Enriched ${results.length}/${projects.length}: ${project.title}\n`);
  }
};

await Promise.all(Array.from({ length: 6 }, worker));
const details = Object.fromEntries(results.filter(([, value]) => value));
fs.writeFileSync(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), projects: details }, null, 2)}\n`);
console.log(`Saved README enrichment for ${Object.keys(details).length} projects to ${path.relative(projectDir, outputPath)}.`);
