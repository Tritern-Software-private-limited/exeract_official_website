import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Search, BarChart3, ArrowRight, Edit2 } from 'lucide-react';
import { content, type ContentType } from '../utils/content';
import { SectionLoader } from './SectionLoader';
const icons = [UploadCloud, Search, BarChart3];
const colors = [
'bg-blue-50 text-blue-600',
'bg-teal-50 text-teal-600',
'bg-purple-50 text-purple-600'];

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
      content.getContent().then((next) => setData(next.howItWorks)).catch(() => {});
    };
    window.addEventListener('contentUpdated', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('contentUpdated', handleUpdate);
    };
  }, []);
  if (loading) {
    return (
      <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLoader label="Loading how it works" />
        </div>
      </section>
    );
  }
  if (error || !data) {
    return (
      <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            Unable to load how-it-works content.
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50 relative">
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
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-base font-semibold text-primary uppercase tracking-wide mb-2">
            {data.sectionTitle}
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4">
            {data.heading}
          </h3>
          <p className="text-base sm:text-lg text-gray-600">
            {data.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10" />

          {data.steps.map((step, index) => {
            const Icon = icons[index % icons.length];
            const color = colors[index % colors.length];
            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2
                }}
                className="relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">

                <div
                  className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-6 mx-auto text-xl shadow-sm`}>

                  <Icon size={32} />
                </div>

                <div className="absolute top-8 right-8 text-6xl font-bold text-gray-50 opacity-50 select-none -z-10">
                  0{index + 1}
                </div>

                <h4 className="text-xl font-bold text-navy mb-3 text-center">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </motion.div>);

          })}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center text-primary font-bold hover:text-primary-dark transition-colors">
            See detailed documentation <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </section>);

}
