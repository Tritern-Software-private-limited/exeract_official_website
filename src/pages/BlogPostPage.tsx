import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { auth } from '../utils/auth';

interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export function BlogPostPage() {
  const postId = useMemo(() => {
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    return parts.length >= 2 ? decodeURIComponent(parts[1]) : '';
  }, []);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    auth
      .getPosts()
      .then((posts: BlogPost[]) => {
        if (!mounted) return;
        const match = posts.find((item) => item.id === postId) || null;
        setPost(match);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [postId]);

  return (
    <div className="min-h-screen bg-white font-sans text-navy selection:bg-primary/20 selection:text-navy overflow-x-hidden">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Landing Page
          </a>

          {loading &&
          <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="h-6 w-48 bg-gray-200 rounded-full mb-4" />
              <div className="h-10 w-full bg-gray-100 rounded-xl mb-6" />
              <div className="h-64 w-full bg-gray-100 rounded-2xl mb-8" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-100 rounded-full" />
                <div className="h-4 w-11/12 bg-gray-100 rounded-full" />
                <div className="h-4 w-9/12 bg-gray-100 rounded-full" />
              </div>
            </div>
          }

          {!loading && !post &&
          <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
              <h1 className="text-2xl font-bold text-navy mb-2">
                Post not found
              </h1>
              <p className="text-gray-500 mb-6">
                The blog post you are looking for does not exist.
              </p>
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                Return home
              </a>
            </div>
          }

          {post &&
          <article className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-xs font-bold">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {post.date}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <User size={12} className="mr-1" />
                    {post.author}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy leading-tight">
                  {post.title}
                </h1>
                <p className="text-gray-600 mt-4 text-base sm:text-lg">
                  {post.excerpt}
                </p>
              </div>

              {post.image &&
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-100">
                  <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover" />
                </div>
              }

              <div className="p-6 sm:p-8">
                <div className="prose prose-slate max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>
              </div>
            </article>
          }
        </div>
      </main>

      <Footer />
    </div>
  );
}
