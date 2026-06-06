import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '../../data';

const FAQSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-container py-16 sm:py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-400 text-sm sm:text-base font-medium mb-3"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <span className="text-white font-medium text-sm sm:text-base pr-4">{item.question}</span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  className="text-gold-400 text-lg flex-shrink-0"
                >
                  ↓
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-5 py-4 bg-gray-800/20 border-t border-white/5">
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 text-center p-6 sm:p-8 bg-gold-500/5 border border-gold-500/20 rounded-2xl"
        >
          <h3 className="text-white font-semibold text-base sm:text-lg mb-2">Still have questions?</h3>
          <p className="text-gray-400 text-sm mb-4">Our experts are ready to help you</p>
          <div className="flex flex-col xs:flex-row justify-center gap-3">
            <a
              href="tel:+919246483744"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-700 text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
            >
              📞 Call Us
            </a>
            <a
              href="https://wa.me/919246483744"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-green-500 transition-colors"
            >
              💬 WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
