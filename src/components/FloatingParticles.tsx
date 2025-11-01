'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const maxParticles = 100;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle colors for professional theme
    const colors = [
      'rgba(34, 197, 94, 0.6)',   // Green
      'rgba(59, 130, 246, 0.5)',  // Blue
      'rgba(139, 92, 246, 0.4)',  // Purple
      'rgba(236, 72, 153, 0.3)',  // Pink
      'rgba(251, 191, 36, 0.4)',  // Amber
    ];

    // Create particle
    const createParticle = (): Particle => {
      const side = Math.floor(Math.random() * 4);
      let x, y, vx, vy;

      switch (side) {
        case 0: // Top
          x = Math.random() * canvas.width;
          y = -10;
          vx = (Math.random() - 0.5) * 0.5;
          vy = Math.random() * 0.5 + 0.2;
          break;
        case 1: // Right
          x = canvas.width + 10;
          y = Math.random() * canvas.height;
          vx = -(Math.random() * 0.5 + 0.2);
          vy = (Math.random() - 0.5) * 0.5;
          break;
        case 2: // Bottom
          x = Math.random() * canvas.width;
          y = canvas.height + 10;
          vx = (Math.random() - 0.5) * 0.5;
          vy = -(Math.random() * 0.5 + 0.2);
          break;
        default: // Left
          x = -10;
          y = Math.random() * canvas.height;
          vx = Math.random() * 0.5 + 0.2;
          vy = (Math.random() - 0.5) * 0.5;
      }

      const maxLife = 300 + Math.random() * 200;
      return {
        x,
        y,
        vx,
        vy,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: maxLife,
        maxLife,
      };
    };

    // Update particles
    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Update life
        particle.life--;
        
        // Fade out as life decreases
        particle.opacity = (particle.life / particle.maxLife) * 0.7;
        
        // Remove dead particles
        if (particle.life <= 0 || 
            particle.x < -20 || particle.x > canvas.width + 20 ||
            particle.y < -20 || particle.y > canvas.height + 20) {
          particles.splice(i, 1);
        }
      }

      // Add new particles
      while (particles.length < maxParticles) {
        particles.push(createParticle());
      }
    };

    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        // Create gradient for each particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle glow
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 2;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
    };

    // Connect nearby particles
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.1;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      updateParticles();
      drawParticles();
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Floating geometric shapes */}
  <motion.div className="absolute inset-0 pointer-events-none overflow-hidden z-10 hidden md:block">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
              rotate: 0,
              scale: 0.5,
              opacity: 0.1
            }}
            animate={{ 
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
              rotate: 360,
              scale: [0.5, 1, 0.5],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div 
              className={`w-16 h-16 border border-green-400/20 ${
                i % 3 === 0 ? 'rounded-full' : 
                i % 3 === 1 ? 'rounded-lg rotate-45' : 
                'rounded-none'
              }`}
              style={{
                background: `linear-gradient(45deg, 
                  rgba(34, 197, 94, 0.1), 
                  rgba(59, 130, 246, 0.1)
                )`,
                backdropFilter: 'blur(1px)'
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default FloatingParticles;