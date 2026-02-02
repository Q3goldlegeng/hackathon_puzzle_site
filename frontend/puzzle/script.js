// --- 1. 引入 Firebase (使用 CDN) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- 2. 貼上你的 Firebase Config (從第一步複製來的) ---
const firebaseConfig = {
  apiKey: "AIzaSyCjpFnsiYKOzYjj9hR3aQok2hPLrPxbB_w",
  authDomain: "hack-puzzle-auth.firebaseapp.com",
  projectId: "hack-puzzle-auth",
  storageBucket: "hack-puzzle-auth.firebasestorage.app",
  messagingSenderId: "626986693657",
  appId: "1:626986693657:web:2b67ca9873f37beab9a688",
  measurementId: "G-ZFCVH2M8PZ"
};

// --- 3. 初始化 Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// --- 變數與 DOM ---
let currentUser = null; // 用來存使用者資料
const apiEndpoint = '/api/verify';
let currentLevel = "1-1"; 
// ... 其他變數保持原樣 ...

// --- 4. 監聽登入狀態 (這是自動執行的) ---
onAuthStateChanged(auth, (user) => {
    const statusDiv = document.getElementById('user-status');
    const loginBtn = document.getElementById('login-btn');

    if (user) {
        // 使用者已登入
        currentUser = user;
        console.log("User:", user.displayName, user.email);
        
        statusDiv.innerText = `[USER: ${user.displayName.toUpperCase()}]`;
        loginBtn.innerText = "[LOGOUT]";
        
        addLog(`> IDENTITY VERIFIED: ${user.email}`, 'success');
    } else {
        // 使用者未登入
        currentUser = null;
        statusDiv.innerText = `[GUEST]`;
        loginBtn.innerText = "[LOGIN]";
    }
});

// --- 5. 按鈕點擊事件 ---
document.getElementById('login-btn').addEventListener('click', () => {
    if (currentUser) {
        // 如果已登入 -> 執行登出
        signOut(auth).then(() => {
            addLog("> USER LOGGED OUT.", 'system');
        });
    } else {
        // 如果未登入 -> 跳出 Google 登入視窗
        signInWithPopup(auth, provider)
            .then((result) => {
                // 登入成功 (onAuthStateChanged 會處理 UI)
            }).catch((error) => {
                addLog(`> LOGIN FAILED: ${error.message}`, 'error');
            });
    }
});

// ... 下面接原本的 document.addEventListener('DOMContentLoaded', ...) ...
// ... 以及原本的 submit 邏輯 ...
