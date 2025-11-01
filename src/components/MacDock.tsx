"use client";

import React from 'react';
import { Terminal, User, Briefcase, Github } from 'lucide-react';

export default function MacDock() {
  return (
    <div className="mac-dock fixed left-1/2 transform -translate-x-1/2 bottom-6 z-50">
      <div className="flex items-end space-x-4 bg-white/5 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
        <button className="dock-btn flex items-center justify-center w-12 h-12 rounded-full hover:scale-110 transition">
          <Terminal size={20} className="text-green-200" />
        </button>
        <button className="dock-btn flex items-center justify-center w-12 h-12 rounded-full hover:scale-110 transition">
          <User size={20} className="text-green-200" />
        </button>
        <button className="dock-btn flex items-center justify-center w-12 h-12 rounded-full hover:scale-110 transition">
          <Briefcase size={20} className="text-green-200" />
        </button>
        <a href="https://github.com/Suhas-Uppala" target="_blank" rel="noreferrer" className="dock-btn flex items-center justify-center w-12 h-12 rounded-full hover:scale-110 transition">
          <Github size={20} className="text-green-200" />
        </a>
      </div>
    </div>
  );
}
