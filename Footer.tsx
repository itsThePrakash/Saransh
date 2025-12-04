import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '@/constants';

const Footer: React.FC = () => {
  // Dynamically split categories for a scalable footer
  const contentCategories = NAV_ITEMS.filter(item => item.path.startsWith('/category/') || item.path === '/finance');
  const midPoint = Math.ceil(contentCategories.length / 2);
  const firstColumnCategories = contentCategories.slice(0, midPoint);
  const secondColumnCategories = contentCategories.slice(midPoint);

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 mt-20 border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            
            {/* Brand Column */}
            <div className="space-y-4 lg:col-span-1">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">S</div>
                    <span className="text-2xl font-bold text-white">Saransh</span>
                </Link>
                <p className="text-slate-400 text-sm leading-relaxed">
                    The essence of news, finance, and lifestyle. We simplify complexity to help you make better decisions every day.
                </p>
            </div>

            {/* Categories Column 1 */}
            <div>
                <h4 className="text-white font-bold mb-4">Categories</h4>
                <ul className="space-y-2 text-sm">
                    {firstColumnCategories.map(item => (
                        <li key={item.path}>
                            <Link to={item.path} className="hover:text-primary-400 transition-colors">{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Categories Column 2 */}
            <div>
                <h4 className="text-white font-bold mb-4">More Categories</h4>
                <ul className="space-y-2 text-sm">
                    {secondColumnCategories.map(item => (
                        <li key={item.path}>
                            <Link to={item.path} className="hover:text-primary-400 transition-colors">{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tools & Resources */}
            <div>
                <h4 className="text-white font-bold mb-4">Tools</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link to="/finance" className="hover:text-primary-400 transition-colors">SIP Calculator</Link></li>
                    <li><Link to="/translator" className="hover:text-primary-400 transition-colors">AI Translator</Link></li>
                    <li><Link to="/horoscope" className="hover:text-primary-400 transition-colors">Daily Horoscope</Link></li>
                    <li><Link to="/ai-summary" className="hover:text-primary-400 transition-colors">AI Summary</Link></li>
                    <li><Link to="/games" className="hover:text-primary-400 transition-colors">Games Zone</Link></li>
                </ul>
            </div>

            {/* Legal */}
            <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
                    <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
                    <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                    <li><Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
                    <li><Link to="/login" className="hover:text-primary-400 transition-colors">Admin Login</Link></li>
                </ul>
            </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} Saransh Media. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                <span className="hover:text-white cursor-pointer">Twitter</span>
                <span className="hover:text-white cursor-pointer">Instagram</span>
                <span className="hover:text-white cursor-pointer">LinkedIn</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;