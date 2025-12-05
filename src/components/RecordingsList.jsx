import React, { useEffect, useState } from 'react';

export default function RecordingsList({ initialQuery = 'cnt:Guatemala', initialPage = 1, onBack }) {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recordingsData, setRecordingsData] = useState(null);

  async function fetchRecordings(q, p = 1) {
    setLoading(true);
    setError(null);
    setRecordingsData(null);

    try {
      const encodedQuery = encodeURIComponent(q);
      const resp = await fetch(`/api/recordings?query=${encodedQuery}&page=${p}`);

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
    fetchRecordings(query, page);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchRecordings(query, page);
  };

  const recordings = recordingsData?.recordings || [];

  return (
    <div style={{ padding: 16, fontFamily: 'Arial, sans-serif' }}>
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontWeight: 600
            }}
          >
            ← Volver
          </button>
        </div>
      )}

      <h2>Grabaciones (Xeno-Canto via proxy)</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: 12 }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder='Ej: cnt:Guatemala o en:"quetzal"' style={{ padding: 8, width: '60%', marginRight: 8 }} />
        <input type="number" value={page} onChange={(e) => setPage(Number(e.target.value))}
          style={{ padding: 8, width: 80, marginRight: 8 }} min={1} />
        <button type="submit" style={{ padding: '8px 12px' }}>Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <div style={{ color: 'white', background: '#c00', padding: 10, borderRadius: 6 }}><strong>Error:</strong> {error}</div>}
      {!loading && !error && recordings.length === 0 && <p>No se encontraron grabaciones para la búsqueda.</p>}

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {recordings.map(r => (
          <li key={r.id} style={{ marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
            <div style={{ fontWeight: 'bold' }}>{r.en || r.species || 'Sin título'}</div>
            <div style={{ fontSize: 13, color: '#555' }}>{r.gen || ''} {r.sp || ''} — {r.cnt || ''} — {r.length || ''}</div>

            {r.file || r.url ? (
              <div style={{ marginTop: 8 }}>
                <audio controls preload="none" style={{ maxWidth: '100%' }}>
                  <source src={r.file || r.url} />
                  Tu navegador no soporta audio.
                </audio>
                <div style={{ marginTop: 6 }}>
                  <a href={r.file || r.url} target="_blank" rel="noreferrer">Abrir en nueva pestaña</a>
                </div>
              </div>
            ) : null}

            <div style={{ marginTop: 6, fontSize: 13 }}>
              <span>Grabado por: {r.rec || r.recordist || '—'}</span>
              {r.note && <div style={{ marginTop: 4, color: '#333' }}>Nota: {r.note}</div>}
            </div>
          </li>
        ))}
      </ul>

      {recordingsData && <div style={{ marginTop: 12 }}>
        <small>Mostrando página {recordingsData.page || page} de {recordingsData.numPages || recordingsData.num_pages || 'desconocido'}</small>
      </div>}
    </div>
  );
}
