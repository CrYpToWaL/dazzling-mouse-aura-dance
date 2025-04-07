
import React, { useEffect, useState } from "react";
import { ParticleProps } from "@/types";
import { cn } from "@/lib/utils";

const Particle: React.FC<ParticleProps> = ({ 
  x, 
  y, 
  size, 
  color, 
  speed, 
  lifetime, 
  id 
}) => {
  const [opacity, setOpacity] = useState(1);
  const [position, setPosition] = useState({ x, y });
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const startTime = Date.now();
    let animationFrame: number;
    
    const randomAngle = Math.random() * Math.PI * 2;
    const vx = Math.cos(randomAngle) * speed;
    const vy = Math.sin(randomAngle) * speed;
    
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / lifetime, 1);
      
      setOpacity(1 - progress);
      setScale(1 - progress * 0.5);
      setPosition(prev => ({
        x: prev.x + vx,
        y: prev.y + vy - (progress * 0.5) // Slight upward drift
      }));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [lifetime, speed]);
  
  return (
    <div
      className={cn("particle", color.includes("purple") ? "glow" : "")}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        opacity,
        transform: `scale(${scale})`,
      }}
    />
  );
};

export default Particle;
