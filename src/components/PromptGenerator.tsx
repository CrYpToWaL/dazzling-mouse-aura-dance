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
      
      // Process complex prompt features with enhanced imagination
      
      // Shape processing - now with MORE visual variety and imagination
      if (promptLower.includes('pixel') || promptLower.includes('square') || promptLower.includes('block')) {
        newConfig.shape = 'square';
        newConfig.size = Math.floor(Math.random() * 4) + 4;
        if (promptLower.includes('minecraft') || promptLower.includes('8-bit')) {
          newConfig.colors = ["#5D9C59", "#DF7861", "#FFC95F", "#91C8E4"];
          newConfig.rotation = false;
          newConfig.particleCount = 8;
        }
      } else if (promptLower.includes('star') || promptLower.includes('sparkle')) {
        newConfig.shape = 'star';
        newConfig.rotation = true;
        newConfig.glow = true;
        newConfig.colors = ["#FFD700", "#FFFFE0", "#FFF8DC", "#FFFACD"];
        if (promptLower.includes('shooting')) {
          newConfig.speed = 2.5;
          newConfig.trail = true;
          newConfig.particleLifetime = 1500;
        }
      } else if (promptLower.includes('triangle')) {
        newConfig.shape = 'triangle';
        newConfig.rotation = true;
        newConfig.speed = 0.7;
        if (promptLower.includes('sacred') || promptLower.includes('geometry')) {
          newConfig.colors = ["#FFD700", "#FFFFFF", "#F0F8FF"];
          newConfig.glow = true;
          newConfig.rotation = true;
          newConfig.speed = 0.3;
        }
      } else if (promptLower.includes('line') || promptLower.includes('trail') || promptLower.includes('path')) {
        newConfig.shape = 'line';
        newConfig.trail = true;
        newConfig.particleLifetime = 1200;
        if (promptLower.includes('laser') || promptLower.includes('beam')) {
          newConfig.colors = ["#FF0000", "#FF3333", "#FF6666"];
          newConfig.glow = true;
          newConfig.blurAmount = 8;
          newConfig.speed = 1.5;
        }
      } else if (promptLower.includes('heart') || promptLower.includes('love')) {
        newConfig.shape = 'heart';
        newConfig.pulseEffect = true;
        newConfig.colors = ["#FF5E78", "#FF427F", "#FF7B90"];
        if (promptLower.includes('valentine') || promptLower.includes('romantic')) {
          newConfig.particleCount = 10;
          newConfig.size = 14;
          newConfig.glow = true;
        }
      } else if (promptLower.includes('diamond') || promptLower.includes('gem')) {
        newConfig.shape = 'diamond';
        newConfig.rotation = true;
        newConfig.glow = true;
        newConfig.colors = ["#00FFFF", "#B0E0E6", "#87CEEB", "#1E90FF"];
        if (promptLower.includes('crystal') || promptLower.includes('ice')) {
          newConfig.blurAmount = 5;
          newConfig.colors = ["#A5F1E9", "#E1FFEE", "#FFBFA9", "#FFF6BD"];
        }
      } else if (promptLower.includes('hexagon') || promptLower.includes('hex')) {
        newConfig.shape = 'hexagon';
        newConfig.rotation = false;
        newConfig.spread = 3;
        if (promptLower.includes('hive') || promptLower.includes('bee')) {
          newConfig.colors = ["#FFC900", "#FFE569", "#FDEEDC"];
          newConfig.speed = 0.8;
          newConfig.pulseEffect = true;
        } else if (promptLower.includes('cyber') || promptLower.includes('tech')) {
          newConfig.colors = ["#00FF9F", "#00B8FF", "#D57BFF", "#FF3860"];
          newConfig.glow = true;
          newConfig.blurAmount = 6;
        }
      } else if (promptLower.includes('bubble') || promptLower.includes('sphere')) {
        newConfig.shape = 'circle';
        newConfig.size = 15;
        newConfig.opacity = 0.4;
        newConfig.blurAmount = 5;
        if (promptLower.includes('soap') || promptLower.includes('iridescent')) {
          newConfig.colors = ["#A7F0F9", "#C4FAF8", "#85E6C5", "#F8FFE5"];
          newConfig.pulseEffect = true;
          newConfig.size = Math.floor(Math.random() * 15) + 10;
        }
      } else if (promptLower.includes('leaf') || promptLower.includes('leaves')) {
        newConfig.shape = 'leaf';
        newConfig.rotation = true;
        newConfig.colors = ["#4CAF50", "#8BC34A", "#CDDC39"];
        newConfig.speed = 0.8;
        if (promptLower.includes('fall') || promptLower.includes('autumn')) {
          newConfig.colors = ["#E65F05", "#F2994A", "#F2C94C", "#B7410E"];
          newConfig.speed = 1.2;
          newConfig.particleLifetime = 1800;
        }
      } else if (promptLower.includes('snowflake') || promptLower.includes('snow')) {
        newConfig.shape = 'snowflake';
        newConfig.colors = ["#E1F5FE", "#BBDEFB", "#90CAF9"];
        newConfig.rotation = true;
        newConfig.speed = 0.5;
        if (promptLower.includes('winter') || promptLower.includes('ice')) {
          newConfig.blurAmount = 3;
          newConfig.glow = true;
          newConfig.particleCount = 12;
        }
      } else if (promptLower.includes('lightning') || promptLower.includes('electric')) {
        newConfig.shape = 'lightning';
        newConfig.colors = ["#64B5F6", "#2196F3", "#BBDEFB"];
        newConfig.glow = true;
        newConfig.blurAmount = 8;
        newConfig.particleLifetime = 400;
        if (promptLower.includes('storm') || promptLower.includes('thunder')) {
          newConfig.colors = ["#4B9CD3", "#5EA8DC", "#FFFFFF"];
          newConfig.size = 18;
          newConfig.spread = 15;
        }
      } else if (promptLower.includes('matrix') || promptLower.includes('code')) {
        newConfig.shape = 'text';
        newConfig.colors = ["#00FF41", "#0D0208", "#003B00"];
        newConfig.speed = 2;
        newConfig.particleCount = 8;
        if (promptLower.includes('hacker') || promptLower.includes('binary')) {
          newConfig.particleCount = 15;
          newConfig.particleLifetime = 1200;
          newConfig.interactionType = "rain";
        }
      } else if (promptLower.includes('galaxy') || promptLower.includes('nebula') || promptLower.includes('cosmic')) {
        newConfig.shape = 'circle';
        newConfig.colors = ["#663399", "#9370DB", "#4B0082", "#9400D3", "#8A2BE2"];
        newConfig.glow = true;
        newConfig.blurAmount = 8;
        newConfig.spread = 12;
        newConfig.particleCount = 10;
        newConfig.size = Math.floor(Math.random() * 5) + 3;
        if (promptLower.includes('supernova') || promptLower.includes('explosion')) {
          newConfig.particleCount = 20;
          newConfig.spread = 25;
          newConfig.speed = 2.5;
          newConfig.particleLifetime = 1500;
        }
      } else if (promptLower.includes('fractal') || promptLower.includes('mandelbrot')) {
        // New creative effect: fractals
        newConfig.shape = 'triangle';
        newConfig.colors = ["#FF00FF", "#00FFFF", "#FFFF00", "#FF00AA"];
        newConfig.rotation = true;
        newConfig.spread = 8;
        newConfig.glow = true;
        newConfig.blurAmount = 4;
        newConfig.interactionType = "swirl";
      } else if (promptLower.includes('firework') || promptLower.includes('celebration')) {
        // New creative effect: fireworks
        newConfig.shape = Math.random() > 0.5 ? 'star' : 'circle';
        newConfig.colors = ["#FF0000", "#FFFF00", "#00FF00", "#0000FF", "#FF00FF"];
        newConfig.particleCount = 15;
        newConfig.spread = 20;
        newConfig.speed = 1.8;
        newConfig.glow = true;
        newConfig.interactionType = "explode";
        newConfig.particleLifetime = 1500;
      } else if (promptLower.includes('phoenix') || promptLower.includes('fire bird')) {
        // New creative effect: phoenix
        newConfig.shape = 'triangle';
        newConfig.colors = ["#FF4500", "#FF8C00", "#FFD700", "#FF6347"];
        newConfig.glow = true;
        newConfig.rotation = true;
        newConfig.blurAmount = 7;
        newConfig.speed = 1.5;
        newConfig.trail = true;
        newConfig.interactionType = "swirl";
      } else if (promptLower.includes('butterfly') || promptLower.includes('insect')) {
        // New creative effect: butterfly
        newConfig.shape = 'heart';
        newConfig.colors = ["#FF69B4", "#DDA0DD", "#EE82EE", "#DA70D6"];
        newConfig.rotation = true;
        newConfig.speed = 1.2;
        newConfig.particleLifetime = 1500;
        newConfig.interactionType = "orbit";
      } else if (promptLower.includes('dna') || promptLower.includes('helix')) {
        // New creative effect: DNA helix
        newConfig.shape = 'circle';
        newConfig.colors = ["#3498DB", "#2ECC71", "#E74C3C", "#F1C40F"];
        newConfig.interactionType = "dna";
        newConfig.particleCount = 12;
        newConfig.rotation = false;
        newConfig.particleLifetime = 2000;
      }
      
      // Colors - expanded with richer palette options
      if (promptLower.includes('purple') || promptLower.includes('violet')) {
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
      } else if (promptLower.includes('fire') || promptLower.includes('flame') || promptLower.includes('hot')) {
        newConfig.colors = ["#F97316", "#EF4444", "#F59E0B", "#FBBF24"];
        newConfig.pulseEffect = true;
        newConfig.particleLifetime = 600;
        newConfig.glow = true;
      } else if (promptLower.includes('ice') || promptLower.includes('cold') || promptLower.includes('winter')) {
        newConfig.colors = ["#BFDBFE", "#93C5FD", "#60A5FA", "#E0F2FE"];
        newConfig.blurAmount = 2;
      } else if (promptLower.includes('ocean') || promptLower.includes('sea') || promptLower.includes('water')) {
        newConfig.colors = ["#0EA5E9", "#0284C7", "#38BDF8", "#7DD3FC"];
        newConfig.blurAmount = 3;
        newConfig.speed = 0.8;
      } else if (promptLower.includes('forest') || promptLower.includes('nature') || promptLower.includes('green')) {
        newConfig.colors = ["#4ADE80", "#22C55E", "#16A34A", "#86EFAC"];
      } else if (promptLower.includes('sunset') || promptLower.includes('warm') || promptLower.includes('dusk')) {
        newConfig.colors = ["#F97316", "#FB923C", "#FDBA74", "#FED7AA"];
        newConfig.glow = true;
      } else if (promptLower.includes('pastel')) {
        newConfig.colors = ["#FDA4AF", "#A5B4FC", "#FDE68A", "#A7F3D0", "#BAE6FD"];
      } else if (promptLower.includes('gold') || promptLower.includes('luxury') || promptLower.includes('royal')) {
        newConfig.colors = ["#FEF08A", "#FDE047", "#FACC15", "#EAB308"];
        newConfig.glow = true;
        newConfig.blurAmount = 3;
      } else if (promptLower.includes('retro') || promptLower.includes('vintage') || promptLower.includes('80s')) {
        newConfig.colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"];
      } else if (promptLower.includes('candy') || promptLower.includes('sweet')) {
        newConfig.colors = ["#FF85A2", "#FBB1BD", "#FFC2D1", "#FFD1DA"];
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
      } else if (promptLower.includes('varied') || promptLower.includes('mixed')) {
        newConfig.size = Math.floor(Math.random() * 15) + 5;
      }
      
      // Animation and behavior - expanded with more creative effects
      if (promptLower.includes('bounce')) {
        newConfig.bounceOffEdges = true;
        newConfig.speed = 1.5;
      }
      
      if (promptLower.includes('explode') || promptLower.includes('burst') || promptLower.includes('firework')) {
        newConfig.spread = 20;
        newConfig.speed = 2;
        newConfig.particleLifetime = 600;
        newConfig.interactionType = "explode";
      }
      
      if (promptLower.includes('swirl') || promptLower.includes('spiral') || promptLower.includes('vortex')) {
        newConfig.interactionType = "swirl";
        newConfig.rotation = true;
        newConfig.trail = true;
      }
      
      if (promptLower.includes('rain') || promptLower.includes('falling') || promptLower.includes('shower')) {
        newConfig.interactionType = "rain";
        newConfig.speed = 2;
      }
      
      if (promptLower.includes('orbit') || promptLower.includes('revolve') || promptLower.includes('planet')) {
        newConfig.interactionType = "orbit";
        newConfig.trail = true;
      }
      
      if (promptLower.includes('ripple') || promptLower.includes('wave') || promptLower.includes('water')) {
        newConfig.interactionType = "ripple";
        newConfig.spread = 10;
        newConfig.fadeTime = 1200;
      }
      
      if (promptLower.includes('magnetic') || promptLower.includes('attract')) {
        newConfig.interactionType = "magnetic";
        newConfig.speed = 1.5;
        newConfig.particleLifetime = 1500;
      }
      
      if (promptLower.includes('fade') || promptLower.includes('trail')) {
        newConfig.fadeTime = promptLower.includes('slow') ? 1400 : 700;
        newConfig.trail = true;
      }
      
      if (promptLower.includes('glow') || promptLower.includes('glowing') || promptLower.includes('luminous')) {
        newConfig.glow = true;
        newConfig.blurAmount = promptLower.includes('intense') ? 6 : 3;
      }
      
      if (promptLower.includes('pulse') || promptLower.includes('throb') || promptLower.includes('beat')) {
        newConfig.pulseEffect = true;
      }
      
      if (promptLower.includes('spin') || promptLower.includes('rotating') || promptLower.includes('twirl')) {
        newConfig.rotation = true;
      }
      
      // Particle count
      if (promptLower.includes('minimal')) {
        newConfig.particleCount = 2;
      } else if (promptLower.includes('many') || promptLower.includes('lots')) {
        newConfig.particleCount = 12;
      } else if (promptLower.includes('dust') || promptLower.includes('sparkly') || promptLower.includes('glitter')) {
        newConfig.particleCount = 18;
        newConfig.size = 3;
        newConfig.spread = 10;
        newConfig.glow = true;
      } else if (promptLower.includes('sparse') || promptLower.includes('few')) {
        newConfig.particleCount = 3;
        newConfig.size = 10;
      }
      
      // Apply some randomization to make each generation unique
      if (Math.random() > 0.7) {
        // Occasionally add glow effect
        newConfig.glow = true;
        newConfig.blurAmount = Math.floor(Math.random() * 5) + 2;
      }
      
      if (Math.random() > 0.8) {
        // Occasionally add pulse effect
        newConfig.pulseEffect = true;
      }
      
      // Small random variations to make each generation feel unique
      newConfig.size = Math.max(2, newConfig.size + (Math.random() * 4 - 2));
      newConfig.particleCount = Math.max(2, newConfig.particleCount + (Math.floor(Math.random() * 3) - 1));
      newConfig.speed = Math.max(0.3, newConfig.speed + (Math.random() * 0.6 - 0.3));
      
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
        particle.style.backgroundImage = \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23\${particleColor.substring(1)}' width='24' height='24'%3E%3Cpath d='M12 0l1.5 4h-3L12 0zm0 24l1.5-4h-
