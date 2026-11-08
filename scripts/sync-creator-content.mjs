import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const outputPath = path.join(projectDir, 'src/data/creatorContent.json');
const mediumFeedUrl = 'https://medium.com/feed/@vaibhav.bansal945';
const youtubeChannelUrl = 'https://www.youtube.com/@VaibhavBansalCode';

const decodeEntities = value => String(value || '')
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([a-f\d]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const plainText = value => decodeEntities(value)
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ').trim();

const tagValue = (xml, tag) => decodeEntities(xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'))?.[1] || '');

const fetchText = async url => {
  const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; VaibhavBansalPortfolio/2.0)', 'accept-language': 'en-US,en;q=0.9' } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
};

const parseMedium = xml => [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map(match => {
  const item = match[1];
  const content = tagValue(item, 'content:encoded') || tagValue(item, 'description');
  const thumbnail = content.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] || null;
  return {
    title: plainText(tagValue(item, 'title')),
    summary: plainText(content).slice(0, 280),
    link: plainText(tagValue(item, 'link')),
    publishedAt: plainText(tagValue(item, 'pubDate')),
    thumbnail,
  };
}).filter(item => item.title && item.link);

const initialData = html => {
  const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
  if (!match) throw new Error('YouTube page did not contain ytInitialData');
  return JSON.parse(match[1]);
};

const collectByKey = (value, key, output = []) => {
  if (!value || typeof value !== 'object') return output;
  if (value[key]) output.push(value[key]);
  Object.values(value).forEach(child => collectByKey(child, key, output));
  return output;
};

const parseCompactViews = value => {
  const match = String(value || '').replace(/,/g, '').match(/([\d.]+)\s*([KMB])?/i);
  if (!match) return 0;
  const scale = { K: 1e3, M: 1e6, B: 1e9 }[match[2]?.toUpperCase()] || 1;
  return Math.round(Number(match[1]) * scale);
};

const parseLongVideos = data => collectByKey(data, 'lockupViewModel').map(item => {
  const id = item.contentId;
  const metadata = item.metadata?.lockupMetadataViewModel;
  const parts = metadata?.metadata?.contentMetadataViewModel?.metadataRows?.flatMap(row => row.metadataParts || []) || [];
  const viewPart = parts.find(part => /views?/i.test(part.accessibilityLabel || '') || /^\d[\d.,]*\s*[KMB]?$/i.test(part.text?.content || ''));
  const datePart = parts.find(part => /ago|premiered|streamed/i.test(part.accessibilityLabel || part.text?.content || ''));
  const duration = item.contentImage?.thumbnailViewModel?.overlays?.flatMap(overlay => Object.values(overlay))
    .flatMap(overlay => overlay?.badges || []).map(badge => badge.thumbnailBadgeViewModel?.text).find(Boolean) || null;
  const thumbnail = item.contentImage?.thumbnailViewModel?.image?.sources?.at(-1)?.url || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return {
    id,
    title: metadata?.title?.content || '',
    copy: metadata?.description?.content || '',
    link: `https://www.youtube.com/watch?v=${id}`,
    thumbnail,
    views: parseCompactViews(viewPart?.text?.content || viewPart?.accessibilityLabel),
    publishedLabel: datePart?.text?.content || null,
    duration,
    isShort: false,
  };
}).filter(item => item.id && item.title);

const parseShorts = data => collectByKey(data, 'shortsLockupViewModel').map(item => {
  const endpoint = item.onTap?.innertubeCommand?.reelWatchEndpoint;
  const id = endpoint?.videoId || item.entityId?.replace(/^shorts-shelf-item-/, '');
  const title = item.overlayMetadata?.primaryText?.content || item.accessibilityText?.split(/,\s*\d[\d.,]*\s+views?/i)[0] || '';
  const viewLabel = item.overlayMetadata?.secondaryText?.content || item.accessibilityText || '';
  return {
    id,
    title,
    copy: '',
    link: `https://www.youtube.com/shorts/${id}`,
    thumbnail: endpoint?.thumbnail?.thumbnails?.at(-1)?.url || item.thumbnailViewModel?.image?.sources?.at(-1)?.url || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    views: parseCompactViews(viewLabel),
    publishedLabel: null,
    duration: 'Short',
    isShort: true,
  };
}).filter(item => item.id && item.title);

const dedupe = items => [...new Map(items.map(item => [item.id || item.link, item])).values()];
const previous = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, 'utf8')) : null;

try {
  const [mediumXml, videosHtml, shortsHtml] = await Promise.all([
    fetchText(mediumFeedUrl),
    fetchText(`${youtubeChannelUrl}/videos`),
    fetchText(`${youtubeChannelUrl}/shorts`),
  ]);
  const mediumPosts = parseMedium(mediumXml);
  const videos = dedupe(parseLongVideos(initialData(videosHtml)));
  const shorts = dedupe(parseShorts(initialData(shortsHtml)));
  if (!mediumPosts.length || !videos.length) throw new Error('A creator source returned no usable items');
  const snapshot = {
    generatedAt: new Date().toISOString(),
    sources: { medium: mediumFeedUrl, youtube: youtubeChannelUrl },
    mediumPosts,
    youtube: { videos, shorts },
  };
  fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`Saved ${mediumPosts.length} Medium posts, ${videos.length} videos and ${shorts.length} Shorts to ${path.relative(projectDir, outputPath)}.`);
} catch (error) {
  if (!previous) throw error;
  console.warn(`Creator sync unavailable; keeping the existing snapshot from ${previous.generatedAt}. ${error.message}`);
}
