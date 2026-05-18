const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// مهم لحل API error
app.use(cors());
app.use(express.json());

// serve frontend (if needed)
app.use(express.static(path.join(__dirname, "public")));

// translation API
app.post("/translate", (req, res) => {
  const { text, from, to } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "No text provided"
    });
  }

  // temporary translation (you can replace with real AI later)
  res.json({
    result: `${text} (${from} → ${to})`
  });
});

// homepage fix
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});