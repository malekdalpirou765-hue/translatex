const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  try {

    const { text, from, to } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a professional translator. Translate accurately."
          },
          {
            role: "user",
            content: `Translate from ${from} to ${to}: ${text}`
          }
        ]
      })
    });

    const data = await response.json();

    res.json({
      result: data.choices?.[0]?.message?.content || "Error"
    });

  } catch (err) {
    res.status(500).json({ error: "AI error" });
  }
});

app.get("/", (req, res) => {
  res.send("TranslateX AI Running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
