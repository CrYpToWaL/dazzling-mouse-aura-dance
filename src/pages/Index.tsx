import React, { useState, useEffect } from 'react';
import MouseEffect from '@/components/MouseEffect';
import PromptGenerator from '@/components/PromptGenerator';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Index = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Toggle between dark and light mode
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('light-mode');
    localStorage.setItem('theme', newTheme);
  };

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
      } else {
        document.documentElement.classList.remove('light-mode');
      }
    }
  }, []);
  return <div className="min-h-screen relative transition-colors duration-300">
      <MouseEffect />
      <div className="min-h-screen flex flex-col items-center justify-start pt-12 md:pt-20 relative z-10">
        <Button variant="outline" size="icon" onClick={toggleTheme} className="fixed top-4 right-4 z-50 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300" aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <div className="animate-fade-in text-center w-full mb-10">
          <h1 className="text-5xl font-bold mb-3 text-center hoverable bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary py-[5px]">Cursor Creator</h1>
          <p className="text-xl mb-2 text-center hoverable py-[5px]">Design your perfect cursor effect through AI</p>
        </div>
        
        <PromptGenerator />
      </div>
    </div>;
};
export default Index;