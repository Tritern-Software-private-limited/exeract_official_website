import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react';

/* ── types ─────────────────────────────────────────────── */
interface Lead {
  id: number;
  name: string;
  domain: string;
  status: 'yes' | 'consider' | 'no';
  color: string;
}

interface EmailRow {
  id: number;
  email: string;
  status: 'valid' | 'catch-all' | 'invalid';
  score: number;
}

const LEADS: Lead[] = [
  { id: 1, name: 'Tritern', domain: 'tritern.com', status: 'yes', color: '#00D4AA' },
  { id: 2, name: 'Globex', domain: 'globex.com', status: 'consider', color: '#fbbf24' },
  { id: 3, name: 'Demantri', domain: 'demantri.com', status: 'no', color: '#f87171' },
];

const EMAILS: EmailRow[] = [
  { id: 1, email: 'john@acme-corp.com',   status: 'valid',    score: 97 },
  { id: 2, email: 'info@techflow.io',     status: 'catch-all', score: 52 },
  { id: 3, email: 'ceo@nexus-labs.ai',    status: 'valid',    score: 94 },
];

const STATUS_CONFIG = {
  valid:     { color: '#00D4AA', label: 'Valid ✓',    textClass: 'text-primary' },
  'catch-all': { color: '#fbbf24', label: 'Catch-all ⚠', textClass: 'text-amber-400' },
  invalid:   { color: '#f87171', label: 'Invalid ✗',  textClass: 'text-red-400' },
};

/* ── floating stat badge ────────────────────────────────── */
function StatBadge({
  value, label, color, x, y, layerZ,
}: { value: string; label: string; color: string; x: string; y: string; layerZ: number }) {
  return (
    <motion.div
      style={{ left: x, top: y, zIndex: layerZ }}
      className="absolute pointer-events-none"
      animate={{ y: ['0px', '-6px', '0px'] }}
      transition={{ repeat: Infinity, duration: 3 + layerZ * 0.5, ease: 'easeInOut' }}
    >
      <div
        className="px-3 py-1.5 rounded-xl border backdrop-blur-md shadow-xl flex items-center gap-2 whitespace-nowrap"
        style={{ background: 'rgba(15,23,42,0.85)', borderColor: color + '40' }}
      >
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
        <span className="text-xs font-bold text-white">{value}</span>
        <span className="text-[10px] text-gray-400">{label}</span>
      </div>
    </motion.div>
  );
}

/* ── ICP lead row ─────────────────────────────────────────── */
function LeadRow({ lead, delay }: { lead: Lead; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.15 + 0.3, duration: 0.45 }}
      className="flex items-center justify-between py-1"
    >
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: lead.color }} />
        <div className="flex items-baseline gap-1.5">
          <span className="text-white text-[11px] font-semibold">{lead.name}</span>
          <span className="text-[10px] font-mono text-gray-400">{lead.domain}</span>
        </div>
      </div>
      <div>
        {lead.status === 'yes' && (
          <span className="text-[9px] bg-green-500/10 border border-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 size={10} /> YES
          </span>
        )}
        {lead.status === 'consider' && (
          <span className="text-[9px] bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <HelpCircle size={10} /> CONSIDER
          </span>
        )}
        {lead.status === 'no' && (
          <span className="text-[9px] bg-red-500/10 border border-red-500/20 text-red-400 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <XCircle size={10} /> NO
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ── Email row ────────────────────────────────────────────── */
function EmailRow2({ row, delay }: { row: EmailRow; delay: number }) {
  const cfg = STATUS_CONFIG[row.status];
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.15 + 0.3, duration: 0.45 }}
      className="flex items-center gap-2"
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
      <span className="text-[11px] font-mono text-gray-300 flex-1 truncate">{row.email}</span>
      <span className={`text-[10px] font-bold ${cfg.textClass}`}>{cfg.label}</span>
    </motion.div>
  );
}

/* ── main component ─────────────────────────────────────── */
export function FeaturesVisual() {
  const ref = useRef<HTMLDivElement>(null);

  const springX = useSpring(0, { stiffness: 80, damping: 20 });
  const springY = useSpring(0, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(springY, [-1, 1], [6, -6]);
  const rotateY = useTransform(springX, [-1, 1], [-8, 8]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    springX.set(((e.clientX - left) / width - 0.5) * 2);
    springY.set(((e.clientY - top) / height - 0.5) * 2);
  }
  function onMouseLeave() { springX.set(0); springY.set(0); }

  /* animated counters */
  const [icpCount, setIcpCount] = useState(0);
  const [emailCount, setEmailCount] = useState(0);
  useEffect(() => {
    let v = 0;
    const iv = setInterval(() => {
      v += 47;
      setIcpCount(Math.min(v, 5000));
      if (v >= 5000) clearInterval(iv);
    }, 18);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    let v = 0;
    const iv = setInterval(() => {
      v += 61;
      setEmailCount(Math.min(v, 6000));
      if (v >= 6000) clearInterval(iv);
    }, 18);
    return () => clearInterval(iv);
  }, []);

  /* accuracy ring */
  const circumference = 2 * Math.PI * 26;
  const [ringProgress, setRingProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setRingProgress(95), 400);
    return () => clearTimeout(t);
  }, []);
  const dash = (ringProgress / 100) * circumference;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{ minHeight: 520, perspective: 900 }}
    >
      {/* glow blobs */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full blur-3xl opacity-25" style={{ background: '#00D4AA' }} />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ background: '#8b5cf6' }} />
      </div>

      {/* ── 3-D tilt card ── */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full max-w-sm"
      >
        {/* main panel */}
        <div
          className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
          style={{ background: 'linear-gradient(145deg,#131c2e,#0d1524)', transformStyle: 'preserve-3d' }}
        >
          {/* header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div className="flex gap-1.5">
              {['#f87171','#fbbf24','#34d399'].map(c => (
                <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <span className="text-[10px] font-mono text-gray-500">exeract · unified engine</span>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          </div>

          <div className="p-4 space-y-4">

            {/* ── ICP Validation block ── */}
            <div>
              {/* section label */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">ICP Validation</span>
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[10px] text-gray-500 font-mono">{icpCount.toLocaleString()} scanned</span>
              </div>

              {/* mini accuracy ring + progress */}
              <div className="flex items-center gap-3 mb-2.5">
                <div className="relative flex-shrink-0" style={{ width: 60, height: 60 }}>
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="26" fill="none" stroke="#1e293b" strokeWidth="5" />
                    <motion.circle
                      cx="30" cy="30" r="26"
                      fill="none" stroke="url(#ringGrad)" strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset: circumference - dash }}
                      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.6 }}
                      transform="rotate(-90 30 30)"
                    />
                    <defs>
                      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00D4AA" />
                        <stop offset="100%" stopColor="#0099FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-white text-sm font-black leading-none">95%</span>
                    <span className="text-[8px] text-gray-500 mt-0.5">accuracy</span>
                  </div>
                </div>

                <div className="flex-1 space-y-1.5">
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-gray-400">Matched</span>
                      <span className="text-primary font-bold">3,890</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }} animate={{ width: '78%' }}
                        transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }} />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-[9px] text-gray-400">3,890 matched</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span className="text-[9px] text-gray-400">1,110 filtered</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* keyword tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {['SaaS','B2B','Enterprise','CRM'].map((kw, i) => (
                  <motion.span key={kw}
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold border"
                    style={{ background: 'rgba(0,212,170,0.08)', borderColor: 'rgba(0,212,170,0.25)', color: '#a7f3d0' }}
                  >
                    #{kw}
                  </motion.span>
                ))}
              </div>

              {/* lead rows */}
              <div className="space-y-1.5">
                {LEADS.map((lead, i) => <LeadRow key={lead.id} lead={lead} delay={i} />)}
              </div>
            </div>

            {/* ── divider ── */}
            <div className="border-t border-white/8" />

            {/* ── Email Verification block ── */}
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Email Verification</span>
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[10px] text-gray-500 font-mono">{emailCount.toLocaleString()} checked</span>
              </div>

              {/* email stats */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: 'Valid', value: '94%', color: '#00D4AA' },
                  { label: 'Catch-all', value: '4%', color: '#fbbf24' },
                  { label: 'Invalid', value: '2%', color: '#f87171' },
                ].map(stat => (
                  <div key={stat.label}
                    className="rounded-lg p-2 text-center"
                    style={{ background: stat.color + '12', border: `1px solid ${stat.color}30` }}
                  >
                    <p className="text-sm font-black" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* email rows */}
              <div className="space-y-1.5">
                {EMAILS.map((row, i) => <EmailRow2 key={row.id} row={row} delay={i} />)}
              </div>
            </div>

          </div>
        </div>

        {/* ── floating stat badges ── */}
        <StatBadge value="10x"  label="faster"        color="#00D4AA" x="-30%" y="6%"  layerZ={10} />
        <StatBadge value="95%"  label="ICP accuracy"  color="#0099FF" x="80%"  y="16%" layerZ={12} />
        <StatBadge value="6K"   label="emails/batch"  color="#8b5cf6" x="-24%" y="70%" layerZ={11} />
        <StatBadge value="✓"    label="catch-all safe" color="#fbbf24" x="78%"  y="78%" layerZ={9}  />
      </motion.div>
    </div>
  );
}
