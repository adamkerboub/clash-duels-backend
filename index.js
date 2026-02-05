// index.js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// read token from environment
const CR_API_TOKEN = process.env.CR_API_TOKEN;

if (!CR_API_TOKEN) {
  console.error('⚠️ CR_API_TOKEN not set. Clash Royale endpoints will not work.');
}

// Middleware to parse JSON
app.use(express.json());

// --- Get player info ---
app.get('/player/:tag', async (req, res) => {
  if (!CR_API_TOKEN) return res.status(500).json({ error: 'CR_API_TOKEN not set' });

  const tag = encodeURIComponent(req.params.tag);
  try {
    const response = await fetch(`https://api.clashroyale.com/v1/players/${tag}`, {
      headers: {
        Authorization: `Bearer ${CR_API_TOKEN}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Get player battle log ---
app.get('/battlelog/:tag', async (req, res) => {
  if (!CR_API_TOKEN) return res.status(500).json({ error: 'CR_API_TOKEN not set' });

  const tag = encodeURIComponent(req.params.tag);
  try {
    const response = await fetch(`https://api.clashroyale.com/v1/players/${tag}/battlelog`, {
      headers: {
        Authorization: `Bearer ${CR_API_TOKEN}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Optional test route to check backend is alive ---
app.get('/', (req, res) => {
  res.send('Clash Duels Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
