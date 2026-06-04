import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppFloat: React.FC = () => {
  return (
    <motion.a
      href="https://wa.me/919876543210?text=Hi%20ABHEE%2C%20I%27m%20interested%20in%20smart%20home%20solutions"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-400 rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center text-white text-xl sm:text-2xl transition-colors"
      aria-label="Chat on WhatsApp"
    >
      💬
    </motion.a>
  );
};

export default WhatsAppFloat;
