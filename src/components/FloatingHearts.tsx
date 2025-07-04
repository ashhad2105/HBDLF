import React from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <Heart
          key={i}
          className="absolute text-pink-200 animate-float opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
            fontSize: `${0.8 + Math.random() * 1}rem`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;