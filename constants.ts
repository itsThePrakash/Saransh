import { Article, NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  // Categories
  { label: 'News', path: '/category/news' },
  { label: 'Finance', path: '/finance' }, // Special Custom Page
  { label: 'Tech', path: '/category/technology' },
  { label: 'Lifestyle', path: '/category/lifestyle' },
  { label: 'Travel', path: '/category/travel' },
  { label: 'Career', path: '/category/career' },
  { label: 'Education', path: '/category/education' },
  { label: 'Automobile', path: '/category/automobile' },
  { label: 'Health', path: '/category/health' },
  { label: 'Entertainment', path: '/category/entertainment' },
  // Tools & Features
  { label: 'Games', path: '/games' }, 
  { label: 'AI Summary', path: '/ai-summary' },
  { label: 'Translator', path: '/translator' },
  { label: 'Horoscope', path: '/horoscope' },
];

export const ZODIAC_SIGNS = [
  { name: 'Aries', date: 'Mar 21 - Apr 19', icon: '♈' },
  { name: 'Taurus', date: 'Apr 20 - May 20', icon: '♉' },
  { name: 'Gemini', date: 'May 21 - Jun 20', icon: '♊' },
  { name: 'Cancer', date: 'Jun 21 - Jul 22', icon: '♋' },
  { name: 'Leo', date: 'Jul 23 - Aug 22', icon: '♌' },
  { name: 'Virgo', date: 'Aug 23 - Sep 22', icon: '♍' },
  { name: 'Libra', date: 'Sep 23 - Oct 22', icon: '♎' },
  { name: 'Scorpio', date: 'Oct 23 - Nov 21', icon: '♏' },
  { name: 'Sagittarius', date: 'Nov 22 - Dec 21', icon: '♐' },
  { name: 'Capricorn', date: 'Dec 22 - Jan 19', icon: '♑' },
  { name: 'Aquarius', date: 'Jan 20 - Feb 18', icon: '♒' },
  { name: 'Pisces', date: 'Feb 19 - Mar 20', icon: '♓' },
];

// --- HIERARCHY DEFINITION ---
export const SITE_STRUCTURE: Record<string, string[]> = {
  'news': [
    'Top Stories', 'Government Schemes', 'Economy Explained', 'Science & Environment', 'World News', 'Politics'
  ],
  'finance': [
    'Savings Schemes', 'Investing 101', 'Tax Planning', 'Banking & Loans', 'Budgeting', 'Crypto'
  ],
  'technology': [
    'Mobiles & Gadgets', 'Computers & Laptops', 'Apps & Software', 'Future Tech (AI)', 'How-To Guides', '5G & Telecom'
  ],
  'lifestyle': [
    'Health & Wellness', 'Food & Recipes', 'Indian Festivals', 'Entertainment', 'Home & Garden', 'Fashion'
  ],
  'travel': [
    'Weekend Getaways', 'Destination Guides', 'State-Specific', 'Spiritual Journeys', 'Travel Tips', 'Food Travel'
  ],
  'career': [
    'Job Search', 'Skill Development', 'Government Jobs', 'Higher Education', 'Entrepreneurship', 'Study Abroad'
  ],
  'education': [
    'Exam Prep', 'Courses & Certifications', 'Study Abroad', 'Skill Development', 'EdTech News', 'Career Guidance'
  ],
  'automobile': [
    'New Car Launches', 'Electric Vehicles (EVs)', 'Bike Reviews', 'Car Maintenance', 'Driving Tips', 'Auto News'
  ],
  'health': [
    'Fitness & Exercise', 'Mental Wellness', 'Nutrition & Diet', 'Home Remedies', 'Disease Awareness', 'Health News'
  ],
  'entertainment': [
    'Bollywood Gossip', 'Movie Reviews', 'Web Series', 'TV Shows', 'Music & Concerts', 'Celebrity Lifestyle'
  ]
};

// --- CONTENT GENERATION ---
const TITLES_TEMPLATES = [
  "The Ultimate Guide to {sub}",
  "Top 10 Trends in {sub} for 2025",
  "How {sub} is Impacting India",
  "Beginner's Tips for {sub}",
  "Breaking: Major Update in {sub}",
  "Why You Should Care About {sub}",
  "Expert Advice on {sub}",
  "The Hidden Truth About {sub}",
  "Saving Money with {sub}",
  "The Future of {sub} Explained",
  "Is {sub} the Next Big Thing in India?",
  "{sub}: Asli Sach Kya Hai?",
  "A Simple Guide to {sub} for Desi Families",
  "Don't Miss This! All About {sub}",
  "{sub} Explained in Simple Hindi",
  "The Jugaad Way to Master {sub}",
  "Your Perfect {sub} Checklist",
  "What Sharma Ji Didn't Tell You About {sub}"
];

const EXCERPT_TEMPLATES = [
  "Read the latest insights about {sub}. We cover everything you need to know about {main} and {sub} in this comprehensive guide tailored for our Indian audience.",
  "Confused about {sub}? Here is a simple, no-nonsense breakdown of what is happening in the world of {main} right now.",
  "From expert opinions to ground realities, explore how {sub} is changing the game in India this year.",
  "Don't miss out on this essential update regarding {sub}. Perfect for beginners and experts alike.",
  "A quick, deep dive into {sub}. Discover the facts that mainstream media often misses out on.",
  "Chalo, let's understand {sub} together. We've simplified it so everyone can be an expert.",
  "Is all the buzz about {sub} confusing you? We break down the facts, Saransh style.",
  "Get the complete picture on {sub}. Your one-stop guide for everything related to {main} in India."
];

const generateArticles = (): Article[] => {
  const articles: Article[] = [];
  let idCounter = 1;

  // 1. Generate High-Quality Mock Data ensuring every sub-category has content
  Object.entries(SITE_STRUCTURE).forEach(([mainCat, subCats]) => {
    subCats.forEach(subCat => {
      // Create ~84 articles per sub-category to get ~500 per main category
      for(let i = 0; i < 84; i++) {
        const template = TITLES_TEMPLATES[Math.floor(Math.random() * TITLES_TEMPLATES.length)];
        const title = template.replace('{sub}', subCat);
        
        const excerptTemp = EXCERPT_TEMPLATES[Math.floor(Math.random() * EXCERPT_TEMPLATES.length)];
        const excerpt = excerptTemp.replace('{sub}', subCat).replace('{main}', mainCat);

        articles.push({
          id: `art-${idCounter++}`,
          title: title,
          excerpt: excerpt,
          category: mainCat, // This helps main routing
          subCategory: subCat, // This helps filtering
          imageUrl: `https://picsum.photos/800/400?random=${idCounter}`,
          date: `August ${Math.floor(Math.random() * 30) + 1}, 2025`,
          author: 'Saransh Team'
        } as Article & { subCategory: string }); // extending type locally for generation
      }
    });
  });

  // Shuffle the array so the home page looks dynamic
  return articles.sort(() => Math.random() - 0.5);
};

export const MOCK_ARTICLES = generateArticles();