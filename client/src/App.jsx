import { useState, useEffect, useRef } from 'react';
import './App.css';

// 🖨️ 打字機組件：讓文字一個字一個字出來
const Typewriter = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        // 播放打字音效 (可選，怕太吵可以註解掉)
        // new Audio('/keypress.mp3').play().catch(() => {}); 
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

function App() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([
    { text: "> SYSTEM_INIT...", type: 'system' },
    { text: "> CONNECTION_ESTABLISHED", type: 'system' },
    { text: "> ENTER_ACCESS_CODE...", type: 'system' }
  ]);
  const [level, setLevel] = useState("1-1");
  
  // 📝 記事本狀態
  const [showNotepad, setShowNotepad] = useState(false);
  const [notes, setNotes] = useState('');

  // 🔊 音效播放函數
  const playSound = (type) => {
    // 強制指定路徑，並印出 Log 方便除錯
    const path = type === 'error' ? '/error.mp3' : '/success.mp3';
    console.log("嘗試播放:", path);
    
    const audio = new Audio(path);
    audio.volume = 0.5; // 音量設一半避免嚇到人
    audio.play().catch(e => {
      console.error("播放失敗 (可能找不到檔案或瀏覽器擋住了):", e);
    });
  };

  const getLevelInfo = (lvlStr) => {
    if (lvlStr === "END") return { day: "VICTORY", q: "ALL CLEARED" };
    const [day, q] = lvlStr.split('-');
    return { day: day || '?', q: q || '?' };
  };

  const { day, q } = getLevelInfo(level);
  
  // 自動捲動到底部
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 記錄玩家輸入 (不使用打字機效果，直接顯示)
    const newLog = { text: `> [${level}] USER: ${input}`, type: 'user' };
    setLogs(prev => [...prev, newLog, { text: "> VERIFYING...", type: 'system' }]);
    
    // 播放打字確認音
    new Audio('/keypress.mp3').play().catch(() => {});

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ puzzleId: level, answer: input })
      });
      
      const data = await res.json();
      const currentInput = input; 
      setInput(''); // 清空輸入框

      if (data.success) {
        playSound('success');
        setTimeout(() => {
           // 延遲一點點再顯示成功訊息，更有駭客感
           if (data.nextLevel === "END") {
             setLogs(prev => [...prev, { text: `> ACCESS GRANTED. SYSTEM UNLOCKED.`, type: 'success' }]);
             setLevel("END");
           } else {
             setLogs(prev => [...prev, { text: `> ACCESS GRANTED. LEVEL ${data.nextLevel} UNLOCKED.`, type: 'success' }]);
             setLevel(data.nextLevel);
           }
        }, 800);
      } else {
        playSound('error');
        setTimeout(() => {
           setLogs(prev => [...prev, { text: `> ACCESS DENIED. INVALID PASSWORD.`, type: 'error' }]);
        }, 800);
      }
    } catch (err) {
      setLogs(prev => [...prev, { text: `> NETWORK ERROR. SERVER OFFLINE.`, type: 'error' }]);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="terminal-container">
        {/* CRT 掃描線效果會由 CSS ::before 產生 */}
        
        <div className="terminal-header">
          <div className="traffic-lights">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="title">HACK_PUZZLE_V2.0 // {level}</span>
          <button className="notepad-btn" onClick={() => setShowNotepad(!showNotepad)}>
            {showNotepad ? '[CLOSE_NOTES]' : '[OPEN_NOTES]'}
          </button>
        </div>
        
        <div className="level-info">
          CURRENT_TASK: [ DAY {day} | QUESTION {q} ]
        </div>

        <div className="terminal-body">
          {logs.map((log, i) => (
            <div key={i} className={`log-line ${log.type}`}>
              {/* 只有系統訊息才用打字機效果，玩家輸入直接顯示 */}
              {log.type === 'system' || log.type === 'success' || log.type === 'error' 
                ? <Typewriter text={log.text} /> 
                : <span>{log.text}</span>
              }
            </div>
          ))}
          
          {level !== "END" && (
            <form onSubmit={handleSubmit} className="input-line">
              <span className="prompt">$</span>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                placeholder="TYPE_ANSWER..."
              />
            </form>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* 📝 側邊記事本 (絕對定位) */}
      {showNotepad && (
        <div className="notepad-container">
          <div className="notepad-header"> // SECRET_NOTES // </div>
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Type your clues here..."
          />
        </div>
      )}
    </div>
  );
}

export default App;
