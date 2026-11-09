import { useEffect } from 'react';
import siteMeta from '../seo/siteMeta.json';

const SITE_URL = 'https://vaibhavbansal.in';
const SOCIAL_IMAGE = `${SITE_URL}/og-vaibhav-bansal.jpg`;
const PROFILE_MAIN_ENTITY = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Vaibhav Bansal',
    alternateName: 'VaibhavBansal26',
    description: 'AI software engineer and full-stack developer building practical AI, data and web products.',
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/avatar-light3.jpeg`
};

const normalizePath = pathname => {
    if (!pathname || pathname === '/') return '/';
    return pathname.replace(/\/+$/, '');
};

const canonicalPath = pathname => pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;

const upsertMeta = (selector, attributes) => {
    let element = document.head.querySelector(selector);
    if (!element) {
        element = document.createElement('meta');
        document.head.appendChild(element);
    }
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
};

const upsertCanonical = href => {
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', href);
};

export default function usePageTitle(page, override = null) {
    useEffect(() => {
        const pathname = normalizePath(window.location.pathname);
        const isNotFound = !override && (page === '404' || !siteMeta[pathname]);
        const meta = override || (isNotFound ? siteMeta['404'] : siteMeta[pathname]);
        const metaPath = override?.path || pathname;
        const canonicalUrl = `${SITE_URL}${canonicalPath(metaPath)}`;

        document.title = meta.title;
        upsertMeta('meta[name="description"]', { name: 'description', content: meta.description });
        upsertMeta('meta[name="robots"]', { name: 'robots', content: meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large' });
        upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title });
        upsertMeta('meta[property="og:description"]', { property: 'og:description', content: meta.description });
        upsertMeta('meta[property="og:type"]', { property: 'og:type', content: meta.type === 'SoftwareSourceCode' ? 'article' : 'website' });
        upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
        upsertMeta('meta[property="og:image"]', { property: 'og:image', content: SOCIAL_IMAGE });
        upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title });
        upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: meta.description });
        upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: SOCIAL_IMAGE });
        upsertCanonical(canonicalUrl);

        const previousRouteSchema = document.getElementById('route-structured-data');
        if (previousRouteSchema) previousRouteSchema.remove();
        if (!meta.noindex) {
            const schema = document.createElement('script');
            schema.id = 'route-structured-data';
            schema.type = 'application/ld+json';
            schema.textContent = JSON.stringify(meta.schema || {
                '@context': 'https://schema.org',
                '@type': meta.type,
                name: meta.title,
                description: meta.description,
                url: canonicalUrl,
                isPartOf: { '@id': `${SITE_URL}/#website` },
                about: { '@id': `${SITE_URL}/#person` },
                inLanguage: 'en-US',
                ...(meta.type === 'ProfilePage' ? { mainEntity: PROFILE_MAIN_ENTITY } : {})
            });
            document.head.appendChild(schema);
        }
    }, [page, override]);
}
