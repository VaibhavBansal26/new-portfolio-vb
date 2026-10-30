import { useEffect, useState } from 'react';

const SIX_HOURS = 6 * 60 * 60 * 1000;
const THIRTY_MINUTES = 30 * 60 * 1000;

const readCache = (key, maxAge = SIX_HOURS) => {
  try {
    const cached = JSON.parse(localStorage.getItem(key));
    if (cached && Date.now() - cached.savedAt < maxAge) return cached.value;
  } catch (_) {
    // Live APIs are an enhancement; an unavailable cache should never break the page.
  }
  return null;
};

const writeCache = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), value }));
  } catch (_) {
    // Ignore storage restrictions and keep the in-memory result.
  }
};

const fetchJson = async (url, signal) => {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Request failed with ${response.status}`);
  return response.json();
};

const fetchText = async (url, signal) => {
  const response = await fetch(url, { signal, headers: { Accept: 'text/xml, application/xml, text/plain' } });
  if (!response.ok) throw new Error(`Request failed with ${response.status}`);
  return response.text();
};

const isoDate = date => date.toISOString().slice(0, 10);

const splitNpmDateRange = (start, end) => {
  const ranges = [];
  let cursor = new Date(`${start}T00:00:00Z`);
  const finalDate = new Date(`${end}T00:00:00Z`);
  while (cursor <= finalDate) {
    const chunkEnd = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 18, 0));
    const boundedEnd = chunkEnd > finalDate ? finalDate : chunkEnd;
    ranges.push([isoDate(cursor), isoDate(boundedEnd)]);
    cursor = new Date(boundedEnd);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return ranges;
};

const fetchLifetimeDownloads = async (packageName, releasedOn, endDate, signal) => {
  const ranges = splitNpmDateRange(releasedOn, endDate);
  const results = await Promise.all(ranges.map(([start, end]) => {
    const period = `${start}:${end}`;
    return fetchJson(`https://api.npmjs.org/downloads/point/${period}/${encodeURIComponent(packageName)}`, signal);
  }));
  return results.reduce((total, result) => total + Number(result.downloads || 0), 0);
};

export function useNpmDownloadCounts(packages) {
  const fallback = Object.fromEntries(packages.map(item => [item.name, item.downloads]));
  const [state, setState] = useState(() => readCache('vb-live-npm-v1') || { counts: fallback, asOf: null, isLive: false });

  useEffect(() => {
    const controller = new AbortController();
    const today = isoDate(new Date());
    Promise.all(packages.map(async item => [
      item.name,
      await fetchLifetimeDownloads(item.name, item.releasedOn, today, controller.signal)
    ]))
      .then(entries => {
        const value = { counts: Object.fromEntries(entries), asOf: today, isLive: true };
        writeCache('vb-live-npm-v1', value);
        setState(value);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [packages]);

  return state;
}

export function useGitHubStats(username) {
  const fallback = { publicRepos: 99, followers: 14, stars: 16, forks: 0, latestRepo: null, isLive: false };
  const [stats, setStats] = useState(() => readCache(`vb-github-${username}-v1`) || fallback);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetchJson(`https://api.github.com/users/${encodeURIComponent(username)}`, controller.signal),
      fetchJson(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, controller.signal)
    ])
      .then(([profile, repositories]) => {
        const repos = Array.isArray(repositories) ? repositories : [];
        const latestRepo = repos.find(repo => !repo.fork) || repos[0] || null;
        const value = {
          publicRepos: Number(profile.public_repos || repos.length),
          followers: Number(profile.followers || 0),
          stars: repos.reduce((total, repo) => total + Number(repo.stargazers_count || 0), 0),
          forks: repos.reduce((total, repo) => total + Number(repo.forks_count || 0), 0),
          latestRepo: latestRepo ? {
            name: latestRepo.name,
            description: latestRepo.description || 'Recently updated public repository.',
            url: latestRepo.html_url,
            language: latestRepo.language || 'Open source'
          } : null,
          isLive: true
        };
        writeCache(`vb-github-${username}-v1`, value);
        setStats(value);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [username]);

  return stats;
}

const safeUrl = value => {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
  } catch (_) {
    return '';
  }
};

const plainText = value => String(value || '')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&#39;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/\s+/g, ' ')
  .trim();

const fetchRssFeed = async (feedUrl, signal) => {
  const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
  const result = await fetchJson(endpoint, signal);
  if (result.status !== 'ok' || !Array.isArray(result.items)) throw new Error('Feed unavailable');
  return result.items;
};

const fetchYoutubeFeed = async signal => {
  const feedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCDwM0HqH4716d4V-2IasAYg';
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`;
    const xml = await fetchText(proxyUrl, signal);
    const document = new DOMParser().parseFromString(xml, 'application/xml');
    if (document.querySelector('parsererror')) throw new Error('Invalid YouTube feed');
    const descendants = (entry, localName) => Array.from(entry.getElementsByTagName('*')).filter(node => node.localName === localName);
    const text = (entry, localName) => descendants(entry, localName)[0]?.textContent?.trim() || '';
    const entries = Array.from(document.getElementsByTagName('*')).filter(node => node.localName === 'entry');
    if (!entries.length) throw new Error('Empty YouTube feed');
    return entries.map(entry => {
      const linkNode = descendants(entry, 'link').find(node => node.getAttribute('rel') === 'alternate');
      const thumbnailNode = descendants(entry, 'thumbnail')[0];
      const statisticsNode = descendants(entry, 'statistics')[0];
      const id = text(entry, 'videoId');
      const link = safeUrl(linkNode?.getAttribute('href'));
      return {
        id,
        guid: `yt:video:${id}`,
        title: text(entry, 'title'),
        link,
        pubDate: text(entry, 'published'),
        description: text(entry, 'description'),
        thumbnail: safeUrl(thumbnailNode?.getAttribute('url')),
        views: Number(statisticsNode?.getAttribute('views') || 0),
        isShort: link.includes('/shorts/')
      };
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    return fetchRssFeed(feedUrl, signal);
  }
};

const youtubeVideoId = item => {
  const fromGuid = String(item.guid || '').replace('yt:video:', '');
  if (/^[A-Za-z0-9_-]{6,20}$/.test(fromGuid)) return fromGuid;
  const link = safeUrl(item.link);
  if (!link) return '';
  const url = new URL(link);
  const candidate = url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).pop() || '';
  return /^[A-Za-z0-9_-]{6,20}$/.test(candidate) ? candidate : '';
};

export function useLatestCreatorContent() {
  const [content, setContent] = useState(() => readCache('vb-creator-feeds-v5', THIRTY_MINUTES) || { medium: null, mediumPosts: [], youtube: [], isLive: false });

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetchRssFeed('https://medium.com/feed/@vaibhav.bansal945', controller.signal),
      fetchYoutubeFeed(controller.signal)
    ])
      .then(([mediumItems, youtubeItems]) => {
        const mediumPosts = mediumItems
          .map(item => ({
            title: plainText(item.title),
            summary: plainText(item.description || item.content).slice(0, 220),
            link: safeUrl(item.link),
            publishedAt: item.pubDate,
            thumbnail: safeUrl(item.thumbnail)
          }))
          .filter(item => item.title && item.link)
          .slice(0, 8);
        const medium = mediumPosts[0] || null;
        const youtube = youtubeItems
          .map(item => ({
            id: item.id || youtubeVideoId(item),
            title: plainText(item.title),
            copy: plainText(item.description || item.content).slice(0, 220),
            link: safeUrl(item.link),
            isShort: typeof item.isShort === 'boolean' ? item.isShort : safeUrl(item.link).includes('/shorts/'),
            views: Number(item.views || 0),
            publishedAt: item.pubDate,
            thumbnail: safeUrl(item.thumbnail)
          }))
          .filter(item => item.id && item.title)
          .slice(0, 15);
        const value = { medium, mediumPosts, youtube, isLive: Boolean(medium || youtube.length) };
        writeCache('vb-creator-feeds-v5', value);
        setContent(value);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return content;
}
