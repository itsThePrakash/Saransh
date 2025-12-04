import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import AdUnit from '@/components/AdUnit';

const LANGUAGES = [
  'English',
  'Hindi',
  'Bengali',
  'Marathi',
  'Telugu',
  'Tamil',
  'Gujarati',
  'Kannada',
  'Malayalam',
  'Punjabi',
  'Urdu',
  'Sanskrit',
  'Spanish',
  'French',
  'German',
  'Japanese',
  'Chinese (Mandarin)',
  'Russian'
];

const Translator: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Hindi');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    setTranslatedText('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Translate the following text from ${sourceLang} to ${targetLang}. Ensure the translation is accurate, natural, and preserves the original tone. If the source text contains technical terms, keep them appropriate for the target audience. Only return the translated text.\n\nText: "${sourceText}"`,
      });

      if (response.text) {
        setTranslatedText(response.text);
      }
    } catch (error) {
      console.error(error);
      setTranslatedText('Error: Could not translate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <span className="bg-primary/10 text-primary p-2 rounded-xl">🌐</span>
            AI Language Translator
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">Translate text instantly between Indian and Global languages.</p>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        
        {/* Controls Toolbar */}
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <select 
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="flex-1 md:w-48 p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                >
                    {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>

                <button 
                    onClick={swapLanguages}
                    className="p-2.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-zinc-600 dark:text-zinc-300 shadow-sm"
                    title="Swap Languages"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                </button>

                <select 
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="flex-1 md:w-48 p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                >
                    {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
            </div>
            
            <button
                onClick={handleTranslate}
                disabled={loading || !sourceText}
                className={`w-full md:w-auto px-8 py-2.5 rounded-lg font-bold text-white shadow-lg transition-transform active:scale-95 ${
                    loading || !sourceText 
                    ? 'bg-zinc-400 cursor-not-allowed' 
                    : 'bg-primary hover:bg-primary-hover'
                }`}
            >
                {loading ? 'Translating...' : 'Translate'}
            </button>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800 min-h-[400px]">
            {/* Source Input */}
            <div className="p-6 flex flex-col relative">
                <textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder="Enter text here..."
                    className="w-full h-full bg-transparent border-none resize-none focus:ring-0 text-lg text-zinc-800 dark:text-zinc-200 placeholder-zinc-400"
                    spellCheck="false"
                ></textarea>
                {sourceText && (
                    <button 
                        onClick={() => setSourceText('')}
                        className="absolute top-4 right-4 text-zinc-400 hover:text-red-500"
                    >
                        ✕
                    </button>
                )}
                <div className="mt-auto pt-4 text-xs text-zinc-400 flex justify-end">
                    {sourceText.length} chars
                </div>
            </div>

            {/* Target Output */}
            <div className="p-6 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col relative">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm z-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : null}
                
                <div className="w-full h-full text-lg text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
                    {translatedText || <span className="text-zinc-400 italic">Translation will appear here...</span>}
                </div>

                {translatedText && (
                    <div className="mt-auto pt-4 flex justify-end">
                         <button 
                            onClick={() => copyToClipboard(translatedText)}
                            className="text-zinc-500 hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors"
                         >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                         </button>
                    </div>
                )}
            </div>
        </div>
      </div>

      <div className="mt-12">
        <AdUnit slotId="translator-bottom" format="auto" />
      </div>
    </div>
  );
};

export default Translator;