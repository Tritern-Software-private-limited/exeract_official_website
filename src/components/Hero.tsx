import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Play, Edit2 } from 'lucide-react';
import { content, INITIAL_CONTENT } from '../utils/content';
interface HeroProps {
  isAdmin?: boolean;
  onEdit?: () => void;
}
export function Hero({ isAdmin, onEdit }: HeroProps) {
  const [data, setData] = useState(INITIAL_CONTENT.hero);
  useEffect(() => {
    content.getContent().then((next) => setData(next.hero));
    const handleUpdate = () => {
      content.getContent().then((next) => setData(next.hero));
    };
    window.addEventListener('contentUpdated', handleUpdate);
    return () => window.removeEventListener('contentUpdated', handleUpdate);
  }, []);
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {isAdmin && onEdit &&
      <div className="absolute top-4 right-4 z-10">
          <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-navy text-xs font-bold border border-gray-200 shadow-sm hover:bg-white">

            <Edit2 size={14} />
            Edit Hero
          </button>
        </div>
      }
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
            className="text-center lg:text-left">

            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-sm font-medium mb-6 border border-primary/20">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              {data.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
              {data.headline}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {data.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center">
                {data.primaryCta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <a
                href="/#how-it-works"
                className="w-full sm:w-auto px-8 py-4 bg-white text-navy border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center group">
                <Play className="mr-2 h-5 w-5 text-primary fill-primary group-hover:scale-110 transition-transform" />
                {data.secondaryCta}
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-sm text-gray-500">
              {data.trustBadges.map((badge, idx) =>
              <div key={idx} className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  {badge}
                </div>
              )}
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
            className="relative mt-12 lg:mt-0">

            <div className="relative rounded-2xl bg-white shadow-2xl border border-gray-100 p-2 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
              <div className="bg-navy-light/5 rounded-xl p-4 sm:p-6">
                {/* Mock Dashboard UI */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="h-2 w-24 sm:w-32 bg-gray-200 rounded-full" />
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm sm:text-base flex-shrink-0">
                        98
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="h-2 w-20 sm:w-24 bg-gray-800 rounded-full mb-2" />
                        <div className="h-2 w-12 sm:w-16 bg-gray-300 rounded-full" />
                      </div>
                    </div>
                    <div className="px-2 sm:px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold whitespace-nowrap ml-2">
                      Verified
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-100 opacity-90">
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm sm:text-base flex-shrink-0">
                        85
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="h-2 w-24 sm:w-28 bg-gray-800 rounded-full mb-2" />
                        <div className="h-2 w-16 sm:w-20 bg-gray-300 rounded-full" />
                      </div>
                    </div>
                    <div className="px-2 sm:px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold whitespace-nowrap ml-2">
                      Review
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-100 opacity-75">
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-sm sm:text-base flex-shrink-0">
                        12
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="h-2 w-16 sm:w-20 bg-gray-800 rounded-full mb-2" />
                        <div className="h-2 w-10 sm:w-12 bg-gray-300 rounded-full" />
                      </div>
                    </div>
                    <div className="px-2 sm:px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold whitespace-nowrap ml-2">
                      Rejected
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="text-xs text-gray-500 truncate max-w-full">
                    Processing: batch_leads_2024.csv
                  </div>
                  <div className="h-2 w-20 sm:w-24 bg-primary/20 rounded-full overflow-hidden flex-shrink-0">
                    <div className="h-full w-2/3 bg-primary rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="hidden md:flex absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 items-center space-x-3">

              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-navy">
                  Verification Complete
                </div>
                <div className="text-xs text-gray-500">
                  1,240 leads processed
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>);

}
