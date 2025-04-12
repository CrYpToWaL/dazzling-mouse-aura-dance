
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Download, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import CursorPreview from './CursorPreview';

const examplePrompts = [
  "A cosmic nebula trail that swirls around the cursor",
  "Neon cyberpunk hexagons that ripple outward",
  "Falling autumn leaves that spin and drift away",
  "Digital matrix code that rains from the cursor",
  "Electric lightning bolts that arc between points"
];

interface CursorConfig {
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
}

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cursorCode, setCursorCode] = useState('');
  const [cursorConfig, setCursorConfig] = useState<CursorConfig | null>(null);
  const [promptCopied, setPromptCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a description of the cursor effect you want.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Advanced prompt analysis to match specific user requests
    setTimeout(() => {
      const promptLower = prompt.toLowerCase();
      
      // Base configuration
      let newConfig: CursorConfig = {
        type: "particle",
        colors: ["#8B5CF6", "#D946EF"],
        size: 8,
        trail: true,
        fadeTime: 800,
        particleCount: 5,
        shape: "circle",
        bounceOffEdges: false,
        blurAmount: 0,
        speed: 1,
        glow: false,
        pulseEffect: false,
        rotation: false,
        spread: 5,
        opacity: 0.8,
        particleLifetime: 800,
        interactionType: "follow"
      };
      
      // Process complex prompt features
      // Particle type/shape - expanded with many more options
      if (promptLower.includes('pixel') || promptLower.includes('square')) {
        newConfig.shape = 'square';
        newConfig.size = 6;
      } else if (promptLower.includes('star')) {
        newConfig.shape = 'star';
        newConfig.rotation = true;
        newConfig.glow = true;
      } else if (promptLower.includes('triangle')) {
        newConfig.shape = 'triangle';
        newConfig.rotation = true;
      } else if (promptLower.includes('line') || promptLower.includes('trail')) {
        newConfig.shape = 'line';
        newConfig.trail = true;
        newConfig.particleLifetime = 1200;
      } else if (promptLower.includes('heart')) {
        newConfig.shape = 'heart';
        newConfig.pulseEffect = true;
        newConfig.colors = ["#FF5E78", "#FF427F", "#FF7B90"];
      } else if (promptLower.includes('diamond')) {
        newConfig.shape = 'diamond';
        newConfig.rotation = true;
        newConfig.glow = true;
      } else if (promptLower.includes('hexagon') || promptLower.includes('hex')) {
        newConfig.shape = 'hexagon';
        newConfig.rotation = false;
        newConfig.spread = 3;
      } else if (promptLower.includes('bubble') || promptLower.includes('sphere')) {
        newConfig.shape = 'circle';
        newConfig.size = 15;
        newConfig.opacity = 0.4;
        newConfig.blurAmount = 5;
      } else if (promptLower.includes('leaf') || promptLower.includes('leaves')) {
        newConfig.shape = 'leaf';
        newConfig.rotation = true;
        newConfig.colors = ["#4CAF50", "#8BC34A", "#CDDC39"];
        newConfig.speed = 0.8;
      } else if (promptLower.includes('snowflake') || promptLower.includes('snow')) {
        newConfig.shape = 'snowflake';
        newConfig.colors = ["#E1F5FE", "#BBDEFB", "#90CAF9"];
        newConfig.rotation = true;
        newConfig.speed = 0.5;
      } else if (promptLower.includes('lightning') || promptLower.includes('electric')) {
        newConfig.shape = 'lightning';
        newConfig.colors = ["#64B5F6", "#2196F3", "#BBDEFB"];
        newConfig.glow = true;
        newConfig.blurAmount = 8;
        newConfig.particleLifetime = 400;
      } else if (promptLower.includes('matrix') || promptLower.includes('code')) {
        newConfig.shape = 'text';
        newConfig.colors = ["#00FF41", "#0D0208", "#003B00"];
        newConfig.speed = 2;
        newConfig.particleCount = 8;
      } else if (promptLower.includes('galaxy') || promptLower.includes('nebula') || promptLower.includes('cosmic')) {
        newConfig.shape = 'circle';
        newConfig.colors = ["#663399", "#9370DB", "#4B0082", "#9400D3", "#8A2BE2"];
        newConfig.glow = true;
        newConfig.blurAmount = 8;
        newConfig.spread = 12;
        newConfig.particleCount = 10;
        newConfig.size = Math.floor(Math.random() * 5) + 3;
      }
      
      // Colors - expanded with richer palette options
      if (promptLower.includes('purple')) {
        newConfig.colors = ["#8B5CF6", "#D946EF", "#7C3AED"];
      } else if (promptLower.includes('rainbow') || promptLower.includes('colorful')) {
        newConfig.colors = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];
      } else if (promptLower.includes('neon') && promptLower.includes('cyberpunk')) {
        newConfig.colors = ["#10B981", "#3B82F6", "#EC4899", "#00FFFF", "#FF00FF"];
        newConfig.glow = true;
        newConfig.blurAmount = 5;
      } else if (promptLower.includes('minimal') || promptLower.includes('white')) {
        newConfig.colors = ["#FFFFFF", "#E5E7EB"];
      } else if (promptLower.includes('electric')) {
        newConfig.colors = ["#3B82F6", "#8B5CF6", "#EC4899", "#4F46E5"];
        newConfig.glow = true;
      } else if (promptLower.includes('fire') || promptLower.includes('flame')) {
        newConfig.colors = ["#F97316", "#EF4444", "#F59E0B", "#FBBF24"];
        newConfig.pulseEffect = true;
        newConfig.particleLifetime = 600;
      } else if (promptLower.includes('ice') || promptLower.includes('cold')) {
        newConfig.colors = ["#BFDBFE", "#93C5FD", "#60A5FA", "#E0F2FE"];
        newConfig.blurAmount = 2;
      } else if (promptLower.includes('ocean') || promptLower.includes('sea')) {
        newConfig.colors = ["#0EA5E9", "#0284C7", "#38BDF8", "#7DD3FC"];
        newConfig.blurAmount = 3;
      } else if (promptLower.includes('forest') || promptLower.includes('nature')) {
        newConfig.colors = ["#4ADE80", "#22C55E", "#16A34A", "#86EFAC"];
      } else if (promptLower.includes('sunset') || promptLower.includes('warm')) {
        newConfig.colors = ["#F97316", "#FB923C", "#FDBA74", "#FED7AA"];
        newConfig.glow = true;
      } else if (promptLower.includes('pastel')) {
        newConfig.colors = ["#FDA4AF", "#A5B4FC", "#FDE68A", "#A7F3D0", "#BAE6FD"];
      } else if (promptLower.includes('gold') || promptLower.includes('luxury')) {
        newConfig.colors = ["#FEF08A", "#FDE047", "#FACC15", "#EAB308"];
        newConfig.glow = true;
        newConfig.blurAmount = 3;
      }
      
      // Size
      if (promptLower.includes('minimal') || promptLower.includes('small')) {
        newConfig.size = 4;
      } else if (promptLower.includes('large') || promptLower.includes('big')) {
        newConfig.size = 14;
      } else if (promptLower.includes('tiny')) {
        newConfig.size = 2;
        newConfig.particleCount = 12;
      } else if (promptLower.includes('massive') || promptLower.includes('huge')) {
        newConfig.size = 20;
        newConfig.particleCount = 3;
      }
      
      // Animation and behavior - expanded with more effects
      if (promptLower.includes('bounce')) {
        newConfig.bounceOffEdges = true;
        newConfig.speed = 1.5;
      }
      
      if (promptLower.includes('explode') || promptLower.includes('burst')) {
        newConfig.spread = 20;
        newConfig.speed = 2;
        newConfig.particleLifetime = 600;
      }
      
      if (promptLower.includes('swirl') || promptLower.includes('spiral')) {
        newConfig.interactionType = "swirl";
        newConfig.rotation = true;
        newConfig.trail = true;
      }
      
      if (promptLower.includes('rain') || promptLower.includes('falling')) {
        newConfig.interactionType = "rain";
        newConfig.speed = 2;
      }
      
      if (promptLower.includes('orbit') || promptLower.includes('revolve')) {
        newConfig.interactionType = "orbit";
        newConfig.trail = false;
      }
      
      if (promptLower.includes('ripple') || promptLower.includes('wave')) {
        newConfig.interactionType = "ripple";
        newConfig.spread = 10;
        newConfig.fadeTime = 1200;
      }
      
      if (promptLower.includes('fade') || promptLower.includes('trail')) {
        newConfig.fadeTime = promptLower.includes('slow') ? 1400 : 700;
        newConfig.trail = true;
      }
      
      if (promptLower.includes('glow') || promptLower.includes('glowing')) {
        newConfig.glow = true;
        newConfig.blurAmount = promptLower.includes('intense') ? 6 : 3;
      }
      
      if (promptLower.includes('pulse')) {
        newConfig.pulseEffect = true;
      }
      
      if (promptLower.includes('spin') || promptLower.includes('rotating')) {
        newConfig.rotation = true;
      }
      
      // Particle count
      if (promptLower.includes('minimal')) {
        newConfig.particleCount = 2;
      } else if (promptLower.includes('many') || promptLower.includes('lots')) {
        newConfig.particleCount = 12;
      } else if (promptLower.includes('dust') || promptLower.includes('sparkly')) {
        newConfig.particleCount = 18;
        newConfig.size = 3;
        newConfig.spread = 10;
      } else if (promptLower.includes('sparse') || promptLower.includes('few')) {
        newConfig.particleCount = 3;
        newConfig.size = 10;
      }
      
      setCursorConfig(newConfig);
      
      // Generate detailed code representation
      const codeString = `
// Generated Cursor Effect
// Based on prompt: "${prompt}"
const cursorEffect = {
  type: "${newConfig.type}",
  colors: ${JSON.stringify(newConfig.colors)},
  size: ${newConfig.size},
  trail: ${newConfig.trail},
  fadeTime: ${newConfig.fadeTime},
  particleCount: ${newConfig.particleCount},
  shape: "${newConfig.shape}",
  bounceOffEdges: ${newConfig.bounceOffEdges},
  blurAmount: ${newConfig.blurAmount},
  speed: ${newConfig.speed},
  glow: ${newConfig.glow},
  pulseEffect: ${newConfig.pulseEffect},
  rotation: ${newConfig.rotation},
  spread: ${newConfig.spread},
  opacity: ${newConfig.opacity},
  particleLifetime: ${newConfig.particleLifetime},
  interactionType: "${newConfig.interactionType}"
};

// Implementation
function createCursorEffect(config) {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  // Track mouse position
  let mouseX = 0, mouseY = 0;
  let prevMouseX = 0, prevMouseY = 0;
  document.addEventListener('mousemove', (e) => {
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Position main cursor
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    
    // Create particle based on config
    if (Math.random() < 0.3) { 
      createParticle(mouseX, mouseY, prevMouseX, prevMouseY, config);
    }
  });
  
  function createParticle(x, y, prevX, prevY, config) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    
    // Apply common styles based on config
    particle.style.position = 'absolute';
    particle.style.pointerEvents = 'none';
    
    // Set color from available palette
    const particleColor = config.colors[Math.floor(Math.random() * config.colors.length)];
    
    // Handle different shapes
    let shapeStyle = '';
    
    switch(config.shape) {
      case 'circle':
        particle.style.width = config.size + 'px';
        particle.style.height = config.size + 'px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = particleColor;
        break;
        
      case 'square':
        particle.style.width = config.size + 'px';
        particle.style.height = config.size + 'px';
        particle.style.backgroundColor = particleColor;
        break;
        
      case 'triangle':
        particle.style.width = '0';
        particle.style.height = '0';
        particle.style.borderLeft = config.size/2 + 'px solid transparent';
        particle.style.borderRight = config.size/2 + 'px solid transparent';
        particle.style.borderBottom = config.size + 'px solid ' + particleColor;
        particle.style.backgroundColor = 'transparent';
        break;
        
      case 'star':
        const starSize = config.size * 2;
        particle.style.width = starSize + 'px';
        particle.style.height = starSize + 'px';
        particle.style.backgroundColor = 'transparent';
        particle.style.backgroundImage = \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23\${particleColor.substring(1)}' width='24' height='24'%3E%3Cpath d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z'/%3E%3C/svg%3E")\`;
        particle.style.backgroundSize = 'contain';
        break;
        
      case 'line':
        const deltaX = x - prevX;
        const deltaY = y - prevY;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1;
        const angle = Math.atan2(deltaY, deltaX);
        
        particle.style.width = length + 'px';
        particle.style.height = config.size/2 + 'px';
        particle.style.backgroundColor = particleColor;
        particle.style.transform = \`translate(\${x}px, \${y}px) rotate(\${angle}rad)\`;
        particle.style.transformOrigin = '0 0';
        break;
        
      case 'heart':
        particle.style.width = config.size * 1.2 + 'px';
        particle.style.height = config.size + 'px';
        particle.style.backgroundColor = 'transparent';
        particle.style.backgroundImage = \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23\${particleColor.substring(1)}' width='24' height='24'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")\`;
        particle.style.backgroundSize = 'contain';
        break;
        
      case 'diamond':
        particle.style.width = config.size + 'px';
        particle.style.height = config.size + 'px';
        particle.style.backgroundColor = 'transparent';
        particle.style.backgroundImage = \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23\${particleColor.substring(1)}' width='24' height='24'%3E%3Cpath d='M12 2L2 12l10 10 10-10L12 2z'/%3E%3C/svg%3E")\`;
        particle.style.backgroundSize = 'contain';
        break;
        
      case 'hexagon':
        particle.style.width = config.size * 1.2 + 'px';
        particle.style.height = config.size + 'px';
        particle.style.backgroundColor = 'transparent';
        particle.style.backgroundImage = \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23\${particleColor.substring(1)}' width='24' height='24'%3E%3Cpath d='M21 16.5a1 1 0 0 1-.5.87l-8 4.5a1 1 0 0 1-1 0l-8-4.5A1 1 0 0 1 3 16.5v-9a1 1 0 0 1 .5-.87l8-4.5a1 1 0 0 1 1 0l8 4.5a1 1 0 0 1 .5.87v9z'/%3E%3C/svg%3E")\`;
        particle.style.backgroundSize = 'contain';
        break;
        
      case 'leaf':
        particle.style.width = config.size * 1.2 + 'px';
        particle.style.height = config.size + 'px';
        particle.style.backgroundColor = 'transparent';
        particle.style.backgroundImage = \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23\${particleColor.substring(1)}' width='24' height='24'%3E%3Cpath d='M15.5 2a7.5 7.5 0 0 1 7.5 7.5c0 5.5-7 13-9 13s-9-7.5-9-13c0-2.47 1.19-4.7 3-6A7.5 7.5 0 0 1 15.5 2z'/%3E%3C/svg%3E")\`;
        particle.style.backgroundSize = 'contain';
        break;

      case 'snowflake':
        particle.style.width = config.size * 1.5 + 'px';
        particle.style.height = config.size * 1.5 + 'px';
        particle.style.backgroundColor = 'transparent';
        particle.style.backgroundImage = \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23\${particleColor.substring(1)}' width='24' height='24'%3E%3Cpath d='M12 0l1.5 4h-3L12 0zm0 24l1.5-4h-3L12 24zm6-12l4 1.5v-3L18 12zm-12 0l-4 1.5v-3L6 12zm9.95-4.95l2.12-2.12-2.12-2.12-2.12 2.12 2.12 2.12zm0 9.9l2.12 2.12-2.12 2.12-2.12-2.12 2.12-2.12zM8.05 7.05L5.93 4.93 8.05 2.81l2.12 2.12-2.12 2.12zm0 9.9l-2.12 2.12 2.12 2.12 2.12-2.12-2.12-2.12z'/%3E%3C/svg%3E")\`;
        particle.style.backgroundSize = 'contain';
        break;
        
      case 'lightning':
        particle.style.width = config.size * 1.5 + 'px';
        particle.style.height = config.size * 2 + 'px';
        particle.style.backgroundColor = 'transparent';
        particle.style.backgroundImage = \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23\${particleColor.substring(1)}' width='24' height='24'%3E%3Cpath d='M13 3v7h4l-6 11v-7H7l6-11z'/%3E%3C/svg%3E")\`;
        particle.style.backgroundSize = 'contain';
        break;
        
      case 'text':
        particle.style.fontSize = config.size + 'px';
        particle.style.color = particleColor;
        particle.style.fontFamily = 'monospace';
        particle.innerHTML = ['0', '1', '#', '*', '$', '%', '&', '+', '?', '!'][Math.floor(Math.random() * 10)];
        break;
        
      default:
        particle.style.width = config.size + 'px';
        particle.style.height = config.size + 'px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = particleColor;
    }
    
    document.body.appendChild(particle);
    
    // Apply glow effect if enabled
    if (config.glow) {
      particle.style.filter = \`blur(\${config.blurAmount}px)\`;
      particle.style.boxShadow = \`0 0 \${config.blurAmount * 2}px \${particleColor}\`;
      if (config.shape === 'star' || config.shape === 'heart' || config.shape === 'diamond' || 
          config.shape === 'hexagon' || config.shape === 'leaf' || config.shape === 'snowflake' || 
          config.shape === 'lightning') {
        particle.style.filter = \`drop-shadow(0 0 \${config.blurAmount}px \${particleColor})\`;
      }
    }
    
    // Calculate position based on interaction type
    let offsetX = (Math.random() - 0.5) * config.spread;
    let offsetY = (Math.random() - 0.5) * config.spread;
    let velocity = config.speed;
    let velocityX = (Math.random() - 0.5) * velocity;
    let velocityY = (Math.random() - 0.5) * velocity;
    let initialX = 0, initialY = 0;
    let angle = Math.random() * 360;
    
    switch(config.interactionType) {
      case 'swirl':
        angle = Math.random() * 360;
        initialX = x + Math.cos(angle * Math.PI / 180) * config.spread;
        initialY = y + Math.sin(angle * Math.PI / 180) * config.spread;
        velocityX = Math.cos(angle * Math.PI / 180) * velocity * 0.5;
        velocityY = Math.sin(angle * Math.PI / 180) * velocity * 0.5;
        break;
        
      case 'rain':
        initialX = x + offsetX;
        initialY = y;
        velocityX = 0;
        velocityY = velocity * 2;
        break;
        
      case 'orbit':
        angle = Math.random() * 360;
        const orbitRadius = config.spread + Math.random() * 20;
        initialX = x;
        initialY = y;
        // Will be handled in animation
        break;
        
      case 'ripple':
        angle = Math.random() * 360;
        initialX = x;
        initialY = y;
        velocityX = Math.cos(angle * Math.PI / 180) * velocity * 2;
        velocityY = Math.sin(angle * Math.PI / 180) * velocity * 2;
        break;
        
      default: // follow
        initialX = x + offsetX;
        initialY = y + offsetY;
    }
    
    if (config.shape !== 'line') {
      particle.style.left = initialX + 'px';
      particle.style.top = initialY + 'px';
    }
    
    // Animation logic
    let opacityValue = config.opacity;
    let particleSize = config.size;
    let currentX = initialX;
    let currentY = initialY;
    let orbitAngle = angle;
    let orbitSpeed = velocity * 2;
    let growPhase = true;
    let lifeTime = 0;
    
    const maxLifeTime = config.particleLifetime + Math.random() * 200;
    
    const animateParticle = () => {
      lifeTime += 16; // Approximately 60fps
      
      // Update opacity for fade effect
      if (lifeTime < maxLifeTime) {
        opacityValue = config.opacity * (1 - lifeTime / maxLifeTime);
        particle.style.opacity = opacityValue.toString();
      } else {
        opacityValue = 0;
      }
      
      // Pulse effect
      if (config.pulseEffect) {
        if (growPhase) {
          particleSize = config.size * (1 + 0.3 * (lifeTime / maxLifeTime));
          if (lifeTime > maxLifeTime * 0.5) growPhase = false;
        } else {
          particleSize = config.size * (1.3 - 0.3 * (lifeTime / maxLifeTime));
        }
        
        if (config.shape === 'circle' || config.shape === 'square') {
          particle.style.width = particleSize + 'px';
          particle.style.height = particleSize + 'px';
        } else if (config.shape === 'text') {
          particle.style.fontSize = particleSize + 'px';
        } else {
          // Scale transform for SVG-based shapes
          particle.style.transform = particle.style.transform + \` scale(\${particleSize / config.size})\`;
        }
      }
      
      // Rotation effect
      if (config.rotation && config.shape !== 'line') {
        angle += velocity * 5;
        particle.style.transform = \`rotate(\${angle}deg)\`;
      }
      
      // Movement based on interaction type
      switch(config.interactionType) {
        case 'orbit':
          orbitAngle += orbitSpeed;
          const orbitRadius = config.spread;
          currentX = x + Math.cos(orbitAngle * Math.PI / 180) * orbitRadius;
          currentY = y + Math.sin(orbitAngle * Math.PI / 180) * orbitRadius;
          break;
          
        case 'swirl':
          velocityX *= 0.98;
          velocityY *= 0.98;
          currentX += velocityX;
          currentY += velocityY;
          angle += velocity * 3;
          break;
          
        default:
          currentX += velocityX;
          currentY += velocityY;
      }
      
      // Bounce off edges if enabled
      if (config.bounceOffEdges) {
        if (currentX <= 0 || currentX >= window.innerWidth) {
          velocityX = -velocityX;
          currentX = Math.max(0, Math.min(window.innerWidth, currentX));
        }
        if (currentY <= 0 || currentY >= window.innerHeight) {
          velocityY = -velocityY;
          currentY = Math.max(0, Math.min(window.innerHeight, currentY));
        }
      }
      
      // Update position
      if (config.shape !== 'line') {
        particle.style.left = currentX + 'px';
        particle.style.top = currentY + 'px';
      }
      
      // Continue animation or remove particle
      if (opacityValue > 0) {
        requestAnimationFrame(animateParticle);
      } else {
        document.body.removeChild(particle);
      }
    };
    
    // Start animation
    requestAnimationFrame(animateParticle);
  }
}

// Usage
export default cursorEffect;
// Initialize with: createCursorEffect(cursorEffect);
      `;
      
      setCursorCode(codeString);
      setIsGenerating(false);
      
      toast({
        title: "Design generated!",
        description: "Your custom cursor has been created. Preview it below."
      });
    }, 2000);
  };

  const handleTryExample = (example: string) => {
    setPrompt(example);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "The code has been copied to your clipboard."
    });
  };
  
  const copyExample = (example: string) => {
    setPrompt(example);
    setPromptCopied(true);
    
    setTimeout(() => {
      setPromptCopied(false);
    }, 2000);
    
    toast({
      title: "Example copied!",
      description: "Example prompt added to your input."
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card className="border border-border bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-primary/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold flex items-center justify-center">
            <Sparkles className="mr-2 h-5 w-5 text-primary" />
            Create Your Custom Cursor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 text-center">
            <label htmlFor="prompt" className="text-sm font-medium block">Describe your ideal cursor effect</label>
            <Textarea 
              id="prompt"
              placeholder="E.g., A cosmic nebula trail that swirls around the cursor..." 
              className="min-h-[100px] bg-background/50 backdrop-blur-sm transition-all focus:ring-2 focus:ring-primary/40 text-center"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <div className="text-center">
            <p className="text-sm mb-2 font-medium">Try an example:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => copyExample(example)}
                  className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-200 transform hover:scale-105 active:scale-95 relative group"
                >
                  <span className="absolute inset-0 flex items-center justify-center bg-primary/80 text-white rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 -z-10">
                    <CheckCircle2 className="h-3 w-3" />
                  </span>
                  {example}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
            className="w-full max-w-xs relative overflow-hidden group transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <span className="relative z-10">Generate Cursor Effect</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {cursorConfig && (
        <CursorPreview config={cursorConfig} />
      )}

      {cursorCode && (
        <Card className="border border-border bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-primary/10">
          <CardHeader>
            <CardTitle className="text-xl font-medium text-center">Your Custom Cursor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-black/80 p-4 text-sm text-gray-200 font-mono overflow-x-auto relative group">
              <button 
                onClick={() => copyToClipboard(cursorCode)}
                className="absolute top-2 right-2 bg-primary/20 hover:bg-primary/40 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
              </button>
              <pre className="whitespace-pre-wrap break-words">{cursorCode}</pre>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Coming soon",
                  description: "Sign in to save and download your designs!"
                });
              }}
              className="gap-2 group relative overflow-hidden transition-all"
            >
              <Download size={16} />
              <span>Download Code (1 USD)</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default PromptGenerator;
