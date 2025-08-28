import { projects } from "../data";

export default function Projects() {
  return (
    <section className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Projects</h1>
      <div className="grid gap-8">
        {projects.map((project, idx) => (
          <div key={idx} className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-cyan-700/30 transition">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-2">{project.title}</h2>
            <p className="text-gray-300 mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tech.map((t) => (
                <span key={t} className="bg-cyan-900 text-cyan-300 px-2 py-1 rounded text-xs font-mono">{t}</span>
              ))}
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">View Project</a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
