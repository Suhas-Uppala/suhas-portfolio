import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suhas Portfolio - Terminal Interface",
  description: "Interactive portfolio terminal showcasing Suhas's skills, projects, and experience",
  keywords: ["portfolio", "developer", "terminal", "interactive", "Next.js", "React"],
  authors: [{ name: "Suhas" }],
  creator: "Suhas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-mono`}
      >
        {children}
      </body>
    </html>
  );
}
