import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { auth } from '../utils/auth';
import { motion } from 'framer-motion';

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

export function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    let mounted = true;
    auth
      .getPosts()
      .then((items: BlogPost[]) => {
        if (mounted) setPosts(items);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    posts.forEach((post) => {
      if (post.category) unique.add(post.category);
    });
    return ['All', ...Array.from(unique)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, searchTerm, selectedCategory]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const pageStart = (page - 1) * pageSize;
  const paginatedPosts = filteredPosts.slice(pageStart, pageStart + pageSize);

  return (
    <div className="min-h-screen bg-white font-sans text-navy selection:bg-primary/20 selection:text-navy overflow-x-hidden">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Landing Page
          </a>

          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
                Lead Verification Insights
              </h1>
              <p className="text-gray-600 mt-3 max-w-2xl">
                Practical insights, product updates, and case studies from the
                Exeract team.
              </p>
            </div>
          </div>
          {!loading && posts.length > 0 &&
          <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search posts by title or author..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none bg-white" />

                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Category</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">

                  {categories.map((category) =>
                <option key={category} value={category}>
                      {category}
                    </option>
                )}
                </select>
              </div>
            </div>
          }

          {loading &&
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Array.from({ length: 3 }).map((_, idx) =>
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="h-48 bg-gray-100" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 w-20 bg-gray-100 rounded-full" />
                    <div className="h-6 w-4/5 bg-gray-100 rounded-full" />
                    <div className="h-4 w-full bg-gray-100 rounded-full" />
                    <div className="h-4 w-2/3 bg-gray-100 rounded-full" />
                  </div>
                </div>
            )}
            </div>
          }

          {!loading && posts.length === 0 &&
          <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
              <h2 className="text-2xl font-bold text-navy mb-2">
                No blog yet
              </h2>
              <p className="text-gray-500">
                Check back soon.
              </p>
            </div>
          }

          {!loading && posts.length > 0 &&
          <>
            {filteredPosts.length === 0 ?
            <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                <h2 className="text-2xl font-bold text-navy mb-2">
                  No matching posts
                </h2>
                <p className="text-gray-500">
                  Try a different search term or category.
                </p>
              </div> :

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {paginatedPosts.map((post, index) =>
            <motion.article
              key={post.id || index}
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full">

                  <div className="relative h-48 overflow-hidden">
                    <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-navy">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                      </div>
                    </div>

                    <a
                  href={post.id ? `/blog/${encodeURIComponent(post.id)}` : '#'}
                  className="text-xl font-bold text-navy mb-3 hover:text-primary transition-colors">

                      {post.title}
                    </a>
                    <p className="text-gray-600 text-sm mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    <a
                  href={post.id ? `/blog/${encodeURIComponent(post.id)}` : '#'}
                  className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark mt-auto">

                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </motion.article>
            )}
            </div>
            }

            {filteredPosts.length > pageSize &&
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-sm text-gray-500">
                  Showing {pageStart + 1}–{Math.min(pageStart + pageSize, filteredPosts.length)} of {filteredPosts.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-bold text-navy hover:bg-gray-50 disabled:opacity-50">

                    Previous
                  </button>
                  <span className="text-sm text-gray-500">
                    Page {page} of {totalPages}
                  </span>
                  <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-bold text-navy hover:bg-gray-50 disabled:opacity-50">

                    Next
                  </button>
                </div>
              </div>
            }
          </>
          }
        </div>
      </main>

      <Footer />
    </div>
  );
}
