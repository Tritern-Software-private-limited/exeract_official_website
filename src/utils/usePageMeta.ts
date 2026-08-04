import { useEffect } from 'react';
import { RouteSEO, getSEOForPath } from './seoConfig';

function setMetaTag(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!el) {
    el = attr === 'href' ? document.createElement('link') : document.createElement('meta');
    if (selector.startsWith('meta[name=')) {
      const name = selector.match(/meta\[name="([^"]+)"\]/)?.[1];
      if (name) el.setAttribute('name', name);
    } else if (selector.startsWith('meta[property=')) {
      const property = selector.match(/meta\[property="([^"]+)"\]/)?.[1];
      if (property) el.setAttribute('property', property);
    } else if (selector.startsWith('link[rel=')) {
      const rel = selector.match(/link\[rel="([^"]+)"\]/)?.[1];
      if (rel) el.setAttribute('rel', rel);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export function usePageMeta(customSEO?: Partial<RouteSEO>) {
  useEffect(() => {
    const currentSEO = customSEO?.path ? customSEO : getSEOForPath(window.location.pathname);
    const title = customSEO?.title || currentSEO.title;
    const description = customSEO?.description || currentSEO.description;
    const canonical = customSEO?.canonical || currentSEO.canonical;
    const ogImage = customSEO?.ogImage || currentSEO.ogImage || 'https://exeract.com/outbound-tech-stack-hero.png';
    const ogType = customSEO?.ogType || currentSEO.ogType || 'website';

    // Store previous for cleanup
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';

    // Apply SEO tags
    document.title = title || 'Qualify ICP Fit & Verify Emails for Outbound | Exeract';
    if (description) {
      setMetaTag('meta[name="description"]', 'content', description);
    }
    if (canonical) {
      setMetaTag('link[rel="canonical"]', 'href', canonical);
    }

    setMetaTag('meta[property="og:title"]', 'content', title || document.title);
    if (description) {
      setMetaTag('meta[property="og:description"]', 'content', description);
    }
    if (canonical) {
      setMetaTag('meta[property="og:url"]', 'content', canonical);
    }
    setMetaTag('meta[property="og:type"]', 'content', ogType);
    setMetaTag('meta[property="og:image"]', 'content', ogImage);

    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'content', title || document.title);
    if (description) {
      setMetaTag('meta[name="twitter:description"]', 'content', description);
    }
    setMetaTag('meta[name="twitter:image"]', 'content', ogImage);

    return () => {
      document.title = prevTitle;
      if (prevDesc) {
        setMetaTag('meta[name="description"]', 'content', prevDesc);
      }
    };
  }, [customSEO]);
}
