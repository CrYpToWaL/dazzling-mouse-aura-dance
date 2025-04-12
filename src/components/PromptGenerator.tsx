
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Download, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import CursorPreview from './CursorPreview';

const examplePrompts = [
  "A glowing purple trail that fades over time",
  "Sparkly pixel dust that bounces off the screen edges",
  "Colorful rainbow particles that follow the cursor",
  "Elegant minimal white dots with subtle animation",
  "Neon cyberpunk cursor with electric glow effects"
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
      // Particle type/shape
      if (promptLower.includes('pixel') || promptLower.includes('square')) {
        newConfig.shape = 'square';
      } else if (promptLower.includes('star')) {
        newConfig.shape = 'star';
      } else if (promptLower.includes('triangle')) {
        newConfig.shape = 'triangle';
      } else if (promptLower.includes('line') || promptLower.includes('trail')) {
        newConfig.shape = 'line';
        newConfig.trail = true;
      }
      
      // Colors
      if (promptLower.includes('purple')) {
        newConfig.colors = ["#8B5CF6", "#D946EF"];
      } else if (promptLower.includes('rainbow') || promptLower.includes('colorful')) {
        newConfig.colors = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"];
      } else if (promptLower.includes('neon') && promptLower.includes('cyberpunk')) {
        newConfig.colors = ["#10B981", "#3B82F6", "#EC4899"];
        newConfig.glow = true;
        newConfig.blurAmount = 5;
      } else if (promptLower.includes('minimal') || promptLower.includes('white')) {
        newConfig.colors = ["#FFFFFF", "#E5E7EB"];
      } else if (promptLower.includes('electric')) {
        newConfig.colors = ["#3B82F6", "#8B5CF6", "#EC4899"];
        newConfig.glow = true;
      } else if (promptLower.includes('fire') || promptLower.includes('flame')) {
        newConfig.colors = ["#F97316", "#EF4444", "#F59E0B"];
        newConfig.pulseEffect = true;
      } else if (promptLower.includes('ice') || promptLower.includes('cold')) {
        newConfig.colors = ["#BFDBFE", "#93C5FD", "#60A5FA"];
        newConfig.blurAmount = 2;
      }
      
      // Size
      if (promptLower.includes('minimal') || promptLower.includes('small')) {
        newConfig.size = 4;
      } else if (promptLower.includes('large') || promptLower.includes('big')) {
        newConfig.size = 12;
      }
      
      // Animation and behavior
      if (promptLower.includes('bounce')) {
        newConfig.bounceOffEdges = true;
        newConfig.speed = 1.5;
      }
      
      if (promptLower.includes('fade') || promptLower.includes('trail')) {
        newConfig.fadeTime = promptLower.includes('slow') ? 1200 : 600;
        newConfig.trail = true;
      }
      
      if (promptLower.includes('glow') || promptLower.includes('glowing')) {
        newConfig.glow = true;
        newConfig.blurAmount = 3;
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
        newConfig.particleCount = 8;
      } else if (promptLower.includes('dust') || promptLower.includes('sparkly')) {
        newConfig.particleCount = 12;
        newConfig.size = 3;
        newConfig.spread = 10;
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
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Position main cursor
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    
    // Create particle based on config
    if (Math.random() < 0.3) { 
      createParticle(mouseX, mouseY, config);
    }
  });
  
  function createParticle(x, y, config) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    
    // Apply styles based on config
    particle.style.width = config.size + 'px';
    particle.style.height = config.size + 'px';
    particle.style.backgroundColor = config.colors[Math.floor(Math.random() * config.colors.length)];
    particle.style.position = 'absolute';
    particle.style.borderRadius = config.shape === 'circle' ? '50%' : config.shape === 'square' ? '0' : '30%';
    
    if (config.glow) {
      particle.style.filter = \`blur(\${config.blurAmount}px)\`;
      particle.style.boxShadow = \`0 0 \${config.blurAmount}px \${particle.style.backgroundColor}\`;
    }
    
    document.body.appendChild(particle);
    
    // Random offset based on spread
    const offsetX = (Math.random() - 0.5) * config.spread;
    const offsetY = (Math.random() - 0.5) * config.spread;
    
    particle.style.left = (x + offsetX) + 'px';
    particle.style.top = (y + offsetY) + 'px';
    
    // Animation logic
    let opacityValue = config.opacity;
    let particleSize = config.size;
    let currentX = x + offsetX;
    let currentY = y + offsetY;
    let angle = Math.random() * 360;
    let velocityX = (Math.random() - 0.5) * config.speed;
    let velocityY = (Math.random() - 0.5) * config.speed;
    
    const animateParticle = () => {
      opacityValue -= config.opacity / (config.particleLifetime / 16);
      particle.style.opacity = opacityValue.toString();
      
      if (config.pulseEffect) {
        particleSize = config.size * (1 + 0.2 * Math.sin(Date.now() / 100));
        particle.style.width = particleSize + 'px';
        particle.style.height = particleSize + 'px';
      }
      
      if (config.rotation) {
        angle += 2;
        particle.style.transform = \`rotate(\${angle}deg)\`;
      }
      
      if (config.bounceOffEdges) {
        currentX += velocityX;
        currentY += velocityY;
        
        if (currentX <= 0 || currentX >= window.innerWidth) velocityX = -velocityX;
        if (currentY <= 0 || currentY >= window.innerHeight) velocityY = -velocityY;
        
        particle.style.left = currentX + 'px';
        particle.style.top = currentY + 'px';
      }
      
      if (opacityValue > 0) {
        requestAnimationFrame(animateParticle);
      } else {
        document.body.removeChild(particle);
      }
    };
    
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
              placeholder="E.g., A trail of neon purple particles that fade out slowly..." 
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
