import Terminal from '@/components/Terminal';
import MatrixBackground from '@/components/MatrixBackground';
import ProfileSidebar from '@/components/ProfileSidebar';
// InteractiveCard removed per request
import FloatingParticles from '@/components/FloatingParticles';
import MacTopBar from '@/components/MacTopBar';
import MacDock from '@/components/MacDock';

export default function Home() {
  return (
  <main className="min-h-screen bg-black relative overflow-hidden">
      <MatrixBackground />
      <FloatingParticles />

      {/* full-bleed mac window (occupies entire viewport) */}
      <div className="mac-window relative z-10 w-full h-full mx-0 bg-black/40 border border-white/5 rounded-none overflow-hidden">
        {/* place MacTopBar at the top inside the window */}
        <MacTopBar />
        <div className="absolute inset-0">
          <div className="relative flex h-full">
            {/* Left Sidebar */}
            <aside className="w-1/3 min-w-[300px] max-w-[480px] flex-shrink-0 flex items-stretch">
              <div className="h-full border-r border-[rgba(0,255,0,0.25)]">
                <ProfileSidebar />
              </div>
            </aside>

            {/* Main Terminal Area */}
            <section className="flex-1 relative flex flex-col">
              {/* Mobile Header for smaller screens */}
              <div className="md:hidden glass-panel border-b border-gray-700/50 p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold terminal-glow">S</span>
                  </div>
                  <div>
                    <h1 className="text-green-400 font-bold terminal-glow">Suhas</h1>
                    <p className="text-xs text-gray-400">Software Engineer</p>
                  </div>
                </div>
              </div>
              
              <div className="h-full flex-1 p-6 bg-black/95 border-l border-[rgba(0,255,0,0.12)]">
                <Terminal />
              </div>
            </section>
          </div>
        </div>
      </div>
      <MacDock />
    </main>
  );
}
