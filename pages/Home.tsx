import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MOCK_ARTICLES } from '@/constants';
import ArticleCard from '@/components/ArticleCard';
import AdUnit from '@/components/AdUnit';
import WeatherWidget from '@/components/WeatherWidget';
import SEO from '@/components/SEO';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const [filteredArticles, setFilteredArticles] = useState(MOCK_ARTICLES);

  useEffect(() => {
    if (searchQuery) {
      const results = MOCK_ARTICLES.filter(
        article => 
          article.title.toLowerCase().includes(searchQuery) || 
          article.excerpt.toLowerCase().includes(searchQuery) ||
          article.category.toLowerCase().includes(searchQuery)
      );
      setFilteredArticles(results);
    } else {
      setFilteredArticles(MOCK_ARTICLES);
    }
  }, [searchQuery]);

  // Slicing data for the Bento Grid
  const heroArticle = filteredArticles[0];
  const subFeatured = filteredArticles.slice(1, 3);
  const trending = filteredArticles.slice(3, 6);
  const feed = filteredArticles.slice(6, 15);

  return (
    <div className="animate-fade-in pb-12 space-y-12">
      
      {/* Home Page SEO */}
      <SEO 
        title="Home"
        description="Saransh - The essence of news, finance, and lifestyle. Read simplified articles tailored for the modern Indian audience. Features AI summary, games, and tools."
        keywords="news india, finance, lifestyle, games, ai tools, saransh"
      />

      {/* 1. HERO BENTO GRID (Only visible if not searching) */}
      {!searchQuery && filteredArticles.length > 0 && (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-4 h-auto md:h-[600px]">
                
                {/* A. Large Hero Card (2x2) */}
                <div className="md:col-span-2 md:row-span-2 h-[400px] md:h-full">
                    <ArticleCard article={heroArticle} featured={true} />
                </div>

                {/* B. Weather Widget (1x1) */}
                <div className="md:col-span-1 md:row-span-1">
                    <WeatherWidget />
                </div>

                {/* C. Sub Feature 1 (1x1) */}
                <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-2xl cursor-pointer">
                     <Link to={`/article/${subFeatured[0].id}`} className="block h-full w-full">
                        <img src={subFeatured[0].imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                            <h3 className="text-white font-bold text-sm leading-snug line-clamp-2">{subFeatured[0].title}</h3>
                        </div>
                     </Link>
                </div>

                {/* D. AI Tool Promo (Custom Slot) */}
                <div className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-xl"></div>
                     <div>
                        <span className="text-xs font-bold uppercase tracking-wider opacity-75">New Feature</span>
                        <h3 className="text-xl font-bold mt-1">AI Essence Generator</h3>
                     </div>
                     <p className="text-sm opacity-90">Summarize long articles in seconds.</p>
                     <Link to="/ai-summary" className="mt-2 inline-block bg-white/20 hover:bg-white/30 backdrop-blur-md py-2 px-4 rounded-lg text-sm font-bold transition-colors text-center">
                        Try Now
                     </Link>
                </div>

                {/* E. Sub Feature 2 (1x1) */}
                <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-2xl cursor-pointer">
                     <Link to={`/article/${subFeatured[1].id}`} className="block h-full w-full">
                        <img src={subFeatured[1].imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                            <h3 className="text-white font-bold text-sm leading-snug line-clamp-2">{subFeatured[1].title}</h3>
                        </div>
                     </Link>
                </div>
            </div>
        </section>
      )}

      {/* 2. LEADERBOARD AD */}
      <AdUnit slotId="home-leaderboard" label="Sponsored" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* 3. MAIN FEED (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                    {searchQuery ? `Search Results` : 'Latest Stories'}
                </h2>
                {!searchQuery && (
                    <Link to="/category/news" className="text-sm font-semibold text-primary hover:text-primary-hover">
                        View All News →
                    </Link>
                )}
            </div>

            {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(searchQuery ? filteredArticles : feed).map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
                    <div className="text-4xl mb-4 opacity-50">🔍</div>
                    <h3 className="text-lg font-bold">No results found</h3>
                    <p className="text-zinc-500 text-sm">Try adjusting your search query.</p>
                </div>
            )}
            
            <div className="pt-4">
                 <button className="w-full py-3 bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm text-sm">
                    Load More Stories
                 </button>
            </div>
        </div>

        {/* 4. RIGHT SIDEBAR (4 Cols - Sticky) */}
        <aside className="lg:col-span-4 space-y-8">
            {/* Trending Mini-List */}
            <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-red-500">⚡</span> Trending Now
                </h3>
                <div className="space-y-4">
                    {trending.map((article, index) => (
                        <Link key={article.id} to={`/article/${article.id}`} className="flex gap-4 group">
                            <span className="text-2xl font-bold text-zinc-200 dark:text-zinc-700 font-mono">0{index + 1}</span>
                            <div>
                                <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h4>
                                <p className="text-xs text-zinc-500 mt-1">{article.category}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <AdUnit slotId="sidebar-sticky-1" format="rectangle" />
            
            {/* Category Cloud */}
            <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-4">Explore</h3>
                <div className="flex flex-wrap gap-2">
                    {['Markets', 'EVs', 'Exams', 'Health Tips', 'IPL', 'Elections', 'AI', 'Travel', 'Recipes', 'Bollywood', 'Startups', 'Web Series'].map(tag => (
                    <Link to={`/?search=${tag}`} key={tag} className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold rounded-lg text-zinc-600 dark:text-zinc-300 cursor-pointer hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all">
                        #{tag}
                    </Link>
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-zinc-900 dark:bg-zinc-800 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <h3 className="font-bold text-lg mb-2 relative z-10">Morning Essence</h3>
                <p className="text-xs text-zinc-400 mb-4 relative z-10">Daily news summary delivered to you.</p>
                <div className="flex gap-2 relative z-10">
                    <input type="email" placeholder="Email" className="w-full px-3 py-2 rounded-lg text-zinc-900 text-xs focus:outline-none" />
                    <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-lg text-xs font-bold transition-colors">Join</button>
                </div>
            </div>
        </aside>

      </div>
    </div>
  );
};

export default Home;