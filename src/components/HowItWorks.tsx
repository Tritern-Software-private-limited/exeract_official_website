import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  MailCheck,
  CheckCircle2,
  HelpCircle,
  XCircle,
  ArrowRight,
  Search,
  X,
  Edit2,
  BadgeCheck,
  ShieldAlert,
  Zap,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';
import { content, type ContentType } from '../utils/content';
import { SectionLoader } from './SectionLoader';

/* ─── Tool Configurations & Types ────────────────────────────────────────── */
interface ICPToolConfig {
  id: string;
  icon: React.ElementType;
  badgeText: string;
  accentGradient: string;
  cardShadow: string;
  iconShadow: string;
  cardBg: string;
  border: string;
  badgeBg: string;
  ctaHref: string;
  ctaLabel: string;
  ctaBtnClass: string;
  keywords: string[];
  mockLines: { name: string; domain: string; match: string; status: string }[];
}

interface EmailToolConfig {
  id: string;
  icon: React.ElementType;
  badgeText: string;
  accentGradient: string;
  cardShadow: string;
  iconShadow: string;
  cardBg: string;
  border: string;
  badgeBg: string;
  ctaHref: string;
  ctaLabel: string;
  ctaBtnClass: string;
  mockLines: { email: string; status: string }[];
}

const ICP_TOOL: ICPToolConfig = {
  id: 'icp',
  icon: Target,
  badgeText: 'Real-time Qualification',
  accentGradient: 'from-emerald-500 to-teal-600',
  cardShadow: 'shadow-md hover:shadow-lg',
  iconShadow: 'shadow-sm',
  cardBg: 'bg-gradient-to-b from-white via-slate-50/50 to-white',
  border: 'border-slate-200/80',
  badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  ctaHref: '/how-it-works',
  ctaLabel: 'Explore ICP Validation',
  ctaBtnClass:
    'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md hover:shadow-lg hover:opacity-95 active:scale-[0.98]',
  keywords: [
    'Custom Software Development',
    'LLM Development',
    'Website Development',
  ],
  mockLines: [
    { name: 'Tritern', domain: 'tritern.com', match: '98% Match', status: 'yes' },
    { name: 'Globex', domain: 'globex.com', match: '74% Match', status: 'consider' },
    { name: 'Demantri', domain: 'demantri.com', match: '22% Match', status: 'no' },
  ],
};

const EMAIL_TOOL: EmailToolConfig = {
  id: 'email',
  icon: MailCheck,
  badgeText: 'Catch-All Deliverability Engine',
  accentGradient: 'from-violet-500 to-indigo-600',
  cardShadow: 'shadow-md hover:shadow-lg',
  iconShadow: 'shadow-sm',
  cardBg: 'bg-gradient-to-b from-white via-slate-50/50 to-white',
  border: 'border-slate-200/80',
  badgeBg: 'bg-violet-50 text-violet-700 border-violet-200/80',
  ctaHref: '/email-verification',
  ctaLabel: 'Explore Email Verification',
  ctaBtnClass:
    'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:opacity-95 active:scale-[0.98]',
  mockLines: [
    { email: 'john@acme-corp.com', status: 'Valid' },
    { email: 'info@techflow.io', status: 'Catch-all' },
    { email: 'ceo@nexus-labs.ai', status: 'Valid' },
    { email: 'noreply@defunct-co.com', status: 'Invalid' },
  ],
};

/* ─── ICP Mini SaaS Preview Widget ───────────────────────────────────────── */
function ICPPreview({ cfg }: { cfg: ICPToolConfig }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50/80 to-white shadow-sm overflow-hidden">
      {/* Top Chrome Header Bar */}
      <div className="px-3.5 py-2.5 bg-slate-100/70 border-b border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 shadow-2xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-2xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-2xs" />
          <span className="ml-2 text-[11px] font-mono text-slate-500 flex items-center gap-1">
            <Layers className="h-3 w-3 text-emerald-500" />
            https://app.exeract.com/
          </span>
        </div>
      </div>

      {/* Keywords section */}
      <div className="p-3 bg-white/70 border-b border-slate-100">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 font-medium">
          <span className="flex items-center gap-1">
            <Search size={11} className="text-slate-400" /> Target ICP Keywords
          </span>
          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-400 font-mono">
            3 Active
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {cfg.keywords.map((kw, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-emerald-800 text-[11px] font-medium shadow-2xs"
            >
              {kw}
              <X size={10} className="text-emerald-500 cursor-pointer" />
            </span>
          ))}
        </div>
      </div>

      {/* Company Inspection List */}
      <div className="divide-y divide-slate-100/80">
        {cfg.mockLines.map((row, ri) => (
          <div
            key={ri}
            className="flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-50/80 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200/60 flex items-center justify-center font-bold text-xs text-navy shadow-2xs">
                {row.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-navy text-xs flex items-center gap-1.5">
                  {row.name}
                  <span className="text-[10px] font-normal text-slate-400 font-mono">
                    {row.domain}
                  </span>
                </div>
                <div className="text-[10px] text-emerald-600 font-medium">
                  {row.match}
                </div>
              </div>
            </div>
            <div>
              {row.status === 'yes' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 shadow-2xs">
                  <CheckCircle2 size={11} className="text-emerald-500" /> Yes
                </span>
              )}
              {row.status === 'consider' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 shadow-2xs">
                  <HelpCircle size={11} className="text-amber-500" /> Consider
                </span>
              )}
              {row.status === 'no' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 shadow-2xs">
                  <XCircle size={11} className="text-rose-500" /> No
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Email Mini SaaS Preview Widget ─────────────────────────────────────── */
function EmailPreview({ cfg }: { cfg: EmailToolConfig }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50/80 to-white shadow-sm overflow-hidden">
      {/* Top Header Bar */}
      <div className="px-3.5 py-2.5 bg-slate-100/70 border-b border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 shadow-2xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-2xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-2xs" />
          <span className="ml-2 text-[11px] font-mono text-slate-500 flex items-center gap-1">
            <Zap className="h-3 w-3 text-violet-500" />
            https://app.exeract.com/tools/email-verifier
          </span>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-100/80">
        {cfg.mockLines.map((row, ri) => (
          <div
            key={ri}
            className="flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-50/80 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${row.status === 'Valid'
                  ? 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]'
                  : row.status === 'Invalid'
                    ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                    : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                  }`}
              />
              <span className="text-xs font-mono text-slate-700 font-medium">{row.email}</span>
            </div>
            {row.status === 'Valid' ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 shadow-2xs">
                <BadgeCheck size={11} className="text-teal-500" /> Valid
              </span>
            ) : row.status === 'Invalid' ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 shadow-2xs">
                <XCircle size={11} className="text-rose-500" /> Invalid
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 shadow-2xs">
                <ShieldAlert size={11} className="text-amber-500" /> Catch-all
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main HowItWorks Component ────────────────────────────────────────── */
interface HowItWorksProps {
  isAdmin?: boolean;
  onEdit?: () => void;
}

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
      <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLoader label="Loading tools" />
        </div>
      </section>
    );

  if (error || !data)
    return (
      <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">Unable to load content.</div>
        </div>
      </section>
    );

  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-slate-50/60 relative overflow-hidden">
      {isAdmin && onEdit && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-navy text-xs font-bold border border-slate-200 shadow-sm hover:bg-gray-50"
          >
            <Edit2 size={14} /> Edit Section
          </button>
        </div>
      )}

      {/* Background Soft Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-400/5 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-400/5 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-5 tracking-tight">
              {data.heading}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              {data.description}
            </p>
          </div>
        </div>

        {/* ── Tool Cards ── */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {data.steps.map((step, index) => {
            const isIcp = index === 0;
            const cfg = isIcp ? ICP_TOOL : EMAIL_TOOL;
            const ToolIcon = cfg.icon;

            return (
              <div
                key={index}
                className={`relative rounded-3xl ${cfg.cardBg} border ${cfg.border} ${cfg.cardShadow} transition-all duration-300 overflow-hidden flex flex-col`}
              >
                <div className="p-7 sm:p-9 flex flex-col gap-6 flex-grow">
                  {/* ── Icon + Title ── */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Icon Bubble */}
                      <div
                        className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${cfg.accentGradient} text-white flex items-center justify-center flex-shrink-0 ${cfg.iconShadow}`}
                      >
                        <ToolIcon size={26} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-navy leading-tight">{step.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* ── Description ── */}
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {step.description}
                  </p>

                  {/* ── SaaS Product Preview Widget ── */}
                  <div className="flex-grow my-1">
                    {isIcp ? (
                      <ICPPreview cfg={ICP_TOOL} />
                    ) : (
                      <EmailPreview cfg={EMAIL_TOOL} />
                    )}
                  </div>

                  {/* ── CTA Button ── */}
                  <div className="mt-auto pt-2">
                    <a
                      href={cfg.ctaHref}
                      className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${cfg.ctaBtnClass}`}
                    >
                      {cfg.ctaLabel}
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
