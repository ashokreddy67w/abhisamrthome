import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../../data';

const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const goNext = () => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="section-container py-16 sm:py-20 lg:py-24 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-400 text-sm sm:text-base font-medium mb-3"
          >
            CUSTOMER STORIES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800/50 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(TESTIMONIALS[current].rating)].map((_, i) => (
                  <span key={i} className="text-gold-400 text-lg sm:text-xl">⭐</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 relative">
                <span className="text-gold-400/30 text-5xl sm:text-7xl font-serif absolute -top-4 -left-2 leading-none">"</span>
                <span className="relative z-10">{TESTIMONIALS[current].text}</span>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={TESTIMONIALS[current].image}
                  alt={TESTIMONIALS[current].name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gold-500/30"
                />
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base">{TESTIMONIALS[current].name}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{TESTIMONIALS[current].location}</div>
                  <div className="text-gold-400 text-xs mt-0.5">{TESTIMONIALS[current].service}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold-500/20 text-white hover:text-gold-400 transition-colors flex items-center justify-center"
            >
              ←
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-6 h-2 bg-gold-500' : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold-500/20 text-white hover:text-gold-400 transition-colors flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>

        {/* Mini Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => go(i)}
              whileHover={{ scale: 1.03 }}
              className={`p-3 rounded-xl border text-left transition-all ${
                i === current
                  ? 'border-gold-500/50 bg-gold-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={t.image} alt={t.name} className="w-7 h-7 rounded-full" />
                <div className="text-white text-xs font-medium truncate">{t.name}</div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-gold-400 text-xs">⭐</span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
