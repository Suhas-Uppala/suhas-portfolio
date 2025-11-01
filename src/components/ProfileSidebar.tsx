'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
// using standard img element for fallback to avoid next/image optimizer errors when /profile.jpg is missing
import { Github, Linkedin, Mail, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const [collapsed, setCollapsed] = useState(false);

    // Inline small fallback component for the profile image to avoid /profile.jpg 404 warnings
  const ProfileImageFallback = ({ collapsed }: { collapsed: boolean }) => {
    const [errored, setErrored] = useState(false);
    if (!errored) {
      return (
        <img
          src="/profile.jpg"
          alt="Suhas Profile"
          width={collapsed ? 48 : 144}
          height={collapsed ? 48 : 144}
          className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-500 rounded-full"
          onError={() => setErrored(true)}
        />
      );
    }

    // Fallback gradient avatar
    return (
      <div className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-green-600 to-blue-600`}> 
        <span className="text-white font-bold text-2xl">S</span>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`h-full ${collapsed ? 'w-16' : 'w-72'} glass-panel-intense flex flex-col relative overflow-hidden border-r border-green-400/20 z-30 transition-all duration-300`}
    >
      {/* Collapse toggle */}
      <button
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={() => setCollapsed(prev => !prev)}
        className="absolute top-3 right-3 z-40 bg-black/30 backdrop-blur-sm p-1 rounded-full border border-green-400/20 hover:bg-black/50"
      >
        {collapsed ? <ChevronRight size={14} className="text-green-300" /> : <ChevronLeft size={14} className="text-green-300" />}
      </button>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 via-blue-500/20 to-purple-500/30" />
        <div 
          className="absolute inset-0 animate-pulse" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.2) 0%, transparent 25%),
              radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.15) 0%, transparent 25%),
              linear-gradient(45deg, transparent 40%, rgba(139, 92, 246, 0.05) 50%, transparent 60%)
            `,
            backgroundSize: '60px 60px, 80px 80px, 100px 100px'
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-xl"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              background: `radial-gradient(circle, ${
                i === 0 ? 'rgba(34, 197, 94, 0.3)' :
                i === 1 ? 'rgba(59, 130, 246, 0.2)' :
                'rgba(139, 92, 246, 0.2)'
              } 0%, transparent 70%)`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            initial={{
              x: Math.random() * 200,
              y: 100 + i * 200,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Profile Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Profile Image with Enhanced Glow Effect */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
            className={`relative mb-8 flex items-center justify-center ${collapsed ? 'py-6' : ''}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-green-500/40 via-blue-500/30 to-purple-500/40 rounded-full blur-2xl animate-pulse ${collapsed ? 'opacity-0' : ''}`} />
            <div className={`relative overflow-hidden border-2 border-green-400/60 shadow-2xl glass-panel rounded-full ${collapsed ? 'w-12 h-12' : 'w-36 h-36'}`}>
              <ProfileImageFallback collapsed={collapsed} />
            </div>
          </motion.div>

          {/* Name and Title with Enhanced Typography */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-center mb-8 ${collapsed ? 'hidden' : ''}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 terminal-glow">
              Suhas
            </h1>
            <p className="text-gray-300 text-sm font-medium tracking-wide">
              Software Engineer
            </p>
            <div className="mt-2 w-16 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full" />
          </motion.div>

          {/* Enhanced Info Cards */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`space-y-4 mb-8 w-full ${collapsed ? 'hidden' : ''}`}
          >
            <div className="flex items-center space-x-3 text-gray-300 text-sm glass-panel p-3 rounded-lg">
              <MapPin size={16} className="text-green-400 terminal-glow" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 text-sm glass-panel p-3 rounded-lg">
              <Calendar size={16} className="text-blue-400" />
              <span>Available for opportunities</span>
            </div>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`flex space-x-4 ${collapsed ? 'hidden' : ''}`}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.15, 
                  y: -4,
                  boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className={`p-4 rounded-xl glass-panel text-gray-300 transition-all duration-300 ${social.color} hover:border-current relative group`}
              >
                <social.icon size={20} />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Bottom Status */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="p-6 glass-panel border-t border-green-400/20"
        >
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-40" />
              </div>
              <span className="terminal-glow">Online - Interactive Mode</span>
            </div>
            <div className="text-xs text-gray-500">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileSidebar;