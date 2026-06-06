import React, { useState, useEffect } from 'react';

// ============================================================
// Apple HomeKit‑inspired dashboard – refined, clean, minimal
// ============================================================

const AbheeSmartHome = () => {
  // ----- 10 light states (driving villa overlays) -----
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

  // Overlay opacity effect (same as before)
  useEffect(() => {
    const overlays = {
      balcony: document.getElementById('balconyOverlay'),
      parking: document.getElementById('parkingOverlay'),
      entrance: document.getElementById('entranceOverlay'),
      garden: document.getElementById('gardenOverlay'),
      pool: document.getElementById('poolOverlay'),
      livingRoom: document.getElementById('livingRoomOverlay'),
      bedroom: document.getElementById('bedroomOverlay'),
      dining: document.getElementById('diningOverlay'),
      theater: document.getElementById('theaterOverlay'),
      security: document.getElementById('securityOverlay'),
      allOn: document.getElementById('allOnOverlay'),
    };
    if (!overlays.balcony) return;

    const allOn = Object.values(stateMap).every((s) => s.value);
    if (allOn) {
      overlays.allOn.style.opacity = '1';
      Object.keys(overlays).forEach((key) => {
        if (key !== 'allOn' && overlays[key]) overlays[key].style.opacity = '0';
      });
    } else {
      overlays.allOn.style.opacity = '0';
      overlays.balcony.style.opacity = balconyOn ? '1' : '0';
      overlays.parking.style.opacity = parkingOn ? '1' : '0';
      overlays.entrance.style.opacity = entranceOn ? '1' : '0';
      overlays.garden.style.opacity = gardenOn ? '1' : '0';
      overlays.pool.style.opacity = poolOn ? '1' : '0';
      overlays.livingRoom.style.opacity = livingRoomOn ? '1' : '0';
      overlays.bedroom.style.opacity = bedroomOn ? '1' : '0';
      overlays.dining.style.opacity = diningOn ? '1' : '0';
      overlays.theater.style.opacity = theaterOn ? '1' : '0';
      overlays.security.style.opacity = securityOn ? '1' : '0';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balconyOn, parkingOn, entranceOn, gardenOn, poolOn, livingRoomOn, bedroomOn, diningOn, theaterOn, securityOn]);

  // Device list
  const devices = [
    { id: 1, name: "Garden Lights", icon: "🌿", category: "Outdoor", auto: true },
    { id: 2, name: "Parking Lights", icon: "🚗", category: "Outdoor", auto: false },
    { id: 3, name: "Entrance Lights", icon: "🚪", category: "Indoor", auto: true },
    { id: 4, name: "Security Lights", icon: "🔒", category: "Security", auto: false },
    { id: 5, name: "Living Room", icon: "🛋️", category: "Indoor", auto: true },
    { id: 6, name: "Bedroom", icon: "🛏️", category: "Indoor", auto: true },
    { id: 7, name: "Dining Room", icon: "🍽️", category: "Indoor", auto: false },
    { id: 8, name: "Home Theater", icon: "🎬", category: "Indoor", auto: false },
    { id: 9, name: "Pool Lights", icon: "🏊", category: "Outdoor", auto: false },
    { id: 10, name: "Landscape", icon: "🌳", category: "Outdoor", auto: false },
  ];

  // State for device ON/OFF (brightness and hours are no longer shown)
  const [deviceStates, setDeviceStates] = useState(() => {
    const init = {};
    devices.forEach((d) => {
      init[d.id] = d.id % 3 !== 0; // same seed logic
    });
    return init;
  });

  // Sync with villa lights
  useEffect(() => {
    const newStates = { ...deviceStates };
    devices.forEach((device) => {
      const { value } = stateMap[device.id];
      if (newStates[device.id] !== value) {
        newStates[device.id] = value;
      }
    });
    setDeviceStates(newStates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balconyOn, parkingOn, entranceOn, gardenOn, poolOn, livingRoomOn, bedroomOn, diningOn, theaterOn, securityOn]);

  const toggleDevice = (id) => {
    const { value, setter } = stateMap[id];
    setter(!value);
    setDeviceStates((prev) => ({ ...prev, [id]: !value }));
  };

  const allLightsOn = Object.values(stateMap).every((s) => s.value);
  const toggleAllLights = () => {
    const newOn = !allLightsOn;
    Object.values(stateMap).forEach(({ setter }) => setter(newOn));
    const newDeviceStates = { ...deviceStates };
    devices.forEach((device) => {
      newDeviceStates[device.id] = newOn;
    });
    setDeviceStates(newDeviceStates);
  };

  // Scenes (same logic but simplified)
  const scenes = {
    "Good Morning": () => {
      devices.forEach((d) => {
        if ([1, 3, 5, 6].includes(d.id)) stateMap[d.id].setter(true);
        else if (d.id === 10) stateMap[d.id].setter(true);
        else stateMap[d.id].setter(false);
      });
    },
    "Movie Mode": () => {
      devices.forEach((d) => stateMap[d.id].setter(d.id === 8));
    },
    "Good Night": () => {
      devices.forEach((d) => stateMap[d.id].setter(d.id === 6 || d.id === 4));
    },
    Away: () => devices.forEach((d) => stateMap[d.id].setter(false)),
    "Bright All": () => devices.forEach((d) => stateMap[d.id].setter(true)),
  };

  // Calculate energy (simplified)
  const activeCount = Object.values(stateMap).filter((s) => s.value).length;
  const energyKwh = (activeCount * 0.42).toFixed(1);
  const costEstimate = (activeCount * 0.42 * 9).toFixed(0);

  // ------------------------------------------------------------------
  // Apple Home‑style components
  // ------------------------------------------------------------------
  const IosSwitch = ({ isOn, onToggle }) => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      style={{
        width: 36,
        height: 20,
        borderRadius: 10,
        backgroundColor: isOn ? "#34C759" : "#D1D1D6",
        cursor: "pointer",
        position: "relative",
        transition: "background-color 0.2s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: isOn ? 18 : 2,
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          transition: "left 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
        }}
      />
    </div>
  );

  const DeviceCard = ({ device, isOn, onToggle }) => (
    <div
      onClick={() => onToggle(device.id)}
      style={{
        height: 90,
        padding: 8,
        borderRadius: 16,
        backgroundColor: isOn ? "#E8F8EC" : "#FFFFFF",
        border: isOn ? "1px solid #34C759" : "1px solid #E5E5EA",
        boxShadow: isOn ? "0 2px 8px rgba(52,199,89,0.12)" : "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 20, lineHeight: 1 }}>{device.icon}</span>
        <IosSwitch isOn={isOn} onToggle={() => onToggle(device.id)} />
      </div>
      <div>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 600,
            color: "#1C1C1E",
            lineHeight: 1.3,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {device.name}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: isOn ? "#34C759" : "#8E8E93",
            }}
          />
          <span style={{ fontSize: 10, fontWeight: 500, color: isOn ? "#28CD41" : "#8E8E93" }}>
            {isOn ? "ON" : "OFF"}
          </span>
        </div>
      </div>
    </div>
  );

  const SceneButton = ({ label, icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        height: 30,
        padding: "0 12px",
        borderRadius: 20,
        backgroundColor: isActive ? "#34C759" : "#FFFFFF",
        border: "1px solid #E5E5EA",
        fontSize: 11,
        fontWeight: 600,
        color: isActive ? "#FFFFFF" : "#1C1C1E",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.2s ease",
        boxShadow: isActive ? "0 2px 6px rgba(52,199,89,0.25)" : "none",
      }}
    >
      <span style={{ fontSize: 13 }}>{icon}</span>
      {label}
    </button>
  );

  const FilterButton = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      style={{
        height: 30,
        padding: "0 14px",
        borderRadius: 20,
        backgroundColor: isActive ? "#1C1C1E" : "#FFFFFF",
        border: "1px solid #E5E5EA",
        fontSize: 11,
        fontWeight: 600,
        color: isActive ? "#FFFFFF" : "#8E8E93",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  );

  // ------------------------------------------------------------------
  // Dashboard content (used both inside phone frame and full width)
  // ------------------------------------------------------------------
  const DashboardContent = ({
    activeCount,
    energyKwh,
    costEstimate,
    allLightsOn,
    toggleAllLights,
    activeScene,
    setActiveScene,
    activeFilter,
    setActiveFilter,
    filteredDevices,
    deviceStates,
    toggleDevice,
  }) => {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", overflowY: "auto", paddingBottom: 16 }}>
        {/* Status Bar (only decorative) */}
        <div style={{ padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFFFFF" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>9:41</span>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ width: 18, height: 10, border: "1px solid #1C1C1E", borderRadius: 3, display: "flex", alignItems: "center", padding: "0 1px" }}>
              <div style={{ width: 12, height: 6, backgroundColor: "#34C759", borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Header */}
        <div style={{ padding: "4px 16px 8px" }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1C1C1E", margin: 0 }}>ABHEE Smart Villa</h1>
          <p style={{ fontSize: 12, color: "#8E8E93", margin: "2px 0 0" }}>Lighting Control</p>
        </div>

        {/* Summary Card */}
        <div style={{ margin: "4px 16px", background: "linear-gradient(135deg, #34C759, #30D158)", borderRadius: 16, padding: "12px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.7)", margin: 0, textTransform: "uppercase" }}>Active Devices</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: "#FFF", margin: "2px 0" }}>
                {activeCount}<span style={{ fontSize: 14, opacity: 0.7 }}>/10</span>
              </p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", margin: "4px 0 0" }}>
                ⚡ {energyKwh} kWh · ₹{costEstimate}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.8)", marginBottom: 6, textAlign: "right" }}>All Lights</p>
              <div
                onClick={toggleAllLights}
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  background: allLightsOn ? "#FFFFFF" : "rgba(255,255,255,0.3)",
                  position: "relative",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    left: allLightsOn ? 24 : 2,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: allLightsOn ? "#34C759" : "#FFFFFF",
                    transition: "left 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scenes Row */}
        <div style={{ display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto", scrollbarWidth: "none" }}>
          {[
            { label: "Good Morning", icon: "🌅" },
            { label: "Movie Mode", icon: "🎬" },
            { label: "Good Night", icon: "🌙" },
            { label: "Away", icon: "🏠" },
            { label: "Bright All", icon: "☀️" },
          ].map((scene) => (
            <SceneButton
              key={scene.label}
              label={scene.label}
              icon={scene.icon}
              isActive={activeScene === scene.label}
              onClick={() => {
                setActiveScene(scene.label);
                scenes[scene.label]();
              }}
            />
          ))}
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", gap: 6, padding: "0 16px 12px", overflowX: "auto" }}>
          {["All", "Indoor", "Outdoor", "Security"].map((filter) => (
            <FilterButton
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>

        {/* Device Grid */}
        <div style={{ padding: "0 16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
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

        {/* Bottom Navigation (simulated – no routing) */}
        <div style={{ marginTop: "auto", borderTop: "1px solid #E5E5EA", padding: "8px 16px 12px", display: "flex", justifyContent: "space-between", background: "#FFFFFF" }}>
          {["Home", "Devices", "Automations", "Controls", "Settings"].map((item, idx) => (
            <div key={item} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, opacity: idx === 0 ? 1 : 0.5 }}>
              <span style={{ fontSize: 18, color: idx === 0 ? "#34C759" : "#8E8E93" }}>
                {item === "Home" ? "🏠" : item === "Devices" ? "📱" : item === "Automations" ? "⚡" : item === "Controls" ? "🎮" : "⚙️"}
              </span>
              <span style={{ fontSize: 9, fontWeight: 500, color: idx === 0 ? "#34C759" : "#8E8E93" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ------------------------------------------------------------------
  // Main layout: villa preview + phone frame (desktop) or full width (mobile)
  // ------------------------------------------------------------------
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeScene, setActiveScene] = useState(null);
  const filteredDevices = devices.filter((d) => (activeFilter === "All" ? true : d.category === activeFilter));

  return (
    <div
      style={{
        background: "radial-gradient(circle at 20% 30%, #0B0C10, #030507)",
        minHeight: "100vh",
        fontFamily:
          "system-ui, -apple-system, 'SF Pro Text', 'SF Pro Display', Inter, sans-serif",
        padding: "clamp(0.75rem, 3vw, 2rem)",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          background: "rgba(15, 20, 28, 0.45)",
          backdropFilter: "blur(8px)",
          borderRadius: "2.5rem",
          padding: "clamp(0.8rem, 3vw, 1.5rem)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 4vw, 2rem)" }}>
          {/* Villa Preview – always visible */}
          <div style={{ width: "100%" }}>
            <div style={{ marginBottom: "1rem" }}>
              <h2
                style={{
                  fontSize: "clamp(1.3rem, 5vw, 1.7rem)",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #FFFFFF 30%, #A0B0C5 80%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                ✦ Abhee Lumina Villa
              </h2>
              <p style={{ fontSize: "clamp(0.7rem, 3vw, 0.85rem)", color: "#8E9Aaf" }}>
                Ambient Intelligence | Live lighting orchestration
              </p>
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                borderRadius: "2rem",
                overflow: "hidden",
                background: "#010205",
                boxShadow: "0 20px 35px -10px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src="../images/alllightoff.png"
                alt="villa base"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              {/* Overlays (kept as before) */}
              <img id="balconyOverlay" src="../images/bal.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, transition: "opacity 0.4s cubic-bezier(0.2,0.9,0.4,1.1)", pointerEvents: "none", borderRadius: "1.8rem" }} />
              <img id="parkingOverlay" src="../images/parking.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, transition: "opacity 0.4s cubic-bezier(0.2,0.9,0.4,1.1)", pointerEvents: "none", borderRadius: "1.8rem" }} />
              <img id="entranceOverlay" src="../images/entranceOn.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, transition: "opacity 0.4s cubic-bezier(0.2,0.9,0.4,1.1)", pointerEvents: "none", borderRadius: "1.8rem" }} />
              <img id="gardenOverlay" src="../images/gardenOn.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, transition: "opacity 0.4s cubic-bezier(0.2,0.9,0.4,1.1)", pointerEvents: "none", borderRadius: "1.8rem" }} />
              <img id="poolOverlay" src="../images/poolOn.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, transition: "opacity 0.4s cubic-bezier(0.2,0.9,0.4,1.1)", pointerEvents: "none", borderRadius: "1.8rem" }} />
              <img id="livingRoomOverlay" src="../images/livingRoomOn.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, transition: "opacity 0.4s cubic-bezier(0.2,0.9,0.4,1.1)", pointerEvents: "none", borderRadius: "1.8rem" }} />
              <img id="bedroomOverlay" src="../images/bedroomOn.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, transition: "opacity 0.4s cubic-bezier(0.2,0.9,0.4,1.1)", pointerEvents: "none", borderRadius: "1.8rem" }} />
              <img id="diningOverlay" src="../images/diningOn.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, transition: "opacity 0.4s cubic-bezier(0.2,0.9,0.4,1.1)", pointerEvents: "none", borderRadius: "1.8rem" }} />
              <img id="theaterOverlay" src="../images/theaterOn.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, transition: "opacity 0.4s cubic-bezier(0.2,0.9,0.4,1.1)", pointerEvents: "none", borderRadius: "1.8rem" }} />
              <img id="securityOverlay" src="../images/securityOn.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, transition: "opacity 0.4s cubic-bezier(0.2,0.9,0.4,1.1)", pointerEvents: "none", borderRadius: "1.8rem" }} />
              <img id="allOnOverlay" src="../images/alllighton.png" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, transition: "opacity 0.4s cubic-bezier(0.2,0.9,0.4,1.1)", pointerEvents: "none", borderRadius: "1.8rem", zIndex: 50 }} />
            </div>
          </div>

          {/* Dashboard container – responsive frame vs full width */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <style>
              {`
                @media (max-width: 767px) {
                  .desktop-phone-frame { display: none !important; }
                  .mobile-dashboard-full { display: block !important; }
                }
                @media (min-width: 768px) {
                  .desktop-phone-frame { display: flex !important; }
                  .mobile-dashboard-full { display: none !important; }
                }
              `}
            </style>

            {/* Desktop: iPhone frame */}
            <div className="desktop-phone-frame" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <div
                style={{
                  width: 390,
                  height: 780,
                  background: "#111113",
                  borderRadius: 48,
                  boxShadow: "0 30px 40px -20px rgba(0,0,0,0.5), 0 0 0 6px #3a3a3e, 0 0 0 12px #1c1c1e",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Dynamic Island */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 120,
                    height: 34,
                    background: "#0a0a0c",
                    borderRadius: 28,
                    zIndex: 20,
                  }}
                />
                <div
                  style={{
                    background: "#F2F2F7",
                    borderRadius: 48,
                    margin: 12,
                    height: "calc(100% - 24px)",
                    overflow: "hidden",
                  }}
                >
                  <DashboardContent
                    activeCount={activeCount}
                    energyKwh={energyKwh}
                    costEstimate={costEstimate}
                    allLightsOn={allLightsOn}
                    toggleAllLights={toggleAllLights}
                    activeScene={activeScene}
                    setActiveScene={setActiveScene}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    filteredDevices={filteredDevices}
                    deviceStates={deviceStates}
                    toggleDevice={toggleDevice}
                  />
                </div>
              </div>
            </div>

            {/* Mobile: full width dashboard */}
            <div className="mobile-dashboard-full" style={{ display: "none", width: "100%", padding: "0 8px" }}>
              <div
                style={{
                  background: "#F2F2F7",
                  borderRadius: 32,
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <DashboardContent
                  activeCount={activeCount}
                  energyKwh={energyKwh}
                  costEstimate={costEstimate}
                  allLightsOn={allLightsOn}
                  toggleAllLights={toggleAllLights}
                  activeScene={activeScene}
                  setActiveScene={setActiveScene}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  filteredDevices={filteredDevices}
                  deviceStates={deviceStates}
                  toggleDevice={toggleDevice}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbheeSmartHome;