import React, { useEffect } from 'react';

interface AdUnitProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  label?: string;
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ slotId, format = 'auto', label = 'Advertisement', className = '' }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [slotId]); // Re-push ad if slotId changes, useful for component reuse

  return (
    <div className={`my-8 flex flex-col items-center justify-center ${className}`}>
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded text-center">
        {label}
      </span>
      
      {/* 
        This is the container where Google AdSense script injects the iframe.
      */}
      <div className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 min-h-[120px] md:min-h-[250px] flex items-center justify-center text-slate-400 dark:text-slate-500 rounded-xl overflow-hidden relative group">
        
        {/* In production, this will be filled by Google AdSense */}
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%' }}
             data-ad-client="ca-pub-8175326569491671"
             data-ad-slot={slotId}
             data-ad-format={format}
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
};

export default AdUnit;