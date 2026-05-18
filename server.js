const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// API only
app.post("/translate", (req, res) => {
  const { text } = req.body;

  res.json({
    result: "translated: " + text
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running"));