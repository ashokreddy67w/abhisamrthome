import React, { useState, useEffect, useRef } from 'react';

const AbheeSmartHome = () => {
  // ---------- State for all 10 lights ----------
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

  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastTimerRef = useRef(null);

  // Helper: Show toast notification
  const showToastMessage = (message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    setShowToast(true);
    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2400);
  };

  // Helper: get all light states as an object
  const getAllLights = () => ({
    balcony: balconyOn,
    parking: parkingOn,
    entrance: entranceOn,
    garden: gardenOn,
    pool: poolOn,
    livingRoom: livingRoomOn,
    bedroom: bedroomOn,
    dining: diningOn,
    theater: theaterOn,
    security: securityOn,
  });

  // Count active lights
  const activeCount = Object.values(getAllLights()).filter(Boolean).length;
  const allLightsOn = activeCount === 10;

  // Scene hint text (based on which lights are on)
  const getSceneHint = () => {
    if (allLightsOn) return '✨ full brilliance';
    if (activeCount === 0) return 'dusk silhouette';
    if (livingRoomOn && theaterOn && !bedroomOn) return '🎬 cinema mood';
    if (livingRoomOn && diningOn && gardenOn) return '🍷 dinner party';
    if (bedroomOn && securityOn && !livingRoomOn) return '🌙 good night';
    return 'ambient zones';
  };

  // ---------- Lighting Logic (opacity transitions, no image swap) ----------
  useEffect(() => {
    // Get all overlay elements
    const balconyOverlay = document.getElementById('balconyOverlay');
    const parkingOverlay = document.getElementById('parkingOverlay');
    const entranceOverlay = document.getElementById('entranceOverlay');
    const gardenOverlay = document.getElementById('gardenOverlay');
    const poolOverlay = document.getElementById('poolOverlay');
    const livingRoomOverlay = document.getElementById('livingRoomOverlay');
    const bedroomOverlay = document.getElementById('bedroomOverlay');
    const diningOverlay = document.getElementById('diningOverlay');
    const theaterOverlay = document.getElementById('theaterOverlay');
    const securityOverlay = document.getElementById('securityOverlay');
    const allOnOverlay = document.getElementById('allOnOverlay');

    if (!balconyOverlay) return; // DOM not ready

    if (allLightsOn) {
      // ALL lights ON → show alllighton.png, hide every individual overlay
      allOnOverlay.style.opacity = '1';
      balconyOverlay.style.opacity = '0';
      parkingOverlay.style.opacity = '0';
      entranceOverlay.style.opacity = '0';
      gardenOverlay.style.opacity = '0';
      poolOverlay.style.opacity = '0';
      livingRoomOverlay.style.opacity = '0';
      bedroomOverlay.style.opacity = '0';
      diningOverlay.style.opacity = '0';
      theaterOverlay.style.opacity = '0';
      securityOverlay.style.opacity = '0';
    } else {
      // Otherwise show/hide each overlay based on its state
      allOnOverlay.style.opacity = '0';
      balconyOverlay.style.opacity = balconyOn ? '1' : '0';
      parkingOverlay.style.opacity = parkingOn ? '1' : '0';
      entranceOverlay.style.opacity = entranceOn ? '1' : '0';
      gardenOverlay.style.opacity = gardenOn ? '1' : '0';
      poolOverlay.style.opacity = poolOn ? '1' : '0';
      livingRoomOverlay.style.opacity = livingRoomOn ? '1' : '0';
      bedroomOverlay.style.opacity = bedroomOn ? '1' : '0';
      diningOverlay.style.opacity = diningOn ? '1' : '0';
      theaterOverlay.style.opacity = theaterOn ? '1' : '0';
      securityOverlay.style.opacity = securityOn ? '1' : '0';
    }
  }, [
    balconyOn, parkingOn, entranceOn, gardenOn, poolOn,
    livingRoomOn, bedroomOn, diningOn, theaterOn, securityOn, allLightsOn
  ]);

  // ---------- Toggle Handlers with toast messages ----------
  const toggleBalcony = () => {
    const newState = !balconyOn;
    setBalconyOn(newState);
    showToastMessage(newState ? '✨ Balcony Lights Activated' : '🌙 Balcony Lights Deactivated');
  };
  const toggleParking = () => {
    const newState = !parkingOn;
    setParkingOn(newState);
    showToastMessage(newState ? '🚗 Parking Lights Activated' : '🛑 Parking Lights Deactivated');
  };
  const toggleEntrance = () => {
    const newState = !entranceOn;
    setEntranceOn(newState);
    showToastMessage(newState ? '🚪 Entrance Lights Activated' : '🌙 Entrance Lights Deactivated');
  };
  const toggleGarden = () => {
    const newState = !gardenOn;
    setGardenOn(newState);
    showToastMessage(newState ? '🌳 Garden Lights Activated' : '🌙 Garden Lights Deactivated');
  };
  const togglePool = () => {
    const newState = !poolOn;
    setPoolOn(newState);
    showToastMessage(newState ? '🏊 Pool Lights Activated' : '🌙 Pool Lights Deactivated');
  };
  const toggleLivingRoom = () => {
    const newState = !livingRoomOn;
    setLivingRoomOn(newState);
    showToastMessage(newState ? '🛋 Living Room Lights Activated' : '🌙 Living Room Lights Deactivated');
  };
  const toggleBedroom = () => {
    const newState = !bedroomOn;
    setBedroomOn(newState);
    showToastMessage(newState ? '🛏 Bedroom Lights Activated' : '🌙 Bedroom Lights Deactivated');
  };
  const toggleDining = () => {
    const newState = !diningOn;
    setDiningOn(newState);
    showToastMessage(newState ? '🍽 Dining Lights Activated' : '🌙 Dining Lights Deactivated');
  };
  const toggleTheater = () => {
    const newState = !theaterOn;
    setTheaterOn(newState);
    showToastMessage(newState ? '🎬 Home Theater Activated' : '🌙 Home Theater Deactivated');
  };
  const toggleSecurity = () => {
    const newState = !securityOn;
    setSecurityOn(newState);
    showToastMessage(newState ? '🔒 Security Lights Activated' : '🌙 Security Lights Deactivated');
  };

  // Master All Lights: turn all ON or all OFF
  const masterAllLights = () => {
    if (allLightsOn) {
      setBalconyOn(false);
      setParkingOn(false);
      setEntranceOn(false);
      setGardenOn(false);
      setPoolOn(false);
      setLivingRoomOn(false);
      setBedroomOn(false);
      setDiningOn(false);
      setTheaterOn(false);
      setSecurityOn(false);
      showToastMessage('🌑 All Lights Deactivated · System Standby');
    } else {
      setBalconyOn(true);
      setParkingOn(true);
      setEntranceOn(true);
      setGardenOn(true);
      setPoolOn(true);
      setLivingRoomOn(true);
      setBedroomOn(true);
      setDiningOn(true);
      setTheaterOn(true);
      setSecurityOn(true);
      showToastMessage('✨ All Lights Activated · Full Brilliance');
    }
  };

  // System status badge
  const systemStatus = activeCount > 0 ? 'ACTIVE' : 'STANDBY';
  const sceneHint = getSceneHint();

  // ---------- Render ----------
  return (
    <div style={{ width: '100%' }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        .abhee-smart-home {
          background: radial-gradient(circle at 20% 30%, #0B0C10, #030507);
          font-family: system-ui, -apple-system, 'SF Pro Text', 'SF Pro Display', 'Inter', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
        }

        .showcase-container {
          max-width: 1440px;
          width: 100%;
          margin: 0 auto;
          background: rgba(15, 20, 28, 0.55);
          backdrop-filter: blur(12px);
          border-radius: 2.5rem;
          box-shadow: 0 25px 45px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        .dashboard {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .house-preview {
          flex: 1.4;
          min-width: 280px;
          padding: 2rem 1.8rem 2rem 2rem;
        }

        .preview-header {
          margin-bottom: 1.5rem;
        }

        .preview-header h2 {
          font-size: 1.7rem;
          font-weight: 600;
          background: linear-gradient(135deg, #FFFFFF 30%, #A0B0C5 80%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .preview-sub {
          font-size: 0.85rem;
          color: #8E9Aaf;
        }

        .house-stage {
          position: relative;
          width: 100%;
          border-radius: 2rem;
          overflow: hidden;
          box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.5);
          background: #010205;
        }

        .base-house {
          display: block;
          width: 100%;
          height: auto;
          pointer-events: none;
          border-radius: 1.8rem;
        }

        .light-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          transition: opacity 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          opacity: 0;
          border-radius: 1.8rem;
        }

        .overlay-all { z-index: 50; }
        .overlay-normal { z-index: 10; }

        .control-panel {
          flex: 1;
          min-width: 340px;
          background: rgba(12, 18, 26, 0.7);
          backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 2rem;
          margin: 1.5rem;
          padding: 1.8rem;
          box-shadow: -8px 0 25px -15px rgba(0, 0, 0, 0.3);
        }

        .panel-title {
          font-size: 1.4rem;
          font-weight: 590;
          color: #F0F3FA;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .panel-title span {
          background: rgba(255, 255, 255, 0.08);
          padding: 4px 12px;
          border-radius: 40px;
          font-size: 0.7rem;
          color: #B6C8E5;
        }

        .section-title {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          color: #B8C6F0;
          margin: 1rem 0 0.8rem 0;
        }

        .controls-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .light-card {
          background: rgba(20, 28, 38, 0.65);
          border-radius: 1.5rem;
          padding: 0.7rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.2s;
          border: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
        }

        .light-card:hover {
          background: rgba(40, 55, 78, 0.85);
          border-color: rgba(210, 180, 140, 0.35);
        }

        .light-name {
          font-weight: 500;
          font-size: 0.9rem;
          color: #F3F6FE;
        }

        .toggle-status {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.7rem;
          border-radius: 30px;
          background: rgba(0, 0, 0, 0.5);
          color: #B8CBF0;
        }

        .toggle-status.active {
          background: #2C6E9E;
          color: white;
          box-shadow: 0 0 6px #3f9eff;
        }

        .all-btn {
          background: linear-gradient(95deg, #1F2A3A, #11161F);
          border: 1px solid rgba(255, 215, 130, 0.3);
          width: 100%;
          border-radius: 3rem;
          padding: 0.9rem;
          margin: 1rem 0 0.5rem;
          font-weight: 700;
          font-size: 1rem;
          color: #F5E7D3;
          cursor: pointer;
          text-align: center;
        }

        .status-dashboard {
          background: rgba(8, 12, 18, 0.6);
          border-radius: 1.5rem;
          padding: 1rem;
          margin-top: 1.5rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .status-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .status-label {
          font-size: 0.7rem;
          color: #8C9BC2;
        }

        .status-value {
          font-weight: 650;
          font-size: 1rem;
          color: #F0F5FF;
        }

        .badge-active {
          color: #A4FFC3;
          background: rgba(70, 200, 100, 0.15);
          padding: 0.2rem 0.6rem;
          border-radius: 40px;
          font-size: 0.7rem;
          display: inline-block;
        }

        .toast-message {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          background: rgba(25, 32, 45, 0.96);
          backdrop-filter: blur(18px);
          color: white;
          padding: 0.8rem 1.6rem;
          border-radius: 60px;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 0 12px 28px -8px black;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.25s, transform 0.3s ease;
          pointer-events: none;
          border: 1px solid rgba(255, 235, 180, 0.3);
        }

        .toast-message.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        @media (max-width: 860px) {
          .abhee-smart-home { padding: 1rem; }
          .dashboard { flex-direction: column; }
          .control-panel { margin: 1rem; border-left: none; }
          .house-preview { padding: 1.2rem; }
        }

        @media (max-width: 540px) {
          .controls-grid { grid-template-columns: 1fr; }
        }

        img { user-select: none; -webkit-user-drag: none; }
      `}</style>

      <div className="abhee-smart-home">
        <div className="showcase-container">
          <div className="dashboard">
            {/* LEFT: Fixed House Preview with all overlays */}
            <div className="house-preview">
              <div className="preview-header">
                <h2>✦ Abhee Lumina Villa</h2>
                <div className="preview-sub">Ambient Intelligence | Live lighting orchestration</div>
              </div>
              <div className="house-stage">
                <img className="base-house" src="../images/alllightoff.png" alt="villa base" />
                {/* Individual overlays */}
                <img id="balconyOverlay" className="light-overlay overlay-normal" src="../images/bal.png" alt="balcony" style={{ opacity: 0 }} />
                <img id="parkingOverlay" className="light-overlay overlay-normal" src="../images/parking.png" alt="parking" style={{ opacity: 0 }} />
                <img id="entranceOverlay" className="light-overlay overlay-normal" src="../images/entranceOn.png" alt="entrance" style={{ opacity: 0 }} />
                <img id="gardenOverlay" className="light-overlay overlay-normal" src="../images/gardenOn.png" alt="garden" style={{ opacity: 0 }} />
                <img id="poolOverlay" className="light-overlay overlay-normal" src="../images/poolOn.png" alt="pool" style={{ opacity: 0 }} />
                <img id="livingRoomOverlay" className="light-overlay overlay-normal" src="../images/livingRoomOn.png" alt="living room" style={{ opacity: 0 }} />
                <img id="bedroomOverlay" className="light-overlay overlay-normal" src="../images/bedroomOn.png" alt="bedroom" style={{ opacity: 0 }} />
                <img id="diningOverlay" className="light-overlay overlay-normal" src="../images/diningOn.png" alt="dining" style={{ opacity: 0 }} />
                <img id="theaterOverlay" className="light-overlay overlay-normal" src="../images/theaterOn.png" alt="theater" style={{ opacity: 0 }} />
                <img id="securityOverlay" className="light-overlay overlay-normal" src="../images/securityOn.png" alt="security" style={{ opacity: 0 }} />
                {/* Master all-light overlay (highest z-index) */}
                <img id="allOnOverlay" className="light-overlay overlay-all" src="../images/alllighton.png" alt="all lights" style={{ opacity: 0 }} />
              </div>
            </div>

            {/* RIGHT: Control Panel */}
            <div className="control-panel">
              <div className="panel-title">
                Light Concierge
                <span>LUXE</span>
              </div>

              {/* Outdoor Lights */}
              <div className="section-title">🏡 OUTDOOR ZONES</div>
              <div className="controls-grid">
                <div className="light-card" onClick={toggleBalcony}>
                  <span className="light-name">🌿 Balcony</span>
                  <span className={`toggle-status ${balconyOn ? 'active' : ''}`}>{balconyOn ? 'ON' : 'OFF'}</span>
                </div>
                <div className="light-card" onClick={toggleParking}>
                  <span className="light-name">🚗 Parking</span>
                  <span className={`toggle-status ${parkingOn ? 'active' : ''}`}>{parkingOn ? 'ON' : 'OFF'}</span>
                </div>
                <div className="light-card" onClick={toggleEntrance}>
                  <span className="light-name">🚪 Entrance</span>
                  <span className={`toggle-status ${entranceOn ? 'active' : ''}`}>{entranceOn ? 'ON' : 'OFF'}</span>
                </div>
                <div className="light-card" onClick={toggleGarden}>
                  <span className="light-name">🌳 Garden</span>
                  <span className={`toggle-status ${gardenOn ? 'active' : ''}`}>{gardenOn ? 'ON' : 'OFF'}</span>
                </div>
                <div className="light-card" onClick={toggleSecurity}>
                  <span className="light-name">🔒 Security</span>
                  <span className={`toggle-status ${securityOn ? 'active' : ''}`}>{securityOn ? 'ON' : 'OFF'}</span>
                </div>
              </div>

              {/* Indoor Lights */}
              <div className="section-title">✨ INTERIOR REALMS</div>
              <div className="controls-grid">
                <div className="light-card" onClick={toggleLivingRoom}>
                  <span className="light-name">🛋 Living Room</span>
                  <span className={`toggle-status ${livingRoomOn ? 'active' : ''}`}>{livingRoomOn ? 'ON' : 'OFF'}</span>
                </div>
                <div className="light-card" onClick={toggleBedroom}>
                  <span className="light-name">🛏 Bedroom</span>
                  <span className={`toggle-status ${bedroomOn ? 'active' : ''}`}>{bedroomOn ? 'ON' : 'OFF'}</span>
                </div>
                <div className="light-card" onClick={toggleDining}>
                  <span className="light-name">🍽 Dining</span>
                  <span className={`toggle-status ${diningOn ? 'active' : ''}`}>{diningOn ? 'ON' : 'OFF'}</span>
                </div>
                <div className="light-card" onClick={toggleTheater}>
                  <span className="light-name">🎬 Home Theater</span>
                  <span className={`toggle-status ${theaterOn ? 'active' : ''}`}>{theaterOn ? 'ON' : 'OFF'}</span>
                </div>
                <div className="light-card" onClick={togglePool}>
                  <span className="light-name">🏊 Pool</span>
                  <span className={`toggle-status ${poolOn ? 'active' : ''}`}>{poolOn ? 'ON' : 'OFF'}</span>
                </div>
              </div>

              {/* Master All Lights */}
              <button className="all-btn" onClick={masterAllLights}>
                {allLightsOn ? 'ALL OFF — MASTER' : '✨ ALL LIGHTS — MASTER SCENE'}
              </button>

              {/* Status Dashboard */}
              <div className="status-dashboard">
                <div className="status-item">
                  <span className="status-label">💡 ACTIVE LIGHTS</span>
                  <span className="status-value">{activeCount} / 10</span>
                </div>
                <div className="status-item">
                  <span className="status-label">🎬 CURRENT SCENE</span>
                  <span className="status-value" style={{ fontSize: '0.9rem' }}>{sceneHint}</span>
                </div>
                <div className="status-item">
                  <span className="status-label">⚙️ SYSTEM CORE</span>
                  <span className={`status-value ${activeCount > 0 ? 'badge-active' : ''}`}>
                    {systemStatus}
                  </span>
                </div>
                <div className="status-item">
                  <span className="status-label">🌐 NETWORK</span>
                  <span className="status-value" style={{ color: '#99F0C0' }}>ONLINE · 5G</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        <div className={`toast-message ${showToast ? 'show' : ''}`}>{toastMessage}</div>
      </div>
    </div>
  );
};

export default AbheeSmartHome;