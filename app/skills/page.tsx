import { skills } from "../data";

export default function Skills() {
  return (
    <section className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Skills</h1>
      <ul className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <li key={skill} className="bg-cyan-900 text-cyan-300 px-3 py-1 rounded text-sm font-mono">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
