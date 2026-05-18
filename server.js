const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 👇 الصفحة الرئيسية (الحل لمشكلتك)
app.get("/", (req, res) => {
  res.send(`
    <h1>TranslateX is running 🚀</h1>
    <p>Server is working correctly</p>
  `);
});

app.post("/translate", (req, res) => {
  const { text, lang } = req.body;

  res.json({
    result: text
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
