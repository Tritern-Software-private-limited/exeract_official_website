import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

/* ── types ─────────────────────────────────────────────── */
interface Lead {
  id: number;
  domain: string;
  match: boolean;
  confidence: number;
  keywords: string[];
  status: 'verified' | 'rejected' | 'scanning';
}

const LEADS: Lead[] = [
  { id: 1, domain: 'acme-corp.com',    match: true,  confidence: 98, keywords: ['SaaS','B2B','Enterprise'], status: 'verified' },
  { id: 2, domain: 'techflow.io',      match: true,  confidence: 91, keywords: ['B2B','Sales','CRM'],       status: 'verified' },
  { id: 3, domain: 'generic-shop.net', match: false, confidence: 12, keywords: [],                           status: 'rejected' },
  { id: 4, domain: 'nexus-labs.ai',    match: true,  confidence: 85, keywords: ['AI','Enterprise'],         status: 'scanning' },
];

/* pulse ring animation config */
const PULSE_COLORS = ['#00D4AA', '#0099FF', '#00D4AA', '#f87171'];

/* ── leaf card ──────────────────────────────────────────── */
function LeadCard({ lead, delay }: { lead: Lead; delay: number }) {
  const [progress, setProgress] = useState(lead.status === 'scanning' ? 0 : lead.confidence);
  const [scanning, setScanning] = useState(lead.status === 'scanning');

  useEffect(() => {
    if (lead.status !== 'scanning') return;
    const t = setTimeout(() => {
      // animate progress to final
      let v = 0;
      const step = setInterval(() => {
        v += 3;
        setProgress(Math.min(v, lead.confidence));
        if (v >= lead.confidence) { clearInterval(step); setScanning(false); }
      }, 30);
    }, delay * 600 + 1200);
    return () => clearTimeout(t);
  }, [lead, delay]);

  const Color = lead.match
    ? 'from-primary/20 to-primary/5 border-primary/30'
    : 'from-red-500/20 to-red-500/5 border-red-500/30';
  const dot = lead.match ? 'bg-primary' : 'bg-red-400';
  const bar = lead.match ? 'from-primary to-secondary' : 'from-red-400 to-red-600';
  const label = scanning ? 'Scanning…' : lead.match ? 'Verified ✓' : 'Rejected ✗';
  const labelColor = scanning ? 'text-amber-400' : lead.match ? 'text-primary' : 'text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.18, duration: 0.5, ease: 'easeOut' }}
      className={`relative rounded-xl p-3 bg-gradient-to-br ${Color} border backdrop-blur-sm shadow-lg`}
    >
      {/* scanning shimmer */}
      {scanning && (
        <motion.div
          className="absolute inset-0 rounded-xl overflow-hidden"
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent" />
        </motion.div>
      )}

      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot} ${scanning ? 'animate-pulse' : ''}`} />
        <span className="text-white text-xs font-mono font-semibold truncate">{lead.domain}</span>
        <span className={`ml-auto text-[10px] font-bold ${labelColor}`}>{label}</span>
      </div>

      {/* confidence bar */}
      <div className="w-full bg-white/10 rounded-full h-1.5 mb-2 overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: delay * 0.18 + 0.3 }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1 flex-wrap">
          {lead.keywords.slice(0, 2).map(k => (
            <span key={k} className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] text-gray-300 font-medium">{k}</span>
          ))}
        </div>
        <span className="text-[11px] font-bold text-white">{progress}%</span>
      </div>
    </motion.div>
  );
}

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
        style={{ background: 'rgba(15,23,42,0.82)', borderColor: color + '40' }}
      >
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
        <span className="text-xs font-bold text-white">{value}</span>
        <span className="text-[10px] text-gray-400">{label}</span>
      </div>
    </motion.div>
  );
}

/* ── main component ─────────────────────────────────────── */
export function FeaturesVisual() {
  const ref = useRef<HTMLDivElement>(null);

  /* spring mouse tracking for parallax */
  const rawX = useRef(0);
  const rawY = useRef(0);
  const springX = useSpring(0, { stiffness: 80, damping: 20 });
  const springY = useSpring(0, { stiffness: 80, damping: 20 });

  const rotateX = useTransform(springY, [-1, 1], [6, -6]);
  const rotateY = useTransform(springX, [-1, 1], [-8, 8]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    rawX.current = ((e.clientX - left) / width - 0.5) * 2;
    rawY.current = ((e.clientY - top) / height - 0.5) * 2;
    springX.set(rawX.current);
    springY.set(rawY.current);
  }
  function onMouseLeave() { springX.set(0); springY.set(0); }

  /* animated batch counter */
  const [count, setCount] = useState(0);
  useEffect(() => {
    let v = 0;
    const iv = setInterval(() => {
      v += 47;
      setCount(Math.min(v, 5000));
      if (v >= 5000) clearInterval(iv);
    }, 18);
    return () => clearInterval(iv);
  }, []);

  /* animated accuracy ring */
  const circumference = 2 * Math.PI * 30;
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
      style={{ minHeight: 480, perspective: 900 }}
    >
      {/* glow blobs */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full blur-3xl opacity-30" style={{ background: '#00D4AA' }} />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ background: '#0099FF' }} />
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
            <span className="text-[10px] font-mono text-gray-500">exeract · verification engine</span>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          </div>

          <div className="p-4 space-y-3">
            {/* batch stats row */}
            <div className="flex items-center gap-3 mb-1">
              {/* SVG ring */}
              <div className="relative flex-shrink-0" style={{ width: 72, height: 72 }}>
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="30" fill="none" stroke="#1e293b" strokeWidth="6" />
                  <motion.circle
                    cx="36" cy="36" r="30"
                    fill="none" stroke="url(#ringGrad)" strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference - dash }}
                    transition={{ duration: 1.4, ease: 'easeOut', delay: 0.6 }}
                    transform="rotate(-90 36 36)"
                  />
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00D4AA" />
                      <stop offset="100%" stopColor="#0099FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white text-base font-black leading-none">95%</span>
                  <span className="text-[8px] text-gray-500 mt-0.5">accuracy</span>
                </div>
              </div>

              <div className="flex-1 space-y-1.5">
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-gray-400">Leads scanned</span>
                    <span className="text-primary font-bold font-mono">{count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: '78%' }}
                      transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-[9px] text-gray-400">3,890 matched</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="text-[9px] text-gray-400">1,110 filtered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* keyword tags */}
            <div className="flex flex-wrap gap-1.5">
              {['SaaS','B2B','Enterprise','Sales','CRM'].map((kw, i) => (
                <motion.span
                  key={kw}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                  style={{
                    background: `rgba(0,212,170,${0.08 + i * 0.02})`,
                    borderColor: `rgba(0,212,170,${0.2 + i * 0.04})`,
                    color: '#a7f3d0'
                  }}
                >
                  #{kw}
                </motion.span>
              ))}
            </div>

            {/* divider */}
            <div className="border-t border-white/5" />

            {/* lead cards */}
            <div className="space-y-2">
              {LEADS.map((lead, i) => <LeadCard key={lead.id} lead={lead} delay={i} />)}
            </div>
          </div>
        </div>

        {/* ── floating stat badges (separate layers for depth) ── */}
        <StatBadge value="10x" label="faster"        color="#00D4AA"  x="-28%" y="8%"  layerZ={10} />
        <StatBadge value="95%" label="accuracy"      color="#0099FF"  x="82%"  y="18%" layerZ={12} />
        <StatBadge value="5K"  label="leads/min"     color="#a78bfa"  x="-22%" y="72%" layerZ={11} />
        <StatBadge value="CRM" label="integrated"    color="#fbbf24"  x="76%"  y="80%" layerZ={9}  />
      </motion.div>
    </div>
  );
}
