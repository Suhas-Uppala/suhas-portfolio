'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, FileText, Folder, Github, Linkedin, Mail, Home } from 'lucide-react';
import MatrixBackground from '@/components/MatrixBackground';
import FloatingParticles from '@/components/FloatingParticles';
import LiveTimestamp from '@/components/LiveTimestamp';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

export default function TerminalPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    'Welcome to Suhas\'s portfolio terminal.',
    'Type "help" to see available commands.',
  ]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['portfolio']));
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fileStructure: FileNode[] = [
    {
      name: 'portfolio',
      type: 'folder',
      children: [
        { name: 'about.txt', type: 'file' },
        { name: 'education.txt', type: 'file' },
        { name: 'experience.txt', type: 'file' },
        { name: 'skills.txt', type: 'file' },
        { name: 'certifications.txt', type: 'file' },
        { name: 'achievements.txt', type: 'file' },
        { name: 'roles.txt', type: 'file' },
        { name: 'contact.txt', type: 'file' },
      ],
    },
    {
      name: 'projects',
      type: 'folder',
      children: [
        {
          name: 'optideliver-ai-delivery-optimization',
          type: 'folder',
          children: [
            { name: 'README.md', type: 'file' },
          ],
        },
      ],
    },
  ];

  const commands: Record<string, () => string[]> = {
    help: () => [
      'Available commands:',
      '  help       - Show this help message',
      '  about      - About me',
      '  skills     - My technical skills',
      '  projects   - View my projects',
      '  contact    - Contact information',
      '  clear      - Clear terminal',
      '  ls         - List files',
    ],
    about: () => [
      'Suhas Uppala',
      'AI/ML Enthusiast · Full-Stack Developer',
      '',
      'Passionate about building intelligent systems and scalable applications.',
      'Currently focused on AI/ML integration and modern web technologies.',
    ],
    skills: () => [
      'Technical Skills:',
      '  Languages: Python, JavaScript, TypeScript, Java',
      '  Frameworks: React, Next.js, Node.js, FastAPI',
      '  AI/ML: TensorFlow, PyTorch, scikit-learn',
      '  Cloud: AWS, Google Cloud, Azure',
      '  Tools: Docker, Git, Linux',
    ],
    projects: () => [
      'Projects:',
      '  1. OptiDeliver - AI-Powered Delivery Optimization',
      '     Smart logistics platform using ML algorithms',
      '',
      '  Type "cat projects/optideliver-ai-delivery-optimization/README.md" for details',
    ],
    contact: () => [
      'Contact Information:',
      '  Email: suhasuppala1805@gmail.com',
      '  Phone: +91-7989665270',
      '  Location: Hyderabad, Telangana',
      '  GitHub: github.com/Suhas-Uppala',
      '  LinkedIn: linkedin.com/in/suhas-uppala',
    ],
    ls: () => [
      'portfolio/',
      'projects/',
    ],
    clear: () => {
      setOutput([]);
      return [];
    },
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    setOutput(prev => [...prev, `$ ${cmd}`]);

    if (!trimmedCmd) return;

    if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd]();
      if (result.length > 0) {
        setOutput(prev => [...prev, ...result]);
      }
    } else {
      setOutput(prev => [...prev, `Command not found: ${trimmedCmd}. Type "help" for available commands.`]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderName)) {
        newSet.delete(folderName);
      } else {
        newSet.add(folderName);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => {
      const isExpanded = expandedFolders.has(node.name);
      
      return (
        <div key={node.name}>
          <div
            className={`flex items-center gap-2 py-1 px-2 hover:bg-gray-800/50 cursor-pointer rounded text-sm ${
              level > 0 ? 'ml-4' : ''
            }`}
            onClick={() => node.type === 'folder' && toggleFolder(node.name)}
          >
            {node.type === 'folder' ? (
              <>
                {isExpanded ? (
                  <ChevronDown size={14} className="text-gray-400" />
                ) : (
                  <ChevronRight size={14} className="text-gray-400" />
                )}
                <Folder size={14} className="text-blue-400" />
              </>
            ) : (
              <>
                <span className="w-3.5" />
                <FileText size={14} className="text-green-400" />
              </>
            )}
            <span className="text-gray-300">{node.name}</span>
          </div>
          {node.type === 'folder' && isExpanded && node.children && (
            <div>{renderFileTree(node.children, level + 1)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <main className="min-h-screen bg-[#0a0e1a] relative overflow-hidden flex flex-col">
      <MatrixBackground />
      <FloatingParticles />

      {/* Header */}
      <header className="relative z-10 px-6 py-4 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-green-400 text-xl font-semibold hover:text-green-300 transition-colors">
            Suhas Uppala
          </Link>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Suhas-Uppala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Github size={18} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/suhas-uppala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Linkedin size={18} />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href="mailto:suhasuppala1805@gmail.com"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Mail size={18} />
              <span className="hidden sm:inline">Email</span>
            </a>
            <Link
              href="/"
              className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-semibold"
            >
              <Home size={18} />
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex overflow-hidden">
        {/* Left Sidebar - File Explorer */}
        <aside className="w-80 border-r border-gray-800/50 bg-[#0d1117]/80 backdrop-blur-sm overflow-y-auto">
          <div className="p-4">
            {/* Mac-style window buttons */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-gray-400 text-sm">suhas@portfolio — bash</span>
            </div>
            
            {/* File Tree */}
            <div className="space-y-1">
              {renderFileTree(fileStructure)}
            </div>
          </div>
        </aside>

        {/* Right - Terminal */}
        <section className="flex-1 flex flex-col bg-[#0d1117]/60 backdrop-blur-sm">
          {/* Terminal Output */}
          <div
            ref={terminalRef}
            className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-1"
          >
            {output.map((line, i) => (
              <div key={i} className={line.startsWith('$') ? 'text-green-400' : 'text-gray-300'}>
                {line}
              </div>
            ))}
          </div>

          {/* Terminal Input */}
          <div className="border-t border-gray-800/50 p-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 font-mono text-sm">
              <span className="text-green-400">$</span>
              <span className="text-gray-400">cwd: portfolio —</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                placeholder="type a command (help)"
                autoComplete="off"
              />
            </form>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-3 border-t border-gray-800/50 bg-[#0d1117]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-sm">
          <LiveTimestamp />
          <div className="text-gray-500">© 2025 Suhas Uppala</div>
        </div>
      </footer>
    </main>
  );
}
