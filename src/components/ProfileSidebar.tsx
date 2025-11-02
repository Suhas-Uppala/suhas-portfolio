'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const ProfileSidebar = () => {
  const socialLinks = [
    { 
      icon: Github, 
      url: 'https://github.com/suhas', 
      label: 'GitHub',
      color: 'hover:text-gray-300'
    },
    { 
      icon: Linkedin, 
      url: 'https://linkedin.com/in/suhas', 
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    { 
      icon: Mail, 
      url: 'mailto:suhas@example.com', 
      label: 'Email',
      color: 'hover:text-green-400'
    }
  ];

  const ProfileImageFallback = () => {
    const [errored, setErrored] = useState(false);
    if (!errored) {
      return (
        <img
          src="/profile.svg"
          alt="Suhas Profile"
          className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
          onError={() => setErrored(true)}
        />
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-600 to-blue-600"> 
        <span className="text-white font-bold text-4xl">S</span>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-black/40">
      {/* Profile Card with 3D effect like reference */}
      <motion.div
        initial={{ rotateY: -20, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mb-8"
        style={{ perspective: '1000px' }}
      >
        {/* Card container with 3D transform */}
        <div className="relative w-64 h-80 bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg overflow-hidden shadow-2xl">
          {/* GitHub icon top-left like reference */}
          <div className="absolute top-4 left-4 z-10">
            <Github className="text-gray-400" size={24} />
          </div>
          
          {/* Username badge top-right like reference */}
          <div className="absolute top-4 right-4 z-10 bg-gray-800 px-3 py-1 rounded text-xs text-gray-400">
            gateremark
          </div>

          {/* Profile image */}
          <div className="absolute bottom-0 left-0 right-0 h-4/5">
            <ProfileImageFallback />
          </div>

          {/* Interactive 3D Card label */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 px-4 py-1 rounded text-xs text-green-400 border border-green-500/30">
            [Interactive 3D Card]
          </div>
        </div>
      </motion.div>

      {/* Social Links */}
      <div className="flex space-x-4 mt-6">
        {socialLinks.map((social) => (
          <motion.a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-lg bg-gray-900/50 text-gray-300 transition-all duration-300 ${social.color} border border-gray-700 hover:border-current`}
          >
            <social.icon size={18} />
          </motion.a>
        ))}
      </div>

      {/* Status indicator */}
      <div className="mt-8 flex items-center space-x-2 text-sm text-gray-400">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span>Online</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;