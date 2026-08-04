import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

const DEFAULT_OG_IMAGE = 'https://exeract.com/outbound-tech-stack-hero.png';

const ROUTES = [
  {
    path: '/',
    title: 'Qualify ICP Fit & Verify Emails for Outbound | Exeract',
    description: "Set your exact ICP criteria and let Exeract check every company's fit in real time, plus catch-all email verification. Built for outbound teams.",
    canonical: 'https://exeract.com/',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    keywords: 'ICP qualification, catch-all email verification, outbound sales, lead validation, B2B prospecting, cold email',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Exeract',
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'Web, Chrome Extension',
      'description': "Set your exact ICP criteria and let Exeract check every company's fit in real time, plus catch-all email verification.",
      'url': 'https://exeract.com/',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    }
  },
  {
    path: '/chrome-extension',
    title: 'Chrome Extension for Apollo & Prospeo | Push Leads to Exeract in One Click',
    description: 'The Exeract Chrome extension adds one-click push buttons inside Apollo.io and Prospeo. Send individual companies or full pages of leads straight to your Exeract dashboard for ICP qualification — no tab switching required.',
    canonical: 'https://exeract.com/chrome-extension',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    keywords: 'Apollo Chrome extension, Prospeo Chrome extension, ICP qualification extension, push leads to Exeract, outbound automation',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Exeract Chrome Extension for Apollo & Prospeo',
      'applicationCategory': 'BrowserExtension',
      'operatingSystem': 'Chrome, Chromium browsers',
      'description': 'Adds one-click push buttons inside Apollo.io and Prospeo to send leads to Exeract for deep ICP qualification.',
      'url': 'https://exeract.com/chrome-extension'
    }
  },
  {
    path: '/icp-qualification',
    title: 'ICP Qualification Tool | Match Companies to Your Criteria | Exeract',
    description: 'Set the exact keywords and business models that define your ICP. Exeract checks every company website live and returns Yes, Consider, or No.',
    canonical: 'https://exeract.com/icp-qualification',
    ogImage: 'https://exeract.com/exeract-tech-stack.png',
    ogType: 'website',
    keywords: 'ICP qualification tool, ideal customer profile scoring, website qualification, outbound fit scoring'
  },
  {
    path: '/email-verification',
    title: 'Email Verification Tool | Catch Catch-All Risk Before You Send | Exeract',
    description: 'Exeract checks each address for catch-all and invalid risk in real time, keeping your outbound list clean and your deliverability protected.',
    canonical: 'https://exeract.com/email-verification',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    keywords: 'email verification tool, catch-all email checker, bounce prevention, deliverability protection, SMTP validation'
  },
  {
    path: '/pricing',
    title: 'Pricing Plans & Credits | Exeract',
    description: 'Transparent pricing for B2B ICP qualification and catch-all email verification. Simple pay-as-you-go and monthly plans for outbound teams.',
    canonical: 'https://exeract.com/pricing',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    keywords: 'Exeract pricing, ICP qualification cost, email verification pricing, lead scoring plans'
  },
  {
    path: '/outbound-user-guide',
    title: 'Outbound User Guide: Cold Email Setup to LinkedIn | Exeract',
    description: 'A step-by-step guide to cold outreach, covering domain setup, warm-up, send volume, deliverability, data quality, and LinkedIn outreach.',
    canonical: 'https://exeract.com/outbound-user-guide',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    keywords: 'cold email setup, outbound user guide, email deliverability guide, SPF DKIM DMARC, LinkedIn outreach playbook'
  },
  {
    path: '/blog',
    title: 'Outbound Sales & Lead Qualification Blog | Exeract',
    description: 'Practical guides, strategy, and insights on outbound sales, lead qualification, and building lean outbound stacks, from the Exeract team.',
    canonical: 'https://exeract.com/blog',
    ogImage: 'https://exeract.com/exeract-blog-hero-image.png',
    ogType: 'website',
    keywords: 'outbound sales blog, lead qualification strategies, cold email tips, B2B sales automation'
  },
  {
    path: '/blog/outbound-tech-stack-for-founders-and-lean-teams',
    title: 'Outbound Tech Stack for Founders and Lean Teams | Exeract Blog',
    description: 'Founders are wasting too much runway on bloated software stacks. Here is the exact, zero-fluff outbound infrastructure designed for lean teams, covering deliverability, raw data, qualification, and sending.',
    canonical: 'https://exeract.com/blog/outbound-tech-stack-for-founders-and-lean-teams',
    ogImage: 'https://exeract.com/exeract-blog-hero-image.png',
    ogType: 'article',
    keywords: 'outbound tech stack, founder sales stack, lean outbound infrastructure, deliverability, Apollo, Exeract, Smartlead',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': 'Outbound Tech Stack for Founders and Lean Teams',
      'description': 'Founders are wasting too much runway on bloated software stacks. Here is the exact, zero-fluff outbound infrastructure designed for lean teams.',
      'image': 'https://exeract.com/exeract-blog-hero-image.png',
      'author': {
        '@type': 'Organization',
        'name': 'Exeract Team'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Exeract',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://exeract.com/exeract-logo-color.svg'
        }
      },
      'datePublished': '2025-05-19',
      'mainEntityOfPage': 'https://exeract.com/blog/outbound-tech-stack-for-founders-and-lean-teams'
    }
  },
  {
    path: '/blog/how-to-qualify-target-companies-faster-inside-apollo-and-clay',
    title: 'How to Qualify Target Companies Faster Inside Apollo and Clay | Exeract Blog',
    description: 'Building lists in Apollo and Clay is incredibly fast, but qualifying those lists at scale without blowing your budget or getting inaccurate data is where the standard playbook falls apart.',
    canonical: 'https://exeract.com/blog/how-to-qualify-target-companies-faster-inside-apollo-and-clay',
    ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000',
    ogType: 'article',
    keywords: 'Apollo qualification, Clay qualification, company qualification, ICP scoring, account research',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': 'How to Qualify Target Companies Faster Inside Apollo and Clay',
      'description': 'Building lists in Apollo and Clay is incredibly fast, but qualifying those lists at scale without blowing your budget or getting inaccurate data is where the standard playbook falls apart.',
      'image': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000',
      'author': {
        '@type': 'Organization',
        'name': 'Exeract Team'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Exeract',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://exeract.com/exeract-logo-color.svg'
        }
      },
      'datePublished': '2026-06-01',
      'mainEntityOfPage': 'https://exeract.com/blog/how-to-qualify-target-companies-faster-inside-apollo-and-clay'
    }
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | Exeract',
    description: 'Review the official terms of service, legal agreements, and usage conditions for Tritern Software Private Limited and the Exeract platform.',
    canonical: 'https://exeract.com/terms-of-service',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website'
  },
  {
    path: '/terms',
    title: 'Terms of Service | Exeract',
    description: 'Review the official terms of service, legal agreements, and usage conditions for Tritern Software Private Limited and the Exeract platform.',
    canonical: 'https://exeract.com/terms-of-service',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website'
  },
  {
    path: '/product-access',
    title: 'Get Access | Exeract',
    description: 'Connect to the Exeract platform to qualify ICP fit and verify email addresses for your outbound sales campaigns.',
    canonical: 'https://exeract.com/product-access',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website'
  }
];

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function generateHtmlForRoute(route) {
  let html = template;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/is, `<title>${escapeHtml(route.title)}</title>`);

  // Replace Description
  const metaDescPattern = /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i;
  const newMetaDesc = `<meta name="description" content="${escapeHtml(route.description)}" />`;
  if (metaDescPattern.test(html)) {
    html = html.replace(metaDescPattern, newMetaDesc);
  } else {
    html = html.replace('</head>', `    ${newMetaDesc}\n  </head>`);
  }

  // Generate OpenGraph, Twitter, Canonical, and Schema Tags
  const ogImage = route.ogImage || DEFAULT_OG_IMAGE;
  const ogType = route.ogType || 'website';
  const canonical = route.canonical || `https://exeract.com${route.path === '/' ? '' : route.path}`;

  const extraMeta = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:site_name" content="Exeract" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  ];

  if (route.keywords) {
    extraMeta.push(`<meta name="keywords" content="${escapeHtml(route.keywords)}" />`);
  }

  if (route.structuredData) {
    extraMeta.push(`<script type="application/ld+json">${JSON.stringify(route.structuredData, null, 2)}</script>`);
  }

  // Remove existing duplicate og / twitter / canonical tags if present in template
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*\/?>\s*/gi, '');
  html = html.replace(/<meta\s+property=["']og:[^"']*["'][^>]*\/?>\s*/gi, '');
  html = html.replace(/<meta\s+name=["']twitter:[^"']*["'][^>]*\/?>\s*/gi, '');
  html = html.replace(/<meta\s+name=["']keywords["'][^>]*\/?>\s*/gi, '');
  html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>\s*/gi, '');

  const injectedTags = extraMeta.map(tag => `    ${tag}`).join('\n');
  html = html.replace('</head>', `${injectedTags}\n  </head>`);

  return html;
}

console.log('🚀 Starting Static Site Generation (SSG Prerendering)...');

for (const route of ROUTES) {
  const renderedHtml = generateHtmlForRoute(route);

  let targetFilePath;
  if (route.path === '/') {
    targetFilePath = path.join(distDir, 'index.html');
  } else {
    const routeClean = route.path.replace(/^\//, '');
    const routeDir = path.join(distDir, routeClean);
    fs.mkdirSync(routeDir, { recursive: true });
    targetFilePath = path.join(routeDir, 'index.html');
  }

  fs.writeFileSync(targetFilePath, renderedHtml, 'utf-8');
  console.log(` ✅ Prerendered: ${route.path} -> ${path.relative(rootDir, targetFilePath)}`);
}

console.log('🎉 Prerendering complete! All routes generated with dedicated metadata.');
