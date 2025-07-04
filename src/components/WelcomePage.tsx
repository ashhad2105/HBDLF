import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface WelcomePageProps {
  onComplete: () => void;
  setMusicEnabled: (enabled: boolean) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({
  onComplete,
  setMusicEnabled,
}) => {
  const [showContinue, setShowContinue] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    const newMusicState = !musicOn;
    setMusicOn(newMusicState);
    setMusicEnabled(newMusicState);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-200 via-purple-100 to-cream-200 relative overflow-hidden">
      {/* Floating sparkles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-pink-300 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6 animate-pulse">
            Happy Birthday
          </h1>
          <h2 className="text-4xl md:text-6xl font-pacifico text-pink-500 mb-8">
            My Beautiful Princess! 👑
          </h2>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-pink-200">
          <p className="text-xl md:text-2xl font-dancing text-gray-700 leading-relaxed mb-6">
            Today is all about celebrating YOU - the most incredible, loving,
            and beautiful person in my world. This special website is my gift to
            you, filled with all the love, memories, and dreams we share
            together.
          </p>
          <p className="text-lg font-poppins text-pink-600">
            This site is just for you, because you mean the world to me. 💖
          </p>
        </div>

        {showContinue && (
          <button
            onClick={onComplete}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl animate-bounce"
          >
            Begin Our Journey ✨
          </button>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
