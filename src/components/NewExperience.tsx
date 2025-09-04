'use client';

import { useState } from 'react';

const NewExperience = () => {
  const [activeTab, setActiveTab] = useState(0);

  const experiences = [
    {
      company: 'Klaviyo',
      role: 'Senior Frontend Engineer',
      period: '2024 — PRESENT',
      description: [
        'Build and maintain critical components used to construct Klaviyo\'s frontend, across the whole product',
        'Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility',
        'Contribute to company-wide engineering initiatives and mentor junior developers'
      ],
      technologies: ['JavaScript', 'TypeScript', 'React', 'Storybook']
    },
    {
      company: 'Upstatement',
      role: 'Lead Engineer',
      period: '2018 — 2024',
      description: [
        'Built, styled, and shipped high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects',
        'Provided leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools',
        'Clients included Harvard Business School, Everytown for Gun Safety, Pratt Institute, and more'
      ],
      technologies: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'WordPress']
    },
    {
      company: 'Apple',
      role: 'UI Engineer Co-op',
      period: '2017 — 2018',
      description: [
        'Developed and styled interactive web apps for Apple Music, including the user interface of Apple Music\'s embeddable web player widget',
        'Built for in-browser user authorization and full song playback',
        'Collaborated with designers and engineers across multiple teams'
      ],
      technologies: ['Ember', 'SCSS', 'JavaScript', 'MusicKit.js']
    },
    {
      company: 'Starry',
      role: 'Software Engineer Co-op',
      period: '2016 — 2017',
      description: [
        'Worked with the UI team to engineer and improve major features of Starry\'s customer-facing Android app',
        'Developed new features including ScreenTime 2.0 for parental controls',
        'Collaborated with product managers and designers to implement user-centered solutions'
      ],
      technologies: ['Cordova', 'Backbone', 'JavaScript', 'CSS']
    }
  ];

  return (
    <section id="experience" className="min-h-screen py-24">
      <div className="max-w-4xl">
        <h2 className="flex items-center text-2xl font-bold text-sage-900 mb-12">
          <span className="font-mono text-sage-600 text-base mr-2">02.</span>
          Where I've Worked
        </h2>
        
        <div className="flex flex-col lg:flex-row">
          {/* Tab Navigation */}
          <div className="flex lg:flex-col lg:mr-12 mb-8 lg:mb-0">
            <div className="flex lg:flex-col border-b lg:border-b-0 lg:border-l-2 border-sage-200 lg:min-w-max">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 text-left text-sm font-mono whitespace-nowrap transition-all duration-300 relative ${
                    activeTab === index
                      ? 'text-sage-900 bg-sage-50'
                      : 'text-sage-600 hover:text-sage-800 hover:bg-sage-25'
                  }`}
                >
                  {exp.company}
                  {activeTab === index && (
                    <span className="absolute bottom-0 lg:bottom-auto lg:left-0 lg:top-0 lg:w-0.5 lg:h-full w-full h-0.5 bg-sage-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-sage-900">
                {experiences[activeTab].role}
                <span className="text-sage-600"> @ </span>
                <a 
                  href="#" 
                  className="text-sage-600 hover:text-sage-800 transition-colors duration-300"
                >
                  {experiences[activeTab].company}
                </a>
              </h3>
              <p className="font-mono text-sm text-sage-600 mt-1">
                {experiences[activeTab].period}
              </p>
            </div>
            
            <ul className="space-y-4 mb-6">
              {experiences[activeTab].description.map((item, index) => (
                <li key={index} className="flex items-start text-sage-700 leading-relaxed">
                  <span className="text-sage-600 mr-3 mt-2 text-xs">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-2">
              {experiences[activeTab].technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-sage-50 text-sage-700 font-mono text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewExperience;
