import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface CursorTrail {
  x: number;
  y: number;
  opacity: number;
  size: number;
}

const HeroBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [cursorTrail, setCursorTrail] = useState<CursorTrail[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: `hsl(${120 + Math.random() * 60}, 70%, 60%)` // Green variations
        });
      }
      setParticles(newParticles);
    };

    initParticles();
  }, []);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePos({ x, y });
      
      // Add to cursor trail
      setCursorTrail(prev => {
        const newTrail = [...prev, { x, y, opacity: 1, size: 20 }];
        return newTrail.slice(-10); // Keep last 10 trail points
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('mouseenter', handleMouseEnter);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      // Update particles
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        // Bounce off edges
        vx: particle.x <= 0 || particle.x >= window.innerWidth ? -particle.vx : particle.vx,
        vy: particle.y <= 0 || particle.y >= window.innerHeight ? -particle.vy : particle.vy
      })));

      // Update cursor trail
      setCursorTrail(prev => prev.map((trail) => ({
        ...trail,
        opacity: trail.opacity * 0.9,
        size: trail.size * 0.95
      })).filter(trail => trail.opacity > 0.1));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden cursor-none pointer-events-none"
      style={{
        background: 'linear-gradient(135deg, #2cc295 25%, #17876d 75%, #03624c 100%)',
        zIndex: 1,
      }}
    >
      {/* Animated grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px',
          animation: 'pulse 4s ease-in-out infinite'
        }}
      />

      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}

      {/* Cursor trail */}
      {cursorTrail.map((trail, index) => (
        <div
          key={index}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: trail.x - trail.size / 2,
            top: trail.y - trail.size / 2,
            width: trail.size,
            height: trail.size,
            background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)',
            opacity: trail.opacity,
            transform: `scale(${trail.opacity})`,
            transition: 'all 0.1s ease-out',
            zIndex: 50
          }}
        />
      ))}

      {/* Main cursor glow */}
      {isHovering && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: mousePos.x - 30,
            top: mousePos.y - 30,
            width: 60,
            height: 60,
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            animation: 'pulse 2s ease-in-out infinite',
            transform: 'scale(1.2)',
            transition: 'all 0.1s ease-out',
            zIndex: 50
          }}
        />
      )}

      {/* Cursor ripple effect */}
      {isHovering && (
        <div
          className="absolute rounded-full pointer-events-none border-2 border-white border-opacity-30"
          style={{
            left: mousePos.x - 40,
            top: mousePos.y - 40,
            width: 80,
            height: 80,
            animation: 'ripple 3s ease-out infinite',
            transform: 'scale(1)',
            zIndex: 50
          }}
        />
      )}

      {/* Floating orbs that follow cursor */}
      {isHovering && (
        <>
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: mousePos.x - 15 + Math.sin(Date.now() * 0.001) * 20,
              top: mousePos.y - 15 + Math.cos(Date.now() * 0.001) * 20,
              width: 30,
              height: 30,
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease-out',
              zIndex: 50
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: mousePos.x - 10 + Math.sin(Date.now() * 0.002) * 30,
              top: mousePos.y - 10 + Math.cos(Date.now() * 0.002) * 30,
              width: 20,
              height: 20,
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease-out',
              zIndex: 50
            }}
          />
        </>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default HeroBackground;