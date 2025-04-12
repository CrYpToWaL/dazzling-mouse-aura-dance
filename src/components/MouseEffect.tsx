
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ParticleProps, MousePosition } from "@/types";
import Particle from "./Particle";
import { cn } from "@/lib/utils";

// Enhanced color palette with better visibility in both modes
const darkModeColors = [
  "rgba(255, 0, 255, 0.8)",  // Magenta
  "rgba(128, 0, 255, 0.8)",  // Purple
  "rgba(0, 128, 255, 0.8)",  // Blue
  "rgba(0, 255, 255, 0.8)",  // Cyan
  "rgba(255, 0, 128, 0.8)",  // Pink
];

// Higher contrast colors for light mode
const lightModeColors = [
  "rgba(128, 0, 255, 0.95)",   // Darker Purple
  "rgba(75, 0, 130, 0.95)",    // Indigo
  "rgba(0, 0, 205, 0.95)",     // Medium Blue
  "rgba(138, 43, 226, 0.95)",  // BlueViolet
  "rgba(186, 85, 211, 0.95)",  // MediumOrchid
];

const MouseEffect: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [hoverElements, setHoverElements] = useState<HTMLElement[]>([]);
  const [isLightMode, setIsLightMode] = useState(false);
  const particleCount = useRef(0);
  const lastEmitTime = useRef(0);
  const prevMousePosition = useRef({ x: 0, y: 0 });
  const outerCursorRef = useRef<HTMLDivElement>(null);
  const innerCursorRef = useRef<HTMLDivElement>(null);
  
  // Check if light mode is active
  useEffect(() => {
    const checkLightMode = () => {
      const isLight = document.documentElement.classList.contains('light-mode');
      setIsLightMode(isLight);
    };
    
    checkLightMode();
    
    // Create a mutation observer to watch for class changes on the html element
    const observer = new MutationObserver(checkLightMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);
  
  // Create new particle with enhanced colors based on mode
  const createParticle = useCallback((x: number, y: number, speed: number) => {
    const size = Math.random() * (isClicked ? 40 : 30) + 5;
    const colors = isLightMode ? lightModeColors : darkModeColors;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particleSpeed = Math.random() * 2 + (speed / 10);
    const lifetime = Math.random() * 1000 + 1000;
    
    const newParticle: ParticleProps = {
      x,
      y,
      size,
      color,
      speed: particleSpeed,
      lifetime,
      id: `p-${particleCount.current++}`,
    };
    
    setParticles(prevParticles => [...prevParticles, newParticle]);
    
    // Clean up particle after its lifetime
    setTimeout(() => {
      setParticles(prevParticles => 
        prevParticles.filter(particle => particle.id !== newParticle.id)
      );
    }, lifetime);
  }, [isClicked, isLightMode]);
  
  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    
    // Update mouse position
    setMousePosition({ x: clientX, y: clientY });
    
    // Update custom cursor
    if (innerCursorRef.current) {
      innerCursorRef.current.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
    }
    
    if (outerCursorRef.current) {
      outerCursorRef.current.style.transform = `translate(${clientX - 20}px, ${clientY - 20}px)`;
    }
    
    // Calculate mouse speed for dynamic particle emission
    const dx = clientX - prevMousePosition.current.x;
    const dy = clientY - prevMousePosition.current.y;
    const mouseSpeed = Math.sqrt(dx * dx + dy * dy);
    
    // Only emit particles if enough time has passed or mouse is moving fast
    const now = Date.now();
    if (now - lastEmitTime.current > (isClicked ? 10 : 25) || mouseSpeed > 5) {
      createParticle(clientX, clientY, mouseSpeed);
      lastEmitTime.current = now;
    }
    
    prevMousePosition.current = { x: clientX, y: clientY };
    
    // Check for hoverable elements
    const element = document.elementFromPoint(clientX, clientY) as HTMLElement;
    if (element && element.classList.contains('hoverable') && !hoverElements.includes(element)) {
      setHoverElements(prev => [...prev, element]);
      if (outerCursorRef.current) {
        outerCursorRef.current.style.transform = `translate(${clientX - 20}px, ${clientY - 20}px) scale(1.5)`;
      }
    } else if (!element?.classList.contains('hoverable') && hoverElements.length > 0) {
      setHoverElements([]);
    }
  }, [isClicked, hoverElements, createParticle]);
  
  // Handle mouse down/up
  const handleMouseDown = useCallback(() => {
    setIsClicked(true);
    if (innerCursorRef.current) {
      innerCursorRef.current.style.transform = `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px) scale(0.8)`;
    }
    if (outerCursorRef.current) {
      outerCursorRef.current.style.transform = `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px) scale(0.8)`;
    }
    
    // Create burst of particles on click
    for (let i = 0; i < 15; i++) {
      createParticle(mousePosition.x, mousePosition.y, 10);
    }
  }, [mousePosition, createParticle]);
  
  const handleMouseUp = useCallback(() => {
    setIsClicked(false);
    if (innerCursorRef.current) {
      innerCursorRef.current.style.transform = `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px) scale(1)`;
    }
    if (outerCursorRef.current) {
      outerCursorRef.current.style.transform = `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px) scale(1)`;
    }
  }, [mousePosition]);
  
  // Initialize event listeners
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);
  
  // Update background gradient based on mouse position and theme with enhanced contrast
  const bgGradientStyle = {
    background: isLightMode 
      ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
          hsl(${(mousePosition.x / window.innerWidth) * 60 + 220}, 40%, 90%), 
          hsl(${(mousePosition.y / window.innerHeight) * 60 + 220}, 40%, 82%) 70%)`
      : `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
          hsl(${(mousePosition.x / window.innerWidth) * 60 + 260}, 50%, 5%), 
          hsl(${(mousePosition.y / window.innerHeight) * 60 + 260}, 50%, 3%) 70%)`,
  };
  
  return (
    <div className="mouse-area">
      <div className="bg-gradient" style={bgGradientStyle} />
      <div 
        className={cn("cursor cursor-outer", isClicked ? "scale-75" : "")}
        ref={outerCursorRef}
      />
      <div 
        className="cursor cursor-inner"
        ref={innerCursorRef}
      />
      {particles.map(particle => (
        <Particle key={particle.id} {...particle} />
      ))}
    </div>
  );
};

export default MouseEffect;
