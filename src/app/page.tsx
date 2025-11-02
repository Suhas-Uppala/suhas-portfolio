import Terminal from '@/components/TerminalClean';
import MatrixBackground from '@/components/MatrixBackground';
import ProfileSidebar from '@/components/ProfileSidebar';
import FloatingParticles from '@/components/FloatingParticles';

export default function Home() {
  return (
  <main className="min-h-screen bg-black relative overflow-hidden flex flex-col">
            <MatrixBackground />
            <FloatingParticles />

            {/* Simple Header */}
            <header className="relative z-10 px-6 py-6 border-b border-green-500/20">
              <h1 className="text-3xl font-bold text-green-400 mb-1">Suhas</h1>
              <p className="text-gray-400 text-sm">Software Engineer</p>
            </header>

            {/* Command Navigation Bar */}
            <nav className="relative z-10 px-6 py-3 border-b border-green-500/20 bg-black/40">
              <div className="flex flex-wrap gap-2 text-sm text-green-400">
                <span className="hover:text-green-300 cursor-pointer">help</span>
                <span className="text-gray-600">|</span>
                <span className="hover:text-green-300 cursor-pointer">about</span>
                <span className="text-gray-600">|</span>
                <span className="hover:text-green-300 cursor-pointer">projects</span>
                <span className="text-gray-600">|</span>
                <span className="hover:text-green-300 cursor-pointer">skills</span>
                <span className="text-gray-600">|</span>
                <span className="hover:text-green-300 cursor-pointer">experience</span>
                <span className="text-gray-600">|</span>
                <span className="hover:text-green-300 cursor-pointer">contact</span>
                <span className="text-gray-600">|</span>
                <span className="hover:text-green-300 cursor-pointer">education</span>
                <span className="text-gray-600">|</span>
                <span className="hover:text-green-300 cursor-pointer">certifications</span>
                <span className="text-gray-600">|</span>
                <span className="hover:text-green-300 cursor-pointer">leadership</span>
                <span className="text-gray-600">|</span>
                <span className="hover:text-green-300 cursor-pointer">sudo</span>
                <span className="text-gray-600">|</span>
                <span className="hover:text-green-300 cursor-pointer">clear</span>
              </div>
            </nav>

            {/* Main Content Area */}
            <div className="relative z-10 flex-1 flex overflow-hidden">
              {/* Left Sidebar - Profile */}
              <aside className="w-80 flex-shrink-0 border-r border-green-500/20 bg-black/40">
                <ProfileSidebar />
              </aside>

              {/* Right Terminal Area */}
              <section className="flex-1 bg-black overflow-hidden">
                <Terminal />
              </section>
            </div>
    </main>
  );
}
