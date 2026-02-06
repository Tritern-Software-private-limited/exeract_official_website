import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';
import { BlogPreview } from '../components/BlogPreview';
import { Footer } from '../components/Footer';
import { ContentEditor } from '../components/ContentEditor';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { auth } from '../utils/auth';
type ContentTab = 'hero' | 'howItWorks' | 'features' | 'pricing' | 'footer';
export function LandingPage() {
  const isAdmin = auth.isAuthenticated();
  const [contentEditorTab, setContentEditorTab] = useState<ContentTab | null>(
    null
  );
  const openContentEditor = (tab: ContentTab) => setContentEditorTab(tab);
  const closeContentEditor = () => setContentEditorTab(null);
  return (
    <div className="min-h-screen bg-white font-sans text-navy selection:bg-primary/20 selection:text-navy overflow-x-hidden">
      <Navbar />

      <main>
        <Hero isAdmin={isAdmin} onEdit={() => openContentEditor('hero')} />

        {/* Social Proof Banner */}
        <div className="py-12 border-y border-gray-100 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6 sm:mb-8">
              Trusted by 500+ Sales Teams
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Placeholder Logos */}
              <div className="h-6 sm:h-8 font-bold text-lg sm:text-xl text-gray-600 flex items-center">
                ACME Corp
              </div>
              <div className="h-6 sm:h-8 font-bold text-lg sm:text-xl text-gray-600 flex items-center">
                GlobalTech
              </div>
              <div className="h-6 sm:h-8 font-bold text-lg sm:text-xl text-gray-600 flex items-center">
                Nebula
              </div>
              <div className="h-6 sm:h-8 font-bold text-lg sm:text-xl text-gray-600 flex items-center">
                FoxRun
              </div>
              <div className="h-6 sm:h-8 font-bold text-lg sm:text-xl text-gray-600 flex items-center">
                Circle
              </div>
            </div>
          </div>
        </div>

        <HowItWorks
          isAdmin={isAdmin}
          onEdit={() => openContentEditor('howItWorks')}
        />
        <Features isAdmin={isAdmin} onEdit={() => openContentEditor('features')} />
        <Pricing isAdmin={isAdmin} onEdit={() => openContentEditor('pricing')} />
        <BlogPreview isAdmin={isAdmin} />

        {/* Final CTA */}
        <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.5
              }}>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4 sm:mb-6 leading-tight">
                Ready to Verify Leads{' '}
                <span className="text-primary">10x Faster?</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                Join 500+ teams who trust Exeract for lead verification. Start
                your free trial today.
              </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                <p className="text-sm text-gray-500 mt-2 sm:mt-0 sm:ml-6">
                  No credit card required
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer isAdmin={isAdmin} onEdit={() => openContentEditor('footer')} />

      {contentEditorTab &&
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-auto">
            <ContentEditor
            initialTab={contentEditorTab}
            onClose={closeContentEditor} />

          </div>
        </div>
      }
    </div>);

}
