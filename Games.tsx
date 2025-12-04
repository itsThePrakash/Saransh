import React, { useState, useEffect, useCallback, useRef } from 'react';
import AdUnit from '@/components/AdUnit';

// --- Custom Hook for Game Loops (Corrected Implementation) ---
// This hook sets up an interval that correctly handles changes to the callback function.
// The previous implementation had a TypeScript error related to useRef, which is now fixed.
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      const tick = () => savedCallback.current();
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'tictactoe' | 'memory' | 'snake' | 'sudoku' | null>(null);

  const GameWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div>
      <button 
        onClick={() => setActiveGame(null)}
        className="mb-8 px-6 py-2 bg-gray-200 dark:bg-gray-800 rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Arcade
      </button>
      {children}
    </div>
  );

  return (
    <div className="animate-fade-in text-center">
      {!activeGame ? (
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-10 rounded-2xl mb-12 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-10 -mb-10 blur-xl"></div>
             
             <h1 className="text-5xl font-bold mb-2 relative z-10">Arcade Zone</h1>
             <p className="text-xl opacity-90 relative z-10">Relax, Play, Enjoy.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <GameCard icon="⭕❌" title="Tic Tac Toe" description="Classic strategy with AI." onClick={() => setActiveGame('tictactoe')} />
            <GameCard icon="🧠" title="Memory Match" description="Test your brain power!" onClick={() => setActiveGame('memory')} />
            <GameCard icon="🐍" title="Classic Snake" description="Eat the dots, grow your snake." onClick={() => setActiveGame('snake')} />
            <GameCard icon="🔢" title="Sudoku" description="A puzzle of logic and numbers." onClick={() => setActiveGame('sudoku')} />
          </div>
        </div>
      ) : (
        <GameWrapper>
          {activeGame === 'tictactoe' && <TicTacToe />}
          {activeGame === 'memory' && <MemoryGame />}
          {activeGame === 'snake' && <Snake />}
          {activeGame === 'sudoku' && <Sudoku />}
        </GameWrapper>
      )}

      <div className="mt-12 max-w-2xl mx-auto">
         <AdUnit slotId="games-footer" format="auto" />
      </div>
    </div>
  );
};

const GameCard: React.FC<{icon: string, title: string, description: string, onClick: () => void}> = ({icon, title, description, onClick}) => (
    <button 
        onClick={onClick}
        className="group bg-white dark:bg-dark-card p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 dark:border-gray-800 text-center"
    >
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
        <p className="text-gray-500">{description}</p>
    </button>
);


// --- Tic Tac Toe Component ---
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });
  const [mode, setMode] = useState<'pvp' | 'pvc' | null>(null);

  const calculateWinner = (squares: any[]) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const winInfo = calculateWinner(board);
  const winner = winInfo?.winner;
  const isDraw = !winner && board.every(Boolean);

  const computerMove = (currentBoard: any[]) => {
    const emptyIndices = currentBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
    if (emptyIndices.length === 0) return;

    // 1. Check if computer can win
    for (let i of emptyIndices) {
      const testBoard = [...currentBoard];
      testBoard[i] = 'O';
      if (calculateWinner(testBoard)?.winner === 'O') {
        handleClick(i);
        return;
      }
    }

    // 2. Check if player can win and block
    for (let i of emptyIndices) {
      const testBoard = [...currentBoard];
      testBoard[i] = 'X';
      if (calculateWinner(testBoard)?.winner === 'X') {
        handleClick(i);
        return;
      }
    }
    
    // 3. Simple random move
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    setTimeout(() => handleClick(randomIndex), 500);
  };
  
  useEffect(() => {
    if (winner) {
      setScores(s => ({ ...s, [winner.toLowerCase()]: s[winner.toLowerCase() as 'x' | 'o'] + 1 }));
    } else if (isDraw) {
      setScores(s => ({ ...s, draws: s.draws + 1 }));
    } else if (mode === 'pvc' && !xIsNext) {
      computerMove(board);
    }
  }, [winner, isDraw, xIsNext, mode]);

  const handleClick = (i: number) => {
    if (winner || board[i] || (mode === 'pvc' && !xIsNext)) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };
  
  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  if (!mode) {
    return (
      <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-lg max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold">Choose Game Mode</h2>
        <button onClick={() => setMode('pvp')} className="w-full text-lg p-4 bg-blue-500 text-white rounded-lg font-bold">👤 vs 👤 Player vs Player</button>
        <button onClick={() => setMode('pvc')} className="w-full text-lg p-4 bg-purple-500 text-white rounded-lg font-bold">👤 vs 🤖 Player vs Computer</button>
      </div>
    );
  }

  return (
    <div className="relative bg-white dark:bg-dark-card p-8 rounded-3xl shadow-2xl max-w-md mx-auto border border-gray-100 dark:border-gray-800 overflow-hidden">
      
      {(winner || isDraw) && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center animate-fade-in">
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl text-center shadow-2xl transform scale-100">
             <div className="text-5xl mb-4">{winner ? '🎉' : (mode === 'pvc' && winner === 'O' ? '🤖' : '🤝')}</div>
             <h3 className="text-3xl font-bold mb-4">{winner ? (mode === 'pvc' ? (winner === 'X' ? 'You Win!' : 'Computer Wins!') : `Player ${winner} Wins!`) : "It's a Draw!"}</h3>
             <button onClick={resetBoard} className="bg-primary text-white font-bold px-6 py-3 rounded-lg">Play Again</button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">Tic Tac Toe</h2>
        <button onClick={() => setMode(null)} className="text-xs font-bold text-gray-500">Change Mode</button>
      </div>

      <div className="flex justify-around bg-gray-100 dark:bg-gray-800 p-2 rounded-lg mb-6 text-sm font-bold">
         <span>❌ X Wins: {scores.x}</span>
         <span>🤝 Draws: {scores.draws}</span>
         <span>⭕ O Wins: {scores.o}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-8">
        {board.map((square, i) => (
          <button
            key={i}
            className={`h-24 w-24 text-5xl font-black rounded-2xl transition-all duration-300 transform ${
                winInfo?.line?.includes(i) ? 'bg-green-500 text-white scale-105' :
                square === 'X' ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/10' :
                square === 'O' ? 'text-pink-500 bg-pink-50 dark:bg-pink-900/10' :
                'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            onClick={() => handleClick(i)}
            disabled={!!winner}
          >
            {square}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Memory Game Component ---
const CARDS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
const MemoryGame = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    if (isGameActive && solved.length < CARDS.length) {
      timer = window.setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => {
        if (timer) window.clearInterval(timer);
    };
  }, [isGameActive, solved]);

  const shuffleCards = () => {
    const shuffled = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, id) => ({ id, emoji }));
    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setTime(0);
    setIsGameActive(false);
  };

  const handleClick = (index: number) => {
    if (!isGameActive) setIsGameActive(true);
    if (disabled || flipped.includes(index) || solved.includes(cards[index].emoji)) return;

    if (flipped.length === 0) {
      setFlipped([index]);
    } else if (flipped.length === 1) {
      setMoves(m => m + 1);
      setDisabled(true);
      const firstIndex = flipped[0];
      setFlipped([firstIndex, index]);

      if (cards[firstIndex].emoji === cards[index].emoji) {
        setSolved(prev => [...prev, cards[firstIndex].emoji]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const isGameWon = solved.length === CARDS.length;

  return (
    <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl max-w-lg mx-auto relative">
       {isGameWon && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center animate-fade-in">
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl text-center shadow-2xl">
             <div className="text-5xl mb-4">🏆</div>
             <h3 className="text-3xl font-bold mb-2">You Win!</h3>
             <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
               Time: {time}s | Moves: {moves}
             </p>
             <button onClick={shuffleCards} className="bg-primary text-white font-bold px-6 py-3 rounded-lg">Play Again</button>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Memory Match</h2>
        <div className="flex gap-4 font-bold text-sm">
            <span>Moves: {moves}</span>
            <span>Time: {time}s</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map((card, index) => (
          <div key={index} className="perspective w-full h-20">
            <button
              onClick={() => handleClick(index)}
              className={`w-full h-full transition-transform duration-500 transform-style-3d ${flipped.includes(index) || solved.includes(card.emoji) ? 'rotate-y-180' : ''}`}
            >
              <div className="absolute inset-0 bg-primary rounded-xl flex items-center justify-center backface-hidden"></div>
              <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-3xl rotate-y-180 backface-hidden">
                {card.emoji}
              </div>
            </button>
          </div>
        ))}
      </div>
      <button 
        onClick={shuffleCards}
        className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
      >
        New Game
      </button>
      <style>{`
        .perspective { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
};


// --- Snake Game Component ---
const GRID_SIZE = 20;
const TICK_RATE = 150;
const Snake = () => {
    const [snake, setSnake] = useState([{x: 10, y: 10}]);
    const [food, setFood] = useState({x: 5, y: 5});
    const [direction, setDirection] = useState({x: 0, y: -1});
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const generateFood = (currentSnake: {x:number, y:number}[]) => {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
        } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        setFood(newFood);
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        switch(e.key) {
            case 'ArrowUp': if(direction.y === 0) setDirection({x: 0, y: -1}); break;
            case 'ArrowDown': if(direction.y === 0) setDirection({x: 0, y: 1}); break;
            case 'ArrowLeft': if(direction.x === 0) setDirection({x: -1, y: 0}); break;
            case 'ArrowRight': if(direction.x === 0) setDirection({x: 1, y: 0}); break;
        }
    }, [direction]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const gameLoop = () => {
        if (isGameOver) return;
        
        const newSnake = [...snake];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

        // Wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            setIsGameOver(true);
            return;
        }

        // Self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
            setIsGameOver(true);
            return;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            setScore(s => s + 1);
            generateFood(newSnake);
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    };

    const restartGame = () => {
        setSnake([{x: 10, y: 10}]);
        setDirection({x: 0, y: -1});
        generateFood([{x: 10, y: 10}]);
        setIsGameOver(false);
        setScore(0);
    }
    
    useInterval(gameLoop, isGameOver ? null : TICK_RATE);

    return (
        <div className="bg-zinc-800 p-4 rounded-2xl shadow-xl max-w-lg mx-auto text-white font-mono">
            <div className="flex justify-between items-center mb-4 px-2">
                <h2 className="text-xl font-bold">Snake</h2>
                <div className="text-lg">Score: <span className="font-bold">{score}</span></div>
            </div>
            <div className="relative bg-black" style={{width: GRID_SIZE * 20, height: GRID_SIZE * 20, display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`}}>
                {isGameOver && (
                    <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center">
                        <h3 className="text-3xl font-bold text-red-500">Game Over</h3>
                        <p className="text-xl mt-2">Final Score: {score}</p>
                        <button onClick={restartGame} className="mt-4 bg-primary text-white font-bold px-4 py-2 rounded">Restart</button>
                    </div>
                )}
                {snake.map((seg, i) => (
                    <div key={i} className="bg-green-500" style={{gridColumn: seg.x + 1, gridRow: seg.y + 1, ...(i === 0 && {backgroundColor: '#4ade80'})}}></div>
                ))}
                <div className="bg-red-500 rounded-full" style={{gridColumn: food.x + 1, gridRow: food.y + 1}}></div>
            </div>
        </div>
    );
};

// --- Sudoku Component ---
const Sudoku = () => {
    const [board, setBoard] = useState<(number | null)[]>(Array(81).fill(null));
    const [selected, setSelected] = useState<number | null>(null);
    const initialBoard = "53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79";

    useEffect(() => {
        const newBoard = initialBoard.split('').map(c => c === '.' ? null : parseInt(c));
        setBoard(newBoard);
    }, []);

    const handleCellClick = (index: number) => {
        // Allow selecting only empty cells
        if (initialBoard[index] === '.') {
            setSelected(index);
        }
    };

    return (
        <div className="bg-white dark:bg-dark-card p-4 md:p-8 rounded-2xl shadow-xl max-w-lg mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Sudoku</h2>
            <div className="grid grid-cols-9 gap-px bg-zinc-300 dark:bg-zinc-700 p-1 md:p-2 rounded-lg w-min mx-auto">
                {board.map((val, i) => {
                    const isInitial = initialBoard[i] !== '.';
                    return (
                        <button 
                            key={i} 
                            onClick={() => handleCellClick(i)}
                            className={`w-9 h-9 md:w-12 md:h-12 flex items-center justify-center text-xl md:text-2xl transition-colors
                                ${selected === i ? 'bg-blue-200 dark:bg-blue-800' : 'bg-white dark:bg-zinc-800'}
                                ${isInitial ? 'font-bold text-zinc-900 dark:text-white' : 'font-semibold text-primary'}
                                ${((i % 9) + 1) % 3 === 0 && i % 9 !== 8 ? 'border-r-2 border-zinc-400 dark:border-zinc-600' : ''}
                                ${Math.floor(i / 9) % 3 === 2 && i < 72 ? 'border-b-2 border-zinc-400 dark:border-zinc-600' : ''}
                            `}
                        >
                            {val}
                        </button>
                    )
                })}
            </div>
             <p className="mt-4 text-center text-zinc-500 text-sm">A simple interactive board. Full game logic coming soon!</p>
        </div>
    );
};


export default Games;
