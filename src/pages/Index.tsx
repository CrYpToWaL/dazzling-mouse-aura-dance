
import React, { useState, useEffect } from 'react';
import MouseEffect from '@/components/MouseEffect';
import PromptGenerator from '@/components/PromptGenerator';
import { Sun, Moon, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster } from '@/components/ui/toaster';
import { 
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Index = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    
    // Check authentication status
    const mockAuthCheck = localStorage.getItem('isAuthenticated');
    if (mockAuthCheck === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  // Mock login function
  const handleMockLogin = () => {
    // Simple mock authentication
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    setLoginDialogOpen(false);
  };
  
  // Handle login dialog submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    if (email && password) {
      handleMockLogin();
    }
  };
  
  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };
  
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <MouseEffect />
      
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-2 bg-background/50 backdrop-blur-md border-b border-border/20">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">Cursor Creator</span>
        </div>
        
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-1 text-xs"
            >
              <User className="h-3 w-3" />
              Sign Out
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setLoginDialogOpen(true)}
              className="flex items-center gap-1 text-xs"
            >
              <LogIn className="h-3 w-3" />
              Sign In
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full w-8 h-8 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300" 
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <ScrollArea className="h-screen w-full">
        <div className="content-container flex flex-col items-center justify-start pt-20 md:pt-28 relative z-10 pb-20">
          <div className="animate-fade-in text-center w-full mb-10 mt-4">
            <h1 className="text-5xl font-bold mb-3 text-center hoverable bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary py-[5px]">Cursor Creator</h1>
            <p className="text-xl mb-8 text-center hoverable py-[5px]">Design your perfect cursor effect through AI</p>
          </div>
          
          <div className="w-full max-w-5xl px-4">
            <PromptGenerator 
              isAuthenticated={isAuthenticated} 
              onLogin={() => setLoginDialogOpen(true)} 
            />
          </div>
        </div>
      </ScrollArea>
      
      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Enter your credentials to access all features.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleLoginSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setLoginDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Sign In</Button>
            </DialogFooter>
            
            <div className="text-xs text-center text-muted-foreground pt-2">
              <p>This is a demo app. Any credentials will work.</p>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <Toaster />
    </div>
  );
};

export default Index;
