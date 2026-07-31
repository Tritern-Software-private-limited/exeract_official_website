import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  Chrome, Zap, Target, ArrowRight, CheckCircle2,
  Filter, Send, BarChart3, Globe, Users, Shield, ExternalLink, Check,
  SlidersHorizontal, Building2, MonitorPlay, Loader2, Database
} from 'lucide-react';
import { useCTARedirect } from '../utils/useCTARedirect';

// ─── Floating Workflow Cards (Zig.ai Style) ──────────────────────────────────
function FloatingWorkflowCards() {
  const cards = [
    { time: '09:01 AM', title: 'Dataset pushed', subtitle: '30 companies from Apollo', icon: Database, color: 'text-blue-500', bg: 'bg-blue-100', delay: 0 },
    { time: '09:02 AM', title: 'ICP validating', subtitle: 'Analyzing website data...', icon: Shield, color: 'text-violet-500', bg: 'bg-violet-100', delay: 0.2 },
    { time: '09:23 AM', title: 'Results ready', subtitle: '12 high-fit accounts found', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-100', delay: 0.4 },
  ];

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Abstract concentric circles representing the 'grid' */}
      <div className="absolute top-1/2 right-[-20%] transform -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20">
        <div className="absolute inset-0 border border-gray-400 rounded-full scale-[0.3]" />
        <div className="absolute inset-0 border border-gray-400 rounded-full scale-[0.5]" />
        <div className="absolute inset-0 border border-gray-400 rounded-full scale-[0.7]" />
        <div className="absolute inset-0 border border-gray-400 rounded-full scale-[0.9]" />
        <div className="absolute inset-0 border border-gray-400 rounded-full scale-[1.1]" />
      </div>

      <div className="relative z-10 space-y-6 w-full max-w-sm">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: c.delay, type: 'spring', stiffness: 100 }}
            className={`bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-5 flex items-center gap-4 relative
              ${i === 1 ? 'ml-12' : i === 2 ? 'ml-24' : ''}`}
            style={{ boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)' }}
          >
            {/* Connection line dot */}
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
            </div>

            <div className={`w-12 h-12 rounded-2xl ${c.bg} flex flex-shrink-0 items-center justify-center`}>
              <c.icon className={`w-6 h-6 ${c.color}`} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold text-gray-400 mb-0.5">{c.time}</div>
              <div className="text-sm font-bold text-navy">{c.title}</div>
              <div className="text-xs text-gray-500">{c.subtitle}</div>
            </div>
            <div className="w-6 h-6 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── How It Works Steps ────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    step: '01',
    icon: Globe,
    title: 'Go to Apollo.io or Prospeo',
    description: 'Navigate to your preferred prospecting platform. The Exeract extension runs in the background and automatically adds action buttons to the UI.',
    color: 'from-blue-500 to-secondary',
    details: ['Works natively on Apollo.io and Prospeo', 'No manual setup required', 'Buttons appear automatically next to leads'],
  },
  {
    step: '02',
    icon: SlidersHorizontal,
    title: 'Apply Your Target Filters',
    description: 'Use the platform\'s built-in filters to narrow down companies by industry, size, geography, or any other criteria to build your target list.',
    color: 'from-violet-500 to-primary',
    details: ['Use the platform filters you already know', 'Filter by industry, company size, region', 'Curate the exact dataset you want to qualify'],
  },
  {
    step: '03',
    icon: Send,
    title: 'Push Data to Exeract',
    description: 'Click the Exeract button next to a single company, or use the "Push Page" button at the bottom left to send all companies on the page at once.',
    color: 'from-primary to-emerald-500',
    details: ['Push individual companies', 'Bulk-push an entire page of leads', 'Instant data transfer to Exeract'],
  },
  {
    step: '04',
    icon: BarChart3,
    title: 'Review Results in Dashboard',
    description: 'The pushed data appears instantly in your Exeract web app, where it undergoes deep ICP validation and scoring against your specific criteria.',
    color: 'from-emerald-500 to-teal-500',
    details: ['Deep ICP qualification in the web app', 'Clear Yes / Consider / No classification', 'No cluttered overlay on your prospecting tool'],
  },
];

// ─── Feature Cards ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Database,
    title: 'Seamless UI Integration',
    description: 'Exeract adds intuitive "Push" buttons directly into the Apollo.io and Prospeo interfaces next to every company.',
  },
  {
    icon: Shield,
    title: 'Bulk Page Push',
    description: 'Don\'t want to click one by one? Push all companies on your current page to Exeract with a single click at the bottom left.',
  },
  {
    icon: Target,
    title: 'Dedicated Dashboard',
    description: 'Keep your prospecting tool clean. We don\'t clutter Apollo with heavy overlays; all your rich ICP validation results live in the Exeract web app.',
  },
  {
    icon: Zap,
    title: 'Instant Sync',
    description: 'Pushed companies are instantly synced to your Exeract dashboard, ready for deep ICP qualification against your custom criteria.',
  },
  {
    icon: Building2,
    title: 'Company-Level Focus',
    description: 'The extension focuses on pushing company profiles to Exeract, where they are analysed using live website data and keyword context.',
  },
  {
    icon: Users,
    title: 'Built for SDR Teams',
    description: 'Designed around the real workflow of outbound sales reps who source in Apollo but need dedicated, deep ICP qualification outside of it.',
  },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function ChromeExtensionPage() {
  const { handleCTAClick, loadingState } = useCTARedirect();
  const [activeHowStep, setActiveHowStep] = useState(0);

  // ─── Page meta tags ──────────────────────────────────────────────────────────
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Chrome Extension for Apollo & Prospeo | Push Leads to Exeract in One Click';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') ?? '';
    metaDesc?.setAttribute(
      'content',
      'The Exeract Chrome extension adds one-click push buttons inside Apollo.io and Prospeo. Send individual companies or full pages of leads straight to your Exeract dashboard for ICP qualification — no tab switching required.'
    );

    return () => {
      document.title = prevTitle;
      metaDesc?.setAttribute('content', prevDesc);
    };
  }, []);
  // Scroll spy for how-it-works steps based on scroll track
  useEffect(() => {
    const handleScroll = () => {
      const track = document.getElementById('how-it-works-scroll-track');
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollableDistance = rect.height - windowHeight;
      const scrolled = -rect.top;

      if (scrolled >= 0 && scrolled <= scrollableDistance && scrollableDistance > 0) {
        const progress = scrolled / scrollableDistance;
        const stepIndex = Math.min(
          Math.floor(progress * HOW_IT_WORKS.length),
          HOW_IT_WORKS.length - 1
        );
        setActiveHowStep(stepIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStepClick = (i: number) => {
    setActiveHowStep(i);
    // Smooth scroll to the corresponding portion of the track
    const track = document.getElementById('how-it-works-scroll-track');
    if (track) {
      const windowHeight = window.innerHeight;
      const scrollableDistance = track.offsetHeight - windowHeight;
      const targetScroll = window.scrollY + track.getBoundingClientRect().top + (i / HOW_IT_WORKS.length) * scrollableDistance;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ─── Hero Section ─────────────────────────────────────────────────────── */}
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24 relative overflow-hidden bg-[#fafcff]">
        {/* Soft central glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>



              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-navy leading-[1.1] mb-6 tracking-tight">
                One click push.
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Your prospects, in Exeract.
                </span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg font-medium">
                Your own team of AI assistants living right inside your prospecting tools. Push individual companies or entire pages straight to your dashboard for deep ICP validation.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="https://chromewebstore.google.com/detail/iabngnejbcoheejmakfdegaamjlcobok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                  id="ext-hero-install-cta"
                >
                  <Chrome className="w-5 h-5" />
                  Add to Chrome - Free
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
                <a
                  href="/product-access?redirect=https://app.exeract.com/signup"
                  onClick={(e) => handleCTAClick(e, 'https://app.exeract.com/signup', 'ext-hero-signup')}
                  className="flex items-center gap-2 bg-transparent border-2 border-primary/20 text-primary font-bold px-8 py-4 rounded-full hover:bg-primary/5 transition-colors"
                  id="ext-hero-signup-cta"
                >
                  {loadingState === 'ext-hero-signup' ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</> : <>Book a demo for a Team</>}
                </a>
              </div>
            </motion.div>

            {/* Right: Floating Workflow Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <FloatingWorkflowCards />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Platform Badges ───────────────────────────────────────────────────── */}
      <section className="py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-widest">Works natively on</span>
            {[
              { name: 'Apollo.io', color: '#5C4EFA' },
              { name: 'Prospeo', color: '#00D4AA' },
            ].map(p => (
              <div key={p.name} className="flex items-center gap-2 text-lg font-bold" style={{ color: p.color }}>
                <Globe className="w-5 h-5" /> {p.name}
              </div>
            ))}
            <span className="text-xs text-gray-300 font-medium">More platforms coming soon</span>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────────────────── */}
      <section className="relative" id="how-it-works-scroll-track" style={{ height: `${HOW_IT_WORKS.length * 100}vh` }}>
        <div className="sticky top-0 w-full min-h-screen flex flex-col justify-center py-20 bg-white">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">How It Works</span>
              <h2 className="text-3xl lg:text-4xl font-black text-navy mb-4">Push Company list to Exeract in seconds</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Keep your prospecting tool clean. Push your target companies directly to the Exeract dashboard for ICP qualification.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Steps list */}
            <div className="space-y-3">
              {HOW_IT_WORKS.map((s, i) => {
                const Icon = s.icon;
                const isActive = activeHowStep === i;
                return (
                  <button
                    key={s.step}
                    onClick={() => handleStepClick(i)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group
                      ${isActive ? 'border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5 shadow-md' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-300">STEP {s.step}</span>
                        </div>
                        <h3 className={`text-base font-bold transition-colors mb-1 ${isActive ? 'text-primary' : 'text-navy group-hover:text-primary'}`}>{s.title}</h3>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Visual panel */}
            <div>
              <AnimatePresence mode="wait">
                {HOW_IT_WORKS.map((s, i) => {
                  if (i !== activeHowStep) return null;
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.step}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35 }}
                      className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 shadow-xl"
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-2">Step {s.step}</div>
                      <h3 className="text-2xl font-black text-navy mb-3">{s.title}</h3>
                      <p className="text-gray-500 leading-relaxed mb-6">{s.description}</p>
                      <div className="space-y-3 border-t border-gray-100 pt-5">
                        {s.details.map(d => (
                          <div key={d} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-sm text-gray-600">{d}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ─── Features Grid ────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-3 block">What You Get</span>
            <h2 className="text-3xl lg:text-4xl font-black text-navy mb-4">A bridge to powerful qualification</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Easily transfer companies from your sourcing tools to Exeract for deep, rigorous ICP validation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                    <Icon className="w-5 h-5 text-navy" />
                  </div>
                  <h3 className="text-base font-bold text-navy mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Extension vs Web App Explainer ──────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-navy mb-4">Extension vs Web App</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              The Chrome extension is a bridge to get data into Exeract quickly. The Web App is where the heavy lifting happens.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Chrome,
                label: 'Chrome Extension',
                badge: 'You are here',
                badgeCls: 'bg-primary/10 text-primary',
                color: 'border-primary/30',
                headerBg: 'from-primary/5 to-secondary/5',
                items: [
                  'Adds buttons to Apollo.io & Prospeo',
                  'Push single companies',
                  'Push entire pages of companies',
                  'Sends data instantly to Exeract',
                  'Free to install',
                ],
              },
              {
                icon: MonitorPlay,
                label: 'Exeract Web App',
                badge: 'Full platform',
                badgeCls: 'bg-secondary/10 text-secondary',
                color: 'border-secondary/30',
                headerBg: 'from-secondary/5 to-primary/5',
                items: [
                  'Deep ICP qualification',
                  'Review scores and keyword signals',
                  'Email verification',
                  'Catch-all risk detection',
                  'Downloadable reports',
                ],
              },
            ].map(card => {
              const Icon = card.icon;
              return (
                <div key={card.label} className={`rounded-2xl border ${card.color} overflow-hidden`}>
                  <div className={`bg-gradient-to-r ${card.headerBg} p-5 flex items-center justify-between border-b ${card.color}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Icon className="w-5 h-5 text-navy" />
                      </div>
                      <span className="font-bold text-navy">{card.label}</span>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${card.badgeCls}`}>{card.badge}</span>
                  </div>
                  <div className="p-5 space-y-2.5">
                    {card.items.map(item => (
                      <div key={item} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ──────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-navy via-navy-light to-[#0a2a5e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 30% 60%, #00D4AA 0%, transparent 50%), radial-gradient(circle at 70% 30%, #0099FF 0%, transparent 40%)'
        }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Chrome className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
              Push leads to Exeract with{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">one click</span>
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
              Install the free extension, apply your filters, and push companies directly to your dashboard for deep ICP validation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://chromewebstore.google.com/detail/iabngnejbcoheejmakfdegaamjlcobok"
                target="_blank"
                rel="noopener noreferrer"
                id="ext-cta-install"
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity shadow-xl shadow-primary/20"
              >
                <Chrome className="w-5 h-5" />
                Add to Chrome - It's Free
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
              <a
                href="/product-access?redirect=https://app.exeract.com/signup"
                onClick={(e) => handleCTAClick(e, 'https://app.exeract.com/signup', 'ext-cta-signup')}
                className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors"
                id="ext-cta-signup"
              >
                {loadingState === 'ext-cta-signup' ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</> : <>Sign Up Free <ArrowRight className="w-4 h-4" /></>}
              </a>
            </div>
            <p className="mt-6 text-sm text-white/30">Company ICP qualification, driven by your existing tools.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
