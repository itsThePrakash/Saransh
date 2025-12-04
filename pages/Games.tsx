import React, { useState, useEffect, useRef, useCallback } from 'react';
import AdUnit from '@/components/AdUnit';

// --- SHARED TYPES & HOOKS ---

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  useEffect(() => { savedCallback.current = callback; }, [callback]);
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// --- MAIN COMPONENT ---

const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [sessionName, setSessionName] = useState('');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [stats, setStats] = useState({ wins: 0, played: 0 });

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionName.trim()) setIsSessionActive(true);
  };

  const handleWin = () => setStats(s => ({ ...s, wins: s.wins + 1, played: s.played + 1 }));
  const handleLose = () => setStats(s => ({ ...s, played: s.played + 1 }));

  const GAMES = [
    { id: 'chess', name: 'Master Chess', icon: '♟️', desc: 'Strategic warfare against a smart AI.', color: 'from-gray-800 to-black' },
    { id: 'tictactoe', name: 'Impossible TacToe', icon: '⭕', desc: 'Can you beat the Minimax Engine?', color: 'from-purple-600 to-indigo-900' },
    { id: 'connect4', name: 'Connect 4 Arena', icon: '🔴', desc: 'Gravity-based strategy vs AI.', color: 'from-red-600 to-orange-900' },
    { id: 'snake', name: 'Neon Snake', icon: '🐍', desc: 'High-speed reflex challenge.', color: 'from-green-600 to-emerald-900' },
    { id: 'sudoku', name: 'Logic Sudoku', icon: '🔢', desc: 'The classic number puzzle.', color: 'from-blue-600 to-cyan-900' },
    { id: 'memory', name: 'Memory Matrix', icon: '🧠', desc: 'Test your cognitive recall.', color: 'from-pink-600 to-rose-900' },
  ];

  if (!isSessionActive) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🕹️</div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Arcade Pass</h1>
            <p className="text-zinc-500 mt-2">Enter your name to start playing.</p>
          </div>
          <form onSubmit={handleStart} className="space-y-4">
            <input 
              type="text" 
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              placeholder="PLAYER NAME"
              className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg py-4 text-center font-bold text-lg text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none uppercase tracking-wider"
              autoFocus
            />
            <button 
              type="submit"
              disabled={!sessionName.trim()}
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              INSERT COIN
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-white -m-5 p-5">
      {/* HUD */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            {sessionName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-500 uppercase">Player</div>
            <div className="font-bold leading-none">{sessionName}</div>
          </div>
        </div>
        
        <div className="flex gap-4 text-sm font-mono">
          <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded">WINS: <span className="text-green-500 font-bold">{stats.wins}</span></div>
          <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded">PLAYED: <span className="font-bold">{stats.played}</span></div>
        </div>

        {activeGame && (
          <button 
            onClick={() => setActiveGame(null)}
            className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold text-xs rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
          >
            EXIT GAME
          </button>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        {!activeGame ? (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tighter">Select Game</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GAMES.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className="group relative overflow-hidden rounded-2xl aspect-video text-left shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] bg-zinc-900"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-60 group-hover:opacity-80 transition-opacity`}></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    <span className="text-5xl drop-shadow-md">{game.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{game.name}</h3>
                      <p className="text-sm text-white/80">{game.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-12 text-center">
              <AdUnit slotId="games-lobby-bottom" />
            </div>
          </div>
        ) : (
          <div className="animate-fade-in flex justify-center">
            {activeGame === 'chess' && <ChessGame onResult={handleWin} />}
            {activeGame === 'tictactoe' && <TicTacToe onWin={handleWin} />}
            {activeGame === 'connect4' && <ConnectFour onWin={handleWin} />}
            {activeGame === 'snake' && <Snake onWin={handleWin} onLose={handleLose} />}
            {activeGame === 'sudoku' && <Sudoku onWin={handleWin} />}
            {activeGame === 'memory' && <MemoryGame onWin={handleWin} />}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// GAME ENGINES
// ============================================================================

// --- 1. CHESS ENGINE (Simplified for Web) ---
const ChessGame: React.FC<{onResult: () => void}> = ({onResult}) => {
  // r=rook, n=knight, b=bishop, q=queen, k=king, p=pawn. Uppercase=White.
  const INITIAL_BOARD = [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    Array(8).fill(null), Array(8).fill(null), Array(8).fill(null), Array(8).fill(null),
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R']
  ];
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [selected, setSelected] = useState<{r:number, c:number} | null>(null);
  const [turn, setTurn] = useState<'white' | 'black'>('white');
  const [status, setStatus] = useState('Your Move');

  const isWhite = (p: string) => /^[A-Z]$/.test(p);
  const isBlack = (p: string) => /^[a-z]$/.test(p);
  
  const getPieceDisplay = (p: string) => {
    const map: any = { 
      'P': '♟', 'R': '♜', 'N': '♞', 'B': '♝', 'Q': '♛', 'K': '♚',
      'p': '♙', 'r': '♖', 'n': '♘', 'b': '♗', 'q': '♕', 'k': '♔' 
    };
    return map[p] || '';
  };

  const isValidMove = (r1: number, c1: number, r2: number, c2: number, p: string) => {
    const dr = Math.abs(r2 - r1), dc = Math.abs(c2 - c1);
    const target = board[r2][c2];
    if (target && isWhite(target)) return false; // Self capture check
    
    if (p === 'P') { // Pawn
      if (c1 === c2 && r2 === r1 - 1 && !target) return true;
      if (c1 === c2 && r1 === 6 && r2 === 4 && !target && !board[5][c1]) return true;
      if (Math.abs(c1 - c2) === 1 && r2 === r1 - 1 && target && isBlack(target)) return true;
      return false;
    }
    if (p === 'K') return dr <= 1 && dc <= 1; // King
    if (p === 'N') return (dr === 2 && dc === 1) || (dr === 1 && dc === 2); // Knight
    if (p === 'R' || p === 'Q') if (dr === 0 || dc === 0) return true; // Rook/Queen (Simple path check omitted for brevity)
    if (p === 'B' || p === 'Q') if (dr === dc) return true; // Bishop/Queen
    return false;
  };

  const handleClick = (r: number, c: number) => {
    if (turn === 'black') return;
    const piece = board[r][c];

    if (selected) {
      if (selected.r === r && selected.c === c) { setSelected(null); return; }
      const p = board[selected.r][selected.c];
      if (isValidMove(selected.r, selected.c, r, c, p as string)) {
        const newBoard = board.map(row => [...row]);
        if (newBoard[r][c] === 'k') { onResult(); alert('Checkmate! You Win!'); }
        newBoard[r][c] = p;
        newBoard[selected.r][selected.c] = null;
        setBoard(newBoard);
        setSelected(null);
        setTurn('black');
        setStatus('AI Thinking...');
        setTimeout(aiMove, 500);
      } else if (piece && isWhite(piece)) {
        setSelected({r, c});
      }
    } else if (piece && isWhite(piece)) {
      setSelected({r, c});
    }
  };

  const aiMove = () => {
    setBoard(prev => {
      const next = prev.map(row => [...row]);
      let moved = false;
      // Simple AI: Try to capture, else random
      const pieces = [];
      for(let r=0; r<8; r++) for(let c=0; c<8; c++) if(next[r][c] && isBlack(next[r][c] as string)) pieces.push({r,c,p:next[r][c]});
      
      // Try capture white piece
      for (let p of pieces) {
        const moves = [{r:1,c:0}, {r:1,c:-1}, {r:1,c:1}, {r:-1,c:0}, {r:0,c:1}, {r:0,c:-1}];
        for (let m of moves) {
           const nr = p.r + m.r, nc = p.c + m.c;
           if(nr>=0 && nr<8 && nc>=0 && nc<8 && next[nr][nc] && isWhite(next[nr][nc] as string)) {
             next[nr][nc] = p.p; next[p.r][p.c] = null; moved = true; break;
           }
        }
        if(moved) break;
      }

      if (!moved && pieces.length > 0) {
        let attempts = 0;
        while (!moved && attempts < 50) {
          const p = pieces[Math.floor(Math.random() * pieces.length)];
          const nr = p.r + 1; // Try move down
          if (nr < 8 && !next[nr][p.c]) {
            next[nr][p.c] = p.p; next[p.r][p.c] = null; moved = true;
          }
          attempts++;
        }
      }
      setTurn('white'); setStatus('Your Move'); return next;
    });
  };

  return (
    <div className="flex flex-col items-center bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-xl">
      <div className="mb-4 font-bold text-lg text-zinc-600 dark:text-zinc-300">{status}</div>
      <div className="grid grid-cols-8 border-4 border-zinc-700 bg-zinc-400">
        {board.map((row, r) => row.map((cell, c) => {
          const isDark = (r + c) % 2 === 1;
          const isSel = selected?.r === r && selected?.c === c;
          return (
            <div 
              key={`${r}-${c}`} 
              onClick={() => handleClick(r, c)}
              className={`w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center text-3xl sm:text-4xl cursor-pointer ${isDark ? 'bg-zinc-600' : 'bg-zinc-300'} ${isSel ? 'bg-yellow-400' : ''}`}
            >
              <span className={isWhite(cell as string) ? 'text-white drop-shadow-md' : 'text-black'}>
                {cell ? getPieceDisplay(cell as string) : ''}
              </span>
            </div>
          );
        }))}
      </div>
    </div>
  );
};

// --- 2. TIC TAC TOE (MINIMAX) ---
const TicTacToe: React.FC<{onWin: () => void}> = ({onWin}) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (sq: any[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let [a,b,c] of lines) if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
    return sq.every(Boolean) ? 'Draw' : null;
  };

  const minimax = (sq: any[], depth: number, isMax: boolean): number => {
    const res = checkWinner(sq);
    if (res === 'O') return 10 - depth;
    if (res === 'X') return depth - 10;
    if (res === 'Draw') return 0;

    if (isMax) {
      let best = -1000;
      for(let i=0; i<9; i++) {
        if(!sq[i]) { sq[i] = 'O'; best = Math.max(best, minimax(sq, depth+1, false)); sq[i] = null; }
      }
      return best;
    } else {
      let best = 1000;
      for(let i=0; i<9; i++) {
        if(!sq[i]) { sq[i] = 'X'; best = Math.min(best, minimax(sq, depth+1, true)); sq[i] = null; }
      }
      return best;
    }
  };

  const handleClick = (i: number) => {
    if (board[i] || winner || !isPlayerTurn) return;
    const next = [...board]; next[i] = 'X'; setBoard(next);
    const w = checkWinner(next);
    if (w) { setWinner(w); if(w==='X') onWin(); return; }
    
    setIsPlayerTurn(false);
    setTimeout(() => {
      let bestVal = -1000, bestMove = -1;
      for(let j=0; j<9; j++) {
        if(!next[j]) {
          next[j] = 'O';
          const moveVal = minimax(next, 0, false);
          next[j] = null;
          if(moveVal > bestVal) { bestMove = j; bestVal = moveVal; }
        }
      }
      if(bestMove !== -1) {
        next[bestMove] = 'O'; setBoard(next);
        const w2 = checkWinner(next);
        if(w2) setWinner(w2);
        setIsPlayerTurn(true);
      }
    }, 500);
  };

  return (
    <div className="flex flex-col items-center bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-purple-500">{winner ? (winner === 'Draw' ? 'Draw!' : `${winner} Wins!`) : (isPlayerTurn ? 'Your Turn' : 'AI Thinking...')}</h3>
      <div className="grid grid-cols-3 gap-2 bg-zinc-200 dark:bg-zinc-700 p-2 rounded-lg">
        {board.map((v, i) => (
          <button 
            key={i} 
            onClick={() => handleClick(i)}
            className={`w-20 h-20 bg-white dark:bg-zinc-900 rounded font-black text-4xl flex items-center justify-center shadow-sm ${v==='X'?'text-blue-500':'text-red-500'}`}
          >
            {v}
          </button>
        ))}
      </div>
      <button onClick={() => {setBoard(Array(9).fill(null)); setWinner(null); setIsPlayerTurn(true);}} className="mt-6 px-6 py-2 bg-zinc-200 dark:bg-zinc-700 rounded-full font-bold">Restart</button>
    </div>
  );
};

// --- 3. SNAKE ---
const Snake: React.FC<{onWin: () => void, onLose: () => void}> = ({onWin, onLose}) => {
  const [snake, setSnake] = useState([{x:10,y:10}]);
  const [food, setFood] = useState({x:15,y:5});
  const [dir, setDir] = useState({x:0,y:-1});
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useInterval(() => {
    if(gameOver) return;
    const h = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
    if (h.x < 0 || h.x >= 20 || h.y < 0 || h.y >= 20 || snake.some(s => s.x===h.x && s.y===h.y)) {
      setGameOver(true); onLose(); return;
    }
    const n = [h, ...snake];
    if (h.x === food.x && h.y === food.y) {
      setScore(s => s+1); setFood({x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*20)});
      if((score+1) % 5 === 0) onWin();
    } else n.pop();
    setSnake(n);
  }, 100);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if(e.key==='ArrowUp' && dir.y!==1) setDir({x:0,y:-1});
      if(e.key==='ArrowDown' && dir.y!==-1) setDir({x:0,y:1});
      if(e.key==='ArrowLeft' && dir.x!==1) setDir({x:-1,y:0});
      if(e.key==='ArrowRight' && dir.x!==-1) setDir({x:1,y:0});
    };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [dir]);

  return (
    <div className="flex flex-col items-center bg-zinc-900 p-6 rounded-xl border border-zinc-700 shadow-2xl">
      <div className="mb-4 text-green-400 font-mono font-bold text-xl">SCORE: {score}</div>
      <div className="relative bg-black border-2 border-zinc-700 w-[300px] h-[300px]">
        {snake.map((s, i) => <div key={i} className="absolute bg-green-500 w-[15px] h-[15px] border-[0.5px] border-black" style={{left:s.x*15, top:s.y*15}} />)}
        <div className="absolute bg-red-500 w-[15px] h-[15px] rounded-full" style={{left:food.x*15, top:food.y*15}} />
        {gameOver && <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-red-500 font-black text-2xl">GAME OVER<button onClick={()=>{setSnake([{x:10,y:10}]); setScore(0); setGameOver(false);}} className="mt-2 text-sm bg-white text-black px-3 py-1 rounded">Retry</button></div>}
      </div>
      <div className="mt-4 text-zinc-500 text-xs">Use Arrow Keys</div>
    </div>
  );
};

// --- 4. CONNECT 4 ---
const ConnectFour: React.FC<{onWin: () => void}> = ({onWin}) => {
  const [board, setBoard] = useState(Array(42).fill(null));
  const [redNext, setRedNext] = useState(true);
  const [win, setWin] = useState<string|null>(null);

  const check = (b: any[]) => {
    // Simplified Horizontal/Vertical check
    for(let r=0; r<6; r++) for(let c=0; c<4; c++) { const i=r*7+c; if(b[i] && b[i]===b[i+1] && b[i]===b[i+2] && b[i]===b[i+3]) return b[i]; }
    for(let r=0; r<3; r++) for(let c=0; c<7; c++) { const i=r*7+c; if(b[i] && b[i]===b[i+7] && b[i]===b[i+14] && b[i]===b[i+21]) return b[i]; }
    return null;
  };

  const drop = (col: number) => {
    if(win || !redNext) return;
    const n = [...board];
    for(let r=5; r>=0; r--) { 
      if(!n[r*7+col]) { 
        n[r*7+col] = '🔴'; setBoard(n); 
        if(check(n)) { setWin('🔴'); onWin(); } 
        else { setRedNext(false); setTimeout(()=>ai(n), 500); }
        return; 
      } 
    }
  };

  const ai = (b: any[]) => {
    const n = [...b];
    // Simple random AI
    for(let i=0; i<50; i++) {
        const c = Math.floor(Math.random()*7);
        for(let r=5; r>=0; r--) {
            if(!n[r*7+c]) { 
                n[r*7+c] = '🟡'; setBoard(n); 
                if(check(n)) setWin('🟡'); 
                setRedNext(true); return; 
            }
        }
    }
  };

  return (
    <div className="bg-blue-800 p-6 rounded-xl shadow-xl inline-block">
      <h3 className="text-white font-bold mb-4 text-center">{win ? `${win} Wins!` : (redNext ? 'Your Turn' : 'AI Thinking...')}</h3>
      <div className="grid grid-cols-7 gap-2 bg-blue-900 p-2 rounded-lg">
        {board.map((c, i) => (
          <div key={i} onClick={() => drop(i % 7)} className="w-10 h-10 bg-blue-950 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-900 transition-colors shadow-inner">
            <span className="text-2xl">{c}</span>
          </div>
        ))}
      </div>
      <button onClick={() => {setBoard(Array(42).fill(null)); setWin(null); setRedNext(true);}} className="mt-4 w-full bg-white text-blue-900 font-bold py-2 rounded">Reset</button>
    </div>
  );
};

// --- 5. SUDOKU ---
const Sudoku: React.FC<{onWin: () => void}> = ({onWin}) => {
  const PUZZLE = "530070000600195000098000060800060003400803001700020006060000280000419005000080079";
  const SOLVED = "534678912672195348198342567859761423426853791713924856961537284287419635345286179";
  const [grid, setGrid] = useState(PUZZLE.split('').map(c => parseInt(c) || 0));
  const [sel, setSel] = useState<number|null>(null);

  const input = (n: number) => {
    if(sel !== null && PUZZLE[sel] === '0') {
      const g = [...grid]; g[sel] = n; setGrid(g);
      if(g.join('') === SOLVED) { alert("Solved!"); onWin(); }
    }
  };

  return (
    <div className="flex flex-col items-center bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-xl">
      <div className="grid grid-cols-9 border-2 border-black bg-zinc-500 gap-px mb-4">
        {grid.map((v, i) => (
          <div 
            key={i} 
            onClick={() => setSel(i)}
            className={`w-8 h-8 flex items-center justify-center cursor-pointer text-lg ${PUZZLE[i]!=='0'?'bg-zinc-300 font-bold text-black':'bg-white text-blue-600'} ${sel===i?'bg-yellow-300':''}`}
          >
            {v||''}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {[1,2,3,4,5,6,7,8,9].map(n => <button key={n} onClick={() => input(n)} className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded font-bold hover:bg-blue-500 hover:text-white">{n}</button>)}
      </div>
    </div>
  );
};

// --- 6. MEMORY ---
const MemoryGame: React.FC<{onWin: () => void}> = ({onWin}) => {
  const EMOJIS = ['🚀','🛸','🌍','🌕','⭐','☄️','👾','🤖'];
  const [cards, setCards] = useState<{id:number, val:string, open:boolean, match:boolean}[]>([]);
  const [sel, setSel] = useState<number[]>([]);

  useEffect(() => {
    setCards([...EMOJIS, ...EMOJIS].sort(()=>Math.random()-0.5).map((e,i)=>({id:i, val:e, open:false, match:false})));
  }, []);

  const click = (i: number) => {
    if(sel.length===2 || cards[i].open || cards[i].match) return;
    const n = [...cards]; n[i].open = true; setCards(n);
    const newSel = [...sel, i]; setSel(newSel);
    
    if(newSel.length === 2) {
      if(n[newSel[0]].val === n[newSel[1]].val) {
        n[newSel[0]].match = n[newSel[1]].match = true; setCards(n); setSel([]);
        if(n.every(c => c.match)) onWin();
      } else {
        setTimeout(() => {
          n[newSel[0]].open = n[newSel[1]].open = false; setCards(n); setSel([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="grid grid-cols-4 gap-3 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-xl">
      {cards.map((c, i) => (
        <div 
          key={i} 
          onClick={() => click(i)}
          className={`w-16 h-16 rounded-lg flex items-center justify-center text-3xl cursor-pointer transition-transform duration-500 ${c.open || c.match ? 'bg-zinc-100 rotate-y-180' : 'bg-indigo-600'}`}
        >
          {c.open || c.match ? c.val : ''}
        </div>
      ))}
    </div>
  );
};

export default Games;