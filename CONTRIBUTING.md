# 🤝 Contributing Guide | 貢獻指南

歡迎參與 Hack Puzzle 專案！本文件適用於**出題者（非程式背景）**與**開發者**。

## 📌 協作原則（All Members）

1.  **不要直接推送到 `main`**：任何改動都必須透過 **Pull Request (PR)** 合併。
2.  **每個分支只做一件事**：避免混雜多個功能在同一 PR。
3.  **後端 API 檔案統一放在 `/api` 資料夾**：Vercel 才能正確識別為 Serverless Function。

---

## 🌿 Branch Rules | 分支規則

| 分支名稱 | 用途 | 誰可以推送 |
|---------|------|-----------|
| `main` | 穩定版本，僅供演示與正式部署 | 只能透過 PR 合併 |
| `dev` | 開發整合分支，所有功能先在這裡測試 | 只能透過 PR 合併 |
| `feature/*` | 新功能開發（例如：`feature/puzzle-day1`）| 開發者自行推送 |
| `fix/*` | Bug 修復（例如：`fix/ui-terminal-crash`）| 開發者自行推送 |

**命名範例：**
- `feature/puzzle-01-story`（出題者：新增第 1 關劇情）
- `feature/puzzle-01-verify`（開發者：實作第 1 關驗證邏輯）
- `fix/api-answer-typo`（修正答案錯字）

---

## 🎯 出題者流程 (Story Writers)

**適用對象：** 負責撰寫劇情、提示、答案設計，**不需要碰程式碼**。

### Step 1：建立專屬分支

git checkout -b feature/puzzle-01-story
### Step 2：編輯題目檔案
請在 client/src/puzzles/ 資料夾下，新增或修改對應的 Markdown 檔案。
例如：client/src/puzzles/p01.md
```bash
 題目範本：
# 第 1 關：啟動序列

## 劇情
系統遭到入侵，你必須輸入正確的啟動密碼才能進入下一階段。

## 任務
請輸入 5 個字母的英文單字（全小寫）。

## 提示
- 提示 1：這個詞與「開始」有關
- 提示 2：start

## 答案格式
全小寫，無空格           

```

### Step 3：提交與推送
```bash
git add .
git commit -m "add: puzzle 1 story"
git push -u origin feature/puzzle-01-story
```
### Step 4：開 Pull Request
```bash
    到 GitHub 專案頁面。
    點擊 "Compare & pull request"。
    Base branch 選擇 dev。
    填寫 PR 描述（例如：「新增第 1 關劇情與提示」）。
    等待團隊審核後合併。
```

💻 開發者流程 (Developers)
適用對象： 負責實作驗證邏輯、UI 調整、Bug 修復。

Workflow | 工作流程
從 dev 分支建立功能分支：
```bash
git checkout dev
git pull origin dev
git checkout -b feature/puzzle-01-verify
```
修改後端驗證邏輯 (api/index.js)：

```javascript
const PUZZLE_DATA = {
  "1-1": { answer: "start", next: "1-2" },
  // 新增關卡請依照此格式...
};
```
# 本地測試：

```bash
.\dev.bat  # Windows
```
# 或手動執行 
```bash 
vercel dev 
```
提交更改：

```bash
git add .
git commit -m "feat: add puzzle 1 verify logic"
git push -u origin feature/puzzle-01-verify
```
發起 PR 到 dev 分支，等待 Code Review。

✍️ Commit Message 規範
請使用簡潔的英文，遵循以下格式：

類型	說明	範例
feat:	新增功能	feat: add puzzle 2 story
fix:	修復 Bug	fix: correct answer typo in puzzle 3
docs:	文件更新	docs: update README setup guide
style:	UI/CSS 調整	style: improve terminal color scheme
refactor:	重構程式碼	refactor: extract verify logic to utils
🔍 Code Review Checklist
提交 PR 前，請自我檢查：
分支名稱符合規範（feature/* 或 fix/*）
Commit message 清楚描述改動
本地測試通過（vercel dev 正常運作）
沒有將 node_modules 或 .vercel 加入 Git
PR 描述說明了「改了什麼」與「為什麼改」

📚 參考資源
Git 共同協作開發教學 https://medium.com/%E9%96%8B%E7%99%BC%E9%9A%A8%E7%AD%86/git-%E5%85%B1%E5%90%8C%E5%8D%94%E4%BD%9C%E9%96%8B%E7%99%BC-adac8ed2e949
GitHub Pull Request 官方文件

Vercel Serverless Functions 文件

有問題隨時在 Discord/群組提問，大家一起解決！🚀
