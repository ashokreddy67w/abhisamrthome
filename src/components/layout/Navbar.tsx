import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../../hooks/useDarkMode';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#why-us' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gold-600/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center shadow-lg">
                <span className="text-gray-900 font-bold text-base sm:text-lg">A</span>
              </div>
              <div className="hidden xs:block">
                <div className="text-white font-display font-bold text-sm sm:text-base leading-tight">
                  ABHEE
                </div>
                <div className="text-gold-400 text-[10px] sm:text-xs leading-tight">
                  Smart Home Systems
                </div>
              </div>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-gray-300 hover:text-gold-400 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggle}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-gold-400 transition-colors text-base"
                aria-label="Toggle dark mode"
              >
                {isDark ? '☀️' : '🌙'}
              </button>

              {/* CTA Button - Desktop */}
              <a
                href="tel:+919876543210"
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-700 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                📞 Call Now
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
                aria-label="Toggle menu"
              >
                <div className="space-y-1.5 w-5">
                  <motion.span
                    animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    className="block h-0.5 bg-white"
                  />
                  <motion.span
                    animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block h-0.5 bg-white"
                  />
                  <motion.span
                    animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    className="block h-0.5 bg-white"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-gray-900/98 backdrop-blur-xl border-b border-gold-600/20 lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left text-gray-200 hover:text-gold-400 hover:bg-white/5 px-4 py-3 rounded-lg text-base font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 pb-1 border-t border-white/10 flex gap-3">
                <a
                  href="tel:+919876543210"
                  className="flex-1 text-center bg-gradient-to-r from-gold-500 to-gold-700 text-gray-900 px-4 py-3 rounded-lg text-sm font-bold"
                >
                  📞 Call Now
                </a>
                <a
                  href="https://wa.me/91926483744" // Updated WhatsApp number
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-bold"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
