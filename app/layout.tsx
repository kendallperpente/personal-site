
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 min-h-screen font-sans">
        <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
          <Link href="/" className="text-2xl font-bold tracking-tight text-cyan-400 hover:text-cyan-300 transition">Kendall Perpente</Link>
          <nav className="space-x-6">
            <Link href="/about" className="hover:text-cyan-300">About</Link>
            <Link href="/projects" className="hover:text-cyan-300">Projects</Link>
            <Link href="/skills" className="hover:text-cyan-300">Skills</Link>
            <Link href="/contact" className="hover:text-cyan-300">Contact</Link>
          </nav>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
