'use client';

import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative bg-white px-6 sm:px-8 lg:px-10 py-32">
      <div className={`w-full max-w-4xl mx-auto text-center space-y-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Greeting */}
        <div className="space-y-8">
          <p className="text-sage-600 text-xl font-light">
            Hello, I'm
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light text-sage-800 leading-tight">
            Kendall Perpente
          </h1>
        </div>

        {/* Title */}
        <div className="space-y-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-sage-600">
            Full-Stack Software Developer
          </h2>
          <p className="text-sage-500 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed font-light">
            Creating digital experiences with clean code and thoughtful design
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-12">
          <a
            href="#projects"
            className="px-10 py-5 border border-sage-600 text-sage-600 font-light text-lg hover:bg-sage-600 hover:text-white transition-all duration-300"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-10 py-5 text-sage-500 font-light text-lg hover:text-sage-700 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sage-600 hover:text-sage-800 transition-all duration-300 animate-bounce-slow"
        aria-label="Scroll down to learn more"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
};

export default Hero;
