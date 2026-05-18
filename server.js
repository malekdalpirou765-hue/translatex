const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.post("/translate", (req, res) => {
  res.json({ result: "test" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
