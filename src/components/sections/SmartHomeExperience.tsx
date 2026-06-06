import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTROLS = [
  { id: 'lights', icon: '💡', label: 'Lights', value: '75%', color: 'from-yellow-500/20 to-yellow-600/10' },
  { id: 'ac', icon: '❄️', label: 'AC', value: '24°C', color: 'from-blue-500/20 to-blue-600/10' },
  { id: 'security', icon: '🔒', label: 'Security', value: 'Armed', color: 'from-green-500/20 to-green-600/10' },
  { id: 'music', icon: '🎵', label: 'Music', value: 'Playing', color: 'from-purple-500/20 to-purple-600/10' },
  { id: 'curtains', icon: '🪟', label: 'Curtains', value: '50% Open', color: 'from-orange-500/20 to-orange-600/10' },
  { id: 'camera', icon: '📹', label: 'Cameras', value: '8 Active', color: 'from-red-500/20 to-red-600/10' },
];

const SmartHomeExperience: React.FC = () => {
  const [activeControl, setActiveControl] = useState<string>('lights');
  const [lightOn, setLightOn] = useState(true);
  const [acTemp, setAcTemp] = useState(24);
  const [securityArmed, setSecurityArmed] = useState(true);

  return (
    <section className="section-container py-16 sm:py-20 lg:py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-400 text-sm sm:text-base font-medium mb-3"
          >
            INTERACTIVE DEMO
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Experience the Smart Home
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Control every aspect of your home with a single tap. This is what living smart feels like.
          </motion.p>
        </div>

        {/* Demo Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-glass-dark rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-semibold text-lg">Smart Control Hub</h3>
                <p className="text-gray-400 text-sm">All devices connected</p>
              </div>
              <div className="flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 text-green-400 text-xs px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live
              </div>
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {CONTROLS.map((ctrl) => (
                <motion.button
                  key={ctrl.id}
                  onClick={() => setActiveControl(ctrl.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`p-3 sm:p-4 rounded-xl border transition-all text-left ${
                    activeControl === ctrl.id
                      ? 'border-gold-500/50 bg-gold-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <span className="text-xl sm:text-2xl block mb-1">{ctrl.icon}</span>
                  <div className="text-white text-xs sm:text-sm font-medium truncate">{ctrl.label}</div>
                  <div className="text-gray-400 text-xs truncate">{ctrl.value}</div>
                </motion.button>
              ))}
            </div>

            {/* Active Control Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeControl}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/5 rounded-xl p-4"
              >
                {activeControl === 'lights' && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">Living Room Lights</p>
                      <p className="text-gray-400 text-xs">Brightness: 75%</p>
                    </div>
                    <button
                      onClick={() => setLightOn(!lightOn)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        lightOn ? 'bg-gold-500' : 'bg-gray-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: lightOn ? 24 : 2 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                      />
                    </button>
                  </div>
                )}
                {activeControl === 'ac' && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">Air Conditioning</p>
                      <p className="text-gray-400 text-xs">Mode: Cool</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setAcTemp(t => Math.max(16, t - 1))} className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold">−</button>
                      <span className="text-white font-bold w-10 text-center">{acTemp}°</span>
                      <button onClick={() => setAcTemp(t => Math.min(30, t + 1))} className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 font-bold">+</button>
                    </div>
                  </div>
                )}
                {activeControl === 'security' && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">Security System</p>
                      <p className="text-gray-400 text-xs">{securityArmed ? 'All zones armed' : 'Disarmed'}</p>
                    </div>
                    <button
                      onClick={() => setSecurityArmed(!securityArmed)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                        securityArmed ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {securityArmed ? '🔒 Armed' : '🔓 Disarmed'}
                    </button>
                  </div>
                )}
                {!['lights', 'ac', 'security'].includes(activeControl) && (
                  <p className="text-gray-300 text-sm text-center py-2">
                    {CONTROLS.find(c => c.id === activeControl)?.icon} {CONTROLS.find(c => c.id === activeControl)?.label} is {CONTROLS.find(c => c.id === activeControl)?.value}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { icon: '🗣️', title: 'Voice Control', desc: 'Works with Alexa, Google Assistant & Siri' },
              { icon: '📱', title: 'App Control', desc: 'Control from anywhere via iOS & Android app' },
              { icon: '🤖', title: 'AI Automation', desc: 'Smart routines that learn your lifestyle' },
              { icon: '⚡', title: 'Energy Saving', desc: 'Reduce energy bills by up to 40%' },
              { icon: '🔒', title: 'Bank-Level Security', desc: 'Military-grade encrypted communication' },
              { icon: '🌐', title: 'Universal Compatible', desc: 'Works with all major smart home platforms' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold-500/30 transition-colors"
              >
                <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">{feature.title}</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SmartHomeExperience;
