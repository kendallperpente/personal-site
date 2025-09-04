export default function SimpleTest() {
  return (
    <div className="min-h-screen lg:flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-80 bg-slate-900 text-white p-8 h-screen sticky top-0 flex-shrink-0" style={{ backgroundColor: '#3B6255' }}>
        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-2 text-white">Kendall Perpente</h1>
          <p className="text-lg" style={{ color: '#F5F5DC' }}>Software Developer</p>
        </div>
        <nav>
          <ul className="space-y-6">
            <li><a href="#about" className="hover:opacity-80 transition-colors flex items-center text-white">
              <span className="font-mono text-sm mr-2" style={{ color: '#8BA49A' }}>01.</span> About
            </a></li>
            <li><a href="#experience" className="hover:opacity-80 transition-colors flex items-center" style={{ color: '#F5F5DC' }}>
              <span className="font-mono text-sm mr-2" style={{ color: '#8BA49A' }}>02.</span> Experience
            </a></li>
            <li><a href="#projects" className="hover:opacity-80 transition-colors flex items-center" style={{ color: '#F5F5DC' }}>
              <span className="font-mono text-sm mr-2" style={{ color: '#8BA49A' }}>03.</span> Projects
            </a></li>
            <li><a href="#contact" className="hover:opacity-80 transition-colors flex items-center" style={{ color: '#F5F5DC' }}>
              <span className="font-mono text-sm mr-2" style={{ color: '#8BA49A' }}>04.</span> Contact
            </a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area - Flex-grow to take remaining space */}
      <main className="flex-1 min-h-screen" style={{ backgroundColor: '#F5F5DC' }}>
        {/* Mobile Navigation */}
        <header className="lg:hidden text-white p-4 sticky top-0 z-50" style={{ backgroundColor: '#3B6255' }}>
          <h1 className="text-xl font-bold">Kendall Perpente</h1>
          <p style={{ color: '#F5F5DC' }}>Software Developer</p>
        </header>

        {/* Content - Ensure it starts immediately after sidebar */}
        <div className="w-full px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F5F5DC' }}>
          
          <section id="about" className="min-h-screen flex items-center py-20">
            <div className="w-full">
              <p className="font-mono text-lg mb-6" style={{ color: '#3B6255' }}>Hi, my name is</p>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 leading-tight" style={{ color: '#3B6255' }}>
                Kendall Perpente.
              </h1>
              <p className="text-xl max-w-2xl leading-relaxed mb-12" style={{ color: '#3B6255' }}>
                I'm a software engineer specializing in building exceptional digital experiences. 
                Currently, I'm focused on creating accessible, human-centered products that make a difference. 
                I have experience with modern web technologies, cloud computing, and full-stack development.
              </p>
              <button className="border-2 px-8 py-4 font-mono hover:opacity-80 transition-all text-white" 
                      style={{ borderColor: '#3B6255', backgroundColor: '#3B6255' }}>
                Check out my work!
              </button>
            </div>
          </section>

          <section id="experience" className="min-h-screen py-20">
            <div className="w-full">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 flex items-center" style={{ color: '#3B6255' }}>
                <span className="font-mono text-xl mr-4" style={{ color: '#8BA49A' }}>02.</span>
                Where I've Worked
              </h2>
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-sm border" style={{ borderColor: '#C5BEA9' }}>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#3B6255' }}>Senior Software Engineer</h3>
                  <p className="mb-4" style={{ color: '#8BA49A' }}>Tech Company • 2023 - Present</p>
                  <ul className="space-y-2" style={{ color: '#3B6255' }}>
                    <li>• Built and maintained critical components used across the entire product suite</li>
                    <li>• Collaborated with cross-functional teams to implement best practices in web accessibility</li>
                    <li>• Led development of responsive web applications using React, TypeScript, and Next.js</li>
                    <li>• Optimized application performance resulting in 40% faster load times</li>
                  </ul>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border" style={{ borderColor: '#C5BEA9' }}>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#3B6255' }}>Full Stack Developer</h3>
                  <p className="mb-4" style={{ color: '#8BA49A' }}>Previous Company • 2021 - 2023</p>
                  <ul className="space-y-2" style={{ color: '#3B6255' }}>
                    <li>• Developed full-stack web applications using Node.js, Python, and PostgreSQL</li>
                    <li>• Implemented CI/CD pipelines and deployed applications on AWS</li>
                    <li>• Mentored junior developers and conducted code reviews</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="min-h-screen py-20">
            <div className="w-full">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 flex items-center" style={{ color: '#3B6255' }}>
                <span className="font-mono text-xl mr-4" style={{ color: '#8BA49A' }}>03.</span>
                Some Things I've Built
              </h2>
              <div className="grid gap-8">
                <div className="bg-white p-8 rounded-lg shadow-sm border" style={{ borderColor: '#C5BEA9' }}>
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: '#3B6255' }}>E-Commerce Platform</h3>
                  <p className="mb-6 text-lg leading-relaxed" style={{ color: '#3B6255' }}>
                    A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. 
                    Features include user authentication, payment processing, inventory management, 
                    and real-time order tracking.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#8BA49A' }}>React</span>
                    <span className="px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#8BA49A' }}>Node.js</span>
                    <span className="px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#8BA49A' }}>PostgreSQL</span>
                    <span className="px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#8BA49A' }}>Stripe API</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="flex items-center hover:opacity-80" style={{ color: '#3B6255' }}>
                      <span className="mr-2">GitHub</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a href="#" className="flex items-center hover:opacity-80" style={{ color: '#3B6255' }}>
                      <span className="mr-2">Live Site</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm border" style={{ borderColor: '#C5BEA9' }}>
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: '#3B6255' }}>Task Management App</h3>
                  <p className="mb-6 text-lg leading-relaxed" style={{ color: '#3B6255' }}>
                    A collaborative task management application with real-time updates, 
                    drag-and-drop functionality, and team collaboration features.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#8BA49A' }}>Next.js</span>
                    <span className="px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#8BA49A' }}>TypeScript</span>
                    <span className="px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#8BA49A' }}>MongoDB</span>
                    <span className="px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#8BA49A' }}>Socket.io</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="min-h-screen flex items-center py-20">
            <div className="w-full text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center justify-center" style={{ color: '#3B6255' }}>
                <span className="font-mono text-xl mr-4" style={{ color: '#8BA49A' }}>04.</span>
                What's Next?
              </h2>
              <h3 className="text-4xl sm:text-5xl font-bold mb-8" style={{ color: '#3B6255' }}>Get In Touch</h3>
              <p className="text-xl leading-relaxed mb-12" style={{ color: '#3B6255' }}>
                I'm always interested in hearing about new opportunities and exciting projects. 
                Whether you have a question, want to collaborate, or just want to say hi, 
                feel free to reach out!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <a href="mailto:kendall@example.com" 
                   className="flex items-center px-6 py-3 rounded-lg transition-all hover:opacity-80 text-white" 
                   style={{ backgroundColor: '#3B6255' }}>
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Me
                </a>
                
                <a href="https://www.linkedin.com/in/kendall-perpente-b76453381/" 
                   className="flex items-center px-6 py-3 rounded-lg transition-all hover:opacity-80 text-white" 
                   style={{ backgroundColor: '#8BA49A' }}>
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
                  </svg>
                  LinkedIn
                </a>
              </div>
              
              <button className="border-2 px-8 py-4 font-mono transition-all hover:opacity-80 text-white" 
                      style={{ borderColor: '#3B6255', backgroundColor: '#3B6255' }}>
                Say Hello
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
