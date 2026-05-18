const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// 🌍 عرض الصفحة الرئيسية (هذا هو الحل)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🤖 ترجمة (مؤقتة)
app.post("/translate", (req, res) => {
  const { text, lang } = req.body;

  res.json({
    result: `(${lang}) ${text}`
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
