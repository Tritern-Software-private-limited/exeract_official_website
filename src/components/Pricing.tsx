import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Edit2 } from 'lucide-react';
import { content, type ContentType } from '../utils/content';
import { SectionLoader } from './SectionLoader';
interface PricingProps {
  isAdmin?: boolean;
  onEdit?: () => void;
}
export function Pricing({ isAdmin, onEdit }: PricingProps) {
  const [data, setData] = useState<ContentType['pricing'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const next = await content.getContent();
        if (!active) return;
        setData(next.pricing);
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
      content
        .getContent()
        .then((next) => {
          if (!active) return;
          setData(next.pricing);
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
  if (loading) {
    return (
      <section id="pricing" className="py-24 bg-[#F8FAFF] text-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionLoader label="Loading pricing" />
        </div>
      </section>
    );
  }
  if (error || !data) {
    return (
      <section id="pricing" className="py-24 bg-[#F8FAFF] text-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-sm text-gray-500">
            Unable to load pricing content.
          </div>
        </div>
      </section>
    );
  }
  return (
    <section
      id="pricing"
      className="py-24 bg-[#F8FAFF] text-navy relative overflow-hidden">
      {isAdmin && onEdit &&
      <div className="absolute top-4 right-4 z-10">
          <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 text-navy text-xs font-bold border border-gray-200 shadow-sm hover:bg-white">

            <Edit2 size={14} />
            Edit Pricing
          </button>
        </div>
      }

      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* <h2 className="text-base font-semibold text-primary uppercase tracking-wide mb-2">
            Pricing
          </h2> */}
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            {data.sectionTitle || 'Exeract Pricing Plans'}
          </h3>
          <p className="text-lg text-gray-500">
            {data.subtitle || 'Stop wasting hours on manual verification. Scale your research pipelines with structured LLM execution.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch pt-10">
          {data.plans.map((plan, index) =>
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative rounded-2xl p-6 sm:p-8 flex flex-col ${plan.popular ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-xl lg:scale-105 z-20' : 'bg-white text-navy shadow-sm hover:shadow-md border border-gray-100 transition-all z-10'}`}>
              
              <div className="flex justify-between items-start mb-4 gap-2">
                <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-navy'}`}>
                  {plan.name}
                </h3>
                {plan.popular && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider font-bold bg-white/10 text-white border border-white/20 shrink-0">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/80 animate-pulse" />
                    Recommended
                  </span>
                )}
              </div>
              
              {plan.description && (
                <p className={`text-[13px] mb-6 leading-relaxed ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
              )}

              <div className="flex items-baseline mb-6">
                <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-navy'}`}>
                  {plan.price}
                </span>
                <span className={`ml-1 text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                  {plan.period}
                </span>
              </div>

              <div className={`p-4 rounded-xl mb-6 ${plan.popular ? 'bg-white/10' : 'bg-[#F4F9FF]'}`}>
                <p className={`text-sm font-bold ${plan.popular ? 'text-white' : 'text-primary'}`}>{plan.creditsTitle || '100 Credits / month'}</p>
                <p className={`text-xs mt-1 ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>{plan.creditsDesc || '(Approx. 500+ company checks)'}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) =>
                  <li key={i} className="flex items-start">
                    <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center ${plan.popular ? 'bg-white/20' : 'bg-green-100'}`}>
                      <Check className={`h-3 w-3 ${plan.popular ? 'text-white' : 'text-green-600'}`} />
                    </div>
                    <span className={`text-sm leading-tight ${plan.popular ? 'text-white' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                )}
              </ul>

              <a 
                href={plan.price === 'Custom' ? 'https://calendly.com/aravindhan-tritern/30min' : 'https://app.exeract.com/signup'}
                className="w-full mt-auto block"
              >
                <button
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                    plan.popular 
                      ? 'bg-white text-secondary hover:shadow-lg hover:bg-gray-50' 
                      : 'bg-white text-primary border border-gray-200 hover:border-primary hover:bg-[#F4F9FF]'
                  }`}>
                  {plan.ctaText || (plan.price === 'Custom' ? 'Contact Sales' : 'Start for free')}
                </button>
              </a>

            </motion.div>
          )}
        </div>

        {/* <div className="mt-16 text-center">
          <p className="text-gray-500 flex items-center justify-center gap-2">
            Need a custom volume plan?{' '}
            <a href="#" className="text-primary hover:underline">
              Contact our sales team
            </a>
          </p>
        </div> */}
      </div>
    </section>);

}
