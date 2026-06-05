import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, MailCheck, Zap, ShieldAlert, BrainCircuit, FileSpreadsheet, Edit2 } from 'lucide-react';
import { content, type ContentType } from '../utils/content';
import { SectionLoader } from './SectionLoader';
import { FeaturesVisual } from './FeaturesVisual';

const icons = [Target, MailCheck, Zap, ShieldAlert, BrainCircuit, FileSpreadsheet];
const colors = [
  'text-primary',
  'text-violet-500',
  'text-amber-500',
  'text-rose-500',
  'text-blue-500',
  'text-emerald-500',
];
const bgColors = [
  'bg-primary/8',
  'bg-violet-500/8',
  'bg-amber-500/8',
  'bg-rose-500/8',
  'bg-blue-500/8',
  'bg-emerald-500/8',
];

interface FeaturesProps {
  isAdmin?: boolean;
  onEdit?: () => void;
}

export function Features({ isAdmin, onEdit }: FeaturesProps) {
  const [data, setData] = useState<ContentType['features'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const next = await content.getContent();
        if (!active) return;
        setData(next.features);
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
        .then((next) => { if (!active) return; setData(next.features); setError(null); })
        .catch(() => { if (!active) return; setError('Failed to load content'); });
    };
    window.addEventListener('contentUpdated', handleUpdate);
    return () => { active = false; window.removeEventListener('contentUpdated', handleUpdate); };
  }, []);

  if (loading) return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><SectionLoader label="Loading features" /></div>
    </section>
  );
  if (error || !data) return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-500">Unable to load features content.</div>
      </div>
    </section>
  );

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {isAdmin && onEdit && (
        <div className="absolute top-4 right-4 z-10">
          <button onClick={onEdit} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-navy text-xs font-bold border border-gray-200 shadow-sm hover:bg-gray-50">
            <Edit2 size={14} /> Edit Section
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: text + feature grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-base font-semibold text-primary uppercase tracking-wide mb-2">
              {data.sectionTitle}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-navy mb-5">
              {data.heading}
            </h3>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              {data.description}
            </p>

            {/* 2×3 feature grid */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
              {data.features.map((feature, index) => {
                const Icon = icons[index % icons.length];
                const color = colors[index % colors.length];
                const bg = bgColors[index % bgColors.length];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07, duration: 0.45 }}
                    className="flex gap-3"
                  >
                    <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${bg} flex items-center justify-center mt-0.5`}>
                      <Icon size={18} className={color} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy mb-1">{feature.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: 3D visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-12 lg:mt-0"
          >
            <FeaturesVisual />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
