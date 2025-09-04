'use client';

import { useEffect, useState } from 'react';

const NewAbout = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const aboutSection = document.getElementById('hero');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => observer.disconnect();
  }, []);

  const technologies = [
    'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Node.js', 
    'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker'
  ];

  return (
    <section id="about" className="min-h-screen py-24">
      <div className={`max-w-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="flex items-center text-2xl font-bold text-sage-900 mb-8">
          <span className="font-mono text-sage-600 text-base mr-2">01.</span>
          About
        </h2>
        
        <div className="space-y-6 text-sage-700 leading-relaxed">
          <p>
            Hello! I'm Kendall, a passionate full-stack developer who enjoys creating things that live on the internet. 
            My interest in web development started back in 2019 when I decided to try editing custom Tumblr themes — 
            turns out hacking together HTML & CSS taught me a lot about web development!
          </p>
          
          <p>
            Fast-forward to today, and I've had the privilege of working on a variety of projects ranging from 
            e-commerce platforms to data visualization tools. My main focus these days is building accessible, 
            inclusive products and digital experiences for a variety of clients.
          </p>
          
          <p>
            I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React.
          </p>
          
          <p>Here are a few technologies I've been working with recently:</p>
          
          <ul className="grid grid-cols-2 gap-2 mt-4 font-mono text-sm">
            {technologies.map((tech, index) => (
              <li key={index} className="flex items-center">
                <span className="text-sage-600 mr-2">▸</span>
                {tech}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-12">
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border-2 border-sage-600 text-sage-600 font-mono text-sm tracking-wide hover:bg-sage-50 transition-all duration-300"
          >
            View Full Résumé
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewAbout;
