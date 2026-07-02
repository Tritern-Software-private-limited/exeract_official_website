import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  Shield, Server, Flame, BarChart2, CheckCircle, Database,
  Mail, Linkedin, Calculator, ChevronDown,
  Globe, Lock, Key, AlertTriangle, TrendingUp, Users,
  Target, Eye, Clock,
  CheckCircle2, XCircle, Info, Send, UserCheck, Loader2, Activity
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Section {
  id: string;
  number: string;
  icon: React.ElementType;
  title: string;
}

// ─── Sections config ─────────────────────────────────────────────────────────
const SECTIONS: Section[] = [
  { id: 'domain',     number: '01', icon: Globe,     title: 'Domain & Infrastructure'    },
  { id: 'auth',       number: '02', icon: Lock,       title: 'Technical Record Setup'     },
  { id: 'warmup',     number: '03', icon: Flame,      title: 'The Warm-Up Protocol'       },
  { id: 'volume',     number: '04', icon: BarChart2,  title: 'Send Volume Thresholds'     },
  { id: 'compliance', number: '05', icon: Shield,     title: 'Compliance & Best Practices'},
  { id: 'data',       number: '06', icon: Database,   title: 'Data Quality & ICP'         },
  { id: 'automation', number: '07', icon: Mail,       title: 'Cold Email Automation'      },
  { id: 'linkedin',   number: '08', icon: Linkedin,   title: 'Multi-Channel: LinkedIn'    },
];

// ─── Sticky Table of Contents ─────────────────────────────────────────────────
function TableOfContents({ activeSection }: { activeSection: string }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <aside className="hidden xl:block w-56 flex-shrink-0 self-stretch">
      <div className="sticky top-28">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">On this page</p>
        <nav className="space-y-0.5">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 text-left group ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-medium'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? 'text-indigo-500' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className="truncate text-xs">{s.title}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

// ─── Auth Record Card ─────────────────────────────────────────────────────────
function AuthCard({ icon: Icon, title, badge, desc }: {
  icon: React.ElementType; title: string; badge: string; desc: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="rounded-xl border border-slate-200 overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 transition-colors hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <Icon className="h-4 w-4 text-slate-600" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-slate-800 text-sm">{title}</p>
            <p className="text-[10px] font-mono font-bold text-indigo-500 mt-0.5">{badge}</p>
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/60">
              {desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Mailbox Infra Calculator ────────────────────────────────────────────────
function MailboxInfraCalculator() {
  const [targetEmails, setTargetEmails] = useState(5000);
  const [workingDays, setWorkingDays] = useState(22);
  const [emailsPerDay, setEmailsPerDay] = useState(35);
  const [mailboxesPerDomain, setMailboxesPerDomain] = useState(2);

  const maxEmailsPerMailboxMonth = emailsPerDay * workingDays;
  const totalMailboxes = Math.ceil(targetEmails / maxEmailsPerMailboxMonth);
  const totalDomains = Math.ceil(totalMailboxes / mailboxesPerDomain);

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-6">
        <Server className="h-4 w-4 text-indigo-500" />
        <h4 className="font-semibold text-slate-800 text-sm">Infrastructure Calculator</h4>
      </div>

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mb-6">
        <div className="col-span-1 sm:col-span-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-3">Target Cold Emails per Month</label>
          <div className="flex items-center gap-4">
            <input
              type="range" min={500} max={10000} step={500} value={targetEmails}
              onChange={(e) => setTargetEmails(Number(e.target.value))}
              className="flex-1"
              style={{ accentColor: '#6366f1' }}
            />
            <input
              type="number" min={500} max={10000} step={500} value={targetEmails}
              onChange={(e) => setTargetEmails(Number(e.target.value))}
              className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 text-center text-sm font-bold text-slate-800 bg-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {[
          { label: 'Working Days / Month', value: workingDays, setter: setWorkingDays, min: 10, max: 31, step: 1 },
          { label: 'Cold Emails / Mailbox / Day', value: emailsPerDay, setter: setEmailsPerDay, min: 10, max: 40, step: 1 },
          { label: 'Mailboxes / Domain', value: mailboxesPerDomain, setter: setMailboxesPerDomain, min: 1, max: 2, step: 1 },
        ].map(({ label, value, setter, min, max, step }) => (
          <div key={label}>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">{label}</label>
            <div className="flex items-center gap-3">
              <input
                type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="flex-1"
                style={{ accentColor: '#6366f1' }}
              />
              <span className="w-8 text-right text-sm font-bold text-slate-800">{value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { key: `domain-${totalDomains}`, value: totalDomains, label: 'Domains Needed', sub: `@ ${mailboxesPerDomain} mailboxes each`, icon: Globe },
          { key: `mailbox-${totalMailboxes}`, value: totalMailboxes, label: 'Mailboxes Needed', sub: `${emailsPerDay} emails/day each`, icon: Mail },
        ].map(({ key, value, label, sub, icon: Icon }) => (
          <motion.div
            key={key}
            initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}
            className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200 relative overflow-hidden"
          >
            <Icon className="absolute top-2 right-2 h-8 w-8 text-indigo-500 opacity-5" />
            <p className="text-3xl font-black text-indigo-600 mb-1">{value}</p>
            <p className="text-xs text-slate-700 font-semibold">{label}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-slate-200 pt-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Deliverability Guardrails</p>
        <ul className="space-y-2">
          {[
            `Human-like schedule: ${workingDays} working days/month mimics natural behavior`,
            `Volume cap: ${emailsPerDay} emails/mailbox leaves room for warm-up replies`,
            `Reputation isolation: max ${mailboxesPerDomain} mailboxes per domain`,
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-indigo-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Volume Calculator ────────────────────────────────────────────────────────
function VolumeCalculator() {
  const [mailboxes, setMailboxes] = useState(2);
  const [domains, setDomains] = useState(2);
  const [days, setDays] = useState(22);
  const perMailbox = 40;
  const daily = mailboxes * domains * perMailbox;
  const monthly = daily * days;
  const totalMailboxes = mailboxes * domains;
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-5">
        <Calculator className="h-4 w-4 text-indigo-500" />
        <h4 className="font-semibold text-slate-800 text-sm">Send Volume Calculator</h4>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        {[
          { label: 'Domains', value: domains, setter: setDomains, min: 1, max: 10 },
          { label: 'Mailboxes / Domain', value: mailboxes, setter: setMailboxes, min: 1, max: 2 },
          { label: 'Working Days / Month', value: days, setter: setDays, min: 1, max: 31 },
        ].map(({ label, value, setter, min, max }) => (
          <div key={label}>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">{label}</label>
            <div className="flex items-center gap-3">
              <input
                type="range" min={min} max={max} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="flex-1"
                style={{ accentColor: '#6366f1' }}
              />
              <span className="w-6 text-right text-sm font-bold text-slate-800">{value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Total Mailboxes', value: totalMailboxes, unit: 'accounts' },
          { label: 'Daily Capacity', value: daily.toLocaleString(), unit: 'emails/day' },
          { label: 'Monthly Reach', value: monthly.toLocaleString(), unit: 'emails/mo' },
        ].map(({ label, value, unit }) => (
          <div key={label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-200">
            <p className="text-xl font-black text-indigo-600">{value}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{unit}</p>
            <p className="text-[9px] text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 mt-3 flex items-center gap-1.5">
        <Info className="h-3 w-3 flex-shrink-0" />
        Based on 40 emails/mailbox/day cap
      </p>
    </div>
  );
}

// ─── LinkedIn Acceptance Calculator ──────────────────────────────────────────
function LinkedInCalculator() {
  const [requests, setRequests] = useState(25);
  const [accepted, setAccepted] = useState(10);
  const rate = requests > 0 ? Math.round((accepted / requests) * 100) : 0;
  const isGood = rate >= 30;
  const statusLabel = rate >= 40 ? 'Excellent' : rate >= 30 ? 'Healthy' : rate >= 20 ? 'At Risk' : 'Danger Zone';
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-5">
        <Linkedin className="h-4 w-4 text-indigo-500" />
        <h4 className="font-semibold text-slate-800 text-sm">Acceptance Rate Monitor</h4>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {[
          { label: 'Requests Sent (last 7 days)', value: requests, setter: setRequests, min: 0, max: 200 },
          { label: 'Requests Accepted', value: accepted, setter: setAccepted, min: 0, max: requests },
        ].map(({ label, value, setter, min, max }) => (
          <div key={label}>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">{label}</label>
            <div className="flex items-center gap-3">
              <input
                type="range" min={min} max={max} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="flex-1"
                style={{ accentColor: '#6366f1' }}
              />
              <span className="w-8 text-center text-sm font-bold text-slate-800">{value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex items-center justify-between mb-4">
        <div>
          <p className={`text-4xl font-black ${isGood ? 'text-indigo-600' : 'text-red-500'}`}>{rate}%</p>
          <p className="text-xs text-slate-500 mt-1">Acceptance Rate</p>
        </div>
        <div className={`px-4 py-2 rounded-full text-xs font-bold ${isGood ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
          {statusLabel}
        </div>
      </div>
      <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isGood ? 'bg-indigo-500' : 'bg-red-500'}`}
          style={{ width: `${Math.min(rate * 2, 100)}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(rate * 2, 100)}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
        <span>0%</span><span>30% threshold</span><span>50%+</span>
      </div>
      {rate < 30 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2"
        >
          <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700">Your rate is below 30%. Pause outreach, refine your Exeract targeting, and adjust messaging before continuing.</p>
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
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="h-4 w-4 text-indigo-500" />
        <h4 className="font-semibold text-slate-800 text-sm">Hard Bounce Rate Checker</h4>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        {[
          { label: 'Emails Sent', value: sent, setter: setSent, min: 10, max: 5000, step: 10 },
          { label: 'Hard Bounces', value: bounced, setter: setBounced, min: 0, max: Math.round(sent * 0.1), step: 1 },
        ].map(({ label, value, setter, min, max, step }) => (
          <div key={label}>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">{label}</label>
            <div className="flex items-center gap-3">
              <input
                type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="flex-1"
                style={{ accentColor: isGood ? '#6366f1' : '#ef4444' }}
              />
              <span className="w-12 text-center text-sm font-bold text-slate-800">{value.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={`rounded-xl p-5 flex items-center justify-between border ${isGood ? 'bg-indigo-50 border-indigo-100' : 'bg-red-50 border-red-100'}`}>
        <div>
          <p className={`text-4xl font-black ${isGood ? 'text-indigo-600' : 'text-red-500'}`}>{rate}%</p>
          <p className="text-xs text-slate-500 mt-1">Bounce Rate</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${isGood ? 'bg-indigo-100 text-indigo-700' : 'bg-red-100 text-red-700'}`}>
          {isGood ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
          {isGood ? 'Within Target (0-1%)' : 'Exceeds Limit!'}
        </div>
      </div>
      {!isGood && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-600 mt-3 flex items-center gap-1.5">
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-24 rounded-2xl border border-slate-200 overflow-hidden mb-6 bg-white shadow-sm"
    >
      <div className="bg-white border-b border-slate-200 px-6 sm:px-8 py-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="flex items-center gap-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-800">{section.title}</h2>
        </div>
      </div>
      <div className="px-6 sm:px-8 py-8">
        {children}
      </div>
    </motion.section>
  );
}

// ─── Tip Badge ────────────────────────────────────────────────────────────────
function Tip({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'success' }) {
  const styles = {
    info:    'bg-slate-50 border-slate-200 text-slate-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    success: 'bg-slate-50 border-slate-200 text-slate-700',
  };
  const icons = { info: Info, warning: AlertTriangle, success: CheckCircle };
  const Icon = icons[type];
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border mt-4 ${styles[type]}`}>
      <Icon className="h-4 w-4 mt-0.5 flex-shrink-0 text-indigo-500" />
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}

// ─── Warmup Timeline ─────────────────────────────────────────────────────────
function WarmupTimeline() {
  const phases = [
    { week: 'Week 1',   label: 'Seeding',          emails: '5-10/day',  ramp: 15,  desc: 'Zero cold outreach. Goal: establish basic inbox placement on Gmail and Outlook. Monitor closely - if anything lands in spam, pause and investigate DNS records before continuing.' },
    { week: 'Week 2',   label: 'Stabilising',      emails: '5-10/day',  ramp: 30,  desc: 'Still warm-up only - no cold sends. Positive replies from the warm-up network build your engagement signals. Check postmaster tools for any reputation drop before advancing.' },
    { week: 'Week 3',   label: 'Introducing Cold', emails: '15-20/day', ramp: 50,  desc: 'Start outbound with 5 to 10 cold emails per day alongside your warm-up. Monitor your metrics closely to ensure your domain reputation stays protected.' },
    { week: 'Week 4',   label: 'Building',          emails: '20-30/day', ramp: 70,  desc: 'Increase combined volume to 20-30/day. Positive reply rate on cold emails also acts as a warm-up signal - write copy that earns responses.' },
    { week: 'Weeks 5-6', label: 'Establishing',     emails: '25-35/day', ramp: 85,  desc: 'Warm-up and cold outreach run in parallel at 25-35 total/day. Gradually reduce warm-up volume as cold volume grows. A healthy sender score at this stage means consistent inbox placement across major providers.' },
    { week: 'Week 7+',   label: 'Production',        emails: '30-40/day', ramp: 100, desc: 'Full cold outreach at 30-40 emails/day maximum. Never exceed this cap. Keep warm-up thread running in the background indefinitely to maintain your reputation buffer. This is your steady-state.' },
  ];

  return (
    <div className="mt-6 bg-slate-50/70 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
        <div>
          <h3 className="font-bold text-slate-800 text-base">Warm-Up Protocol</h3>
          <p className="text-xs text-slate-500 mt-0.5">Gradual deliverability ramp-up schedule for domain reputation protection</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700">
            Target: 30-40 Emails/Day
          </span>
        </div>
      </div>

      {/* Full Phase Breakdown List */}
      <div className="space-y-3">
        {phases.map((p, idx) => (
          <div
            key={p.week}
            className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-3 sm:w-44 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                0{idx + 1}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-xs">{p.week}</h4>
                <span className="text-[10px] text-indigo-600 font-medium">{p.label}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 flex-1 leading-relaxed">
              {p.desc}
            </p>

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:w-36 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                {p.emails}
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                {p.ramp}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwZyGgcW4aOIty4lvfSrzF0MKYerX6-DhUmNTJ9bxXCxkR29ZnnzjizWOpsQDNGlcQ2/exec';

function WarmupSubmissionForm() {
  const [outreachIds, setOutreachIds] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!outreachIds.trim() || isSubmitting) return;
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', 'Warmup Protocol');
    formData.append('email', outreachIds);
    formData.append('notes', 'TRU-warm Protocol Submission IDs: ' + outreachIds);
    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formData });
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setOutreachIds(''); }, 4000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an issue submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 mt-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
          <Flame className="h-4 w-4 text-indigo-600" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800">Start Your TRU-warm Protocol</h4>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
            Enter your outreach IDs below. Our team will queue your domains and mailboxes for the strategic human-interaction warm-up sequence.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={outreachIds}
            onChange={(e) => setOutreachIds(e.target.value)}
            placeholder="e.g. name@example.com, user@domain.com..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400 shadow-sm"
          />
        </div>
        <button
          type="submit"
          disabled={!outreachIds.trim() || submitted || isSubmitting}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-sm"
        >
          {isSubmitting ? (
            <><Loader2 className="animate-spin h-4 w-4" /> Sending...</>
          ) : submitted ? (
            <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Done
            </motion.span>
          ) : (
            <><Send className="h-4 w-4" /> Submit</>
          )}
        </button>
      </form>
      <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
        <Info className="h-3 w-3 flex-shrink-0" />
        After submission, you will receive the details shortly.
      </p>
    </div>
  );
}

// ─── DNS Status Visualizer ────────────────────────────────────────────────────
function DnsVisualizer() {
  const [domain, setDomain] = useState('getmycompany.com');
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 mt-5">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">DNS Record Visualizer</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="yoursecondary.com"
          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono placeholder-slate-400 shadow-sm"
        />
        <a
          href="https://easydmarc.com/tools"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
        >
          <Key className="h-4 w-4" /> Check Records
        </a>
      </div>
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
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 mt-5">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Deliverability Copy Analyzer</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your cold email copy here to analyze it for spam triggers..."
        className="w-full h-28 px-3 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none placeholder-slate-400 shadow-sm"
      />
      {text.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Deliverability Score</span>
            <span className={`text-2xl font-black ${score >= 80 ? 'text-indigo-600' : score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>{score}/100</span>
          </div>
          <div className="bg-slate-100 rounded-full h-1.5">
            <motion.div
              className={`h-1.5 rounded-full ${score >= 80 ? 'bg-indigo-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="space-y-1.5 pt-1">
            {hasHtml && <div className="flex items-center gap-2 text-xs text-red-500"><XCircle className="h-3.5 w-3.5" /> HTML formatting detected - use plain text only</div>}
            {hasTracking && <div className="flex items-center gap-2 text-xs text-red-500"><XCircle className="h-3.5 w-3.5" /> Tracking link detected - disable open/click tracking</div>}
            {foundSpam.map(w => (
              <div key={w} className="flex items-center gap-2 text-xs text-amber-500"><AlertTriangle className="h-3.5 w-3.5" /> Spam word: "{w}"</div>
            ))}
            {!hasHtml && !hasTracking && foundSpam.length === 0 && (
              <div className="flex items-center gap-2 text-xs text-indigo-500"><CheckCircle2 className="h-3.5 w-3.5" /> No obvious spam triggers found - good copy!</div>
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

  useEffect(() => { window.scrollTo(0, 0); }, []);

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
    <div className="min-h-screen bg-[#F8FAFF] font-sans text-slate-900 selection:bg-indigo-100">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-14 lg:pt-44 lg:pb-20 overflow-hidden bg-white border-b border-slate-200 shadow-sm">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-100/40 blur-[100px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-5">
              Outbound User Guide
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              A complete, step-by-step guide to building a cold outreach system covering email infrastructure, deliverability, prospecting, messaging, and LinkedIn from start to finish.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
        <div className="flex gap-10 items-start">
          <TableOfContents activeSection={activeSection} />

          <div className="flex-1 min-w-0">

            {/* Section 1 */}
            <SectionCard section={SECTIONS[0]}>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                Protect your primary root domain at all costs. Instead of sending from your main website's domain, purchase <strong className="text-slate-800">dedicated secondary domains</strong> (e.g., if your primary domain is <code className="bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded font-mono text-xs">[yourcompany].com</code>, use <code className="bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded font-mono text-xs">[yourcompany].co.in</code> or <code className="bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded font-mono text-xs">[yourcompany]-email.com</code>).
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-2">
                {[
                  { icon: Shield, title: 'Primary Domain', badge: 'PROTECTED', desc: 'Your main website. Never use it for cold emails. Keep it safe for team messages and customer communications.' },
                  { icon: Globe,  title: 'Secondary Domains', badge: 'FOR OUTREACH', desc: 'Dedicated domains for cold outbound only. Purchase 1 domain per 2 mailboxes. If one is flagged, your primary stays safe.' },
                ].map((card) => (
                  <div key={card.title} className="rounded-xl p-5 border border-slate-200 bg-slate-50">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 bg-slate-200">
                      <card.icon className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-slate-800 text-sm">{card.title}</h4>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-500">{card.badge}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
              <MailboxInfraCalculator />
            </SectionCard>

            {/* Section 2 */}
            <SectionCard section={SECTIONS[1]}>
              <p className="text-slate-600 leading-relaxed mb-5 text-sm">
                Proper DNS configuration is <strong className="text-slate-800">non-negotiable</strong> for bypassing modern spam filters. Expand each record to understand its role.
              </p>
              <div className="space-y-2 mb-4">
                <AuthCard icon={Shield} title="SPF: Sender Policy Framework" badge="TXT Record" desc="Authorizes your email service provider to send emails on your behalf. Without SPF, receiving servers have no way to verify that your ESP is legitimate. Set a strict ~all or -all policy once your sending sources are locked in." />
                <AuthCard icon={Key} title="DKIM: DomainKeys Identified Mail" badge="TXT Record" desc="Adds a cryptographic signature to your emails, proving to the receiving server that the message wasn't tampered with in transit. Most modern ESPs generate DKIM keys automatically. Use 2048-bit for maximum trust." />
                <AuthCard icon={CheckCircle} title="DMARC: Message Authentication, Reporting & Conformance" badge="TXT Record" desc="Instructs receiving servers on what to do if SPF or DKIM fails, preventing domain spoofing. Start with p=none for monitoring, advance to p=quarantine, then p=reject as your confidence grows. Set up rua= for aggregate reports." />
              </div>
              <DnsVisualizer />
              <Tip type="info">All three records (SPF, DKIM, and DMARC) must be correctly configured together. Missing even one significantly increases your spam score.</Tip>
            </SectionCard>

            {/* Section 3 */}
            <SectionCard section={SECTIONS[2]}>
              <p className="text-slate-600 leading-relaxed mb-5 text-sm">
                <strong className="text-slate-800">Never send a single cold email from a fresh domain.</strong> ISPs score every new sender from zero. Your inbox placement, sender score, and domain reputation must be built deliberately over weeks - skipping any phase risks permanent blacklisting that no warm-up tool can undo.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  { title: 'Avoid Automation', desc: 'Standard automated warm-up tools are increasingly detected by major email providers. Gmail and Outlook now flag coordinated warm-up network patterns.' },
                  { title: 'The Manual Approach', desc: 'We recommend TRU-warm by Mailineers to naturally build sender reputation through strategic, high-engagement human interactions for email warmups.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <h4 className="font-bold text-sm mb-1.5 text-slate-700">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <WarmupTimeline />
              <WarmupSubmissionForm />
            </SectionCard>

            {/* Section 4 */}
            <SectionCard section={SECTIONS[3]}>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                After 2 to 3 weeks of warmup, you can gradually begin your outbound campaigns. However, sudden volume spikes are the <strong className="text-slate-800">fastest way to trigger algorithmic blacklists.</strong> These thresholds are non-negotiable during cold outreach.
              </p>
              <div className="grid md:grid-cols-3 gap-3 mb-6">
                {[
                  { icon: TrendingUp, value: '+2 to 5', label: 'Daily Volume Increase', sub: 'Gradually scale after warm-up' },
                  { icon: Shield, value: '30-40', label: 'Max Emails / Mailbox / Day', sub: 'Hard cap per mailbox' },
                  { icon: Activity, value: '~10-15', label: 'Mins Between Emails', sub: 'Mimic human send rhythm' },
                ].map(({ icon: Icon, value, label, sub }) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-5 w-5 text-slate-500" />
                    </div>
                    <p className="text-3xl font-black text-slate-800 mb-1">{value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 mb-2">
                <h4 className="font-bold text-slate-800 mb-1.5 text-sm flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-indigo-500" /> Human Mimicry &amp; Drip Pacing
                </h4>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">ESPs flag timestamp density. Never send in batches. Distribute your daily limit unevenly to break algorithmic pattern recognition.</p>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  <div className="border border-slate-200 rounded-lg p-3 bg-white">
                    <div className="flex items-start gap-2">
                      <XCircle className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-slate-700 block mb-0.5">Avoid Batching</span>
                        <span className="text-xs text-slate-500 leading-relaxed block">Sending 10+ emails at the exact same time triggers spam filters.</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-indigo-200 rounded-lg p-3 bg-indigo-50/50">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-indigo-700 block mb-0.5">Variable Drip</span>
                        <span className="text-xs text-slate-500 leading-relaxed block">Space emails out randomly to mimic real human typing speed.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">Ideal Settings</span>
                  {['Min Delay: 7-9 mins', 'Max Delay: 14-20 mins'].map(s => (
                    <span key={s} className="bg-white border border-slate-200 px-3 py-1 rounded-full text-[11px] font-medium text-slate-600">{s}</span>
                  ))}

                </div>
              </div>
              <VolumeCalculator />
            </SectionCard>

            {/* Section 5 */}
            <SectionCard section={SECTIONS[4]}>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                Deliverability is not just technical; it is heavily influenced by how you structure your copy and manage opt-outs.
              </p>
              <div className="space-y-4 mb-4">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4 text-indigo-500" /> CAN-SPAM Compliance
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Always include your physical business address in the email footer',
                      'Subject lines must accurately reflect the email content - no misleading subject lines',
                      'Honor opt-out requests within 10 business days',
                      "Never use deceptive 'From' names or domains",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-indigo-500" /> The Soft Unsubscribe Technique
                  </h4>
                  <p className="text-sm text-slate-500 mb-3">Instead of a hyperlinked Unsubscribe button (which triggers promotional filters), use conversational opt-outs in your sign-off:</p>
                  <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                    <p className="text-[10px] font-bold text-indigo-600 mb-2 uppercase tracking-wider">Example Sign-off</p>
                    <p className="text-sm text-slate-700 italic leading-relaxed">
                      "If this isn't relevant to you right now, just let me know and I'll make sure not to reach out again."
                    </p>
                  </div>
                  <Tip type="success">This conversational approach avoids promotional filter triggers while still giving recipients a clear and respectful way to opt out.</Tip>
                </div>
              </div>
              <EmailCopyAnalyzer />
            </SectionCard>

            {/* Section 6 */}
            <SectionCard section={SECTIONS[5]}>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                <strong className="text-slate-800">Bad data ruins good domains.</strong> Precision targeting is the core of a sustainable outbound system.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { step: '1', title: 'Multi-Point Sourcing', desc: 'Gather raw prospect data from your preferred data providers (Apollo, ZoomInfo, LinkedIn Sales Nav, etc.)', badge: 'Your Input' },
                  { step: '2', title: 'Exeract ICP Validation', desc: 'Feed raw data directly into Exeract. Our AI module conducts automated outbound qualification, actively researching leads to ensure they strictly match your Ideal Customer Profile before a single email is drafted.', badge: 'Exeract AI' },
                  { step: '3', title: 'Email Verification', desc: 'Run the Exeract-validated list through a rigorous email verification protocol to catch catch-all and invalid addresses. Your goal: hard bounce rate of strictly 0-1%.', badge: 'Final Step' },
                ].map((item, i) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-black">{item.step}</div>
                      {i < 2 && <div className="w-px flex-1 bg-slate-200 mt-1 min-h-[1.5rem]" />}
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-4 flex-1 mb-2 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">{item.badge}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 text-indigo-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Why Exeract ICP Validation Matters</h4>
                    <p className="text-xs text-slate-500">Before one email is drafted</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Bounce Rate Target', value: '0-1%' },
                    { label: 'AI Research Depth', value: 'Full Site' },
                    { label: 'Qualification Mode', value: 'Automated' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white rounded-xl p-3 text-center border border-slate-200">
                      <p className="text-lg font-black text-indigo-600">{value}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <BounceCalculator />
            </SectionCard>

            {/* Section 7 */}
            <SectionCard section={SECTIONS[6]}>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                When configuring your sending tools (like Yesware, Smartlead, or Instantly), <strong className="text-slate-800">optimize for plain text above all else.</strong>
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  { title: 'Disable Tracking', icon: Eye, desc: 'Turn off open and click tracking. Tracking pixels insert HTML images and redirect links into your copy, which heavily penalize your deliverability score.', action: 'Set tracking = OFF', accent: false },
                  { title: 'Plain Text Format', icon: Mail, desc: 'Stick to plain-text emails with zero formatting. They render perfectly across all devices and feel like a genuine 1-to-1 message from a peer.', action: 'Format = Plain Text', accent: true },
                ].map((item) => (
                  <div key={item.title} className={`rounded-xl border p-5 ${item.accent ? 'border-indigo-200 bg-indigo-50/50' : 'border-slate-200 bg-slate-50'}`}>
                    <item.icon className={`h-5 w-5 mb-3 ${item.accent ? 'text-indigo-500' : 'text-slate-500'}`} />
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">{item.desc}</p>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${item.accent ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'}`}>→ {item.action}</span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Email Format Comparison</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                      <XCircle className="h-3.5 w-3.5 text-red-500" />
                      <span className="text-xs font-bold text-slate-600">HTML / Tracked Email</span>
                    </div>
                    <div className="p-4 text-xs text-slate-500 font-mono space-y-1">
                      <p className="text-blue-500 underline">Hi [First Name],</p>
                      <p>Check out our <span className="bg-yellow-100 px-1 text-slate-700">[tracked link]</span></p>
                      <p className="text-slate-400">&lt;img src="pixel.gif"&gt;</p>
                      <p className="text-slate-400">&lt;div style="font-size:14px"&gt;</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-indigo-200 overflow-hidden shadow-sm">
                    <div className="bg-indigo-50 px-4 py-2 border-b border-indigo-100 flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                      <span className="text-xs font-bold text-indigo-700">Plain Text Email</span>
                    </div>
                    <div className="p-4 text-xs text-slate-700 space-y-1">
                      <p>Hi Sarah,</p>
                      <p className="mt-2">Saw you're scaling your SDR team at Acme. Wanted to share how we helped a similar team cut research time by 70%.</p>
                      <p className="mt-2">Worth a quick call this week?</p>
                      <p className="mt-2">James</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Section 8 */}
            <SectionCard section={SECTIONS[7]}>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                Combining email with LinkedIn creates a <strong className="text-slate-800">"warm outbound" effect</strong>, but automation limits are tighter than ever.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Max Connection Requests / Day', value: '20-30', icon: Users },
                  { label: 'Warm-Up Period Before Connecting', value: '1-2 wks', icon: Clock },
                  { label: 'Minimum Acceptance Rate', value: '30%', icon: TrendingUp },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="text-2xl font-black text-slate-800">{value}</p>
                    <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">{label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { step: '1', title: 'Engagement-First Warm-Up', desc: 'Warm up prospects for 1-2 weeks before connecting. View their profiles, like 2-3 posts, and leave thoughtful comments. By the time your connection request arrives, they already recognize your name.', icon: Eye },
                  { step: '2', title: 'Cloud-Based Tools Only', desc: 'Always prioritize cloud-based platforms (Expandi, Lemlist, Dripify) over browser extensions. Extensions leave detectable code fingerprints that LinkedIn actively monitors and penalizes.', icon: Server },
                  { step: '3', title: 'Monitor Acceptance Rate', desc: "If your acceptance rate drops below 30%, LinkedIn's algorithm will flag you as a spammer. Pause immediately, refine your Exeract targeting, and adjust messaging before resuming.", icon: TrendingUp },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-indigo-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <LinkedInCalculator />
            </SectionCard>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
