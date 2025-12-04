import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ZODIAC_SIGNS } from '@/constants';
import AdUnit from '@/components/AdUnit';

interface CachedReading {
  reading: string;
  expiry: string; // YYYY-MM-DD
}

const Horoscope: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<any>(null);
  const [reading, setReading] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Clean up old horoscopes on initial mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('horoscope_')) {
            try {
                const item = JSON.parse(localStorage.getItem(key) || '{}') as CachedReading;
                if (item.expiry !== today) {
                    localStorage.removeItem(key);
                }
            } catch (e) {
                // If parsing fails, it's a corrupted entry, remove it
                localStorage.removeItem(key);
            }
        }
    });
  }, []);

  const getHoroscope = async (sign: any) => {
    setSelectedSign(sign);
    setLoading(true);
    setReading('');

    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `horoscope_${sign.name}_${today}`;
    
    // 1. Check cache first
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        const parsedData = JSON.parse(cachedData) as CachedReading;
        setReading(parsedData.reading);
        setLoading(false);
        return;
    }

    // 2. If not in cache, fetch from API
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate a fun, positive, and mystical daily horoscope reading for ${sign.name} for today (${today}). Include lucky numbers, a lucky color, and a short piece of advice. Keep it under 100 words. Format with emojis.`,
      });
      if (response.text) {
        setReading(response.text);
        // 3. Save to cache for today
        const newReading: CachedReading = { reading: response.text, expiry: today };
        localStorage.setItem(cacheKey, JSON.stringify(newReading));
      } else {
        throw new Error("Empty response from API");
      }
    } catch (error) {
      console.error(error);
      setReading(" The stars are a bit cloudy today. Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-2">Daily Horoscope (Rashifal)</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover what the stars have in store for you today.</p>
      </div>

      {!selectedSign ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ZODIAC_SIGNS.map((sign) => (
            <button
              key={sign.name}
              onClick={() => getHoroscope(sign)}
              className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all border border-gray-100 dark:border-gray-800 flex flex-col items-center gap-3 group"
            >
              <div className="text-5xl group-hover:animate-bounce">{sign.icon}</div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{sign.name}</h3>
                <p className="text-xs text-gray-500">{sign.date}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
           <button 
             onClick={() => setSelectedSign(null)}
             className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
           >
             ← Choose another sign
           </button>

           <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-2xl shadow-2xl">
             <div className="bg-white dark:bg-[#1a1a2e] p-8 rounded-xl h-full relative overflow-hidden">
               {/* Background Stars */}
               <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
                    style={{backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
               </div>

               <div className="relative z-10 text-center">
                 <div className="text-6xl mb-4">{selectedSign.icon}</div>
                 <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{selectedSign.name} Daily Reading</h2>
                 
                 {loading ? (
                   <div className="py-12">
                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
                     <p className="mt-4 text-purple-600 dark:text-purple-300 animate-pulse">Consulting the stars...</p>
                   </div>
                 ) : (
                   <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                     {reading}
                   </div>
                 )}
               </div>
             </div>
           </div>
           
           <div className="mt-8">
             <AdUnit slotId="horoscope-bottom" />
           </div>
        </div>
      )}
    </div>
  );
};

export default Horoscope;
