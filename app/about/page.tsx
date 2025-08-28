import React from "react";

export default function About() {
  return (
    <section className="prose prose-invert max-w-2xl mx-auto py-8">
      <h1>About Kendall Perpente</h1>
      <p>
        Hi, I'm <strong>Kendall Perpente</strong>, a software engineer with experience in full-stack web development, cloud infrastructure, and DevOps. I have a proven track record of delivering robust, scalable, and maintainable solutions using modern technologies such as TypeScript, React, Next.js, Node.js, and AWS. My background includes leading projects from conception to deployment, collaborating with cross-functional teams, and mentoring junior developers.
      </p>
      <p>
        I am passionate about continuous learning, clean code, and building products that solve real-world problems. I thrive in environments that value innovation, teamwork, and technical excellence. My approach is grounded in best practices, including DRY, SOLID, and KISS principles, ensuring that every project I work on is efficient, reliable, and easy to maintain.
      </p>
      <p>
        Outside of coding, I enjoy contributing to open-source projects, exploring new technologies, and sharing knowledge with the developer community.
      </p>
      <hr className="my-8 border-gray-700" />
      <div className="flex flex-col gap-2 text-sm">
        <span>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/kperp" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">linkedin.com/in/kperp</a>
        </span>
        <span>
          <strong>GitHub:</strong> <a href="https://github.com/kperp" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">github.com/kperp</a>
        </span>
      </div>
    </section>
  );
}
