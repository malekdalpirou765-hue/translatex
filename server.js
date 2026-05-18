const express = require("express");
const path = require("path");

// If Node < 18, uncomment this:
// const fetch = require("node-fetch");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/translate", async (req, res) => {
  try {
    const { text, to } = req.body;

    console.log("Input:", text, "Target:", to);

    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: to.toLowerCase(),
        format: "text"
      })
    });

    const data = await response.json();

    res.json({
      result: data.translatedText
    });

  } catch (err) {
    console.error(err);
    res.json({ result: "Translation error" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});