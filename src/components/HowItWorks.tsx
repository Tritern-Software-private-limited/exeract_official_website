import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, CheckCircle2, ShieldAlert, Zap, Globe, Edit2, HelpCircle, XCircle } from 'lucide-react';
import { content, type ContentType } from '../utils/content';
import { SectionLoader } from './SectionLoader';

const TOOL_CONFIG = [
  {
    icon: Building2,
    gradient: 'from-primary/10 to-secondary/5',
    border: 'border-primary/20',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    accentColor: '#00D4AA',
    badgeColor: 'bg-primary/10 text-primary border-primary/20',
    tags: [
      { icon: Globe, label: 'Live website data' },
      { icon: Zap, label: 'Keyword intelligence' },
      { icon: CheckCircle2, label: 'Confidence scoring' },
    ],
    mockLines: [
      { name: 'Tritern', domain: 'tritern.com', status: 'yes', color: 'bg-primary' },
      { name: 'Globex', domain: 'globex.com', status: 'consider', color: 'bg-orange-400' },
      { name: 'Demantri', domain: 'demantri.com', status: 'no', color: 'bg-red-400' },
    ],
  },
  {
    icon: Mail,
    gradient: 'from-violet-500/10 to-indigo-500/5',
    border: 'border-violet-400/20',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
    accentColor: '#8b5cf6',
    badgeColor: 'bg-violet-500/10 text-violet-600 border-violet-400/20',
    tags: [
      { icon: CheckCircle2, label: 'Deliverability check' },
      { icon: ShieldAlert, label: 'Catch-all detection' },
      { icon: Zap, label: 'Bulk processing' },
    ],
    mockLines: [
      { email: 'john@acme-corp.com', status: 'Valid', safe: true },
      { email: 'info@techflow.io', status: 'Catch-all', safe: false },
      { email: 'ceo@nexus-labs.ai', status: 'Valid', safe: true },
    ],
  },
];

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
      } catch (err) {
        if (!active) return;
        setError('Failed to load content');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    const handleUpdate = () => {
      content.getContent()
        .then((next) => { if (!active) return; setData(next.howItWorks); setError(null); })
        .catch(() => { if (!active) return; setError('Failed to load content'); });
    };
    window.addEventListener('contentUpdated', handleUpdate);
    return () => { active = false; window.removeEventListener('contentUpdated', handleUpdate); };
  }, []);

  if (loading) return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><SectionLoader label="Loading tools" /></div>
    </section>
  );
  if (error || !data) return (
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
          <button onClick={onEdit} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-navy text-xs font-bold border border-gray-200 shadow-sm hover:bg-gray-50">
            <Edit2 size={14} /> Edit Section
          </button>
        </div>
      )}

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
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

        {/* Tool Cards */}
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
                className={`relative rounded-2xl bg-white border ${cfg.border} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group`}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${cfg.accentColor}, transparent)` }} />

                <div className="p-7 sm:p-8">
                  {/* Icon + title */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl ${cfg.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`${cfg.iconColor}`} size={24} />
                    </div>
                    <div>
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${cfg.badgeColor} mb-1.5`}>
                        Tool {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl font-bold text-navy leading-tight">{step.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{step.description}</p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {cfg.tags.map((tag, ti) => {
                      const TagIcon = tag.icon;
                      return (
                        <motion.span
                          key={ti}
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + ti * 0.07 }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.badgeColor}`}
                        >
                          <TagIcon size={11} />
                          {tag.label}
                        </motion.span>
                      );
                    })}
                  </div>

                  {/* Mini preview */}
                  <div className="rounded-xl border border-gray-100 overflow-hidden bg-gray-50">
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-100 bg-white">
                      {['#f87171', '#fbbf24', '#34d399'].map(c => (
                        <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
                      ))}
                      <span className="text-[10px] text-gray-400 ml-1 font-mono">
                        {index === 0 ? 'icp-validation' : 'email-verifier'}
                      </span>
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.6 }}
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ background: cfg.accentColor }}
                      />
                    </div>
                    <div className="divide-y divide-gray-100">
                      {index === 0
                        ? cfg.mockLines.map((row: any, ri: number) => (
                          <motion.div
                            key={ri}
                            initial={{ opacity: 0, x: -6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + ri * 0.1 }}
                            className="flex items-center justify-between px-3 py-2"
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${row.color}`} />
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-semibold text-navy text-[11px] sm:text-xs">{row.name}</span>
                                <span className="text-[10px] font-mono text-gray-400">{row.domain}</span>
                              </div>
                            </div>
                            <div>
                              {row.status === 'yes' && (
                                <span className="text-[9px] sm:text-[10px] bg-green-50 border border-green-200 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <CheckCircle2 size={10} /> YES
                                </span>
                              )}
                              {row.status === 'consider' && (
                                <span className="text-[9px] sm:text-[10px] bg-orange-50 border border-orange-200 text-orange-600 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <HelpCircle size={10} /> CONSIDER
                                </span>
                              )}
                              {row.status === 'no' && (
                                <span className="text-[9px] sm:text-[10px] bg-red-50 border border-red-200 text-red-600 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <XCircle size={10} /> NO
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))
                        : cfg.mockLines.map((row: any, ri: number) => (
                          <motion.div
                            key={ri}
                            initial={{ opacity: 0, x: -6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + ri * 0.1 }}
                            className="flex items-center justify-between px-3 py-2"
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${row.safe ? 'bg-violet-500' : 'bg-amber-400'}`} />
                              <span className="text-[11px] font-mono text-gray-600">{row.email}</span>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              row.safe
                                ? 'bg-violet-50 text-violet-600'
                                : 'bg-amber-50 text-amber-600'
                            }`}>
                              {row.status}
                            </span>
                          </motion.div>
                        ))
                      }
                    </div>
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
