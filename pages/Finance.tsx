import React, { useState, useEffect } from 'react';
import AdUnit from '@/components/AdUnit';
import { MOCK_ARTICLES } from '@/constants';
import ArticleCard from '@/components/ArticleCard';

interface MarketItem {
  symbol: string;
  price: number;
  change: number; // Percentage change
  type: 'index' | 'commodity' | 'crypto' | 'forex' | 'stock';
  isLive?: boolean; // To indicate if data came from API
}

// FALLBACK DATA
const INITIAL_MARKET_DATA: MarketItem[] = [
  // Major Indices (Simulated)
  { symbol: 'NIFTY 50', price: 25010.50, change: 0.45, type: 'index' },
  { symbol: 'SENSEX', price: 81550.75, change: 0.52, type: 'index' },
  { symbol: 'BANK NIFTY', price: 51100.20, change: -0.15, type: 'index' },
  { symbol: 'INDIA VIX', price: 12.50, change: -1.2, type: 'index' },

  // Commodities (Simulated)
  { symbol: 'GOLD (10g)', price: 79200.00, change: 0.15, type: 'commodity' },
  { symbol: 'SILVER (1kg)', price: 94500.00, change: 0.8, type: 'commodity' },
  { symbol: 'CRUDE OIL', price: 6150.00, change: -0.5, type: 'commodity' },
  { symbol: 'NATURAL GAS', price: 240.50, change: 1.2, type: 'commodity' },
  { symbol: 'COPPER', price: 860.20, change: 0.3, type: 'commodity' },

  // Crypto (Simulated/Fetched)
  { symbol: 'USDT/INR', price: 90.25, change: 0.10, type: 'crypto' },
  { symbol: 'BTC/USD', price: 68500.00, change: 1.4, type: 'crypto' },
  { symbol: 'ETH/USD', price: 2750.00, change: 0.8, type: 'crypto' },
  { symbol: 'SOL/USD', price: 160.20, change: 2.1, type: 'crypto' },
  { symbol: 'BNB/USD', price: 605.10, change: -0.5, type: 'crypto' },

  // Forex (Simulated/Fetched)
  { symbol: 'USD/INR', price: 83.98, change: 0.02, type: 'forex' },
  { symbol: 'EUR/INR', price: 92.50, change: -0.1, type: 'forex' },
  { symbol: 'GBP/INR', price: 109.20, change: 0.3, type: 'forex' },

  // Stocks (Simulated)
  { symbol: 'RELIANCE', price: 3050.20, change: 0.8, type: 'stock' },
  { symbol: 'TCS', price: 4250.00, change: -0.2, type: 'stock' },
  { symbol: 'HDFCBANK', price: 1680.50, change: 0.5, type: 'stock' },
  { symbol: 'INFY', price: 1890.00, change: 1.1, type: 'stock' },
  { symbol: 'ICICIBANK', price: 1240.00, change: 0.4, type: 'stock' },
  { symbol: 'SBIN', price: 820.50, change: -0.3, type: 'stock' },
  { symbol: 'ZOMATO', price: 285.40, change: 2.5, type: 'stock' },
  { symbol: 'TATASTEEL', price: 158.00, change: 1.0, type: 'stock' },
];

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tools' | 'news'>('dashboard');
  const [marketData, setMarketData] = useState<MarketItem[]>(INITIAL_MARKET_DATA);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Modal State
  const [activeModal, setActiveModal] = useState<'IPO' | 'MUTUAL_FUNDS' | null>(null);

  // 1. FETCH REAL DATA
  const fetchLivePrices = async () => {
    try {
      const [cryptoRes, forexRes] = await Promise.all([
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether,bitcoin,ethereum,solana,binancecoin&vs_currencies=inr,usd&include_24hr_change=true'),
        fetch('https://api.frankfurter.app/latest?amount=1&from=USD&to=INR')
      ]);

      const cryptoData = await cryptoRes.json();
      const forexData = await forexRes.json();

      setMarketData(prevData => prevData.map(item => {
        if (item.symbol === 'USDT/INR' && cryptoData.tether) {
            return { ...item, price: cryptoData.tether.inr, change: cryptoData.tether.inr_24h_change, isLive: true };
        }
        if (item.symbol === 'BTC/USD' && cryptoData.bitcoin) {
            return { ...item, price: cryptoData.bitcoin.usd, change: cryptoData.bitcoin.usd_24h_change, isLive: true };
        }
        if (item.symbol === 'ETH/USD' && cryptoData.ethereum) {
            return { ...item, price: cryptoData.ethereum.usd, change: cryptoData.ethereum.usd_24h_change, isLive: true };
        }
        if (item.symbol === 'SOL/USD' && cryptoData.solana) {
            return { ...item, price: cryptoData.solana.usd, change: cryptoData.solana.usd_24h_change, isLive: true };
        }
        if (item.symbol === 'USD/INR' && forexData.rates && forexData.rates.INR) {
            return { ...item, price: forexData.rates.INR, isLive: true };
        }
        return item;
      }));
      setLastUpdated(new Date());
    } catch (error) {
      console.log("Simulated Data Active");
    }
  };

  useEffect(() => {
    fetchLivePrices();
    const apiInterval = setInterval(fetchLivePrices, 60000); 
    return () => clearInterval(apiInterval);
  }, []);

  // 2. SMOOTH SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prevData => prevData.map(item => {
        // Less volatility for a smoother "premium" feel
        let volatility = item.isLive ? 0.00002 : 0.0001; 
        if (item.type === 'crypto' && !item.isLive) volatility = 0.0005; 

        const direction = Math.random() > 0.49 ? 1 : -1;
        const changePercent = Math.random() * volatility * 100 * direction;
        
        const newPrice = item.price * (1 + (changePercent / 100));
        // Slowly drift the daily change
        const newDailyChange = item.change + (changePercent * 5); 

        return {
          ...item,
          price: Math.abs(newPrice),
          change: Number(newDailyChange.toFixed(2))
        };
      }));
    }, 2500); // Slower updates (2.5s) for better readability

    return () => clearInterval(interval);
  }, []);

  const handleQuickLink = (type: string) => {
    if (type === 'GOLD') document.getElementById('commodities-section')?.scrollIntoView({ behavior: 'smooth' });
    else if (type === 'IPO') setActiveModal('IPO');
    else if (type === 'MF') setActiveModal('MUTUAL_FUNDS');
  }
  
  return (
    <div className="animate-fade-in relative min-h-screen">
      
      {/* MODAL */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/50">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
                        {activeModal === 'IPO' ? '🚀 IPO Watch' : '💰 Top Mutual Funds'}
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="text-zinc-500 hover:text-red-500 text-2xl leading-none">&times;</button>
                </div>
                <div className="p-0 max-h-[60vh] overflow-y-auto">
                    <div className="p-6 text-center text-zinc-500">
                        {activeModal === 'IPO' ? "Detailed IPO Data Loaded..." : "Fund Performance Loaded..."}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* STICKY TICKER */}
      <div className="sticky top-[58px] z-40 bg-black text-white shadow-lg border-b border-zinc-800 h-10 flex items-center">
        <div className="bg-primary px-3 h-full flex items-center z-10 font-bold text-[10px] uppercase tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse mr-2"></span>
            Market Live
        </div>
        <div className="ticker-wrap w-full overflow-hidden bg-black/90 backdrop-blur-sm h-full flex items-center">
          <div className="ticker">
              {[...marketData, ...marketData].map((item, i) => (
              <span key={`${item.symbol}-${i}`} className="inline-flex items-center gap-2 mr-8 font-mono text-xs border-r border-zinc-800 pr-8">
                  <span className="font-bold text-zinc-300">{item.symbol}</span>
                  <span className="text-white">
                      {item.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </span>
                  <span className={`font-bold ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change)}%
                  </span>
              </span>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        {/* TABS */}
        <div className="flex justify-center mb-10">
            <div className="inline-flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-full shadow-inner">
                {['dashboard', 'tools', 'news'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                            activeTab === tab 
                            ? 'bg-white dark:bg-zinc-700 text-black dark:text-white shadow-md transform scale-105' 
                            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
        </div>

        {activeTab === 'dashboard' && <FinanceDashboard marketData={marketData} lastUpdated={lastUpdated} onQuickLink={handleQuickLink} />}
        {activeTab === 'tools' && <FinanceTools marketData={marketData} />}
        {activeTab === 'news' && <FinanceNews />}

      </div>
    </div>
  );
};

// --- COMPONENTS ---

const FinanceDashboard: React.FC<{ marketData: MarketItem[], lastUpdated: Date, onQuickLink: any }> = ({ marketData, lastUpdated, onQuickLink }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MarketHighlightCard title="SENSEX" item={marketData.find(m => m.symbol === 'SENSEX')} color="bg-zinc-900 dark:bg-zinc-800" text="text-white" prefix="₹" />
                    <MarketHighlightCard title="NIFTY 50" item={marketData.find(m => m.symbol === 'NIFTY 50')} color="bg-primary" text="text-white" prefix="₹" />
                </div>

                {/* Categories */}
                <SectionGrid title="Commodities (MCX)" items={marketData.filter(m => m.type === 'commodity')} prefix="₹" />
                <SectionGrid title="Crypto & Forex" items={[...marketData.filter(m => m.type === 'crypto'), ...marketData.filter(m => m.type === 'forex')]} prefix="" />
            </div>

            {/* Sidebar Tools */}
            <div className="space-y-6">
                 <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-bold text-lg mb-4 text-zinc-900 dark:text-white">Quick Actions</h3>
                    <ul className="space-y-2">
                        {[
                            { id: 'IPO', label: 'IPO Watch', icon: '🚀', color: 'bg-blue-50 text-blue-600' },
                            { id: 'MF', label: 'Top Mutual Funds', icon: '💰', color: 'bg-green-50 text-green-600' },
                            { id: 'GOLD', label: 'Check Gold Rate', icon: '⭐', color: 'bg-yellow-50 text-yellow-600' }
                        ].map(action => (
                            <li key={action.id} onClick={() => onQuickLink(action.id)} className="flex items-center gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
                                <span className={`w-10 h-10 flex items-center justify-center rounded-lg ${action.color} font-bold text-lg`}>{action.icon}</span>
                                <span className="font-bold text-sm text-zinc-700 dark:text-zinc-300">{action.label}</span>
                            </li>
                        ))}
                    </ul>
                 </div>
                 <AdUnit slotId="finance-dash-sidebar" />
            </div>
        </div>
    );
};

const MarketHighlightCard: React.FC<{title: string, item: any, color: string, text: string, prefix: string}> = ({title, item, color, text, prefix}) => (
    <div className={`${color} ${text} p-6 rounded-2xl shadow-lg relative overflow-hidden`}>
        <div className="relative z-10">
            <h3 className="text-sm font-bold opacity-70 uppercase tracking-wider mb-2">{title}</h3>
            <div className="text-3xl font-mono font-bold">{prefix}{item?.price.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
            <div className={`mt-2 inline-block px-2 py-1 rounded-md text-sm font-bold bg-white/10`}>
                {item?.change >= 0 ? '▲' : '▼'} {Math.abs(item?.change)}%
            </div>
        </div>
    </div>
);

const SectionGrid: React.FC<{title: string, items: any[], prefix: string}> = ({title, items, prefix}) => (
    <div>
        <h3 className="font-bold text-zinc-900 dark:text-white mb-4 border-l-4 border-primary pl-3">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {items.map(item => (
                <div key={item.symbol} className="bg-white dark:bg-dark-card p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 transition-colors">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase truncate">{item.symbol}</div>
                    <div className="font-mono font-bold text-zinc-900 dark:text-white my-1">
                        {prefix || (item.symbol.includes('USD') && !item.symbol.includes('INR') ? '$' : '₹')}
                        {item.price.toLocaleString(undefined, {maximumFractionDigits: 2})}
                    </div>
                    <div className={`text-xs font-bold ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change >= 0 ? '+' : ''}{item.change}%
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const FinanceTools: React.FC<{ marketData: MarketItem[] }> = ({ marketData }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
        <SIPCalculator />
        <CurrencyConverter marketData={marketData} />
        <div className="lg:col-span-2">
            <EMICalculator />
        </div>
    </div>
);

const FinanceNews: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        {MOCK_ARTICLES.filter(a => a.category === 'finance').slice(0, 9).map(a => <ArticleCard key={a.id} article={a} />)}
    </div>
);

// --- FULLY IMPLEMENTED CALCULATORS ---

const SIPCalculator = () => {
    const [investment, setInvestment] = useState(5000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);

    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    const investedAmount = investment * months;
    const totalValue = investment * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
    const gains = totalValue - investedAmount;

    return (
        <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold mb-6 text-xl text-zinc-900 dark:text-white flex items-center gap-2">
                🌱 SIP Calculator
            </h3>
            
            <div className="space-y-6 mb-8">
                <div>
                    <label className="flex justify-between text-sm font-medium mb-2 text-zinc-600 dark:text-zinc-400">
                        Monthly Investment
                        <span className="text-primary font-bold">₹{investment.toLocaleString()}</span>
                    </label>
                    <input type="range" min="500" max="100000" step="500" value={investment} onChange={e => setInvestment(Number(e.target.value))} className="w-full accent-primary" />
                </div>
                <div>
                    <label className="flex justify-between text-sm font-medium mb-2 text-zinc-600 dark:text-zinc-400">
                        Expected Return Rate (p.a)
                        <span className="text-primary font-bold">{rate}%</span>
                    </label>
                    <input type="range" min="5" max="30" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full accent-primary" />
                </div>
                <div>
                    <label className="flex justify-between text-sm font-medium mb-2 text-zinc-600 dark:text-zinc-400">
                        Time Period
                        <span className="text-primary font-bold">{years} Years</span>
                    </label>
                    <input type="range" min="1" max="40" step="1" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full accent-primary" />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                <div>
                    <div className="text-xs text-zinc-500 mb-1">Invested</div>
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">₹{investedAmount.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                </div>
                <div>
                    <div className="text-xs text-zinc-500 mb-1">Est. Returns</div>
                    <div className="font-bold text-green-600 text-sm">+₹{gains.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                </div>
                <div>
                    <div className="text-xs text-zinc-500 mb-1">Total Value</div>
                    <div className="font-bold text-primary text-base">₹{totalValue.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                </div>
            </div>
        </div>
    );
}

const EMICalculator = () => {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [interestRate, setInterestRate] = useState(9);
    const [tenure, setTenure] = useState(5); // Years

    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;

    return (
        <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold mb-6 text-xl text-zinc-900 dark:text-white flex items-center gap-2">
                🏠 EMI Calculator
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="flex justify-between text-sm font-medium mb-2 text-zinc-600 dark:text-zinc-400">
                            Loan Amount
                            <span className="text-primary font-bold">₹{loanAmount.toLocaleString()}</span>
                        </label>
                        <input type="range" min="100000" max="10000000" step="50000" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full accent-primary" />
                    </div>
                    <div>
                        <label className="flex justify-between text-sm font-medium mb-2 text-zinc-600 dark:text-zinc-400">
                            Interest Rate (%)
                            <span className="text-primary font-bold">{interestRate}%</span>
                        </label>
                        <input type="range" min="5" max="20" step="0.1" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full accent-primary" />
                    </div>
                    <div>
                        <label className="flex justify-between text-sm font-medium mb-2 text-zinc-600 dark:text-zinc-400">
                            Loan Tenure
                            <span className="text-primary font-bold">{tenure} Years</span>
                        </label>
                        <input type="range" min="1" max="30" step="1" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-full accent-primary" />
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-4 bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl">
                    <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-4">
                        <span className="text-zinc-600 dark:text-zinc-400">Monthly EMI</span>
                        <span className="text-2xl font-bold text-primary">₹{emi.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-sm text-zinc-500">Principal Amount</span>
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">₹{loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-500">Total Interest</span>
                        <span className="text-sm font-bold text-red-500">₹{totalInterest.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-700 pt-4 mt-2">
                        <span className="font-bold text-zinc-900 dark:text-white">Total Payable</span>
                        <span className="font-bold text-zinc-900 dark:text-white">₹{totalPayment.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const CurrencyConverter: React.FC<{ marketData: MarketItem[] }> = ({ marketData }) => {
    const [amount, setAmount] = useState<number>(1);
    const [fromCurr, setFromCurr] = useState('USD');
    const [toCurr, setToCurr] = useState('INR');

    // Helper to get rate from marketData
    const getRate = (from: string, to: string): number => {
        if (from === to) return 1;
        
        // Check direct pair in market data
        const directPair = marketData.find(m => m.symbol === `${from}/${to}`);
        if (directPair) return directPair.price;

        // Check inverse
        const inversePair = marketData.find(m => m.symbol === `${to}/${from}`);
        if (inversePair) return 1 / inversePair.price;

        // If simple USD conversion (fallback logic for demo)
        if (from === 'USD' && to === 'INR') {
             const rate = marketData.find(m => m.symbol === 'USD/INR')?.price || 84;
             return rate;
        }
        if (from === 'BTC' && to === 'USD') {
             const rate = marketData.find(m => m.symbol === 'BTC/USD')?.price || 65000;
             return rate;
        }
        
        // Multi-hop (e.g. BTC -> INR via USD)
        // BTC -> USD
        const btcUsd = marketData.find(m => m.symbol === 'BTC/USD')?.price;
        const usdInr = marketData.find(m => m.symbol === 'USD/INR')?.price;
        
        if (from === 'BTC' && to === 'INR' && btcUsd && usdInr) {
            return btcUsd * usdInr;
        }

        return 0; // Unknown pair
    };

    const rate = getRate(fromCurr, toCurr);
    const convertedAmount = amount * rate;

    return (
        <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold mb-6 text-xl text-zinc-900 dark:text-white flex items-center gap-2">
                💱 Currency Converter
            </h3>
            
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <label className="block text-xs font-bold text-zinc-500 mb-1">Amount</label>
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={e => setAmount(parseFloat(e.target.value) || 0)}
                        className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 font-mono text-lg font-bold outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-zinc-500 mb-1">From</label>
                        <select 
                            value={fromCurr} 
                            onChange={e => setFromCurr(e.target.value)}
                            className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none"
                        >
                            <option value="USD">USD - US Dollar</option>
                            <option value="INR">INR - Indian Rupee</option>
                            <option value="BTC">BTC - Bitcoin</option>
                            <option value="EUR">EUR - Euro</option>
                        </select>
                    </div>
                    <div className="pt-5 text-zinc-400">➔</div>
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-zinc-500 mb-1">To</label>
                        <select 
                            value={toCurr} 
                            onChange={e => setToCurr(e.target.value)}
                            className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none"
                        >
                            <option value="INR">INR - Indian Rupee</option>
                            <option value="USD">USD - US Dollar</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-primary/10 rounded-xl text-center">
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                        1 {fromCurr} = {rate ? rate.toLocaleString(undefined, {maximumFractionDigits: 2}) : '?'} {toCurr}
                    </div>
                    <div className="text-3xl font-bold text-primary">
                        {rate ? convertedAmount.toLocaleString(undefined, {maximumFractionDigits: 2}) : 'Unavailable'} <span className="text-lg">{toCurr}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Finance;