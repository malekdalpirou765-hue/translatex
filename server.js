const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// 👇 هذا يربط index.html بالسيرفر
app.use(express.static(path.join(__dirname, "public")));

// 🤖 API الترجمة
app.post("/translate", (req, res) => {
  const { text, from, to } = req.body;

  res.json({
    result: `Translated (${from} → ${to}): ${text}`
  });
});

// 👇 مهم جداً (يحل مشكلة Cannot GET /)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
