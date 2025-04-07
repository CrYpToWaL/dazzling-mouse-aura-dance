
import React from 'react';
import MouseEffect from '@/components/MouseEffect';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <MouseEffect />
      <div className="min-h-screen flex items-center justify-center relative z-10 pointer-events-none">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white hoverable">Welcome to Your Interactive App</h1>
          <p className="text-xl text-gray-200 hoverable">Move your mouse around to see the magic!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
