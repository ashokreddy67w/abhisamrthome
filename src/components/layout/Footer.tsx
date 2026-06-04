import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-gold-700/20 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center">
                <span className="text-gray-900 font-bold text-lg">A</span>
              </div>
              <div>
                <div className="text-white font-display font-bold text-base">ABHEE</div>
                <div className="text-gold-400 text-xs">Smart Home Systems</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Guntur's premier smart home automation company, delivering cutting-edge technology solutions across Andhra Pradesh since 2014.
            </p>
            <div className="flex gap-3">
              {['📘', '📸', '▶️', '🐦'].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-600/20 transition-colors text-sm"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {['Home Automation', 'CCTV Systems', 'Home Theater', 'Smart Lighting', 'Smart Security', 'Audio Solutions', 'Projectors', 'Solar Fencing'].map((s) => (
                <li key={s}>
                  <button className="hover:text-gold-400 transition-colors text-left">{s}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Our Projects', 'Testimonials', 'Blog', 'FAQ', 'Contact Us', 'Book Consultation', 'Get Quote'].map((l) => (
                <li key={l}>
                  <button className="hover:text-gold-400 transition-colors text-left">{l}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span>📍</span>
                <span>MG Road, Guntur,<br />Andhra Pradesh – 522 001</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+919876543210" className="hover:text-gold-400 transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:info@abheesmarthome.com" className="hover:text-gold-400 transition-colors break-all">
                  info@abheesmarthome.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span>🕐</span>
                <span>Mon–Sat: 9AM – 7PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {currentYear} ABHEE Smart Home Systems. All rights reserved.</p>
          <div className="flex gap-4">
            <button className="hover:text-gold-400 transition-colors">Privacy Policy</button>
            <button className="hover:text-gold-400 transition-colors">Terms of Service</button>
            <button className="hover:text-gold-400 transition-colors">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
