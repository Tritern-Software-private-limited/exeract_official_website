import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  ArrowRight, Calendar, Target, Download, ShieldCheck, Zap, Coins,
  Upload, Search, FileSpreadsheet, X, Plus, Check, ChevronRight,
  BarChart3, FileDown, CheckCircle2, XCircle, HelpCircle, Loader2
} from 'lucide-react';
import { useCTARedirect } from '../utils/useCTARedirect';

// ─── Interactive Workflow Demo ────────────────────────────────────────────────
const DEMO_KEYWORDS = ['SaaS', 'B2B', 'HR Tech', 'Recruiting', 'ATS'];
const DEMO_COMPANIES = [
  { name: 'Exeract', url: 'exeract.com', status: 'verified' },
  { name: 'Tritern', url: 'tritern.com', status: 'yes' },
  { name: 'Demantri', url: 'demantri.com', status: 'no' },
  { name: 'Globex', url: 'globex.com', status: 'consider' },
];

type Step = 1 | 2 | 3 | 4;

function WorkflowDemo() {
  const [activeStep, setActiveStep] = useState<Step>(1);
  const [uploadMode, setUploadMode] = useState<'bulk' | 'single'>('bulk');
  const [singleUrl, setSingleUrl] = useState('');
  const [keywords, setKeywords] = useState<string[]>(['SaaS', 'B2B']);
  const [kwInput, setKwInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [done, setDone] = useState(false);

  const addKeyword = (kw: string) => {
    const trimmed = kw.trim();
    if (trimmed && !keywords.includes(trimmed) && keywords.length < 5) {
      setKeywords([...keywords, trimmed]);
    }
    setKwInput('');
  };

  const removeKeyword = (kw: string) => setKeywords(keywords.filter(k => k !== kw));

  const runQualification = () => {
    setIsProcessing(true);
    setProcessingStep(0);
    setDone(false);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProcessingStep(step);
      if (step >= DEMO_COMPANIES.length) {
        clearInterval(interval);
        setTimeout(() => { setIsProcessing(false); setDone(true); setActiveStep(4); }, 600);
      }
    }, 420);
  };

  const steps = [
    { id: 1, label: 'Upload List', icon: Upload, color: 'text-primary' },
    { id: 2, label: 'Set ICP Criteria', icon: Target, color: 'text-secondary' },
    { id: 3, label: 'Run Qualification', icon: Zap, color: 'text-yellow-500' },
    { id: 4, label: 'Export Results', icon: FileDown, color: 'text-green-500' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
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
                  onClick={() => { if (s.id < activeStep || s.id === activeStep) setActiveStep(s.id as Step); }}
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
      <div className="p-6 sm:p-8 min-h-[340px]">
        <AnimatePresence mode="wait">

          {/* ── Step 1: Upload ── */}
          {activeStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-5">Step 1 · Upload company list or single website URL</p>
              <div className="flex gap-2 mb-6">
                <button onClick={() => setUploadMode('bulk')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${uploadMode === 'bulk' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                  <span className="flex items-center gap-1.5"><FileSpreadsheet className="h-4 w-4" />Bulk Upload</span>
                </button>
                <button onClick={() => setUploadMode('single')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${uploadMode === 'single' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                  <span className="flex items-center gap-1.5"><Search className="h-4 w-4" />Single URL</span>
                </button>
              </div>

              {uploadMode === 'bulk' ? (
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-semibold text-navy text-sm mb-1">Drop your CSV or XLSX file here</p>
                  <p className="text-xs text-gray-400 mb-4">One company domain per row · Row limit up to 1000 rows</p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {['exeract.com', 'tritern.com', 'demantri.com', 'globex.com'].map(d => (
                      <span key={d} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-mono">{d}</span>
                    ))}
                    <span className="text-xs text-gray-400 px-2 py-1">+900 more</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="https://example.com"
                      value={singleUrl}
                      onChange={e => setSingleUrl(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-navy placeholder-gray-400"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Analyze a single company website against your ICP</p>
                </div>
              )}

              <button
                onClick={() => setActiveStep(2)}
                className="mt-6 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* ── Step 2: Keywords / ICP ── */}
          {activeStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-5">Step 2 · Define your ICP criteria</p>

              <div className="mb-5">
                <label className="text-sm font-semibold text-navy block mb-2">ICP Keywords <span className="text-gray-400 font-normal">(max 5)</span></label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {keywords.map(kw => (
                    <span key={kw} className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-medium">
                      {kw}
                      <button onClick={() => removeKeyword(kw)} className="hover:text-red-500 transition-colors">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                  {keywords.length < 5 && (
                    <div className="flex items-center gap-1 border border-dashed border-gray-300 rounded-lg px-3 py-1.5">
                      <input
                        className="text-sm outline-none w-28 text-navy placeholder-gray-400"
                        placeholder="Add keyword…"
                        value={kwInput}
                        onChange={e => setKwInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') addKeyword(kwInput); }}
                      />
                      <button onClick={() => addKeyword(kwInput)} className="text-primary hover:text-secondary transition-colors">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400">Suggestions:</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {DEMO_KEYWORDS.filter(k => !keywords.includes(k)).map(k => (
                    <button key={k} onClick={() => addKeyword(k)} className="text-xs border border-gray-200 text-gray-500 hover:border-primary hover:text-primary px-2.5 py-1 rounded-md transition-colors">+ {k}</button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Qualification Logic</p>
                <p className="text-xs text-gray-500">A company is <span className="text-green-600 font-semibold">YES / VERIFIED</span> if its website strongly matches your keywords. It is marked <span className="text-orange-500 font-semibold">CONSIDER</span> for partial matches, and <span className="text-red-500 font-semibold">NO</span> if none match.</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setActiveStep(1)} className="px-4 py-3 border border-gray-200 text-gray-500 rounded-xl text-sm hover:bg-gray-50 transition-all">Back</button>
                <button
                  onClick={() => { setActiveStep(3); runQualification(); }}
                  className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  Run Qualification <Zap className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Processing ── */}
          {activeStep === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <p className="text-xs font-semibold text-yellow-600 uppercase tracking-widest mb-5">Step 3 · Scanning company websites…</p>
              <div className="space-y-2.5">
                {DEMO_COMPANIES.map((co, idx) => {
                  const scanned = processingStep > idx;
                  const scanning = processingStep === idx;
                  return (
                    <motion.div
                      key={co.url}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50"
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 ${scanned ? (co.status === 'yes' || co.status === 'verified' ? 'bg-green-500' : co.status === 'consider' ? 'bg-orange-400' : 'bg-red-400') : scanning ? 'bg-yellow-400 animate-pulse' : 'bg-gray-200'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-navy truncate">{co.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{co.url}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {scanning && <span className="text-xs text-yellow-600 font-medium animate-pulse">Scanning…</span>}
                        {scanned && co.status === 'yes' && (
                          <span className="text-[10px] sm:text-xs bg-green-50 border border-green-200 text-green-700 font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> YES
                          </span>
                        )}
                        {scanned && co.status === 'verified' && (
                          <span className="text-[10px] sm:text-xs bg-green-50 border border-green-200 text-green-700 font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> VERIFIED
                          </span>
                        )}
                        {scanned && co.status === 'consider' && (
                          <span className="text-[10px] sm:text-xs bg-orange-50 border border-orange-200 text-orange-600 font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <HelpCircle className="h-3.5 w-3.5" /> CONSIDER
                          </span>
                        )}
                        {scanned && co.status === 'no' && (
                          <span className="text-[10px] sm:text-xs bg-red-50 border border-red-200 text-red-600 font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <XCircle className="h-3.5 w-3.5" /> NO
                          </span>
                        )}
                        {!scanned && !scanning && <span className="text-xs text-gray-300">Pending</span>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              {done && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100 text-center">
                  <p className="text-sm font-semibold text-green-700">✓ Qualification complete - moving to export</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── Step 4: Export ── */}
          {activeStep === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-5">Step 4 · Your qualified list is ready</p>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Total', value: DEMO_COMPANIES.length.toString(), icon: BarChart3, color: 'text-secondary' },
                  { label: 'Yes/Verified', value: DEMO_COMPANIES.filter(c => c.status === 'yes' || c.status === 'verified').length.toString(), icon: CheckCircle2, color: 'text-green-600' },
                  { label: 'Consider', value: DEMO_COMPANIES.filter(c => c.status === 'consider').length.toString(), icon: HelpCircle, color: 'text-orange-500' },
                  { label: 'No', value: DEMO_COMPANIES.filter(c => c.status === 'no').length.toString(), icon: XCircle, color: 'text-red-500' },
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

              {/* Qualified list preview */}
              <div className="border border-gray-100 rounded-xl overflow-hidden mb-6">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="text-xs text-gray-400 ml-2 font-mono">qualified_list.csv</span>
                </div>
                <div className="p-4 space-y-2">
                  {DEMO_COMPANIES.filter(c => c.status !== 'no').map(co => (
                    <div key={co.url} className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${co.status === 'consider' ? 'bg-orange-400' : 'bg-green-500'}`} />
                        <span className="font-medium text-navy">{co.name}</span>
                        <span className="text-gray-400 font-mono text-xs hidden sm:inline">{co.url}</span>
                      </div>
                      <div>
                        {co.status === 'yes' && (
                          <span className="text-[10px] sm:text-xs bg-green-50 border border-green-200 text-green-700 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> YES
                          </span>
                        )}
                        {co.status === 'verified' && (
                          <span className="text-[10px] sm:text-xs bg-green-50 border border-green-200 text-green-700 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> VERIFIED
                          </span>
                        )}
                        {co.status === 'consider' && (
                          <span className="text-[10px] sm:text-xs bg-orange-50 border border-orange-200 text-orange-600 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <HelpCircle className="h-3 w-3" /> CONSIDER
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all">
                  <Download className="h-4 w-4" /> Download CSV
                </button>
                <button onClick={() => { setActiveStep(1); setDone(false); setProcessingStep(0); }} className="px-5 py-3 border border-gray-200 text-gray-500 rounded-xl text-sm hover:bg-gray-50 transition-all">
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export function HowItWorksPage() {
  const { handleCTAClick, loadingState } = useCTARedirect();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-navy selection:bg-primary/20 selection:text-navy overflow-x-hidden">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl opacity-50" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
                Qualify Company Lists by ICP in Minutes
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Automate your ABM qualification workflow and get perfectly matched company lists in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/product-access?redirect=https://app.exeract.com/signup" 
                  onClick={(e) => handleCTAClick(e, "https://app.exeract.com/signup", "how-it-works-hero-signup")}
                  className="w-full sm:w-auto"
                >
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center">
                    {loadingState === "how-it-works-hero-signup" ? (
                      <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Loading...</>
                    ) : (
                      <>Start for free <ArrowRight className="ml-2 h-5 w-5" /></>
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

        {/* ── ICP Qualification Workflow ── */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F0F4FF] via-white to-[#F0FDF9]" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none -z-10" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
                Exeract ICP Qualification Workflow
              </h2>

            </motion.div>

            {/* Step overview cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Upload, label: 'Upload your list', desc: 'CSV, XLSX, or single URL', color: 'bg-primary/10', iconColor: 'text-primary' },
                { icon: Target, label: 'Define your ICP', desc: 'Keywords & qualification rules', color: 'bg-secondary/10', iconColor: 'text-secondary' },
                { icon: Zap, label: 'Auto-qualification', desc: 'Structured site scanning', color: 'bg-yellow-50', iconColor: 'text-yellow-500' },
                { icon: FileDown, label: 'Export clean list', desc: 'CRM-ready in one click', color: 'bg-green-50', iconColor: 'text-green-600' },
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

            {/* Interactive demo */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <WorkflowDemo />
            </motion.div>
          </div>
        </section>

        {/* ── Summary Cards ── */}
        <section className="py-16 sm:py-20 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">Define Your True ICP</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Stop relying on basic firmographics. Upload a bulk CSV/XLSX list of company domains - or enter a single website URL. Then input your specific, nuanced criteria: the exact keywords, services, or business models that make a company qualified or unqualified for your campaign.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100"
              >
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Download className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">Export Clean, Verified Lists</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Download your fully enriched and qualified list. Your data is instantly ready for your outbound team or CRM with zero manual review required.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why It Works Section */}
        <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
          <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6">Why It Works</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Most AI agents assume, infer, or hallucinate. That's fine for general tasks, but when data experts, ABM teams, and SDRs are making pipeline decisions, a single wrong assumption costs real money.
              </p>
            </motion.div>

            <div className="bg-[#F8FAFF] rounded-3xl p-8 sm:p-12 mb-16 border border-gray-100">
              <h3 className="text-2xl font-bold text-navy mb-6">Save your Clay Credit</h3>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>Clay and Apollo are powerful tools, but running company qualification through them at scale will drain your credits fast. Those platforms charge per action, and qualification is one of the heaviest workloads you can throw at them. Save those credits for what they were built for.</p>
                <p>Exeract is built strictly for this job. It runs on structured execution protocols, extracting only what's actually on the page and never filling in what isn't. No assumptions, no hallucinations, no credit anxiety. Just a system that works exactly like a thousand data analysts running strictly by your rulebook, around the clock.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, color: 'bg-red-50 text-red-500', title: 'Zero hallucinations', desc: 'Strict guardrails keep every qualification decision anchored to real website data. No assumptions, no fill-ins.' },
                { icon: Zap, color: 'bg-blue-50 text-secondary', title: 'Infinite scale', desc: 'Process thousands of URLs in the time it takes a human to check ten.' },
                { icon: Coins, color: 'bg-green-50 text-green-600', title: 'No credit anxiety', desc: 'Qualify massive lists without watching a credit counter drain with every row.' },
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

        {/* Final CTA Section */}
        <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4 sm:mb-6 leading-tight">
                Ready to Verify Leads{' '}<span className="text-primary">10x Faster?</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                Join the data experts and growth teams optimizing their outbound verification with Exeract.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/product-access?redirect=https://app.exeract.com/signup"
                  onClick={(e) => handleCTAClick(e, "https://app.exeract.com/signup", "how-it-works-bottom-signup")}
                >
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-base sm:text-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center">
                    {loadingState === "how-it-works-bottom-signup" ? (
                      <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Loading...</>
                    ) : (
                      <>Get Started for Free <ArrowRight className="ml-2 h-5 w-5" /></>
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
