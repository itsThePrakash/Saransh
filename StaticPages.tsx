import React from 'react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => (
  <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 animate-fade-in">
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

export const Contact: React.FC = () => (
  <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 animate-fade-in">
    <div className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">Get in Touch</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">We’d love to hear from you. Let's make something great together.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Editorial Team</h3>
          <p className="text-zinc-600 dark:text-zinc-400">For corrections, suggestions, or story ideas.</p>
          <p className="font-semibold text-primary">editorial@saransh.com</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Advertising & Partnerships</h3>
          <p className="text-zinc-600 dark:text-zinc-400">Let's collaborate to reach our engaged audience.</p>
          <p className="font-semibold text-primary">partnerships@saransh.com</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">General Inquiries</h3>
          <p className="text-zinc-600 dark:text-zinc-400">For anything else, drop us a line here.</p>
          <p className="font-semibold text-primary">contact@saransh.com</p>
        </div>
      </div>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Your Name</label>
          <input type="text" className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-primary focus:outline-none" required placeholder="Full Name" />
        </div>
        <div>
          <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Your Email</label>
          <input type="email" className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-primary focus:outline-none" required placeholder="email@example.com" />
        </div>
        <div>
          <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Message</label>
          <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-primary focus:outline-none" required placeholder="How can we help?"></textarea>
        </div>
        <button type="submit" className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-lg transition-all active:scale-95">Send Message</button>
      </form>
    </div>
  </div>
);


export const Terms: React.FC = () => (
    <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 animate-fade-in">
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