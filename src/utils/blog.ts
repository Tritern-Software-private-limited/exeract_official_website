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
  type: 'intro' | 'numbered' | 'conclusion' | 'interactive';
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
    image: '/exeract-tech-stack.png',
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
  },
  {
    slug: 'how-to-qualify-target-companies-faster-inside-apollo-and-clay',
    title: 'How to Qualify Target Companies Faster Inside Apollo and Clay',
    excerpt: 'Building lists in Apollo and Clay is incredibly fast, but qualifying those lists at scale without blowing your budget or getting inaccurate data is where the standard playbook falls apart.',
    content: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000',
    date: 'June 1, 2026',
    author: 'Exeract Team',
    category: 'Outbound',
    readTime: '4 min read',
    sections: [
      {
        type: 'intro',
        body: "You can pull data on thousands of companies in Apollo or Clay in seconds. But qualifying those lists at scale without blowing your budget or ending up with irrelevant data? That is where the standard playbook falls apart.\n\nSetting up automated workflows inside these platforms is the norm for scaling B2B outreach. You get speed and basic firmographic enrichments instantly. But when it comes to deep ICP qualification, native automation flows start to show their cracks."
      },
      {
        type: 'numbered',
        number: 1,
        tag: 'Bottleneck',
        heading: 'The Hidden Costs of Native Automation',
        body: "Automating deep website research directly within your primary platforms sounds ideal. In reality, it often introduces new bottlenecks for your research team.\n\nTake Clay. It offers incredible flexibility for building custom data workflows. However, running complex AI prompts to analyze a company website for every single row leads to a massive and costly credit burn. The platform gets very expensive, very fast.\n\nApollo takes a different approach by offering native AI features for quick insights. The problem arises when you push these features for nuanced business model analysis. Apollo is optimized for speed, which frequently results in AI hallucination. The system guesses just to give you an immediate answer.\n\nWhen your automation burns through your budget or hallucinates false positives, the result is always the same. Your researchers are forced right back into doing manual website checks to verify the data.",
        actionItem: "Audit your current automation workflows. Identify if you are spending expensive AI credits on basic list filtration checks that could be handled upstream."
      },
      {
        type: 'numbered',
        number: 2,
        tag: 'Solution',
        heading: 'Structured Execution Without the Premium Price Tag',
        body: "You need a way to automate deep qualification without draining your budget or risking bad data. This is exactly where Exeract fits into your stack.\n\nExeract is a structured execution product designed specifically for ABM teams. Instead of forcing you to migrate to a new tool, Exeract seamlessly overlays ICP match results right as you browse Apollo, Clay, Prospeo, or your CRM.\n\nWe deliberately engineered Exeract to avoid real-time guessing. A proper, thorough qualification in minutes. By giving the system the necessary time to actually read and process the target company website, you get verified, structured results overlaid exactly where you work.\n\nYou get zero hallucinations and no costly credit burn.",
        actionItem: "Set up Exeract overlays directly in your browser. Let the system execute deep background qualifications rather than forcing your research team to manually check accounts."
      },
      {
        type: 'numbered',
        number: 3,
        tag: 'Step 1',
        heading: 'Build Your Base Lists',
        body: "Continue sourcing your initial universe of accounts natively in Apollo or Clay. Use their built-in filters to pull the broad firmographic universe.",
        actionItem: "Generate your initial raw list without running any deep AI enrichment credits."
      },
      {
        type: 'numbered',
        number: 4,
        tag: 'Step 2',
        heading: 'Define Your Standard',
        body: "Set strict parameters for exactly what makes a company a highly qualified target for your specific campaign. Exeract allows you to look for hyper-specific signals that standard databases miss.",
        actionItem: "Map out custom ICP parameters (like specific software triggers, product-led indicators, or active job openings) inside Exeract."
      },
      {
        type: 'numbered',
        number: 5,
        tag: 'Step 3',
        heading: 'Trigger Deep Analysis',
        body: "Instead of running costly prompts per row, let Exeract run the deep website checks in the background. It actually navigates and reads the websites like a human researcher would."
      },
      {
        type: 'numbered',
        number: 6,
        tag: 'Step 4',
        heading: 'Review the Overlay',
        body: "View the verified, hallucination-free scores directly inside your platform UI. You never have to leave Apollo or Clay to verify the data.",
        actionItem: "Filter out the unqualified accounts and push only the verified, highly-targeted leads directly to your sequencer."
      },
      {
        type: 'conclusion',
        heading: 'Scale with Confidence',
        body: "Maximize the value of your existing Apollo and Clay workflows today. Stop paying premium credits for basic verification and stop losing pipeline to bad AI data.\n\nGet accurate account insights and scale your outreach with complete confidence."
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
