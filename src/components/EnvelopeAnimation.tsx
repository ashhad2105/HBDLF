import React, { useState, useEffect } from 'react';
import { Mail, Heart } from 'lucide-react';

interface EnvelopeAnimationProps {
  onComplete: () => void;
}

const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleEnvelopeClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      setShowMessage(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-purple-50 to-cream-100">
      <div className="text-center">
        <div 
          className={`relative cursor-pointer transform transition-all duration-1000 ${
            isOpening ? 'scale-110' : 'hover:scale-105'
          }`}
          onClick={!isOpening ? handleEnvelopeClick : undefined}
        >
          <div className={`relative ${isOpening ? 'animate-pulse' : ''}`}>
            <Mail className="w-32 h-32 text-pink-400 mx-auto drop-shadow-lg" />
            
            {/* Envelope flap animation */}
            <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-transform duration-1000 ${
              isOpening ? 'rotate-12 -translate-y-2' : ''
            }`}>
              <div className="w-16 h-12 bg-pink-300 transform rotate-45 origin-bottom"></div>
            </div>
            
            {/* Hearts floating out */}
            {isOpening && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                {[...Array(6)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`absolute w-6 h-6 text-red-400 animate-bounce`}
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      left: `${(i - 3) * 20}px`,
                      top: `${-i * 10}px`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {!showMessage && !isOpening && (
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-dancing text-pink-600">
              You've got mail! 💌
            </h2>
            <p className="text-gray-600 font-poppins">
              Click the envelope to open your surprise
            </p>
            <div className="animate-pulse text-pink-400">
              ✨ Tap me! ✨
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default EnvelopeAnimation;
