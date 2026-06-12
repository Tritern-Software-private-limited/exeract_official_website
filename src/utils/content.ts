export const INITIAL_CONTENT = {
  hero: {
    badge: 'New: Advanced Keyword Intelligence 2.0',
    headline: 'Know Exactly Which Companies Fit Your ICP',
    subheadline:
      'Exeract overlays ICP match results as you browse Apollo.io, Prospeo, or your CRM. Qualify target companies faster through website data, not AI assumption.',
    primaryCta: 'Get Started',
    secondaryCta: 'See How It Works',
    trustBadges: [
      'No credit card required',
      'GDPR Compliant']

  },
  howItWorks: {
    sectionTitle: 'Our Tools',
    heading: 'Two powerful tools. One unified platform.',
    description:
      'Exeract combines ICP company validation and email verification into a single seamless workflow — so your outreach always hits the right people at the right companies.',
    steps: [
      {
        title: 'ICP Validation',
        description:
          'Overlay ICP match results as you browse Apollo.io, Clay, Prospeo, or your CRM. Qualify target companies instantly through live website data, keyword intelligence, and confidence scoring — not AI guesswork.'
      },
      {
        title: 'Email Verification',
        description:
          'Validate email addresses in bulk before you send. Our engine checks deliverability, detects catch-all domains, and flags risky addresses — giving you clean lists that protect your sender reputation.'
      }]

  },
  features: {
    sectionTitle: 'Why Exeract?',
    heading: 'Built for high-velocity sales teams',
    description:
      'Manual lead verification is slow, error-prone, and expensive. Exeract replaces the grunt work with intelligent automation across both company qualification and email verification.',
    features: [
      {
        title: 'ICP Match at a Glance',
        description:
          'Confidence scores and keyword signals surface inside your existing tools — no tab switching, no guesswork.'
      },
      {
        title: 'Email Deliverability',
        description:
          'Catch invalid, risky, and catch-all emails before sending. Protect your domain reputation and improve reply rates.'
      },
      {
        title: '10x Faster Than Manual',
        description:
          'Process thousands of companies and emails in minutes. Free your SDRs to focus on closing, not researching.'
      },
      {
        title: 'Catch-all Risk Detection',
        description:
          'Identify catch-all domains that silently accept any address — so you only send to addresses that truly exist.'
      },
      {
        title: 'Keyword Intelligence',
        description:
          'Advanced matching understands context and relevance across website content, not just exact keyword matches.'
      },
      {
        title: 'Unified Reporting',
        description:
          'Export ICP scores and email verification results together. One clean dataset, ready for your CRM or sequencer.'
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
        emailCredits: '500 email verification credits',
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
        emailCredits: 'Unlimited email verification credits',
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
        price: '$30',
        period: '/month',
        popular: true,
        creditsTitle: '1,000 Credits / month',
        creditsDesc: '(Approx. 5,000+ company checks)',
        emailCredits: 'Unlimited email verification credits',
        emailCreditsExtra: 'Catch-all risk result',
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
        emailCredits: 'Email verification API',
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
