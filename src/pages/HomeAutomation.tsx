import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Lightbulb,
 
  Thermometer,
  Lock,
  Unlock,
  Camera,
  Tv,
 Blinds,
  Wind,
  Home,
  BedDouble,
  Utensils,
  Clapperboard,
  Sofa,
  Sun,
  Moon,
  Film,
  LogOut,
  Music,
  Sparkles,
 
  Wifi,

  Disc,
} from 'lucide-react';

// --- Helper: Glowing pulse animation for lights ---
const glowingPulse = {
  initial: { boxShadow: '0 0 0px rgba(201,168,76,0)' },
  active: {
    boxShadow: '0 0 15px rgba(201,168,76,0.8), 0 0 30px rgba(201,168,76,0.4)',
    transition: { repeat: Infinity, repeatType: 'reverse', duration: 1.5 },
  },
};

// --- Room Visualization Component ---
interface RoomProps {
  name: string;
  icon: React.ReactNode;
  lightOn: boolean;
  hasCurtain?: boolean;
  curtainOpen?: boolean;
  acOn?: boolean;
  onToggleLight?: () => void;
}

const RoomCard: React.FC<RoomProps> = ({ name, icon, lightOn, hasCurtain, curtainOpen, acOn, onToggleLight }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative backdrop-blur-md rounded-2xl p-3 sm:p-4 border transition-all duration-300 cursor-pointer ${
        lightOn
          ? 'bg-amber-500/10 border-amber-500/40 shadow-[0_0_15px_rgba(201,168,76,0.3)]'
          : 'bg-white/5 border-white/10 hover:border-amber-500/20'
      }`}
      onClick={onToggleLight}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`text-2xl transition-all ${lightOn ? 'text-amber-400 drop-shadow-glow' : 'text-gray-500'}`}>
            {icon}
          </div>
          <span className="text-sm sm:text-base font-medium text-white">{name}</span>
        </div>
        {lightOn && (
          <motion.div
            className="w-2 h-2 rounded-full bg-amber-400"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          />
        )}
      </div>
      <div className="flex gap-3 mt-2 text-xs text-gray-400">
        {hasCurtain !== undefined && (
          <div className="flex items-center gap-1">
            <Blinds size={12} />
            <span>{curtainOpen ? 'Open' : 'Closed'}</span>
          </div>
        )}
        {acOn !== undefined && acOn && (
          <div className="flex items-center gap-1 text-cyan-400">
            <Wind size={12} /> <span>AC</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Main Component ---
const SmartHomeExperience: React.FC = () => {
  // ----- State -----
  const [lights, setLights] = useState({
    living: true,
    bedroom: false,
    kitchen: false,
    hall: true,
  });
  const [curtainsOpen, setCurtainsOpen] = useState(true);
  const [acOn, setAcOn] = useState(true);
  const [acTemp, setAcTemp] = useState(22);
  const [doorLocked, setDoorLocked] = useState(true);
  const [cctvActive, setCctvActive] = useState(true);
  const [theaterOn, setTheaterOn] = useState(false);
  const [partyMode, setPartyMode] = useState(false);
  const [activeScene, setActiveScene] = useState<string | null>(null);

  // For dynamic AC cooling animation
  const [acCooling, setAcCooling] = useState(false);
  useEffect(() => {
    if (acOn) {
      const interval = setInterval(() => setAcCooling((prev) => !prev), 800);
      return () => clearInterval(interval);
    } else {
      setAcCooling(false);
    }
  }, [acOn]);

  // Party mode RGB cycle (simulated by changing text/border colors)
  const [partyColor, setPartyColor] = useState('#C9A84C');
  useEffect(() => {
    if (!partyMode) return;
    const colors = ['#C9A84C', '#FF6B6B', '#4ECDC4', '#FFE66D', '#A5678F'];
    let i = 0;
    const interval = setInterval(() => {
      setPartyColor(colors[i % colors.length]);
      i++;
    }, 400);
    return () => clearInterval(interval);
  }, [partyMode]);

  // ----- Scene Handlers -----
  const activateMorning = () => {
    setPartyMode(false);
    setActiveScene('morning');
    setLights({ living: true, bedroom: true, kitchen: true, hall: true });
    setCurtainsOpen(true);
    setAcOn(false);
    setTheaterOn(false);
    setDoorLocked(false);
    setCctvActive(true);
  };
  const activateNight = () => {
    setPartyMode(false);
    setActiveScene('night');
    setLights({ living: false, bedroom: false, kitchen: false, hall: true });
    setCurtainsOpen(false);
    setAcOn(true);
    setAcTemp(24);
    setDoorLocked(true);
    setCctvActive(true);
    setTheaterOn(false);
  };
  const activateMovie = () => {
    setPartyMode(false);
    setActiveScene('movie');
    setLights({ living: false, bedroom: false, kitchen: false, hall: true }); // hall = ambient
    setCurtainsOpen(false);
    setAcOn(true);
    setAcTemp(20);
    setTheaterOn(true);
    setDoorLocked(true);
    setCctvActive(true);
  };
  const activateAway = () => {
    setPartyMode(false);
    setActiveScene('away');
    setLights({ living: false, bedroom: false, kitchen: false, hall: false });
    setCurtainsOpen(false);
    setAcOn(false);
    setTheaterOn(false);
    setDoorLocked(true);
    setCctvActive(true);
  };
  const activateParty = () => {
    setActiveScene('party');
    setPartyMode(true);
    setLights({ living: true, bedroom: true, kitchen: true, hall: true });
    setCurtainsOpen(false);
    setAcOn(true);
    setAcTemp(18);
    setTheaterOn(true);
    setDoorLocked(true);
    setCctvActive(true);
  };

  // Individual device toggles
  const toggleLight = (room: keyof typeof lights) => {
    setPartyMode(false);
    setActiveScene(null);
    setLights((prev) => ({ ...prev, [room]: !prev[room] }));
  };
  const toggleCurtains = () => {
    setPartyMode(false);
    setActiveScene(null);
    setCurtainsOpen((prev) => !prev);
  };
  const toggleAc = () => {
    setPartyMode(false);
    setActiveScene(null);
    setAcOn((prev) => !prev);
  };
  const toggleDoorLock = () => setDoorLocked((prev) => !prev);
  const toggleCctv = () => setCctvActive((prev) => !prev);
  const toggleTheater = () => {
    setPartyMode(false);
    setActiveScene(null);
    setTheaterOn((prev) => !prev);
  };

  // ----- Animation variants -----
  const curtainVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: 30, opacity: 0 },
  };
  const lockVariants = {
    locked: { rotate: 0 },
    unlocked: { rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-black via-gray-950 to-black text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent"
          >
            Experience the Future of Smart Living
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 text-base sm:text-lg mt-4 max-w-2xl mx-auto"
          >
            Control your entire home with a single touch. See how smart automation transforms everyday living.
          </motion.p>
        </div>

        {/* Main 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LEFT: Control Panel */}
          <div className="lg:w-2/5">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-amber-400 mb-6">
                <Wifi className="w-5 h-5" /> Smart Control Hub
              </h3>

              {/* Scene Modes */}
              <div className="mb-8">
                <p className="text-sm text-gray-400 mb-3">One‑Tap Scenes</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[
                    { icon: Sun, label: 'Morning', action: activateMorning, color: 'from-amber-500/20' },
                    { icon: Moon, label: 'Night', action: activateNight, color: 'from-blue-500/20' },
                    { icon: Film, label: 'Movie', action: activateMovie, color: 'from-purple-500/20' },
                    { icon: LogOut, label: 'Away', action: activateAway, color: 'from-red-500/20' },
                    { icon: Music, label: 'Party', action: activateParty, color: 'from-pink-500/20' },
                  ].map((scene) => (
                    <motion.button
                      key={scene.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={scene.action}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl bg-gradient-to-br ${scene.color} to-transparent border ${
                        activeScene === scene.label.toLowerCase()
                          ? 'border-amber-400 shadow-lg shadow-amber-500/20'
                          : 'border-white/10 hover:border-amber-400/50'
                      } transition-all`}
                    >
                      <scene.icon className="w-5 h-5 text-amber-300" />
                      <span className="text-xs font-medium">{scene.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quick Controls */}
              <div className="space-y-4">
                <p className="text-sm text-gray-400">Individual Devices</p>
                <div className="grid grid-cols-2 gap-3">
                  <ControlButton icon={Lightbulb} label="Living Light" active={lights.living} onClick={() => toggleLight('living')} />
                  <ControlButton icon={Lightbulb} label="Bedroom Light" active={lights.bedroom} onClick={() => toggleLight('bedroom')} />
                  <ControlButton icon={Lightbulb} label="Kitchen Light" active={lights.kitchen} onClick={() => toggleLight('kitchen')} />
                  <ControlButton icon={Lightbulb} label="Hall Light" active={lights.hall} onClick={() => toggleLight('hall')} />
                  <ControlButton  icon={Blinds}  label="Curtains"  active={curtainsOpen}  onClick={toggleCurtains}  activeLabel="Open"  inactiveLabel="Closed"/>
                  <ControlButton icon={Wind} label="AC" active={acOn} onClick={toggleAc} />
                  <ControlButton icon={Lock} label="Door Lock" active={doorLocked} onClick={toggleDoorLock} activeLabel="Locked" inactiveLabel="Unlocked" />
                  <ControlButton icon={Camera} label="CCTV" active={cctvActive} onClick={toggleCctv} />
                  <ControlButton icon={Tv} label="Home Theater" active={theaterOn} onClick={toggleTheater} />
                </div>
              </div>

              {/* AC Temperature Control */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">AC Temperature</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAcTemp((t) => Math.max(16, t - 1))}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-2xl font-light w-12 text-center">{acTemp}°</span>
                    <button
                      onClick={() => setAcTemp((t) => Math.min(30, t + 1))}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                {acOn && (
                  <div className="mt-3 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600"
                      animate={{ width: `${((acTemp - 16) / 14) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Interactive House Visualization */}
          <div className="lg:w-3/5">
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 overflow-hidden">
              {/* Party Mode dynamic overlay */}
              {partyMode && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ backgroundColor: [partyColor + '20', partyColor + '40', partyColor + '20'] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}

              <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
                <Home className="w-5 h-5 text-amber-400" /> Interactive Home Visualizer
              </h3>

              {/* Rooms Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <RoomCard
                  name="Living Room"
                  icon={<Sofa size={20} />}
                  lightOn={lights.living}
                  hasCurtain
                  curtainOpen={curtainsOpen}
                  acOn={acOn}
                  onToggleLight={() => toggleLight('living')}
                />
                <RoomCard
                  name="Bedroom"
                  icon={<BedDouble size={20} />}
                  lightOn={lights.bedroom}
                  hasCurtain
                  curtainOpen={curtainsOpen}
                  acOn={acOn}
                  onToggleLight={() => toggleLight('bedroom')}
                />
                <RoomCard
                  name="Kitchen"
                  icon={<Utensils size={20} />}
                  lightOn={lights.kitchen}
                  onToggleLight={() => toggleLight('kitchen')}
                />
                <RoomCard
                  name="Home Theater"
                  icon={<Clapperboard size={20} />}
                  lightOn={theaterOn}
                  hasCurtain
                  curtainOpen={curtainsOpen}
                  onToggleLight={() => setTheaterOn(!theaterOn)}
                />
                <RoomCard
                  name="Main Hall"
                  icon={<Home size={20} />}
                  lightOn={lights.hall}
                  hasCurtain
                  curtainOpen={curtainsOpen}
                  onToggleLight={() => toggleLight('hall')}
                />
              </div>

              {/* Status Indicators & Animations */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10">
                {/* Curtain Animation */}
                <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
                  <div className="flex gap-1">
                    <motion.div variants={curtainVariants} animate={curtainsOpen ? 'open' : 'closed'} className="w-4 h-8 bg-amber-600/50 rounded-sm" />
                    <motion.div variants={curtainVariants} animate={curtainsOpen ? 'open' : 'closed'} className="w-4 h-8 bg-amber-600/50 rounded-sm" />
                  </div>
                  <span className="text-xs mt-1 text-gray-400">Curtains {curtainsOpen ? 'Open' : 'Closed'}</span>
                </div>

                {/* AC Airflow Animation */}
                <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
                  <div className="relative">
                    <Wind className={`w-6 h-6 ${acOn ? 'text-cyan-400' : 'text-gray-500'}`} />
                    {acOn && (
                      <>
                        <motion.div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full"
                          animate={{ scale: acCooling ? [1, 2] : 1, opacity: acCooling ? 1 : 0 }}
                          transition={{ duration: 0.6 }}
                        />
                        <motion.div
                          className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full"
                          animate={{ scale: acCooling ? [1, 1.5] : 1, opacity: acCooling ? 0.6 : 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        />
                      </>
                    )}
                  </div>
                  <span className="text-xs mt-1">{acOn ? `${acTemp}°C · Cooling` : 'AC Off'}</span>
                </div>

                {/* Door Lock Animation */}
                <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
                  <motion.div
                    variants={lockVariants}
                    animate={doorLocked ? 'locked' : 'unlocked'}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleDoorLock}
                    className="cursor-pointer"
                  >
                    {doorLocked ? <Lock className="w-6 h-6 text-amber-400" /> : <Unlock className="w-6 h-6 text-green-400" />}
                  </motion.div>
                  <span className="text-xs mt-1">{doorLocked ? 'Secured' : 'Unlocked'}</span>
                </div>

                {/* CCTV Active Indicator */}
                <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
                  <div className="relative">
                    <Camera className={`w-6 h-6 ${cctvActive ? 'text-red-500' : 'text-gray-500'}`} />
                    {cctvActive && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                      />
                    )}
                  </div>
                  <span className="text-xs mt-1">CCTV {cctvActive ? 'Recording' : 'Off'}</span>
                </div>
              </div>

              {/* Special Effects for Movie Mode */}
              {activeScene === 'movie' && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-900/30 to-transparent" />
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-400/20 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Micro‑interaction: active scene badge */}
        {activeScene && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm">
              <Sparkles size={14} />
              {activeScene.charAt(0).toUpperCase() + activeScene.slice(1)} Mode Active
              {activeScene === 'party' && <Disc size={14} className="animate-spin" />}
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// --- Reusable Control Button Component ---
interface ControlButtonProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  activeLabel?: string;
  inactiveLabel?: string;
}
const ControlButton: React.FC<ControlButtonProps> = ({ icon: Icon, label, active, onClick, activeLabel, inactiveLabel }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center justify-between p-2 rounded-xl transition-all ${
        active ? 'bg-amber-500/20 border border-amber-500/50 shadow-glow' : 'bg-white/5 border border-white/10 hover:border-amber-500/30'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-gray-400'}`} />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <span className={`text-xs ${active ? 'text-amber-400' : 'text-gray-500'}`}>
        {active ? (activeLabel || 'ON') : (inactiveLabel || 'OFF')}
      </span>
    </motion.button>
  );
};

export default SmartHomeExperience;