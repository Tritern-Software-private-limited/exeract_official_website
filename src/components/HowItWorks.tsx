import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  CheckCircle2,
  HelpCircle,
  XCircle,
  ArrowRight,
  Search,
  X,
  AlertTriangle,
  Edit2,
} from 'lucide-react';
import { content, type ContentType } from '../utils/content';
import { SectionLoader } from './SectionLoader';

/* ─── Static config per tool card ───────────────────────────────────────── */
interface ICPConfig {
  id: string;
  icon: React.ElementType;
  accentColor: string;
  border: string;
  iconBg: string;
  iconColor: string;
  badgeColor: string;
  ctaHref: string;
  ctaLabel: string;
  ctaClass: string;
  keywords: string[];
  mockLines: { name: string; domain: string; status: string }[];
}

const TOOL_CONFIG = [
  /* ICP Validation */
  {
    id: 'icp',
    icon: Building2,
    accentColor: '#00D4AA',
    border: 'border-emerald-200/60',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    ctaHref: '/how-it-works',
    ctaLabel: 'Explore ICP Validation',
    ctaClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    keywords: [
      'Custom Software Development',
      'LLM Development',
      'Website Development',
    ],
    mockLines: [
      { name: 'Tritern', domain: 'tritern.com', status: 'yes' },
      { name: 'Globex', domain: 'globex.com', status: 'consider' },
      { name: 'Demantri', domain: 'demantri.com', status: 'no' },
    ],
  },
  /* Email Verification */
  {
    id: 'email',
    icon: Building2,
    accentColor: '#8b5cf6',
    border: 'border-violet-200/60',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
    ctaHref: '/email-verification',
    ctaLabel: 'Explore Email Verification',
    ctaClass: 'bg-violet-600 hover:bg-violet-700 text-white',
    mockLines: [
      { email: 'john@acme-corp.com', status: 'Valid', safe: true },
      { email: 'info@techflow.io', status: 'Catch-all', safe: false },
      { email: 'ceo@nexus-labs.ai', status: 'Valid', safe: true },
      { email: 'noreply@defunct-co.com', status: 'Invalid', safe: false, invalid: true },
    ],
  },
];

/* ─── ICP Mini Preview ───────────────────────────────────────────────────── */
function ICPPreview({ cfg }: { cfg: ICPConfig }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
      {/* Keyword input area */}
      <div className="px-3 pt-3 pb-2 bg-white border-b border-gray-100">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono mb-2">
          <Search size={10} className="text-gray-300" />
          <span>ICP Keywords</span>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="ml-auto w-1.5 h-1.5 rounded-full"
            style={{ background: cfg.accentColor }}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {cfg.keywords.map((kw, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold"
            >
              {kw}
              <X size={9} className="text-emerald-400 cursor-pointer" />
            </motion.span>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="divide-y divide-gray-100">
        {cfg.mockLines.map((row: any, ri) => (
          <motion.div
            key={ri}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 + ri * 0.1 }}
            className="flex items-center justify-between px-3 py-2"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-navy text-[11px]">{row.name}</span>
              <span className="text-[10px] font-mono text-gray-400">{row.domain}</span>
            </div>
            <div>
              {row.status === 'yes' && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700">
                  <CheckCircle2 size={9} /> YES
                </span>
              )}
              {row.status === 'consider' && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600">
                  <HelpCircle size={9} /> CONSIDER
                </span>
              )}
              {row.status === 'no' && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600">
                  <XCircle size={9} /> NO
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Email Mini Preview ─────────────────────────────────────────────────── */
function EmailPreview({ cfg }: { cfg: typeof TOOL_CONFIG[1] }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
      {/* Header bar */}
      <div className="px-3 py-2.5 bg-white border-b border-gray-100 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-gray-700 tracking-wide">Catch-All Risk Rating System</span>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: cfg.accentColor }}
        />
      </div>
      {/* Rows */}
      <div className="divide-y divide-gray-100">
        {cfg.mockLines.map((row: any, ri) => (
          <motion.div
            key={ri}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + ri * 0.1 }}
            className="flex items-center justify-between px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  row.status === 'Valid' ? 'bg-green-500' : row.status === 'Invalid' ? 'bg-red-500' : 'bg-amber-400'
                }`}
              />
              <span className="text-[11px] font-mono text-gray-600">{row.email}</span>
            </div>
            {row.status === 'Valid' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700">
                <CheckCircle2 size={9} /> {row.status}
              </span>
            ) : row.status === 'Invalid' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600">
                <XCircle size={9} /> {row.status}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-600">
                <AlertTriangle size={9} /> {row.status}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Props ──────────────────────────────────────────────────────────────── */
interface HowItWorksProps {
  isAdmin?: boolean;
  onEdit?: () => void;
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export function HowItWorks({ isAdmin, onEdit }: HowItWorksProps) {
  const [data, setData] = useState<ContentType['howItWorks'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const next = await content.getContent();
        if (!active) return;
        setData(next.howItWorks);
        setError(null);
      } catch {
        if (!active) return;
        setError('Failed to load content');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    const handleUpdate = () => {
      content
        .getContent()
        .then((next) => {
          if (!active) return;
          setData(next.howItWorks);
          setError(null);
        })
        .catch(() => {
          if (!active) return;
          setError('Failed to load content');
        });
    };
    window.addEventListener('contentUpdated', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('contentUpdated', handleUpdate);
    };
  }, []);

  if (loading)
    return (
      <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLoader label="Loading tools" />
        </div>
      </section>
    );

  if (error || !data)
    return (
      <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">Unable to load content.</div>
        </div>
      </section>
    );

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
      {isAdmin && onEdit && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-navy text-xs font-bold border border-gray-200 shadow-sm hover:bg-gray-50"
          >
            <Edit2 size={14} /> Edit Section
          </button>
        </div>
      )}

      {/* Soft background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary bg-primary/8 rounded-full border border-primary/15 mb-4">
              {data.sectionTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4">
              {data.heading}
            </h2>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
              {data.description}
            </p>
          </motion.div>
        </div>

        {/* ── Tool Cards ── */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {data.steps.map((step, index) => {
            const cfg = TOOL_CONFIG[index % TOOL_CONFIG.length];
            const Icon = cfg.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.15 }}
                className={`relative rounded-2xl bg-white border ${cfg.border} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col`}
              >
                {/* Top accent bar */}
                <div
                  className="h-[3px] w-full flex-shrink-0"
                  style={{ background: `linear-gradient(90deg, ${cfg.accentColor}, transparent)` }}
                />

                <div className="p-7 sm:p-8 flex flex-col gap-5 flex-grow">
                  {/* ── Icon + Title ── */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl ${cfg.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={cfg.iconColor} size={22} />
                    </div>
                    <h3 className="text-xl font-bold text-navy leading-tight">{step.title}</h3>
                  </div>

                  {/* ── Description ── */}
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>

                  {/* ── Mini Live Preview ── */}
                  <div className="flex-grow">
                    {index === 0 ? (
                      <ICPPreview cfg={TOOL_CONFIG[0] as ICPConfig} />
                    ) : (
                      <EmailPreview cfg={TOOL_CONFIG[1]} />
                    )}
                  </div>

                  {/* ── CTA Button ── */}
                  <div className="mt-auto pt-1">
                    <a
                      href={cfg.ctaHref}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${cfg.ctaClass}`}
                    >
                      {cfg.ctaLabel}
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
