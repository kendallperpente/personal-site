'use client';

import { useEffect, useState, useRef } from 'react';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud';
}

const skillsData: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'Next.js', level: 88, category: 'frontend' },
  { name: 'Tailwind CSS', level: 92, category: 'frontend' },
  { name: 'JavaScript', level: 95, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 87, category: 'backend' },
  { name: 'Python', level: 85, category: 'backend' },
  { name: 'Express.js', level: 82, category: 'backend' },
  { name: 'REST APIs', level: 90, category: 'backend' },
  
  // Database
  { name: 'PostgreSQL', level: 85, category: 'database' },
  { name: 'MongoDB', level: 80, category: 'database' },
  { name: 'Redis', level: 75, category: 'database' },
  
  // Tools
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Docker', level: 80, category: 'tools' },
  { name: 'VS Code', level: 95, category: 'tools' },
  
  // Cloud
  { name: 'AWS', level: 78, category: 'cloud' },
  { name: 'Vercel', level: 85, category: 'cloud' },
  { name: 'Firebase', level: 80, category: 'cloud' },
];

const categoryColors = {
  frontend: 'bg-sage-600',
  backend: 'bg-sage-500', 
  database: 'bg-sage-700',
  tools: 'bg-sage-400',
  cloud: 'bg-sage-500',
};

const categoryNames = {
  frontend: 'Frontend',
  backend: 'Backend', 
  database: 'Database',
  tools: 'Tools',
  cloud: 'Cloud',
};

const Skills = () => {
  const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const skillRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillName = entry.target.getAttribute('data-skill');
            if (skillName) {
              setVisibleSkills(prev => new Set([...prev, skillName]));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(skillRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const filteredSkills = selectedCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory);

  const categories = ['all', ...Object.keys(categoryNames)] as const;

  return (
    <section id="skills" className="py-48 bg-sage-25">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-40">
          <h2 className="text-4xl sm:text-5xl font-light text-sage-800 mb-8">
            Skills & Technologies
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-24">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 font-light text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'border-b-2 border-sage-600 text-sage-800'
                  : 'text-sage-500 hover:text-sage-700'
              }`}
            >
              {category === 'all' ? 'All Skills' : categoryNames[category as keyof typeof categoryNames]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              ref={(el) => { skillRefs.current[skill.name] = el; }}
              data-skill={skill.name}
              className="py-8 border-b border-sage-100 hover:border-sage-300 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${categoryColors[skill.category]}`}></div>
                  <h3 className="font-light text-sage-800">{skill.name}</h3>
                </div>
                <span className="text-sm font-light text-sage-500">
                  {skill.level}%
                </span>
              </div>
              
              <div className="w-full bg-sage-100 h-1 overflow-hidden">
                <div
                  className={`h-full ${categoryColors[skill.category]} transition-all duration-1000 ease-out`}
                  style={{
                    width: visibleSkills.has(skill.name) ? `${skill.level}%` : '0%',
                    transitionDelay: visibleSkills.has(skill.name) ? '200ms' : '0ms'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-sage-800 mb-8">
            Additional Expertise
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Agile/Scrum', 'CI/CD', 'Testing', 'GraphQL', 'Microservices',
              'System Design', 'Performance Optimization', 'Security Best Practices'
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium hover:bg-sage-200 transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
