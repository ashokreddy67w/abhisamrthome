import React, { useState, useEffect, useRef } from 'react';

const AbheeSmartHome = () => {
  // ---------- State ----------
  const [balconyOn, setBalconyOn] = useState(false);
  const [parkingOn, setParkingOn] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastTimerRef = useRef(null);

  // ---------- Helper: Show Toast ----------
  const showToastMessage = (message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    setShowToast(true);
    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2400);
  };

  // ---------- Lighting Logic (opacity transitions, no image swap) ----------
  useEffect(() => {
    // Get overlay elements (will be available after render)
    const balconyOverlay = document.getElementById('balconyOverlay');
    const parkingOverlay = document.getElementById('parkingOverlay');
    const allOnOverlay = document.getElementById('allOnOverlay');
    if (!balconyOverlay) return;

    if (balconyOn && parkingOn) {
      // Both ON → show alllighton.png
      balconyOverlay.style.opacity = '0';
      parkingOverlay.style.opacity = '0';
      allOnOverlay.style.opacity = '1';
    } else if (balconyOn && !parkingOn) {
      // Only balcony
      balconyOverlay.style.opacity = '1';
      parkingOverlay.style.opacity = '0';
      allOnOverlay.style.opacity = '0';
    } else if (!balconyOn && parkingOn) {
      // Only parking
      balconyOverlay.style.opacity = '0';
      parkingOverlay.style.opacity = '1';
      allOnOverlay.style.opacity = '0';
    } else {
      // Both OFF
      balconyOverlay.style.opacity = '0';
      parkingOverlay.style.opacity = '0';
      allOnOverlay.style.opacity = '0';
    }
  }, [balconyOn, parkingOn]);

  // ---------- UI Updates for Badges & Button Labels ----------
  // (Reactive – they derive from state directly in JSX, no extra effect needed)

  // ---------- Event Handlers ----------
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

  const masterAllLights = () => {
    const bothCurrentlyOn = balconyOn && parkingOn;
    if (bothCurrentlyOn) {
      setBalconyOn(false);
      setParkingOn(false);
      showToastMessage('🌑 All Lights Deactivated · System Standby');
    } else {
      setBalconyOn(true);
      setParkingOn(true);
      showToastMessage('💡 All Lights Activated · Full Brilliance');
    }
  };

  // Determine system active / standby
  const isAnyLightActive = balconyOn || parkingOn;

  // Scene hint text
  let sceneHint = 'dusk silhouette';
  if (balconyOn && parkingOn) sceneHint = '✨ panorama glow';
  else if (balconyOn) sceneHint = '🌙 terrace aura';
  else if (parkingOn) sceneHint = '🚘 arrival mode';

  // ---------- Render ----------
  return (
    <div style={{ width: '100%' }}>
      {/* Embedded styles (same as original, adapted for React) */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        .abhee-smart-home {
          background: radial-gradient(circle at 20% 30%, #0B0C10, #030507);
          font-family: system-ui, -apple-system, 'SF Pro Text', 'SF Pro Display', 'Inter', 'BlinkMacSystemFont', 'Segoe UI', Roboto, Helvetica, sans-serif;
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
          transition: all 0.3s ease;
        }

        .dashboard {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .house-preview {
          flex: 1.4;
          min-width: 260px;
          padding: 2rem 1.8rem 2rem 2rem;
          display: flex;
          flex-direction: column;
        }

        .preview-header {
          margin-bottom: 1.5rem;
        }

        .preview-header h2 {
          font-size: 1.7rem;
          font-weight: 600;
          letter-spacing: -0.3px;
          background: linear-gradient(135deg, #FFFFFF 30%, #A0B0C5 80%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          margin-bottom: 0.25rem;
        }

        .preview-sub {
          font-size: 0.85rem;
          color: #8E9Aaf;
          font-weight: 450;
          letter-spacing: 0.2px;
        }

        .house-stage {
          position: relative;
          width: 100%;
          border-radius: 2rem;
          overflow: hidden;
          box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          background: #010205;
        }

        .base-house {
          display: block;
          width: 100%;
          height: auto;
          pointer-events: none;
          user-select: none;
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
          will-change: opacity;
          border-radius: 1.8rem;
        }

        .overlay-bal { z-index: 10; }
        .overlay-parking { z-index: 11; }
        .overlay-allon { z-index: 12; }

        .control-panel {
          flex: 1;
          min-width: 320px;
          background: rgba(12, 18, 26, 0.7);
          backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 2rem;
          margin: 1.5rem;
          padding: 1.8rem 1.8rem 2rem;
          box-shadow: -8px 0 25px -15px rgba(0, 0, 0, 0.3);
        }

        .panel-title {
          font-size: 1.4rem;
          font-weight: 590;
          letter-spacing: -0.2px;
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
          font-weight: 500;
          color: #B6C8E5;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin: 1.8rem 0 2rem;
        }

        .light-card {
          background: rgba(20, 28, 38, 0.65);
          border-radius: 1.5rem;
          padding: 0.9rem 1.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.2s;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 6px 12px -8px rgba(0, 0, 0, 0.3);
        }

        .light-card:hover {
          background: rgba(28, 38, 52, 0.8);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .light-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .light-name {
          font-weight: 590;
          font-size: 1.1rem;
          color: #F3F6FE;
          letter-spacing: -0.2px;
        }

        .status-badge-mini {
          font-size: 0.7rem;
          font-weight: 500;
          padding: 0.2rem 0.6rem;
          border-radius: 30px;
          background: rgba(0, 0, 0, 0.4);
          width: fit-content;
          color: #B4C6F0;
        }

        .luxury-toggle {
          background: rgba(18, 24, 32, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 2rem;
          padding: 0.55rem 1.4rem;
          font-size: 0.85rem;
          font-weight: 570;
          color: #CCDDFF;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          min-width: 94px;
          letter-spacing: 0.2px;
        }

        .luxury-toggle.active {
          background: #2C6E9E;
          border-color: #6bb9ff;
          color: white;
          box-shadow: 0 0 8px rgba(60, 150, 230, 0.5);
        }

        .luxury-toggle:active {
          transform: scale(0.97);
        }

        .all-btn {
          background: linear-gradient(95deg, #1F2A3A, #11161F);
          width: 100%;
          justify-content: center;
          margin-top: 0.4rem;
          font-weight: 600;
          font-size: 1rem;
          padding: 0.8rem;
        }

        .status-dashboard {
          background: rgba(8, 12, 18, 0.6);
          border-radius: 1.5rem;
          padding: 1rem 1.2rem;
          margin-top: 1.4rem;
          border: 0.5px solid rgba(255, 255, 255, 0.06);
        }

        .badge-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0.9rem;
          margin-bottom: 1rem;
        }

        .badge-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.85rem;
          font-weight: 490;
        }

        .badge-label {
          color: #8695AA;
        }

        .badge-value {
          font-weight: 600;
          padding: 0.2rem 0.7rem;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.5);
          font-size: 0.75rem;
          letter-spacing: 0.3px;
        }

        .badge-value.online {
          color: #8BFFB0;
          background: rgba(70, 200, 110, 0.12);
          border-left: 2px solid #4cd964;
        }

        .badge-value.offline {
          color: #FF9E8F;
          background: rgba(255, 80, 70, 0.08);
        }

        .badge-value.active {
          color: #C0E0FF;
          background: rgba(66, 153, 225, 0.2);
        }

        .badge-value.standby {
          color: #A0AEC0;
        }

        .toast-message {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          background: rgba(25, 32, 45, 0.95);
          backdrop-filter: blur(18px);
          color: white;
          padding: 0.9rem 1.8rem;
          border-radius: 60px;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.2px;
          box-shadow: 0 12px 28px -8px black;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.28s ease, transform 0.3s ease;
          pointer-events: none;
          border: 1px solid rgba(255,255,240,0.2);
          font-family: inherit;
        }

        .toast-message.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        @media (max-width: 860px) {
          .abhee-smart-home { padding: 1rem; }
          .dashboard { flex-direction: column; }
          .control-panel {
            margin: 1rem;
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.08);
            border-radius: 1.8rem;
          }
          .house-preview { padding: 1.2rem; }
          .light-card { padding: 0.8rem 1rem; }
        }

        @media (max-width: 480px) {
          .badge-row { flex-direction: column; gap: 0.5rem; }
          .luxury-toggle { padding: 0.5rem 1rem; }
        }

        img { user-select: none; -webkit-user-drag: none; }
      `}</style>

      <div className="abhee-smart-home">
        <div className="showcase-container">
          <div className="dashboard">
            {/* LEFT: Fixed House Preview */}
            <div className="house-preview">
              <div className="preview-header">
                <h2>✦ Abhee Lumina Villa</h2>
                <div className="preview-sub">Ambient Intelligence | Live lighting orchestration</div>
              </div>
              <div className="house-stage">
                {/* Base layer: always visible */}
                <img
                  className="base-house"
                  src="../images/alllightoff.png"
                  alt="smart home base architecture"
                />
                {/* Overlay layers – IDs used by useEffect */}
                <img
                  id="balconyOverlay"
                  className="light-overlay overlay-bal"
                  src="../images/bal.png"
                  alt="balcony light effect"
                  style={{ opacity: 0 }}
                />
                <img
                  id="parkingOverlay"
                  className="light-overlay overlay-parking"
                  src="../images/parking.png"
                  alt="parking light effect"
                  style={{ opacity: 0 }}
                />
                <img
                  id="allOnOverlay"
                  className="light-overlay overlay-allon"
                  src="../images/alllighton.png"
                  alt="all lights combined effect"
                  style={{ opacity: 0 }}
                />
              </div>
            </div>

            {/* RIGHT: Control Panel */}
            <div className="control-panel">
              <div className="panel-title">
                Light Concierge
                <span>LUXE</span>
              </div>
              <div className="control-group">
                {/* Balcony Control */}
                <div className="light-card">
                  <div className="light-info">
                    <div className="light-name">🌿 Balcony Illumination</div>
                    <div className="status-badge-mini">
                      {balconyOn ? '● Illuminated' : 'Standby mode'}
                    </div>
                  </div>
                  <button
                    className={`luxury-toggle ${balconyOn ? 'active' : ''}`}
                    onClick={toggleBalcony}
                  >
                    {balconyOn ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* Parking Control */}
                <div className="light-card">
                  <div className="light-info">
                    <div className="light-name">🚗 Parking Portal</div>
                    <div className="status-badge-mini">
                      {parkingOn ? '⚡ Active' : 'Inactive'}
                    </div>
                  </div>
                  <button
                    className={`luxury-toggle ${parkingOn ? 'active' : ''}`}
                    onClick={toggleParking}
                  >
                    {parkingOn ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* All Lights Master */}
                <div className="light-card" style={{ background: 'rgba(30,40,54,0.75)', marginTop: '0.2rem' }}>
                  <div className="light-info">
                    <div className="light-name">✨ All Lights · Master Scene</div>
                    <div className="status-badge-mini">whole property</div>
                  </div>
                  <button className="luxury-toggle all-btn" onClick={masterAllLights}>
                    {balconyOn && parkingOn ? 'ALL OFF' : 'ALL ON'}
                  </button>
                </div>
              </div>

              {/* Status Dashboard */}
              <div className="status-dashboard">
                <div className="badge-row">
                  <div className="badge-item">
                    <span className="badge-label">🏡 Balcony</span>
                    <span className={`badge-value ${balconyOn ? 'online' : 'offline'}`}>
                      {balconyOn ? 'ONLINE' : 'OFFLINE'}
                    </span>
                  </div>
                  <div className="badge-item">
                    <span className="badge-label">🅿️ Parking</span>
                    <span className={`badge-value ${parkingOn ? 'online' : 'offline'}`}>
                      {parkingOn ? 'ONLINE' : 'OFFLINE'}
                    </span>
                  </div>
                </div>
                <div className="badge-row">
                  <div className="badge-item">
                    <span className="badge-label">⚙️ System Core</span>
                    <span className={`badge-value ${isAnyLightActive ? 'active' : 'standby'}`}>
                      {isAnyLightActive ? 'ACTIVE' : 'STANDBY'}
                    </span>
                  </div>
                  <div className="badge-item">
                    <span className="badge-label">🌙 Live Scene</span>
                    <span style={{ fontSize: '0.7rem', color: '#8DA3C0' }}>{sceneHint}</span>
                  </div>
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