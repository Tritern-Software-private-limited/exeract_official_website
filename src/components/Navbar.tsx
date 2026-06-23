import { useEffect, useState } from 'react'
import { Menu, X, Loader2, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCTARedirect } from '../utils/useCTARedirect'
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { handleCTAClick, loadingState } = useCTARedirect()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const navLinks = [
    {
      name: 'Products',
      items: [
        { name: 'Company ICP validation', href: '/how-it-works' },
        { name: 'Email verification', href: '/email-verification' }
      ]
    },
    {
      name: 'Outbound User Guide',
      href: '/outbound-user-guide',
    },
    {
      name: 'Pricing',
      href: '/pricing',
    },
    {
      name: 'Blog',
      href: '/blog',
    },
  ]
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 lg:py-4' : 'bg-white py-4 lg:py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Left Group: Logo + Main Nav */}
          <div className="flex items-center space-x-8 xl:space-x-12">
            {/* Logo */}
            <a
              href="/"
              className="flex-shrink-0 flex items-center cursor-pointer"
            >
              <img
                src="/exeract-logo-color.svg"
                alt="Exeract Logo"
                className="h-8 lg:h-12 w-auto"
              />
            </a>

            {/* Main Links (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                link.items ? (
                  <div key={link.name} className="relative group">
                    <button className="flex items-center gap-1 text-navy/80 group-hover:text-primary font-medium transition-colors text-sm xl:text-base whitespace-nowrap">
                      {link.name}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 min-w-[240px] flex flex-col">
                        {link.items.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-3 text-sm font-medium text-navy/80 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-navy/80 hover:text-primary font-medium transition-colors text-sm xl:text-base whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </nav>
          </div>

          {/* Right Group: Auth Actions + Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 xl:space-x-6">
            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <a
                href="/product-access?redirect=https://app.exeract.com/login"
                onClick={(e) => handleCTAClick(e, "https://app.exeract.com/login", "nav-login")}
                className="text-navy/80 hover:text-primary font-medium transition-colors text-sm xl:text-base whitespace-nowrap flex items-center"
              >
                {loadingState === "nav-login" ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Logging in...</> : "Log In"}
              </a>
              <a 
                href="/product-access?redirect=https://app.exeract.com/signup"
                onClick={(e) => handleCTAClick(e, "https://app.exeract.com/signup", "nav-signup")}
              >
                <button className="bg-gradient-to-r from-primary to-secondary text-white px-4 xl:px-5 py-2 xl:py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm xl:text-base whitespace-nowrap flex items-center">
                  {loadingState === "nav-signup" ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Loading...</> : "Sign up"}
                </button>
              </a>
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
                link.items ? (
                  <div key={link.name} className="space-y-1">
                    <div className="px-3 py-3 text-base font-medium text-navy">
                      {link.name}
                    </div>
                    <div className="pl-6 space-y-1 border-l-2 border-gray-100 ml-3 mb-2">
                      {link.items.map(item => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-3 text-base font-medium text-navy hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {link.name}
                  </a>
                )
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="/product-access?redirect=https://app.exeract.com/login"
                  onClick={(e) => handleCTAClick(e, "https://app.exeract.com/login", "nav-mobile-login")}
                  className="w-full text-center text-navy font-medium py-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                >
                  {loadingState === "nav-mobile-login" ? <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Logging in...</> : "Log In"}
                </a>
                <a 
                  href="/product-access?redirect=https://app.exeract.com/signup" 
                  onClick={(e) => handleCTAClick(e, "https://app.exeract.com/signup", "nav-mobile-signup")}
                  className="block w-full"
                >
                  <button className="w-full flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity">
                    {loadingState === "nav-mobile-signup" ? <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Loading...</> : "Sign up for free"}
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
