const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5175;

app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

const XENOCANTO_KEY = process.env.XENOCANTO_KEY; // tu API Key real
const XENOCANTO_BASE = 'https://xeno-canto.org/api/3/recordings';

if (!XENOCANTO_KEY) {
  console.warn('WARNING: XENOCANTO_KEY no está definida. Establece XENOCANTO_KEY en server/.env o en las variables de entorno.');
}

function validateQueryParams(req, res, next) {
  const { query } = req.query;
  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'Parámetro "query" obligatorio. Ej: query=cnt:Guatemala' });
  }
  next();
}

app.get('/api/recordings', validateQueryParams, async (req, res) => {
  try {
    const { query, page } = req.query;

    if (!XENOCANTO_KEY) {
      return res.status(500).json({ error: 'XENOCANTO_KEY missing', message: 'La clave de Xeno-Canto no está configurada en el servidor. Añade XENOCANTO_KEY en server/.env o en las variables de entorno y reinicia el backend.' });
    }

    const params = new URLSearchParams();
    params.set('query', query);
    if (page) params.set('page', page);
    params.set('key', XENOCANTO_KEY);

    const url = `${XENOCANTO_BASE}?${params.toString()}`;

    const upstreamResp = await fetch(url, { headers: { 'Accept': 'application/json' } });

    if (!upstreamResp.ok) {
      const text = await upstreamResp.text().catch(() => '');
      return res.status(502).json({ error: 'Error Xeno-Canto', status: upstreamResp.status, bodySnippet: text.slice(0, 1000) });
    }

    const contentType = upstreamResp.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await upstreamResp.text().catch(() => '');
      return res.status(502).json({ error: 'Respuesta no JSON de Xeno-Canto', contentType, bodySnippet: text.slice(0, 1500) });
    }

    const data = await upstreamResp.json();
    res.json({ proxiedFrom: url, data });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor', message: String(err.message || err) });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Xeno-Canto proxy escuchando en http://localhost:${PORT}`);
});
