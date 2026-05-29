import React, { useEffect, useState, lazy, Suspense } from 'react';

const LandingPage = lazy(() => import('./pages/LandingPage').then(module => ({ default: module.LandingPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage').then(module => ({ default: module.BlogIndexPage })));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage').then(module => ({ default: module.HowItWorksPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(module => ({ default: module.PricingPage })));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage').then(module => ({ default: module.TermsOfServicePage })));
const TrafficFallbackPage = lazy(() => import('./pages/TrafficFallbackPage').then(module => ({ default: module.TrafficFallbackPage })));

function PageLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderContent = () => {
    // Simple routing logic
    if (currentPath === '/how-it-works') {
      return <HowItWorksPage />;
    }
    if (currentPath === '/pricing') {
      return <PricingPage />;
    }
    if (currentPath === '/terms-of-service' || currentPath === '/terms') {
      return <TermsOfServicePage />;
    }
    if (currentPath === '/blog') {
      return <BlogIndexPage />;
    }
    if (currentPath.startsWith('/blog/')) {
      return <BlogPostPage />;
    }
    if (currentPath === '/traffic-fallback') {
      return <TrafficFallbackPage />;
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
