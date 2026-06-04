import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const DEVICE_OPTIONS = [
  { id: 'automation', label: 'Home Automation', pricePerRoom: 8000 },
  { id: 'lighting', label: 'Smart Lighting', pricePerRoom: 5000 },
  { id: 'cctv', label: 'CCTV Cameras', pricePerRoom: 4000 },
  { id: 'theater', label: 'Home Theater', pricePerRoom: 40000, perHome: true },
  { id: 'security', label: 'Smart Locks & Video Door', pricePerRoom: 15000, perHome: true },
  { id: 'audio', label: 'Multi-Room Audio', pricePerRoom: 12000 },
  { id: 'solar', label: 'Solar Fencing', pricePerRoom: 18000, perHome: true },
  { id: 'projector', label: 'Projector', pricePerRoom: 30000, perHome: true },
];

const CostCalculator: React.FC = () => {
  const [rooms, setRooms] = useState(3);
  const [selected, setSelected] = useState<string[]>(['automation', 'lighting']);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const estimate = useMemo(() => {
    return DEVICE_OPTIONS
      .filter(d => selected.includes(d.id))
      .reduce((sum, d) => sum + (d.perHome ? d.pricePerRoom : d.pricePerRoom * rooms), 0);
  }, [selected, rooms]);

  const formatPrice = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    return `₹${(n / 1000).toFixed(0)}K`;
  };

  return (
    <section className="section-container py-16 sm:py-20 lg:py-24 bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-400 text-sm sm:text-base font-medium mb-3"
          >
            BUDGET PLANNER
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Smart Home Cost Calculator
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto"
          >
            Get an instant estimate for your smart home project.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10"
        >
          {/* Room Count */}
          <div className="mb-8">
            <label className="text-white font-semibold text-base sm:text-lg mb-4 block">
              Number of Rooms: <span className="text-gold-400">{rooms}</span>
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setRooms(r => Math.max(1, r - 1))}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-colors flex-shrink-0"
              >
                −
              </button>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={rooms}
                  onChange={e => setRooms(Number(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-full appearance-none cursor-pointer accent-gold-500"
                />
                <div
                  className="absolute top-0 h-2 bg-gradient-to-r from-gold-600 to-gold-400 rounded-full pointer-events-none"
                  style={{ width: `${((rooms - 1) / 9) * 100}%` }}
                />
              </div>
              <button
                onClick={() => setRooms(r => Math.min(10, r + 1))}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-colors flex-shrink-0"
              >
                +
              </button>
            </div>
            <div className="flex justify-between text-gray-500 text-xs mt-1 px-12">
              <span>1</span><span>5</span><span>10</span>
            </div>
          </div>

          {/* Device Selection */}
          <div className="mb-8">
            <label className="text-white font-semibold text-base sm:text-lg mb-4 block">
              Select Services
            </label>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {DEVICE_OPTIONS.map(device => (
                <motion.button
                  key={device.id}
                  onClick={() => toggle(device.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 sm:p-4 rounded-xl border text-left transition-all ${
                    selected.includes(device.id)
                      ? 'border-gold-500/50 bg-gold-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-white text-xs sm:text-sm font-medium leading-tight">{device.label}</div>
                      <div className="text-gray-400 text-xs mt-1">
                        {device.perHome
                          ? `₹${(device.pricePerRoom / 1000).toFixed(0)}K (one-time)`
                          : `₹${(device.pricePerRoom / 1000).toFixed(0)}K/room`}
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      selected.includes(device.id)
                        ? 'border-gold-500 bg-gold-500'
                        : 'border-gray-500'
                    }`}>
                      {selected.includes(device.id) && <span className="text-gray-900 text-xs font-bold">✓</span>}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-r from-gold-500/10 to-gold-700/10 border border-gold-500/30 rounded-2xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Estimated Project Cost</p>
                <div className="font-display text-3xl sm:text-4xl font-bold text-gradient-gold">
                  {estimate === 0 ? '₹0' : formatPrice(estimate)}
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  * Indicative estimate. Actual cost may vary based on home layout and brand preferences.
                </p>
              </div>
              <a
                href={`https://wa.me/919876543210?text=Hi%20ABHEE%2C%20I%20need%20a%20quote%20for%20${rooms}%20rooms%20with%20${selected.join('%2C%20')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-shrink-0 bg-gradient-to-r from-gold-500 to-gold-700 text-gray-900 px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity text-center whitespace-nowrap"
              >
                Get Exact Quote →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CostCalculator;
