import React, { useEffect, useState, lazy, Suspense } from 'react';

const LandingPage = lazy(() => import('./pages/LandingPage').then(module => ({ default: module.LandingPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage').then(module => ({ default: module.BlogIndexPage })));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage').then(module => ({ default: module.HowItWorksPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(module => ({ default: module.PricingPage })));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage').then(module => ({ default: module.TermsOfServicePage })));
const TrafficFallbackPage = lazy(() => import('./pages/TrafficFallbackPage').then(module => ({ default: module.TrafficFallbackPage })));
const EmailVerificationPage = lazy(() => import('./pages/EmailVerificationPage').then(module => ({ default: module.EmailVerificationPage })));
const OutboundUserGuidePage = lazy(() => import('./pages/OutboundUserGuidePage').then(module => ({ default: module.OutboundUserGuidePage })));
const ChromeExtensionPage = lazy(() => import('./pages/ChromeExtensionPage').then(module => ({ default: module.ChromeExtensionPage })));

function PageLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function normalizePath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return clean.toLowerCase();
}

export function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      window.scrollTo(0, 0);
    };

    const handleLinkClick = (e: MouseEvent) => {
      // Find closest anchor element
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      // Ignore anchors with no href, hash anchors, mailto, tel, or javascript:
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        return;
      }

      // Ignore external tabs, downloads, or non-primary clicks / modified clicks
      if (target.getAttribute('target') === '_blank' || target.hasAttribute('download')) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      try {
        const url = new URL(href, window.location.origin);
        // Only handle internal links to the same origin
        if (url.origin === window.location.origin) {
          e.preventDefault();
          const targetNormalized = normalizePath(url.pathname);
          const currentNormalized = normalizePath(window.location.pathname);

          if (targetNormalized !== currentNormalized || url.search !== window.location.search) {
            window.history.pushState({}, '', href);
            setCurrentPath(targetNormalized);
            window.scrollTo(0, 0);
          }
        }
      } catch {
        // Fallback to default browser behavior if URL parsing fails
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const renderContent = () => {
    const normalized = normalizePath(currentPath);

    // Simple routing logic with normalized path
    if (normalized === '/icp-qualification') {
      return <HowItWorksPage />;
    }
    if (normalized === '/pricing') {
      return <PricingPage />;
    }
    if (normalized === '/terms-of-service' || normalized === '/terms') {
      return <TermsOfServicePage />;
    }
    if (normalized === '/blog') {
      return <BlogIndexPage />;
    }
    if (normalized.startsWith('/blog/')) {
      return <BlogPostPage />;
    }
    if (normalized === '/product-access') {
      return <TrafficFallbackPage />;
    }
    if (normalized === '/email-verification') {
      return <EmailVerificationPage />;
    }
    if (normalized === '/outbound-user-guide') {
      return <OutboundUserGuidePage />;
    }
    if (normalized === '/chrome-extension') {
      return <ChromeExtensionPage />;
    }
    // Default to landing page
    return <LandingPage />;
  };

  return (
    <Suspense fallback={<PageLoader />}>
      {renderContent()}
    </Suspense>
  );
}
