
import React, { useEffect, useState, useMemo } from "react";
import { ParticleProps } from "@/types";
import { cn } from "@/lib/utils";

// Import various particle shapes
const shapes = ["circle", "square", "triangle", "diamond", "star", "heart"];

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
  const [rotation, setRotation] = useState(0);
  
  // Check if in light mode
  const isLightMode = useMemo(() => 
    document.documentElement.classList.contains('light-mode'), []
  );
  
  // Randomly choose a shape for each particle
  const shape = useMemo(() => shapes[Math.floor(Math.random() * shapes.length)], []);
  
  // Get shape styles
  const getShapeStyles = () => {
    switch(shape) {
      case "square":
        return { borderRadius: "0" };
      case "triangle":
        return {
          width: "0",
          height: "0",
          backgroundColor: "transparent",
          borderLeft: `${size/2}px solid transparent`,
          borderRight: `${size/2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`
        };
      case "diamond":
        return { transform: `rotate(45deg) scale(${scale})` };
      case "star":
        return {
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        };
      case "heart":
        return {
          clipPath: "path('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z')",
        };
      default:
        return {}; // Circle is default
    }
  };
  
  useEffect(() => {
    const startTime = Date.now();
    let animationFrame: number;
    
    // Random movement patterns
    const pattern = Math.floor(Math.random() * 4);
    const randomAngle = Math.random() * Math.PI * 2;
    const vx = Math.cos(randomAngle) * speed;
    const vy = Math.sin(randomAngle) * speed;
    let rotationSpeed = (Math.random() - 0.5) * 4;
    
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / lifetime, 1);
      
      // Enhanced opacity for light mode
      setOpacity(isLightMode ? (1 - progress) * 1.4 : 1 - progress);
      
      // Different animation patterns
      switch(pattern) {
        case 0: // Standard movement
          setScale(1 - progress * 0.5);
          setPosition(prev => ({
            x: prev.x + vx,
            y: prev.y + vy - (progress * 0.5) // Slight upward drift
          }));
          break;
        case 1: // Spiral movement
          const spiralRadius = size * (1 - progress * 0.7);
          const spiralAngle = progress * 10;
          setScale(1 - progress * 0.3);
          setPosition({
            x: x + Math.cos(spiralAngle) * spiralRadius,
            y: y + Math.sin(spiralAngle) * spiralRadius - progress * 10
          });
          break;
        case 2: // Pulsing effect
          const pulseScale = 1 + Math.sin(progress * Math.PI * 4) * 0.2;
          setScale(pulseScale * (1 - progress * 0.5));
          setPosition(prev => ({
            x: prev.x + vx * 0.7,
            y: prev.y + vy * 0.7
          }));
          break;
        case 3: // Bounce effect
          const bounceOffset = Math.abs(Math.sin(progress * Math.PI * 3)) * 10;
          setScale(1 - progress * 0.3);
          setPosition(prev => ({
            x: prev.x + vx * 0.8,
            y: prev.y + vy * 0.8 - bounceOffset
          }));
          break;
      }
      
      // Rotation effect for some shapes
      if (shape !== "circle") {
        setRotation(prev => prev + rotationSpeed);
      }
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [lifetime, speed, x, y, shape, size, isLightMode]);
  
  // Enhanced style variations for better visibility
  const additionalStyles = {
    ...getShapeStyles(),
    transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
    boxShadow: Math.random() > 0.5 ? 
      `0 0 ${size/1.5}px ${color}, 0 0 ${size}px ${color}` : 
      `0 0 ${size/2}px ${color}`,
    filter: Math.random() > 0.6 ? `blur(${size/8}px)` : 'none',
  };
  
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
        ...additionalStyles
      }}
    />
  );
};

export default Particle;
