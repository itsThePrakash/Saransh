import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import AdUnit from '@/components/AdUnit';

const AISummary: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError('');
    setSummary('');

    try {
      // Initialize Gemini API
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are Saransh, an intelligent assistant. Please provide a concise, easy-to-understand summary (the "essence") of the following text. Use bullet points for key takeaways:\n\n${inputText}`,
      });

      if (response.text) {
        setSummary(response.text);
      }
    } catch (err) {
      setError('Failed to generate summary. Please check your connection and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-lg mb-8 shadow-lg text-center">
        <h1 className="text-4xl font-bold">AI Essence Generator</h1>
        <p className="mt-2 opacity-90">Get the "Saransh" (Essence) of any text in seconds using Gemini</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
            <label className="block text-sm font-bold mb-2 text-zinc-700 dark:text-zinc-300">
              Paste your text here
            </label>
            <textarea
              className="w-full h-48 p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors resize-none placeholder-zinc-400"
              placeholder="Paste an article, report, or long message here to get the summary..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSummarize}
                disabled={loading || !inputText.trim()}
                className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
                  loading || !inputText.trim()
                    ? 'bg-zinc-400 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-hover shadow-md hover:shadow-lg'
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : 'Get Essence'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm border border-red-100 dark:border-red-800">
              {error}
            </div>
          )}

          {summary && (
            <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-lg border-l-4 border-primary animate-fade-in ring-1 ring-zinc-200 dark:ring-zinc-800">
              <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                The Saransh (Essence)
              </h3>
              <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 whitespace-pre-line leading-relaxed">
                {summary}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
             <h4 className="font-bold text-zinc-500 text-sm uppercase mb-4">Sponsored</h4>
             <AdUnit slotId="ai-sidebar" format="rectangle" />
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Pro Tip
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-200">
              You can paste entire news articles, financial reports, or even long emails here to understand them quickly.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AISummary;