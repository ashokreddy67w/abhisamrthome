import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// ABHEE Smart Villa – single dashboard instance across all
// breakpoints. Layout shifts via CSS only; React state is
// never duplicated.
// ============================================================

const AbheeSmartHome = () => {
  // ----- 10 light states (single source of truth) -----
  const [balconyOn, setBalconyOn] = useState(false);
  const [parkingOn, setParkingOn] = useState(false);
  const [entranceOn, setEntranceOn] = useState(false);
  const [gardenOn, setGardenOn] = useState(false);
  const [poolOn, setPoolOn] = useState(false);
  const [livingRoomOn, setLivingRoomOn] = useState(false);
  const [bedroomOn, setBedroomOn] = useState(false);
  const [diningOn, setDiningOn] = useState(false);
  const [theaterOn, setTheaterOn] = useState(false);
  const [securityOn, setSecurityOn] = useState(false);

  const stateMap = {
    1: { value: gardenOn, setter: setGardenOn },
    2: { value: parkingOn, setter: setParkingOn },
    3: { value: entranceOn, setter: setEntranceOn },
    4: { value: securityOn, setter: setSecurityOn },
    5: { value: livingRoomOn, setter: setLivingRoomOn },
    6: { value: bedroomOn, setter: setBedroomOn },
    7: { value: diningOn, setter: setDiningOn },
    8: { value: theaterOn, setter: setTheaterOn },
    9: { value: poolOn, setter: setPoolOn },
    10: { value: balconyOn, setter: setBalconyOn },
  };

  // Refs for overlays — avoids getElementById duplication issues
  const overlayRefs = {
    balcony: useRef(null),
    parking: useRef(null),
    entrance: useRef(null),
    garden: useRef(null),
    pool: useRef(null),
    livingRoom: useRef(null),
    bedroom: useRef(null),
    dining: useRef(null),
    theater: useRef(null),
    security: useRef(null),
    allOn: useRef(null),
  };

  // Overlay opacity effect — driven by refs, not getElementById
  useEffect(() => {
    const o = overlayRefs;
    if (!o.balcony.current) return;

    const allOn = Object.values(stateMap).every((s) => s.value);
    if (allOn) {
      o.allOn.current.style.opacity = '1';
      ['balcony','parking','entrance','garden','pool','livingRoom','bedroom','dining','theater','security'].forEach(
        (k) => { if (o[k].current) o[k].current.style.opacity = '0'; }
      );
    } else {
      o.allOn.current.style.opacity = '0';
      o.balcony.current.style.opacity    = balconyOn    ? '1' : '0';
      o.parking.current.style.opacity    = parkingOn    ? '1' : '0';
      o.entrance.current.style.opacity   = entranceOn   ? '1' : '0';
      o.garden.current.style.opacity     = gardenOn     ? '1' : '0';
      o.pool.current.style.opacity       = poolOn       ? '1' : '0';
      o.livingRoom.current.style.opacity = livingRoomOn ? '1' : '0';
      o.bedroom.current.style.opacity    = bedroomOn    ? '1' : '0';
      o.dining.current.style.opacity     = diningOn     ? '1' : '0';
      o.theater.current.style.opacity    = theaterOn    ? '1' : '0';
      o.security.current.style.opacity   = securityOn   ? '1' : '0';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balconyOn, parkingOn, entranceOn, gardenOn, poolOn, livingRoomOn, bedroomOn, diningOn, theaterOn, securityOn]);

  // Device list
  const devices = [
    { id: 1, name: "Garden Lights", icon: "🌿", category: "Outdoor" },
    { id: 2, name: "Parking Lights", icon: "🚗", category: "Outdoor" },
    { id: 3, name: "Entrance Lights", icon: "🚪", category: "Indoor" },
    { id: 4, name: "Security Lights", icon: "🔒", category: "Security" },
    { id: 5, name: "Living Room", icon: "🛋️", category: "Indoor" },
    { id: 6, name: "Bedroom", icon: "🛏️", category: "Indoor" },
    { id: 7, name: "Dining Room", icon: "🍽️", category: "Indoor" },
    { id: 8, name: "Home Theater", icon: "🎬", category: "Indoor" },
    { id: 9, name: "Pool Lights", icon: "🏊", category: "Outdoor" },
    { id: 10, name: "Landscape", icon: "🌳", category: "Outdoor" },
  ];

  // deviceStates mirrors the individual light states
  const deviceStates = {};
  devices.forEach((d) => { deviceStates[d.id] = stateMap[d.id].value; });

  // Toggle a single device
  const toggleDevice = (id) => {
    if (id === 0) { toggleAllLights(); return; }
    const { value, setter } = stateMap[id];
    setter(!value);
  };

  // Master toggle
  const allLightsOn = Object.values(stateMap).every((s) => s.value);
  const toggleAllLights = () => {
    const newOn = !allLightsOn;
    Object.values(stateMap).forEach(({ setter }) => setter(newOn));
  };

  // Scenes
  const scenes = {
    "Good Morning": () => devices.forEach((d) => stateMap[d.id].setter([1, 3, 5, 6, 10].includes(d.id))),
    "Movie Mode":   () => devices.forEach((d) => stateMap[d.id].setter(d.id === 8)),
    "Good Night":   () => devices.forEach((d) => stateMap[d.id].setter(d.id === 6 || d.id === 4)),
    Away:           () => devices.forEach((d) => stateMap[d.id].setter(false)),
    "Bright All":   () => devices.forEach((d) => stateMap[d.id].setter(true)),
  };

  const activeCount   = Object.values(stateMap).filter((s) => s.value).length;
  const energyKwh     = (activeCount * 0.42).toFixed(1);
  const costEstimate  = (activeCount * 0.42 * 9).toFixed(0);

  // ------------------------------------------------------------------
  // Sub-components
  // ------------------------------------------------------------------
  const IosSwitch = ({ isOn, onToggle, deviceId, small = false }) => {
    const width      = small ? 18 : 22;
    const height     = small ? 10 : 12;
    const thumbSize  = small ? 6  : 8;
    const thumbLeftOn = width - thumbSize - 2;
    return (
      <div
        onClick={(e) => { e.stopPropagation(); onToggle(deviceId); }}
        style={{
          width, height, borderRadius: 999,
          backgroundColor: isOn ? "#34C759" : "#D1D1D6",
          cursor: "pointer", position: "relative",
          transition: "background-color 0.2s ease",
        }}
      >
        <div style={{
          position: "absolute", top: 2,
          left: isOn ? thumbLeftOn : 2,
          width: thumbSize, height: thumbSize,
          borderRadius: "50%", backgroundColor: "#FFFFFF",
          transition: "left 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
        }} />
      </div>
    );
  };

  const DeviceCard = ({ device, isOn, onToggle }) => (
    <div
      onClick={() => onToggle(device.id)}
      style={{
        height: 38, padding: "4px 6px", borderRadius: 12,
        backgroundColor: isOn ? "#E8F8EC" : "#FFFFFF",
        border: isOn ? "1px solid #34C759" : "1px solid #E5E5EA",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 12 }}>{device.icon}</span>
        <div>
          <p style={{ margin: 0, fontSize: 9, fontWeight: 600, color: isOn ? "#1C1C1E" : "#8E8E93" }}>
            {device.name}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: isOn ? "#34C759" : "#8E8E93" }} />
            <span style={{ fontSize: 9, fontWeight: 500, color: isOn ? "#28CD41" : "#8E8E93" }}>
              {isOn ? "ON" : "OFF"}
            </span>
          </div>
        </div>
      </div>
      <IosSwitch isOn={isOn} onToggle={onToggle} deviceId={device.id} small />
    </div>
  );

  // Dashboard — the ONE instance, receives all state as props
  const Dashboard = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [activeScene,  setActiveScene]  = useState(null);

    const filteredDevices = devices.filter((d) =>
      activeFilter === "All" ? true : d.category === activeFilter
    );

    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* Status Bar */}
        <div style={{ padding: "2px 12px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: "#1C1C1E" }}>9:41</span>
          <div style={{ display: "flex", gap: 3 }}>
            <div style={{ width: 14, height: 8, border: "1px solid #1C1C1E", borderRadius: 2, display: "flex", alignItems: "center", padding: "0 1px" }}>
              <div style={{ width: 9, height: 4, backgroundColor: "#34C759", borderRadius: 1 }} />
            </div>
          </div>
        </div>

        <div style={{ padding: "2px 12px 0" }}>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: "#1C1C1E", margin: 0 }}>ABHEE Smart Villa</h1>
          <p style={{ fontSize: 10, color: "#8E8E93", margin: "1px 0 0" }}>Lighting Control</p>
        </div>

        {/* Active Devices Card */}
        <div style={{ margin: "4px 12px", background: "linear-gradient(135deg, #34C759, #30D158)", borderRadius: 14, padding: "8px 10px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 8, fontWeight: 600, color: "rgba(255,255,255,0.7)", margin: 0, textTransform: "uppercase", letterSpacing: 0.5 }}>Active Devices</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#FFF", margin: "2px 0" }}>
              {activeCount}<span style={{ fontSize: 11, opacity: 0.7 }}>/10</span>
            </p>
            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", margin: "1px 0 0" }}>
              ⚡ {energyKwh} kWh · ₹{costEstimate}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 8, fontWeight: 500, color: "rgba(255,255,255,0.8)", margin: "0 0 4px" }}>ALL LIGHTS</p>
            <IosSwitch isOn={allLightsOn} onToggle={toggleDevice} deviceId={0} small={false} />
          </div>
        </div>

        {/* Scene Pills */}
        <div style={{ display: "flex", gap: 4, padding: "4px 12px", overflowX: "auto", scrollbarWidth: "none" }}>
          {[
            { label: "Good Morning", icon: "🌅" },
            { label: "Movie Mode",   icon: "🎬" },
            { label: "Good Night",   icon: "🌙" },
            { label: "Away",         icon: "🏠" },
            { label: "Bright All",   icon: "☀️" },
          ].map((scene) => (
            <button
              key={scene.label}
              onClick={() => { setActiveScene(scene.label); scenes[scene.label](); }}
              style={{
                display: "flex", alignItems: "center", gap: 3,
                height: 20, padding: "0 8px", borderRadius: 16,
                backgroundColor: activeScene === scene.label ? "#34C759" : "#FFFFFF",
                border: "1px solid #E5E5EA", fontSize: 9, fontWeight: 600,
                color: activeScene === scene.label ? "#FFFFFF" : "#1C1C1E",
                cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 10 }}>{scene.icon}</span>
              {scene.label}
            </button>
          ))}
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", gap: 4, padding: "2px 12px 4px", overflowX: "auto" }}>
          {["All", "Indoor", "Outdoor", "Security"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                height: 20, padding: "0 8px", borderRadius: 16,
                backgroundColor: activeFilter === filter ? "#1C1C1E" : "#FFFFFF",
                border: "1px solid #E5E5EA", fontSize: 9, fontWeight: 600,
                color: activeFilter === filter ? "#FFFFFF" : "#8E8E93",
                cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Device Grid */}
        <div style={{ padding: "2px 12px", flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 2 }}>
            {filteredDevices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                isOn={deviceStates[device.id]}
                onToggle={toggleDevice}
              />
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div style={{ borderTop: "1px solid #E5E5EA", padding: "4px 12px 6px", display: "flex", justifyContent: "space-between", background: "#FFFFFF" }}>
          {["Home", "Devices", "Automations", "Controls", "Settings"].map((item, idx) => (
            <div key={item} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, opacity: idx === 0 ? 1 : 0.5 }}>
              <span style={{ fontSize: 14, color: idx === 0 ? "#34C759" : "#8E8E93" }}>
                {item === "Home" ? "🏠" : item === "Devices" ? "📱" : item === "Automations" ? "⚡" : item === "Controls" ? "🎮" : "⚙️"}
              </span>
              <span style={{ fontSize: 8, fontWeight: 500, color: idx === 0 ? "#34C759" : "#8E8E93" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Villa image section — reused via ref, rendered ONCE in the DOM
  const VillaImage = () => (
    <div style={{ position: "relative", width: "100%", borderRadius: "2rem", overflow: "hidden", background: "#010205", boxShadow: "0 20px 35px -10px rgba(0,0,0,0.5)" }}>
      <img src="../images/alllightoff.png" alt="villa base" style={{ width: "100%", height: "auto", display: "block" }} />
      <img ref={overlayRefs.balcony}    className="light-overlay" src="../images/bal.png"          alt="" />
      <img ref={overlayRefs.parking}    className="light-overlay" src="../images/parking.png"      alt="" />
      <img ref={overlayRefs.entrance}   className="light-overlay" src="../images/entranceOn.png"   alt="" />
      <img ref={overlayRefs.garden}     className="light-overlay" src="../images/gardenOn.png"     alt="" />
      <img ref={overlayRefs.pool}       className="light-overlay" src="../images/poolOn.png"       alt="" />
      <img ref={overlayRefs.livingRoom} className="light-overlay" src="../images/livingRoomOn.png" alt="" />
      <img ref={overlayRefs.bedroom}    className="light-overlay" src="../images/bedroomOn.png"    alt="" />
      <img ref={overlayRefs.dining}     className="light-overlay" src="../images/diningOn.png"     alt="" />
      <img ref={overlayRefs.theater}    className="light-overlay" src="../images/theaterOn.png"    alt="" />
      <img ref={overlayRefs.security}   className="light-overlay" src="../images/securityOn.png"   alt="" />
      <img ref={overlayRefs.allOn}      className="light-overlay" src="../images/alllighton.png"   alt="" style={{ zIndex: 50 }} />
    </div>
  );

  // ------------------------------------------------------------------
  // Single render tree — layout controlled entirely by CSS classes.
  // Dashboard is rendered ONCE. VillaImage is rendered ONCE.
  // ------------------------------------------------------------------
  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        .light-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: contain;
          pointer-events: none;
          transition: opacity 0.4s cubic-bezier(0.2,0.9,0.4,1.1);
          opacity: 0;
          border-radius: 1.8rem;
        }

        /* ── Root shell ─────────────────────────────────────────── */
        .smart-villa-root {
          background: radial-gradient(circle at 20% 30%, #0B0C10, #030507);
          min-height: 100vh;
          width: 100%;
          font-family: system-ui, -apple-system, 'SF Pro Text', 'SF Pro Display', Inter, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── Villa image header ─────────────────────────────────── */
        .villa-header {
          width: 100%;
          padding: 12px 12px 0;
        }
        .villa-header h2 {
          font-size: 1.1rem;
          font-weight: 600;
          background: linear-gradient(135deg, #FFFFFF 30%, #A0B0C5 80%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin: 0 0 2px;
        }
        .villa-header p {
          font-size: 0.7rem;
          color: #8E9Aaf;
          margin: 0 0 6px;
        }

        /* ── Dashboard pill ─────────────────────────────────────── */
        .dashboard-pill {
          width: 100%;
          background: #F2F2F7;
          border-radius: 28px;
          overflow: hidden;
          flex: 1;
        }

        /* ══════════════════════════════════════════════════════════
           MOBILE  (< 768 px)
           Stack: villa image top 40vh, dashboard bottom 60vh
        ══════════════════════════════════════════════════════════ */
        @media (max-width: 767px) {
          .smart-villa-root {
            height: 100vh;
            overflow: hidden;
          }
          .villa-header {
            height: 40vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }
          .dashboard-section {
            height: 60vh;
            width: 100%;
            padding: 8px 12px 8px;
            display: flex;
          }
          /* hide the side-by-side desktop label on mobile */
          .desktop-villa-label { display: none !important; }
        }

        /* ══════════════════════════════════════════════════════════
           TABLET  (768 px – 1023 px)
           Stack: villa image full-width, dashboard below
        ══════════════════════════════════════════════════════════ */
        @media (min-width: 768px) and (max-width: 1023px) {
          .smart-villa-root {
            padding: 1.5rem;
            gap: 1.5rem;
          }
          .villa-header {
            max-width: 700px;
            width: 100%;
          }
          .villa-header h2 { font-size: 1.5rem; }
          .villa-header p  { font-size: 0.8rem; }
          .dashboard-section {
            width: 100%;
            max-width: 700px;
            height: 780px;
            display: flex;
            padding: 0;
          }
        }

        /* ══════════════════════════════════════════════════════════
           DESKTOP  (≥ 1024 px)
           Side-by-side: [ villa image ] [ phone-framed dashboard ]
        ══════════════════════════════════════════════════════════ */
        @media (min-width: 1024px) {
          .smart-villa-root {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 2rem 3rem;
            gap: 3rem;
            min-height: 100vh;
          }
          .villa-column {
            flex: 1;
            min-width: 0;
            max-width: 860px;
          }
          .villa-header {
            padding: 0;
            margin-bottom: 1rem;
          }
          .villa-header h2 { font-size: 1.7rem; }
          .villa-header p  { font-size: 0.85rem; }
          /* Dashboard wrapped in phone frame on desktop */
          .dashboard-section {
            flex-shrink: 0;
            width: 390px;
            height: 780px;
            background: #111113;
            border-radius: 48px;
            box-shadow:
              0 30px 40px -20px rgba(0,0,0,0.5),
              0 0 0 6px #3a3a3e,
              0 0 0 12px #1c1c1e;
            position: relative;
            overflow: hidden;
            padding: 0;
            display: block;
          }
          .dynamic-island {
            display: block !important;
          }
          .dashboard-pill {
            border-radius: 48px;
            margin: 12px;
            height: calc(100% - 24px);
          }
        }

        /* Dynamic island hidden unless inside phone frame */
        .dynamic-island {
          display: none;
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 34px;
          background: #0a0a0c;
          border-radius: 28px;
          z-index: 20;
          pointer-events: none;
        }
      `}</style>

      <div className="smart-villa-root">

        {/* ── Villa image column (desktop) / header (mobile+tablet) ── */}
        <div className="villa-column">
          <div className="villa-header">
            <h2>✦ Abhee Lumina Villa</h2>
            <p>Ambient Intelligence | Live lighting orchestration</p>
            <VillaImage />
          </div>
        </div>

        {/* ── Dashboard — rendered ONCE, styled differently per breakpoint ── */}
        <div className="dashboard-section">
          <div className="dynamic-island" />
          <div className="dashboard-pill">
            <Dashboard />
          </div>
        </div>

      </div>
    </>
  );
};

export default AbheeSmartHome;