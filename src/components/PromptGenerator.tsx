
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2 } from 'lucide-react';
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
      // For demo purposes, we're generating a random config
      // In a real app, this would come from an AI-driven API
      const colors = prompt.toLowerCase().includes('purple') 
        ? ["#8B5CF6", "#D946EF"] 
        : prompt.toLowerCase().includes('rainbow') 
          ? ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"] 
          : prompt.toLowerCase().includes('neon') 
            ? ["#10B981", "#3B82F6"] 
            : prompt.toLowerCase().includes('minimal') 
              ? ["#FFFFFF", "#E5E7EB"] 
              : ["#8B5CF6", "#EC4899"];
      
      const newConfig: CursorConfig = {
        type: "particle",
        colors: colors,
        size: prompt.toLowerCase().includes('minimal') ? 4 : 8,
        trail: true,
        fadeTime: prompt.toLowerCase().includes('slow') ? 1200 : 800,
        particleCount: prompt.toLowerCase().includes('minimal') ? 2 : 5
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

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card className="border border-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Your Custom Cursor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">Describe your ideal cursor effect</label>
            <Textarea 
              id="prompt"
              placeholder="E.g., A trail of neon purple particles that fade out slowly..." 
              className="min-h-[100px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <div>
            <p className="text-sm mb-2">Try an example:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleTryExample(example)}
                  className="text-xs px-3 py-1 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : "Generate Cursor Effect"}
          </Button>
        </CardFooter>
      </Card>

      {cursorConfig && (
        <CursorPreview config={cursorConfig} />
      )}

      {cursorCode && (
        <Card className="border border-border bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-medium">Your Custom Cursor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-black/80 p-4 text-sm text-gray-200 font-mono overflow-x-auto">
              <pre>{cursorCode}</pre>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Coming soon",
                  description: "Sign in to save and download your designs!"
                });
              }}
              className="gap-2"
            >
              <Download size={16} />
              Download Code (1 USD)
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default PromptGenerator;
