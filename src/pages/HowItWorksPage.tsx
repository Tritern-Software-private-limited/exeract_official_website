import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  ArrowRight, Target, Download, ShieldCheck, Zap, Coins,
  Upload, Search, FileSpreadsheet, X, Plus, Check, ChevronRight,
  BarChart3, FileDown, CheckCircle2, XCircle, HelpCircle, Loader2,
  Globe, Sliders, Cpu, FileCheck
} from 'lucide-react';
import { useCTARedirect } from '../utils/useCTARedirect';
import { usePageMeta } from '../utils/usePageMeta';

// ─── Interactive 4-Step Workflow Demo (ICP Theme #0393F7) ──────────────────────
const DEMO_KEYWORDS = ['SaaS', 'B2B', 'HR Tech', 'Recruiting', 'ATS'];
const DEMO_COMPANIES = [
  { name: 'Exeract', url: 'exeract.com', status: 'yes', reason: 'B2B SaaS live website qualification engine' },
  { name: 'Tritern', url: 'tritern.com', status: 'yes', reason: 'Custom B2B SaaS platform development' },
  { name: 'Demantri', url: 'demantri.com', status: 'no', reason: 'Cold-storage transportation & freight logistics' },
  { name: 'Globex', url: 'globex.com', status: 'consider', reason: 'Executive recruitment consultancy services' },
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
        setTimeout(() => {
          setIsProcessing(false);
          setDone(true);
          setActiveStep(4);
        }, 500);
      }
    }, 450);
  };

  const steps = [
    { id: 1, label: 'Upload List', icon: Upload },
    { id: 2, label: 'Set ICP Criteria', icon: Target },
    { id: 3, label: 'Run Qualification', icon: Zap },
    { id: 4, label: 'Export Results', icon: FileDown },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_15px_45px_-12px_rgba(3,147,247,0.08)] overflow-hidden">
      {/* ── Step Progress Header ── */}
      <div className="border-b border-slate-100 bg-slate-50/70 px-5 sm:px-8 py-3.5">
        <div className="flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-1 sm:gap-2">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = activeStep === s.id;
              const isComplete = activeStep > s.id;
              return (
                <React.Fragment key={s.id}>
                  <button
                    onClick={() => { if (s.id <= activeStep) setActiveStep(s.id as Step); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap
                      ${isActive
                        ? 'bg-navy text-white shadow-xs'
                        : isComplete
                        ? 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                        : 'text-slate-400 cursor-not-allowed'}`}
                  >
                    {isComplete ? (
                      <Check className="h-3.5 w-3.5 text-[#0393F7] flex-shrink-0" />
                    ) : (
                      <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? 'text-[#0393F7]' : 'text-slate-400'}`} />
                    )}
                    <span>{s.label}</span>
                  </button>
                  {i < steps.length - 1 && (
                    <ChevronRight className={`h-3.5 w-3.5 flex-shrink-0 ${activeStep > s.id ? 'text-slate-400' : 'text-slate-300'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Step Content ── */}
      <div className="p-6 sm:p-8 min-h-[360px]">
        <AnimatePresence mode="wait">
          {/* ── Step 1: Upload ── */}
          {activeStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-6">
                <h4 className="text-base font-bold text-navy mb-1">
                  Upload company list or single website URL
                </h4>
                <p className="text-xs text-slate-500">
                  Select your input source to begin the automated ICP verification.
                </p>
              </div>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setUploadMode('bulk')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    uploadMode === 'bulk'
                      ? 'bg-navy text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  <span>Bulk Upload</span>
                </button>
                <button
                  onClick={() => setUploadMode('single')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    uploadMode === 'single'
                      ? 'bg-navy text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Single URL</span>
                </button>
              </div>

              {uploadMode === 'bulk' ? (
                <div className="border border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50/50 hover:bg-white hover:border-[#0393F7] transition-all group cursor-pointer">
                  <div className="w-10 h-10 bg-[#0393F7]/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-[#0393F7] group-hover:scale-105 transition-transform">
                    <Upload className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-navy text-sm mb-1">Drop your CSV or XLSX file here</p>
                  <p className="text-xs text-[#0277C6] font-medium mb-4">
                    This is an interactive demo. Click <span className="font-bold">Continue</span> below to see the qualification flow.
                  </p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {['exeract.com', 'tritern.com', 'demantri.com', 'globex.com'].map(d => (
                      <span key={d} className="text-xs bg-white text-slate-600 px-3 py-1 rounded-md font-mono border border-slate-200/80">
                        {d}
                      </span>
                    ))}
                    <span className="text-xs text-slate-400 px-2 py-1 font-mono">+900 more</span>
                  </div>
                </div>
              ) : (
                <div className="max-w-xl">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="https://example.com"
                      value={singleUrl}
                      onChange={e => setSingleUrl(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0393F7] text-navy placeholder-slate-400"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Analyze an individual target website against your ICP</p>
                </div>
              )}

              <button
                onClick={() => setActiveStep(2)}
                className="mt-6 px-6 py-2.5 bg-navy text-white hover:bg-slate-800 rounded-xl font-semibold text-xs transition-all flex items-center gap-2"
              >
                Continue <ArrowRight className="h-3.5 w-3.5 text-[#0393F7]" />
              </button>
            </motion.div>
          )}

          {/* ── Step 2: Keywords / ICP ── */}
          {activeStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-6">
                <h4 className="text-base font-bold text-navy mb-1">
                  Define your ICP criteria
                </h4>
                <p className="text-xs text-slate-500">
                  Input the target keywords and offerings that constitute a qualified account.
                </p>
              </div>

              <div className="mb-6">
                <label className="text-xs font-bold text-navy block mb-2">
                  ICP Keywords <span className="text-slate-400 font-normal">(max 5)</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {keywords.map(kw => (
                    <span key={kw} className="flex items-center gap-1.5 bg-slate-100 text-navy px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200">
                      {kw}
                      <button onClick={() => removeKeyword(kw)} className="text-slate-400 hover:text-slate-700 transition-colors">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {keywords.length < 5 && (
                    <div className="flex items-center gap-1 border border-dashed border-slate-300 rounded-lg px-2.5 py-1 bg-white focus-within:border-[#0393F7]">
                      <input
                        className="text-xs outline-none w-24 text-navy placeholder-slate-400"
                        placeholder="Add keyword..."
                        value={kwInput}
                        onChange={e => setKwInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') addKeyword(kwInput); }}
                      />
                      <button onClick={() => addKeyword(kwInput)} className="text-[#0393F7] hover:text-[#0277C6] transition-colors">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Suggestions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {DEMO_KEYWORDS.filter(k => !keywords.includes(k)).map(k => (
                      <button
                        key={k}
                        onClick={() => addKeyword(k)}
                        className="text-[11px] border border-slate-200 text-slate-600 hover:border-[#0393F7] hover:text-[#0277C6] px-2.5 py-0.5 rounded-md transition-colors bg-white"
                      >
                        + {k}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-6 text-xs text-slate-600 leading-relaxed">
                <p className="font-semibold text-navy mb-1">Qualification Logic</p>
                <p className="text-slate-500">
                  Accounts are verified if live website text demonstrates strong alignment with your criteria. Partial matches are flagged for review, and non-matches are automatically filtered out.
                </p>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => { setActiveStep(3); runQualification(); }}
                  className="px-6 py-2.5 bg-navy text-white hover:bg-slate-800 rounded-xl font-semibold text-xs transition-all flex items-center gap-2"
                >
                  Run Qualification <ArrowRight className="h-3.5 w-3.5 text-[#0393F7]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Processing ── */}
          {activeStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-6">
                <h4 className="text-base font-bold text-navy mb-1">
                  Scanning company websites in real time
                </h4>
                <p className="text-xs text-slate-500">
                  Parsing live DOM nodes and matching against defined qualification rules.
                </p>
              </div>

              <div className="space-y-2.5 mb-6">
                {DEMO_COMPANIES.map((co, idx) => {
                  const scanned = processingStep > idx;
                  const scanning = processingStep === idx;
                  return (
                    <div
                      key={co.url}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 bg-white"
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        scanned
                          ? (co.status === 'yes' || co.status === 'verified'
                            ? 'bg-[#0393F7]'
                            : co.status === 'consider'
                            ? 'bg-amber-500'
                            : 'bg-slate-400')
                          : scanning
                          ? 'bg-[#0393F7] animate-ping'
                          : 'bg-slate-200'
                      }`} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-navy">{co.name}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{co.url}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{co.reason}</p>
                      </div>

                      <div className="flex-shrink-0">
                        {scanning && (
                          <span className="text-[11px] text-[#0277C6] font-medium flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" /> Scanning
                          </span>
                        )}
                        {scanned && co.status === 'yes' && (
                          <span className="text-[11px] bg-emerald-50 border border-emerald-200/80 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" /> YES
                          </span>
                        )}
                        {scanned && co.status === 'consider' && (
                          <span className="text-[11px] bg-amber-50 border border-amber-200/80 text-amber-700 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <HelpCircle className="h-3 w-3 text-amber-500" /> CONSIDER
                          </span>
                        )}
                        {scanned && co.status === 'no' && (
                          <span className="text-[11px] bg-rose-50 border border-rose-200/80 text-rose-700 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <XCircle className="h-3 w-3 text-rose-500" /> NO
                          </span>
                        )}
                        {!scanned && !scanning && (
                          <span className="text-[11px] text-slate-400 font-mono">Queued</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {done && (
                <div className="p-3 bg-[#EBF6FE] rounded-xl border border-[#BAE1FC] text-center text-xs font-semibold text-[#0277C6]">
                  Scan complete - moving to export view
                </div>
              )}
            </motion.div>
          )}

          {/* ── Step 4: Export ── */}
          {activeStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-6">
                <h4 className="text-base font-bold text-navy mb-1">
                  Qualified list ready for export
                </h4>
                <p className="text-xs text-slate-500">
                  Segmented CSV ready for direct integration into your outbound sequences or CRM.
                </p>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Total Assessed', value: '4' },
                  { label: 'Qualified', value: '2', color: 'text-emerald-600' },
                  { label: 'Review', value: '1', color: 'text-amber-600' },
                  { label: 'Disqualified', value: '1', color: 'text-rose-500' },
                ].map(stat => (
                  <div key={stat.label} className="bg-slate-50 rounded-xl p-3.5 text-center border border-slate-200/80">
                    <p className={`text-xl font-extrabold ${stat.color || 'text-navy'}`}>{stat.value}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Qualified list preview */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>qualified_accounts.csv</span>
                  <span>4 records</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {DEMO_COMPANIES.map(co => (
                    <div key={co.url} className="flex items-center justify-between p-3 bg-white">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          co.status === 'yes'
                            ? 'bg-emerald-500'
                            : co.status === 'consider'
                            ? 'bg-amber-500'
                            : 'bg-rose-400'
                        }`} />
                        <div>
                          <span className="font-semibold text-navy">{co.name}</span>
                          <span className="text-slate-400 font-mono text-[11px] ml-2">{co.url}</span>
                        </div>
                      </div>
                      <div>
                        {co.status === 'yes' && (
                          <span className="text-[11px] bg-emerald-50 border border-emerald-200/80 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" /> YES
                          </span>
                        )}
                        {co.status === 'consider' && (
                          <span className="text-[11px] bg-amber-50 border border-amber-200/80 text-amber-700 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <HelpCircle className="h-3 w-3 text-amber-500" /> CONSIDER
                          </span>
                        )}
                        {co.status === 'no' && (
                          <span className="text-[11px] bg-rose-50 border border-rose-200/80 text-rose-700 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <XCircle className="h-3 w-3 text-rose-500" /> NO
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2.5 flex-wrap">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-navy text-white hover:bg-slate-800 rounded-xl font-semibold text-xs transition-all">
                  <Download className="h-3.5 w-3.5 text-[#0393F7]" /> Download CSV
                </button>
                <button
                  onClick={() => { setActiveStep(1); setDone(false); setProcessingStep(0); }}
                  className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-all"
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export function HowItWorksPage() {
  usePageMeta();
  const { handleCTAClick, loadingState } = useCTARedirect();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-navy selection:bg-[#0393F7]/20 selection:text-navy overflow-x-hidden">
      <Navbar />

      <main>
        {/* ── Hero Section ── */}
        <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden text-center">
          {/* Subtle ICP Gradient Backdrop */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-[#EBF6FE]/70 via-white to-transparent pointer-events-none -z-10" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>


              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy tracking-tight leading-tight mb-6">
                <span className="text-[#0393F7]">Qualify Company Lists</span> <br />
                by ICP in Minutes
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Automate your ABM qualification workflow and get perfectly matched company lists in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <a
                  href="/product-access?redirect=https://app.exeract.com/signup"
                  onClick={(e) => handleCTAClick(e, "https://app.exeract.com/signup", "how-it-works-hero-signup")}
                  className="w-full sm:w-auto"
                >
                  <button className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#0393F7] to-[#0277C6] text-white hover:opacity-95 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md shadow-[#0393F7]/20 flex items-center justify-center gap-2">
                    {loadingState === "how-it-works-hero-signup" ? (
                      <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Loading...</>
                    ) : (
                      <>Start for free <ArrowRight className="h-4 w-4 text-white" /></>
                    )}
                  </button>
                </a>
                <a
                  href="https://calendly.com/aravindhan-tritern/30min"
                  className="w-full sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="w-full sm:w-auto px-7 py-3.5 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-xl font-semibold text-sm transition-all duration-200">
                    Book a Demo
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── ICP Qualification Workflow Section ── */}
        <section className="py-16 sm:py-24 relative overflow-hidden bg-slate-50/60 border-y border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-4">
                Exeract ICP Qualification Workflow
              </h2>

            </div>

            {/* Step Overview Sequence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { step: '01', label: 'Upload your list', desc: 'CSV, XLSX, or single URL' },
                { step: '02', label: 'Define your ICP', desc: 'Keywords & qualification rules' },
                { step: '03', label: 'Auto-qualification', desc: 'Structured live site scanning' },
                { step: '04', label: 'Export clean list', desc: 'Campaign-ready in one click' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group relative bg-white hover:bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 hover:border-[#0393F7]/40 shadow-2xs hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-navy group-hover:text-[#0277C6] transition-colors leading-tight">
                        {item.label}
                      </h3>
                      <span className="text-xs font-mono font-bold text-[#0393F7] bg-[#EBF6FE] px-2.5 py-0.5 rounded-md border border-[#BAE1FC]/60 flex-shrink-0">
                        {item.step}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive 4-Step Workbench */}
            <div>
              <WorkflowDemo />
            </div>
          </div>
        </section>

        {/* ── Summary Cards ── */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 hover:border-[#0393F7]/30 transition-all">
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mb-6 text-[#0393F7]">
                  <Target className="h-6 w-6 text-[#0393F7]" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Define Your True ICP</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Stop relying on basic firmographics. Upload a bulk CSV/XLSX list of company domains or enter a single website URL. Then input your specific criteria: the exact keywords, services, or business models that make a company qualified or unqualified.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 hover:border-[#0393F7]/30 transition-all">
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mb-6 text-[#0393F7]">
                  <Download className="h-6 w-6 text-[#0393F7]" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Export Clean, Verified Lists</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Download your fully enriched and qualified list. Your data is instantly ready for your outbound team or CRM with zero manual review required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why It Works Section ── */}
        <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">Why It Works</h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Most AI agents assume, infer, or hallucinate. When sales teams and data analysts are making pipeline decisions, a single wrong assumption costs real money.
              </p>
            </div>

            <div className="bg-gradient-to-b from-[#EBF6FE]/40 to-slate-50 rounded-2xl p-8 sm:p-10 mb-14 border border-[#BAE1FC]/60">
              <h3 className="text-xl sm:text-2xl font-bold text-navy mb-4">Save your Clay Credit</h3>
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm">
                <p>Clay and Apollo are powerful tools, but running company qualification through them at scale will drain your credits fast. Those platforms charge per action, and qualification is one of the heaviest workloads you can throw at them.</p>
                <p>Exeract is built strictly for this job. It runs on structured execution protocols, extracting only what is actually on the page and never filling in what isn't. No assumptions, no hallucinations, no credit anxiety.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: ShieldCheck, title: 'Zero hallucinations', desc: 'Strict guardrails keep every qualification decision anchored to real website data. No assumptions, no fill-ins.' },
                { icon: Zap, title: 'Infinite scale', desc: 'Process thousands of URLs in the time it takes a human to check ten.' },
                { icon: Coins, title: 'No credit anxiety', desc: 'Qualify massive lists without watching a credit counter drain with every row.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0393F7]/30 text-left transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF6FE] flex items-center justify-center mb-4 text-[#0277C6]">
                      <Icon className="h-5 w-5 text-[#0393F7]" />
                    </div>
                    <h4 className="font-bold text-navy text-sm mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Final CTA Section ── */}
        <section className="py-16 sm:py-24 bg-slate-50/70 border-t border-slate-200/80 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 tracking-tight">
              Ready to verify leads faster?
            </h2>
            <p className="text-base text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
              Join data experts and growth teams optimizing their outbound verification with Exeract.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href="/product-access?redirect=https://app.exeract.com/signup"
                onClick={(e) => handleCTAClick(e, "https://app.exeract.com/signup", "how-it-works-bottom-signup")}
              >
                <button className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#0393F7] to-[#0277C6] text-white hover:opacity-95 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md shadow-[#0393F7]/20 flex items-center justify-center gap-2">
                  {loadingState === "how-it-works-bottom-signup" ? (
                    <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Loading...</>
                  ) : (
                    <>Get Started for Free <ArrowRight className="h-4 w-4 text-white" /></>
                  )}
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
