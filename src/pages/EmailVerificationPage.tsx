import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  ArrowRight, Calendar, Mail, ShieldCheck, Zap, Coins,
  Upload, Search, FileSpreadsheet, CheckCircle2, XCircle,
  AlertTriangle, Lock, ChevronRight, Check, Loader2,
  Download, BarChart3, FileDown
} from 'lucide-react';
import { useCTARedirect } from '../utils/useCTARedirect';

// ─── Demo Data ─────────────────────────────────────────────────────────────────
const DEMO_EMAILS = [
  { email: 'john@acme.com', result: 'valid' },
  { email: 'sarah@outlook.com', result: 'valid' },
  { email: 'mike@domain-test.io', result: 'catch-all' },
  { email: 'contact@bigcorp.co', result: 'catch-all' },
  { email: 'info@notrealdomain.xyz', result: 'invalid' },
  { email: 'bad-format@@example', result: 'invalid' },
];

type ResultType = 'valid' | 'invalid' | 'catch-all';
type StepNum = 1 | 2 | 3;

// ─── Result Badge ─────────────────────────────────────────────────────────────
function ResultBadge({ result, locked = false }: { result: ResultType; locked?: boolean }) {
  if (locked) {
    return (
      <span className="text-[10px] sm:text-xs bg-gray-100 border border-gray-200 text-gray-400 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
        <Lock className="h-3 w-3" /> PRO
      </span>
    );
  }
  if (result === 'valid') {
    return (
      <span className="text-[10px] sm:text-xs bg-green-50 border border-green-200 text-green-700 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
        <CheckCircle2 className="h-3.5 w-3.5" /> VALID
      </span>
    );
  }
  if (result === 'invalid') {
    return (
      <span className="text-[10px] sm:text-xs bg-red-50 border border-red-200 text-red-600 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
        <XCircle className="h-3.5 w-3.5" /> INVALID
      </span>
    );
  }
  // catch-all
  return (
    <span className="text-[10px] sm:text-xs bg-amber-50 border border-amber-200 text-amber-700 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
      <AlertTriangle className="h-3.5 w-3.5" /> CATCH-ALL
    </span>
  );
}

// ─── Workflow Demo ─────────────────────────────────────────────────────────────
function EmailVerificationDemo() {
  const [activeStep, setActiveStep] = useState<StepNum>(1);
  const [inputMode, setInputMode] = useState<'single' | 'list'>('single');
  const [singleEmail, setSingleEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [done, setDone] = useState(false);
  const [showPaidTooltip, setShowPaidTooltip] = useState(false);

  const steps = [
    { id: 1, label: 'Add Emails', icon: Upload, color: 'text-primary' },
    { id: 2, label: 'Verification', icon: Zap, color: 'text-amber-500' },
    { id: 3, label: 'Results', icon: CheckCircle2, color: 'text-green-500' },
  ];

  const runVerification = () => {
    setActiveStep(2);
    setIsProcessing(true);
    setProcessingStep(0);
    setDone(false);
    const emails = inputMode === 'single' ? [DEMO_EMAILS[0]] : DEMO_EMAILS;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProcessingStep(step);
      if (step >= emails.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          setDone(true);
          setActiveStep(3);
        }, 500);
      }
    }, 450);
  };

  const displayEmails = inputMode === 'single' ? [DEMO_EMAILS[0]] : DEMO_EMAILS;

  const stats = {
    total: displayEmails.length,
    valid: displayEmails.filter(e => e.result === 'valid').length,
    invalid: displayEmails.filter(e => e.result === 'invalid').length,
    catchAll: displayEmails.filter(e => e.result === 'catch-all').length,
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-lg">
      {/* Step Progress Bar */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-1 sm:gap-2">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = activeStep === s.id;
            const isComplete = activeStep > s.id;
            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => { if (s.id <= activeStep) setActiveStep(s.id as StepNum); }}
                  className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap
                    ${isActive ? 'bg-navy text-white' : isComplete ? 'bg-gray-100 text-gray-500' : 'text-gray-400 cursor-not-allowed'}`}
                >
                  {isComplete
                    ? <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                    : <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? 'text-white' : s.color}`} />}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <ChevronRight className={`h-4 w-4 flex-shrink-0 ${activeStep > s.id ? 'text-gray-400' : 'text-gray-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 sm:p-8 min-h-[360px]">
        <AnimatePresence mode="wait">

          {/* ── Step 1: Add Emails ── */}
          {activeStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-5">Step 1 · Choose how to add emails</p>

              {/* Mode Toggle */}
              <div className="flex gap-2 mb-6">
                <button onClick={() => setInputMode('single')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${inputMode === 'single' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                  <Search className="h-4 w-4" /> Single Email
                </button>
                <button onClick={() => setInputMode('list')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${inputMode === 'list' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                  <FileSpreadsheet className="h-4 w-4" /> Email List
                </button>
              </div>

              {inputMode === 'single' ? (
                <div>
                  <div className="relative mb-2">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="john@acme.com"
                      value={singleEmail}
                      onChange={e => setSingleEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-navy placeholder-gray-400"
                    />
                  </div>
                  <p className="text-xs text-gray-400">Verify a single email address against our validation engine</p>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-semibold text-navy text-sm mb-1">Drop your CSV or XLSX file here</p>
                  <p className="text-xs text-gray-400 mb-4">One email per row · Up to 100,000 emails per run</p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {['john@acme.com', 'sarah@outlook.com', 'mike@domain.io'].map(e => (
                      <span key={e} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-mono">{e}</span>
                    ))}
                    <span className="text-xs text-gray-400 px-2 py-1">+99,997 more</span>
                  </div>
                </div>
              )}

              <button
                onClick={runVerification}
                className="mt-6 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                Run Verification <Zap className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* ── Step 2: Processing ── */}
          {activeStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-5">Step 2 · Verifying email addresses…</p>
              <div className="space-y-2.5">
                {displayEmails.map((item, idx) => {
                  const scanned = processingStep > idx;
                  const scanning = processingStep === idx;
                  return (
                    <motion.div
                      key={item.email}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50"
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 ${scanned
                          ? item.result === 'valid' ? 'bg-green-500' : item.result === 'catch-all' ? 'bg-amber-400' : 'bg-red-400'
                          : scanning ? 'bg-amber-400 animate-pulse' : 'bg-gray-200'
                        }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-mono text-navy truncate">{item.email}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {scanning && <span className="text-xs text-amber-600 font-medium animate-pulse">Checking…</span>}
                        {scanned && <ResultBadge result={item.result as ResultType} />}
                        {!scanned && !scanning && <span className="text-xs text-gray-300">Pending</span>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              {done && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100 text-center">
                  <p className="text-sm font-semibold text-green-700">✓ Verification complete , moving to results</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── Step 3: Results ── */}
          {activeStep === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-5">Step 3 · Your verified results are ready</p>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Total', value: stats.total, icon: BarChart3, color: 'text-secondary' },
                  { label: 'Valid', value: stats.valid, icon: CheckCircle2, color: 'text-green-600' },
                  { label: 'Invalid', value: stats.invalid, icon: XCircle, color: 'text-red-500' },
                  { label: 'Catch-All', value: stats.catchAll, icon: AlertTriangle, color: 'text-amber-500' },
                ].map(stat => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center border border-gray-100">
                      <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color} mx-auto mb-1.5`} />
                      <p className="text-xl sm:text-2xl font-bold text-navy">{stat.value}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{stat.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Results list */}
              <div className="border border-gray-100 rounded-xl overflow-hidden mb-6">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="text-xs text-gray-400 ml-2 font-mono">verified_emails.csv</span>
                </div>
                <div className="p-4 space-y-2">
                  {displayEmails.map(item => (
                    <div key={item.email} className="flex items-center justify-between text-sm p-2.5 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.result === 'valid' ? 'bg-green-500' : item.result === 'catch-all' ? 'bg-amber-400' : 'bg-red-400'
                          }`} />
                        <span className="font-mono text-xs text-navy truncate">{item.email}</span>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        {/* Show "PRO" lock for catch-all details on free tier */}
                        {item.result === 'catch-all' ? (
                          <div className="flex items-center gap-1.5">
                            <ResultBadge result="catch-all" />
                            <span
                              className="relative text-[10px] sm:text-xs bg-gray-100 border border-gray-200 text-gray-400 font-bold px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer group"
                              onMouseEnter={() => setShowPaidTooltip(true)}
                              onMouseLeave={() => setShowPaidTooltip(false)}
                            >
                              <Lock className="h-3 w-3" /> Risk Level
                            </span>
                          </div>
                        ) : (
                          <ResultBadge result={item.result as ResultType} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paid-tier callout */}
              <AnimatePresence>
                {(showPaidTooltip || stats.catchAll > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="mb-4 p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 items-start"
                  >
                    <Lock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-amber-800">Catch-All Risk Analysis is a Pro feature</p>
                      <p className="text-xs text-amber-600 mt-0.5">
                        Upgrade to Pro to see whether catch-all addresses are <strong>High Risk</strong> or <strong>Low Risk</strong> , so you know exactly which ones are safe to send to.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-3 flex-wrap">
                <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all">
                  <Download className="h-4 w-4" /> Download CSV
                </button>
                <button
                  onClick={() => { setActiveStep(1); setDone(false); setProcessingStep(0); setSingleEmail(''); }}
                  className="px-5 py-3 border border-gray-200 text-gray-500 rounded-xl text-sm hover:bg-gray-50 transition-all"
                >
                  Start New Run
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function EmailVerificationPage() {
  const { handleCTAClick, loadingState } = useCTARedirect();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-navy selection:bg-primary/20 selection:text-navy overflow-x-hidden">
      <Navbar />

      <main>
        {/* ── Hero Section ── */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl opacity-50" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
                Stop Sending to<br /><span className="text-primary">Emails That Bounce</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Validate single emails or bulk lists instantly. Get clean, deliverable contacts with detailed results , Valid, Invalid, and Catch-All risk ratings.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/product-access?redirect=https://app.exeract.com/signup"
                  onClick={(e) => handleCTAClick(e, "https://app.exeract.com/signup", "email-hero-signup")}
                  className="w-full sm:w-auto"
                >
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center">
                    {loadingState === "email-hero-signup" ? (
                      <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Loading...</>
                    ) : (
                      <>Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></>
                    )}
                  </button>
                </a>
                <a href="https://calendly.com/aravindhan-tritern/30min" className="w-full sm:w-auto" target="_blank" rel="noopener noreferrer">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-navy border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2">
                    <Calendar className="h-5 w-5 text-secondary" /> Book a Demo
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Workflow Section ── */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F0F4FF] via-white to-[#FFFBF0]" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-100/30 blur-[100px] pointer-events-none -z-10" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
                Exeract Email Verification Workflow
              </h2>
            </motion.div>

            {/* Step overview cards */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { icon: Upload, label: 'Add your emails', desc: 'Single or bulk CSV/XLSX', color: 'bg-primary/10', iconColor: 'text-primary' },
                { icon: Zap, label: 'Auto verification', desc: 'Syntax, domain & SMTP checks', color: 'bg-amber-50', iconColor: 'text-amber-500' },
                { icon: FileDown, label: 'Export results', desc: 'Clean, CRM-ready in one click', color: 'bg-green-50', iconColor: 'text-green-600' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-white rounded-2xl p-5 border border-gray-100 text-center"
                  >
                    <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <Icon className={`h-5 w-5 ${item.iconColor}`} />
                    </div>
                    <p className="text-sm font-bold text-navy">{item.label}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <EmailVerificationDemo />
            </motion.div>
          </div>
        </section>

        {/* ── Result Types Explainer ── */}
        <section className="py-16 sm:py-20 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">Understanding Your Results</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Every email in your list gets a precise label. Here's what each one means.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: CheckCircle2,
                  badge: 'VALID',
                  badgeClass: 'bg-green-50 border-green-200 text-green-700',
                  dot: 'bg-green-500',
                  title: 'Valid',
                  desc: 'The email passes syntax checks, has a valid and reachable domain, and the mailbox exists. Safe to send.',
                  plan: null,
                },
                {
                  icon: XCircle,
                  badge: 'INVALID',
                  badgeClass: 'bg-red-50 border-red-200 text-red-600',
                  dot: 'bg-red-400',
                  title: 'Invalid',
                  desc: "The email is malformed, the domain doesn't exist, or the mailbox was rejected by the mail server. Do not send.",
                  plan: null,
                },
                {
                  icon: AlertTriangle,
                  badge: 'CATCH-ALL',
                  badgeClass: 'bg-amber-50 border-amber-200 text-amber-700',
                  dot: 'bg-amber-400',
                  title: 'Catch-All (Risky)',
                  desc: 'The domain accepts all emails regardless of whether the mailbox exists. We cannot confirm delivery. Use with caution.',
                  plan: 'Pro users get a deeper risk score , High Risk vs. Low Risk , for each catch-all address.',
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-2 h-2 rounded-full ${item.dot}`} />
                      <span className={`text-xs font-bold border px-2.5 py-1 rounded-full ${item.badgeClass}`}>{item.badge}</span>
                    </div>
                    <h3 className="font-bold text-navy text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.desc}</p>
                    {item.plan && (
                      <div className="flex items-start gap-2 bg-amber-50/80 border border-amber-100 rounded-xl p-3">
                        <Lock className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700 font-medium">{item.plan}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Why it Works ── */}
        <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
          <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6">Why Email Verification Matters</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                High bounce rates damage your sender reputation, get your domain flagged, and reduce deliverability for your entire email program. Verify before you send.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, color: 'bg-green-50 text-green-600', title: 'Protect Your Domain', desc: 'Eliminate bounces before they happen and maintain a pristine sender reputation that keeps your emails out of spam.' },
                { icon: Zap, color: 'bg-blue-50 text-secondary', title: 'Bulk Verification', desc: 'Upload lists of up to 100,000 emails. Exeract processes them in minutes, not hours.' },
                { icon: Coins, color: 'bg-amber-50 text-amber-600', title: 'Smarter Outreach', desc: "Only contact people who can actually receive your emails. Every send counts , don't waste it on dead addresses." },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center sm:text-left">
                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto sm:mx-0 mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-bold text-navy mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4 sm:mb-6 leading-tight">
                Clean Your List,{' '}<span className="text-primary">Boost Deliverability</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                Join growth teams that verify their emails with Exeract before every campaign.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/product-access?redirect=https://app.exeract.com/signup"
                  onClick={(e) => handleCTAClick(e, "https://app.exeract.com/signup", "email-bottom-signup")}
                >
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-base sm:text-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center">
                    {loadingState === "email-bottom-signup" ? (
                      <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Loading...</>
                    ) : (
                      <>Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></>
                    )}
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
