'use client';

import { useEffect, useState } from 'react';

const About = () => {
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

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => observer.disconnect();
  }, []);



  const highlights = [
    {
      title: 'Problem Solver',
      description: 'I love tackling complex challenges and finding elegant solutions that make a real impact.'
    },
    {
      title: 'Performance Focused',
      description: 'Optimization is key. I build applications that are fast, scalable, and user-friendly.'
    },
    {
      title: 'Collaborative',
      description: 'Great software is built by great teams. I thrive in collaborative environments.'
    },
    {
      title: 'Continuous Learner',
      description: 'Technology evolves rapidly, and I stay ahead by constantly learning and adapting.'
    },
  ];

  return (
    <section id="about" className="py-48 bg-white">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-40">
          <h2 className="text-4xl sm:text-5xl font-light text-sage-800 mb-8">
            About Me
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-20 items-start justify-between max-w-5xl mx-auto">
          <div className="flex-1 space-y-12 max-w-lg">
            <div className="space-y-10 text-lg text-sage-600 leading-relaxed font-light">
              <p>
                I'm a passionate full-stack developer with a strong foundation in both front-end and back-end technologies. 
                My journey in software development is driven by a love for creating efficient, scalable solutions.
              </p>
              <p>
                With experience spanning from React and TypeScript to Python and cloud technologies, I enjoy tackling complex 
                problems and turning ideas into robust, user-friendly applications.
              </p>
            </div>
            
            <div className="pt-12">
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-10 py-5 border border-sage-600 text-sage-600 font-light hover:bg-sage-600 hover:text-white transition-all duration-300"
              >
                Download Resume
                <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex-1 space-y-16 max-w-lg">
            <div className="space-y-8">
              <h3 className="text-2xl font-light text-sage-800">Core Values</h3>
              <div className="space-y-8">
                {highlights.map((highlight, index) => (
                  <div
                    key={highlight.title}
                    className={`transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${index * 100 + 600}ms` }}
                  >
                    <h4 className="text-lg font-light text-sage-700 mb-4">{highlight.title}</h4>
                    <p className="text-sage-500 font-light leading-relaxed">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
