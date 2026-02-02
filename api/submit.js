const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// 🏆 關卡資料庫 (Day 1: Q1-Q6, Day 2: Q7-Q10)
const PUZZLE_DATA = {
  // --- Day 1 ---
  "1-1": { answer: "start", next: "1-2" },
  "1-2": { answer: "hello", next: "1-3" },
  "1-3": { answer: "world", next: "1-4" },
  "1-4": { answer: "hack", next: "1-5" },
  "1-5": { answer: "code", next: "1-6" },
  "1-6": { answer: "day1clear", next: "2-7" }, // Day 1 結束，跳 Day 2

  // --- Day 2 ---
  "2-7": { answer: "day2start", next: "2-8" },
  "2-8": { answer: "matrix", next: "2-9" },
  "2-9": { answer: "neo", next: "2-10" },
  "2-10": { answer: "zion", next: "END" } // 全部通關
};

app.post('/api/verify', (req, res) => {
  const { puzzleId, answer } = req.body;
  
  if (!puzzleId || !answer) {
    return res.json({ success: false, message: "Missing input" });
  }

  // 標準化答案 (轉小寫 + 去空白)
  const cleanAnswer = String(answer).toLowerCase().trim();
  const puzzle = PUZZLE_DATA[puzzleId];

  // 1. 檢查關卡是否存在
  if (!puzzle) {
    return res.json({ success: false, message: "Invalid Puzzle ID" });
  }

  // 2. 驗證答案
  if (puzzle.answer === cleanAnswer) {
    res.json({ success: true, nextLevel: puzzle.next });
  } else {
    res.json({ success: false, message: "Wrong Answer" });
  }
});

module.exports = app;
