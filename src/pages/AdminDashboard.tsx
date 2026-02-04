import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Search,
  FileText,
  Calendar,
  User } from
'lucide-react';
import { auth } from '../utils/auth';
import { BlogEditor } from '../components/BlogEditor';
import { ContentEditor } from '../components/ContentEditor';
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
interface AdminDashboardProps {
  onLogout: () => void;
}
export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'blog' | 'content'>('blog');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  useEffect(() => {
    auth.getPosts().then(setPosts);
  }, []);
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
    const nextPosts = await auth.getPosts();
    setPosts(nextPosts);
    setShowDeleteConfirm(null);
  };
  const handleSave = async (post: BlogPost) => {
    await auth.savePost(post);
    const nextPosts = await auth.getPosts();
    setPosts(nextPosts);
    setIsEditing(false);
  };
  const filteredPosts = posts.filter(
    (post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy">
      {/* Header */}
      <header className="bg-navy text-white shadow-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0 min-h-[4rem] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <img
              src="/Group_99.png"
              alt="Exeract Logo"
              className="h-8 w-auto brightness-0 invert" />

            <div className="h-6 w-px bg-gray-700" />
            <span className="font-medium text-gray-300">Admin Portal</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400 hidden sm:inline">
              admin@exeract.com
            </span>
            <button
              onClick={onLogout}
              className="flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors">

              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Tab Navigation */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-xl w-full whitespace-nowrap">
          <button
            onClick={() => setActiveTab('blog')}
            className={`flex-1 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${activeTab === 'blog' ? 'bg-white text-navy shadow-sm' : 'text-gray-600 hover:text-navy hover:bg-gray-300/50'}`}>

            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-white text-navy shadow-sm' : 'text-gray-600 hover:text-navy hover:bg-gray-300/50'}`}>

            Page Content
          </button>
        </div>
        </div>

        {activeTab === 'content' ?
        <ContentEditor /> :

        <AnimatePresence mode="wait">
            {isEditing ?
          <BlogEditor
            key="editor"
            post={currentPost}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)} /> :


          <motion.div
            key="list"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -20
            }}
            className="space-y-6">

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white"
                  placeholder="Search posts..." />

                  </div>
                  <button
                onClick={handleCreateNew}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center">

                    <Plus size={18} className="mr-2" />
                    Create New Post
                  </button>
                </div>

                {/* Blog List */}
                {filteredPosts.length === 0 ?
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-navy mb-2">
                      No posts found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {searchTerm ?
                'Try adjusting your search terms' :
                'Get started by creating your first blog post'}
                    </p>
                    {!searchTerm &&
              <button
                onClick={handleCreateNew}
                className="text-primary font-bold hover:text-primary-dark transition-colors">

                        Create Post
                      </button>
              }
                  </div> :

            <div className="grid gap-4">
                    {filteredPosts.map((post) =>
              <motion.div
                layout
                key={post.id}
                className="bg-white p-3 sm:p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center group">

                        {/* Thumbnail */}
                        <div className="w-full sm:w-32 h-40 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary-dark text-xs font-bold">
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center">
                              <Calendar size={12} className="mr-1" />
                              {post.date}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-navy mb-1 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center text-xs text-gray-400">
                            <User size={12} className="mr-1" />
                            {post.author}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0 mt-2 sm:mt-0">
                          {showDeleteConfirm === post.id ?
                  <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-200">
                              <span className="text-xs text-red-500 font-medium mr-2">
                                Sure?
                              </span>
                              <button
                      onClick={() => post.id && handleDelete(post.id)}
                      className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors">

                                Yes
                              </button>
                              <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">

                                No
                              </button>
                            </div> :

                  <>
                              <button
                      onClick={() => handleEdit(post)}
                      className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                      title="Edit">

                                <Edit2 size={18} />
                              </button>
                              <button
                      onClick={() =>
                      post.id && setShowDeleteConfirm(post.id)
                      }
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete">

                                <Trash2 size={18} />
                              </button>
                            </>
                  }
                        </div>
                      </motion.div>
              )}
                  </div>
            }
              </motion.div>
          }
          </AnimatePresence>
        }
      </main>
    </div>);

}
