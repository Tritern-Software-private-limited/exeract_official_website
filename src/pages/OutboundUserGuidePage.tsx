import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  Shield, Server, Flame, BarChart2, CheckCircle, Database,
  Mail, Linkedin, Calculator, ChevronDown, ChevronRight,
  Globe, Lock, Key, AlertTriangle, TrendingUp, Users,
  ArrowRight, Zap, Target, Eye, MousePointer, Clock,
  CheckCircle2, XCircle, Info, Send, UserCheck, Hash
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Section {
  id: string;
  number: string;
  icon: React.ElementType;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

// ─── Sections config ─────────────────────────────────────────────────────────
const SECTIONS: Section[] = [
  { id: 'domain',       number: '01', icon: Globe,       title: 'Domain & Infrastructure',    color: 'text-violet-500',  bgColor: 'bg-violet-50',  borderColor: 'border-violet-200' },
  { id: 'auth',         number: '02', icon: Lock,        title: 'Technical Record Setup',      color: 'text-blue-500',    bgColor: 'bg-blue-50',    borderColor: 'border-blue-200'   },
  { id: 'warmup',       number: '03', icon: Flame,       title: 'The Warm-Up Protocol',        color: 'text-orange-500',  bgColor: 'bg-orange-50',  borderColor: 'border-orange-200' },
  { id: 'volume',       number: '04', icon: BarChart2,   title: 'Send Volume Thresholds',      color: 'text-emerald-500', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200'},
  { id: 'compliance',  number: '05', icon: Shield,      title: 'Compliance & Best Practices', color: 'text-red-500',     bgColor: 'bg-red-50',     borderColor: 'border-red-200'    },
  { id: 'data',         number: '06', icon: Database,    title: 'Data Quality & ICP',          color: 'text-primary',     bgColor: 'bg-primary/10', borderColor: 'border-primary/30' },
  { id: 'automation',  number: '07', icon: Mail,        title: 'Cold Email Automation',       color: 'text-secondary',   bgColor: 'bg-secondary/10','borderColor': 'border-secondary/30'},
  { id: 'linkedin',    number: '08', icon: Linkedin,    title: 'Multi-Channel: LinkedIn',     color: 'text-sky-600',     bgColor: 'bg-sky-50',     borderColor: 'border-sky-200'    },
  { id: 'calculator',  number: '09', icon: Calculator,  title: 'Outbound Calculators',        color: 'text-pink-500',    bgColor: 'bg-pink-50',    borderColor: 'border-pink-200'   },
];

// ─── Sticky Table of Contents ─────────────────────────────────────────────────
function TableOfContents({ activeSection }: { activeSection: string }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <aside className="hidden xl:block w-64 flex-shrink-0">
      <div className="sticky top-28 space-y-1">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-3">On this page</p>
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-left
                ${isActive ? `${s.bgColor} ${s.color} border ${s.borderColor}` : 'text-gray-500 hover:text-navy hover:bg-gray-50'}`}
            >
              <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? s.color : 'text-gray-400'}`} />
              <span className="truncate">{s.title}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

// ─── Auth Record Card ─────────────────────────────────────────────────────────
function AuthCard({ icon: Icon, title, badge, desc, color, bg }: {
  icon: React.ElementType; title: string; badge: string; desc: string; color: string; bg: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className={`rounded-2xl border ${bg === 'violet' ? 'border-violet-100' : bg === 'blue' ? 'border-blue-100' : 'border-emerald-100'} overflow-hidden`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between p-5 transition-colors hover:bg-gray-50`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg === 'violet' ? 'bg-violet-50' : bg === 'blue' ? 'bg-blue-50' : 'bg-emerald-50'}`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
          <div className="text-left">
            <p className="font-bold text-navy text-sm">{title}</p>
            <p className={`text-xs font-mono font-bold ${color}`}>{badge}</p>
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t ${bg === 'violet' ? 'border-violet-50 bg-violet-50/30' : bg === 'blue' ? 'border-blue-50 bg-blue-50/30' : 'border-emerald-50 bg-emerald-50/30'} pt-4`}>
              {desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Volume Calculator ────────────────────────────────────────────────────────
function VolumeCalculator() {
  const [mailboxes, setMailboxes] = useState(3);
  const [domains, setDomains] = useState(2);
  const [days, setDays] = useState(22);
  const perMailbox = 40;
  const daily = mailboxes * domains * perMailbox;
  const monthly = daily * days;
  const totalMailboxes = mailboxes * domains;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="h-5 w-5 text-emerald-500" />
        <h4 className="font-bold text-navy">Send Volume Calculator</h4>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Domains', value: domains, setter: setDomains, min: 1, max: 10 },
          { label: 'Mailboxes / Domain', value: mailboxes, setter: setMailboxes, min: 1, max: 3 },
          { label: 'Working Days / Month', value: days, setter: setDays, min: 1, max: 31 },
        ].map(({ label, value, setter, min, max }) => (
          <div key={label}>
            <label className="text-xs font-semibold text-gray-500 block mb-2">{label}</label>
            <div className="flex items-center gap-3">
              <input
                type="range" min={min} max={max} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="flex-1 accent-emerald-500"
              />
              <span className="w-8 text-center text-sm font-bold text-navy">{value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Mailboxes', value: totalMailboxes, unit: 'accounts', color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Daily Capacity', value: daily.toLocaleString(), unit: 'emails/day', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Monthly Reach', value: monthly.toLocaleString(), unit: 'emails/month', color: 'text-secondary', bg: 'bg-blue-50' },
        ].map(({ label, value, unit, color, bg }) => (
          <div key={label} className={`${bg} rounded-xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1">{unit}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4 flex items-center gap-1.5">
        <Info className="h-3 w-3 flex-shrink-0" />
        Based on recommended cap of 30–50 emails/mailbox/day (calculator uses 40 avg)
      </p>
    </div>
  );
}

// ─── LinkedIn Acceptance Calculator ──────────────────────────────────────────
function LinkedInCalculator() {
  const [requests, setRequests] = useState(25);
  const [accepted, setAccepted] = useState(10);
  const rate = requests > 0 ? Math.round((accepted / requests) * 100) : 0;
  const status =
    rate >= 40 ? { label: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' } :
    rate >= 30 ? { label: 'Healthy', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' } :
    rate >= 20 ? { label: 'At Risk', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' } :
    { label: 'Danger Zone', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Linkedin className="h-5 w-5 text-sky-600" />
        <h4 className="font-bold text-navy">LinkedIn Acceptance Rate Monitor</h4>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {[
          { label: 'Requests Sent (last 7 days)', value: requests, setter: setRequests, min: 0, max: 200, color: 'sky' },
          { label: 'Requests Accepted', value: accepted, setter: setAccepted, min: 0, max: requests, color: 'emerald' },
        ].map(({ label, value, setter, min, max, color }) => (
          <div key={label}>
            <label className="text-xs font-semibold text-gray-500 block mb-2">{label}</label>
            <div className="flex items-center gap-3">
              <input
                type="range" min={min} max={max} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className={`flex-1 accent-${color}-500`}
                style={{ accentColor: color === 'sky' ? '#0ea5e9' : '#10b981' }}
              />
              <span className="w-8 text-center text-sm font-bold text-navy">{value}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Gauge */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-40 h-20 overflow-hidden">
          <div className="absolute inset-0 rounded-t-full bg-gradient-to-r from-red-400 via-orange-400 via-yellow-400 to-emerald-400 opacity-20" />
          <div className={`absolute inset-0 flex items-end justify-center pb-3`}>
            <span className={`text-5xl font-black ${status.color}`}>{rate}%</span>
          </div>
        </div>
        <div className={`mt-2 px-4 py-1.5 rounded-full border text-sm font-bold ${status.color} ${status.bg} ${status.border}`}>
          {status.label}
        </div>
      </div>
      {/* Status bar */}
      <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className={`h-full rounded-full transition-all duration-500 ${rate >= 40 ? 'bg-emerald-400' : rate >= 30 ? 'bg-blue-400' : rate >= 20 ? 'bg-orange-400' : 'bg-red-400'}`}
          style={{ width: `${Math.min(rate * 2, 100)}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(rate * 2, 100)}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
        <span>0%</span><span>30% threshold</span><span>50%+</span>
      </div>
      {rate < 30 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2"
        >
          <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-600">Your rate is below 30%. Pause outreach, refine your Exeract targeting, and adjust messaging before continuing.</p>
        </motion.div>
      )}
    </div>
  );
}

// ─── Bounce Rate Calculator ───────────────────────────────────────────────────
function BounceCalculator() {
  const [sent, setSent] = useState(500);
  const [bounced, setBounced] = useState(4);
  const rate = sent > 0 ? ((bounced / sent) * 100).toFixed(2) : '0.00';
  const isGood = parseFloat(rate) <= 1;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-pink-500" />
        <h4 className="font-bold text-navy">Hard Bounce Rate Checker</h4>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {[
          { label: 'Emails Sent', value: sent, setter: setSent, min: 10, max: 5000, step: 10 },
          { label: 'Hard Bounces', value: bounced, setter: setBounced, min: 0, max: Math.round(sent * 0.1), step: 1 },
        ].map(({ label, value, setter, min, max, step }) => (
          <div key={label}>
            <label className="text-xs font-semibold text-gray-500 block mb-2">{label}</label>
            <div className="flex items-center gap-3">
              <input
                type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="flex-1"
                style={{ accentColor: isGood ? '#10b981' : '#ef4444' }}
              />
              <span className="w-12 text-center text-sm font-bold text-navy">{value.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={`rounded-2xl p-6 flex items-center justify-between ${isGood ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
        <div>
          <p className={`text-4xl font-black ${isGood ? 'text-emerald-600' : 'text-red-500'}`}>{rate}%</p>
          <p className="text-xs text-gray-500 mt-1">Bounce Rate</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isGood ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'} text-sm font-bold`}>
          {isGood ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          {isGood ? 'Within Target (0–1%)' : 'Exceeds Limit!'}
        </div>
      </div>
      {!isGood && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 mt-3 flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
          Run your list through Exeract ICP Validation + email verification immediately to clean your data.
        </motion.p>
      )}
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function SectionCard({ section, children }: { section: Section; children: React.ReactNode }) {
  const Icon = section.icon;
  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55 }}
      className={`scroll-mt-24 rounded-3xl border ${section.borderColor} overflow-hidden mb-8`}
    >
      {/* Header */}
      <div className={`${section.bgColor} px-6 sm:px-8 py-6 flex items-center gap-4 border-b ${section.borderColor}`}>
        <div className={`w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm flex-shrink-0`}>
          <Icon className={`h-6 w-6 ${section.color}`} />
        </div>
        <div>
          <span className={`text-xs font-bold ${section.color} uppercase tracking-widest`}>Section {section.number}</span>
          <h2 className="text-xl sm:text-2xl font-bold text-navy">{section.title}</h2>
        </div>
      </div>
      <div className="bg-white px-6 sm:px-8 py-8">
        {children}
      </div>
    </motion.section>
  );
}

// ─── Tip Badge ────────────────────────────────────────────────────────────────
function Tip({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'success' }) {
  const styles = {
    info:    'bg-blue-50 border-blue-100 text-blue-700',
    warning: 'bg-amber-50 border-amber-100 text-amber-700',
    success: 'bg-emerald-50 border-emerald-100 text-emerald-700',
  };
  const icons = { info: Info, warning: AlertTriangle, success: CheckCircle };
  const Icon = icons[type];
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border mt-4 ${styles[type]}`}>
      <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}

// ─── Warmup Timeline ─────────────────────────────────────────────────────────
function WarmupTimeline() {
  const phases = [
    { week: 'Week 1–2', label: 'Seeding', desc: 'Low volume, peer-to-peer engagement via TRU-warm by Mailineers', emails: '5–10/day', color: 'bg-orange-100 text-orange-600' },
    { week: 'Week 3–4', label: 'Building', desc: 'Gradual ramp-up with high-engagement replies and positive signals', emails: '10–25/day', color: 'bg-yellow-100 text-yellow-600' },
    { week: 'Week 5–6', label: 'Establishing', desc: 'Consistent positive sender history, inbox placement improving', emails: '25–40/day', color: 'bg-lime-100 text-lime-600' },
    { week: 'Week 7+', label: 'Production', desc: 'Full cold outreach capacity with protected sender reputation', emails: '30–50/day', color: 'bg-emerald-100 text-emerald-600' },
  ];
  return (
    <div className="relative mt-4">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-200 via-yellow-200 via-lime-200 to-emerald-200" />
      <div className="space-y-4 pl-14">
        {phases.map((p, i) => (
          <motion.div
            key={p.week}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative"
          >
            <div className={`absolute -left-11 top-3 w-5 h-5 rounded-full ${p.color.split(' ')[0]} border-2 border-white flex items-center justify-center`}>
              <div className={`w-2 h-2 rounded-full ${p.color.split(' ')[0].replace('100', '500')}`} />
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold text-gray-500">{p.week}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.color}`}>{p.label}</span>
                <span className="ml-auto text-xs font-mono font-bold text-gray-400">{p.emails}</span>
              </div>
              <p className="text-sm text-gray-600">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── DNS Status Visualizer ────────────────────────────────────────────────────
function DnsVisualizer() {
  const [domain, setDomain] = useState('getmycompany.com');
  const [checked, setChecked] = useState(false);
  const [checking, setChecking] = useState(false);
  const runCheck = () => {
    setChecking(true);
    setChecked(false);
    setTimeout(() => { setChecking(false); setChecked(true); }, 1400);
  };
  const records = [
    { type: 'SPF', value: 'v=spf1 include:sendgrid.net ~all', status: 'pass' },
    { type: 'DKIM', value: '2048-bit RSA key · selector: s1', status: 'pass' },
    { type: 'DMARC', value: 'v=DMARC1; p=quarantine; rua=mailto:dmarcreports@' + domain, status: 'pass' },
  ];
  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 mt-4">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">DNS Record Visualizer (Demo)</p>
      <div className="flex gap-2 mb-4">
        <input
          value={domain}
          onChange={(e) => { setDomain(e.target.value); setChecked(false); }}
          placeholder="yoursecondary.com"
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-navy font-mono"
        />
        <button
          onClick={runCheck}
          disabled={checking}
          className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-60"
        >
          {checking ? (
            <><span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />Checking…</>
          ) : (
            <><Key className="h-4 w-4" />Check Records</>
          )}
        </button>
      </div>
      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {records.map((r) => (
              <div key={r.type} className="flex items-start gap-3 bg-white rounded-xl p-3.5 border border-emerald-100">
                <span className="flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </span>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mr-2">{r.type}</span>
                  <span className="text-xs font-mono text-gray-500 break-all">{r.value}</span>
                </div>
              </div>
            ))}
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 mt-2">
              <CheckCircle2 className="h-3.5 w-3.5" /> All authentication records configured correctly
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Email Copy Analyzer ──────────────────────────────────────────────────────
function EmailCopyAnalyzer() {
  const [text, setText] = useState('');
  const spamWords = ['click here', 'free', 'guaranteed', 'unsubscribe', 'buy now', 'limited time', 'act now', 'discount', 'winner', '!!!'];
  const htmlTags = /<[^>]+>/g;
  const trackingLinks = /https?:\/\/(trk\.|click\.|open\.|track\.)/i;
  const hasHtml = htmlTags.test(text);
  const hasTracking = trackingLinks.test(text);
  const foundSpam = spamWords.filter(w => text.toLowerCase().includes(w));
  const score = Math.max(0, 100 - foundSpam.length * 15 - (hasHtml ? 20 : 0) - (hasTracking ? 25 : 0));
  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 mt-4">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Deliverability Copy Analyzer</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your cold email copy here to analyze it for spam triggers…"
        className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary resize-none text-navy placeholder-gray-400 bg-white"
      />
      {text.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
          {/* Score */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600">Deliverability Score</span>
            <span className={`text-2xl font-black ${score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-orange-500' : 'text-red-500'}`}>{score}/100</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${score >= 80 ? 'bg-emerald-400' : score >= 60 ? 'bg-orange-400' : 'bg-red-400'}`}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          {/* Issues */}
          <div className="space-y-1.5">
            {hasHtml && (
              <div className="flex items-center gap-2 text-xs text-red-600"><XCircle className="h-3.5 w-3.5" /> HTML formatting detected — use plain text only</div>
            )}
            {hasTracking && (
              <div className="flex items-center gap-2 text-xs text-red-600"><XCircle className="h-3.5 w-3.5" /> Tracking link detected — disable open/click tracking</div>
            )}
            {foundSpam.map(w => (
              <div key={w} className="flex items-center gap-2 text-xs text-orange-600"><AlertTriangle className="h-3.5 w-3.5" /> Spam word: "{w}"</div>
            ))}
            {!hasHtml && !hasTracking && foundSpam.length === 0 && (
              <div className="flex items-center gap-2 text-xs text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" /> No obvious spam triggers found — good copy!</div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function OutboundUserGuidePage() {
  const [activeSection, setActiveSection] = useState('domain');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(s.id); },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFF] font-sans text-navy selection:bg-primary/20 selection:text-navy overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[100px]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Send className="h-3 w-3" /> Outbound Playbook
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy leading-tight mb-6">
              Outbound User Guide
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-3xl mx-auto leading-relaxed">
              A complete, step-by-step playbook for building a cold outreach system that lands in inboxes — not spam folders. From infrastructure to LinkedIn, every layer covered.
            </p>
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                { label: '9 Sections', icon: Hash },
                { label: '3 Calculators', icon: Calculator },
                { label: 'Interactive Tools', icon: MousePointer },
                { label: 'Exeract-Powered', icon: Zap },
              ].map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm text-sm font-medium text-gray-600">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex gap-10 items-start">
          {/* TOC Sidebar */}
          <TableOfContents activeSection={activeSection} />

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* ── Section 1: Domain & Infrastructure ── */}
            <SectionCard section={SECTIONS[0]}>
              <p className="text-gray-600 leading-relaxed mb-6">
                Protect your primary root domain at all costs. Instead of sending from your main website's domain, purchase <strong className="text-navy">dedicated secondary domains</strong> (e.g., <code className="bg-violet-50 text-violet-600 px-1.5 py-0.5 rounded font-mono text-sm">get[yourcompany].com</code> or <code className="bg-violet-50 text-violet-600 px-1.5 py-0.5 rounded font-mono text-sm">try[yourcompany].com</code>).
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { icon: Shield, title: 'Primary Domain', badge: 'PROTECTED', desc: 'Your main brand domain. Never used for cold outreach. Keep its reputation pristine for transactional and internal email.', color: 'text-red-500', bg: 'red' },
                  { icon: Globe, title: 'Secondary Domains', badge: 'FOR OUTREACH', desc: 'Dedicated domains only for cold outbound. Purchase 1 domain per 2–3 mailboxes. If one is flagged, your primary is safe.', color: 'text-emerald-500', bg: 'emerald' },
                ].map((card) => (
                  <div key={card.title} className={`rounded-2xl p-5 border ${card.bg === 'red' ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
                    <div className={`w-10 h-10 rounded-xl ${card.bg === 'red' ? 'bg-red-100' : 'bg-emerald-100'} flex items-center justify-center mb-3`}>
                      <card.icon className={`h-5 w-5 ${card.color}`} />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-navy text-sm">{card.title}</h4>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${card.bg === 'red' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>{card.badge}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-violet-50 rounded-2xl border border-violet-100 p-5">
                <p className="text-sm font-bold text-violet-700 mb-3 flex items-center gap-2"><Server className="h-4 w-4" /> Mailbox Allocation Rule</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-white rounded-xl p-3 border border-violet-100 text-center">
                    <p className="text-3xl font-black text-violet-600">2–3</p>
                    <p className="text-xs text-gray-500 mt-1">Mailboxes per domain</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-violet-400 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-violet-700 leading-relaxed">This isolates your risk. If one domain takes a reputation hit, it <em>won't drag down</em> your entire operation or your internal team's communications.</p>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* ── Section 2: Authentication ── */}
            <SectionCard section={SECTIONS[1]}>
              <p className="text-gray-600 leading-relaxed mb-6">
                Proper DNS configuration is <strong className="text-navy">non-negotiable</strong> for bypassing modern spam filters. Expand each record to understand its role.
              </p>
              <div className="space-y-3 mb-4">
                <AuthCard
                  icon={Shield}
                  title="SPF — Sender Policy Framework"
                  badge="TXT Record"
                  desc="Authorizes your email service provider to send emails on your behalf. Without SPF, receiving servers have no way to verify that your ESP is legitimate. Set a strict ~all or -all policy once your sending sources are locked in."
                  color="text-violet-500"
                  bg="violet"
                />
                <AuthCard
                  icon={Key}
                  title="DKIM — DomainKeys Identified Mail"
                  badge="TXT Record"
                  desc="Adds a cryptographic signature to your emails, proving to the receiving server that the message wasn't tampered with in transit. Most modern ESPs generate DKIM keys automatically — use 2048-bit for maximum trust."
                  color="text-blue-500"
                  bg="blue"
                />
                <AuthCard
                  icon={CheckCircle}
                  title="DMARC — Message Authentication, Reporting & Conformance"
                  badge="TXT Record"
                  desc="Instructs receiving servers on what to do if SPF or DKIM fails, preventing domain spoofing. Start with p=none for monitoring, advance to p=quarantine, then p=reject as your confidence grows. Set up rua= for aggregate reports."
                  color="text-emerald-500"
                  bg="emerald"
                />
              </div>
              <DnsVisualizer />
              <Tip type="info">All three records — SPF, DKIM, and DMARC — must be correctly configured together. Missing even one significantly increases your spam score.</Tip>
            </SectionCard>

            {/* ── Section 3: Warm-Up Protocol ── */}
            <SectionCard section={SECTIONS[2]}>
              <p className="text-gray-600 leading-relaxed mb-6">
                <strong className="text-navy">Never blast emails from a fresh domain.</strong> Your sender reputation needs to be built gradually through strategic, high-engagement interactions.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    title: '❌ Avoid Robotic Pools',
                    desc: 'Standard automated warm-up tools are increasingly detected by major email providers. Gmail and Outlook now flag coordinated warm-up network patterns.',
                    bg: 'bg-red-50 border-red-100',
                    textColor: 'text-red-700'
                  },
                  {
                    title: '✅ The Manual Approach',
                    desc: 'We recommend TRU-warm by Mailineers to naturally build sender trust through strategic, high-engagement peer-to-peer interactions. This establishes a baseline of human activity before you introduce automation.',
                    bg: 'bg-emerald-50 border-emerald-100',
                    textColor: 'text-emerald-700'
                  },
                ].map((item) => (
                  <div key={item.title} className={`rounded-2xl border p-5 ${item.bg}`}>
                    <h4 className={`font-bold text-sm mb-2 ${item.textColor}`}>{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <h4 className="font-bold text-navy mb-3 flex items-center gap-2"><Clock className="h-4 w-4 text-orange-500" /> Warm-Up Timeline</h4>
              <WarmupTimeline />
              <Tip type="warning">Jumping to 50 emails/day on week 1 from a new domain is the #1 cause of permanent blacklisting. The timeline above is a minimum — not a fast-track.</Tip>
            </SectionCard>

            {/* ── Section 4: Volume Thresholds ── */}
            <SectionCard section={SECTIONS[3]}>
              <p className="text-gray-600 leading-relaxed mb-6">
                Volume spikes are the <strong className="text-navy">fastest way to trigger algorithmic blacklists.</strong> These thresholds are non-negotiable during cold outreach.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'Daily Limit Per Mailbox', value: '30–50', unit: 'emails/day', icon: Mail, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Send Window', value: '6–8', unit: 'hours spread', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
                ].map(({ label, value, unit, icon: Icon, color, bg }) => (
                  <div key={label} className={`${bg} rounded-2xl p-5 border border-gray-100`}>
                    <Icon className={`h-6 w-6 ${color} mb-3`} />
                    <p className={`text-4xl font-black ${color}`}>{value}</p>
                    <p className="text-xs text-gray-500 mt-1">{unit}</p>
                    <p className="text-sm font-medium text-navy mt-1">{label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 mb-6">
                <h4 className="font-bold text-navy mb-3 text-sm flex items-center gap-2"><Zap className="h-4 w-4 text-amber-500" /> Pacing Strategy</h4>
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-2">
                    {[
                      { time: '08:30', action: 'Send batch 1 (10 emails)', type: 'send' },
                      { time: '10:15', action: 'Send batch 2 (12 emails)', type: 'send' },
                      { time: '12:45', action: 'Lunch break — no sends', type: 'break' },
                      { time: '14:20', action: 'Send batch 3 (10 emails)', type: 'send' },
                      { time: '16:30', action: 'Send batch 4 (8 emails)', type: 'send' },
                    ].map((item) => (
                      <div key={item.time} className="flex items-center gap-3 text-sm">
                        <span className="font-mono text-xs text-gray-400 w-12 flex-shrink-0">{item.time}</span>
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.type === 'send' ? 'bg-emerald-400' : 'bg-gray-300'}`} />
                        <span className={item.type === 'break' ? 'text-gray-400 italic' : 'text-gray-600'}>{item.action}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center min-w-[80px]">
                    <p className="text-2xl font-black text-emerald-600">40</p>
                    <p className="text-[10px] text-gray-500">total/day</p>
                    <p className="text-[10px] text-emerald-600 font-bold mt-1">✓ Safe</p>
                  </div>
                </div>
              </div>
              <VolumeCalculator />
            </SectionCard>

            {/* ── Section 5: Compliance ── */}
            <SectionCard section={SECTIONS[4]}>
              <p className="text-gray-600 leading-relaxed mb-6">
                Deliverability isn't just technical; it's heavily influenced by how you structure your copy and manage opt-outs.
              </p>
              <div className="space-y-4 mb-6">
                <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                  <h4 className="font-bold text-red-700 mb-2 text-sm flex items-center gap-2"><Shield className="h-4 w-4" /> CAN-SPAM Compliance</h4>
                  <ul className="space-y-2">
                    {[
                      'Always include your physical business address in the email footer',
                      'Subject lines must accurately reflect the email content — no misleading subject lines',
                      'Honor opt-out requests within 10 business days',
                      "Never use deceptive 'From' names or domains",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-red-800">
                        <CheckCircle2 className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                  <h4 className="font-bold text-emerald-700 mb-3 text-sm flex items-center gap-2"><UserCheck className="h-4 w-4" /> The "Soft" Unsubscribe Technique</h4>
                  <p className="text-sm text-gray-600 mb-3">Instead of a hyperlinked "Unsubscribe" button (which triggers promotional filters), use conversational opt-outs in your sign-off:</p>
                  <div className="bg-white rounded-xl border border-emerald-100 p-4">
                    <p className="text-xs font-bold text-emerald-600 mb-2">✉️ Example Sign-off</p>
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      "If this isn't relevant to you right now, just let me know and I'll make sure not to reach out again."
                    </p>
                  </div>
                  <Tip type="success">This conversational approach avoids promotional filter triggers while still giving recipients a clear and respectful way to opt out.</Tip>
                </div>
              </div>
              <EmailCopyAnalyzer />
            </SectionCard>

            {/* ── Section 6: Data Quality & Exeract ICP ── */}
            <SectionCard section={SECTIONS[5]}>
              <p className="text-gray-600 leading-relaxed mb-6">
                <strong className="text-navy">Bad data ruins good domains.</strong> Precision targeting is the core of a sustainable outbound system.
              </p>
              <div className="relative mb-8">
                {[
                  { step: '1', title: 'Multi-Point Sourcing', desc: 'Gather raw prospect data from your preferred data providers (Apollo, ZoomInfo, LinkedIn Sales Nav, etc.)', color: 'bg-primary text-white', badge: 'Your Input' },
                  { step: '2', title: 'Exeract ICP Validation', desc: 'Feed raw data directly into Exeract. Our AI module conducts automated outbound qualification, actively researching leads to ensure they strictly match your Ideal Customer Profile before a single email is drafted.', color: 'bg-gradient-to-r from-primary to-secondary text-white', badge: 'Exeract AI' },
                  { step: '3', title: 'Email Verification', desc: 'Run the Exeract-validated list through a rigorous email verification protocol to catch catch-all and invalid addresses. Your goal: hard bounce rate of strictly 0–1%.', color: 'bg-secondary text-white', badge: 'Final Step' },
                ].map((item, i) => (
                  <div key={item.step} className="flex gap-4 mb-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full ${item.color} flex items-center justify-center text-sm font-black flex-shrink-0`}>{item.step}</div>
                      {i < 2 && <div className="w-0.5 h-full bg-gradient-to-b from-gray-200 to-transparent mt-2 min-h-[32px]" />}
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-4 flex-1 mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-navy text-sm">{item.title}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{item.badge}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm">Why Exeract ICP Validation Matters</h4>
                    <p className="text-xs text-gray-500">Before one email is drafted</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Bounce Rate Target', value: '0–1%', color: 'text-emerald-600' },
                    { label: 'AI Research Depth', value: 'Full Site', color: 'text-primary' },
                    { label: 'Qualification Mode', value: 'Automated', color: 'text-secondary' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="bg-white rounded-xl p-3 text-center border border-gray-100">
                      <p className={`text-xl font-black ${color}`}>{value}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <BounceCalculator />
            </SectionCard>

            {/* ── Section 7: Cold Email Automation ── */}
            <SectionCard section={SECTIONS[6]}>
              <p className="text-gray-600 leading-relaxed mb-6">
                When configuring your sending tools (like Yesware, Smartlead, or Instantly), <strong className="text-navy">optimize for plain text above all else.</strong>
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    title: 'Disable Tracking',
                    icon: Eye,
                    desc: 'Turn off open and click tracking. Tracking pixels insert HTML images and redirect links into your copy, which heavily penalize your deliverability score.',
                    action: 'Set tracking = OFF',
                    color: 'text-red-500',
                    bg: 'bg-red-50 border-red-100',
                    actionColor: 'bg-red-100 text-red-700'
                  },
                  {
                    title: 'Plain Text Format',
                    icon: Mail,
                    desc: 'Stick to plain-text emails with zero formatting. They render perfectly across all devices and feel like a genuine 1-to-1 message from a peer.',
                    action: 'Format = Plain Text',
                    color: 'text-emerald-500',
                    bg: 'bg-emerald-50 border-emerald-100',
                    actionColor: 'bg-emerald-100 text-emerald-700'
                  },
                ].map((item) => (
                  <div key={item.title} className={`rounded-2xl border p-5 ${item.bg}`}>
                    <item.icon className={`h-6 w-6 ${item.color} mb-3`} />
                    <h4 className="font-bold text-navy text-sm mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.desc}</p>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.actionColor}`}>→ {item.action}</span>
                  </div>
                ))}
              </div>
              {/* Comparison */}
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Email Format Comparison</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-red-100 overflow-hidden">
                    <div className="bg-red-50 px-4 py-2 border-b border-red-100 flex items-center gap-2">
                      <XCircle className="h-3.5 w-3.5 text-red-500" />
                      <span className="text-xs font-bold text-red-600">HTML / Tracked Email</span>
                    </div>
                    <div className="p-4 text-xs text-gray-500 font-mono space-y-1">
                      <p className="text-blue-500 underline">Hi [First Name],</p>
                      <p>Check out our <span className="bg-yellow-100 px-1">[tracked link]</span></p>
                      <p className="text-gray-300">&lt;img src="pixel.gif"&gt;</p>
                      <p className="text-gray-300">&lt;div style="font-size:14px"&gt;</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-emerald-100 overflow-hidden">
                    <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-xs font-bold text-emerald-600">Plain Text Email</span>
                    </div>
                    <div className="p-4 text-xs text-gray-700 space-y-1">
                      <p>Hi Sarah,</p>
                      <p className="mt-2">Saw you're scaling your SDR team at Acme — wanted to share how we helped a similar team cut research time by 70%.</p>
                      <p className="mt-2">Worth a quick call this week?</p>
                      <p className="mt-2">— James</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* ── Section 8: LinkedIn Outreach ── */}
            <SectionCard section={SECTIONS[7]}>
              <p className="text-gray-600 leading-relaxed mb-6">
                Combining email with LinkedIn creates a <strong className="text-navy">"warm outbound" effect</strong>, but automation limits are tighter than ever.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Max Connection Requests / Day', value: '20–30', icon: Users, color: 'text-sky-600', bg: 'bg-sky-50' },
                  { label: 'Warm-Up Period Before Connecting', value: '1–2 wks', icon: Clock, color: 'text-violet-600', bg: 'bg-violet-50' },
                  { label: 'Minimum Acceptance Rate', value: '30%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                  <div key={label} className={`${bg} rounded-2xl p-5 border border-gray-100 text-center`}>
                    <Icon className={`h-6 w-6 ${color} mx-auto mb-2`} />
                    <p className={`text-3xl font-black ${color}`}>{value}</p>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 mb-6">
                {[
                  {
                    step: '1',
                    title: 'Engagement-First Warm-Up',
                    desc: 'Warm up prospects for 1–2 weeks before connecting. View their profiles, like 2–3 posts, and leave thoughtful comments. By the time your connection request arrives, they already recognize your name.',
                    icon: Eye,
                    color: 'text-violet-500',
                    bg: 'bg-violet-50 border-violet-100',
                  },
                  {
                    step: '2',
                    title: 'Cloud-Based Tools Only',
                    desc: 'Always prioritize cloud-based platforms (Expandi, Lemlist, Dripify) over browser extensions. Extensions leave detectable code fingerprints that LinkedIn actively monitors and penalizes.',
                    icon: Server,
                    color: 'text-sky-500',
                    bg: 'bg-sky-50 border-sky-100',
                  },
                  {
                    step: '3',
                    title: 'Monitor Acceptance Rate',
                    desc: "If your acceptance rate drops below 30%, LinkedIn's algorithm will flag you as a spammer. Pause immediately, refine your Exeract targeting, and adjust messaging before resuming.",
                    icon: TrendingUp,
                    color: 'text-emerald-500',
                    bg: 'bg-emerald-50 border-emerald-100',
                  },
                ].map((item) => (
                  <div key={item.step} className={`flex items-start gap-4 rounded-2xl border p-4 ${item.bg}`}>
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy text-sm mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <LinkedInCalculator />
            </SectionCard>

            {/* ── Section 9: Calculators ── */}
            <SectionCard section={SECTIONS[8]}>
              <p className="text-gray-600 leading-relaxed mb-6">
                Use these interactive tools to plan, monitor, and optimize every layer of your outbound system in real time.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { title: 'Volume Calculator', desc: 'Calculate total send capacity based on domains & mailboxes', icon: BarChart2, color: 'text-emerald-500', bg: 'bg-emerald-50', href: '#volume' },
                  { title: 'Bounce Rate Checker', desc: 'Verify your bounce rate stays within the 0–1% safe zone', icon: TrendingUp, color: 'text-pink-500', bg: 'bg-pink-50', href: '#data' },
                  { title: 'LinkedIn Rate Monitor', desc: "Track your connection acceptance rate against LinkedIn's threshold", icon: Linkedin, color: 'text-sky-500', bg: 'bg-sky-50', href: '#linkedin' },
                ].map(({ title, desc, icon: Icon, color, bg, href }) => (
                  <a
                    key={title}
                    href={href}
                    onClick={(e) => { e.preventDefault(); document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' }); }}
                    className={`${bg} rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer group`}
                  >
                    <Icon className={`h-6 w-6 ${color} mb-3 group-hover:scale-110 transition-transform`} />
                    <h4 className="font-bold text-navy text-sm mb-1">{title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    <div className={`flex items-center gap-1 mt-3 text-xs font-semibold ${color}`}>
                      Go to calculator <ChevronRight className="h-3 w-3" />
                    </div>
                  </a>
                ))}
              </div>
              {/* Quick Reference Card */}
              <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-6 text-white">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Hash className="h-5 w-5 text-primary" /> Quick Reference Limits
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Emails/Mailbox/Day', value: '30–50' },
                    { label: 'Mailboxes/Domain', value: '2–3' },
                    { label: 'LinkedIn Requests/Day', value: '20–30' },
                    { label: 'Max Bounce Rate', value: '1%' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
                      <p className="text-lg font-black text-primary">{value}</p>
                      <p className="text-[10px] text-gray-300 mt-1 leading-snug">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
