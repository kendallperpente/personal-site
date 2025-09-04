'use client';

import { useEffect, useState } from 'react';

const NewHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-8 lg:px-16">
      <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Small intro */}
        <p className="text-sage-600 font-mono text-lg mb-6">
          Hi, my name is
        </p>
        
        {/* Large name */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-sage-900 mb-4">
          Kendall Perpente.
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-700 mb-8">
          I build things for the web.
        </h2>
        
        {/* Description */}
        <p className="text-sage-600 text-lg max-w-xl leading-relaxed mb-12">
          I'm a passionate full-stack developer specializing in building exceptional digital experiences. 
          Currently, I'm focused on creating accessible, human-centered products with modern technologies.
        </p>
        
        {/* CTA Button */}
        <a
          href="#projects"
          className="inline-block px-8 py-4 border-2 border-sage-600 text-sage-600 font-mono text-sm tracking-wide hover:bg-sage-50 transition-all duration-300"
        >
          Check out my work!
        </a>
      </div>
    </section>
  );
};

export default NewHero;
