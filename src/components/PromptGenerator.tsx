
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Download, Loader2, Sparkles } from 'lucide-react';
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
}

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cursorCode, setCursorCode] = useState('');
  const [cursorConfig, setCursorConfig] = useState<CursorConfig | null>(null);
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
    
    // Simulate generation process - this would connect to an API in the full version
    setTimeout(() => {
      // Analyze the prompt to determine cursor settings
      let colors = [];
      let size = 8;
      let fadeTime = 800;
      let particleCount = 5;
      
      // Process prompt keywords for more accurate cursor generation
      const promptLower = prompt.toLowerCase();
      
      // Color selection based on prompt
      if (promptLower.includes('purple')) {
        colors = ["#8B5CF6", "#D946EF"];
      } else if (promptLower.includes('rainbow') || promptLower.includes('colorful')) {
        colors = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"];
      } else if (promptLower.includes('neon') && promptLower.includes('cyberpunk')) {
        colors = ["#10B981", "#3B82F6", "#EC4899"];
      } else if (promptLower.includes('minimal') || promptLower.includes('white')) {
        colors = ["#FFFFFF", "#E5E7EB"];
      } else if (promptLower.includes('electric')) {
        colors = ["#3B82F6", "#8B5CF6", "#EC4899"];
      } else {
        colors = ["#8B5CF6", "#EC4899"]; // default
      }
      
      // Size based on prompt
      if (promptLower.includes('minimal') || promptLower.includes('small')) {
        size = 4;
      } else if (promptLower.includes('large')) {
        size = 12;
      }
      
      // Fade time based on prompt
      if (promptLower.includes('slow')) {
        fadeTime = 1200;
      } else if (promptLower.includes('fast')) {
        fadeTime = 400;
      }
      
      // Particle count based on prompt
      if (promptLower.includes('minimal')) {
        particleCount = 2;
      } else if (promptLower.includes('many') || promptLower.includes('lots')) {
        particleCount = 8;
      }
      
      const newConfig: CursorConfig = {
        type: "particle",
        colors: colors,
        size: size,
        trail: true,
        fadeTime: fadeTime,
        particleCount: particleCount
      };
      
      setCursorConfig(newConfig);
      
      // Generate code representation
      const codeString = `
// Generated Cursor Effect
// Based on prompt: "${prompt}"
const cursorEffect = {
  type: "${newConfig.type}",
  colors: ${JSON.stringify(newConfig.colors)},
  size: ${newConfig.size},
  trail: ${newConfig.trail},
  fadeTime: ${newConfig.fadeTime},
  particleCount: ${newConfig.particleCount}
};

export default cursorEffect;
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
                  onClick={() => handleTryExample(example)}
                  className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-200 transform hover:scale-105 active:scale-95"
                >
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
