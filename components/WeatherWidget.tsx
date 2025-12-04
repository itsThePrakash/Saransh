import React, { useState, useEffect } from 'react';

// Using simulated data to avoid API key requirements for this demo
// In a real app, this would fetch from OpenWeatherMap or similar.
const WEATHER_DATA = {
  temp: 28,
  condition: 'Sunny',
  humidity: 45,
  wind: 12,
  location: 'Jaipur, IN'
};

const WeatherWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mb-10 blur-xl"></div>

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-sm font-medium opacity-80">{getGreeting()}</p>
          <h2 className="text-2xl font-bold mt-1">{WEATHER_DATA.location}</h2>
          <p className="text-xs opacity-75">{time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-5xl font-bold mb-1">{WEATHER_DATA.temp}°</div>
          <p className="text-sm font-medium">{WEATHER_DATA.condition}</p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 mt-6 border-t border-white/20 pt-4">
        <div className="flex items-center gap-2">
           <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
           <div>
             <span className="text-xs opacity-70 block">Humidity</span>
             <span className="font-semibold">{WEATHER_DATA.humidity}%</span>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
           <div>
             <span className="text-xs opacity-70 block">Wind</span>
             <span className="font-semibold">{WEATHER_DATA.wind} km/h</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;