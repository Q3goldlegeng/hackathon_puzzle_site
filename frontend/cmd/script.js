const apiEndpoint = '/api/verify';
let currentLevel = "1-1";
let isNotepadOpen = false;

document.addEventListener('DOMContentLoaded', () => {
    addLog("> SYSTEM_INIT...", 'system');
    addLog("> CONNECTION_ESTABLISHED", 'system');
});

document.getElementById('notepad-toggle').addEventListener('click', () => {
    isNotepadOpen = !isNotepadOpen;
    const notepad = document.getElementById('notepad');
    const btn = document.getElementById('notepad-toggle');
    if(isNotepadOpen) {
        notepad.classList.remove('hidden');
        btn.innerText = '[CLOSE_NOTES]';
    } else {
        notepad.classList.add('hidden');
        btn.innerText = '[OPEN_NOTES]';
    }
});

document.getElementById('console-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const val = input.value.trim();
    if(!val) return;

    addLog(`> [${currentLevel}] USER: ${val}`, 'user');
    input.value = '';
    
    // 播放打字音效
    new Audio('keypress.mp3').play().catch(()=>{});

    try {
        const res = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ puzzleId: currentLevel, answer: val })
        });
        const data = await res.json();
        
        if(data.success) {
            new Audio('success.mp3').play().catch(()=>{});
            setTimeout(() => {
                if(data.nextLevel === "END") {
                    addLog("> ACCESS GRANTED. SYSTEM UNLOCKED.", 'success');
                    document.getElementById('console-form').style.display = 'none';
                } else {
                    addLog(`> ACCESS GRANTED. LEVEL ${data.nextLevel} UNLOCKED.`, 'success');
                    currentLevel = data.nextLevel;
                    updateUI();
                }
            }, 800);
        } else {
            new Audio('error.mp3').play().catch(()=>{});
            setTimeout(() => addLog("> ACCESS DENIED.", 'error'), 800);
        }
    } catch(err) {
        addLog("> NETWORK ERROR.", 'error');
    }
});

function addLog(text, type) {
    const div = document.createElement('div');
    div.className = `log-line ${type}`;
    div.innerText = text; // 簡化版直接顯示，若要打字機效果需額外寫函式
    document.getElementById('terminal-body').appendChild(div);
    document.getElementById('terminal-body').scrollTop = document.getElementById('terminal-body').scrollHeight;
}

function updateUI() {
    document.getElementById('header-title').innerText = `HACK_PUZZLE_V3.0 // ${currentLevel}`;
    const [day, q] = currentLevel.split('-');
    document.getElementById('level-info').innerText = `CURRENT_TASK: [ DAY ${day} | QUESTION ${q} ]`;
}
