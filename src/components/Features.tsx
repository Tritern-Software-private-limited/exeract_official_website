import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, BrainCircuit, FileSpreadsheet, Edit2 } from 'lucide-react';
import { content, type ContentType } from '../utils/content';
import { SectionLoader } from './SectionLoader';
const icons = [ShieldCheck, Zap, BrainCircuit, FileSpreadsheet];
const colors = [
'text-emerald-500',
'text-amber-500',
'text-primary',
'text-blue-500'];

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
      content.getContent().then((next) => setData(next.features)).catch(() => {});
    };
    window.addEventListener('contentUpdated', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('contentUpdated', handleUpdate);
    };
  }, []);
  if (loading) {
    return (
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLoader label="Loading features" />
        </div>
      </section>
    );
  }
  if (error || !data) {
    return (
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            Unable to load features content.
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="features" className="py-24 bg-white relative">
      {isAdmin && onEdit &&
      <div className="absolute top-4 right-4 z-10">
          <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-navy text-xs font-bold border border-gray-200 shadow-sm hover:bg-gray-50">

            <Edit2 size={14} />
            Edit Section
          </button>
        </div>
      }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}>

            <h2 className="text-base font-semibold text-primary uppercase tracking-wide mb-2">
              {data.sectionTitle}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              {data.heading}
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {data.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {data.features.map((feature, index) => {
                const Icon = icons[index % icons.length];
                const color = colors[index % colors.length];
                return (
                  <div key={index} className="flex flex-col">
                    <div className={`mb-4 ${color}`}>
                      <Icon size={28} />
                    </div>
                    <h4 className="text-lg font-bold text-navy mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>);

              })}
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}
            className="relative mt-12 lg:mt-0">

            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-lg" />
            <div className="relative bg-navy rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-800 overflow-hidden">
              {/* Abstract UI Representation */}
              <div className="flex items-center justify-between mb-6 sm:mb-8 border-b border-gray-700 pb-4">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-gray-400 text-xs font-mono hidden sm:block">
                  exeract_cli_v2.0
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 font-mono text-xs sm:text-sm">
                <div className="flex items-start text-green-400">
                  <span className="mr-2 flex-shrink-0">➜</span>
                  <span className="break-words">
                    Initializing verification protocols...
                  </span>
                </div>
                <div className="flex items-start text-blue-400">
                  <span className="mr-2 flex-shrink-0">ℹ</span>
                  <span className="break-words">
                    Loading batch: 5,000 leads
                  </span>
                </div>
                <div className="flex items-start text-gray-400">
                  <span className="mr-2 flex-shrink-0">...</span>
                  <span className="break-words">
                    Analyzing keywords: "SaaS", "B2B", "Enterprise"
                  </span>
                </div>

                <div className="py-3 sm:py-4">
                  <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                      style={{
                        width: '78%'
                      }} />

                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress: 78%</span>
                    <span>Est. time: 12s</span>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded p-3 sm:p-4 border-l-2 border-primary">
                  <div className="text-gray-300 mb-1 break-words">
                    Match Found:{' '}
                    <span className="text-white font-bold">acme-corp.com</span>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-4 text-xs">
                    <span className="text-green-400 whitespace-nowrap">
                      Confidence: 98%
                    </span>
                    <span className="text-blue-400 whitespace-nowrap">
                      Keywords: 4/5
                    </span>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded p-3 sm:p-4 border-l-2 border-red-500 opacity-75">
                  <div className="text-gray-300 mb-1 break-words">
                    Match Failed:{' '}
                    <span className="text-white font-bold">
                      generic-shop.net
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-4 text-xs">
                    <span className="text-red-400 whitespace-nowrap">
                      Confidence: 12%
                    </span>
                    <span className="text-gray-500 whitespace-nowrap">
                      Irrelevant content
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}
