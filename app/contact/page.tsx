import React from "react";

export default function Contact() {
  return (
    <section className="max-w-md mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Contact</h1>
      <p className="mb-4 text-gray-300">Feel free to reach out for opportunities, collaborations, or just to say hi!</p>
      <a href="mailto:kperp@example.com" className="inline-block px-6 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition">Email Me</a>
      <div className="mt-6 flex justify-center gap-4">
        <a href="https://github.com/kperp" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">GitHub</a>
        <a href="https://linkedin.com/in/kperp" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">LinkedIn</a>
      </div>
    </section>
  );
}
