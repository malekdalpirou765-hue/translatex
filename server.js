const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Translation API (mock)
app.post("/translate", (req, res) => {

  const { text, from, to } = req.body;

  if (!text) {
    return res.json({ result: "No text provided" });
  }

  res.json({
    result: `${text} (${from} → ${to})`
  });
});

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
