
import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface CursorPreviewProps {
  config: {
    type: string;
    colors: string[];
    size: number;
    trail: boolean;
    fadeTime: number;
    particleCount: number;
    shape?: string;
    bounceOffEdges?: boolean;
    blurAmount?: number;
    speed?: number;
    glow?: boolean;
    pulseEffect?: boolean;
    rotation?: boolean;
    spread?: number;
    opacity?: number;
    particleLifetime?: number;
    interactionType?: string;
  } | null;
}

const CursorPreview: React.FC<CursorPreviewProps> = ({ config }) => {
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; size: number; angle: number }[]>([]);
  const [lastParticleTime, setLastParticleTime] = useState(0);
  const [isAutoAnimating, setIsAutoAnimating] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Auto-animation for preview even without mouse movement
  useEffect(() => {
    if (!config || !isAutoAnimating) return;
    
    const autoAnimate = () => {
      // Create circular motion
      const now = Date.now();
      const centerX = previewRef.current ? previewRef.current.clientWidth / 2 : 150;
      const centerY = previewRef.current ? previewRef.current.clientHeight / 2 : 150;
      const radius = 50;
      const angle = (now / 1000) % (Math.PI * 2);
      
      const newX = centerX + Math.cos(angle) * radius;
      const newY = centerY + Math.sin(angle) * radius;
      
      setPosition({ x: newX, y: newY });
      
      // Add particles
      if (now - lastParticleTime > (1000 / (config.particleCount * 2))) {
        const newParticle = {
          id: now,
          x: newX,
          y: newY,
          color: config.colors[Math.floor(Math.random() * config.colors.length)],
          size: config.size,
          angle: Math.random() * Math.PI * 2
        };
        
        setParticles(prev => [...prev, newParticle]);
        setLastParticleTime(now);
      }
      
      // Cleanup old particles
      setParticles(prev => 
        prev.filter(particle => now - particle.id < config.fadeTime)
      );
      
      animationRef.current = requestAnimationFrame(autoAnimate);
    };
    
    animationRef.current = requestAnimationFrame(autoAnimate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [config, lastParticleTime, isAutoAnimating]);
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!config) return;
    
    // Stop auto animation when user interacts
    setIsAutoAnimating(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const newPosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    
    setPosition(newPosition);
    
    // Add particles based on config
    const now = Date.now();
    if (now - lastParticleTime > (1000 / (config.particleCount * 2))) {
      const newParticle = {
        id: now,
        x: newPosition.x,
        y: newPosition.y,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        size: config.size,
        angle: Math.random() * Math.PI * 2
      };
      
      setParticles(prev => [...prev, newParticle]);
      setLastParticleTime(now);
    }
  };
  
  // Resume auto animation when mouse leaves
  const handleMouseLeave = () => {
    if (config) {
      setIsAutoAnimating(true);
    }
  };
  
  // Cleanup old particles
  useEffect(() => {
    if (!config) return;
    
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setParticles(prev => 
        prev.filter(particle => now - particle.id < config.fadeTime)
      );
    }, 100);
    
    return () => clearInterval(cleanupInterval);
  }, [config]);
  
  // Get shape style based on shape name
  const getShapeStyle = (shape: string = 'circle') => {
    switch(shape) {
      case 'square':
        return { borderRadius: '0%' };
      case 'triangle':
        return { 
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          borderRadius: '0%' 
        };
      case 'diamond':
        return { 
          transform: 'rotate(45deg)',
          borderRadius: '0%' 
        };
      case 'star':
        return { 
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          borderRadius: '0%'
        };
      case 'heart':
        return { 
          clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")',
          borderRadius: '0%'
        };
      case 'lightning':
        return { 
          clipPath: 'polygon(40% 0%, 100% 60%, 55% 60%, 75% 100%, 0% 40%, 45% 40%)',
          borderRadius: '0%'
        };
      case 'hexagon':
        return { 
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          borderRadius: '0%'
        };
      case 'text':
        return { 
          content: '"01"',
          fontFamily: 'monospace',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px'
        };
      default:
        return { borderRadius: '50%' };
    }
  };
  
  return (
    <Card className="border border-border bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-primary/10 h-[400px]">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-center">Preview Your Cursor</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={previewRef}
          className="w-full h-[300px] bg-background/30 rounded-md border border-border relative overflow-hidden transition-all duration-300 hover:border-primary/40"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {config && (
            <>
              {/* Custom cursor */}
              <div 
                className="absolute w-8 h-8 rounded-full pointer-events-none z-50 animate-pulse"
                style={{ 
                  left: `${position.x}px`, 
                  top: `${position.y}px`,
                  border: '2px solid white',
                  mixBlendMode: 'difference',
                  transform: 'translate(-50%, -50%)'
                }}
              />
              
              {/* Particles */}
              {particles.map(particle => {
                // Calculate movement based on interaction type
                const progress = (Date.now() - particle.id) / config.fadeTime;
                let particleX = particle.x;
                let particleY = particle.y;
                
                if (config.interactionType === 'swirl') {
                  const swirl = progress * 10;
                  const radius = (config.spread || 5) * (1 - progress);
                  particleX += Math.cos(swirl) * radius;
                  particleY += Math.sin(swirl) * radius;
                } else if (config.interactionType === 'explode') {
                  const spread = config.spread || 10;
                  particleX += Math.cos(particle.angle) * spread * progress * 2;
                  particleY += Math.sin(particle.angle) * spread * progress * 2;
                } else if (config.interactionType === 'rain') {
                  particleY += (config.speed || 1) * 20 * progress;
                } else if (config.interactionType === 'orbit') {
                  const orbitAngle = progress * 8;
                  const radius = config.spread || 10;
                  particleX = particle.x + Math.cos(orbitAngle) * radius;
                  particleY = particle.y + Math.sin(orbitAngle) * radius;
                }
                
                return (
                  <div 
                    key={particle.id} 
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      left: `${particleX}px`,
                      top: `${particleY}px`,
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      backgroundColor: particle.color,
                      opacity: 1 - progress,
                      transform: `translate(-50%, -50%) scale(${1 - (progress / 2)}) ${config.rotation ? `rotate(${progress * 360}deg)` : ''}`,
                      transition: 'opacity 0.1s, transform 0.1s',
                      boxShadow: config.glow ? `0 0 ${particle.size * 2}px ${particle.color}` : 'none',
                      filter: config.blurAmount ? `blur(${config.blurAmount}px)` : 'none',
                      ...getShapeStyle(config.shape)
                    }}
                  />
                );
              })}
            </>
          )}
          
          {!config && (
            <div className="flex items-center justify-center h-full text-gray-400">
              <span className="animate-pulse text-center">Generate a cursor to see preview</span>
            </div>
          )}
          
          {config && particles.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CursorPreview;
