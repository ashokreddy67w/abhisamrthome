import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/60 to-gray-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-gray-950/40" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-400/30 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-0">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            Guntur's #1 Smart Home Experts
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6"
          >
            Your Home,{' '}
            <span className="text-gradient-gold">Intelligently</span>
            <br />Automated
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 max-w-xl"
          >
            Transform your home into a luxury smart living space. From automation and security to theater and lighting — Andhra Pradesh's most trusted smart home company.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4"
          >
            <a
              href="tel:+919248683744"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-700 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold hover:opacity-90 transition-opacity shadow-lg shadow-gold-500/30 animate-pulse-gold"
            >
              📞 Call Now: +91  92486 83744
            </a>

            <a
              href="https://wa.me/91926483744?text=Hi%20ABHEE%2C%20I%20want%20a%20free%20consultation%20for%20smart%20home"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold transition-colors shadow-lg"
            >
              💬 WhatsApp Us
            </a>

            <button
              onClick={() => scrollTo('#contact')}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-colors"
            >
              📅 Book Free Consultation
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg"
          >
            {[
              { value: '500+', label: 'Projects Done' },
              { value: '10+', label: 'Years Experience' },
              { value: '98%', label: 'Happy Clients' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
      >
        <span className="text-xs">Scroll to explore</span>
        <div className="w-5 h-8 border-2 border-gray-500 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-gold-400"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
