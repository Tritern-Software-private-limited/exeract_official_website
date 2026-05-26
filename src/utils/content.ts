export const INITIAL_CONTENT = {
  hero: {
    badge: 'New: Advanced Keyword Intelligence 2.0',
    headline: 'Know Exactly Which Companies Fit Your ICP',
    subheadline:
      'Import your lists from Apollo.io, Clay, SalesNav, or your own CRM. Exeract instantly qualifies every company against your ICP keywords and returns clear match results.',
    primaryCta: 'Get Started',
    secondaryCta: 'See How It Works',
    trustBadges: [
      'No credit card required',
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
        description: 'Perfect for trying out Exeract\'s core qualification features.',
        price: '$0',
        period: '/month',
        creditsTitle: '100 Credits / month',
        creditsDesc: '(Approx. 500+ company checks)',
        ctaText: 'Get Started',
        features: [
          'Full access to the core engine',
          'Standard data qualification',
          'CSV data export']
      },
      {
        name: 'Personal',
        description: 'Designed for individuals looking to qualify medium-sized lists.',
        price: '$15',
        period: '/month',
        creditsTitle: '500 Credits / month',
        creditsDesc: '(Approx. 2,500+ company checks)',
        ctaText: 'Get Started',
        features: [
          'Full access to the core engine',
          'Standard data qualification',
          'CSV data export',
          'Priority queue processing']
      },
      {
        name: 'Professional',
        description: 'Best for growing outbound teams that need higher volume and speed.',
        price: '$39',
        period: '/month',
        popular: true,
        creditsTitle: '1,000 Credits / month',
        creditsDesc: '(Approx. 5,000+ company checks)',
        ctaText: 'Get Started',
        features: [
          'Full access to the core engine',
          'Social media links in report',
          'CSV data export',
          'Priority queue processing']
      },
      {
        name: 'Enterprise',
        description: 'For organizations with custom requirements and integrations.',
        price: 'Custom',
        period: 'Pricing',
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

const cloneInitialContent = (): ContentType =>
  JSON.parse(JSON.stringify(INITIAL_CONTENT)) as ContentType;

export const content = {
  getContent: async () => {
    return cloneInitialContent();
  },

  useContent: () => {
    return content.getContent();
  }
};
