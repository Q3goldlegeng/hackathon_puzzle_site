import { useState } from 'react';

function App() {
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 呼叫我們剛剛寫的後端
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ puzzleId: "1", answer: answer }),
      });
      
      const data = await response.json();
      if (data.success) {
        setResult("✅ 通過！進入下一關");
      } else {
        setResult("❌ 錯誤，請再試試");
      }
    } catch (error) {
      setResult("⚠️ 伺服器連線失敗");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>第一關：啟動</h1>
      <p>請輸入密碼 "start" 來測試系統。</p>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="輸入答案..."
        />
        <button type="submit">送出</button>
      </form>
      
      <h3>結果：{result}</h3>
    </div>
  );
}

export default App;
