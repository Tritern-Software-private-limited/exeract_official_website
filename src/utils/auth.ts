// Simple authentication utility using localStorage
export const AUTH_TOKEN_KEY = 'exeract_auth_token';
export const BLOG_POSTS_KEY = 'exeract_blog_posts';

// Initial blog posts data
export const INITIAL_POSTS = [
{
  id: '1',
  title: '5 Signs Your Lead Verification Process is Broken',
  excerpt:
  'Are you wasting budget on bad leads? Here are the red flags to look for in your current qualification workflow.',
  content: 'Full content would go here...',
  image:
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  date: 'Oct 12, 2023',
  author: 'Sarah Jenkins',
  category: 'Strategy'
},
{
  id: '2',
  title: 'How AI is Transforming B2B Lead Qualification',
  excerpt:
  "Machine learning models can now predict lead quality with higher accuracy than human researchers. Here's how it works.",
  content: 'Full content would go here...',
  image:
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
  date: 'Oct 28, 2023',
  author: 'David Chen',
  category: 'Technology'
},
{
  id: '3',
  title: 'Case Study: How TechFlow Increased Conversion by 40%',
  excerpt:
  'See how a mid-sized SaaS company implemented automated verification and drastically improved their sales efficiency.',
  content: 'Full content would go here...',
  image:
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  date: 'Nov 05, 2023',
  author: 'Alex Rivera',
  category: 'Case Study'
}];


export const auth = {
  login: async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/.netlify/functions/admin-login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) return false;

      const data = await response.json();
      if (!data?.token) return false;

      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      return true;
    } catch {
      return false;
    }
  },

  getToken: (): string | null => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  logout: (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    window.location.reload();
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  },

  // Blog data helpers (Mongo via Netlify functions)
  getPosts: async () => {
    try {
      const response = await fetch('/.netlify/functions/posts-get');
      if (!response.ok) throw new Error('Failed to load posts');
      const data = await response.json();
      if (Array.isArray(data?.posts)) return data.posts;
      return [];
    } catch {
      const stored = localStorage.getItem(BLOG_POSTS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_POSTS;
    }
  },

  savePost: async (post: any) => {
    const token = auth.getToken();
    const response = await fetch('/.netlify/functions/posts-save', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token ? { authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ post })
    });

    if (!response.ok) throw new Error('Failed to save post');
    const data = await response.json();
    return data?.post;
  },

  deletePost: async (id: string) => {
    const token = auth.getToken();
    const response = await fetch('/.netlify/functions/posts-delete', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token ? { authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ id })
    });

    if (!response.ok) throw new Error('Failed to delete post');
  }
};
