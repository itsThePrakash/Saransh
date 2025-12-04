import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_ARTICLES, SITE_STRUCTURE } from '@/constants';
import ArticleCard from '@/components/ArticleCard';
import AdUnit from '@/components/AdUnit';

const PAGE_SIZE = 9;

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [activeSubCat, setActiveSubCat] = useState<string | 'All'>('All');
  const [displayedArticles, setDisplayedArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  // Get subcategories for the current main category
  const subCategories = categoryName && SITE_STRUCTURE[categoryName.toLowerCase()] 
    ? ['All', ...SITE_STRUCTURE[categoryName.toLowerCase()]] 
    : ['All'];

  useEffect(() => {
    // Reset state when main category changes
    setActiveSubCat('All');
    setPage(1);
    filterAndPaginate('All', 1);
  }, [categoryName]);

  useEffect(() => {
    // Re-filter when sub-category changes
    setPage(1);
    filterAndPaginate(activeSubCat, 1);
  }, [activeSubCat]);

  const filterAndPaginate = (subCat: string, pageNum: number) => {
    let filtered = MOCK_ARTICLES.filter(
      a => a.category.toLowerCase() === categoryName?.toLowerCase()
    );

    if (subCat !== 'All') {
      // @ts-ignore - we added subCategory to the mock objects
      filtered = filtered.filter(a => a.subCategory === subCat);
    }

    setDisplayedArticles(filtered.slice(0, pageNum * PAGE_SIZE));
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    
    // Recalculate full list to slice correctly
    let filtered = MOCK_ARTICLES.filter(
        a => a.category.toLowerCase() === categoryName?.toLowerCase()
      );
  
      if (activeSubCat !== 'All') {
        // @ts-ignore
        filtered = filtered.filter(a => a.subCategory === activeSubCat);
      }

      setDisplayedArticles(filtered.slice(0, nextPage * PAGE_SIZE));
  };

  // Get total count for current filter to decide if button shows
  const getTotalCount = () => {
    let filtered = MOCK_ARTICLES.filter(
        a => a.category.toLowerCase() === categoryName?.toLowerCase()
    );
    if (activeSubCat !== 'All') {
         // @ts-ignore
        filtered = filtered.filter(a => a.subCategory === activeSubCat);
    }
    return filtered.length;
  }

  const hasMore = displayedArticles.length < getTotalCount();
  const displayTitle = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'Category';

  return (
    <div className="animate-fade-in">
       {/* Header Section */}
       <div className="bg-white dark:bg-dark-card p-8 rounded-2xl mb-8 shadow-sm border-l-8 border-primary relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{displayTitle} Hub</h1>
            <p className="opacity-75 text-gray-600 dark:text-gray-300">
                Explore the essence of {displayTitle}. {getTotalCount()} articles available.
            </p>
          </div>
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
       </div>

       {/* Sub-Category Filter Chips */}
       <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
         <div className="flex space-x-3 min-w-max px-1">
           {subCategories.map((sub) => (
             <button
                key={sub}
                onClick={() => setActiveSubCat(sub)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeSubCat === sub 
                    ? 'bg-primary border-primary text-white shadow-md transform scale-105' 
                    : 'bg-white dark:bg-dark-card border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
             >
               {sub}
             </button>
           ))}
         </div>
       </div>

       <AdUnit slotId={`category-${categoryName}-top`} />

       {displayedArticles.length > 0 ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
            </div>

            {hasMore && (
                <div className="mt-12 text-center">
                    <button 
                        onClick={loadMore}
                        className="bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        Load More Stories
                    </button>
                </div>
            )}
        </>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-dark-card rounded-xl">
            <h2 className="text-2xl font-bold text-gray-400">No articles found.</h2>
            <p className="mt-2 text-gray-500">Try selecting a different filter.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;