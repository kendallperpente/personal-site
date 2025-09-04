'use client';

import { useState } from 'react';

const NewContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="min-h-screen py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="flex items-center justify-center text-2xl font-bold text-sage-900 mb-8">
          <span className="font-mono text-sage-600 text-base mr-2">04.</span>
          What's Next?
        </h2>
        
        <h3 className="text-4xl lg:text-5xl font-bold text-sage-900 mb-8">
          Get In Touch
        </h3>
        
        <p className="text-sage-700 text-lg leading-relaxed mb-12">
          Although I'm not currently looking for any new opportunities, my inbox is always open. 
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 items-start text-left mb-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-sage-900 mb-4">Let's Connect</h4>
              <div className="space-y-3">
                <a 
                  href="mailto:kendall@example.com"
                  className="flex items-center text-sage-600 hover:text-sage-800 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  kendall@example.com
                </a>
                <a 
                  href="https://www.linkedin.com/in/kendall-perpente-b76453381/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sage-600 hover:text-sage-800 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
                  </svg>
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/kendallperpente"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sage-600 hover:text-sage-800 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h4 className="text-lg font-semibold text-sage-900 mb-4">Send a Message</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-sage-300 rounded focus:border-sage-600 focus:outline-none transition-colors duration-300"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 border border-sage-300 rounded focus:border-sage-600 focus:outline-none transition-colors duration-300"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-sage-300 rounded focus:border-sage-600 focus:outline-none resize-none transition-colors duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-sage-600 text-white font-medium rounded hover:bg-sage-700 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        <a
          href="mailto:kendall@example.com"
          className="inline-block px-8 py-4 border-2 border-sage-600 text-sage-600 font-mono text-sm tracking-wide hover:bg-sage-50 transition-all duration-300"
        >
          Say Hello
        </a>
      </div>
    </section>
  );
};

export default NewContact;
