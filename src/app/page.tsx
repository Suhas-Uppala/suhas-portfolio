import MatrixBackground from '@/components/MatrixBackground';
import FloatingParticles from '@/components/FloatingParticles';
import LiveTimestamp from '@/components/LiveTimestamp';
import Link from 'next/link';

export default function Home() {
  return (
  <main className="min-h-screen bg-black relative overflow-hidden flex flex-col">
            <MatrixBackground />
            <FloatingParticles />

            {/* Hero Section - Full screen centered */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-6">
              <div className="max-w-4xl w-full text-center space-y-8">
                
                {/* Main Title */}
                <div className="space-y-4">
                  <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
                    Suhas Uppala
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-400">
                    AI/ML Enthusiast · Full‑Stack Developer
                  </p>
                </div>

                {/* Contact Info */}
                <div className="text-gray-400 text-sm md:text-base space-y-2">
                  <p>Hyderabad, Telangana</p>
                  <p>
                    <a href="tel:+917989665270" className="hover:text-green-400 transition-colors">
                      +91-7989665270
                    </a>
                    {' · '}
                    <a href="mailto:suhasuppala1805@gmail.com" className="hover:text-green-400 transition-colors">
                      suhasuppala1805@gmail.com
                    </a>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
                  <Link 
                    href="/terminal"
                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    Explore Projects
                  </Link>
                  <a 
                    href="mailto:suhasuppala1805@gmail.com"
                    className="px-8 py-3 border-2 border-green-500 hover:bg-green-500/10 text-green-500 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    Contact
                  </a>
                  <button className="px-8 py-3 border-2 border-gray-500 hover:bg-gray-500/10 text-gray-400 hover:text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                    Resume
                  </button>
                </div>
              </div>
            </div>

            {/* Footer with live timestamp */}
            <footer className="relative z-10 px-6 py-4 border-t border-gray-800">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
                <LiveTimestamp />
                <div>© 2025 Suhas Uppala</div>
              </div>
            </footer>
    </main>
  );
}
