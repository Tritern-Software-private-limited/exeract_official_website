import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const navLinks = [
    {
      name: 'Product',
      href: '#features',
    },
    {
      name: 'How it Works',
      href: '#how-it-works',
    },
    {
      name: 'Pricing',
      href: '#pricing',
    },
    {
      name: 'Blog',
      href: '#blog',
    },
  ]
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 lg:py-4' : 'bg-white py-4 lg:py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              src="https://cdn.magicpatterns.com/uploads/ciB7mkXdBuarc6YwTvSQat/Group_99.png"
              alt="Exeract Logo"
              className="h-8 lg:h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-navy hover:text-primary font-medium transition-colors text-sm xl:text-base whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
            {/* <a
              href="#/admin"
              className="bg-navy text-white px-4 xl:px-5 py-2 xl:py-2.5 rounded-lg font-medium hover:bg-navy-light transition-colors text-sm xl:text-base whitespace-nowrap"
            >
              Admin
            </a> */}
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-4 xl:px-5 py-2 xl:py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 text-sm xl:text-base whitespace-nowrap">
              Start Free Trial
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-navy hover:text-primary transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-navy hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="#/admin"
                  className="w-full text-center text-navy font-medium py-3 border border-gray-200 rounded-lg hover:bg-gray-50 block"
                >
                  Admin
                </a>
                <button className="w-full text-center bg-gradient-to-r from-primary to-secondary text-white font-medium py-3 rounded-lg shadow-lg shadow-primary/20">
                  Start Free Trial
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
