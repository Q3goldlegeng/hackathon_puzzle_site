# 🧩 Hack Puzzle

> 專為黑客松設計的復古風終端機解謎網站。  
> 內建 CRT 雜訊特效、打字機動畫、音效回饋以及隱藏式記事本。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)
![Express](https://img.shields.io/badge/Express-5.2-000000?logo=express)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel)

---

## 📖 專案簡介

**Hack Puzzle** 是一個多天數挑戰的解謎網站，適合黑客松活動使用。玩家需在充滿 80 年代風格的終端機介面中，依序破解 **Day 1 (Q1-Q6)** 與 **Day 2 (Q7-Q10)** 的謎題。

### ✨ 特色功能
- 🖥️ **CRT 螢幕特效**：掃描線、閃爍雜訊與螢光暈影，還原復古質感
- ⌨️ **打字機動畫**：系統訊息逐字顯示，營造即時運算感
- 🔊 **互動音效**：內建按鍵打字聲、錯誤/成功提示音效
- 📝 **隱藏記事本**：側邊滑出式面板，方便記錄解謎線索
- 🎯 **多天數關卡架構**：Day 1 破關後自動解鎖 Day 2 內容
- 🚀 **Serverless 後端**：透過 Vercel Functions 進行 API 驗證，無需自架伺服器

---

## 🏗️ 技術架構

| 層級 | 技術棧 |
|-------|-----------|
| **前端** | React 18.3 + Vite 6.0 |
| **後端** | Express 5.2 (Serverless 模式) |
| **部署** | Vercel |
| **樣式** | 純 CSS (CRT 特效 + Terminal UI) |
| **狀態管理** | React Hooks (`useState`, `useEffect`) |

---

## 📂 專案結構

```bash
hack-puzzle/
├── api/                  # 後端 (Vercel Serverless Functions)
│   └── index.js          # 核心驗證邏輯與關卡答案 (PUZZLE_DATA)
├── client/               # 前端 (React + Vite)
│   ├── src/
│   │   ├── App.jsx       # 遊戲主程式
│   │   ├── App.css       # CRT 特效與樣式表
│   │   └── puzzles/      # 題目內容 (Markdown/JSON)
│   ├── public/           # 前端靜態資源 (音效、圖片)
│   │   ├── error.mp3     # 錯誤音效
│   │   ├── keypress.mp3  # 打字音效
│   │   └── success.mp3   # 成功音效
│   └── dist/             # 打包輸出 (由 Vite 生成)
├── public/               # 正式站點靜態目錄 (由腳本自動生成)
├── deploy_local.bat      # Windows 一鍵打包與啟動腳本
├── vercel.json           # Vercel 設定檔
├── CONTRIBUTING.md       # 團隊協作指南
└── README.md             # 本文件
```
🚀 快速開始
環境需求
Node.js v18+

Vercel CLI (全域安裝: npm i -g vercel)

安裝步驟
```bash
# Clone 專案
git clone https://github.com/Q3goldlegeng/hackathon_puzzle_site.git
cd hack-puzzle
```
# 安裝後端依賴
```bash
npm install
```
# 安裝前端依賴
```bash
cd client
npm install
cd ..
```
# 本地開發
方法 A：一鍵啟動 (Windows 推薦 ⭐)
直接雙擊根目錄下的 deploy_local.bat，或者在終端機執行：

```bash
.\deploy_local.bat
(此腳本會自動執行 Build 前端 → 搬運檔案 → 啟動伺服器)
```
方法 B：手動啟動 (Mac/Linux)
bash
# 打包前端
```bash
cd client && npm run build && cd ..
```

# 複製檔案至 public
```bash
rm -rf public && mkdir public
cp -r client/dist/* public/
```

# 啟動 Vercel 開發環境
```bash
vercel dev
```
啟動後，請打開瀏覽器訪問：👉 http://localhost:3000

🎮 遊玩說明
閱讀任務：仔細閱讀終端機顯示的劇情與提示
輸入答案：在下方游標處輸入你的答案（格式：全小寫、無空格）
送出確認：按下 Enter 鍵送出
解鎖進度：答對即可進入下一關，答錯會收到錯誤提示
使用筆記：點擊右上角 [OPEN_NOTES] 開啟筆記本記錄線索
通關條件：完成 Day 1 (Q1-Q6) 後，將自動解鎖 Day 2 (Q7-Q10)
隱藏彩蛋 🥚試著輸入以下指令看看會發生什麼事：help - 顯示提示clear - 清空畫面whoami - 顯示目前用戶身分(未完成)

🛠️ 開發指南
新增關卡
請編輯 api/index.js 並在 PUZZLE_DATA 物件中新增項目：

javascript
const PUZZLE_DATA = {
  "1-1": { answer: "start", next: "1-2" },
  "1-2": { answer: "hello", next: "1-3" },
  // 在此處新增更多關卡...
};
自訂介面
顏色主題：修改 client/src/App.css 中的 CSS 變數

更換音效：替換 client/public/ 中的 .mp3 檔案

打字速度：調整 <Typewriter /> 組件中的 speed 參數


致謝：感謝所有參與測試與貢獻的夥伴！🚀

📞 聯絡資訊
團隊負責人: Daniel Wang
GitHub: @Q3goldlegeng
問題回報: 提交 Issue

Made with ❤️ in Taiwan 🇹🇼
