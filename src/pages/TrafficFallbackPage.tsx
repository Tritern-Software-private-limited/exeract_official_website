import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle } from 'lucide-react';

// REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwZyGgcW4aOIty4lvfSrzF0MKYerX6-DhUmNTJ9bxXCxkR29ZnnzjizWOpsQDNGlcQ2/exec';

export function TrafficFallbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (!GOOGLE_SCRIPT_URL) {
        throw new Error('Google Script URL is missing');
      }

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
        // Google Apps Script accepts standard form data; DO NOT set Content-Type: application/json.
      });

      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // In a real scenario, you might want to show an error message, but we'll fallback gracefully
      alert('There was an issue submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-navy">
      {/* Background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl opacity-50" />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 relative z-10">
        <div className="text-center mb-8">
          <a href="/" className="inline-block mb-8">
            <img src="/exeract-logo-color.svg" alt="Exeract Logo" className="h-8 w-auto mx-auto" />
          </a>

          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            We are experiencing unusually high traffic.
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Our application is spinning up extra resources to handle the demand. Please drop your details below, and we will notify you the exact moment your access slot is ready.
          </p>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Thank you, we've reserved your spot!</h2>
            <p className="text-gray-500 text-sm">
              Keep an eye on your inbox. We'll send you a link as soon as your resources are ready.
            </p>
            <a href="/">
              <button className="mt-8 px-6 py-3 bg-white border border-gray-200 text-navy font-bold rounded-xl hover:bg-gray-50 transition-colors w-full">
                Return to Home
              </button>
            </a>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-navy mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-navy mb-1">
                Business Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-bold text-navy mb-1">
                Use Case / Notes <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50 resize-none"
                placeholder="How are you planning to use Exeract?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-base hover:opacity-90 transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Securing Spot...
                </>
              ) : (
                'Reserve My Access Slot'
              )}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
