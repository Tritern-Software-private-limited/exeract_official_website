import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Play, Edit2 } from 'lucide-react';
import { content, type ContentType } from '../utils/content';
import { SectionLoader } from './SectionLoader';
interface HeroProps {
  isAdmin?: boolean;
  onEdit?: () => void;
}
export function Hero({ isAdmin, onEdit }: HeroProps) {
  const [data, setData] = useState<ContentType['hero'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const next = await content.getContent();
        if (!active) return;
        setData(next.hero);
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
          setData(next.hero);
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
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl opacity-50" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl opacity-50" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLoader label="Loading" minHeightClassName="min-h-[320px]" />
        </div>
      </section>
    );
  }
  if (error || !data) {
    return (
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            Unable to load hero content.
          </div>
        </div>
      </section>
    );
  }
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

            {/*<div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-sm font-medium mb-6 border border-primary/20">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              {data.badge}
            </div>*/}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
              {data.headline}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {data.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a href="https://calendly.com/aravindhan-tritern/30min"><button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center">
                {data.primaryCta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button></a>


              {/* <a
                href="/#how-it-works"
                className="w-full sm:w-auto px-8 py-4 bg-white text-navy border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center group">
                <Play className="mr-2 h-5 w-5 text-primary fill-primary group-hover:scale-110 transition-transform" />
                {data.secondaryCta}
              </a> */}
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

            <div className="relative select-none" onContextMenu={e => e.preventDefault()}>
              <video
                src="/exeract-header-fc.webm"
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                draggable={false}
                onContextMenu={e => e.preventDefault()}
                className="w-full h-auto pointer-events-none"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}
