import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  Mail, CheckCircle2, XCircle, AlertTriangle, Lock,
  Loader2, Search, ChevronRight, ArrowRight, ShieldCheck,
  Zap, Globe, ServerCrash, Users, AtSign, Plus, Minus,
  BadgeCheck, RefreshCw, ExternalLink, BarChart3,
  Upload, FileSpreadsheet, Code2, Sparkles
} from 'lucide-react';
import { useCTARedirect } from '../utils/useCTARedirect';

// ─── Types ─────────────────────────────────────────────────────────────────────
type VerifyStatus = 'idle' | 'loading' | 'success' | 'error';
type EmailResult = 'valid' | 'invalid' | 'catch-all' | 'unknown';

interface VerifyResponse {
  email?: string;
  result?: EmailResult;
  status?: EmailResult;
  reason?: string;
  is_disposable?: boolean;
  is_role_based?: boolean;
  mx_found?: boolean;
  smtp_check?: boolean;
  score?: number;
  [key: string]: unknown;
}

function getResult(data: VerifyResponse): EmailResult {
  return (data.result ?? data.status ?? 'unknown') as EmailResult;
}

function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ─── Result config ─────────────────────────────────────────────────────────────
const RESULT_CFG = {
  valid: {
    label: 'Valid',
    icon: CheckCircle2,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-50',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    borderColor: 'border-emerald-100',
    headline: 'is valid',
    sub: 'This email can be used safely.',
    dot: 'bg-emerald-500',
  },
  invalid: {
    label: 'Invalid',
    icon: XCircle,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50',
    badgeColor: 'text-red-700 bg-red-50 border-red-200',
    borderColor: 'border-red-100',
    headline: 'is invalid',
    sub: 'This email address cannot receive messages.',
    dot: 'bg-red-500',
  },
  'catch-all': {
    label: 'Catch-All',
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    borderColor: 'border-amber-100',
    headline: 'is a catch-all',
    sub: 'This domain accepts all emails — delivery cannot be confirmed.',
    dot: 'bg-amber-500',
  },
  unknown: {
    label: 'Unknown',
    icon: AlertTriangle,
    iconColor: 'text-gray-400',
    iconBg: 'bg-gray-50',
    badgeColor: 'text-gray-600 bg-gray-50 border-gray-200',
    borderColor: 'border-gray-100',
    headline: 'status is unknown',
    sub: 'We could not determine the status of this address.',
    dot: 'bg-gray-400',
  },
};

// ─── Checklist Row ─────────────────────────────────────────────────────────────
function CheckRow({
  label,
  value,
  locked = false,
}: {
  label: string;
  value: string | boolean | null | undefined;
  locked?: boolean;
}) {
  if (locked) {
    return (
      <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
          <Lock className="h-3 w-3" /> Pro
        </span>
      </div>
    );
  }
  const isTrue = value === true;
  const isFalse = value === false;
  const text = isFalse
    ? 'Not found'
    : isTrue
    ? 'Found'
    : value
    ? String(value)
    : '—';
  const color = isFalse ? 'text-red-500' : isTrue ? 'text-primary' : 'text-gray-500';

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm font-semibold ${color}`}>{text}</span>
    </div>
  );
}

// ─── Inline Result Panel ────────────────────────────────────────────────────────
function ResultPanel({
  data,
  email,
  onReset,
}: {
  data: VerifyResponse;
  email: string;
  onReset: () => void;
}) {
  const result = getResult(data);
  const cfg = RESULT_CFG[result];
  const Icon = cfg.icon;
  const { handleCTAClick } = useCTARedirect();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`mt-3 bg-white rounded-2xl border ${cfg.borderColor} shadow-lg overflow-hidden`}
    >
      {/* Status header */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 22 }}
              className={`w-9 h-9 rounded-full ${cfg.iconBg} flex items-center justify-center`}
            >
              <Icon className={`h-5 w-5 ${cfg.iconColor}`} />
            </motion.div>
            <div>
              <p className="text-base font-bold text-navy">
                <span className="font-mono text-navy/70">{email}</span>{' '}
                <span>{cfg.headline}</span>
              </p>
              <p className="text-sm text-gray-500">{cfg.sub}</p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="ml-4 text-xs text-gray-400 hover:text-navy transition-colors flex items-center gap-1 flex-shrink-0"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Verify another</span>
          </button>
        </div>
      </div>

      {/* Detail checks */}
      <div className="px-6 py-1">
        {data.reason && <CheckRow label="Reason" value={data.reason} />}
        {data.mx_found !== undefined && <CheckRow label="MX Records" value={data.mx_found ? 'Found' : 'Not found'} />}
        {data.smtp_check !== undefined && <CheckRow label="SMTP Check" value={data.smtp_check ? 'Valid' : 'Invalid'} />}
        {data.is_disposable !== undefined && <CheckRow label="Disposable Address" value={data.is_disposable ? 'Yes' : 'No'} />}
        {data.is_role_based !== undefined && <CheckRow label="Role-Based Address" value={data.is_role_based ? 'Yes' : 'No'} />}
        {result === 'catch-all' && <CheckRow label="Risk Level" value={null} locked />}
        {/* Show default rows if API doesn't return detail fields */}
        {data.mx_found === undefined && data.smtp_check === undefined && (
          <>
            <CheckRow label="Format" value="Valid" />
            <CheckRow label="Domain" value="Checked" />
          </>
        )}
      </div>

      {/* Catch-all upsell */}
      {result === 'catch-all' && (
        <div className="mx-6 mb-5 mt-2 p-3.5 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 items-start">
          <Lock className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-800 mb-0.5">Unlock Catch-All Risk Scoring</p>
            <p className="text-xs text-amber-600">
              Sign up to see whether this is <strong>High Risk</strong> or <strong>Low Risk</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-6 pb-5 flex flex-wrap gap-3 border-t border-gray-100 pt-4">
        <a
          href="/product-access?redirect=https://app.exeract.com/signup"
          onClick={(e) => handleCTAClick(e, 'https://app.exeract.com/signup', 'result-bulk-cta')}
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          Verify a list in bulk <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}

// ─── Hero Verifier ─────────────────────────────────────────────────────────────
function HeroVerifier() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<VerifyStatus>('idle');
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const canVerify = email.trim().length > 0 && isValidEmailFormat(email);

  const handleVerify = async () => {
    if (!canVerify || status === 'loading') return;
    setStatus('loading');
    setResult(null);
    setErrorMsg('');
    try {
      const res = await fetch('https://api.exeract.com/email_verifier/public/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Public-Site-Key': 'd16802ec51763325348ad337ee04252d9d3e3badfdadbf214988ffab0d9a4d93',
        },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        throw new Error(`Server returned ${res.status}`);
      }
      const data: VerifyResponse = await res.json();
      setResult(data);
      setStatus('success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unexpected error';
      const isCors = msg === 'Failed to fetch' || msg.includes('NetworkError') || msg.includes('network');
      setErrorMsg(isCors
        ? 'Unable to reach the verification server. Please try again or check your connection.'
        : msg
      );
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setResult(null);
    setErrorMsg('');
    setEmail('');
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search bar */}
      <div className="flex bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-all">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 pointer-events-none" />
          <input
            ref={inputRef}
            id="email-verify-input"
            type="email"
            placeholder="Enter an email address…"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleVerify()}
            disabled={status === 'loading'}
            className="w-full pl-12 pr-4 py-4 text-navy text-base placeholder-gray-400 bg-transparent focus:outline-none disabled:opacity-60"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <button
          id="verify-email-btn"
          onClick={handleVerify}
          disabled={!canVerify || status === 'loading'}
          className="m-1.5 px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-all duration-200 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shadow-sm"
        >
          {status === 'loading' ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Verifying…</>
          ) : (
            <>Verify email</>
          )}
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-2.5 text-center">
        Verify and spot incorrect emails for free — no signup needed!{' '}
        <button
          className="text-primary hover:underline font-medium"
          onClick={() => { setEmail('hello@exeract.com'); }}
        >
          Try it with hello@exeract.com
        </button>
      </p>

      {/* Results */}
      <AnimatePresence mode="wait">
        {status === 'success' && result && (
          <ResultPanel key="result" data={result} email={email.trim()} onReset={handleReset} />
        )}
        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 bg-white rounded-2xl border border-red-100 shadow-md p-5 flex gap-3 items-start"
          >
            <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-navy">Verification failed</p>
              <p className="text-xs text-gray-500 mt-0.5">{errorMsg}</p>
            </div>
            <button onClick={handleReset} className="text-gray-400 hover:text-navy transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Accordion ─────────────────────────────────────────────────────────────────
function Accordion({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-gray-200">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className={`text-base font-semibold transition-colors ${open === i ? 'text-primary' : 'text-navy group-hover:text-primary'}`}>
              {item.title}
            </span>
            {open === i ? (
              <Minus className="h-5 w-5 text-primary flex-shrink-0" />
            ) : (
              <Plus className="h-5 w-5 text-gray-400 group-hover:text-primary flex-shrink-0 transition-colors" />
            )}
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-sm text-gray-500 leading-relaxed">{item.body}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── Features mock result panel (static) ──────────────────────────────────────
function StaticResultCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Mini input bar */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
        <div className="flex-1 bg-white border border-gray-200 rounded-lg flex items-center px-3 py-2 gap-2">
          <Mail className="h-4 w-4 text-gray-300" />
          <span className="text-sm text-navy font-mono">antoine@exeract.com</span>
        </div>
        <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg">Verify</button>
      </div>

      {/* Result */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-navy">
              antoine@exeract.com <span className="text-emerald-600">is valid</span>
            </p>
            <p className="text-xs text-gray-500">This email can be used safely.</p>
          </div>
        </div>
      </div>

      {/* Detail rows */}
      <div className="px-5 py-2 space-y-0">
        {[
          { label: 'Format', value: 'Valid', color: 'text-primary' },
          { label: 'MX Records', value: 'Found', color: 'text-primary' },
          { label: 'SMTP Check', value: 'Valid', color: 'text-primary' },
          { label: 'Disposable', value: 'No', color: 'text-primary' },
          { label: 'Risk Level', value: null, locked: true },
        ].map((row, i) => (
          <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-600">{row.label}</span>
            {row.locked ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
                <Lock className="h-3 w-3" /> Pro
              </span>
            ) : (
              <span className={`text-sm font-semibold ${row.color}`}>{row.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: 'What is email verification?',
    a: 'Email verification is the process of checking whether an email address exists and can receive messages. It validates syntax, domain records (MX), and the mailbox itself via SMTP checks, without actually sending an email.',
  },
  {
    q: 'Why do I need to verify my email list?',
    a: 'Sending to invalid addresses causes hard bounces, damages your sender reputation, and can get your domain flagged as spam. Verification removes bad addresses before you send, protecting your deliverability.',
  },
  {
    q: 'What does "catch-all" mean?',
    a: 'A catch-all domain accepts all incoming email regardless of whether the specific mailbox exists. This means we cannot confirm if the address is real — delivery is uncertain. Pro users can access risk scoring to classify catch-all addresses as High or Low Risk.',
  },
  {
    q: 'How do I verify a large list of emails?',
    a: 'Create a free Exeract account to upload CSVs or spreadsheets with up to 100,000 emails per run. Results are available to download once processing is complete.',
  },
  {
    q: 'Is the single email verifier really free?',
    a: 'Yes — single email lookups using the tool on this page are completely free. No account required. For bulk verification, you\'ll need to sign up for a free account.',
  },
];

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

        {/* ── Hero ── */}
        <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-center">
          {/* Grid background — Hunter.io style */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundColor: '#f3f4f6',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)`,
              backgroundSize: '44px 44px',
            }}
          />
          {/* Soft radial vignette to fade grid at edges */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(243,244,246,0) 0%, rgba(243,244,246,0.7) 60%, #f3f4f6 100%)',
            }}
          />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-sm font-semibold text-navy/50 uppercase tracking-wider mb-4">
                Email Verifier
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy leading-tight mb-5 tracking-tight">
                <span className="text-primary">Verify any email address</span>{' '}
                with the most complete email checker.
              </h1>
              <p className="text-base sm:text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
                Real-time, free single-email verification. No account needed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <HeroVerifier />
            </motion.div>
          </div>

          {/* Trusted by logos */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
          >
            <p className="text-sm text-gray-400 mb-6">Trusted by leading teams.</p>
            <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-12 opacity-50 grayscale">
              {['Semrush', 'Canva', 'Vimeo', 'Cisco', 'Customer.io'].map(name => (
                <span key={name} className="text-base font-bold text-gray-500 tracking-wide">{name}</span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Features Accordion + Static Result ── */}
        <section className="py-20 sm:py-28 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: Accordion */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                  Why Exeract
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-8 leading-tight tracking-tight">
                  The most thorough<br />email verifier.
                </h2>

                <Accordion
                  items={[
                    {
                      title: 'Accurate and fast email checker.',
                      body: 'Exeract runs format checks, MX record lookups, and SMTP handshakes in real time — giving you precise results in seconds, not minutes.',
                    },
                    {
                      title: 'Fast, uncomplicated, easy to use.',
                      body: 'Just paste an email and hit verify. No setup, no CSV templates, no account required for single lookups. Results appear instantly below the input.',
                    },
                    {
                      title: 'Accept-all (catch-all) verification.',
                      body: 'We detect catch-all domains and flag them separately. Pro users get a risk score — High Risk vs Low Risk — so you know exactly which catch-all addresses are safe to contact.',
                    },
                    {
                      title: 'Bulk verification for large lists.',
                      body: 'Sign up for free to upload CSV or XLSX files with up to 100,000 emails per run. Download clean, categorised results when processing completes.',
                    },
                  ]}
                />

                <div className="mt-8">
                  <a
                    href="/product-access?redirect=https://app.exeract.com/signup"
                    onClick={(e) => handleCTAClick(e, 'https://app.exeract.com/signup', 'features-signup')}
                  >
                    <button className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors text-sm flex items-center gap-2">
                      {loadingState === 'features-signup' ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Loading…</>
                      ) : (
                        <>Get started for free <ArrowRight className="h-4 w-4" /></>
                      )}
                    </button>
                  </a>
                  <p className="text-xs text-gray-400 mt-2">No credit card required. Free plan available.</p>
                </div>
              </motion.div>

              {/* Right: Static result card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:sticky lg:top-28"
              >
                <StaticResultCard />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Social Proof Bar ── */}
        <section className="py-10 bg-gray-50 border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
              <div>
                <p className="text-2xl font-extrabold text-navy">7M+</p>
                <p className="text-sm text-gray-500">users worldwide</p>
              </div>
              <div className="hidden sm:block h-10 w-px bg-gray-200" />
              <div>
                <p className="text-2xl font-extrabold text-navy">99.9%</p>
                <p className="text-sm text-gray-500">uptime SLA</p>
              </div>
              <div className="hidden sm:block h-10 w-px bg-gray-200" />
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`h-4 w-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-amber-300 fill-amber-300'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500"><strong className="text-navy">4.6</strong> on Capterra</p>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`h-4 w-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-amber-300 fill-amber-300'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500"><strong className="text-navy">4.4</strong> on G2</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why You Need It ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                Why you need an{' '}
                <span className="text-primary">email verifier.</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: BarChart3,
                  title: 'Better deliverability',
                  desc: 'Verifying emails before sending reduces bounce rates, which increases your sender score and ensures more emails reach the inbox.',
                },
                {
                  icon: Zap,
                  title: 'Lower sending costs',
                  desc: 'Every email you send costs time and money. By verifying addresses ahead of time, you only invest resources in real recipients.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Protection against blocklists',
                  desc: 'Verification flags spam traps, honeypots, and risky addresses that can get your domain blacklisted, helping you avoid blocking.',
                },
                {
                  icon: BadgeCheck,
                  title: 'Stronger brand reputation',
                  desc: 'High deliverability means your messages are seen by real people, reinforcing your brand with a consistent, professional presence.',
                },
                {
                  icon: Globe,
                  title: 'Accurate contact data',
                  desc: "Clean email lists mean your CRM stays accurate, your analytics are reliable, and you're always working with real contacts.",
                },
                {
                  icon: Users,
                  title: 'Reduced spend for newsletters',
                  desc: 'Most email platforms charge by subscriber count. Removing invalid addresses directly reduces your monthly billing.',
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Bulk / API / Integrations ── */}
        <section className="py-20 sm:py-28 bg-gray-50 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Scale up</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                More ways to verify.
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto text-base">
                Single lookups are just the start. Exeract scales with your workflow.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: FileSpreadsheet,
                  title: 'Bulk Upload',
                  desc: 'Upload a CSV or XLSX with up to 100,000 emails. Exeract processes them in minutes and gives you a clean, downloadable results file.',
                  cta: 'Verify a list',
                  href: 'https://app.exeract.com/signup',
                  ctaId: 'bulk-card-cta',
                },
                {
                  icon: Code2,
                  title: 'API Access',
                  desc: 'Integrate email verification directly into your product or workflow. Full REST API with detailed responses and generous rate limits.',
                  cta: 'View API docs',
                  href: 'https://app.exeract.com/signup',
                  ctaId: 'api-card-cta',
                },
                {
                  icon: Upload,
                  title: 'Integrations',
                  desc: 'Connect Exeract to your existing stack. Works seamlessly with your CRM, outreach tools, and marketing platforms.',
                  cta: 'See integrations',
                  href: 'https://app.exeract.com/signup',
                  ctaId: 'integrations-card-cta',
                },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 flex flex-col"
                  >
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-navy text-lg mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">{card.desc}</p>
                    <a
                      href={`/product-access?redirect=${card.href}`}
                      onClick={(e) => handleCTAClick(e, card.href, card.ctaId)}
                      className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                      {card.cta} <ChevronRight className="h-4 w-4" />
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Understanding Results ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                Understanding your results.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  result: 'valid' as EmailResult,
                  title: 'Valid',
                  desc: 'The email passes all checks — syntax, domain MX records, and SMTP handshake. The mailbox exists and is accepting messages. Safe to send.',
                  pro: null,
                },
                {
                  result: 'invalid' as EmailResult,
                  title: 'Invalid',
                  desc: "The email is malformed, the domain doesn't resolve, or the mailbox was rejected by the mail server. Sending will result in a hard bounce.",
                  pro: null,
                },
                {
                  result: 'catch-all' as EmailResult,
                  title: 'Catch-All',
                  desc: 'The domain accepts all emails regardless of whether the mailbox exists. We cannot confirm delivery. Upgrade to Pro for a risk score.',
                  pro: 'Pro users get a High Risk vs. Low Risk score for catch-all addresses.',
                },
              ].map((item, i) => {
                const cfg = RESULT_CFG[item.result];
                const Icon = cfg.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-gray-50 border border-gray-100 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-9 h-9 rounded-full ${cfg.iconBg} flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${cfg.iconColor}`} />
                      </div>
                      <span className={`text-xs font-extrabold border px-2.5 py-0.5 rounded-full ${cfg.badgeColor}`}>
                        {cfg.label.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-bold text-navy text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.desc}</p>
                    {item.pro && (
                      <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
                        <Lock className="h-3.5 w-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700">{item.pro}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 sm:py-28 bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                Frequently asked questions.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm px-8"
            >
              <Accordion
                items={FAQ_ITEMS.map(f => ({ title: f.q, body: f.a }))}
              />
            </motion.div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-20 sm:py-28 bg-white border-t border-gray-100 relative overflow-hidden">
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundColor: '#f3f4f6',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
              backgroundSize: '44px 44px',
            }}
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(243,244,246,0) 0%, rgba(243,244,246,0.6) 60%, #f3f4f6 100%)',
            }}
          />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-7">
                <Sparkles className="h-3.5 w-3.5" />
                Bulk verification available
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy mb-5 leading-tight tracking-tight">
                Clean your list,{' '}
                <span className="text-primary">boost deliverability.</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
                Join thousands of growth teams verifying their email lists with Exeract before every campaign.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/product-access?redirect=https://app.exeract.com/signup"
                  onClick={(e) => handleCTAClick(e, 'https://app.exeract.com/signup', 'bottom-signup')}
                >
                  <button
                    id="email-cta-signup-btn"
                    className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                  >
                    {loadingState === 'bottom-signup' ? (
                      <><Loader2 className="animate-spin h-5 w-5" /> Loading…</>
                    ) : (
                      <>Get started for free <ArrowRight className="h-5 w-5" /></>
                    )}
                  </button>
                </a>
                <a
                  href="https://app.exeract.com/signin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy transition-colors"
                >
                  Already have an account? Sign in <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
                {[
                  { icon: ShieldCheck, text: 'No credit card required' },
                  { icon: Zap, text: 'Instant results' },
                  { icon: Lock, text: 'Data never stored' },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Icon className="h-3.5 w-3.5" /> {item.text}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
