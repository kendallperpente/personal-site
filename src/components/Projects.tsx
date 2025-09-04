'use client';

import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string;
  category: 'web' | 'mobile' | 'fullstack' | 'tool';
  featured: boolean;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern, responsive e-commerce platform with real-time inventory management.',
    longDescription: 'Built a comprehensive e-commerce solution featuring user authentication, payment processing with Stripe, real-time inventory updates, and an admin dashboard. Implemented advanced search functionality, product recommendations, and order tracking.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe API', 'AWS S3', 'Redis'],
    githubUrl: 'https://github.com/kendallperpente/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    imageUrl: '/placeholder-project-1.jpg',
    category: 'fullstack',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management Dashboard',
    description: 'Collaborative project management tool with real-time updates and team features.',
    longDescription: 'Developed a comprehensive task management application with drag-and-drop functionality, real-time collaboration, team chat, file sharing, and advanced reporting. Features include Gantt charts, time tracking, and notification systems.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io', 'Tailwind CSS'],
    githubUrl: 'https://github.com/kendallperpente/task-dashboard',
    liveUrl: 'https://task-manager-demo.vercel.app',
    imageUrl: '/placeholder-project-2.jpg',
    category: 'web',
    featured: true,
  },
  {
    id: 3,
    title: 'Weather Analytics API',
    description: 'RESTful API providing detailed weather analytics and forecasting data.',
    longDescription: 'Created a robust weather analytics API that aggregates data from multiple sources, provides historical analysis, and offers predictive forecasting. Includes rate limiting, caching, and comprehensive documentation.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Redis', 'OpenWeather API'],
    githubUrl: 'https://github.com/kendallperpente/weather-api',
    imageUrl: '/placeholder-project-3.jpg',
    category: 'tool',
    featured: false,
  },
  {
    id: 4,
    title: 'Social Media Analytics',
    description: 'React Native app for tracking and analyzing social media performance.',
    longDescription: 'Mobile application that connects to various social media platforms to provide comprehensive analytics, engagement metrics, and growth insights. Features include custom dashboards, automated reporting, and competitor analysis.',
    technologies: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'Social Media APIs'],
    githubUrl: 'https://github.com/kendallperpente/social-analytics',
    imageUrl: '/placeholder-project-4.jpg',
    category: 'mobile',
    featured: false,
  },
  {
    id: 5,
    title: 'Real-time Chat Application',
    description: 'Scalable chat platform with video calling and file sharing capabilities.',
    longDescription: 'Built a modern chat application with real-time messaging, video/audio calls, file sharing, and group management. Implemented end-to-end encryption, message search, and integration with popular productivity tools.',
    technologies: ['React', 'Socket.io', 'WebRTC', 'Express.js', 'MongoDB', 'AWS S3'],
    githubUrl: 'https://github.com/kendallperpente/chat-app',
    liveUrl: 'https://chat-demo.vercel.app',
    imageUrl: '/placeholder-project-5.jpg',
    category: 'fullstack',
    featured: true,
  },
];

const categoryNames = {
  web: 'Web Applications',
  mobile: 'Mobile Apps',
  fullstack: 'Full-Stack Projects',
  tool: 'Tools & APIs',
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProjects = selectedCategory === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);

  const categories = ['all', ...Object.keys(categoryNames)] as const;

  return (
    <section id="projects" className="py-48 bg-white">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-40">
          <h2 className="text-4xl sm:text-5xl font-light text-sage-800 mb-8">
            Selected Work
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
              {category === 'all' ? 'All Projects' : categoryNames[category as keyof typeof categoryNames]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group transition-all duration-300"
            >
              <div className="mb-6">
                <h3 className="text-xl font-light text-sage-800 mb-3 group-hover:text-sage-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sage-500 font-light leading-relaxed mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-sage-500 font-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-6 text-sm">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage-500 hover:text-sage-700 font-light transition-colors duration-300"
                  >
                    View Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sage-500 hover:text-sage-700 font-light transition-colors duration-300"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
