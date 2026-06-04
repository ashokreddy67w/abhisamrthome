import React from 'react';
import { motion } from 'framer-motion';
import { BRANDS } from '../../data';

const BrandsSection: React.FC = () => {
  return (
    <section className="section-container py-12 sm:py-16 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm sm:text-base mb-8"
        >
          BRANDS WE WORK WITH
        </motion.p>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 sm:gap-10 animate-[scroll_30s_linear_infinite] w-max">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="flex-shrink-0 flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl min-w-[100px] sm:min-w-[130px]"
              >
                <span className="text-gray-300 font-medium text-xs sm:text-sm whitespace-nowrap">{brand}</span>
              </div>
            ))}
          </div>
          {/* Gradient masks */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-gray-950 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-gray-950 to-transparent pointer-events-none z-10" />
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default BrandsSection;
