import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kendall Perpente | Software Developer",
  description: "Full-stack developer passionate about creating innovative solutions. Specializing in modern web technologies, cloud computing, and user experience design.",
  keywords: ["software developer", "full-stack", "react", "next.js", "typescript", "web development"],
  authors: [{ name: "Kendall Perpente" }],
  creator: "Kendall Perpente",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kendallperpente.dev",
    title: "Kendall Perpente | Software Developer",
    description: "Full-stack developer passionate about creating innovative solutions.",
    siteName: "Kendall Perpente Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kendall Perpente | Software Developer",
    description: "Full-stack developer passionate about creating innovative solutions.",
  },
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
