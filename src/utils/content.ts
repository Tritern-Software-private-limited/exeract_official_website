export const CONTENT_KEY = 'exeract_page_content';

export const INITIAL_CONTENT = {
  hero: {
    badge: 'New: Advanced Keyword Intelligence 2.0',
    headline: 'Qualify Your Target Companies at Scale',
    subheadline:
    'Upload your company lists, define your ICP keywords, and let Exeract handle the qualification. Cut research time and scale targeting the right companies.',
    primaryCta: 'Start Free Trial',
    secondaryCta: 'See How It Works',
    trustBadges: [
    'No credit card required',
    '14-day free trial',
    'GDPR Compliant']

  },
  howItWorks: {
    sectionTitle: 'How It Works',
    heading: 'Qualify thousands of Companies in minutes',
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
      'Define the exact criteria that qualify a target company for your business. Use boolean logic and negative keywords for precision.'
    },
    {
      title: 'Get Confidence Scores',
      description:
      'Receive instant qualified results with detailed confidence ratings. Export clean, verified lists ready for your sales team.'
    }]

  },
  features: {
    sectionTitle: 'Why Exeract?',
    heading: 'Built for high-velocity growth teams',
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
    plans: [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for small teams getting started with automation.',
      features: [
      '1,000 verifications/month',
      'Basic keyword matching',
      'CSV export',
      'Email support',
      'Single user']

    },
    {
      name: 'Professional',
      price: '$149',
      period: '/month',
      description: 'For growing businesses that need scale and precision.',
      popular: true,
      features: [
      '10,000 verifications/month',
      'Advanced keyword intelligence',
      'API access',
      'Priority support',
      'Custom integrations',
      '5 team members']

    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for large-scale lead operations.',
      features: [
      'Unlimited verifications',
      'Dedicated account manager',
      'Custom AI training',
      'SLA guarantee',
      'White-label options',
      'SSO & Advanced Security']

    }]

  },
  footer: {
    description:
    'Exeract helps B2B sales teams automate lead verification, ensuring you only spend time on qualified prospects.',
    email: 'support@exeract.com'
  }
};

export const content = {
  getContent: async () => {
    try {
      const response = await fetch('/.netlify/functions/content-get');
      if (!response.ok) throw new Error('Failed to load content');
      const data = await response.json();
      if (data?.content) {
        localStorage.setItem(CONTENT_KEY, JSON.stringify(data.content));
        return data.content;
      }
      return INITIAL_CONTENT;
    } catch {
      const stored = localStorage.getItem(CONTENT_KEY);
      if (!stored) {
        localStorage.setItem(CONTENT_KEY, JSON.stringify(INITIAL_CONTENT));
        return INITIAL_CONTENT;
      }
      return JSON.parse(stored);
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
    localStorage.setItem(CONTENT_KEY, JSON.stringify(newContent));
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
