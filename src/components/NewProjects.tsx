'use client';

const NewProjects = () => {
  const projects = [
    {
      title: 'Build a Spotify Connected App',
      description: 'Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.',
      technologies: ['React', 'Node.js', 'Spotify API', 'Express'],
      image: '/api/placeholder/400/300',
      github: 'https://github.com/kendallperpente/spotify-app',
      external: 'https://example.com',
      featured: true
    },
    {
      title: 'Spotify Profile',
      description: 'Web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks.',
      technologies: ['React', 'Express', 'Spotify API', 'Node.js'],
      image: '/api/placeholder/400/300',
      github: 'https://github.com/kendallperpente/spotify-profile',
      external: 'https://spotify-profile.herokuapp.com/',
      featured: true
    },
    {
      title: 'Halcyon Theme',
      description: 'Minimal dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Code Marketplace with over 100,000 installs.',
      technologies: ['VS Code', 'Sublime Text', 'Atom', 'iTerm'],
      image: '/api/placeholder/400/300',
      github: 'https://github.com/kendallperpente/halcyon-theme',
      external: 'https://halcyon-theme.netlify.app/',
      featured: true
    },
    {
      title: 'Task Management App',
      description: 'A full-stack task management application with real-time updates, team collaboration features, and advanced filtering options.',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
      github: 'https://github.com/kendallperpente/task-app',
      external: 'https://task-app.vercel.app/',
      featured: false
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather dashboard with location-based forecasts, weather maps, and historical data visualization.',
      technologies: ['React', 'D3.js', 'Weather API', 'Tailwind'],
      github: 'https://github.com/kendallperpente/weather-dashboard',
      external: 'https://weather-dashboard.netlify.app/',
      featured: false
    },
    {
      title: 'E-commerce Platform',
      description: 'Modern e-commerce platform with payment processing, inventory management, and admin dashboard.',
      technologies: ['Next.js', 'Stripe', 'MongoDB', 'Vercel'],
      github: 'https://github.com/kendallperpente/ecommerce',
      external: 'https://ecommerce-demo.vercel.app/',
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="min-h-screen py-24">
      <div className="max-w-6xl">
        <h2 className="flex items-center text-2xl font-bold text-sage-900 mb-16">
          <span className="font-mono text-sage-600 text-base mr-2">03.</span>
          Some Things I've Built
        </h2>
        
        {/* Featured Projects */}
        <div className="space-y-24 mb-24">
          {featuredProjects.map((project, index) => (
            <div key={index} className={`grid lg:grid-cols-12 gap-8 items-center ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
              {/* Project Image */}
              <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative group">
                  <div className="bg-sage-600 w-full h-64 lg:h-80 rounded hover:bg-sage-700 transition-colors duration-300">
                    <div className="w-full h-full bg-sage-100 rounded flex items-center justify-center">
                      <span className="text-sage-600 text-4xl">📱</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Project Info */}
              <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1 lg:text-left' : 'lg:text-right'}`}>
                <p className="font-mono text-sage-600 text-sm mb-2">Featured Project</p>
                <h3 className="text-xl lg:text-2xl font-bold text-sage-900 mb-4">{project.title}</h3>
                
                <div className={`bg-white p-6 rounded shadow-lg mb-6 ${index % 2 === 1 ? 'lg:-ml-12' : 'lg:-mr-12'}`}>
                  <p className="text-sage-700 leading-relaxed">{project.description}</p>
                </div>
                
                <ul className={`flex flex-wrap gap-2 mb-6 font-mono text-sm ${index % 2 === 1 ? 'lg:justify-start' : 'lg:justify-end'}`}>
                  {project.technologies.map((tech, techIndex) => (
                    <li key={techIndex} className="text-sage-600">{tech}</li>
                  ))}
                </ul>
                
                <div className={`flex gap-4 ${index % 2 === 1 ? 'lg:justify-start' : 'lg:justify-end'}`}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sage-600 hover:text-sage-800 transition-colors duration-300"
                      aria-label="GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sage-600 hover:text-sage-800 transition-colors duration-300"
                      aria-label="External Link"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Other Projects */}
        <div>
          <h3 className="text-xl font-bold text-sage-900 text-center mb-12">Other Noteworthy Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-sage-600 group-hover:text-sage-800 transition-colors duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v0" />
                    </svg>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sage-600 hover:text-sage-800 transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {project.external && (
                      <a
                        href={project.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sage-600 hover:text-sage-800 transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-sage-900 mb-3">{project.title}</h4>
                <p className="text-sage-700 text-sm leading-relaxed mb-4">{project.description}</p>
                
                <ul className="flex flex-wrap gap-2 font-mono text-xs">
                  {project.technologies.map((tech, techIndex) => (
                    <li key={techIndex} className="text-sage-600">{tech}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <a
            href="/archive"
            className="inline-block px-6 py-3 border-2 border-sage-600 text-sage-600 font-mono text-sm tracking-wide hover:bg-sage-50 transition-all duration-300"
          >
            View the Archive
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewProjects;
