# 🤝 團隊協作指南

歡迎加入 Hack Puzzle 開發團隊！本指南教你怎麼和隊友一起開發。

**本指南適合**：出題者、前端開發者、後端開發者、所有貢獻者

---

## 📌 基本原則（所有人都要知道）

1. **不要直接改 `main` 分支**
   - `main` 是已經上線的版本，很重要
   - 任何改動都要先在自己的分支測試

2. **一個分支只做一件事**
   - 不要把多個功能混在一起改
   - 例如：這個分支只負責新增第 1 關，不要順便改 UI

3. **後端檔案放在 `/api` 資料夾**
   - Vercel 才能正確執行

4. **改完要「拉 Pull Request」讓隊友審核**
   - 不要自己偷偷合併程式碼

---

## 🌿 分支命名規則

開發時你會用到這些分支：

| 分支名 | 用途 | 例子 |
|-------|------|------|
| `main` | 已上線版本（不亂動） | - |
| `dev` | 開發用主分支（所有功能先測試的地方） | - |
| `feature/*` | 新增功能 | `feature/puzzle-day1` |
| `fix/*` | 修復問題 | `fix/answer-typo` |

**怎麼命名新分支**：
- 清楚、簡短、用英文
- 例子：`feature/puzzle-01-story`、`fix/terminal-color`

---

## 👥 不同角色怎麼做？

### 🎨 你是「出題者」（寫劇情、題目、答案）

你不需要懂程式，只要會用文字編輯器和 Git。

#### 步驟：

**1. 建立你的工作分支**

打開終端機，輸入：
```
git checkout -b feature/puzzle-01-story
```

這樣你就有了自己的分支，不會影響別人。

**2. 編輯題目檔案**

打開 `frontend/` 資料夾找題目檔案，用文字編輯器改。

例子：
- 新增或修改題目劇情
- 調整提示內容
- 確認答案格式是否正確

**3. 儲存並提交**

改完後，在終端機輸入：
```
git add .
git commit -m "add: puzzle 1 story"
git push -u origin feature/puzzle-01-story
```

**4. 開「Pull Request」讓隊長審核**

去 GitHub 網頁：
- 點「Compare & pull request」
- Base branch 選 `dev`
- 寫一句說明你做了什麼（例如：「新增第 1 關的劇情和提示」）
- 點「Create pull request」

等隊長審核通過就完成了！

---

### 💻 你是「開發者」（改程式、修 Bug、做前後端）

#### 步驟：

**1. 先更新 `dev` 分支（確保你的版本最新）**

```
git checkout dev
git pull origin dev
```

**2. 建立你的工作分支**

```
git checkout -b feature/puzzle-01-verify
```

或者如果是修 Bug：
```
git checkout -b fix/api-answer-typo
```

**3. 修改程式**

例如，你要新增一道題目：
- 打開 `api/submit.js`
- 找到 `PUZZLE_DATA` 那個部分
- 修改或新增項目
- 儲存

**4. 本地測試**

確保你的改動能正常運作：

在終端機輸入：
```
vercel dev
```

打開 `http://localhost:3000` 手動測試遊戲，確保沒有問題。

測試通過了，按 `Ctrl+C` 停止。

**5. 提交程式碼**

```
git add .
git commit -m "feat: add puzzle 1 verify logic"
git push -u origin feature/puzzle-01-verify
```

**Commit message 的格式**：

| 類型 | 意思 | 例子 |
|------|------|------|
| `feat:` | 新增功能 | `feat: add puzzle 2` |
| `fix:` | 修復 Bug | `fix: correct answer typo` |
| `style:` | 改 UI/顏色 | `style: change terminal color` |
| `docs:` | 改文件 | `docs: update README` |

**6. 開 Pull Request**

去 GitHub：
- 點「Compare & pull request」
- Base branch 選 `dev`
- 寫清楚你改了什麼、為什麼改
- 點「Create pull request」

隊長會檢查你的程式碼，有問題會留言要求修改。通過後就會合併！

---

## 🔍 提交前自我檢查清單

在你開 Pull Request 之前，檢查一下：

- ✅ 分支名稱對嗎？（`feature/*` 或 `fix/*`）
- ✅ Commit message 清楚嗎？
- ✅ 在本地測試過了嗎？（`vercel dev` 能正常運作）
- ✅ 沒有把 `node_modules` 或 `.vercel` 資料夾上傳？
- ✅ Pull Request 的說明清楚嗎？

---

## 🚨 常見錯誤和解決方法

**問題 1：我在 `main` 分支改程式了，怎麼辦？**

趕快停止，改到 `dev` 分支。

```
git checkout dev
git pull origin dev
git checkout -b feature/my-feature
# 複製你做的改動，刪除 main 上的改動
```

**問題 2：我的 Pull Request 有衝突，合併不了？**

這代表你的改動和別人的重疊了。

告訴隊長，或自己解決衝突。

**問題 3：我意外把 `node_modules` 上傳到 Git？**

別擔心，刪除它：

```
git rm -r node_modules
git commit -m "remove: node_modules"
git push
```

然後新增 `.gitignore` 檔案，確保不會再上傳。

---

## 📚 推薦閱讀

- [Git 新手教學](https://git-scm.com/book/zh-tw/v2)
- [GitHub Pull Request 官方文件](https://docs.github.com/en/pull-requests)
- [什麼是 Vercel](https://vercel.com/)

---

## 💬 有問題嗎？

- 問隊長
- 在專案 Issue 上討論
- 問 Discord/群組

沒有笨問題，大家一起解決！🚀

---

Made with ❤️ by Hack Puzzle Team