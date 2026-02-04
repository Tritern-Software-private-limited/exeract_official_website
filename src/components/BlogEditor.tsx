import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Image as ImageIcon, Calendar, User, Tag } from 'lucide-react';
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
interface BlogEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}
export function BlogEditor({ post, onSave, onCancel }: BlogEditorProps) {
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    author: '',
    category: 'Strategy'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (formData.excerpt.length > 200)
    newErrors.excerpt = 'Excerpt must be less than 200 characters';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      onSave(formData);
      setIsSubmitting(false);
    }, 800);
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-bold text-navy">
          {post ? 'Edit Post' : 'Create New Post'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors">

          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value
            })
            }
            className={`w-full px-4 py-2 rounded-lg border ${errors.title ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20'} focus:border-primary focus:outline-none transition-all`}
            placeholder="Enter a catchy title..." />

          {errors.title &&
          <p className="mt-1 text-xs text-red-500">{errors.title}</p>
          }
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <User size={14} className="mr-1 text-gray-400" /> Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
              setFormData({
                ...formData,
                author: e.target.value
              })
              }
              className={`w-full px-4 py-2 rounded-lg border ${errors.author ? 'border-red-300' : 'border-gray-200'} focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
              placeholder="e.g. Sarah Jenkins" />

            {errors.author &&
            <p className="mt-1 text-xs text-red-500">{errors.author}</p>
            }
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Tag size={14} className="mr-1 text-gray-400" /> Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value
              })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white">

              <option value="Strategy">Strategy</option>
              <option value="Technology">Technology</option>
              <option value="Case Study">Case Study</option>
              <option value="Product Update">Product Update</option>
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <ImageIcon size={14} className="mr-1 text-gray-400" /> Featured
            Image URL
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.value
              })
              }
              className={`flex-1 px-4 py-2 rounded-lg border ${errors.image ? 'border-red-300' : 'border-gray-200'} focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
              placeholder="https://..." />

            {formData.image &&
            <div className="h-10 w-16 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                <img
                src={formData.image}
                alt="Preview"
                className="h-full w-full object-cover" />

              </div>
            }
          </div>
          {errors.image &&
          <p className="mt-1 text-xs text-red-500">{errors.image}</p>
          }
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Excerpt (Short summary)
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) =>
            setFormData({
              ...formData,
              excerpt: e.target.value
            })
            }
            rows={3}
            className={`w-full px-4 py-2 rounded-lg border ${errors.excerpt ? 'border-red-300' : 'border-gray-200'} focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none`}
            placeholder="Brief description for the blog card..." />

          <div className="flex justify-between mt-1">
            {errors.excerpt &&
            <p className="text-xs text-red-500">{errors.excerpt}</p>
            }
            <p
              className={`text-xs ml-auto ${formData.excerpt.length > 200 ? 'text-red-500' : 'text-gray-400'}`}>

              {formData.excerpt.length}/200
            </p>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Content
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
            setFormData({
              ...formData,
              content: e.target.value
            })
            }
            rows={10}
            className={`w-full px-4 py-2 rounded-lg border ${errors.content ? 'border-red-300' : 'border-gray-200'} focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm`}
            placeholder="Write your blog post content here..." />

          {errors.content &&
          <p className="mt-1 text-xs text-red-500">{errors.content}</p>
          }
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors">

            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center disabled:opacity-70">

            {isSubmitting ?
            <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Saving...
              </> :

            <>
                <Save size={18} className="mr-2" />
                Save Post
              </>
            }
          </button>
        </div>
      </form>
    </motion.div>);

}