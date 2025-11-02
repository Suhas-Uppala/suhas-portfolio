'use client';

import { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'welcome';
  content: string;
  timestamp?: string;
}

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  // removed isTyping state (not used) to satisfy lint rules
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const username = 'suhas';
  const hostname = 'portfolio';
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const el = terminalRef.current;
    const onClick = () => { if (inputRef.current) inputRef.current.focus(); };
    el?.addEventListener('click', onClick);
    return () => el?.removeEventListener('click', onClick);
  }, []);

  const commands: Record<string, () => string[] | void> = {
    help: () => ['help - show help', 'about - about me', 'projects - my projects', 'clear - clear terminal'],
    about: () => ['Suhas — Software Engineer', 'Full-stack, AI, Open Source'],
    clear: () => { setLines([]); return []; },
  };

  const handleCommand = (input: string) => {
    const cmd = input.trim().toLowerCase();
    setLines(prev => [...prev, { id: `in-${Date.now()}`, type: 'input', content: input }]);
    if (!cmd) return;
    if (cmd in commands) {
      const out = commands[cmd]() || [];
      out.forEach((l, i) => setTimeout(() => setLines(prev => [...prev, { id: `out-${Date.now()}-${i}`, type: 'output', content: l }]), i * 30));
    } else {
      setLines(prev => [...prev, { id: `err-${Date.now()}`, type: 'output', content: `Unknown command: ${cmd}` }]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  const prompt = `${username}@${hostname}:~$`;

  return (
    <div className="h-full bg-transparent text-green-400 font-mono overflow-hidden relative flex flex-col">

      <div ref={terminalRef} className="flex-1 overflow-y-auto p-6 pb-20 relative" style={{ minHeight: 0 }}>
        {lines.map(line => (
          <div key={line.id} className={`mb-1 ${line.type === 'input' ? 'text-white' : 'text-green-300'}`}>
            {line.type === 'input' && <span className="text-green-400">{prompt} </span>}
            <span className="whitespace-pre-wrap">{line.content}</span>
          </div>
        ))}

        <div className="flex items-center text-white">
          <span className="text-green-400 mr-2 terminal-glow">{prompt}</span>
          <input ref={inputRef} value={currentInput} onChange={e => setCurrentInput(e.target.value)} onKeyDown={onKeyDown} className="flex-1 bg-transparent outline-none text-white caret-green-400" autoFocus spellCheck={false} placeholder="Type a command..." />
          <span className="text-green-400 ml-1 text-lg terminal-glow">█</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t px-4 py-2 text-xs text-gray-300 flex items-center justify-between bg-transparent">
        <div className="flex items-center space-x-3"><span className="w-2 h-2 rounded-full bg-green-400 inline-block"/> <span className="font-mono">Status: Online</span></div>
        <div className="text-right font-mono text-xs text-gray-400"><div>{now.toLocaleDateString()}</div><div className="text-sm">{now.toLocaleTimeString()}</div></div>
      </div>
    </div>
  );
};

export default Terminal;
