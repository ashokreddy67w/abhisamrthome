import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../../data';

const ServicesSection: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="services" className="section-container py-16 sm:py-20 lg:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-400 text-sm sm:text-base font-medium mb-3"
          >
            WHAT WE OFFER
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Premium smart home solutions tailored for your needs, budget, and lifestyle.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onHoverStart={() => setHovered(service.id)}
              onHoverEnd={() => setHovered(null)}
              className="group relative bg-gray-800/50 border border-white/10 hover:border-gold-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:bg-gray-800 cursor-pointer flex flex-col"
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gold-500/10 flex items-center justify-center text-2xl sm:text-3xl mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-base sm:text-lg mb-2">{service.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 flex-grow">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {service.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs px-2 py-0.5 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-full"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between">
                <span className="text-gold-400 font-semibold text-xs sm:text-sm">{service.price}</span>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Get Quote →
                </a>
              </div>

              {/* Hover Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered === service.id ? 1 : 0 }}
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top left, rgba(201,168,76,0.08), transparent 70%)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Not sure which solution is right for you? Get a free consultation.
          </p>
          <div className="flex flex-col xs:flex-row justify-center gap-3">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-700 text-gray-900 px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-bold hover:opacity-90 transition-opacity"
            >
              📞 Call for Free Consultation
            </a>
            <a
              href="https://wa.me/9246483744"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-bold transition-colors"
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
