export const INITIAL_CONTENT = {
  hero: {
    badge: 'New: Advanced Keyword Intelligence 2.0',
    headline: 'Stop Wasting Hours on Manual Lead Verification',
    subheadline:
      'Exeract automatically verifies your leads against keywords with 95% accuracy. Upload, verify, and close deals 10x faster.',
    primaryCta: 'Start Free Trial',
    secondaryCta: 'See How It Works',
    trustBadges: [
      'No credit card required',
      '14-day free trial',
      'GDPR Compliant']

  },
  howItWorks: {
    sectionTitle: 'How It Works',
    heading: 'Verify thousands of leads in minutes',
    description:
      'Stop manually checking websites. Our automated workflow handles the heavy lifting so you can focus on closing deals.',
    steps: [
      {
        title: 'Upload Your Lead File',
        description:
          'Import CSV, Excel, or any file containing URLs in seconds. Our system automatically detects and parses your data structure.'
      },
      {
        title: 'Set Your Keywords',
        description:
          'Define the exact criteria that qualify a lead for your business. Use boolean logic and negative keywords for precision.'
      },
      {
        title: 'Get Confidence Scores',
        description:
          'Receive instant verification results with detailed confidence ratings. Export clean, verified lists ready for your sales team.'
      }]

  },
  features: {
    sectionTitle: 'Why Exeract?',
    heading: 'Built for high-velocity sales teams',
    description:
      'Manual lead verification is slow, error-prone, and expensive. Exeract replaces the grunt work with intelligent automation, helping you scale your outreach without scaling your headcount.',
    features: [
      {
        title: '95% Verification Accuracy',
        description:
          'AI-powered analysis ensures you only pursue qualified leads. We cross-reference multiple data points to ensure validity.'
      },
      {
        title: '10x Faster Than Manual',
        description:
          'Process thousands of leads in minutes, not days. Free up your SDRs to focus on selling rather than researching.'
      },
      {
        title: 'Keyword Intelligence',
        description:
          'Advanced matching algorithms understand context and relevance, not just exact text matches on the page.'
      },
      {
        title: 'Detailed Reporting',
        description:
          'Export results with confidence scores and verification insights. Integrate directly with your CRM or outreach tools.'
      }]

  },
  pricing: {
    sectionTitle: 'Exeract Pricing Plans',
    subtitle: 'Stop wasting hours on manual verification. Scale your research pipelines with structured LLM execution.',
    plans: [
      {
        name: 'Free',
        price: '$0',
        period: '/month',
        description: 'Perfect for validating schemas and testing the execution engine.',
        creditsTitle: '100 Credits / month',
        creditsDesc: '(Approx. 580 company checks)',
        ctaText: 'Get Started',
        features: [
          'Full access to the core engine',
          'Standard data qualification',
          'CSV data export']
      },
      {
        name: 'Personal',
        price: '$15',
        period: '/month',
        description: 'For researchers scaling their daily manual website checks.',
        creditsTitle: '500 Credits / month',
        creditsDesc: '(Approx. 2,900 company checks)',
        ctaText: 'Get Started',
        features: [
          'Full access to the core engine',
          'Standard data qualification',
          'CSV data export',
          'Priority queue processing']
      },
      {
        name: 'Professional',
        price: '$39',
        period: '/month',
        description: 'For high-volume data qualification with contact enrichment.',
        popular: true,
        creditsTitle: '1,000 Credits / month',
        creditsDesc: '(Approx. 5,800 company checks)',
        ctaText: 'Get Started',
        features: [
          'Full access to the core engine',
          'Social media links in report',
          'CSV data export',
          'Priority queue processing']
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: 'Pricing',
        description: 'For data teams needing specific integrations and massive scale.',
        creditsTitle: 'Custom Credit Volume',
        creditsDesc: 'Tailored to your needs',
        ctaText: 'Contact Sales',
        features: [
          'Custom schema builds',
          'Social media links included',
          'API & Webhook access',
          'Dedicated infrastructure',
          'BYOK (Bring Your Own Key)']
      }]
  },
  footer: {
    description:
      'Exeract helps B2B sales teams automate lead verification, ensuring you only spend time on qualified prospects.',
    email: 'support@exeract.com'
  }
};

export type ContentType = typeof INITIAL_CONTENT;

let cachedContent: ContentType | null = null;
let inFlight: Promise<ContentType> | null = null;
const cloneInitialContent = (): ContentType =>
  JSON.parse(JSON.stringify(INITIAL_CONTENT)) as ContentType;

export const content = {
  getContent: async () => {
    if (cachedContent) return cachedContent;
    if (inFlight) return inFlight;
    inFlight = (async () => {
      const response = await fetch('/.netlify/functions/content-get', { cache: 'no-store' });
      if (response.status === 404) {
        cachedContent = cloneInitialContent();
        return cachedContent;
      }
      if (!response.ok) throw new Error('Failed to load content');
      const data = await response.json();
      if (!data?.content || typeof data.content !== 'object') {
        throw new Error('Invalid content response');
      }
      cachedContent = data.content as ContentType;
      return cachedContent;
    })();
    try {
      return await inFlight;
    } finally {
      inFlight = null;
    }
  },

  saveContent: async (newContent: typeof INITIAL_CONTENT, token?: string) => {
    const response = await fetch('/.netlify/functions/content-save', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token ? { authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ content: newContent })
    });

    if (!response.ok) throw new Error('Failed to save content');
    cachedContent = newContent;
    // Dispatch a custom event so components can update immediately
    window.dispatchEvent(new Event('contentUpdated'));
    return newContent;
  },

  // Hook to use content in components
  useContent: () => {
    // This is just a helper function, not a React hook
    // Components should use their own useEffect to listen for updates
    return content.getContent();
  }
};
