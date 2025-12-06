import React, { useEffect, useState } from 'react';

export default function RecordingsList({ onBack }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recordingsData, setRecordingsData] = useState(null);

  const DEFAULT_QUERY = 'cnt:Guatemala';

  async function fetchRecordings(q) {
    setLoading(true);
    setError(null);
    setRecordingsData(null);

    try {
      const encodedQuery = encodeURIComponent(q);
      const resp = await fetch(`/api/recordings?query=${encodedQuery}`);
      if (!resp.ok) {
        let body;
        try { body = await resp.json(); } catch { body = await resp.text(); }
        throw new Error(`Backend error ${resp.status}: ${JSON.stringify(body)}`);
      }

      const result = await resp.json();
      if (!result || !result.data) throw new Error('Respuesta inesperada del backend');

      setRecordingsData(result.data);

    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecordings(DEFAULT_QUERY);
  }, []);

  const filteredRecordings = recordingsData?.recordings.filter(r => {
    const lowerQuery = query.toLowerCase();
    return (
      r.en?.toLowerCase().includes(lowerQuery) ||
      r.species?.toLowerCase().includes(lowerQuery) ||
      r.rec?.toLowerCase().includes(lowerQuery) ||
      r.recordist?.toLowerCase().includes(lowerQuery) ||
      r.cnt?.toLowerCase().includes(lowerQuery)
    );
  }) || [];

  const handleSearch = (event) => {
    if (event) event.preventDefault();
  };

  // Estilos globales para asegurar fondo blanco en toda la pantalla
  useEffect(() => {
    document.body.style.backgroundColor = '#fff';
    document.documentElement.style.backgroundColor = '#fff';
    document.body.style.color = '#000';
  }, []);

  return (
    <div style={{ 
      padding: 16, 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fff', // fondo blanco
      minHeight: '100vh',
      color: '#000'
    }}>
      {onBack && (
        <div style={{ marginBottom: 12 }}>
          <button
            onClick={onBack}
            aria-label="Volver al inicio"
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--accent)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            ← Volver
          </button>
        </div>
      )}

      {/* Formulario con input + X + botón Buscar a la derecha */}
      <form
        onSubmit={handleSearch}
        style={{
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          marginTop: -8
        }}
      >
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Buscar grabaciones por texto'
            style={{
              padding: '8px 32px 8px 8px',
              width: '100%',
              boxSizing: 'border-box',
              borderRadius: 8,
              border: '1px solid #ccc',
              backgroundColor: '#fff', // fondo blanco
              color: '#000'
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 16,
                lineHeight: 1,
                color: '#888',
                padding: 0
              }}
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: '8px 12px',
            marginLeft: 'auto',
            borderRadius: 8,
            border: 'none',
            background: 'var(--accent)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Buscar
        </button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && (
        <div style={{ color: '#fff', background: '#c00', padding: 10, borderRadius: 6 }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      {!loading && !error && filteredRecordings.length === 0 && <p>No se encontraron grabaciones.</p>}

      <ul style={{ listStyle: 'none', paddingLeft: 0, backgroundColor: '#fff' }}>
        {filteredRecordings.map(r => (
          <li key={r.id} style={{ marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
            <div style={{ fontWeight: 'bold' }}>{r.en || r.species || 'Sin título'}</div>
            <div style={{ fontSize: 13, color: '#555' }}>{r.gen || ''} {r.sp || ''} — {r.cnt || ''} — {r.length || ''}</div>

            {(r.file || r.url) && (
              <div style={{ marginTop: 8 }}>
                <audio controls preload="none" style={{ maxWidth: '100%' }}>
                  <source src={r.file || r.url} type="audio/mpeg" />
                  Tu navegador no soporta audio.
                </audio>
                <div style={{ marginTop: 6 }}>
                  <a href={r.file || r.url} target="_blank" rel="noreferrer">Abrir en nueva pestaña</a>
                </div>
              </div>
            )}

            <div style={{ marginTop: 6, fontSize: 13 }}>
              <span>Grabado por: {r.rec || r.recordist || '—'}</span>
              {r.note && <div style={{ marginTop: 4, color: '#333' }}>Nota: {r.note}</div>}
            </div>
          </li>
        ))}
      </ul>

      {filteredRecordings.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <small>Mostrando {filteredRecordings.length} grabaciones</small>
        </div>
      )}
    </div>
  );
}
