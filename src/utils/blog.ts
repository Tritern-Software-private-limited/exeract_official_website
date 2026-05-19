export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime?: string;
  sections?: BlogSection[];
}

export interface BlogSection {
  type: 'intro' | 'numbered' | 'conclusion';
  heading?: string;
  number?: number;
  tag?: string;
  metric?: string;
  metricLabel?: string;
  body: string;
  actionItem?: string;
}

export const INITIAL_POSTS: BlogPost[] = [
  {
    slug: 'outbound-tech-stack-for-founders-and-lean-teams',
    title: 'Outbound Tech Stack for Founders and Lean Teams',
    excerpt:
      'Founders are wasting too much runway on bloated software stacks. Here is the exact, zero-fluff outbound infrastructure designed for lean teams, covering deliverability, raw data, qualification, and sending.',
    content: '',
    image: '/outbound-tech-stack-hero.png',
    date: 'May 19, 2025',
    author: 'Exeract Team',
    category: 'Strategy',
    readTime: '5 min read',
    sections: [
      {
        type: 'intro',
        body: "Founders are wasting too much runway on bloated software stacks. When you run a lean team, paying $500 a month per rep for a dozen overlapping tools is not sustainable.\n\nYou do not need a complex web of software to generate pipeline. You need infrastructure, raw data, qualification, and a sending mechanism. That is all.\n\nHere is the exact, zero-fluff outbound tech stack designed for founders and lean teams."
      },
      {
        type: 'numbered',
        number: 1,
        tag: 'Infrastructure',
        heading: 'Google Workspace',
        body: "Deliverability is the foundation of modern outbound. If your emails land in spam, nothing else matters. Set up secondary domains through Google Workspace and lock down your DNS records.",
        actionItem: "Configure SPF, DKIM, and DMARC before you send a single email. Gradually build your domain reputation using controlled warm-up protocols.",
        metric: '<2%',
        metricLabel: 'Target bounce rate'
      },
      {
        type: 'numbered',
        number: 2,
        tag: 'Raw Data',
        heading: 'Apollo or Clay',
        body: "You need a starting point for contacts. Tools like Apollo give you access to millions of leads and basic firmographic data. But here is the problem: raw data is noisy. Just because a company is listed under \"Software\" does not mean they actually need your product."
      },
      {
        type: 'numbered',
        number: 3,
        tag: 'Data Qualification',
        heading: 'Exeract',
        body: "This is the missing link in most outbound stacks. Getting raw lists is easy. Figuring out which of those 1,000 companies actually fit your ideal customer profile is the hard part.\n\nThis is exactly why we built Exeract. We saw founders, data experts, and researchers burning hours performing manual website checks just to verify if a prospect was worth emailing. Exeract is an AI product built strictly for structured execution. It takes your raw list and performs the manual website verification for you at scale. There are no autonomous agents hallucinating answers. It simply executes the exact qualification checks you need, giving you a clean, highly targeted list.",
        metric: '>5%',
        metricLabel: 'Target positive reply rate'
      },
      {
        type: 'numbered',
        number: 4,
        tag: 'Sending',
        heading: 'Smartlead or Instantly',
        body: "Once you have an infrastructure that hits the primary inbox and a list of hyper-qualified leads from Exeract, you need a sequencer. Tools like Smartlead or Instantly handle inbox rotation and sequence automation seamlessly.",
        metric: '>60%',
        metricLabel: 'Target open rate'
      },
      {
        type: 'conclusion',
        heading: 'The Bottom Line',
        body: "Stop trying to hack your way around bad data with clever copywriting. The secret to modern outbound is simple. Keep your deliverability tight, use Exeract to execute your manual data qualification at scale, and focus your human energy on the actual conversations."
      }
    ]
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
