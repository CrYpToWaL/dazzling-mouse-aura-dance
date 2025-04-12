
import React from 'react';
import MouseEffect from '@/components/MouseEffect';
import PromptGenerator from '@/components/PromptGenerator';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <MouseEffect />
      <div className="min-h-screen flex flex-col items-center justify-start pt-20 relative z-10">
        <h1 className="text-4xl font-bold mb-2 text-white hoverable">Cursor Creator</h1>
        <p className="text-xl text-gray-200 mb-10 hoverable">Design your perfect cursor effect through AI</p>
        
        <PromptGenerator />
      </div>
    </div>
  );
};

export default Index;
