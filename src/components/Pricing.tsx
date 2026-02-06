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
      content.getContent().then((next) => setData(next.pricing)).catch(() => {});
    };
    window.addEventListener('contentUpdated', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('contentUpdated', handleUpdate);
    };
  }, []);
  if (loading) {
    return (
      <section id="pricing" className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionLoader label="Loading pricing" />
        </div>
      </section>
    );
  }
  if (error || !data) {
    return (
      <section id="pricing" className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-sm text-gray-300">
            Unable to load pricing content.
          </div>
        </div>
      </section>
    );
  }
  return (
    <section
      id="pricing"
      className="py-24 bg-navy text-white relative overflow-hidden">
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
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-primary uppercase tracking-wide mb-2">
            Pricing
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h3>
          <p className="text-lg text-gray-400">
            Choose the plan that fits your volume. No hidden fees, cancel
            anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {data.plans.map((plan, index) =>
          <motion.div
            key={plan.name}
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
              delay: index * 0.1
            }}
            className={`relative rounded-2xl p-6 sm:p-8 ${plan.popular ? 'bg-white text-navy shadow-2xl lg:scale-105 z-10' : 'bg-navy-light border border-gray-700 text-white'}`}>

              {plan.popular &&
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
            }

              <h3
              className={`text-xl font-bold mb-2 ${plan.popular ? 'text-navy' : 'text-white'}`}>

                {plan.name}
              </h3>
              <div className="flex items-baseline mb-4">
                <span
                className={`text-4xl font-bold ${plan.popular ? 'text-navy' : 'text-white'}`}>

                  {plan.price}
                </span>
                <span
                className={`ml-1 text-sm ${plan.popular ? 'text-gray-500' : 'text-gray-400'}`}>

                  {plan.period}
                </span>
              </div>
              <p
              className={`text-sm mb-8 ${plan.popular ? 'text-gray-600' : 'text-gray-400'}`}>

                {plan.description}
              </p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) =>
              <li key={i} className="flex items-start">
                    <Check
                  className={`h-5 w-5 mr-3 flex-shrink-0 ${plan.popular ? 'text-primary' : 'text-primary'}`} />

                    <span
                  className={`text-sm ${plan.popular ? 'text-gray-700' : 'text-gray-300'}`}>

                      {feature}
                    </span>
                  </li>
              )}
              </ul>

              <button
              className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-200 ${plan.popular ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:opacity-90' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>

                {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
              </button>

              {plan.popular &&
            <p className="text-xs text-center text-gray-500 mt-4">
                  Limited spots available for this tier
                </p>
            }
            </motion.div>
          )}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Need a custom volume plan?{' '}
            <a href="#" className="text-primary hover:underline">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>);

}
