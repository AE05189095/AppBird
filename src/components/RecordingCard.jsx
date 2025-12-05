import React from "react";

export default function RecordingCard({ rec }) {
  const species = rec.species || `${rec.gen || ''} ${rec.sp || ''}`.trim();
  const title = rec.en ? `${rec.en} (${species})` : species || 'Especie';

  // Detect possible audio URL fields used by Xeno-Canto
  const rawFile = rec.file || rec['file-name'] || rec.file_name || rec.audio || '';
  let audioSrc = null;
  if (rawFile && typeof rawFile === 'string') {
    if (rawFile.startsWith('http')) audioSrc = rawFile;
    else if (rawFile.startsWith('//')) audioSrc = `https:${rawFile}`;
    else audioSrc = `https:${rawFile}`;
  }

  return (
    <article className="card">
      <h3 className="card-title">{title}</h3>

      <p><strong>Ubicación:</strong> {rec.loc || '—'}</p>
      <p><strong>Grabado por:</strong> {rec.recordist || '—'}</p>

      {audioSrc ? (
        <audio controls src={audioSrc} className="card-audio">
          Tu navegador no soporta audio.
        </audio>
      ) : (
        <p className="no-audio">Audio no disponible</p>
      )}

      <a className="card-link" href={`https://xeno-canto.org/${rec.id}`} target="_blank" rel="noopener noreferrer">
        Ver en Xeno-Canto
      </a>
    </article>
  );
}
