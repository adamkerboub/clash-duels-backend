
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const CR_API_TOKEN = process.env.CR_API_TOKEN;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/player/:tag", async (req, res) => {
  try {
    const tag = req.params.tag.replace("#", "%23");
    const response = await axios.get(
      `https://api.clashroyale.com/v1/players/${tag}`,
      {
        headers: {
          Authorization: `Bearer ${CR_API_TOKEN}`,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch player" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
