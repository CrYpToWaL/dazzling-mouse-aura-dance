
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CursorPreviewProps {
  config: {
    type: string;
    colors: string[];
    size: number;
    trail: boolean;
    fadeTime: number;
    particleCount: number;
  } | null;
}

const CursorPreview: React.FC<CursorPreviewProps> = ({ config }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [lastParticleTime, setLastParticleTime] = useState(0);
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    if (!config) return;
    
    // Add particles based on config
    const now = Date.now();
    if (now - lastParticleTime > (1000 / (config.particleCount * 2))) {
      const newParticle = {
        id: now,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        color: config.colors[Math.floor(Math.random() * config.colors.length)]
      };
      
      setParticles(prev => [...prev, newParticle]);
      setLastParticleTime(now);
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
  
  return (
    <Card className="border border-border bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-primary/10">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Preview Your Cursor</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="w-full h-[300px] bg-background/30 rounded-md border border-border relative overflow-hidden transition-all duration-300 hover:border-primary/40"
          onMouseMove={handleMouseMove}
        >
          {config && (
            <>
              {/* Custom cursor */}
              <div 
                className="absolute w-8 h-8 rounded-full pointer-events-none z-50 animate-pulse"
                style={{ 
                  left: `${position.x - 16}px`, 
                  top: `${position.y - 16}px`,
                  border: '2px solid white',
                  mixBlendMode: 'difference'
                }}
              />
              
              {/* Particles */}
              {particles.map(particle => (
                <div 
                  key={particle.id} 
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${particle.x - (config.size/2)}px`,
                    top: `${particle.y - (config.size/2)}px`,
                    width: `${config.size}px`,
                    height: `${config.size}px`,
                    backgroundColor: particle.color,
                    opacity: 1 - ((Date.now() - particle.id) / config.fadeTime),
                    transform: `scale(${1 - ((Date.now() - particle.id) / config.fadeTime / 2)})`,
                    transition: 'opacity 0.1s, transform 0.1s',
                    boxShadow: `0 0 ${config.size * 2}px ${particle.color}`
                  }}
                />
              ))}
            </>
          )}
          
          {!config && (
            <div className="flex items-center justify-center h-full text-gray-400">
              <span className="animate-pulse">Generate a cursor to see preview</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CursorPreview;
