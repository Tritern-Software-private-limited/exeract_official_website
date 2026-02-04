import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { auth } from '../utils/auth';
interface AdminLoginProps {
  onLoginSuccess: () => void;
}
export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const ok = await auth.login(email, password);
    if (ok) {
      onLoginSuccess();
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100">

        <div className="p-8 text-center bg-navy">
          <img
            src="/Group_99.png"
            alt="Exeract Logo"
            className="h-8 w-auto mx-auto mb-4 brightness-0 invert" />

          <h2 className="text-xl font-bold text-white">Admin Portal</h2>
          <p className="text-gray-400 text-sm mt-2">
            Sign in to manage your blog content
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error &&
            <motion.div
              initial={{
                opacity: 0,
                y: -10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center">

                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                {error}
              </motion.div>
            }

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="admin@exeract.com"
                  required />

              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="••••••••"
                  required />

              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-70">

              {isLoading ?
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :

              <>
                  Sign In <ArrowRight size={18} className="ml-2" />
                </>
              }
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-gray-500 hover:text-primary transition-colors">

              ← Back to Landing Page
            </a>
          </div>
        </div>
      </motion.div>
    </div>);

}
