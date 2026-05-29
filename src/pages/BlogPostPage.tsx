import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Calendar, User, Clock, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { blog, BlogPost } from '../utils/blog';
import { useCTARedirect } from '../utils/useCTARedirect';

/* ── SEO helper: inject meta tags on mount, restore on unmount ── */
function usePageMeta(post: BlogPost | null) {
  useEffect(() => {
    if (!post) return;
    const prev = {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? '',
      ogDesc: document.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? '',
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '',
      twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content') ?? '',
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
    };

    const setMeta = (sel: string, attr: string, val: string) => {
      let el = document.querySelector(sel) as HTMLMetaElement | HTMLLinkElement | null;
      if (!el) {
        el = attr === 'href' ? document.createElement('link') : document.createElement('meta');
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };

    const canonical = `https://exeract.com/blog/${post.slug}`;
    const ogImage = post.image?.startsWith('/') ? `https://exeract.com${post.image}` : post.image;
    const seoTitle = `${post.title} | Exeract Blog`;
    const seoDesc = post.excerpt;

    document.title = seoTitle;
    setMeta('meta[name="description"]', 'content', seoDesc);
    setMeta('meta[property="og:type"]', 'content', 'article');
    setMeta('meta[property="og:title"]', 'content', seoTitle);
    setMeta('meta[property="og:description"]', 'content', seoDesc);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', seoTitle);
    setMeta('meta[name="twitter:description"]', 'content', seoDesc);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);
    setMeta('link[rel="canonical"]', 'href', canonical);

    return () => {
      document.title = prev.title;
      setMeta('meta[name="description"]', 'content', prev.desc);
      setMeta('meta[property="og:title"]', 'content', prev.ogTitle);
      setMeta('meta[property="og:description"]', 'content', prev.ogDesc);
      setMeta('meta[property="og:image"]', 'content', prev.ogImage);
      setMeta('meta[name="twitter:card"]', 'content', prev.twitterCard);
      setMeta('link[rel="canonical"]', 'href', prev.canonical);
    };
  }, [post]);
}

/* ── Skeleton loader ── */
function PostSkeleton() {
  return (
    <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      <div className="h-72 bg-gradient-to-br from-gray-100 to-gray-200" />
      <div className="p-8 space-y-4">
        <div className="h-4 w-24 bg-gray-200 rounded-full" />
        <div className="h-10 w-3/4 bg-gray-100 rounded-xl" />
        <div className="h-5 w-1/2 bg-gray-100 rounded-full" />
        <div className="space-y-3 pt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-4 bg-gray-100 rounded-full ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export function BlogPostPage() {
  const slug = useMemo(() => {
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts.length >= 2 ? decodeURIComponent(parts[1]) : '';
  }, []);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { handleCTAClick, loadingState } = useCTARedirect();

  useEffect(() => {
    let mounted = true;
    blog.getPostBySlug(slug).then((match) => {
      if (!mounted) return;
      setPost(match ?? null);
    }).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [slug]);

  usePageMeta(post);

  return (
    <div className="min-h-screen bg-white font-sans text-navy selection:bg-primary/20 selection:text-navy overflow-x-hidden">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark transition-colors gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </motion.a>

          {/* Loading state */}
          {loading && <PostSkeleton />}

          {/* Not found */}
          {!loading && !post && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center"
            >
              <h1 className="text-2xl font-bold text-navy mb-2">Post not found</h1>
              <p className="text-gray-500 mb-6">The blog post you are looking for does not exist.</p>
              <a href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                Return home
              </a>
            </motion.div>
          )}

          {/* Full post */}
          {post && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10"
            >
              {/* ── Header card ── */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                <div className="p-7 sm:p-10 border-b border-gray-100">
                  {/* Category + meta row */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-xs font-bold uppercase tracking-wide">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <User size={12} />
                      {post.author}
                    </span>
                    {post.readTime && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
                    {post.title}
                  </h1>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                    {post.excerpt}
                  </p>
                </div>

                {/* Hero image */}
                {post.image && (
                  <div className="w-full h-64 sm:h-80 md:h-[420px] overflow-hidden bg-navy">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-90"
                    />
                  </div>
                )}
              </div>

              {/* ── Structured sections ── */}
              {post.sections && post.sections.length > 0 ? (
                <div className="space-y-6">
                  {post.sections.map((section, idx) => {
                    /* ── Intro section ── */
                    if (section.type === 'intro') {
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-10"
                        >
                          <div className="prose prose-slate max-w-none">
                            {section.body.split('\n\n').map((para, pi) => (
                              <p key={pi} className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 last:mb-0">
                                {para}
                              </p>
                            ))}
                          </div>
                        </motion.div>
                      );
                    }

                    /* ── Numbered step section ── */
                    if (section.type === 'numbered') {
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                        >
                          {/* Step header bar */}
                          <div className="flex items-center gap-4 px-7 sm:px-10 py-5 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-secondary/5">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold text-sm flex items-center justify-center shadow-sm shadow-primary/20">
                              {section.number}
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              {section.tag && (
                                <span className="text-xs font-bold uppercase tracking-widest text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full">
                                  {section.tag}
                                </span>
                              )}
                              {section.heading && (
                                <h2 className="text-xl sm:text-2xl font-bold text-navy">
                                  {section.heading}
                                </h2>
                              )}
                            </div>
                          </div>

                          <div className="p-7 sm:p-10">
                            {/* Body paragraphs */}
                            <div className="prose prose-slate max-w-none mb-6">
                              {section.body.split('\n\n').map((para, pi) => (
                                <p key={pi} className="text-gray-700 text-base leading-relaxed mb-4 last:mb-0">
                                  {para}
                                </p>
                              ))}
                            </div>

                            {/* Action item */}
                            {section.actionItem && (
                              <div className="flex items-start gap-3 bg-primary/5 border border-primary/15 rounded-xl px-5 py-4 mb-6">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">Action Item</span>
                                  <p className="text-gray-700 text-sm leading-relaxed">{section.actionItem}</p>
                                </div>
                              </div>
                            )}

                            {/* Target metric */}
                            {section.metric && (
                              <div className="inline-flex items-center gap-3 bg-navy/4 border border-navy/10 rounded-xl px-5 py-3">
                                <span className="text-2xl font-bold text-navy">{section.metric}</span>
                                <div>
                                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block">Target Metric</span>
                                  <span className="text-sm text-gray-600">{section.metricLabel}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    }

                    /* ── Conclusion section ── */
                    if (section.type === 'conclusion') {
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="bg-gradient-to-br from-navy to-navy-light rounded-2xl shadow-lg overflow-hidden p-7 sm:p-10 relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none" />
                          <div className="relative">
                            {section.heading && (
                              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                {section.heading}
                              </h2>
                            )}
                            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                              {section.body}
                            </p>
                            <a
                              href="https://app.exeract.com/signup"
                              onClick={(e) => handleCTAClick(e, "https://app.exeract.com/signup", "blog-signup")}
                              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:scale-105 hover:shadow-xl transition-all duration-200"
                            >
                              {loadingState === "blog-signup" ? (
                                <><Loader2 className="animate-spin h-4 w-4" /> Loading...</>
                              ) : (
                                <>Try Exeract Free <ArrowRight className="h-4 w-4" /></>
                              )}
                            </a>
                          </div>
                        </motion.div>
                      );
                    }

                    return null;
                  })}
                </div>
              ) : (
                /* Fallback: plain text content */
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-10">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
                </div>
              )}
            </motion.article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
