import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

export const About: React.FC = () => (
  <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 animate-fade-in">
    <SEO 
        title="About Us" 
        description="Learn about Saransh, our mission to simplify complex information, and our commitment to using AI and human insight to deliver the essence of everything."
    />
    <div className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">About Saransh</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">The Essence of Everything, Simplified for You.</p>
    </div>
    
    <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif">
        <p>
          Welcome to <strong>Saransh (सारांश)</strong>, your trusted digital companion in a world overflowing with information. In Hindi, "Saransh" means the essence, summary, or substance of something. That single word is our guiding philosophy.
        </p>

        <h2 className="font-sans font-bold text-zinc-900 dark:text-white">Our Mission</h2>
        <p>
          Our mission is to cut through the noise. We believe that knowledge empowers, but only when it's clear, accessible, and easy to digest. We strive to provide the 'Saransh' of every important topic—from complex financial news and fast-moving technology to lifestyle trends and cultural insights—all tailored for a curious, modern Indian audience.
        </p>

        <blockquote className="border-l-4 border-primary pl-6 italic">
          "We don't just report the news; we distill its essence, so you can make informed decisions and live a smarter life."
        </blockquote>

        <h2 className="font-sans font-bold text-zinc-900 dark:text-white">Our Approach: AI + Human Insight</h2>
        <p>
          We leverage the power of cutting-edge AI, like Google's Gemini, to analyze vast amounts of data and generate insightful, structured content. But technology is only half the story. Our dedicated team of writers and editors adds the crucial human touch, ensuring every article is not just accurate and informative, but also engaging, relatable, and culturally relevant. It's the perfect blend of machine intelligence and human wisdom.
        </p>
        
        <h2 className="font-sans font-bold text-zinc-900 dark:text-white">Our Promise</h2>
        <ul>
          <li><strong>Clarity:</strong> We simplify complex subjects without dumbing them down.</li>
          <li><strong>Relevance:</strong> We focus on topics that matter to you, right now.</li>
          <li><strong>Trust:</strong> We are committed to accuracy and transparency in all our content.</li>
        </ul>
        <p>
          Thank you for being a part of the Saransh community. Let's explore the essence of everything, together.
        </p>
    </div>
  </div>
);

export const Privacy: React.FC = () => (
  <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 animate-fade-in">
    <SEO 
        title="Privacy Policy" 
        description="Our privacy policy outlines how we collect, use, and protect your information when you visit Saransh."
    />
    <div className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">Privacy Policy</h1>
      <p className="text-sm text-zinc-500">Last updated: August 03, 2025</p>
    </div>

    <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif">
      <p>
        Saransh Media ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
      </p>

      <h2 className="font-sans font-bold text-zinc-900 dark:text-white">Information We Collect</h2>
      <p>
        We may collect information about you in a variety of ways. The information we may collect on the Site includes:
      </p>
      <ul>
        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you subscribe to our newsletter or use our contact form.</li>
        <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.</li>
      </ul>

      <h2 className="font-sans font-bold text-zinc-900 dark:text-white">Cookies and Web Beacons</h2>
      <p>
        We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
      </p>

      <h2 className="font-sans font-bold text-zinc-900 dark:text-white">Third-Party Advertising</h2>
      <p>
        We use third-party advertising companies such as Google AdSense to serve ads when you visit the Site. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
      </p>
      <p>
        Specifically, Google's use of the DART cookie enables it and its partners to serve ads to our users based on their visit to our Site and/or other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.
      </p>

      <h2 className="font-sans font-bold text-zinc-900 dark:text-white">Your Consent</h2>
      <p>
        By using our Site, you consent to our Privacy Policy. We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of this Privacy Policy.
      </p>

      <h2 className="font-sans font-bold text-zinc-900 dark:text-white">Contact Us</h2>
      <p>
        If you have questions or comments about this Privacy Policy, please contact us through our <Link to="/contact" className="text-primary hover:underline">Contact Page</Link>.
      </p>
    </div>
  </div>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Auto-send to this email without showing it on UI
    const DESTINATION_EMAIL = "prakashgothwal370@gmail.com"; 
    
    try {
        // Using FormSubmit.co for serverless form handling
        const response = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                message: formData.message,
                _subject: `New Contact from ${formData.name} - Saransh Website`,
            })
        });

        if (response.ok) {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            // Reset status after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } else {
            setStatus('error');
        }
    } catch (error) {
        console.error("Form submission error", error);
        setStatus('error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-dark-card p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 animate-fade-in">
      <SEO 
        title="Contact Us" 
        description="Get in touch with the Saransh team for editorial corrections, partnerships, or general inquiries."
      />
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">Get in Touch</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Have a question, suggestion, or partnership idea? We'd love to hear from you.
        </p>
      </div>
      
      {status === 'success' ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h3 className="text-xl font-bold text-green-800 dark:text-green-100 mb-2">Message Sent!</h3>
            <p className="text-green-700 dark:text-green-200">Thank you for contacting us. We will get back to you shortly.</p>
            <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-bold text-green-600 dark:text-green-300 hover:underline"
            >
                Send another message
            </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Your Name</label>
            <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-primary focus:outline-none" 
                required 
                placeholder="Full Name" 
                disabled={status === 'submitting'}
            />
            </div>
            <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Your Email</label>
            <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-primary focus:outline-none" 
                required 
                placeholder="email@example.com"
                disabled={status === 'submitting'}
            />
            </div>
            <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Message</label>
            <textarea 
                rows={5} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-primary focus:outline-none" 
                required 
                placeholder="How can we help?"
                disabled={status === 'submitting'}
            ></textarea>
            </div>

            {status === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm text-center">
                    Something went wrong. Please try again later.
                </div>
            )}

            <button 
                type="submit" 
                disabled={status === 'submitting'}
                className={`w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-lg transition-all active:scale-95 flex justify-center items-center gap-2 ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {status === 'submitting' ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </>
                ) : 'Send Message'}
            </button>
        </form>
      )}
    </div>
  );
};


export const Terms: React.FC = () => (
    <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 animate-fade-in">
      <SEO 
        title="Terms of Service" 
        description="Read the terms and conditions for using the Saransh website."
      />
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">Terms of Service</h1>
        <p className="text-sm text-zinc-500">Last updated: August 03, 2025</p>
      </div>
  
      <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif">
        <p>
          Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Saransh website (the "Service") operated by Saransh Media ("us", "we", or "our").
        </p>
        <p>
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
        </p>
  
        <h2 className="font-sans font-bold text-zinc-900 dark:text-white">1. Use of Our Service</h2>
        <p>
          You agree to use our Service for lawful purposes only and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Service. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our Service.
        </p>

        <h2 className="font-sans font-bold text-zinc-900 dark:text-white">2. Content and Intellectual Property</h2>
        <p>
          All content included on the Site, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of Saransh Media or its suppliers and protected by copyright and other laws. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.
        </p>
  
        <h2 className="font-sans font-bold text-zinc-900 dark:text-white">3. Advertisements</h2>
        <p>
          This Service is supported by advertising revenue and may display advertisements and promotions. These advertisements may be targeted to the content of information stored on the Service, queries made through the Service, or other information. The manner, mode, and extent of advertising by Saransh on the Service are subject to change without specific notice to you.
        </p>

        <h2 className="font-sans font-bold text-zinc-900 dark:text-white">4. Disclaimers and Limitation of Liability</h2>
        <p>
          The Service and its content are provided on an "as is" and "as available" basis without any warranties of any kind. While we strive to provide accurate information, we make no warranty that the Service will meet your requirements or be available on an uninterrupted, secure, or error-free basis.
        </p>
        <p>
          In no event shall Saransh Media, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
        </p>
  
        <h2 className="font-sans font-bold text-zinc-900 dark:text-white">5. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page and updating the "Last updated" date.
        </p>
  
        <h2 className="font-sans font-bold text-zinc-900 dark:text-white">Contact Us</h2>
        <p>
          If you have any questions about these Terms, please <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
        </p>
      </div>
    </div>
);

export const Disclaimer: React.FC = () => (
    <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 animate-fade-in">
      <SEO 
        title="Disclaimer" 
        description="Disclaimer for Saransh - Information regarding financial, health, and general content."
      />
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">Disclaimer</h1>
        <p className="text-sm text-zinc-500">Last updated: August 03, 2025</p>
      </div>
  
      <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif">
        <h2 className="font-sans font-bold text-zinc-900 dark:text-white">1. General Information</h2>
        <p>
          The information provided by Saransh Media ("we," "us," or "our") on this website is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
        </p>

        <h2 className="font-sans font-bold text-zinc-900 dark:text-white">2. Financial Disclaimer</h2>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 rounded-r-lg mb-6">
            <p className="font-bold mb-2 text-yellow-800 dark:text-yellow-200">For Educational Purposes Only</p>
            <p className="text-sm">
                Saransh is a news and information platform. <strong>We are not SEBI registered investment advisors.</strong> The content provided in our "Finance" section, including tools like SIP/EMI calculators and stock market data, is for educational and informational purposes only and should not be construed as professional financial advice.
            </p>
        </div>
        <p>
            Before making any investment decisions, we strongly recommend you consult with a qualified professional financial advisor. Any reliance you place on such information is strictly at your own risk.
        </p>

        <h2 className="font-sans font-bold text-zinc-900 dark:text-white">3. Medical/Health Disclaimer</h2>
        <div className="p-4 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-lg mb-6">
            <p className="font-bold mb-2 text-red-800 dark:text-red-200">Not Medical Advice</p>
            <p className="text-sm">
                The "Health" and "Lifestyle" information provided on Saransh is for general informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
        </div>
        <p>
            Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this Site.
        </p>

        <h2 className="font-sans font-bold text-zinc-900 dark:text-white">4. External Links Disclaimer</h2>
        <p>
          The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites.
        </p>
      </div>
    </div>
);