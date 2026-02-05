// index.js
import express from "express";
import fetch from "node-fetch";

const app = express();

// Embed your Clash Royale API token directly
const CR_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImI1MzdkZTU4LTE0OTYtNGY1My1iNGMxLTBiZTVlYjE0ZGUwYyIsImlhdCI6MTc3MDMwOTcyOSwic3ViIjoiZGV2ZWxvcGVyL2I4NTVjNmYxLWJhMTEtMDNkNy04OTc4LWE3NjlkMjM3YTIzYyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI4Ni4xMjkuMTU4LjQzIl0sInR5cGUiOiJjbGllbnQifV19.8W19JoBkCQOZaisFvo2_TJpS9-Mc7YeW0CP8zZM0VdEKdrlFqsOGK7ykau2p3zZTfl4IT88Gswg57ZmX6A-p_g";

// Test endpoint to get outbound IP
app.get("/my-ip", async (req, res) => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    res.json({ outboundIP: data.ip });
  } catch (err) {
    res.status(500).json({ error: "Could not get IP" });
  }
});

// Fetch player info from Clash Royale
app.get("/player/:tag", async (req, res) => {
  try {
    const tag = encodeURIComponent(req.params.tag);
    const response = await fetch(`https://api.clashroyale.com/v1/players/${tag}`, {
      headers: { Authorization: `Bearer ${CR_API_TOKEN}` },
    });
    if (!response.ok) throw new Error("Failed to fetch player");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch player" });
  }
});

// Fetch battle log
app.get("/battlelog/:tag", async (req, res) => {
  try {
    const tag = encodeURIComponent(req.params.tag);
    const response = await fetch(`https://api.clashroyale.com/v1/players/${tag}/battlelog`, {
      headers: { Authorization: `Bearer ${CR_API_TOKEN}` },
    });
    if (!response.ok) throw new Error("Failed to fetch battlelog");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch battlelog" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
