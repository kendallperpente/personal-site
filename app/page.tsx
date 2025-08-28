import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center text-center gap-8">
      <div className="mt-12">
  <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">Hi, I'm Kendall Perpente</h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-xl mx-auto">A passionate software engineer specializing in building modern, scalable web applications with Next.js and Tailwind CSS.</p>
      </div>
      <div className="flex gap-4 mt-6">
        <Link href="/projects" className="px-6 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition">View Projects</Link>
        <Link href="/contact" className="px-6 py-2 rounded border border-cyan-500 text-cyan-400 hover:bg-cyan-900 transition">Contact Me</Link>
      </div>
    </section>
  );
}
