import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Pricing } from '../components/Pricing';
import { usePageMeta } from '../utils/usePageMeta';

export function PricingPage() {
  usePageMeta();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFF] font-sans text-navy selection:bg-primary/20 selection:text-navy overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <Pricing />
      </main>

      <Footer />
    </div>
  );
}
