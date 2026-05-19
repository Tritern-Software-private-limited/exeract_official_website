export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export const INITIAL_POSTS: BlogPost[] = [
  {
    slug: '5-signs-your-lead-verification-process-is-broken',
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
    slug: 'how-ai-is-transforming-b2b-lead-qualification',
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
    slug: 'case-study-how-techflow-increased-conversion-by-40',
    title: 'Case Study: How TechFlow Increased Conversion by 40%',
    excerpt:
      'See how a mid-sized SaaS company implemented automated verification and drastically improved their sales efficiency.',
    content: 'Full content would go here...',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    date: 'Nov 05, 2023',
    author: 'Alex Rivera',
    category: 'Case Study'
  }
];

export const blog = {
  getPosts: async (): Promise<BlogPost[]> => {
    // In a completely static site, we can just return the imported array directly,
    // but returning a Promise keeps it async-friendly if needed later.
    return INITIAL_POSTS;
  },

  getPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
    return INITIAL_POSTS.find((post) => post.slug === slug);
  }
};
