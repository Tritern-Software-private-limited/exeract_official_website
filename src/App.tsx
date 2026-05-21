import React, { useEffect, useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PricingPage } from './pages/PricingPage';

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple routing logic
  if (currentPath === '/how-it-works') {
    return <HowItWorksPage />;
  }
  if (currentPath === '/pricing') {
    return <PricingPage />;
  }
  if (currentPath === '/blog') {
    return <BlogIndexPage />;
  }
  if (currentPath.startsWith('/blog/')) {
    return <BlogPostPage />;
  }

  // Default to landing page
  return <LandingPage />;
}
