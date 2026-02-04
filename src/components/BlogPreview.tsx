import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Edit2, Trash2, Plus } from 'lucide-react';
import { auth } from '../utils/auth';
import { BlogEditor } from './BlogEditor';
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
interface BlogPreviewProps {
  isAdmin?: boolean;
}
export function BlogPreview({ isAdmin }: BlogPreviewProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | undefined>(
    undefined
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const loadPosts = async () => {
    const allPosts = await auth.getPosts();
    setPosts(isAdmin ? allPosts : allPosts.slice(0, 3));
  };
  useEffect(() => {
    loadPosts();
  }, [isAdmin]);
  const handleCreateNew = () => {
    setCurrentPost(undefined);
    setIsEditing(true);
  };
  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };
  const handleDelete = async (id: string) => {
    await auth.deletePost(id);
    loadPosts();
    setShowDeleteConfirm(null);
  };
  const handleSave = async (post: BlogPost) => {
    await auth.savePost(post);
    loadPosts();
    setIsEditing(false);
  };
  return (
    <section id="blog" className="py-16 sm:py-24 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-base font-semibold text-primary uppercase tracking-wide mb-2">
              From the Blog
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy">
              Lead Verification Insights
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && posts.length > 0 &&
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-navy text-sm font-bold border border-gray-200 shadow-sm hover:bg-gray-50">

                <Plus size={16} />
                New Post
              </button>
            }
            {posts.length > 3 &&
            <a
              href="/blog"
              className="hidden md:flex items-center text-primary font-bold hover:text-primary-dark transition-colors whitespace-nowrap">

                View all articles <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            }
          </div>
        </div>

        {posts.length === 0 ?
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center py-12">
            <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm border border-gray-100 mb-4">

              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            </motion.div>
            <p className="text-gray-500">
              No blog yet.
            </p>
          </motion.div> :

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post, index) =>
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
              delay: index * 0.1
            }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full relative">

                <div className="relative h-48 overflow-hidden">
                  <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />

                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-navy">
                    {post.category}
                  </div>
                  {isAdmin &&
                <div className="absolute top-3 right-3 flex items-center gap-2">
                      {showDeleteConfirm === post.id ?
                  <>
                          <button
                      onClick={() => post.id && handleDelete(post.id)}
                      className="px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-bold">

                            Yes
                          </button>
                          <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="px-2.5 py-1 rounded-full bg-white text-navy text-xs font-bold">

                            No
                          </button>
                        </> :

                  <>
                          <button
                      onClick={() => handleEdit(post)}
                      className="p-2 rounded-full bg-white/90 text-navy shadow-sm hover:bg-white"
                      title="Edit post">

                            <Edit2 size={14} />
                          </button>
                          <button
                      onClick={() => post.id && setShowDeleteConfirm(post.id)}
                      className="p-2 rounded-full bg-white/90 text-red-600 shadow-sm hover:bg-white"
                      title="Delete post">

                            <Trash2 size={14} />
                          </button>
                        </>}
                    </div>
                }
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

        {posts.length > 3 &&
        <div className="mt-8 text-center md:hidden">
            <a
              href="/blog"
              className="inline-flex items-center text-primary font-bold hover:text-primary-dark transition-colors">

              View all articles <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        }
      </div>
      {isEditing &&
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-auto">
            <BlogEditor
            post={currentPost}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)} />

          </div>
        </div>
      }
    </section>);

}
