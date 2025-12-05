const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

/**
 * GET /api/recordings?query=X&page=Y
 * Acts as a proxy to Xeno-Canto API v3 so frontend doesn't need CORS
 */
app.get('/api/recordings', async (req, res) => {
  try {
    const rawQuery = req.query.query || '';
    const page = req.query.page || 1;

    // Ensure the query contains a country filter for Guatemala if not provided
    let query = rawQuery.trim();
    if (!/country:|cnt:/i.test(query) && query.length === 0) {
      query = 'country:Guatemala';
    } else if (!/country:|cnt:/i.test(query)) {
      query = `${query} country:Guatemala`;
    }

    const url = `https://xeno-canto.org/api/3/recordings?query=${encodeURIComponent(query)}&page=${page}`;

    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: 'Xeno-Canto error', details: text });
    }

    const data = await response.json();
    // Return data as-is to the frontend
    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => console.log(`Backend proxy listening on http://localhost:${PORT}`));
