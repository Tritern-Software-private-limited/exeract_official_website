import React, { useEffect, useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { BlogPostPage } from './pages/BlogPostPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { auth } from './utils/auth';
export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // Force re-render of dashboard
    window.history.pushState({}, '', '/admin');
    setCurrentPath('/admin');
  };
  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false);
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
  };
  // Simple routing logic
  if (currentPath === '/admin') {
    if (isAuthenticated) {
      return <AdminDashboard onLogout={handleLogout} />;
    } else {
      return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }
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
