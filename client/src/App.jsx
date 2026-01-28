import { useState } from 'react';
import './App.css'; 

function App() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([
    "> SYSTEM_INIT...",
    "> CONNECTION_ESTABLISHED",
    "> AWAITING_ACCESS_CODE..."
  ]);
  const [level, setLevel] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 顯示玩家輸入
    const newLog = `> USER_INPUT: ${input}`;
    setLogs(prev => [...prev, newLog, "> VERIFYING..."]);
    
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ puzzleId: level.toString(), answer: input })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setLogs(prev => [...prev, `> ACCESS_GRANTED. WELCOME LEVEL ${data.nextLevel}`]);
        setLevel(data.nextLevel);
        setInput('');
      } else {
        setLogs(prev => [...prev, `> ACCESS_DENIED. INVALID CODE.`]);
      }
    } catch (err) {
      setLogs(prev => [...prev, `> NETWORK_ERROR. SERVER OFFLINE.`]);
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <span className="dot red"></span>
        <span className="dot yellow"></span>
        <span className="dot green"></span>
        <span className="title">HACK_PUZZLE_V1.0</span>
      </div>
      <div className="terminal-body">
        {logs.map((log, i) => (
          <div key={i} className="log-line">{log}</div>
        ))}
        
        <form onSubmit={handleSubmit} className="input-line">
          <span className="prompt">$</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            placeholder="TYPE_CODE_HERE..."
          />
        </form>
      </div>
    </div>
  );
}

export default App;
