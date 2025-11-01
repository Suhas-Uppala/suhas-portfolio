"use client";

import React from 'react';

export default function MacTopBar() {
  return (
    <div className="mac-topbar hidden md:flex items-center justify-between px-4 py-2 select-none">
      <div className="flex items-center space-x-2">
        <div className="mac-traffic flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-400 shadow-md" aria-hidden />
          <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-md" aria-hidden />
          <span className="w-3 h-3 rounded-full bg-green-400 shadow-md" aria-hidden />
        </div>
        <div className="ml-2 text-sm text-gray-300">terminal · ~/portfolio</div>
      </div>

      <div className="text-xs text-gray-400">Suhas — Terminal Portfolio</div>

      <div className="flex items-center space-x-3 opacity-80 text-gray-400 text-xs">
        <div className="px-2 py-1 rounded hover:bg-white/2">File</div>
        <div className="px-2 py-1 rounded hover:bg-white/2">Edit</div>
        <div className="px-2 py-1 rounded hover:bg-white/2">View</div>
      </div>
    </div>
  );
}
