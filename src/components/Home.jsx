import React from 'react';

export default function Home({ onLoad }) {
  return (
    <div style={{ padding: 16, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial' }}>
      {/* Título principal */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 30, fontSize: 45 }}>Inicio</h1>
      </div>

      {/* Información personal */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}></div>
          <div style={{ fontSize: 16, color: '#444', marginTop: 4 }}></div>
        </div>

        {/* Banner visual de RecordingsList */}
        <div style={{ width: '100%', maxWidth: 500, marginTop: 125, padding: 16, backgroundColor: '#f5f5f5', borderRadius: 8, textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 30 }}>Angelo  Estrada    05189095</h2>
        </div>

        {/* Botón cargar */}
        <div style={{ marginTop: 90 }}>
          <button
            onClick={onLoad}
            style={{ padding: '10px 20px', borderRadius: 100, border: 'none', background: '#0b74c5', color: 'white', cursor: 'pointer' }}
          >
            cargar
          </button>
        </div>
      </div>
    </div>
  );
}
