import React, { useState, useEffect, useRef } from 'react';

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  angle: number;
  color: string;
  blur: number;
}

interface WavePoint {
  x: number;
  y: number;
  baseY: number;
  amplitude: number;
  frequency: number;
  phase: number;
}

const Background: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const [wavePoints, setWavePoints] = useState<WavePoint[]>([]);
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);

  // Initialize floating shapes
  useEffect(() => {
    const initShapes = () => {
      const newShapes: FloatingShape[] = [];
      const colors = [
        'rgba(44, 194, 149, 0.1)', // Light green
        'rgba(23, 135, 109, 0.15)', // Medium green
        'rgba(3, 98, 76, 0.08)', // Dark green
        'rgba(255, 255, 255, 0.05)', // White tint
      ];

      for (let i = 0; i < 20; i++) {
        newShapes.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 150 + 50,
          opacity: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 0.3 + 0.1,
          angle: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          blur: Math.random() * 20 + 10
        });
      }
      setShapes(newShapes);
    };

    // Initialize wave points
    const initWaves = () => {
      const points: WavePoint[] = [];
      for (let i = 0; i < 100; i++) {
        points.push({
          x: (i / 99) * window.innerWidth,
          y: 0,
          baseY: window.innerHeight * 0.7,
          amplitude: Math.random() * 30 + 20,
          frequency: Math.random() * 0.02 + 0.01,
          phase: Math.random() * Math.PI * 2
        });
      }
      setWavePoints(points);
    };

    initShapes();
    initWaves();
  }, []);

  // Mouse tracking - listen to document instead of container
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setTime(prev => prev + 0.01);

      // Update floating shapes
      setShapes(prev => prev.map(shape => {
        const newAngle = shape.angle + shape.speed * 0.01;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Create gentle orbital motion
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
        const newX = centerX + Math.cos(newAngle) * radius + (Math.random() - 0.5) * 50;
        const newY = centerY + Math.sin(newAngle) * radius * 0.5 + (Math.random() - 0.5) * 30;

        return {
          ...shape,
          x: newX,
          y: newY,
          angle: newAngle,
          opacity: shape.opacity + (Math.random() - 0.5) * 0.01
        };
      }));

      // Update wave points
      setWavePoints(prev => prev.map(point => ({
        ...point,
        y: point.baseY + Math.sin(time * point.frequency + point.phase) * point.amplitude
      })));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [time]);

  // Create SVG path for waves
  const createWavePath = () => {
    if (wavePoints.length === 0) return '';
    
    let path = `M 0 ${window.innerHeight}`;
    path += ` L 0 ${wavePoints[0].y}`;
    
    for (let i = 0; i < wavePoints.length - 1; i++) {
      const current = wavePoints[i];
      const next = wavePoints[i + 1];
      const cpX = (current.x + next.x) / 2;
      path += ` Q ${cpX} ${current.y} ${next.x} ${next.y}`;
    }
    
    path += ` L ${window.innerWidth} ${window.innerHeight}`;
    path += ` Z`;
    
    return path;
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        background: 'linear-gradient(135deg, #2cc295 0%, #17876d 50%, #2fa98c 100%)',
        zIndex: 1,
      }}
    >
      {/* Ambient light overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          transition: 'all 0.3s ease-out'
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translate(${Math.sin(time * 0.5) * 10}px, ${Math.cos(time * 0.3) * 10}px)`
        }}
      />

      {/* Floating organic shapes */}
      {shapes.map(shape => (
        <div
          key={shape.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: shape.x - shape.size / 2,
            top: shape.y - shape.size / 2,
            width: shape.size,
            height: shape.size,
            background: shape.color,
            filter: `blur(${shape.blur}px)`,
            opacity: Math.max(0.05, Math.min(0.4, shape.opacity)),
            transform: `scale(${1 + Math.sin(time * 2 + shape.id) * 0.1})`,
            transition: 'all 0.5s ease-out',
            borderRadius: '50%',
            mixBlendMode: 'screen'
          }}
        />
      ))}

      {/* Animated wave layers */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(44, 194, 149, 0.2)" />
            <stop offset="100%" stopColor="rgba(3, 98, 76, 0.1)" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(23, 135, 109, 0.15)" />
            <stop offset="100%" stopColor="rgba(44, 194, 149, 0.05)" />
          </linearGradient>
        </defs>
        
        {/* Primary wave */}
        <path
          d={createWavePath()}
          fill="url(#waveGradient1)"
          opacity="0.6"
        />
        
        {/* Secondary wave with offset */}
        <path
          d={createWavePath()}
          fill="url(#waveGradient2)"
          opacity="0.4"
          transform={`translate(0, ${Math.sin(time * 0.7) * 20})`}
        />
      </svg>

      {/* Gentle cursor interaction */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: mousePos.x - 100,
          top: mousePos.y - 100,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
          filter: 'blur(20px)',
          opacity: 0.8,
          transform: 'scale(1.2)',
          transition: 'all 0.3s ease-out',
          zIndex: 3
        }}
      />

      {/* Bokeh lights */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${20 + (i * 6) % 80}%`,
            top: `${10 + (i * 7) % 80}%`,
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            background: 'rgba(255,255,255,0.4)',
            filter: `blur(${Math.random() * 2 + 1}px)`,
            opacity: 0.3 + Math.sin(time * 2 + i) * 0.2,
            transform: `scale(${1 + Math.sin(time * 1.5 + i * 0.5) * 0.3})`,
            transition: 'all 0.5s ease-out',
            zIndex: 4
          }}
        />
      ))}

      {/* Subtle corner accents */}
      <div 
        className="absolute top-0 left-0 w-1/3 h-1/3"
        style={{
          background: 'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 70%)',
          opacity: 0.6
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-1/3 h-1/3"
        style={{
          background: 'radial-gradient(circle at 100% 100%, rgba(3, 98, 76, 0.2) 0%, transparent 70%)',
          opacity: 0.4
        }}
      />
    </div>
  );
};

export default Background;