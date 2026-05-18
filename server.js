const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🌍 Home Page (UI كاملة)
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>TranslateX AI</title>

<style>
body{
  margin:0;
  font-family: Arial;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background: linear-gradient(120deg,#4facfe,#00f2fe);
}

.box{
  width:420px;
  background:white;
  padding:20px;
  border-radius:15px;
}

textarea,select,button{
  width:100%;
  padding:10px;
  margin-top:10px;
}

button{
  background:#4facfe;
  color:white;
  border:none;
  cursor:pointer;
}

#result{
  margin-top:10px;
  font-size:18px;
  color:green;
}
</style>

</head>

<body>

<div class="box">
<h2>🌍 TranslateX AI</h2>

<textarea id="text" placeholder="Type text..."></textarea>

<select id="lang">
  <option>English</option>
  <option>Arabic</option>
  <option>French</option>
  <option>Spanish</option>
  <option>German</option>
</select>

<button onclick="translateText()">Translate</button>

<div id="result"></div>
</div>

<script>

async function translateText(){

  let text = document.getElementById("text").value;
  let lang = document.getElementById("lang").value;

  document.getElementById("result").innerText = "Loading...";

  try{

    let res = await fetch("/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text, lang })
    });

    let data = await res.json();

    document.getElementById("result").innerText =
      data.result;

  }catch(e){
    document.getElementById("result").innerText = "Error";
  }
}

</script>

</body>
</html>
  `);
});

// 🤖 Translate API (مؤقت بدون AI لتجنب الأخطاء)
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
