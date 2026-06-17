import React, { useEffect, useState } from 'react';
import { Twitter, Linkedin, Instagram, Facebook, Mail, Edit2 } from 'lucide-react';
import { content, type ContentType } from '../utils/content';
import { SectionLoader } from './SectionLoader';
interface FooterProps {
  isAdmin?: boolean;
  onEdit?: () => void;
}
export function Footer({ isAdmin, onEdit }: FooterProps) {
  const [data, setData] = useState<ContentType['footer'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const next = await content.getContent();
        if (!active) return;
        setData(next.footer);
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
          setData(next.footer);
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
      <footer className="bg-navy text-gray-300 pt-20 pb-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLoader label="Loading footer" />
        </div>
      </footer>
    );
  }
  if (error || !data) {
    return (
      <footer className="bg-navy text-gray-300 pt-20 pb-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-400">
            Unable to load footer content.
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer className="bg-navy text-gray-300 pt-20 pb-10 relative">
      {isAdmin && onEdit &&
      <div className="absolute top-4 right-4 z-10">
          <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 text-navy text-xs font-bold border border-gray-200 shadow-sm hover:bg-white">

            <Edit2 size={14} />
            Edit Footer
          </button>
        </div>
      }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <a href="/" className="flex items-center mb-6 cursor-pointer">
              <img
                src="/exeract-logo-white.svg"
                alt="Exeract Logo"
                className="h-8 w-auto brightness-0 invert" />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              {data.description}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/exeract2169"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 -m-2"
                aria-label="X (formerly Twitter)">
                <Twitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/exeract/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 -m-2"
                aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/_exeract/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 -m-2"
                aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61586690438511"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 -m-2"
                aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="hover:text-primary transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-primary transition-colors">
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://www.tritern.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Tritern Software Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Mail size={16} />
            <span>support@tritern.com</span>
          </div>
        </div>
      </div>
    </footer>);

}
