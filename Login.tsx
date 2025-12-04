import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Login (Mock credentials)
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('user', 'Admin');
      // Force reload to update Header and Components
      window.location.href = '/'; 
    } else {
      setError('Invalid Username or Password');
    }
  };

  const fillDemoCredentials = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-fade-in">
      <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md relative overflow-hidden">
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full -ml-16 -mb-16 blur-xl"></div>

        <div className="relative z-10">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg mx-auto mb-4">S</div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Admin Login</h1>
                <p className="text-zinc-500 text-sm">Welcome back, Boss.</p>
            </div>

            {/* Demo Credentials Hint */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-6 text-center border border-blue-100 dark:border-blue-800">
                <p className="text-xs text-blue-600 dark:text-blue-300 font-bold mb-1">
                    FOR DEMO PURPOSES:
                </p>
                <p className="text-xs text-blue-800 dark:text-blue-200 font-mono">
                    ID: <span className="font-bold">admin</span> | Pass: <span className="font-bold">admin123</span>
                </p>
                <button 
                  type="button"
                  onClick={fillDemoCredentials}
                  className="mt-2 text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                >
                  Auto-fill Credentials
                </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Username</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="Enter username"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="••••••••"
                    />
                </div>

                {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

                <button 
                    type="submit" 
                    className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-lg transition-all active:scale-95"
                >
                    Login to Dashboard
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-xs text-zinc-400">
                    Secure access for Saransh Team only.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;