import React from 'react';
import { motion } from 'framer-motion';
import { WHY_CHOOSE_US } from '../../data';

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="section-container py-16 sm:py-20 lg:py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold-400 text-sm sm:text-base font-medium mb-3"
            >
              WHY CHOOSE US
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Andhra Pradesh's Most Trusted Smart Home Company
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8"
            >
              With over a decade of experience and 500+ successful installations across Guntur and AP, we bring world-class technology to your doorstep.
            </motion.p>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 p-4 sm:p-6 bg-white/5 rounded-2xl border border-white/10">
              {[
                { n: '500+', l: 'Projects' },
                { n: '10+', l: 'Years' },
                { n: '50+', l: 'Brands' },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gradient-gold">{s.n}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_CHOOSE_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 sm:p-5 bg-gray-800/50 border border-white/10 hover:border-gold-500/30 rounded-xl transition-colors group"
              >
                <span className="text-2xl sm:text-3xl block mb-3 group-hover:scale-110 transition-transform origin-left">
                  {item.icon}
                </span>
                <h3 className="text-white font-semibold text-sm sm:text-base mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
