import React, { useState, useEffect } from 'react';
import { Article } from '@/types';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  const [isSaved, setIsSaved] = useState(false);

  // Check if article is already saved on mount
  useEffect(() => {
    const saved = localStorage.getItem('saved_articles');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.includes(article.id)) {
        setIsSaved(true);
      }
    }
  }, [article.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const saved = localStorage.getItem('saved_articles');
    let parsed: string[] = saved ? JSON.parse(saved) : [];

    if (isSaved) {
      parsed = parsed.filter(id => id !== article.id);
    } else {
      parsed.push(article.id);
    }

    localStorage.setItem('saved_articles', JSON.stringify(parsed));
    setIsSaved(!isSaved);
  };

  if (featured) {
    return (
        <Link to={`/article/${article.id}`} className="group block h-full relative">
            <article className="relative h-full w-full overflow-hidden rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-800">
                <div className="absolute inset-0 bg-zinc-900">
                    <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                    />
                </div>
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                
                {/* Save Button */}
                <button 
                  onClick={toggleSave}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all z-20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>

                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-3/4">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-white uppercase bg-primary rounded-full shadow-md">
                        {article.category}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4 drop-shadow-md group-hover:text-blue-200 transition-colors">
                        {article.title}
                    </h2>
                    <p className="text-zinc-200 text-base md:text-lg line-clamp-2 mb-4 font-medium drop-shadow-sm hidden md:block">
                        {article.excerpt}
                    </p>
                    <div className="flex items-center text-zinc-300 text-xs md:text-sm font-semibold">
                        <span>{article.author}</span>
                        <span className="mx-2">•</span>
                        <span>{article.date}</span>
                    </div>
                </div>
            </article>
        </Link>
    )
  }

  return (
    <Link to={`/article/${article.id}`} className="block h-full group">
      <article className="bg-white dark:bg-dark-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-out flex flex-col h-full border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:-translate-y-1 relative">
        
        {/* Save Button Absolute */}
        <button 
          onClick={toggleSave}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary z-10 shadow-sm transition-colors"
          title={isSaved ? "Remove from saved" : "Save for later"}
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
           </svg>
        </button>

        <div className="h-48 overflow-hidden relative">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3">
             <span className="bg-white/95 dark:bg-black/80 backdrop-blur-md text-zinc-900 dark:text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wide">
                {article.category}
             </span>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-3 text-zinc-900 dark:text-zinc-50 leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 flex-grow line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-500 font-medium">{article.date}</span>
            <span className="text-primary text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                Read 
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;