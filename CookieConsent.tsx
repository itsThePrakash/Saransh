import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('saransh_cookie_consent');
    if (!consent) {
      // Use a timeout to avoid layout shift on load and give user a moment to see the page
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('saransh_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[60] p-4 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="max-w-4xl mx-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg p-5 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-zinc-800 dark:text-zinc-200 text-center sm:text-left">
          <p>
            <span className="font-bold">🍪 Your Privacy Matters.</span> We use cookies to personalize content and ads, to provide social media features and to analyse our traffic. By clicking "Accept", you consent to our use of cookies. Learn more in our{' '}
            <Link to="/privacy" className="font-semibold text-primary hover:underline">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <button
          onClick={handleAccept}
          className="bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-8 rounded-lg whitespace-nowrap transition-colors shadow-md w-full sm:w-auto"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;