import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_ARTICLES } from '@/constants';
import AdUnit from '@/components/AdUnit';
import SEO from '@/components/SEO';
import { Article } from '@/types';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [generatedContent, setGeneratedContent] = useState<{id: string, title: string, body: string[]}[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    const found = MOCK_ARTICLES.find(a => a.id === id);
    setArticle(found);
    if (found) {
        generateHumanizedContent(found);
    }
  }, [id]);

  // --- SMOOTH SCROLL HANDLER ---
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault(); // Stop default anchor jump
    const element = document.getElementById(sectionId);
    if (element) {
        // Smooth scroll to the element
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL hash for sharing without reloading
        window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  // --- GEMINI AI "HUMANIZER" CONTENT ENGINE ---
  const generateHumanizedContent = async (art: Article) => {
    setLoadingContent(true);
    setGeneratedContent([]); // Clear previous content

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // System instruction to ensure "human-like" writing
        const systemInstruction = `You are a friendly, knowledgeable Indian journalist writing for a popular blog 'Saransh'.
        Your Goal: Write content that is 100% indistinguishable from a human writer. The content must be very detailed, insightful, and comprehensive.
        Style Guide:
        - Use a conversational, storytelling tone. Imagine you're explaining this to a friend over chai.
        - Use "Hinglish" flavor (e.g., "Asli sach", "Jugaad", "Chalo", "Samjho", "Maska hai") naturally and where appropriate.
        - Vary sentence length significantly (burstiness). Mix very short, punchy sentences with longer, more descriptive ones to create a natural rhythm.
        - Use relatable Indian analogies (e.g., comparing a market trend to a cricket match, or a political situation to a Bollywood movie plot).
        - Use idioms, rhetorical questions, and personal-sounding anecdotes (e.g., "My neighbor Sharma ji always says...").
        - Avoid robotic transitions like "Furthermore", "In conclusion", "Additionally". Use natural segues like "Here's the kicker...", "But wait, there's more...", "Toh, iska matlab kya hai?", "To wrap it up...".
        - Be opinionated and empathetic. Show you understand the reader's concerns.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Write a very detailed, structured blog post about "${art.title}" (Category: ${art.category}).
            The total word count should be between 2000 and 2500 words.
            Create 10-12 distinct, detailed chapters/headings.
            The content must be engaging, deeply researched, and feel personal and authentic.`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING, description: "A catchy, non-generic section heading" },
                            body: { 
                                type: Type.ARRAY, 
                                items: { type: Type.STRING },
                                description: "Array of paragraphs. Each chapter should have 3-5 paragraphs, and each paragraph should be 4-6 sentences long to ensure detailed content and a high word count."
                            }
                        },
                        required: ["title", "body"]
                    }
                }
            }
        });

        if (response.text) {
            const parsedData = JSON.parse(response.text);
            const formattedContent = parsedData.map((chapter: any, index: number) => ({
                id: `chapter-${index}`,
                title: chapter.title,
                body: chapter.body
            }));
            setGeneratedContent(formattedContent);
        } else {
            throw new Error("No text returned");
        }

    } catch (error) {
        console.error("AI Generation failed, falling back to static", error);
        // Fallback to static generator if AI fails/limits reached
        generateStaticFallback(art);
    } finally {
        setLoadingContent(false);
    }
  };

  // Fallback for offline or error states - Improved to be less robotic than before
  const generateStaticFallback = (art: Article) => {
    const chapters = [];
    const titles = [
        "The Real Story Behind This", 
        "Why This Matters to You, Right Now", 
        "A Desi Perspective: What Sharmaji Won't Tell You", 
        "Breaking it Down: The Good, The Bad, The Ugly", 
        "Expert Advice for the Common Man", 
        "Future Predictions: What to Expect Next?",
        "Hidden Details You Might Have Missed",
        "A Step-by-Step Guide for Beginners",
        "How This Compares to Global Trends",
        "Final Thoughts: The Saransh of the Matter"
    ];
    
    for(let i=0; i<titles.length; i++) {
        chapters.push({
            id: `chapter-${i}`,
            title: titles[i],
            body: [
                `Chalo, let's be honest, we all want to know the real story about ${art.title}. In India, things often have more layers than a good biryani, and that's what we need to uncover. It's not just about the headlines; it's about what it means for our daily lives.`,
                `Whether you are in a bustling metro city like Mumbai or a quiet town in Kerala, this topic affects your wallet, your family, and your future more than you might think. This isn't just news; it's a conversation we all need to be a part of.`,
                `Just like a good cup of masala chai, this topic requires the right mix of patience, understanding, and a little bit of 'masala' to get the full picture. We're here to provide that perspective, cutting through the jargon and getting to the heart of the matter.`,
                `This fallback content is generated when the AI service is unavailable. It provides a structured, readable article to ensure the user still has a good experience on the site, maintaining the layout and flow.`
            ]
        });
    }
    setGeneratedContent(chapters);
  };

  if (!article) {
    return <div className="text-center py-20 text-zinc-500">Article not found</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in relative">
      
      {/* Inject Dynamic Meta Tags */}
      <SEO 
        title={article.title}
        description={article.excerpt}
        image={article.imageUrl}
        type="article"
        keywords={`${article.category}, news, india, saransh`}
      />

      {/* LEFT SIDEBAR: TOC (Desktop) */}
      <aside className="hidden xl:block w-64 shrink-0">
         <div className="sticky top-24 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
            <h4 className="font-bold text-zinc-900 dark:text-white mb-4 uppercase text-xs tracking-wider">Table of Contents</h4>
            {generatedContent.length > 0 ? (
                <nav className="space-y-1 border-l-2 border-zinc-100 dark:border-zinc-800">
                    {generatedContent.map((chapter) => (
                        <a 
                            key={chapter.id} 
                            href={`#${chapter.id}`}
                            onClick={(e) => scrollToSection(e, chapter.id)}
                            className="block pl-4 py-1.5 text-xs text-zinc-500 hover:text-primary hover:border-l-2 hover:border-primary -ml-0.5 transition-all line-clamp-1 cursor-pointer"
                        >
                            {chapter.title}
                        </a>
                    ))}
                </nav>
            ) : (
                <div className="space-y-2 animate-pulse">
                    {[...Array(8)].map((_, i) => <div key={i} className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>)}
                </div>
            )}
            
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
                <p className="text-xs text-blue-800 dark:text-blue-300 font-semibold">
                   🇮🇳 100% Desi Guide. Written with heart, not just code.
                </p>
            </div>
         </div>
      </aside>

      {/* CENTER: Main Content Area */}
      <div className="flex-grow min-w-0">
        <article className="bg-white dark:bg-dark-card p-6 md:p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <header className="mb-10">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-4">
                {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-zinc-900 dark:text-white leading-tight">
                {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium border-b border-zinc-100 dark:border-zinc-800 pb-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-xs">
                        ST
                    </div>
                    <span>By {article.author}</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                <span className="text-primary flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    10-12 min read
                </span>
            </div>
          </header>

          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-10 shadow-md"
          />

          {/* Ad inside content */}
          <AdUnit slotId="article-top-content" format="auto" />

          {/* Excerpt */}
          <div className="text-xl md:text-2xl font-serif leading-relaxed text-zinc-900 dark:text-zinc-100 mb-10 border-l-4 border-primary pl-6 py-2 italic">
            "{article.excerpt}"
          </div>

          {/* --- IN-ARTICLE TABLE OF CONTENTS (INDEX TABLE) --- */}
          {generatedContent.length > 0 && (
            <div className="mb-12 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 border-b border-zinc-200 dark:border-zinc-700 pb-2">
                    📖 In This Guide (Index)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {generatedContent.map((chapter, i) => (
                        <a 
                            key={chapter.id} 
                            href={`#${chapter.id}`}
                            onClick={(e) => scrollToSection(e, chapter.id)}
                            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors flex gap-2 items-start group cursor-pointer p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            <span className="text-zinc-400 group-hover:text-primary font-mono text-xs mt-0.5">{i+1}.</span>
                            <span className="group-hover:underline decoration-1 underline-offset-2">{chapter.title}</span>
                        </a>
                    ))}
                </div>
            </div>
          )}

          {/* GENERATED CONTENT LOOP */}
          <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif">
            {loadingContent ? (
                <div className="space-y-8 py-10">
                    <div className="flex items-center gap-3 text-primary animate-pulse mb-6">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="font-bold">Crafting a unique, in-depth story just for you...</span>
                    </div>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <div className="h-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg w-1/3 animate-pulse"></div>
                            <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full animate-pulse"></div>
                            <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full animate-pulse"></div>
                            <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-5/6 animate-pulse"></div>
                        </div>
                    ))}
                </div>
            ) : (
                generatedContent.map((chapter, index) => (
                    <section key={chapter.id} id={chapter.id} className="mb-12 scroll-mt-28">
                        <h2 className="text-2xl md:text-3xl font-sans font-bold text-zinc-900 dark:text-white mb-6 mt-8 flex items-center gap-3">
                            <span className="text-primary/20 text-4xl font-black -mt-2">#{index + 1}</span>
                            {chapter.title}
                        </h2>
                        
                        {chapter.body.map((para, pIndex) => (
                            <p key={pIndex} className="mb-6 opacity-90">
                                {para}
                            </p>
                        ))}

                        {/* Inject Ads every 3 chapters */}
                        {(index > 0 && (index + 1) % 3 === 0) && (
                            <div className="my-10">
                                <AdUnit slotId={`in-article-ad-${index}`} format="fluid" />
                            </div>
                        )}

                        {/* Inject 'Desi Quote' block randomly */}
                        {index === 4 && (
                            <blockquote className="p-6 my-8 bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 text-zinc-800 dark:text-zinc-200 rounded-r-lg shadow-sm">
                                <p className="font-bold text-lg not-italic mb-2">💡 Saransh Insight:</p>
                                "Information is useful only when you act on it. Or as my grandmother used to say, 'Gyaan baatne se badhta hai' (Knowledge grows when shared). Share this with someone who needs it!"
                            </blockquote>
                        )}
                    </section>
                ))
            )}
          </div>
        </article>

        <AdUnit slotId="article-bottom-content" />
      </div>

      {/* RIGHT SIDEBAR (Sticky) */}
      <aside className="w-full lg:w-80 shrink-0 space-y-8">
        <div className="sticky top-24 space-y-8">
            <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-zinc-400 text-[10px] uppercase tracking-wider mb-4 text-center">Sponsored</h4>
                <AdUnit slotId="sidebar-sticky" format="rectangle" label="" />
            </div>

            <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-bold text-lg mb-4 text-zinc-900 dark:text-white flex items-center gap-2">
                    <span className="text-primary">●</span> Read Next
                </h3>
                <ul className="space-y-4">
                    {MOCK_ARTICLES.slice(0, 5).map(a => (
                        <li key={a.id}>
                            <Link to={`/article/${a.id}`} className="flex gap-3 group">
                                <img src={a.imageUrl} className="w-16 h-16 rounded-lg object-cover" alt="" />
                                <div>
                                    <h5 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 line-clamp-2 group-hover:text-primary transition-colors">{a.title}</h5>
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase mt-1 block">{a.category}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </aside>
    </div>
  );
};

export default ArticleDetail;