// api/index.js
// 這是一個最簡單的 Express 進入點
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// 測試路由
app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Backend is alive.`);
});

// 解謎驗證路由 (核心功能)
app.post('/api/verify', (req, res) => {
  const { puzzleId, answer } = req.body;

  // 暫時的答案庫 (之後可以移到獨立 JSON 檔)
  // 注意：實際答案最好經過處理，不要明文，但 Day 1 先求有
  const ANSWERS = {
    "1": "start",
    "2": "hello_world"
  };

  if (!puzzleId || !answer) {
    return res.status(400).json({ error: "Missing input" });
  }

  // 簡單的驗證邏輯
  // 轉小寫並去空白，增加容錯率
  const cleanAnswer = answer.toString().toLowerCase().trim();
  
  if (ANSWERS[puzzleId] === cleanAnswer) {
    return res.json({ success: true, nextLevel: parseInt(puzzleId) + 1 });
  } else {
    return res.json({ success: false, message: "Wrong answer!" });
  }
});

module.exports = app;
